import { PropertiesTableProps } from '../../../shared/types'

export const FieldBlockSharedProperties: PropertiesTableProps = {
  label: {
    doc: 'Field label to show above / before the input feature.',
    type: 'string',
    status: 'optional',
  },
  labelDescription: {
    doc: 'A more discreet text displayed beside the label (i.e for "(optional)").',
    type: 'string',
    status: 'optional',
  },
  labelDescriptionNextLine: {
    doc: 'If true, the labelDescription will be displayed on the next line.',
    type: 'boolean',
    status: 'optional',
  },
  labelSrOnly: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  help: {
    doc: 'Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).',
    type: 'object',
    status: 'optional',
  },
  layout: {
    doc: 'Layout for the label and input. Can be `horizontal` or `vertical`.',
    type: 'string',
    status: 'optional',
  },
  layoutOptions: {
    doc: 'Use this to set additional options for the `horizontal` layout. E.g. `{ width: "medium" }`. You can also use a custom width `{number}rem`. Instead of a width, you can use a min/max width. E.g. `{ minWidth: "6rem", maxWidth: "12rem" }`.',
    type: 'object',
    status: 'optional',
  },
  width: {
    doc: 'Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.',
    type: ['string', 'false'],
    status: 'optional',
  },
  contentWidth: {
    doc: 'Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.',
    type: ['string', 'false'],
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

/** For internal use only */
export const FieldBlockProperties: PropertiesTableProps = {
  ...FieldBlockSharedProperties,
  labelSize: {
    doc: 'Define one of the following [heading sizes](/uilib/elements/heading/): `medium` or `large`.',
    type: ['string', 'false'],
    status: 'optional',
  },
  labelHeight: {
    doc: 'Defines the height of an component (size prop), so the label can be aligned correctly. Can be `default`, `small`, `medium`, `large`.',
    type: 'string',
    status: 'optional',
  },
  asFieldset: {
    doc: 'Use `true` when you have several form elements. This way a `fieldset` with a `legend` is used.',
    type: 'boolean',
    status: 'optional',
  },
  align: {
    doc: '`center` or `bottom` for aligning the contents vertically. Defaults to `bottom`.',
    type: ['string', 'false'],
    status: 'optional',
  },
  disableStatusSummary: {
    doc: 'Use `true` to disable the error summary.',
    type: 'boolean',
    status: 'optional',
  },
  composition: {
    doc: 'Use `true` for when you have more than one field wrapped.',
    type: 'string',
    status: 'optional',
  },
  disabled: {
    doc: 'Set `true` to make the inner [FormLabel](/uilib/components/form-label/) behave as disabled.',
    type: 'boolean',
    status: 'optional',
  },
}
