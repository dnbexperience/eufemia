import { PropertiesTableProps } from '../../../../shared/types'
import { ValueProperties } from '../ValueDocs'

const { label, transformLabel } = ValueProperties

export const CompositionProperties: PropertiesTableProps = {
  label,
  transformLabel,
  maxWidth: {
    doc: 'Use `small`, `medium` or `large` for predefined standard max widths. Defaults to `auto`.',
    type: 'string',
    status: 'optional',
  },
  gap: {
    doc: 'The gap between the different value blocks. Can be `xx-small`, `x-small`, `small`, `medium`, `large` or `false`. Defaults to `xx-small`.',
    type: 'string',
    status: 'optional',
  },
}
