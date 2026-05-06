import type { ComponentType } from 'react'
import { preResolveCurrentRoute } from './pre-resolve-current-route'
import { renderPortalApp } from './render-portal-app'

type RouteLike = {
  path?: string
  lazy?: (() => Promise<Record<string, unknown>>) | undefined
} & Record<string, unknown>

type BootstrapPortalAppOptions = {
  pathname?: string
  hasWindow?: boolean
  preResolveCurrentRouteFn?: typeof preResolveCurrentRoute
  renderPortalAppFn?: typeof renderPortalApp
}

export async function bootstrapPortalApp(
  AppComponent: ComponentType<{ routes: RouteLike[] }>,
  routes: RouteLike[],
  {
    pathname = '/',
    hasWindow = typeof window !== 'undefined',
    preResolveCurrentRouteFn = preResolveCurrentRoute,
    renderPortalAppFn = renderPortalApp,
  }: BootstrapPortalAppOptions = {}
) {
  if (hasWindow) {
    await preResolveCurrentRouteFn(routes, pathname)
  }

  renderPortalAppFn(AppComponent, { props: { routes } })
}
