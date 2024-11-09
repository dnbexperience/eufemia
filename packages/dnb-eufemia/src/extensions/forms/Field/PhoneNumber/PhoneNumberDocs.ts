import { PropertiesTableProps } from '../../../../shared/types'
import { getFieldEventsWithTypes } from '../FieldDocs'

export const PhoneNumberProperties: PropertiesTableProps = {
  countries: {
    doc: 'List only a certain set of countries: `Scandinavia`, `Nordic`, `Europe` or `Prioritized`(all countries [sorted by priority](/uilib/extensions/forms/feature-fields/SelectCountry/#filter-or-prioritize-country-listing)). Defaults to `Prioritized`.',
    type: 'string',
    status: 'optional',
  },
  filterCountries: {
    doc: 'Use this prop to filter out certain countries. The function receives the country object and should return a boolean. Returning `false` will omit the country.',
    type: 'function',
    status: 'optional',
  },
  pattern: {
    doc: 'Validation based on regex pattern for the number field e.g. `pattern="^[49]+"`.',
    type: 'string',
    status: 'optional',
  },
  omitCountryCodeField: {
    doc: 'If `true` is given, then everything related to country code is removed.',
    type: 'boolean',
    status: 'optional',
  },
  countryCodeFieldClassName: {
    doc: 'Class name for the country code component.',
    type: 'string',
    status: 'optional',
  },
  numberFieldClassName: {
    doc: 'Class name for the number component.',
    type: 'string',
    status: 'optional',
  },
  countryCodePlaceholder: {
    doc: 'Placeholder for the country code field.',
    type: 'string',
    status: 'optional',
  },
  countryCodeLabel: {
    doc: 'Label to show above / before the country code field.',
    type: 'string',
    status: 'optional',
  },
  numberMask: {
    doc: 'See property `mask` of the [InputMasked](/uilib/components/input-masked/properties) component.',
    type: 'Various',
    status: 'optional',
  },
  width: {
    doc: '`large` for predefined standard width, `stretch` for fill available width.',
    type: 'string | false',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const phoneNumberSpecificEvents: PropertiesTableProps = {
  onCountryCodeChange: {
    doc: 'Callback on country code change.',
    type: '(value?: string) => void',
    status: 'optional',
  },
  onNumberChange: {
    doc: 'Callback on phone number change.',
    type: '(value?: string) => void',
    status: 'optional',
  },
}

export const phoneNumberGeneralEvents = getFieldEventsWithTypes(
  { type: 'string', optional: true },
  { type: 'object' }
)
