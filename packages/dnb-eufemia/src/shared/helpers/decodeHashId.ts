/**
 * Browsers keep the URL hash percent-encoded (`#søknad` reads as `s%C3%B8knad`).
 * Falls back to the input for a literal `%` that is not a valid escape.
 */
export default function decodeHashId(hashId: string) {
  try {
    return decodeURIComponent(hashId)
  } catch {
    return hashId
  }
}
