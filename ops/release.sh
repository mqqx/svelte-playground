#!/usr/bin/env bash
# Releases and deploys from this machine, through the shared script in the infra repo
# (../infra/bin/release, which documents the steps and the settings below):
#
#   ops/release.sh X.Y.Z              release and deploy
#   ops/release.sh X.Y.Z --dry-run    checks and image build only, nothing pushed
set -euo pipefail
cd "$(dirname "$0")/.."

RELEASE=../infra/bin/release
[[ -x $RELEASE ]] || { echo "needs the infra repo checked out next to this one" >&2; exit 1; }

APP=svelte-playground \
CHECKS='check test' \
BUMP_PACKAGE=1 \
URL=https://svelte.hmmr.dev \
	exec "$RELEASE" "$@"
