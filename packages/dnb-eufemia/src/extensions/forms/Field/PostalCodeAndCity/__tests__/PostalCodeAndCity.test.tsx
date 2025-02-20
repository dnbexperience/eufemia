import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form, Iterate } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Field.PostalCodeAndCity', () => {
  it('should render with props', () => {
    render(<Field.PostalCodeAndCity />)
    expect(screen.getByLabelText(nb.PostalCode.label)).toBeInTheDocument()
    expect(screen.getByLabelText(nb.City.label)).toBeInTheDocument()
  })

  it('postal code should only allow four numbers', async () => {
    render(<Field.PostalCodeAndCity />)

    const postalCodeInput = document.querySelector(
      '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
    ) as HTMLInputElement

    expect(postalCodeInput).toHaveValue('')

    await userEvent.type(postalCodeInput, '123456')

    expect(postalCodeInput).toHaveValue('1234')
  })

  it('should support size', () => {
    render(<Field.PostalCodeAndCity size="large" />)

    const fieldPostalCodeElement: HTMLInputElement =
      document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code'
      )
    expect(fieldPostalCodeElement.classList).toContain(
      'dnb-forms-field-block--label-height-large'
    )

    const fieldPostalCodeInputElement: HTMLInputElement =
      document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code-input'
      )
    expect(fieldPostalCodeInputElement.classList).toContain(
      'dnb-input--large'
    )

    const fieldCityElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-postal-code-and-city__city'
    )
    expect(fieldCityElement.classList).toContain(
      'dnb-forms-field-block--label-height-large'
    )

    const fieldCityInputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-postal-code-and-city__city-input'
    )
    expect(fieldCityInputElement.classList).toContain('dnb-input--large')
  })

  it('postalCode should have numeric "inputmode"', () => {
    render(<Field.PostalCodeAndCity />)

    const postalCodeInput = document.querySelector(
      '.dnb-forms-field-postal-code-and-city__postal-code-input .dnb-input__input'
    )

    expect(postalCodeInput).toHaveAttribute('inputmode', 'numeric')
  })

  it('should show single error message and have error modifier on two inputs', () => {
    const { rerender } = render(<Field.PostalCodeAndCity />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    expect(
      document.querySelectorAll('.dnb-input__status--error')
    ).toHaveLength(0)

    rerender(
      <Field.PostalCodeAndCity error={new Error('Single error message')} />
    )

    expect(screen.queryAllByRole('alert')).toHaveLength(1)
    expect(screen.queryByRole('alert')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).toHaveTextContent(
      'Single error message'
    )

    // Red border on two inputs
    expect(
      document.querySelectorAll('.dnb-input__status--error')
    ).toHaveLength(2)
  })

  it('should show error message on invalid values', async () => {
    const { rerender } = render(<Field.PostalCodeAndCity />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    rerender(
      <Field.PostalCodeAndCity
        postalCode={{
          required: true,
          validateInitially: true,
        }}
        city={{
          required: true,
          validateInitially: true,
        }}
      />
    )

    const [code, city] = Array.from(document.querySelectorAll('input'))

    await userEvent.type(code, 'x{Backspace}')
    expect(screen.queryByRole('alert')).toHaveTextContent(
      nb.PostalCode.errorRequired
    )
    expect(code).toHaveValue('')

    await userEvent.type(city, 'x{Backspace}')
    expect(screen.queryByRole('alert')).toHaveTextContent(
      nb.City.errorRequired
    )
    expect(city).toHaveValue('')

    await userEvent.type(code, '123')
    expect(screen.queryByRole('alert')).toHaveTextContent(
      nb.PostalCode.errorPattern
    )
    expect(code).toHaveValue('123​')

    await userEvent.type(city, '456')
    expect(screen.queryByRole('alert')).toHaveTextContent(
      nb.City.errorPattern
    )
    expect(city).toHaveValue('456')

    await userEvent.type(city, '{Backspace>3}æ - ø - å')
    fireEvent.blur(city)

    expect(city).toHaveValue('æ - ø - å')
  })

  it('should trim the value on blur', async () => {
    render(<Field.PostalCodeAndCity />)

    const [, city] = Array.from(document.querySelectorAll('input'))

    await userEvent.type(city, ' æ - ø - å ')
    fireEvent.blur(city)

    expect(city).toHaveValue('æ - ø - å')
  })

  it('should have autofill attributes', () => {
    render(<Field.PostalCodeAndCity />)

    const [code, city] = Array.from(document.querySelectorAll('input'))

    expect(code).toHaveAttribute('autocomplete', 'postal-code')
    expect(city).toHaveAttribute('autocomplete', 'address-level2')
  })

  it('should iterate over array with itemPath support', () => {
    render(
      <Iterate.Array
        value={[
          {
            postalCode: '0788',
            city: 'Oslo',
          },
          {
            postalCode: '0789',
            city: 'Bergen',
          },
        ]}
      >
        <Field.PostalCodeAndCity
          postalCode={{ itemPath: '/postalCode' }}
          city={{ itemPath: '/city' }}
        />
      </Iterate.Array>
    )

    const [code1, city1, code2, city2] = Array.from(
      document.querySelectorAll('input')
    )

    expect(code1).toHaveValue('0788')
    expect(city1).toHaveValue('Oslo')
    expect(code2).toHaveValue('0789')
    expect(city2).toHaveValue('Bergen')
  })

  // Deprecated – country is replaced with countryCode - can be removed in v11
  describe('country', () => {
    it('should not use Norwegian postal code validation rules if `country` is set to something other than `NO`', async () => {
      render(<Field.PostalCodeAndCity country="DE" />)

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      ) as HTMLInputElement

      expect(postalCodeInput).not.toHaveAttribute('placeholder')

      await userEvent.type(postalCodeInput, '123456')

      expect(postalCodeInput).toHaveValue('123456')
    })

    it('should not use Norwegian city validation rules if `country` is set to something other than `NO`', async () => {
      const { rerender } = render(<Field.PostalCodeAndCity />)

      const city = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__city .dnb-input__input'
      ) as HTMLInputElement

      expect(city).not.toHaveAttribute('placeholder')

      await userEvent.type(city, 'äöü')
      fireEvent.blur(city)

      expect(city).toHaveValue('äöü')
      expect(screen.queryByRole('alert')).toBeInTheDocument()

      rerender(<Field.PostalCodeAndCity country="DE" />)

      await userEvent.type(city, 'äöü')
      fireEvent.blur(city)

      expect(city).toHaveValue('äöüäöü')
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should support custom postal code validation', async () => {
      render(
        <Field.PostalCodeAndCity
          country="DE"
          postalCode={{
            pattern: '^[0-9]{5}$',
            mask: [/\d/, /\d/, /\d/, /\d/, /\d/],
            placeholder: '00000',
            validateInitially: true,
          }}
          city={{
            validateInitially: true,
            pattern: '^[a-zA-ZäöüÄÖÜß -]+$',
          }}
        />
      )

      const [postalCode, city] = Array.from(
        document.querySelectorAll('input')
      )

      expect(postalCode).toHaveAttribute('aria-placeholder', '00000')
      await userEvent.type(postalCode, 'abcs123456')

      expect(postalCode).toHaveValue('12345')

      await userEvent.type(city, 'München')

      expect(city).toHaveValue('München')
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should be able to use a path to set the country value', async () => {
      const { rerender } = render(
        <Form.Handler data={{ country: 'DE' }}>
          <Field.PostalCodeAndCity country="/country" />
        </Form.Handler>
      )

      const postalCodeDe = document.querySelector(
        '.dnb-forms-field-postal-code-and-city input'
      )

      await userEvent.type(postalCodeDe, '123456')
      expect(postalCodeDe).toHaveValue('123456')
      expect(postalCodeDe).not.toHaveAttribute('aria-placeholder')

      rerender(
        <Form.Handler data={{ country: 'NO' }}>
          <Field.PostalCodeAndCity country="/country" />
        </Form.Handler>
      )

      const postalCodeNo = document.querySelector(
        '.dnb-forms-field-postal-code-and-city input'
      )

      await userEvent.type(postalCodeNo, '{Backspace>4}987654')
      expect(postalCodeNo).toHaveValue('9876')
      expect(postalCodeNo).toHaveAttribute('aria-placeholder', '0000')
    })

    it('should use value from country inside iterate', async () => {
      render(
        <Form.Handler
          defaultData={{ items: [{ country: 'NO' }, { country: 'DE' }] }}
        >
          <Iterate.Array path="/items">
            <Field.PostalCodeAndCity country="/country" />
          </Iterate.Array>
        </Form.Handler>
      )

      const [norway, germany] = Array.from(
        document.querySelectorAll('.dnb-forms-field-postal-code-and-city')
      )

      await userEvent.type(
        norway.querySelector('input'),
        '{Backspace>4}987654'
      )
      expect(norway.querySelector('input').value).toBe('9876')

      await userEvent.type(
        germany.querySelector('input'),
        '{Backspace>4}987654'
      )
      expect(germany.querySelector('input').value).toBe('987654')
    })
  })

  describe('countryCode', () => {
    it('should not use Norwegian postal code validation rules if `countryCode` is set to something other than `NO`', async () => {
      render(<Field.PostalCodeAndCity countryCode="DE" />)

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      ) as HTMLInputElement

      expect(postalCodeInput).not.toHaveAttribute('placeholder')

      await userEvent.type(postalCodeInput, '123456')

      expect(postalCodeInput).toHaveValue('123456')
    })

    it('should not use Norwegian city validation rules if `countryCode` is set to something other than `NO`', async () => {
      const { rerender } = render(<Field.PostalCodeAndCity />)

      const city = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__city .dnb-input__input'
      ) as HTMLInputElement

      expect(city).not.toHaveAttribute('placeholder')

      await userEvent.type(city, 'äöü')
      fireEvent.blur(city)

      expect(city).toHaveValue('äöü')
      expect(screen.queryByRole('alert')).toBeInTheDocument()

      rerender(<Field.PostalCodeAndCity countryCode="DE" />)

      await userEvent.type(city, 'äöü')
      fireEvent.blur(city)

      expect(city).toHaveValue('äöüäöü')
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should support custom postal code validation', async () => {
      render(
        <Field.PostalCodeAndCity
          countryCode="DE"
          postalCode={{
            pattern: '^[0-9]{5}$',
            mask: [/\d/, /\d/, /\d/, /\d/, /\d/],
            placeholder: '00000',
            validateInitially: true,
          }}
          city={{
            validateInitially: true,
            pattern: '^[a-zA-ZäöüÄÖÜß -]+$',
          }}
        />
      )

      const [postalCode, city] = Array.from(
        document.querySelectorAll('input')
      )

      expect(postalCode).toHaveAttribute('aria-placeholder', '00000')
      await userEvent.type(postalCode, 'abcs123456')

      expect(postalCode).toHaveValue('12345')

      await userEvent.type(city, 'München')

      expect(city).toHaveValue('München')
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should be able to use a path to set the countryCode value', async () => {
      const { rerender } = render(
        <Form.Handler data={{ countryCode: 'DE' }}>
          <Field.PostalCodeAndCity countryCode="/countryCode" />
        </Form.Handler>
      )

      const postalCodeDe = document.querySelector(
        '.dnb-forms-field-postal-code-and-city input'
      )

      await userEvent.type(postalCodeDe, '123456')
      expect(postalCodeDe).toHaveValue('123456')
      expect(postalCodeDe).not.toHaveAttribute('aria-placeholder')

      rerender(
        <Form.Handler data={{ countryCode: 'NO' }}>
          <Field.PostalCodeAndCity countryCode="/countryCode" />
        </Form.Handler>
      )

      const postalCodeNo = document.querySelector(
        '.dnb-forms-field-postal-code-and-city input'
      )

      await userEvent.type(postalCodeNo, '{Backspace>4}987654')
      expect(postalCodeNo).toHaveValue('9876')
      expect(postalCodeNo).toHaveAttribute('aria-placeholder', '0000')
    })

    it('should use value from countryCode inside iterate', async () => {
      render(
        <Form.Handler
          defaultData={{
            items: [{ countryCode: 'NO' }, { countryCode: 'DE' }],
          }}
        >
          <Iterate.Array path="/items">
            <Field.PostalCodeAndCity countryCode="/countryCode" />
          </Iterate.Array>
        </Form.Handler>
      )

      const [norway, germany] = Array.from(
        document.querySelectorAll('.dnb-forms-field-postal-code-and-city')
      )

      await userEvent.type(
        norway.querySelector('input'),
        '{Backspace>4}987654'
      )
      expect(norway.querySelector('input').value).toBe('9876')

      await userEvent.type(
        germany.querySelector('input'),
        '{Backspace>4}987654'
      )
      expect(germany.querySelector('input').value).toBe('987654')
    })
  })

  describe('ARIA', () => {
    const props = {
      postalCode: { required: true, validateInitially: true },
      city: { required: true, validateInitially: true },
    }

    it('should validate with ARIA rules', async () => {
      const result = render(<Field.PostalCodeAndCity {...props} />)

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.PostalCodeAndCity {...props} />)

      const [code, city] = Array.from(document.querySelectorAll('input'))
      expect(code).toHaveAttribute('aria-required', 'true')
      expect(city).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.PostalCodeAndCity {...props} />)

      const [code, city] = Array.from(document.querySelectorAll('input'))
      expect(code).toHaveAttribute('aria-invalid', 'true')
      expect(city).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
