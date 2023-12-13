import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import NationalIdentityNumber, { Props } from '..'
import { Form, FormError } from '../../..'

describe('Field.NationalIdentityNumber', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<NationalIdentityNumber {...props} />)
  })

  it('should have correct mask', () => {
    const { rerender } = render(
      <NationalIdentityNumber value="12345678901234567890" />
    )

    const inputElement = document.querySelector('input')
    expect(inputElement.value).toBe('123456 78901')

    rerender(
      <NationalIdentityNumber omitMask value="12345678901234567890" />
    )

    expect(inputElement.value).toBe('12345678901')
  })

  it('should validate when required', () => {
    render(
      <Form.Handler>
        <NationalIdentityNumber required />
        <Form.SubmitButton />
      </Form.Handler>
    )

    const buttonElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-submit-button'
    )

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    fireEvent.click(buttonElement)

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
  })

  it('should execute validateInitially if required', () => {
    const { rerender } = render(
      <NationalIdentityNumber required validateInitially />
    )

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()

    rerender(<NationalIdentityNumber validateInitially />)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  it('should validate given function', async () => {
    const text = 'Custom Error message'
    const validator = jest.fn((value) => {
      return value.length < 4 ? new FormError(text) : undefined
    })

    render(
      <NationalIdentityNumber
        value="123"
        required
        validator={validator}
        validateInitially
      />
    )

    await waitFor(() => {
      expect(validator).toHaveBeenCalledTimes(1)
    })

    const element = document.querySelector('.dnb-form-status')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toBe(text)
  })

  it('should contain errorMessages as second parameter', () => {
    const validator = jest.fn()

    render(
      <NationalIdentityNumber
        value="123"
        required
        validator={validator}
        validateInitially
      />
    )

    expect(validator).toHaveBeenCalledTimes(1)
    expect(validator).toHaveBeenCalledWith('123', {
      maxLength: expect.stringContaining('{maxLength}'),
      minLength: expect.stringContaining('{minLength}'),
      pattern: expect.stringContaining('11'),
      required: expect.stringContaining('11'),
    })
  })
})
