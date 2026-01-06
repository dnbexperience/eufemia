import { PropertiesTableProps } from '../../shared/types'

export const FormStatusProperties: PropertiesTableProps = {
  text: {
    doc: 'The `text` appears as the status message. Beside plain text, you can send in a React component as well.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  children: {
    doc: 'The `text` appears as the status message. Beside plain text, you can send in a React component as well.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  title: {
    doc: 'The `title` attribute in the status.',
    type: 'string',
    status: 'optional',
  },
  role: {
    doc: 'The `role` attribute for accessibility, defaults to `alert`.',
    type: 'string',
    status: 'optional',
  },
  state: {
    doc: 'Defines the visual appearance of the status. These are the statuses `error`, `warn`, `info` and `marketing`. The default status is `error`.',
    type: ['error', 'warn', 'info', 'success', 'marketing'],
    status: 'optional',
  },
  size: {
    doc: 'Defines the appearance size. There are these sizes `default`, `large`. The default status is `default`.',
    type: ['default', 'large'],
    status: 'optional',
  },
  icon: {
    doc: 'The `icon` show before the status text. Defaults to `exclamation`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  icon_size: {
    doc: 'The icon size of the icon shows. Defaults to `medium`.',
    type: 'string',
    status: 'optional',
  },
  variant: {
    doc: 'As of now, there is the `flat` and the `outlined` variant. Defaults to `flat`.',
    type: ['flat', 'outlined'],
    status: 'optional',
  },
  stretch: {
    doc: 'If set to `true`, then the FormStatus will be 100% in available `width`. **NB:** Only use this on independent status messages.',
    type: 'boolean',
    status: 'optional',
  },
  show: {
    doc: 'Provide `false` if you want to animate the visibility. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  no_animation: {
    doc: 'NB: Animation is disabled as of now. ~~use `true` to omit the animation on content visibility. Defaults to `false`.~~',
    type: 'boolean',
    status: 'optional',
  },
  globalStatus: {
    doc: 'The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'Various',
    status: 'optional',
  },
  shellSpace: {
    doc: 'Use it to set an inner margin. It supports the same properties as [Space](/uilib/layout/space/properties). Useful for animation.',
    type: ['string', 'object'],
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
