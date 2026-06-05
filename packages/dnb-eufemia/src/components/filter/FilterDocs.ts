import type { PropertiesTableProps } from '../../shared/types'

export const HeaderProperties: PropertiesTableProps = {
  className: {
    doc: 'Custom CSS class name.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'Filter controls like `Filter.Toolbar`, `Filter.Panel`, and `Filter.ActiveFilters`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}

export const RootProperties: PropertiesTableProps = {
  id: {
    doc: 'Unique identifier that links the filter UI to `Filter.useFilter(id)` consumers via shared state.',
    type: 'string',
    status: 'required',
  },
  behavior: {
    doc: 'Controls when filter changes are emitted. `"realtime"` (default) emits on every change. `"manual"` buffers filter changes internally until the user clicks Apply in the panel. Search input is always emitted in real time.',
    type: ['"realtime"', '"manual"'],
    status: 'optional',
  },
  resultCount: {
    doc: 'The number of matching results. Passed to child components that can display the count.',
    type: 'number',
    status: 'optional',
  },
  defaultFilters: {
    doc: 'Pre-selected filters to apply on mount. The panel and relevant filter accordions open automatically. Keys should match the filter key format (e.g. `/type/card`).',
    type: 'Record<string, FilterValue>',
    status: 'optional',
  },
  defaultPanelOpen: {
    doc: 'Controls whether the filter panel is open on mount. When `true`, the panel opens even without active filters. When `false`, the panel stays closed even with `defaultFilters` or URL-restored filters. Defaults to opening automatically when filters are present.',
    type: 'boolean',
    status: 'optional',
  },
  resultLoading: {
    doc: 'When `true`, the result count shows a skeleton loading state. Use this while fetching result counts asynchronously.',
    type: 'boolean',
    status: 'optional',
  },
  className: {
    doc: 'Custom CSS class name applied to the root element.',
    type: 'string',
    status: 'optional',
  },
  style: {
    doc: 'Inline styles applied to the root element. Use e.g. `maxWidth` to control the width of the filter.',
    type: 'CSSProperties',
    status: 'optional',
  },
  children: {
    doc: 'Filter sub-components like `Filter.Search`, `Filter.Panel`, `Filter.ActiveFilters`, etc.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const SearchProperties: PropertiesTableProps = {
  label: {
    doc: 'Label for the search input.',
    type: 'string',
    status: 'required',
  },
  submitBehavior: {
    doc: 'When set to `"onSubmit"`, the search state is only updated when the user presses Enter or clicks the submit button. Automatically applies `type="search"` to show the submit button.',
    type: '"onSubmit"',
    status: 'optional',
  },
  placeholder: {
    doc: 'Placeholder text for the search input.',
    type: 'string',
    status: 'optional',
  },
  className: {
    doc: 'Custom CSS class name.',
    type: 'string',
    status: 'optional',
  },
}

export const PanelProperties: PropertiesTableProps = {
  className: {
    doc: 'Custom CSS class name.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'Filter components rendered inside the panel, e.g. `Filter.Selection`, `Filter.Date`, or custom filters.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}

export const PanelButtonProperties: PropertiesTableProps = {
  children: {
    doc: 'Button label text. Defaults to the translated `"Filter"` label.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  '[Button props]': {
    doc: 'All [Button](/uilib/components/button/properties) props are supported except `variant`, `icon`, `iconPosition`, `transitionState`, and `aria-expanded`.',
    type: 'Various',
    status: 'optional',
  },
}

export const ActiveFiltersProperties: PropertiesTableProps = {
  label: {
    doc: 'Accessible label for the active filters group. Defaults to `"Aktive filtre"`.',
    type: 'string',
    status: 'optional',
  },
  showCategoryLabel: {
    doc: 'When `true`, each tag is prefixed with the category name (e.g. "Betalingstype: Kort" instead of "Kort").',
    type: 'boolean',
    status: 'optional',
  },
  collapsibleThreshold: {
    doc: 'When the number of active filters exceeds this threshold, tags are shown inside a collapsible accordion with a scrollable area and a "Clear all" button.',
    type: 'number',
    status: 'optional',
  },
  className: {
    doc: 'Custom CSS class name.',
    type: 'string',
    status: 'optional',
  },
}

export const ToolbarProperties: PropertiesTableProps = {
  className: {
    doc: 'Custom CSS class name.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'Toolbar content — typically `Filter.Search` on the left and `Filter.Toolbar.Actions` grouping action buttons on the right.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}

export const ToolbarActionsProperties: PropertiesTableProps = {
  className: {
    doc: 'Custom CSS class name.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'Action buttons or controls to display on the right side of the toolbar.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}

export const ItemProperties: PropertiesTableProps = {
  label: {
    doc: 'Label displayed for this filter section.',
    type: 'string',
    status: 'required',
  },
  filterKey: {
    doc: 'Unique key identifying this filter in the state.',
    type: 'string',
    status: 'required',
  },
  defaultOpen: {
    doc: 'When `true`, the accordion starts expanded. The open/closed state is remembered across panel opens without a page refresh.',
    type: 'boolean',
    status: 'optional',
  },
  className: {
    doc: 'Custom CSS class name.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'Filter content rendered inside the item.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}

export const DateProperties: PropertiesTableProps = {
  label: {
    doc: 'Label for the date filter. Defaults to the locale translation (e.g. "Dato" in Norwegian, "Date" in English).',
    type: 'string',
    status: 'optional',
  },
  filterKey: {
    doc: 'Unique key for this filter in the state. Defaults to `"date"`.',
    type: 'string',
    status: 'optional',
  },
  defaultOpen: {
    doc: 'When `true`, the accordion starts expanded. The state is remembered across panel opens.',
    type: 'boolean',
    status: 'optional',
  },
}

export const SelectionProperties: PropertiesTableProps = {
  label: {
    doc: 'Label for the selection filter.',
    type: 'string',
    status: 'required',
  },
  filterKey: {
    doc: 'Unique key for this filter group. Individual selections are stored as `filterKey/value` entries in the filter state.',
    type: 'string',
    status: 'required',
  },
  data: {
    doc: 'Array of selectable items. Each item has a `value` (string) and `label` (string).',
    type: 'Array<{ value: string; label: string }>',
    status: 'required',
  },
  defaultOpen: {
    doc: 'When `true`, the accordion starts expanded. The state is remembered across panel opens.',
    type: 'boolean',
    status: 'optional',
  },
}

export const MultiSelectionProperties: PropertiesTableProps = {
  label: {
    doc: 'Label for the multi-selection filter.',
    type: 'string',
    status: 'required',
  },
  filterKey: {
    doc: 'Unique key for this filter group. Individual selections are stored as `filterKey/value` entries in the filter state.',
    type: 'string',
    status: 'required',
  },
  data: {
    doc: 'Array of selectable items. Each item has a `value` (string | number) and `title` (ReactNode).',
    type: 'Array<{ value: string | number; title: React.ReactNode }>',
    status: 'required',
  },
  defaultOpen: {
    doc: 'When `true`, the accordion starts expanded. The state is remembered across panel opens.',
    type: 'boolean',
    status: 'optional',
  },
}

export const NoResultsProperties: PropertiesTableProps = {
  connectedTo: {
    doc: 'Links to a `Filter.Root` by its `id`. Reads `resultCount` from the shared filter state. When used, `resultCount` prop is not needed.',
    type: 'string',
    status: 'optional',
  },
  resultCount: {
    doc: 'The number of results. When `0`, the no-results message is shown. When omitted, falls back to the `resultCount` from the linked `connectedTo` or nearest `Filter.Root`.',
    type: 'number',
    status: 'optional',
  },
  children: {
    doc: 'Custom message to display instead of the default translated text.',
    type: 'string',
    status: 'optional',
  },
  className: {
    doc: 'Custom CSS class name.',
    type: 'string',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ResultCountProperties: PropertiesTableProps = {
  connectedTo: {
    doc: 'Links to a `Filter.Root` by its `id`. Reads `resultCount` from the shared filter state.',
    type: 'string',
    status: 'optional',
  },
  resultCount: {
    doc: 'The number of results to display. When omitted, falls back to the `resultCount` from the linked `connectedTo` or nearest `Filter.Root`.',
    type: 'number',
    status: 'optional',
  },
  alwaysVisible: {
    doc: 'When `true`, the result count is always visible even when no filters or search text are active. By default the count is only shown when filters are active.',
    type: 'boolean',
    status: 'optional',
  },
  children: {
    doc: 'Custom message to display instead of the default translated text.',
    type: 'string',
    status: 'optional',
  },
  className: {
    doc: 'Custom CSS class name.',
    type: 'string',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ContentProperties: PropertiesTableProps = {
  connectedTo: {
    doc: 'Links to a `Filter.Root` by its `id`. When omitted and used inside a `Filter.Root`, the id is inherited from context.',
    type: 'string',
    status: 'optional',
  },
  className: {
    doc: 'Custom CSS class name.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'Result content to render. Wrapped in a skeleton when the linked filter is loading.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const QuickFiltersProperties: PropertiesTableProps = {
  className: {
    doc: 'Custom CSS class name.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'Quick filter toggle buttons or other controls.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}

export const SortButtonProperties: PropertiesTableProps = {
  data: {
    doc: 'Sort options passed to the underlying Dropdown. Each item should have a `selectedKey` and `content`.',
    type: 'DrawerListData',
    status: 'required',
  },
  value: {
    doc: 'The currently selected sort value.',
    type: ['string', 'number'],
    status: 'optional',
  },
  defaultValue: {
    doc: 'Default sort value on mount.',
    type: ['string', 'number'],
    status: 'optional',
  },
  size: {
    doc: 'Size of the trigger button. Defaults to `"medium"`.',
    type: ['"default"', '"small"', '"medium"', '"large"'],
    status: 'optional',
  },
  '[Dropdown props]': {
    doc: 'All other [Dropdown](/uilib/components/dropdown/properties) props are forwarded.',
    type: 'Various',
    status: 'optional',
  },
}

export const SortButtonEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Called when the user selects a sort option. Receives the Dropdown change event.',
    type: '(event: DrawerListChangeEvent) => void',
    status: 'optional',
  },
}

export const UseFilterProperties: PropertiesTableProps = {
  filters: {
    doc: 'Object containing all active filters keyed by filterKey.',
    type: 'Record<string, FilterValue>',
    status: 'required',
  },
  search: {
    doc: 'The current search string.',
    type: 'string',
    status: 'required',
  },
  hasActiveFilters: {
    doc: '`true` when any filter or search text is active.',
    type: 'boolean',
    status: 'required',
  },
  resetFilters: {
    doc: 'Clears all filters and search text.',
    type: '() => void',
    status: 'required',
  },
  removeFilter: {
    doc: 'Removes a single filter by its filterKey.',
    type: '(filterKey: string) => void',
    status: 'required',
  },
}

export const UseFilterAsyncParams: PropertiesTableProps = {
  id: {
    doc: 'The `id` of the `Filter.Root` to link to.',
    type: 'string',
    status: 'required',
  },
  fetcher: {
    doc: 'Async function called whenever filters or search change. Receives `{ filters, search }` and should return the filtered data.',
    type: '(params: { filters, search }) => Promise<T>',
    status: 'required',
  },
  'options.initialData': {
    doc: 'Data to return before the first fetch completes.',
    type: 'T',
    status: 'optional',
  },
  'options.debounce': {
    doc: 'Delay in milliseconds before executing the fetcher after a state change. Useful for reducing API calls while the user is typing.',
    type: 'number',
    status: 'optional',
  },
}

export const UseFilterAsyncReturn: PropertiesTableProps = {
  data: {
    doc: 'The data returned by the fetcher. `undefined` until the first fetch completes (unless `initialData` is provided).',
    type: ['T', 'undefined'],
    status: 'required',
  },
  loading: {
    doc: '`true` while a fetch is in progress.',
    type: 'boolean',
    status: 'required',
  },
  error: {
    doc: 'The error thrown by the fetcher, if any. Reset to `undefined` on each new fetch.',
    type: ['Error', 'undefined'],
    status: 'required',
  },
}

export const RootEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Called whenever the filter state changes. Receives a `FilterChangeState` object with `search` and `filters`. When `behavior="manual"`, this is called immediately for search changes but only when the user applies for filter changes.',
    type: '(state: FilterChangeState) => void',
    status: 'optional',
  },
}

export const SearchEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Called when the search input value changes. Receives the new value string.',
    type: '(value: string) => void',
    status: 'optional',
  },
}

export const ActiveFiltersEvents: PropertiesTableProps = {
  onRemove: {
    doc: 'Called when a filter tag is removed by the user. Receives the `filterKey` of the removed filter.',
    type: '(filterKey: string) => void',
    status: 'optional',
  },
}
