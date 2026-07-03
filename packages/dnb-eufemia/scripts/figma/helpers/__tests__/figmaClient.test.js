/**
 * Figma client test
 *
 */

import '../../../../src/core/test-utils/testSetup'
import { createFigmaClient } from '../figmaClient'

describe('createFigmaClient', () => {
  const token = 'test-figma-token'
  let fetchMock

  const mockResponse = (
    data,
    { ok = true, status = 200, statusText = 'OK' } = {}
  ) => ({
    ok,
    status,
    statusText,
    json: async () => data,
    text: async () =>
      typeof data === 'string' ? data : JSON.stringify(data),
  })

  const lastRequest = () => {
    const [url, options] = fetchMock.mock.calls.at(-1)
    const parsed = new URL(url)
    return {
      method: options.method,
      headers: options.headers,
      href: parsed.href,
      pathname: parsed.pathname,
      params: Object.fromEntries(parsed.searchParams.entries()),
    }
  }

  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue(mockResponse({}))
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sends the personal access token as the X-Figma-Token header', async () => {
    const client = createFigmaClient({ personalAccessToken: token })
    await client.client.get('files/ABC/versions')

    expect(lastRequest().headers).toEqual({ 'X-Figma-Token': token })
  })

  it('uses an Authorization bearer header for OAuth access tokens', async () => {
    const client = createFigmaClient({ accessToken: 'oauth-token' })
    await client.client.get('me')

    expect(lastRequest().headers).toEqual({
      Authorization: 'Bearer oauth-token',
    })
  })

  it('resolves client.get() against the v1 base url and returns { data }', async () => {
    fetchMock.mockResolvedValue(
      mockResponse({ versions: [{ id: '123' }] })
    )
    const client = createFigmaClient({ personalAccessToken: token })

    const result = await client.client.get('files/ABC/versions')

    const request = lastRequest()
    expect(request.method).toBe('GET')
    expect(request.href).toBe(
      'https://api.figma.com/v1/files/ABC/versions'
    )
    expect(result).toEqual({ data: { versions: [{ id: '123' }] } })
  })

  it('file() requests the file endpoint with an empty ids param', async () => {
    fetchMock.mockResolvedValue(
      mockResponse({ name: 'Doc', lastModified: 'x' })
    )
    const client = createFigmaClient({ personalAccessToken: token })

    const result = await client.file('ABC')

    const request = lastRequest()
    expect(request.pathname).toBe('/v1/files/ABC')
    expect(request.params).toEqual({ ids: '' })
    expect(result).toEqual({ data: { name: 'Doc', lastModified: 'x' } })
  })

  it('fileImages() joins ids into a comma separated list and forwards params', async () => {
    fetchMock.mockResolvedValue(
      mockResponse({ images: { '1:23': 'https://x/y.svg' } })
    )
    const client = createFigmaClient({ personalAccessToken: token })

    const result = await client.fileImages('ABC', {
      ids: ['1:23', '4:56'],
      format: 'svg',
    })

    const request = lastRequest()
    expect(request.pathname).toBe('/v1/images/ABC')
    // Node ids are percent-encoded on the wire but decode back to the
    // same comma separated list the Figma API expects.
    expect(request.params).toEqual({ ids: '1:23,4:56', format: 'svg' })
    expect(result).toEqual({
      data: { images: { '1:23': 'https://x/y.svg' } },
    })
  })

  it('throws on a non-2xx response and surfaces the Figma error body', async () => {
    fetchMock.mockResolvedValue(
      mockResponse(
        { status: 403, err: 'Invalid token' },
        {
          ok: false,
          status: 403,
          statusText: 'Forbidden',
        }
      )
    )
    const client = createFigmaClient({ personalAccessToken: token })

    await expect(client.file('ABC')).rejects.toThrow(
      /403 Forbidden: Invalid token/
    )
  })

  it('truncates an oversized error body in the thrown message', async () => {
    const hugeBody = 'x'.repeat(5000)
    fetchMock.mockResolvedValue(
      mockResponse(hugeBody, {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })
    )
    const client = createFigmaClient({ personalAccessToken: token })

    await expect(client.file('ABC')).rejects.toThrow(
      /500 Internal Server Error: x{500}\.\.\. for/
    )
  })
})
