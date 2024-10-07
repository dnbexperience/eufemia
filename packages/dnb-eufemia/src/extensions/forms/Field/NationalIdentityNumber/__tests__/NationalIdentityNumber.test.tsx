import React from 'react'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { Props } from '..'
import { Field, Form, Validator } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

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

  it('should execute validateInitially if required', async () => {
    const { rerender } = render(
      <Field.NationalIdentityNumber required validateInitially />
    )

    expect(screen.queryByRole('alert')).toBeInTheDocument()

    rerender(<Field.NationalIdentityNumber validateInitially />)

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  it('should validate given function', async () => {
    const text = 'Custom Error message'
    const validator = jest.fn((value) => {
      return value.length < 4 ? new Error(text) : undefined
    })

    render(
      <Field.NationalIdentityNumber
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
      <Field.NationalIdentityNumber
        value="123"
        required
        validator={validator}
        validateInitially
      />
    )

    expect(validator).toHaveBeenCalledTimes(1)
    expect(validator).toHaveBeenCalledWith(
      '123',
      expect.objectContaining({
        errorMessages: expect.objectContaining({
          maxLength: expect.stringContaining('{maxLength}'),
          minLength: expect.stringContaining('{minLength}'),
          pattern: expect.stringContaining('11'),
          required: expect.stringContaining('11'),
          errorDnr: expect.stringContaining('d-nummer'),
          errorFnr: expect.stringContaining('fødselsnummer'),
        }),
      })
    )
  })

  it('should have numeric input mode', () => {
    render(<Field.NationalIdentityNumber />)

    const input = document.querySelector('.dnb-input__input')

    expect(input).toHaveAttribute('inputmode', 'numeric')
  })

  it('should not validate pattern when validate false', async () => {
    const invalidPattern = '1234'
    render(
      <Field.NationalIdentityNumber
        value={invalidPattern}
        validateInitially
        validate={false}
      />
    )

    fireEvent.blur(document.querySelector('input'))

    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('should not validate custom pattern when validate false', async () => {
    const invalidPattern = '1234'
    render(
      <Field.NationalIdentityNumber
        pattern="[A-Z]"
        value={invalidPattern}
        validateInitially
        validate={false}
      />
    )

    fireEvent.blur(document.querySelector('input'))

    expect(screen.queryByRole('alert')).toBeNull()
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

  it('should not validate custom validator when validate false', async () => {
    const customValidator: Validator<string> = (value) => {
      if (value?.length < 4) {
        return new Error('My error')
      }
    }

    render(
      <Field.NationalIdentityNumber
        value="123"
        required
        validator={customValidator}
        validateInitially
        validate={false}
      />
    )

    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('should not validate extended validator when validate false', async () => {
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
        validator={customValidator}
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

    it.each(validDNum)('Valid D number: %s', async (dNum) => {
      render(
        <Field.NationalIdentityNumber value={dNum} validateInitially />
      )

      fireEvent.blur(document.querySelector('input'))

      expect(screen.queryByRole('alert')).toBeNull()
    })

    it.each(invalidDNum)('Invalid D number: %s', async (dNum) => {
      render(
        <Field.NationalIdentityNumber
          value={dNum}
          validateUnchanged
          validateInitially
        />
      )

      fireEvent.blur(document.querySelector('input'))

      await waitFor(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.NationalIdentityNumber.errorDnr
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
          <Field.NationalIdentityNumber
            validateInitially
            validateUnchanged
            value={fnrNum}
          />
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
  })

  describe('should extend validation using custom validator', () => {
    const validFnrNumApril = ['14046512368', '10042223293']
    const validDNumApril = ['51041678171']

    const validIds = [...validFnrNumApril, ...validDNumApril]

    const invalidFnrNumApril = ['29040112345', '13047248032']
    const invalidDNumApril = ['69040112345', '53047248032']

    const validFnrNumNotApril = [
      '58081633086',
      '53050129159',
      '65015439860',
    ]
    const validDNumNotApril = ['08121312590', '12018503288', '03025742965']

    const invalidIds = [...validFnrNumNotApril, ...validDNumNotApril]

    const bornInApril = (value: string) =>
      value.substring(2, 4) === '04'
        ? { status: 'valid' }
        : { status: 'invalid' }

    const customValidator: Validator<string> = (value, { validators }) => {
      const { dnrValidator, fnrValidator } = validators
      const result = bornInApril(value)
      if (result.status === 'invalid') {
        return new Error('custom error')
      }

      return [dnrValidator, fnrValidator]
    }

    it.each(validIds)('Valid identity number: %s', async (fnrNum) => {
      render(
        <Field.NationalIdentityNumber
          validator={customValidator}
          validateInitially
          value={fnrNum}
        />
      )

      expect(screen.queryByRole('alert')).toBeNull()
    })

    it.each(invalidIds)('Invalid identity number: %s', async (id) => {
      render(
        <Field.NationalIdentityNumber
          validator={customValidator}
          validateInitially
          validateUnchanged
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
          validator={customValidator}
          validateInitially
          validateUnchanged
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

    it.each(invalidFnrNumApril)(
      'Invalid national identity number(fnr): %s',
      async (fnr) => {
        render(
          <Field.NationalIdentityNumber
            validator={customValidator}
            validateInitially
            validateUnchanged
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
  })
})
