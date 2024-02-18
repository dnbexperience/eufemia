import { PropertiesTableProps } from '../../shared/types'

export const InputProperties: PropertiesTableProps = {
  value: {
    doc: 'The content value of the input.',
    type: 'string',
    state: 'optional',
  },
  align: {
    doc: 'Defines the text alignment of the input. Can be `left`, `right` or `center`. Defaults to `left`.',
    type: 'string',
    state: 'optional',
  },
  label: {
    doc: 'Prepends the Form Label component. If no ID is provided, a random ID is created.',
    type: 'React.Node',
    state: 'optional',
  },
  label_sr_only: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    state: 'optional',
  },
  label_direction: {
    doc: 'Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.',
    type: 'string',
    state: 'optional',
  },
  status: {
    doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: 'string',
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
  placeholder: {
    doc: 'The placeholder which shows up once the input value is empty.',
    type: 'string',
    state: 'optional',
  },
  icon: {
    doc: 'Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.',
    type: ['string', 'React.Component'],
    state: 'optional',
  },
  icon_position: {
    doc: 'Defines the position of icon inside the input. Set to `left` or `right`. Defaults to `left` if not set.',
    type: 'string',
    state: 'optional',
  },
  icon_size: {
    doc: 'The icon size of the icon shows. Defaults to `medium`.',
    type: 'string',
    state: 'optional',
  },
  keep_placeholder: {
    doc: 'Set to `true` in case the `placeholder` has to be kept during focus. By default, the placeholder disappears on focus.',
    type: 'boolean',
    state: 'optional',
  },
  input_class: {
    doc: 'In case we have to set a custom input class.',
    type: 'string',
    state: 'optional',
  },
  type: {
    doc: 'Choose between `text`, `number`, `email`, `password`, `url`, `tel` and `search`.',
    type: 'string',
    state: 'optional',
  },
  autocomplete: {
    doc: 'Defaults to `off`. Set to `on` or any of [allowed `attributes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete). Keep in mind, 1. you may have to define a `name`, 2. have the input as a descendant of a `<form>` element, 3. and have a submit button inside the form.',
    type: 'string',
    state: 'optional',
  },
  submit_button_title: {
    doc: 'Title attribute for the search icon. Only relevant if search input.',
    type: 'string',
    state: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the input more than the label. you can also send in a React component, so it gets wrapped inside the Input component.',
    type: ['string', 'React.Component'],
    state: 'optional',
  },
  size: {
    doc: 'The sizes you can choose is `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute.',
    type: ['string', 'number'],
    state: 'optional',
  },
  selectall: {
    doc: 'If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.',
    type: 'boolean',
    state: 'optional',
  },
  clear: {
    doc: 'If set to `true`, then a clear button will be shown which lets the user clear any given input value.',
    type: 'boolean',
    state: 'optional',
  },
  stretch: {
    doc: 'If set to `true`, then the input field will be 100% in `width`.',
    type: 'boolean',
    state: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    state: 'optional',
  },
  input_attributes: {
    doc: 'Provide the Input element with any attributes by using an Object `input_attributes={{size:\'2\'}}` or a JSON Object `input_attributes=\'{"size":"2"}\'`. **NB:** Keep in mind, that also every not listed component property will be sent along and set as an Input element attribute.',
    type: 'object',
    state: 'optional',
  },
  input_state: {
    doc: 'Defines a custom visual state of the input. Use it only if you have to simulate a custom state. Currently are three statuses `virgin` , `focus` and `dirty`. Defaults to `null`.',
    type: 'string',
    state: 'optional',
  },
  submit_element: {
    doc: 'Accepts a React element which will show up like the "submit button" would do on `type="search"`.',
    type: ['string', 'React.Element'],
    state: 'optional',
  },
  inner_ref: {
    doc: 'By providing a React.ref we can get the internally used input element (DOM). E.g. `inner_ref={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'React.Ref',
    state: 'optional',
  },
  input_element: {
    doc: 'By providing a new component we can change the internally used element. Also supports a string only, like `input_element="input"`.',
    type: ['string', 'React.Element'],
    state: 'internal',
  },
  inner_element: {
    doc: 'By providing a new component to be rendered inside the "shell" – we can add a freely customizable internal element. Used by the Autocomplete component.',
    type: ['string', 'React.Element'],
    state: 'internal',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const InputEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called on value changes made by the user. Returns an object with the value as a string and the native event.',
    type: 'function',
    state: 'optional',
  },
  on_focus: {
    doc: 'Will be called on focus set by the user. Returns an object with the value as a string and the native event.',
    type: 'function',
    state: 'optional',
  },
  on_key_down: {
    doc: 'Will be called on key down by the user. Returns an object with the value as a string and the native event.',
    type: 'function',
    state: 'optional',
  },
  on_blur: {
    doc: 'Will be called on blur set by the user. Returns an object with the value as a string and the native event.',
    type: 'function',
    state: 'optional',
  },
  on_submit: {
    doc: 'Will be called on submit button click. Returns an object with the value as a string and the native event.',
    type: 'function',
    state: 'optional',
  },
  on_clear: {
    doc: 'Will be called on a clear button click. Returns an object with the value as a string, the previous value, and the native event.',
    type: 'function',
    state: 'optional',
  },
}
