import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'
import { Provider } from '../../../../../shared'

describe('Value.Date', () => {
  describe('props', () => {
    it('should render value', () => {
      render(<Value.Date value="2023-01-16" />)
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('16. januar 2023')
    })

    it('should render without value', () => {
      expect(() => render(<Value.Date />)).not.toThrow()

      render(<Value.Date />)
      expect(document.body.textContent).toBe('')
    })

    it('should render label when showEmpty is true', () => {
      const { rerender } = render(
        <Value.Date label="Date label" showEmpty />
      )
      expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
        'Date label'
      )

      rerender(<Value.Date label="Date label" />)
      expect(document.querySelector('.dnb-form-label')).toBeNull()
    })

    it('should render value and label', () => {
      render(<Value.Date label="Label" value="2023-01-16" />)
      expect(
        document.querySelector('.dnb-forms-value-block__content')
      ).toHaveTextContent('16. januar 2023')
      expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
        'Label'
      )
    })

    it('should render placeholder', () => {
      render(<Value.Date placeholder="Enter some number" />)
      expect(screen.getByText('Enter some number')).toBeInTheDocument()
    })

    it('should render gets value based on path', () => {
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
      render(<Value.Date value="2024-09-01" variant="numeric" />)

      expect(
        document.querySelector('.dnb-forms-value-block__content')
      ).toHaveTextContent('01.09.2024')
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

    it('should support date range values', () => {
      const { rerender } = render(
        <Value.Date value="2024-09-01|2024-09-30" variant="numeric" />
      )

      const valueBlock = document.querySelector(
        '.dnb-forms-value-block__content'
      )

      expect(valueBlock).toHaveTextContent('01.09.2024–30.09.2024')

      rerender(
        <Value.Date value="2024-09-01|2024-09-30" variant="short" />
      )

      expect(valueBlock).toHaveTextContent('1.–30. sep. 2024')

      rerender(<Value.Date value="2024-09-01|2024-09-30" variant="long" />)

      expect(valueBlock).toHaveTextContent('1.–30. september 2024')
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

    describe('dateFormat', () => {
      it('formats with custom dateFormat dd/MM/yyyy', () => {
        render(<Value.Date value="2023-01-16" dateFormat="dd/MM/yyyy" />)

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16/01/2023')
      })

      it('formats with custom dateFormat MM/dd/yyyy', () => {
        render(<Value.Date value="2023-01-16" dateFormat="MM/dd/yyyy" />)

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('01/16/2023')
      })

      it('formats with custom dateFormat yyyy-MM-dd', () => {
        render(<Value.Date value="2023-01-16" dateFormat="yyyy-MM-dd" />)

        // yyyy-MM-dd is the DEFAULT_DATE_FORMAT, so custom formatting is not applied
        // It falls back to the default locale formatting
        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16. januar 2023')
      })

      it('formats with custom dateFormat dd-MM-yyyy', () => {
        render(<Value.Date value="2023-01-16" dateFormat="dd-MM-yyyy" />)

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16-01-2023')
      })

      it('formats with custom dateFormat d/M/yyyy (single digits)', () => {
        render(<Value.Date value="2023-01-16" dateFormat="d/M/yyyy" />)

        // The formatCustomDate function only handles yyyy, MM, dd patterns
        // Single digit patterns (d, M) are not replaced, so they remain as-is
        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('d/M/2023')
      })

      it('formats with custom dateFormat dd/MM/yy (two digit year)', () => {
        render(<Value.Date value="2023-01-16" dateFormat="dd/MM/yy" />)

        // The formatCustomDate function only handles yyyy, MM, dd patterns
        // Two digit year pattern (yy) is not replaced, so it remains as-is
        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16/01/yy')
      })

      it('should handle invalid date gracefully', () => {
        render(<Value.Date value="invalid-date" dateFormat="dd/MM/yyyy" />)

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('invalid-date')
      })

      it('should handle empty value with dateFormat', () => {
        render(<Value.Date value="" dateFormat="dd/MM/yyyy" />)

        expect(document.body.textContent).toBe('')
      })

      it('should handle null value with dateFormat', () => {
        render(<Value.Date value={null} dateFormat="dd/MM/yyyy" />)

        expect(document.body.textContent).toBe('')
      })

      it('should handle undefined value with dateFormat', () => {
        render(<Value.Date value={undefined} dateFormat="dd/MM/yyyy" />)

        expect(document.body.textContent).toBe('')
      })

      it('formats with custom dateFormat and range values', () => {
        render(
          <Value.Date
            value="2024-09-01|2024-09-30"
            dateFormat="dd/MM/yyyy"
          />
        )

        // Range values fall back to default formatting, not custom dateFormat
        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('1.–30. september 2024')
      })

      it('formats with custom dateFormat and different locale', () => {
        render(
          <Value.Date
            value="2023-01-16"
            dateFormat="dd/MM/yyyy"
            locale="en-GB"
          />
        )

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16/01/2023')
      })

      it('formats with custom dateFormat and Form.Handler locale', () => {
        render(
          <Form.Handler locale="en-GB">
            <Value.Date value="2023-01-16" dateFormat="dd/MM/yyyy" />
          </Form.Handler>
        )

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16/01/2023')
      })

      it('formats with custom dateFormat and shared context locale', () => {
        render(
          <Provider locale="en-GB">
            <Value.Date value="2023-01-16" dateFormat="dd/MM/yyyy" />
          </Provider>
        )

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16/01/2023')
      })

      it('formats with custom dateFormat and label', () => {
        render(
          <Value.Date
            value="2023-01-16"
            dateFormat="dd/MM/yyyy"
            label="Custom Date"
          />
        )

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16/01/2023')
        expect(
          document.querySelector('.dnb-form-label')
        ).toHaveTextContent('Custom Date')
      })

      it('formats with custom dateFormat and placeholder', () => {
        render(
          <Value.Date
            value=""
            dateFormat="dd/MM/yyyy"
            placeholder="No date selected"
          />
        )

        expect(screen.getByText('No date selected')).toBeInTheDocument()
      })

      it('formats with custom dateFormat and showEmpty', () => {
        render(
          <Value.Date
            value=""
            dateFormat="dd/MM/yyyy"
            label="Date Label"
            showEmpty
          />
        )

        expect(
          document.querySelector('.dnb-form-label')
        ).toHaveTextContent('Date Label')
        expect(document.body.textContent).toBe('Date Label')
      })

      it('formats with custom dateFormat and gets value from path', () => {
        render(
          <Form.Handler data={{ myDate: '2023-01-16' }}>
            <Value.Date path="/myDate" dateFormat="dd/MM/yyyy" />
          </Form.Handler>
        )

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16/01/2023')
      })

      it('formats with custom dateFormat and variant (dateFormat takes precedence)', () => {
        render(
          <Value.Date
            value="2023-01-16"
            dateFormat="dd/MM/yyyy"
            variant="short"
          />
        )

        // dateFormat should take precedence over variant
        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16/01/2023')
      })

      it('formats with complex custom dateFormat', () => {
        render(
          <Value.Date value="2023-01-16" dateFormat="dd-MM-yyyy (EEEE)" />
        )

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16-01-2023 (EEEE)')
      })

      it('formats with custom dateFormat containing only year', () => {
        render(<Value.Date value="2023-01-16" dateFormat="yyyy" />)

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('2023')
      })

      it('formats with custom dateFormat containing only month', () => {
        render(<Value.Date value="2023-01-16" dateFormat="MM" />)

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('01')
      })

      it('formats with custom dateFormat containing only day', () => {
        render(<Value.Date value="2023-01-16" dateFormat="dd" />)

        expect(
          document.querySelector('.dnb-forms-value-block__content')
        ).toHaveTextContent('16')
      })
    })
  })
})
