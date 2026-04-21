import React from 'react'
import { render } from '@testing-library/react'
import { Form, Value } from '../../..'

describe('Value.PhoneNumber', () => {
  it('should use the provided label', () => {
    render(<Value.PhoneNumber label="Custom label" showEmpty />)

    const labelElement = document.querySelector(
      '.dnb-forms-value-block__label',
    )
    expect(labelElement.textContent).toBe('Custom label')
  })

  it('should not use the translation for the label if inline', () => {
    const { rerender } = render(<Value.PhoneNumber inline showEmpty />)

    expect(
      document.querySelector('.dnb-forms-value-block__label'),
    ).toBeNull()

    rerender(<Value.PhoneNumber showEmpty />)

    expect(
      document.querySelector('.dnb-forms-value-block__label'),
    ).toHaveTextContent('Mobilnummer')
  })

  it('should use the translation from the provider if not provided', () => {
    render(
      <Form.Handler
        translations={{
          'nb-NO': {
            PhoneNumber: { numberLabel: 'Custom' },
          },
        }}
      >
        <Value.PhoneNumber showEmpty />
      </Form.Handler>,
    )

    const labelElement = document.querySelector(
      '.dnb-forms-value-block__label',
    )
    expect(labelElement.textContent).toBe('Custom')
  })

  it('should format the value as a phone number', () => {
    render(<Value.PhoneNumber value="+4711223344" />)

    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).toHaveTextContent('+47 11 22 33 44')
  })

  it('does not render when value is null', () => {
    render(<Value.PhoneNumber value={null} />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).not.toBeInTheDocument()
  })

  it('does not render when value is undefined', () => {
    render(<Value.PhoneNumber value={undefined} />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).not.toBeInTheDocument()
  })

  describe('auto-detection of country code', () => {
    it('should format spaceless +47 value correctly', () => {
      render(<Value.PhoneNumber value="+4712345678" />)

      const element = document.querySelector('.dnb-forms-value-block')
      expect(element).toHaveTextContent('+47 12 34 56 78')
    })

    it('should format spaceless +46 value correctly', () => {
      render(<Value.PhoneNumber value="+46701234567" />)

      const element = document.querySelector('.dnb-forms-value-block')
      expect(element).toHaveTextContent('+46 70 12 34 56 7')
    })

    it('should format spaceless +1 value correctly', () => {
      render(<Value.PhoneNumber value="+12025551234" />)

      const element = document.querySelector('.dnb-forms-value-block')
      expect(element).toHaveTextContent('+1 20 25 55 12 34')
    })

    it('should format 00-prefixed value correctly', () => {
      render(<Value.PhoneNumber value="004712345678" />)

      const element = document.querySelector('.dnb-forms-value-block')
      expect(element).toHaveTextContent('+47 12 34 56 78')
    })

    it('should format space-separated values', () => {
      render(<Value.PhoneNumber value="+47 12345678" />)

      const element = document.querySelector('.dnb-forms-value-block')
      expect(element).toHaveTextContent('+47 12 34 56 78')
    })

    it('should format space-separated value with multiple spaces', () => {
      render(<Value.PhoneNumber value="+47 12 34 56 78" />)

      const element = document.querySelector('.dnb-forms-value-block')
      expect(element).toHaveTextContent('+47 12 34 56 78')
    })

    it('should display bare number without country code', () => {
      render(<Value.PhoneNumber value="12345678" />)

      const element = document.querySelector('.dnb-forms-value-block')
      expect(element).toHaveTextContent('12 34 56 78')
    })

    it('should format dashed CDC value correctly', () => {
      render(<Value.PhoneNumber value="+16841234567" />)

      const element = document.querySelector('.dnb-forms-value-block')
      expect(element).toHaveTextContent('+1 (684) 12 34 56 7')
    })
  })
})
