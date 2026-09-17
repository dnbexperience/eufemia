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

  // No static public dir: Vite bundles the Eufemia fonts referenced by the CSS
  // into assets/ (hashed), so copying the whole @dnb/eufemia/assets folder would
  // only ship unreferenced fonts/icons/flags to the bucket.
  publicDir: false,

  build: {
    // The dashboard is served under a strict CSP (script-src 'self'). Vite's
    // module-preload polyfill would inject an inline <script>, which the CSP
    // blocks; disable it (all target browsers support module preload natively).
    modulePreload: { polyfill: false },
  },
})
