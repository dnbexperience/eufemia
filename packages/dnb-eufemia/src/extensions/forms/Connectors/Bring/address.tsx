import Autocomplete, {
  Props as AutocompleteProps,
} from '../../Field/Autocomplete/Autocomplete'
import {
  Path,
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
  selected_value: string
  selected_key: string
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
      selected_value: street,
      selected_key: street,
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

    const { countryCode } = handleCountryPath({
      value,
      additionalArgs,
      handler: suggestionsHandler,
    })

    if (countryCode && !supportedCountries.includes(countryCode)) {
      return // stop here
    }

    try {
      additionalArgs.showIndicator()

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
    additionalArgs.dataContext.handlePathChangeUnvalidated(
      '/postalCode',
      additionalArgs.data.item.postal_code
    )
    additionalArgs.dataContext.handlePathChangeUnvalidated(
      '/city',
      additionalArgs.data.item.city
    )
  }

  const Component = (props: AutocompleteProps) => {
    return (
      <Autocomplete
        mode="async"
        disableFilter
        keepValue
        placeholder="Write and find address"
        onType={onType}
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
