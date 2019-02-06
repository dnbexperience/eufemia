/**
 * Error Handling helper
 *
 */

export const ERROR_HARMLESS = 100
export const ERROR_FATAL = 500

function ErrorHandler(
  error,
  { message } = { message: null },
  code = ERROR_HARMLESS
) {
  if (typeof error === 'object') {
    message = error.message
  }
  const err = new Error(`(error code ${code}) ${error}\n\n${message}`)
  if (code === ERROR_FATAL) {
    throw err
  } else {
    console.log(err)
  }
}
ErrorHandler.prototype.constructor = function() {}

export { ErrorHandler }
