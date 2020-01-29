/**
 * Make Properties
 *
 */

import { log, makePropertiesFile } from './index'

const run = async () => {
  process.env.NODE_ENV = 'production'
  log.start('Starting making JS properties file ...')

  await makePropertiesFile()

  return true
}
run()
