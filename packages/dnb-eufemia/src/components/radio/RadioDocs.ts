import { PropertiesTableProps } from '../../shared/types'

export const RadioProperties: PropertiesTableProps = {
  value: {
    doc: 'Defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the **RadioGroup**.',
    type: 'string',
    status: 'required',
  },
  checked: {
    doc: 'Determine whether the radio is checked or not. Default will be `false`.',
    type: 'boolean',
    status: 'optional',
  },
  group: {
    doc: 'Use a unique group identifier to define the Radio buttons that belongs together.',
    type: 'string',
    status: 'optional',
  },
  size: {
    doc: 'The size of the Radio button. For now there is **medium** (default) and **large**.',
    type: ['medium', 'large'],
    status: 'optional',
  },
  label: {
    doc: 'Use either the `label` property or provide a custom one.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  labelPosition: {
    doc: 'Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.',
    type: ['left', 'right'],
    status: 'optional',
  },
  labelSrOnly: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  status: {
    doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: ['error', 'info', 'boolean'],
    status: 'optional',
  },
  statusState: {
    doc: "Defines the state of the status. It's two statuses `[error, info]`. Defaults to `error`.",
    type: ['error', 'info'],
    status: 'optional',
  },
  statusProps: {
    doc: 'Use an object to define additional FormStatus properties.',
    type: 'Various',
    status: 'optional',
  },
  globalStatus: {
    doc: 'The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'Various',
    status: 'optional',
  },
  innerRef: {
    doc: 'By providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'React.RefObject',
    status: 'optional',
  },
}

export const RadioGroupProperties: PropertiesTableProps = {
  value: {
    doc: 'Defines the pre-selected Radio button. The value has to match the one provided in the Radio button. Use a string value.',
    type: 'string',
    status: 'optional',
  },
  name: {
    doc: 'Custom grouping name. Defaults to a random name.',
    type: 'string',
    status: 'optional',
  },
  layoutDirection: {
    doc: 'Define the layout direction of the Radio buttons. Can be either `column` or `row`. Defaults to `column`.',
    type: ['column', 'row'],
    status: 'optional',
  },
  size: {
    doc: 'The size of the Radio button. For now there is **medium** (default) and **large**.',
    type: ['medium', 'large'],
    status: 'optional',
  },
  status: {
    doc: 'Uses the `form-status` component to show failure messages.',
    type: ['string', 'boolean'],
    status: 'optional',
  },
<<<<<<< HEAD
  status_state: {
    doc: "Defines the state of the status. It's two statuses `[error, info]`. Defaults to `error`.",
    type: ['error', 'info'],
    status: 'optional',
  },
  status_props: {
    doc: 'Use an object to define additional FormStatus properties.',
=======
  statusState: {
    doc: "defines the state of the status. It's two statuses `[error, info]`. Defaults to `error`.",
    type: ['error', 'info'],
    status: 'optional',
  },
  statusProps: {
    doc: 'use an object to define additional FormStatus properties.',
>>>>>>> 4d8f2d1c523 (break(Radio)!: replace `snake_case` properties with `camelCase` (#5820))
    type: 'Various',
    status: 'optional',
  },
  globalStatus: {
    doc: 'The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'Various',
    status: 'optional',
  },
  label: {
    doc: 'Use either the `label` property or provide a custom one.',
    type: 'React.ReactNode',
    status: 'optional',
  },
<<<<<<< HEAD
  label_direction: {
    doc: 'To define the `label` layout direction on how the next element should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`.',
    type: ['vertical', 'horizontal'],
    status: 'optional',
  },
  label_sr_only: {
    doc: 'Use `true` to make the label only readable by screen readers.',
=======
  labelDirection: {
    doc: 'to define the `label` layout direction on how the next element should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`.',
    type: ['vertical', 'horizontal'],
    status: 'optional',
  },
  labelSrOnly: {
    doc: 'use `true` to make the label only readable by screen readers.',
>>>>>>> 4d8f2d1c523 (break(Radio)!: replace `snake_case` properties with `camelCase` (#5820))
    type: 'boolean',
    status: 'optional',
  },
  vertical: {
<<<<<<< HEAD
    doc: 'Will force both `direction` and `label_direction` to be **vertical** if set to `true`.',
=======
    doc: 'will force both `direction` and `labelDirection` to be **vertical** if set to `true`.',
>>>>>>> 4d8f2d1c523 (break(Radio)!: replace `snake_case` properties with `camelCase` (#5820))
    type: 'boolean',
    status: 'optional',
  },
}

export const RadioEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called on state changes made by the user. Returns an object `{ checked, value, event }`.',
    type: 'function',
    status: 'optional',
  },
}

export const RadioGroupEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called once a Radio button changes the state. Returns an object `{ value, event }`.',
    type: 'function',
    status: 'optional',
  },
}
