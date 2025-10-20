import { PropertiesTableProps } from '../../shared/types'

export const DrawerListProperties = {
  '[data](#the-data-property)': {
    doc: `The data we want to fill the list with. [Details on the type of {DATA} can be found below](#the-data-property). The data can be provided as an array or object. Or as a function that returns the data (called when user opens the list).`,
    type: ['{DATA}', '() => {DATA}'],
    status: 'required',
  },
  groups: {
    doc: 'An array of group titles for the list items. Only the first group can be `undefined`',
    type: 'React.ReactNode[]',
    status: 'optional',
  },
  value: {
    doc: 'Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` prop (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).',
    type: ['string', 'number'],
    status: 'optional',
  },
  defaultValue: {
    doc: 'Define a startup value or handle a re-render without handling the state during the re-render by yourself. Defaults to `null`.',
    type: 'number',
    status: 'optional',
  },
  trianglePosition: {
    doc: "Position of the arrow icon/triangle inside the drawer-list. Set to 'left' or 'right'. Defaults to 'left' if not set.",
    type: 'string',
    status: 'optional',
  },
  direction: {
    doc: "Defines the direction of how the drawer-list shows the options list. Can be 'bottom' or 'top'. Defaults to 'auto'.",
    type: 'string',
    status: 'optional',
  },
  label_direction: {
    doc: "The direction of the label. If set to 'horizontal', the label will be positioned horizontally next to the input element. If set to 'vertical', the label will be positioned vertically above the input element.",
    type: 'string',
    status: 'optional',
  },
  preventSelection: {
    doc: 'If set to `true`, the DrawerList will then not make any permanent selection.',
    type: 'boolean',
    status: 'optional',
  },
  focusable: {
    doc: 'If set to `true`, the element is then focusable by assertive technologies.',
    type: 'boolean',
    status: 'optional',
  },
  preventClose: {
    doc: 'If set to `true`, the DrawerList will not close on any events.',
    type: 'boolean',
    status: 'optional',
  },
  keepOpen: {
    doc: 'If set to `true`, the DrawerList will close on outside clicks, but not on selection.',
    type: 'boolean',
    status: 'optional',
  },
  independentWidth: {
    doc: 'If set to `true`, the DrawerList will handle its width and position independently of the parent/mother element.',
    type: 'boolean',
    status: 'optional',
  },
  fixedPosition: {
    doc: 'If set to `true`, the DrawerList will be fixed in its scroll position by using CSS `position: fixed;`.',
    type: 'boolean',
    status: 'optional',
  },
  enableBodyLock: {
    doc: 'If set to `true`, the HTML body will get locked from scrolling when the Dropdown is open.',
    type: 'boolean',
    status: 'optional',
  },
  skipKeysearch: {
    doc: 'If set to `true`, search items by the first key will be ignored.',
    type: 'boolean',
    status: 'optional',
  },
  ignore_events: {
    doc: 'If set to `true`, all keyboard and mouse events will be ignored.',
    type: 'boolean',
    status: 'optional',
  },
  alignDrawer: {
    doc: "Use 'right' to change the options alignment direction. Makes only sense to use in combination with `preventSelection` or `more_menu` - or if an independent width is used.",
    type: 'string',
    status: 'optional',
  },
  listClass: {
    doc: 'Define an HTML class that will be set on the list, beside `dnb-drawer-list__list`.',
    type: 'string',
    status: 'optional',
  },
  portalClass: {
    doc: 'Define an HTML class that will be set on the DOM portal beside `dnb-drawer-list__portal__style`. Can be useful to handle e.g. a custom `z-index` in relation to a header.',
    type: 'string',
    status: 'optional',
  },
  scrollable: {
    doc: 'Defines if the options list should be scrollable (the `max-height` is set by default to `50vh`).',
    type: 'boolean',
    status: 'optional',
  },
  noScrollAnimation: {
    doc: 'To disable scrolling animation.',
    type: 'boolean',
    status: 'optional',
  },
  no_animation: {
    doc: 'To disable appear/disappear (show/hide) animation.',
    type: 'boolean',
    status: 'optional',
  },
  skipPortal: {
    doc: 'To disable the React Portal behavior.',
    type: 'boolean',
    status: 'optional',
  },
  minHeight: {
    doc: 'Defines the minimum height (in `rem`) of the options list.',
    type: 'string',
    status: 'optional',
  },
  maxHeight: {
    doc: 'Defines the maximum height (in `rem`) of the options list.',
    type: 'string',
    status: 'optional',
  },
  page_offset: {
    doc: 'Defines the available scrollable height. If scrolling should not change the height of the drawer-list, then set it to `0` (useful if the DrawerList is used in fixed positions on contrast to a scrollable page content).',
    type: 'string',
    status: 'optional',
  },
  observerElement: {
    doc: 'Set a HTML element, either as a selector or a DOM element. Can be used to send in an element which will be used to make the direction calculation on.',
    type: 'string',
    status: 'optional',
  },
  cacheHash: {
    doc: 'Set a `cacheHash` as a string to enable internal memorizing of the list to enhance rerendering performance. Components like Autocomplete are using this because of the huge data changes due to search and reorder.',
    type: 'string',
    status: 'optional',
  },
  wrapperElement: {
    doc: "Has to be an HTML Element, or a selector for one, ideally a mother element, used to calculate sizes and distances. Also used for the 'click outside' detection. Clicking on the `wrapperElement` will not trigger an outside click.",
    type: ['string', 'HTMLElement'],
    status: 'optional',
  },
  optionsRender: {
    doc: 'Has to be a function, returning the items again. See [example](/uilib/components/fragments/drawer-list#example-usage-of-optionsRender). This can be used to add additional options above the actual rendered list.',
    type: 'function',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
} satisfies PropertiesTableProps

export const DrawerListEvents = {
  on_pre_change: {
    doc: 'Will be called before `on_change`, this way you can return false to prevent selection and to prevent `on_change` execution.',
    type: 'function',
    status: 'optional',
  },
  on_change: {
    doc: 'Will be called on state changes made by the user.',
    type: 'function',
    status: 'optional',
  },
  on_select: {
    doc: 'Will be called once the user focuses or selects an item by a click or keyboard navigation.',
    type: 'function',
    status: 'optional',
  },
  on_show: {
    doc: 'Will be called once the user presses the drawer-list.',
    type: 'function',
    status: 'optional',
  },
  on_hide: {
    doc: 'Will be called once the user presses the drawer-list again, or clicks somewhere else.',
    type: 'function',
    status: 'optional',
  },
} satisfies PropertiesTableProps

export const DrawerListItem = {
  content: {
    doc: 'Visual content in the list item',
    type: ['string', 'React.node', '(string | React.Node)[]'],
    status: 'optional',
  },
  disabled: {
    doc: 'Disables the list item from selection',
    type: 'boolean',
    status: 'optional',
  },
  groupIndex: {
    doc: 'What group index in the `groups` prop this item belongs to.',
    type: 'number',
    status: 'optional',
  },
  selectedKey: {
    doc: 'If set, can be used instead of array index by the `value` prop',
    type: ['string', 'number'],
    status: 'optional',
  },
  selected_value: {
    doc: 'Replaces the standard value output for selected item. Only used in some implementations (Dropdown, Autocomplete).',
    type: ['string', 'React.Node'],
    status: 'optional',
  },
  suffix_value: {
    doc: 'Content placed to the right in the list item.',
    type: ['string', 'React.node'],
    status: 'optional',
  },
} satisfies PropertiesTableProps
