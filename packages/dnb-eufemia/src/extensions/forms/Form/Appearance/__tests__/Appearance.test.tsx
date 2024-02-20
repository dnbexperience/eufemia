import React from 'react'
import { render } from '@testing-library/react'
import { Form, Field } from '../../..'

describe('Form.Appearance', () => {
  describe('size', () => {
    it('String', () => {
      const { rerender } = render(
        <Form.Appearance size="medium">
          <Field.String />
        </Form.Appearance>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )

      rerender(
        <Form.Appearance size="large">
          <Field.String />
        </Form.Appearance>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--large'
      )
    })

    it('Number', () => {
      const { rerender } = render(
        <Form.Appearance size="medium">
          <Field.Number />
        </Form.Appearance>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )

      rerender(
        <Form.Appearance size="large">
          <Field.Number />
        </Form.Appearance>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--large'
      )
    })

    it('Date', () => {
      render(
        <Form.Appearance size="medium">
          <Field.Date />
        </Form.Appearance>
      )

      expect(document.querySelector('.dnb-date-picker')).toHaveClass(
        'dnb-date-picker--medium'
      )
    })

    it('Email', () => {
      render(
        <Form.Appearance size="medium">
          <Field.Email />
        </Form.Appearance>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )
    })

    it('Currency', () => {
      render(
        <Form.Appearance size="medium">
          <Field.Currency />
        </Form.Appearance>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )
    })

    it('NationalIdentityNumber', () => {
      render(
        <Form.Appearance size="medium">
          <Field.NationalIdentityNumber />
        </Form.Appearance>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )
    })

    it('OrganizationNumber', () => {
      render(
        <Form.Appearance size="medium">
          <Field.OrganizationNumber />
        </Form.Appearance>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )
    })

    it('Password', () => {
      render(
        <Form.Appearance size="medium">
          <Field.Password />
        </Form.Appearance>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )
    })

    it('PhoneNumber', () => {
      render(
        <Form.Appearance size="medium">
          <Field.PhoneNumber />
        </Form.Appearance>
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
        <Form.Appearance size="medium">
          <Field.PostalCodeAndCity postalCode={{}} city={{}} />
        </Form.Appearance>
      )

      const [postalCode, city] = Array.from(
        document.querySelectorAll('.dnb-input')
      )
      expect(postalCode).toHaveClass('dnb-input--medium')
      expect(city).toHaveClass('dnb-input--medium')
    })

    it('SelectCountry', () => {
      render(
        <Form.Appearance size="medium">
          <Field.SelectCountry />
        </Form.Appearance>
      )

      expect(document.querySelector('.dnb-autocomplete')).toHaveClass(
        'dnb-autocomplete--medium'
      )
    })

    it('Expiry', () => {
      render(
        <Form.Appearance size="medium">
          <Field.Expiry />
        </Form.Appearance>
      )

      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--medium'
      )
    })
  })
})
