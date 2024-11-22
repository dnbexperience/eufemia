import React from 'react'
import { render } from '@testing-library/react'
import { Form } from '../../..'

describe('Form.Card', () => {
  it('should have constant of _supportsSpacingProps', () => {
    expect(Form.Card['_supportsSpacingProps']).toBe(true)
  })

  it('should set "outset" by default', () => {
    const { rerender } = render(<Form.Card />)

    const element = document.querySelector('.dnb-card')

    expect(element).toHaveStyle('--outset--small: 0')
    expect(element).toHaveStyle('--outset--medium: 1')
    expect(element).toHaveStyle('--outset--large: 1')

    rerender(
      <Form.Card
        outset={{
          small: true,
          medium: false,
          large: false,
        }}
      />
    )

    expect(element).toHaveStyle('--outset--small: 1')
    expect(element).toHaveStyle('--outset--medium: 0')
    expect(element).toHaveStyle('--outset--large: 0')

    rerender(<Form.Card outset={false} />)

    expect(element).toHaveStyle('--outset--small: 0')
    expect(element).toHaveStyle('--outset--medium: 0')
    expect(element).toHaveStyle('--outset--large: 0')
  })

  it('should set "stack" by default', () => {
    const { rerender } = render(<Form.Card />)

    {
      const element = document.querySelector('.dnb-card')
      const container = element.querySelector('.dnb-flex-container')

      expect(element).toHaveClass('dnb-flex-item--align-self-stretch')
      expect(container).toHaveClass('dnb-flex-container--align-stretch')
      expect(container).toHaveClass(
        'dnb-flex-container--align-self-stretch'
      )
      expect(container).toHaveClass('dnb-flex-container--spacing-medium')
    }

    rerender(<Form.Card stack={false} />)

    {
      const element = document.querySelector('.dnb-card')
      const container = element.querySelector('.dnb-flex-container')

      expect(element).toHaveClass('dnb-flex-item--align-self-stretch')
      expect(container).not.toHaveClass(
        'dnb-flex-container--align-stretch'
      )
      expect(container).toHaveClass(
        'dnb-flex-container--align-self-stretch'
      )
      expect(container).not.toHaveClass(
        'dnb-flex-container--spacing-medium'
      )
    }
  })
})
