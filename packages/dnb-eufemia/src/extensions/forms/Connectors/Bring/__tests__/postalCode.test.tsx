import React from 'react'
import userEvent from '@testing-library/user-event'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { Connectors, Field, Form } from '../../..'
import { getMockData, unsupportedCountry } from '../postalCode'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('postalCode', () => {
  const { withConfig } = Connectors.createContext({
    fetchConfig: {
      url: (value) => {
        return `/address/api/no/postal-codes/${value}`
      },
      headers: {
        'X-Mybring-API-Uid': 'Uid',
        'X-Mybring-API-Key': 'Key',
      },
    },
  })

  describe('onChangeValidator', () => {
    let onChangeValidator = null

    beforeEach(() => {
      onChangeValidator = withConfig(Connectors.Bring.postalCode.validator)
    })

    it('should show error when postal code is not valid', async () => {
      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
              onChangeValidator,
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )

      expect(postalCodeInput).toHaveValue('')

      await userEvent.type(postalCodeInput, '0000')

      expect(postalCodeInput).toHaveValue('0000')
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.PostalCodeAndCity.invalidCode
      )
    })

    it('should prevent submit when postal code is not valid', async () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler
          onSubmit={onSubmit}
          defaultData={{ postalCode: '0000' }}
        >
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
              onChangeValidator,
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )

      fireEvent.submit(document.querySelector('form'))
      await expect(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
      }).toNeverResolve()

      expect(postalCodeInput).toHaveValue('0000')

      await userEvent.type(postalCodeInput, '{Backspace}1')

      expect(postalCodeInput).toHaveValue('0001')

      fireEvent.submit(document.querySelector('form'))
      await expect(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
      }).toNeverResolve()
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })

    it('should not show error when postal code is valid', async () => {
      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
              onChangeValidator,
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )

      expect(postalCodeInput).toHaveValue('')

      await userEvent.type(postalCodeInput, '1391')

      expect(postalCodeInput).toHaveValue('1391')

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    it('should not validate when country is other than "NO"', async () => {
      render(
        <Form.Handler defaultData={{ postalCode: '0000' }}>
          <Field.PostalCodeAndCity
            country="CH"
            postalCode={{
              path: '/postalCode',
              onChangeValidator,
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )

      expect(postalCodeInput).toHaveValue('0000')

      await userEvent.type(postalCodeInput, '{Backspace}1')

      expect(postalCodeInput).toHaveValue('0001')
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        unsupportedCountry.replace('{country}', 'CH')
      )
    })

    it('should not validate when country path is other than "NO"', async () => {
      render(
        <Form.Handler defaultData={{ postalCode: '0000', country: 'CH' }}>
          <Field.String path="/country" className="country" />
          <Field.PostalCodeAndCity
            country="/country"
            postalCode={{
              path: '/postalCode',
              onChangeValidator,
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )
      const countryInput = document.querySelector('.country input')

      expect(postalCodeInput).toHaveValue('0000')

      // Enter a valid (for Norway) postal code
      await userEvent.type(postalCodeInput, '{Backspace>4}1391')

      expect(postalCodeInput).toHaveValue('1391')
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        unsupportedCountry.replace('{country}', 'CH')
      )

      await userEvent.type(countryInput, '{Backspace>2}NO')

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    it('url config can be a function that gives the value and the country', async () => {
      const url = jest.fn()

      const { withConfig } = Connectors.createContext({
        fetchConfig: { url },
      })

      const onChangeValidator = withConfig(
        Connectors.Bring.postalCode.validator
      )

      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            country="DK"
            postalCode={{
              path: '/postalCode',
              onChangeValidator,
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )

      expect(postalCodeInput).toHaveValue('')

      await userEvent.type(postalCodeInput, '1391')

      expect(url).toHaveBeenCalledTimes(1)
      expect(url).toHaveBeenCalledWith('1391', {
        country: 'dk',
      })
    })
  })

  describe('onBlurValidator', () => {
    let onBlurValidator = null

    beforeEach(() => {
      onBlurValidator = withConfig(Connectors.Bring.postalCode.validator)
    })

    it('should show error when postal code is not valid', async () => {
      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
              onBlurValidator,
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )

      expect(postalCodeInput).toHaveValue('')

      await userEvent.type(postalCodeInput, '0000')
      fireEvent.blur(postalCodeInput)

      expect(postalCodeInput).toHaveValue('0000')
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.PostalCodeAndCity.invalidCode
      )
    })

    it('should prevent submit when postal code is not valid', async () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler
          onSubmit={onSubmit}
          defaultData={{ postalCode: '0000' }}
        >
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
              onBlurValidator,
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )

      fireEvent.submit(document.querySelector('form'))
      await expect(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
      }).toNeverResolve()

      expect(postalCodeInput).toHaveValue('0000')

      await userEvent.type(postalCodeInput, '{Backspace}1')

      expect(postalCodeInput).toHaveValue('0001')

      fireEvent.submit(document.querySelector('form'))
      await expect(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
      }).toNeverResolve()
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })

    it('should not show error when postal code is valid', async () => {
      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
              onBlurValidator,
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )

      expect(postalCodeInput).toHaveValue('')

      await userEvent.type(postalCodeInput, '1391')

      expect(postalCodeInput).toHaveValue('1391')

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    it('should not validate when country is other than "NO"', async () => {
      render(
        <Form.Handler defaultData={{ postalCode: '0000' }}>
          <Field.PostalCodeAndCity
            country="CH"
            postalCode={{
              path: '/postalCode',
              onBlurValidator,
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )

      expect(postalCodeInput).toHaveValue('0000')

      await userEvent.type(postalCodeInput, '{Backspace}1')
      fireEvent.blur(postalCodeInput)

      expect(postalCodeInput).toHaveValue('0001')
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        unsupportedCountry.replace('{country}', 'CH')
      )
    })

    it('should not validate when country path is other than "NO"', async () => {
      render(
        <Form.Handler defaultData={{ postalCode: '0000', country: 'CH' }}>
          <Field.String path="/country" className="country" />
          <Field.PostalCodeAndCity
            country="/country"
            postalCode={{
              path: '/postalCode',
              onBlurValidator,
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )
      const countryInput = document.querySelector('.country input')

      expect(postalCodeInput).toHaveValue('0000')

      // Enter a valid (for Norway) postal code
      await userEvent.type(postalCodeInput, '{Backspace>4}1391')
      fireEvent.blur(postalCodeInput)

      expect(postalCodeInput).toHaveValue('1391')
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        unsupportedCountry.replace('{country}', 'CH')
      )

      await userEvent.type(countryInput, '{Backspace>2}NO')

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    it('url config can be a function that gives the value and the country', async () => {
      const url = jest.fn()

      const { withConfig } = Connectors.createContext({
        fetchConfig: { url },
      })

      const onBlurValidator = withConfig(
        Connectors.Bring.postalCode.validator
      )

      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            country="DK"
            postalCode={{
              path: '/postalCode',
              onBlurValidator,
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )

      expect(postalCodeInput).toHaveValue('')

      await userEvent.type(postalCodeInput, '1391')
      fireEvent.blur(postalCodeInput)

      expect(url).toHaveBeenCalledTimes(1)
      expect(url).toHaveBeenCalledWith('1391', {
        country: 'dk',
      })
    })
  })

  describe('onChange', () => {
    let onChange = null

    beforeEach(() => {
      onChange = withConfig(Connectors.Bring.postalCode.onChange, {
        cityPath: '/city',
      })
    })

    it('should fill city when postal code is valid', async () => {
      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
              onChange,
            }}
            city={{
              path: '/city',
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )
      const cityInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__city .dnb-input__input'
      )

      expect(cityInput).toHaveValue('')

      await userEvent.type(postalCodeInput, '1391')

      expect(postalCodeInput).toHaveValue('1391')
      expect(cityInput).toHaveValue('Vollen')

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    it('should not fill city when country is other than "NO"', async () => {
      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            country="CH"
            postalCode={{
              path: '/postalCode',
              onChange,
            }}
            city={{
              path: '/city',
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )
      const cityInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__city .dnb-input__input'
      )

      expect(postalCodeInput).toHaveValue('')
      expect(cityInput).toHaveValue('')

      await userEvent.type(postalCodeInput, '1391')

      expect(postalCodeInput).toHaveValue('1391')
      expect(cityInput).toHaveValue('')
    })

    it('should not fill city when country path is other than "NO"', async () => {
      render(
        <Form.Handler>
          <Field.String
            path="/country"
            className="country"
            defaultValue="CH"
          />
          <Field.PostalCodeAndCity
            country="/country"
            postalCode={{
              path: '/postalCode',
              onChange,
            }}
            city={{
              path: '/city',
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )
      const cityInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__city .dnb-input__input'
      )
      const countryInput = document.querySelector('.country input')

      expect(postalCodeInput).toHaveValue('')
      expect(cityInput).toHaveValue('')

      await userEvent.type(postalCodeInput, '1391')

      expect(countryInput).toHaveValue('CH')

      expect(postalCodeInput).toHaveValue('1391')
      expect(cityInput).toHaveValue('')

      await userEvent.type(countryInput, '{Backspace>2}NO')
      expect(countryInput).toHaveValue('NO')

      expect(postalCodeInput).toHaveValue('1391')
      expect(cityInput).toHaveValue('Vollen')
    })

    it('should not fill city when invalid postal code is given', async () => {
      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
              onChange,
            }}
            city={{
              path: '/city',
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )
      const cityInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__city .dnb-input__input'
      )

      expect(postalCodeInput).toHaveValue('')
      expect(cityInput).toHaveValue('')

      await userEvent.type(postalCodeInput, '1111')

      expect(postalCodeInput).toHaveValue('1111')
      expect(cityInput).toHaveValue('')
    })

    it('url config can be a function that gives the value and the country', async () => {
      const url = jest.fn()

      const { withConfig } = Connectors.createContext({
        fetchConfig: { url },
      })

      const onChange = withConfig(Connectors.Bring.postalCode.onChange)

      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            country="FI"
            postalCode={{
              path: '/postalCode',
              onChange,
            }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )

      expect(postalCodeInput).toHaveValue('')

      await userEvent.type(postalCodeInput, '1391')

      expect(url).toHaveBeenCalledTimes(1)
      expect(url).toHaveBeenCalledWith('1391', {
        country: 'fi',
      })
    })
  })
})

globalThis.fetch = jest.fn(() => {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    type: 'basic',
    url: '',
    headers: new Headers(),
    body: null,
    bodyUsed: false,
    redirected: false,
    clone: () => {
      return this
    },
    arrayBuffer: async () => {
      return new ArrayBuffer(0)
    },
    blob: async () => {
      return new Blob()
    },
    formData: async () => {
      return new FormData()
    },
    text: () => {
      return Promise.resolve(JSON.stringify(getMockData()))
    },
    json: () => {
      return Promise.resolve(getMockData())
    },
  })
})
