/**
 * Vitest browser-mode configuration for screenshot tests.
 *
 * Tests targeted by this config render nothing in the iframe
 * themselves — instead they call `makeScreenshot()`, which uses
 * the registered `makeScreenshot` BrowserCommand to drive the
 * provider's per-session Page against the running portal at
 * http://localhost:8000.
 */

import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import { isCI } from 'repo-utils'
import path from 'node:path'

import { makeScreenshot } from './src/core/vitest-screenshots/commands/screenshotEngine'
import {
  loadImage,
  matchImageSnapshot,
} from './src/core/vitest-screenshots/commands/loadImage'
import ScreenshotReporter from './src/core/vitest-screenshots/screenshotReporter'
import LiveReporter from './src/core/vitest-screenshots/liveReporter'

export default defineConfig({
  test: {
    include: process.env.SCREENSHOT_INCLUDE
      ? process.env.SCREENSHOT_INCLUDE.split(',')
      : ['src/**/*.screenshot.test.{ts,tsx}'],
    reporters: [new LiveReporter(), new ScreenshotReporter()],

    // Each worker gets its own forked process. The screenshot engine
    // launches a dedicated Firefox process per worker slot (via a
    // browser pool) so rendering is fully isolated and deterministic.
    // Hover is emulated via CSS injection (not real :hover) so there
    // is no focus contention between workers.
    fileParallelism: true,
    pool: 'forks',
    isolate: true,
    maxWorkers: process.env.PLAYWRIGHT_SCREENSHOT_WORKERS
      ? /^\d+%$/.test(process.env.PLAYWRIGHT_SCREENSHOT_WORKERS)
        ? process.env.PLAYWRIGHT_SCREENSHOT_WORKERS
        : Number(process.env.PLAYWRIGHT_SCREENSHOT_WORKERS)
      : '50%',
    retry: isCI ? 5 : 0,
    testTimeout: 60_000,

    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      // Mirror today's per-test timeout for actions and screenshots.
      connectTimeout: 30_000,
      instances: [
        {
          browser: 'firefox',
          viewport: { width: 1280, height: 2048 },
        },
      ],
      commands: {
        makeScreenshot,
        loadImage,
        matchImageSnapshot,
      },
      // The helper drives navigation directly via the Playwright page,
      // so we don't need Vitest to take screenshots on failure.
      screenshotFailures: false,
    },
  },

  resolve: {
    alias: {
      // Tests still import the `selectThemes` / `onMain` helpers from
      // the old playwright module. Keep those reachable.
      'repo-utils': path.resolve(__dirname, '../../tools/repo-utils'),
    },
  },
})
