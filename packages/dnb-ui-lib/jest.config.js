const config = {
  // testEnvironment: 'node',
  testURL: 'http://localhost',
  moduleFileExtensions: ['js', 'json', 'scss', 'css'],
  testRegex: '(/__tests__/\\.js|(\\.|/)(test|spec))\\.js?$',
  modulePathIgnorePatterns: ['not_in_use', '/dist/'],
  transformIgnorePatterns: ['node_modules'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(md|txt)$': 'jest-raw-loader'
  },
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png)$': '<rootDir>/src/core/jest/fileMock.js',
    '^.+\\.(svg)$': '<rootDir>/src/core/jest/jsxMock.js',
    '^.+\\.(css|scss)$': 'jest-css-modules'
  }
}
module.exports = config
