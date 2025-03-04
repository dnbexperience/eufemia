import { PropertiesTableProps } from '../../shared/types'
import { ButtonProperties } from '../button/ButtonDocs'

export const ToggleButtonProperties: PropertiesTableProps = {
  value: {
    doc: 'Defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the **ToggleButtonGroup**.',
    type: 'string',
    status: 'required',
  },
  text: {
    doc: 'The text shown in the ToggleButton.',
    type: 'string',
    status: 'required',
  },
  checked: {
    doc: 'Determine whether the ToggleButton is checked or not. The default will be `false`.',
    type: 'boolean',
    status: 'optional',
  },
  title: {
    doc: 'The `title` of the input - describing it a bit further for accessibility reasons.',
    type: 'string',
    status: 'optional',
  },
  label: {
    doc: 'Use either the `label` property or provide a custom one.',
    type: 'string',
    status: 'optional',
  },
  icon: {
    doc: 'Icon to be included in the toggle button.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  icon_position: {
    doc: 'Position of the icon inside the toggle button. Set to `left` or `right`. Defaults to `right` if not set.',
    type: ['left', 'right'],
    status: 'optional',
  },
  icon_size: {
    doc: 'Define icon width and height. Defaults to 16px.',
    type: 'string',
    status: 'optional',
  },
  tooltip: ButtonProperties.tooltip,
  size: ButtonProperties.size,
  status: {
    doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: ['error', 'info', 'boolean'],
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
  suffix: {
    doc: 'Text describing the content of the ToggleButton more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButton component.',
    type: ['string', 'React.ReactNode'],
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
