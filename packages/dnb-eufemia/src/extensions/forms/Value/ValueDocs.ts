import { PropertiesTableProps } from '../../../shared/types'

export const ValueProperties: PropertiesTableProps = {
  value: {
    doc: 'Value for the value component. Will take precedence over the path value given in the data context.',
    type: '{valueType}',
    status: 'optional',
  },
  defaultValue: {
    doc: 'Default value for the value component. Will not take precedence over the path value given in the data context.',
    type: '{valueType}',
    status: 'optional',
  },
  label: {
    doc: 'Field label to show above the displayed value.',
    type: 'string',
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
  transformLabel: {
    doc: 'Transforms the label before it gets displayed. Receives the label as the first parameter. The second parameter is a object containing the `convertJsxToString` function.',
    type: 'function',
    status: 'optional',
  },
  inheritLabel: {
    doc: 'Use `true` to inherit the label from a visible (rendered) field with the same path.',
    type: 'boolean',
    status: 'optional',
  },
  inheritVisibility: {
    doc: 'Use `true` to inherit the visibility from a field with the same path. You can find more info in the [Value section](/uilib/extensions/forms/Value/#inherit-visibility-from-fields-based-on-path).',
    type: 'boolean',
    status: 'optional',
  },
  showEmpty: {
    doc: 'Shows the value even if it is empty.',
    type: 'boolean',
    status: 'optional',
  },
  placeholder: {
    doc: 'Text showing in place of the value if no value is given.',
    type: 'string',
    status: 'optional',
  },
  path: {
    doc: 'JSON Pointer for where the data for this input is located in the source dataset.',
    type: 'string',
    status: 'optional',
  },
  inline: {
    doc: 'For showing the value inline (not as a block element).',
    type: 'boolean',
    status: 'optional',
  },
  maxWidth: {
    doc: 'Use `auto` for no max-width (use browser default), `small`, `medium` or `large` for predefined standard max widths. Defaults to `large`.',
    type: 'string',
    status: 'optional',
  },
  transformIn: {
    doc: 'Transforms the `value` before its displayed in the value component.',
    type: 'function',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
