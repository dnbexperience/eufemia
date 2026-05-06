/**
 * Vitest configuration for build script tests.
 *
 * These tests were previously run via Jest and use the jestCompatPlugin
 * and setupVitest.ts shim to bridge jest.fn()/jest.mock() calls to vi.*.
 */

import { defineConfig } from 'vitest/config'
import { jestCompatPlugin } from './src/core/vitest/jestCompatPlugin'

export default defineConfig({
  plugins: [jestCompatPlugin()],
  test: {
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
