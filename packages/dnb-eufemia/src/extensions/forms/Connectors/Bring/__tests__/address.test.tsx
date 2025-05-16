import React from 'react'
import userEvent from '@testing-library/user-event'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { Connectors, Field, Form } from '../../..'
import { getMockData } from '../address'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

beforeEach(() => {
  globalThis.fetch = createFetchMock()
})

describe('address', () => {
  const { withConfig } = Connectors.createContext({
    fetchConfig: {
      url: (value) => {
        return `/address/api/no/addresses/suggestions?q=${value}`
      },
      headers: {
        'X-Mybring-API-Uid': 'Uid',
        'X-Mybring-API-Key': 'Key',
      },
    },
  })

  describe('autofill', () => {
    let addressSuggestionsElement = null

    beforeEach(() => {
      addressSuggestionsElement = withConfig(
        Connectors.Bring.address.suggestionsElement,
        {
          countryCode: 'NO', // Can be "NO" or a path
          cityPath: '/city',
          postalCodePath: '/postalCode',
        }
      )
    })

    it('should support Autocomplete props', async () => {
      const { rerender } = render(
        <Field.Address.Street element={addressSuggestionsElement} />
      )

      expect(document.querySelector('.dnb-icon')).toBeInTheDocument()

      rerender(
        <Field.Address.Street
          element={addressSuggestionsElement}
          autocompleteProps={{
            inputIcon: false,
          }}
        />
      )

      expect(document.querySelector('.dnb-icon')).not.toBeInTheDocument()
      expect(
        document.querySelector('.dnb-input__placeholder')
      ).toHaveTextContent(nb.StreetAddress.suggestionPlaceholder)
    })

    it('should insert chosen address suggestion', async () => {
      render(
        <Form.Handler>
          <Field.Address.Street element={addressSuggestionsElement} />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'something')
      expect(input.value).toBe('something')

      await userEvent.click(
        document.querySelectorAll('[role="option"]')[0]
      )

      expect(input.value).toBe('Gransvea 37')
    })

    it('should suggest addresses while typing', async () => {
      render(
        <Form.Handler>
          <Field.Address.Street element={addressSuggestionsElement} />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'something')

      await waitFor(() => {
        expect(document.querySelectorAll('[role="option"]')).toHaveLength(
          4
        )
      })

      const options = document.querySelectorAll('[role="option"]')

      // Street
      expect(options[0]).toHaveTextContent('Gransvea 37')
      expect(options[1]).toHaveTextContent('Gransvegen 1')
      expect(options[2]).toHaveTextContent('Gransveien 2')
      expect(options[3]).toHaveTextContent('Somewhere else 100')

      // Municipality
      expect(options[0]).toHaveTextContent('1391 Vollen')
      expect(options[1]).toHaveTextContent('2090 Hurdal')
      expect(options[2]).toHaveTextContent('1900 Fetsund')
      expect(options[3]).toHaveTextContent('1234 City')
    })

    it('should fill city when postal code is valid', async () => {
      render(
        <Form.Handler>
          <Field.Address.Street element={addressSuggestionsElement} />
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
            }}
            city={{
              path: '/city',
            }}
          />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const addressInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )
      const cityInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__city .dnb-input__input'
      )

      expect(addressInput).toHaveValue('')
      expect(cityInput).toHaveValue('')

      await userEvent.type(input, 'something')

      await waitFor(() => {
        expect(document.querySelectorAll('[role="option"]')).toHaveLength(
          4
        )
      })

      await userEvent.click(
        document.querySelectorAll('[role="option"]')[0]
      )
      expect(addressInput).toHaveValue('1391')
      expect(cityInput).toHaveValue('Vollen')

      await userEvent.click(input)
      await userEvent.click(
        document.querySelectorAll('[role="option"]')[1]
      )
      expect(addressInput).toHaveValue('2090')
      expect(cityInput).toHaveValue('Hurdal')

      await userEvent.click(input)
      await userEvent.click(
        document.querySelectorAll('[role="option"]')[2]
      )
      expect(addressInput).toHaveValue('1900')
      expect(cityInput).toHaveValue('Fetsund')

      await userEvent.click(input)
      await userEvent.click(
        document.querySelectorAll('[role="option"]')[3]
      )
      expect(addressInput).toHaveValue('1234')
      expect(cityInput).toHaveValue('City')
    })

    it('should overwrite existing when selecting a new option', async () => {
      render(
        <Form.Handler defaultData={{ postalCode: '1234', city: 'City' }}>
          <Field.Address.Street element={addressSuggestionsElement} />
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
            }}
            city={{
              path: '/city',
            }}
          />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const addressInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )
      const cityInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__city .dnb-input__input'
      )

      expect(addressInput).toHaveValue('1234')
      expect(cityInput).toHaveValue('City')

      await userEvent.type(input, 'something')

      await waitFor(() => {
        expect(document.querySelectorAll('[role="option"]')).toHaveLength(
          4
        )
      })

      await userEvent.click(
        document.querySelectorAll('[role="option"]')[0]
      )
      expect(addressInput).toHaveValue('1391')
      expect(cityInput).toHaveValue('Vollen')
    })

    it('should submit inserted data', async () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.Address.Street element={addressSuggestionsElement} />
          <Field.PostalCodeAndCity
            postalCode={{
              path: '/postalCode',
            }}
            city={{
              path: '/city',
            }}
          />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const addressInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__postal-code .dnb-input__input'
      )
      const cityInput = document.querySelector(
        '.dnb-forms-field-postal-code-and-city__city .dnb-input__input'
      )

      expect(addressInput).toHaveValue('')
      expect(cityInput).toHaveValue('')

      await userEvent.type(input, 'something')

      await waitFor(() => {
        expect(document.querySelectorAll('[role="option"]')).toHaveLength(
          4
        )
      })

      await userEvent.click(
        document.querySelectorAll('[role="option"]')[0]
      )
      expect(addressInput).toHaveValue('1391')
      expect(cityInput).toHaveValue('Vollen')

      fireEvent.submit(document.querySelector('form'))

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          postalCode: '1391',
          city: 'Vollen',
        },
        expect.anything()
      )
    })

    it('should have no options when country is other than "NO"', async () => {
      addressSuggestionsElement = withConfig(
        Connectors.Bring.address.suggestionsElement,
        {
          countryCode: '/countryCode',
          cityPath: '/city',
          postalCodePath: '/postalCode',
        }
      )

      render(
        <Form.Handler defaultData={{ countryCode: 'SE' }}>
          <Field.Address.Street element={addressSuggestionsElement} />
          <Field.PostalCodeAndCity
            countryCode="/countryCode"
            postalCode={{
              path: '/postalCode',
            }}
            city={{
              path: '/city',
            }}
          />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'something')

      expect(document.querySelectorAll('[role="option"]')).toHaveLength(0)
    })

    it('url config can be a function that gives the value and the country', async () => {
      const url = jest.fn()

      const { withConfig } = Connectors.createContext({
        fetchConfig: { url },
      })

      addressSuggestionsElement = withConfig(
        Connectors.Bring.address.suggestionsElement,
        {
          countryCode: 'NO',
          cityPath: '/city',
          postalCodePath: '/postalCode',
        }
      )

      render(
        <Form.Handler>
          <Field.Address.Street element={addressSuggestionsElement} />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'foo')

      expect(url).toHaveBeenCalledTimes(3)
      expect(url).toHaveBeenLastCalledWith('foo', {
        countryCode: 'no',
      })
    })
  })
})

function createFetchMock(overwrite = null, delay = null) {
  return jest.fn(async () => {
    await delay?.()
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
      ...overwrite,
    })
  })
}
