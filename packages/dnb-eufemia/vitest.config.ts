/**
 * Vitest configuration for unit tests.
 *
 */

import { defineConfig } from 'vitest/config'
import { isCI } from 'repo-utils'
import path from 'node:path'

export default defineConfig({
  test: {
    reporters: ['default'],
    globals: true,
    environment: 'jsdom',

    // Run test files in worker threads instead of forked child processes.
    // Thread workers start up far faster and rebuild the jsdom environment
    // more cheaply, which roughly halves the total run time while keeping
    // full per-file isolation (each file still gets a fresh module graph).
    pool: 'threads',

    // The default 5s is tight for the heavier integration tests (large
    // Eufemia Forms compositions), which can momentarily exceed it under
    // the more concurrent threads pool. Give them more headroom.
    testTimeout: 10_000,

    // The threads pool schedules more work concurrently, which can surface
    // timing-sensitive tests under CI load. Retry only in CI to absorb such
    // transient flakiness (mirrors the screenshot suite's retry policy).
    retry: isCI ? 2 : 0,

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
