import { PropertiesTableProps } from '../../shared/types'

export const GlobalStatusProperties: PropertiesTableProps = {
  id: {
    doc: 'The main ID. Defaults to `main`.',
    type: 'string',
    status: 'optional',
  },
  title: {
    doc: 'The title appears as a part of the status content. Defaults to `En feil har skjedd`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  text: {
    doc: 'The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  children: {
    doc: 'The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  items: {
    doc: 'The items (list items) appear as a part of the status content. you can both use an JSON array, or a vanilla array with a string or an object content. See **Item Object** example below.',
    type: 'Array<GlobalStatusItem>',
    status: 'optional',
  },
  icon: {
    doc: 'The icon shown before the status title. Defaults to `exclamation`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  state: {
    doc: 'Defines the visual appearance of the status. There are four main statuses `error`, `warning`, `info` and `success`. The default status is `error`.',
    type: ['error', 'info', 'warning', 'success'],
    status: 'optional',
  },
  icon_size: {
    doc: 'The icon size of the title icon shows. Defaults to `medium`.',
    type: 'string',
    status: 'optional',
  },
  show: {
    doc: 'Set to `true` or `false` to manually make the global status visible. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  autoclose: {
    doc: 'Set to `true` to automatically close the global status if there are no more left items in the provider stack. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  autoscroll: {
    doc: 'Set to `true` to automatically scroll the page to the appeared global status. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  no_animation: {
    doc: 'Set to `true` to disable the show/hide/slide/fade/grow/shrink animation. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  delay: {
    doc: 'Defines the delay on how long the automated visibility should wait before it appears to the user. Defaults to `200ms`.',
    type: ['number', 'string'],
    status: 'optional',
  },
  hide_close_button: {
    doc: 'Set to `true` if the close button should be hidden for the user. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  close_text: {
    doc: 'Text of the close button. Defaults to `Lukk`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  status_anchor_text: {
    doc: 'Defines the anchor text showing up after every item, in case there is a `status_id` defined. Defaults to `Gå til %s`. The `%s` represents the optional and internal handled label addition.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  omit_set_focus: {
    doc: 'Set to `true` to omit setting the focus during visibility. Defaults to `false`. Additionally, there is `omit_set_focus_on_update` which is set to `true` by default.',
    type: 'boolean',
    status: 'optional',
  },
  omit_set_focus_on_update: {
    doc: 'Set to `true` to omit setting the focus during update. Defaults to `true`.',
    type: 'boolean',
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

export const GlobalStatusAdvancedItemProperties: PropertiesTableProps = {
  text: {
    doc: 'The text appears as the status content. Beside plain text, you can send in a React component as well.',
    type: 'string',
    status: 'required',
  },
  status_id: {
    doc: 'Defines an unique ID so the message can be either updated or removed individual.',
    type: 'string',
    status: 'required',
  },
  status_anchor_url: {
    doc: 'Use `status_anchor_url={true}` to enable the go-to link, defined as a url hash using the `status_id`. Or provide it with an actual url: `status_anchor_url="https://"`.',
    type: 'string',
    status: 'optional',
  },
  status_anchor_text: {
    doc: 'Defines the anchor text showing up after every item. Defaults to `Gå til %s`. The `%s` represents the optional and internal handled label addition.',
    type: 'string',
    status: 'optional',
  },
  status_anchor_label: {
    doc: 'Adds an additional text to the anchor (replaces `%s`), showing up after every item. Is used by default by other form components, if they have an `label`.',
    type: 'string',
    status: 'optional',
  },
}

export const GlobalStatusControllerProperties: PropertiesTableProps = {
  id: {
    doc: 'The main ID. Defaults to `main`.',
    type: 'string',
    status: 'optional',
  },
  status_id: {
    doc: 'Define a new stack ID so you can remove it with the same ID later on. Defaults to `null`.',
    type: 'string',
    status: 'optional',
  },
  remove_on_unmount: {
    doc: 'Set to `true` if you want that the component `<GlobalStatus.Add remove_on_unmount={true} ... />` should automatically remove the stacked status from the target **GlobalStatus** on component unmount. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
}

export const GlobalStatusConfigurationObjectProperties: PropertiesTableProps =
  {
    id: {
      doc: 'The main ID. Defaults to `main`.',
      type: 'string',
      status: 'optional',
    },
    message: {
      doc: 'The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.',
      type: 'React.ReactNode',
      status: 'optional',
    },
  }

export const GlobalStatusEvents: PropertiesTableProps = {
  on_open: {
    doc: 'Gets triggered the first time the GlobalStatus appears on the screen. In other words, it has to have been hidden before. Returns `{ id, status_id, ...properties }`.',
    type: 'function',
    status: 'optional',
  },
  on_show: {
    doc: 'Gets triggered for the first time and for every new content update the GlobalStatus gets. Returns `{ id, status_id, ...properties }`.',
    type: 'function',
    status: 'optional',
  },
  on_close: {
    doc: 'Gets triggered once the GlobalStatus disappears from the screen. Works only if `no_animation` is not `true`. Returns `{ id, status_id, ...properties }`.',
    type: 'function',
    status: 'optional',
  },
  on_hide: {
    doc: 'Gets triggered once the GlobalStatus is getting closed/hidden by the user. Returns `{ id, status_id, ...properties }`.',
    type: 'function',
    status: 'optional',
  },
  on_adjust: {
    doc: 'Gets triggered once the GlobalStatus is getting new content by the user. Returns `{ id, status_id, ...properties }`.',
    type: 'function',
    status: 'optional',
  },
}
