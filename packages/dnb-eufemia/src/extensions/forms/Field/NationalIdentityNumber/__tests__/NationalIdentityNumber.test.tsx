import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import type { FieldNationalIdentityNumberProps } from '..'
import type { Validator } from '../../..'
import { Field, Form } from '../../..'
import { validateDnrAndFnr } from '../validators'
import { axeComponent } from '../../../../../core/test-utils/testSetup'
import nbNO from '../../../constants/locales/nb-NO'
import userEvent from '@testing-library/user-event'

const nb = nbNO['nb-NO']

describe('Field.NationalIdentityNumber', () => {
  it('should render with props', () => {
    const props: FieldNationalIdentityNumberProps = {}
    render(<Field.NationalIdentityNumber {...props} />)

    expect(document.querySelector('input')).toBeInTheDocument()
  })

  it('should have correct mask', () => {
    const { rerender } = render(
      <Field.NationalIdentityNumber value="16120101181" />
    )

    const inputElement = document.querySelector('input')
    expect(inputElement.value).toBe('161201 01181')

    rerender(<Field.NationalIdentityNumber omitMask value="16120101181" />)

    expect(inputElement.value).toBe('16120101181')
  })

  it('should allow typing beyond the mask length', async () => {
    render(<Field.NationalIdentityNumber />)

    const inputElement = document.querySelector('input')
    await userEvent.type(inputElement, '123456789012345')

    expect(inputElement.value).toBe('123456 789012345')
  })

  it('should validate when required', () => {
    render(
      <Form.Handler>
        <Field.NationalIdentityNumber required />
        <Form.SubmitButton />
      </Form.Handler>
    )

    const buttonElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-submit-button'
    )

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    fireEvent.click(buttonElement)

    expect(screen.queryByRole('alert')).toBeInTheDocument()
  })

  it('should validate "required"', async () => {
    render(<Field.NationalIdentityNumber required validateInitially />)

    expect(screen.queryByRole('alert')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).toHaveTextContent(
      nb.NationalIdentityNumber.errorRequired
    )
  })

  it('should validate internal validator', async () => {
    const { rerender } = render(
      <Field.NationalIdentityNumber
        validateInitially
        pattern=".*"
        value="123"
      />
    )

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        nb.NationalIdentityNumber.errorFnrLength
      )
    })

    rerender(
      <Field.NationalIdentityNumber
        validateInitially
        pattern=".*"
        value="456"
      />
    )

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        nb.NationalIdentityNumber.errorDnrLength
      )
    })
  })

  it('should support custom pattern', async () => {
    render(
      <Form.Handler>
        <Field.NationalIdentityNumber
          validateInitially
          value="58081633086" // valid, but not in the pattern
          pattern="^6"
        />
      </Form.Handler>
    )

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert').textContent).toBe(
        nb.NationalIdentityNumber.errorFnr
      )
    })
  })

  it('should support custom pattern without validator', async () => {
    const dummyValidator = vi.fn()

    render(
      <Form.Handler>
        <Field.NationalIdentityNumber
          validateInitially
          value="6"
          pattern="^6"
          onBlurValidator={() => {
            return [dummyValidator]
          }}
        />
      </Form.Handler>
    )

    await expect(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    }).toNeverResolve()

    expect(dummyValidator).toHaveBeenCalledTimes(1)
    expect(dummyValidator).toHaveBeenCalledWith('6', expect.anything())
  })

  it('should validate given function as onChangeValidator', async () => {
    const text = 'Custom Error message'
    const onChangeValidator = vi.fn((value) => {
      return value.length < 4 ? new Error(text) : undefined
    })

    render(
      <Field.NationalIdentityNumber
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

  it('should contain errorMessages as second parameter', () => {
    const onChangeValidator = vi.fn()

    render(
      <Field.NationalIdentityNumber
        value="123"
        required
        onChangeValidator={onChangeValidator}
        validateInitially
      />
    )

    expect(onChangeValidator).toHaveBeenCalledTimes(1)
    expect(onChangeValidator).toHaveBeenCalledWith(
      '123',
      expect.objectContaining({
        errorMessages: expect.objectContaining({
          'Field.errorRequired': expect.stringContaining('fødselsnummer'),
          'Field.errorPattern': expect.stringContaining('fødselsnummer'),
          'StringField.errorMinLength':
            expect.stringContaining('{minLength}'),
          'StringField.errorMaxLength':
            expect.stringContaining('{maxLength}'),
        }),
      })
    )
  })

  it('should have numeric input mode', () => {
    render(<Field.NationalIdentityNumber />)

    const input = document.querySelector('.dnb-input__input')

    expect(input).toHaveAttribute('inputmode', 'numeric')
  })

  it('should not provide an error for empty/undefined value when not required', async () => {
    render(<Field.NationalIdentityNumber />)

    const element = document.querySelector('input')
    await userEvent.type(element, '12312312312')
    expect(element.value).toBe('123123 12312')
    await userEvent.type(element, '{Backspace>11}')
    expect(element).toHaveValue('')

    element.blur()

    await expect(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    }).toNeverResolve()
  })

  it('should provide an error for empty/undefined value when required', async () => {
    render(<Field.NationalIdentityNumber required />)

    const element = document.querySelector('input')
    await userEvent.type(element, '12312312312')
    expect(element.value).toBe('123123 12312')
    await userEvent.type(element, '{Backspace>11}')
    expect(element).toHaveValue('')

    element.blur()

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        nb.NationalIdentityNumber.errorRequired
      )
    })
  })

  it('should display error if required and validateInitially', async () => {
    render(<Field.NationalIdentityNumber required validateInitially />)

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        nb.NationalIdentityNumber.errorRequired
      )
    })
  })

  it('should display error when validateInitially and value', async () => {
    render(<Field.NationalIdentityNumber validateInitially value="123" />)

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        nb.NationalIdentityNumber.errorFnrLength
      )
    })
  })

  it('should not display error when validateInitially and no value', async () => {
    render(<Field.NationalIdentityNumber validateInitially />)

    await expect(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    }).toNeverResolve()
  })

  it('should not validate when onBlurValidator is false', async () => {
    const invalidFnr = '29020112345'
    render(
      <Field.NationalIdentityNumber
        value={invalidFnr}
        validateInitially
        onBlurValidator={false}
      />
    )

    fireEvent.blur(document.querySelector('input'))

    await expect(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    }).toNeverResolve()
  })

  it('should not validate dnum when validate false', async () => {
    const invalidDnum = '69020112345'
    render(
      <Field.NationalIdentityNumber
        value={invalidDnum}
        validateInitially
        validate={false}
      />
    )

    fireEvent.blur(document.querySelector('input'))

    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('should not validate fnr when validate false', async () => {
    const invalidFnr = '29020112345'
    render(
      <Field.NationalIdentityNumber
        value={invalidFnr}
        validateInitially
        validate={false}
      />
    )

    fireEvent.blur(document.querySelector('input'))

    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('should not validate custom onChangeValidator when validate false', async () => {
    const customValidator: Validator<string> = (value) => {
      if (value?.length < 4) {
        return new Error('My error')
      }

      return undefined
    }

    render(
      <Field.NationalIdentityNumber
        value="123"
        required
        onChangeValidator={customValidator}
        validateInitially
        validate={false}
      />
    )

    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('should not validate extended onChangeValidator when validate false', async () => {
    const invalidFnrBornInApril = '29040112345'

    const bornInApril = (value: string) => value.substring(2, 4) === '04'

    const customValidator: Validator<string> = (value, { validators }) => {
      const { dnrValidator, fnrValidator } = validators
      if (bornInApril(value)) {
        return new Error('custom error')
      }

      return [dnrValidator, fnrValidator]
    }

    render(
      <Field.NationalIdentityNumber
        value={invalidFnrBornInApril}
        validateInitially
        validate={false}
        onChangeValidator={customValidator}
      />
    )

    expect(screen.queryByRole('alert')).toBeNull()
  })

  describe('should validate Norwegian D number', () => {
    const errorMessages = {
      errorFnr: nb.NationalIdentityNumber.errorFnr,
      errorFnrLength: nb.NationalIdentityNumber.errorFnrLength,
      errorDnr: nb.NationalIdentityNumber.errorDnr,
      errorDnrLength: nb.NationalIdentityNumber.errorDnrLength,
    }

    const validDNum = [
      '53097248016',
      '51041678171',
      '58081633086',
      '53050129159',
      '65015439860',
      '51057844748',
      '71075441007',
    ]

    const invalidDNum = [
      '69020112345',
      '53097248032',
      '53097248023',
      '72127248022',
      '53137248022',
    ]

    const invalidDNumTooShort = [
      '6',
      '5309724803',
      '5309724',
      '72127248',
      '5313',
    ]

    it.each(validDNum)(
      'returns no error for a valid D number: %s',
      (dNum) => {
        expect(validateDnrAndFnr(dNum, errorMessages)).toBeUndefined()
      }
    )

    it.each(invalidDNum)(
      'returns a dnr error for an invalid D number: %s',
      (dNum) => {
        const result = validateDnrAndFnr(dNum, errorMessages)
        expect(result).toBeInstanceOf(Error)
        expect(result?.message).toBe(nb.NationalIdentityNumber.errorDnr)
      }
    )

    it.each(invalidDNumTooShort)(
      'returns a length error for a too-short D number: %s',
      (dNum) => {
        const result = validateDnrAndFnr(dNum, errorMessages)
        expect(result).toBeInstanceOf(Error)
        expect(result?.message).toBe(
          nb.NationalIdentityNumber.errorDnrLength
        )
      }
    )
  })

  describe('should validate Norwegian national identity number(fnr)', () => {
    const errorMessages = {
      errorFnr: nb.NationalIdentityNumber.errorFnr,
      errorFnrLength: nb.NationalIdentityNumber.errorFnrLength,
      errorDnr: nb.NationalIdentityNumber.errorDnr,
      errorDnrLength: nb.NationalIdentityNumber.errorDnrLength,
    }

    const validFnrNum = [
      '08121312590',
      '12018503288',
      '03025742965',
      '14046512368',
      '21033601864',
      '27114530463',
      '07014816857',
      '11069497545',
      '22032012969',
      '10042223293',
    ]

    const invalidFnrNum = [
      '29020112345',
      '13097248032',
      '13097248023',
      '32127248022',
      '13137248022',
    ]

    const invalidFnrNumTooShort = [
      '2',
      '1309724803',
      '1309724',
      '321',
      '131372480',
    ]

    it.each(validFnrNum)(
      'returns no error for a valid fnr: %s',
      (fnrNum) => {
        expect(validateDnrAndFnr(fnrNum, errorMessages)).toBeUndefined()
      }
    )

    it.each(invalidFnrNum)(
      'returns an fnr error for an invalid fnr: %s',
      (fnrNum) => {
        const result = validateDnrAndFnr(fnrNum, errorMessages)
        expect(result).toBeInstanceOf(Error)
        expect(result?.message).toBe(nb.NationalIdentityNumber.errorFnr)
      }
    )

    it.each(invalidFnrNumTooShort)(
      'returns a length error for a too-short fnr: %s',
      (fnrNum) => {
        const result = validateDnrAndFnr(fnrNum, errorMessages)
        expect(result).toBeInstanceOf(Error)
        expect(result?.message).toBe(
          nb.NationalIdentityNumber.errorFnrLength
        )
      }
    )
  })

  describe('should extend validation using a custom onChangeValidator', () => {
    const bornInAprilValidator = (value: string) => {
      if (value.substring(2, 4) !== '04') {
        return new Error('custom error')
      }

      return undefined
    }

    const customValidator: Validator<string> = (value, { validators }) => {
      const { dnrAndFnrValidator } = validators

      return [dnrAndFnrValidator, bornInAprilValidator]
    }

    it('passes when both the built-in and custom validators pass', async () => {
      render(
        <Field.NationalIdentityNumber
          onChangeValidator={customValidator}
          validateInitially
          value="14046512368"
        />
      )

      expect(screen.queryByRole('alert')).toBeNull()
    })

    it('shows the custom error when only the custom validator fails', async () => {
      render(
        <Field.NationalIdentityNumber
          onChangeValidator={customValidator}
          validateInitially
          value="58081633086"
        />
      )

      await waitFor(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          'custom error'
        )
      })
    })

    it('shows the dnr error before the custom validator runs', async () => {
      render(
        <Field.NationalIdentityNumber
          onChangeValidator={customValidator}
          validateInitially
          value="69040112345"
        />
      )

      await waitFor(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.NationalIdentityNumber.errorDnr
        )
      })
    })

    it('shows the dnr length error before the custom validator runs', async () => {
      render(
        <Field.NationalIdentityNumber
          onChangeValidator={customValidator}
          validateInitially
          value="6904011234"
        />
      )

      await waitFor(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.NationalIdentityNumber.errorDnrLength
        )
      })
    })

    it('shows the fnr error before the custom validator runs', async () => {
      render(
        <Field.NationalIdentityNumber
          onChangeValidator={customValidator}
          validateInitially
          value="29040112345"
        />
      )

      await waitFor(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.NationalIdentityNumber.errorFnr
        )
      })
    })

    it('shows the fnr length error before the custom validator runs', async () => {
      render(
        <Field.NationalIdentityNumber
          onChangeValidator={customValidator}
          validateInitially
          value="2904011234"
        />
      )

      await waitFor(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.NationalIdentityNumber.errorFnrLength
        )
      })
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(<Field.NationalIdentityNumber required />)

      expect(await axeComponent(result)).toHaveNoViolations()
    })
  })

  it('should validate continuously when validateContinuously is enabled', async () => {
    render(<Field.NationalIdentityNumber validateContinuously />)

    const input = document.querySelector('input')

    // Type invalid identity number (too short) - error should appear during typing
    await userEvent.type(input, '123')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(document.querySelector('[role="alert"]')).toHaveTextContent(
        nb.NationalIdentityNumber.errorFnrLength
      )
    })

    // Type more digits to reach 11 - error should change to invalid format
    await userEvent.type(input, '45678901')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(document.querySelector('[role="alert"]')).toHaveTextContent(
        nb.NationalIdentityNumber.errorFnr
      )
    })

    // Type valid identity number - error should disappear
    await userEvent.clear(input)
    await userEvent.type(input, '08121312590')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })
  })

  it('should call onStatusChange when validateContinuously reveals validation errors', async () => {
    const onStatusChange = vi.fn()

    render(
      <Field.NationalIdentityNumber
        onStatusChange={onStatusChange}
        validateContinuously
        required
      />
    )

    const input = document.querySelector('input')

    // Type invalid identity number
    await userEvent.type(input, '123')

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

    // Type valid identity number
    await userEvent.clear(input)
    await userEvent.type(input, '08121312590')

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
    const onStatusChange = vi.fn()
    const error1 = new Error('Error 1')
    const error2 = new Error('Error 2')

    const { rerender } = render(
      <Field.NationalIdentityNumber
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
      <Field.NationalIdentityNumber
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
      <Field.NationalIdentityNumber
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
      <Field.NationalIdentityNumber
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
