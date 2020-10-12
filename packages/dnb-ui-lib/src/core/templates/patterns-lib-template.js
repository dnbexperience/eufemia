/**
 * Library Index template to autogenerate all the components and patterns
 * Used by "prepareTemplates"
 */

import { registerElement } from '../shared/component-helper'

// import all the available components
import Template from './template/Template'

// define / export all the available components
export { Template }

export const getPatterns = () => {
  return { Template }
}

let webComponentsAreEnabled = false
export const enableWebComponents = () => {
  if (webComponentsAreEnabled) return false
  webComponentsAreEnabled = true
  const components = getPatterns()

  // register this component to work with custom element
  for (const c in components) {
    if (components[c] && components[c].tagName) {
      registerElement(
        components[c].tagName,
        components[c],
        components[c].defaultProps
      )
    }
  }
}
