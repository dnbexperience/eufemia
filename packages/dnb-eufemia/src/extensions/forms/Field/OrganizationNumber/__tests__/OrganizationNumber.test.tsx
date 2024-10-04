import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form, Validator } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('Field.OrganizationNumber', () => {
  it('should have Norwegian mask', async () => {
    render(<Field.OrganizationNumber />)

    const element = document.querySelector('input')
    await userEvent.type(element, '123456789')
    expect(element.value).toBe('123 456 789')
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

  it('should not validate organization number when validate false', async () => {
    const invalidOrgNo = '987654321'

    render(
      <Form.Handler>
        <Field.OrganizationNumber
          value={invalidOrgNo}
          validateInitially
          validate={true}
        />
      </Form.Handler>
    )

    fireEvent.blur(document.querySelector('input'))

    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('should not validate custom validator when validate false', async () => {
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
          validate={true}
          validator={customValidator}
        />
      </Form.Handler>
    )

    fireEvent.blur(document.querySelector('input'))

    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('should not validate extended validator when validate false', async () => {
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
          validate={true}
          validator={customValidator}
        />
      </Form.Handler>
    )

    fireEvent.blur(document.querySelector('input'))

    expect(screen.queryByRole('alert')).toBeNull()
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

    const invalidOrgNum = ['123', '123456789', '148623907', '987654321']

    it.each(validOrgNum)('Valid organization number: %s', (orgNo) => {
      render(
        <Form.Handler>
          <Field.OrganizationNumber value={orgNo} validateInitially />
        </Form.Handler>
      )

      fireEvent.blur(document.querySelector('input'))

      expect(screen.queryByRole('alert')).toBeNull()
    })

    it.each(invalidOrgNum)(
      'Invalid organization number: %s',
      async (orgNo) => {
        render(
          <Field.OrganizationNumber
            value={orgNo}
            validateInitially
            validateUnchanged
          />
        )

        fireEvent.blur(document.querySelector('input'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.OrganizationNumber.errorPattern
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

    const invalidOrgNum = ['123', '123456789', '148623907', '987654321']

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

    it.each(validOrgNumStartingWith1)(
      'Valid organization number: %s',
      (orgNo) => {
        render(
          <Form.Handler>
            <Field.OrganizationNumber
              value={orgNo}
              validateInitially
              validator={customValidator}
            />
          </Form.Handler>
        )

        fireEvent.blur(document.querySelector('input'))

        expect(screen.queryByRole('alert')).toBeNull()
      }
    )

    it.each(validOrgNumNotStartingWith1)(
      'Invalid organization number: %s',
      async (orgNo) => {
        render(
          <Field.OrganizationNumber
            value={orgNo}
            validateInitially
            validateUnchanged
            validator={customValidator}
          />
        )

        fireEvent.blur(document.querySelector('input'))

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
            validateUnchanged
            validator={customValidator}
          />
        )

        fireEvent.blur(document.querySelector('input'))

        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.OrganizationNumber.errorPattern
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
})
