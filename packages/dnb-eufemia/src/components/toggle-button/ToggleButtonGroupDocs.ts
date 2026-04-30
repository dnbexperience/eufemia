import type { PropertiesTableProps } from '../../shared/types'
import {
  statusStateDocProperty,
  statusPropsDocProperty,
  globalStatusDocProperty,
  labelSrOnlyDocProperty,
  skeletonDocProperty,
  spacingDocProperty,
} from '../../shared/sharedDocsProperties'

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
  layoutDirection: {
    doc: 'Define the layout direction of the ToggleButton buttons. Can be either `column` or `row`. Defaults to `row`.',
    type: ['"column"', '"row"'],
    status: 'optional',
  },
  title: {
    doc: 'The `title` of group, describing it a bit further for accessibility reasons.',
    type: 'string',
    status: 'optional',
  },
  status: {
    doc: 'Uses the `form-status` component to show failure messages.',
    type: ['"error"', '"information"', 'boolean'],
    status: 'optional',
  },
  statusState: statusStateDocProperty,
  statusProps: statusPropsDocProperty,
  globalStatus: globalStatusDocProperty,
  label: {
    doc: 'Use either the `label` property or provide a custom one.',
    type: 'string',
    status: 'optional',
  },
  labelDirection: {
    doc: 'To define the `label` layout direction on how the next element should be placed on. Can be either `vertical` or `horizontal`. Defaults to `vertical`.',
    type: ['"vertical"', '"horizontal"'],
    status: 'optional',
  },
  labelSrOnly: labelSrOnlyDocProperty,
  vertical: {
    doc: 'Will force both `direction` and `labelDirection` to be `vertical` if set to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the ToggleButtonGroup more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButtonGroup component.',
    type: 'string',
    status: 'optional',
  },
  skeleton: skeletonDocProperty,
  '[Space](/uilib/layout/space/properties)': spacingDocProperty,
}

export const ToggleButtonGroupEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Will be called once a ToggleButton button changes the state. Returns an object `{ value, values, event }`. <br /><br /> **NB**: `values` is only available if `multiselect` is used / true.',
    type: 'function',
    status: 'optional',
  },
}
