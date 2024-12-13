import { renderHook, act } from '@testing-library/react'
import { makeUniqueId } from '../../component-helper'
import {
  useSharedState,
  createSharedState,
  SharedStateId,
  createReferenceKey,
  useWeakSharedState,
} from '../useSharedState'
import { createContext } from 'react'

describe('useSharedState', () => {
  let identifier: SharedStateId

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
    const sharedState = createSharedState(identifier)
    act(() => {
      sharedState.update({ test: 'changed' })
    })
    expect(result.current.data).toEqual({ test: 'changed' })
  })

  it('should update the shared state with a function reference as id', () => {
    const identifier = () => null
    const { result } = renderHook(() =>
      useSharedState(identifier, { test: 'initial' })
    )
    act(() => {
      result.current.update({ test: 'updated' })
    })
    expect(result.current.data).toEqual({ test: 'updated' })
  })

  it('should update the shared state with an async function reference as id', () => {
    const identifier = async () => null
    const { result } = renderHook(() =>
      useSharedState(identifier, { test: 'initial' })
    )
    act(() => {
      result.current.update({ test: 'updated' })
    })
    expect(result.current.data).toEqual({ test: 'updated' })
  })

  it('should update the shared state with an object reference as id', () => {
    const identifier = {}
    const { result } = renderHook(() =>
      useSharedState(identifier, { test: 'initial' })
    )
    act(() => {
      result.current.update({ test: 'updated' })
    })
    expect(result.current.data).toEqual({ test: 'updated' })
  })

  it('should update the shared state with a React context reference as id', () => {
    const identifier = createContext(null)
    const { result } = renderHook(() =>
      useSharedState(identifier, { test: 'initial' })
    )
    act(() => {
      result.current.update({ test: 'updated' })
    })
    expect(result.current.data).toEqual({ test: 'updated' })
  })

  it('should unsubscribe from the shared state when the component unmounts', () => {
    const { result, unmount } = renderHook(() =>
      useSharedState(identifier, { test: 'initial' })
    )
    const sharedState = createSharedState(identifier)

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

    expect(resultA.current.data).toEqual(undefined)
    expect(resultB.current.data).toEqual(undefined)
    expect(resultC.current.data).toEqual(undefined)

    expect(resultA.current.get()).toEqual({ foo: 'bar' })
    expect(resultB.current.get()).toEqual({ foo: 'bar' })
    expect(resultC.current.get()).toEqual({ foo: 'bar' })
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

  it('should sync all hooks, except the one that is set to "preventSyncOfSameInstance"', () => {
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
      // If "preventSyncOfSameInstance" is set to true,
      // then the "resultA" will not be synced, so resultA will still have "bar".
      resultB.current.update(
        { foo: 'baz' },
        { preventSyncOfSameInstance: true }
      )
    })

    expect(resultA.current.data).toEqual({ foo: 'bar' })
    expect(resultB.current.data).toEqual({ foo: 'baz' })
  })
})

describe('useWeakSharedState', () => {
  it('should delete the shared state when all components have been unmounted', () => {
    const identifier = {}

    const { unmount: unmountA } = renderHook(() =>
      useWeakSharedState(identifier, { test: 'initial' })
    )
    const { unmount: unmountB } = renderHook(() =>
      useWeakSharedState(identifier)
    )

    const getStateOf = (identifier) => {
      return createSharedState(identifier).get()
    }

    expect(getStateOf(identifier)).toEqual({ test: 'initial' })
    expect(getStateOf(identifier)).toEqual({ test: 'initial' })

    unmountA()
    unmountB()

    expect(getStateOf(identifier)).toEqual(undefined)
    expect(getStateOf(identifier)).toEqual(undefined)
  })

  it('when not using weak, should not delete the shared state when all components have been unmounted', () => {
    const identifier = {}

    const { unmount: unmountA } = renderHook(() =>
      useSharedState(identifier, { test: 'initial' })
    )
    const { unmount: unmountB } = renderHook(() =>
      useSharedState(identifier)
    )

    const getStateOf = (identifier) => {
      return createSharedState(identifier).get()
    }

    expect(getStateOf(identifier)).toEqual({ test: 'initial' })
    expect(getStateOf(identifier)).toEqual({ test: 'initial' })

    unmountA()
    unmountB()

    expect(getStateOf(identifier)).toEqual({ test: 'initial' })
    expect(getStateOf(identifier)).toEqual({ test: 'initial' })
  })
})

describe('createReferenceKey', () => {
  it('should return the same object for the same references', () => {
    const ref1 = {}
    const ref2 = () => null

    const key1 = createReferenceKey(ref1, ref2)
    const key2 = createReferenceKey(ref1, ref2)

    expect(key1).toBe(key2)
  })

  it('should return the same object for the same string references', () => {
    const ref1 = {}
    const ref2 = 'unique'

    const key1 = createReferenceKey(ref1, ref2)
    const key2 = createReferenceKey(ref1, ref2)

    expect(key1).toBe(key2)
  })

  it('should return different objects for different references', () => {
    const ref1 = {}
    const ref2 = {}
    const ref3 = {}

    const key1 = createReferenceKey(ref1, ref2)
    const key2 = createReferenceKey(ref1, ref3)

    expect(key1).not.toBe(key2)
  })

  it('should return different objects for different first references', () => {
    const ref1 = {}
    const ref2 = {}
    const ref3 = {}

    const key1 = createReferenceKey(ref1, ref2)
    const key2 = createReferenceKey(ref3, ref2)

    expect(key1).not.toBe(key2)
  })

  it('should cache the combined reference', () => {
    const ref1 = {}
    const ref2 = () => null

    const key1 = createReferenceKey(ref1, ref2)
    const key2 = createReferenceKey(ref1, ref2)

    expect(key1).toBe(key2)
  })

  it('should create a new reference if it does not exist', () => {
    const ref1 = {}
    const ref2 = {}

    const key1 = createReferenceKey(ref1, ref2)

    expect(key1).toBeDefined()
  })
})
