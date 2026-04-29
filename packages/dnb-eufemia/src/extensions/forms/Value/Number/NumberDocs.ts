import type { PropertiesTableProps } from '../../../../shared/types'
import { NumberFormatNumberProperties } from '../../../../components/number-format/NumberFormatDocs'

export const NumberProperties: PropertiesTableProps = {
  value: NumberFormatNumberProperties.value,
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
  ...NumberFormatNumberProperties,
}
