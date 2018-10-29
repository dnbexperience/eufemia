/**
 * Node
 *
 */

import dotenv from 'dotenv'
import { getFigmaDoc } from './helpers/docHelpers'
import { ConvertAndSaveComponentsStyle } from './tasks/componentsStyleConverter'
// import { FetchImages } from './tasks/imageStore'
import { IconsConverter } from './tasks/iconsConverter'
import { log } from '../lib'

// import .env variables
dotenv.config()

const figmaToken = process.env.FIGMA_TOKEN
const figmaFile = process.env.FIGMA_MAIN_FILE

log.start('> Figma: Preparing for connecting to the Figma API ...')

export const fetchFigmaStyles = async ({ doRefetch, figmaDoc } = {}) => {
  try {
    if (process.argv.indexOf('-u') !== -1) {
      doRefetch = true
    }
    if (!figmaDoc && doRefetch) {
      log.text = '> Figma: Fetching the figma doc.'
      figmaDoc = await getFigmaDoc({ figmaFile, figmaToken, doRefetch })
    }
    log.start('> Figma: Starting the style conversion.')
    const styles = await ConvertAndSaveComponentsStyle(figmaDoc, {
      doReplaceVars: true
    })
    log.succeed(
      `> Figma: Style conversion done. (${styles.length} styles)`
    )
  } catch (e) {
    log.fail(e)
  }
}

export const fetchFigmaIcons = async ({ doRefetch, figmaDoc } = {}) => {
  try {
    if (process.argv.indexOf('-u') !== -1) {
      doRefetch = true
    }
    if (!figmaDoc && doRefetch) {
      log.text = '> Figma: Fetching the figma doc'
      figmaDoc = await getFigmaDoc({ figmaFile, figmaToken, doRefetch })
    }
    log.start('> Figma: Starting the icons conversion')
    const icons = await IconsConverter({
      figmaFile,
      figmaToken,
      figmaDoc,
      doRefetch
    })
    log.succeed(`> Figma: Icons conversion done. (${icons.length} icons)`)
  } catch (e) {
    log.fail(e)
  }
}

export const fetchFigmaData = async (options = {}) => {
  try {
    let { doRefetch, figmaDoc } = options
    if (process.argv.indexOf('-u') !== -1) {
      doRefetch = true
    }
    if (!figmaDoc && doRefetch) {
      log.text = '> Figma: Fetching the figma doc'
      options.figmaDoc = await getFigmaDoc({
        figmaFile,
        figmaToken,
        doRefetch
      })
    }
    await fetchFigmaStyles(options)
    await fetchFigmaIcons(options)
    log.succeed('> Figma: All done')
  } catch (e) {
    log.fail(e)
  }
}
