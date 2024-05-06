import { PropertiesTableProps } from '../../../../shared/types'

export const PostalCodeAndCityProperties: PropertiesTableProps = {
  help: {
    doc: 'Provide a help button. Object consisting of `title` and `content`.',
    type: 'object',
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
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
  '[FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/properties/)':
    {
      doc: 'FieldBlock properties.',
      type: 'Various',
      status: 'optional',
    },
}
