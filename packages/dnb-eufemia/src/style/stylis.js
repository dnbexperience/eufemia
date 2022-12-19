/**
 * Stylis plugin, more info https://github.com/thysultan/stylis.js
 * To be used to polyfill CSS Custom Properties
 * where e.g. Styled Components and Emotion are used
 */

import { matchAll } from '../shared/component-helper'
import properties from './properties'

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

export default stylisPlugin

export const withProperties = (properties) => (context, content) =>
  stylisPlugin(context, content, properties)
