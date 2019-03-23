/**
 * This file is used to enable Web Components
 *
 */

// import all the aviable libs
import * as componentsIndex from './components'
import * as patternsIndex from './patterns'
export * from './index'

let webComponentsAreEnabled = false
export const enableWebComponents = () => {
  if (webComponentsAreEnabled) return false
  webComponentsAreEnabled = true
  // register libs to work with custom element
  componentsIndex.enableWebComponents()
  patternsIndex.enableWebComponents()
}

export default {
  enableWebComponents
}
