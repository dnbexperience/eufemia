import { PropertiesTableProps } from '../../shared/types'

export const DateFormatProperties: PropertiesTableProps = {
  value: {
    doc: 'The date that will be formatted.',
    type: ['Date', 'string'],
    status: 'optional',
  },
  dateStyle: {
    doc: 'Defines the style used to format the date. Also affects duration formatting when using ISO 8601 duration strings. Defaults to `long`.',
    type: ['long', 'medium', 'short', 'full'],
    status: 'optional',
  },
  relativeTime: {
    doc: 'If set to `true`, actual dates will be formatted as relative time (e.g., "2 hours ago"). ISO 8601 duration strings (e.g., "PT1H") are automatically detected and formatted without this prop. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  locale: {
    doc: "A string in [Intl.DateTimeFormat locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument) format. Duration formatting supports all locales using the browser's built-in internationalization. Defaults to `nb-NO`.",
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
