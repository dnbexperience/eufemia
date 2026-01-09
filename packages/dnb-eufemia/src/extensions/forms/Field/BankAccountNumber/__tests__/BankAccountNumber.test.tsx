import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Props } from '..'
import type { Validator } from '../../..'
import { Field, Form } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('Field.BankAccountNumber', () => {
  it('should render with props', () => {
    const props: Props = {}

    render(<Field.BankAccountNumber {...props} />)

    const component = document.querySelector(
      '.dnb-forms-field-bank-account-number'
    )

    expect(component).toBeInTheDocument()
  })

  it('should have numeric input mode', () => {
    render(<Field.BankAccountNumber />)

    const input = document.querySelector('.dnb-input__input')

    expect(input).toHaveAttribute('inputmode', 'numeric')
  })

  it('should validate given function as onChangeValidator', async () => {
    const text = 'Custom Error message'
    const onChangeValidator = jest.fn((value) => {
      return value.length < 4 ? new Error(text) : undefined
    })

    render(
      <Field.BankAccountNumber
        value="123"
        required
        onChangeValidator={onChangeValidator}
        validateInitially
      />
    )

    await waitFor(() => {
      expect(onChangeValidator).toHaveBeenCalledTimes(1)
    })

    const element = document.querySelector('.dnb-form-status')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toBe(text)
  })

  describe('should validate Norwegian bank account numbers', () => {
    const validBankAccountNumbers = [
      '52440407897',
      '95260954211',
      '82823753868',
      '96564291851',
      '17598795908',
      '50098368482',
      '84665505803',
      '46531319389',
      '63024332596',
      '21368898233',
      '56818393720',
      '81441546262',
      '84995083166',
      '75579686812',
      '36780209733',
      '10279899704',
      '86624994878',
      '66376205151',
      '04060484878',
      '44643125789',
    ]

    const invalidBankAccountNumbers = [
      '12345678901',
      '10987654321',
      '98765432112',
      '00000000000',
    ]

    const invalidBankAccountNumbersTooShort = [
      '8662499487',
      '6637',
      '0',
      '4464312',
    ]

    it.each(validBankAccountNumbers)(
      'Valid bank account number: %s',
      async (bankAccountNo) => {
        render(
          <Form.Handler>
            <Field.BankAccountNumber
              value={bankAccountNo}
              validateInitially
            />
          </Form.Handler>
        )

        fireEvent.blur(document.querySelector('input'))

        await expect(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        }).toNeverResolve()
      }
    )

    it.each(invalidBankAccountNumbers)(
      'Invalid bank account number: %s',
      async (bankAccountNo) => {
        render(
          <Field.BankAccountNumber
            value={bankAccountNo}
            validateInitially
          />
        )

        fireEvent.blur(document.querySelector('input'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.BankAccountNumber.errorBankAccountNumber
          )
        })
      }
    )

    it.each(invalidBankAccountNumbersTooShort)(
      'Invalid bank account number: %s',
      async (bankAccountNo) => {
        render(
          <Field.BankAccountNumber
            value={bankAccountNo}
            validateInitially
          />
        )

        fireEvent.blur(document.querySelector('input'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.BankAccountNumber.errorBankAccountNumberLength
          )
        })
      }
    )
  })

  describe('should extend validation using custom validator', () => {
    const validBankAccountNumbersStartingWith1 = [
      '17598795908',
      '15323740221',
    ]

    const validBankAccountNumbersNotStartingWith1 = [
      '52440407897',
      '95260954211',
      '82823753868',
      '96564291851',
      '50098368482',
      '84665505803',
      '46531319389',
      '63024332596',
      '21368898233',
    ]

    const invalidBankAccountNumbers = [
      '12345678901',
      '10987654321',
      '98765432112',
    ]

    const invalidBankAccountNumbersTooShort = [
      '8662499487',
      '6637',
      '0',
      '4464312',
    ]

    const firstDigitIs1Validator = (value: string) => {
      if (value.substring(0, 1) !== '1') {
        return new Error('My error')
      }
    }

    const customValidator: Validator<string> = (value, { validators }) => {
      const { bankAccountNumberValidator } = validators

      return [bankAccountNumberValidator, firstDigitIs1Validator]
    }

    it.each(validBankAccountNumbersStartingWith1)(
      'Valid bank account number: %s',
      async (bankAccountNo) => {
        render(
          <Form.Handler>
            <Field.BankAccountNumber
              value={bankAccountNo}
              validateInitially
              onBlurValidator={customValidator}
            />
          </Form.Handler>
        )

        fireEvent.blur(document.querySelector('input'))

        await expect(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        }).toNeverResolve()
      }
    )

    it.each(validBankAccountNumbersNotStartingWith1)(
      'Invalid bank account number: %s',
      async (bankAccountNo) => {
        render(
          <Field.BankAccountNumber
            value={bankAccountNo}
            validateInitially
            onBlurValidator={customValidator}
          />
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent('My error')
        })
      }
    )

    it.each(invalidBankAccountNumbers)(
      'Invalid bank account number: %s',
      async (bankAccountNo) => {
        render(
          <Field.BankAccountNumber
            value={bankAccountNo}
            validateInitially
            onBlurValidator={customValidator}
          />
        )

        fireEvent.blur(document.querySelector('input'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.BankAccountNumber.errorBankAccountNumber
          )
        })
      }
    )

    it.each(invalidBankAccountNumbersTooShort)(
      'Invalid bank account number: %s',
      async (bankAccountNo) => {
        render(
          <Field.BankAccountNumber
            value={bankAccountNo}
            validateInitially
            onBlurValidator={customValidator}
          />
        )

        fireEvent.blur(document.querySelector('input'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.BankAccountNumber.errorBankAccountNumberLength
          )
        })
      }
    )
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.BankAccountNumber required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.BankAccountNumber required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.BankAccountNumber required validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('should validate continuously when validateContinuously is enabled', async () => {
    render(<Field.BankAccountNumber validateContinuously />)

    const input = document.querySelector('input')

    // Type invalid account number (too short) - error should appear during typing
    await userEvent.type(input, '12345')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(document.querySelector('[role="alert"]')).toHaveTextContent(
        nb.BankAccountNumber.errorBankAccountNumberLength
      )
    })

    // Type more digits to reach 11 - error should change to invalid checksum
    await userEvent.type(input, '678901')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(document.querySelector('[role="alert"]')).toHaveTextContent(
        nb.BankAccountNumber.errorBankAccountNumber
      )
    })

    // Type valid account number - error should disappear
    await userEvent.clear(input)
    await userEvent.type(input, '52440407897')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })
  })

  it('should call onStatusChange when validateContinuously reveals validation errors', async () => {
    const onStatusChange = jest.fn()

    render(
      <Field.BankAccountNumber
        onStatusChange={onStatusChange}
        validateContinuously
        required
      />
    )

    const input = document.querySelector('input')

    // Type invalid account number
    await userEvent.type(input, '12345')

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalled()
      expect(onStatusChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          error: expect.anything(),
        })
      )
    })

    // Clear mock to track new calls
    onStatusChange.mockClear()

    // Type valid account number
    await userEvent.clear(input)
    await userEvent.type(input, '52440407897')

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalled()
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: undefined,
      })
    })
  })

  it('should call onStatusChange when error prop changes without validateContinuously', async () => {
    const onStatusChange = jest.fn()
    const error1 = new Error('Error 1')
    const error2 = new Error('Error 2')

    const { rerender } = render(
      <Field.BankAccountNumber
        onStatusChange={onStatusChange}
        error={undefined}
      />
    )

    // Initially no error should be called
    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(0)
    })

    // Set error prop
    rerender(
      <Field.BankAccountNumber
        onStatusChange={onStatusChange}
        error={error1}
      />
    )

    // Wait for onStatusChange to be called with error
    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(1)
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: error1,
      })
    })

    // Change to different error
    rerender(
      <Field.BankAccountNumber
        onStatusChange={onStatusChange}
        error={error2}
      />
    )

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(2)
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: error2,
      })
    })

    // Clear error
    rerender(
      <Field.BankAccountNumber
        onStatusChange={onStatusChange}
        error={undefined}
      />
    )

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(3)
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: undefined,
      })
    })
  })
})
