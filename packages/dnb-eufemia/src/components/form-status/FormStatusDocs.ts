import { PropertiesTableProps } from '../../shared/types'

export const FormStatusProperties: PropertiesTableProps = {
  text: {
    doc: 'The `text` appears as the status message. Beside plain text, you can send in a React component as well.',
    type: 'unknown',
    state: 'optional',
  },
  children: {
    doc: 'The `text` appears as the status message. Beside plain text, you can send in a React component as well.',
    type: 'unknown',
    state: 'optional',
  },
  title: {
    doc: 'The `title` attribute in the status.',
    type: 'unknown',
    state: 'optional',
  },
  role: {
    doc: 'The `role` attribute for accessibility, defaults to `alert`',
    type: 'unknown',
    state: 'optional',
  },
  state: {
    doc: 'Defines the visual appearance of the status. These are the statuses `error`, `warn`, `info` and `marketing`. The default status is `error`.',
    type: 'unknown',
    state: 'optional',
  },
  size: {
    doc: 'Defines the appearance size. There are these sizes `default`, `large`. The default status is `default`.',
    type: 'unknown',
    state: 'optional',
  },
  icon: {
    doc: 'The `icon` show before the status text. Defaults to `exclamation`.',
    type: 'unknown',
    state: 'optional',
  },
  icon_size: {
    doc: 'The icon size of the icon shows. Defaults to `medium`.',
    type: 'unknown',
    state: 'optional',
  },
  variant: {
    doc: 'As of now, there is the `flat` and the `outlined` variant. Defaults to `flat`.',
    type: 'unknown',
    state: 'optional',
  },
  stretch: {
    doc: 'If set to `true`, then the FormStatus will be 100% in available `width`. "NB:" Only use this on independent status messages.',
    type: 'unknown',
    state: 'optional',
  },
  show: {
    doc: 'Provide `false` if you want to animate the visibility. Defaults to `true`.',
    type: 'unknown',
    state: 'optional',
  },
  no_animation: {
    doc: 'NB: Animation is disabled as of now. <del>use `true` to omit the animation on content visibility. Defaults to `false`.</del>',
    type: 'unknown',
    state: 'optional',
  },
  globalStatus: {
    doc: 'The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.',
    type: 'unknown',
    state: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'unknown',
    state: 'optional',
  },
  shellSpace: {
    doc: 'Use it to set an inner margin. It supports the same props as `space`. Useful for animation.',
    type: 'unknown',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}
