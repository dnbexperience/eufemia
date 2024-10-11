import { defineConfig } from '@playwright/test'

export default defineConfig({
  timeout: 30000,
  globalTimeout: 600000,
  reporter: 'list',
  testDir: './src/e2e',

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:8002',

    // Name of the browser that runs tests. For example `chromium`, `firefox`, `webkit`.
    browserName: 'firefox',

    // Populates context with given storage state.
    // storageState: 'state.json',
  },
})
