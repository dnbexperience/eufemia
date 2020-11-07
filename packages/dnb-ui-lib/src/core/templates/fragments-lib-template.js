/**
 * Library Index template to autogenerate all the fragments and patterns
 * Used by "prepareTemplates"
 */

import { registerElement } from '../shared/component-helper'

// import all the available fragments
import Template from './template/Template'

// define / export all the available fragments
export { Template }

export const getFragments = () => {
  return { Template }
}

let webFragmentsAreEnabled = false
export const enableWebFragments = () => {
  if (webFragmentsAreEnabled) return false
  webFragmentsAreEnabled = true
  const fragments = getFragments()
  // register this fragment to work with custom element
  for (const c in fragments) {
    if (fragments[c] && fragments[c].tagName) {
      registerElement(
        fragments[c].tagName,
        fragments[c],
        fragments[c].defaultProps
      )
    }
  }
}

export default {
  enableWebFragments
}
