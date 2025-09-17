/**
 * Fake AJV /dist/2020 export for yarn resolutions
 * This handles the specific import pattern used in Eufemia: ajv/dist/2020
 */

const FakeAjv = require('../index.js')

// Create a fake instance for the /dist/2020 export pattern
const fakeInstance = new FakeAjv()

// Export the instance as default (this is what Eufemia imports)
module.exports = fakeInstance

// Also export the class and ErrorObject for compatibility
module.exports.default = fakeInstance
module.exports.ErrorObject = FakeAjv.ErrorObject
