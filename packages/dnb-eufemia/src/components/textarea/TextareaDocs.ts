import type { PropertiesTableProps } from '../../shared/types'
import {
  labelDocProperty,
  labelDirectionDocProperty,
  labelSrOnlyDocProperty,
  statusDocProperty,
  statusPropsDocProperty,
  globalStatusDocProperty,
  skeletonDocProperty,
  spacingDocProperty,
} from '../../shared/sharedDocsProperties'

export const TextareaProperties: PropertiesTableProps = {
  value: {
    doc: 'The content value of the Textarea.',
    type: 'string',
    status: 'optional',
  },
  align: {
    doc: 'Defines the `text-align` of the Textarea. Can be `left`, `center`, `right`, or `justify`. Defaults to `left`.',
    type: ['"left"', '"center"', '"right"', '"justify"'],
    status: 'optional',
  },
  stretch: {
    doc: 'If set to `true`, then the Textarea field will be 100% in `width`.',
    type: 'boolean',
    status: 'optional',
  },
  placeholder: {
    doc: 'The placeholder which shows up once the Textarea value is empty.',
    type: 'string',
    status: 'optional',
  },
  keepPlaceholder: {
    doc: 'Use `true` to keep the placeholder visible even when the Textarea has focus. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  label: labelDocProperty,
  labelDirection: labelDirectionDocProperty,
  suffix: {
    doc: 'Text describing the content of the Textarea more than the label. You can also send in a React component, so it gets wrapped inside the Textarea component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  labelSrOnly: labelSrOnlyDocProperty,
  autoResize: {
    doc: 'Use `true` to make the Textarea grow and shrink depending on how many lines the user has filled.',
    type: 'boolean',
    status: 'optional',
  },
  autoResizeMaxRows: {
    doc: 'Set a number to define how many rows the Textarea can auto grow.',
    type: 'number',
    status: 'optional',
  },
  characterCounter: {
    doc: 'Use a number to define the displayed max length. You can also use an object defining the [TextCounter](uilib/components/fragments/text-counter/) `variant` or properties. Please avoid using `maxLength` for accessibility reasons.',
    type: ['number', 'object'],
    status: 'optional',
  },
  size: {
    doc: 'The sizes you can choose for 1 row is `small` (2rem), `medium` (2.5rem) and `large` (3rem). Defaults to `small`.',
    type: ['"small"', '"medium"', '"large"'],
    status: 'optional',
  },
  status: statusDocProperty,
  statusState: {
    doc: 'Defines the state of the status. Defaults to `error`.',
    type: [
      '"error"',
      '"warning"',
      '"information"',
      '"success"',
      '"marketing"',
    ],
    status: 'optional',
  },
  statusProps: statusPropsDocProperty,
  globalStatus: globalStatusDocProperty,
  textareaState: {
    doc: 'To control the visual focus state as a property, like `focus` or `blur`.',
    type: 'string',
    status: 'optional',
  },
  ref: {
    doc: 'By providing a `React.Ref` we can get the internally used Textarea element (DOM), e.g. `ref={myRef}` by using `React.useRef(null)`.',
    type: 'React.RefObject',
    status: 'optional',
  },
  skeleton: skeletonDocProperty,
  '[Space](/uilib/layout/space/properties)': spacingDocProperty,
}

export const TextareaEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Will be called on value changes made by the user. Returns an object with a string value and the native event: `{ value, rows, event }`.',
    type: 'function',
    status: 'optional',
  },
  onFocus: {
    doc: 'Will be called on the focus set by the user. Returns `{ value, event }`.',
    type: 'function',
    status: 'optional',
  },
  onBlur: {
    doc: 'Will be called on blur set by the user. Returns `{ value, event }`.',
    type: 'function',
    status: 'optional',
  },
  onKeyDown: {
    doc: 'Will be called during every keystroke. Returns `{ value, rows, event }`.',
    type: 'function',
    status: 'optional',
  },
}
