import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { makeUniqueId } from '../../../../../shared/component-helper'
import { Field } from '../../..'
import Provider from '../../../DataContext/Provider'
import useData from '../useData'
import { FilterData } from '../../../DataContext/Context'

describe('Form.useData', () => {
  let identifier: string

  beforeEach(() => {
    identifier = makeUniqueId()
  })

  it('should return undefined by default', () => {
    const { result } = renderHook(() => useData(identifier))
    expect(result.current.data).toEqual(undefined)
  })

  it('should return "getValue" method that lets you get a single path value', () => {
    const props = {
      deep: {
        key: 'value',
      },
    }
    const { result } = renderHook(() => useData(identifier, props))

    expect(result.current.getValue('/deep/key')).toEqual('value')

    act(() => {
      result.current.update('/deep/key', 'changed')
    })

    expect(result.current.getValue('/deep/key')).toEqual('changed')
  })

  it('"getValue" should return undefined if path don\'t exists', () => {
    const { result } = renderHook(() => useData(identifier))

    expect(result.current.getValue('/does-not-exist')).toBe(undefined)
  })

  it('should return "update" method that lets you update the data', () => {
    const props = { key: 'value' }
    const { result } = renderHook(() => useData(identifier, props))

    expect(result.current.data).toEqual({ key: 'value' })

    act(() => {
      result.current.update('/key', (value) => {
        return 'changed ' + value
      })
    })

    expect(result.current.data).toEqual({ key: 'changed value' })
  })

  it('should sync two hooks by using "update"', () => {
    const props = { key: 'value' }

    const { result: A } = renderHook(() => useData(identifier))
    const { result: B } = renderHook(() => useData(identifier, props))

    expect(A.current.data).toEqual({ key: 'value' })
    expect(B.current.data).toEqual({ key: 'value' })

    act(() => {
      B.current.update('/key', (value) => {
        return 'changed ' + value
      })
    })

    expect(A.current.data).toEqual({ key: 'changed value' })
    expect(B.current.data).toEqual({ key: 'changed value' })
  })

  it('should support update without a function', () => {
    const props = { key: 'value' }

    const { result: A } = renderHook(() => useData(identifier))
    const { result: B } = renderHook(() => useData(identifier, props))

    expect(A.current.data).toEqual({ key: 'value' })
    expect(B.current.data).toEqual({ key: 'value' })

    act(() => {
      B.current.update('/key', 'new value')
    })

    expect(A.current.data).toEqual({ key: 'new value' })
    expect(B.current.data).toEqual({ key: 'new value' })
  })

  it('should rerender when shared state calls "set"', () => {
    const { result: A } = renderHook(() => useData(identifier))
    const { result: B } = renderHook(() => useData(identifier))

    act(() => {
      B.current.set({ foo: 'bar' })
    })

    expect(A.current.data).toEqual({ foo: 'bar' })
  })

  describe('initial data', () => {
    it('should be able to update/set data even if no initial data was given', () => {
      const { result } = renderHook(() => useData(identifier))

      expect(result.current.data).toEqual(undefined)

      act(() => {
        result.current.update('/key', () => {
          return 'my value'
        })
      })

      expect(result.current.data).toEqual({ key: 'my value' })
    })

    it('should return initial data if data is not present', () => {
      const { result } = renderHook((props = { key: 'value' }) =>
        useData(identifier, props)
      )

      expect(result.current.data).toEqual({ key: 'value' })
    })

    it('should use the first initial data if is present', () => {
      const { result: A } = renderHook(
        (props = { key: 'existingValue' }) => useData(identifier, props)
      )

      const { result: B } = renderHook((props = { key: 'value' }) =>
        useData(identifier, props)
      )

      expect(A.current.data).toEqual({ key: 'existingValue' })
      expect(B.current.data).toEqual({ key: 'existingValue' })
    })

    it('should have initial data on second hook when the first sets it', () => {
      const { result: A } = renderHook(() =>
        useData(identifier, { initial: 'data' })
      )
      const { result: B } = renderHook(() => useData(identifier))

      expect(A.current.data).toEqual({ initial: 'data' })
      expect(B.current.data).toEqual({ initial: 'data' })
    })

    it('should have initial data on first hook when the second sets it', () => {
      const { result: A } = renderHook(() => useData(identifier))
      const { result: B } = renderHook(() =>
        useData(identifier, { initial: 'data' })
      )

      expect(A.current.data).toEqual({ initial: 'data' })
      expect(B.current.data).toEqual({ initial: 'data' })
    })
  })

  it('should update data on second hook when using "set"', () => {
    const { result: A } = renderHook(() =>
      useData(identifier, { initial: 'data' })
    )
    const { result: B } = renderHook(() => useData(identifier))

    expect(A.current.data).toEqual({ initial: 'data' })

    act(() => {
      B.current.set({ foo: 'bar' })
    })

    expect(A.current.data).toEqual({ foo: 'bar' })
  })

  it('should replace data with "set"', () => {
    type Data = {
      initial?: string
      foo?: string
      baz?: string
    }

    const { result: A } = renderHook(() => useData(identifier))
    const { result: B } = renderHook(() =>
      useData<Data>(identifier, { initial: 'data' })
    )

    expect(A.current.data).toEqual({ initial: 'data' })
    expect(B.current.data).toEqual({ initial: 'data' })

    // Change A
    act(() => {
      A.current.set({ foo: 'bar' })
    })

    expect(A.current.data).toEqual({ foo: 'bar' })
    expect(B.current.data).toEqual({ foo: 'bar' })

    act(() => {
      A.current.set({ baz: 'new' })
    })

    expect(A.current.data).toEqual({ baz: 'new' })
    expect(B.current.data).toEqual({ baz: 'new' })

    // Change B
    act(() => {
      B.current.set({ foo: 'bar' })
    })

    expect(A.current.data).toEqual({ foo: 'bar' })
    expect(B.current.data).toEqual({ foo: 'bar' })

    act(() => {
      B.current.set({ baz: 'new' })
    })

    expect(A.current.data).toEqual({ baz: 'new' })
    expect(B.current.data).toEqual({ baz: 'new' })
  })

  it('should return filterData fallback function without provider', () => {
    const { result } = renderHook((props = { key: 'value' }) =>
      useData(identifier, props)
    )

    expect(result.current).toEqual({
      data: { key: 'value' },
      update: expect.any(Function),
      set: expect.any(Function),
      getValue: expect.any(Function),
      filterData: expect.any(Function),
    })
  })

  it('should return filterData to filter fields with', () => {
    const { result } = renderHook(() => useData(identifier), {
      wrapper: ({ children }) => (
        <Provider
          id={identifier}
          data={{ field1: 'foo', field2: '', field3: 'baz' }}
        >
          <Field.String path="/field1" disabled />
          <Field.String path="/field2" validateInitially required />
          <Field.String path="/field3" />
          {children}
        </Provider>
      ),
    })

    const filterDisabled: FilterData = jest.fn((path, value, props) => {
      return props.disabled !== true
    })

    expect(result.current.filterData(filterDisabled)).toEqual({
      field2: '',
      field3: 'baz',
    })

    const filterError: FilterData = jest.fn(
      (path, value, props, internal) => {
        return !(internal.error instanceof Error)
      }
    )

    expect(result.current.filterData(filterError)).toEqual({
      field1: 'foo',
      field3: 'baz',
    })

    const filterValue: FilterData = jest.fn((path, value) => {
      return path === '/field3' && value === 'baz'
    })

    expect(result.current.filterData(filterValue)).toEqual({
      field3: 'baz',
    })
  })
})
