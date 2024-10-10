import { PropertiesTableProps } from '../../../../shared/types'

export const PostalCodeAndCityProperties: PropertiesTableProps = {
  country: {
    doc:
      'Defines which country the postal code and city is for.' +
      'Setting it to anything other than `no` will remove the default norwegian postal code pattern.' +
      'You can also use the value of another field to define the country, by using a path value i.e. `/myCountryPath`.' +
      'Defaults to `no`',
    type: ['Path', 'no', 'string'],
    status: 'optional',
  },
  postalCode: {
    doc: 'Properties for the [Field.String](/uilib/extensions/forms/base-fields/String/) component for postcode.',
    type: 'object',
    status: 'required',
  },
  city: {
    doc: 'Properties for the [Field.String](/uilib/extensions/forms/base-fields/String/) component for city.',
    type: 'object',
    status: 'required',
  },
  help: {
    doc: 'Provide a help button. Object consisting of `title` and `content`.',
    type: 'object',
    status: 'optional',
  },
}
