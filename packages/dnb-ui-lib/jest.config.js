const config = {
  // testEnvironment: 'node',
  testURL: 'http://localhost',
  testRegex: '(/__tests__/\\.js|(\\.|/)(test|spec))\\.js?$',
  modulePathIgnorePatterns: ['not_in_use', '/dist/', 'screenshot'],
  transformIgnorePatterns: ['node_modules'],
  // globalTeardown: './src/core/jest/jestGlobalTeardown.js',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(md|txt|css|scss)$': 'jest-raw-loader'
  },
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png)$': '<rootDir>/src/core/jest/fileMock.js',
    '^.+\\.(svg)$': '<rootDir>/src/core/jest/jsxMock.js'
  }
}
module.exports = config
