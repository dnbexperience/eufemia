/**
 * Library Index template to autogenerate all the components and extensions
 * Used by "prepareTemplates"
 */

import { registerElement } from '../shared/component-helper'

// import all the available components
import Template from './template/Template'

// define / export all the available components
export { Template }

export const getComponents = () => {
  return { Template }
}

let webComponentsAreEnabled = false
export const enableWebComponents = () => {
  if (webComponentsAreEnabled) return false
  webComponentsAreEnabled = true
  const components = getComponents()
  // register this component to work with custom element
  for (const c in components) {
    if (components?.[c]?.tagName) {
      registerElement(
        components[c].tagName,
        components[c],
        components[c].defaultProps
      )
    }
  }
}
