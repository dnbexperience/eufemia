type MdxNode = {
  fields: { slug: string }
  frontmatter?: { draft?: boolean; route?: boolean }
}

export function createCanonicalUrls(allMdxNodes: MdxNode[]): Set<string> {
  return new Set([
    '/',
    '/500/',
    ...allMdxNodes
      .filter(
        ({ fields, frontmatter }) =>
          fields.slug &&
          frontmatter?.draft !== true &&
          frontmatter?.route !== false
      )
      .map(({ fields }) => `/${fields.slug}/`),
  ])
}

export function createPortalSitemap(
  renderedUrls: string[],
  canonicalUrls: Set<string>
) {
  return {
    schemaVersion: 1,
    pages: Array.from(new Set(renderedUrls))
      .filter((url) => canonicalUrls.has(url))
      .sort(),
  }
}
