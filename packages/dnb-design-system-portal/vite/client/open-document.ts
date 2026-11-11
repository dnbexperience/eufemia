let pendingDocument: AbortController | undefined

/**
 * Opens a page as a document when its client navigation failed. Offline,
 * the browser would replace the current page with its error page, so this
 * waits for the connection, unless the user has moved on by then.
 */
export function openDocument(url: string): Promise<never> {
  pendingDocument?.abort()

  if (navigator.onLine) {
    window.location.assign(url)
  } else {
    const from = window.location.href
    pendingDocument = new AbortController()
    window.addEventListener(
      'online',
      () => {
        if (window.location.href === from) {
          window.location.assign(url)
        }
      },
      { once: true, signal: pendingDocument.signal }
    )
  }

  return new Promise<never>(() => {})
}
