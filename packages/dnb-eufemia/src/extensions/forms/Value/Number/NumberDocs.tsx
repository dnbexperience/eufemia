import { PropertiesTableProps } from '../../../../shared/types'
import { NumberFormatPropertiesCamelCase } from '../../../../components/number-format/NumberFormatDocs'

export const NumberProperties: PropertiesTableProps = {
  ...NumberFormatPropertiesCamelCase,
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
}
