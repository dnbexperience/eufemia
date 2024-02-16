import { DocTableProperties } from '../../shared/types'

export const textareaProperties: DocTableProperties = {
  value: {
    doc: 'The content value of the Textarea.',
    type: 'string',
    status: 'optional',
  },
  align: {
    doc: 'Defines the `text-align` of the Textarea. Defaults to `left`.',
    type: 'string',
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
  label: {
    doc: 'Prepends the Form Label component. If no ID is provided, a random ID is created.',
    type: 'string',
    status: 'optional',
  },
  label_direction: {
    doc: 'Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.',
    type: 'string',
    status: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the Textarea more than the label. You can also send in a React component, so it gets wrapped inside the Textarea component.',
    type: 'string',
    status: 'optional',
  },
  label_sr_only: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  autoresize: {
    doc: 'Use `true` to make the Textarea grow and shrink depending on how many lines the user has filled.',
    type: 'boolean',
    status: 'optional',
  },
  autoresize_max_rows: {
    doc: 'Set a number to define how many rows the Textarea can auto grow.',
    type: 'number',
    status: 'optional',
  },
  characterCounter: {
    doc: 'Use a number to define the displayed max length. You can also use an object defining the [TextCounter](uilib/components/fragments/text-counter/) `variant` or properties. Please avoid using `maxLength` for accessibility reasons.',
    type: ['number', 'object'],
    status: 'optional',
  },
  status: {
    doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: ['string', 'boolean'],
    status: 'optional',
  },
  status_state: {
    doc: 'Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.',
    type: 'string',
    status: 'optional',
  },
  status_props: {
    doc: 'Use an object to define additional FormStatus properties.',
    type: 'object',
    status: 'optional',
  },
  globalStatus: {
    doc: 'The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'object',
    status: 'optional',
  },
  textarea_state: {
    doc: 'To control the visual focus state as a prop, like `focus` or `blur`.',
    type: 'string',
    status: 'optional',
  },
  inner_ref: {
    doc: 'By providing a React.Ref we can get the internally used Textarea element (DOM). E.g. `inner_ref={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'React.Ref',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
