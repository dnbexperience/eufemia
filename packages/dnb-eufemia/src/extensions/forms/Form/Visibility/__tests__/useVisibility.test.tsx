import React from 'react'
import { fireEvent, renderHook } from '@testing-library/react'
import { Provider } from '../../../DataContext'
import useVisibility from '../useVisibility'
import { Field, Iterate } from '../../..'

describe('useVisibility', () => {
  describe('visibility', () => {
    it('should return true when visible is true', () => {
      const { result } = renderHook(() =>
        useVisibility({
          visible: true,
        })
      )
      expect(result.current.check()).toBe(true)
    })

    it('should return false when visible is false', () => {
      const { result } = renderHook(() =>
        useVisibility({
          visible: false,
        })
      )
      expect(result.current.check()).toBe(false)
    })

    it('should return true when target path is falsy, but visible prop is true', () => {
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
    it('should return true when target path is defined', () => {
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

    it('should return false when target path is not defined', () => {
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

    it('should return false when value exists but is "undefined"', () => {
      const { result } = renderHook(useVisibility, {
        wrapper: ({ children }) => (
          <Provider data={{ isUndefined: undefined }}>{children}</Provider>
        ),
      })
      expect(
        result.current.check({
          pathDefined: '/isUndefined',
        })
      ).toBe(false)
    })
  })

  describe('pathUndefined', () => {
    it('should return false when target path is not defined', () => {
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

    it('should return true when target path is defined', () => {
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
    it('should return true when target path is truthy', () => {
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

    it('should return false when target path is not truthy', () => {
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

    it('should return false when target path is not defined', () => {
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
    it('should return true when target path is falsy', () => {
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

    it('should return true when target path is not defined', () => {
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

    it('should return false when target path is not falsy', () => {
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
    it('should return true when hasValue matches', () => {
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

    it('should return false when hasValue does not match', () => {
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

    it('should return false when path does not match', () => {
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

    it('should return true when withValue matches', () => {
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

    it('should return false when withValue does not match', () => {
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
    it('should return true when hasValue matches', () => {
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

    it('should return false when hasValue does not match', () => {
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
      it('should return true when target path is falsy, but visible prop is true', () => {
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
      it('should return true when target path is defined', () => {
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

      it('should return false when target path is not defined', () => {
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

      it('should return false when value exists but is "undefined"', () => {
        const { result } = renderHook(
          () =>
            useVisibility({
              withinIterate: true,
              pathDefined: '/isUndefined',
            }),
          {
            wrapper: ({ children }) => (
              <Provider
                data={{
                  myList: [{ isUndefined: undefined }],
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
      it('should return false when target path is not defined', () => {
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

      it('should return true when target path is defined', () => {
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
      it('should return true when target path is truthy', () => {
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

      it('should return false when target path is not truthy', () => {
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

      it('should return false when target path is not defined', () => {
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
      it('should return true when target path is falsy', () => {
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

      it('should return true when target path is not defined', () => {
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

      it('should return false when target path is not falsy', () => {
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
