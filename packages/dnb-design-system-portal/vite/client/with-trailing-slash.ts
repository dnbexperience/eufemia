// Pages are served as `<path>/index.html`, so hosts redirect `<path>` to `<path>/`.
export function withTrailingSlash<T>(to: T): T {
  if (to && typeof to === 'object' && 'pathname' in to) {
    return { ...to, pathname: withTrailingSlash(to.pathname) }
  }

  if (typeof to !== 'string' || /^([a-z][a-z\d+\-.]*:|\/\/)/i.test(to)) {
    return to
  }

  const [, pathname, suffix] = /^([^?#]*)(.*)$/.exec(to)
  if (
    !pathname ||
    pathname.endsWith('/') ||
    /\.[a-z\d]+$/i.test(pathname)
  ) {
    return to
  }

  return (pathname + '/' + suffix) as T
}
