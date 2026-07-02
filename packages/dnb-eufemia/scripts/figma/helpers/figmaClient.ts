/**
 * Minimal Figma REST API client built on the native `fetch`.
 *
 * Replaces the unmaintained `figma-js` package (which pulled in a vulnerable
 * `axios@0.21.x`). It reproduces the exact behavior of the subset of the
 * `figma-js` "Client" that our icon tooling relies on:
 * - base URL `https://api.figma.com/v1/`
 * - `X-Figma-Token` auth header (or `Authorization: Bearer` for OAuth tokens)
 * - array `ids` are joined into a comma separated list
 * - resolves with `{ data }` on success and throws on a non-2xx response,
 *   surfacing the Figma error body (`{ err }`) when present
 */

export type CreateFigmaClientOptions = {
  personalAccessToken?: string
  accessToken?: string
  apiRoot?: string
}

type QueryValue = string | number | undefined | null
type QueryParams = Record<string, QueryValue>

export type FigmaResponse<Data> = {
  data: Data
}

export type FigmaImagesResponse = {
  err: string | null
  images: Record<string, string>
}

export type FigmaFileResponse = Record<string, unknown>

export type FigmaClient = {
  client: {
    get: <Data = unknown>(
      endpoint: string,
      config?: { params?: QueryParams }
    ) => Promise<FigmaResponse<Data>>
  }
  file: (
    fileId: string,
    params?: { ids?: string[] }
  ) => Promise<FigmaResponse<FigmaFileResponse>>
  fileImages: (
    fileId: string,
    params: { ids: string[]; format?: string }
  ) => Promise<FigmaResponse<FigmaImagesResponse>>
}

/**
 * Read a failed response body and extract the most useful error message.
 * Figma returns errors as JSON (e.g. `{ "status": 403, "err": "..." }`), but
 * we fall back to the raw text for non-JSON responses (e.g. a 500 HTML page).
 */
async function readErrorDetail(
  response: Response
): Promise<string | undefined> {
  let raw: string
  try {
    raw = await response.text()
  } catch {
    return undefined
  }

  if (!raw) {
    return undefined
  }

  let detail = raw
  try {
    const body = JSON.parse(raw) as {
      err?: string
      message?: string
    } | null
    detail = body?.err ?? body?.message ?? raw
  } catch {
    // Not JSON (e.g. an HTML error page) — fall back to the raw text
  }

  // Guard against embedding an unexpectedly large body in the error message
  const maxLength = 500
  return detail.length > maxLength
    ? `${detail.slice(0, maxLength)}...`
    : detail
}

export function createFigmaClient({
  personalAccessToken,
  accessToken,
  apiRoot = 'api.figma.com',
}: CreateFigmaClientOptions = {}): FigmaClient {
  const baseURL = `https://${apiRoot}/v1/`
  const headers: Record<string, string> = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : { 'X-Figma-Token': personalAccessToken as string }

  const get = async <Data = unknown>(
    endpoint: string,
    { params }: { params?: QueryParams } = {}
  ): Promise<FigmaResponse<Data>> => {
    const url = new URL(endpoint, baseURL)

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        // Mirror axios, which omits null/undefined params but keeps empty strings
        if (value === undefined || value === null) {
          continue
        }
        url.searchParams.set(key, String(value))
      }
    }

    const response = await fetch(url, { method: 'GET', headers })

    if (!response.ok) {
      const detail = await readErrorDetail(response)
      throw new Error(
        `Figma API request failed with ${response.status} ${
          response.statusText
        }${detail ? `: ${detail}` : ''} for ${url.pathname}${url.search}`
      )
    }

    return { data: (await response.json()) as Data }
  }

  return {
    client: { get },

    file: (fileId, params = {}) =>
      get<FigmaFileResponse>(`files/${fileId}`, {
        params: {
          ...params,
          ids: params.ids ? params.ids.join(',') : '',
        },
      }),

    fileImages: (fileId, params) =>
      get<FigmaImagesResponse>(`images/${fileId}`, {
        params: {
          ...params,
          ids: params.ids.join(','),
        },
      }),
  }
}
