/**
 * Global Error helper functions
 *
 */

export const ERROR_HARMLESS = 100 as const
export const ERROR_FATAL = 500 as const

export function ErrorHandler(
  this: { err?: Error } | void,
  error: string | { message: string },
  { message }: { message: string | null } = { message: null },
  code: number = ERROR_HARMLESS
) {
  let thisError: Error | undefined = this && this.err
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
