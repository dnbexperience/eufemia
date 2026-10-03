import type { PropertiesTableProps } from '../../../../shared/types'

export const SubmitButtonProperties: PropertiesTableProps = {
  variant: {
    doc: 'Use `send` to show the send icon, or `secondary` for secondary button styling.',
    type: ['"send"', '"secondary"'],
    status: 'optional',
  },
  showIndicator: {
    doc: 'Show the submit indicator.',
    type: 'boolean',
    status: 'optional',
  },
  '[Button](/uilib/components/button/properties)': {
    doc: 'All button properties. A given `onClick` runs before the form is submitted, instead of replacing the submit.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
