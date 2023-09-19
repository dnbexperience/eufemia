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
})
