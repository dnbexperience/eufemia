/**
 * Filter component examples for the portal docs.
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  Filter,
  Grid,
  Heading,
  List,
  P,
  ToggleButton,
} from '@dnb/eufemia/src'
import { Tools } from '@dnb/eufemia/src/extensions/forms'

export const WithDateAndSelection = () => {
  return (
    <ComponentBox hideCode>
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
              !tx.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return false
            }

            if (filters['/type']) {
              const values = filters['/type'].value as string[]
              if (!values.includes(tx.type)) {
                return false
              }
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
                <Filter.Container
                  id="date-selection-demo"
                  resultCount={filtered.length}
                >
                  <Filter.Search
                    label="Search results"
                    placeholder="Store name, amount..."
                  />
                  <Filter.Toolbar>
                    <Filter.QuickFilter>
                      <Filter.Date label="Date" />
                    </Filter.QuickFilter>
                    <Filter.More>
                      <Filter.Date label="Date" />
                      <Filter.Selection
                        label="Payment type"
                        filterKey="/type"
                        options={[
                          { value: 'card', label: 'Card' },
                          { value: 'transfer', label: 'Transfer' },
                        ]}
                      />
                    </Filter.More>
                  </Filter.Toolbar>
                  <Filter.ActiveFilters />
                </Filter.Container>
              </Grid.Item>

              <Grid.Item span={{ small: 'full', large: [5, 12] }}>
                <Filter.ResultsContainer connectedTo="date-selection-demo">
                  <Heading size="large" top={false}>
                    Results
                  </Heading>
                  <Filter.NoResults />
                  <List.Container>
                    {filtered.map((tx) => (
                      <List.Item.Basic key={tx.id} title={tx.name}>
                        <List.Cell.End>{tx.amount} kr</List.Cell.End>
                      </List.Item.Basic>
                    ))}
                  </List.Container>
                </Filter.ResultsContainer>
              </Grid.Item>
            </Grid.Container>
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
          const { filters } = Filter.useFilter('custom-demo')

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
                <Filter.Container id="custom-demo">
                  <Filter.Search label="Search" placeholder="Search..." />
                  <Filter.Toolbar>
                    <Filter.QuickFilter />
                    <Filter.More>
                      <Filter.Selection
                        label="Category"
                        filterKey="/category"
                        options={[
                          { value: 'restaurant', label: 'Restaurant' },
                          { value: 'hotel', label: 'Hotel' },
                          { value: 'cafe', label: 'Cafe' },
                        ]}
                      />
                      <ToggleFilter
                        label="Favorites only"
                        filterKey="/favorites"
                      />
                    </Filter.More>
                  </Filter.Toolbar>
                  <Filter.ActiveFilters />
                </Filter.Container>
              </Grid.Item>

              <Grid.Item span={{ small: 'full', large: [5, 12] }}>
                <Filter.ResultsContainer connectedTo="custom-demo">
                  <Heading size="large" top={false}>
                    Results
                  </Heading>
                  <Tools.Log data={filters} breakout={false} />
                </Filter.ResultsContainer>
              </Grid.Item>
            </Grid.Container>
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
              !item.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return false
            }
            return true
          })

          return (
            <>
              <Filter.ResultsContainer connectedTo="decoupled-demo">
                <Heading size="large" top={false}>
                  Results
                </Heading>
                <P
                  space={{
                    top: 0,
                    bottom: 'small',
                  }}
                >
                  Antall: {filtered.length}
                </P>
                <Filter.NoResults />
                {filtered.length > 0 && (
                  <List.Container>
                    {filtered.map((item) => (
                      <List.Item.Basic key={item.id} title={item.name}>
                        <List.Cell.End>{item.amount} kr</List.Cell.End>
                      </List.Item.Basic>
                    ))}
                  </List.Container>
                )}
              </Filter.ResultsContainer>
            </>
          )
        }

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
              <Filter.Container id="decoupled-demo">
                <Filter.Search
                  label="Search"
                  placeholder="Search results..."
                />
                <Filter.ActiveFilters />
              </Filter.Container>
            </Grid.Item>

            <Grid.Item span={{ small: 'full', large: [5, 12] }}>
              <TransactionList />
            </Grid.Item>
          </Grid.Container>
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
                  !tx.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return false
                }

                if (filters['/status']) {
                  const values = filters['/status'].value as string[]
                  if (!values.includes(tx.status)) {
                    return false
                  }
                }

                return true
              })

              resolve(result)
            }, 1500)
          })
        }

        const Example = () => {
          const { data: filtered } = Filter.useFilterAsync(
            'async-demo',
            ({ filters, search }) => fetchFiltered(filters, search),
            { initialData: allTransactions }
          )

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
                <Filter.Container id="async-demo">
                  <Filter.Search
                    label="Search"
                    placeholder="Search for something..."
                  />
                  <Filter.Toolbar>
                    <Filter.QuickFilter>
                      <Filter.Date label="Date" />
                    </Filter.QuickFilter>
                    <Filter.More>
                      <Filter.Selection
                        label="Status"
                        filterKey="/status"
                        defaultOpen
                        options={[
                          { value: 'active', label: 'Active' },
                          { value: 'inactive', label: 'Inactive' },
                        ]}
                      />
                    </Filter.More>
                  </Filter.Toolbar>
                  <Filter.ActiveFilters />
                </Filter.Container>
              </Grid.Item>

              <Grid.Item span={{ small: 'full', large: [5, 12] }}>
                <Filter.ResultsContainer connectedTo="async-demo">
                  <Heading size="large" top={false}>
                    Results
                  </Heading>
                  <Filter.NoResults connectedTo="async-demo" />
                  <List.Container>
                    {filtered.map((tx) => (
                      <List.Item.Basic key={tx.id} title={tx.name}>
                        <List.Cell.End>{tx.amount} kr</List.Cell.End>
                      </List.Item.Basic>
                    ))}
                  </List.Container>
                </Filter.ResultsContainer>
              </Grid.Item>
            </Grid.Container>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

export const WithMultiSelection = () => {
  return (
    <ComponentBox hideCode>
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
              !tx.name.toLowerCase().includes(search.toLowerCase())
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
                <Filter.Container
                  id="multi-selection-demo"
                  resultCount={filtered.length}
                >
                  <Filter.Search
                    label="Search"
                    placeholder="Invoice number..."
                  />
                  <Filter.Toolbar>
                    <Filter.QuickFilter>
                      <Filter.Date label="Date" />
                    </Filter.QuickFilter>
                    <Filter.More>
                      <Filter.MultiSelection
                        label="Client"
                        filterKey="/client"
                        data={clients}
                        defaultOpen
                      />
                    </Filter.More>
                  </Filter.Toolbar>
                  <Filter.ActiveFilters />
                </Filter.Container>
              </Grid.Item>

              <Grid.Item span={{ small: 'full', large: [5, 12] }}>
                <Filter.ResultsContainer connectedTo="multi-selection-demo">
                  <Heading size="large" top={false}>
                    Transactions
                  </Heading>
                  <Filter.NoResults />
                  <List.Container>
                    {filtered.map((tx) => (
                      <List.Item.Basic key={tx.id} title={tx.name}>
                        <List.Cell.End>{tx.amount} kr</List.Cell.End>
                      </List.Item.Basic>
                    ))}
                  </List.Container>
                </Filter.ResultsContainer>
              </Grid.Item>
            </Grid.Container>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}
