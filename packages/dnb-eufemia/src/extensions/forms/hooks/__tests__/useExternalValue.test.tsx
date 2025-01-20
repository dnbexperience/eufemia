import React from 'react'
import { renderHook } from '@testing-library/react'
import useExternalValue from '../useExternalValue'
import { DataContext } from '../..'
import IterateItemContext from '../../Iterate/IterateItemContext'

describe('useExternalValue', () => {
  const transformers = {
    current: {
      fromExternal: (val) => val,
    },
  }

  it('should return value when directly provided', () => {
    const { result } = renderHook(() =>
      useExternalValue({
        value: 'test-value',
        emptyValue: '',
        transformers,
      })
    )

    expect(result.current).toBe('test-value')
  })

  it('should transform value using fromExternal when provided', () => {
    const transformers = {
      current: {
        fromExternal: (val) => val.toUpperCase(),
      },
    }

    const { result } = renderHook(() =>
      useExternalValue({
        value: 'test',
        transformers,
      })
    )

    expect(result.current).toBe('TEST')
  })

  it('should return emptyValue when value matches emptyValue', () => {
    const { result } = renderHook(() =>
      useExternalValue({
        value: '',
        emptyValue: '',
        transformers,
      })
    )

    expect(result.current).toBe('')
  })

  describe('with iterate context', () => {
    it('should return iterate element value when itemPath is "/"', () => {
      const wrapper = ({ children }) => (
        <IterateItemContext.Provider
          value={{
            value: 'iterate-value',
          }}
        >
          {children}
        </IterateItemContext.Provider>
      )

      const { result } = renderHook(
        () =>
          useExternalValue({
            itemPath: '/',
            transformers,
          }),
        { wrapper }
      )

      expect(result.current).toBe('iterate-value')
    })

    it('should return value from iterate element using itemPath', () => {
      const wrapper = ({ children }) => (
        <IterateItemContext.Provider
          value={{
            value: {
              nested: 'nested-value',
            },
          }}
        >
          {children}
        </IterateItemContext.Provider>
      )

      const { result } = renderHook(
        () =>
          useExternalValue({
            itemPath: '/nested',
            transformers,
          }),
        { wrapper }
      )

      expect(result.current).toBe('nested-value')
    })

    it('should transform value using fromExternal when provided', () => {
      const transformers = {
        current: {
          fromExternal: (val) => val.toUpperCase(),
        },
      }

      const wrapper = ({ children }) => (
        <IterateItemContext.Provider
          value={{
            value: {
              nested: 'nested-value',
            },
          }}
        >
          {children}
        </IterateItemContext.Provider>
      )

      const { result } = renderHook(
        () =>
          useExternalValue({
            itemPath: '/nested',
            transformers,
          }),
        { wrapper }
      )

      expect(result.current).toBe('NESTED-VALUE')
    })
  })

  describe('with data context', () => {
    it('should return full data when path is "/"', () => {
      const wrapper = ({ children }) => (
        <DataContext.Provider
          data={{
            foo: 'bar',
          }}
        >
          {children}
        </DataContext.Provider>
      )

      const { result } = renderHook(
        () =>
          useExternalValue({
            path: '/',
            transformers,
          }),
        { wrapper }
      )

      expect(result.current).toEqual({ foo: 'bar' })
    })

    it('should return value from data using path', () => {
      const wrapper = ({ children }) => (
        <DataContext.Provider
          data={{
            nested: {
              value: 'context-value',
            },
          }}
        >
          {children}
        </DataContext.Provider>
      )

      const { result } = renderHook(
        () =>
          useExternalValue({
            path: '/nested/value',
            transformers,
          }),
        { wrapper }
      )

      expect(result.current).toBe('context-value')
    })

    it('should transform value using fromExternal when provided', () => {
      const transformers = {
        current: {
          fromExternal: (val) => val.toUpperCase(),
        },
      }

      const wrapper = ({ children }) => (
        <DataContext.Provider
          data={{
            nested: {
              value: 'context-value',
            },
          }}
        >
          {children}
        </DataContext.Provider>
      )

      const { result } = renderHook(
        () =>
          useExternalValue({
            path: '/nested/value',
            transformers,
          }),
        { wrapper }
      )

      expect(result.current).toBe('CONTEXT-VALUE')
    })

    it('should return emptyValue when path does not exist', () => {
      const wrapper = ({ children }) => (
        <DataContext.Provider data={{}}>{children}</DataContext.Provider>
      )

      const { result } = renderHook(
        () =>
          useExternalValue({
            path: '/missing',
            emptyValue: 'empty',
            transformers,
          }),
        { wrapper }
      )

      expect(result.current).toBe('empty')
    })
  })

  it('should handle priority order: value > iterate > data context', () => {
    const wrapper = ({ children }) => (
      <IterateItemContext.Provider
        value={{
          value: 'iterate-value',
        }}
      >
        {children}
      </IterateItemContext.Provider>
    )

    const { result } = renderHook(
      () =>
        useExternalValue({
          value: 'direct-value',
          path: '/foo',
          itemPath: '/',
          emptyValue: 'empty',
          transformers,
        }),
      { wrapper }
    )

    expect(result.current).toBe('direct-value')
  })

  it('should fall back to emptyValue when no value source is provided', () => {
    const { result } = renderHook(() =>
      useExternalValue({
        emptyValue: 'empty',
        transformers,
      })
    )

    expect(result.current).toBe('empty')
  })

  it('should handle null contexts gracefully', () => {
    const { result } = renderHook(() =>
      useExternalValue({
        path: '/foo',
        itemPath: '/bar',
        emptyValue: 'empty',
        transformers,
      })
    )

    expect(result.current).toBe('empty')
  })
})
