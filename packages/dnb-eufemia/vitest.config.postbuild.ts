/**
 * Vitest configuration for post-build verification tests.
 *
 * Runs only the postbuild test suite which validates
 * that the build output contains expected files and types.
 */

import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['scripts/postbuild/__tests__/*.test.ts'],
    testTimeout: 30000,
  },
  resolve: {
    alias: {
      // packpath uses CJS module.parent.paths which doesn't work in vitest's
      // ESM environment. Replace it with a shim that returns process.cwd().
      packpath: path.resolve(__dirname, 'src/core/vitest/packpathShim.ts'),
    },
  },
})
