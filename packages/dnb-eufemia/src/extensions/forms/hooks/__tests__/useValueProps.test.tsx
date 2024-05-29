import React from 'react'
import { renderHook } from '@testing-library/react'
import useValueProps from '../useValueProps'
import Provider from '../../DataContext/Provider'

describe('useValueProps', () => {
  it('should call use "transformIn" to prepare value', () => {
    const value = 1

    const transformIn = (value) => value + 1
    const { result } = renderHook(() =>
      useValueProps({ value, transformIn })
    )

    expect(result.current.value).toBe(2)
  })

  it('should call use "toInput" to prepare value', () => {
    const value = 1

    const toInput = (value) => value + 1
    const { result } = renderHook(() => useValueProps({ value, toInput }))

    expect(result.current.value).toBe(2)
  })

  it('should call use "fromExternal" to prepare value', () => {
    const value = 1

    const fromExternal = (value) => value + 1
    const { result } = renderHook(() =>
      useValueProps({ value, fromExternal })
    )

    expect(result.current.value).toBe(2)
  })

  it('should handle "undefined" value', () => {
    const value = undefined

    const { result } = renderHook(() => useValueProps({ value }))

    expect(result.current.value).toBe(undefined)
  })

  it('given "value" should take precedence over data context value', () => {
    const givenValue = 'given value'
    const value = 'use this value'

    const { result } = renderHook(
      () => useValueProps({ path: '/foo', value }),
      {
        wrapper: (props) => (
          <Provider data={{ foo: givenValue }} {...props} />
        ),
      }
    )

    expect(result.current.value).toBe(value)
  })

  it('given "defaultValue" should not take precedence over data context value', () => {
    const givenValue = 'given value'
    const defaultValue = 'use this value'

    const { result, rerender } = renderHook(useValueProps, {
      initialProps: {
        path: '/foo',
        value: defaultValue,
        defaultValue: undefined,
      },
      wrapper: (props) => (
        <Provider data={{ foo: givenValue }} {...props} />
      ),
    })

    expect(result.current.value).toBe(defaultValue)

    rerender({ path: '/foo', value: undefined, defaultValue })

    expect(result.current.value).toBe(givenValue)
  })

  it('should forward other props', () => {
    const value = 'value'

    const { result } = renderHook(() =>
      useValueProps({ value, foo: 'foo', bar: 'bar' })
    )

    expect(result.current.value).toBe('value')
    expect(result.current.foo).toBe('foo')
    expect(result.current.bar).toBe('bar')
  })

  it('should use "toInput" to prepare value from context', () => {
    const path = '/contextValue'

    const toInput = (value) => value + 1
    const { result } = renderHook(() => useValueProps({ path, toInput }), {
      wrapper: ({ children }) => (
        <Provider
          data={{
            contextValue: 1,
          }}
        >
          {children}
        </Provider>
      ),
    })

    expect(result.current.value).toBe(2)
  })

  it('should use "transformIn" to prepare value from context', () => {
    const path = '/contextValue'

    const transformIn = (value) => value + 1
    const { result } = renderHook(
      () => useValueProps({ path, transformIn }),
      {
        wrapper: ({ children }) => (
          <Provider
            data={{
              contextValue: 1,
            }}
          >
            {children}
          </Provider>
        ),
      }
    )

    expect(result.current.value).toBe(2)
  })

  it('should get value from data context', () => {
    const path = '/contextValue'

    const { result } = renderHook(() => useValueProps({ path }), {
      wrapper: ({ children }) => (
        <Provider
          data={{
            contextValue: 'foo',
          }}
        >
          {children}
        </Provider>
      ),
    })

    expect(result.current.value).toBe('foo')
  })

  it('should overwrite data context value with local value', () => {
    const path = '/contextValue'
    const value = 2

    const { result } = renderHook(() => useValueProps({ value, path }), {
      wrapper: ({ children }) => (
        <Provider
          data={{
            contextValue: 1,
          }}
        >
          {children}
        </Provider>
      ),
    })

    expect(result.current.value).toBe(2)
  })
})
