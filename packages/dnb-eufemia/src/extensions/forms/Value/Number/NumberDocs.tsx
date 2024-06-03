import { PropertiesTableProps } from '../../../../shared/types'

export const NumberProperties: PropertiesTableProps = {
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
