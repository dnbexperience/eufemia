import type { PropertiesTableProps } from '../../../../../shared/types'

export const EditContainerProperties: PropertiesTableProps = {
  title: {
    doc: 'The title of the container.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  variant: {
    doc: 'Defines the variant of the container. Can be `outline`, `filled` or `basic`. Defaults to `outline`.',
    type: ['"outline"', '"filled"', '"basic"'],
    status: 'optional',
  },
  preventUncommittedChanges: {
    doc: 'Prevents form submission and Wizard navigation while the section is in edit mode, until the Done or Cancel button is selected. Requires Form.Section to have a path.',
    type: 'boolean',
    status: 'optional',
  },

  '[FlexVertical](/uilib/layout/flex/container/properties)': {
    doc: 'All Flex.Vertical properties.',
    type: 'Various',
    status: 'optional',
  },
}

export const EditContainerEvents: PropertiesTableProps = {
  onDone: {
    doc: 'Callback for the done button.',
    type: 'function',
    status: 'optional',
  },
  onCancel: {
    doc: 'Callback for the cancel button.',
    type: 'function',
    status: 'optional',
  },
}
