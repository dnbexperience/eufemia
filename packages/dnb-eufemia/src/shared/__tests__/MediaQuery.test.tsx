/**
 * MediaQuery Tests
 *
 */

import { act, useState } from 'react'
import { render, screen } from '@testing-library/react'

import '../../core/vitest/mockMatchMediaSetup'
import { setMedia } from 'mock-match-media'
import type { MediaQueryProps } from '../MediaQuery'
import MediaQuery from '../MediaQuery'
import Provider from '../Provider'
import { isMatchMediaSupported as _isMatchMediaSupported } from '../MediaQueryUtils'

const isMatchMediaSupported =
  _isMatchMediaSupported as import('vitest').Mock

vi.mock('../MediaQueryUtils', async () => {
  const orig = await vi.importActual<typeof import('../MediaQueryUtils')>(
    '../MediaQueryUtils'
  )
  return {
    ...orig,
    isMatchMediaSupported: vi.fn(),
  }
})

describe('MediaQuery', () => {
  beforeEach(() => {
    isMatchMediaSupported.mockReturnValue(true)
  })

  it('renders with props as an object', () => {
    setMedia({ width: '61em' })

    const props: MediaQueryProps = {
      when: { min: 'medium', max: 'large' },
      children: 'medium',
    }

    render(<MediaQuery {...props} />)
    expect(screen.queryByText('medium')).toBeInTheDocument()
  })

  it('should match for query with medium width', () => {
    setMedia({ width: '61em' })

    render(
      <MediaQuery when={{ min: 'medium', max: 'large' }}>
        medium
      </MediaQuery>
    )
    expect(screen.queryByText('medium')).toBeInTheDocument()
  })

  it('should match for query when different breakpoints are given', () => {
    setMedia({ width: '20rem' })

    render(
      <Provider
        value={{
          breakpoints: {
            medium: '30rem',
            large: '80rem',
          },
        }}
      >
        <MediaQuery
          when={[
            { min: 'small', max: 'x-large' },
            { min: '0', max: 'medium' },
            { max: 'xx-large' },
          ]}
        >
          medium
        </MediaQuery>
      </Provider>
    )

    expect(screen.queryByText('medium')).toBeInTheDocument()
  })

  it('should match for query when custom breakpoints are given', () => {
    setMedia({ width: '10rem' })

    render(
      <Provider
        value={{
          breakpoints: {
            xsmall: '20rem',
            wide: '90rem',
          },
        }}
      >
        <MediaQuery when={[{ min: '0', max: 'xsmall' }, { max: 'wide' }]}>
          xsmall
        </MediaQuery>
      </Provider>
    )

    expect(screen.queryByText('xsmall')).toBeInTheDocument()
  })

  it('should match for query when breakpoint is got removed', () => {
    setMedia({ width: '10rem' })

    render(
      <Provider
        value={{
          breakpoints: {
            xsmall: '20rem',
            large: '71rem',
            'x-large': undefined,
          },
        }}
      >
        <MediaQuery
          when={[
            { min: '0', max: 'xsmall' },
            { min: 'large', max: 'x-large' },
          ]}
        >
          xsmall
        </MediaQuery>
      </Provider>
    )

    expect(screen.queryByText('xsmall')).toBeInTheDocument()
  })

  it('should match for what ever query is given when matchOnSSR is true', () => {
    isMatchMediaSupported.mockReturnValue(false)

    render(
      <MediaQuery matchOnSSR when={{ min: 'what-every' }}>
        medium
      </MediaQuery>
    )

    expect(screen.queryByText('medium')).toBeInTheDocument()
  })

  it('should match for query with medium and large width', () => {
    setMedia({ width: '61em' })

    render(
      <MediaQuery
        when={[
          { min: 'medium', max: 'large' },
          { min: 'large', max: 'x-large' },
        ]}
      >
        medium large
      </MediaQuery>
    )
    expect(screen.queryByText('medium large')).toBeInTheDocument()
  })

  it('should handle media query changes', () => {
    setMedia({ width: '40em' })

    const Playground = () => {
      const [query, updateQuery] = useState({
        min: '0',
        max: 'large',
      })

      return (
        <>
          <button
            onClick={() => {
              updateQuery({
                min: query.min === '0' ? 'x-large' : '0',
                max: query.max === 'large' ? undefined : 'large',
              })
            }}
          >
            Change
          </button>
          <span id="result">
            <MediaQuery matchOnSSR when={query}>
              when
            </MediaQuery>
          </span>
        </>
      )
    }

    render(<Playground />)
    expect(screen.queryByText('when')).toBeInTheDocument()

    act(() => {
      screen.getByRole('button').click()
    })
    expect(screen.queryByText('when')).not.toBeInTheDocument()
    act(() => {
      screen.getByRole('button').click()
    })
    expect(screen.queryByText('when')).toBeInTheDocument()
  })
})
