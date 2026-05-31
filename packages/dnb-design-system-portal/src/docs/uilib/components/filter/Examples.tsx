/**
 * Filter component examples for the portal docs.
 */

import { useState } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  Button,
  Filter,
  Grid,
  Heading,
  List,
  P,
  ToggleButton,
} from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'
import {
  download as downloadIcon,
  table as tableIcon,
} from '@dnb/eufemia/src/icons'

export const WithDateAndSelection = () => {
  return (
    <ComponentBox
      hideCode
      scope={{ downloadIcon }}
      data-visual-test="filter-date-selection"
    >
      {() => {
        const Example = () => {
          const transactions = [
            { id: 1, name: 'Rema 1000', amount: -245, type: 'card' },
            {
              id: 2,
              name: 'DNB Salary',
              amount: 25000,
              type: 'transfer',
            },
            { id: 3, name: 'Elkjøp', amount: -3999, type: 'card' },
          ]

          const { filters, search } = Filter.useFilter(
            'date-selection-demo'
          )

          const filtered = transactions.filter((tx) => {
            if (
              search &&
              !tx.name.toLowerCase().includes(search.toLowerCase()) &&
              !String(tx.amount).includes(search)
            ) {
              return false
            }

            const selectedTypes = Object.keys(filters)
              .filter((key) => key.startsWith('/type/'))
              .map((key) => key.replace('/type/', ''))
            if (
              selectedTypes.length > 0 &&
              !selectedTypes.includes(tx.type)
            ) {
              return false
            }

            return true
          })

          return (
            <>
              <Filter.Root
                id="date-selection-demo"
                resultCount={filtered.length}
              >
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search
                      label="Label"
                      placeholder="Store name, amount..."
                    />
                    <Filter.Toolbar.Actions>
                      <Button
                        variant="tertiary"
                        icon={downloadIcon}
                        iconPosition="left"
                      >
                        Download
                      </Button>
                      <Filter.PanelButton />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>

                  <Filter.Panel>
                    <Filter.Date />
                    <Filter.Selection
                      label="Payment type"
                      filterKey="/type"
                      data={[
                        { value: 'card', label: 'Card' },
                        { value: 'transfer', label: 'Transfer' },
                      ]}
                    />
                  </Filter.Panel>

                  <Filter.ActiveFilters />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="date-selection-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map((tx) => (
                    <List.Item.Basic
                      key={tx.id}
                      title={
                        <Filter.Highlighting>
                          {tx.name}
                        </Filter.Highlighting>
                      }
                    >
                      <List.Cell.End>
                        <Value.Currency value={tx.amount} />
                      </List.Cell.End>
                    </List.Item.Basic>
                  ))}
                </List.Container>
              </Filter.Content>
            </>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

export const WithPredefinedFilters = () => {
  return (
    <ComponentBox hideCode scope={{ downloadIcon }}>
      {() => {
        const Example = () => {
          const transactions = [
            { id: 1, name: 'Rema 1000', amount: -245, type: 'card' },
            {
              id: 2,
              name: 'DNB Salary',
              amount: 25000,
              type: 'transfer',
            },
            { id: 3, name: 'Elkjøp', amount: -3999, type: 'card' },
          ]

          const { filters, search } = Filter.useFilter('predefined-demo')

          const filtered = transactions.filter((tx) => {
            if (
              search &&
              !tx.name.toLowerCase().includes(search.toLowerCase()) &&
              !String(tx.amount).includes(search)
            ) {
              return false
            }

            const selectedTypes = Object.keys(filters)
              .filter((key) => key.startsWith('/type/'))
              .map((key) => key.replace('/type/', ''))
            if (
              selectedTypes.length > 0 &&
              !selectedTypes.includes(tx.type)
            ) {
              return false
            }

            return true
          })

          return (
            <>
              <Filter.Root
                id="predefined-demo"
                resultCount={filtered.length}
                defaultFilters={{
                  '/type/card': {
                    value: 'card',
                    label: 'Card',
                    categoryLabel: 'Payment type',
                  },
                }}
              >
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search
                      label="Label"
                      placeholder="Store name, amount..."
                    />
                    <Filter.Toolbar.Actions>
                      <Button
                        variant="tertiary"
                        icon={downloadIcon}
                        iconPosition="left"
                      >
                        Download
                      </Button>
                      <Filter.PanelButton />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>

                  <Filter.Panel>
                    <Filter.Date />
                    <Filter.Selection
                      label="Payment type"
                      filterKey="/type"
                      data={[
                        { value: 'card', label: 'Card' },
                        { value: 'transfer', label: 'Transfer' },
                      ]}
                    />
                  </Filter.Panel>

                  <Filter.ActiveFilters />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="predefined-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map((tx) => (
                    <List.Item.Basic
                      key={tx.id}
                      title={
                        <Filter.Highlighting>
                          {tx.name}
                        </Filter.Highlighting>
                      }
                    >
                      <List.Cell.End>
                        <Value.Currency value={tx.amount} />
                      </List.Cell.End>
                    </List.Item.Basic>
                  ))}
                </List.Container>
              </Filter.Content>
            </>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

export const CustomFilter = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        function ToggleFilter({ label, filterKey }) {
          const { setFilter, getFilter } = Filter.useFilterContext()
          const isActive = !!getFilter(filterKey)

          return (
            <Filter.Item label={label} filterKey={filterKey}>
              <ToggleButton
                checked={isActive}
                onChange={({ checked }) => {
                  if (checked) {
                    setFilter(filterKey, { value: true, label })
                  } else {
                    setFilter(filterKey, undefined)
                  }
                }}
              >
                {label}
              </ToggleButton>
            </Filter.Item>
          )
        }

        const Example = () => {
          const places = [
            {
              id: 1,
              name: 'Olivia Restaurant',
              category: 'restaurant',
              favorite: true,
            },
            {
              id: 2,
              name: 'Grand Hotel',
              category: 'hotel',
              favorite: false,
            },
            {
              id: 3,
              name: 'Kaffebrenneriet',
              category: 'cafe',
              favorite: true,
            },
            {
              id: 4,
              name: 'Maaemo',
              category: 'restaurant',
              favorite: false,
            },
          ]

          const { filters, search } = Filter.useFilter('custom-demo')

          const selectedCategories = Object.keys(filters)
            .filter((key) => key.startsWith('/category/'))
            .map((key) => key.replace('/category/', ''))

          const favoritesOnly = !!filters['/favorites']

          const filtered = places.filter((place) => {
            if (
              search &&
              !place.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return false
            }

            if (
              selectedCategories.length > 0 &&
              !selectedCategories.includes(place.category)
            ) {
              return false
            }

            if (favoritesOnly && !place.favorite) {
              return false
            }

            return true
          })

          return (
            <>
              <Filter.Root id="custom-demo" resultCount={filtered.length}>
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search
                      label="Search"
                      placeholder="Search..."
                    />
                    <Filter.Toolbar.Actions>
                      <Filter.PanelButton />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>
                  <Filter.Panel>
                    <Filter.Selection
                      label="Category"
                      filterKey="/category"
                      data={[
                        { value: 'restaurant', label: 'Restaurant' },
                        { value: 'hotel', label: 'Hotel' },
                        { value: 'cafe', label: 'Cafe' },
                      ]}
                    />
                    <ToggleFilter
                      label="Favorites only"
                      filterKey="/favorites"
                    />
                  </Filter.Panel>
                  <Filter.ActiveFilters />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="custom-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map((place) => (
                    <List.Item.Basic
                      key={place.id}
                      title={
                        <Filter.Highlighting>
                          {place.name}
                        </Filter.Highlighting>
                      }
                    />
                  ))}
                </List.Container>
              </Filter.Content>
            </>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

export const DecoupledHook = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        function TransactionList() {
          const { search } = Filter.useFilter('decoupled-demo')

          const data = [
            { id: 1, name: 'Rema 1000', amount: -245 },
            { id: 2, name: 'Kiwi', amount: -189 },
            { id: 3, name: 'Salary', amount: 35000 },
          ]

          const filtered = data.filter((item) => {
            if (
              search &&
              !item.name.toLowerCase().includes(search.toLowerCase()) &&
              !String(item.amount).includes(search)
            ) {
              return false
            }
            return true
          })

          return (
            <Filter.Content connectedTo="decoupled-demo">
              <P space>
                {filtered.length > 0 && <P>Antall: {filtered.length}</P>}
              </P>
              {filtered.length > 0 && (
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map((item) => (
                    <List.Item.Basic
                      key={item.id}
                      title={
                        <Filter.Highlighting>
                          {item.name}
                        </Filter.Highlighting>
                      }
                    >
                      <List.Cell.End>
                        <Value.Currency value={item.amount} />
                      </List.Cell.End>
                    </List.Item.Basic>
                  ))}
                </List.Container>
              )}
            </Filter.Content>
          )
        }

        return (
          <>
            <Filter.Root id="decoupled-demo">
              <Filter.Search
                label="Search"
                placeholder="Search results..."
              />
              <Filter.ActiveFilters />
              <Filter.NoResults />
            </Filter.Root>

            <TransactionList />
          </>
        )
      }}
    </ComponentBox>
  )
}

export const AsyncResults = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const allTransactions = [
          { id: 1, name: 'Rema 1000', amount: -245, status: 'active' },
          { id: 2, name: 'DNB Salary', amount: 25000, status: 'active' },
          { id: 3, name: 'Elkjøp', amount: -3999, status: 'inactive' },
          { id: 4, name: 'Kiwi', amount: -189, status: 'active' },
          { id: 5, name: 'Spotify', amount: -119, status: 'inactive' },
        ]

        // Simulates an API call with a delay
        function fetchFiltered(filters, search) {
          return new Promise<typeof allTransactions>((resolve) => {
            setTimeout(() => {
              const result = allTransactions.filter((tx) => {
                if (
                  search &&
                  !tx.name.toLowerCase().includes(search.toLowerCase()) &&
                  !String(tx.amount).includes(search)
                ) {
                  return false
                }

                const selectedStatuses = Object.keys(filters)
                  .filter((key) => key.startsWith('/status/'))
                  .map((key) => key.replace('/status/', ''))
                if (
                  selectedStatuses.length > 0 &&
                  !selectedStatuses.includes(tx.status)
                ) {
                  return false
                }

                return true
              })

              resolve(result)
            }, 1000)
          })
        }

        const Example = () => {
          const { data: filtered } = Filter.useFilterAsync(
            'async-demo',
            ({ filters, search }) => fetchFiltered(filters, search),
            { initialData: allTransactions, debounce: 300 }
          )

          return (
            <>
              <Filter.Root id="async-demo">
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search
                      label="Search"
                      placeholder="Search for something..."
                    />
                    <Filter.Toolbar.Actions>
                      <Filter.Date />
                      <Filter.PanelButton />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>
                  <Filter.Panel>
                    <Filter.Selection
                      label="Status"
                      filterKey="/status"
                      defaultOpen
                      data={[
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                      ]}
                    />
                  </Filter.Panel>
                  <Filter.ActiveFilters />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="async-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map((tx) => (
                    <List.Item.Basic
                      key={tx.id}
                      title={
                        <Filter.Highlighting>
                          {tx.name}
                        </Filter.Highlighting>
                      }
                    >
                      <List.Cell.End>
                        <Value.Currency value={tx.amount} />
                      </List.Cell.End>
                    </List.Item.Basic>
                  ))}
                </List.Container>
              </Filter.Content>
            </>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

export const ManualBehavior = () => {
  return (
    <ComponentBox hideCode data-visual-test="filter-manual-behavior">
      {() => {
        const allTransactions = [
          { id: 1, name: 'Rema 1000', amount: -245, status: 'active' },
          { id: 2, name: 'DNB Salary', amount: 25000, status: 'active' },
          { id: 3, name: 'Elkjøp', amount: -3999, status: 'inactive' },
          { id: 4, name: 'Kiwi', amount: -189, status: 'active' },
          { id: 5, name: 'Spotify', amount: -119, status: 'inactive' },
        ]

        function fetchFiltered(filters, search) {
          return new Promise<typeof allTransactions>((resolve) => {
            setTimeout(() => {
              const result = allTransactions.filter((tx) => {
                if (
                  search &&
                  !tx.name.toLowerCase().includes(search.toLowerCase()) &&
                  !String(tx.amount).includes(search)
                ) {
                  return false
                }

                const selectedStatuses = Object.keys(filters)
                  .filter((key) => key.startsWith('/status/'))
                  .map((key) => key.replace('/status/', ''))
                if (
                  selectedStatuses.length > 0 &&
                  !selectedStatuses.includes(tx.status)
                ) {
                  return false
                }

                return true
              })

              resolve(result)
            }, 1000)
          })
        }

        const Example = () => {
          const { data: filtered } = Filter.useFilterAsync(
            'manual-demo',
            ({ filters, search }) => fetchFiltered(filters, search),
            { initialData: allTransactions }
          )

          return (
            <>
              <Filter.Root id="manual-demo" behavior="manual">
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search
                      label="Search"
                      placeholder="Search for something..."
                    />
                    <Filter.Toolbar.Actions>
                      <Filter.PanelButton />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>
                  <Filter.Panel>
                    <Filter.Selection
                      label="Status"
                      filterKey="/status"
                      defaultOpen
                      data={[
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                      ]}
                    />
                  </Filter.Panel>
                  <Filter.ActiveFilters />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="manual-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map((tx) => (
                    <List.Item.Basic
                      key={tx.id}
                      title={
                        <Filter.Highlighting>
                          {tx.name}
                        </Filter.Highlighting>
                      }
                    >
                      <List.Cell.End>
                        <Value.Currency value={tx.amount} />
                      </List.Cell.End>
                    </List.Item.Basic>
                  ))}
                </List.Container>
              </Filter.Content>
            </>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

export const WithMultiSelection = () => {
  return (
    <ComponentBox hideCode data-visual-test="filter-multi-selection-grid">
      {() => {
        const clients = [
          { value: 'acme', title: 'Acme Corp' },
          { value: 'globex', title: 'Globex Inc' },
          { value: 'initech', title: 'Initech Ltd' },
          { value: 'umbrella', title: 'Umbrella Group' },
        ]

        const transactions = [
          {
            id: 1,
            name: 'Invoice #1012',
            amount: 45000,
            client: 'acme',
          },
          {
            id: 2,
            name: 'Invoice #1013',
            amount: 12500,
            client: 'globex',
          },
          {
            id: 3,
            name: 'Credit note #204',
            amount: -3200,
            client: 'acme',
          },
          {
            id: 4,
            name: 'Invoice #1014',
            amount: 78000,
            client: 'initech',
          },
          {
            id: 5,
            name: 'Invoice #1015',
            amount: 9400,
            client: 'umbrella',
          },
          {
            id: 6,
            name: 'Invoice #1016',
            amount: 23000,
            client: 'globex',
          },
        ]

        const Example = () => {
          const { filters, search } = Filter.useFilter(
            'multi-selection-demo'
          )

          const selectedClients = Object.keys(filters)
            .filter((key) => key.startsWith('/client/'))
            .map((key) => key.replace('/client/', ''))

          const filtered = transactions.filter((tx) => {
            if (
              search &&
              !tx.name.toLowerCase().includes(search.toLowerCase()) &&
              !String(tx.amount).includes(search)
            ) {
              return false
            }

            if (
              selectedClients.length > 0 &&
              !selectedClients.includes(tx.client)
            ) {
              return false
            }

            return true
          })

          return (
            <Grid.Container
              columnGap="large"
              rowGap="large"
              style={{
                marginInline: 'auto',
                maxInlineSize: 'var(--layout-medium)',
              }}
            >
              <Grid.Item span={{ small: 'full', large: [1, 4] }}>
                <Heading size="large" top={false}>
                  Filter
                </Heading>
                <Filter.Root
                  id="multi-selection-demo"
                  resultCount={filtered.length}
                >
                  <Filter.Toolbar>
                    <Filter.Search
                      label="Search"
                      placeholder="Invoice number..."
                    />
                    <Filter.Toolbar.Actions>
                      <Filter.Date />
                      <Filter.PanelButton />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>
                  <Filter.Panel>
                    <Filter.MultiSelection
                      label="Client"
                      filterKey="/client"
                      data={clients}
                    />
                  </Filter.Panel>
                  <Filter.ActiveFilters />
                </Filter.Root>
              </Grid.Item>

              <Grid.Item span={{ small: 'full', large: [5, 12] }}>
                <Filter.Content connectedTo="multi-selection-demo">
                  <Heading size="large" top={false}>
                    Transactions
                  </Heading>
                  <List.Container>
                    <Filter.NoResults />
                    {filtered.map((tx) => (
                      <List.Item.Basic
                        key={tx.id}
                        title={
                          <Filter.Highlighting>
                            {tx.name}
                          </Filter.Highlighting>
                        }
                      >
                        <List.Cell.End>
                          <Value.Currency value={tx.amount} />
                        </List.Cell.End>
                      </List.Item.Basic>
                    ))}
                  </List.Container>
                </Filter.Content>
              </Grid.Item>
            </Grid.Container>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

export const QuickFilters = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        function QuickFilter({ label, filterKey }) {
          const { setFilter, getFilter } = Filter.useFilterContext()
          const isActive = !!getFilter(filterKey)

          return (
            <ToggleButton
              checked={isActive}
              onChange={({ checked }) => {
                if (checked) {
                  setFilter(filterKey, { value: true, label })
                } else {
                  setFilter(filterKey, undefined)
                }
              }}
            >
              {label}
            </ToggleButton>
          )
        }

        const Example = () => {
          const transactions = [
            { id: 1, name: 'Rema 1000', amount: -245, type: 'card' },
            {
              id: 2,
              name: 'DNB Salary',
              amount: 25000,
              type: 'transfer',
            },
            { id: 3, name: 'Elkjøp', amount: -3999, type: 'card' },
            { id: 4, name: 'Kiwi', amount: -189, type: 'card' },
          ]

          const { filters, search } = Filter.useFilter(
            'quick-filters-demo'
          )

          const showCards = !!filters['/card']
          const showTransfers = !!filters['/transfer']

          const filtered = transactions.filter((tx) => {
            if (
              search &&
              !tx.name.toLowerCase().includes(search.toLowerCase()) &&
              !String(tx.amount).includes(search)
            ) {
              return false
            }

            if (showCards && tx.type !== 'card') {
              return false
            }

            if (showTransfers && tx.type !== 'transfer') {
              return false
            }

            return true
          })

          return (
            <>
              <Filter.Root
                id="quick-filters-demo"
                resultCount={filtered.length}
              >
                <Filter.Header>
                  <Filter.QuickFilters>
                    <QuickFilter label="Card" filterKey="/card" />
                    <QuickFilter label="Transfer" filterKey="/transfer" />
                  </Filter.QuickFilters>
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="quick-filters-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map((tx) => (
                    <List.Item.Action
                      key={tx.id}
                      title={
                        <Filter.Highlighting>
                          {tx.name}
                        </Filter.Highlighting>
                      }
                    >
                      <List.Cell.End>
                        <Value.Currency value={tx.amount} />
                      </List.Cell.End>
                    </List.Item.Action>
                  ))}
                </List.Container>
              </Filter.Content>
            </>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

export const ToolbarActionsOnly = () => {
  return (
    <ComponentBox hideCode scope={{ tableIcon, downloadIcon }}>
      {() => {
        const Example = () => {
          const items = [
            { id: 1, name: 'Report Q1', amount: 12000 },
            { id: 2, name: 'Report Q2', amount: 15000 },
            { id: 3, name: 'Report Q3', amount: 9800 },
          ]

          return (
            <>
              <Filter.Root id="actions-only-demo">
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Toolbar.Actions>
                      <Button
                        variant="tertiary"
                        icon={tableIcon}
                        iconPosition="left"
                      >
                        Layout
                      </Button>
                      <Button
                        variant="tertiary"
                        icon={downloadIcon}
                        iconPosition="left"
                      >
                        Download
                      </Button>
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="actions-only-demo">
                <List.Container>
                  {items.map((item) => (
                    <List.Item.Action
                      key={item.id}
                      title={
                        <Filter.Highlighting>
                          {item.name}
                        </Filter.Highlighting>
                      }
                    >
                      <List.Cell.End>
                        <Value.Currency value={item.amount} />
                      </List.Cell.End>
                    </List.Item.Action>
                  ))}
                </List.Container>
              </Filter.Content>
            </>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

export const SearchOnly = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const Example = () => {
          const items = [
            { id: 1, name: 'Rema 1000', amount: -245 },
            { id: 2, name: 'Kiwi', amount: -189 },
            { id: 3, name: 'Salary', amount: 35000 },
          ]

          const { search } = Filter.useFilter('search-only-demo')

          const filtered = items.filter((item) => {
            if (
              search &&
              !item.name.toLowerCase().includes(search.toLowerCase()) &&
              !String(item.amount).includes(search)
            ) {
              return false
            }

            return true
          })

          return (
            <>
              <Filter.Root
                id="search-only-demo"
                resultCount={filtered.length}
              >
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search
                      submitBehavior="onSubmit"
                      label="Search"
                      placeholder="Search..."
                    />
                  </Filter.Toolbar>
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="search-only-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map((item) => (
                    <List.Item.Action
                      key={item.id}
                      title={
                        <Filter.Highlighting>
                          {item.name}
                        </Filter.Highlighting>
                      }
                    >
                      <List.Cell.End>
                        <Value.Currency value={item.amount} />
                      </List.Cell.End>
                    </List.Item.Action>
                  ))}
                </List.Container>
              </Filter.Content>
            </>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

export const WithSortButton = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const Example = () => {
          const transactions = [
            { id: 1, name: 'Rema 1000', amount: -245 },
            { id: 2, name: 'DNB Salary', amount: 25000 },
            { id: 3, name: 'Elkjøp', amount: -3999 },
            { id: 4, name: 'Kiwi', amount: -189 },
          ]

          const sortOptions = [
            { selectedKey: 'newest', content: 'Newest first' },
            { selectedKey: 'oldest', content: 'Oldest first' },
            { selectedKey: 'amount-high', content: 'Amount high–low' },
            { selectedKey: 'amount-low', content: 'Amount low–high' },
          ]

          const [sortKey, setSortKey] = useState('newest')
          const { search } = Filter.useFilter('sort-demo')

          const filtered = transactions
            .filter((tx) => {
              if (
                search &&
                !tx.name.toLowerCase().includes(search.toLowerCase()) &&
                !String(tx.amount).includes(search)
              ) {
                return false
              }

              return true
            })
            .sort((a, b) => {
              switch (sortKey) {
                case 'oldest':
                  return a.id - b.id
                case 'amount-high':
                  return b.amount - a.amount
                case 'amount-low':
                  return a.amount - b.amount
                default:
                  return b.id - a.id
              }
            })

          return (
            <>
              <Filter.Root id="sort-demo" resultCount={filtered.length}>
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search
                      label="Search"
                      placeholder="Store name..."
                    />
                    <Filter.Toolbar.Actions>
                      <Filter.SortButton
                        data={sortOptions}
                        value={sortKey}
                        onChange={({ data: { selectedKey } }) => {
                          setSortKey(String(selectedKey))
                        }}
                      />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="sort-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map((tx) => (
                    <List.Item.Basic
                      key={tx.id}
                      title={
                        <Filter.Highlighting>
                          {tx.name}
                        </Filter.Highlighting>
                      }
                    >
                      <List.Cell.End>
                        <Value.Currency value={tx.amount} />
                      </List.Cell.End>
                    </List.Item.Basic>
                  ))}
                </List.Container>
              </Filter.Content>
            </>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

export const WithQueryLocator = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const transactions = [
          { id: 1, name: 'Rema 1000', amount: -245, status: 'active' },
          { id: 2, name: 'DNB Salary', amount: 25000, status: 'active' },
          { id: 3, name: 'Elkjøp', amount: -3999, status: 'inactive' },
          { id: 4, name: 'Kiwi', amount: -189, status: 'active' },
        ]

        const Example = () => {
          // Syncs filter state to/from URL query parameters
          Filter.useQueryLocator('query-locator-demo', {
            // excludeSearch: true,// You can exclude search from the URL if you want, by default it is included
          })

          const { filters, search } = Filter.useFilter(
            'query-locator-demo'
          )

          const selectedStatuses = Object.keys(filters)
            .filter((key) => key.startsWith('/status/'))
            .map((key) => key.replace('/status/', ''))

          const filtered = transactions.filter((tx) => {
            if (
              search &&
              !tx.name.toLowerCase().includes(search.toLowerCase()) &&
              !String(tx.amount).includes(search)
            ) {
              return false
            }

            if (
              selectedStatuses.length > 0 &&
              !selectedStatuses.includes(tx.status)
            ) {
              return false
            }

            return true
          })

          return (
            <>
              <Filter.Root
                id="query-locator-demo"
                resultCount={filtered.length}
              >
                <Filter.Header>
                  <Filter.Toolbar>
                    <Filter.Search
                      label="Search"
                      placeholder="Store name..."
                    />
                    <Filter.Toolbar.Actions>
                      <Filter.PanelButton />
                    </Filter.Toolbar.Actions>
                  </Filter.Toolbar>
                  <Filter.Panel>
                    <Filter.Selection
                      label="Status"
                      filterKey="/status"
                      data={[
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                      ]}
                    />
                  </Filter.Panel>
                  <Filter.ActiveFilters />
                </Filter.Header>
              </Filter.Root>

              <Filter.Content connectedTo="query-locator-demo">
                <List.Container>
                  <Filter.NoResults />
                  {filtered.map((tx) => (
                    <List.Item.Basic
                      key={tx.id}
                      title={
                        <Filter.Highlighting>
                          {tx.name}
                        </Filter.Highlighting>
                      }
                    >
                      <List.Cell.End>
                        <Value.Currency value={tx.amount} />
                      </List.Cell.End>
                    </List.Item.Basic>
                  ))}
                </List.Container>
              </Filter.Content>
            </>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}
