import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// css is disabled so component tests can import styled components without
// processing SCSS; @dnb/eufemia is inlined so Vite transforms its source
// against the app's single React copy. jsdom provides window/sessionStorage.
export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
      jsx: 'automatic',
    },
  },

  test: {
    environment: 'jsdom',
    globals: true,
    css: false,
    setupFiles: ['./src/test-setup.ts'],
    server: {
      deps: {
        inline: [/@dnb\/eufemia/],
      },
    },
  },
})
