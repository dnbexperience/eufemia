import { PropertiesTableProps } from '../../shared/types'

export const ListFormatProperties: PropertiesTableProps = {
  value: {
    doc: 'The value to format.',
    type: ['Array<React.ReactNode>'],
    status: 'optional',
  },
  children: {
    doc: 'The children to format.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  format: {
    doc: 'Formatting options for the value. See the [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat) documentation.',
    type: 'Intl.ListFormatOptions',
    status: 'optional',
  },
  variant: {
    doc: 'Defines if the value should be displayed in list format, or regular text format on one line. Defaults to `text`',
    type: ['ol', 'ul', 'text'],
    status: 'optional',
  },
  listType: {
    doc: 'Defines the type of list styling used for list variants. Used together with variant `ol` and `ul`. Variant `ol`: `a`, `A`, `i`, `I` and `1`. Variant `ul`: `circle`, `disc` and `square`. Defaults to `undefined`',
    type: [
      'a',
      'A',
      'i',
      'I',
      '1',
      'circle',
      'disc',
      'square',
      'undefined',
    ],
    status: 'optional',
  },
}
