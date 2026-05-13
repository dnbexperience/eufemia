/**
 * Vitest configuration for post-build verification tests.
 *
 * Runs only the postbuild test suite which validates
 * that the build output contains expected files and types.
 */

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['scripts/postbuild/__tests__/*.test.ts'],
    testTimeout: 30000,
  },
})
