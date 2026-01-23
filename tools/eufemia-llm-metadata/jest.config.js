import path from 'path'

export default {
  testEnvironment: 'node',
  testRegex: '(/__tests__/\\.js|(\\.|/)test)\\.(js|jsx|ts|tsx)?$',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        configFile: path.resolve(
          path.dirname(new URL(import.meta.url).pathname),
          '../../packages/dnb-eufemia/babel.config.js'
        ),
        babelrc: false,
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!(ora|globby)/)'],
}
