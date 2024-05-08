import React from 'react'
import { render } from '@testing-library/react'
import { Form, Value } from '../../..'

describe('Value.PhoneNumber', () => {
  it('should use the provided label', () => {
    render(<Value.PhoneNumber label="Custom label" />)

    const labelElement = document.querySelector(
      '.dnb-forms-value-block__label'
    )
    expect(labelElement.textContent).toBe('Custom label')
  })

  it('should not use the translation for the label if inline', () => {
    const { rerender } = render(<Value.PhoneNumber inline />)

    expect(
      document.querySelector('.dnb-forms-value-block__label')
    ).toBeNull()

    rerender(<Value.PhoneNumber />)

    expect(
      document.querySelector('.dnb-forms-value-block__label')
    ).toHaveTextContent('Mobilnummer')
  })

  it('should use the translation from the provider if not provided', () => {
    render(
      <Form.Handler
        translations={{
          'nb-NO': {
            PhoneNumber: { label: 'Custom' },
          },
        }}
      >
        <Value.PhoneNumber />
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
    expect(element).toHaveTextContent('0047 11 22 33 44')
  })
})
