import { PropertiesTableProps } from '../../../../shared/types'

export const BooleanProperties: PropertiesTableProps = {
  trueText: {
    doc: 'The text to use when the value is true.',
    type: 'string',
    status: 'optional',
  },
  falseText: {
    doc: 'The text to use when the value is false.',
    type: 'string',
    status: 'optional',
  },
}
