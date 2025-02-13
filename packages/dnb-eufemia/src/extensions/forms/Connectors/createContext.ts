import { ReceiveAdditionalEventArgs } from '../types'

export type UrlSecondParameter = {
  country: string
}
export type GeneralConfig = {
  fetchConfig?: {
    url:
      | string
      | ((
          value: string,
          { country }: UrlSecondParameter
        ) => string | Promise<string>)
    headers?: HeadersInit
  }
}

export function createContext<GeneralConfigGeneric = GeneralConfig>(
  generalConfig: GeneralConfigGeneric = null
) {
  return {
    withConfig<
      HandlerMethod extends (
        generalConfig: GeneralConfigGeneric,
        handlerConfig: unknown
      ) => ReturnType<HandlerMethod>,
    >(fn: HandlerMethod, handlerConfig?: Parameters<HandlerMethod>[1]) {
      return fn(generalConfig, handlerConfig)
    },
  }
}

export type FetchDataFromAPIOptions = {
  generalConfig: GeneralConfig
  parameters?: UrlSecondParameter
  abortControllerRef?: { current: null | AbortController }
  returnResult?: (data: { value: string }) => unknown
}

async function fetchDataFromAPI(
  generalConfig: GeneralConfig & { fetchConfig: { url: string } },
  options?: FetchDataFromAPIOptions
) {
  const { fetchConfig } = generalConfig

  const controller = options?.abortControllerRef
  if (controller) {
    if (controller.current) {
      controller.current.abort()
      controller.current = null
    }
    if (!controller.current) {
      controller.current = new AbortController()
    }
  }
  const { signal } = controller?.current || {}

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

    if (controller) {
      controller.current = null
    }

    return {
      response,
      data: await response.json(),
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      return error
    }
  }
}

export async function fetchData(
  value: string,
  options: FetchDataFromAPIOptions
) {
  const { generalConfig, parameters } = options || {}

  const result = options?.returnResult?.({ value })
  if (typeof result !== 'undefined') {
    return result
  }

  try {
    const u = generalConfig.fetchConfig.url
    const url = typeof u === 'function' ? await u(value, parameters) : u

    const { data, response } = await fetchDataFromAPI(
      {
        ...generalConfig,
        fetchConfig: {
          ...generalConfig.fetchConfig,
          url,
        },
      },
      options
    )

    // Check if the response status is in the range of 200-299
    if (!response.ok) {
      throw new Error(
        `${response.statusText} – Status: ${response.status}`
      )
    }

    return { data, status: response.status }
  } catch (error) {
    return error
  }
}

export function getCountryValue({
  additionalArgs,
}: {
  additionalArgs: ReceiveAdditionalEventArgs<unknown>
}) {
  const countryValue = additionalArgs.props['data-country']
  const country = additionalArgs.getSourceValue<string>(countryValue)

  return { country, countryValue }
}

export function handleCountryPath({
  value,
  additionalArgs,
  handler,
}: {
  value: string
  additionalArgs: ReceiveAdditionalEventArgs<unknown>
  handler: (
    value: string,
    additionalArgs: ReceiveAdditionalEventArgs<unknown>
  ) => void
}) {
  const { country, countryValue } = getCountryValue({ additionalArgs })

  if (
    String(countryValue).startsWith('/') &&
    additionalArgs[handler.name] !== handler
  ) {
    additionalArgs[handler.name] = handler
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
