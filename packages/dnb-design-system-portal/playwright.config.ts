import { defineConfig } from '@playwright/test'
import { isCI } from 'repo-utils'

export default defineConfig({
  timeout: 30000,
  globalTimeout: 600000,
  reporter: 'list',
  testDir: './src/e2e',

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: isCI ? 'http://localhost:8002' : 'http://localhost:8000',

    // Name of the browser that runs tests. For example `chromium`, `firefox`, `webkit`.
    browserName: 'firefox',

    // Populates context with given storage state.
    // storageState: 'state.json',
  },
})
