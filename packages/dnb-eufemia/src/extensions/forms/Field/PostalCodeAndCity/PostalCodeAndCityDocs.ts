import { PropertiesTableProps } from '../../../../shared/types'
import { FieldProperties } from '../FieldDocs'

export const PostalCodeAndCityProperties: PropertiesTableProps = {
  country: {
    doc:
      'Defines which country the postal code and city is for, based on the ISO 3166-1 alpha-2 format i.e. `NO`, `DE` etc. ' +
      'Setting it to anything other than `NO` will remove the default norwegian postal code pattern. ' +
      'You can also use the value of another field to define the country, by using a path value i.e. `/myCountryPath`. ' +
      'Defaults to `NO`',
    type: ['Path', 'string'],
    status: 'optional',
  },
  postalCode: {
    doc: 'Properties for the [Field.String](/uilib/extensions/forms/base-fields/String/) component for postal code.',
    type: 'object',
    status: 'required',
  },
  city: {
    doc: 'Properties for the [Field.String](/uilib/extensions/forms/base-fields/String/) component for city.',
    type: 'object',
    status: 'required',
  },
  help: FieldProperties.help,
}
