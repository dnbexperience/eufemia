import { PropertiesTableProps } from '../../shared/types'
import { toCamelCase } from '../../shared/component-helper'

export const NumberFormatProperties: PropertiesTableProps = {
  value: {
    doc: 'A number.',
    type: 'number',
    status: 'required',
  },
  srLabel: {
    doc: 'Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.',
    type: 'string',
    status: 'optional',
  },
  locale: {
    doc: 'Use a [2 Letter Language Code](https://www.sitepoint.com/iso-2-letter-language-codes/) or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.',
    type: 'string',
    status: 'optional',
  },
  compact: {
    doc: 'Shortens any number or currency including an abbreviation. You can combine `compact` with `currency`. It gives you zero decimal by default `decimals={0}`. Use either `short` or `long`. Defaults to `short` if `true` is given.',
    type: ['boolean', 'string'],
    status: 'optional',
  },
  clean: {
    doc: 'If set to `true` a dirty string will be parsed to extract the number (`prefix -123.45 suffix` would result in e.g. `kr -123,45`).',
    type: 'boolean',
    status: 'optional',
  },
  currency: {
    doc: 'Currency code (ISO 4217) or `true` to use the default `NOK`. Uses two decimals by default.',
    type: ['string', 'boolean'],
    status: 'optional',
  },
  currency_display: {
    doc: 'Use either empty/false to hide the sign/name or use `code` (NOK), `name` (kroner), `symbol` (kr) or `narrowSymbol` (for a shorter symbol variant). Defaults to `narrowSymbol` when the locale is `no` else we default to `code`.',
    type: 'string',
    status: 'optional',
  },
  currency_position: {
    doc: 'Use either `before` or `after` to change/define the position of the currency. Defaults to `auto` (Browser API defaults, but with an exception, if the locale is `nb-NO` or `no`, use after as the default position).',
    type: 'string',
    status: 'optional',
  },
  ban: {
    doc: '**Bank Account Number**: use `true` to use the default Norwegian style (2000 12 34567) formatting.',
    type: 'boolean',
    status: 'optional',
  },
  nin: {
    doc: '**National Identification Number**: use `true` to use the default Norwegian style (180892 12345) formatting.',
    type: 'boolean',
    status: 'optional',
  },
  org: {
    doc: '**Organization Number**: use `true` to use the default Norwegian style (123 456 789) formatting. Screen readers get digit by digit.',
    type: 'boolean',
    status: 'optional',
  },
  percent: {
    doc: '**Percentage**: use `true` to enable percent formatting.',
    type: 'boolean',
    status: 'optional',
  },
  phone: {
    doc: 'Use `true` to use the default Norwegian style (22 22 22 22) of phone number formatting, regulated by the [Norwegian authority](https://lovdata.no/forskrift/2004-02-16-426/§16). More info by [Sprakradet](https://www.sprakradet.no/sprakhjelp/Skriveregler/Dato/#tlf) as well.',
    type: 'boolean',
    status: 'optional',
  },
  decimals: {
    doc: 'Set a number to define the number of decimals. Like `decimals="0"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).',
    type: 'number',
    status: 'optional',
  },
  rounding: {
    doc: 'If `omit` is given, the decimal will NOT be rounded. If set to `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.',
    type: ['omit', 'half-even', 'half-up'],
    status: 'optional',
  },
  omit_rounding: {
    doc: 'Use `rounding="omit"` instead.',
    type: 'boolean',
    status: 'deprecated',
  },
  prefix: {
    doc: 'Add a string or React component before the number, including white space.',
    type: 'React.Node',
    status: 'optional',
  },
  suffix: {
    doc: 'Appends a string or React component after the number, including white space.',
    type: 'React.Node',
    status: 'optional',
  },
  selectall: {
    doc: 'Use `false` to disable the auto select all on the first click. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  always_selectall: {
    doc: 'Use `true` to always auto select all on the first click. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  copy_selection: {
    doc: 'Use `false` to disable the auto copy feature. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  clean_copy_value: {
    doc: 'If set to `true` the copy&paste value will be provided without e.g. a currency sign or a percent sign. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  link: {
    doc: 'Use `tel` or `sms` to enable a clickable / touchable anchor link.',
    type: 'string',
    status: 'optional',
  },
  monospace: {
    doc: 'Sets the font to [DNB Mono Regular](/quickguide-designer/fonts/#dnbmono-regular).',
    type: 'boolean',
    status: 'optional',
  },
  element: {
    doc: 'Define what HTML element should be used. Defaults to `<span>`.',
    type: 'string',
    status: 'optional',
  },
  options: {
    doc: "Accepts all [number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options as an object - can also be a JSON given as the parameter e.g. `options={{ 'minimumFractionDigits': 2 }}`.",
    type: 'object',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  tooltip: {
    doc: 'Provide a string or a React Element to be shown as the tooltip content.',
    type: 'React.Node',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const NumberFormatPropertiesCamelCase: PropertiesTableProps =
  Object.fromEntries(
    Object.entries(NumberFormatProperties).map(([k, v]) => [
      toCamelCase(k),
      v,
    ])
  )
