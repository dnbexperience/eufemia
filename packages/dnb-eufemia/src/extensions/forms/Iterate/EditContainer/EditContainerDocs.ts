import { PropertiesTableProps } from '../../../../shared/types'

export const EditContainerProperties: PropertiesTableProps = {
  title: {
    doc: 'The title of the container.',
    type: 'React.Node',
    status: 'optional',
  },
  titleWhenNew: {
    doc: 'The title for a new item.',
    type: 'React.Node',
    status: 'optional',
  },
  variant: {
    doc: 'Defines the variant of the container. Can be `outline`, `filled` or `basic`. Defaults to `outline`.',
    type: 'string',
    status: 'optional',
  },
  toolbar: {
    doc: 'An alternative toolbar to be shown in the container.',
    type: 'React.Node',
    status: 'optional',
  },
  toolbarVariant: {
    doc: 'Use variants to render the toolbar differently. Currently there are the `minimumOneItem` and `custom` variants. See the info section for more info.',
    type: 'string',
    status: 'optional',
  },
  open: {
    doc: 'If the container should be open or not. This is taken care of internally by default.',
    type: 'boolean',
    status: 'optional',
  },
  '[FlexVertical](/uilib/layout/flex/container/properties)': {
    doc: 'All Flex.Vertical properties.',
    type: 'Various',
    status: 'optional',
  },
}

export const EditContainerEvents: PropertiesTableProps = {}
