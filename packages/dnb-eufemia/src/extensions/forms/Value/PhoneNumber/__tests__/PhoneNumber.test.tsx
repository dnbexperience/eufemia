import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from '../../../../../shared'
import { Value } from '../../..'

describe('Value.PhoneNumber', () => {
  it('should use the provided label', () => {
    render(<Value.PhoneNumber label="Custom label" />)

    const labelElement = document.querySelector('label')
    expect(labelElement.textContent).toBe('Custom label')
  })

  it('should not use the translation for the label if inline', () => {
    const { rerender } = render(<Value.PhoneNumber inline />)

    expect(document.querySelector('label')).toBeNull()

    rerender(<Value.PhoneNumber />)

    expect(document.querySelector('label')).toHaveTextContent(
      'Mobilnummer'
    )
  })

  it('should use the translation from the provider if not provided', () => {
    render(
      <Provider
        locales={{
          'nb-NO': {
            Forms: { phoneNumberLabel: 'Custom' },
          },
        }}
      >
        <Value.PhoneNumber />
      </Provider>
    )

    const labelElement = document.querySelector('label')
    expect(labelElement.textContent).toBe('Custom')
  })

  it('should format the value as a phone number', async () => {
    render(<Value.PhoneNumber value="+47 11223344" />)

    const element = document.querySelector('.dnb-forms-value')
    expect(element).toHaveTextContent('0047 11 22 33 44')
  })
})
