/**
 * The main Figma Task runner
 *
 */

import { extractIcons } from './tasks/assetsExtractors'
import { extractTokens } from './tasks/tokensExtractor'
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

type FetchFigmaTokensOptions = {
  figmaFile?: string
  tokensDir?: string
}

export const fetchFigmaTokens = async ({
  figmaFile = process.env.FIGMA_TOKENS_FILE,
  ...args
}: FetchFigmaTokensOptions = {}) => {
  try {
    log.start('> Figma: Starting the design tokens fetch')
    const files = await extractTokens({ figmaFile, ...args })
    log.succeed(
      `> Figma: Design tokens conversion done (${files.length} files)`
    )
    return files
  } catch (e) {
    log.fail(ErrorHandler('Failed during extractTokens', e))
    throw e
  }
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
    throw e
  }
  return undefined
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
      throw new Error('Figma icon sync requires an icon branch')
    }

    await fetchFigmaIcons(args)

    log.succeed('> Figma: All done')
  } catch (e) {
    log.fail(ErrorHandler('Failed during fetchFigmaAll', e))
    throw e
  }
}
