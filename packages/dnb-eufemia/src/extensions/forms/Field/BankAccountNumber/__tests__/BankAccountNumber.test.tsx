import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { FieldBankAccountNumberProps } from '..'
import type { Validator } from '../../..'
import { Field, Form } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('Field.BankAccountNumber', () => {
  it('should render with props', () => {
    const props: FieldBankAccountNumberProps = {}

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

      return undefined
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

  describe('bankAccountType prop', () => {
    it('should default to numeric inputMode when no bankAccountType is given', () => {
      render(<Field.BankAccountNumber />)

      const input = document.querySelector('.dnb-input__input')
      expect(input).toHaveAttribute('inputmode', 'numeric')
    })

    it('should render omitMask for swedishBban', () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="swedishBban"
          value="50001234567"
          omitMask
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('50001234567')
    })

    it('should render omitMask for swedishBankgiro', () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="swedishBankgiro"
          value="59140129"
          omitMask
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('59140129')
    })

    it('should render omitMask for iban', () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="iban"
          value="NO9386011117947"
          omitMask
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('NO9386011117947')
    })

    it('should use text inputMode for IBAN', () => {
      render(<Field.BankAccountNumber bankAccountType="iban" />)

      const input = document.querySelector('.dnb-input__input')
      expect(input).toHaveAttribute('inputmode', 'text')
    })

    it('should use numeric inputMode for Swedish BBAN', () => {
      render(<Field.BankAccountNumber bankAccountType="swedishBban" />)

      const input = document.querySelector('.dnb-input__input')
      expect(input).toHaveAttribute('inputmode', 'numeric')
    })

    it('should use numeric inputMode for Swedish Bankgiro', () => {
      render(<Field.BankAccountNumber bankAccountType="swedishBankgiro" />)

      const input = document.querySelector('.dnb-input__input')
      expect(input).toHaveAttribute('inputmode', 'numeric')
    })

    it('should use numeric inputMode for Swedish Plusgiro', () => {
      render(<Field.BankAccountNumber bankAccountType="swedishPlusgiro" />)

      const input = document.querySelector('.dnb-input__input')
      expect(input).toHaveAttribute('inputmode', 'numeric')
    })

    it('should not validate non-norwegianBban types', async () => {
      render(
        <Form.Handler>
          <Field.BankAccountNumber
            bankAccountType="iban"
            value="NO9386011117947"
            validateInitially
          />
        </Form.Handler>
      )

      fireEvent.blur(document.querySelector('input'))

      await expect(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
      }).toNeverResolve()
    })

    it('should use default label for norwegianBban', () => {
      render(<Field.BankAccountNumber />)

      expect(document.querySelector('label')).toHaveTextContent(
        nb.BankAccountNumber.label
      )
    })

    it('should use IBAN label for iban type', () => {
      render(<Field.BankAccountNumber bankAccountType="iban" />)

      expect(document.querySelector('label')).toHaveTextContent(
        nb.BankAccountNumber.labelIban
      )
    })

    it('should use Swedish account number label for swedishBban type', () => {
      render(<Field.BankAccountNumber bankAccountType="swedishBban" />)

      expect(document.querySelector('label')).toHaveTextContent(
        nb.BankAccountNumber.labelSwedishBban
      )
    })

    it('should use Bankgiro label for swedishBankgiro type', () => {
      render(<Field.BankAccountNumber bankAccountType="swedishBankgiro" />)

      expect(document.querySelector('label')).toHaveTextContent(
        nb.BankAccountNumber.labelSwedishBankgiro
      )
    })

    it('should use Plusgiro label for swedishPlusgiro type', () => {
      render(<Field.BankAccountNumber bankAccountType="swedishPlusgiro" />)

      expect(document.querySelector('label')).toHaveTextContent(
        nb.BankAccountNumber.labelSwedishPlusgiro
      )
    })

    it('should allow overriding label via prop', () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="iban"
          label="Custom label"
        />
      )

      expect(document.querySelector('label')).toHaveTextContent(
        'Custom label'
      )
    })

    it('should preserve IBAN country code in value on blur', async () => {
      const onChange = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="iban"
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'CZ6508000000192000145399')
      fireEvent.blur(input)

      expect(onChange).toHaveBeenLastCalledWith('CZ6508000000192000145399')
      expect(input).toHaveValue('CZ65 0800 0000 1920 0014 5399')
    })

    it('should preserve IBAN country code when value is pre-filled', () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="iban"
          value="NO9386011117947"
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('NO93 8601 1117 947')
    })

    it('should preserve IBAN country code for German IBAN', async () => {
      const onChange = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="iban"
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'DE89370400440532013000')
      fireEvent.blur(input)

      expect(onChange).toHaveBeenLastCalledWith('DE89370400440532013000')
      expect(input).toHaveValue('DE89 3704 0044 0532 0130 00')
    })

    it('should preserve IBAN country code for British IBAN', async () => {
      const onChange = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="iban"
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'GB29NWBK60161331926819')
      fireEvent.blur(input)

      expect(onChange).toHaveBeenLastCalledWith('GB29NWBK60161331926819')
      expect(input).toHaveValue('GB29 NWBK 6016 1331 9268 19')
    })

    it('should handle IBAN with lowercase letters', async () => {
      const onChange = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="iban"
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'gb29nwbk60161331926819')
      fireEvent.blur(input)

      expect(onChange).toHaveBeenLastCalledWith('GB29NWBK60161331926819')
    })

    it('should call onChange with cleaned IBAN value without spaces', async () => {
      const onChange = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="iban"
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'SE4550000000058398257466')

      expect(onChange).toHaveBeenLastCalledWith('SE4550000000058398257466')
    })

    it('should format Norwegian IBAN correctly', () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="iban"
          value="NO9386011117947"
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('NO93 8601 1117 947')
    })

    it('should format long IBAN with letters in BBAN correctly', () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="iban"
          value="LC55HEMM000100010012001200023015"
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('LC55 HEMM 0001 0001 0012 0012 0002 3015')
    })

    it('should format British IBAN with letters in BBAN correctly', () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="iban"
          value="GB29NWBK60161331926819"
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('GB29 NWBK 6016 1331 9268 19')
    })
  })

  describe('formatting and onChange value for all bankAccountTypes', () => {
    it('should format norwegianBban on blur and return digits-only onChange', async () => {
      const onChange = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="norwegianBban"
          onChange={onChange}
          validate={false}
        />
      )

      const input = document.querySelector('input')
      await userEvent.type(input, '12345678901')
      fireEvent.blur(input)

      expect(onChange).toHaveBeenLastCalledWith('12345678901')
      expect(input).toHaveValue('1234 56 78901')
    })

    it('should format norwegianBban when pre-filled', () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="norwegianBban"
          value="12345678901"
          validate={false}
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('1234 56 78901')
    })

    it('should format swedishBban on blur and return digits-only onChange', async () => {
      const onChange = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="swedishBban"
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')
      await userEvent.type(input, '50001234567890')
      fireEvent.blur(input)

      expect(onChange).toHaveBeenLastCalledWith('50001234567890')
      expect(input).toHaveValue('5000-1234567890')
    })

    it('should format swedishBban when pre-filled', () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="swedishBban"
          value="50001234567890"
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('5000-1234567890')
    })

    it('should format swedishBankgiro on blur and return digits-only onChange', async () => {
      const onChange = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="swedishBankgiro"
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')
      await userEvent.type(input, '59140129')
      fireEvent.blur(input)

      expect(onChange).toHaveBeenLastCalledWith('59140129')
      await waitFor(() => {
        expect(input).toHaveValue('5914-0129')
      })
    })

    it('should format swedishPlusgiro on blur and return digits-only onChange', async () => {
      const onChange = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="swedishPlusgiro"
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')
      await userEvent.type(input, '1263664')
      fireEvent.blur(input)

      expect(onChange).toHaveBeenLastCalledWith('1263664')
      await waitFor(() => {
        expect(input).toHaveValue('126366-4')
      })
    })

    it('should format iban on blur and return alphanumeric-only onChange', async () => {
      const onChange = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="iban"
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'NO9386011117947')
      fireEvent.blur(input)

      expect(onChange).toHaveBeenLastCalledWith('NO9386011117947')
      expect(input).toHaveValue('NO93 8601 1117 947')
    })
  })

  describe('blur-based mask update for variable-length types', () => {
    it('should apply formatted mask for 8-digit Bankgiro on blur', async () => {
      render(<Field.BankAccountNumber bankAccountType="swedishBankgiro" />)

      const input = document.querySelector('input')
      await userEvent.type(input, '59140129')
      fireEvent.blur(input)

      await waitFor(() => {
        expect(input).toHaveValue('5914-0129')
      })
    })

    it('should apply formatted mask for 7-digit Bankgiro on blur', async () => {
      render(<Field.BankAccountNumber bankAccountType="swedishBankgiro" />)

      const input = document.querySelector('input')
      await userEvent.type(input, '5914012')
      fireEvent.blur(input)

      await waitFor(() => {
        expect(input).toHaveValue('591-4012')
      })
    })

    it('should allow adding an 8th digit to a 7-digit Bankgiro', async () => {
      const onChange = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="swedishBankgiro"
          value="5914012"
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('591-4012')

      await userEvent.type(input, '9')

      expect(onChange).toHaveBeenLastCalledWith('59140129')
    })

    it('should apply formatted mask for Plusgiro on blur', async () => {
      render(<Field.BankAccountNumber bankAccountType="swedishPlusgiro" />)

      const input = document.querySelector('input')
      await userEvent.type(input, '1263664')
      fireEvent.blur(input)

      await waitFor(() => {
        expect(input).toHaveValue('126366-4')
      })
    })

    it('should apply formatted mask for 2-digit Plusgiro on blur', async () => {
      render(<Field.BankAccountNumber bankAccountType="swedishPlusgiro" />)

      const input = document.querySelector('input')
      await userEvent.type(input, '12')
      fireEvent.blur(input)

      await waitFor(() => {
        expect(input).toHaveValue('1-2')
      })
    })

    it('should allow adding a digit to Plusgiro', async () => {
      const onChange = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="swedishPlusgiro"
          value="1263664"
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('126366-4')

      await userEvent.type(input, '1')

      expect(onChange).toHaveBeenLastCalledWith('12636641')
    })

    it('should show formatted mask when Bankgiro has pre-filled 7-digit value', () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="swedishBankgiro"
          value="5914012"
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('591-4012')
    })

    it('should show formatted mask when Bankgiro has pre-filled 8-digit value', () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="swedishBankgiro"
          value="59140129"
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('5914-0129')
    })

    it('should show formatted mask when Plusgiro has pre-filled value', () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="swedishPlusgiro"
          value="1263664"
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('126366-4')
    })

    it('should call onChange and onBlur callbacks', async () => {
      const onChange = jest.fn()
      const onBlur = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="swedishBankgiro"
          onChange={onChange}
          onBlur={onBlur}
        />
      )

      const input = document.querySelector('input')
      await userEvent.type(input, '59140129')
      fireEvent.blur(input)

      expect(onChange).toHaveBeenCalled()
      expect(onBlur).toHaveBeenCalledTimes(1)
    })

    it('should reposition dash on blur when Bankgiro grows from 7 to 8 digits', async () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="swedishBankgiro"
          defaultValue="5914012"
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('591-4012')

      await userEvent.type(input, '9')

      // During typing, dash stays at old position
      expect(input).toHaveValue('591-40129')

      fireEvent.blur(input)

      // On blur, dash moves to the 8-digit position
      await waitFor(() => {
        expect(input).toHaveValue('5914-0129')
      })
    })

    it('should reposition dash on blur when Plusgiro grows by a digit', async () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="swedishPlusgiro"
          defaultValue="1263664"
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('126366-4')

      await userEvent.type(input, '1')

      // During typing, dash stays at old position
      expect(input).toHaveValue('126366-41')

      fireEvent.blur(input)

      // On blur, dash moves before the new last digit
      await waitFor(() => {
        expect(input).toHaveValue('1263664-1')
      })
    })
  })

  describe('path-based values and data context', () => {
    it('should display formatted value from Form.Handler data for norwegianBban', () => {
      render(
        <Form.Handler data={{ myAccount: '12345678901' }}>
          <Field.BankAccountNumber path="/myAccount" validate={false} />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('1234 56 78901')
    })

    it('should display formatted value from Form.Handler data for iban', () => {
      render(
        <Form.Handler data={{ myIban: 'GB29NWBK60161331926819' }}>
          <Field.BankAccountNumber path="/myIban" bankAccountType="iban" />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('GB29 NWBK 6016 1331 9268 19')
    })

    it('should display formatted value from Form.Handler data for swedishBban', () => {
      render(
        <Form.Handler data={{ myAccount: '50001234567890' }}>
          <Field.BankAccountNumber
            path="/myAccount"
            bankAccountType="swedishBban"
          />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('5000-1234567890')
    })

    it('should submit clean value via Form.Handler onSubmit for iban', async () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.BankAccountNumber path="/iban" bankAccountType="iban" />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'DE89370400440532013000')
      fireEvent.blur(input)
      fireEvent.submit(input.closest('form'))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenCalledWith(
          { iban: 'DE89370400440532013000' },
          expect.anything()
        )
      })
    })

    it('should submit clean value via Form.Handler onSubmit for norwegianBban', async () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.BankAccountNumber path="/account" validate={false} />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      await userEvent.type(input, '12345678901')
      fireEvent.blur(input)
      fireEvent.submit(input.closest('form'))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenCalledWith(
          { account: '12345678901' },
          expect.anything()
        )
      })
    })

    it('should submit clean value via Form.Handler onSubmit for swedishBankgiro', async () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.BankAccountNumber
            path="/bankgiro"
            bankAccountType="swedishBankgiro"
          />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      await userEvent.type(input, '59140129')
      fireEvent.blur(input)
      fireEvent.submit(input.closest('form'))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenCalledWith(
          { bankgiro: '59140129' },
          expect.anything()
        )
      })
    })
  })

  describe('transformIn and transformOut', () => {
    it('should apply transformIn to display value for iban', () => {
      render(
        <Form.Handler data={{ iban: 'gb29nwbk60161331926819' }}>
          <Field.BankAccountNumber
            path="/iban"
            bankAccountType="iban"
            transformIn={(external) =>
              typeof external === 'string'
                ? external.toUpperCase()
                : (external as string)
            }
          />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('GB29 NWBK 6016 1331 9268 19')
    })

    it('should apply transformOut on submit for iban', async () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.BankAccountNumber
            path="/iban"
            bankAccountType="iban"
            transformOut={(internal) =>
              typeof internal === 'string'
                ? internal.toUpperCase()
                : internal
            }
          />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'gb29nwbk60161331926819')
      fireEvent.blur(input)
      fireEvent.submit(input.closest('form'))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenCalledWith(
          { iban: 'GB29NWBK60161331926819' },
          expect.anything()
        )
      })
    })

    it('should apply transformIn for norwegianBban with path', () => {
      render(
        <Form.Handler data={{ account: '12345678901' }}>
          <Field.BankAccountNumber
            path="/account"
            validate={false}
            transformIn={(external) =>
              typeof external === 'string'
                ? external.slice(0, 11)
                : (external as string)
            }
          />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('1234 56 78901')
    })
  })

  describe('edge cases', () => {
    it('should handle empty value', () => {
      render(<Field.BankAccountNumber bankAccountType="iban" value="" />)

      const input = document.querySelector('input')
      expect(input).toHaveValue('')
    })

    it('should handle undefined value', () => {
      render(
        <Field.BankAccountNumber
          bankAccountType="iban"
          value={undefined}
        />
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('')
    })

    it('should handle clearing the input for iban', async () => {
      const onChange = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="iban"
          value="NO9386011117947"
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')
      await userEvent.clear(input)

      expect(onChange).toHaveBeenLastCalledWith(undefined)
    })

    it('should handle clearing the input for norwegianBban', async () => {
      const onChange = jest.fn()

      render(
        <Field.BankAccountNumber
          bankAccountType="norwegianBban"
          value="12345678901"
          validate={false}
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')
      await userEvent.clear(input)

      expect(onChange).toHaveBeenLastCalledWith(undefined)
    })
  })
})
