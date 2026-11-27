import type { PropertiesTableProps } from '../../../../shared/types'
import { StringProperties } from '../String/StringDocs'

export const NameProperties: PropertiesTableProps = {
  ...StringProperties,
  onBlurValidatorMode: {
    doc: 'For personal names, `extend` runs your callback after the built-in pattern passes. Use `replace` to run your callback instead. Without a callback, the pattern still applies.',
    type: ['"extend"', '"replace"'],
    status: 'optional',
  },
  minLength: {
    ...StringProperties.minLength,
    doc: 'Validation for minimum length of the text (number of characters). Defaults to `1`, and `3` for `Field.Name.Company`.',
  },
}

export const NameEvents: PropertiesTableProps = {
  onBlurValidator: {
    doc: 'A synchronous or asynchronous callback for blur and submit. By default the built-in pattern must pass first. The callback receives the value and validation arguments, including `validators.nameValidator` for personal names or `validators.companyValidator` for companies. Use `false` to turn off blur validation; required and length checks are separate.',
    type: ['function', 'false'],
    status: 'optional',
  },
}
