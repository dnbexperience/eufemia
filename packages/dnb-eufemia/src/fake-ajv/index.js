/**
 * Fake AJV module for yarn resolutions
 * This module provides a no-op implementation of AJV that can be used
 * with yarn resolutions to prevent AJV from being bundled when not actually used.
 *
 * Usage in package.json:
 * "resolutions": {
 *   "ajv": "@dnb/eufemia/fake-ajv@latest"
 * }
 */

// Fake AJV class that matches the interface but does nothing
class FakeAjv {
  constructor(options = {}) {
    this.options = options
    this.schemas = {}
    this.errors = []
  }

  compile(schema) {
    // Return a fake validator function that always returns true
    const validator = (data) => {
      validator.errors = []
      return true
    }
    validator.errors = []
    return validator
  }

  addSchema(schema, key) {
    if (key) {
      this.schemas[key] = schema
    }
    return this
  }

  getSchema(key) {
    return this.schemas[key] || null
  }

  removeSchema(schemaKey) {
    if (typeof schemaKey === 'string') {
      delete this.schemas[schemaKey]
    }
    return this
  }

  addKeyword(keyword, definition) {
    // No-op
    return this
  }

  addFormat(name, format) {
    // No-op
    return this
  }

  addMetaSchema(schema, key, skipValidation) {
    // No-op
    return this
  }

  validate(schemaKeyRef, data) {
    // Always return true for fake validation
    return true
  }

  getKeyword(keyword) {
    return null
  }

  removeKeyword(keyword) {
    return this
  }

  getFormat(format) {
    return null
  }

  removeFormat(name) {
    return this
  }

  removeMetaSchema(schemaKeyRef) {
    return this
  }

  defaultMeta() {
    return null
  }

  newMetaSchema(metaSchema, options) {
    return null
  }

  validateSchema(schema, logErrors) {
    return true
  }

  errorsText(errors, options) {
    return ''
  }
}

// Export the fake AJV class as default
module.exports = FakeAjv

// Also export as named export for compatibility
module.exports.default = FakeAjv

// Export ErrorObject type for TypeScript compatibility
module.exports.ErrorObject = class ErrorObject {
  constructor() {
    this.keyword = ''
    this.dataPath = ''
    this.schemaPath = ''
    this.params = {}
    this.message = ''
    this.schema = null
    this.parentSchema = null
    this.data = null
  }
}

// Create a fake instance for the /dist/2020 export pattern
const fakeInstance = new FakeAjv()

// Export for the /dist/2020 pattern used in Eufemia
module.exports['/dist/2020'] = fakeInstance
module.exports['dist/2020'] = fakeInstance
