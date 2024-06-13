import { PropertiesTableProps } from '../../shared/types'

export const TabsProperties: PropertiesTableProps = {
  selected_key: {
    doc: 'In case one of the tabs should be opened by a `key`.',
    type: ['string', 'number'],
    status: 'optional',
  },
  align: {
    doc: 'To align the tab list on the right side `align="right"`. Defaults to `left`.',
    type: ['left', 'center', 'right'],
    status: 'optional',
  },
  content_style: {
    doc: 'To enable the visual helper `.dnb-section` on to the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.',
    type: ['divider', 'white', 'transparent'],
    status: 'optional',
  },
  content_spacing: {
    doc: 'To modify the `spacing` onto the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `large`.',
    type: [
      'boolean',
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large',
    ],
    status: 'optional',
  },
  tabs_style: {
    doc: 'To enable the visual helper `.dnb-section` inside the tabs list. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.',
    type: ['divider', 'white', 'transparent'],
    status: 'optional',
  },
  tabs_spacing: {
    doc: 'To modify the `spacing` inside the tab list. Defaults to `null`.',
    type: 'boolean',
    status: 'optional',
  },
  tab_element: {
    doc: "Define what HTML element should be used. You can provide e.g. `tab_element={GatsbyLink}` – you may then provide the `to` property inside every entry (`data={[{ to: ';url';, ... }]}`). Defaults to `<button>`.",
    type: 'React.ReactNode',
    status: 'optional',
  },
  '[data](/uilib/components/tabs/properties/#data-object)': {
    doc: 'defines the data structure to load as an object.',
    type: 'object',
    status: 'required',
  },
  children: {
    doc: "the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.",
    type: ['React.ReactNode', 'object'],
    status: 'required',
  },
  content: {
    doc: "the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.",
    type: ['React.ReactNode', 'object'],
    status: 'required',
  },
  prerender: {
    doc: 'If set to `true`, the Tabs content will pre-render all contents. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  prevent_rerender: {
    doc: 'If set to `true`, the Tabs content will stay in the DOM. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Similar to `prerender`, but in contrast, the content will render once the user is activating a tab. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  scroll: {
    doc: 'If set to `true`, the content will scroll on tab change, until all tabs will be visible on the upper side of the browser window view. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  no_border: {
    doc: 'If set to `true`, the default horizontal border line under the tablist will be removed. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  nav_button_edge: {
    doc: 'If set to `true`, the navigation icons will have a straight border at their outside. This feature is meant to be used when the Tabs component goes all the way to the browser window. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  breakout: {
    doc: 'If set to `false`, the default horizontal border line under the tablist remains inside the parent boundaries. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const TabsDataObject: PropertiesTableProps = {
  title: {
    doc: 'The title of the tab.',
    type: ['string', 'React.ReactNode'],
    status: 'required',
  },
  key: {
    doc: 'The unique key of the tab.',
    type: ['string', 'number'],
    status: 'required',
  },
  content: {
    doc: 'The content of the tab.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  selected: {
    doc: 'If set to `true`, the tab will be selected.',
    type: 'boolean',
    status: 'optional',
  },
  disabled: {
    doc: 'If set to `true`, the tab will be disabled.',
    type: 'boolean',
    status: 'optional',
  },
}

export const TabsEvents: PropertiesTableProps = {
  on_change: {
    doc: '(preferred) this event gets triggered once the tab changes its selected key. Returns `{ key, selected_key, focus_key, event }`.',
    type: 'function',
    status: 'optional',
  },
  on_click: {
    doc: 'This event gets triggered once the tab gets clicked. Returns `{ key, selected_key, focus_key, event }`.',
    type: 'function',
    status: 'optional',
  },
  on_focus: {
    doc: 'This event gets triggered once the tab changes its focus key. Returns `{ key, selected_key, focus_key, event }`.',
    type: 'function',
    status: 'optional',
  },
  on_mouse_enter: {
    doc: "This event gets triggered once the user';s mouse enters a tab (hover). Returns `{ key, selected_key, focus_key, event }`.",
    type: 'function',
    status: 'optional',
  },
}
