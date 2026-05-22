import type { PropertiesTableProps } from '../../../../shared/types'

export const TimeProperties: PropertiesTableProps = {
  locale: {
    doc: 'Defines the locale used for formatting the time value. Defaults to the locale from context.',
    type: 'string',
    status: 'optional',
  },
}
