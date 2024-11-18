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

export async function fetchDataFromAPI(
  generalConfig: GeneralConfig & { fetchConfig: { url: string } }
) {
  const { fetchConfig } = generalConfig

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...fetchConfig.headers,
    },
  }

  try {
    const response = await fetch(fetchConfig.url, options)

    if (response.status === 400) {
      return // silently ignore to not show an error while typing
    }

    // Check if the response status is in the range of 200-299
    if (!response.ok) {
      throw new Error(
        `${response.statusText} – Status: ${response.status}`
      )
    }

    return await response.json()
  } catch (error) {
    throw new Error(error)
  }
}
