import { renderHook } from '@testing-library/react'
import useMounted from '../useMounted'

describe('useMounted', () => {
  it('should return positive Ref', () => {
    const { result } = renderHook(() => useMounted())
    expect(result.current.current).toBe(true)
  })

  it('should return negative Ref on unmount', () => {
    const { result, unmount } = renderHook(() => useMounted())

    expect(result.current.current).toBe(true)
    unmount()
    expect(result.current.current).toBe(false)
  })
})
