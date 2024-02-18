import { PropertiesTableProps } from '../../shared/types'

export const ProgressIndicatorLinearProperties: PropertiesTableProps = {
  progress: {
    doc: 'To visualize a static "percentage" (0-100) as a progress state. Defaults to `null`.',
    type: 'unknown',
    state: 'optional',
  },
  visible: {
    doc: 'Defines the visibility of the progress. Toggling the `visible` property to `false` will force a fade-out animation. Defaults to `true`.',
    type: 'unknown',
    state: 'optional',
  },
  type: {
    doc: 'Defines the "type" of progress, like `circular` or `linear`. Defaults to `circular`.',
    type: 'unknown',
    state: 'optional',
  },
  no_animation: {
    doc: 'Disables the fade-in and fade-out animation. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  size: {
    doc: 'Defines the size, like `small`, `default`, `medium` or `large`. Defaults to `default`.',
    type: 'unknown',
    state: 'optional',
  },
  label: {
    doc: 'Show a custom label to the right or under the indicator.',
    type: 'unknown',
    state: 'optional',
  },
  label_direction: {
    doc: 'Set it to `vertical` if you want the label to be placed under the indicator. Defaults to `horizontal`.',
    type: 'unknown',
    state: 'optional',
  },
  show_label: {
    doc: 'If set to `true` a default label will be shown.',
    type: 'unknown',
    state: 'optional',
  },
  section_style: {
    doc: 'To enable the visual helper `.dnb-section` class. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `null`.',
    type: 'unknown',
    state: 'optional',
  },
  section_spacing: {
    doc: 'To modify the `spacing`. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `null`.',
    type: 'unknown',
    state: 'optional',
  },
  title: {
    doc: 'Used to set title and aria-label. Defaults to the value of progress property, formatted as a percent.',
    type: 'unknown',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const ProgressIndicatorLinearEvents: PropertiesTableProps = {
  on_complete: {
    doc: 'Will be called once it&#39;s no longer `visible`.',
    type: 'unknown',
    state: 'optional',
  },
}
