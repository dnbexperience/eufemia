import { renderHook } from '@testing-library/react'
import { createRef } from 'react'
import useCombinedRef from '../useCombinedRef'

describe('useCombinedRef', () => {
  it('should assign to a callback ref', () => {
    const callbackRef = jest.fn()
    const { result } = renderHook(() => useCombinedRef(callbackRef))

    const node = document.createElement('div')
    result.current(node)

    expect(callbackRef).toHaveBeenCalledWith(node)
  })

  it('should assign to an object ref', () => {
    const objectRef = createRef<HTMLDivElement>()
    const { result } = renderHook(() => useCombinedRef(objectRef))

    const node = document.createElement('div')
    result.current(node)

    expect(objectRef.current).toBe(node)
  })

  it('should assign to multiple refs', () => {
    const callbackRef = jest.fn()
    const objectRef = createRef<HTMLDivElement>()
    const { result } = renderHook(() =>
      useCombinedRef(callbackRef, objectRef),
    )

    const node = document.createElement('div')
    result.current(node)

    expect(callbackRef).toHaveBeenCalledWith(node)
    expect(objectRef.current).toBe(node)
  })

  it('should handle undefined refs', () => {
    const callbackRef = jest.fn()
    const { result } = renderHook(() =>
      useCombinedRef(undefined, callbackRef, undefined),
    )

    const node = document.createElement('div')
    result.current(node)

    expect(callbackRef).toHaveBeenCalledWith(node)
  })

  it('should handle null unset', () => {
    const callbackRef = jest.fn()
    const objectRef = createRef<HTMLDivElement>()
    const { result } = renderHook(() =>
      useCombinedRef(callbackRef, objectRef),
    )

    const node = document.createElement('div')
    result.current(node)
    result.current(null)

    expect(callbackRef).toHaveBeenLastCalledWith(null)
    expect(objectRef.current).toBeNull()
  })

  it('should return a stable callback when refs do not change', () => {
    const callbackRef = jest.fn()
    const { result, rerender } = renderHook(() =>
      useCombinedRef(callbackRef),
    )

    const first = result.current
    rerender()
    const second = result.current

    expect(first).toBe(second)
  })
})
