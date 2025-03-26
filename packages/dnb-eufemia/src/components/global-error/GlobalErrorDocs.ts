import { PropertiesTableProps } from '../../shared/types'

export const GlobalErrorProperties: PropertiesTableProps = {
  status: {
    doc: 'Defines a status code as a string. When `404` or `500` is given, a predefined text will be shown. Defaults to `404`.',
    type: ['404', '500', 'string'],
    status: 'optional',
  },
  title: {
    doc: 'Overwrites the default title.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  text: {
    doc: 'Overwrites the default text.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  code: {
    doc: 'Overwrites the default error message code `Feilmeldings-kode:`.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  help: {
    doc: 'Overwrites the default additional help text `Her er noen lenker som kanskje kan hjelpe:`.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  links: {
    doc: 'Provide an array with objects `{ text: "Text", url: "https://..." }` to display a list of anchor links.',
    type: ['Array<GlobalErrorLink>'],
    status: 'optional',
  },
  center: {
    doc: 'If true, it will use `80vh` as the height and center its content.',
    type: ['boolean'],
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  locale: {
    doc: 'Set a [supported locale](/uilib/usage/customisation/localization/) if needed.',
    type: ['string'],
    status: 'optional',
  },
  children: {
    doc: 'To display additional related content, like useful links etc.',
    type: 'React.Node',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
