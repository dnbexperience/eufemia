import { renderHook, act } from '@testing-library/react'
import { useSharedState, createSharedState } from '../useSharedState'

describe('useSharedState', () => {
  it('should create a new shared state if one does not exist', () => {
    const { result } = renderHook(() =>
      useSharedState('testId', { test: 'initial' })
    )
    expect(result.current.data).toEqual({ test: 'initial' })
  })

  it('should use an existing shared state if one exists', () => {
    createSharedState('existingId', { test: 'existing' })
    const { result } = renderHook(() =>
      useSharedState('existingId', { test: 'initial' })
    )
    expect(result.current.data).toEqual({ test: 'existing' })
  })

  it('should update the shared state', () => {
    const { result } = renderHook(() =>
      useSharedState('updateId', { test: 'initial' })
    )
    act(() => {
      result.current.update({ test: 'updated' })
    })
    expect(result.current.data).toEqual({ test: 'updated' })
  })

  it('should update the component when the shared state changes', () => {
    const { result } = renderHook(() =>
      useSharedState('changeId', { test: 'initial' })
    )
    const sharedState = createSharedState('changeId', {
      test: 'initial',
    })
    act(() => {
      sharedState.update({ test: 'changed' })
    })
    expect(result.current.data).toEqual({ test: 'changed' })
  })

  it('should unsubscribe from the shared state when the component unmounts', () => {
    const { result, unmount } = renderHook(() =>
      useSharedState('unmountId', { test: 'initial' })
    )
    const sharedState = createSharedState('unmountId', {
      test: 'initial',
    })
    unmount()
    act(() => {
      sharedState.update({ test: 'unmounted' })
    })
    expect(result.current.data).toEqual({ test: 'initial' })
  })

  it('should return undefined data when no ID is given', () => {
    const { result } = renderHook(() =>
      useSharedState(null, { test: 'initial' })
    )
    expect(result.current.data).toBeUndefined()
  })

  it('should not update the data when no ID is given', () => {
    const { result } = renderHook(() =>
      useSharedState(null, { test: 'initial' })
    )
    expect(result.current.data).toBeUndefined()
    act(() => {
      result.current.update({ test: 'updated' })
    })
    expect(result.current.data).toBeUndefined()
  })

  it('should not subscribe to the shared state when no ID is given', () => {
    const { result, unmount } = renderHook(() =>
      useSharedState(null, { test: 'initial' })
    )
    expect(result.current.data).toBeUndefined()
    unmount()
    act(() => {
      result.current.update({ test: 'unmounted' })
    })
    expect(result.current.data).toBeUndefined()
  })

  it('should call onSet when set is called from another hook', () => {
    const onSet = jest.fn()

    const { result: resultA } = renderHook(() => useSharedState('onSet'))
    const { result: resultB } = renderHook(() =>
      useSharedState('onSet', undefined, onSet)
    )
    const { result: resultC } = renderHook(() => useSharedState('onSet'))

    resultA.current.set({ foo: 'bar' })

    expect(onSet).toHaveBeenCalledTimes(1)
    expect(onSet).toHaveBeenCalledWith({ foo: 'bar' })

    expect(resultA.current.data).toEqual(undefined)
    expect(resultB.current.data).toEqual(undefined)
    expect(resultC.current.data).toEqual(undefined)
  })

  it('should sync all hooks', () => {
    const { result: resultA } = renderHook(() => useSharedState('in-sync'))
    const { result: resultB } = renderHook(() => useSharedState('in-sync'))

    expect(resultA.current.data).toEqual(undefined)
    expect(resultB.current.data).toEqual(undefined)

    act(() => {
      resultA.current.update({ foo: 'bar' })
    })

    expect(resultA.current.data).toEqual({ foo: 'bar' })
    expect(resultB.current.data).toEqual({ foo: 'bar' })

    act(() => {
      resultB.current.update({ foo: 'baz' })
    })

    expect(resultA.current.data).toEqual({ foo: 'baz' })
    expect(resultB.current.data).toEqual({ foo: 'baz' })
  })
})
