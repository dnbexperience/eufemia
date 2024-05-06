import { PropertiesTableProps } from '../../../../shared/types'

export const PostalCodeAndCityProperties: PropertiesTableProps = {
  postalCode: {
    doc: 'Properties such as `value` and `path` for the [Value.String](/uilib/extensions/forms/Value/String) component for postcode.',
    type: 'object',
    status: 'optional',
  },
  city: {
    doc: 'Properties such as `value` and `path` for the [Value.String](/uilib/extensions/forms/Value/String) component for city.',
    type: 'object',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
  '[ValueBlock](/uilib/extensions/forms/create-component/ValueBlock/properties/)':
    {
      doc: 'ValueBlock properties.',
      type: 'Various',
      status: 'optional',
    },
}
