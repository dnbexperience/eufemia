import { defineConfig } from 'vitest/config'

// Pure data/auth logic is tested here without the Vite build pipeline (and its
// Eufemia CSS optimizer plugin), which keeps the runner fast. jsdom provides the
// window/sessionStorage the auth and data helpers use.
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
