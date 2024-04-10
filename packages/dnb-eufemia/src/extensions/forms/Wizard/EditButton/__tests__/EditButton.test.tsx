import React from 'react'
import { render } from '@testing-library/react'
import EditButton from '../EditButton'
import { Provider } from '../../../../../shared'

describe('EditButton', () => {
  it('should have default text', () => {
    render(<EditButton />)

    const button = document.querySelector('.dnb-forms-edit-button')

    expect(button).toHaveTextContent('Endre')
  })

  it('should use en-GB text', () => {
    render(
      <Provider locale="en-GB">
        <EditButton />
      </Provider>
    )

    const button = document.querySelector('.dnb-forms-edit-button')

    expect(button).toHaveTextContent('Edit')
  })

  it('should support custom text', () => {
    render(<EditButton text="Custom" />)

    const button = document.querySelector('.dnb-forms-edit-button')

    expect(button).toHaveTextContent('Custom')
  })

  it('should be tertiary variant', () => {
    render(<EditButton />)

    const button = document.querySelector('.dnb-forms-edit-button')

    expect(button).toHaveClass('dnb-button--tertiary')
  })

  it('should have edit left icon', () => {
    render(<EditButton />)

    const button = document.querySelector('.dnb-forms-edit-button')

    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'edit icon'
    )
  })
})
