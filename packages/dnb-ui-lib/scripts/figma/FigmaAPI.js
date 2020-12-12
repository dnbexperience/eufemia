/**
 * The main Figma Task runner
 *
 */

import { ConvertAndSaveComponentsStyle } from './tasks/componentsStyleConverter'
import { SVGIconsConverter } from './tasks/assetsConverters'
import { PDFConverter } from './tasks/assetsConverters'
import { getBranchName } from './../prepub/commitToBranch'
import { log, ErrorHandler } from '../lib'

log.start('> Figma: Preparing for connecting to the Figma API ...')

export const fetchFigmaStyles = async ({
  figmaFile = process.env.FIGMA_STYLES_FILE,
  ...args
} = {}) => {
  if (!figmaFile) {
    return log.info(
      '> Figma: No "FIGMA_STYLES_FILE" defined, skipped to run fetchFigmaStyles'
    )
  }

  try {
    log.start('> Figma: Starting the style fetch')
    const styles = await ConvertAndSaveComponentsStyle(
      { figmaFile, ...args },
      {
        doReplaceVars: true
      }
    )
    log.succeed(
      `> Figma: Style conversion done (${styles?.length} styles)`
    )
  } catch (e) {
    log.fail(new ErrorHandler('Failed during fetchFigmaStyles', e))
  }
}

export const fetchFigmaIcons = async ({
  figmaFile = process.env.FIGMA_ICONS_FILE,
  ...args
} = {}) => {
  if (!figmaFile) {
    return log.info(
      '> Figma: No "FIGMA_ICONS_FILE" defined, skipped to run fetchFigmaIcons'
    )
  }

  try {
    log.start('> Figma: Starting the icons fetch')
    const icons = await SVGIconsConverter({ figmaFile, ...args })
    log.succeed(`> Figma: Icons conversion done (${icons?.length} icons)`)
  } catch (e) {
    log.fail(new ErrorHandler('Failed during SVGIconsConverter', e))
  }

  try {
    log.start('> Figma: Starting the pdf fetch')
    const pdfs = await PDFConverter(args)
    log.succeed(`> Figma: PDFs conversion done (${pdfs?.length} pdfs)`)
  } catch (e) {
    log.fail(new ErrorHandler('Failed during PDFConverter', e))
  }
}

export const fetchFigmaAll = async ({
  ignoreBranchCheck = null,
  ...args
} = {}) => {
  try {
    // make sure we are on the develop branch
    const branchName = await getBranchName({ requiredBranch: 'figma' }) // as RegExp

    if (ignoreBranchCheck !== true && !branchName) {
      log.fail('> Figma: Could not continue, as we require another branch')
      return
    }

    await fetchFigmaStyles(args)
    await fetchFigmaIcons(args)

    log.succeed('> Figma: All done')
  } catch (e) {
    log.fail(new ErrorHandler('Failed during fetchFigmaAll', e))
  }
}
