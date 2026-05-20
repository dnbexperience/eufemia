/**
 * Vitest configuration for build script tests.
 */

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: ['default'],
    globals: true,
    environment: 'node',
    include: ['scripts/**/__tests__/**/*.test.{ts,tsx,js,jsx}'],
    exclude: ['**/scripts/postbuild/**', '**/node_modules/**'],

    setupFiles: ['./src/core/vitest/setupVitest.ts'],

    restoreMocks: false,
    mockReset: false,
    clearMocks: false,

    deps: {
      optimizer: {
        web: {
          include: ['ora', 'globby'],
        },
      },
    },
  },
})
