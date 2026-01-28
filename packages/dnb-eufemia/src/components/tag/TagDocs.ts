import { PropertiesTableProps } from '../../shared/types'

export const TagEvents: PropertiesTableProps = {
  onClick: {
    doc: 'Will be called on a click event. Returns an object with the native event: `{ event }`.',
    type: 'function',
    status: 'optional',
  },
}

export const TagProperties: PropertiesTableProps = {
  text: {
    doc: 'The content of the tag can be a string or a React Element.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  children: {
    doc: 'The content of the tag can be a string or a React Element.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  icon: {
    doc: 'To be included in the tag. Primary Icons can be set as a string (e.g. icon="chevron_right"), other icons should be set as React elements. Note, we recommend not to use icons with clickable tags.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  hasLabel: {
    doc: 'If a label is given, typical inside a table or dl (definition list), then you can disable Tag.Group as a dependent of Tag. Use `true` to omit the `Tag group required:` warning.',
    type: 'boolean',
    status: 'optional',
  },
  variant: {
    doc: 'Possible values are `default`, `clickable`, `addable`, or `removable`. Defaults to `default`.',
    type: ['default', 'clickable', 'addable', 'removable'],
    status: 'optional',
  },
  omitOnKeyUpDeleteEvent: {
    doc: 'Set to `true` to omit triggering an event when the user releases the `Delete` or `Backspace` keys. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  className: {
    doc: 'Custom className for the component root.',
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

export const TagGroupProperties: PropertiesTableProps = {
  label: {
    doc: 'The label description of the group of tags.',
    type: 'React.ReactNode',
    status: 'required',
  },
  children: {
    doc: 'Content of the component. Can be used instead of the `data`-property, by adding Tag elements as children `<Tag {...props} />`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  className: {
    doc: 'Custom className for the component root.',
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
