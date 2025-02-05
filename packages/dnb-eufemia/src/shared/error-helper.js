/**
 * Global Error helper functions
 *
 */

export const ERROR_HARMLESS = 100
export const ERROR_FATAL = 500

export function ErrorHandler(
  error,
  { message } = { message: null },
  code = ERROR_HARMLESS
) {
  let thisError = this && this.err
  if (typeof error === 'object') {
    message = error.message
  }
  if (thisError) {
    thisError = new Error(`${error}\n\n${message}`)
  }
  if (code === ERROR_FATAL) {
    throw thisError
  } else {
    console.log(thisError)
  }
}
