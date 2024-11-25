import { PropertiesTableProps } from '../../../../../shared/types'

export const ViewContainerProperties: PropertiesTableProps = {
  title: {
    doc: 'The title of the container.',
    type: 'React.Node',
    status: 'optional',
  },
  variant: {
    doc: 'Defines the variant of the container. Can be `outline`, `filled` or `basic`. Defaults to `outline`.',
    type: 'string',
    status: 'optional',
  },
  '[FlexVertical](/uilib/layout/flex/container/properties)': {
    doc: 'All Flex.Vertical properties.',
    type: 'Various',
    status: 'optional',
  },
}

export const ViewContainerEvents: PropertiesTableProps = {
  onEdit: {
    doc: 'Callback for the edit button.',
    type: 'Function',
    status: 'optional',
  },
}
