/**
 * Figma Task
 *
 */

import {
  findAllNodes,
  fetchTextColor,
  fetchFillColor,
  fetchStrokes,
  fetchSize,
  fetchText
} from '../helpers/docHelpers'
import {
  makeScssFromFigmaDoc,
  makeScssVarsFromFigmaDoc
} from './makeStyleFromFigmaDoc'
import { extractSassVars } from './extractSassVarsToJson'
import { asyncForEach } from '../../tools'

export const getComponentsDocs = async (
  componentsDoc,
  { componentSelector = '.dnb-' } = {}
) => {
  const componentsDocs = findAllNodes(componentsDoc, {
    name: new RegExp(componentSelector)
  }).filter(({ name }) => !/#skip/.test(name))

  return componentsDocs
}

export const extractFigmaStylesFromComponents = async (componentsDocs) => {
  const res = {}

  await asyncForEach(
    componentsDocs,
    async ({ name: styleName, ...componentDoc }) => {
      const componentsDocs = findAllNodes(
        componentDoc,
        {
          type: /GROUP|COMPONENT/
        },
        {
          visible: false
        }
      )

      await asyncForEach(componentsDocs, async (componentDoc) => {
        // setting up definitions
        if (/#skip/.test(componentDoc.name)) return
        let doForceScssOutput = false
        let componentName = styleName.replace(new RegExp('.dnb-'), '')
        if (
          /#force/.test(componentDoc.name) ||
          /#force/.test(componentName)
        ) {
          componentDoc.name = componentDoc.name.replace(/\s{0,}#force/, '')
          componentName = componentName.replace(/\s{0,}#force/, '')
          doForceScssOutput = true
        }

        // prepare our styles
        const {
          scssStyle,
          scssVars
        } = await composeFigmaStyleFromComponent(
          { componentName, styleName, ...componentDoc },
          { doForceScssOutput }
        )

        // create empty data holders
        res[componentName] = res[componentName] || []
        res[componentName].scssStyle = res[componentName].scssStyle || ''
        res[componentName].scssVars = res[componentName].scssVars || {}

        // place the data inside
        res[
          componentName
        ].scssStyle = `${res[componentName].scssStyle}\n${scssStyle}`
        res[componentName].scssVars = {
          ...res[componentName].scssVars,
          ...scssVars
        }
      })
    }
  )

  return res
}

export const composeFigmaStyleFromComponent = async (
  { componentName, styleName, name: styleNameSub, ...componentDoc },
  { doForceScssOutput }
) => {
  // define some vars first

  const componentNameSub =
    (styleNameSub.match(/&--(.*)/) || // remove &--subclass
    styleNameSub.match(/&\[(.*)\]/) || // remove &[disabled]
      [])[1] || null
  const existingSassVars = await extractSassVars({
    file: `./src/components/${componentName}/style/_${componentName}.scss`,
    replaceCallback: (scssContent) =>
      String(scssContent).replace(
        /(@import '\.\/)/g,
        `@import './components/${componentName}/style/`
      )
  })

  // fetch styles from component doc
  const { style: textStyleObj } = fetchText(componentDoc)
  const textColor = fetchTextColor(componentDoc)
  const backgroundColor = fetchFillColor(componentDoc)
  const stroke = fetchStrokes(componentDoc)
  const size = fetchSize(componentDoc)

  // make new style object from doc, and remove existing with equal values
  const makeStyle = (...args) =>
    makeScssFromFigmaDoc(
      ...args,
      // make an data holder we use later several times
      {
        existingSassVars,
        prependKey: componentName,
        subkeyToFind: componentNameSub
      }
    )

  const newStylesFromDoc = [
    ['height', makeStyle('height', size)],
    ['font-family', makeStyle('font-family', textStyleObj)],
    ['font-size', makeStyle('font-size', textStyleObj)],
    ['font-weight', makeStyle('font-weight', textStyleObj)],
    ['text-align', makeStyle('text-align', textStyleObj)],
    ['letter-spacing', makeStyle('letter-spacing', textStyleObj)],
    ['line-height', makeStyle('line-height', textStyleObj)],
    ['color', makeStyle('color', textColor)],
    ['background-color', makeStyle('background-color', backgroundColor)],
    ['border-radius', makeStyle('border-radius', size)],
    ['border-width', makeStyle('border-width', stroke)],
    ['border-color', makeStyle('border-color', stroke)]
  ].filter(([key, value]) => key && value)

  let scssStyle = '',
    scssVars = {}

  if (doForceScssOutput) {
    scssStyle = String(css`
      ${styleName} {
        ${styleNameSub} {
          ${newStylesFromDoc
            .map(([key, value]) => `${key}: ${value};`)
            .join('')};
        }
      }
    `).trim()
  } else {
    scssVars = makeScssVarsFromFigmaDoc({
      existingSassVars,
      newStylesFromDoc,
      prependKey: componentName,
      prependSubKey: componentNameSub
    })
  }
  return { scssVars, scssStyle }
}

const css = (strings, ...values) => strings + values.join('')
