import { renderHook } from '@testing-library/react'
import useUpdateEffect from '../useUpdateEffect'

describe('useUpdateEffect', () => {
  it('should not on first mount', () => {
    const effect = vi.fn()
    renderHook(() => useUpdateEffect(effect))
    expect(effect).toHaveBeenCalledTimes(0)
  })

  it('should not run on re-renders', () => {
    const effect = vi.fn()
    const { rerender } = renderHook(() => useUpdateEffect(effect))

    rerender()
    rerender()
    rerender()
    expect(effect).toHaveBeenCalledTimes(3)
  })
})
