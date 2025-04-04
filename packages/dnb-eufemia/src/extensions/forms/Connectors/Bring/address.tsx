import React from 'react'
import { Field } from '../..'
import { Props as AutocompleteProps } from '../../Field/Selection'
import {
  Path,
  PathStrict,
  ReceiveAdditionalEventArgs,
  UseFieldProps,
} from '../../types'
import {
  GeneralConfig,
  HandlerConfig,
  PreResponseResolver,
  ResponseResolver,
  fetchData,
  handleCountryPath,
  isSupportedCountryCode,
} from '../createContext'

export const supportedCountryCodes = [
  'NO', // Norway
] as const
export type SupportedCountries = (typeof supportedCountryCodes)[number]

export const unsupportedCountryMessage =
  'Postal code verification is not supported for {countryCode}.'

export type AddressResolverData = {
  addresses: {
    street_name: string
    house_number: string
    postal_code: string
    city: string
  }[]
}
export type AddressResolverPayload = Array<{
  item: AddressResolverData['addresses'][0]
  selectedValue: string
  selectedKey: string
  content: string[]
}>

type SuggestionsConnectorReturn = (
  value: string,
  additionalArgs: ReceiveAdditionalEventArgs<string> & {
    showIndicator: () => void
    hideIndicator: () => void
    updateData: (data: AddressResolverPayload) => void
  }
) => Promise<void>

type SuggestionsHandlerConfig = HandlerConfig & {
  countryCode?:
    | PathStrict
    | SupportedCountries
    | Lowercase<SupportedCountries>
  cityPath: Path
  postalCodePath: Path
}

export const preResponseResolver: PreResponseResolver = ({ value }) => {
  if (!value) {
    return { addresses: [] }
  }
}

export const responseResolver: ResponseResolver<
  AddressResolverData,
  AddressResolverPayload
> = (data, handlerConfig) => {
  const resolver = handlerConfig?.responseResolver
  if (typeof resolver === 'function') {
    return resolver(data) as ReturnType<typeof resolver> & {
      payload: AddressResolverPayload
    }
  }

  const payload = data?.addresses.map((item) => {
    const street = [item.street_name, item.house_number].join(' ')
    const city = [item.postal_code, item.city].join(' ')
    return {
      item,
      selectedValue: street,
      selectedKey: street,
      content: [street, city],
    }
  })

  return {
    payload,
  }
}

export function suggestions(
  generalConfig: GeneralConfig,
  handlerConfig?: SuggestionsHandlerConfig
): SuggestionsConnectorReturn {
  const abortControllerRef = { current: null }

  return async function suggestionsHandler(value, additionalArgs) {
    if (!(typeof value === 'string')) {
      return // stop here
    }

    // Get country code from path or use given countryCode value
    const { countryCode } = handleCountryPath({
      value,
      countryCode: handlerConfig?.countryCode,
      additionalArgs,
      handler: suggestionsHandler,
    })

    if (!isSupportedCountryCode(countryCode, supportedCountryCodes)) {
      return // stop here
    }

    try {
      // additionalArgs.showIndicator()

      const parameters = {
        countryCode: String(countryCode).toLowerCase(),
      }
      const { data } = await fetchData<AddressResolverData>(value, {
        generalConfig,
        parameters,
        abortControllerRef,
        preResponseResolver:
          handlerConfig?.preResponseResolver ?? preResponseResolver,
      })

      const { payload } = responseResolver(data, handlerConfig)

      additionalArgs.updateData(payload)
      additionalArgs.hideIndicator()
    } catch (error) {
      additionalArgs.hideIndicator()
      return error
    }
  }
}

export function suggestionsElement(
  generalConfig: GeneralConfig,
  handlerConfig?: SuggestionsHandlerConfig
) {
  const onType = suggestions(generalConfig, handlerConfig)
  const onChange: UseFieldProps<string>['onChange'] = (
    value,
    additionalArgs
  ) => {
    const { dataContext, ...rest } = additionalArgs || {}
    const data = rest?.['data']
    if (data) {
      dataContext.handlePathChangeUnvalidated(
        '/postalCode',
        data.item.postal_code
      )
      dataContext.handlePathChangeUnvalidated('/city', data.item.city)
    }
  }

  const Component = (props: AutocompleteProps) => {
    return (
      <Field.Selection
        variant="autocomplete"
        autocompleteProps={{
          mode: 'async',
          disableFilter: true,
          keepValue: true,
          openOnFocus: true,
          inputIcon: false,
          // keepValueAndSelection: true,
          placeholder: 'Write and find address',
          onType,
        }}
        onChange={onChange}
        {...props}
      />
    )
  }

  return Component
}

export function getMockData(countryCode?: string) {
  switch (String(countryCode).toUpperCase()) {
    case 'SE':
      return {
        addresses: [],
      }
    case 'NO':
    default:
      return {
        addresses: [
          {
            id: 'NO-3203-01479',
            name: 'Gransvea',
            postal_code: '1391',
            city: 'Vollen',
            county: 'Akershus',
            type: 'STREET',
          },
          {
            id: 'NO-3242-01078',
            name: 'Gransvegen',
            postal_code: '2090',
            city: 'Hurdal',
            county: 'Akershus',
            type: 'STREET',
          },
          {
            id: 'NO-3205-17186',
            name: 'Gransveien',
            postal_code: '1900',
            city: 'Fetsund',
            county: 'Akershus',
            type: 'STREET',
          },
          {
            id: 'NO-3205-17186',
            name: 'Gransveien',
            postal_code: '1900',
            city: 'Fetsund',
            county: 'Akershus',
            type: 'STREET',
          },
        ],
      }
  }
}
