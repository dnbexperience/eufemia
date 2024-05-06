import { PropertiesTableProps } from '../../../shared/types'

export const ValueProperties: PropertiesTableProps = {
  value: {
    doc: 'Source data value for the input.',
    type: '{valueType}',
    status: 'optional',
  },
  label: {
    doc: 'Field label to show above the data value.',
    type: 'string',
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
