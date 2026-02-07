import { RuleTester } from 'eslint'
import rule from '../rules/warn-supported-types'
import {
  warningValidCases,
  warningInvalidCases,
} from './supported-types.fixtures'

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
})

ruleTester.run('warn-supported-types', rule, {
  valid: warningValidCases,
  invalid: warningInvalidCases,
})
