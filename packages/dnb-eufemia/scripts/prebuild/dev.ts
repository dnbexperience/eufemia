/**
 * Prepublish
 *
 * This script collects all needed files
 * and transforms it to an npm ui lib ready package we can publish later
 *
 */

import { log, runThemeFactory } from './index'

const dev = async () => {
  process.env.NODE_ENV = 'production'
  log.start('Starting dev prepublish...')

  await runThemeFactory()

  log.succeed('Nice')
  return true
}
dev()
