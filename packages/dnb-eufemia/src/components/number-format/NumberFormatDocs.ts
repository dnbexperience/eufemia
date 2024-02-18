import { PropertiesTableProps } from '../../shared/types'

export const NumberFormatProperties: PropertiesTableProps = {
  value: {
    doc: 'a number.',
    type: 'unknown',
    state: 'required',
  },
  children: {
    doc: 'a number.',
    type: 'unknown',
    state: 'required',
  },
  srLabel: {
    doc: 'Will add a visually hidden label to give screen reader users the missing context to understand easier what the number represents.',
    type: 'unknown',
    state: 'optional',
  },
  locale: {
    doc: 'Use a <a href="https://www.sitepoint.com/iso-2-letter-language-codes/">2 Letter Language Codes</a> or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.',
    type: 'unknown',
    state: 'optional',
  },
  compact: {
    doc: 'Shortens any number or currency including an abbreviation. You can combine `compact` with `currency`. It gives you zero decimal by default `decimals={0}`. Use either `short` or `long`. Defaults to `short` if `true` is given.',
    type: 'unknown',
    state: 'optional',
  },
  clean: {
    doc: 'If set to `true` a dirty string will be parsed to to extract the number (`prefix -123.45 suffix` would result in e.g. `kr -123,45`).',
    type: 'unknown',
    state: 'optional',
  },
  currency: {
    doc: 'Currency code (ISO 4217) or `true` to use the default `NOK`. Uses two decimals by default.',
    type: 'unknown',
    state: 'optional',
  },
  currency_display: {
    doc: 'Use either empty/false to hide the sign/name or use `code` (NOK), `name` (kroner) , `symbol` (kr) or `narrowSymbol` (for a shorter symbol variant). Defaults to `narrowSymbol` when the locale is `no` else we default to `code`.',
    type: 'unknown',
    state: 'optional',
  },
  currency_position: {
    doc: 'Use either `before` or `after` to change/define the position of the currency. Defaults to `auto` (Browser API defaults, but with an exception, if the locale is `nb-NO` or `no`, use after as the default position).',
    type: 'unknown',
    state: 'optional',
  },
  ban: {
    doc: '"Bank Account Number": use `true` to use the default Norwegian style (2000 12 34567) formatting.',
    type: 'unknown',
    state: 'optional',
  },
  nin: {
    doc: '"National Identification Number": use `true` to use the default Norwegian style (180892 12345) formatting.',
    type: 'unknown',
    state: 'optional',
  },
  org: {
    doc: '"Organization Number": use `true` to use the default Norwegian style (123 456 789) formatting. Screen readers get digit by digit.',
    type: 'unknown',
    state: 'optional',
  },
  percent: {
    doc: '"Percentage": use `true` to enable percent formatting.',
    type: 'unknown',
    state: 'optional',
  },
  phone: {
    doc: 'Use `true` to use the default Norwegian style (22 22 22 22) of phone number formatting, regulated by the <a href="https://lovdata.no/forskrift/2004-02-16-426/§16">Norwegian authority</a>. More info by <a href="https://www.sprakradet.no/sprakhjelp/Skriveregler/Dato/#tlf">Sprakradet</a> as well.',
    type: 'unknown',
    state: 'optional',
  },
  decimals: {
    doc: 'Set a number to define the number of decimals. Like `decimals="0"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).',
    type: 'unknown',
    state: 'optional',
  },
  omit_rounding: {
    doc: 'If set to `true`, the decimal will NOT be rounded. Normally, by using `toFixed` or by using `maximumFractionDigits`, decimals get rounded.',
    type: 'unknown',
    state: 'optional',
  },
  prefix: {
    doc: 'Add a string or React component before the number, including white space.',
    type: 'unknown',
    state: 'optional',
  },
  suffix: {
    doc: 'Appends a string or React component after the number, including white space.',
    type: 'unknown',
    state: 'optional',
  },
  selectall: {
    doc: 'Use `false` to disable the auto select all on the first click. Defaults to `true`.',
    type: 'unknown',
    state: 'optional',
  },
  always_selectall: {
    doc: 'Use `true` to always auto select all on the first click. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  copy_selection: {
    doc: 'Use `false` to disable the auto copy feature. Defaults to `true`.',
    type: 'unknown',
    state: 'optional',
  },
  clean_copy_value: {
    doc: 'If set to `true` the copy&paste value will be provided without e.g. a currency sign or a percent sign. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  link: {
    doc: 'Use `tel` or `sms` to enable a clickable / touchable anchor link.',
    type: 'unknown',
    state: 'optional',
  },
  element: {
    doc: 'Define what HTML element should be used. Defaults to `<span>`.',
    type: 'unknown',
    state: 'optional',
  },
  options: {
    doc: 'Accepts all <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString">number.toLocaleString</a> or <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat">Intl.NumberFormat</a> options as an object - can also be a JSON given as the parameter e.g. `options={{ &#39;minimumFractionDigits&#39;: 2 }}`.',
    type: 'unknown',
    state: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'unknown',
    state: 'optional',
  },
  tooltip: {
    doc: 'Provide a string or a React Element to be shown as the tooltip content.',
    type: 'unknown',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}
