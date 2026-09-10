import type { PropertiesTableProps } from '../../../../shared/types'
import { getFieldEventsWithTypes } from '../FieldDocs'
import { AutocompleteProperties } from '../../../../components/autocomplete/AutocompleteDocs'

export const SelectCountryProperties: PropertiesTableProps = {
  listDriver: {
    doc: 'Opt in to a custom list renderer. Use `createDrawerListVirtualization` from `@dnb/eufemia/fragments/drawer-list/Virtualization` for large data sets. Install the optional `@tanstack/react-virtual` peer dependency when using this driver.',
    type: 'DrawerListDriver',
    status: 'optional',
  },
  countries: {
    doc: 'List only a certain set of countries: `Scandinavia`, `Nordic`, `Europe` or `Prioritized` (all countries [sorted by priority](/uilib/extensions/forms/feature-fields/SelectCountry/#filter-or-prioritize-country-listing)). Defaults to `Prioritized`.',
    type: ['"Scandinavia"', '"Nordic"', '"Europe"', '"Prioritized"'],
    status: 'optional',
  },
  filterCountries: {
    doc: 'Use this property to filter out certain countries. The function receives the country object and should return a boolean. Returning `false` will omit the country.',
    type: 'function',
    status: 'optional',
  },
  size: {
    ...AutocompleteProperties.size,
    doc: `${AutocompleteProperties.size.doc} Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).`,
  },
}

export const SelectCountryGeneralEvents = getFieldEventsWithTypes(
  { type: 'string', optional: true },
  { type: 'object', optional: true }
)
