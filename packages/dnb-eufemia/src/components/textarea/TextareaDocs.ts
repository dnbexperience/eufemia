import { PropertiesTableProps } from '../../shared/types'

export const TextareaProperties: PropertiesTableProps = {
  value: {
    doc: 'The content value of the Textarea.',
    type: 'string',
    state: 'optional',
  },
  align: {
    doc: 'Defines the `text-align` of the Textarea. Defaults to `left`.',
    type: 'string',
    state: 'optional',
  },
  stretch: {
    doc: 'If set to `true`, then the Textarea field will be 100% in `width`.',
    type: 'boolean',
    state: 'optional',
  },
  placeholder: {
    doc: 'The placeholder which shows up once the Textarea value is empty.',
    type: 'string',
    state: 'optional',
  },
  keepPlaceholder: {
    doc: 'Use `true` to keep the placeholder visible even when the Textarea has focus. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  label: {
    doc: 'Prepends the Form Label component. If no ID is provided, a random ID is created.',
    type: 'string',
    state: 'optional',
  },
  label_direction: {
    doc: 'Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.',
    type: 'string',
    state: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the Textarea more than the label. You can also send in a React component, so it gets wrapped inside the Textarea component.',
    type: 'string',
    state: 'optional',
  },
  label_sr_only: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    state: 'optional',
  },
  autoresize: {
    doc: 'Use `true` to make the Textarea grow and shrink depending on how many lines the user has filled.',
    type: 'boolean',
    state: 'optional',
  },
  autoresize_max_rows: {
    doc: 'Set a number to define how many rows the Textarea can auto grow.',
    type: 'number',
    state: 'optional',
  },
  characterCounter: {
    doc: 'Use a number to define the displayed max length. You can also use an object defining the [TextCounter](uilib/components/fragments/text-counter/) `variant` or properties. Please avoid using `maxLength` for accessibility reasons.',
    type: ['number', 'object'],
    state: 'optional',
  },
  size: {
    doc: 'The sizes you can choose for 1 row is `small` (2rem), `medium` (2.5rem) and `large` (3rem). Defaults to `small`.',
    type: 'string',
    status: 'optional',
  },
  status: {
    doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: ['string', 'boolean'],
    state: 'optional',
  },
  status_state: {
    doc: 'Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.',
    type: 'string',
    state: 'optional',
  },
  status_props: {
    doc: 'Use an object to define additional FormStatus properties.',
    type: 'object',
    state: 'optional',
  },
  globalStatus: {
    doc: 'The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'object',
    state: 'optional',
  },
  textarea_state: {
    doc: 'To control the visual focus state as a prop, like `focus` or `blur`.',
    type: 'string',
    state: 'optional',
  },
  inner_ref: {
    doc: 'By providing a React.Ref we can get the internally used Textarea element (DOM). E.g. `inner_ref={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'React.Ref',
    state: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const TextareaEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called on value changes made by the user. Returns an object with a string value and the native event: `{ value, rows, event }`.',
    type: 'function',
    state: 'optional',
  },
  on_focus: {
    doc: 'Will be called on the focus set by the user. Returns `{ value, event }`.',
    type: 'function',
    state: 'optional',
  },
  on_blur: {
    doc: 'Will be called on blur set by the user. Returns `{ value, event }`.',
    type: 'function',
    state: 'optional',
  },
  on_key_down: {
    doc: 'Will be called during every keystroke. Returns `{ value, rows, event }`.',
    type: 'function',
    state: 'optional',
  },
}
