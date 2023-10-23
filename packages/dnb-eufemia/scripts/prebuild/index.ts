/**
 * Prepublish
 *
 * This script collects all needed files
 * and transforms it to an npm ui lib ready package we can publish later
 *
 */

import { ErrorHandler, log } from '../lib'

/**
 * The Templates (prepareTemplates) generation is special in the sense
 * That it has to be run locally to generate the files statically
 * so we can commit them as as core part.
 * The rest is only generated during the package build
 */
import { makeReleaseVersion } from './tasks/makeReleaseVersion'
import { prepareTemplates } from './tasks/prepareTemplates'
import { runStyleFactory } from './tasks/styleFactory'
import { runThemeFactory } from './tasks/themeFactory'
import convertSvgToJsx from './tasks/convertSvgToJsx'
import makeLibStyles from './tasks/makeLibStyles'
import makeMainStyle from './tasks/makeMainStyle'
import makePropertiesFile from './tasks/makePropertiesFile'
import generateTypes from './tasks/generateTypes'

export {
  log,
  prepareTemplates,
  runStyleFactory,
  runThemeFactory,
  convertSvgToJsx,
  makeLibStyles,
  makeMainStyle,
  makePropertiesFile,
  generateTypes,
}

export const runPrepublishTasks = async ({
  preventDelete = false,
} = {}) => {
  process.env.NODE_ENV = 'production'
  log.start('Starting the prepublish process...')
  try {
    await convertSvgToJsx({ preventDelete })

    await makeReleaseVersion()
    await runStyleFactory()
    await runThemeFactory()
    await makeLibStyles() // have to run before "makeLibModules"
    await makeMainStyle()
    await makePropertiesFile()
    await prepareTemplates()

    log.succeed('Prepublishing has Succeeded!')
  } catch (e) {
    log.fail('Failed to run prepublish!')
    ErrorHandler(e)
  }
  return true
}
