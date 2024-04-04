import { PropertiesTableProps } from '../../../../shared/types'

export const SubmitButtonProperties: PropertiesTableProps = {
  variant: {
    doc: 'Use `send` to show the send icon.',
    type: 'string',
    status: 'optional',
  },
  showIndicator: {
    doc: 'Show the submit indicator.',
    type: 'boolean',
    status: 'optional',
  },
  '[Button](/uilib/components/button/properties)': {
    doc: 'All button properties.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
