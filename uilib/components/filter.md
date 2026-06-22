---
title: 'Filter'
description: 'Use Filter to help people narrow down a list or data set.'
version: 11.7.0
generatedAt: 2026-06-22T08:28:00.515Z
checksum: d880adfaa9ce2c1b007fb153044b524a0cf8f15772be0b91997fce5008d24928
---

# Filter

## Import

```tsx
import { Filter } from '@dnb/eufemia'
```

## Description

`Filter` is a composable filter UI for building search and filter experiences. It does **not** own your data — instead, it provides shared state that you read with the `Filter.useFilter(id)` hook and apply to your own data source.

The component uses a namespace pattern where `Filter` is the import and `Filter.Root` is the renderable root.

### Behavior

By default, `Filter.Root` emits changes in real time via `onChange`. Set `behavior="manual"` to buffer filter changes internally — the panel will show an "Apply filter" button to commit changes and a "Cancel" button to revert changes. This is useful when filter changes trigger expensive operations like API calls. Note that search input is always emitted in real time, even in manual mode. `Filter.ActiveFilters` only shows applied filters, so tags won't appear until the user applies them.

### Filter keys

Each filter is identified by a `filterKey` string. For `Filter.Selection` and `Filter.MultiSelection`, individual selected values are stored as `{filterKey}/{value}` entries in the state (e.g. `/status/active`, `/status/inactive`). This convention lets you inspect which values are selected by filtering the keys that start with the filter's prefix:

```ts
const selectedStatuses = Object.keys(filters)
  .filter((key) => key.startsWith('/status/'))
  .map((key) => key.replace('/status/', ''))
```

The leading `/` is a convention to namespace filter keys — it is not a URL path or an Eufemia Forms JSON Pointer. You can use any string as a `filterKey`, but we recommend starting with `/` for consistency.

When building custom filters with `Filter.useFilterContext()`, you can use any key format — the `{filterKey}/{value}` pattern is only used by the built-in selection components.

### Combining search and filters

The Filter component stores `search` and `filters`, but does not decide how your data should match them. As a rule of thumb, each active filter should narrow the result set.

Different filter groups are also usually combined with **AND**, such as status and region. Multiple values inside the same filter group usually behave as **OR**. For example, selecting two statuses means the item can match status active or inactive. Search can also match several fields with **OR**, such as name or amount.

For custom filters and quick filters, choose the logic that matches the meaning of the controls. Use **OR** when the buttons are alternatives in the same category, and **AND** when they represent independent conditions that should all be true.

### Layout

The Filter component can be used in two layout patterns:

- **Inside a list** — Place `Filter.Root` inside the first `List.Item.Basic`. Filtered results render as subsequent list items. This is the most common pattern.
- **Column layout with Grid** — Use `Grid.Container` with `Grid.Item` to place the filter and results side by side. Use `Filter.Content` to link the results area to the filter via `connectedTo`.

### Sub-components

- **`Filter.Root`** — Root wrapper. Provides filter context and syncs state via `useSharedState`. Requires a unique `id`. Supports spacing props.
- **`Filter.Header`** — Groups the filter controls (toolbar, panel, active filters) above the results. When used together with `Filter.Content` containing a `List.Container`, the header receives a subtle background and top border-radius to visually connect with the list below.
- **`Filter.Search`** — Text input with a loupe icon. Updates the shared `search` string. Browser autocomplete, autocorrect, autocapitalize, and spellcheck are disabled by default.
- **`Filter.Toolbar`** — Horizontal row that wraps `Filter.Search` and `Filter.Toolbar.Actions`.
- **`Filter.Toolbar.Actions`** — Groups action buttons (e.g. `Filter.PanelButton`) for proper responsiveness.
- **`Filter.Panel`** — Expandable inline panel toggled by `Filter.PanelButton`. Renders filter children as tertiary accordions with a white background.
- **`Filter.PanelButton`** — Toggle button for `Filter.Panel`. Shows a filter icon when closed and a close icon when open. Accepts all `Button` props.
- **`Filter.ActiveFilters`** — Renders active filters as removable `Tag` chips. Returns nothing when no filters are active. Set `showCategoryLabel` to prefix each tag with its category name (e.g. "Betalingstype: Kort" instead of "Kort"). Set `collapsibleThreshold` to collapse the tags behind a tertiary accordion with a scrollable area and a "Clear all" button when the number of active filters exceeds the threshold. In `behavior="manual"` mode, only applied filters are shown — draft changes in the panel won't appear as tags until the user clicks Apply.
- **`Filter.Item`** — Accordion wrapper for a single filter section. Supports `defaultOpen` to start expanded. Open/closed state is remembered across panel opens.
- **`Filter.Date`** — Built-in date range filter using `DatePicker`. When placed inside a `Filter.Panel`, it renders as an accordion with an inline calendar on larger screens. On small screens, it skips the accordion and renders as a tertiary trigger button that opens a calendar popover. When placed outside the panel, it always renders as a trigger button.
- **`Filter.Selection`** — Built-in checkbox selection filter. Each selected option creates its own active filter tag.
- **`Filter.MultiSelection`** — Built-in multi-selection filter using the Forms `MultiSelection` component. Each selected item creates its own active filter tag.
- **`Filter.SortButton`** — Sort dropdown styled as a tertiary button with a sort icon. The trigger always displays the translated "Sort" label regardless of the selected option.
- **`Filter.QuickFilters`** — Wrapper for quick filter toggle buttons placed outside the panel. Renders as a horizontal flex row with wrapping.
- **`Filter.Highlighting`** — Highlights matching search text within result items. Reads the `search` string from the linked filter state and wraps matching substrings in `<mark>` tags. Can be linked via `connectedTo` or inherits the id from the nearest `Filter.Root` or `Filter.Content`.
- **`Filter.Content`** — Wraps result content and shows a `Skeleton` loading state when the filter is loading. When used inside a `Filter.Root`, the id is inherited automatically. When used outside, link it via `connectedTo`. Supports spacing props.
- **`Filter.NoResults`** — Renders a translated "no results" message when `resultCount` is `0`. When placed inside a `List.Container`, it automatically renders as a list item. Can be placed after `Filter.ActiveFilters` inside a container, or inside a `Filter.Content` where it inherits `connectedTo` automatically.
- **`Filter.ResultCount`** — Displays the current result count as a translated message (e.g. "3 result(s)") when filters are active. Hidden when no filters or search text are applied. Reads `resultCount` from the nearest `Filter.Root`, a `connectedTo` id, or a `resultCount` prop. Supports spacing props.

### Hooks

- **`Filter.useFilter(id)`** — Reads filter state from anywhere — does not need to be inside `Filter.Root`. Returns `{ filters, search, hasActiveFilters, resetFilters, removeFilter }`.
- **`Filter.useFilterAsync(id, fetcher, options?)`** — Async data fetching linked to a filter. Handles loading state, race conditions, and syncs `resultLoading`/`resultCount` to shared state. Options: `initialData` for immediate rendering, `debounce` (ms) to delay fetcher calls while the user is typing. Returns `{ data, loading, error }`.
- **`Filter.useFilterContext()`** — Accesses the full filter context from inside `Filter.Root`. Use this to build custom filter types. Returns `{ setFilter, getFilter, removeFilter, resetFilters, commitFilters, revertFilters, filters, search, hasActiveFilters }`.

### URL sync hooks

These hooks sync filter state to URL query parameters so filters survive page reloads and browser navigation. Each hook writes `{id}-search` and `{id}-filters` query parameters. Pass `excludeSearch: true` to skip syncing the search string.

- **`Filter.useQueryLocator(id, options?)`** — Uses the History API directly. Works without any router. Best for plain React apps or when no router is available.
- **`Filter.useReactRouter(id, { useSearchParams, ...options })`** — Uses React Router's `useSearchParams`. Pass the hook from your router version.
- **`Filter.useNextRouter(id, { useRouter, usePathname, useSearchParams, ...options })`** — Uses Next.js App Router hooks. Pass `useRouter`, `usePathname`, and `useSearchParams` from `next/navigation`.

## Basic usage

```tsx
import { Filter, List } from '@dnb/eufemia'

function MyPage() {
  const { filters, search, hasActiveFilters } =
    Filter.useFilter('my-filter')

  const filtered = myData.filter((item) => {
    if (search && !item.name.includes(search)) {
      return false
    }
    return true
  })

  return (
    <List.Container>
      <List.Item.Basic>
        <Filter.Root id="my-filter" resultCount={filtered.length}>
          <Filter.Toolbar>
            <Filter.Search label="Søk" placeholder="Søk ..." />
            <Filter.Toolbar.Actions>
              <Filter.Date />
              <Filter.PanelButton />
            </Filter.Toolbar.Actions>
          </Filter.Toolbar>
          <Filter.Panel>
            <Filter.Selection
              label="Status"
              filterKey="/status"
              data={[
                { value: 'active', label: 'Aktiv' },
                { value: 'inactive', label: 'Inaktiv' },
              ]}
            />
          </Filter.Panel>
          <Filter.ActiveFilters />
        </Filter.Root>
      </List.Item.Basic>

      <Filter.NoResults />

      {filtered.map((item) => (
        <List.Item.Basic key={item.id} title={item.name} />
      ))}
    </List.Container>
  )
}
```

## Decoupled hook usage

`Filter.useFilter(id)` can be called from a completely separate component tree. The filter UI and the data consumer are linked only by the shared `id`:

```tsx
function FilterUI() {
  return (
    <Filter.Root id="transactions">
      <Filter.Toolbar>
        <Filter.Search label="Søk" />
        <Filter.Toolbar.Actions>
          <Filter.PanelButton />
        </Filter.Toolbar.Actions>
      </Filter.Toolbar>
      <Filter.Panel>
        <Filter.Selection
          label="Type"
          filterKey="/type"
          data={[
            { value: 'card', label: 'Kort' },
            { value: 'transfer', label: 'Overføring' },
          ]}
        />
      </Filter.Panel>
      <Filter.ActiveFilters />
      <Filter.NoResults />
    </Filter.Root>
  )
}

function TransactionList() {
  const { search, filters, hasActiveFilters } =
    Filter.useFilter('transactions')

  // Use search/filters to filter your data
}
```

## Custom filters

Create custom filter types using `Filter.useFilterContext()` and `Filter.Item`:

```tsx
function AmountRangeFilter({ label, filterKey }) {
  const { setFilter, getFilter } = Filter.useFilterContext()
  const current = getFilter(filterKey)

  const handleChange = (min, max) => {
    if (min == null && max == null) {
      setFilter(filterKey, undefined)
    } else {
      setFilter(filterKey, {
        value: { min, max },
        label: `${label}: ${min ?? ''}–${max ?? ''}`,
      })
    }
  }

  return (
    <Filter.Item label={label} filterKey={filterKey}>
      <Flex.Horizontal>
        <Input
          label="Min"
          onChange={({ value }) =>
            handleChange(value, current?.value?.max)
          }
        />
        <Input
          label="Max"
          onChange={({ value }) =>
            handleChange(current?.value?.min, value)
          }
        />
      </Flex.Horizontal>
    </Filter.Item>
  )
}

// Usage inside Filter.Panel:
render(
  <Filter.Panel>
    <AmountRangeFilter label="Beløp" filterKey="/amount" />
  </Filter.Panel>
)
```

## Async data fetching

`Filter.useFilterAsync(id, fetcher)` handles the full fetch lifecycle — loading state, race conditions, and result count — so you don't have to wire it up yourself.

It calls your `fetcher` whenever the linked filter state changes and syncs `resultLoading` and `resultCount` to the shared state. That means `Filter.Content` and `Filter.NoResults` react automatically.

```tsx
function TransactionList() {
  const { data } = Filter.useFilterAsync(
    'my-filter',
    async ({ filters, search }) => {
      const res = await fetch(`/api/transactions?q=${search}`)
      return res.json()
    },
    { initialData: [] }
  )

  return (
    <Filter.Content connectedTo="my-filter">
      {data.map((tx) => (
        <p key={tx.id}>{tx.name}</p>
      ))}
    </Filter.Content>
  )
}
```

The hook returns `{ data, loading, error }`. If the fetcher returns an array, `resultCount` is set to its length automatically. Pass `initialData` to render immediately before the first fetch resolves.

Use the `debounce` option (in milliseconds) to delay the fetcher while the user is still typing. The initial fetch always runs immediately.

```tsx
const { data } = Filter.useFilterAsync('my-filter', fetcher, {
  initialData: [],
  debounce: 300,
})
```

## Accessibility

The Filter component includes several accessibility features out of the box:

### Live announcements

`Filter.Content` uses an `aria-live` region to announce filter result changes to screen readers:

- When the result count changes, it announces the number of results (e.g. "3 treff").
- When no results are found (`resultCount={0}`), it announces the no-results message.
- During loading, announcements are suppressed to avoid noisy updates.

### Focus management

When the filter panel is closed — via the "Hide filter" button, the "Apply" button, or the "Cancel" button in manual mode — focus is automatically returned to the `Filter.PanelButton`. This ensures keyboard users don't lose their place in the page.

### ARIA attributes

- `Filter.Root` renders with `role="search"` and an `aria-label` to identify the filter region.
- `Filter.PanelButton` uses `aria-expanded` to communicate whether the panel is open or closed.
- `Filter.ActiveFilters` renders a labeled group so screen readers can identify the active filter tags.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=15807-0)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/filter)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/filter)


## Demos

### Basic usage

Combines `Filter.Date` and `Filter.Selection` inside `Filter.Panel`, with search, toolbar tools, and `resultCount` for the number of matching transactions. Uses the list layout pattern.


```tsx
const Example = () => {
  const transactions = [{
    id: 1,
    name: 'Rema 1000',
    amount: -245,
    type: 'card'
  }, {
    id: 2,
    name: 'DNB Salary',
    amount: 25000,
    type: 'transfer'
  }, {
    id: 3,
    name: 'Elkjøp',
    amount: -3999,
    type: 'card'
  }];
  const {
    filters,
    search
  } = Filter.useFilter('date-selection-demo');
  const filtered = transactions.filter(tx => {
    if (search && !tx.name.toLowerCase().includes(search.toLowerCase()) && !String(tx.amount).includes(search)) {
      return false;
    }
    const selectedTypes = Object.keys(filters).filter(key => key.startsWith('/type/')).map(key => key.replace('/type/', ''));
    if (selectedTypes.length > 0 && !selectedTypes.includes(tx.type)) {
      return false;
    }
    return true;
  });
  return <>
              <Filter.Root id="date-selection-demo" resultCount={filtered.length}>
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search label="Label" placeholder="Store name, amount..." />
                    <Filter.Toolbar.Actions>
                      <Button variant="tertiary" icon={downloadIcon} iconPosition="left">
                        Download
                      </Button>
                      <Filter.PanelButton />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>

                  <Filter.Panel>
                    <Filter.Date />
                    <Filter.Selection label="Payment type" filterKey="/type" data={[{
            value: 'card',
            label: 'Card'
          }, {
            value: 'transfer',
            label: 'Transfer'
          }]} />
                  </Filter.Panel>

                  <Filter.ActiveFilters />
                  <Filter.ResultCount />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="date-selection-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map(tx => <List.Item.Basic key={tx.id} title={<Filter.Highlighting>
                          {tx.name}
                        </Filter.Highlighting>}>
                      <List.Cell.End>
                        <Value.Currency value={tx.amount} />
                      </List.Cell.End>
                    </List.Item.Basic>)}
                </List.Container>
              </Filter.Content>
            </>;
};
render(<Example />);
```


### Custom filter type

Build your own filter using `Filter.useFilterContext()` and `Filter.Item`. This example shows a toggle filter alongside the built-in `Filter.Selection`.


```tsx
function ToggleFilter({
  label,
  filterKey
}) {
  const {
    setFilter,
    getFilter
  } = Filter.useFilterContext();
  const isActive = !!getFilter(filterKey);
  return <Filter.Item label={label} filterKey={filterKey}>
              <ToggleButton checked={isActive} onChange={({
      checked
    }) => {
      if (checked) {
        setFilter(filterKey, {
          value: true,
          label
        });
      } else {
        setFilter(filterKey, undefined);
      }
    }}>
                {label}
              </ToggleButton>
            </Filter.Item>;
}
const Example = () => {
  const places = [{
    id: 1,
    name: 'Olivia Restaurant',
    category: 'restaurant',
    favorite: true
  }, {
    id: 2,
    name: 'Grand Hotel',
    category: 'hotel',
    favorite: false
  }, {
    id: 3,
    name: 'Kaffebrenneriet',
    category: 'cafe',
    favorite: true
  }, {
    id: 4,
    name: 'Maaemo',
    category: 'restaurant',
    favorite: false
  }];
  const {
    filters,
    search
  } = Filter.useFilter('custom-demo');
  const selectedCategories = Object.keys(filters).filter(key => key.startsWith('/category/')).map(key => key.replace('/category/', ''));
  const favoritesOnly = !!filters['/favorites'];
  const filtered = places.filter(place => {
    if (search && !place.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (selectedCategories.length > 0 && !selectedCategories.includes(place.category)) {
      return false;
    }
    if (favoritesOnly && !place.favorite) {
      return false;
    }
    return true;
  });
  return <>
              <Filter.Root id="custom-demo" resultCount={filtered.length}>
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search label="Search" placeholder="Search..." />
                    <Filter.Toolbar.Actions>
                      <Filter.PanelButton />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>
                  <Filter.Panel>
                    <Filter.Selection label="Category" filterKey="/category" data={[{
            value: 'restaurant',
            label: 'Restaurant'
          }, {
            value: 'hotel',
            label: 'Hotel'
          }, {
            value: 'cafe',
            label: 'Cafe'
          }]} />
                    <ToggleFilter label="Favorites only" filterKey="/favorites" />
                  </Filter.Panel>
                  <Filter.ActiveFilters />
                  <Filter.ResultCount />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="custom-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map(place => <List.Item.Basic key={place.id} title={<Filter.Highlighting>
                          {place.name}
                        </Filter.Highlighting>} />)}
                </List.Container>
              </Filter.Content>
            </>;
};
render(<Example />);
```


### Async result count

When the result count comes from an API, use `resultLoading` to show a loading state while the request is in progress. Open the filter panel and change a filter to see the skeleton effect. This example uses `debounce: 300` to delay the API call while the user is typing.


```tsx
const allTransactions = [{
  id: 1,
  name: 'Rema 1000',
  amount: -245,
  status: 'active'
}, {
  id: 2,
  name: 'DNB Salary',
  amount: 25000,
  status: 'active'
}, {
  id: 3,
  name: 'Elkjøp',
  amount: -3999,
  status: 'inactive'
}, {
  id: 4,
  name: 'Kiwi',
  amount: -189,
  status: 'active'
}, {
  id: 5,
  name: 'Spotify',
  amount: -119,
  status: 'inactive'
}];

// Simulates an API call with a delay
// Simulates an API call with a delay
function fetchFiltered(filters, search) {
  return new Promise<typeof allTransactions>(resolve => {
    setTimeout(() => {
      const result = allTransactions.filter(tx => {
        if (search && !tx.name.toLowerCase().includes(search.toLowerCase()) && !String(tx.amount).includes(search)) {
          return false;
        }
        const selectedStatuses = Object.keys(filters).filter(key => key.startsWith('/status/')).map(key => key.replace('/status/', ''));
        if (selectedStatuses.length > 0 && !selectedStatuses.includes(tx.status)) {
          return false;
        }
        return true;
      });
      resolve(result);
    }, 1000);
  });
}
const Example = () => {
  const {
    data: filtered
  } = Filter.useFilterAsync('async-demo', ({
    filters,
    search
  }) => fetchFiltered(filters, search), {
    initialData: allTransactions,
    debounce: 300
  });
  return <>
              <Filter.Root id="async-demo">
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search label="Search" placeholder="Search for something..." />
                    <Filter.Toolbar.Actions>
                      <Filter.Date />
                      <Filter.PanelButton />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>
                  <Filter.Panel>
                    <Filter.Selection label="Status" filterKey="/status" defaultOpen data={[{
            value: 'active',
            label: 'Active'
          }, {
            value: 'inactive',
            label: 'Inactive'
          }]} />
                  </Filter.Panel>
                  <Filter.ActiveFilters />
                  <Filter.ResultCount />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="async-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map(tx => <List.Item.Basic key={tx.id} title={<Filter.Highlighting>
                          {tx.name}
                        </Filter.Highlighting>}>
                      <List.Cell.End>
                        <Value.Currency value={tx.amount} />
                      </List.Cell.End>
                    </List.Item.Basic>)}
                </List.Container>
              </Filter.Content>
            </>;
};
render(<Example />);
```


### Manual behavior

With `behavior="manual"`, panel filter changes are buffered internally and not emitted until the user clicks "Apply filter". Search input is still emitted in real time. The panel shows an Apply button and a Cancel button that reverts unsaved changes.


```tsx
const allTransactions = [{
  id: 1,
  name: 'Rema 1000',
  amount: -245,
  status: 'active'
}, {
  id: 2,
  name: 'DNB Salary',
  amount: 25000,
  status: 'active'
}, {
  id: 3,
  name: 'Elkjøp',
  amount: -3999,
  status: 'inactive'
}, {
  id: 4,
  name: 'Kiwi',
  amount: -189,
  status: 'active'
}, {
  id: 5,
  name: 'Spotify',
  amount: -119,
  status: 'inactive'
}];
function fetchFiltered(filters, search) {
  return new Promise<typeof allTransactions>(resolve => {
    setTimeout(() => {
      const result = allTransactions.filter(tx => {
        if (search && !tx.name.toLowerCase().includes(search.toLowerCase()) && !String(tx.amount).includes(search)) {
          return false;
        }
        const selectedStatuses = Object.keys(filters).filter(key => key.startsWith('/status/')).map(key => key.replace('/status/', ''));
        if (selectedStatuses.length > 0 && !selectedStatuses.includes(tx.status)) {
          return false;
        }
        return true;
      });
      resolve(result);
    }, 1000);
  });
}
const Example = () => {
  const {
    data: filtered
  } = Filter.useFilterAsync('manual-demo', ({
    filters,
    search
  }) => fetchFiltered(filters, search), {
    initialData: allTransactions
  });
  return <>
              <Filter.Root id="manual-demo" behavior="manual">
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search label="Search" placeholder="Search for something..." />
                    <Filter.Toolbar.Actions>
                      <Filter.PanelButton />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>
                  <Filter.Panel>
                    <Filter.Selection label="Status" filterKey="/status" defaultOpen data={[{
            value: 'active',
            label: 'Active'
          }, {
            value: 'inactive',
            label: 'Inactive'
          }]} />
                  </Filter.Panel>
                  <Filter.ActiveFilters />
                  <Filter.ResultCount />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="manual-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map(tx => <List.Item.Basic key={tx.id} title={<Filter.Highlighting>
                          {tx.name}
                        </Filter.Highlighting>}>
                      <List.Cell.End>
                        <Value.Currency value={tx.amount} />
                      </List.Cell.End>
                    </List.Item.Basic>)}
                </List.Container>
              </Filter.Content>
            </>;
};
render(<Example />);
```


### Predefined filters

Use `defaultFilters` to pre-select filters on mount. The panel and relevant filter accordions open automatically.


```tsx
const Example = () => {
  const transactions = [{
    id: 1,
    name: 'Rema 1000',
    amount: -245,
    type: 'card'
  }, {
    id: 2,
    name: 'DNB Salary',
    amount: 25000,
    type: 'transfer'
  }, {
    id: 3,
    name: 'Elkjøp',
    amount: -3999,
    type: 'card'
  }];
  const {
    filters,
    search
  } = Filter.useFilter('predefined-demo');
  const filtered = transactions.filter(tx => {
    if (search && !tx.name.toLowerCase().includes(search.toLowerCase()) && !String(tx.amount).includes(search)) {
      return false;
    }
    const selectedTypes = Object.keys(filters).filter(key => key.startsWith('/type/')).map(key => key.replace('/type/', ''));
    if (selectedTypes.length > 0 && !selectedTypes.includes(tx.type)) {
      return false;
    }
    return true;
  });
  return <>
              <Filter.Root id="predefined-demo" resultCount={filtered.length} defaultFilters={{
      '/type/card': {
        value: 'card',
        label: 'Card',
        categoryLabel: 'Payment type'
      },
      '/type/transfer': {
        value: 'transfer',
        label: 'Transfer',
        categoryLabel: 'Payment type'
      },
      '/status/pending': {
        value: 'pending',
        label: 'Pending',
        categoryLabel: 'Status'
      },
      '/status/completed': {
        value: 'completed',
        label: 'Completed',
        categoryLabel: 'Status'
      },
      '/status/failed': {
        value: 'failed',
        label: 'Failed',
        categoryLabel: 'Status'
      },
      '/region/oslo': {
        value: 'oslo',
        label: 'Oslo',
        categoryLabel: 'Region'
      },
      '/region/bergen': {
        value: 'bergen',
        label: 'Bergen',
        categoryLabel: 'Region'
      },
      '/region/trondheim': {
        value: 'trondheim',
        label: 'Trondheim',
        categoryLabel: 'Region'
      },
      '/category/groceries': {
        value: 'groceries',
        label: 'Groceries',
        categoryLabel: 'Category'
      },
      '/category/electronics': {
        value: 'electronics',
        label: 'Electronics',
        categoryLabel: 'Category'
      },
      '/category/salary': {
        value: 'salary',
        label: 'Salary',
        categoryLabel: 'Category'
      },
      '/category/subscription': {
        value: 'subscription',
        label: 'Subscription',
        categoryLabel: 'Category'
      }
    }}>
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search label="Label" placeholder="Store name, amount..." />
                    <Filter.Toolbar.Actions>
                      <Button variant="tertiary" icon={downloadIcon} iconPosition="left">
                        Download
                      </Button>
                      <Filter.PanelButton />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>

                  <Filter.Panel>
                    <Filter.Date />
                    <Filter.Selection label="Payment type" filterKey="/type" data={[{
            value: 'card',
            label: 'Card'
          }, {
            value: 'transfer',
            label: 'Transfer'
          }]} />
                  </Filter.Panel>

                  <Filter.ActiveFilters showCategoryLabel collapsibleThreshold={5} />
                  <Filter.ResultCount />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="predefined-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map(tx => <List.Item.Basic key={tx.id} title={<Filter.Highlighting>
                          {tx.name}
                        </Filter.Highlighting>}>
                      <List.Cell.End>
                        <Value.Currency value={tx.amount} />
                      </List.Cell.End>
                    </List.Item.Basic>)}
                </List.Container>
              </Filter.Content>
            </>;
};
render(<Example />);
```


### URL sync with router hooks

Three hooks sync filter state with URL query parameters so users can share or bookmark filtered views. Back/forward navigation restores the previous filter state.

- **`Filter.useQueryLocator(id, options?)`** — Uses the History API directly. Works without any router dependency. Pass `{ excludeSearch: true }` to exclude the search string from URL sync.
- **`Filter.useReactRouter(id, { useSearchParams, excludeSearch? })`** — Uses React Router's `useSearchParams`.
- **`Filter.useNextRouter(id, { useRouter, usePathname, useSearchParams, excludeSearch? })`** — Uses Next.js navigation hooks.


```tsx
const transactions = [{
  id: 1,
  name: 'Rema 1000',
  amount: -245,
  status: 'active'
}, {
  id: 2,
  name: 'DNB Salary',
  amount: 25000,
  status: 'active'
}, {
  id: 3,
  name: 'Elkjøp',
  amount: -3999,
  status: 'inactive'
}, {
  id: 4,
  name: 'Kiwi',
  amount: -189,
  status: 'active'
}];
const Example = () => {
  // Syncs filter state to/from URL query parameters
  Filter.useQueryLocator('query-locator-demo', {
    // excludeSearch: true, // You can exclude search from the URL if you want, by default it is included
  });
  const {
    filters,
    search
  } = Filter.useFilter('query-locator-demo');
  const selectedStatuses = Object.keys(filters).filter(key => key.startsWith('/status/')).map(key => key.replace('/status/', ''));
  const filtered = transactions.filter(tx => {
    if (search && !tx.name.toLowerCase().includes(search.toLowerCase()) && !String(tx.amount).includes(search)) {
      return false;
    }
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(tx.status)) {
      return false;
    }
    return true;
  });
  return <>
              <Filter.Root id="query-locator-demo" resultCount={filtered.length}>
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search label="Search" placeholder="Store name..." />
                    <Filter.Toolbar.Actions>
                      <Filter.PanelButton />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>
                  <Filter.Panel>
                    <Filter.Selection label="Status" filterKey="/status" data={[{
            value: 'active',
            label: 'Active'
          }, {
            value: 'inactive',
            label: 'Inactive'
          }]} />
                  </Filter.Panel>
                  <Filter.ActiveFilters />
                  <Filter.ResultCount />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="query-locator-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map(tx => <List.Item.Basic key={tx.id} title={<Filter.Highlighting>
                          {tx.name}
                        </Filter.Highlighting>}>
                      <List.Cell.End>
                        <Value.Currency value={tx.amount} />
                      </List.Cell.End>
                    </List.Item.Basic>)}
                </List.Container>
              </Filter.Content>
            </>;
};
render(<Example />);
```


### With sort button

Use `Filter.SortButton` to add a sort dropdown to the toolbar. It renders a tertiary Dropdown with a sort icon and independent width. The sort state is managed outside the filter.


```tsx
const Example = () => {
  const transactions = [{
    id: 1,
    name: 'Rema 1000',
    amount: -245
  }, {
    id: 2,
    name: 'DNB Salary',
    amount: 25000
  }, {
    id: 3,
    name: 'Elkjøp',
    amount: -3999
  }, {
    id: 4,
    name: 'Kiwi',
    amount: -189
  }];
  const sortOptions = [{
    selectedKey: 'newest',
    content: 'Newest first'
  }, {
    selectedKey: 'oldest',
    content: 'Oldest first'
  }, {
    selectedKey: 'amount-high',
    content: 'Amount high–low'
  }, {
    selectedKey: 'amount-low',
    content: 'Amount low–high'
  }];
  const [sortKey, setSortKey] = useState('newest');
  const {
    search
  } = Filter.useFilter('sort-demo');
  const filtered = transactions.filter(tx => {
    if (search && !tx.name.toLowerCase().includes(search.toLowerCase()) && !String(tx.amount).includes(search)) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    switch (sortKey) {
      case 'oldest':
        return a.id - b.id;
      case 'amount-high':
        return b.amount - a.amount;
      case 'amount-low':
        return a.amount - b.amount;
      default:
        return b.id - a.id;
    }
  });
  return <>
              <Filter.Root id="sort-demo" resultCount={filtered.length}>
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search label="Search" placeholder="Store name..." />
                    <Filter.Toolbar.Actions>
                      <Filter.SortButton data={sortOptions} value={sortKey} onChange={({
              data: {
                selectedKey
              }
            }) => {
              setSortKey(String(selectedKey));
            }} />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>
                  <Filter.ResultCount />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="sort-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map(tx => <List.Item.Basic key={tx.id} title={<Filter.Highlighting>
                          {tx.name}
                        </Filter.Highlighting>}>
                      <List.Cell.End>
                        <Value.Currency value={tx.amount} />
                      </List.Cell.End>
                    </List.Item.Basic>)}
                </List.Container>
              </Filter.Content>
            </>;
};
render(<Example />);
```


### Quick filters

Quick filters are toggle buttons placed directly below the toolbar, outside the panel. They let users apply common filters without opening the panel.


```tsx
function QuickFilter({
  label,
  filterKey
}) {
  const {
    setFilter,
    getFilter
  } = Filter.useFilterContext();
  const isActive = !!getFilter(filterKey);
  return <ToggleButton checked={isActive} onChange={({
    checked
  }) => {
    if (checked) {
      setFilter(filterKey, {
        value: true,
        label
      });
    } else {
      setFilter(filterKey, undefined);
    }
  }}>
              {label}
            </ToggleButton>;
}
const Example = () => {
  const transactions = [{
    id: 1,
    name: 'Rema 1000',
    amount: -245,
    type: 'card'
  }, {
    id: 2,
    name: 'DNB Salary',
    amount: 25000,
    type: 'transfer'
  }, {
    id: 3,
    name: 'Elkjøp',
    amount: -3999,
    type: 'card'
  }, {
    id: 4,
    name: 'Kiwi',
    amount: -189,
    type: 'card'
  }];
  const {
    filters,
    search
  } = Filter.useFilter('quick-filters-demo');
  const showCards = !!filters['/card'];
  const showTransfers = !!filters['/transfer'];
  const filtered = transactions.filter(tx => {
    if (search && !tx.name.toLowerCase().includes(search.toLowerCase()) && !String(tx.amount).includes(search)) {
      return false;
    }
    if (showCards && tx.type !== 'card') {
      return false;
    }
    if (showTransfers && tx.type !== 'transfer') {
      return false;
    }
    return true;
  });
  return <>
              <Filter.Root id="quick-filters-demo" resultCount={filtered.length}>
                <Filter.Header>
                  <Filter.QuickFilters>
                    <QuickFilter label="Card" filterKey="/card" />
                    <QuickFilter label="Transfer" filterKey="/transfer" />
                  </Filter.QuickFilters>
                  <Filter.ResultCount />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="quick-filters-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map(tx => <List.Item.Action key={tx.id} title={<Filter.Highlighting>
                          {tx.name}
                        </Filter.Highlighting>}>
                      <List.Cell.End>
                        <Value.Currency value={tx.amount} />
                      </List.Cell.End>
                    </List.Item.Action>)}
                </List.Container>
              </Filter.Content>
            </>;
};
render(<Example />);
```


### Toolbar with actions only

A toolbar with only action buttons and no search field.


```tsx
const Example = () => {
  const items = [{
    id: 1,
    name: 'Report Q1',
    amount: 12000
  }, {
    id: 2,
    name: 'Report Q2',
    amount: 15000
  }, {
    id: 3,
    name: 'Report Q3',
    amount: 9800
  }];
  return <>
              <Filter.Root id="actions-only-demo">
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Toolbar.Actions>
                      <Button variant="tertiary" icon={tableIcon} iconPosition="left">
                        Layout
                      </Button>
                      <Button variant="tertiary" icon={downloadIcon} iconPosition="left">
                        Download
                      </Button>
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="actions-only-demo">
                <List.Container>
                  {items.map(item => <List.Item.Action key={item.id} title={<Filter.Highlighting>
                          {item.name}
                        </Filter.Highlighting>}>
                      <List.Cell.End>
                        <Value.Currency value={item.amount} />
                      </List.Cell.End>
                    </List.Item.Action>)}
                </List.Container>
              </Filter.Content>
            </>;
};
render(<Example />);
```


### Search only

A simple search field with a secondary search button.


```tsx
const Example = () => {
  const items = useMemo(() => [{
    id: 1,
    name: 'Rema 1000',
    amount: -245
  }, {
    id: 2,
    name: 'Kiwi',
    amount: -189
  }, {
    id: 3,
    name: 'Salary',
    amount: 35000
  }], []);
  const getFilteredItems = useCallback((searchValue: string) => {
    return items.filter(item => {
      if (searchValue && !item.name.toLowerCase().includes(searchValue.toLowerCase()) && !String(item.amount).includes(searchValue)) {
        return false;
      }
      return true;
    });
  }, [items]);
  const {
    search
  } = Filter.useFilter('search-only-demo');
  const previousSearchRef = useRef(search);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [filtered, setFiltered] = useState(() => getFilteredItems(search));
  useEffect(() => {
    if (previousSearchRef.current === search) {
      return; // stop here
    }
    previousSearchRef.current = search;
    setShowSkeleton(true);
    const timeout = setTimeout(() => {
      setFiltered(getFilteredItems(search));
      setShowSkeleton(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [getFilteredItems, search]);
  const visibleItems = showSkeleton ? items : filtered;
  return <>
              <Filter.Root id="search-only-demo" resultCount={filtered.length}>
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search submitBehavior="manual" label="Search" placeholder="Search..." />
                  </Filter.Toolbar>
                  <Filter.ResultCount />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="search-only-demo">
                <List.Container skeleton={showSkeleton}>
                  {!showSkeleton && <Filter.NoResults />}
                  {visibleItems.map(item => <List.Item.Action key={item.id} title={<Filter.Highlighting>
                          {item.name}
                        </Filter.Highlighting>}>
                      <List.Cell.End>
                        <Value.Currency value={item.amount} />
                      </List.Cell.End>
                    </List.Item.Action>)}
                </List.Container>
              </Filter.Content>
            </>;
};
render(<Example />);
```


### Multi-selection filter with grid layout

Use `Filter.MultiSelection` inside `Filter.Panel` to let users select one or more clients. This example uses a `Grid` layout to place the filter and results side by side.


```tsx
const clients = [{
  value: 'acme',
  title: 'Acme Corp'
}, {
  value: 'globex',
  title: 'Globex Inc'
}, {
  value: 'initech',
  title: 'Initech Ltd'
}, {
  value: 'umbrella',
  title: 'Umbrella Group'
}];
const transactions = [{
  id: 1,
  name: 'Invoice #1012',
  amount: 45000,
  client: 'acme'
}, {
  id: 2,
  name: 'Invoice #1013',
  amount: 12500,
  client: 'globex'
}, {
  id: 3,
  name: 'Credit note #204',
  amount: -3200,
  client: 'acme'
}, {
  id: 4,
  name: 'Invoice #1014',
  amount: 78000,
  client: 'initech'
}, {
  id: 5,
  name: 'Invoice #1015',
  amount: 9400,
  client: 'umbrella'
}, {
  id: 6,
  name: 'Invoice #1016',
  amount: 23000,
  client: 'globex'
}];
const Example = () => {
  const {
    filters,
    search
  } = Filter.useFilter('multi-selection-demo');
  const selectedClients = Object.keys(filters).filter(key => key.startsWith('/client/')).map(key => key.replace('/client/', ''));
  const filtered = transactions.filter(tx => {
    if (search && !tx.name.toLowerCase().includes(search.toLowerCase()) && !String(tx.amount).includes(search)) {
      return false;
    }
    if (selectedClients.length > 0 && !selectedClients.includes(tx.client)) {
      return false;
    }
    return true;
  });
  return <Grid.Container columnGap="large" rowGap="large" style={{
    marginInline: 'auto',
    maxInlineSize: 'var(--layout-medium)'
  }}>
              <Grid.Item span={{
      small: 'full',
      large: [1, 4]
    }}>
                <Heading size="large" top={false}>
                  Filter
                </Heading>
                <Filter.Root id="multi-selection-demo" resultCount={filtered.length}>
                  <Filter.Toolbar>
                    <Filter.Search label="Search" placeholder="Invoice number..." />
                    <Filter.Toolbar.Actions>
                      <Filter.Date />
                      <Filter.PanelButton />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>
                  <Filter.Panel>
                    <Filter.MultiSelection label="Client" filterKey="/client" data={clients} />
                  </Filter.Panel>
                  <Filter.ActiveFilters />
                  <Filter.ResultCount />
                </Filter.Root>
              </Grid.Item>

              <Grid.Item span={{
      small: 'full',
      large: [5, 12]
    }}>
                <Filter.Content connectedTo="multi-selection-demo">
                  <Heading size="large" top={false}>
                    Transactions
                  </Heading>
                  <List.Container>
                    <Filter.NoResults />
                    {filtered.map(tx => <List.Item.Basic key={tx.id} title={<Filter.Highlighting>
                            {tx.name}
                          </Filter.Highlighting>}>
                        <List.Cell.End>
                          <Value.Currency value={tx.amount} />
                        </List.Cell.End>
                      </List.Item.Basic>)}
                  </List.Container>
                </Filter.Content>
              </Grid.Item>
            </Grid.Container>;
};
render(<Example />);
```


### Decoupled hook

`Filter.useFilter(id)` can be called anywhere in the tree — the filter UI and data consumer can live in completely separate components.


```tsx
function TransactionList() {
  const {
    search
  } = Filter.useFilter('decoupled-demo');
  const data = [{
    id: 1,
    name: 'Rema 1000',
    amount: -245
  }, {
    id: 2,
    name: 'Kiwi',
    amount: -189
  }, {
    id: 3,
    name: 'Salary',
    amount: 35000
  }];
  const filtered = data.filter(item => {
    if (search && !item.name.toLowerCase().includes(search.toLowerCase()) && !String(item.amount).includes(search)) {
      return false;
    }
    return true;
  });
  return <Filter.Content connectedTo="decoupled-demo">
              <P space>
                {filtered.length > 0 && <P>Antall: {filtered.length}</P>}
              </P>
              {filtered.length > 0 && <List.Container>
                  <Filter.NoResults />
                  {filtered.map(item => <List.Item.Basic key={item.id} title={<Filter.Highlighting>
                          {item.name}
                        </Filter.Highlighting>}>
                      <List.Cell.End>
                        <Value.Currency value={item.amount} />
                      </List.Cell.End>
                    </List.Item.Basic>)}
                </List.Container>}
            </Filter.Content>;
}
render(<>
            <Filter.Root id="decoupled-demo">
              <Filter.Search label="Search" placeholder="Search results..." />
              <Filter.ActiveFilters />
              <Filter.NoResults />
            </Filter.Root>

            <TransactionList />
          </>);
```

## Filter.Root


```json
{
  "props": {
    "id": {
      "doc": "Unique identifier that links the filter UI to `Filter.useFilter(id)` consumers via shared state.",
      "type": "string",
      "status": "required"
    },
    "behavior": {
      "doc": "Controls when filter changes are emitted. `\"realtime\"` (default) emits on every change. `\"manual\"` buffers filter changes internally until the user clicks Apply in the panel. Search input is always emitted in real time.",
      "type": [
        "\"realtime\"",
        "\"manual\""
      ],
      "status": "optional"
    },
    "resultCount": {
      "doc": "The number of matching results. Passed to child components that can display the count.",
      "type": "number",
      "status": "optional"
    },
    "defaultFilters": {
      "doc": "Pre-selected filters to apply on mount. The panel and relevant filter accordions open automatically. Keys should match the filter key format (e.g. `/type/card`).",
      "type": "Record<string, FilterValue>",
      "status": "optional"
    },
    "defaultPanelOpen": {
      "doc": "Controls whether the filter panel is open on mount. When `true`, the panel opens even without active filters. When `false`, the panel stays closed even with `defaultFilters` or URL-restored filters. Defaults to opening automatically when filters are present.",
      "type": "boolean",
      "status": "optional"
    },
    "resultLoading": {
      "doc": "When `true`, the result count shows a skeleton loading state. Use this while fetching result counts asynchronously.",
      "type": "boolean",
      "status": "optional"
    },
    "className": {
      "doc": "Custom CSS class name applied to the root element.",
      "type": "string",
      "status": "optional"
    },
    "style": {
      "doc": "Inline styles applied to the root element. Use e.g. `maxWidth` to control the width of the filter.",
      "type": "CSSProperties",
      "status": "optional"
    },
    "children": {
      "doc": "Filter sub-components like `Filter.Search`, `Filter.Panel`, `Filter.ActiveFilters`, etc.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Filter.Header


```json
{
  "props": {
    "className": {
      "doc": "Custom CSS class name.",
      "type": "string",
      "status": "optional"
    },
    "children": {
      "doc": "Filter controls like `Filter.Toolbar`, `Filter.Panel`, and `Filter.ActiveFilters`.",
      "type": "React.ReactNode",
      "status": "optional"
    }
  }
}
```


## Filter.Search


```json
{
  "props": {
    "label": {
      "doc": "Label for the search input.",
      "type": "string",
      "status": "required"
    },
    "submitBehavior": {
      "doc": "When set to `\"manual\"`, the search state is only updated when the user presses Enter or clicks the submit button. Automatically applies `type=\"search\"` and explicitly shows the submit button.",
      "type": "\"manual\"",
      "status": "optional"
    },
    "placeholder": {
      "doc": "Placeholder text for the search input.",
      "type": "string",
      "status": "optional"
    },
    "className": {
      "doc": "Custom CSS class name.",
      "type": "string",
      "status": "optional"
    }
  }
}
```


## Filter.Panel


```json
{
  "props": {
    "className": {
      "doc": "Custom CSS class name.",
      "type": "string",
      "status": "optional"
    },
    "children": {
      "doc": "Filter components rendered inside the panel, e.g. `Filter.Selection`, `Filter.Date`, or custom filters.",
      "type": "React.ReactNode",
      "status": "optional"
    }
  }
}
```


## Filter.PanelButton


```json
{
  "props": {
    "children": {
      "doc": "Button label text. Defaults to the translated `\"Filter\"` label.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "[Button props]": {
      "doc": "All [Button](/uilib/components/button/properties) props are supported except `variant`, `icon`, `iconPosition`, `transitionState`, and `aria-expanded`.",
      "type": "Various",
      "status": "optional"
    }
  }
}
```


## Filter.ActiveFilters


```json
{
  "props": {
    "label": {
      "doc": "Accessible label for the active filters group. Defaults to `\"Aktive filtre\"`.",
      "type": "string",
      "status": "optional"
    },
    "showCategoryLabel": {
      "doc": "When `true`, each tag is prefixed with the category name (e.g. \"Betalingstype: Kort\" instead of \"Kort\").",
      "type": "boolean",
      "status": "optional"
    },
    "collapsibleThreshold": {
      "doc": "When the number of active filters exceeds this threshold, tags are shown inside a collapsible accordion with a scrollable area and a \"Clear all\" button.",
      "type": "number",
      "status": "optional"
    },
    "className": {
      "doc": "Custom CSS class name.",
      "type": "string",
      "status": "optional"
    }
  }
}
```


## Filter.Toolbar


```json
{
  "props": {
    "className": {
      "doc": "Custom CSS class name.",
      "type": "string",
      "status": "optional"
    },
    "children": {
      "doc": "Toolbar content — typically `Filter.Search` on the left and `Filter.Toolbar.Actions` grouping action buttons on the right.",
      "type": "React.ReactNode",
      "status": "optional"
    }
  }
}
```


## Filter.Toolbar.Actions


```json
{
  "props": {
    "className": {
      "doc": "Custom CSS class name.",
      "type": "string",
      "status": "optional"
    },
    "children": {
      "doc": "Action buttons or controls to display on the right side of the toolbar.",
      "type": "React.ReactNode",
      "status": "optional"
    }
  }
}
```


## Filter.Item


```json
{
  "props": {
    "label": {
      "doc": "Label displayed for this filter section.",
      "type": "string",
      "status": "required"
    },
    "filterKey": {
      "doc": "Unique key identifying this filter in the state.",
      "type": "string",
      "status": "required"
    },
    "defaultOpen": {
      "doc": "When `true`, the accordion starts expanded. The open/closed state is remembered across panel opens without a page refresh.",
      "type": "boolean",
      "status": "optional"
    },
    "className": {
      "doc": "Custom CSS class name.",
      "type": "string",
      "status": "optional"
    },
    "children": {
      "doc": "Filter content rendered inside the item.",
      "type": "React.ReactNode",
      "status": "optional"
    }
  }
}
```


## Filter.Date


```json
{
  "props": {
    "label": {
      "doc": "Label for the date filter. Defaults to the locale translation (e.g. \"Dato\" in Norwegian, \"Date\" in English).",
      "type": "string",
      "status": "optional"
    },
    "filterKey": {
      "doc": "Unique key for this filter in the state. Defaults to `\"date\"`.",
      "type": "string",
      "status": "optional"
    },
    "defaultOpen": {
      "doc": "When `true`, the accordion starts expanded. The state is remembered across panel opens.",
      "type": "boolean",
      "status": "optional"
    }
  }
}
```


## Filter.Selection


```json
{
  "props": {
    "label": {
      "doc": "Label for the selection filter.",
      "type": "string",
      "status": "required"
    },
    "filterKey": {
      "doc": "Unique key for this filter group. Individual selections are stored as `filterKey/value` entries in the filter state.",
      "type": "string",
      "status": "required"
    },
    "data": {
      "doc": "Array of selectable items. Each item has a `value` (string) and `label` (string).",
      "type": "Array<{ value: string; label: string }>",
      "status": "required"
    },
    "defaultOpen": {
      "doc": "When `true`, the accordion starts expanded. The state is remembered across panel opens.",
      "type": "boolean",
      "status": "optional"
    }
  }
}
```


## Filter.MultiSelection


```json
{
  "props": {
    "label": {
      "doc": "Label for the multi-selection filter.",
      "type": "string",
      "status": "required"
    },
    "filterKey": {
      "doc": "Unique key for this filter group. Individual selections are stored as `filterKey/value` entries in the filter state.",
      "type": "string",
      "status": "required"
    },
    "data": {
      "doc": "Array of selectable items. Each item has a `value` (string | number) and `title` (ReactNode).",
      "type": "Array<{ value: string | number; title: React.ReactNode }>",
      "status": "required"
    },
    "defaultOpen": {
      "doc": "When `true`, the accordion starts expanded. The state is remembered across panel opens.",
      "type": "boolean",
      "status": "optional"
    }
  }
}
```


## Filter.QuickFilters


```json
{
  "props": {
    "className": {
      "doc": "Custom CSS class name.",
      "type": "string",
      "status": "optional"
    },
    "children": {
      "doc": "Quick filter toggle buttons or other controls.",
      "type": "React.ReactNode",
      "status": "optional"
    }
  }
}
```


## Filter.SortButton


```json
{
  "props": {
    "data": {
      "doc": "Sort options passed to the underlying Dropdown. Each item should have a `selectedKey` and `content`.",
      "type": "DrawerListData",
      "status": "required"
    },
    "value": {
      "doc": "The currently selected sort value.",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default sort value on mount.",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "size": {
      "doc": "Size of the trigger button. Defaults to `\"medium\"`.",
      "type": [
        "\"default\"",
        "\"small\"",
        "\"medium\"",
        "\"large\""
      ],
      "status": "optional"
    },
    "[Dropdown props]": {
      "doc": "All other [Dropdown](/uilib/components/dropdown/properties) props are forwarded.",
      "type": "Various",
      "status": "optional"
    }
  }
}
```


## Filter.NoResults


```json
{
  "props": {
    "connectedTo": {
      "doc": "Links to a `Filter.Root` by its `id`. Reads `resultCount` from the shared filter state. When used, the `resultCount` prop is not needed.",
      "type": "string",
      "status": "optional"
    },
    "resultCount": {
      "doc": "The number of results. When `0`, the no-results message is shown. When omitted, falls back to the `resultCount` from the linked `connectedTo` or the nearest `Filter.Root`.",
      "type": "number",
      "status": "optional"
    },
    "children": {
      "doc": "Custom message to display instead of the default translated text.",
      "type": "string",
      "status": "optional"
    },
    "className": {
      "doc": "Custom CSS class name.",
      "type": "string",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Filter.ResultCount


```json
{
  "props": {
    "connectedTo": {
      "doc": "Links to a `Filter.Root` by its `id`. Reads `resultCount` from the shared filter state.",
      "type": "string",
      "status": "optional"
    },
    "resultCount": {
      "doc": "The number of results to display. When omitted, falls back to the `resultCount` from the linked `connectedTo` or nearest `Filter.Root`.",
      "type": "number",
      "status": "optional"
    },
    "alwaysVisible": {
      "doc": "When `true`, the result count is always visible even when no filters or search text are active. By default, the count is only shown when filters are active.",
      "type": "boolean",
      "status": "optional"
    },
    "children": {
      "doc": "Custom message to display instead of the default translated text.",
      "type": "string",
      "status": "optional"
    },
    "className": {
      "doc": "Custom CSS class name.",
      "type": "string",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Filter.Content


```json
{
  "props": {
    "connectedTo": {
      "doc": "Links to a `Filter.Root` by its `id`. When omitted and used inside a `Filter.Root`, the id is inherited from context.",
      "type": "string",
      "status": "optional"
    },
    "className": {
      "doc": "Custom CSS class name.",
      "type": "string",
      "status": "optional"
    },
    "children": {
      "doc": "Result content to render. Wrapped in a skeleton when the linked filter is loading.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Filter.Highlighting


```json
{
  "props": {
    "children": {
      "doc": "Text to highlight based on the current search value.",
      "type": "string",
      "status": "required"
    },
    "connectedTo": {
      "doc": "Links to a `Filter.Root` by its `id`. When omitted, the id is inherited from the nearest `Filter.Root` or `Filter.Content`.",
      "type": "string",
      "status": "optional"
    }
  }
}
```


## Filter.useFilter(id)

Returns an object with the following properties:


```json
{
  "props": {
    "filters": {
      "doc": "Object containing all active filters keyed by filterKey.",
      "type": "Record<string, FilterValue>",
      "status": "required"
    },
    "search": {
      "doc": "The current search string.",
      "type": "string",
      "status": "required"
    },
    "hasActiveFilters": {
      "doc": "`true` when any filter or search text is active.",
      "type": "boolean",
      "status": "required"
    },
    "resetFilters": {
      "doc": "Clears all filters and search text.",
      "type": "() => void",
      "status": "required"
    },
    "removeFilter": {
      "doc": "Removes a single filter by its filterKey.",
      "type": "(filterKey: string) => void",
      "status": "required"
    }
  }
}
```


## Filter.useFilterAsync(id, fetcher, options?)

Parameters:


```json
{
  "props": {
    "id": {
      "doc": "The `id` of the `Filter.Root` to link to.",
      "type": "string",
      "status": "required"
    },
    "fetcher": {
      "doc": "Async function called whenever filters or search change. Receives `{ filters, search }` and should return the filtered data.",
      "type": "(params: { filters, search }) => Promise<T>",
      "status": "required"
    },
    "options.initialData": {
      "doc": "Data to return before the first fetch completes.",
      "type": "T",
      "status": "optional"
    },
    "options.debounce": {
      "doc": "Delay in milliseconds before executing the fetcher after a state change. Useful for reducing API calls while the user is typing.",
      "type": "number",
      "status": "optional"
    }
  }
}
```


Returns an object with:


```json
{
  "props": {
    "data": {
      "doc": "The data returned by the fetcher. `undefined` until the first fetch completes (unless `initialData` is provided).",
      "type": [
        "T",
        "undefined"
      ],
      "status": "required"
    },
    "loading": {
      "doc": "`true` while a fetch is in progress.",
      "type": "boolean",
      "status": "required"
    },
    "error": {
      "doc": "The error thrown by the fetcher, if any. Reset to `undefined` on each new fetch.",
      "type": [
        "Error",
        "undefined"
      ],
      "status": "required"
    }
  }
}
```


## Translations


```json
{
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
  "entries": {
    "Filter.activeFiltersCountLabel": {
      "nb-NO": "%s aktive filtre",
      "en-GB": "%s active filters",
      "sv-SE": "%s aktiva filter",
      "da-DK": "%s aktive filtre"
    },
    "Filter.activeFiltersLabel": {
      "nb-NO": "Aktive filtre",
      "en-GB": "Active filters",
      "sv-SE": "Aktiva filter",
      "da-DK": "Aktive filtre"
    },
    "Filter.applyFilterLabel": {
      "nb-NO": "Bruk filter",
      "en-GB": "Apply filter",
      "sv-SE": "Använd filter",
      "da-DK": "Anvend filter"
    },
    "Filter.ariaLabel": {
      "nb-NO": "Filter",
      "en-GB": "Filter",
      "sv-SE": "Filter",
      "da-DK": "Filter"
    },
    "Filter.cancelFilterLabel": {
      "nb-NO": "Avbryt",
      "en-GB": "Cancel",
      "sv-SE": "Avbryt",
      "da-DK": "Annuller"
    },
    "Filter.clearAllLabel": {
      "nb-NO": "Fjern alle",
      "en-GB": "Clear all",
      "sv-SE": "Rensa alla",
      "da-DK": "Fjern alle"
    },
    "Filter.dateLabel": {
      "nb-NO": "Dato",
      "en-GB": "Date",
      "sv-SE": "Datum",
      "da-DK": "Dato"
    },
    "Filter.hideFilterLabel": {
      "nb-NO": "Skjul filter",
      "en-GB": "Hide filter",
      "sv-SE": "Dölj filter",
      "da-DK": "Skjul filter"
    },
    "Filter.noResultsMessage": {
      "nb-NO": "Prøv å endre eller fjerne noen filtre.",
      "en-GB": "Try changing or removing some filters.",
      "sv-SE": "Försök att ändra eller ta bort några filter.",
      "da-DK": "Prøv at ændre eller fjerne nogle filtre."
    },
    "Filter.panelButtonLabel": {
      "nb-NO": "Filter",
      "en-GB": "Filter",
      "sv-SE": "Filter",
      "da-DK": "Filter"
    },
    "Filter.resultCountMessage": {
      "nb-NO": "%s treff",
      "en-GB": "%s result(s)",
      "sv-SE": "%s resultat",
      "da-DK": "%s resultat(er)"
    },
    "Filter.sortButtonLabel": {
      "nb-NO": "Sorter",
      "en-GB": "Sort",
      "sv-SE": "Sortera",
      "da-DK": "Sortér"
    }
  }
}
```

## Filter.Root Events


```json
{
  "props": {
    "onChange": {
      "doc": "Called whenever the applied filter state changes. Receives a `FilterChangeState` object with `search` and `filters`. When `behavior=\"manual\"`, this is called immediately for search changes and applied filter removals, while draft panel filter changes are only emitted when the user applies them.",
      "type": "(state: FilterChangeState) => void",
      "status": "optional"
    }
  }
}
```


## Filter.Search Events


```json
{
  "props": {
    "onChange": {
      "doc": "Called when the search input value changes. Receives the new value string.",
      "type": "(value: string) => void",
      "status": "optional"
    }
  }
}
```


## Filter.ActiveFilters Events


```json
{
  "props": {
    "onRemove": {
      "doc": "Called when a filter tag is removed by the user. Receives the `filterKey` of the removed filter.",
      "type": "(filterKey: string) => void",
      "status": "optional"
    }
  }
}
```


## Filter.SortButton Events


```json
{
  "props": {
    "onChange": {
      "doc": "Called when the user selects a sort option. Receives the Dropdown change event.",
      "type": "(event: DrawerListChangeEvent) => void",
      "status": "optional"
    }
  }
}
```
