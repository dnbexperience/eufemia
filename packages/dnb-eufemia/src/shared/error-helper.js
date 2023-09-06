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
  if (typeof error === 'object') {
    message = error.message
  }
  this.err = new Error(`${error}\n\n${message}`)
  if (code === ERROR_FATAL) {
    throw this.err
  } else {
    console.log(this.err)
  }
}
