import { PropertiesTableProps } from '../../shared/types'

export const DateFormatProperties: PropertiesTableProps = {
  date: {
    doc: 'The date that will be formatted.',
    type: ['Date', 'string'],
    status: 'optional',
  },
  dateStyle: {
    doc: 'Defines the formatting  used for dates (weekday, day, month year). Cannot be used together with `weekday`, `day`, `month` and `year`. Defaults to `long`.',
    type: ['long', 'medium', 'short', 'full'],
    status: 'optional',
  },
  weekday: {
    doc: 'Defines the formatting used for weekdays. Cannot be used together with `dateStyle`. Defaults to `undefined`.',
    type: ['long', 'short', 'narrow'],
    status: 'optional',
  },
  day: {
    doc: 'Defines the formatting used for days. Cannot be used together with `dateStyle`. Defaults to `undefined`.',
    type: ['numeric', '2-digit'],
    status: 'optional',
  },
  month: {
    doc: 'Defines the formatting used for months. Cannot be used together with `dateStyle`. Defaults to `undefined`.',
    type: ['long', 'short', 'narrow', 'numeric', '2-digit'],
    status: 'optional',
  },
  year: {
    doc: 'Defines the formatting used for years. Cannot be used together with `dateStyle`. Defaults to `undefined`.',
    type: ['numeric', '2-digit'],
    status: 'optional',
  },
  locale: {
    doc: 'Locale used for formatting. Defaults to `nb-NO`',
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
