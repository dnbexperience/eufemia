import { PropertiesTableProps } from '../../../../shared/types'

export const DateProperties: PropertiesTableProps = {
  help: {
    doc: 'Provide a help button. Object consisting of `title` and `content`',
    type: 'object',
    status: 'optional',
  },
  range: {
    doc:
      'Defines if the Date field should support a value of two dates (starting and ending date). ' +
      'The `value` needs to be a stirng containing two dates, seperated by a space i.e. (`01-09-2024 30-09-2024`) when this is set to `true`. ' +
      'Defaults to `false`',
    type: 'boolean',
    status: 'optional',
  },
}
