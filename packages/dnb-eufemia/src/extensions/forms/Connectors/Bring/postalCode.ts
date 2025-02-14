import type { UseFieldProps } from '../../types'
import { FormError } from '../../utils'
import {
  GeneralConfig,
  fetchData,
  getCountryValue,
  handleCountryPath,
} from '../createContext'

export const supportedCountries = [
  'NO', // Norway
  'DK', // Denmark
  'SE', // Sweden
  'FI', // Finland
  'NL', // Netherlands
  'DE', // Germany
  'US', // United States
  'BE', // Belgium
  'FO', // Faroe Islands
  'GL', // Greenland
  'IS', // Iceland
  'SJ', // Svalbard and Jan Mayen
]

export type HandlerConfig = {
  cityPath: string
}

export const unsupportedCountry =
  'Postal code verification is not supported for {country}.'

export function autofill(
  generalConfig: GeneralConfig,
  handlerConfig?: HandlerConfig
): UseFieldProps<string>['onChange'] {
  const abortControllerRef = { current: null }

  return async function autofillHandler(value, additionalArgs) {
    if (!(typeof value === 'string' && value.length >= 4)) {
      return // stop here
    }

    const { country } = handleCountryPath({
      value,
      additionalArgs,
      handler: autofillHandler,
    })

    if (country && !supportedCountries.includes(country)) {
      return // stop here
    }

    try {
      const parameters = {
        country: String(country).toLowerCase(),
      }
      const { data } = await fetchData(value, {
        generalConfig,
        parameters,
        abortControllerRef,
        returnResult: () => {
          if (!value) {
            return { postal_codes: [] }
          }
        },
      })

      const { postal_code, city } = data?.postal_codes?.[0] || {}
      if (postal_code === value) {
        const path = handlerConfig?.cityPath
        if (path) {
          if (!additionalArgs.dataContext) {
            throw new Error(
              'No data context found in the postalCode connector'
            )
          }
          additionalArgs.dataContext.handlePathChangeUnvalidated(
            path,
            city
          )
        }
      }
    } catch (error) {
      return error
    }
  }
}

export function validator(
  generalConfig: GeneralConfig
):
  | UseFieldProps<string>['onChangeValidator']
  | UseFieldProps<string>['onBlurValidator'] {
  const abortControllerRef = { current: null }

  return async function validatorHandler(value, additionalArgs) {
    if (!(typeof value === 'string' && value.length >= 4)) {
      return // stop here
    }

    const { country } = getCountryValue({ additionalArgs })

    if (country && !supportedCountries.includes(country)) {
      return new Error(unsupportedCountry.replace('{country}', country))
    }

    try {
      const parameters = {
        country: String(country).toLowerCase(),
      }
      const { data, status } = await fetchData(value, {
        generalConfig,
        parameters,
        abortControllerRef,
        returnResult: () => {
          if (!value) {
            return { postal_codes: [] }
          }
        },
      })

      if (
        status !== 400 &&
        data?.postal_codes?.[0]?.postal_code !== value
      ) {
        return new FormError('PostalCodeAndCity.invalidCode')
      }
    } catch (error) {
      return error
    }
  }
}

export function getMockData(country?: string) {
  switch (String(country).toUpperCase()) {
    case 'SE':
      return {
        postal_codes: [
          {
            city: 'Stockholm',
            postal_code: '11432',
          },
        ],
      }
    case 'NO':
    default:
      return {
        postal_codes: [
          {
            city: 'Vollen',
            postal_code: '1391',
          },
        ],
      }
  }
}
