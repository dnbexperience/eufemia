// const { readConfig } = require('jest-config')
// console.log('defaults', readConfig)
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
// Screenshot testing is not working properly yet under heavy test conditions
// if (process.env.TAKE_SCREENSHOTS) {
//   config.globals = {
//     __JEST_PUPPE_SHOTS_RENDERER__: 'STYLED_COMPONENTS' //REACT_SERVER
//   }
//   config.preset = 'jest-puppe-shots-preset'
//   config.preset = 'jest-puppeteer-react'
// }
module.exports = config
