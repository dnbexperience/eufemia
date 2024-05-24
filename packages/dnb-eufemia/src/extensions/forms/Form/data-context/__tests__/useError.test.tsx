import React, { useEffect } from 'react'
import { act, render, renderHook, waitFor } from '@testing-library/react'
import { makeUniqueId } from '../../../../../shared/component-helper'
import { Field, Form } from '../../..'
import useError from '../useError'
import userEvent from '@testing-library/user-event'

describe('useError', () => {
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

        const { result } = renderHook(() => useError(identifier))

        expect(result.current.hasErrors()).toBe(false)
      })

      it('should return true when errors where present', () => {
        render(
          <Form.Handler id={identifier}>
            <Field.String path="/foo" required />
          </Form.Handler>
        )

        const { result } = renderHook(() => useError(identifier))

        expect(result.current.hasErrors()).toBe(true)
      })

      it('should react on changes', async () => {
        render(
          <Form.Handler id={identifier}>
            <Field.String path="/foo" required />
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const { result } = renderHook(() => useError(identifier))

        expect(result.current.hasErrors()).toBe(true)

        await userEvent.type(input, 'foo')

        expect(result.current.hasErrors()).toBe(false)
      })

      describe('with context', () => {
        const MockComponent = () => {
          const { hasErrors } = useError()
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

      const { result } = renderHook(() => useError(identifier))

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

      act(() => {
        result.current.setFormError(undefined)
      })

      await waitFor(() => {
        expect(document.querySelector('.dnb-form-status')).toBeNull()
        expect(result.current.hasErrors()).toBe(false)
      })
    })

    it('should handle the setFormError method without an identifier', async () => {
      const MockComponent = () => {
        const { hasErrors, setFormError } = useError()

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
  })

  describe('hasFieldError', () => {
    it('should return correct state with an identifier', () => {
      render(
        <Form.Handler id={identifier}>
          <Field.String path="/foo" required />
          <Field.String path="/bar" />
        </Form.Handler>
      )

      const { result } = renderHook(() => useError(identifier))

      expect(result.current.hasFieldError('/foo')).toBe(true)
      expect(result.current.hasFieldError('/bar')).toBe(false)
    })
  })

  it('should return correct state without an identifier', () => {
    const result = { current: undefined }

    const MockComponent = () => {
      result.current = useError()

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
})
