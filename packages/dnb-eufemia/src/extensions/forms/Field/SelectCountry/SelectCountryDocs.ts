import { PropertiesTableProps } from '../../../../shared/types'

export const SelectCountryProperties: PropertiesTableProps = {
  countries: {
    doc: 'List only a certain set of countries: `Scandinavia`, `Nordic`, `Europe` or `Prioritized`(all countries <a href="/uilib/extensions/forms/feature-fields/SelectCountry/#filter-or-prioritize-country-listing">sorted by priority</a>). Defaults to `Prioritized`',
    type: 'string',
    state: 'optional',
  },
  help: {
    doc: 'Provide a help button. Object consisting of title and content.',
    type: 'object',
    state: 'optional',
  },
}

export const SelectCountryEvents: PropertiesTableProps = {}
