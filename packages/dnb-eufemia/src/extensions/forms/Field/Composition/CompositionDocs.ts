import { PropertiesTableProps } from '../../../../shared/types'
import { FieldBlockProperties } from '../../FieldBlock/FieldBlockDocs'

export const CompositionProperties: PropertiesTableProps = {
  label: FieldBlockProperties.label,
  labelDescription: FieldBlockProperties.labelDescription,
  labelSrOnly: FieldBlockProperties.labelSrOnly,
  width: FieldBlockProperties.width,
  contentWidth: FieldBlockProperties.contentWidth,
  disabled: FieldBlockProperties.disabled,
  error: FieldBlockProperties.error,
  warning: FieldBlockProperties.warning,
  info: FieldBlockProperties.info,
  align: {
    doc: '`center` or `bottom` for aligning the contents vertically. Defaults to `bottom`.',
    type: ['string', 'false'],
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
