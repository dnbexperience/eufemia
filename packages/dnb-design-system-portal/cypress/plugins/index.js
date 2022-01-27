/**
 * Cypress plugins
 *
 */

// require('dotenv').config()
const { isCI } = require('repo-utils')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // console.log('process.env', process.env)

  if (isCI) {
    // config.baseUrl = 'https://eufemia.dnb.no'
    config.baseUrl = 'http://localhost:3030'
    config.defaultCommandTimeout = 10e3
    config.video = false
  }

  return config
}
