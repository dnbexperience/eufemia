/**
 * Prepublish
 *
 * This script collects all needed files
 * and transforms it to an npm ui lib ready package we can publish later
 *
 */

import { ErrorHandler, log } from '../lib'
import { generateTypes } from './index'

const runGenerateTypesTasks = async ({ doRefetch } = {}) => {
  process.env.NODE_ENV = 'production'
  log.start('Starting to build types...', doRefetch)
  try {
    await generateTypes()
    log.succeed('Types build has succeeded!')
  } catch (e) {
    log.fail(new ErrorHandler('Failed to build types!', e))
  }
  return true
}

const run = async () => {
  process.env.NODE_ENV = 'production'
  log.start('Starting making JS properties file ...')

  await runGenerateTypesTasks()

  return true
}

run()
