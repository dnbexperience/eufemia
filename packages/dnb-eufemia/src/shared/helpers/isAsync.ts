/**
 * Checks if a function is asynchronous.
 *
 * @param fn - The function to check.
 * @returns `true` if the function is asynchronous, `false` otherwise.
 */
export function isAsync(fn: unknown): boolean {
  // Support for vi.fn
  const n = 'getMockImplementation'
  if (fn?.[n]?.()) {
    fn = fn[n]()
  }

  const firstCheck = fn instanceof (async () => null).constructor
  const secondCheck = fn?.constructor?.name === 'AsyncFunction'

  if (firstCheck !== secondCheck) {
    // If the two checks disagree, we rather want to return true.
    return true
  }

  // is async function transpiled using @babel/plugin-transform-async-to-generator
  const isAsyncFunctionBabelTranspiled = fn
    ?.toString()
    ?.trim()
    ?.match(/return _ref[^.]*\.apply/)

  if (isAsyncFunctionBabelTranspiled) {
    return true
  }
  return firstCheck
}
