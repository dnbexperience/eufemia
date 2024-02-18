import { InputProperties } from '../../../../components/input/InputDocs'
import { PropertiesTableProps } from '../../../../shared/types'

export const StringProperties: PropertiesTableProps = {
  multiline: {
    doc: 'True to be able to write in multiple lines (switching from input-element to textarea-element).',
    type: 'boolean',
    state: 'optional',
  },
  leftIcon: {
    doc: 'For icon at the left side of the text input.',
    type: 'string',
    state: 'optional',
  },
  rightIcon: {
    doc: 'For icon at the right side of the text input.',
    type: 'string',
    state: 'optional',
  },
  capitalize: {
    doc: 'When set to true, it will capitalize the first letter of every word, transforming the rest to lowercase.',
    type: 'boolean',
    state: 'optional',
  },
  trim: {
    doc: 'When true, it will trim leading and trailing whitespaces on blur, triggering onChange if the value changes.',
    type: 'boolean',
    state: 'optional',
  },
  inputMode: {
    doc: 'Define an [inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).',
    type: 'string',
    state: 'optional',
  },
  autoComplete: {
    doc: 'For HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attributes.',
    type: ['on', 'string'],
    state: 'optional',
  },
  minLength: {
    doc: 'Validation for minimum length of the text (number of characters).',
    type: 'number',
    state: 'optional',
  },
  maxLength: {
    doc: 'Validation for maximum length of the text (number of characters).',
    type: 'number',
    state: 'optional',
  },
  pattern: {
    doc: 'Validation based on regex pattern.',
    type: 'string',
    state: 'optional',
  },
  width: {
    doc: '`false` for no width (use browser default), small, medium or large for predefined standard widths, stretch for fill available width.',
    type: ['string', 'false'],
    state: 'optional',
  },
  help: {
    doc: 'Provide a help button. Object consisting of title and content.',
    type: 'object',
    state: 'optional',
  },

  // - Input props
  size: InputProperties.size,
  align: InputProperties.align,
  selectall: InputProperties.selectall,
  clear: InputProperties.clear,
  keepPlaceholder: InputProperties.keep_placeholder,

  // - Textarea props
  rows: {
    doc: 'For multiline, set how many rows of text can be shown by default. Defaults to 2.',
    type: 'number',
    state: 'optional',
  },
  autoresizeMaxRows: {
    doc: 'For multiline, set how many rows of text can be shown at max. Defaults to 6',
    type: 'number',
    state: 'optional',
  },
  characterCounter: {
    doc: "For multiline, use a number to define the displayed max length e.g. `40` or `{ max: 40, variant: 'down' }`.",
    type: ['number', 'object'],
    state: 'optional',
  },
  autoresize: {
    doc: 'For multiline, set true to expand when writing longer texts. Defaults to true.',
    type: 'boolean',
    state: 'optional',
  },

  // - Additional props
  inputClassName: {
    doc: 'Class name set on the <input> DOM element.',
    type: 'string',
    state: 'optional',
  },
  innerRef: {
    doc: 'By providing a React.Ref we can get the internally used input element (DOM).',
    type: 'React.Ref',
    state: 'optional',
  },
  submitElement: {
    doc: 'Accepts a React element which will show up like the "submit button" would do on type="search".',
    type: 'React.Element',
    state: 'optional',
  },
}
