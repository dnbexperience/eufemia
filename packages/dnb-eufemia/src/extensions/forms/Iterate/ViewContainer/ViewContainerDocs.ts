import { PropertiesTableProps } from '../../../../shared/types'

export const ViewContainerProperties: PropertiesTableProps = {
  title: {
    doc: 'The title of the container.',
    type: 'React.Node',
    status: 'optional',
  },
  '[FlexVertical](/uilib/layout/flex/container/)': {
    doc: 'All Flex.Vertical properties.',
    type: 'Various',
    status: 'optional',
  },
}

export const ViewContainerEvents: PropertiesTableProps = {}
