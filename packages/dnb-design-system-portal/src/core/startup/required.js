/**
 * Some required startup code
 *
 * @author Tobias Høegh <tobias@tujo.no>
 */

import extend from 'lodash.merge'
// import merge from 'merge' // does not work well with mobx

// make Object.merge global aviable
Object.merge = (...args) => {
  args.unshift({})
  return extend.apply(extend, args)
} // used merge before, but the "array-includes-with-glob" is not ES5 code in the npm package, so this causes troubles on the build / UglifyJsPlugin process
Object.extend = extend
