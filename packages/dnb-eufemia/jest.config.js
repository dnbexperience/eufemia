const config = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  testRegex: '(/__tests__/\\.js|(\\.|/)(test|spec))\\.(js|jsx|ts|tsx)?$',
  testPathIgnorePatterns: [
    'not_in_use',
    'screenshot',
    'postTypeGeneration',
    '<rootDir>/scripts/postbuild/',
    '<rootDir>/build/',
    '<rootDir>/assets/',
    '<rootDir>/stories/',
    '<rootDir>/jest-screenshot-report/',
  ],
  transformIgnorePatterns: ['/node_modules/(?!(ora|globby)/)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.(md|txt|css|scss)$': 'jest-raw-loader',
  },
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png)$': '<rootDir>/src/core/jest/fileMock.js',
    '^.+\\.(svg)$': '<rootDir>/src/core/jest/jsxMock.js',
  },
}
module.exports = config
