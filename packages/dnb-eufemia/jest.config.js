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
  prettierPath: require.resolve('prettier-v2'),
}
module.exports = config
