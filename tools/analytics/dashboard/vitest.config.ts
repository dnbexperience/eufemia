import { defineConfig } from 'vitest/config'

// Standalone test config: the pure data/auth logic is tested without the Vite
// build pipeline (and its Eufemia CSS optimizer plugin), which keeps the runner
// fast and free of style/asset resolution.
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
