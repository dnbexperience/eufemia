import { PropertiesTableProps } from '../../../../shared/types'
import { FieldBlockProperties } from '../../FieldBlock/FieldBlockDocs'

export const CompositionProperties: PropertiesTableProps = {
  ...FieldBlockProperties,
  align: {
    doc: '`center` or `bottom` for aligning the contents vertically. Defaults to `bottom`.',
    type: ['string', 'false'],
    status: 'optional',
  },
  asFieldset: undefined,
  composition: undefined,
}
