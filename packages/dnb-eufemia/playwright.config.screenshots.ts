import { defineConfig } from '@playwright/test'
import { isCI } from 'repo-utils'

export default defineConfig({
  testDir: './src/',
  testMatch: '*screenshot.test.{ts,tsx}',

  timeout: 60_000,
  fullyParallel: false,

  retries: isCI ? 5 : 0,
  workers: isCI ? 1 : '50%',

  reporter: [['list'], ['./src/core/playwright/screenshotReporter.ts']],

  snapshotDir: './src/',
  snapshotPathTemplate:
    '{snapshotDir}/{testFileDir}/__image_snapshots__/{arg}{ext}',

  expect: {
    toMatchSnapshot: {
      maxDiffPixelRatio: isCI ? 0.001 : 0,
    },
  },

  use: {
    baseURL: `http://localhost:8000`,
    browserName: 'firefox',
    viewport: { width: 1280, height: 2048 },
    actionTimeout: 30_000,
    trace: 'off',
    screenshot: 'off',
  },
})
