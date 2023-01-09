module.exports = {
  testRegex: '(/__tests__/\\.js|(\\.|/)(test|spec))\\.(js|jsx|ts|tsx)?$',
  testPathIgnorePatterns: ['.cache', 'public', 'cypress', 'not_in_use'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      { configFile: '@dnb/eufemia/babel.config.js' },
    ],
  },
}
