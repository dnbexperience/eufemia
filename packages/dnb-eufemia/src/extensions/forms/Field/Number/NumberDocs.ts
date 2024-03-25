import { InputProperties } from '../../../../components/input/InputDocs'
import { PropertiesTableProps } from '../../../../shared/types'

export const NumberProperties: PropertiesTableProps = {
  decimalLimit: {
    doc: 'Max number of decimals. Values with more decimals will be rounded. Defaults to `12`.',
    type: 'number',
    state: 'optional',
  },
  percent: {
    doc: 'Format a number as percentage.',
    type: 'boolean',
    state: 'optional',
  },
  currency: {
    doc: 'Currency code (ISO 4217) or `true` to use the default `NOK`. Uses two decimals by default.',
    type: ['boolean', 'string'],
    state: 'optional',
  },
  minimum: {
    doc: 'Validation for inclusive minimum number value (greater than or equal). Defaults to `Number.MIN_SAFE_INTEGER`.',
    type: 'number',
    state: 'optional',
  },
  maximum: {
    doc: 'Validation for inclusive maximum number value (less than or equal). Defaults to `Number.MAX_SAFE_INTEGER`.',
    type: 'number',
    state: 'optional',
  },
  exclusiveMinimum: {
    doc: 'Validation for exclusive minimum number value (greater than).',
    type: 'number',
    state: 'optional',
  },
  exclusiveMaximum: {
    doc: 'Validation for exclusive maximum number value (less than).',
    type: 'number',
    state: 'optional',
  },
  multipleOf: {
    doc: 'Validation that requires the number to be a multiple of given value.',
    type: 'number',
    state: 'optional',
  },
  width: {
    doc: '`false` for no width (use browser default), `small`, `medium` or `large` for predefined standard widths, `stretch` for fill available width.',
    type: ['string', 'false'],
    state: 'optional',
  },
  size: InputProperties.size,
  align: {
    doc: 'Lateral alignment of contents of input field, one of `left` (default), `center`, or `right`.',
    type: 'string',
    state: 'optional',
  },
  help: {
    doc: 'Provide a help button. Object consisting of `title` and `content`.',
    type: 'object',
    state: 'optional',
  },
  autoComplete: {
    doc: 'For HTML `autocomplete` attributes.',
    type: ['on', 'string'],
    state: 'optional',
  },
  prefix: {
    doc: 'Text added before the value input.',
    type: 'string',
    state: 'optional',
  },
  suffix: {
    doc: 'Text added after the value input.',
    type: 'string',
    state: 'optional',
  },
  step: {
    doc: 'Determines step granularity when in/decreasing value input through step controls buttons or arrow keys.',
    type: 'number',
    state: 'optional',
  },
  showStepControls: {
    doc: 'Show buttons that in/decreases value input by the step value.',
    type: 'boolean',
    state: 'optional',
  },
}
