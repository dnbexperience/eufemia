/**
 * ATTENTION: This file is auto generated by using "prepareTemplates".
 * Do not change the content!
 *
 */

/**
 * Library Index template to autogenerate all the fragments and extensions
 * Used by "prepareTemplates"
 */

import { registerElement } from '../shared/component-helper'

// import all the available fragments
import DrawerList from './drawer-list/DrawerList'
import ScrollView from './scroll-view/ScrollView'

// define / export all the available fragments
export { DrawerList, ScrollView }

export const getFragments = () => {
  return { DrawerList, ScrollView }
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
