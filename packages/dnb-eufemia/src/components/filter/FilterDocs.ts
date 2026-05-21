import type { PropertiesTableProps } from '../../shared/types'

export const ContainerProperties: PropertiesTableProps = {
  id: {
    doc: 'Unique identifier that links the filter UI to `Filter.useFilter(id)` consumers via shared state.',
    type: 'string',
    status: 'required',
  },
  resultCount: {
    doc: 'The number of matching results. Passed to child components like `Filter.More` which can display a "Vis N treff" button.',
    type: 'number',
    status: 'optional',
  },
  resultLoading: {
    doc: 'When `true`, the result count button inside `Filter.More` shows a skeleton loading state. Use this while fetching result counts asynchronously.',
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
    doc: 'Filter sub-components like `Filter.Search`, `Filter.More`, `Filter.ActiveFilters`, etc.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}

export const SearchProperties: PropertiesTableProps = {
  label: {
    doc: 'Label for the search input.',
    type: 'string',
    status: 'required',
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

export const MoreProperties: PropertiesTableProps = {
  label: {
    doc: 'Button label text. Defaults to the translated "Flere filtre" / "More filters".',
    type: 'string',
    status: 'optional',
  },
  className: {
    doc: 'Custom CSS class name for the trigger button.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'Filter components rendered inside the dialog, e.g. `Filter.Selection`, `Filter.Date`, or custom filters.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}

export const ActiveFiltersProperties: PropertiesTableProps = {
  label: {
    doc: 'Accessible label for the active filters group. Defaults to `"Aktive filtre"`.',
    type: 'string',
    status: 'optional',
  },
  showFilterLabel: {
    doc: 'When `true`, each tag is prefixed with the filter name (e.g. "Betalingstype: Kort" instead of "Kort").',
    type: 'boolean',
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
    doc: 'Toolbar content — typically `Filter.QuickFilter` on the left and `Filter.More` on the right.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}

export const QuickFilterProperties: PropertiesTableProps = {
  className: {
    doc: 'Custom CSS class name.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'A single quick-access filter component shown inline.',
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
    doc: 'When `true`, the accordion starts expanded. The open/closed state is remembered across dialog opens without a page refresh.',
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
    doc: 'Label for the date filter.',
    type: 'string',
    status: 'required',
  },
  filterKey: {
    doc: 'Unique key for this filter in the state. Defaults to `"/date"`.',
    type: 'string',
    status: 'optional',
  },
  defaultOpen: {
    doc: 'When `true`, the accordion starts expanded. The state is remembered across dialog opens.',
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
    doc: 'Unique key for this filter in the state.',
    type: 'string',
    status: 'required',
  },
  options: {
    doc: 'Array of selectable options. Each option has a `value` (string) and `label` (string).',
    type: 'Array<{ value: string; label: string }>',
    status: 'required',
  },
  defaultOpen: {
    doc: 'When `true`, the accordion starts expanded. The state is remembered across dialog opens.',
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
    doc: 'Unique key for this filter in the state.',
    type: 'string',
    status: 'required',
  },
  data: {
    doc: 'Array of selectable items. Each item has a `value` (string | number) and `title` (ReactNode).',
    type: 'Array<{ value: string | number; title: ReactNode }>',
    status: 'required',
  },
}

export const NoResultsProperties: PropertiesTableProps = {
  connectedTo: {
    doc: 'Links to a `Filter.Container` by its `id`. Reads `resultCount` from the shared filter state. When used, `resultCount` prop is not needed.',
    type: 'string',
    status: 'optional',
  },
  resultCount: {
    doc: 'The number of results. When `0`, the no-results message is shown. When omitted, falls back to the `resultCount` from the linked `connectedTo` or nearest `Filter.Container`.',
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
}

export const ResultsProperties: PropertiesTableProps = {
  connectedTo: {
    doc: 'Links to a `Filter.Container` by its `id`. When `resultLoading` is `true` on that container, the children are wrapped in a `Skeleton` loading state.',
    type: 'string',
    status: 'required',
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
}

export const IndicatorProperties: PropertiesTableProps = {
  className: {
    doc: 'Custom CSS class name.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'Optional label or content rendered next to the spinner.',
    type: 'React.ReactNode',
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
    doc: 'The `id` of the `Filter.Container` to link to.',
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
}

export const UseFilterAsyncReturn: PropertiesTableProps = {
  data: {
    doc: 'The data returned by the fetcher. `undefined` until the first fetch completes (unless `initialData` is provided).',
    type: 'T | undefined',
    status: 'required',
  },
  loading: {
    doc: '`true` while a fetch is in progress.',
    type: 'boolean',
    status: 'required',
  },
}

export const ContainerEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Called whenever the filter state changes. Receives the full `FilterState` object with `search` and `filters`.',
    type: '(state: FilterState) => void',
    status: 'optional',
  },
}

export const SearchEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Called when the search input value changes. Fires via the internal `Input` component.',
    type: '(args: { value: string }) => void',
    status: 'optional',
  },
}

export const ActiveFiltersEvents: PropertiesTableProps = {
  onRemove: {
    doc: 'Called when a filter tag is removed by the user.',
    type: '(filterKey: string) => void',
    status: 'optional',
  },
}
