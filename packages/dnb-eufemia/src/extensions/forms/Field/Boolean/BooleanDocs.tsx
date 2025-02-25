import { PropertiesTableProps } from '../../../../shared/types'
import { ToggleProperties } from '../Toggle/ToggleDocs'

export const BooleanProperties: PropertiesTableProps = {
  trueText: {
    doc: 'Text to show in the UI when value is `true`.',
    type: 'string',
    status: 'optional',
  },
  falseText: {
    doc: 'Text to show in the UI when value is `false`.',
    type: 'string',
    status: 'optional',
  },
  variant: {
    doc: 'Choice of input feature. Can be: `checkbox`, `button`, `checkbox-button` or `buttons`.',
    type: 'string',
    status: 'optional',
  },
  size: ToggleProperties.size,
}
