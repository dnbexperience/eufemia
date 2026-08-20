/**
 * Returns true when the given href uses a script-executing protocol
 * (`javascript:` or `vbscript:`). Browsers ignore leading control characters
 * and whitespace (including tabs and newlines) when resolving the scheme, so
 * those are stripped before testing to catch obfuscated values such as
 * `java\tscript:alert(1)`.
 *
 * Only script-executing protocols are blocked. `data:` and `blob:` URLs are
 * intentionally left untouched: they have legitimate uses (such as download
 * links and inline media), and modern browsers already block top-level `data:`
 * navigation triggered by a link click.
 */
export function isDangerousHref(href: unknown): boolean {
  if (typeof href !== 'string') {
    return false
  }

  // Remove characters that browsers ignore when resolving a URL scheme
  // (C0 controls, space, DEL and C1 controls) so obfuscated values such as
  // "java\tscript:" are still detected.
  let normalized = ''
  for (const char of href) {
    const code = char.charCodeAt(0)
    if (code > 0x20 && code !== 0x7f && !(code >= 0x80 && code <= 0xa0)) {
      normalized += char
    }
  }

  return /^(javascript|vbscript):/i.test(normalized)
}
