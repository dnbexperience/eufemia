/**
 * Checks if a function is asynchronous.
 *
 * @param fn - The function to check.
 * @returns `true` if the function is asynchronous, `false` otherwise.
 */
export function isAsync(fn: unknown): boolean {
  // Support for jest.fn
  const n = 'getMockImplementation'
  if (fn?.[n]?.()) {
    fn = fn[n]()
  }

  const firstCheck = fn instanceof (async () => null).constructor
  const secondCheck = fn?.constructor?.name === 'AsyncFunction'

  if (firstCheck !== secondCheck) {
    // Storybook has a problem with async functions.
    // E.g. "fn?.constructor?.name === 'AsyncFunction'" logic returns always "Function" instead of "AsyncFunction"
    // Even this "Object.prototype.toString.call(fn) === '[object AsyncFunction]'" logic returns always "false" in Storybook.
    // The issue persists with "instanceof" logic, where it returns "true" for non-async functions.
    // As of now, we rather want to return true in that situation.
    return true
  }

  // is async function transpiled using @babel/plugin-transform-async-to-generator
  const isAsyncFunctionBabelTranspiled = fn
    ?.toString()
    ?.trim()
    .match(/return _ref[^\.]*\.apply/) //eslint-disable-line

  if (!!isAsyncFunctionBabelTranspiled) {
    return true
  }
  return firstCheck
}
