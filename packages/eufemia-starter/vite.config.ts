import { defineConfig, transformWithEsbuild } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'load+transform-js-files-as-jsx',
      enforce: 'pre',
      async transform(code, id) {
        // Vite appends query params to ids (e.g. ?v=hash). Strip them first.
        const [filepath] = id.split('?')

        // Treat any JS file under a src/ folder as JSX (starter and workspace packages)
        if (!/\/src\/.*\.js$/.test(filepath)) {
          return null
        }

        // Use the exposed transform from Vite instead of calling esbuild directly
        return transformWithEsbuild(code, filepath, {
          loader: 'jsx',
          jsx: 'automatic',
        })
      },
    },
  ],

  // Ensure dependency pre-bundling treats .js files as JSX where needed
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
      jsx: 'automatic',
    },
  },

  // Suppress Sass deprecations from dependencies and silence categories
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin'],
      },
    },
  },

  // Expose Eufemia's static assets (fonts) at "/assets/..." for dev environments like StackBlitz
  // This ensures URLs like "/assets/fonts/dnb/DNB-Regular.woff2" resolve to real files
  publicDir: path.resolve(__dirname, '../dnb-eufemia/assets'),

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
