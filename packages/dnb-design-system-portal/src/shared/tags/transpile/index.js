/** source: https://github.com/FormidableLabs/react-live/tree/master/src/utils/transpile */

import transform from './transform'
import errorBoundary from './errorBoundary'
import evalCode from './evalCode'

export const generateElement = (
  { code = '', scope = {} },
  errorCallback
) => {
  // NOTE: Remove trailing semicolon to get an actual expression.
  const codeTrimmed = code.trim().replace(/;$/, '')

  // NOTE: Workaround for classes and arrow functions.
  const transformed = transform(`(${codeTrimmed})`).trim()

  return errorBoundary(
    evalCode(`return ${transformed}`, scope),
    errorCallback
  )
}
