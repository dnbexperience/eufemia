import { PropertiesTableProps } from '../../../../shared/types'

export const DateProperties: PropertiesTableProps = {
  variant: {
    doc: 'Defines the variant of the date. Can be `long`, `short` or `numeric`. Defaults to `long`.',
    type: 'string',
    status: 'optional',
  },
  locale: {
    doc: 'Defines the locale of the date. Defaults to `nb-NO`.',
    type: 'string',
    status: 'optional',
  },
}
