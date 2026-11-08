/**
 * Vitest configuration for unit tests.
 *
 */

import { defineConfig } from 'vitest/config'
import { isCI } from 'repo-utils'

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

    // The default 300 ms lists hundreds of passing tests in every CI log
    slowTestThreshold: isCI ? 1000 : 300,

    // Changing shared test infrastructure invalidates the whole suite, so a
    // `--changed` run must fall back to running everything. Vitest already
    // appends `setupFiles` to these triggers automatically; the entries below
    // extend that to the shared mocks and test helpers. The Vitest defaults
    // (package.json, vitest/vite config) are restated because setting this
    // option replaces them.
    forceRerunTriggers: [
      '**/package.json/**',
      '**/{vitest,vite}.config.*/**',
      '**/src/core/vitest/**',
      '**/src/core/test-utils/**',
    ],

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

    // Transform configuration — Vitest transforms through Oxc (Rolldown)
    // CSS/SCSS/MD files are returned as empty strings
    css: false,
  },

  resolve: {
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
})
