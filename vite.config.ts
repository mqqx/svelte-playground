import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  // The release stamps its version and commit into the build (ops/release.sh); a local build says "dev"
  define: {
    __APP_VERSION__: JSON.stringify(process.env.APP_VERSION || 'dev'),
    __APP_REVISION__: JSON.stringify(process.env.APP_REVISION || '')
  },
  base: "/",
  plugins: [svelte()]
})
