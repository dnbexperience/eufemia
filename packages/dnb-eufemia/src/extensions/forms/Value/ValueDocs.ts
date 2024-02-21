import { PropertiesTableProps } from '../../../shared/types'

export const valueProperties: PropertiesTableProps = {
  label: {
    doc: 'Field label to show above the data value.',
    type: 'string',
    status: 'optional',
  },
  showEmpty: {
    doc: 'Text showing in place of the value if no value is given.',
    type: 'boolean',
    status: 'optional',
  },
  placeholder: {
    doc: 'Text showing in place of the value if no value is given.',
    type: 'string',
    status: 'optional',
  },
  value: {
    doc: 'Source data value for the input.',
    type: '{props.type}',
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
}
