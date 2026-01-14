import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from '../../../../../shared'
import DataContext from '../../../DataContext/Context'
import { Field, Form } from '../../../'

describe('Field.Currency', () => {
  it('defaults to "kr" and use "NOK" when locale is en-GB', () => {
    const { rerender } = render(
      <Provider>
        <Field.Currency value={123} />
      </Provider>
    )

    const input = document.querySelector('input')

    expect(input).toHaveValue('123 kr')

    rerender(
      <Provider locale="en-GB">
        <Field.Currency value={123} />
      </Provider>
    )

    expect(input).toHaveValue('123 NOK')
  })

  it('should align input correctly', () => {
    render(
      <>
        <Field.Currency value={123} align="left" />
        <Field.Currency value={123} align="center" />
        <Field.Currency value={123} align="right" />
      </>
    )

    const inputs = document.querySelectorAll('.dnb-input')
    expect(inputs[0]).toHaveClass('dnb-input__align--left')
    expect(inputs[1]).toHaveClass('dnb-input__align--center')
    expect(inputs[2]).toHaveClass('dnb-input__align--right')
  })

  it('should have decimal input mode', () => {
    render(<Field.Currency />)

    const input = document.querySelector('.dnb-input__input')

    expect(input).toHaveAttribute('inputmode', 'decimal')
  })

  it('should work with decimal limit 0', async () => {
    render(<Field.Currency decimalLimit={0} />)

    const input = document.querySelector('.dnb-input__input')

    expect(input).toHaveValue('')

    await userEvent.type(document.querySelector('input'), '1')

    expect(input).toHaveValue('1 kr')

    await userEvent.type(document.querySelector('input'), ',')

    expect(input).toHaveValue('1 kr')
  })

  it('should store "displayValue" in data context', async () => {
    let dataContext = null

    render(
      <Form.Handler>
        <Field.Currency path="/myValue" defaultValue={123} />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    const input = document.querySelector('input')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '123 kr',
      },
    })

    await userEvent.type(input, '4')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '1 234 kr',
      },
    })

    await userEvent.type(input, '{Backspace>5}')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
      },
    })
  })

  it('should render autoComplete when provided', () => {
    render(
      <Field.Currency value={123} autoComplete="transaction-amount" />
    )
    expect(
      document.querySelector('input').getAttribute('autocomplete')
    ).toBe('transaction-amount')
  })

  it('should be able to use a path to set the currency value', async () => {
    const { rerender } = render(
      <Form.Handler data={{ currency: 'SEK' }}>
        <Field.Currency currency="/currency" />
      </Form.Handler>
    )

    expect(document.querySelector('input')).toHaveAttribute(
      'aria-placeholder',
      'kr'
    )

    rerender(
      <Form.Handler data={{ currency: 'EUR' }}>
        <Field.Currency currency="/currency" />
      </Form.Handler>
    )

    expect(document.querySelector('input')).toHaveAttribute(
      'aria-placeholder',
      '€'
    )

    rerender(
      <Form.Handler data={{ currency: 'CHF' }}>
        <Field.Currency currency="/currency" />
      </Form.Handler>
    )

    expect(document.querySelector('input')).toHaveAttribute(
      'aria-placeholder',
      'CHF'
    )
  })

  it('should handle unsupported currency', () => {
    const log = jest.spyOn(console, 'log').mockImplementation()

    render(
      <Field.Currency
        value={123}
        // @ts-expect-error - Testing invalid currency prop for validation
        currency="invalid"
      />
    )

    expect(document.querySelector('input')).toHaveValue('123 invalid')
    expect(log).toHaveBeenCalledWith(
      expect.any(String),
      new RangeError('Invalid currency code : invalid')
    )

    log.mockRestore()
  })

  describe('currencyDisplay', () => {
    it('placeholder should use correct currency format', () => {
      const { rerender } = render(
        <Provider>
          <Field.Currency />
        </Provider>
      )

      expect(
        document.querySelector('.dnb-input__placeholder').textContent
      ).toBe('kr')

      rerender(
        <Provider locale="en-GB">
          <Field.Currency />
        </Provider>
      )

      expect(
        document.querySelector('.dnb-input__placeholder').textContent
      ).toBe('NOK')

      rerender(<Field.Currency currencyDisplay="name" />)

      expect(
        document.querySelector('.dnb-input__placeholder').textContent
      ).toBe('kroner')
    })

    it('should support "currencyDisplay"', () => {
      const { rerender } = render(
        <Provider>
          <Field.Currency value={1234} currencyDisplay="name" />
        </Provider>
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue('1 234 kroner')

      rerender(
        <Provider>
          <Field.Currency value={1} currencyDisplay="name" />
        </Provider>
      )

      expect(input).toHaveValue('1 krone')

      rerender(
        <Provider locale="en-GB">
          <Field.Currency value={1234} currencyDisplay="name" />
        </Provider>
      )

      expect(input).toHaveValue('1,234 kroner')

      rerender(
        <Provider locale="de-CH">
          <Field.Currency value={1234} currencyDisplay="name" />
        </Provider>
      )

      expect(input).toHaveValue('1’234 Kronen')

      rerender(
        <Provider>
          <Field.Currency
            value={1234}
            currency="SEK"
            currencyDisplay="name"
          />
        </Provider>
      )

      expect(input).toHaveValue('1 234 svenske kroner')
    })

    it('should place currency code before the amount', () => {
      const { rerender } = render(
        <Provider locale="en-GB">
          <Field.Currency value={1234} currencyDisplay="code" />
        </Provider>
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue('NOK 1,234')

      rerender(
        <Provider>
          <Field.Currency
            value={1234}
            currency="EUR"
            currencyDisplay="code"
          />
        </Provider>
      )

      expect(input).toHaveValue('EUR 1 234')
    })

    it('should hide the currency sign when currencyDisplay is false', () => {
      render(<Field.Currency value={1234} currencyDisplay={false} />)

      const input = document.querySelector('input')

      expect(input).toHaveValue('1 234')
      expect(input).not.toHaveValue('kr')
    })

    it('should support dynamic suffix and cursor position correction', async () => {
      render(<Field.Currency currencyDisplay="name" />)

      const input = document.querySelector('input')

      expect(input).toHaveValue('')
      expect(input).toHaveAttribute('aria-placeholder', 'kroner')

      await userEvent.type(input, '1')
      expect(input).toHaveValue('1 krone')
      expect(input.selectionStart).toBe(1)
      expect(input.selectionEnd).toBe(1)

      await userEvent.keyboard('{Backspace}')
      expect(input).toHaveValue('')

      await userEvent.type(input, '2')
      expect(input).toHaveValue('2 kroner')
      expect(input.selectionStart).toBe(1)
      expect(input.selectionEnd).toBe(1)
    })
  })

  describe('disallowLeadingZeroes', () => {
    it('should allow "0" as value', async () => {
      render(<Field.Currency disallowLeadingZeroes />)

      const input = document.querySelector('input')

      await userEvent.type(input, '0')

      expect(input).toHaveValue('0 kr')
    })

    it('should support decimal values', async () => {
      render(<Field.Currency disallowLeadingZeroes />)

      const input = document.querySelector('input')

      await userEvent.type(input, '0.1')

      expect(input).toHaveValue('0,1 kr')
    })

    it('should return correct onChange event value', async () => {
      const onChange = jest.fn()

      render(<Field.Currency disallowLeadingZeroes onChange={onChange} />)

      const input = document.querySelector('input')

      await userEvent.type(input, '0')

      expect(input).toHaveValue('0 kr')
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenNthCalledWith(1, 0, expect.anything())

      await userEvent.keyboard('10')

      expect(input).toHaveValue('10 kr')
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenNthCalledWith(2, 1, expect.anything())
      expect(onChange).toHaveBeenNthCalledWith(3, 10, expect.anything())

      await userEvent.keyboard('{Backspace>4}')

      expect(input).toHaveValue('')
      expect(onChange).toHaveBeenCalledTimes(5)
      expect(onChange).toHaveBeenNthCalledWith(4, 1, expect.anything())
      expect(onChange).toHaveBeenNthCalledWith(
        5,
        undefined,
        expect.anything()
      )

      await userEvent.keyboard('0.1')

      expect(input).toHaveValue('0,1 kr')
      expect(onChange).toHaveBeenCalledTimes(7)
      expect(onChange).toHaveBeenNthCalledWith(6, 0, expect.anything())
      expect(onChange).toHaveBeenNthCalledWith(7, 0.1, expect.anything())
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.Currency label="Label" required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.Currency required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.Currency required validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
