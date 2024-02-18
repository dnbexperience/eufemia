import { PropertiesTableProps } from '../../../../shared/types'

export const ArrayProperties: PropertiesTableProps = {
  value: {
    doc: 'The data to process.',
    type: 'array',
    state: 'optional',
  },
  '[FlexContainer](/uilib/layout/flex/container/)': {
    doc: 'All Flex.Container properties.',
    type: 'Various',
    state: 'optional',
  },
}

export const ArrayEvents: PropertiesTableProps = {}
