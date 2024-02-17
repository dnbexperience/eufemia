import React from 'react'
import { render } from '@testing-library/react'
import { Form, Field } from '../../..'

describe('Form.Theme', () => {
  describe('size', () => {
    it('String', () => {
      const { rerender } = render(
        <Form.Theme size="medium">
          <Field.String />
        </Form.Theme>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )

      rerender(
        <Form.Theme size="large">
          <Field.String />
        </Form.Theme>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--large'
      )
    })

    it('Number', () => {
      const { rerender } = render(
        <Form.Theme size="medium">
          <Field.Number />
        </Form.Theme>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )

      rerender(
        <Form.Theme size="large">
          <Field.Number />
        </Form.Theme>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--large'
      )
    })

    it('Date', () => {
      render(
        <Form.Theme size="medium">
          <Field.Date />
        </Form.Theme>
      )

      expect(document.querySelector('.dnb-date-picker')).toHaveClass(
        'dnb-date-picker--medium'
      )
    })

    it('Email', () => {
      render(
        <Form.Theme size="medium">
          <Field.Email />
        </Form.Theme>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )
    })

    it('Currency', () => {
      render(
        <Form.Theme size="medium">
          <Field.Currency />
        </Form.Theme>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )
    })

    it('NationalIdentityNumber', () => {
      render(
        <Form.Theme size="medium">
          <Field.NationalIdentityNumber />
        </Form.Theme>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )
    })

    it('OrganizationNumber', () => {
      render(
        <Form.Theme size="medium">
          <Field.OrganizationNumber />
        </Form.Theme>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )
    })

    it('Password', () => {
      render(
        <Form.Theme size="medium">
          <Field.Password />
        </Form.Theme>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )
    })

    it('PhoneNumber', () => {
      render(
        <Form.Theme size="medium">
          <Field.PhoneNumber />
        </Form.Theme>
      )

      expect(document.querySelector('.dnb-autocomplete')).toHaveClass(
        'dnb-autocomplete--medium'
      )
      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )
    })

    it('PostalCodeAndCity', () => {
      render(
        <Form.Theme size="medium">
          <Field.PostalCodeAndCity postalCode={{}} city={{}} />
        </Form.Theme>
      )

      const [postalCode, city] = Array.from(
        document.querySelectorAll('.dnb-input')
      )
      expect(postalCode).toHaveClass('dnb-input--medium')
      expect(city).toHaveClass('dnb-input--medium')
    })

    it('SelectCountry', () => {
      render(
        <Form.Theme size="medium">
          <Field.SelectCountry />
        </Form.Theme>
      )

      expect(document.querySelector('.dnb-autocomplete')).toHaveClass(
        'dnb-autocomplete--medium'
      )
    })

    it('Expiry', () => {
      render(
        <Form.Theme size="medium">
          <Field.Expiry />
        </Form.Theme>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )
    })
  })
})
