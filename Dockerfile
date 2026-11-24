# Build the static bundle, then serve it from nginx. The Node stage never ships:
# the runtime image is nginx plus ~70 KB of HTML/JS/CSS.
FROM node:26.13.1-alpine@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
# Stamped into the page by vite.config.ts; ops/release.sh passes them
ARG APP_VERSION=dev
ARG APP_REVISION=
RUN npm run build

FROM nginx:1.30.8-alpine@sha256:6437a63b5c529f0e06162b3f593c0154cff6fa2ea0f94fd7c27928cb399e022d
# The nginx image lags behind Alpine's security fixes (brotli, curl, expat were
# fixed upstream but not yet in the tag), so take them at build time
RUN apk upgrade --no-cache
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget -q --spider http://127.0.0.1/ || exit 1
