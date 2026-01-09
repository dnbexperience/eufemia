import React from 'react'
import type { Props as SelectionProps } from '../../Field/Selection'
import Selection from '../../Field/Selection'
import type {
  Path,
  PathStrict,
  ReceiveAdditionalEventArgs,
  UseFieldProps,
} from '../../types'
import useTranslation from '../../hooks/useTranslation'
import type {
  GeneralConfig,
  HandlerConfig,
  PreResponseResolver,
  ResponseResolver,
} from '../createContext'
import {
  fetchData,
  handleCountryPath,
  isSupportedCountryCode,
} from '../createContext'
import type { DrawerListDataArrayObjectStrict } from '../../../../fragments/drawer-list/DrawerList'

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
  event: {
    value: string
    showIndicator: () => void
    hideIndicator: () => void
    updateData: (data: AddressResolverPayload) => void
  } & ReceiveAdditionalEventArgs<string>
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
    const street = [item.street_name, item.house_number]
      .filter(Boolean)
      .join(' ')
    const city = [item.postal_code, item.city].filter(Boolean).join(' ')

    return {
      item,
      selectedValue: street,
      selectedKey: street || item['address_id'],
      content: [street, city],
    } satisfies DrawerListDataArrayObjectStrict &
      Pick<AddressResolverPayload[0], 'item'>
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

  return async function suggestionsHandlerWrapper(event) {
    return await suggestionsHandler(event.value, event)
  }

  async function suggestionsHandler(
    value: string,
    additionalArgs: ReceiveAdditionalEventArgs<string> & {
      showIndicator: () => void
      hideIndicator: () => void
      updateData: (data: AddressResolverPayload) => void
    }
  ) {
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
    const { cityPath, postalCodePath } = handlerConfig || {}
    const data = additionalArgs?.data as AddressResolverPayload[0]
    if (data) {
      const dataContext = additionalArgs.dataContext

      dataContext.handlePathChangeUnvalidated(
        postalCodePath,
        data.item.postal_code
      )

      dataContext.handlePathChangeUnvalidated(cityPath, data.item.city)
    }
  }

  const Autocomplete = (props: SelectionProps) => {
    const { suggestionPlaceholder } = useTranslation().StreetAddress
    return (
      <Selection
        variant="autocomplete"
        {...props}
        autocompleteProps={{
          mode: 'async',
          disableFilter: true,
          keepValue: true,
          openOnFocus: true,
          placeholder: suggestionPlaceholder,
          onType,
          ...props?.autocompleteProps,
        }}
        onChange={onChange}
      />
    )
  }

  return Autocomplete
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
            address_id: '1398742',
            street_name: 'Gransvea',
            house_number: 37,
            postal_code: '1391',
            city: 'Vollen',
            county: 'Akershus',
            municipality: 'Asker',
            type: 'STREET',
          },
          {
            address_id: '3168496',
            street_name: 'Gransvegen',
            house_number: 1,
            postal_code: '2090',
            city: 'Hurdal',
            county: 'Akershus',
            municipality: 'Hurdal',
            type: 'STREET',
          },
          {
            address_id: '325829',
            street_name: 'Gransveien',
            house_number: 2,
            postal_code: '1900',
            city: 'Fetsund',
            county: 'Akershus',
            municipality: 'Lillestrøm',
            type: 'STREET',
          },
          {
            address_id: '325829',
            street_name: 'Somewhere else',
            house_number: 100,
            postal_code: '1234',
            city: 'City',
            county: 'County',
            municipality: 'Municipality',
            type: 'STREET',
          },
        ],
      }
  }
}
