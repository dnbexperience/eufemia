/**
 * Vitest configuration for unit tests.
 *
 */

import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    reporters: ['default'],
    globals: true,
    environment: 'jsdom',

    environmentOptions: {
      jsdom: {
        url: 'http://localhost',
      },
    },

    include: [
      'src/**/__tests__/**/*.test.{ts,tsx,js,jsx}',
      'src/**/*.test.{ts,tsx,js,jsx}',
    ],
    exclude: [
      '**/not_in_use/**',
      '**/*.screenshot.test.{ts,tsx,js,jsx}',
      '**/postTypeGeneration/**',
      '**/scripts/postbuild/**',
      '**/build/**',
      '**/assets/**',
      '**/node_modules/**',
    ],

    setupFiles: ['./src/core/vitest/setupVitest.ts'],

    // Match Jest's defaults: don't auto-restore/reset/clear mocks
    restoreMocks: false,
    mockReset: false,
    clearMocks: false,

    // Transform configuration — Vitest uses esbuild by default
    // CSS/SCSS/MD files are returned as empty strings
    css: false,

    // Dependencies that need transforming (ESM packages)
    deps: {
      optimizer: {
        web: {
          include: ['ora', 'globby', 'mock-match-media'],
        },
      },
    },
  },

  resolve: {
    alias: {
      // Mock image imports for test environments.
      '\\.(jpg|jpeg|png)$': path.resolve(
        __dirname,
        'src/core/test-utils/fileMock.ts'
      ),
      // Mock SVG imports
      '\\.(svg)$': path.resolve(
        __dirname,
        'src/core/test-utils/jsxMock.tsx'
      ),
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
})
