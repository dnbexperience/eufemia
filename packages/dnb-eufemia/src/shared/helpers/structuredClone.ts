import structuredClonePolyfill from '@ungap/structured-clone'

// Read the native function without letting Babel substitute a second polyfill.
const { structuredClone = structuredClonePolyfill } = globalThis

export { structuredClone }
