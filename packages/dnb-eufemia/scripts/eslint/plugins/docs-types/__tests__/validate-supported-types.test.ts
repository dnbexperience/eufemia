import { RuleTester } from 'eslint'
import { invalidCases, validCases } from './supported-types.fixtures'
import rule from '../rules/validate-supported-types'

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
})

tester.run('validate-supported-types', rule, {
  valid: validCases,
  invalid: invalidCases,
})
