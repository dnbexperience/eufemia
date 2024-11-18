import type {
  ReceiveAdditionalEventArgs,
  UseFieldProps,
} from '../../types'
import { FormError } from '../../utils'
import {
  GeneralConfig,
  UrlSecondParameter,
  fetchDataFromAPI,
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

async function fetchData(
  value: string,
  generalConfig: GeneralConfig,
  parameters?: UrlSecondParameter
) {
  if (!value) {
    return { postal_codes: [] }
  }

  const u = generalConfig.fetchConfig.url
  const url = typeof u === 'function' ? await u(value, parameters) : u

  return await fetchDataFromAPI({
    ...generalConfig,
    fetchConfig: {
      ...generalConfig.fetchConfig,
      url,
    },
  })
}

export function onChange(
  generalConfig: GeneralConfig,
  handlerConfig?: HandlerConfig
): UseFieldProps<string>['onChange'] {
  return async function onChangeHandler(value, additionalArgs) {
    if (!(typeof value === 'string' && value.length >= 4)) {
      return // stop here
    }

    const { country } = handleCountryPath({
      value,
      additionalArgs,
      handlerId: 'onChangeHandler',
      handler: onChangeHandler,
    })

    if (country && !supportedCountries.includes(country)) {
      return // stop here
    }

    try {
      const data = await fetchData(value, generalConfig, {
        country: String(country).toLowerCase(),
      })

      const { postal_code, city } = data?.postal_codes[0] || {}
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

export function onChangeValidator(
  generalConfig: GeneralConfig
): UseFieldProps<string>['onChangeValidator'] {
  return async function onChangeValidatorHandler(value, additionalArgs) {
    if (!(typeof value === 'string' && value.length >= 4)) {
      return // stop here
    }

    const { country } = getCountryValue({ additionalArgs })

    if (country && !supportedCountries.includes(country)) {
      return new Error(unsupportedCountry.replace('{country}', country))
    }

    try {
      const data = await fetchData(value, generalConfig, {
        country: String(country).toLowerCase(),
      })

      if (data?.postal_codes?.[0]?.postal_code !== value) {
        return new FormError('PostalCodeAndCity.invalidCode')
      }
    } catch (error) {
      return error
    }
  }
}

function getCountryValue({
  additionalArgs,
}: {
  additionalArgs: ReceiveAdditionalEventArgs<unknown>
}) {
  const countryValue = additionalArgs.props['data-country']
  const country = additionalArgs.getSourceValue<string>(countryValue)

  return { country, countryValue }
}

function handleCountryPath({
  value,
  additionalArgs,
  handlerId,
  handler,
}: {
  value: string
  additionalArgs: ReceiveAdditionalEventArgs<unknown>
  handlerId: string
  handler: (
    value: string,
    additionalArgs: ReceiveAdditionalEventArgs<unknown>
  ) => void
}) {
  const { country, countryValue } = getCountryValue({ additionalArgs })

  if (
    String(countryValue).startsWith('/') &&
    additionalArgs[handlerId] !== handler
  ) {
    additionalArgs[handlerId] = handler
    additionalArgs.setFieldEventListener(
      countryValue,
      'onPathChange',
      () => {
        handler(value, additionalArgs)
      }
    )
  }

  return { country }
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
