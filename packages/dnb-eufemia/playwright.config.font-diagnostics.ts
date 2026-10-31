import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './src/style/__tests__',
  testMatch: 'FontDiagnostics.e2e.spec.ts',
  timeout: 300000,
  reporter: 'list',
  workers: 2,
  projects: [
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
})
