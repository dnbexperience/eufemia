import { PropertiesTableProps } from '../../../../shared/types'
import { DataValueWritePropsProperties } from '../../hooks/DataValueWritePropsDocs'

export const FieldProviderProperties: PropertiesTableProps = {
  required: DataValueWritePropsProperties.required,
  disabled: DataValueWritePropsProperties.disabled,
  layout: DataValueWritePropsProperties.layout,
  layoutOptions: DataValueWritePropsProperties.layoutOptions,
  width: DataValueWritePropsProperties.width,
  locale: {
    doc: 'Locale (language) to use for all nested Eufemia components.',
    type: 'string',
    status: 'optional',
  },
}
