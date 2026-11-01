import type { PropertiesTableProps } from '../../../../shared/types'

export const ToggleProperties: PropertiesTableProps = {
  valueOn: {
    doc: 'Source data value when the toggle is in the "on-state" (varies based on UI variant).',
    type: ['string', 'number', 'boolean'],
    status: 'required',
  },
  valueOff: {
    doc: 'Source data value when the toggle is in the "off-state".',
    type: ['string', 'number', 'boolean'],
    status: 'required',
  },
  textOn: {
    doc: 'Text to show in the UI when in the "on-state".',
    type: 'string',
    status: 'optional',
  },
  textOff: {
    doc: 'Text to show in the UI when in the "off-state".',
    type: 'string',
    status: 'optional',
  },
  size: {
    doc: 'The size of the toggle. Can be `default`, `medium` or `large`. The button variants also support `small`.',
    type: ['"default"', '"small"', '"medium"', '"large"'],
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
}

export const ToggleEvents: PropertiesTableProps = {
  onClick: {
    doc: 'Will be called on click.',
    type: '(value: unknown, { event: ClickEvent, preventDefault: () => void }) => void',
    status: 'optional',
  },
}
