import { PropertiesTableProps } from '../../../shared/types'

export const valueProperties: PropertiesTableProps = {
  label: {
    doc: 'Field label to show above the data value.',
    type: 'string',
    state: 'optional',
  },
  showEmpty: {
    doc: 'Text showing in place of the value if no value is given.',
    type: 'boolean',
    state: 'optional',
  },
  placeholder: {
    doc: 'Text showing in place of the value if no value is given.',
    type: 'string',
    state: 'optional',
  },
  value: {
    doc: 'Source data value for the input.',
    type: '{valueType}',
    state: 'optional',
  },
  path: {
    doc: 'JSON Pointer for where the data for this input is located in the source dataset.',
    type: 'string',
    state: 'optional',
  },
  inline: {
    doc: 'For showing the value inline (not as a block element).',
    type: 'boolean',
    state: 'optional',
  },
}
