import { InputProperties } from '../../../../components/input/InputDocs'
import { PropertiesTableProps } from '../../../../shared/types'

export const StringProperties: PropertiesTableProps = {
  multiline: {
    doc: 'True to be able to write in multiple lines (switching from input-element to textarea-element).',
    type: 'boolean',
    status: 'optional',
  },
  leftIcon: {
    doc: 'For icon at the left side of the text input. Only one of `leftIcon` or `rightIcon` can be used at the same time.',
    type: 'string',
    status: 'optional',
  },
  rightIcon: {
    doc: 'For icon at the right side of the text input. Only one of `leftIcon` or `rightIcon` can be used at the same time.',
    type: 'string',
    status: 'optional',
  },
  capitalize: {
    doc: 'When set to true, it will capitalize the first letter of every word, transforming the rest to lower case.',
    type: 'boolean',
    status: 'optional',
  },
  trim: {
    doc: 'When true, it will trim leading and trailing whitespaces on blur, triggering `onChange` if the value changes.',
    type: 'boolean',
    status: 'optional',
  },
  inputMode: {
    doc: 'Define an [inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).',
    type: 'string',
    status: 'optional',
  },
  autoComplete: {
    doc: 'For HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attributes.',
    type: ['on', 'string'],
    status: 'optional',
  },
  minLength: {
    doc: 'Validation for minimum length of the text (number of characters).',
    type: 'number',
    status: 'optional',
  },
  maxLength: {
    doc: 'Validation for maximum length of the text (number of characters).',
    type: 'number',
    status: 'optional',
  },
  pattern: {
    doc: 'Validation based on regex pattern.',
    type: 'string',
    status: 'optional',
  },
  width: {
    doc: '`false` for no width (use browser default), `small`, `medium` or `large` for predefined standard widths, `stretch` to fill available width.',
    type: ['string', 'false'],
    status: 'optional',
  },

  // - Input props
  size: {
    ...InputProperties.size,
    doc: `${InputProperties.size.doc} Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).`,
  },
  align: InputProperties.align,
  selectall: InputProperties.selectall,
  clear: InputProperties.clear,
  keepPlaceholder: InputProperties.keepPlaceholder,

  // - Textarea props
  rows: {
    doc: 'To be used together with `multiline`. Set how many rows of text can be shown by default. Defaults to `2`.',
    type: 'number',
    status: 'optional',
  },
  autoresizeMaxRows: {
    doc: 'To be used together with `multiline`. Set how many rows of text can be shown at max. Defaults to `6`.',
    type: 'number',
    status: 'optional',
  },
  characterCounter: {
    doc: "To be used together with `multiline`. Use a number to define the displayed max length e.g. `40` or `{ max: 40, variant: 'down' }`.",
    type: ['number', 'object'],
    status: 'optional',
  },
  autoresize: {
    doc: 'To be used together with `multiline`. Set true to expand when writing longer texts. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },

  // - Additional props
  inputClassName: {
    doc: 'Class name set on the <input> DOM element.',
    type: 'string',
    status: 'optional',
  },
  innerRef: {
    doc: 'By providing a React.Ref we can get the internally used input element (DOM).',
    type: 'React.RefObject',
    status: 'optional',
  },
  submitElement: {
    doc: 'Accepts a React element which will show up like the "submit button" would do on type="search".',
    type: 'React.Element',
    status: 'optional',
  },
}
