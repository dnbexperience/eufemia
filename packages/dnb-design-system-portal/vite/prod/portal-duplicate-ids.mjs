export function createPortalSitemap(renderedPages, canonicalUrls) {
  return {
    schemaVersion: 1,
    pages: getCanonicalPages(renderedPages, canonicalUrls).map(
      ({ url }) => url
    ),
  }
}

export function createPortalDuplicateIdReport(
  renderedPages,
  canonicalUrls
) {
  const pages = getCanonicalPages(renderedPages, canonicalUrls)
  const findings = []

  for (const page of pages) {
    const occurrences = new Map()

    for (const id of page.ids || []) {
      occurrences.set(id, (occurrences.get(id) || 0) + 1)
    }

    for (const [id, count] of occurrences) {
      if (count > 1) {
        findings.push({
          check: 'duplicate-id',
          page: page.url,
          id,
          occurrences: count,
        })
      }
    }
  }

  findings.sort(compareFindings)

  return {
    schemaVersion: 1,
    summary: {
      pages: pages.length,
      duplicateIdGroups: findings.length,
      duplicateIdOccurrences: findings.reduce(
        (total, finding) => total + finding.occurrences - 1,
        0
      ),
    },
    findings,
  }
}

export function createCanonicalUrls(allMdxNodes) {
  return new Set([
    '/',
    '/500/',
    ...allMdxNodes
      .filter(
        ({ fields, frontmatter }) =>
          fields.slug && frontmatter?.draft !== true
      )
      .map(({ fields }) => `/${fields.slug}/`),
  ])
}

function getCanonicalPages(renderedPages, canonicalUrls) {
  return renderedPages
    .filter(({ redirect, url }) => !redirect && canonicalUrls.has(url))
    .sort((a, b) => a.url.localeCompare(b.url))
}

function compareFindings(a, b) {
  return a.page.localeCompare(b.page) || a.id.localeCompare(b.id)
}
