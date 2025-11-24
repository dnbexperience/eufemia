import { PropertiesTableProps } from '../../../../shared/types'
import { getFieldEventsWithTypes } from '../FieldDocs'
import { AutocompleteProperties } from '../../../../components/autocomplete/AutocompleteDocs'

export const SelectTimeZoneProperties: PropertiesTableProps = {
  filterTimeZones: {
    doc: 'Use this prop to filter out certain timezones. The function receives the timezone object and should return a boolean. Returning `false` will omit the timezone.',
    type: 'function',
    status: 'optional',
  },
  size: {
    ...AutocompleteProperties.size,
    doc: `${AutocompleteProperties.size.doc} Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).`,
  },
}

export const SelectTimeZoneGeneralEvents = getFieldEventsWithTypes(
  { type: 'string', optional: true },
  { type: 'object', optional: true }
)

