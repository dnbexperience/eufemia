/**
 * The main Figma Task runner
 *
 */

import { ConvertAndSaveComponentsStyle } from './tasks/componentsStyleConverter'
// import { FetchImages } from './tasks/imageStore'
import { IconsConverter } from './tasks/iconsConverter'
import { PDFConverter } from './tasks/iconsConverter'
import { getBranchName } from './../prepub/commitToBranch'
import { log, ErrorHandler } from '../lib'
import { getFigmaDoc } from './helpers/docHelpers'
// const { isCI } = require('ci-info')

log.start('> Figma: Preparing for connecting to the Figma API ...')

export const fetchFigmaStyles = async (args = {}) => {
  try {
    log.start('> Figma: Starting the style conversion.')
    const styles = await ConvertAndSaveComponentsStyle(args, {
      doReplaceVars: true
    })
    log.succeed(`> Figma: Style conversion done (${styles.length} styles)`)
  } catch (e) {
    log.fail(e)
    new ErrorHandler(e)
  }
}

export const fetchFigmaIcons = async (args = {}) => {
  try {
    log.start('> Figma: Starting the icons conversion')
    const icons = await IconsConverter(args)
    log.succeed(`> Figma: Icons conversion done (${icons.length} icons)`)

    // if (isCI) {
    const pdfs = await PDFConverter(args)
    log.succeed(`> Figma: PDFs conversion done (${pdfs.length} pdfs)`)
    // }
  } catch (e) {
    log.fail(e)
    new ErrorHandler(e)
  }
}

export const fetchFigmaAll = async ({
  figmaDoc = null,
  figmaFile = null,
  ignoreBranchCheck = null,
  ...rest
} = {}) => {
  try {
    // make sure we are on the develop branch
    const branchName = await getBranchName({ requiredBranch: 'icons' }) // as RegExp

    if (ignoreBranchCheck !== true && !branchName) {
      log.fail('> Figma: Could not continue, as we require another branch')
      return
    }

    if (!figmaDoc) {
      figmaDoc = await getFigmaDoc({ figmaFile })
    }

    await fetchFigmaStyles({ ...rest, figmaDoc })
    await fetchFigmaIcons({ ...rest, figmaDoc })

    log.succeed('> Figma: All done')
  } catch (e) {
    log.fail(e)
    new ErrorHandler(e)
  }
}
