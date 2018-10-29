/**
 * umd entry
 *
 */

// IE11 nedds the polyfill. e.g. Object.entries
// import 'babel-polyfill'

// custom polyfill for IE11
if (!Object.entries) {
  Object.entries = obj => {
    const ownProps = Object.keys(obj),
      resArray = new Array(i)
    let i = ownProps.length
    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]]
    }
    return resArray
  }
}

import components from '../components/index'
import patterns from '../patterns/index'

components.enableWebComponents()
patterns.enableWebComponents()

// we dont export something, as this file is used to convert all the components inti umd module bundle
