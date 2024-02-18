import { PropertiesTableProps } from '../../../../shared/types'

export const EmailProperties: PropertiesTableProps = {
  help: {
    doc: 'Provide a help button. Object consisting of `title` and `content`.',
    type: 'object',
    state: 'optional',
  },
}

export const EmailEvents: PropertiesTableProps = {}
