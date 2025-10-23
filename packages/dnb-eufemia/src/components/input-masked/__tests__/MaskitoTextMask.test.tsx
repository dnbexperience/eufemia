import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import MaskitoTextMask from '../MaskitoTextMask'

// Simple test to verify MaskitoTextMask works
describe('MaskitoTextMask', () => {
  it('should render and handle basic input', () => {
    const handleChange = jest.fn()

    render(
      <MaskitoTextMask
        mask={[
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
        onChange={handleChange}
        placeholder="Phone number"
      />
    )

    const input = screen.getByPlaceholderText('Phone number')
    expect(input).toBeInTheDocument()

    // Test basic input
    fireEvent.change(input, { target: { value: '1234567890' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('should handle number mask', () => {
    const handleChange = jest.fn()

    // Create a simple number mask
    const numberMask = {
      instanceOf: 'createNumberMask',
      maskParams: {
        prefix: '',
        suffix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ' ',
        allowDecimal: true,
        decimalSymbol: ',',
        decimalLimit: 2,
      },
    }

    render(
      <MaskitoTextMask
        mask={numberMask}
        onChange={handleChange}
        placeholder="Number"
      />
    )

    const input = screen.getByPlaceholderText('Number')
    expect(input).toBeInTheDocument()
  })

  it('should handle empty mask', () => {
    const handleChange = jest.fn()

    render(
      <MaskitoTextMask
        mask={false}
        onChange={handleChange}
        placeholder="No mask"
      />
    )

    const input = screen.getByPlaceholderText('No mask')
    expect(input).toBeInTheDocument()
  })
})
