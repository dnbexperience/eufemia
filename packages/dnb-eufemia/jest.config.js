const config = {
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  testRegex: '(/__tests__/\\.js|(\\.|/)(test|spec))\\.[jt]s?$',
  modulePathIgnorePatterns: [
    'not_in_use',
    '<rootDir>/build/',
    '<rootDir>/assets/',
    '<rootDir>/stories/',
    '<rootDir>/jest-screenshot-report/',
    'screenshot',
  ],
  transformIgnorePatterns: ['node_modules'],
  // We  may use this in future when converting to ESM
  // transformIgnorePatterns: ['/node_modules/(?!ora|globby)'],
  transform: {
    '^.+\\.(js|jsx|ts)$': 'babel-jest',
    '^.+\\.(md|txt|css|scss)$': 'jest-raw-loader',
  },
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png)$': '<rootDir>/src/core/jest/fileMock.js',
    '^.+\\.(svg)$': '<rootDir>/src/core/jest/jsxMock.js',
  },
}
module.exports = config
