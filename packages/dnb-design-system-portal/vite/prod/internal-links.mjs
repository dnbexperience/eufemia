import { parse } from 'parse5'

const siteOrigin = 'https://eufemia.dnb.no'

export function buildInternalLinkMap(renderedPages) {
  const pages = new Map()
  const redirects = new Map()
  const links = []

  for (const renderedPage of renderedPages) {
    const source = normalizePagePath(renderedPage.url)

    if (renderedPage.redirect) {
      const target = resolveInternalUrl(renderedPage.redirect, source)
      if (target) {
        redirects.set(source, target.path)
      }
      continue
    }

    const { anchors: pageAnchors, links: pageLinks } =
      renderedPage.anchors && renderedPage.links
        ? renderedPage
        : extractPageLinks(renderedPage.html)
    const anchors = new Set()

    for (const anchor of pageAnchors) {
      anchors.add(anchor)
    }

    pages.set(source, anchors)

    for (const href of pageLinks) {
      const target = resolveInternalUrl(href, source)
      if (target && shouldValidatePath(target.path)) {
        links.push({ source, href, ...target })
      }
    }
  }

  const redirectErrors = validateRedirects(pages, redirects)
  const linkErrors = validateLinks(links, pages, redirects)

  return {
    manifest: {
      version: 1,
      pages: Object.fromEntries(
        [...pages]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([page, anchors]) => [page, [...anchors].sort()])
      ),
      redirects: Object.fromEntries(
        [...redirects].sort(([a], [b]) => a.localeCompare(b))
      ),
    },
    errors: [...redirectErrors, ...linkErrors],
  }
}

export function extractPageLinks(html) {
  const anchors = []
  const links = []
  let redirect

  visit(parse(html), false)

  return { anchors, links, redirect }

  function visit(node, ignored) {
    const attributes = Object.fromEntries(
      (node.attrs || []).map(({ name, value }) => [name, value])
    )
    const shouldIgnore =
      ignored || attributes['data-link-check'] === 'ignore'

    if (!shouldIgnore) {
      const anchor =
        attributes.id ||
        (node.tagName === 'a' ? attributes.name : undefined)
      if (anchor) {
        anchors.push(anchor)
      }

      if (node.tagName === 'a' && attributes.href) {
        links.push(attributes.href)
      }

      if (
        node.tagName === 'meta' &&
        attributes['http-equiv']?.toLowerCase() === 'refresh'
      ) {
        redirect = attributes.content?.match(/^\s*0\s*;\s*url=(.+)$/i)?.[1]
      }
    }

    for (const child of node.childNodes || []) {
      visit(child, shouldIgnore)
    }
  }
}

export function formatInternalLinkErrors(errors) {
  const lines = errors.map((error) => {
    switch (error.type) {
      case 'missing-page':
        return `${error.source} -> ${error.href} (missing page: ${error.target})`
      case 'missing-anchor':
        return `${error.source} -> ${error.href} (missing anchor: ${error.anchor})`
      case 'missing-redirect-target':
        return `${error.source} (missing redirect target: ${error.target})`
      case 'redirect-loop':
        return `${error.source} (redirect loop through: ${error.target})`
      default:
        return JSON.stringify(error)
    }
  })

  const limit = 100
  const remaining = lines.length - limit
  const suffix =
    remaining > 0 ? `\n... and ${remaining} more broken links` : ''

  return `Broken internal links:\n\n${lines.slice(0, limit).join('\n')}${suffix}`
}

function validateRedirects(pages, redirects) {
  const errors = []

  for (const [source, target] of redirects) {
    const resolved = resolveRedirect(target, redirects)

    if (resolved.loop) {
      errors.push({ type: 'redirect-loop', source, target })
    } else if (!pages.has(resolved.path)) {
      errors.push({
        type: 'missing-redirect-target',
        source,
        target: resolved.path,
      })
    }
  }

  return errors
}

function validateLinks(links, pages, redirects) {
  const errors = []

  for (const link of links) {
    const resolved = resolveRedirect(link.path, redirects)

    if (resolved.loop) {
      continue
    }

    const anchors = pages.get(resolved.path)
    if (!anchors) {
      errors.push({
        type: 'missing-page',
        source: link.source,
        href: link.href,
        target: resolved.path,
      })
    } else if (link.anchor && !anchors.has(link.anchor)) {
      errors.push({
        type: 'missing-anchor',
        source: link.source,
        href: link.href,
        target: resolved.path,
        anchor: link.anchor,
      })
    }
  }

  return errors
}

function resolveRedirect(path, redirects) {
  const visited = new Set()
  let current = path

  while (redirects.has(current)) {
    if (visited.has(current)) {
      return { path: current, loop: true }
    }
    visited.add(current)
    current = redirects.get(current)
  }

  return { path: current, loop: false }
}

function resolveInternalUrl(href, source) {
  if (!href || href === '#') {
    return null
  }

  let url
  try {
    url = new URL(href, new URL(source, siteOrigin))
  } catch {
    return null
  }

  if (url.origin !== siteOrigin) {
    return null
  }

  return {
    path: normalizePagePath(url.pathname),
    anchor: decodeFragment(url.hash),
  }
}

function normalizePagePath(pathname) {
  if (pathname === '/') {
    return pathname
  }

  const normalized = pathname.replace(/\/{2,}/g, '/').replace(/\/$/, '')
  return `${normalized}/`
}

function decodeFragment(hash) {
  if (!hash) {
    return ''
  }

  try {
    return decodeURIComponent(hash.slice(1))
  } catch {
    return hash.slice(1)
  }
}

function shouldValidatePath(pathname) {
  const lastSegment = pathname.split('/').filter(Boolean).at(-1)
  return !lastSegment?.includes('.')
}
