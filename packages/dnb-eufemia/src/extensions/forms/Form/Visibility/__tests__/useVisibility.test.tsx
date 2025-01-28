import React from 'react'
import { fireEvent, renderHook } from '@testing-library/react'
import { Provider } from '../../../DataContext'
import useVisibility from '../useVisibility'
import { Field, Iterate } from '../../..'

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
    it('does not render children when target path is not defined', () => {
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

    it('renders children when target path is defined', () => {
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
      const { result } = renderHook(useVisibility, {
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
      const { result } = renderHook(useVisibility, {
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
      const { result } = renderHook(useVisibility, {
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
      const { result } = renderHook(useVisibility, {
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
      const { result } = renderHook(useVisibility, {
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
      const { result } = renderHook(useVisibility, {
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

      const { result } = renderHook(useVisibility, {
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

    describe('isValid', () => {
      it('should return false when path is not existing', () => {
        const { result } = renderHook(useVisibility, {
          wrapper: ({ children }) => <Provider>{children}</Provider>,
        })

        expect(
          result.current.check({
            visibleWhen: {
              path: '/something',
              isValid: true,
            },
          })
        ).toBe(false)
      })

      it('should return false when path did validate', () => {
        const { result } = renderHook(useVisibility, {
          wrapper: ({ children }) => (
            <Provider>
              <Field.Number path="/myPath" required minimum={2} />
              {children}
            </Provider>
          ),
        })

        expect(
          result.current.check({
            visibleWhen: {
              path: '/myPath',
              isValid: true,
            },
          })
        ).toBe(false)
      })

      it('should return true children when path did validate initially', () => {
        const { result } = renderHook(useVisibility, {
          wrapper: ({ children }) => (
            <Provider>
              <Field.Number path="/myPath" />
              {children}
            </Provider>
          ),
        })

        expect(
          result.current.check({
            visibleWhen: {
              path: '/myPath',
              isValid: true,
            },
          })
        ).toBe(true)
      })

      it('should return true when path did validate after blur', () => {
        const { result } = renderHook(useVisibility, {
          wrapper: ({ children }) => (
            <Provider>
              <Field.Number path="/myPath" required minimum={2} />
              {children}
            </Provider>
          ),
        })

        expect(
          result.current.check({
            visibleWhen: {
              path: '/myPath',
              isValid: true,
            },
          })
        ).toBe(false)

        fireEvent.focus(document.querySelector('input'))
        fireEvent.change(document.querySelector('input'), {
          target: { value: '2' },
        })
        expect(
          result.current.check({
            visibleWhen: {
              path: '/myPath',
              isValid: true,
            },
          })
        ).toBe(false)

        fireEvent.blur(document.querySelector('input'))
        expect(
          result.current.check({
            visibleWhen: {
              path: '/myPath',
              isValid: true,
            },
          })
        ).toBe(true)
      })

      it('should return true immediately when "continuousValidation" is true', () => {
        const { result } = renderHook(useVisibility, {
          wrapper: ({ children }) => (
            <Provider>
              <Field.Number path="/myPath" required minimum={2} />
              {children}
            </Provider>
          ),
        })

        expect(
          result.current.check({
            visibleWhen: {
              path: '/myPath',
              isValid: true,
              continuousValidation: true,
            },
          })
        ).toBe(false)

        fireEvent.focus(document.querySelector('input'))
        fireEvent.change(document.querySelector('input'), {
          target: { value: '2' },
        })
        expect(
          result.current.check({
            visibleWhen: {
              path: '/myPath',
              isValid: true,
              continuousValidation: true,
            },
          })
        ).toBe(true)

        fireEvent.blur(document.querySelector('input'))
        expect(
          result.current.check({
            visibleWhen: {
              path: '/myPath',
              isValid: true,
            },
          })
        ).toBe(true)
      })

      it('should return true immediately when "validateContinuously" is true', () => {
        const { result } = renderHook(useVisibility, {
          wrapper: ({ children }) => (
            <Provider>
              <Field.Number path="/myPath" required minimum={2} />
              {children}
            </Provider>
          ),
        })

        expect(
          result.current.check({
            visibleWhen: {
              path: '/myPath',
              isValid: true,
              validateContinuously: true,
            },
          })
        ).toBe(false)

        fireEvent.focus(document.querySelector('input'))
        fireEvent.change(document.querySelector('input'), {
          target: { value: '2' },
        })
        expect(
          result.current.check({
            visibleWhen: {
              path: '/myPath',
              isValid: true,
              validateContinuously: true,
            },
          })
        ).toBe(true)

        fireEvent.blur(document.querySelector('input'))
        expect(
          result.current.check({
            visibleWhen: {
              path: '/myPath',
              isValid: true,
            },
          })
        ).toBe(true)
      })
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
      const { result } = renderHook(useVisibility, {
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

    describe('isValid', () => {
      it('should return true when path is not existing', () => {
        const { result } = renderHook(useVisibility, {
          wrapper: ({ children }) => <Provider>{children}</Provider>,
        })

        expect(
          result.current.check({
            visibleWhenNot: {
              path: '/something',
              isValid: true,
            },
          })
        ).toBe(true)
      })

      it('should return true when path did validate', () => {
        const { result } = renderHook(useVisibility, {
          wrapper: ({ children }) => (
            <Provider>
              <Field.Number path="/myPath" required minimum={2} />
              {children}
            </Provider>
          ),
        })

        expect(
          result.current.check({
            visibleWhenNot: {
              path: '/myPath',
              isValid: true,
            },
          })
        ).toBe(true)
      })

      it('should return false children when path did validate initially', () => {
        const { result } = renderHook(useVisibility, {
          wrapper: ({ children }) => (
            <Provider>
              <Field.Number path="/myPath" />
              {children}
            </Provider>
          ),
        })

        expect(
          result.current.check({
            visibleWhenNot: {
              path: '/myPath',
              isValid: true,
            },
          })
        ).toBe(false)
      })

      it('should return false when path did validate after blur', () => {
        const { result } = renderHook(useVisibility, {
          wrapper: ({ children }) => (
            <Provider>
              <Field.Number path="/myPath" required minimum={2} />
              {children}
            </Provider>
          ),
        })

        expect(
          result.current.check({
            visibleWhenNot: {
              path: '/myPath',
              isValid: true,
            },
          })
        ).toBe(true)

        fireEvent.focus(document.querySelector('input'))
        fireEvent.change(document.querySelector('input'), {
          target: { value: '2' },
        })
        expect(
          result.current.check({
            visibleWhenNot: {
              path: '/myPath',
              isValid: true,
            },
          })
        ).toBe(true)

        fireEvent.blur(document.querySelector('input'))
        expect(
          result.current.check({
            visibleWhenNot: {
              path: '/myPath',
              isValid: true,
            },
          })
        ).toBe(false)
      })
    })
  })

  describe('withinIterate', () => {
    describe('visibility', () => {
      it('renders children when target path is falsy, but visible prop is true', () => {
        const { result } = renderHook(
          () =>
            useVisibility({
              withinIterate: true,
              visible: true,
              pathTruthy: '/isTruthy',
            }),
          {
            wrapper: ({ children }) => (
              <Provider data={{ isTruthy: undefined }}>
                <Iterate.Array value={[{ foo: 'bar' }]}>
                  {children}
                </Iterate.Array>
              </Provider>
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
              withinIterate: true,
              pathDefined: '/isDefined',
            }),
          {
            wrapper: ({ children }) => (
              <Provider
                data={{
                  myList: [{ isDefined: 'foo' }],
                }}
              >
                <Iterate.Array path="/myList">{children}</Iterate.Array>
              </Provider>
            ),
          }
        )
        expect(result.current.check()).toBe(true)
      })

      it('does not render children when target path is not defined', () => {
        const { result } = renderHook(
          () =>
            useVisibility({
              withinIterate: true,
              pathDefined: '/notDefined',
            }),
          {
            wrapper: ({ children }) => (
              <Provider
                data={{
                  myList: [{ isDefined: 'foo' }],
                }}
              >
                <Iterate.Array path="/myList">{children}</Iterate.Array>
              </Provider>
            ),
          }
        )
        expect(result.current.check()).toBe(false)
      })
    })

    describe('pathUndefined', () => {
      it('does not render children when target path is not defined', () => {
        const { result } = renderHook(
          () =>
            useVisibility({
              withinIterate: true,
              pathUndefined: '/isDefined',
            }),
          {
            wrapper: ({ children }) => (
              <Provider
                data={{
                  myList: [{ isDefined: 'foo' }],
                }}
              >
                <Iterate.Array path="/myList">{children}</Iterate.Array>
              </Provider>
            ),
          }
        )
        expect(result.current.check()).toBe(false)
      })

      it('renders children when target path is defined', () => {
        const { result } = renderHook(
          () =>
            useVisibility({
              withinIterate: true,
              pathUndefined: '/notDefined',
            }),
          {
            wrapper: ({ children }) => (
              <Provider
                data={{
                  myList: [{ isDefined: 'foo' }],
                }}
              >
                <Iterate.Array path="/myList">{children}</Iterate.Array>
              </Provider>
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
              withinIterate: true,
              pathTruthy: '/isTruthy',
            }),
          {
            wrapper: ({ children }) => (
              <Provider data={{ myList: [{ isTruthy: 'value' }] }}>
                <Iterate.Array path="/myList">{children}</Iterate.Array>
              </Provider>
            ),
          }
        )
        expect(result.current.check()).toBe(true)
      })

      it('does not render children when target path is not truthy', () => {
        const { result } = renderHook(useVisibility, {
          wrapper: ({ children }) => (
            <Provider
              data={{
                myList: [{ isFalsy: null }],
              }}
            >
              <Iterate.Array path="/myList">{children}</Iterate.Array>
            </Provider>
          ),
        })
        expect(
          result.current.check({
            pathTruthy: '/isFalsy',
          })
        ).toBe(false)
      })

      it('does not render children when target path is not defined', () => {
        const { result } = renderHook(useVisibility, {
          wrapper: ({ children }) => (
            <Provider
              data={{
                myList: [{ isFalse: false }],
              }}
            >
              <Iterate.Array path="/myList">{children}</Iterate.Array>
            </Provider>
          ),
          initialProps: {
            withinIterate: true,
          },
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
              <Provider
                data={{
                  myList: [{ isFalsy: null }],
                }}
              >
                <Iterate.Array path="/myList">{children}</Iterate.Array>
              </Provider>
            ),
            initialProps: {
              withinIterate: true,
            },
          }
        )
        expect(result.current.check()).toBe(true)
      })

      it('renders children when target path is not defined', () => {
        const { result } = renderHook(useVisibility, {
          wrapper: ({ children }) => (
            <Provider data={{ myList: [{ isFalse: false }] }}>
              <Iterate.Array path="/myList">{children}</Iterate.Array>
            </Provider>
          ),
          initialProps: {
            withinIterate: true,
          },
        })
        expect(
          result.current.check({
            pathFalsy: '/isNotDefined',
          })
        ).toBe(true)
      })

      it('does not render children when target path is not falsy', () => {
        const { result } = renderHook(useVisibility, {
          wrapper: ({ children }) => (
            <Provider data={{ myList: [{ isTruthy: 'value' }] }}>
              <Iterate.Array path="/myList">{children}</Iterate.Array>
            </Provider>
          ),
          initialProps: {
            withinIterate: true,
          },
        })
        expect(
          result.current.check({
            pathFalsy: '/isTruthy',
          })
        ).toBe(false)
      })
    })
  })
})
