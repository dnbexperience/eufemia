import { PropertiesTableProps } from '../../shared/types'

export const TabsProperties: PropertiesTableProps = {
  selected_key: {
    doc: 'In case one of the tabs should be opened by a `key`.',
    type: ['string', 'number'],
    state: 'optional',
  },
  align: {
    doc: 'To align the tab list on the right side `align="right"`. Defaults to `left`.',
    type: ['left', 'center', 'right'],
    state: 'optional',
  },
  content_style: {
    doc: 'To enable the visual helper `.dnb-section` on to the content wrapper. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `null`.',
    type: ['divider', 'white', 'transparent'],
    state: 'optional',
  },
  content_spacing: {
    doc: 'To modify the `spacing` onto the content wrapper. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `large`.',
    type: [
      'boolean',
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large',
    ],
    state: 'optional',
  },
  tabs_style: {
    doc: 'To enable the visual helper `.dnb-section` inside the tabs list. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `null`.',
    type: ['divider', 'white', 'transparent'],
    state: 'optional',
  },
  tabs_spacing: {
    doc: 'To modify the `spacing` inside the tab list. Defaults to `null`.',
    type: 'boolean',
    state: 'optional',
  },
  tab_element: {
    doc: 'Define what HTML element should be used. You can provide e.g. `tab_element={GatsbyLink}` – you may then provide the `to` property inside every entry (`data={[{ to: &#39;url&#39;, ... }]}`). Defaults to `<button>`.',
    type: 'React.ReactNode',
    state: 'optional',
  },
  data: {
    doc: 'defines the data structure to load as a JSON. e.g. `[{title: &#39;...&#39;, content: &#39;Current tab&#39;, key: &#39;...&#39;, hash: &#39;...&#39;}]`',
    type: [
      'stting',
      '{title: string | React.ReactNode, key: string | number, selected?: boolean, disabled?: boolean}',
    ],
    state: 'required',
  },
  children: {
    doc: 'the content to render. Can be a function, returning the current tab content `(key) => (&#39;Current tab&#39;)`, a React Component or an object with the keys and content `{key1: &#39;Current tab&#39;}`.',
    type: ['React.ReactNode', 'object'],
    state: 'required',
  },
  content: {
    doc: 'the content to render. Can be a function, returning the current tab content `(key) => (&#39;Current tab&#39;)`, a React Component or an object with the keys and content `{key1: &#39;Current tab&#39;}`.',
    type: ['React.ReactNode', 'object'],
    state: 'required',
  },
  prerender: {
    doc: 'If set to `true`, the Tabs content will pre-render all contents. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Defaults to `false`.',
    type: 'boolean',
    state: 'optional',
  },
  prevent_rerender: {
    doc: 'If set to `true`, the Tabs content will stay in the DOM. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Similar to `prerender`, but in contrast, the content will render once the user is activating a tab. Defaults to `false`.',
    type: 'boolean',
    state: 'optional',
  },
  scroll: {
    doc: 'If set to `true`, the content will scroll on tab change, until all tabs will be visible on the upper side of the browser window view. Defaults to `false`.',
    type: 'boolean',
    state: 'optional',
  },
  no_border: {
    doc: 'If set to `true`, the default horizontal border line under the tablist will be removed. Defaults to `false`.',
    type: 'boolean',
    state: 'optional',
  },
  nav_button_edge: {
    doc: 'If set to `true`, the navigation icons will have a straight border at their outside. This feature is meant to be used when the Tabs component goes all the way to the browser window. Defaults to `false`.',
    type: 'boolean',
    state: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const TabsEvents: PropertiesTableProps = {
  on_change: {
    doc: '(preferred) this event gets triggered once the tab changes its selected key. Returns `{ key, selected_key, focus_key, event }`.',
    type: 'function',
    state: 'optional',
  },
  on_click: {
    doc: 'This event gets triggered once the tab gets clicked. Returns `{ key, selected_key, focus_key, event }`.',
    type: 'function',
    state: 'optional',
  },
  on_focus: {
    doc: 'This event gets triggered once the tab changes its focus key. Returns `{ key, selected_key, focus_key, event }`.',
    type: 'function',
    state: 'optional',
  },
  on_mouse_enter: {
    doc: 'This event gets triggered once the user&#39;s mouse enters a tab (hover). Returns `{ key, selected_key, focus_key, event }`.',
    type: 'function',
    state: 'optional',
  },
}
