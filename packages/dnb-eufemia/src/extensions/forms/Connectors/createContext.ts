import { SharedStateId } from '../../../shared/helpers/useSharedState'

export type GeneralConfig = {
  handlerId?: SharedStateId
  fetchConfig?: {
    url?: string
    headers?: Record<string, string>
  }
}

export function createContext<GeneralConfigGeneric = GeneralConfig>(
  generalConfig: GeneralConfigGeneric = null
) {
  const handlerId = {}
  if (!generalConfig['handlerId']) {
    generalConfig['handlerId'] = handlerId
  }

  return {
    handlerId,
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

export async function fetchDataFromAPI(generalConfig: GeneralConfig) {
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

    // Check if the response status is in the range of 200-299
    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    throw new Error(error)
  }
}
