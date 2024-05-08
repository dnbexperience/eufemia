import { PropertiesTableProps } from '../../../../shared/types'
import { dataValueProperties } from '../../hooks/DataValueDocs'

export const FieldPropsProperties: PropertiesTableProps = {
  required: dataValueProperties.required,
  disabled: dataValueProperties.disabled,
  locale: {
    doc: 'Locale (language) to use for all nested Eufemia components.',
    type: 'string',
    status: 'optional',
  },
}
