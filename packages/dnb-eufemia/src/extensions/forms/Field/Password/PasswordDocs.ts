import { PropertiesTableProps } from '../../../../shared/types'

export const PasswordProperties: PropertiesTableProps = {
  pattern: {
    doc: 'Validation based on regex pattern for the number field e.g. `pattern="\\w{8}\\d{4}"`.',
    type: 'string',
    state: 'optional',
  },
  size: {
    doc: 'The sizes you can choose is small (1.5rem), default (2rem), medium (2.5rem) and large (3rem) are supported component sizes. Defaults to default / null. Also, if you define a number like size="2" then it will be forwarded as the input element attribute.',
    type: 'object',
    state: 'optional',
  },
  innerRef: {
    doc: '`ElememntRef` passed on to the password `input` element.',
    type: 'object',
    state: 'optional',
  },
  help: {
    doc: 'Provide a help button. Object consisting of `title` and `content`.',
    type: 'object',
    state: 'optional',
  },
}

export const PasswordEvents: PropertiesTableProps = {
  onShowPassword: {
    doc: 'Will be called when the user toggles the password to be visible.',
    type: 'function',
    state: 'optional',
  },
  onHidePassword: {
    doc: 'Will be called when the user toggles the password to be hidden.',
    type: 'function',
    state: 'optional',
  },
}
