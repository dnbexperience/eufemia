import React from 'react'
import { renderHook, act } from '@testing-library/react'
import useSnapshot from '../useSnapshot'
import { SnapshotId } from '../../Form/Snapshot'
import { Context, ContextState, Provider } from '../../DataContext'

describe('Form.useSnapshot', () => {
  it('creates a snapshot and retrieves it correctly', () => {
    const { result } = renderHook(useSnapshot, {
      wrapper: (props) => <Provider {...props} />,
    })
    let snapshotId: SnapshotId

    act(() => {
      snapshotId = result.current.createSnapshot()
    })

    expect(result.current.createSnapshot).toBeDefined()
    expect(result.current.revertSnapshot).toBeDefined()
    expect(result.current.applySnapshot).toBeDefined()
    expect(result.current.internalSnapshotsRef).toBeDefined()
    expect(snapshotId).toBeTruthy()
  })

  it('reverts to a snapshot', () => {
    let contextData: ContextState

    const { result } = renderHook(useSnapshot, {
      wrapper: ({ children }) => (
        <Provider>
          {children}

          <Context.Consumer>
            {(context) => {
              contextData = context
              return null
            }}
          </Context.Consumer>
        </Provider>
      ),
    })

    act(() => {
      const snapshotId = result.current.createSnapshot(
        undefined,
        undefined,
        {
          foo: 'bar',
        }
      )
      result.current.revertSnapshot(snapshotId)
    })

    expect(contextData.data).toEqual({ foo: 'bar' })
  })

  it('applies a snapshot without deleting it', () => {
    let snapshotId: SnapshotId
    let contextData: ContextState

    const { result } = renderHook(useSnapshot, {
      wrapper: ({ children }) => (
        <Provider>
          {children}

          <Context.Consumer>
            {(context) => {
              contextData = context
              return null
            }}
          </Context.Consumer>
        </Provider>
      ),
    })

    act(() => {
      snapshotId = result.current.createSnapshot(undefined, undefined, {
        foo: 'bar',
      })
      result.current.applySnapshot(snapshotId)
    })

    expect(contextData.data).toEqual({ foo: 'bar' })

    act(() => {
      result.current.applySnapshot(snapshotId)
    })

    expect(contextData.data).toEqual({ foo: 'bar' })
  })

  it('reverts and deletes the snapshot', () => {
    let snapshotId: SnapshotId
    let contextData: ContextState

    const { result } = renderHook(useSnapshot, {
      wrapper: ({ children }) => (
        <Provider>
          {children}

          <Context.Consumer>
            {(context) => {
              contextData = context
              return null
            }}
          </Context.Consumer>
        </Provider>
      ),
    })

    act(() => {
      snapshotId = result.current.createSnapshot(undefined, undefined, {
        foo: 'bar',
      })
    })

    expect(
      Array.from(result.current.internalSnapshotsRef.current)
    ).toHaveLength(1)

    act(() => {
      result.current.revertSnapshot(snapshotId)
    })

    expect(
      Array.from(result.current.internalSnapshotsRef.current)
    ).toHaveLength(0)
    expect(contextData.data).toEqual({ foo: 'bar' })

    act(() => {
      result.current.revertSnapshot(snapshotId)
    })

    expect(
      Array.from(result.current.internalSnapshotsRef.current)
    ).toHaveLength(0)
    expect(contextData.data).toEqual({ foo: 'bar' })
  })
})
