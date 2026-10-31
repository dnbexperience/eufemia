import type { PropertiesTableProps } from '../../../../shared/types'
import { DataValueWritePropsProperties } from '../../hooks/DataValueWritePropsDocs'
import { ProviderProperties } from '../../DataContext/Provider/ProviderDocs'
import { FieldProperties } from '../FieldDocs'

export const FieldProviderProperties: PropertiesTableProps = {
  required: DataValueWritePropsProperties.required,
  disabled: DataValueWritePropsProperties.disabled,
  layout: FieldProperties.layout,
  layoutOptions: FieldProperties.layoutOptions,
  locale: {
    doc: 'Locale (language) to use for all nested Eufemia components.',
    type: 'string',
    status: 'optional',
  },
  translations: ProviderProperties.translations,
  translationsLoader: ProviderProperties.translationsLoader,
  messageFormatter: {
    doc: 'Message formatter for advanced message formatting (e.g. ICU MessageFormat). Import and pass `icu` from `@dnb/eufemia/shared` to enable pluralization, select, and other ICU features in translation strings.',
    type: 'function',
    status: 'optional',
  },
}
