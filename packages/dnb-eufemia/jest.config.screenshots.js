const config = require('./jest.config.js')

module.exports = {
  preset: 'jest-playwright-preset',
  maxWorkers: 3, // Run 3 screenshot tests in parallel
  testEnvironmentOptions: {
    'jest-playwright': {
      launchOptions: {
        headless: true,
        // Performance optimizations for Chromium
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
        ],
        // headlessTimeout timeout is used in jestSetupScreenshots if headless is set to false.
        // This is to give us more time to inspect the test inside the browser window,
        // before the test suite moves on to the next one.
        // You can change this value to be whatever number you want.
        // Defaults to 30 seconds (30e3)
        headlessTimeout: 60e3,
      },
      browsers: [
        'chromium', // Much faster than Firefox for screenshots
        // 'firefox',
        // 'webkit',
      ],
    },
  },
  testTimeout: 60e3,
  testRegex: 'screenshot.test.(js|ts|tsx)$',
  testEnvironment: './src/core/jest/jestPlaywrightEnvironment.js',
  setupFilesAfterEnv: ['./src/core/jest/setupJestScreenshot.js'],
  reporters: [
    'default',
    'jest-image-snapshot/src/outdated-snapshot-reporter.js',
    'jest-image-snapshot-reporter',
  ],
  testPathIgnorePatterns: config.testPathIgnorePatterns.filter((i) => {
    return i !== 'screenshot'
  }),
}
