import { PropertiesTableProps } from '../../../../shared/types'

export const SubmitButtonProperties: PropertiesTableProps = {
  showIndicator: {
    doc: 'Show the submit indicator.',
    type: 'boolean',
    state: 'required',
  },
  children: {
    doc: 'Button text.',
    type: 'React.Node',
    state: 'required',
  },
  '[Button](/uilib/components/button/properties)': {
    doc: 'All button properties.',
    type: 'Various',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}
