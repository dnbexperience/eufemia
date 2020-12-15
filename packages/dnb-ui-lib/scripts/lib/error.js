/**
 * Error Handling helper
 *
 */

export const ERROR_HARMLESS = 100
export const ERROR_FATAL = 500

function ErrorHandler(message, error = null, code = ERROR_HARMLESS) {
  if (error === null && typeof message !== 'string') {
    error = message
  }
  if (error && typeof error === 'object' && error.message) {
    message = error.message
  }

  const err = new Error(`${message} (error code ${code})`)

  if (code === ERROR_FATAL) {
    throw err
  } else {
    console.log('\n\n', err, '\n---', error, '\n---\n\n')
  }

  return message
}
ErrorHandler.prototype.constructor = function () {}

export { ErrorHandler }
