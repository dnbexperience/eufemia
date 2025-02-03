import React, { useEffect } from 'react'
import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from '@testing-library/react'
import { makeUniqueId } from '../../../../../shared/component-helper'
import { Field, Form } from '../../..'
import useValidation from '../useValidation'
import userEvent from '@testing-library/user-event'

describe('useValidation', () => {
  let identifier: string

  beforeEach(() => {
    identifier = makeUniqueId()
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
    })
  })
})
