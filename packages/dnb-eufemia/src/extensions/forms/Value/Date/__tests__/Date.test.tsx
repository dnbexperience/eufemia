import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'
import { Provider } from '../../../../../shared'

describe('Value.Date', () => {
  describe('props', () => {
    it('renders value', () => {
      render(<Value.Date value="2023-01-16" />)
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('16. januar 2023')
    })

    it('renders without value', () => {
      expect(() => render(<Value.Date />)).not.toThrow()

      render(<Value.Date />)
      expect(document.body.textContent).toBe('')
    })

    it('renders label when showEmpty is true', () => {
      const { rerender } = render(
        <Value.Date label="Date label" showEmpty />
      )
      expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
        'Date label'
      )

      rerender(<Value.Date label="Date label" />)
      expect(document.querySelector('.dnb-form-label')).toBeNull()
    })

    it('renders value and label', () => {
      render(<Value.Date label="Label" value="2023-01-16" />)
      expect(
        document.querySelector('.dnb-forms-value-block__content')
      ).toHaveTextContent('16. januar 2023')
      expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
        'Label'
      )
    })

    it('renders placeholder', () => {
      render(<Value.Date placeholder="Enter some number" />)
      expect(screen.getByText('Enter some number')).toBeInTheDocument()
    })

    it('renders gets value based on path', () => {
      render(
        <Form.Handler data={{ myDate: '2023-01-16' }}>
          <Value.Date path="/myDate" />
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-forms-value-block__content')
      ).toHaveTextContent('16. januar 2023')
    })

    it('formats with variant="short"', () => {
      render(<Value.Date value="2023-01-16" variant="short" />)

      expect(
        document.querySelector('.dnb-forms-value-block__content')
      ).toHaveTextContent('16. jan. 2023')
    })

    it('formats with variant="numeric"', () => {
      render(<Value.Date value="2023-01-16" variant="numeric" />)

      expect(
        document.querySelector('.dnb-forms-value-block__content')
      ).toHaveTextContent('16.1.2023')
    })

    it('should fall back to "toLocaleString" if "Intl" is not available', () => {
      const intlBackup = globalThis.Intl
      delete globalThis.Intl

      render(<Value.Date value="2023-01-16" />)

      expect(
        document.querySelector('.dnb-forms-value-block__content')
      ).toHaveTextContent('16. januar 2023')
      expect(window.Intl).toBeUndefined()

      globalThis.Intl = intlBackup
    })

    describe('formats with different locale', () => {
      it('given as prop', () => {
        render(<Value.Date value="2023-01-16" locale="en-GB" />)

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16 January 2023')
      })

      it('formats with variant="short"', () => {
        render(
          <Value.Date value="2023-01-16" variant="short" locale="en-GB" />
        )

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16 Jan 2023')
      })

      it('given by the Form.Handler context', () => {
        render(
          <Form.Handler locale="en-GB">
            <Value.Date value="2023-01-16" />
          </Form.Handler>
        )

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16 January 2023')
      })

      it('given by the shared context', () => {
        render(
          <Provider locale="en-GB">
            <Value.Date value="2023-01-16" />
          </Provider>
        )

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16 January 2023')
      })
    })
  })
})
