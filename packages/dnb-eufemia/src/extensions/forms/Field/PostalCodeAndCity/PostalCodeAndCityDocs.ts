import type { PropertiesTableProps } from '../../../../shared/types'
import { FieldProperties } from '../FieldDocs'
import { StringProperties } from '../String/StringDocs'

export const PostalCodeAndCityProperties: PropertiesTableProps = {
  countryCode: {
    doc: 'Defines which country the postal code and city is for, based on the [ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) e.g. `NO`, `DE` etc. `NO`, `DK` and `CH` get a four-digit postal code mask and validation, and only `NO` limits the city to Norwegian letters, spaces and hyphens. Any other value removes these rules. You can also use the value of another field to define the countryCode, by using a path value e.g. `/myCountryCodePath`. Defaults to the `countryCode` of `Form.Handler`, or `NO`.',
    type: ['Path', 'string'],
    status: 'optional',
  },
  postalCode: {
    doc: 'Properties for the [Field.String](/uilib/extensions/forms/base-fields/String/) component for postal code.',
    type: 'object',
    status: 'optional',
  },
  city: {
    doc: 'Properties for the [Field.String](/uilib/extensions/forms/base-fields/String/) component for city.',
    type: 'object',
    status: 'optional',
  },
  help: FieldProperties.help,
  size: StringProperties.size,
  error: {
    doc: 'Error message shown below the fields.',
    type: [
      'string',
      'React.ReactElement',
      'Error',
      'FormError',
      'Array<string | React.ReactElement | Error | FormError>',
    ],
    status: 'optional',
  },
  warning: {
    doc: 'Warning message shown below the fields.',
    type: ['React.ReactNode', 'Array<React.ReactNode>'],
    status: 'optional',
  },
  info: {
    doc: 'Info message shown below the fields.',
    type: ['React.ReactNode', 'Array<React.ReactNode>'],
    status: 'optional',
  },
}
