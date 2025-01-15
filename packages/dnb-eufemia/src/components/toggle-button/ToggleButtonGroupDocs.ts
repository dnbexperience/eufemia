import { PropertiesTableProps } from '../../shared/types'

export const ToggleButtonGroupProperties: PropertiesTableProps = {
  value: {
    doc: 'Defines the pre-selected ToggleButton button. The value has to match the one provided in the ToggleButton button. Use a string value.',
    type: 'string',
    status: 'optional',
  },
  values: {
    doc: 'Defines the pre-selected ToggleButton buttons in `multiselect` mode. The values have to match the one provided in the ToggleButton buttons. Use array, either as JS or JSON string.',
    type: 'array',
    status: 'optional',
  },
  multiselect: {
    doc: "Defines if the ToggleButton's should act as a multi-selectable list of toggle buttons. Defaults to `false`.",
    type: 'boolean',
    status: 'optional',
  },
  layout_direction: {
    doc: 'Define the layout direction of the ToggleButton buttons. Can be either `column` or `row`. Defaults to `column`.',
    type: ['column', 'row'],
    status: 'optional',
  },
  title: {
    doc: 'The `title` of group, describing it a bit further for accessibility reasons.',
    type: 'string',
    status: 'optional',
  },
  status: {
    doc: 'Uses the `form-status` component to show failure messages.',
    type: 'string',
    status: 'optional',
  },
  status_state: {
    doc: 'Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.',
    type: ['error', 'info'],
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
  label: {
    doc: 'Use either the `label` property or provide a custom one.',
    type: 'string',
    status: 'optional',
  },
  label_direction: {
    doc: 'To define the `label` layout direction on how the next element should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`.',
    type: ['vertical', 'horizontal'],
    status: 'optional',
  },
  label_sr_only: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  vertical: {
    doc: 'Will force both `direction` and `label_direction` to be **vertical** if set to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the ToggleButtonGroup more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButtonGroup component.',
    type: 'string',
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
