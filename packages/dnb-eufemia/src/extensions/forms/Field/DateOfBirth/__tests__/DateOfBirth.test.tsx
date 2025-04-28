import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import { Field } from '../../..'
// import nbNO from '../../../constants/locales/nb-NO'

// const nb = nbNO['nb-NO']

describe('Field.DateOfBirth', () => {
  describe('Day', () => {
    it('should have autoComplete value bday-day', () => {
      render(<Field.DateOfBirth />)
      expect(
        document
          .querySelector('.dnb-forms-field-date-of-birth__day input')
          .getAttribute('autocomplete')
      ).toBe('bday-day')
    })
  })

  describe('Month', () => {
    it('should have autoComplete value bday-month', () => {
      render(<Field.DateOfBirth />)
      expect(
        document
          .querySelector('.dnb-forms-field-date-of-birth__month input')
          .getAttribute('autocomplete')
      ).toBe('bday-month')
    })
  })

  describe('Year', () => {
    it('should have autoComplete value bday-year', () => {
      render(<Field.DateOfBirth />)
      expect(
        document
          .querySelector('.dnb-forms-field-date-of-birth__year input')
          .getAttribute('autocomplete')
      ).toBe('bday-year')
    })
  })

  describe.skip('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.DateOfBirth required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.DateOfBirth required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.DateOfBirth required validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
