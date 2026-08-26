/**
 * Error Handling helper
 *
 */

export const ERROR_HARMLESS = 100
const ERROR_FATAL = 500

type ErrorHandlerMessage = string

function ErrorHandler(
  message: ErrorHandlerMessage,
  error = null,
  code = ERROR_HARMLESS
): string {
  if (error === null && typeof message !== 'string') {
    error = message
  }
  if (error && typeof error === 'object' && error.message) {
    message = error.message
  }

  // Neutralise CR/LF so a value cannot forge extra log lines.
  message = String(message).replace(/\n/g, '').replace(/\r/g, '')

  const err = new Error(`${message} (error code ${code})`)

  if (code === ERROR_FATAL) {
    throw err
  } else {
    // Log CR/LF-free strings so a value cannot forge extra log lines.
    const detail = String(error ?? '')
      .replace(/\n/g, '')
      .replace(/\r/g, '')
    console.log('\n\n', err.message, '\n---', detail, '\n---\n\n')
  }

  return message
}

export { ErrorHandler }
