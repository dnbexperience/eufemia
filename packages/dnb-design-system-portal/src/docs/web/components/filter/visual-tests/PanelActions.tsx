import { Filter } from '@dnb/eufemia/src'

export default function PanelActions({
  count = 2,
  'aria-label': ariaLabel,
}: {
  count?: number
  'aria-label': string
}) {
  const options = Array.from({ length: count }, (_, index) => ({
    value: String(index),
    label: 'Alternativ ' + (index + 1),
  }))
  const defaultFilters = Object.fromEntries(
    options.slice(0, 2).map((option) => ['/type/' + option.value, option])
  )

  return (
    <Filter.Root
      aria-label={ariaLabel}
      defaultPanelOpen
      defaultFilters={defaultFilters}
    >
      <Filter.Header>
        <Filter.Toolbar>
          <Filter.Search label="Søk" placeholder="Søk i resultater" />
          <Filter.Toolbar.Actions>
            <Filter.PanelButton />
          </Filter.Toolbar.Actions>
        </Filter.Toolbar>
        <Filter.Panel>
          <Filter.Selection
            label="Kategori"
            filterKey="/type"
            data={options}
            defaultOpen
          />
        </Filter.Panel>
        <Filter.ActiveFilters />
      </Filter.Header>
    </Filter.Root>
  )
}
