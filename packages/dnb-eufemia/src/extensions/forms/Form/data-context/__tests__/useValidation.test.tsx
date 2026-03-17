import React, { useEffect, useReducer, useState } from 'react'
import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { makeUniqueId } from '../../../../../shared/component-helper'
import { Field, Form } from '../../..'
import { Button } from '../../../../../components'
import SharedProvider from '../../../../../shared/Provider'
import useValidation from '../useValidation'

describe('useValidation', () => {
  let identifier: string

  beforeEach(() => {
    identifier = makeUniqueId()
  })

  it('should not throw when using an id that has never been mounted', () => {
    const { result } = renderHook(() => useValidation(identifier))

    expect(() => {
      result.current.hasErrors()
      result.current.hasFieldError('/foo')
      result.current.setFormError(new Error('Error'))
      result.current.setFieldStatus('/foo', { error: null })
    }).not.toThrow()
  })

  describe('hasErrors', () => {
    describe('with id', () => {
      it('should return false when no errors where present', () => {
        render(
          <Form.Handler id={identifier}>
            <Field.String path="/foo" />
          </Form.Handler>
        )

        const { result } = renderHook(() => useValidation(identifier))

        expect(result.current.hasErrors()).toBe(false)
      })

      it('should return true when errors where present', () => {
        render(
          <Form.Handler id={identifier}>
            <Field.String path="/foo" required />
          </Form.Handler>
        )

        const { result } = renderHook(() => useValidation(identifier))

        expect(result.current.hasErrors()).toBe(true)
      })

      it('should react on changes', async () => {
        render(
          <Form.Handler id={identifier}>
            <Field.String path="/foo" required />
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const { result } = renderHook(() => useValidation(identifier))

        expect(result.current.hasErrors()).toBe(true)

        await userEvent.type(input, 'foo')

        expect(result.current.hasErrors()).toBe(false)
      })

      it('should rerender when used outside of the form context', async () => {
        const MockComponent = () => {
          const { hasErrors } = useValidation(identifier)

          return (
            <output>{JSON.stringify({ hasError: hasErrors() })}</output>
          )
        }

        render(
          <>
            <Form.Handler id={identifier}>
              <Field.String path="/foo" required />
            </Form.Handler>
            <MockComponent />
          </>
        )

        const input = document.querySelector('input')
        const output = document.querySelector('output')

        await waitFor(() => {
          expect(output).toHaveTextContent('{"hasError":true}')
        })

        await userEvent.type(input, 'foo')

        await waitFor(() => {
          expect(output).toHaveTextContent('{"hasError":false}')
        })
      })

      it('should keep validation state when locale changes', async () => {
        const onSubmit = jest.fn()

        const { rerender } = render(
          <Form.Handler id={identifier} locale="nb-NO" onSubmit={onSubmit}>
            <Field.String path="/foo" required />
          </Form.Handler>
        )

        const { result } = renderHook(() => useValidation(identifier))

        expect(result.current.hasErrors()).toBe(true)

        fireEvent.submit(document.querySelector('form'))
        expect(onSubmit).toHaveBeenCalledTimes(0)

        rerender(
          <Form.Handler id={identifier} locale="en-GB" onSubmit={onSubmit}>
            <Field.String path="/foo" required />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(result.current.hasErrors()).toBe(true)
        })

        fireEvent.submit(document.querySelector('form'))
        expect(onSubmit).toHaveBeenCalledTimes(0)
      })

      it('should keep field status error when locale changes', async () => {
        const onSubmit = jest.fn()

        const { rerender } = render(
          <Form.Handler
            id={identifier}
            locale="nb-NO"
            onSubmit={onSubmit}
            data={{ foo: 'value' }}
          >
            <Field.String path="/foo" />
          </Form.Handler>
        )

        const { result } = renderHook(() => useValidation(identifier))

        act(() => {
          result.current.setFieldStatus('/foo', {
            error: new Error('Error message'),
          })
        })

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('Error message')
        })

        fireEvent.submit(document.querySelector('form'))
        expect(onSubmit).toHaveBeenCalledTimes(0)

        rerender(
          <Form.Handler
            id={identifier}
            locale="en-GB"
            onSubmit={onSubmit}
            data={{ foo: 'value' }}
          >
            <Field.String path="/foo" />
          </Form.Handler>
        )

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('Error message')
        })

        fireEvent.submit(document.querySelector('form'))
        expect(onSubmit).toHaveBeenCalledTimes(0)
      })

      it('should keep field status error when form remounts due to locale switch', async () => {
        const onSubmit = jest.fn()

        const { result } = renderHook(() => useValidation(identifier))

        const { rerender } = render(
          <div key="nb-NO">
            <Form.Handler
              id={identifier}
              locale="nb-NO"
              onSubmit={onSubmit}
              data={{ foo: 'value' }}
            >
              <Field.String path="/foo" />
            </Form.Handler>
          </div>
        )

        act(() => {
          result.current.setFieldStatus('/foo', {
            error: new Error('Error message'),
          })
        })

        await waitFor(() => {
          expect(result.current.hasErrors()).toBe(true)
        })

        fireEvent.submit(document.querySelector('form'))
        expect(onSubmit).toHaveBeenCalledTimes(0)

        rerender(
          <div key="en-GB">
            <Form.Handler
              id={identifier}
              locale="en-GB"
              onSubmit={onSubmit}
              data={{ foo: 'value' }}
            >
              <Field.String path="/foo" />
            </Form.Handler>
          </div>
        )

        await waitFor(() => {
          expect(result.current.hasErrors()).toBe(true)
        })

        fireEvent.submit(document.querySelector('form'))
        expect(onSubmit).toHaveBeenCalledTimes(0)
      })

      it('should keep date minDate validation after locale switch', async () => {
        const minDate = '2030-01-01'

        const MockComponent = () => {
          const [norwegian, setNorwegian] = useState(true)
          const [, forceUpdate] = useReducer((value) => value + 1, 0)
          const [date, setDate] = useState<string | undefined>('')
          const { hasErrors } = useValidation(identifier)

          return (
            <SharedProvider locale={norwegian ? 'nb-NO' : 'en-GB'}>
              <Form.Handler id={identifier}>
                <Field.Date
                  minDate={minDate}
                  onChange={(value) => setDate(value)}
                  layout="horizontal"
                />

                <Button
                  id="change-locale"
                  onClick={() => setNorwegian(!norwegian)}
                />

                <Button id="rerender" onClick={forceUpdate} />
              </Form.Handler>

              <output>
                {JSON.stringify({ hasErrors: hasErrors(), date })}
              </output>
            </SharedProvider>
          )
        }

        render(<MockComponent />)

        const dayInput = document.querySelector(
          '.dnb-date-picker__input--day'
        ) as HTMLInputElement

        await userEvent.click(dayInput)
        dayInput.setSelectionRange(0, 0)
        await userEvent.keyboard('31122029')
        await userEvent.click(document.body)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status--error')
          ).toBeInTheDocument()
        })

        await userEvent.click(document.querySelector('button#rerender'))

        const output = document.querySelector('output')
        expect(output).toHaveTextContent('"hasErrors":true')

        await userEvent.click(
          document.querySelector('button#change-locale')
        )

        await waitFor(() => {
          expect(output).toHaveTextContent('"hasErrors":true')
        })
      })

      it('should keep hasErrors after locale switch', async () => {
        const MockComponent = () => {
          const [norwegian, setNorwegian] = useState(true)
          const { hasErrors } = useValidation(identifier)

          return (
            <SharedProvider locale={norwegian ? 'nb-NO' : 'en-GB'}>
              <Form.Handler id={identifier}>
                <Field.Number minimum={2} />

                <Field.Date path="/date" />

                <Button
                  id="change-locale"
                  onClick={() => setNorwegian(!norwegian)}
                />
              </Form.Handler>

              <output>
                {JSON.stringify({
                  hasErrors: hasErrors(),
                })}
              </output>
            </SharedProvider>
          )
        }

        render(<MockComponent />)

        const dayInput = document.querySelector(
          '.dnb-date-picker__input--day'
        ) as HTMLInputElement

        await userEvent.click(dayInput)
        dayInput.setSelectionRange(0, 0)
        await userEvent.keyboard('13131313')
        await userEvent.click(document.body)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status--error')
          ).toBeInTheDocument()
        })

        const output = document.querySelector('output')
        expect(output).toHaveTextContent('"hasErrors":true')

        await userEvent.click(
          document.querySelector('button#change-locale')
        )

        await waitFor(() => {
          expect(output).toHaveTextContent('"hasErrors":true')
        })
      })

      describe('with context', () => {
        const MockComponent = () => {
          const { hasErrors } = useValidation()
          return (
            <output>{JSON.stringify({ hasError: hasErrors() })}</output>
          )
        }

        it('should return false when no errors where present', () => {
          render(
            <Form.Handler>
              <Field.String path="/foo" />
              <MockComponent />
            </Form.Handler>
          )

          const output = document.querySelector('output')
          expect(output).toHaveTextContent('{"hasError":false}')
        })

        it('should return true when errors where present', () => {
          render(
            <Form.Handler>
              <Field.String path="/foo" required />
              <MockComponent />
            </Form.Handler>
          )

          const output = document.querySelector('output')
          expect(output).toHaveTextContent('{"hasError":true}')
        })

        it('should react on changes', async () => {
          render(
            <Form.Handler>
              <Field.String path="/foo" required />
              <MockComponent />
            </Form.Handler>
          )

          const input = document.querySelector('input')
          const output = document.querySelector('output')

          expect(output).toHaveTextContent('{"hasError":true}')

          await userEvent.type(input, 'foo')

          expect(output).toHaveTextContent('{"hasError":false}')
        })
      })
    })
  })

  describe('setFormError', () => {
    it('should handle the setFormError method with an identifier', async () => {
      render(<Form.Handler id={identifier}>content</Form.Handler>)

      const { result } = renderHook(() => useValidation(identifier))

      act(() => {
        result.current.setFormError(new Error('Error message'))
      })

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'Error message'
      )
      expect(result.current.hasErrors()).toBe(false)

      act(() => {
        result.current.setFormError(new Error('Error message changed'))
      })

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'Error message changed'
      )
      expect(result.current.hasErrors()).toBe(false)
    })

    it('should handle the setFormError method without an identifier', async () => {
      const MockComponent = () => {
        const { hasErrors, setFormError } = useValidation()

        useEffect(() => {
          setFormError(new Error('Error message'))
        }, [setFormError])

        return <output>{JSON.stringify({ hasError: hasErrors() })}</output>
      }

      render(
        <Form.Handler>
          <MockComponent />
        </Form.Handler>
      )

      const output = document.querySelector('output')

      expect(output).toHaveTextContent('{"hasError":false}')

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'Error message'
      )
    })

    it('should remove the setFormError when the value is null', async () => {
      render(<Form.Handler id={identifier}>content</Form.Handler>)

      const { result } = renderHook(() => useValidation(identifier))

      act(() => {
        result.current.setFormError(new Error('Error message'))
      })

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'Error message'
      )
      expect(result.current.hasErrors()).toBe(false)

      act(() => {
        result.current.setFormError(null)
      })

      await waitFor(() => {
        expect(document.querySelector('.dnb-form-status')).toBeNull()
        expect(result.current.hasErrors()).toBe(false)
      })
    })

    it('should remove the setFormError when the value is undefined', async () => {
      render(<Form.Handler id={identifier}>content</Form.Handler>)

      const { result } = renderHook(() => useValidation(identifier))

      act(() => {
        result.current.setFormError(new Error('Error message'))
      })

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'Error message'
      )
      expect(result.current.hasErrors()).toBe(false)

      act(() => {
        result.current.setFormError(undefined)
      })

      await waitFor(() => {
        expect(document.querySelector('.dnb-form-status')).toBeNull()
        expect(result.current.hasErrors()).toBe(false)
      })
    })

    describe('visibleOnly', () => {
      it('should return false when hidden field has error and visibleOnly is true', () => {
        render(
          <Form.Handler id={identifier}>
            <Field.String path="/visible" required />
            <Form.Visibility visible={false} keepInDOM>
              <Field.String path="/hidden" required />
            </Form.Visibility>
          </Form.Handler>
        )

        const { result } = renderHook(() => useValidation(identifier))

        expect(result.current.hasErrors()).toBe(true)
        expect(result.current.hasErrors({ visibleOnly: true })).toBe(true)
      })

      it('should return false when only hidden fields have errors and visibleOnly is true', () => {
        render(
          <Form.Handler id={identifier} data={{ visible: 'has value' }}>
            <Field.String path="/visible" required />
            <Form.Visibility visible={false} keepInDOM>
              <Field.String path="/hidden" required />
            </Form.Visibility>
          </Form.Handler>
        )

        const { result } = renderHook(() => useValidation(identifier))

        expect(result.current.hasErrors()).toBe(true)
        expect(result.current.hasErrors({ visibleOnly: true })).toBe(false)
      })

      it('should return true without visibleOnly even when field is hidden with keepInDOM', () => {
        render(
          <Form.Handler id={identifier}>
            <Form.Visibility visible={false} keepInDOM>
              <Field.String path="/hidden" required />
            </Form.Visibility>
          </Form.Handler>
        )

        const { result } = renderHook(() => useValidation(identifier))

        expect(result.current.hasErrors()).toBe(true)
        expect(result.current.hasErrors({ visibleOnly: true })).toBe(false)
      })

      it('should react to visibility changes with keepInDOM', async () => {
        const MockComponent = () => {
          const [visible, setVisible] = useState(true)
          return (
            <>
              <Form.Visibility visible={visible} keepInDOM>
                <Field.String path="/conditional" required />
              </Form.Visibility>
              <button onClick={() => setVisible(false)}>Hide</button>
            </>
          )
        }

        render(
          <Form.Handler id={identifier}>
            <MockComponent />
          </Form.Handler>
        )

        const { result } = renderHook(() => useValidation(identifier))

        expect(result.current.hasErrors({ visibleOnly: true })).toBe(true)
        expect(result.current.hasErrors()).toBe(true)

        await userEvent.click(
          document.querySelector('button:last-of-type')
        )

        await waitFor(() => {
          expect(result.current.hasErrors({ visibleOnly: true })).toBe(
            false
          )
        })
        expect(result.current.hasErrors()).toBe(true)
      })

      it('should work without an identifier', () => {
        const result = { current: undefined }

        const MockComponent = () => {
          result.current = useValidation()

          return (
            <>
              <Field.String path="/visible" required />
              <Form.Visibility visible={false} keepInDOM>
                <Field.String path="/hidden" required />
              </Form.Visibility>
            </>
          )
        }

        render(
          <Form.Handler data={{ visible: 'has value' }}>
            <MockComponent />
          </Form.Handler>
        )

        expect(result.current.hasErrors()).toBe(true)
        expect(result.current.hasErrors({ visibleOnly: true })).toBe(false)
      })
    })
  })

  describe('hasFieldError', () => {
    it('should return correct state with an identifier', () => {
      render(
        <Form.Handler id={identifier}>
          <Field.String path="/foo" required />
          <Field.String path="/bar" />
        </Form.Handler>
      )

      const { result } = renderHook(() => useValidation(identifier))

      expect(result.current.hasFieldError('/foo')).toBe(true)
      expect(result.current.hasFieldError('/bar')).toBe(false)
    })

    it('should return false for hidden field when visibleOnly is true', () => {
      render(
        <Form.Handler id={identifier}>
          <Field.String path="/foo" required />
          <Form.Visibility visible={false} keepInDOM>
            <Field.String path="/hidden" required />
          </Form.Visibility>
        </Form.Handler>
      )

      const { result } = renderHook(() => useValidation(identifier))

      expect(result.current.hasFieldError('/foo')).toBe(true)
      expect(result.current.hasFieldError('/hidden')).toBe(true)
      expect(
        result.current.hasFieldError('/hidden', { visibleOnly: true })
      ).toBe(false)
      expect(
        result.current.hasFieldError('/foo', { visibleOnly: true })
      ).toBe(true)
    })
  })

  it('should return correct state without an identifier', () => {
    const result = { current: undefined }

    const MockComponent = () => {
      result.current = useValidation()

      return (
        <>
          <Field.String path="/foo" required />
          <Field.String path="/bar" />
        </>
      )
    }

    render(
      <Form.Handler>
        <MockComponent />
      </Form.Handler>
    )

    expect(result.current.hasFieldError('/foo')).toBe(true)
    expect(result.current.hasFieldError('/bar')).toBe(false)
  })

  describe('setFieldStatus', () => {
    it('should not throw when no id is given', () => {
      const { result } = renderHook(useValidation)
      result.current.setFieldStatus('/path', { error: null })
    })

    describe('with an identifier', () => {
      it('should handle the setFormError method outside of the form context', async () => {
        const myId = () => null
        const onSubmit = jest.fn()

        const MockComponent = () => {
          const { setFieldStatus } = useValidation(myId)

          return (
            <Form.Handler id={myId} onSubmit={onSubmit}>
              <Field.String
                label="My field"
                path="/myField"
                onChange={(value) => {
                  if (value === 'error') {
                    setFieldStatus('/myField', {
                      error: new Error('Error message'),
                    })
                  }
                }}
              />
            </Form.Handler>
          )
        }

        render(<MockComponent />)

        await userEvent.type(document.querySelector('input'), 'error')

        fireEvent.submit(document.querySelector('form'))

        expect(onSubmit).toHaveBeenCalledTimes(0)

        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })

      it('should set and remove a field error', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler id={identifier} onSubmit={onSubmit}>
            <Field.String label="My field" path="/myField" />
          </Form.Handler>
        )

        const { result } = renderHook(() => useValidation(identifier))

        expect(document.querySelector('.dnb-form-status')).toBeNull()

        const form = document.querySelector('form')

        fireEvent.submit(form)
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { myField: undefined },
          expect.anything()
        )

        act(() => {
          result.current.setFieldStatus('/myField', {
            error: new Error('Error message'),
          })
        })

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('Error message')
        })

        fireEvent.submit(form)
        expect(onSubmit).toHaveBeenCalledTimes(1)

        act(() => {
          result.current.setFieldStatus('/myField', { error: null })
        })

        await waitFor(() => {
          expect(document.querySelector('.dnb-form-status')).toBeNull()
        })
      })
    })

    describe('without an identifier', () => {
      it('should set and remove a field error', async () => {
        const onSubmit = jest.fn()

        const MockProvider = ({ children }) => {
          return (
            <Form.Handler onSubmit={onSubmit}>
              <Field.String label="My field" path="/myField" />
              {children}
            </Form.Handler>
          )
        }

        const { result } = renderHook(useValidation, {
          wrapper: ({ children }) => (
            <MockProvider>{children}</MockProvider>
          ),
        })

        expect(document.querySelector('.dnb-form-status')).toBeNull()

        const form = document.querySelector('form')

        fireEvent.submit(form)
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { myField: undefined },
          expect.anything()
        )

        act(() => {
          result.current.setFieldStatus('/myField', {
            error: new Error('Error message'),
          })
        })

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('Error message')
        })

        fireEvent.submit(form)
        expect(onSubmit).toHaveBeenCalledTimes(1)

        act(() => {
          result.current.setFieldStatus('/myField', { error: null })
        })

        await waitFor(() => {
          expect(document.querySelector('.dnb-form-status')).toBeNull()
        })
      })

      it('should set and remove a field error, warning and info', async () => {
        const onSubmit = jest.fn()

        const MockProvider = ({ children }) => {
          return (
            <Form.Handler onSubmit={onSubmit}>
              <Field.String label="My field" path="/myField" />
              {children}
            </Form.Handler>
          )
        }

        const { result } = renderHook(useValidation, {
          wrapper: ({ children }) => (
            <MockProvider>{children}</MockProvider>
          ),
        })

        expect(document.querySelector('.dnb-form-status')).toBeNull()

        const form = document.querySelector('form')

        fireEvent.submit(form)
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { myField: undefined },
          expect.anything()
        )

        act(() => {
          result.current.setFieldStatus('/myField', {
            error: new Error('Error message'),
            warning: 'Warning message',
            info: 'Info message',
          })
        })

        await waitFor(() => {
          const statuses = document.querySelectorAll('.dnb-form-status')
          expect(statuses).toHaveLength(3)
          const [error, warning, info] = Array.from(statuses)
          expect(error).toHaveTextContent('Error message')
          expect(warning).toHaveTextContent('Warning message')
          expect(info).toHaveTextContent('Info message')
        })

        fireEvent.submit(form)
        expect(onSubmit).toHaveBeenCalledTimes(1)

        act(() => {
          result.current.setFieldStatus('/myField', { warning: null })
        })

        await waitFor(() => {
          const statuses = document.querySelectorAll('.dnb-form-status')
          expect(statuses).toHaveLength(2)
          const [error, info] = Array.from(statuses)
          expect(error).toHaveTextContent('Error message')
          expect(info).toHaveTextContent('Info message')
        })

        act(() => {
          result.current.setFieldStatus('/myField', { info: null })
        })

        await waitFor(() => {
          const statuses = document.querySelectorAll('.dnb-form-status')
          expect(statuses).toHaveLength(1)
          const [error] = Array.from(statuses)
          expect(error).toHaveTextContent('Error message')
        })

        act(() => {
          result.current.setFieldStatus('/myField', {
            error: new Error('New message'),
          })
        })

        await waitFor(() => {
          const statuses = document.querySelectorAll('.dnb-form-status')
          expect(statuses).toHaveLength(1)
          const [error] = Array.from(statuses)
          expect(error).toHaveTextContent('New message')
        })

        act(() => {
          result.current.setFieldStatus('/myField', { error: null })
        })

        await waitFor(() => {
          expect(document.querySelector('.dnb-form-status')).toBeNull()
        })

        act(() => {
          result.current.setFieldStatus('/myField', {
            info: 'Show me again',
          })
        })

        await waitFor(() => {
          const statuses = document.querySelectorAll('.dnb-form-status')
          expect(statuses).toHaveLength(1)
          const [info] = Array.from(statuses)
          expect(info).toHaveTextContent('Show me again')
        })
      })

      it('should hide the error message when the field is set to empty', async () => {
        const MockComponent = () => {
          const { setFieldStatus } = useValidation()

          return (
            <>
              <Field.String path="/foo" required />
              <Button
                onClick={() => {
                  setFieldStatus('/foo', {
                    error: undefined,
                  })
                }}
              />
            </>
          )
        }

        render(
          <Form.Handler>
            <MockComponent />
          </Form.Handler>
        )

        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()

        fireEvent.submit(document.querySelector('form'))
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()

        await userEvent.click(document.querySelector('button'))
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()

        fireEvent.submit(document.querySelector('form'))
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()

        await userEvent.click(document.querySelector('button'))
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })
  })
})
