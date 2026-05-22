import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Ensure dependency pre-bundling treats .js files as JSX where needed
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
      jsx: 'automatic',
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
      "script-src 'self' 'unsafe-inline'", // Add 'unsafe-eval' to be able to run Ajv
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join('; '),
  }
}
