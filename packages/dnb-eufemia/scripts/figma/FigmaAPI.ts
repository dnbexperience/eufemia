/**
 * The main Figma Task runner
 *
 */

import { extractIcons } from './tasks/assetsExtractors'
import { getRequiredBranchName } from '../prebuild/commitToBranch'
import { log, ErrorHandler } from '../lib'

log.start('> Figma: Preparing for connecting to the Figma API ...')

type FetchFigmaIconsOptions = {
  figmaFile?: string
  assetsDir?: string
  forceRefetch?: boolean
  forceReconvert?: boolean
  ignoreBranchCheck?: boolean
}

export const fetchFigmaIcons = async ({
  figmaFile = process.env.FIGMA_ICONS_FILE,
  assetsDir = process.env.ASSETS_ICONS_DIR,
  ...args
}: FetchFigmaIconsOptions = {}) => {
  if (!figmaFile) {
    return log.info(
      '> Figma: No "FIGMA_ICONS_FILE" defined, skipped to run fetchFigmaIcons'
    )
  }

  try {
    log.start('> Figma: Starting the icons fetch')
    const icons = await extractIcons({
      figmaFile,
      assetsDir,
      ...args,
    })
    log.succeed(`> Figma: Icons conversion done (${icons?.length} icons)`)
  } catch (e) {
    log.fail(ErrorHandler('Failed during extractIcons', e))
  }
}

export const fetchFigmaAll = async ({
  ignoreBranchCheck = null,
  ...args
}: FetchFigmaIconsOptions = {}) => {
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
    log.fail(ErrorHandler('Failed during fetchFigmaAll', e))
  }
}
