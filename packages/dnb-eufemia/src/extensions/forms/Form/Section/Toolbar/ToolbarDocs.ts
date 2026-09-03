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
    type: 'function',
    status: 'optional',
  },
  onDone: {
    doc: 'Callback for the done button. Return a Promise to keep the section in edit mode until it settles: it switches to view mode when the Promise resolves, and stays in edit mode when it rejects. Any other return value is ignored.',
    type: 'function',
    status: 'optional',
  },
  onCancel: {
    doc: 'Callback for the cancel button.',
    type: 'function',
    status: 'optional',
  },
}
