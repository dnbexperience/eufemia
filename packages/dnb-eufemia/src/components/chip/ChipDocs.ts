import type { PropertiesTableProps } from '../../shared/types'
import {
  ToggleButtonProperties,
  ToggleButtonEvents,
} from '../toggle-button/ToggleButtonDocs'
import { ToggleButtonGroupProperties } from '../toggle-button/ToggleButtonGroupDocs'

export const ChipProperties: PropertiesTableProps = {
  text: {
    doc: 'The text shown in the Chip.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  value: {
    doc: 'Defines the `value`. Use it to get the value during the `onChange` event listener callback in the **Chip.Group**.',
    type: ['string', 'number', 'object', 'Array'],
    status: 'optional',
  },
  checked: {
    doc: 'Determine whether the Chip is checked or not. The default will be `false`.',
    type: 'boolean',
    status: 'optional',
  },
  variant: {
    doc: 'Use `add-remove` to show an add icon that turns into a remove icon when checked, or `checkbox` or `radio` to show a checkbox or radio button in front of the text. Defaults to `default`.',
    type: ['"default"', '"add-remove"', '"checkbox"', '"radio"'],
    status: 'optional',
  },
  icon: {
    doc: 'Icon shown in front of the text, when `variant` is `default` or `add-remove`.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  leftComponent: {
    doc: 'Custom content shown in front of the text, like a CountryFlag or an Avatar. Used instead of `icon`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  disabled: {
    doc: 'If set to `true`, the Chip is disabled.',
    type: 'boolean',
    status: 'optional',
  },
  title: ToggleButtonProperties.title,
  tooltip: ToggleButtonProperties.tooltip,
  status: ToggleButtonProperties.status,
  statusState: ToggleButtonProperties.statusState,
  statusProps: ToggleButtonProperties.statusProps,
  globalStatus: ToggleButtonProperties.globalStatus,
  skeleton: ToggleButtonProperties.skeleton,
  '[Space](/web/layout-and-typography/layout/space/properties)':
    ToggleButtonProperties[
      '[Space](/web/layout-and-typography/layout/space/properties)'
    ],
}

export const ChipGroupProperties: PropertiesTableProps = {
  label: {
    doc: 'The label of the group. Describes what the Chips select.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  variant: {
    doc: 'Defines the `variant` of every Chip in the group. With `radio`, the group gets the `radiogroup` role. Defaults to `default`.',
    type: ['"default"', '"add-remove"', '"checkbox"', '"radio"'],
    status: 'optional',
  },
  value: {
    doc: 'Defines the pre-selected Chip when `multiselect` is `false`. The value has to match the one provided in the Chip.',
    type: ['string', 'number'],
    status: 'optional',
  },
  values: {
    doc: 'Defines the pre-selected Chips when `multiselect` is `true`. The values have to match the ones provided in the Chips.',
    type: 'Array',
    status: 'optional',
  },
  multiselect: {
    doc: 'Defines if more than one Chip can be checked. Defaults to `true`, or `false` when `variant` is `radio`.',
    type: 'boolean',
    status: 'optional',
  },
  disabled: {
    doc: 'If set to `true`, every Chip in the group is disabled.',
    type: 'boolean',
    status: 'optional',
  },
  labelDirection: ToggleButtonGroupProperties.labelDirection,
  labelSrOnly: ToggleButtonGroupProperties.labelSrOnly,
  layoutDirection: ToggleButtonGroupProperties.layoutDirection,
  status: ToggleButtonGroupProperties.status,
  statusState: ToggleButtonGroupProperties.statusState,
  statusProps: ToggleButtonGroupProperties.statusProps,
  globalStatus: ToggleButtonGroupProperties.globalStatus,
  skeleton: ToggleButtonGroupProperties.skeleton,
  '[Space](/web/layout-and-typography/layout/space/properties)':
    ToggleButtonGroupProperties[
      '[Space](/web/layout-and-typography/layout/space/properties)'
    ],
}

export const ChipEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Will be called on state changes made by the user. Returns an object `{ checked, value, event }`.',
    type: 'function',
    status: 'optional',
  },
  onKeyDown: ToggleButtonEvents.onKeyDown,
  onKeyUp: ToggleButtonEvents.onKeyUp,
}

export const ChipGroupEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Will be called once a Chip in the group changes the state. Returns an object `{ value, values, event }`. `values` is only set when `multiselect` is `true`.',
    type: 'function',
    status: 'optional',
  },
}
