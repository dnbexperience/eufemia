import { PropertiesTableProps } from '../../../../shared/types'

export const SubmitIndicatorProperties: PropertiesTableProps = {
  state: {
    doc: 'Provide `pending` to make the dots visible and `success` to show the checkmark icon.',
    type: 'string',
    status: 'required',
  },
  children: {
    doc: 'If content is provided, the component will try to find out if the indicator needs to be put on a new row or not. This way it will animate the height nicely.',
    type: 'React.Node',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
