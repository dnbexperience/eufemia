import type { UseFieldProps } from '../../types'
import { FormError } from '../../utils'
import {
  GeneralConfig,
  HandlerConfig,
  PreResponseResolver,
  ResponseResolver,
  fetchData,
  getCountryCodeValue,
  handleCountryPath,
} from '../createContext'

export const supportedCountryCodes = [
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

export const unsupportedCountryCode =
  'Postal code verification is not supported for {countryCode}.'

export type AutofillResolverResponse = {
  postal_codes: { postal_code: string; city: string }[]
}
export type AutofillResolverPayload = {
  city: string
}

export const preResponseResolver: PreResponseResolver = ({ value }) => {
  if (!value) {
    return { postal_codes: [] }
  }
}

export const responseResolver: ResponseResolver<
  AutofillResolverResponse,
  AutofillResolverPayload
> = (response, handlerConfig) => {
  const resolver = handlerConfig?.responseResolver
  if (typeof resolver === 'function') {
    return resolver(response) as ReturnType<typeof resolver> & {
      payload: AutofillResolverPayload
    }
  }

  const { postal_code, city } = response?.postal_codes?.[0] || {}

  return {
    matcher: (value) => value === postal_code,
    payload: { city },
  }
}

export function autofill(
  generalConfig: GeneralConfig,
  handlerConfig?: HandlerConfig & { cityPath: string }
): UseFieldProps<string>['onChange'] {
  const abortControllerRef = { current: null }

  return async function autofillHandler(value, additionalArgs) {
    if (!(typeof value === 'string' && value.length >= 4)) {
      return // stop here
    }

    const { countryCode } = handleCountryPath({
      value,
      additionalArgs,
      handler: autofillHandler,
    })

    if (countryCode && !supportedCountryCodes.includes(countryCode)) {
      return // stop here
    }

    try {
      const parameters = {
        countryCode: String(countryCode).toLowerCase(),
      }
      const { data } = await fetchData(value, {
        generalConfig,
        parameters,
        abortControllerRef,
        preResponseResolver:
          handlerConfig?.preResponseResolver ?? preResponseResolver,
      })

      const onMatch = (payload: AutofillResolverPayload) => {
        const { cityPath } = handlerConfig || {}
        if (cityPath) {
          if (!additionalArgs.dataContext) {
            throw new Error(
              'No data context found in the postalCode connector'
            )
          }
          additionalArgs.dataContext.handlePathChangeUnvalidated(
            cityPath,
            payload.city
          )
        }
      }

      const { matcher, payload } = responseResolver(data, handlerConfig)
      const match = matcher(value)

      if (match) {
        return onMatch(payload)
      }
    } catch (error) {
      return error
    }
  }
}

export function validator(
  generalConfig: GeneralConfig,
  handlerConfig?: HandlerConfig
):
  | UseFieldProps<string>['onChangeValidator']
  | UseFieldProps<string>['onBlurValidator'] {
  const abortControllerRef = { current: null }

  return async function validatorHandler(value, additionalArgs) {
    if (!(typeof value === 'string' && value.length >= 4)) {
      return // stop here
    }

    const { countryCode } = getCountryCodeValue({ additionalArgs })

    if (countryCode && !supportedCountryCodes.includes(countryCode)) {
      return new Error(
        unsupportedCountryCode.replace('{countryCode}', countryCode)
      )
    }

    try {
      const parameters = {
        countryCode: String(countryCode).toLowerCase(),
      }
      const { data, status } = await fetchData(value, {
        generalConfig,
        parameters,
        abortControllerRef,
        preResponseResolver:
          handlerConfig?.preResponseResolver ?? preResponseResolver,
      })

      const onMatch = () => {
        return new FormError('PostalCodeAndCity.invalidCode')
      }

      const { matcher } = responseResolver(data, handlerConfig)
      const match = matcher(value)

      if (status !== 400 && !match) {
        return onMatch()
      }
    } catch (error) {
      return error
    }
  }
}

export function getMockData(countryCode?: string) {
  switch (String(countryCode).toUpperCase()) {
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
