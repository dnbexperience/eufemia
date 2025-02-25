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
  size: {
    doc: 'The sizes you can choose is small (1.5rem), default (2rem), medium (2.5rem) and large (3rem) are supported component sizes. Defaults to default / null. Also, if you define a number like size="2" then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).',
    type: 'string',
    status: 'optional',
  },
  variant: {
    doc: 'Choice of input feature. Can be: `checkbox`, `button`, `checkbox-button` or `buttons`.',
    type: 'string',
    status: 'optional',
  },
}
