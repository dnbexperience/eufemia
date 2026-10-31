import { matchRoutes } from 'react-router'
import type { PortalRoute } from './plugins/portal-pages.shared'

type RouteHint = {
  id: string
  path?: string
  index?: true
  module: string
  css: string[]
  imports: number
}

type RouteHints = {
  dependencies: number[][]
  assets: string[]
  initial: RouteHint
  links: Record<string, RouteHint>
}

const routeMap = new Map<string, PortalRoute>()
const pageLoads = new Map<string, Promise<PortalRoute>>()
const styleLoads = new Map<string, Promise<void>>()
let hints: RouteHints | undefined
let routesPromise: Promise<PortalRoute[]> | undefined

export function loadPortalRoutes(): Promise<PortalRoute[]> {
  if (routesPromise) {
    return routesPromise
  }

  const cleanup = handlePreloadErrors(['_virtual_portal-pages-'])
  routesPromise = import('virtual:portal-pages')
    .then(({ routes }) => {
      for (const route of routes) {
        const path = route.index ? '/' : route.path
        if (path && path !== '*') {
          routeMap.set(normalizePath(path), route)
        }
      }
      return routes
    })
    .catch((error) => {
      routesPromise = undefined
      throw error
    })
    .finally(cleanup)

  return routesPromise
}

// These imports have their own recovery: speculation is caught locally,
// navigation opens the destination document, and bootstrap rejects to the
// existing chunk recovery handler. Vite also emits a global event, so avoid
// handling the same failure twice. Other asset failures keep normal recovery.
function handlePreloadErrors(urls: string[]) {
  const onError = (event: Event & { payload?: Error }) => {
    const message = event.payload?.message || ''
    if (
      !message.includes('/assets/') ||
      urls.some((url) => message.includes(url))
    ) {
      event.stopImmediatePropagation()
    }
  }
  window.addEventListener('vite:preloadError', onError, true)
  return () =>
    window.removeEventListener('vite:preloadError', onError, true)
}

function loadStyle(href: string): Promise<void> {
  const existing = Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
  ).find((link) => link.getAttribute('href') === href)
  if (existing?.sheet) {
    return Promise.resolve()
  }
  let pending = styleLoads.get(href)
  if (!pending) {
    pending = new Promise<void>((resolve, reject) => {
      const link = existing ?? document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.crossOrigin = ''
      link.addEventListener('load', () => resolve(), { once: true })
      link.addEventListener(
        'error',
        () => {
          styleLoads.delete(href)
          link.remove()
          reject(new Error('Could not load page stylesheet'))
        },
        { once: true }
      )
      if (!existing) {
        document.head.appendChild(link)
      }
    })
    styleLoads.set(href, pending)
  }
  return pending
}

function loadHint(hint: RouteHint, recover = false): Promise<PortalRoute> {
  let pending = pageLoads.get(hint.id)
  if (!pending) {
    // Match Vite's normal lazy-route loading: fetch shared dependencies in
    // parallel so a click without hover does not introduce a waterfall.
    for (const index of hints.dependencies[hint.imports]) {
      const href = hints.assets[index]
      if (
        !Array.from(
          document.querySelectorAll<HTMLLinkElement>(
            'link[rel="modulepreload"]'
          )
        ).some((link) => link.getAttribute('href') === href)
      ) {
        const link = document.createElement('link')
        link.rel = 'modulepreload'
        link.crossOrigin = ''
        link.href = href
        document.head.appendChild(link)
      }
    }
    const cleanup = recover
      ? () => {}
      : handlePreloadErrors([
          hint.module,
          ...hint.css,
          ...hints.dependencies[hint.imports].map(
            (index) => hints.assets[index]
          ),
        ])
    pending = Promise.all([
      import(/* @vite-ignore */ hint.module),
      Promise.all(hint.css.map(loadStyle)),
    ])
      .then(([page]) => {
        const {
          module: _module,
          css: _css,
          imports: _imports,
          ...route
        } = hint
        return { ...route, Component: page.default } as PortalRoute
      })
      .catch((error) => {
        pageLoads.delete(hint.id)
        throw error
      })
      .finally(cleanup)
    pageLoads.set(hint.id, pending)
  }
  return pending
}

export async function getInitialPortalRoutes(): Promise<PortalRoute[]> {
  const element = document.getElementById('portal-initial-route')
  if (element?.textContent) {
    hints = JSON.parse(element.textContent) as RouteHints
    if (
      matchRoutes([hints.initial as PortalRoute], window.location.pathname)
    ) {
      const initial = await loadHint(hints.initial, true)
      const home = hints.links['/']
      // The root layout itself matches '/', so route discovery cannot add
      // its index page later. Register Home lazily without fetching it.
      return home && !initial.index
        ? [
            initial,
            {
              id: home.id,
              index: true,
              lazy: async () => {
                const { Component } = await loadHint(home)
                return { Component }
              },
            },
          ]
        : [initial]
    }
  }

  // Development and paths without prerendered HTML need route discovery.
  return loadPortalRoutes()
}

function normalizePath(pathname: string) {
  return decodeURI(pathname).replace(/\/+$/, '').toLowerCase() || '/'
}

export async function discoverPortalRoutes(pathname: string) {
  const hint = hints?.links[pathname.replace(/\/+$/, '') || '/']
  if (hint) {
    return [await loadHint(hint)]
  }
  return loadPortalRoutes()
}

export async function prefetchPortalRoute(pathname: string) {
  const hint = hints?.links[pathname.replace(/\/+$/, '') || '/']
  if (hint) {
    await loadHint(hint)
    return
  }
  await loadPortalRoutes()
  let route = routeMap.get(normalizePath(pathname))
  const visited = new Set<PortalRoute>()
  while (route && !visited.has(route)) {
    visited.add(route)
    if (typeof route.lazy === 'function') {
      await route.lazy()
    }
    const target = route.handle?.redirectTo
    route =
      typeof target === 'string'
        ? routeMap.get(normalizePath(target))
        : undefined
  }
}
