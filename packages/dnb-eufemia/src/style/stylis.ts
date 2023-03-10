/**
 * Stylis plugin, more info https://github.com/thysultan/stylis.js
 * To be used to polyfill CSS Custom Properties
 * where e.g. Styled Components and Emotion are used
 */

import { matchAll } from '../shared/component-helper'
import properties from './themes/theme-ui/properties'

export interface StylisElement {
  type: string
  value: string
  props: Array<string> | string
  root: StylisElement | null
  parent: StylisElement | null
  children: Array<StylisElement> | string
  line: number
  column: number
  length: number
  return: string
}
export type StylisPluginCallback = (
  element: StylisElement,
  index: number,
  children: Array<StylisElement>,
  callback: StylisPluginCallback
) => string | void

export type StylisPlugin = (
  element: StylisElement,
  index: number,
  children: Array<StylisElement>,
  callback: StylisPluginCallback
) => string | void

const findRegExp = /var\(([^)]*)\)/g

const stylisPlugin = (context, content, props = null) => {
  // Only use the property context
  if (context !== 1 || props === null) {
    return false
  }

  // Collect the vars to replace
  // NB: in future we can use content.matchAll
  const matches = matchAll(content, findRegExp)

  // Prepare the vars to make them ready to be replaced
  // eslint-disable-next-line
  const varsToFill = Array.from(matches).reduce((acc, [k, v]) => {
    if (props && props[v]) {
      acc[v] = props[v]
    } else if (properties[v]) {
      acc[v] = properties[v]
    }
    return acc
  }, {})

  // Replace vars
  return Object.entries(varsToFill).reduce(
    (acc, [k, v]) => acc.replace(new RegExp(`var\\(${k}\\)`, 'g'), v),
    content
  )
}

export default stylisPlugin as StylisPlugin

export const withProperties = (properties) => (context, content) =>
  stylisPlugin(context, content, properties) as StylisPlugin
