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
