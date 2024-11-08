import { PropertiesTableProps } from '../../shared/types'

export const FlexStackProperties: PropertiesTableProps = {
  direction: {
    doc: 'Defaults to `vertical`.',
    type: 'string',
    status: 'optional',
  },
  align: {
    doc: 'Defaults to `stretch`.',
    type: 'string',
    status: 'optional',
  },
  '[Flex.Container](/uilib/layout/flex/container/properties)': {
    doc: 'Flex.Container properties.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
