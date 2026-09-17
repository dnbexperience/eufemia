import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { eufemiaCssOptimizer } from '@dnb/eufemia/src/style/vite-plugin.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eufemiaCssOptimizer()],

  // Ensure dependency pre-bundling handles .js files that may contain JSX
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
      jsx: 'automatic',
    },
  },

  // Expose Eufemia's static assets (fonts) at "/assets/..." so the built site
  // serves its own fonts instead of reaching out to a CDN.
  publicDir: new URL(
    '../../../packages/dnb-eufemia/assets',
    import.meta.url
  ).pathname,

  build: {
    // The dashboard is served under a strict CSP (script-src 'self'). Vite's
    // module-preload polyfill would inject an inline <script>, which the CSP
    // blocks; disable it (all target browsers support module preload natively).
    modulePreload: { polyfill: false },
  },
})
