/**
 * useMediaQuery Tests
 *
 */

import { StrictMode, useState } from 'react'
import {
  render,
  screen,
  fireEvent,
  renderHook,
} from '@testing-library/react'
import '../../core/vitest/mockMatchMediaSetup'
import { setMedia } from 'mock-match-media'
import useMediaQuery from '../useMediaQuery'
import Provider from '../Provider'
import type { MediaQueryProps } from '../MediaQueryUtils'
import { isMatchMediaSupported as _isMatchMediaSupported } from '../MediaQueryUtils'

const isMatchMediaSupported =
  _isMatchMediaSupported as import('vitest').Mock

vi.mock('../MediaQueryUtils', async () => ({
  ...(await vi.importActual<typeof import('../MediaQueryUtils')>(
    '../MediaQueryUtils'
  )),
  isMatchMediaSupported: vi.fn(),
}))

const wrapper = ({ children }) => <StrictMode>{children}</StrictMode>

const RenderMediaQueryHook = (props: MediaQueryProps) => {
  const match = useMediaQuery(props)
  return <div id="mq-mock">{match ? props.children : null}</div>
}

describe('useMediaQuery', () => {
  beforeEach(() => {
    isMatchMediaSupported.mockReturnValue(true)
  })

  it('should have valid strings inside render and rerender', () => {
    setMedia({ width: '61em' })

    const { rerender } = render(
      <RenderMediaQueryHook when={{ min: 'medium', max: 'large' }}>
        medium
      </RenderMediaQueryHook>
    )

    expect(document.getElementById('mq-mock').textContent).toBe('medium')

    rerender(
      <RenderMediaQueryHook when={'medium large'}>
        medium
      </RenderMediaQueryHook>
    )

    expect(document.getElementById('mq-mock').textContent).toBe('')
  })

  it('should match for query when different breakpoints are given', () => {
    setMedia({ width: '20rem' })

    render(
      <Provider
        value={{
          breakpoints: {
            medium: '20rem',
            large: '80rem',
          },
        }}
      >
        <RenderMediaQueryHook when={{ min: 'medium', max: 'large' }}>
          medium
        </RenderMediaQueryHook>
      </Provider>
    )

    expect(document.getElementById('mq-mock').textContent).toBe('medium')
  })

  it('should have valid strings inside render', () => {
    setMedia({ width: '10em' })

    render(
      <RenderMediaQueryHook when={{ min: '0', max: 'x-large' }}>
        matches
      </RenderMediaQueryHook>
    )

    expect(document.getElementById('mq-mock').textContent).toBe('matches')
  })

  it('should handle media query changes', () => {
    setMedia({ width: '50em' })

    const match1Handler = vi.fn()

    const Playground = () => {
      const [query, updateQuery] = useState({
        min: 'small',
        max: 'large',
      })

      const match1 = useMediaQuery({
        when: query,
      })
      match1Handler(match1)

      return (
        <button
          onClick={() => {
            updateQuery({
              min: query.min === 'small' ? 'x-large' : 'small',
              max: query.max === 'large' ? undefined : 'large',
            })
          }}
        >
          Change
        </button>
      )
    }

    render(<Playground />)
    expect(match1Handler).toHaveBeenCalledTimes(2)
    expect(match1Handler).toHaveBeenCalledWith(true)

    fireEvent.click(screen.getByRole('button'))
    expect(match1Handler).toHaveBeenCalledTimes(4)
    expect(match1Handler).toHaveBeenCalledWith(false)

    fireEvent.click(screen.getByRole('button'))
    expect(match1Handler).toHaveBeenCalledTimes(6)
    expect(match1Handler).toHaveBeenCalledWith(true)
  })

  it('can be disabled', () => {
    vi.spyOn(window, 'matchMedia').mockImplementationOnce(
      vi.fn(window.matchMedia)
    )

    setMedia({ width: '10em' })

    const when = { min: '0', max: 'x-large' }

    const { result: resultA } = renderHook(
      () =>
        useMediaQuery({
          when,
        }),
      { wrapper }
    )

    expect(window.matchMedia).toHaveBeenCalledTimes(6)
    expect(resultA.current).toBe(true)

    vi.spyOn(window, 'matchMedia').mockImplementationOnce(
      vi.fn(window.matchMedia)
    )

    const { result: resultB } = renderHook(
      () =>
        useMediaQuery({
          disabled: true,
          when,
        }),
      { wrapper }
    )

    expect(window.matchMedia).toHaveBeenCalledTimes(6)
    expect(resultB.current).toBe(false)
  })
})

describe('useMediaQuery without window.matchMedia', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: undefined,
      writable: true,
      configurable: true,
    })
  })

  it('should not break', () => {
    render(<RenderMediaQueryHook>matches</RenderMediaQueryHook>)

    expect(document.getElementById('mq-mock').textContent).toBe('')
  })
})
