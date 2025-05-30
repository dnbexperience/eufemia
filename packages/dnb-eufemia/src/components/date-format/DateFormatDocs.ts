import { PropertiesTableProps } from '../../shared/types'

export const DateFormatProperties: PropertiesTableProps = {
  value: {
    doc: 'The date that will be formatted.',
    type: ['Date', 'string'],
    status: 'optional',
  },
  dateStyle: {
    doc: 'Defines the style used to format the date. Defaults to `long`.',
    type: ['long', 'medium', 'short', 'full'],
    status: 'optional',
  },
  locale: {
    doc: 'Locale used for formatting. Defaults to `nb-NO`.',
    type: 'string',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
