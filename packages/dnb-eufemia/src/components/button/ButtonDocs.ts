import { PropertiesTableProps } from '../../shared/types'

export const ButtonProperties: PropertiesTableProps = {
  type: {
    doc: 'The type HTML attribute. Defaults to `button` for legacy reasons.',
    type: ['button', 'reset', 'submit'],
    status: 'optional',
  },
  text: {
    doc: 'The content of the button can be a string or a React Element.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  'aria-label': {
    doc: 'Required if there is no text in the button. If `text` and `children` are undefined, setting the `title` property will automatically set `aria-label` with the same value.',
    type: 'string',
    status: 'optional',
  },
  title: {
    doc: 'Required if there is no text in the button. If `text` and `children` are undefined, setting the `title` property will automatically set `aria-label` with the same value.',
    type: 'string',
    status: 'optional',
  },
  variant: {
    doc: 'Defines the kind of button. Possible values are `primary`, `secondary`, `tertiary` and `signal`. Defaults to `primary` (or `secondary` if icon only).',
    type: ['primary', 'secondary', 'tertiary', 'signal'],
    status: 'optional',
  },
  size: {
    doc: 'The size of the button. For now there is `small`, `medium`, `default` and `large`.',
    type: ['small', 'medium', 'default', 'large'],
    status: 'optional',
  },
  icon: {
    doc: 'To be included in the button. [Primary Icons](/icons/primary) can be set as a string (e.g. `icon="chevron_right"`), other icons should be set as React elements.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  icon_position: {
    doc: 'Position of icon inside the button. Set to `left` or `right`. Tertiary button variant also supports `top`. Defaults to `right` if not set.',
    type: ['left', 'right', 'top'],
    status: 'optional',
  },
  icon_size: {
    doc: 'Define icon width and height. Defaults to 16px.',
    type: 'string',
    status: 'optional',
  },
  href: {
    doc: 'If you want the button to behave as a link. Use with caution! A link should normally visually be a link and not a button.',
    type: 'string',
    status: 'optional',
  },
  target: {
    doc: 'When button behaves as a link. Used to specify where to open the linked document, specified by `href`. Possible values are `_self`, `_blank`, `_parent` and `_top`.',
    type: ['_self', '_blank', '_parent', '_top'],
    status: 'optional',
  },
  rel: {
    doc: 'When button behaves as a link. Used to specify the relationship between a linked resource and the current document. Examples(non-exhaustive list) of values are `nofollow`, `search`, and `tag`.',
    type: 'string',
    status: 'optional',
  },
  to: {
    doc: 'Use this property only if you are using a router Link component as the `element` that uses the `to` property to declare the navigation url.',
    type: 'string',
    status: 'optional',
  },
  wrap: {
    doc: 'If set to `true` the button text will wrap in to new lines if the overflow point is reached. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  stretch: {
    doc: 'Set it to `true` in order to stretch the button to the available space. Defaults to false.',
    type: 'boolean',
    status: 'optional',
  },
  bounding: {
    doc: 'Set it to `true` in order to extend the bounding box (above the visual button background). You may also look into the HTML class `dnb-button__bounding` if it needs some CSS customization in order to get the particular button right for your use-case.',
    type: 'boolean',
    status: 'optional',
  },
  element: {
    doc: 'Only meant to be used for special use cases. Defaults to `button` or `a` depending if href is set or not.',
    type: 'string',
    status: 'optional',
  },
  custom_content: {
    doc: 'If you need to inject completely custom markup (React Element) into the button component. You have then to handle alignment and styling by yourself.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  tooltip: {
    doc: 'Provide a string or a React Element to be shown as the tooltip content.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  status: {
    doc: 'Set it to either `status="error"` or a text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: ['error', 'info', 'boolean'],
    status: 'optional',
  },
  status_state: {
    doc: 'Defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.',
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
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
