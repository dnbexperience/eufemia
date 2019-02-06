// because --testPathIgnorePatterns=[array] has a bug, we do handle the ignore screenshots with this config
const config = require('./jest.config.js')
module.exports = {
  ...config,
  ...{
    modulePathIgnorePatterns: config.modulePathIgnorePatterns.filter(i => {
      return i !== 'screenshot'
    })
  }
}
