let pendingDocument: AbortController | undefined

/**
 * Opens a page as a document when its client navigation failed. Offline,
 * the browser would replace the current page with its error page, so this
 * waits for the connection, unless the user has moved on or typed by then.
 */
export function openDocument(url: string): Promise<never> {
  pendingDocument?.abort()

  if (navigator.onLine) {
    window.location.assign(url)
  } else {
    const from = window.location.href
    const controller = new AbortController()
    pendingDocument = controller
    window.addEventListener(
      'online',
      () => {
        if (window.location.href === from) {
          window.location.assign(url)
        }
      },
      { once: true, signal: controller.signal }
    )

    // A reload would discard what the user typed on the current page.
    document.addEventListener('input', () => controller.abort(), {
      capture: true,
      once: true,
      signal: controller.signal,
    })
  }

  return new Promise<never>(() => {})
}
