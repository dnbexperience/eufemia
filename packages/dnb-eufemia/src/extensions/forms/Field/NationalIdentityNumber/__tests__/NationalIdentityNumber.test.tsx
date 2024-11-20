import React from 'react'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { Props } from '..'
import { Field, Form, Validator } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'
import userEvent from '@testing-library/user-event'

const nb = nbNO['nb-NO']

describe('Field.NationalIdentityNumber', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<Field.NationalIdentityNumber {...props} />)
  })

  it('should have correct mask', () => {
    const { rerender } = render(
      <Field.NationalIdentityNumber value="12345678901234567890" />
    )

    const inputElement = document.querySelector('input')
    expect(inputElement.value).toBe('123456 78901')

    rerender(
      <Field.NationalIdentityNumber
        omitMask
        value="12345678901234567890"
      />
    )

    expect(inputElement.value).toBe('12345678901')
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
        nb.NationalIdentityNumber.errorFnr
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
        nb.NationalIdentityNumber.errorDnr
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
    const dummyValidator = jest.fn()

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

  it('should validate given function', async () => {
    const text = 'Custom Error message'
    const onChangeValidator = jest.fn((value) => {
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
    const onChangeValidator = jest.fn()

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

          // For backward compatibility – can be removed in v11
          maxLength: expect.stringContaining('{maxLength}'),
          minLength: expect.stringContaining('{minLength}'),
          pattern: expect.stringContaining('fødselsnummer'),
          required: expect.stringContaining('fødselsnummer'),
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
        nb.NationalIdentityNumber.errorFnr
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

    it.each(validDNum)('Valid D number: %s', async (dNum) => {
      render(
        <Field.NationalIdentityNumber value={dNum} validateInitially />
      )

      fireEvent.blur(document.querySelector('input'))

      expect(screen.queryByRole('alert')).toBeNull()
    })

    it.each(invalidDNum)('Invalid D number: %s', async (dNum) => {
      render(
        <Field.NationalIdentityNumber value={dNum} validateInitially />
      )

      fireEvent.blur(document.querySelector('input'))

      await waitFor(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.NationalIdentityNumber.errorDnr
        )
      })
    })

    it.each(invalidDNumTooShort)('Invalid D number: %s', async (dNum) => {
      render(
        <Field.NationalIdentityNumber value={dNum} validateInitially />
      )

      fireEvent.blur(document.querySelector('input'))

      await waitFor(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.NationalIdentityNumber.errorDnrLength
        )
      })
    })
  })

  describe('should validate Norwegian national identity number(fnr)', () => {
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
      'Valid national identity number(fnr): %s',
      async (fnrNum) => {
        render(
          <Field.NationalIdentityNumber validateInitially value={fnrNum} />
        )

        fireEvent.blur(document.querySelector('input'))

        expect(screen.queryByRole('alert')).toBeNull()
      }
    )

    it.each(invalidFnrNum)(
      'Invalid national identity number(fnr): %s',
      async (fnrNum) => {
        render(
          <Field.NationalIdentityNumber validateInitially value={fnrNum} />
        )

        fireEvent.blur(document.querySelector('input'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.NationalIdentityNumber.errorFnr
          )
        })
      }
    )

    it.each(invalidFnrNumTooShort)(
      'Invalid national identity number(fnr): %s',
      async (fnrNum) => {
        render(
          <Field.NationalIdentityNumber validateInitially value={fnrNum} />
        )

        fireEvent.blur(document.querySelector('input'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.NationalIdentityNumber.errorFnrLength
          )
        })
      }
    )
  })

  describe('should extend validation using custom onChangeValidator', () => {
    const validFnrNumApril = ['14046512368', '10042223293']
    const validDNumApril = ['51041678171']

    const validIds = [...validFnrNumApril, ...validDNumApril]

    const invalidFnrNumApril = ['29040112345', '13047248032']
    const invalidDNumApril = ['69040112345', '53047248032']
    const invalidFnrTooShort = ['2904011234', '1']
    const invalidDNumTooShort = ['6904011234', '5']

    const validFnrNumNotApril = [
      '58081633086',
      '53050129159',
      '65015439860',
    ]
    const validDNumNotApril = ['08121312590', '12018503288', '03025742965']

    const invalidIds = [...validFnrNumNotApril, ...validDNumNotApril]

    const bornInAprilValidator = (value: string) => {
      if (value.substring(2, 4) !== '04') {
        return new Error('custom error')
      }
    }

    const customValidator: Validator<string> = (value, { validators }) => {
      const { dnrAndFnrValidator } = validators

      return [dnrAndFnrValidator, bornInAprilValidator]
    }

    it.each(validIds)('Valid identity number: %s', async (fnrNum) => {
      render(
        <Field.NationalIdentityNumber
          onChangeValidator={customValidator}
          validateInitially
          value={fnrNum}
        />
      )

      expect(screen.queryByRole('alert')).toBeNull()
    })

    it.each(invalidIds)('Invalid identity number: %s', async (id) => {
      render(
        <Field.NationalIdentityNumber
          onChangeValidator={customValidator}
          validateInitially
          value={id}
        />
      )

      await waitFor(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          'custom error'
        )
      })
    })

    it.each(invalidDNumApril)('Invalid D number: %s', async (dNum) => {
      render(
        <Field.NationalIdentityNumber
          onChangeValidator={customValidator}
          validateInitially
          value={dNum}
        />
      )

      await waitFor(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.NationalIdentityNumber.errorDnr
        )
      })
    })

    it.each(invalidDNumTooShort)('Invalid D number: %s', async (dNum) => {
      render(
        <Field.NationalIdentityNumber
          onChangeValidator={customValidator}
          validateInitially
          value={dNum}
        />
      )

      await waitFor(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.NationalIdentityNumber.errorDnrLength
        )
      })
    })

    it.each(invalidFnrNumApril)(
      'Invalid national identity number(fnr): %s',
      async (fnr) => {
        render(
          <Field.NationalIdentityNumber
            onChangeValidator={customValidator}
            validateInitially
            value={fnr}
          />
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.NationalIdentityNumber.errorFnr
          )
        })
      }
    )

    it.each(invalidFnrTooShort)(
      'Invalid national identity number(fnr): %s',
      async (fnr) => {
        render(
          <Field.NationalIdentityNumber
            onChangeValidator={customValidator}
            validateInitially
            value={fnr}
          />
        )

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.NationalIdentityNumber.errorFnrLength
          )
        })
      }
    )
  })
})
