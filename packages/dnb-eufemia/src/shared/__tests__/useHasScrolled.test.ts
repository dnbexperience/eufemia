import { act, renderHook } from '@testing-library/react'
import useHasScrolled from '../useHasScrolled'

function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    value,
  })
}

describe('useHasScrolled', () => {
  afterEach(() => {
    setScrollY(0)
  })

  it('uses the current scroll position when mounted', () => {
    setScrollY(9)

    const { result } = renderHook(() => useHasScrolled())

    expect(result.current).toBe(true)
  })

  it('updates when scrolling past and back across the threshold', () => {
    setScrollY(0)
    const { result } = renderHook(() => useHasScrolled())

    expect(result.current).toBe(false)

    act(() => {
      setScrollY(9)
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)

    act(() => {
      setScrollY(8)
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(false)
  })
})
