import { renderHook, act } from '@testing-library/react'
import { useSharedState, getOrCreateSharedState } from '../useSharedState'

describe('useSharedState', () => {
  it('should create a new shared state if one does not exist', () => {
    const { result } = renderHook(() =>
      useSharedState('testId', { test: 'initial' })
    )
    expect(result.current.data).toEqual({ test: 'initial' })
  })

  it('should use an existing shared state if one exists', () => {
    getOrCreateSharedState('existingId', { test: 'existing' })
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
    const sharedState = getOrCreateSharedState('changeId', {
      test: 'initial',
    })
    act(() => {
      sharedState.updateSharedState({ test: 'changed' })
    })
    expect(result.current.data).toEqual({ test: 'changed' })
  })

  it('should unsubscribe from the shared state when the component unmounts', () => {
    const { result, unmount } = renderHook(() =>
      useSharedState('unmountId', { test: 'initial' })
    )
    const sharedState = getOrCreateSharedState('unmountId', {
      test: 'initial',
    })
    unmount()
    act(() => {
      sharedState.updateSharedState({ test: 'unmounted' })
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
    act(() => {
      result.current.update({ test: 'updated' })
    })
    expect(result.current.data).toBeUndefined()
  })

  it('should not subscribe to the shared state when no ID is given', () => {
    const { result, unmount } = renderHook(() =>
      useSharedState(null, { test: 'initial' })
    )
    unmount()
    act(() => {
      result.current.update({ test: 'unmounted' })
    })
    expect(result.current.data).toBeUndefined()
  })
})
