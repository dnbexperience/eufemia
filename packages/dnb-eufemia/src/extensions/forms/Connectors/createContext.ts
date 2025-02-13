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
    headers?: {
      'X-Mybring-API-Uid'?: string
      'X-Mybring-API-Key'?: string
    } & Record<string, string>
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
  abortControllerRef?: { current: null | AbortController }
}

export async function fetchDataFromAPI(
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
