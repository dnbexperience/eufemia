import { renderHook, act } from '@testing-library/react'
import { makeUniqueId } from '../../component-helper'
import { useSharedState, createSharedState } from '../useSharedState'

describe('useSharedState', () => {
  let identifier: string

  beforeEach(() => {
    identifier = makeUniqueId()
  })

  it('should create a new shared state if one does not exist', () => {
    const { result } = renderHook(() =>
      useSharedState(identifier, { test: 'initial' })
    )
    expect(result.current.data).toEqual({ test: 'initial' })
  })

  it('should use an existing shared state if one exists', () => {
    createSharedState(identifier, { test: 'existing' })
    const { result } = renderHook(() =>
      useSharedState(identifier, { test: 'initial' })
    )
    expect(result.current.data).toEqual({ test: 'existing' })
  })

  it('should update the shared state', () => {
    const { result } = renderHook(() =>
      useSharedState(identifier, { test: 'initial' })
    )
    act(() => {
      result.current.update({ test: 'updated' })
    })
    expect(result.current.data).toEqual({ test: 'updated' })
  })

  it('should update the component when the shared state changes', () => {
    const { result } = renderHook(() =>
      useSharedState(identifier, { test: 'initial' })
    )
    const sharedState = createSharedState(identifier, {
      test: 'initial',
    })
    act(() => {
      sharedState.update({ test: 'changed' })
    })
    expect(result.current.data).toEqual({ test: 'changed' })
  })

  it('should unsubscribe from the shared state when the component unmounts', () => {
    const { result, unmount } = renderHook(() =>
      useSharedState(identifier, { test: 'initial' })
    )
    const sharedState = createSharedState(identifier, {
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

  it('should call onChange when extend is called from another hook', () => {
    const onChange = jest.fn()

    const { result: resultA } = renderHook(() =>
      useSharedState(identifier)
    )
    const { result: resultB } = renderHook(() =>
      useSharedState(identifier, undefined, onChange)
    )
    const { result: resultC } = renderHook(() =>
      useSharedState(identifier)
    )

    act(() => {
      resultA.current.extend({ foo: 'bar' })
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({ foo: 'bar' })

    expect(resultA.current.data).toEqual(undefined)
    expect(resultB.current.data).toEqual(undefined)
    expect(resultC.current.data).toEqual(undefined)
  })

  it('should call onChange when set is called from another hook', () => {
    const onChange = jest.fn()

    const { result: resultA } = renderHook(() =>
      useSharedState(identifier)
    )
    const { result: resultB } = renderHook(() =>
      useSharedState(identifier, undefined, onChange)
    )
    const { result: resultC } = renderHook(() =>
      useSharedState(identifier)
    )

    act(() => {
      resultA.current.set({ foo: 'bar' })
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({ foo: 'bar' })

    expect(resultA.current.data).toEqual({ foo: 'bar' })
    expect(resultB.current.data).toEqual({ foo: 'bar' })
    expect(resultC.current.data).toEqual({ foo: 'bar' })
  })

  it('should sync all hooks', () => {
    const { result: resultA } = renderHook(() =>
      useSharedState(identifier)
    )
    const { result: resultB } = renderHook(() =>
      useSharedState(identifier)
    )

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
