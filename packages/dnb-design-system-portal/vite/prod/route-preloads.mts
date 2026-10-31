type ManifestEntry = {
  file: string
  imports?: string[]
  css?: string[]
}

export function modulePreloadTags(html: string, assets: string[]) {
  const existing = new Set(
    Array.from(
      html.matchAll(
        /<link\b[^>]*rel="modulepreload"[^>]*href="([^"]+)"[^>]*>/g
      ),
      (match) => match[1]
    )
  )
  return [...new Set(assets)]
    .filter((asset) => !existing.has(asset))
    .map(
      (asset) => `<link rel="modulepreload" crossorigin href="${asset}">`
    )
    .join('\n    ')
}

export function getRoutePreloads(
  url: string,
  ssrManifest: Record<string, string[]>,
  clientManifest?: Record<string, ManifestEntry> | null,
  sourcePath?: string,
  routeModule?: string
) {
  const routePath = url.replace(/^\/|\/$/g, '') || 'index'

  const candidates = [
    ...(sourcePath
      ? [
          sourcePath.replace(
            'packages/dnb-design-system-portal/',
            '../../'
          ),
        ]
      : []),
    `../../src/docs/${routePath}.mdx`,
    `../../src/docs/${routePath}.tsx`,
    `../../src/docs/${routePath}/index.mdx`,
    `../../src/docs/${routePath}/index.tsx`,
  ]

  const jsPreloads = new Set<string>()
  const cssPreloads = new Set<string>()

  // The initial page is a distinct dynamic entry even when other pages
  // import the same MDX source. Include its complete CSS dependency graph.
  const initialEntry =
    routeModule &&
    clientManifest?.['../../' + routeModule.replace(/\/$/, '')]
  if (initialEntry) {
    jsPreloads.add('/' + initialEntry.file)
  }

  for (const candidate of candidates) {
    const assets = ssrManifest[candidate]
    if (assets) {
      for (const asset of assets) {
        if (asset.endsWith('.js')) {
          jsPreloads.add(asset)
        } else if (asset.endsWith('.css')) {
          cssPreloads.add(asset)
        }
      }
    }
  }

  // Use the client manifest to find CSS chunks that are transitively
  // imported by the route's JS chunks. Without this, CSS modules
  // imported by non-route source files (e.g. shared menu components)
  // would only load after JS executes, causing a layout flicker on
  // prerendered pages.
  if (clientManifest && jsPreloads.size > 0) {
    // Build a lookup from output file path to manifest entry
    const fileToEntry = new Map<string, ManifestEntry>()
    for (const entry of Object.values(clientManifest)) {
      if (entry.file) {
        fileToEntry.set('/' + entry.file, entry)
      }
    }

    // BFS through chunk imports to collect all transitive CSS
    const visited = new Set<string>()
    const queue = [...jsPreloads]

    while (queue.length > 0) {
      const chunk = queue.shift()
      if (visited.has(chunk)) {
        continue
      }
      visited.add(chunk)

      const entry = fileToEntry.get(chunk)
      if (!entry) {
        continue
      }

      // Collect CSS associated with this chunk
      if (entry.css) {
        for (const css of entry.css) {
          cssPreloads.add('/' + css)
        }
      }

      // Follow static imports (skip the entry point — its CSS
      // is already in the HTML template)
      if (entry.imports) {
        for (const imp of entry.imports) {
          if (imp === 'index.html') {
            continue
          }
          const impEntry = clientManifest[imp]
          if (impEntry?.file) {
            const impPath = '/' + impEntry.file
            jsPreloads.add(impPath)
            if (!visited.has(impPath)) {
              queue.push(impPath)
            }
          }
        }
      }
    }
  }

  return { js: [...jsPreloads], css: [...cssPreloads] }
}
