import { renderHook } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { makeUniqueId } from '../../component-helper'
import type { SharedStateId } from '../useSharedState'
import {
  useSharedState,
  createSharedState,
  createReferenceKey,
  useWeakSharedState,
} from '../useSharedState'
import { act, createContext, createElement } from 'react'

describe('useSharedState', () => {
  let identifier: SharedStateId

  beforeEach(() => {
    identifier = makeUniqueId()
  })

  it('shares a scoped registry across module copies without changing local state', async () => {
    const scope = makeUniqueId()
    const options = { scope }
    const original = createSharedState(
      identifier,
      { value: 'scoped' },
      options
    )
    const local = createSharedState(identifier, { value: 'local' })
    const differentScope = createSharedState(
      identifier,
      { value: 'other' },
      { scope: scope + '-other' }
    )
    const { result, unmount } = renderHook(() =>
      useSharedState<{ value: string }>(
        identifier,
        undefined,
        undefined,
        options
      )
    )
    vi.resetModules()
    const copy = await import('../useSharedState')

    expect(copy.createSharedState(identifier, undefined, options)).toBe(
      original
    )
    expect(copy.createReferenceKey(identifier, 'oc', scope)).toBe(
      createReferenceKey(identifier, 'oc', scope)
    )
    expect(copy.createSharedState(identifier)).not.toBe(local)

    act(() =>
      copy
        .createSharedState(identifier, undefined, options)
        .set({ value: 'updated' })
    )

    expect(result.current.data).toEqual({ value: 'updated' })
    expect(local.get()).toEqual({ value: 'local' })
    expect(differentScope.get()).toEqual({ value: 'other' })
    unmount()
    expect(original.subscribersRef.current).toHaveLength(0)
    original.set(undefined)
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

  it('should keep reading shared state on the server by default', () => {
    createSharedState(identifier, 'existing')
    const Probe = () => useSharedState<string>(identifier).data

    expect(renderToString(createElement(Probe))).toBe('existing')
  })

  it('should allow an empty server snapshot without changing client subscriptions', () => {
    const state = createSharedState(identifier, 'client')
    const useSharedData = () =>
      useSharedState<string>(identifier, undefined, null, {
        getServerSnapshot: () => undefined,
      })
    const Probe = () => useSharedData().data ?? 'empty'

    expect(renderToString(createElement(Probe))).toBe('empty')
    const { result } = renderHook(useSharedData)
    expect(result.current.data).toBe('client')

    act(() => state.update('updated'))
    expect(result.current.data).toBe('updated')
  })

  it('should hydrate with the server snapshot before subscribing to current client state', async () => {
    const state = createSharedState(identifier, 'client')
    const values: string[] = []
    const Probe = () => {
      const { data } = useSharedState<string>(
        identifier,
        undefined,
        null,
        { getServerSnapshot: () => 'server' }
      )
      values.push(data)
      return data
    }
    const container = document.createElement('div')
    container.innerHTML = renderToString(createElement(Probe))
    expect(container.textContent).toBe('server')
    state.update('updated')
    values.length = 0
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot>

    await act(async () => {
      root = hydrateRoot(container, createElement(Probe), {
        onRecoverableError,
      })
    })
    try {
      expect(onRecoverableError).not.toHaveBeenCalled()
      expect(values).toEqual(['server', 'updated'])
      expect(container.textContent).toBe('updated')
    } finally {
      await act(async () => root.unmount())
    }
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
    const onChange = vi.fn()

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

    // With useSyncExternalStore, set() now triggers sync (like extend/update),
    // so all hooks re-render with the updated data.
    expect(resultA.current.data).toEqual({ foo: 'bar' })
    expect(resultB.current.data).toEqual({ foo: 'bar' })
    expect(resultC.current.data).toEqual({ foo: 'bar' })

    expect(resultA.current.get()).toEqual({ foo: 'bar' })
    expect(resultB.current.get()).toEqual({ foo: 'bar' })
    expect(resultC.current.get()).toEqual({ foo: 'bar' })
  })

  it('should call onChange when extend is called from another hook', () => {
    const onChange = vi.fn()

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
      // With useSyncExternalStore, preventSyncOfSameInstance now correctly skips
      // the CALLER (resultB) instead of the first-hook's instance (OLD: resultA).
      // So resultA IS re-rendered with the new data, and resultB keeps its old snapshot.
      resultB.current.update(
        { foo: 'baz' },
        { preventSyncOfSameInstance: true }
      )
    })

    expect(resultA.current.data).toEqual({ foo: 'baz' })
    expect(resultB.current.data).toEqual({ foo: 'bar' })
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
