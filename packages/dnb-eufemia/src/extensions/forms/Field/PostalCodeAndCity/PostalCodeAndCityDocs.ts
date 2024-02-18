import { PropertiesTableProps } from '../../../../shared/types'

export const PostalCodeAndCityProperties: PropertiesTableProps = {
  postalCode: {
    doc: 'Properties for the <a href="/uilib/extensions/forms/base-fields/String/">Field.String</a> component for postcode.',
    type: 'object',
    state: 'required',
  },
  city: {
    doc: 'Properties for the <a href="/uilib/extensions/forms/base-fields/String/">Field.String</a> component for city.',
    type: 'object',
    state: 'required',
  },
  help: {
    doc: 'Provide a help button. Object consisting of `title` and `content`.',
    type: 'object',
    state: 'optional',
  },
}

export const PostalCodeAndCityEvents: PropertiesTableProps = {}
