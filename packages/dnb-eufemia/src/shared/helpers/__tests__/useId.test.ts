import { renderHook } from '@testing-library/react'
import useId from '../useId'

describe('useId', () => {
  it('should return given id', () => {
    const { result } = renderHook(() => useId('test'))
    expect(result.current).toBe('test')
  })

  it('should return id from React.useId', () => {
    const { result } = renderHook(() => useId())
    expect(result.current).toMatch(/^id-/)
  })
})
