import React from 'react'
import { render } from '@testing-library/react'
import { Form, Field } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Form.FieldProps', () => {
  describe('disable', () => {
    it('should disable the input and button', () => {
      render(
        <Form.FieldProps disabled={true}>
          <Field.String />
          <Form.SubmitButton />
        </Form.FieldProps>
      )

      const input = document.querySelector('input')
      const button = document.querySelector('button')

      expect(input).toBeDisabled()
      expect(button).toBeDisabled()
    })

    it('should not disable the input when prop is set', () => {
      render(
        <Form.FieldProps disabled={true}>
          <Field.String disabled={false} />
          <Form.SubmitButton disabled={false} />
        </Form.FieldProps>
      )

      const input = document.querySelector('input')
      const button = document.querySelector('button')

      expect(input).not.toBeDisabled()
      expect(button).not.toBeDisabled()
    })

    it('should handle the disabled prop from the Form.Handler', () => {
      const { rerender } = render(
        <Form.Handler disabled={true}>
          <Form.FieldProps>
            <Field.String />
            <Form.SubmitButton />
          </Form.FieldProps>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const button = document.querySelector('button')

      expect(input).toBeDisabled()
      expect(button).toBeDisabled()

      rerender(
        <Form.Handler disabled={true}>
          <Form.FieldProps disabled={false}>
            <Field.String />
            <Form.SubmitButton />
          </Form.FieldProps>
        </Form.Handler>
      )

      expect(input).not.toBeDisabled()
      expect(button).not.toBeDisabled()

      rerender(
        <Form.Handler disabled={true}>
          <Form.FieldProps>
            <Field.String disabled={false} />
            <Form.SubmitButton disabled={false} />
          </Form.FieldProps>
        </Form.Handler>
      )

      expect(input).not.toBeDisabled()
      expect(button).not.toBeDisabled()
    })
  })

  describe('require', () => {
    it('should require the input and button', () => {
      render(
        <Form.FieldProps required={true}>
          <Field.String validateInitially />
        </Form.FieldProps>
      )

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )
    })

    it('should not require the input when prop is set', () => {
      render(
        <Form.FieldProps required={true}>
          <Field.String validateInitially required={false} />
        </Form.FieldProps>
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    it('should handle the required prop from the Form.Handler', () => {
      const { rerender } = render(
        <Form.Handler required={true}>
          <Form.FieldProps>
            <Field.String validateInitially />
          </Form.FieldProps>
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()

      rerender(
        <Form.Handler required={true}>
          <Form.FieldProps required={false}>
            <Field.String validateInitially />
          </Form.FieldProps>
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      rerender(
        <Form.Handler required={true}>
          <Form.FieldProps>
            <Field.String validateInitially required={false} />
          </Form.FieldProps>
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })
  })
})
