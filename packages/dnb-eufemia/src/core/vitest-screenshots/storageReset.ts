/**
 * Without this, components that persist UI state — such as the open
 * accordions in SidebarMenu — leak it into later tests and into their
 * baselines.
 *
 * Runs inside the page via `page.evaluate`, so it has to be
 * self-contained: Playwright ships the function source, and a
 * reference to anything in module scope resolves to `undefined`
 * there.
 */
export function clearBrowserStorages() {
  const clear = (getStorage: () => Storage | null | undefined) => {
    try {
      // Reading the property can throw on its own when storage is
      // blocked, so it stays inside the guard.
      getStorage()?.clear()
    } catch {
      // stop here
    }
  }

  clear(() => window.localStorage)
  clear(() => window.sessionStorage)
}
