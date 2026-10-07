export type SanitizeUrlOptions = {
  /**
   * Allowed URL prefixes. Use `*` to allow any http(s) URL.
   */
  allowedPrefixes?: Array<string>
  /**
   * Origin used to resolve relative URLs before they are checked against `allowedPrefixes`.
   */
  defaultOrigin?: string
  /**
   * Protocols that are allowed besides http and https.
   */
  protocols?: Array<string>
}

const SAFE_PROTOCOLS = ['http:', 'https:']

/**
 * Returns a safe URL, or `null` when the URL is not allowed.
 */
export function sanitizeUrl(
  url: string,
  {
    allowedPrefixes = ['*'],
    defaultOrigin,
    protocols = [],
  }: SanitizeUrlOptions = {}
): string | null {
  // Remove control characters and whitespace browsers ignore in protocols
  const value = Array.from(url)
    .filter((char) => {
      const code = char.charCodeAt(0)
      return code > 32 && (code < 127 || code > 159)
    })
    .join('')
  if (!value || value.includes('\\')) {
    return null
  }

  const hasProtocol = /^[a-z][a-z0-9+.-]*:/i.test(value)
  const isRelative = !hasProtocol && !value.startsWith('//')

  let parsed: URL
  try {
    parsed = new URL(value, defaultOrigin || 'http://relative.invalid')
  } catch {
    return null
  }

  if (![...SAFE_PROTOCOLS, ...protocols].includes(parsed.protocol)) {
    return null
  }

  if (allowedPrefixes.includes('*')) {
    if (isRelative && !defaultOrigin) {
      return value
    }
    return parsed.href
  }

  // Relative URLs can only be checked when we know where they point to
  if (isRelative && !defaultOrigin) {
    return null
  }

  const href = parsed.href
  return allowedPrefixes.some((prefix) => {
    try {
      const allowed = new URL(prefix)
      return (
        parsed.origin === allowed.origin && href.startsWith(allowed.href)
      )
    } catch {
      return false
    }
  })
    ? href
    : null
}
