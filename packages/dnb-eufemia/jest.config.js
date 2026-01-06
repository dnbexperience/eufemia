const config = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  testRegex: '(/__tests__/\\.js|(\\.|/)test)\\.(js|jsx|ts|tsx)?$',
  testPathIgnorePatterns: [
    'not_in_use',
    'screenshot',
    'postTypeGeneration',
    '<rootDir>/scripts/postbuild/',
    '<rootDir>/build/',
    '<rootDir>/assets/',
    '<rootDir>/stories/',
  ],
  transformIgnorePatterns: ['/node_modules/(?!(ora|globby)/)'],
  setupFiles: ['core-js'], // is needed by "globby" inside of convertSvgToJsx
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.(md|txt|css|scss)$': 'jest-raw-loader',
  },
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png)$': '<rootDir>/src/core/jest/fileMock.js',
    '^.+\\.(svg)$': '<rootDir>/src/core/jest/jsxMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/core/jest/setupJest.js'],
  // Performance optimizations
  maxWorkers: '50%', // Use 50% of available CPU cores for parallel test execution
  testTimeout: 10000, // Set default timeout to 10 seconds to prevent hanging tests
  cache: true, // Enable Jest cache for faster subsequent runs
  cacheDirectory: '<rootDir>/.jest-cache',
  // Optimize module resolution
  modulePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/.jest-cache'],
  // Don't wait for slow tests to finish before running fast ones
  bail: false,
  // Collect coverage only when explicitly requested
  collectCoverage: false,
}
module.exports = config
