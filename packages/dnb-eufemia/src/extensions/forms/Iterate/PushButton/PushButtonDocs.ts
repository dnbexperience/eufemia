import { PropertiesTableProps } from '../../../../shared/types'

export const PushButtonProperties: PropertiesTableProps = {
  path: {
    doc: 'The path to the array to add the new item to.',
    type: 'string',
    status: 'required',
  },
  itemPath: {
    doc: 'The path to the item in a nested array, to add the new item to.',
    type: 'string',
    status: 'optional',
  },
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
