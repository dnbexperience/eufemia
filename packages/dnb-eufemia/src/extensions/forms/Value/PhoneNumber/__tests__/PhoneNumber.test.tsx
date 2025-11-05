import React from 'react'
import { render } from '@testing-library/react'
import { Form, Value } from '../../..'

describe('Value.PhoneNumber', () => {
  it('should use the provided label', () => {
    render(<Value.PhoneNumber label="Custom label" showEmpty />)

    const labelElement = document.querySelector(
      '.dnb-forms-value-block__label'
    )
    expect(labelElement.textContent).toBe('Custom label')
  })

  it('should not use the translation for the label if inline', () => {
    const { rerender } = render(<Value.PhoneNumber inline showEmpty />)

    expect(
      document.querySelector('.dnb-forms-value-block__label')
    ).toBeNull()

    rerender(<Value.PhoneNumber showEmpty />)

    expect(
      document.querySelector('.dnb-forms-value-block__label')
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
      </Form.Handler>
    )

    const labelElement = document.querySelector(
      '.dnb-forms-value-block__label'
    )
    expect(labelElement.textContent).toBe('Custom')
  })

  it('should format the value as a phone number', () => {
    render(<Value.PhoneNumber value="+47 11223344" />)

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
})
