import { inputProperties } from '../../../../components/input/InputDocs'
import { PropertiesTableProps } from '../../../../shared/types'

export const numberProperties: PropertiesTableProps = {
  decimalLimit: {
    doc: 'Max number of decimals. Values with more decimals will be rounded. Defaults to `12`.',
    type: 'number',
    status: 'optional',
  },
  percent: {
    doc: 'Format a number as percentage.',
    type: 'boolean',
    status: 'optional',
  },
  currency: {
    doc: 'Currency code (ISO 4217) or `true` to use the default `NOK`. Uses two decimals by default.',
    type: ['boolean', 'string'],
    status: 'optional',
  },
  allowNegative: {
    doc: 'Whether or not to allow negative numbers. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  disallowLeadingZeroes: {
    doc: 'Whether or not to allow leading zeroes. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  minimum: {
    doc: 'Validation for inclusive minimum number value (greater than or equal). Defaults to `Number.MIN_SAFE_INTEGER`.',
    type: 'number',
    status: 'optional',
  },
  maximum: {
    doc: 'Validation for inclusive maximum number value (less than or equal). Defaults to `Number.MAX_SAFE_INTEGER`.',
    type: 'number',
    status: 'optional',
  },
  exclusiveMinimum: {
    doc: 'Validation for exclusive minimum number value (greater than).',
    type: 'number',
    status: 'optional',
  },
  exclusiveMaximum: {
    doc: 'Validation for exclusive maximum number value (less than).',
    type: 'number',
    status: 'optional',
  },
  multipleOf: {
    doc: 'Validation that requires the number to be a multiple of given value.',
    type: 'number',
    status: 'optional',
  },
  width: {
    doc: '`false` for no width (use browser default), `small`, `medium` or `large` for predefined standard widths, `stretch` for fill available width.',
    type: ['string', 'false'],
    status: 'optional',
  },
  size: {
    ...inputProperties.size,
    doc: `${inputProperties.size} Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).`,
  },
  align: {
    doc: 'Lateral alignment of contents of input field, one of `left` (default), `center`, or `right`.',
    type: 'string',
    status: 'optional',
  },
  autoComplete: {
    doc: 'For HTML `autocomplete` attributes.',
    type: ['on', 'string'],
    status: 'optional',
  },
  prefix: {
    doc: 'Text added before the value input.',
    type: 'string',
    status: 'optional',
  },
  suffix: {
    doc: 'Text added after the value input.',
    type: 'string',
    status: 'optional',
  },
  step: {
    doc: 'Determines step granularity when in/decreasing value input through step controls buttons or arrow keys. Defaults to 1.',
    type: 'number',
    status: 'optional',
  },
  startWith: {
    doc: 'When no `value` or `defaultValue` is given, start with a given value when in/decreasing value input through step controls buttons or arrow keys. Defaults to `null`.',
    type: 'number',
    status: 'optional',
  },
  showStepControls: {
    doc: 'Show buttons that in/decreases value input by the step value.',
    type: 'boolean',
    status: 'optional',
  },
}
