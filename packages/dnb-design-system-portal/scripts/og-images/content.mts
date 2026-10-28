import { createRequire } from 'node:module'

const { JSDOM } = createRequire(import.meta.url)('jsdom') as {
  JSDOM: new (html: string) => { window: Window & { close(): void } }
}

export type CardContent = {
  route: string
  title: string
  captureSelector: string | null
  captureRoute: string
  assets: string[]
}

export function normalizeRoute(value: string) {
  const url = new URL(value, 'https://eufemia.dnb.no')
  return url.pathname.replace(/\/+$/, '') + '/'
}

export function discoverRoutes(markdown: string, origin: string) {
  const routes = new Set(['/'])
  for (const match of markdown.matchAll(/\]\((https?:\/\/[^\s)]+)\)/g)) {
    const url = new URL(match[1])
    if (url.origin === origin && url.pathname.endsWith('.md')) {
      routes.add(normalizeRoute(url.pathname.slice(0, -3)))
    }
  }
  return [...routes].sort()
}

function compact(value: string, limit: number) {
  const clean = value.replace(/\s+/g, ' ').trim()
  if (clean.length <= limit) {
    return clean
  }
  const part = clean.slice(0, limit - 1)
  return (
    part
      .slice(
        0,
        part.lastIndexOf(' ') > limit / 2
          ? part.lastIndexOf(' ')
          : part.length
      )
      .replace(/[.,;:]$/, '') + '…'
  )
}

export function extractCard(html: string, route: string): CardContent {
  const window = new JSDOM(html).window
  try {
    const document = window.document
    const main = document
      .querySelector('main, [role="main"]')
      ?.cloneNode(true) as Element | undefined
    const assets = [
      ...document.querySelectorAll(
        'link[rel="stylesheet"][href], script[src], link[rel="modulepreload"][href]'
      ),
    ]
      .map(
        (node) =>
          node.getAttribute('href') || node.getAttribute('src') || ''
      )
      .filter((value) => value.startsWith('/assets/'))
      .sort()
    const demoRoute = normalizeRoute(route) + 'demos/'
    const hasDemosTab = [...document.querySelectorAll('a[href]')].some(
      (link) =>
        normalizeRoute(link.getAttribute('href') || '/') === demoRoute
    )
    const captureRoute = hasDemosTab ? demoRoute : normalizeRoute(route)
    const captureSelector =
      (main?.querySelector('.dnb-live-preview') || hasDemosTab) &&
      /\/components\/|\/extensions\/|\/elements\//.test(route)
        ? '.dnb-live-preview'
        : null
    main
      ?.querySelectorAll(
        'nav, aside, footer, pre, code, script, style, [hidden], [aria-hidden="true"], .dnb-live-preview, .example-box, [role="tablist"]'
      )
      .forEach((node) => node.remove())
    main
      ?.querySelectorAll('h1 a[href^="#"]')
      .forEach((node) => node.remove())
    main?.querySelectorAll('h1').forEach((node) => {
      node.textContent = (node.textContent || '')
        .replace(/#+\s*$/, '')
        .trim()
    })
    const title = compact(
      main?.querySelector('h1')?.textContent ||
        document.title.replace(/\s*\|\s*Eufemia\s*$/, '') ||
        'Eufemia',
      90
    )
    return {
      route: normalizeRoute(route),
      title,
      captureSelector,
      captureRoute,
      assets,
    }
  } finally {
    window.close()
  }
}
