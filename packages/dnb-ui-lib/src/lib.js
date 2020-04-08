/**
 * This file is used to enable Web Components
 *
 */

// import all the aviable libs
import * as componentsIndex from './components/lib'
import * as patternsIndex from './patterns/lib'
export * from './components/lib'
export * from './patterns/lib'

let webComponentsAreEnabled = false
export const enableWebComponents = () => {
  if (webComponentsAreEnabled) return false
  webComponentsAreEnabled = true
  // register libs to work with custom element
  componentsIndex.enableWebComponents()
  patternsIndex.enableWebComponents()
}

export default {
  enableWebComponents,
  ...componentsIndex,
  ...patternsIndex
}
