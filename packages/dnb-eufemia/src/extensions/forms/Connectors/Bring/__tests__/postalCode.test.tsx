import userEvent from '@testing-library/user-event'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { Connectors, Field, Form } from '../../..'
import { getMockData, unsupportedCountryCodeMessage } from '../postalCode'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

beforeEach(() => {
  globalThis.fetch = createFetchMock()
})

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

    it('should not reveal a stale pattern error when blurred while fetching', async () => {
      let resolveFetch: () => void = () => undefined
      const fetchPromise = new Promise<void>((resolve) => {
        resolveFetch = resolve
      })
      globalThis.fetch = createFetchMock(null, () => fetchPromise)

      const onChange = withConfig(Connectors.Bring.postalCode.autofill, {
        cityPath: '/city',
      })

      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
              onChangeValidator,
              onChange,
            }}
            city={{ path: '/city' }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )

      for (const value of ['1', '11', '111', '1111']) {
        fireEvent.change(postalCodeInput, { target: { value } })
      }
      fireEvent.blur(postalCodeInput)

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      resolveFetch()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(nb.PostalCodeAndCity.invalidCode)
      })
    })

    it('should show pending indicator only while fetching', async () => {
      let resolveFetch: () => void = () => undefined
      const fetchPromise = new Promise<void>((resolve) => {
        resolveFetch = resolve
      })
      globalThis.fetch = createFetchMock(null, () => fetchPromise)

      for (const value of ['1', '13', '139']) {
        expect(onChangeValidator(value)).not.toBeInstanceOf(Promise)
      }

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

      const postalCodeBlock = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code'
      )
      const cityBlock = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__city'
      )
      const postalCodeInput = postalCodeBlock.querySelector(
        '.dnb-input__input'
      )
      const postalCodeIndicator = postalCodeBlock.querySelector(
        '.dnb-forms-submit-indicator'
      )
      const cityIndicator = cityBlock.querySelector(
        '.dnb-forms-submit-indicator'
      )

      for (const value of ['1', '13', '139']) {
        fireEvent.change(postalCodeInput, { target: { value } })

        expect(globalThis.fetch).not.toHaveBeenCalled()
        expect(postalCodeIndicator).not.toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
        expect(cityIndicator).not.toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
      }

      fireEvent.change(postalCodeInput, { target: { value: '1391' } })

      await waitFor(() => {
        expect(globalThis.fetch).toHaveBeenCalledTimes(1)
        expect(postalCodeIndicator).toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
      })
      expect(cityIndicator).not.toHaveClass(
        'dnb-forms-submit-indicator--state-pending'
      )

      resolveFetch()

      await waitFor(() => {
        expect(postalCodeIndicator).not.toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
      })
    })

    it('should keep pending indicator while autofill is fetching', async () => {
      let resolveValidation: () => void = () => undefined
      let resolveAutofill: () => void = () => undefined
      const validationPromise = new Promise<void>((resolve) => {
        resolveValidation = resolve
      })
      const autofillPromise = new Promise<void>((resolve) => {
        resolveAutofill = resolve
      })
      let requestCount = 0
      globalThis.fetch = createFetchMock(null, () => {
        requestCount++
        return requestCount === 1 ? validationPromise : autofillPromise
      })

      const onChange = withConfig(Connectors.Bring.postalCode.autofill, {
        cityPath: '/city',
      })

      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
              onChangeValidator,
              onChange,
            }}
            city={{ path: '/city' }}
          />
        </Form.Handler>
      )

      const postalCodeBlock = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code'
      )
      const postalCodeInput = postalCodeBlock.querySelector(
        '.dnb-input__input'
      )
      const postalCodeIndicator = postalCodeBlock.querySelector(
        '.dnb-forms-submit-indicator'
      )
      const cityInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__city .dnb-input__input'
      )

      fireEvent.change(postalCodeInput, { target: { value: '1391' } })

      await waitFor(() => {
        expect(globalThis.fetch).toHaveBeenCalledTimes(1)
        expect(postalCodeIndicator).toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
      })

      resolveValidation()

      await waitFor(() => {
        expect(globalThis.fetch).toHaveBeenCalledTimes(2)
      })
      expect(cityInput).toHaveValue('')
      expect(postalCodeIndicator).toHaveClass(
        'dnb-forms-submit-indicator--state-pending'
      )

      resolveAutofill()

      await waitFor(() => {
        expect(cityInput).toHaveValue('Vollen')
        expect(postalCodeIndicator).not.toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
      })
    })

    it('should clear pending indicator after submitting a valid postal code', async () => {
      const onSubmit = vi.fn()
      const onChange = withConfig(Connectors.Bring.postalCode.autofill, {
        cityPath: '/city',
      })

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
              onChangeValidator,
              onChange,
            }}
            city={{ path: '/city' }}
          />
        </Form.Handler>
      )

      const postalCodeBlock = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code'
      )
      const postalCodeInput = postalCodeBlock.querySelector(
        '.dnb-input__input'
      )
      const postalCodeIndicator = postalCodeBlock.querySelector(
        '.dnb-forms-submit-indicator'
      )
      const cityInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__city .dnb-input__input'
      )

      await userEvent.type(postalCodeInput, '1391')

      await waitFor(() => {
        expect(cityInput).toHaveValue('Vollen')
        expect(postalCodeIndicator).not.toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
      })

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(postalCodeIndicator).not.toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
      })
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
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.PostalCodeAndCity.invalidCode
      )
    })

    it('should not show 400 status code error while typing', async () => {
      globalThis.fetch = createFetchMock({
        status: 400,
      })

      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            // Use SE ini order to call "fetch" twice.
            countryCode="SE"
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

      await userEvent.type(postalCodeInput, '0000')

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })

      // Without default status
      globalThis.fetch = createFetchMock()

      await userEvent.type(postalCodeInput, '0')

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(nb.PostalCodeAndCity.invalidCode)
      })
    })

    it('should use AbortController to cancel request while typing', async () => {
      const mockAbort = vi.fn()

      const mockSignal = {
        aborted: false,
        onabort: null,
        reason: undefined,
        throwIfAborted: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }

      globalThis.AbortController = vi.fn(function () {
        return {
          signal: mockSignal,
          abort: mockAbort,
        }
      })

      // With delay so we can abort
      globalThis.fetch = createFetchMock(null, async () => {
        await new Promise((resolve) => setTimeout(resolve, 10))
      })

      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            // Use SE ini order to call "fetch" twice.
            countryCode="SE"
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

      await userEvent.type(postalCodeInput, '00000')

      expect(mockAbort).toHaveBeenCalledTimes(1)

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(nb.PostalCodeAndCity.invalidCode)
      })
    })

    it('should prevent submit when postal code is not valid', async () => {
      const onSubmit = vi.fn()

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

      await waitFor(() => {
        expect(postalCodeInput).toHaveValue('0001')
      })

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
            countryCode="CH"
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
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        unsupportedCountryCodeMessage.replace('{countryCode}', 'CH')
      )
    })

    it('should not validate when countryCode path is other than "NO"', async () => {
      render(
        <Form.Handler
          defaultData={{ postalCode: '0000', countryCode: 'CH' }}
        >
          <Field.String path="/countryCode" className="country" />
          <Field.PostalCodeAndCity
            countryCode="/countryCode"
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
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        unsupportedCountryCodeMessage.replace('{countryCode}', 'CH')
      )

      await userEvent.type(countryInput, '{Backspace>2}NO')

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    it('url config can be a function that gives the value and the country', async () => {
      const url = vi.fn()

      const { withConfig } = Connectors.createContext({
        fetchConfig: { url },
      })

      const onChangeValidator = withConfig(
        Connectors.Bring.postalCode.validator
      )

      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            countryCode="DK"
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
        countryCode: 'dk',
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
      const onSubmit = vi.fn()

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

      await waitFor(() => {
        expect(postalCodeInput).toHaveValue('0001')
      })

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
            countryCode="CH"
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
        unsupportedCountryCodeMessage.replace('{countryCode}', 'CH')
      )
    })

    it('should not validate when countryCode path is other than "NO"', async () => {
      render(
        <Form.Handler
          defaultData={{ postalCode: '0000', countryCode: 'CH' }}
        >
          <Field.String path="/countryCode" className="country" />
          <Field.PostalCodeAndCity
            countryCode="/countryCode"
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
        unsupportedCountryCodeMessage.replace('{countryCode}', 'CH')
      )

      await userEvent.type(countryInput, '{Backspace>2}NO')

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    it('should not validate when countryCode given in config is other than "NO"', async () => {
      render(
        <Field.PostalCodeAndCity
          countryCode="CH"
          postalCode={{
            onBlurValidator,
          }}
        />
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )

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
        unsupportedCountryCodeMessage.replace('{countryCode}', 'CH')
      )
    })

    it('url config can be a function that gives the value and the country', async () => {
      const url = vi.fn()

      const { withConfig } = Connectors.createContext({
        fetchConfig: { url },
      })

      const onBlurValidator = withConfig(
        Connectors.Bring.postalCode.validator
      )

      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            countryCode="DK"
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
        countryCode: 'dk',
      })
    })
  })

  describe('autofill', () => {
    let onChange = null

    beforeEach(() => {
      onChange = withConfig(Connectors.Bring.postalCode.autofill, {
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

    it('should only fill city when empty', async () => {
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

      await userEvent.type(cityInput, 'something')
      expect(cityInput).toHaveValue('something')

      await userEvent.type(postalCodeInput, '1391')

      expect(postalCodeInput).toHaveValue('1391')
      expect(cityInput).toHaveValue('something')

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
            countryCode="CH"
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

    it('should not fill city when countryCode path is other than "NO"', async () => {
      render(
        <Form.Handler>
          <Field.String
            path="/countryCode"
            className="country"
            defaultValue="CH"
          />
          <Field.PostalCodeAndCity
            countryCode="/countryCode"
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

    it('should not fill city from a stale request', async () => {
      let resolveFetch: () => void = () => undefined
      const fetchPromise = new Promise<void>((resolve) => {
        resolveFetch = resolve
      })
      globalThis.fetch = createFetchMock(null, () => fetchPromise)

      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
              onChange,
            }}
            city={{ path: '/city' }}
          />
        </Form.Handler>
      )

      const postalCodeInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )
      const cityInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__city .dnb-input__input'
      )

      fireEvent.change(postalCodeInput, { target: { value: '1391' } })

      await waitFor(() => {
        expect(globalThis.fetch).toHaveBeenCalledTimes(1)
      })

      fireEvent.change(postalCodeInput, { target: { value: '139' } })
      resolveFetch()

      await waitFor(() => {
        expect(postalCodeInput).toHaveValue('139')
        expect(cityInput).toHaveValue('')
      })
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
      const url = vi.fn()

      const { withConfig } = Connectors.createContext({
        fetchConfig: { url },
      })

      const onChange = withConfig(Connectors.Bring.postalCode.autofill)

      render(
        <Form.Handler>
          <Field.PostalCodeAndCity
            countryCode="FI"
            postalCode={{
              path: '/postalCode',
              onChange: onChange as (value: string) => void,
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
        countryCode: 'fi',
      })
    })
  })
})

function createFetchMock(overwrite = null, delay = null) {
  return vi.fn(async () => {
    await delay?.()
    const response = {
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
        return response
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
      ...overwrite,
    }
    return Promise.resolve(response)
  })
}
