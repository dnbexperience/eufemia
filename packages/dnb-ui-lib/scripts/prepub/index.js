/**
 * Prepublish
 *
 * This script collects all needed files
 * and transforms it to an npm ui lib ready package we can publish later
 *
 */

process.env.ROOT_DIR = `${__dirname}/../../`

import { ErrorHandler, log } from '../lib'
import del from 'del'

import { prepareTemplates } from './tasks/prepareTemplates'
import { runStyleFactory } from './tasks/styleFactory'
import convertSvgToJsx from './tasks/convertSvgToJsx'
// import convertSvgToCjs from './tasks/convertSvgToCjs'
import copyAssets from './tasks/copyAssets'
import makeEveryComponentStyle from './tasks/makeEveryComponentStyle'
import makeJSLibs from './tasks/makeJSLibs'
import makeIconLib from './tasks/makeIconLib'
import makeMainStyle from './tasks/makeMainStyle'
import makeLibStyles from './tasks/makeLibStyles'
import makeIconsUMDBundle from './tasks/makeIconsUMDBundle'
import makeMainUMDBundle from './tasks/makeMainUMDBundle'

export {
  log,
  prepareTemplates,
  runStyleFactory,
  convertSvgToJsx,
  copyAssets,
  makeEveryComponentStyle,
  makeJSLibs,
  makeIconLib,
  makeMainStyle,
  makeLibStyles,
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
    await makeEveryComponentStyle() // have to run after "makeJSLibs"
    await makeMainStyle()
    await makeLibStyles()

    await prepareTemplates()
    await makeJSLibs()
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
