import { PropertiesTableProps } from '../../../../shared/types'

export const ArrayProperties: PropertiesTableProps = {
  value: {
    doc: 'The data to process.',
    type: 'array',
    status: 'optional',
  },
  '[FlexContainer](/uilib/layout/flex/container/)': {
    doc: 'All Flex.Container properties.',
    type: 'Various',
    status: 'optional',
  },
}

export const ArrayEvents: PropertiesTableProps = {}
