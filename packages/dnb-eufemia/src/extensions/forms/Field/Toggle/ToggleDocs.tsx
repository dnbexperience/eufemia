import { PropertiesTableProps } from '../../../../shared/types'

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
  variant: {
    doc: 'Choice of input feature. Can be: `checkbox`, `button`, `checkbox-button` or `buttons`.',
    type: 'string',
    status: 'optional',
  },
}
