import React from 'react'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { Props } from '..'
import { Field, Form } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

async function expectNever(callable: () => unknown): Promise<void> {
  await expect(() => waitFor(callable)).rejects.toEqual(expect.anything())
}

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
    await expectNever(() => {
      // Can't just waitFor and expect not to be in the document, it would approve the first render before the error might appear async.
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    })
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
    await expectNever(() => {
      // Can't just waitFor and expect not to be in the document, it would approve the first render before the error might appear async.
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    })
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
    await expectNever(() => {
      // Can't just waitFor and expect not to be in the document, it would approve the first render before the error might appear async.
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    })
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
    await expectNever(() => {
      // Can't just waitFor and expect not to be in the document, it would approve the first render before the error might appear async.
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    })
  })

  it('should not validate custom validator when validate false', async () => {
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
        validate={false}
      />
    )

    await expectNever(() => {
      // Can't just waitFor and expect not to be in the document, it would approve the first render before the error might appear async.
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    })
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
      await expectNever(() => {
        // Can't just waitFor and expect not to be in the document, it would approve the first render before the error might appear async.
        expect(screen.queryByRole('alert')).toBeInTheDocument()
      })
    })

    it.each(invalidDNum)('Invalid D number: %s', async (dNum) => {
      render(
        <Field.NationalIdentityNumber value={dNum} validateInitially />
      )

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
        await expectNever(() => {
          // Can't just waitFor and expect not to be in the document, it would approve the first render before the error might appear async.
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
      }
    )

    it.each(invalidFnrNum)(
      'Invalid national identity number(fnr): %s',
      async (fnrNum) => {
        render(
          <Field.NationalIdentityNumber validateInitially value={fnrNum} />
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
