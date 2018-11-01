const config = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(md|txt)$': 'jest-raw-loader'
  },
  modulePathIgnorePatterns: ['.cache'],
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png)$': '<rootDir>/src/core/jest/fileMock.js',
    '^.+\\.(svg)$': '<rootDir>/src/core/jest/jsxMock.js',
    '^.+\\.(css|scss)$': 'jest-css-modules'
  }
}
module.exports = config
