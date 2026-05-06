type RouteLike = {
  path?: string
  lazy?: (() => Promise<Record<string, unknown>>) | undefined
} & Record<string, unknown>

export async function preResolveCurrentRoute(
  routes: RouteLike[],
  pathname: string
) {
  for (const route of routes) {
    if (!route.lazy || !route.path) {
      continue
    }

    const routePath = route.path.replace(/\/+$/, '') || '/'
    const currentPath = pathname.replace(/\/+$/, '') || '/'

    if (routePath !== currentPath) {
      continue
    }

    try {
      const resolved = await route.lazy()
      Object.assign(route, resolved)
      route.lazy = undefined
    } catch {
      // If pre-resolution fails, React Router will handle it.
    }

    break
  }
}
