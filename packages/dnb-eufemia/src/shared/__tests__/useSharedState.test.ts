import { act, renderHook } from '@testing-library/react'
import {
  createSharedState,
  useSharedState,
  useWeakSharedState,
} from '../index'
import useStore from '../useSharedState'

describe('shared state public imports', () => {
  it('shares updates between named, default, and non-React imports', () => {
    const id = {}
    const first = renderHook(() => useSharedState(id, { count: 0 }))
    const second = renderHook(() => useStore(id, { count: 0 }))
    const store = createSharedState<{ count: number }>(id)

    act(() => {
      store.extend({ count: 1 })
    })

    expect(first.result.current.data).toEqual({ count: 1 })
    expect(second.result.current.data).toEqual({ count: 1 })

    act(() => {
      second.result.current.set({ count: 2 })
    })

    expect(first.result.current.data).toEqual({ count: 2 })
    expect(store.get()).toEqual({ count: 2 })
  })

  it('clears weak shared state after its last subscriber unmounts', () => {
    const id = {}
    const first = renderHook(() => useWeakSharedState(id, { count: 0 }))
    const second = renderHook(() => useWeakSharedState(id, { count: 0 }))
    const store = createSharedState(id)

    act(() => {
      first.result.current.extend({ count: 1 })
    })

    first.unmount()
    expect(store.get()).toEqual({ count: 1 })

    second.unmount()
    expect(store.get()).toBeUndefined()
  })
})
