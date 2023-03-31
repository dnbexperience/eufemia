/**
 * The main Figma Task runner
 *
 */

import { extractIconsAsSVG } from './tasks/assetsExtractors'
import { getFigmaDoc } from './helpers/docHelpers'
import { getRequiredBranchName } from './../prebuild/commitToBranch'
import { log, ErrorHandler } from '../lib'

log.start('> Figma: Preparing for connecting to the Figma API ...')

export const fetchFigmaIcons = async ({
  figmaFile = process.env.FIGMA_ICONS_FILE,
  assetsDir = process.env.ASSETS_ICONS_DIR,
  ...args
} = {}) => {
  if (!figmaFile) {
    return log.info(
      '> Figma: No "FIGMA_ICONS_FILE" defined, skipped to run fetchFigmaIcons'
    )
  }

  // Get the same figmaFile for the icons fetch
  const figmaDoc = await getFigmaDoc({
    figmaFile,
  })

  try {
    log.start('> Figma: Starting the icons fetch')
    const icons = await extractIconsAsSVG({
      figmaFile,
      figmaDoc,
      assetsDir,
      ...args,
    })
    log.succeed(`> Figma: Icons conversion done (${icons?.length} icons)`)
  } catch (e) {
    log.fail(new ErrorHandler('Failed during extractIconsAsSVG', e))
  }
}

export const fetchFigmaAll = async ({
  ignoreBranchCheck = null,
  ...args
} = {}) => {
  try {
    // make sure we are on the main branch
    const branchName = await getRequiredBranchName({
      requiredBranch: '^icon', // Test if branch is part of icons-lib.yml ("eufemia-icons")
    }) // as RegExp

    if (ignoreBranchCheck !== true && !branchName) {
      log.fail('> Figma: Could not continue, as we require another branch')
      return
    }

    await fetchFigmaIcons(args)

    log.succeed('> Figma: All done')
  } catch (e) {
    log.fail(new ErrorHandler('Failed during fetchFigmaAll', e))
  }
}
