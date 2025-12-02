import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form, Validator } from '../../..'
import * as InputMaskedModule from '../../../../../components/InputMasked'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('Field.OrganizationNumber', () => {
  it('should have Norwegian mask', async () => {
    render(<Field.OrganizationNumber />)

    const element = document.querySelector('input')
    await userEvent.type(element, '123456789')
    expect(element.value).toBe('123 456 789')
  })

  it('should allow more characters than the mask length when allowOverflow is enabled', async () => {
    const spy = jest.spyOn(InputMaskedModule, 'default')
    render(<Field.OrganizationNumber />)

    const element = document.querySelector('input')
    await userEvent.type(element, '123456789')
    expect(element.value).toBe('123 456 789')

    await userEvent.type(element, '0')
    await waitFor(() => expect(element).toHaveValue('123 456 7890'))

    expect(spy).toHaveBeenCalled()
    const lastCall =
      spy.mock.calls[spy.mock.calls.length - 1]?.[0] ?? ({} as any)
    expect(lastCall.allowOverflow).toBe(true)
    expect(Array.isArray(lastCall.mask)).toBe(true)
    expect(lastCall.value).toBe('1234567890')
    spy.mockRestore()
  })

  it('should have medium width', () => {
    render(<Field.OrganizationNumber />)

    const element = document.querySelector(
      '.dnb-forms-field-block__contents'
    )
    expect(element.className).toContain(
      'dnb-forms-field-block__contents--width-medium'
    )
  })

  it('should have disabled autocomplete', () => {
    render(<Field.OrganizationNumber />)

    const element = document.querySelector('input')
    expect(element).not.toHaveAttribute('autocomplete')
  })

  it('should link for and label', () => {
    render(<Field.OrganizationNumber />)

    const labelElement = document.querySelector('label')
    const inputElement = document.querySelector('input')

    expect(inputElement.getAttribute('id')).toBe(
      labelElement.getAttribute('for')
    )
  })

  it('should have default label', () => {
    render(<Field.OrganizationNumber />)

    const element = document.querySelector('label')
    expect(element.textContent).toBe('Organisasjonsnummer')
  })

  it('should have numeric input mode', () => {
    render(<Field.OrganizationNumber />)

    const input = document.querySelector('.dnb-input__input')

    expect(input).toHaveAttribute('inputmode', 'numeric')
  })

  it('should not provide an error for empty/undefined value when not required', async () => {
    render(<Field.OrganizationNumber />)

    const element = document.querySelector('input')
    await userEvent.type(element, '123123123')
    expect(element.value).toBe('123 123 123')
    await userEvent.type(element, '{Backspace>9}')
    expect(element).toHaveValue('')

    element.blur()

    await expect(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    }).toNeverResolve()
  })

  it('should provide an error for empty/undefined value when required', async () => {
    render(<Field.OrganizationNumber required />)

    const element = document.querySelector('input')
    await userEvent.type(element, '123123123')
    expect(element.value).toBe('123 123 123')
    await userEvent.type(element, '{Backspace>9}')
    expect(element).toHaveValue('')

    element.blur()

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        nb.OrganizationNumber.errorRequired
      )
    })
  })

  it('should validate given function as onChangeValidator', async () => {
    const text = 'Custom Error message'
    const onChangeValidator = jest.fn((value) => {
      return value.length < 4 ? new Error(text) : undefined
    })

    render(
      <Field.OrganizationNumber
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

  it('should display error if required and validateInitially', async () => {
    render(<Field.OrganizationNumber required validateInitially />)

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        nb.OrganizationNumber.errorRequired
      )
    })
  })

  it('should display error when validateInitially and value', async () => {
    render(<Field.OrganizationNumber validateInitially value="123" />)

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        nb.OrganizationNumber.errorOrgNo
      )
    })
  })

  it('should not display error when validateInitially and no value', async () => {
    render(<Field.OrganizationNumber validateInitially />)

    await expect(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    }).toNeverResolve()
  })

  it('should support custom pattern', async () => {
    render(
      <Form.Handler>
        <Field.OrganizationNumber
          validateInitially
          value="724841198" // valid, but not in the pattern
          pattern="^6"
        />
      </Form.Handler>
    )

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert').textContent).toBe(
        nb.OrganizationNumber.errorOrgNo
      )
    })
  })

  it('should support custom pattern without validator', async () => {
    const dummyValidator = jest.fn()

    render(
      <Form.Handler>
        <Field.OrganizationNumber
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

  it('should validate organization number based on the internal validator', async () => {
    render(
      <Form.Handler>
        <Field.OrganizationNumber validateInitially value="123321123" />
      </Form.Handler>
    )

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert').textContent).toBe(
        nb.OrganizationNumber.errorOrgNo
      )
    })
  })

  it('should not validate organization number based on the internal validator when onBlurValidator is false', async () => {
    render(
      <Form.Handler>
        <Field.OrganizationNumber
          validateInitially
          value="123"
          onBlurValidator={false}
        />
      </Form.Handler>
    )

    await expect(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    }).toNeverResolve()
  })

  it('should replace the internal validator with the given one', async () => {
    const myValidator = jest.fn(() => {
      return new Error('My error message')
    })
    const onBlurValidator = jest.fn(() => {
      return [myValidator]
    })

    render(
      <Field.OrganizationNumber
        value="123"
        validateInitially
        onBlurValidator={onBlurValidator}
      />
    )

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert').textContent).toBe(
        'My error message'
      )
    })

    expect(myValidator).toHaveBeenCalledTimes(1)
    expect(myValidator).toHaveBeenCalledWith('123', expect.anything())
    expect(onBlurValidator).toHaveBeenCalledTimes(1)
    expect(onBlurValidator).toHaveBeenCalledWith('123', expect.anything())
  })

  it('should not validate organization number when "onBlurValidator" is set to false', async () => {
    const invalidOrgNo = '987654321'

    render(
      <Form.Handler>
        <Field.OrganizationNumber
          value={invalidOrgNo}
          validateInitially
          onBlurValidator={false}
        />
      </Form.Handler>
    )

    fireEvent.blur(document.querySelector('input'))

    await expect(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    }).toNeverResolve()
  })

  it('should not validate organization number when "validate" is set to false', async () => {
    const invalidOrgNo = '987654321'

    render(
      <Form.Handler>
        <Field.OrganizationNumber
          value={invalidOrgNo}
          validateInitially
          validate={false}
        />
      </Form.Handler>
    )

    fireEvent.blur(document.querySelector('input'))

    await expect(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    }).toNeverResolve()
  })

  it('should not validate custom validator when "validate" is set to false', async () => {
    const invalidOrgNo = '987654321'

    const firstNumIs1 = (value: string) =>
      value.substring(0, 1) === '1'
        ? { status: 'valid' }
        : { status: 'invalid' }

    const customValidator: Validator<string> = (value) => {
      const result = firstNumIs1(value)
      if (result.status === 'invalid') {
        return new Error('My error')
      }
    }

    render(
      <Form.Handler>
        <Field.OrganizationNumber
          value={invalidOrgNo}
          validateInitially
          validate={false}
          onChangeValidator={customValidator}
          onBlurValidator={false}
        />
      </Form.Handler>
    )

    fireEvent.blur(document.querySelector('input'))

    await expect(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    }).toNeverResolve()
  })

  it('should not validate extended validator when "validate" is set to false', async () => {
    const invalidOrgNo = '987654321'

    const firstNumIs1 = (value: string) =>
      value.substring(0, 1) === '1'
        ? { status: 'valid' }
        : { status: 'invalid' }

    const customValidator: Validator<string> = (value, { validators }) => {
      const { organizationNumberValidator } = validators
      const result = firstNumIs1(value)
      if (result.status === 'invalid') {
        return new Error('My error')
      }

      return [organizationNumberValidator]
    }

    render(
      <Form.Handler>
        <Field.OrganizationNumber
          value={invalidOrgNo}
          validateInitially
          validate={false}
          onChangeValidator={customValidator}
          onBlurValidator={false}
        />
      </Form.Handler>
    )

    fireEvent.blur(document.querySelector('input'))

    await expect(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    }).toNeverResolve()
  })

  describe('should validate Norwegian organization number', () => {
    const validOrgNum = [
      '724841198',
      '602105938',
      '656231440',
      '967746096',
      '721357694',
      '282334933',
      '519909235',
      '530028801',
      '991541209',
      '756299263',
      '100214458',
      '208141554',
      '507364276',
      '148623902',
    ]

    const invalidOrgNum = [
      '123456789',
      '148623907',
      '987654321',
      '000000000',
    ]
    const invalidOrgNumTooShort = ['123', '321', '123123', '321321']

    it.each(validOrgNum)(
      'Valid organization number: %s',
      async (orgNo) => {
        render(
          <Form.Handler>
            <Field.OrganizationNumber value={orgNo} validateInitially />
          </Form.Handler>
        )

        fireEvent.blur(document.querySelector('input'))

        await expect(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        }).toNeverResolve()
      }
    )

    it.each(invalidOrgNum)(
      'Invalid organization number: %s',
      async (orgNo) => {
        render(
          <Field.OrganizationNumber value={orgNo} validateInitially />
        )

        fireEvent.blur(document.querySelector('input'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.OrganizationNumber.errorOrgNo
          )
        })
      }
    )

    it.each(invalidOrgNumTooShort)(
      'Invalid organization number: %s',
      async (orgNo) => {
        render(
          <Field.OrganizationNumber value={orgNo} validateInitially />
        )

        fireEvent.blur(document.querySelector('input'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.OrganizationNumber.errorOrgNoLength
          )
        })
      }
    )
  })

  describe('should extend validation using custom validator', () => {
    const validOrgNumStartingWith1 = ['100214458', '148623902']

    const validOrgNumNotStartingWith1 = [
      '208141554',
      '507364276',
      '724841198',
      '602105938',
      '656231440',
      '967746096',
      '721357694',
      '282334933',
      '519909235',
      '530028801',
      '991541209',
      '756299263',
    ]

    const invalidOrgNum = ['123456789', '148623907', '987654321']
    const invalidOrgNumTooShort = ['123', '321', '123123', '321321']

    const firstDigitIs1Validator = (value: string) => {
      if (value.substring(0, 1) !== '1') {
        return new Error('My error')
      }
    }

    const customValidator: Validator<string> = (value, { validators }) => {
      const { organizationNumberValidator } = validators

      return [organizationNumberValidator, firstDigitIs1Validator]
    }

    it.each(validOrgNumStartingWith1)(
      'Valid organization number: %s',
      async (orgNo) => {
        render(
          <Form.Handler>
            <Field.OrganizationNumber
              value={orgNo}
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

    it.each(validOrgNumNotStartingWith1)(
      'Invalid organization number: %s',
      async (orgNo) => {
        render(
          <Field.OrganizationNumber
            value={orgNo}
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

    it.each(invalidOrgNum)(
      'Invalid organization number: %s',
      async (orgNo) => {
        render(
          <Field.OrganizationNumber
            value={orgNo}
            validateInitially
            onBlurValidator={customValidator}
          />
        )

        fireEvent.blur(document.querySelector('input'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.OrganizationNumber.errorOrgNo
          )
        })
      }
    )

    it.each(invalidOrgNumTooShort)(
      'Invalid organization number: %s',
      async (orgNo) => {
        render(
          <Field.OrganizationNumber
            value={orgNo}
            validateInitially
            onBlurValidator={customValidator}
          />
        )

        fireEvent.blur(document.querySelector('input'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.OrganizationNumber.errorOrgNoLength
          )
        })
      }
    )
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.OrganizationNumber required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.OrganizationNumber required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.OrganizationNumber required validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('should validate continuously when validateContinuously is enabled', async () => {
    render(<Field.OrganizationNumber validateContinuously />)

    const input = document.querySelector('input')

    // Type invalid organization number (too short) - error should appear during typing
    await userEvent.type(input, '123')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(document.querySelector('[role="alert"]')).toHaveTextContent(
        nb.OrganizationNumber.errorOrgNoLength
      )
    })

    // Type more digits to reach 9 - error should change to invalid checksum
    await userEvent.type(input, '456789')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(document.querySelector('[role="alert"]')).toHaveTextContent(
        nb.OrganizationNumber.errorOrgNo
      )
    })

    // Type valid organization number - error should disappear
    await userEvent.clear(input)
    await userEvent.type(input, '724841198')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })
  })

  it('should call onStatusChange when validateContinuously reveals validation errors', async () => {
    const onStatusChange = jest.fn()

    render(
      <Field.OrganizationNumber
        onStatusChange={onStatusChange}
        validateContinuously
        required
      />
    )

    const input = document.querySelector('input')

    // Type invalid organization number
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

    // Type valid organization number
    await userEvent.clear(input)
    await userEvent.type(input, '724841198')

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
      <Field.OrganizationNumber
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
      <Field.OrganizationNumber
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
      <Field.OrganizationNumber
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
      <Field.OrganizationNumber
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
