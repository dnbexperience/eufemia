/**
 * Structured clone utility with polyfill support for older browsers.
 *
 * Native structuredClone is available in:
 * - Safari >= 15.4
 * - iOS >= 15.4
 * - Chrome >= 98
 * - Firefox >= 94
 * - Edge >= 98
 *
 * For older browsers (e.g., iOS 13.1-15.3), the polyfill from @ungap/structured-clone
 * will be used. The polyfill is imported conditionally and will be tree-shaken
 * for modern browsers via the build system.
 */

// Use native structuredClone if available, otherwise use polyfill
const cloneFunction: typeof structuredClone =
  typeof structuredClone !== 'undefined'
    ? structuredClone
    : // Polyfill for older browsers (iOS 13.1-15.3, Safari < 15.4)
      // This import will be included only when needed via babel-plugin-polyfill-corejs3
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('@ungap/structured-clone')

export { cloneFunction as structuredClone }
export default cloneFunction
