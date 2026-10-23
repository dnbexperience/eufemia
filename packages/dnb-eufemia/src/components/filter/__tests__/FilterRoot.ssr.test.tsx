// @vitest-environment node

import { renderToString } from 'react-dom/server'
import SharedProvider from '../../../shared/Provider'
import FilterRoot from '../FilterRoot'
import { useFilter } from '../hooks/useFilter'

const ShowFilters = ({ id }: { id: string }) => {
  const { filters } = useFilter(id)
  return <output>{JSON.stringify(filters)}</output>
}

describe('Filter.Root SSR', () => {
  it('should not leak filters to a later server render with the same id', () => {
    renderToString(
      <FilterRoot
        id="ssr-transactions"
        defaultFilters={{
          '/account': { value: 'savings-a', label: 'User A savings' },
        }}
      >
        <ShowFilters id="ssr-transactions" />
      </FilterRoot>
    )

    const html = renderToString(
      <FilterRoot id="ssr-transactions">
        <ShowFilters id="ssr-transactions" />
      </FilterRoot>
    )

    expect(html).not.toContain('User A savings')
  })

  it('should share filters by id within the same server render', () => {
    const html = renderToString(
      <FilterRoot
        id="ssr-same-render"
        defaultFilters={{
          '/account': { value: 'savings', label: 'Savings' },
        }}
      >
        <ShowFilters id="ssr-same-render" />
      </FilterRoot>
    )

    expect(html).toContain('Savings')
  })

  it('should share filters with components outside Filter.Root inside a Provider', () => {
    const html = renderToString(
      <SharedProvider>
        <FilterRoot
          id="ssr-provider"
          defaultFilters={{
            '/account': { value: 'savings', label: 'Savings' },
          }}
        />
        <ShowFilters id="ssr-provider" />
      </SharedProvider>
    )

    expect(html).toContain('Savings')
  })
})
