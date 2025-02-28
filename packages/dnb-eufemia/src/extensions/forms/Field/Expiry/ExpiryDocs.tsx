import { PropertiesTableProps } from '../../../../shared/types'
import { inputProperties } from '../../../../components/input/InputDocs'

export const ExpiryProperties: PropertiesTableProps = {
  size: {
    ...inputProperties.size,
    doc: `${inputProperties.size.doc} Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).`,
  },
}
