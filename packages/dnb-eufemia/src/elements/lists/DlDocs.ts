import { PropertiesTableProps } from '../../shared/types'
import { ElementProperties } from './../ElementDocs'

export const DlProperties: PropertiesTableProps = {
  layout: {
    doc: 'Sets the layout of the list. Can be `vertical`, `horizontal` or `grid`. Defaults to `vertical`.',
    type: 'string',
    status: 'optional',
  },

  ...ElementProperties,
}
