import { PropertiesTableProps } from '../../../../shared/types'

export const PushButtonProperties: PropertiesTableProps = {
  pushValue: {
    doc: 'The item to add to the array when the button is clicked. Can be a function that returns the push item.',
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
