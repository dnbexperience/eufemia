const assert = require('assert')
const { isCI } = require('./node-utils')

assert(isCI === true, 'isCI should be ture')
