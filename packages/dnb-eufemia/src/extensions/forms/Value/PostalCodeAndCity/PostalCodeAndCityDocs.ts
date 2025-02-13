import { PropertiesTableProps } from '../../../../shared/types'

export const PostalCodeAndCityProperties: PropertiesTableProps = {
  postalCode: {
    doc: 'Properties such as `value` and `path` for the [Value.String](/uilib/extensions/forms/Value/String) component for postal code.',
    type: 'object',
    status: 'optional',
  },
  city: {
    doc: 'Properties such as `value` and `path` for the [Value.String](/uilib/extensions/forms/Value/String) component for city.',
    type: 'object',
    status: 'optional',
  },
}
