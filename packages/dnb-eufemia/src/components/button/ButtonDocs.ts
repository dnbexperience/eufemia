import { PropertiesTableProps } from '../../shared/types'

export const ButtonProperties: PropertiesTableProps = {
  type: {
    doc: '`button`, `reset` or `submit` for the `type` HTML attribute. Defaults to `button` for legacy reasons.',
    type: 'unknown',
    state: 'optional',
  },
  text: {
    doc: 'The content of the button can be a string or a React Element.',
    type: 'unknown',
    state: 'optional',
  },
  children: {
    doc: 'The content of the button can be a string or a React Element.',
    type: 'unknown',
    state: 'optional',
  },
  title: {
    doc: 'Title of the button. Optional, but should always be included because of accessibility.',
    type: 'unknown',
    state: 'optional',
  },
  variant: {
    doc: 'Defines the kind of button. Possible values are `primary`, `secondary`, `tertiary` and `signal`. Defaults to `primary` (or `secondary` if icon only).',
    type: 'unknown',
    state: 'optional',
  },
  size: {
    doc: 'The size of the button. For now there is "medium", "default" and "large".',
    type: 'unknown',
    state: 'optional',
  },
  icon: {
    doc: 'To be included in the button. <a href="/icons/primary">Primary Icons</a> can be set as a string (e.g. `icon="chevron_right"`), other icons should be set as React elements.',
    type: 'unknown',
    state: 'optional',
  },
  icon_position: {
    doc: 'Position of icon inside the button. Set to `left` or `right`. Tertiary button variant also supports `top`. Defaults to `right` if not set.',
    type: 'unknown',
    state: 'optional',
  },
  icon_size: {
    doc: 'Define icon width and height. Defaults to 16px.',
    type: 'unknown',
    state: 'optional',
  },
  class: {
    doc: 'Any extra modifying class.',
    type: 'unknown',
    state: 'optional',
  },
  href: {
    doc: 'If you want the button to behave as a link. Use with caution! A link should normally visually be a link and not a button.',
    type: 'unknown',
    state: 'optional',
  },
  target: {
    doc: 'When button behaves as a link. Used to specify where to open the linked document, specified by `href`. Possible values are `_self`, `_blank`, `_parent` and `_top`.',
    type: 'unknown',
    state: 'optional',
  },
  rel: {
    doc: 'When button behaves as a link. Used to specify the relationship between a linked resource and the current document. Examples(non-exhaustive list) of values are `nofollow`, `search`, and `tag`.',
    type: 'unknown',
    state: 'optional',
  },
  to: {
    doc: 'Use this prop only if you are using a router Link component as the `element` that uses the `to` property to declare the navigation url.',
    type: 'unknown',
    state: 'optional',
  },
  wrap: {
    doc: 'If set to `true` the button text will wrap in to new lines if the overflow point is reached. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  stretch: {
    doc: 'Set it to `true` in order to stretch the button to the available space. Defaults to false.',
    type: 'unknown',
    state: 'optional',
  },
  bounding: {
    doc: 'Set it to `true` in order to extend the bounding box (above the visual button background). You may also look into the HTML class `dnb-button__bounding` if it needs some CSS customization in order to get the particular button right for your use-case.',
    type: 'unknown',
    state: 'optional',
  },
  element: {
    doc: 'Only meant to be used for special use cases. Defaults to `button` or `a` depending if href is set or not.',
    type: 'unknown',
    state: 'optional',
  },
  custom_content: {
    doc: 'If you need to inject completely custom markup (React Element) into the button component. You have then to handle alignment and styling by yourself.',
    type: 'unknown',
    state: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'unknown',
    state: 'optional',
  },
  tooltip: {
    doc: 'Provide a string or a React Element to be shown as the tooltip content.',
    type: 'unknown',
    state: 'optional',
  },
  status: {
    doc: 'Set it to either `status="error"` or a text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: 'unknown',
    state: 'optional',
  },
  status_state: {
    doc: 'Defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.',
    type: 'unknown',
    state: 'optional',
  },
  status_props: {
    doc: 'Use an object to define additional FormStatus properties.',
    type: 'unknown',
    state: 'optional',
  },
  globalStatus: {
    doc: 'The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.',
    type: 'unknown',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const ButtonEvents: PropertiesTableProps = {
  on_click: {
    doc: 'Will be called on a click event. Returns an object with the native event: `{ event }`.',
    type: 'unknown',
    state: 'optional',
  },
}
