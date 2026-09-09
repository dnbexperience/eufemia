import type { PropertiesTableProps } from '../../../../shared/types'
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
    doc: 'Choice of input feature. Defaults to `checkbox`.',
    type: [
      '"checkbox"',
      '"radio"',
      '"switch"',
      '"checkbox-button"',
      '"radio-button"',
      '"button"',
      '"buttons"',
    ],
    status: 'optional',
  },
  size: ToggleProperties.size,
}

export const BooleanEvents: PropertiesTableProps = {
  onClick: {
    doc: 'Will be called on click.',
    type: '(value: unknown, { event: ClickEvent, preventDefault: () => void }) => void',
    status: 'optional',
  },
}
