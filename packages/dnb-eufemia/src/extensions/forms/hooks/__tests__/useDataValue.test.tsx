import React from 'react'
import { renderHook } from '@testing-library/react'
import useDataValue from '../useDataValue'
import Provider from '../../DataContext/Provider'

describe('useDataValue', () => {
  describe('getValue', () => {
    it('should return given value when no path is provided', () => {
      const { result } = renderHook(() =>
        useDataValue({ value: 'Test Value' })
      )

      expect(result.current.value).toBe('Test Value')
    })

    it('should return undefined value when incorrect path is provided', () => {
      const { result } = renderHook(() =>
        useDataValue({ path: '/example/path', value: 'Test Value' })
      )

      expect(result.current.value).toBeUndefined()
    })

    it('should return the correct value when path is provided', () => {
      const { result } = renderHook(
        () => useDataValue({ path: '/example/path', value: 'Test Value' }),
        {
          wrapper: (props) => (
            <Provider
              {...props}
              data={{ example: { path: 'Test Value' } }}
            />
          ),
        }
      )

      expect(result.current.value).toBe('Test Value')
    })

    it('should return undefined when path is not found', () => {
      const { result } = renderHook(() =>
        useDataValue({ path: '/nonexistent/path' })
      )

      expect(result.current.value).toBeUndefined()
    })

    it('should return the correct value when source is a path', () => {
      const { result } = renderHook(() => useDataValue(), {
        wrapper: (props) => (
          <Provider
            {...props}
            data={{ example: { path: 'Test Value' } }}
          />
        ),
      })

      expect(result.current.getValue('/example/path')).toBe('Test Value')
    })

    it('should return the whole data set when the path is one level like "/"', () => {
      const { result } = renderHook(() => useDataValue(), {
        wrapper: (props) => (
          <Provider
            {...props}
            data={{ example: { path: 'Test Value' } }}
          />
        ),
      })

      expect(result.current.getValue('/')).toEqual({
        example: { path: 'Test Value' },
      })
    })

    it('should return the given value when source is not a path', () => {
      const { result } = renderHook(() => useDataValue())

      expect(result.current.getValue('Test Value')).toBe('Test Value')
    })
  })

  describe('getData', () => {
    it('should return the correct value when source is a path', () => {
      const { result } = renderHook(() => useDataValue(), {
        wrapper: (props) => (
          <Provider
            {...props}
            data={{ example: { path: { nested: 'Test Value' } } }}
          />
        ),
      })

      expect(result.current.getData('/example/path')).toEqual({
        nested: 'Test Value',
      })
    })

    it('should include current path/data key when includeCurrentPath is true', () => {
      const { result } = renderHook(() => useDataValue(), {
        wrapper: (props) => (
          <Provider
            {...props}
            data={{ example: { path: { nested: 'Test Value' } } }}
          />
        ),
      })

      expect(
        result.current.getData('/example/path', {
          includeCurrentPath: true,
        })
      ).toEqual({ example: { path: { nested: 'Test Value' } } })
    })

    it('should include the whole data set when the path is one level "/" and includeCurrentPath is true', () => {
      const { result } = renderHook(() => useDataValue(), {
        wrapper: (props) => (
          <Provider
            {...props}
            data={{ example: { path: { nested: 'Test Value' } } }}
          />
        ),
      })

      expect(
        result.current.getData('/', {
          includeCurrentPath: true,
        })
      ).toEqual({ example: { path: { nested: 'Test Value' } } })
    })

    it('should return undefined when source is not a path', () => {
      const { result } = renderHook(() => useDataValue())

      expect(result.current.getData('Test Value')).toBeUndefined()
    })
  })
})
