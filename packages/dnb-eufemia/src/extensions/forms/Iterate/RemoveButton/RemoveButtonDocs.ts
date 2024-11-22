import { PropertiesTableProps } from '../../../../shared/types'

export const RemoveButtonProperties: PropertiesTableProps = {
  confirmRemove: {
    doc: 'Use `true` to show a confirmation dialog before removing the item.',
    type: 'boolean',
    status: 'optional',
  },
  '[Button](/uilib/components/button/properties)': {
    doc: 'All button properties.',
    type: 'Various',
    status: 'optional',
  },
}

export const RemoveButtonEvents: PropertiesTableProps = {}
