/**
 * Main Index template to autogenerate all the libs
 *
 */

// import all the aviable libs
import * as componentsIndex from './components'
import * as patternsIndex from './patterns'

// import all the aviable components and patterns
import Template from './{type}/template/Template'

// define / export all the aviable components
export { Template }

let webComponentsAreEnabled = false
export const enableWebComponents = () => {
  if (webComponentsAreEnabled) return false
  webComponentsAreEnabled = true
  // register libs to work with custom element
  componentsIndex.enableWebComponents()
  patternsIndex.enableWebComponents()
}

export default {
  // ...componentsIndex, // exporting all components can effect the production bundle size
  // ...patternsIndex, // exporting all patterns can effect the production bundle size
  enableWebComponents
}
