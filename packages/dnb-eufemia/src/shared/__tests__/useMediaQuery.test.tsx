/**
 * useMediaQuery Tests
 *
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import MatchMediaMock from 'jest-matchmedia-mock'
import useMediaQuery from '../useMediaQuery'
import Provider from '../Provider'
import {
  isMatchMediaSupported as _isMatchMediaSupported,
  MediaQueryProps,
} from '../MediaQueryUtils'

const isMatchMediaSupported = _isMatchMediaSupported as jest.Mock

jest.mock('../MediaQueryUtils', () => ({
  ...jest.requireActual('../MediaQueryUtils'),
  isMatchMediaSupported: jest.fn(),
}))

const RenderMediaQueryHook = (props: MediaQueryProps) => {
  const match = useMediaQuery(props)
  return <div id="mq-mock">{match ? props.children : null}</div>
}

describe('useMediaQuery', () => {
  let matchMedia: MatchMediaMock

  beforeAll(() => {
    matchMedia = new MatchMediaMock()
  })

  beforeEach(() => {
    isMatchMediaSupported.mockReturnValue(true)
  })

  afterEach(() => {
    matchMedia?.clear()
  })

  afterAll(() => {
    matchMedia?.destroy()
  })

  it('should have valid strings inside render', () => {
    matchMedia.useMediaQuery('(min-width: 50em) and (max-width: 60em)')

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
    matchMedia.useMediaQuery('(min-width: 20rem) and (max-width: 80rem)')

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
    matchMedia.useMediaQuery('(min-width: 0) and (max-width: 72em)')

    render(
      <RenderMediaQueryHook when={{ min: '0', max: 'x-large' }}>
        matches
      </RenderMediaQueryHook>
    )

    expect(document.getElementById('mq-mock').textContent).toBe('matches')
  })

  it('should handle media query changes', () => {
    matchMedia.useMediaQuery(
      'not screen and (min-width: 40em) and (max-width: 60em)'
    )

    const match1Handler = jest.fn()
    const match2Handler = jest.fn()

    const Playground = () => {
      const [query, updateQuery] = React.useState({
        screen: true,
        not: true,
        min: 'small',
        max: 'large',
      })

      const match1 = useMediaQuery({
        when: query,
      })
      match1Handler(match1)
      const match2 = useMediaQuery({
        not: true,
        when: query,
      })
      match2Handler(match2)

      return (
        <button
          onClick={() => {
            updateQuery({
              ...query,
              screen: !query.screen,
            })
          }}
        >
          Change
        </button>
      )
    }

    render(<Playground />)
    expect(match1Handler).toHaveBeenCalledTimes(1)
    expect(match2Handler).toHaveBeenCalledTimes(1)
    expect(match1Handler).toHaveBeenCalledWith(true)
    expect(match2Handler).toHaveBeenCalledWith(false)

    fireEvent.click(screen.getByRole('button'))
    expect(match1Handler).toHaveBeenCalledTimes(3)
    expect(match2Handler).toHaveBeenCalledTimes(3)
    expect(match1Handler).toHaveBeenCalledWith(false)
    expect(match2Handler).toHaveBeenCalledWith(true)

    fireEvent.click(screen.getByRole('button'))
    expect(match1Handler).toHaveBeenCalledTimes(5)
    expect(match2Handler).toHaveBeenCalledTimes(5)
    expect(match1Handler).toHaveBeenCalledWith(true)
    expect(match2Handler).toHaveBeenCalledWith(false)
  })

  it('can be disabled', () => {
    jest
      .spyOn(window, 'matchMedia')
      .mockImplementationOnce(jest.fn(window.matchMedia))

    matchMedia.useMediaQuery('(min-width: 0) and (max-width: 72em)')

    const when = { min: '0', max: 'x-large' }

    const { result: resultA } = renderHook(() =>
      useMediaQuery({
        when,
      })
    )

    expect(window.matchMedia).toBeCalledTimes(2)
    expect(resultA.current).toBe(true)

    jest
      .spyOn(window, 'matchMedia')
      .mockImplementationOnce(jest.fn(window.matchMedia))

    const { result: resultB } = renderHook(() =>
      useMediaQuery({
        disabled: true,
        when,
      })
    )

    expect(window.matchMedia).toBeCalledTimes(2)
    expect(resultB.current).toBe(false)
  })
})

describe('useMediaQuery without window.matchMedia', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: undefined,
      writable: true,
    })
  })

  it('should not break', () => {
    render(<RenderMediaQueryHook>matches</RenderMediaQueryHook>)

    expect(document.getElementById('mq-mock').textContent).toBe('')
  })
})
