export type WebStorageType = 'session' | 'local'

/**
 * The given Web Storage, or `undefined` on the server or when the browser blocks it.
 */
export function getWebStorage(type: WebStorageType): Storage | undefined {
  if (typeof window === 'undefined') {
    return undefined // stop here
  }

  try {
    return (
      (type === 'local' ? window.localStorage : window.sessionStorage) ??
      undefined
    )
  } catch {
    // Accessing a blocked storage throws
    return undefined
  }
}

/**
 * The parsed JSON value of the given key, or `undefined`. An invalid JSON value gets removed.
 */
export function readWebStorageJSON<T = unknown>(
  type: WebStorageType,
  key: string
): T | undefined {
  const storage = getWebStorage(type)

  try {
    const value = storage?.getItem(key)
    return value ? JSON.parse(value) : undefined
  } catch (error) {
    if (error instanceof SyntaxError) {
      storage.removeItem(key)
    }

    return undefined
  }
}
