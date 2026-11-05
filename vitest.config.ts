import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  // As a local build: vite.config.ts stamps the release's version, the tests see "dev"
  define: {
    __APP_VERSION__: JSON.stringify('dev'),
    __APP_REVISION__: JSON.stringify(''),
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/tests/setup.ts'],
    server: {
      deps: {
        inline: [/svelte/],
      },
    },
  },
  resolve: {
    conditions: ['browser'],
  },
})
