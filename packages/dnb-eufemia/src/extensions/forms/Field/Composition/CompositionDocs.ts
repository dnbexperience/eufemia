import type { PropertiesTableProps } from '../../../../shared/types'
import { FieldBlockProperties } from '../../FieldBlock/FieldBlockDocs'

export const CompositionProperties: PropertiesTableProps = {
  label: FieldBlockProperties.label,
  labelDescription: FieldBlockProperties.labelDescription,
  labelDescriptionInline: FieldBlockProperties.labelDescriptionInline,
  labelSrOnly: FieldBlockProperties.labelSrOnly,
  labelSize: FieldBlockProperties.labelSize,
  width: FieldBlockProperties.width,
  contentWidth: FieldBlockProperties.contentWidth,
  disabled: FieldBlockProperties.disabled,
  error: {
    doc: 'Error message shown below the fields.',
    type: [
      'string',
      'React.ReactElement',
      'Error',
      'FormError',
      'Array<string | React.ReactElement | Error | FormError>',
    ],
    status: 'optional',
  },
  warning: {
    doc: 'Warning message shown below the fields.',
    type: ['React.ReactNode', 'Array<React.ReactNode>'],
    status: 'optional',
  },
  info: {
    doc: 'Info message shown below the fields.',
    type: ['React.ReactNode', 'Array<React.ReactNode>'],
    status: 'optional',
  },
  help: FieldBlockProperties.help,
  align: {
    doc: '`center` or `bottom` for aligning the contents vertically. Defaults to `bottom`.',
    type: ['"center"', '"bottom"'],
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
