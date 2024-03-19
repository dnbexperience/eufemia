import { renderHook } from '@testing-library/react'
import useUnmountEffect from '../useUnmountEffect'

describe('useUnmountEffect', () => {
  it('should unmount once and not be called on render or re-render', () => {
    let wasUnmounted = 0

    const effect = jest.fn(() => {
      wasUnmounted += 1
    })
    const { rerender, unmount } = renderHook(() =>
      useUnmountEffect(effect)
    )

    expect(wasUnmounted).toBe(0)

    rerender()
    rerender()

    expect(wasUnmounted).toBe(0)

    unmount()
    unmount()

    expect(wasUnmounted).toBe(1)

    expect(effect).toHaveBeenCalledTimes(1)
  })
})
