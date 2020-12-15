/**
 * Prepublish
 *
 * This script collects all needed files
 * and transforms it to an npm ui lib ready package we can publish later
 *
 */

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
import makeMainStyle from './tasks/makeMainStyle'
import makePropertiesFile from './tasks/makePropertiesFile'
import generateTypes from './tasks/generateTypes'

// NB: Deprecated and replaced by Babel only build
// import makeLibModules from './tasks/makeLibModules'
// import makeIconLib from './tasks/makeIconLib'
// import makeIconsUMDBundle from './tasks/makeIconsUMDBundle'
// import makeMainUMDBundle from './tasks/makeMainUMDBundle'

export {
  log,
  prepareTemplates,
  runStyleFactory,
  runThemeFactory,
  convertSvgToJsx,
  makeLibStyles,
  makeMainStyle,
  makePropertiesFile,
  generateTypes

  // NB: Deprecated and replaced by Babel only build
  // makeLibModules,
  // makeIconLib,
  // makeIconsUMDBundle,
  // makeMainUMDBundle
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

    // NB: Deprecated and replaced by Babel only build
    // await makeIconLib()
    // await makeIconsUMDBundle({ doRefetch })

    await runStyleFactory()
    await runThemeFactory()
    await makeLibStyles() // have to run before "makeLibModules"
    await makeMainStyle()
    await makePropertiesFile()
    await prepareTemplates()

    // NB: Deprecated and replaced by Babel only build
    // await makeLibModules()
    // await makeMainUMDBundle()
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
    log.info('> PrePublish: deliting existing style')
    await del(
      [
        './es/**',
        './esm/**',
        './cjs/**',
        './components/**',
        './elements/**',
        './patterns/**',
        './style/**',
        './shared/**',
        './icons/**',
        './umd/**',
        '!./es',
        '!./esm',
        '!./cjs',
        '!./components',
        '!./elements',
        '!./patterns',
        '!./style',
        '!./shared',
        '!./icons',
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
