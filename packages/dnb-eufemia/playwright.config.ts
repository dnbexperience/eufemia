import { defineConfig } from '@playwright/test'
import { isCI } from 'repo-utils'

export default defineConfig({
  timeout: 30000,
  globalTimeout: 600000,
  reporter: 'list',
  testDir: './src/',
  testMatch: '*__tests__/**/*.spec.ts',

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: isCI ? 'http://localhost:8001' : 'http://localhost:8000',

    // Name of the browser that runs tests. For example `chromium`, `firefox`, `webkit`.
    browserName: 'firefox',
  },
})
