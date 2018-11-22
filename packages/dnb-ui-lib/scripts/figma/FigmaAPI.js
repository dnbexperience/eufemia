/**
 * Node
 *
 */

import { ConvertAndSaveComponentsStyle } from './tasks/componentsStyleConverter'
// import { FetchImages } from './tasks/imageStore'
import { IconsConverter } from './tasks/iconsConverter'
import { getBranchName } from './../tools/commitToBranch'
import { log, ErrorHandler } from '../lib'
import { getFigmaDoc } from './helpers/docHelpers'

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
  } catch (e) {
    log.fail(e)
    new ErrorHandler(e)
  }
}

export const fetchFigmaData = async ({
  figmaDoc = null,
  figmaFile = null,
  ...rest
} = {}) => {
  try {
    // make sure we are on the develop branch
    const branchName = await getBranchName({ requiredBranch: 'develop' })

    if (!branchName) {
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
