import { PropertiesTableProps } from '../../shared/types'

export const GlobalStatusControllerProperties: PropertiesTableProps = {
  id: {
    doc: 'The main ID. Defaults to `main`.',
    type: 'unknown',
    state: 'optional',
  },
  title: {
    doc: 'The title appears as a part of the status content. Defaults to `En feil har skjedd`.',
    type: 'unknown',
    state: 'optional',
  },
  text: {
    doc: 'The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.',
    type: 'unknown',
    state: 'optional',
  },
  children: {
    doc: 'The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.',
    type: 'unknown',
    state: 'optional',
  },
  items: {
    doc: 'The items (list items) appear as a part of the status content. you can both use an JSON array, or a vanilla array with a string or an object content. See "Item Object" example below.',
    type: 'unknown',
    state: 'optional',
  },
  icon: {
    doc: 'The icon shown before the status title. Defaults to `exclamation`.',
    type: 'unknown',
    state: 'optional',
  },
  state: {
    doc: 'Defines the visual appearance of the status. There are two main statuses `error`, `warning`, `info` and `success`. The default status is `error`.',
    type: 'unknown',
    state: 'optional',
  },
  icon_size: {
    doc: 'The icon size of the title icon shows. Defaults to `medium`.',
    type: 'unknown',
    state: 'optional',
  },
  show: {
    doc: 'Set to `true` or `false` to manually make the global status visible. Defaults to `true`.',
    type: 'unknown',
    state: 'optional',
  },
  autoclose: {
    doc: 'Set to `true` to automatically close the global status if there are no more left items in the provider stack. Defaults to `true`.',
    type: 'unknown',
    state: 'optional',
  },
  autoscroll: {
    doc: 'Set to `true` to automatically scroll the page to the appeared global status. Defaults to `true`.',
    type: 'unknown',
    state: 'optional',
  },
  no_animation: {
    doc: 'Set to `true` to disable the show/hide/slide/fade/grow/shrink animation. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  delay: {
    doc: 'Defines the delay on how long the automated visibility should wait before it appears to the user. Defaults to `200ms`.',
    type: 'unknown',
    state: 'optional',
  },
  hide_close_button: {
    doc: 'Set to `true` if the close button should be hidden for the user. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  close_text: {
    doc: 'Text of the close button. Defaults to `Lukk`.',
    type: 'unknown',
    state: 'optional',
  },
  status_anchor_text: {
    doc: 'Defines the anchor text showing up after every item, in case there is a `status_id` defined. Defaults to `Gå til %s`. The `%s` represents the optional and internal handled label addition.',
    type: 'unknown',
    state: 'optional',
  },
  omit_set_focus: {
    doc: 'Set to `true` to omit setting the focus during visibility. Defaults to `false`. Additionally, there is `omit_set_focus_on_update` which is set to `true` by default.',
    type: 'unknown',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const GlobalStatusControllerEvents: PropertiesTableProps = {
  on_open: {
    doc: 'Gets triggered the first time the GlobalStatus appears on the screen. In other words, it has to have been hidden before. Returns `{ id, status_id, ...properties }`.',
    type: 'unknown',
    state: 'optional',
  },
  on_show: {
    doc: 'Gets triggered for the first time and for every new content update the GlobalStatus gets. Returns `{ id, status_id, ...properties }`.',
    type: 'unknown',
    state: 'optional',
  },
  on_close: {
    doc: 'Gets triggered once the GlobalStatus disappears from the screen. Works only if `no_animation` is not `true`. Returns `{ id, status_id, ...properties }`.',
    type: 'unknown',
    state: 'optional',
  },
  on_hide: {
    doc: 'Gets triggered once the GlobalStatus is getting closed/hidden by the user. Returns `{ id, status_id, ...properties }`.',
    type: 'unknown',
    state: 'optional',
  },
  on_adjust: {
    doc: 'Gets triggered once the GlobalStatus is getting new content by the user. Returns `{ id, status_id, ...properties }`.',
    type: 'unknown',
    state: 'optional',
  },
}
