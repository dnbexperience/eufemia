import type { ReceiveAdditionalEventArgs } from '../types'
import { isPath } from '../utils/json-pointer'
import { COUNTRY as defaultCountry } from '../../../shared/defaults'

export type UrlSecondParameter = {
  countryCode: string
}
export type GeneralConfig = {
  fetchConfig?: {
    url:
      | string
      | ((
          value: string,
          { countryCode }: UrlSecondParameter
        ) => string | Promise<string>)
    headers?: HeadersInit
  }
}

export function createContext<GeneralConfigGeneric = GeneralConfig>(
  generalConfig: GeneralConfigGeneric = null
) {
  return {
    withConfig<HandlerConfig, ReturnValue>(
      fn: (
        generalConfig: GeneralConfigGeneric,
        handlerConfig?: HandlerConfig
      ) => ReturnValue,
      handlerConfig?: HandlerConfig
    ): ReturnValue {
      return fn(generalConfig, handlerConfig)
    },
  }
}

export type HandlerConfig = {
  preResponseResolver?: PreResponseResolver
  responseResolver?: ResponseResolver
}
export type PreResponseResolver = (fromField: { value: string }) => unknown
export type ResponseResolver<
  Response = unknown,
  Payload = Record<string, unknown>,
> = (
  response: Response,
  handlerConfig?: HandlerConfig
) => {
  /**
   * The matcher to be used to determine if and how the connector,
   * such as a validator for `onChangeValidator` or `onBlurValidator`,
   * should validate the field value.
   */
  matcher?: (value: string) => boolean

  /**
   * The payload to be returned and used by the connector.
   */
  payload?: Payload
}

export type FetchDataFromAPIOptions = {
  generalConfig: GeneralConfig
  parameters?: UrlSecondParameter
  abortControllerRef?: { current: null | AbortController }
  preResponseResolver?: PreResponseResolver
}

async function fetchDataFromAPI<Data = unknown>(
  generalConfig: GeneralConfig & { fetchConfig: { url: string } },
  options?: FetchDataFromAPIOptions
): Promise<
  | {
      data: Data
      response: Response
    }
  | undefined
> {
  const { fetchConfig } = generalConfig

  const controller = options?.abortControllerRef
  controller?.current?.abort()

  const abortController = controller ? new AbortController() : null
  if (controller) {
    controller.current = abortController
  }
  const signal = abortController?.signal

  const fetchOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...fetchConfig.headers,
    },
    signal,
  }

  try {
    const response = await fetch(fetchConfig.url, fetchOptions)

    if (!response) {
      throw new Error('Please try again!')
    }

    return {
      response,
      data: await response.json(),
    }
  } catch (error) {
    if (!(error instanceof DOMException && error.name === 'AbortError')) {
      throw error
    }
  } finally {
    if (controller?.current === abortController) {
      controller.current = null
    }
  }
  return undefined
}

export type FetchDataReturnValue<Data = unknown> = {
  data: Data
  status: number
}

export async function fetchData<Data = unknown>(
  value: string,
  options: FetchDataFromAPIOptions
): Promise<FetchDataReturnValue<Data> | undefined> {
  const { generalConfig, parameters } = options || {}

  const result = options?.preResponseResolver?.({ value })
  if (typeof result !== 'undefined') {
    return result as FetchDataReturnValue<Data>
  }

  const u = generalConfig.fetchConfig.url
  const url = typeof u === 'function' ? await u(value, parameters) : u

  const resultFromAPI = await fetchDataFromAPI<Data>(
    {
      ...generalConfig,
      fetchConfig: {
        ...generalConfig.fetchConfig,
        url,
      },
    },
    options
  )

  if (!resultFromAPI?.response) {
    return undefined
  }

  const { data, response } = resultFromAPI

  // Check if the response status is in the range of 200-299
  if (!response.ok) {
    throw new Error(`${response.statusText} – Status: ${response.status}`)
  }

  return { data, status: response.status }
}

export function getCountryCodeValue({
  countryCode: givenCountryCode,
  additionalArgs,
}: {
  countryCode?: string
  additionalArgs: ReceiveAdditionalEventArgs<unknown>
}) {
  const countryCodeValue =
    givenCountryCode ||
    additionalArgs.props?.['data-country-code'] ||
    defaultCountry
  const countryCode =
    additionalArgs.getSourceValue<string>(countryCodeValue) ||
    givenCountryCode
  return { countryCode, countryCodeValue }
}

export function handleCountryPath({
  value,
  countryCode: givenCountryCode,
  additionalArgs,
  handler,
}: {
  value: string
  countryCode?: string
  additionalArgs: ReceiveAdditionalEventArgs<unknown>
  // Method syntax gives the parameters bivariant checking, so that the
  // value-specific validator/suggestions handlers can be passed without
  // tripping `strictFunctionTypes`.
  handler(
    value: string,
    additionalArgs: ReceiveAdditionalEventArgs<unknown>
  ): void
}) {
  const { countryCode, countryCodeValue } = getCountryCodeValue({
    countryCode:
      givenCountryCode || additionalArgs.props?.['data-country-code'],
    additionalArgs,
  })

  if (
    isPath(countryCodeValue) &&
    additionalArgs[handler.name] !== handler
  ) {
    additionalArgs[handler.name] = handler
    additionalArgs.setFieldEventListener(
      countryCodeValue,
      'onPathChange',
      () => {
        handler(value, additionalArgs)
      }
    )
  }

  return { countryCode }
}

export function isSupportedCountryCode(
  countryCode: string,
  supportedCountryCodes: readonly string[]
) {
  if (!countryCode) {
    return false
  }
  return supportedCountryCodes.includes(String(countryCode).toUpperCase())
}
