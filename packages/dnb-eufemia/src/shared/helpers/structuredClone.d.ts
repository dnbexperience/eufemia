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
declare const cloneFunction: any;
export { cloneFunction as structuredClone };
export default cloneFunction;
