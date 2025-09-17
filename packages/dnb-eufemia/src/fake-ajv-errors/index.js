/**
 * Fake ajv-errors module for yarn resolutions
 * This module provides a no-op implementation of ajv-errors that can be used
 * with yarn resolutions to prevent ajv-errors from being bundled when not actually used.
 *
 * Usage in package.json:
 * "resolutions": {
 *   "ajv-errors": "@dnb/eufemia/fake-ajv-errors@latest"
 * }
 */

// Fake ajv-errors function that does nothing
function fakeAjvErrors(ajv) {
  // Mark the ajv instance as having ajv-errors applied
  ajv.__ajvErrors__ = true
  return ajv
}

// Export the fake function as default
module.exports = fakeAjvErrors

// Also export as named export for compatibility
module.exports.default = fakeAjvErrors
