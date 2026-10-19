import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { eufemiaCssOptimizer } from '@dnb/eufemia/src/style/vite-plugin.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eufemiaCssOptimizer()],

  // Ensure dependency pre-bundling handles .js files that may contain JSX
  optimizeDeps: {
    rolldownOptions: {
      moduleTypes: {
        '.js': 'jsx',
      },
    },
  },

  // Expose Eufemia's static assets (fonts) at "/assets/..." for dev environments like StackBlitz
  // This ensures URLs like "/assets/fonts/dnb/DNB-Regular.woff2" resolve to real files
  publicDir: new URL('../dnb-eufemia/assets', import.meta.url).pathname,

  // Add some basic security headers, including a Content Security Policy (CSP)
  preview: {
    headers: getHeaders(),
  },

  // For local testing of CSP. Does not work on StackBlitz
  // server: {
  //   headers: getHeaders(),
  // },
})

function getHeaders() {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      // Ajv (JSON Schema validation) needs 'unsafe-eval'; Zod schemas don't
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join('; '),
    'X-Content-Type-Options': 'nosniff',
  }
}
