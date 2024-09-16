import { PropertiesTableProps } from '../../../../shared/types'

export const ArraySelectionProperties: PropertiesTableProps = {
  format: {
    doc: 'Formatting options for the value. See the [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat) documentation.',
    type: 'Intl.ListFormatOptions',
    status: 'optional',
  },
  variant: {
    doc: 'Defines if the the value should be displayed in list format, or reuglar text format on one line. Defaults to `text`',
    type: ['ol', 'ul', 'text'],
    status: 'optional',
  },
}
