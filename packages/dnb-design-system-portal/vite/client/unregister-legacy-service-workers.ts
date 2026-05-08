/**
 * Unregister any service workers from previous portal versions.
 *
 * The portal does not register a service worker. Earlier versions
 * (when the portal ran on Gatsby) may have shipped one through
 * `gatsby-plugin-offline`, which is now removed. Returning users with
 * such a worker still installed would otherwise keep serving stale
 * HTML and chunk URLs that no longer exist.
 *
 * `/sw.js` itself is now a static no-op kill-switch served from
 * static/sw.js — see that file. This helper picks up any other
 * scopes a previous worker may have claimed.
 */

type RegistrationLike = {
  unregister: () => Promise<boolean>
}

type ServiceWorkerContainerLike = {
  getRegistrations?: () => Promise<ReadonlyArray<RegistrationLike>>
}

type NavigatorWithSW = {
  serviceWorker?: ServiceWorkerContainerLike
}

export function unregisterLegacyServiceWorkers(
  navigatorRef: NavigatorWithSW | undefined = typeof navigator !==
  'undefined'
    ? (navigator as NavigatorWithSW)
    : undefined
) {
  const sw = navigatorRef?.serviceWorker
  if (!sw?.getRegistrations) {
    return Promise.resolve()
  }

  return sw
    .getRegistrations()
    .then((registrations) =>
      Promise.all(
        registrations.map((registration) =>
          registration.unregister().catch(() => false)
        )
      )
    )
    .then(() => undefined)
    .catch(() => undefined)
}
