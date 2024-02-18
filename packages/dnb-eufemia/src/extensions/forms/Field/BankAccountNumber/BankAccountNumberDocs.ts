import { PropertiesTableProps } from '../../../../shared/types'

export const BankAccountNumberProperties: PropertiesTableProps = {
  validate: {
    doc: 'Using this prop you can disable the default validation.',
    type: 'boolean',
    state: 'optional',
  },
  help: {
    doc: 'Provide a help button. Object consisting of `title` and `content`.',
    type: 'object',
    state: 'optional',
  },
}

export const BankAccountNumberEvents: PropertiesTableProps = {}
