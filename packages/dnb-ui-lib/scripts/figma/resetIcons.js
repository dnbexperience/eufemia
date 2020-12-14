/**
 * Figma Reset
 *
 * Use this to reset and redownload all content and styles
 *
 */

import fs from 'fs-extra'
import path from 'path'
import { log, ErrorHandler } from '../lib'
import { fetchFigmaAll } from './index'

export const runFigmaReset = async () => {
  log.start('Resetting Figma content and styles')
  try {
    const versionLockFile = path.resolve(__dirname, './version.lock')
    if (fs.existsSync(versionLockFile)) {
      await fs.unlink(versionLockFile)
    }
    const iconsLockFile = path.resolve(
      __dirname,
      '../../src/icons/icons-svg.lock'
    )
    if (fs.existsSync(iconsLockFile)) {
      await fs.unlink(iconsLockFile)
    }
  } catch (e) {
    log.fail(e)
    new ErrorHandler(e)
  }
}

runFigmaReset().then(() =>
  fetchFigmaAll({ forceRefetch: true, ignoreBranchCheck: true }).then(
    () => {
      log.succeed('Resetting Figma is done')
    }
  )
)
