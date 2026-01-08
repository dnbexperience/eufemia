import type { PropertiesTableProps } from '../../../../shared/types'
import { stringProperties } from '../String/StringDocs'

export const PasswordProperties: PropertiesTableProps = {
  ...stringProperties,
  pattern: {
    doc: 'Validation based on regex pattern for the number field e.g. `pattern="w{8}d{4}"`.',
    type: 'string',
    status: 'optional',
  },
  size: {
    doc: 'The sizes you can choose is small (1.5rem), default (2rem), medium (2.5rem) and large (3rem) are supported component sizes. Defaults to default / null. Also, if you define a number like size="2" then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).',
    type: ['string', 'number'],
    status: 'optional',
  },
  innerRef: {
    doc: '`ElementRef` passed on to the password `input` element.',
    type: 'React.RefObject',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const PasswordEvents: PropertiesTableProps = {
  onShowPassword: {
    doc: 'Will be called when the user toggles the password to be visible.',
    type: 'function',
    status: 'optional',
  },
  onHidePassword: {
    doc: 'Will be called when the user toggles the password to be hidden.',
    type: 'function',
    status: 'optional',
  },
}
