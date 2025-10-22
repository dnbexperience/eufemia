import { PropertiesTableProps } from '../../shared/types'

export const RadioProperties: PropertiesTableProps = {
  value: {
    doc: 'defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the **RadioGroup**.',
    type: 'string',
    status: 'required',
  },
  checked: {
    doc: 'determine whether the radio is checked or not. Default will be `false`.',
    type: 'boolean',
    status: 'optional',
  },
  group: {
    doc: 'use a unique group identifier to define the Radio buttons that belongs together.',
    type: 'string',
    status: 'optional',
  },
  size: {
    doc: 'the size of the Radio button. For now there is **medium** (default) and **large**.',
    type: ['medium', 'large'],
    status: 'optional',
  },
  label: {
    doc: 'use either the `label` property or provide a custom one.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  labelPosition: {
    doc: 'defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.',
    type: ['left', 'right'],
    status: 'optional',
  },
  labelSrOnly: {
    doc: 'use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  status: {
    doc: 'text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: ['error', 'info', 'boolean'],
    status: 'optional',
  },
  statusState: {
    doc: "defines the state of the status. It's two statuses `[error, info]`. Defaults to `error`.",
    type: ['error', 'info'],
    status: 'optional',
  },
  statusProps: {
    doc: 'use an object to define additional FormStatus properties.',
    type: 'Various',
    status: 'optional',
  },
  globalStatus: {
    doc: 'the [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'Various',
    status: 'optional',
  },
  innerRef: {
    doc: 'by providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'React.RefObject',
    status: 'optional',
  },
}

export const RadioGroupProperties: PropertiesTableProps = {
  value: {
    doc: 'defines the pre-selected Radio button. The value has to match the one provided in the Radio button. Use a string value.',
    type: 'string',
    status: 'optional',
  },
  name: {
    doc: 'custom grouping name. Defaults to a random name.',
    type: 'string',
    status: 'optional',
  },
  layoutDirection: {
    doc: 'Define the layout direction of the Radio buttons. Can be either `column` or `row`. Defaults to `column`.',
    type: ['column', 'row'],
    status: 'optional',
  },
  size: {
    doc: 'the size of the Radio button. For now there is **medium** (default) and **large**.',
    type: ['medium', 'large'],
    status: 'optional',
  },
  status: {
    doc: 'uses the `form-status` component to show failure messages.',
    type: ['string', 'boolean'],
    status: 'optional',
  },
  statusState: {
    doc: "defines the state of the status. It's two statuses `[error, info]`. Defaults to `error`.",
    type: ['error', 'info'],
    status: 'optional',
  },
  statusProps: {
    doc: 'use an object to define additional FormStatus properties.',
    type: 'Various',
    status: 'optional',
  },
  globalStatus: {
    doc: 'the [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'Various',
    status: 'optional',
  },
  label: {
    doc: 'use either the `label` property or provide a custom one.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  labelDirection: {
    doc: 'to define the `label` layout direction on how the next element should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`.',
    type: ['vertical', 'horizontal'],
    status: 'optional',
  },
  labelSrOnly: {
    doc: 'use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  vertical: {
    doc: 'will force both `direction` and `labelDirection` to be **vertical** if set to `true`.',
    type: 'boolean',
    status: 'optional',
  },
}

export const RadioEvents: PropertiesTableProps = {
  on_change: {
    doc: 'will be called on state changes made by the user. Returns an object `{ checked, value, event }`.',
    type: 'function',
    status: 'optional',
  },
}

export const RadioGroupEvents: PropertiesTableProps = {
  on_change: {
    doc: 'will be called once a Radio button changes the state. Returns an object `{ value, event }`.',
    type: 'function',
    status: 'optional',
  },
}
