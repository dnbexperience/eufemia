const config = {
  modulePathIgnorePatterns: ['not_in_use', '.cache', 'cypress'],
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png)$': '<rootDir>/src/core/jest/fileMock.js',
    '^.+\\.(svg)$': '<rootDir>/src/core/jest/jsxMock.js',
  },
}
module.exports = config
