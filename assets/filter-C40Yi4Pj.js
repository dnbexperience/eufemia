import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import r from"./demos-DDV4TfxW.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components},{RelatedComponents:r}=t;return r||s(`RelatedComponents`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Filter } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Filter`}),` is a composable filter UI for building search and filter experiences. It does `,(0,i.jsx)(t.strong,{children:`not`}),` own your data — instead, it provides shared state that you read with the `,(0,i.jsx)(t.code,{children:`Filter.useFilter(id)`}),` hook and apply to your own data source.`]}),`
`,(0,i.jsxs)(t.p,{children:[`The component uses a namespace pattern where `,(0,i.jsx)(t.code,{children:`Filter`}),` is the import and `,(0,i.jsx)(t.code,{children:`Filter.Root`}),` is the renderable root.`]}),`
`,(0,i.jsx)(t.h3,{children:`Behavior`}),`
`,(0,i.jsxs)(t.p,{children:[`By default, `,(0,i.jsx)(t.code,{children:`Filter.Root`}),` emits changes in real time via `,(0,i.jsx)(t.code,{children:`onChange`}),`. Set `,(0,i.jsx)(t.code,{children:`behavior="manual"`}),` to buffer filter changes internally — the panel will show an "Apply filter" button to commit changes and a "Cancel" button to revert changes. This is useful when filter changes trigger expensive operations like API calls. Note that search input is always emitted in real time, even in manual mode. `,(0,i.jsx)(t.code,{children:`Filter.ActiveFilters`}),` only shows applied filters, so tags won't appear until the user applies them.`]}),`
`,(0,i.jsx)(t.h3,{children:`Filter keys`}),`
`,(0,i.jsxs)(t.p,{children:[`Each filter is identified by a `,(0,i.jsx)(t.code,{children:`filterKey`}),` string. For `,(0,i.jsx)(t.code,{children:`Filter.Selection`}),` and `,(0,i.jsx)(t.code,{children:`Filter.MultiSelection`}),`, individual selected values are stored as `,(0,i.jsx)(t.code,{children:`{filterKey}/{value}`}),` entries in the state (e.g. `,(0,i.jsx)(t.code,{children:`/status/active`}),`, `,(0,i.jsx)(t.code,{children:`/status/inactive`}),`). This convention lets you inspect which values are selected by filtering the keys that start with the filter's prefix:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-ts`,children:`const selectedStatuses = Object.keys(filters)
  .filter((key) => key.startsWith('/status/'))
  .map((key) => key.replace('/status/', ''))
`})}),`
`,(0,i.jsxs)(t.p,{children:[`The leading `,(0,i.jsx)(t.code,{children:`/`}),` is a convention to namespace filter keys — it is not a URL path or an Eufemia Forms JSON Pointer. You can use any string as a `,(0,i.jsx)(t.code,{children:`filterKey`}),`, but we recommend starting with `,(0,i.jsx)(t.code,{children:`/`}),` for consistency.`]}),`
`,(0,i.jsxs)(t.p,{children:[`When building custom filters with `,(0,i.jsx)(t.code,{children:`Filter.useFilterContext()`}),`, you can use any key format — the `,(0,i.jsx)(t.code,{children:`{filterKey}/{value}`}),` pattern is only used by the built-in selection components.`]}),`
`,(0,i.jsx)(t.h3,{children:`Combining search and filters`}),`
`,(0,i.jsxs)(t.p,{children:[`The Filter component stores `,(0,i.jsx)(t.code,{children:`search`}),` and `,(0,i.jsx)(t.code,{children:`filters`}),`, but does not decide how your data should match them. As a rule of thumb, each active filter should narrow the result set.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Different filter groups are also usually combined with `,(0,i.jsx)(t.strong,{children:`AND`}),`, such as status and region. Multiple values inside the same filter group usually behave as `,(0,i.jsx)(t.strong,{children:`OR`}),`. For example, selecting two statuses means the item can match status active or inactive. Search can also match several fields with `,(0,i.jsx)(t.strong,{children:`OR`}),`, such as name or amount.`]}),`
`,(0,i.jsxs)(t.p,{children:[`For custom filters and quick filters, choose the logic that matches the meaning of the controls. Use `,(0,i.jsx)(t.strong,{children:`OR`}),` when the buttons are alternatives in the same category, and `,(0,i.jsx)(t.strong,{children:`AND`}),` when they represent independent conditions that should all be true.`]}),`
`,(0,i.jsx)(t.h3,{children:`Layout`}),`
`,(0,i.jsx)(t.p,{children:`The Filter component can be used in two layout patterns:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Inside a list`}),` — Place `,(0,i.jsx)(t.code,{children:`Filter.Root`}),` inside the first `,(0,i.jsx)(t.code,{children:`List.Item.Basic`}),`. Filtered results render as subsequent list items. This is the most common pattern.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Column layout with Grid`}),` — Use `,(0,i.jsx)(t.code,{children:`Grid.Container`}),` with `,(0,i.jsx)(t.code,{children:`Grid.Item`}),` to place the filter and results side by side. Use `,(0,i.jsx)(t.code,{children:`Filter.Content`}),` to link the results area to the filter via `,(0,i.jsx)(t.code,{children:`connectedTo`}),`.`]}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Sub-components`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.Root`})}),` — Root wrapper. Provides filter context and syncs state via `,(0,i.jsx)(t.code,{children:`useSharedState`}),`. Requires a unique `,(0,i.jsx)(t.code,{children:`id`}),`. Supports spacing props.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.Header`})}),` — Groups the filter controls (toolbar, panel, active filters) above the results. When used together with `,(0,i.jsx)(t.code,{children:`Filter.Content`}),` containing a `,(0,i.jsx)(t.code,{children:`List.Container`}),`, the header receives a subtle background and top border-radius to visually connect with the list below.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.Search`})}),` — Text input with a loupe icon. Updates the shared `,(0,i.jsx)(t.code,{children:`search`}),` string. Browser autocomplete, autocorrect, autocapitalize, and spellcheck are disabled by default.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.Toolbar`})}),` — Horizontal row that wraps `,(0,i.jsx)(t.code,{children:`Filter.Search`}),` and `,(0,i.jsx)(t.code,{children:`Filter.Toolbar.Actions`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.Toolbar.Actions`})}),` — Groups action buttons (e.g. `,(0,i.jsx)(t.code,{children:`Filter.PanelButton`}),`) for proper responsiveness.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.Panel`})}),` — Expandable inline panel toggled by `,(0,i.jsx)(t.code,{children:`Filter.PanelButton`}),`. Renders filter children as tertiary accordions with a white background.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.PanelButton`})}),` — Toggle button for `,(0,i.jsx)(t.code,{children:`Filter.Panel`}),`. Shows a filter icon when closed and a close icon when open. Accepts all `,(0,i.jsx)(t.code,{children:`Button`}),` props.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.ActiveFilters`})}),` — Renders active filters as removable `,(0,i.jsx)(t.code,{children:`Tag`}),` chips. Returns nothing when no filters are active. Set `,(0,i.jsx)(t.code,{children:`showCategoryLabel`}),` to prefix each tag with its category name (e.g. "Betalingstype: Kort" instead of "Kort"). Set `,(0,i.jsx)(t.code,{children:`collapsibleThreshold`}),` to collapse the tags behind a tertiary accordion with a scrollable area and a "Clear all" button when the number of active filters exceeds the threshold. In `,(0,i.jsx)(t.code,{children:`behavior="manual"`}),` mode, only applied filters are shown — draft changes in the panel won't appear as tags until the user clicks Apply.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.Item`})}),` — Accordion wrapper for a single filter section. Supports `,(0,i.jsx)(t.code,{children:`defaultOpen`}),` to start expanded. Open/closed state is remembered across panel opens.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.Date`})}),` — Built-in date range filter using `,(0,i.jsx)(t.code,{children:`DatePicker`}),`. When placed inside a `,(0,i.jsx)(t.code,{children:`Filter.Panel`}),`, it renders as an accordion with an inline calendar on larger screens. On small screens, it skips the accordion and renders as a tertiary trigger button that opens a calendar popover. When placed outside the panel, it always renders as a trigger button.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.Selection`})}),` — Built-in checkbox selection filter. Each selected option creates its own active filter tag.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.MultiSelection`})}),` — Built-in multi-selection filter using the Forms `,(0,i.jsx)(t.code,{children:`MultiSelection`}),` component. Each selected item creates its own active filter tag.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.SortButton`})}),` — Sort dropdown styled as a tertiary button with a sort icon. The trigger always displays the translated "Sort" label regardless of the selected option.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.QuickFilters`})}),` — Wrapper for quick filter toggle buttons placed outside the panel. Renders as a horizontal flex row with wrapping.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.Highlighting`})}),` — Highlights matching search text within result items. Reads the `,(0,i.jsx)(t.code,{children:`search`}),` string from the linked filter state and wraps matching substrings in `,(0,i.jsx)(t.code,{children:`<mark>`}),` tags. Can be linked via `,(0,i.jsx)(t.code,{children:`connectedTo`}),` or inherits the id from the nearest `,(0,i.jsx)(t.code,{children:`Filter.Root`}),` or `,(0,i.jsx)(t.code,{children:`Filter.Content`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.Content`})}),` — Wraps result content and shows a `,(0,i.jsx)(t.code,{children:`Skeleton`}),` loading state when the filter is loading. When used inside a `,(0,i.jsx)(t.code,{children:`Filter.Root`}),`, the id is inherited automatically. When used outside, link it via `,(0,i.jsx)(t.code,{children:`connectedTo`}),`. Supports spacing props.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.NoResults`})}),` — Renders a translated "no results" message when `,(0,i.jsx)(t.code,{children:`resultCount`}),` is `,(0,i.jsx)(t.code,{children:`0`}),`. When placed inside a `,(0,i.jsx)(t.code,{children:`List.Container`}),`, it automatically renders as a list item. Can be placed after `,(0,i.jsx)(t.code,{children:`Filter.ActiveFilters`}),` inside a container, or inside a `,(0,i.jsx)(t.code,{children:`Filter.Content`}),` where it inherits `,(0,i.jsx)(t.code,{children:`connectedTo`}),` automatically.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.ResultCount`})}),` — Displays the current result count as a translated message (e.g. "3 result(s)") when filters are active. Hidden when no filters or search text are applied. Reads `,(0,i.jsx)(t.code,{children:`resultCount`}),` from the nearest `,(0,i.jsx)(t.code,{children:`Filter.Root`}),`, a `,(0,i.jsx)(t.code,{children:`connectedTo`}),` id, or a `,(0,i.jsx)(t.code,{children:`resultCount`}),` prop. Supports spacing props.`]}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Hooks`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.useFilter(id)`})}),` — Reads filter state from anywhere — does not need to be inside `,(0,i.jsx)(t.code,{children:`Filter.Root`}),`. Returns `,(0,i.jsx)(t.code,{children:`{ filters, search, hasActiveFilters, resetFilters, removeFilter }`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.useFilterAsync(id, fetcher, options?)`})}),` — Async data fetching linked to a filter. Handles loading state, race conditions, and syncs `,(0,i.jsx)(t.code,{children:`resultLoading`}),`/`,(0,i.jsx)(t.code,{children:`resultCount`}),` to shared state. Options: `,(0,i.jsx)(t.code,{children:`initialData`}),` for immediate rendering, `,(0,i.jsx)(t.code,{children:`debounce`}),` (ms) to delay fetcher calls while the user is typing. Returns `,(0,i.jsx)(t.code,{children:`{ data, loading, error }`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.useFilterContext()`})}),` — Accesses the full filter context from inside `,(0,i.jsx)(t.code,{children:`Filter.Root`}),`. Use this to build custom filter types. Returns `,(0,i.jsx)(t.code,{children:`{ setFilter, getFilter, removeFilter, resetFilters, commitFilters, revertFilters, filters, search, hasActiveFilters }`}),`.`]}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`URL sync hooks`}),`
`,(0,i.jsxs)(t.p,{children:[`These hooks sync filter state to URL query parameters so filters survive page reloads and browser navigation. Each hook writes `,(0,i.jsx)(t.code,{children:`{id}-search`}),` and `,(0,i.jsx)(t.code,{children:`{id}-filters`}),` query parameters. Pass `,(0,i.jsx)(t.code,{children:`excludeSearch: true`}),` to skip syncing the search string.`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.useQueryLocator(id, options?)`})}),` — Uses the History API directly. Works without any router. Best for plain React apps or when no router is available.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.useReactRouter(id, { useSearchParams, ...options })`})}),` — Uses React Router's `,(0,i.jsx)(t.code,{children:`useSearchParams`}),`. Pass the hook from your router version.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Filter.useNextRouter(id, { useRouter, usePathname, useSearchParams, ...options })`})}),` — Uses Next.js App Router hooks. Pass `,(0,i.jsx)(t.code,{children:`useRouter`}),`, `,(0,i.jsx)(t.code,{children:`usePathname`}),`, and `,(0,i.jsx)(t.code,{children:`useSearchParams`}),` from `,(0,i.jsx)(t.code,{children:`next/navigation`}),`.`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Basic usage`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Filter, List } from '@dnb/eufemia'

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
`})}),`
`,(0,i.jsx)(t.h2,{children:`Decoupled hook usage`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Filter.useFilter(id)`}),` can be called from a completely separate component tree. The filter UI and the data consumer are linked only by the shared `,(0,i.jsx)(t.code,{children:`id`}),`:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`function FilterUI() {
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
`})}),`
`,(0,i.jsx)(t.h2,{children:`Custom filters`}),`
`,(0,i.jsxs)(t.p,{children:[`Create custom filter types using `,(0,i.jsx)(t.code,{children:`Filter.useFilterContext()`}),` and `,(0,i.jsx)(t.code,{children:`Filter.Item`}),`:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`function AmountRangeFilter({ label, filterKey }) {
  const { setFilter, getFilter } = Filter.useFilterContext()
  const current = getFilter(filterKey)

  const handleChange = (min, max) => {
    if (min == null && max == null) {
      setFilter(filterKey, undefined)
    } else {
      setFilter(filterKey, {
        value: { min, max },
        label: \`\${label}: \${min ?? ''}–\${max ?? ''}\`,
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
`})}),`
`,(0,i.jsx)(t.h2,{children:`Async data fetching`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Filter.useFilterAsync(id, fetcher)`}),` handles the full fetch lifecycle — loading state, race conditions, and result count — so you don't have to wire it up yourself.`]}),`
`,(0,i.jsxs)(t.p,{children:[`It calls your `,(0,i.jsx)(t.code,{children:`fetcher`}),` whenever the linked filter state changes and syncs `,(0,i.jsx)(t.code,{children:`resultLoading`}),` and `,(0,i.jsx)(t.code,{children:`resultCount`}),` to the shared state. That means `,(0,i.jsx)(t.code,{children:`Filter.Content`}),` and `,(0,i.jsx)(t.code,{children:`Filter.NoResults`}),` react automatically.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`function TransactionList() {
  const { data } = Filter.useFilterAsync(
    'my-filter',
    async ({ filters, search }) => {
      const res = await fetch(\`/api/transactions?q=\${search}\`)
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
`})}),`
`,(0,i.jsxs)(t.p,{children:[`The hook returns `,(0,i.jsx)(t.code,{children:`{ data, loading, error }`}),`. If the fetcher returns an array, `,(0,i.jsx)(t.code,{children:`resultCount`}),` is set to its length automatically. Pass `,(0,i.jsx)(t.code,{children:`initialData`}),` to render immediately before the first fetch resolves.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Use the `,(0,i.jsx)(t.code,{children:`debounce`}),` option (in milliseconds) to delay the fetcher while the user is still typing. The initial fetch always runs immediately.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`const { data } = Filter.useFilterAsync('my-filter', fetcher, {
  initialData: [],
  debounce: 300,
})
`})}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsx)(t.p,{children:`The Filter component includes several accessibility features out of the box:`}),`
`,(0,i.jsx)(t.h3,{children:`Live announcements`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Filter.Content`}),` uses an `,(0,i.jsx)(t.code,{children:`aria-live`}),` region to announce filter result changes to screen readers:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`When the result count changes, it announces the number of results (e.g. "3 treff").`}),`
`,(0,i.jsxs)(t.li,{children:[`When no results are found (`,(0,i.jsx)(t.code,{children:`resultCount={0}`}),`), it announces the no-results message.`]}),`
`,(0,i.jsx)(t.li,{children:`During loading, announcements are suppressed to avoid noisy updates.`}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Focus management`}),`
`,(0,i.jsxs)(t.p,{children:[`When the filter panel is closed — via the "Hide filter" button, the "Apply" button, or the "Cancel" button in manual mode — focus is automatically returned to the `,(0,i.jsx)(t.code,{children:`Filter.PanelButton`}),`. This ensures keyboard users don't lose their place in the page.`]}),`
`,(0,i.jsx)(t.h3,{children:`ARIA attributes`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`Filter.Root`}),` renders with `,(0,i.jsx)(t.code,{children:`role="search"`}),` and an `,(0,i.jsx)(t.code,{children:`aria-label`}),` to identify the filter region.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`Filter.PanelButton`}),` uses `,(0,i.jsx)(t.code,{children:`aria-expanded`}),` to communicate whether the panel is open or closed.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`Filter.ActiveFilters`}),` renders a labeled group so screen readers can identify the active filter tags.`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=15807-0`,children:`Figma`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/filter`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/filter`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(r,{})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function c(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}export{l as default};