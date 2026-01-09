import type { PropertiesTableProps } from '../../../../../shared/types'

export const ToolbarProperties: PropertiesTableProps = {
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: 'Various',
    status: 'optional',
  },
}

export const ToolbarEvents: PropertiesTableProps = {
  onEdit: {
    doc: 'Callback for the edit button.',
    type: 'Function',
    status: 'optional',
  },
  onDone: {
    doc: 'Callback for the done button.',
    type: 'Function',
    status: 'optional',
  },
  onCancel: {
    doc: 'Callback for the cancel button.',
    type: 'Function',
    status: 'optional',
  },
}
