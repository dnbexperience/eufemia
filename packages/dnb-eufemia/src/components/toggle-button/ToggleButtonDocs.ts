import type { PropertiesTableProps } from '../../shared/types'
import { ButtonProperties } from '../button/ButtonDocs'
import {
  statusDocProperty,
  statusStateDocProperty,
  statusPropsDocProperty,
  globalStatusDocProperty,
  skeletonDocProperty,
  spacingDocProperty,
} from '../../shared/sharedDocsProperties'

export const ToggleButtonProperties: PropertiesTableProps = {
  value: {
    doc: 'Defines the `value`. Use it to get the value during the `onChange` event listener callback in the **ToggleButtonGroup**.',
    type: ['string', 'number', 'object', 'Array'],
    status: 'optional',
  },
  text: {
    doc: 'The text shown in the ToggleButton.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
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
  iconPosition: {
    doc: 'Position of the icon inside the toggle button. Set to `left` or `right`. Defaults to `right` if not set.',
    type: ['"left"', '"right"'],
    status: 'optional',
  },
  iconSize: {
    doc: 'Define icon width and height. Defaults to `16px`.',
    type: 'string',
    status: 'optional',
  },
  tooltip: ButtonProperties.tooltip,
  size: ButtonProperties.size,
  status: statusDocProperty,
  statusState: statusStateDocProperty,
  statusProps: statusPropsDocProperty,
  globalStatus: globalStatusDocProperty,
  suffix: {
    doc: 'Text describing the content of the ToggleButton more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButton component.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  skeleton: skeletonDocProperty,
  '[Space](/uilib/layout/space/properties)': spacingDocProperty,
}

export const ToggleButtonEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Will be called on state changes made by the user. Returns a boolean and string `{ checked, value, event }`.',
    type: 'function',
    status: 'optional',
  },
}
