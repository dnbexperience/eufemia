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
  '[FlexVertical](/uilib/layout/flex/container/)': {
    doc: 'All Flex.Vertical properties.',
    type: 'Various',
    status: 'optional',
  },
}

export const EditContainerEvents: PropertiesTableProps = {}
