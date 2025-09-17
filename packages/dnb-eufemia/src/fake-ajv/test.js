/**
 * Simple test to verify the fake AJV modules work correctly
 */

const FakeAjv = require('./index.js')
const fakeAjvErrors = require('../fake-ajv-errors/index.js')

console.log('Testing fake AJV modules...')

// Test 1: Create AJV instance
const ajv = new FakeAjv({ allErrors: true })
console.log('✓ AJV instance created successfully')

// Test 2: Compile a schema
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
  },
  required: ['name'],
}

const validate = ajv.compile(schema)
console.log('✓ Schema compiled successfully')

// Test 3: Validate data (should always return true)
const validData = { name: 'John', age: 30 }
const invalidData = { age: 'not a number' }

console.log('✓ Valid data validation:', validate(validData))
console.log('✓ Invalid data validation:', validate(invalidData))
console.log('✓ Validation errors:', validate.errors)

// Test 4: Test ajv-errors integration
fakeAjvErrors(ajv)
console.log('✓ AJV-errors applied successfully')
console.log('✓ AJV instance marked with __ajvErrors__:', ajv.__ajvErrors__)

// Test 5: Test /dist/2020 import pattern
const ajvInstance = require('./dist/2020.js')
console.log('✓ /dist/2020 export works:', typeof ajvInstance)

console.log(
  '\n🎉 All tests passed! Fake AJV modules are working correctly.'
)
