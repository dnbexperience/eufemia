import type { PropertiesTableProps } from '../../../../shared/types'

export const InstallmentDayProperties: PropertiesTableProps = {
  width: {
    doc: '`small`, `medium` or `large` (default) for predefined standard widths, `stretch` for fill available width.',
    type: ['string', 'false'],
    status: 'optional',
  },
  size: {
    doc: 'The sizes you can choose are `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem). Defaults to `default` / `null`. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).',
    type: ['"small"', '"default"', '"medium"', '"large"'],
    status: 'optional',
  },
  days: {
    doc: 'Constrains which days are available for selection. When not provided, days 1\u201328 are shown. If the current `value` is not among them, it is still shown and added to the list.',
    type: 'Array<number>',
    status: 'optional',
  },
  showLastDay: {
    doc: 'If set to `true`, a "Last day of month" option is appended to the list. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
}
