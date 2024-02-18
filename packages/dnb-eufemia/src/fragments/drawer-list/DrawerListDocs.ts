import { PropertiesTableProps } from '../../shared/types'

export const DrawerListProperties: PropertiesTableProps = {
  data: {
    doc: "The data we want to fill the list with. Provide the data as a JSON string, array, or object in the specified data structure. If you don't have to define a value, you can also send in a function which will be called once the user opens the DrawerList.",
    type: 'string | object | function',
    state: 'required',
  },
  value: {
    doc: 'Define a preselected data entry (index) or key inside an array item. Can be a string or integer.',
    type: ['string', 'number'],
    state: 'optional',
  },
  default_value: {
    doc: 'Define a startup value or handle a re-render without handling the state during the re-render by yourself. Defaults to null.',
    type: 'number',
    state: 'optional',
  },
  triangle_position: {
    doc: "Position of the arrow icon/triangle inside the drawer-list. Set to 'left' or 'right'. Defaults to 'left' if not set.",
    type: 'string',
    state: 'optional',
  },
  direction: {
    doc: "Defines the direction of how the drawer-list shows the options list. Can be 'bottom' or 'top'. Defaults to 'auto'.",
    type: 'string',
    state: 'optional',
  },
  label_direction: {
    doc: "The direction of the label. If set to 'horizontal', the label will be positioned horizontally next to the input element. If set to 'vertical', the label will be positioned vertically above the input element.",
    type: 'string',
    state: 'optional',
  },
  prevent_selection: {
    doc: 'If set to `true`, the DrawerList will then not make any permanent selection.',
    type: 'boolean',
    state: 'optional',
  },
  focusable: {
    doc: 'If set to `true`, the element is then focusable by assertive technologies.',
    type: 'boolean',
    state: 'optional',
  },
  prevent_close: {
    doc: 'If set to `true`, the DrawerList will not close on any events.',
    type: 'boolean',
    state: 'optional',
  },
  keep_open: {
    doc: 'If set to `true`, the DrawerList will close on outside clicks, but not on selection.',
    type: 'boolean',
    state: 'optional',
  },
  independent_width: {
    doc: 'If set to `true`, the DrawerList will handle its width and position independently of the parent/mother element.',
    type: 'boolean',
    state: 'optional',
  },
  fixed_position: {
    doc: 'If set to `true`, the DrawerList will be fixed in its scroll position by using CSS `position: fixed;`.',
    type: 'boolean',
    state: 'optional',
  },
  enable_body_lock: {
    doc: 'If set to `true`, the HTML body will get locked from scrolling when the Dropdown is open.',
    type: 'boolean',
    state: 'optional',
  },
  skip_keysearch: {
    doc: 'If set to `true`, search items by the first key will be ignored.',
    type: 'boolean',
    state: 'optional',
  },
  ignore_events: {
    doc: 'If set to `true`, all keyboard and mouse events will be ignored.',
    type: 'boolean',
    state: 'optional',
  },
  align_drawer: {
    doc: "Use 'right' to change the options alignment direction. Makes only sense to use in combination with `prevent_selection` or `more_menu` - or if an independent width is used.",
    type: 'string',
    state: 'optional',
  },
  list_class: {
    doc: 'Define an HTML class that will be set on the list, beside `dnb-drawer-list__list`.',
    type: 'string',
    state: 'optional',
  },
  portal_class: {
    doc: 'Define an HTML class that will be set on the DOM portal beside `dnb-drawer-list__portal__style`. Can be useful to handle e.g. a custom `z-index` in relation to a header.',
    type: 'string',
    state: 'optional',
  },
  scrollable: {
    doc: 'Defines if the options list should be scrollable (the `max-height` is set by default to `50vh`).',
    type: 'boolean',
    state: 'optional',
  },
  no_scroll_animation: {
    doc: 'To disable scrolling animation.',
    type: 'boolean',
    state: 'optional',
  },
  no_animation: {
    doc: 'To disable appear/disappear (show/hide) animation.',
    type: 'boolean',
    state: 'optional',
  },
  skip_portal: {
    doc: 'To disable the React Portal behavior.',
    type: 'boolean',
    state: 'optional',
  },
  min_height: {
    doc: 'Defines the minimum height (in `rem`) of the options list.',
    type: 'string',
    state: 'optional',
  },
  max_height: {
    doc: 'Defines the maximum height (in `rem`) of the options list.',
    type: 'string',
    state: 'optional',
  },
  page_offset: {
    doc: 'Defines the available scrollable height. If scrolling should not change the height of the drawer-list, then set it to `0` (useful if the DrawerList is used in fixed positions on contrast to a scrollable page content).',
    type: 'string',
    state: 'optional',
  },
  observer_element: {
    doc: 'Set a HTML element, either as a selector or a DOM element. Can be used to send in an element which will be used to make the direction calculation on.',
    type: 'string',
    state: 'optional',
  },
  cache_hash: {
    doc: 'Set a `cache_hash` as a string to enable internal memorizing of the list to enhance rerendering performance. Components like Autocomplete are using this because of the huge data changes due to search and reorder.',
    type: 'string',
    state: 'optional',
  },
  wrapper_element: {
    doc: "Has to be an HTML Element, ideally a mother element, used to calculate sizes and distances. Also used for the 'click outside' detection. Clicking on the `wrapper_element` will not trigger an outside click.",
    type: 'HTMLElement',
    state: 'optional',
  },
  options_render: {
    doc: 'Has to be a function, returning the items again. See [example](/uilib/components/fragments/drawer-list#example-usage-of-options_render). This can be used to add additional options above the actual rendered list.',
    type: 'function',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const DrawerListEvents: PropertiesTableProps = {
  on_pre_change: {
    doc: 'Will be called before `on_change`, this way you can return false to prevent selection and to prevent `on_change` execution.',
    type: 'function',
    state: 'optional',
  },
  on_change: {
    doc: 'Will be called on state changes made by the user.',
    type: 'function',
    state: 'optional',
  },
  on_select: {
    doc: 'Will be called once the user selects an item by a click or keyboard navigation.',
    type: 'function',
    state: 'optional',
  },
  on_show: {
    doc: 'Will be called once the user presses the drawer-list.',
    type: 'function',
    state: 'optional',
  },
  on_hide: {
    doc: 'Will be called once the user presses the drawer-list again, or clicks somewhere else.',
    type: 'function',
    state: 'optional',
  },
}
