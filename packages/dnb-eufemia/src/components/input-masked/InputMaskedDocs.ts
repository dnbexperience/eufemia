import { PropertiesTableProps } from '../../shared/types'

export const InputMaskedProperties: PropertiesTableProps = {
  as_number: {
    doc: 'Set to `true` to automatically set a number mask based on the given or inherited locale.',
    type: 'boolean',
    state: 'optional',
  },
  as_percent: {
    doc: 'Set to `true` to automatically set a number mask with a percentage sign based on the given or inherited locale.',
    type: 'boolean',
    state: 'optional',
  },
  as_currency: {
    doc: 'Set to `true` to use `NOK` or give it a currency code e.g. `USD` to automatically set a currency mask based on the given or inherited locale.',
    type: 'boolean',
    state: 'optional',
  },
  mask_options: {
    doc: 'Use it to manipulate internal masks. You can use it instead of e.g. `number_mask` or `currency_mask`. All options are listed below.',
    type: 'object',
    state: 'optional',
  },
  number_mask: {
    doc: 'Set to `true` to enable the default numbers formatting – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default.',
    type: ['boolean', 'object'],
    state: 'optional',
  },
  currency_mask: {
    doc: 'Set to `true` or set the _valuta_ (currency_mask="kr") to enable a custom currency mask – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default. Defaults to `kr`.',
    type: ['boolean', 'object'],
    state: 'optional',
  },
  number_format: {
    doc: 'Use an object with [NumberFormat](/uilib/components/number-format/properties) e.g. `{ omit_rounding: false }`.',
    type: 'object',
    state: 'optional',
  },
  locale: {
    doc: 'Define the locale to be used in the `as_number` or `as_currency` masked. It will be inherited from the [Eufemia Provider](/uilib/usage/customisation/provider) if not given. Defaults to `nb-NO`.',
    type: 'string',
    state: 'optional',
  },
  mask: {
    doc: 'A mask can be defined both as a [RegExp style of characters](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme) or a callback function. Example below.',
    type: ['RegExp', 'function'],
    state: 'optional',
  },
  show_mask: {
    doc: 'Show mask when input is empty and has no focus. Defaults to `false`.',
    type: 'boolean',
    state: 'optional',
  },
  show_guide: {
    doc: "When `false` is given, it doesn't print out placeholder characters and only adds mask characters when the user reaches them as they're typing. Defaults to `true`.",
    type: 'boolean',
    state: 'optional',
  },
  placeholder_char: {
    doc: 'The placeholder character represents the fillable spot in the mask (e.g. `_`). Defaults to invisible space.',
    type: 'string',
    state: 'optional',
  },
  keep_char_positions: {
    doc: 'When `true`, adding or deleting characters will not affect the positions of existing characters. Defaults to `false`.',
    type: 'boolean',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
  '[Input](/uilib/components/input/properties)': {
    doc: 'All `Input` properties are supported.',
    type: 'Various',
    state: 'optional',
  },
}

export const InputMaskedEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called on value changes made by the user. Returns an object with the value as a string and the native event: `{ value, numberValue, cleanedValue, event }`.',
    type: 'function',
    state: 'optional',
  },
  '[Input](/uilib/components/input/properties)': {
    doc: 'All `Input` properties are supported.',
    type: 'Various',
    state: 'optional',
  },
}
