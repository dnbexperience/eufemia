/**
 * Prepublish
 *
 * This script collects all needed files
 * and transforms it to an npm ui lib ready package we can publish later
 *
 */

import { ErrorHandler, log } from '../lib'
import { generateTypes } from './index'

const runGenerateTypesTasks = async () => {
  process.env.NODE_ENV = 'production'
  log.start('Starting to generate type definitions ...')
  try {
    await generateTypes()
    log.succeed('Type definitions are successfully generated!')
  } catch (e) {
    log.fail(ErrorHandler('Failed to generate type definitions!', e))
  }
  return true
}

const run = async () => {
  process.env.NODE_ENV = 'production'
  log.start('Make JavaScript properties file ...')

  await runGenerateTypesTasks()

  return true
}

run()
