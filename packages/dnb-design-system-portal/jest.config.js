module.exports = {
  testRegex: '(/__tests__/\\.js|(\\.|/)test)\\.(js|jsx|ts|tsx)?$',
  testPathIgnorePatterns: ['.cache', 'public', 'not_in_use'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      { configFile: '@dnb/eufemia/babel.config.js' },
    ],
  },
}
