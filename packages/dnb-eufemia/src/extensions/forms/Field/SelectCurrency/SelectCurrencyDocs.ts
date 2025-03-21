import { PropertiesTableProps } from '../../../../shared/types'
import { getFieldEventsWithTypes } from '../FieldDocs'
import { autocompleteProperties } from '../../../../components/autocomplete/AutocompleteDocs'

export const SelectCurrencyProperties: PropertiesTableProps = {
  currencies: {
    doc: 'List only a certain set of currencies: `Scandinavia`, `Nordic`, `Europe` or `Prioritized`(all currencies [sorted by priority](/uilib/extensions/forms/feature-fields/SelectCurrency/#filter-or-prioritize-currency-listing)). Defaults to `Prioritized`.',
    type: 'string',
    status: 'optional',
  },
  filterCurrencies: {
    doc: 'Use this prop to filter out certain currencies. The function receives the currency object and should return a boolean. Returning `false` will omit the currency.',
    type: 'function',
    status: 'optional',
  },
  size: {
    ...autocompleteProperties.size,
    doc: `${autocompleteProperties.size.doc} Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).`,
  },
}

export const SelectCurrencyGeneralEvents = getFieldEventsWithTypes(
  { type: 'string', optional: true },
  { type: 'object', optional: true }
)
