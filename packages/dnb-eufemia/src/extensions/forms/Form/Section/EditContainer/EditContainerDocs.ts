import { PropertiesTableProps } from '../../../../../shared/types'

export const EditContainerProperties: PropertiesTableProps = {
  title: {
    doc: 'The title of the container.',
    type: 'React.Node',
    status: 'optional',
  },
  variant: {
    doc: 'Defines the variant of the container. Can be `outline` or `basic`. Defaults to `outline`.',
    type: 'string',
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
    type: 'Function',
    status: 'optional',
  },
  onCancel: {
    doc: 'Callback for the cancel button.',
    type: 'Function',
    status: 'optional',
  },
}
