type RouteLike = {
  path?: string
  index?: boolean
  lazy?: (() => Promise<Record<string, unknown>>) | undefined
} & Record<string, unknown>

export async function preResolveCurrentRoute(
  routes: RouteLike[],
  pathname: string
) {
  const currentPath = pathname.replace(/\/+$/, '') || '/'

  const matchingRoutes = routes.filter((route) => {
    if (!route.lazy) {
      return false
    }

    // Index routes match when the parent path matches the current URL
    return route.index
      ? currentPath === '/'
      : route.path &&
          (route.path.replace(/\/+$/, '') || '/') === currentPath
  })

  // If no specific route matched, resolve the catch-all (*) route so
  // React Router doesn't warn about a missing HydrateFallback on 404 pages.
  if (matchingRoutes.length === 0) {
    const catchAll = routes.find(
      (route) => route.lazy && route.path === '*'
    )
    if (catchAll) {
      matchingRoutes.push(catchAll)
    }
  }

  await Promise.all(
    matchingRoutes.map(async (route) => {
      try {
        const resolved = await route.lazy()
        Object.assign(route, resolved)
        route.lazy = undefined
      } catch {
        // If pre-resolution fails, React Router will handle it.
      }
    })
  )
}
