/**
 * Optional loader for the legacy SSE transport.
 *
 * `@modelcontextprotocol/server-legacy` is deprecated upstream: it is a
 * frozen copy of the v1 SSE transport, kept for migration only. The HTTP
 * server therefore treats it as optional. When the package is installed,
 * `/sse` and `/messages` work as before. When it is not, the server still
 * serves Streamable HTTP on `/mcp`.
 */

import type { SSEServerTransport } from '@modelcontextprotocol/server-legacy'

export const LEGACY_SSE_PACKAGE = '@modelcontextprotocol/server-legacy'

export type LegacySse = {
  SSEServerTransport: typeof SSEServerTransport
}

/**
 * True when `error` says that the package `packageName` itself cannot be
 * found.
 *
 * CommonJS reports `MODULE_NOT_FOUND` with "Cannot find module '<name>'",
 * and ES modules report `ERR_MODULE_NOT_FOUND` with "Cannot find package
 * '<name>' imported from …". When the package is installed but one of its
 * own dependencies is missing, the message names that dependency instead.
 * That case returns false, so a broken install still fails loudly.
 */
export function isMissingPackageError(
  error: unknown,
  packageName: string
): boolean {
  if (typeof error !== 'object' || error === null) {
    return false
  }

  const { code, message } = error as { code?: unknown; message?: unknown }

  if (code !== 'MODULE_NOT_FOUND' && code !== 'ERR_MODULE_NOT_FOUND') {
    return false
  }

  if (typeof message !== 'string') {
    return false
  }

  return (
    message.startsWith(`Cannot find module '${packageName}'`) ||
    message.startsWith(`Cannot find package '${packageName}'`)
  )
}

/**
 * Returns the legacy SSE transport, or `null` when
 * `@modelcontextprotocol/server-legacy` is not installed. Any other load
 * error is thrown.
 */
export async function loadLegacySse(
  importPackage: () => Promise<LegacySse> = () =>
    import('@modelcontextprotocol/server-legacy')
): Promise<LegacySse | null> {
  try {
    const { SSEServerTransport } = await importPackage()
    return { SSEServerTransport }
  } catch (error) {
    if (isMissingPackageError(error, LEGACY_SSE_PACKAGE)) {
      return null
    }
    throw error
  }
}
