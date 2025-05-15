import { PropertiesTableProps } from '../../shared/types'

export const inputMaskedProperties: PropertiesTableProps = {
  as_number: {
    doc: 'Set to `true` to automatically set a number mask based on the given or inherited locale.',
    type: 'boolean',
    status: 'optional',
  },
  as_percent: {
    doc: 'Set to `true` to automatically set a number mask with a percentage sign based on the given or inherited locale.',
    type: 'boolean',
    status: 'optional',
  },
  as_currency: {
    doc: 'Set to `true` to use `NOK` or give it a currency code e.g. `USD` to automatically set a currency mask based on the given or inherited locale.',
    type: 'boolean',
    status: 'optional',
  },
  mask_options: {
    doc: 'Use it to manipulate internal masks. You can use it instead of e.g. `number_mask` or `currency_mask`. All options are listed below.',
    type: 'object',
    status: 'optional',
  },
  number_mask: {
    doc: 'Set to `true` to enable the default numbers formatting – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default.',
    type: ['boolean', 'object'],
    status: 'optional',
  },
  currency_mask: {
    doc: 'Set to `true` or set the _valuta_ (currency_mask="kr") to enable a custom currency mask – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default. Defaults to `kr`.',
    type: ['boolean', 'object'],
    status: 'optional',
  },
  number_format: {
    doc: 'Use an object with [NumberFormat](/uilib/components/number-format/properties).',
    type: 'object',
    status: 'optional',
  },
  locale: {
    doc: 'Define the locale to be used in the `as_number` or `as_currency` masked. It will be inherited from the [Eufemia Provider](/uilib/usage/customisation/provider) if not given. Defaults to `nb-NO`.',
    type: 'string',
    status: 'optional',
  },
  mask: {
    doc: 'A mask can be defined both as a [RegExp style of characters](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme) or a callback function. Example below. Defaults to number mask.',
    type: ['RegExp', 'function'],
    status: 'optional',
  },
  show_mask: {
    doc: 'Show mask when input is empty and has no focus. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  show_guide: {
    doc: "When `false` is given, it doesn't print out placeholder characters and only adds mask characters when the user reaches them as they're typing. Defaults to `true`.",
    type: 'boolean',
    status: 'optional',
  },
  placeholder_char: {
    doc: 'The placeholder character represents the fillable spot in the mask (e.g. `_`). Defaults to invisible space.',
    type: 'string',
    status: 'optional',
  },
  keep_char_positions: {
    doc: 'When `true`, adding or deleting characters will not affect the positions of existing characters. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
  '[Input](/uilib/components/input/properties)': {
    doc: 'All `Input` properties are supported.',
    type: 'Various',
    status: 'optional',
  },
}

export const inputMaskedEvents: PropertiesTableProps = {
  on_change: {
    doc: 'will be called on value changes made by the user. Returns an object with the value as a string and the native event: `{ value, numberValue, cleanedValue, event }`.',
    type: 'function',
    status: 'optional',
  },
  '[Input](/uilib/components/input/events)': {
    doc: 'All `Input` events are supported.',
    type: 'Various',
    status: 'optional',
  },
}

export const inputMaskedMaskOptionsProperties: PropertiesTableProps = {
  prefix: {
    doc: 'What to display before the amount. Defaults to an empty string.',
    type: 'string',
    status: 'optional',
  },
  suffix: {
    doc: 'What to display after the amount. Defaults to an empty string.',
    type: 'string',
    status: 'optional',
  },
  includeThousandsSeparator: {
    doc: 'Whether or not to separate thousands. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  thousandsSeparatorSymbol: {
    doc: "Character with which to separate thousands. Defaults to `' '`.",
    type: 'string',
    status: 'optional',
  },
  allowDecimal: {
    doc: 'Whether or not to allow the user to enter a fraction with the amount. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  decimalSymbol: {
    doc: "Character that will act as a decimal point. Defaults to `','`.",
    type: 'string',
    status: 'optional',
  },
  decimalLimit: {
    doc: 'How many digits to allow after the decimal. Defaults to `2`.',
    type: 'number',
    status: 'optional',
  },
  integerLimit: {
    doc: 'Limit the length of the integer number. Defaults to `null` for unlimited.',
    type: 'number',
    status: 'optional',
  },
  requireDecimal: {
    doc: 'Whether or not to always include a decimal point and placeholder for decimal digits after the integer. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  allowNegative: {
    doc: 'Whether or not to allow negative numbers. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  disallowLeadingZeroes: {
    doc: 'Whether or not to disallow leading zeroes. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
}
