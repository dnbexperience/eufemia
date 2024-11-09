import { PropertiesTableProps } from '../../../../shared/types'

export const DateProperties: PropertiesTableProps = {
  range: {
    doc:
      'Defines if the Date field should support a value of two dates (starting and ending date). ' +
      'The `value` needs to be a string containing two dates, separated by a pipe character (`|`) (`01-09-2024|30-09-2024`) when this is set to `true`. ' +
      'Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
}
