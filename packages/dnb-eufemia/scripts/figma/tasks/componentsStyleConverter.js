/**
 * Figma Task
 *
 */

import fs from 'fs-extra'
import path from 'path'
import { log } from '../../lib'
import {
  getComponentsDocs,
  extractFigmaStylesFromComponents
} from './extractStylesFromFigmaDoc'
import { findNode, saveToFile, getFigmaDoc } from '../helpers/docHelpers'

const frameName = process.env.FIGMA_STYLES_FRAME || 'Components' // before we used "dnb-ui-components"

export const ConvertAndSaveComponentsStyle = async ({
  figmaFile,
  figmaDoc = null,
  convertOptions = {}
}) => {
  if (figmaDoc === null) {
    log.info('> Figma: Fetching the figma doc.')
    figmaDoc = await getFigmaDoc({ figmaFile })
  }

  // out, if no changes
  if (!figmaDoc) return []

  const componentsObj = await ComponentsStyleConverter(
    figmaDoc,
    convertOptions
  )

  const result = []

  for (const name in componentsObj) {
    const { scssStyle, scssVars, replaceScssVars } = componentsObj[name]

    // replace vars
    if (replaceScssVars) {
      const file = `../../src/components/${name}/style/_${name}.scss`
      await saveToFile(path.resolve(__dirname, file), replaceScssVars)
      log.info(`> Figma: Saved style to file: ${file}`)
    } else {
      // paste the vars in a vars file
      if (scssVars) {
        const file = `../../src/components/${name}/style/_${name}_custom_vars.scss`
        await saveToFile(path.resolve(__dirname, file), scssVars)
        log.info(`> Figma: Saved style to file: ${file}`)
      }

      // save complete scss style sheets
      if (scssStyle) {
        const file = `../../src/components/${name}/style/_${name}_custom.scss`
        await saveToFile(
          path.resolve(__dirname, file),
          String(scssStyle).trim()
        )
        log.info(`> Figma: Saved style to file: ${file}`)
      }
    }

    result.push(componentsObj[name])
  }

  return result
}

export const ComponentsStyleConverter = async (
  figmaDoc,
  { mainLayerSelector = { name: frameName }, doReplaceVars = false } = {}
) => {
  const componentsDoc = findNode(figmaDoc.document, mainLayerSelector)
  const componentsDocs = await getComponentsDocs(componentsDoc)
  const componentsObj = await extractFigmaStylesFromComponents(
    componentsDocs
  )
  const result = {}
  const prependString = `/** ATTENTION: The content of this file is auto generated. Do not change/edit it manually! */\n`
  const appendString = `/** auto generated */`

  for (const name in componentsObj) {
    let replaceScssVars = null,
      { scssVars, scssStyle } = componentsObj[name]

    // replace vars
    if (doReplaceVars) {
      const file = `../../src/components/${name}/style/_${name}.scss`
      replaceScssVars = String(
        await fs.readFile(path.resolve(__dirname, file))
      )
      Object.entries(scssVars).forEach(([key, value]) => {
        if (key === 'prependString') return
        const regExp = new RegExp(`(\\$${key}:\\s{0,})([^;]*);(.*)$`, 'gm')
        replaceScssVars = replaceScssVars.replace(
          regExp,
          `$1${value}; ${appendString}`
        )
      })
      log.info(`> Figma: Reading style to replace variables: ${file}`)
    } else {
      // paste the vars in a vars file
      const entries = Object.entries(scssVars)
      scssVars =
        entries.length > 0
          ? prependString +
            entries
              .map(([key, value]) =>
                key === 'prependString' ? value : `$${key}: ${value};`
              )
              .join('\n')
          : null

      log.info(
        `> Figma: Replacing variables: ${JSON.stringify(
          scssVars,
          null,
          2
        )}`
      )
    }

    // prepare style sheets
    scssStyle =
      String(scssStyle).length > 0 ? prependString + scssStyle : null

    result[name] = {
      ...(result[name] || {}),
      scssStyle,
      scssVars,
      replaceScssVars
    }
  }

  return result
}
