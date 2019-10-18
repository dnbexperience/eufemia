/**
 * Prepublish
 *
 * This script collects all needed files
 * and transforms it to an npm ui lib ready package we can publish later
 *
 */

process.env.ROOT_DIR = require('packpath').self()

import { ErrorHandler, log } from '../lib'
import del from 'del'

/**
 * The Templates (prepareTemplates) generation is special in the sense
 * That it has to be run locally to generate the files statily
 * so we can commit them as as core part.
 * The rest is only generated during the package build
 */
import { prepareTemplates } from './tasks/prepareTemplates'
import { runStyleFactory } from './tasks/styleFactory'
import { runThemeFactory } from './tasks/themeFactory'
import convertSvgToJsx from './tasks/convertSvgToJsx'
import makeLibStyles from './tasks/makeLibStyles'
import makeLibModules from './tasks/makeLibModules'
import makeIconLib from './tasks/makeIconLib'
import makeMainStyle from './tasks/makeMainStyle'
import makePropertiesFile from './tasks/makePropertiesFile'
import makeIconsUMDBundle from './tasks/makeIconsUMDBundle'
import makeMainUMDBundle from './tasks/makeMainUMDBundle'

export {
  log,
  prepareTemplates,
  runStyleFactory,
  runThemeFactory,
  convertSvgToJsx,
  makeLibStyles,
  makeLibModules,
  makeIconLib,
  makeMainStyle,
  makePropertiesFile,
  makeIconsUMDBundle,
  makeMainUMDBundle
}

export const runPrepublishTasks = async ({
  preventDelete,
  doRefetch
} = {}) => {
  process.env.NODE_ENV = 'production'
  log.start('Starting the prepublish process...', doRefetch)
  try {
    await cleanupLib({ preventDelete })
    await convertSvgToJsx({ preventDelete })

    await makeIconLib()
    await makeIconsUMDBundle({ doRefetch })

    await runStyleFactory()
    await runThemeFactory()
    await makeLibStyles() // have to run after "makeLibModules"
    await makeMainStyle()
    await makePropertiesFile()

    await prepareTemplates()
    await makeLibModules()
    await makeMainUMDBundle()
    log.succeed('Prepublishing has Succeeded!')
  } catch (e) {
    log.fail('Failed to run prepublish!')
    new ErrorHandler(e)
  }
  return true
}

export const cleanupLib = async ({ preventDelete = false } = {}) => {
  // only delete things if there is a --clean flag or we force to
  if (process.argv.indexOf('--clean') !== -1 || !preventDelete) {
    log.text = '> PrePublish: deliting existing style'
    await del(
      [
        './es/**',
        './components/**',
        './elements/**',
        './patterns/**',
        './style/**',
        './umd/**',
        '!./es',
        '!./components',
        '!./elements',
        '!./patterns',
        '!./style',
        '!./umd'
      ],
      {
        force: true
      }
    )
  }
}

// const wait = t => new Promise(r => setTimeout(r, t))
// alternative for gulp
// import Undertaker from 'undertaker'
// const taker = new Undertaker()
