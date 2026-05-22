/* eslint-disable no-restricted-imports */

/**
 * Barrel re-export so that `@dnb/eufemia/extensions/forms` resolves
 * against the source tree (used by the portal during development).
 * Use restricted-imports so it gets rewritten from /src/ to /build/
 */
export * from '@dnb/eufemia/src/extensions/forms'
