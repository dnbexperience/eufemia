import type { PropertiesTableProps } from '../../../../shared/types'
import { NumberFormatNumberProperties } from '../../../../components/number-format/NumberFormatDocs'

const formatProperties = { ...NumberFormatNumberProperties }
delete formatProperties.value

export const NumberProperties: PropertiesTableProps = {
  value: {
    doc: 'The number to display. Will take precedence over the path value given in the data context.',
    type: 'number',
    status: 'optional',
  },
  minimum: {
    doc: 'Defines the minimum value of the rendered number. Defaults to `Number.MIN_SAFE_INTEGER`.',
    type: 'number',
    status: 'optional',
  },
  maximum: {
    doc: 'Defines the maximum value of the rendered number. Defaults to `Number.MAX_SAFE_INTEGER`.',
    type: 'number',
    status: 'optional',
  },
  percent: {
    doc: 'Formats the value as a percentage.',
    type: 'boolean',
    status: 'optional',
  },
  ...formatProperties,
}
