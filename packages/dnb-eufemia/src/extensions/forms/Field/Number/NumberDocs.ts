import { InputProperties } from '../../../../components/input/InputDocs'
import type { PropertiesTableProps } from '../../../../shared/types'

export const NumberProperties: PropertiesTableProps = {
  decimalLimit: {
    doc: 'Max number of decimals. Values with more decimals will be rounded. Defaults to `12`.',
    type: 'number',
    status: 'optional',
  },
  percent: {
    doc: 'Format a number as a percentage.',
    type: 'boolean',
    status: 'optional',
  },
  currency: {
    doc: 'Currency code (ISO 4217) or `true` to use the default `NOK`. Uses two decimals by default.',
    type: ['boolean', 'string'],
    status: 'optional',
  },
  currencyDisplay: {
    doc: 'How to display the currency symbol: `code` (e.g., USD), `symbol` (e.g., $), `narrowSymbol`, or `name`. Use `false` to hide it.',
    type: ['"code"', '"symbol"', '"narrowSymbol"', '"name"', 'false'],
    status: 'optional',
  },
  allowNegative: {
    doc: 'Whether or not to allow negative numbers. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  disallowLeadingZeroes: {
    doc: 'Whether or not to allow leading zeroes during typing. Defaults to `false`.',
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
    doc: 'Validation that requires the number to be a multiple of a given value.',
    type: 'number',
    status: 'optional',
  },
  width: {
    doc: '`false` for no width (use browser default), `small`, `medium` or `large` for predefined standard widths, `stretch` to fill available width. You can also set a custom width `{number}rem`.',
    type: ['string', 'false'],
    status: 'optional',
  },
  size: {
    ...InputProperties.size,
    doc: 'The sizes you can choose are `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem). Defaults to `default`. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).',
  },
  align: {
    doc: 'Lateral alignment of contents of input field, one of `left` (default), `center`, or `right`.',
    type: ['"left"', '"center"', '"right"'],
    status: 'optional',
  },
  autoComplete: {
    doc: 'For HTML `autocomplete` attributes.',
    type: ['"on"', 'string'],
    status: 'optional',
  },
  placeholder: {
    doc: 'Text showing in place of the value if no value is given.',
    type: 'string',
    status: 'optional',
  },
  prefix: {
    doc: 'Text added before the value input. Can also be a function that receives the value and returns the text.',
    type: ['string', 'function'],
    status: 'optional',
  },
  suffix: {
    doc: 'Text added after the value input. Can also be a function that receives the value and returns the text.',
    type: ['string', 'function'],
    status: 'optional',
  },
  step: {
    doc: 'Determines step granularity when increasing/decreasing the value via step control buttons or arrow keys. Defaults to `1`.',
    type: 'number',
    status: 'optional',
  },
  startWith: {
    doc: 'When no `value` or `defaultValue` is given, start with a given value when increasing/decreasing the value via step control buttons or arrow keys. Defaults to `null`.',
    type: 'number',
    status: 'optional',
  },
  showStepControls: {
    doc: 'Show buttons that increase/decrease the value by the step amount.',
    type: 'boolean',
    status: 'optional',
  },
  mask: {
    doc: 'Input mask, in the same format as the `mask` property of [InputMasked](/uilib/components/input-masked/properties). When given, it is used instead of the default number mask. It has no effect together with `currency` or `percent`.',
    type: ['RegExp', 'Array<RegExp | string>'],
    status: 'optional',
  },
  inputClassName: {
    doc: 'Class name set on the input wrapper (`.dnb-input`) that contains the `<input>` element.',
    type: 'string',
    status: 'optional',
  },
}

export const NumberEvents: PropertiesTableProps = {
  onKeyDown: {
    doc: 'Will be called when a key is pressed while the input has focus. Call `event.preventDefault()` to keep the key from being typed, e.g. to set the value with a keyboard shortcut. Check `event.metaKey` and `event.ctrlKey` to leave browser shortcuts alone. With `showStepControls`, the arrow keys step the value before it is called.',
    type: '(event: React.KeyboardEvent<HTMLInputElement>) => void',
    status: 'optional',
  },
}
