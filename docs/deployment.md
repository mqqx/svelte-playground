# Deployment

https://svelte.hmmr.dev runs on the shared Hetzner VPS behind Traefik. Host
conventions (access, Traefik, the Cloudflare Origin CA cert, memory limits) are
in [`../infra`](../../infra/README.md).

## Release and deploy

From this machine, no CI involved:

```bash
DEPLOY_HOST=root@<vps ip> ops/release.sh 1.1.0
```

The IP is in the private infra repo's README ("Access"). It stays out of this
public repo because the origin is only reachable through Cloudflare's proxy,
and DNS doesn't reveal it.

It runs the type check and tests, builds the amd64 image from the `Dockerfile`
(Node build stage, nginx runtime) and pushes it to
`ghcr.io/mqqx/svelte-playground`. Then it sets the version in `compose.yml` and
`package.json`, commits, tags `v1.1.0` and pushes. Finally it copies
`compose.yml` to `/opt/svelte-playground` on the VPS, pulls and restarts the
container, and waits until it is healthy.

Pick the version by the Conventional Commits since the last tag: `feat` bumps
the minor version, `fix` the patch.

Needs a clean tree on `main`, `gh` logged in with the `write:packages` scope,
Docker with buildx, and the "ssh hetzner cloud" key in the SSH agent
(1Password).

## Rollback

```bash
ssh root@<vps ip>
cd /opt/svelte-playground
# set the image tag in compose.yml back to the previous version, then
docker compose pull && docker compose up -d
```

Also pin that version on `main`. Otherwise the next release's `compose.yml`
looks like it continues from the broken one.

## First setup

1. Cloudflare DNS: a proxied record `svelte.hmmr.dev`, same target as
   `baxi.hmmr.dev`. It has to be proxied: the origin only serves the `*.hmmr.dev`
   Origin CA cert, which Cloudflare trusts and browsers don't.
2. `ops/release.sh` creates `/opt/svelte-playground` on its first run. Nothing
   else lives on the host, because the app has no config and no data.
3. Once https://svelte.hmmr.dev serves the app, retire GitHub Pages:

   ```bash
   gh api -X DELETE repos/mqqx/svelte-playground/pages
   git push origin --delete gh-pages
   ```
