import { act, renderHook } from '@testing-library/react-hooks'
import { useEventEmitter } from '../useEventEmitter'

describe('useEventEmitter', () => {
  beforeEach(() => {
    window.__EEE__ = undefined
  })

  it('has "data" property', () => {
    const { result } = renderHook(() => {
      return useEventEmitter('unique-id')
    })

    expect(result.current.data).toEqual({})
  })

  it('has "update" function', () => {
    const { result } = renderHook(() => {
      return useEventEmitter('unique-id')
    })

    expect(typeof result.current.update).toBe('function')
  })

  it('has will return "data" with null when no ID is given', () => {
    const { result } = renderHook(() => {
      return useEventEmitter()
    })

    expect(result.current.data).toBe(null)
    expect(result.current.update).toBe(undefined)
  })

  it('will re-render and update "data"', () => {
    const { result } = renderHook(() => {
      return useEventEmitter('unique-id')
    })

    expect(result.current.data).toEqual({})

    act(() => {
      result.current.update({ foo: 'bar' })
    })

    expect(result.current.data).toEqual({ foo: 'bar' })
  })

  it('will not re-render after unmount', () => {
    const { result, unmount } = renderHook(() => {
      return useEventEmitter('unique-id')
    })

    expect(result.current.data).toEqual({})

    unmount()

    act(() => {
      result.current.update({ foo: 'bar' })
    })

    expect(result.current.data).toEqual({})
  })

  it('will sync data between two hooks', () => {
    const { result: A } = renderHook(() => {
      return useEventEmitter('unique-id')
    })
    const { result: B } = renderHook(() => {
      return useEventEmitter('unique-id')
    })

    expect(A.current.data).toEqual({})
    expect(B.current.data).toEqual({})

    act(() => {
      A.current.update({ foo: 'bar' })
    })

    expect(A.current.data).toEqual({ foo: 'bar' })
    expect(B.current.data).toEqual({ foo: 'bar' })

    act(() => {
      B.current.update({ foo: '123' })
    })

    expect(A.current.data).toEqual({ foo: '123' })
    expect(B.current.data).toEqual({ foo: '123' })
  })
})
