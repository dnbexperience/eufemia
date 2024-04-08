import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'
import { Provider } from '../../../../../shared'

describe('Value.Number', () => {
  describe('props', () => {
    it('renders value', () => {
      render(<Value.Number value={42} />)
      expect(
        document.querySelector('.dnb-forms-value-number')
      ).toHaveTextContent('42')
    })

    it('renders label when showEmpty is true', () => {
      const { rerender } = render(
        <Value.Number label="Number label" showEmpty />
      )
      expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
        'Number label'
      )

      rerender(<Value.Number label="Number label" />)
      expect(document.querySelector('.dnb-form-label')).toBeNull()
    })

    it('renders value and label', () => {
      render(<Value.Number label="Label" value={42} />)
      expect(
        document.querySelector('.dnb-forms-value-number')
      ).toHaveTextContent('42')
      expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
        'Label'
      )
    })

    it('renders placeholder', () => {
      render(<Value.Number placeholder="Enter some number" />)
      expect(screen.getByText('Enter some number')).toBeInTheDocument()
    })

    it('formats number', () => {
      render(<Value.Number value={-12345678} />)

      expect(
        document.querySelector('.dnb-forms-value-number')
      ).toHaveTextContent('-12 345 678')
    })

    it('renders gets value based on path', () => {
      render(
        <Form.Handler data={{ myNumber: 1234 }}>
          <Value.Number path="/myNumber" />
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-forms-value-number')
      ).toHaveTextContent('1 234')
    })

    it('formats with percent', () => {
      render(<Value.Number value={-12345} percent />)

      expect(
        document.querySelector('.dnb-forms-value-number')
      ).toHaveTextContent('−12 345 %')
    })

    it('formats with percent and decimals', () => {
      render(<Value.Number value={-12345.6789} percent decimals={2} />)

      expect(
        document.querySelector('.dnb-forms-value-number')
      ).toHaveTextContent('−12 345,68 %')
    })

    it('formats with currency and currencyDisplay', () => {
      render(
        <Value.Number
          value={-12345.6789}
          currency
          currencyPosition="before"
          currencyDisplay="code"
        />
      )

      expect(
        document.querySelector('.dnb-forms-value-number')
      ).toHaveTextContent('NOK −12 345,68')
    })

    it('formats currency with aria version', () => {
      render(
        <Value.Number
          value={-12345.6789}
          currency
          currencyPosition="before"
          currencyDisplay="code"
        />
      )

      expect(
        document
          .querySelector('.dnb-number-format .dnb-sr-only')
          .getAttribute('data-text')
      ).toBe('-12 345,68 kroner')
    })

    it('formats with different locale', () => {
      const { rerender } = render(
        <Provider locale="en-GB">
          <Value.Number
            value={-12345.6789}
            currency
            currencyPosition="before"
            currencyDisplay="name"
          />
        </Provider>
      )

      expect(
        document.querySelector('.dnb-forms-value-number')
      ).toHaveTextContent('kroner -12 345.68')
      expect(
        document
          .querySelector('.dnb-number-format .dnb-sr-only')
          .getAttribute('data-text')
      ).toBe('-12 345.68 kroner')

      rerender(
        <Provider locale="en-GB">
          <Value.Number
            value={-12345.6789}
            currency="SEK"
            currencyPosition="before"
            currencyDisplay="name"
          />
        </Provider>
      )

      expect(
        document.querySelector('.dnb-forms-value-number')
      ).toHaveTextContent('Swedish kronor -12 345.68')
      expect(
        document
          .querySelector('.dnb-number-format .dnb-sr-only')
          .getAttribute('data-text')
      ).toBe('-12 345.68 Swedish kronor')
    })
  })
})
