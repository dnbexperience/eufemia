import { PropertiesTableProps } from '../../../../shared/types'

export const PhoneNumberProperties: PropertiesTableProps = {
  pattern: {
    doc: 'Validation based on regex pattern for the number field e.g. `pattern="^[49]+"`.',
    type: 'string',
    state: 'optional',
  },
  countries: {
    doc: 'List only a certain set of countries: `Scandinavia`, `Nordic`, `Europe` or `Prioritized`(all countries <a href="/uilib/extensions/forms/feature-fields/PhoneNumber/#filter-or-prioritize-country-listing">sorted by priority</a>). Defaults to `Prioritized`.',
    type: 'string',
    state: 'optional',
  },
  omitCountryCodeField: {
    doc: 'If `true` is given, then everything related to country code is removed.',
    type: 'boolean',
    state: 'optional',
  },
  countryCodeFieldClassName: {
    doc: 'Class name for the country code component.',
    type: 'string',
    state: 'optional',
  },
  numberFieldClassName: {
    doc: 'Class name for the number component.',
    type: 'string',
    state: 'optional',
  },
  countryCodePlaceholder: {
    doc: 'Placeholder for the country code field.',
    type: 'string',
    state: 'optional',
  },
  countryCodeLabel: {
    doc: 'Label to show above / before the country code field.',
    type: 'string',
    state: 'optional',
  },
  numberMask: {
    doc: 'See property `mask` of the <a href="/uilib/components/input-masked/properties">InputMasked</a> component.',
    type: 'Various',
    state: 'optional',
  },
  width: {
    doc: '`large` for predefined standard width, `stretch` for fill available width.',
    type: 'string or false',
    state: 'optional',
  },
  help: {
    doc: 'Provide a help button. Object consisting of `title` and `content`.',
    type: 'object',
    state: 'optional',
  },
}

export const PhoneNumberEvents: PropertiesTableProps = {}
