/**
 * Vue Index file
 *
 */

import { VuePlugin } from 'vuera'

// import all the aviable libs
import * as componentsIndex from './components'
import * as patternsIndex from './patterns'

export * from './index'

export default {
  getComponents: Vue => {
    Vue.use(VuePlugin)
    const ret = {}
    const components = { ...componentsIndex, ...patternsIndex }
    for (const c in components) {
      if (components[c] && components[c].tagName) {
        ret[components[c].tagName] = components[c]
      }
    }
    return ret
  },
  setIgnoredPatterns: Vue => {
    const customPatterns = []
    const components = { ...componentsIndex, ...patternsIndex }
    for (const c in components) {
      if (components[c] && components[c].tagName) {
        customPatterns.push(components[c].tagName)
      }
    }
    try {
      Vue.config.ignoredPatterns = customPatterns
    } catch (e) {
      console.log(
        'setIgnoredPatterns failed on trying to set the "Vue.config.ignoredPatterns"',
        e
      )
    }
    return Vue
  }
}
