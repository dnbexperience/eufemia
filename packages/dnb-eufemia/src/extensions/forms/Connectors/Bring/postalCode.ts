import type { Path, PathStrict, UseFieldProps } from '../../types'
import { FormError } from '../../utils'
import {
  GeneralConfig,
  HandlerConfig,
  PreResponseResolver,
  ResponseResolver,
  fetchData,
  getCountryCodeValue,
  handleCountryPath,
  isSupportedCountryCode,
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
] as const
export type SupportedCountries = (typeof supportedCountryCodes)[number]

type AutofillHandlerConfig = HandlerConfig & {
  countryCode?:
    | PathStrict
    | SupportedCountries
    | Lowercase<SupportedCountries>
}

export const unsupportedCountryCodeMessage =
  'Postal code verification is not supported for {countryCode}.'

export type PostalCodeResolverData = {
  postal_codes: { postal_code: string; city: string }[]
}
export type PostalCodeResolverPayload = {
  city: string
}

export const preResponseResolver: PreResponseResolver = ({ value }) => {
  if (!value) {
    return { postal_codes: [] }
  }
}

export const responseResolver: ResponseResolver<
  PostalCodeResolverData,
  PostalCodeResolverPayload
> = (data, handlerConfig) => {
  const resolver = handlerConfig?.responseResolver
  if (typeof resolver === 'function') {
    return resolver(data) as ReturnType<typeof resolver> & {
      payload: PostalCodeResolverPayload
    }
  }

  const { postal_code, city } = data?.postal_codes?.[0] || {}

  return {
    matcher: (value) => value === postal_code,
    payload: { city },
  }
}

export function autofill(
  generalConfig: GeneralConfig,
  handlerConfig?: AutofillHandlerConfig & { cityPath: Path }
): UseFieldProps<string>['onChange'] {
  const abortControllerRef = { current: null }

  return async function autofillHandler(value, additionalArgs) {
    if (!(typeof value === 'string' && value.length >= 4)) {
      return // stop here
    }

    // Get country code from path or use given countryCode value
    const { countryCode } = handleCountryPath({
      value,
      countryCode: handlerConfig?.countryCode,
      additionalArgs,
      handler: autofillHandler,
    })

    if (!isSupportedCountryCode(countryCode, supportedCountryCodes)) {
      return // stop here
    }

    try {
      const parameters = {
        countryCode: String(countryCode).toLowerCase(),
      }
      const { data } = await fetchData<PostalCodeResolverData>(value, {
        generalConfig,
        parameters,
        abortControllerRef,
        preResponseResolver:
          handlerConfig?.preResponseResolver ?? preResponseResolver,
      })

      const onMatch = (payload: PostalCodeResolverPayload) => {
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
  handlerConfig?: AutofillHandlerConfig
):
  | UseFieldProps<string>['onChangeValidator']
  | UseFieldProps<string>['onBlurValidator'] {
  const abortControllerRef = { current: null }

  return async function validatorHandler(value, additionalArgs) {
    if (!(typeof value === 'string' && value.length >= 4)) {
      return // stop here
    }

    const { countryCode } = getCountryCodeValue({ additionalArgs })

    if (!isSupportedCountryCode(countryCode, supportedCountryCodes)) {
      return new Error(
        unsupportedCountryCodeMessage.replace('{countryCode}', countryCode)
      )
    }

    try {
      const parameters = {
        countryCode: String(countryCode).toLowerCase(),
      }
      const { data, status } = await fetchData<PostalCodeResolverData>(
        value,
        {
          generalConfig,
          parameters,
          abortControllerRef,
          preResponseResolver:
            handlerConfig?.preResponseResolver ?? preResponseResolver,
        }
      )

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
