/**
 * useSharedContext Tests
 *
 */

import React from 'react'
import { renderHook } from '@testing-library/react'
import useSharedContext from '../useSharedContext'
import Provider from '../Provider'
import type { ContextProps } from '../Context'

describe('useSharedContext', () => {
  describe('basic usage with custom data', () => {
    type MyData = { myValue: number }
    const data: MyData = { myValue: 1234 }

    it('should return custom data from context', () => {
      const { result } = renderHook(() => useSharedContext<MyData>(), {
        wrapper: ({ children }) => (
          <Provider value={data}>{children}</Provider>
        ),
      })

      expect(result.current.myValue).toBe(1234)
    })

    it('should return custom data with string values', () => {
      type UserData = { userId: string; userName: string }
      const userData: UserData = { userId: '123', userName: 'John Doe' }

      const { result } = renderHook(() => useSharedContext<UserData>(), {
        wrapper: ({ children }) => (
          <Provider value={userData}>{children}</Provider>
        ),
      })

      expect(result.current.userId).toBe('123')
      expect(result.current.userName).toBe('John Doe')
    })
  })

  describe('accessing default context properties', () => {
    it('should return default context properties', () => {
      const { result } = renderHook(
        () => useSharedContext<{ customProp: string }>(),
        {
          wrapper: ({ children }) => (
            <Provider
              value={{
                customProp: 'test',
                locale: 'en-GB',
                currency: 'USD',
              }}
            >
              {children}
            </Provider>
          ),
        }
      )

      expect(result.current.customProp).toBe('test')
      expect(result.current.locale).toBe('en-GB')
      expect(result.current.currency).toBe('USD')
    })

    it('should return component props from context', () => {
      type MyData = { myValue: number }
      const { result } = renderHook(() => useSharedContext<MyData>(), {
        wrapper: ({ children }) => (
          <Provider
            value={{
              ...({ myValue: 42 } as MyData),
              Button: { variant: 'primary', size: 'large' },
            }}
          >
            {children}
          </Provider>
        ),
      })

      expect(result.current.myValue).toBe(42)
      expect(result.current.Button).toEqual({
        variant: 'primary',
        size: 'large',
      })
    })
  })

  describe('nested providers', () => {
    type MyData = { myValue: number }

    it('should access the nearest provider context', () => {
      const { result } = renderHook(() => useSharedContext<MyData>(), {
        wrapper: ({ children }) => (
          <Provider value={{ myValue: 100 } as MyData}>
            <Provider value={{ myValue: 200 } as MyData}>
              {children}
            </Provider>
          </Provider>
        ),
      })

      expect(result.current.myValue).toBe(200)
    })

    it('should use closest provider values when nested', () => {
      const { result } = renderHook(() => useSharedContext<MyData>(), {
        wrapper: ({ children }) => (
          <Provider
            value={
              {
                myValue: 100,
                Button: { variant: 'primary' },
              } as MyData & ContextProps
            }
          >
            <Provider
              value={
                {
                  myValue: 200,
                  Button: { size: 'large' },
                } as MyData & ContextProps
              }
            >
              {children}
            </Provider>
          </Provider>
        ),
      })

      expect(result.current.myValue).toBe(200)
      expect(result.current.Button).toEqual({
        size: 'large',
      })
      expect(result.current.Button).not.toEqual({
        variant: 'primary',
      })
    })
  })

  describe('complex data types', () => {
    type ComplexData = {
      config: { theme: string; language: string }
      user: { id: number; name: string }
    }

    it('should handle complex nested data structures', () => {
      const complexData: ComplexData = {
        config: { theme: 'dark', language: 'en' },
        user: { id: 1, name: 'Alice' },
      }

      const { result } = renderHook(
        () => useSharedContext<ComplexData>(),
        {
          wrapper: ({ children }) => (
            <Provider value={complexData}>{children}</Provider>
          ),
        }
      )

      expect(result.current.config.theme).toBe('dark')
      expect(result.current.config.language).toBe('en')
      expect(result.current.user.id).toBe(1)
      expect(result.current.user.name).toBe('Alice')
    })
  })

  describe('multiple components sharing context', () => {
    type SharedData = { sharedCount: number }

    it('should allow multiple hooks to access the same context', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider value={{ sharedCount: 42 } as SharedData}>
          {children}
        </Provider>
      )

      const { result: result1 } = renderHook(
        () => useSharedContext<SharedData>(),
        { wrapper }
      )

      const { result: result2 } = renderHook(
        () => useSharedContext<SharedData>(),
        { wrapper }
      )

      expect(result1.current.sharedCount).toBe(42)
      expect(result2.current.sharedCount).toBe(42)
    })
  })

  describe('type safety', () => {
    it('should maintain type information for custom data', () => {
      type TypedData = {
        id: number
        name: string
        active: boolean
      }

      const typedData: TypedData = {
        id: 1,
        name: 'Test',
        active: true,
      }

      const { result } = renderHook(() => useSharedContext<TypedData>(), {
        wrapper: ({ children }) => (
          <Provider value={typedData}>{children}</Provider>
        ),
      })

      expect(typeof result.current.id).toBe('number')
      expect(typeof result.current.name).toBe('string')
      expect(typeof result.current.active).toBe('boolean')
      expect(result.current.id).toBe(1)
      expect(result.current.name).toBe('Test')
      expect(result.current.active).toBe(true)
    })
  })

  describe('empty or minimal context', () => {
    it('should work with empty custom data', () => {
      const { result } = renderHook(() => useSharedContext(), {
        wrapper: ({ children }) => <Provider>{children}</Provider>,
      })

      expect(result.current).toBeDefined()
      expect(result.current.locale).toBeDefined()
    })

    it('should return default context when no custom data is provided', () => {
      const { result } = renderHook(() => useSharedContext<object>(), {
        wrapper: ({ children }) => (
          <Provider locale="en-GB" currency="USD">
            {children}
          </Provider>
        ),
      })

      expect(result.current.locale).toBe('en-GB')
      expect(result.current.currency).toBe('USD')
    })
  })
})
