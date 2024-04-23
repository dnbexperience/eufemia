import { PropertiesTableProps } from '../../../../shared/types'

export const PushButtonProperties: PropertiesTableProps = {
  pushValue: {
    doc: 'The element to add to the array when the button is clicked. Can be a function to returns the push value.',
    type: 'unknown',
    status: 'optional',
  },
  '[Button](/uilib/components/button/properties)': {
    doc: 'All button properties.',
    type: 'Various',
    status: 'optional',
  },
}

export const PushButtonEvents: PropertiesTableProps = {}
