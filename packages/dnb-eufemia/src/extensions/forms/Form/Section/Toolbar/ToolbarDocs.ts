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
    doc: 'Callback for the done button. When it returns a Promise, the section stays in edit mode until the Promise resolves. If it rejects, the section stays in edit mode.',
    type: '() => void | Promise<unknown>',
    status: 'optional',
  },
  onCancel: {
    doc: 'Callback for the cancel button.',
    type: 'function',
    status: 'optional',
  },
}
