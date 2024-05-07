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
  })
})
