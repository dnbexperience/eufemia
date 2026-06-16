import type { PropertiesTableProps } from '../../../../shared/types'

export const InstallmentDateProperties: PropertiesTableProps = {
  width: {
    doc: 'The width of the component. Defaults to `small`.',
    type: 'string',
    status: 'optional',
  },
  size: {
    doc: 'The size of the component.',
    type: 'string',
    status: 'optional',
  },
  days: {
    doc: 'Constrains which days are available for selection. When not provided, days 1\u201328 are shown.',
    type: 'number[]',
    status: 'optional',
  },
  showLastDay: {
    doc: 'If set to `true`, a "Last day of month" option is appended to the list. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  variant: {
    doc: "The display variant. `'dropdown'` renders a dropdown menu, `'tiles'` renders a grid of toggle buttons. Defaults to `'dropdown'`.",
    type: [`'dropdown'`, `'tiles'`],
    status: 'optional',
  },
}
