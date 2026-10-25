#!/usr/bin/env bash
# Releases and deploys from this machine: checks, image, pin + tag, VPS.
#
#   DEPLOY_HOST=root@<vps ip> ops/release.sh 1.1.0
#
# Needs: a clean tree on main, `gh` logged in with write:packages, Docker buildx
# and the "ssh hetzner cloud" key in the SSH agent (1Password).
#
# The host comes from the environment because this repo is public: the origin
# IP is kept out of DNS (everything is proxied through Cloudflare), and
# committing it here would undo that. It is in the private infra repo's README.
set -euo pipefail

V=${1:?usage: DEPLOY_HOST=root@<vps ip> ops/release.sh X.Y.Z}
HOST=${DEPLOY_HOST:?set DEPLOY_HOST=root@<vps ip>, see the infra repo README, "Access"}
DIR=/opt/svelte-playground
IMAGE=ghcr.io/mqqx/svelte-playground

cd "$(dirname "$0")/.."

[[ $V =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || { echo "version must be X.Y.Z" >&2; exit 1; }
[[ $(git branch --show-current) == main ]] || { echo "release from main" >&2; exit 1; }
[[ -z $(git status --porcelain) ]] || { echo "the tree is not clean" >&2; exit 1; }
! git rev-parse -q --verify "refs/tags/v$V" >/dev/null || { echo "v$V is already tagged" >&2; exit 1; }

# The VPS only knows the "ssh hetzner cloud" key; with several keys in the agent it
# hangs up before reaching it, so pin it (see ../infra/README.md, "Access")
KEY=$(mktemp)
trap 'rm -f "$KEY"' EXIT
ssh-add -L | grep 'hetzner cloud' > "$KEY" || { echo "'ssh hetzner cloud' key not in the agent" >&2; exit 1; }
SSH=(ssh -o IdentitiesOnly=yes -i "$KEY" "$HOST")
SCP=(scp -q -o IdentitiesOnly=yes -i "$KEY")

echo "== checks"
npm ci --silent
npm run check
npm test

echo "== image $IMAGE:$V"
gh auth token | docker login ghcr.io -u mqqx --password-stdin >/dev/null
# The VPS is x86_64; on an arm64 Mac only the small nginx stage is emulated
docker buildx build --platform linux/amd64 \
	--label org.opencontainers.image.source=https://github.com/mqqx/svelte-playground \
	--label org.opencontainers.image.version="$V" \
	--label org.opencontainers.image.revision="$(git rev-parse HEAD)" \
	-t "$IMAGE:$V" --push .

echo "== pin, tag, push"
perl -pi -e 's|^(\s*image: ghcr\.io/mqqx/svelte-playground:).*$|${1}'"$V"'|' compose.yml
npm version "$V" --no-git-tag-version --allow-same-version >/dev/null
git commit -q -m "chore(release): pin the image to $V so the host runs exactly this release" \
	compose.yml package.json package-lock.json || true
git tag "v$V"
git push -q --atomic origin main "v$V"

echo "== deploy"
"${SSH[@]}" "mkdir -p $DIR"
"${SCP[@]}" compose.yml "$HOST:$DIR/compose.yml"
# The package is private: the host pulls with this machine's token in a throwaway
# docker config, removed right after. Never log in to root's own config: docker keeps
# one login per registry, so it would replace baxi's pull token, and a logout clears it
gh auth token | "${SSH[@]}" "cd $DIR && export DOCKER_CONFIG=\$(mktemp -d) && trap 'rm -rf \"\$DOCKER_CONFIG\"' EXIT \
	&& docker login ghcr.io -u mqqx --password-stdin >/dev/null && docker compose pull -q"
"${SSH[@]}" "cd $DIR && docker compose up -d && docker image prune -f >/dev/null"

echo "== waiting for health"
for _ in $(seq 30); do
	status=$("${SSH[@]}" "docker inspect -f '{{.State.Health.Status}}' svelte-playground" 2>/dev/null || true)
	if [[ $status == healthy ]]; then
		echo "deployed $V — healthy, https://svelte.hmmr.dev"
		exit 0
	fi
	sleep 2
done
echo "svelte-playground is not healthy after 60 s: ssh $HOST 'docker logs svelte-playground'" >&2
exit 1
