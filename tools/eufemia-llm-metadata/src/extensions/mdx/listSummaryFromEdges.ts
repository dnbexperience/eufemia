import fs from 'fs-extra'
import path from 'path'
import type {
  SpecialMdxComponentRenderer,
  SpecialMdxRendererDeps,
} from './types.ts'
import type { FrontmatterRecord } from './mdxFiles.ts'
import { parseSimpleJsxStringAttributes } from './utils.ts'

type ListSummaryFrontmatter = FrontmatterRecord

type ListEntry = {
  slug: string
  title: string
  description: string | null
  frontmatter: ListSummaryFrontmatter
}

type GetEdges = (pages: MdxNode[]) => MdxNode[]

type MdxNode = {
  fields: { slug: string; sourcePath: string }
  frontmatter: Record<string, unknown>
}

type ListSummaryConfig = {
  returnListItems: boolean
}

type ListSummaryData = {
  config: ListSummaryConfig
  entries: ListEntry[]
}

const listSummaryCache = new Map<string, ListSummaryData | null>()
const regularMdxNodesCache = new Map<string, MdxNode[]>()

export function createListSummaryFromEdgesExtension(
  deps: SpecialMdxRendererDeps
): SpecialMdxComponentRenderer {
  return {
    name: 'ListSummaryFromEdges',
    replace: (content) => replaceListSummaryFromEdges(content, deps),
  }
}

async function replaceListSummaryFromEdges(
  content: string,
  deps: SpecialMdxRendererDeps
) {
  let output = content
  const candidates = findRenderableListComponents(
    content,
    deps.importsByFile
  )

  for (const candidate of candidates) {
    const regex = new RegExp(`<${candidate.name}\\b([^>]*)\\/>`, 'g')

    if (!regex.test(output)) {
      continue
    }

    regex.lastIndex = 0

    const wrapperPath = await resolveImportedComponentPath(
      candidate.source,
      deps
    )

    if (!wrapperPath) {
      continue
    }

    const listSummaryData = await loadListSummaryData(wrapperPath, deps)

    if (!listSummaryData || listSummaryData.entries.length === 0) {
      continue
    }

    output = output.replace(regex, (_match, attrsSource) => {
      const attrs = parseSimpleJsxStringAttributes(
        String(attrsSource || '')
      )
      const level = parseHeadingLevel(String(attrs.level || ''))
      const description = attrs.description ?? null

      return `\n${renderListEntriesMarkdown(listSummaryData.entries, {
        returnListItems: listSummaryData.config.returnListItems,
        level,
        description,
      })}\n`
    })
  }

  return output
}

function findRenderableListComponents(
  content: string,
  importsByFile: Map<string, string[]>
) {
  const candidates: Array<{ name: string; source: string }> = []

  for (const [source, importedNames] of Array.from(
    importsByFile.entries()
  )) {
    for (const importedName of importedNames) {
      if (
        importedName.startsWith('* as ') ||
        !/^List[A-Z]/.test(importedName) ||
        !content.includes(`<${importedName}`)
      ) {
        continue
      }

      candidates.push({ name: importedName, source })
    }
  }

  return candidates
}

async function resolveImportedComponentPath(
  source: string,
  deps: Pick<SpecialMdxRendererDeps, 'findPackageRoot' | 'inputDir'>
) {
  if (source.startsWith('.') || source.startsWith('/')) {
    return resolveSourceWithExtension(path.resolve(deps.inputDir, source))
  }

  if (source.startsWith('dnb-design-system-portal/')) {
    const portalRoot = deps.findPackageRoot('dnb-design-system-portal')

    if (!portalRoot) {
      return null
    }

    return resolveSourceWithExtension(
      path.join(
        portalRoot,
        source.replace(/^dnb-design-system-portal\//, '')
      )
    )
  }

  return null
}

async function resolveSourceWithExtension(basePath: string) {
  const candidates = [
    basePath,
    `${basePath}.tsx`,
    `${basePath}.ts`,
    `${basePath}.jsx`,
    `${basePath}.js`,
    path.join(basePath, 'index.tsx'),
    path.join(basePath, 'index.ts'),
    path.join(basePath, 'index.jsx'),
    path.join(basePath, 'index.js'),
  ]

  for (const candidate of candidates) {
    try {
      const stat = await fs.stat(candidate)

      if (stat.isFile()) {
        return candidate
      }
    } catch {
      // ignore
    }
  }

  return null
}

function toListEntry(
  relativePath: string,
  frontmatter: ListSummaryFrontmatter,
  deps: Pick<SpecialMdxRendererDeps, 'toSlugAndDir'>
): ListEntry {
  return {
    slug: deps.toSlugAndDir(relativePath, '').slug,
    title: String(frontmatter.title ?? ''),
    description:
      typeof frontmatter.description === 'string'
        ? frontmatter.description
        : null,
    frontmatter,
  }
}

async function loadListSummaryData(
  wrapperPath: string,
  deps: Pick<
    SpecialMdxRendererDeps,
    'docsRoot' | 'toSlugAndDir' | 'findPackageRoot'
  >
) {
  const cacheKey = `${wrapperPath}::${deps.docsRoot}`

  if (listSummaryCache.has(cacheKey)) {
    return listSummaryCache.get(cacheKey) || null
  }

  try {
    const source = await fs.readFile(wrapperPath, 'utf-8')

    if (!source.includes('ListSummaryFromEdges')) {
      listSummaryCache.set(cacheKey, null)
      return null
    }

    const edges = await generateEdgesProp(wrapperPath, source, deps)

    if (!edges) {
      listSummaryCache.set(cacheKey, null)
      return null
    }

    const config = parseListSummaryConfig(source)

    const entries: ListEntry[] = edges.map((node) =>
      toListEntry(
        `${node.fields.slug}.mdx`,
        node.frontmatter as ListSummaryFrontmatter,
        deps
      )
    )

    const data = { config, entries }
    listSummaryCache.set(cacheKey, data)

    return data
  } catch {
    listSummaryCache.set(cacheKey, null)
    return null
  }
}

/**
 * The value the list component would pass to the `edges` prop.
 *
 * Both halves of `edges={getElements(regularMdxNodes)}` come from the app, so
 * the generator renders the same pages the page does and never re-derives the
 * selection:
 *
 * - the selection function is the one the component itself calls
 * - `regularMdxNodes` is the portal's own page list
 *
 * What is assumed, rather than shared, is how to reach them: that the `edges`
 * prop calls a statically imported function with the pages as its only
 * argument, and where the portal keeps `getPortalPages()`.
 */
async function generateEdgesProp(
  wrapperPath: string,
  wrapperSource: string,
  deps: Pick<SpecialMdxRendererDeps, 'docsRoot' | 'findPackageRoot'>
): Promise<MdxNode[] | null> {
  const portalRoot = deps.findPackageRoot('dnb-design-system-portal')
  const getEdges = await extractGetEdges(wrapperPath, wrapperSource)

  if (!portalRoot || !getEdges) {
    return null
  }

  const regularMdxNodes = await loadRegularMdxNodes(
    portalRoot,
    deps.docsRoot
  )

  return getEdges(regularMdxNodes)
}

/** The selection function the component calls in its `edges` prop. */
async function extractGetEdges(
  wrapperPath: string,
  wrapperSource: string
): Promise<GetEdges | null> {
  const name = wrapperSource.match(
    /edges=\{\s*(\w+)\s*\(\s*regularMdxNodes\s*\)\s*\}/
  )?.[1]

  if (!name) {
    return null
  }

  const importSource = wrapperSource.match(
    new RegExp(
      `import\\s*\\{[^}]*\\b${name}\\b[^}]*\\}\\s*from\\s*'([^']+)'`
    )
  )?.[1]

  if (!importSource) {
    return null
  }

  const modulePath = await resolveSourceWithExtension(
    path.resolve(path.dirname(wrapperPath), importSource)
  )

  if (!modulePath) {
    return null
  }

  const selections = (await import(modulePath)) as Record<string, GetEdges>

  return selections[name] ?? null
}

/**
 * The pages the app hands to `getEdges()`, built by the portal itself so the
 * tool and the app cannot disagree on which pages exist.
 */
async function loadRegularMdxNodes(portalRoot: string, docsRoot: string) {
  const cacheKey = `${portalRoot}::${docsRoot}`
  const cached = regularMdxNodesCache.get(cacheKey)

  if (cached) {
    return cached
  }

  const { getPortalPages } = await import(
    path.join(portalRoot, 'vite/client/plugins/portal-pages.ts')
  )
  const { regularMdxNodes } = getPortalPages(docsRoot) as {
    regularMdxNodes: MdxNode[]
  }

  regularMdxNodesCache.set(cacheKey, regularMdxNodes)

  return regularMdxNodes
}

function parseListSummaryConfig(
  componentSource: string
): ListSummaryConfig {
  return {
    returnListItems:
      /<ListSummaryFromEdges\b[^>]*\breturnListItems\b/.test(
        componentSource
      ),
  }
}

function parseHeadingLevel(value: string) {
  const parsed = parseInt(value, 10)

  if (Number.isNaN(parsed) || parsed < 1 || parsed > 6) {
    return 2
  }

  return parsed
}

function renderListEntriesMarkdown(
  entries: ListEntry[],
  options: {
    returnListItems: boolean
    level: number
    description: string | null
  }
) {
  if (options.returnListItems) {
    return entries
      .map((entry) => {
        const description = options.description ?? entry.description

        return description
          ? `- [${entry.title}](${entry.slug}): ${description}`
          : `- [${entry.title}](${entry.slug})`
      })
      .join('\n')
  }

  const headingPrefix = '#'.repeat(options.level)

  return entries
    .map((entry) => {
      const description = options.description ?? entry.description

      return description
        ? `${headingPrefix} [${entry.title}](${entry.slug})\n\n${description}`
        : `${headingPrefix} [${entry.title}](${entry.slug})`
    })
    .join('\n\n')
}
