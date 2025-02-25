import { PropertiesTableProps } from '../../../../shared/types'
import { FieldProperties } from '../FieldDocs'
import { stringProperties } from '../String/StringDocs'

export const PostalCodeAndCityProperties: PropertiesTableProps = {
  countryCode: {
    doc:
      'Defines which country the postal code and city is for, based on the ISO 3166-1 alpha-2 format i.e. `NO`, `DE` etc. ' +
      'Setting it to anything other than `NO` will remove the default norwegian postal code pattern. ' +
      'You can also use the value of another field to define the countryCode, by using a path value i.e. `/myCountryCodePath`. ' +
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
  size: stringProperties.size,
}
