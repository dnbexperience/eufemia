import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Field from '../'

describe('Field.Expiry', () => {
  it('should return month, date raw and formatted values', async () => {
    const onChange = jest.fn()

    render(<Field.Expiry onChange={onChange} />)

    const input = document.querySelector('input')

    await userEvent.type(input, '1125')

    expect(onChange).toBeCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toEqual({
      formatted: '11/25',
      month: '11',
      raw: '1125',
      year: '25',
    })
  })

  it('should default to "dashes" placeholder', () => {
    render(<Field.Expiry />)

    const input = document.querySelector('input')
    const placeholder = document.querySelector('.dnb-input__placeholder')

    expect(input.getAttribute('aria-placeholder')).toEqual('-- / --')
    expect(placeholder.textContent).toEqual('-- / --')
  })

  it('should be able to change placeholders', async () => {
    const { rerender } = render(<Field.Expiry placeholder="letters" />)

    const input = document.querySelector('input')

    expect(input).toHaveAttribute('aria-placeholder', 'mm / yy')
    expect(input.nextSibling).toHaveTextContent('mm / yy')

    rerender(<Field.Expiry placeholder="spaces" />)

    expect(input).toHaveAttribute('aria-placeholder', '   /   ')
    expect(input.nextSibling.textContent).toEqual('   /   ')

    rerender(<Field.Expiry placeholder="none" />)

    expect(input).toHaveAttribute('aria-placeholder', '')
    expect(input.nextSibling).not.toBeInTheDocument()

    rerender(<Field.Expiry placeholder="dashes" />)

    expect(input.getAttribute('aria-placeholder')).toEqual('-- / --')
    expect(input.nextSibling).toHaveTextContent('-- / --')
  })
})
