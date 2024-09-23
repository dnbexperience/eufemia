import React from 'react'
import { renderHook } from '@testing-library/react'
import { Provider } from '../../../DataContext'
import useVisibility from '../useVisibility'

describe('useVisibility', () => {
  describe('visibility', () => {
    it('renders children when visible is true', () => {
      const { result } = renderHook(() =>
        useVisibility({
          visible: true,
        })
      )
      expect(result.current.check()).toBe(true)
    })

    it('does not render children when visible is false', () => {
      const { result } = renderHook(() =>
        useVisibility({
          visible: false,
        })
      )
      expect(result.current.check()).toBe(false)
    })

    it('renders children when target path is falsy, but visible prop is true', () => {
      const { result } = renderHook(
        () =>
          useVisibility({
            visible: true,
            pathTruthy: '/isTruthy',
          }),
        {
          wrapper: ({ children }) => (
            <Provider data={{ isTruthy: undefined }}>{children}</Provider>
          ),
        }
      )
      expect(result.current.check()).toBe(true)
    })
  })

  describe('pathDefined', () => {
    it('renders children when target path is defined', () => {
      const { result } = renderHook(
        () =>
          useVisibility({
            pathDefined: '/isDefined',
          }),
        {
          wrapper: ({ children }) => (
            <Provider data={{ isDefined: 'foo' }}>{children}</Provider>
          ),
        }
      )
      expect(result.current.check()).toBe(true)
    })

    it('does not render children when target path is not defined', () => {
      const { result } = renderHook(
        () =>
          useVisibility({
            pathDefined: '/notDefined',
          }),
        {
          wrapper: ({ children }) => (
            <Provider data={{ isDefined: 'foo' }}>{children}</Provider>
          ),
        }
      )
      expect(result.current.check()).toBe(false)
    })
  })

  describe('pathUndefined', () => {
    it('renders children when target path is defined', () => {
      const { result } = renderHook(
        () =>
          useVisibility({
            pathUndefined: '/isDefined',
          }),
        {
          wrapper: ({ children }) => (
            <Provider data={{ isDefined: 'foo' }}>{children}</Provider>
          ),
        }
      )
      expect(result.current.check()).toBe(false)
    })

    it('does not render children when target path is not defined', () => {
      const { result } = renderHook(
        () =>
          useVisibility({
            pathUndefined: '/notDefined',
          }),
        {
          wrapper: ({ children }) => (
            <Provider data={{ isDefined: 'foo' }}>{children}</Provider>
          ),
        }
      )
      expect(result.current.check()).toBe(true)
    })
  })

  describe('pathTruthy', () => {
    it('renders children when target path is truthy', () => {
      const { result } = renderHook(
        () =>
          useVisibility({
            pathTruthy: '/isTruthy',
          }),
        {
          wrapper: ({ children }) => (
            <Provider data={{ isTruthy: 'value' }}>{children}</Provider>
          ),
        }
      )
      expect(result.current.check()).toBe(true)
    })

    it('does not render children when target path is not truthy', () => {
      const { result } = renderHook(() => useVisibility(), {
        wrapper: ({ children }) => (
          <Provider data={{ isFalsy: null }}>{children}</Provider>
        ),
      })
      expect(
        result.current.check({
          pathTruthy: '/isFalsy',
        })
      ).toBe(false)
    })

    it('does not render children when target path is not defined', () => {
      const { result } = renderHook(() => useVisibility(), {
        wrapper: ({ children }) => (
          <Provider data={{ isFalse: false }}>{children}</Provider>
        ),
      })
      expect(
        result.current.check({
          pathTruthy: '/isNotDefined',
        })
      ).toBe(false)
    })
  })

  describe('pathFalsy', () => {
    it('renders children when target path is falsy', () => {
      const { result } = renderHook(
        () =>
          useVisibility({
            pathFalsy: '/isFalsy',
          }),
        {
          wrapper: ({ children }) => (
            <Provider data={{ isFalsy: null }}>{children}</Provider>
          ),
        }
      )
      expect(result.current.check()).toBe(true)
    })

    it('renders children when target path is not defined', () => {
      const { result } = renderHook(() => useVisibility(), {
        wrapper: ({ children }) => (
          <Provider data={{ isFalse: false }}>{children}</Provider>
        ),
      })
      expect(
        result.current.check({
          pathFalsy: '/isNotDefined',
        })
      ).toBe(true)
    })

    it('does not render children when target path is not falsy', () => {
      const { result } = renderHook(() => useVisibility(), {
        wrapper: ({ children }) => (
          <Provider data={{ isTruthy: 'value' }}>{children}</Provider>
        ),
      })
      expect(
        result.current.check({
          pathFalsy: '/isTruthy',
        })
      ).toBe(false)
    })
  })

  describe('visibleWhen', () => {
    it('should render children when hasValue matches', () => {
      const { result } = renderHook(
        () =>
          useVisibility({
            visibleWhen: {
              path: '/myPath',
              hasValue: 'foo',
            },
          }),
        {
          wrapper: ({ children }) => (
            <Provider data={{ myPath: 'foo' }}>{children}</Provider>
          ),
        }
      )
      expect(result.current.check()).toBe(true)
    })

    it('should not render children when hasValue does not match', () => {
      const { result } = renderHook(() => useVisibility(), {
        wrapper: ({ children }) => (
          <Provider data={{ myPath: 'foo' }}>{children}</Provider>
        ),
      })
      expect(
        result.current.check({
          visibleWhen: {
            path: '/myPath',
            hasValue: 'bar',
          },
        })
      ).toBe(false)
    })

    it('should not render children when path does not match', () => {
      const { result } = renderHook(() => useVisibility(), {
        wrapper: ({ children }) => (
          <Provider data={{ myPath: 'foo' }}>{children}</Provider>
        ),
      })
      expect(
        result.current.check({
          visibleWhen: {
            path: '/nonExistingPath',
            hasValue: 'foo',
          },
        })
      ).toBe(false)
    })

    it('should render children when withValue matches', () => {
      const log = jest.spyOn(console, 'warn').mockImplementation()

      const { result } = renderHook(
        () =>
          useVisibility({
            visibleWhen: {
              path: '/myPath',
              withValue: (value) => value === 'foo',
            },
          }),
        {
          wrapper: ({ children }) => (
            <Provider data={{ myPath: 'foo' }}>{children}</Provider>
          ),
        }
      )
      expect(result.current.check()).toBe(true)

      log.mockRestore()
    })

    it('should not render children when withValue does not match', () => {
      const log = jest.spyOn(console, 'warn').mockImplementation()

      const { result } = renderHook(() => useVisibility(), {
        wrapper: ({ children }) => (
          <Provider data={{ myPath: 'foo' }}>{children}</Provider>
        ),
      })
      expect(
        result.current.check({
          visibleWhen: {
            path: '/myPath',
            withValue: (value) => value === 'bar',
          },
        })
      ).toBe(false)

      log.mockRestore()
    })
  })

  describe('visibleWhenNot', () => {
    it('should render children when hasValue matches', () => {
      const { result } = renderHook(
        () =>
          useVisibility({
            visibleWhenNot: {
              path: '/myPath',
              hasValue: 'foo',
            },
          }),
        {
          wrapper: ({ children }) => (
            <Provider data={{ myPath: 'foo' }}>{children}</Provider>
          ),
        }
      )
      expect(result.current.check()).toBe(false)
    })

    it('should not render children when hasValue does not match', () => {
      const { result } = renderHook(() => useVisibility(), {
        wrapper: ({ children }) => (
          <Provider data={{ myPath: 'foo' }}>{children}</Provider>
        ),
      })
      expect(
        result.current.check({
          visibleWhenNot: {
            path: '/myPath',
            hasValue: 'bar',
          },
        })
      ).toBe(true)
    })
  })
})
