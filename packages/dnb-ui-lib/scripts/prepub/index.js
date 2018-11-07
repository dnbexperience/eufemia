/**
 * Prepublish
 *
 * This script collects all needed files
 * and transforms it to an npm ui lib ready package we can publish later
 *
 */

// process.env.ROOT_DIR = `${__dirname}/../../`
process.env.ROOT_DIR = require('packpath').self()

import { ErrorHandler, log } from '../lib'
import del from 'del'

import { prepareTemplates } from './tasks/prepareTemplates'
import { runStyleFactory } from './tasks/styleFactory'
import { runThemeFactory } from './tasks/themeFactory'
import convertSvgToJsx from './tasks/convertSvgToJsx'
import copyAssets from './tasks/copyAssets'
import makeLibStyles from './tasks/makeLibStyles'
import makeLibModules from './tasks/makeLibModules'
import makeIconLib from './tasks/makeIconLib'
import makeMainStyle from './tasks/makeMainStyle'
import makeIconsUMDBundle from './tasks/makeIconsUMDBundle'
import makeMainUMDBundle from './tasks/makeMainUMDBundle'

export {
  log,
  prepareTemplates,
  runStyleFactory,
  runThemeFactory,
  convertSvgToJsx,
  copyAssets,
  makeLibStyles,
  makeLibModules,
  makeIconLib,
  makeMainStyle,
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
    await copyAssets({ preventDelete })

    await makeIconLib()
    await makeIconsUMDBundle({ doRefetch })

    await runStyleFactory()
    await runThemeFactory()
    await makeLibStyles() // have to run after "makeLibModules"
    await makeMainStyle()

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
        './components/**',
        './patterns/**',
        './style/**',
        '!./components',
        '!./patterns',
        '!./style'
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
