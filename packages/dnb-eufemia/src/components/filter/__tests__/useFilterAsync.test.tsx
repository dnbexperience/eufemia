import { render, fireEvent, waitFor, act } from '@testing-library/react'
import FilterRoot from '../FilterRoot'
import FilterContent from '../FilterContent'
import FilterNoResults from '../FilterNoResults'
import FilterSearch from '../FilterSearch'
import { useFilterAsync } from '../hooks/useFilter'

describe('useFilterAsync', () => {
  it('calls fetcher and returns data', async () => {
    const fetcher = vi.fn().mockResolvedValue([1, 2, 3])

    function Consumer() {
      const { data } = useFilterAsync('async-test', fetcher)
      return <span data-testid="data">{JSON.stringify(data)}</span>
    }

    render(
      <>
        <FilterRoot id="async-test" />
        <Consumer />
      </>
    )

    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="data"]').textContent
      ).toBe('[1,2,3]')
    })
  })

  it('returns initialData before fetch completes', () => {
    const fetcher = vi.fn().mockReturnValue(new Promise(() => {}))

    function Consumer() {
      const { data } = useFilterAsync('async-initial-test', fetcher, {
        initialData: ['initial'],
      })
      return <span data-testid="data">{JSON.stringify(data)}</span>
    }

    render(
      <>
        <FilterRoot id="async-initial-test" />
        <Consumer />
      </>
    )

    expect(
      document.querySelector('[data-testid="data"]').textContent
    ).toBe('["initial"]')
  })

  it('sets resultLoading on shared state', async () => {
    let resolveFetch: (value: unknown[]) => void
    const fetcher = vi.fn().mockReturnValue(
      new Promise<unknown[]>((resolve) => {
        resolveFetch = resolve
      })
    )

    function Consumer() {
      const { loading } = useFilterAsync('async-loading-test', fetcher)
      return (
        <span data-testid="loading">{loading ? 'true' : 'false'}</span>
      )
    }

    render(
      <>
        <FilterRoot id="async-loading-test" />
        <Consumer />
      </>
    )

    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="loading"]').textContent
      ).toBe('true')
    })

    resolveFetch([1, 2])

    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="loading"]').textContent
      ).toBe('false')
    })
  })

  it('syncs resultCount so NoResults reads it', async () => {
    const fetcher = vi.fn().mockResolvedValue([])

    function Consumer() {
      useFilterAsync('async-no-results-test', fetcher)
      return null
    }

    render(
      <>
        <FilterRoot id="async-no-results-test" />
        <Consumer />
        <FilterNoResults connectedTo="async-no-results-test" />
      </>
    )

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-filter__no-results')
      ).toBeInTheDocument()
    })
  })

  it('ignores stale responses when a newer request is pending', async () => {
    const resolvers: Array<(value: string[]) => void> = []
    const fetcher = vi.fn().mockImplementation(
      () =>
        new Promise<string[]>((resolve) => {
          resolvers.push(resolve)
        })
    )

    function Consumer() {
      const { data } = useFilterAsync('async-race-test', fetcher)
      return <span data-testid="data">{JSON.stringify(data)}</span>
    }

    render(
      <>
        <FilterRoot id="async-race-test">
          <FilterSearch label="Søk" />
        </FilterRoot>
        <Consumer />
      </>
    )

    // Wait for first fetch call
    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledTimes(1)
    })

    // Trigger a second fetch by updating the search value
    fireEvent.change(document.querySelector('.dnb-filter__search input'), {
      target: { value: 'new' },
    })

    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledTimes(2)
    })

    // Resolve the first (stale) request
    resolvers[0](['stale'])

    // Resolve the second (current) request
    resolvers[1](['current'])

    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="data"]').textContent
      ).toBe('["current"]')
    })
  })

  it('passes filters and search to the fetcher', async () => {
    const fetcher = vi.fn().mockResolvedValue([])

    function Consumer() {
      useFilterAsync('async-params-test', fetcher)
      return null
    }

    render(
      <FilterRoot id="async-params-test">
        <FilterSearch label="Søk" />
        <Consumer />
      </FilterRoot>
    )

    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledWith({
        filters: {},
        search: '',
      })
    })

    fireEvent.change(document.querySelector('.dnb-filter__search input'), {
      target: { value: 'hello' },
    })

    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledWith(
        expect.objectContaining({ search: 'hello' })
      )
    })
  })

  it('shows skeleton on Results while fetching', async () => {
    let resolveFetch: (value: string[]) => void
    const fetcher = vi.fn().mockReturnValue(
      new Promise<string[]>((resolve) => {
        resolveFetch = resolve
      })
    )

    function Consumer() {
      useFilterAsync('async-skeleton-test', fetcher)
      return null
    }

    render(
      <>
        <FilterRoot id="async-skeleton-test">
          <Consumer />
        </FilterRoot>
        <FilterContent connectedTo="async-skeleton-test">
          <p>Results here</p>
        </FilterContent>
      </>
    )

    await waitFor(() => {
      const skeleton = document.querySelector(
        '.dnb-filter__content.dnb-skeleton'
      )
      expect(skeleton).toBeInTheDocument()
    })

    resolveFetch(['done'])

    await waitFor(() => {
      const skeleton = document.querySelector(
        '.dnb-filter__content.dnb-skeleton'
      )
      expect(skeleton).not.toBeInTheDocument()
    })
  })
})

describe('useFilterAsync error handling', () => {
  it('returns error when fetcher rejects', async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error('Network failure'))

    function Consumer() {
      const { error, loading } = useFilterAsync(
        'async-error-test',
        fetcher
      )
      return (
        <>
          <span data-testid="error">{error?.message ?? 'none'}</span>
          <span data-testid="loading">{loading ? 'true' : 'false'}</span>
        </>
      )
    }

    render(
      <>
        <FilterRoot id="async-error-test" />
        <Consumer />
      </>
    )

    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="error"]').textContent
      ).toBe('Network failure')
    })

    expect(
      document.querySelector('[data-testid="loading"]').textContent
    ).toBe('false')
  })

  it('clears error on subsequent successful fetch', async () => {
    let callCount = 0
    const fetcher = vi.fn().mockImplementation(() => {
      callCount++
      if (callCount === 1) {
        return Promise.reject(new Error('First fail'))
      }
      return Promise.resolve(['ok'])
    })

    function Consumer() {
      const { error, data } = useFilterAsync(
        'async-error-clear-test',
        fetcher
      )
      return (
        <>
          <span data-testid="error">{error?.message ?? 'none'}</span>
          <span data-testid="data">{JSON.stringify(data)}</span>
        </>
      )
    }

    render(
      <FilterRoot id="async-error-clear-test">
        <FilterSearch label="Search" />
        <Consumer />
      </FilterRoot>
    )

    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="error"]').textContent
      ).toBe('First fail')
    })

    fireEvent.change(document.querySelector('.dnb-filter__search input'), {
      target: { value: 'retry' },
    })

    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="error"]').textContent
      ).toBe('none')
    })

    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="data"]').textContent
      ).toBe('["ok"]')
    })
  })

  it('wraps non-Error rejections in an Error', async () => {
    const fetcher = vi.fn().mockRejectedValue('string error')

    function Consumer() {
      const { error } = useFilterAsync('async-error-string-test', fetcher)
      return <span data-testid="error">{error?.message ?? 'none'}</span>
    }

    render(
      <>
        <FilterRoot id="async-error-string-test" />
        <Consumer />
      </>
    )

    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="error"]').textContent
      ).toBe('string error')
    })
  })
})

describe('useFilterAsync debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('delays the fetcher call by the debounce value', async () => {
    const fetcher = vi.fn().mockResolvedValue(['result'])

    function Consumer() {
      const { data } = useFilterAsync('debounce-delay-test', fetcher, {
        debounce: 300,
      })
      return <span data-testid="data">{JSON.stringify(data)}</span>
    }

    render(
      <FilterRoot id="debounce-delay-test">
        <FilterSearch label="Søk" />
        <Consumer />
      </FilterRoot>
    )

    // First call happens immediately (no debounce on initial render)
    await act(async () => {
      // flush microtasks from the initial resolved promise
    })
    expect(fetcher).toHaveBeenCalledTimes(1)

    fetcher.mockClear()

    // Trigger a search change
    fireEvent.change(document.querySelector('.dnb-filter__search input'), {
      target: { value: 'hello' },
    })

    // Fetcher should not be called yet
    expect(fetcher).not.toHaveBeenCalled()

    // Advance past the debounce delay
    await act(async () => {
      vi.advanceTimersByTime(300)
    })

    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(fetcher).toHaveBeenCalledWith(
      expect.objectContaining({ search: 'hello' })
    )
  })

  it('cancels pending debounce when a new change arrives', async () => {
    const fetcher = vi.fn().mockResolvedValue(['result'])

    function Consumer() {
      const { data } = useFilterAsync('debounce-cancel-test', fetcher, {
        debounce: 300,
      })
      return <span data-testid="data">{JSON.stringify(data)}</span>
    }

    render(
      <FilterRoot id="debounce-cancel-test">
        <FilterSearch label="Søk" />
        <Consumer />
      </FilterRoot>
    )

    // Wait for initial fetch
    await act(async () => {})
    expect(fetcher).toHaveBeenCalledTimes(1)

    fetcher.mockClear()

    const input = document.querySelector('.dnb-filter__search input')

    // Type first character
    fireEvent.change(input, { target: { value: 'h' } })
    await act(async () => {
      vi.advanceTimersByTime(100)
    })

    // Type another character before debounce fires
    fireEvent.change(input, { target: { value: 'he' } })
    await act(async () => {
      vi.advanceTimersByTime(100)
    })

    // Type another character
    fireEvent.change(input, { target: { value: 'hel' } })

    // The first two should have been cancelled, fetcher not called yet
    expect(fetcher).not.toHaveBeenCalled()

    // Advance past the debounce delay from the last change
    await act(async () => {
      vi.advanceTimersByTime(300)
    })

    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(fetcher).toHaveBeenCalledWith(
      expect.objectContaining({ search: 'hel' })
    )
  })

  it('does not debounce the initial fetch', async () => {
    const fetcher = vi.fn().mockResolvedValue(['init'])

    function Consumer() {
      const { data } = useFilterAsync('debounce-initial-test', fetcher, {
        debounce: 500,
      })
      return <span data-testid="data">{JSON.stringify(data)}</span>
    }

    render(
      <FilterRoot id="debounce-initial-test">
        <Consumer />
      </FilterRoot>
    )

    // First fetch should happen immediately without waiting for debounce
    expect(fetcher).toHaveBeenCalledTimes(1)

    await act(async () => {
      // flush the resolved promise
    })

    expect(
      document.querySelector('[data-testid="data"]').textContent
    ).toBe('["init"]')
  })
})
