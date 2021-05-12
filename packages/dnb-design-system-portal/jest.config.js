const config = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(md|txt|css|scss)$': 'jest-raw-loader',
  },
  modulePathIgnorePatterns: ['.cache', 'cypress'],
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png)$': '<rootDir>/src/core/jest/fileMock.js',
    '^.+\\.(svg)$': '<rootDir>/src/core/jest/jsxMock.js',
  },
}
module.exports = config
