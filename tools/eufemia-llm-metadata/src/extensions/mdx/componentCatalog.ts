import fs from 'fs-extra'
import path from 'path'

/**
 * Component catalog used to render the portal-global `RelatedComponents`
 * and `ListComponentsOverview` MDX components into static markdown.
 *
 * The category definitions mirror
 * `packages/dnb-design-system-portal/src/shared/parts/componentCategories.ts`
 * so the grouping stays in sync with what the website renders.
 */

export type ComponentCategoryId =
  | 'actions'
  | 'input'
  | 'navigation'
  | 'feedback'
  | 'content'
  | 'other'

export type ComponentCategoryDefinition = {
  id: ComponentCategoryId
  title: string
  description: string
}

export const componentCategoryOrder: ReadonlyArray<ComponentCategoryDefinition> =
  [
    {
      id: 'actions',
      title: 'Actions',
      description:
        'For things people click to do something, open choices, follow a link, or get help.',
    },
    {
      id: 'input',
      title: 'Input',
      description:
        'For entering information, choosing options, uploading files, or changing values.',
    },
    {
      id: 'navigation',
      title: 'Navigation',
      description:
        'For helping people move between pages, jump to content, or continue through steps.',
    },
    {
      id: 'feedback',
      title: 'Feedback',
      description:
        'For messages and panels that tell people what happened, what is happening, or what needs attention.',
    },
    {
      id: 'content',
      title: 'Content',
      description:
        'For showing information, such as text, numbers, tables, icons, lists, and cards.',
    },
    {
      id: 'other',
      title: 'Other',
      description:
        'For special page behavior that does not fit the groups above.',
    },
  ]

const categoryIds = new Set<string>(
  componentCategoryOrder.map(({ id }) => id)
)

export const excludedSlugs = new Set([
  'uilib/components/fragments',
  'uilib/components/overview',
])

export type ComponentCatalogEntry = {
  slug: string
  title: string
  description: string | null
  category: ComponentCategoryId
}

export type ComponentCatalog = {
  byNormalizedSlug: Map<string, ComponentCatalogEntry>
  byCategory: Map<ComponentCategoryId, ComponentCatalogEntry[]>
}

const catalogCache = new Map<string, Promise<ComponentCatalog>>()

export function getComponentCategoryTitle(
  id: ComponentCategoryId
): string {
  return (
    componentCategoryOrder.find((category) => category.id === id)?.title ??
    id
  )
}

export function normalizeComponentSlug(slug: string): string {
  return slug
    .replace(/^\/|\/$/g, '')
    .replace(/\/(info|demos|properties|events)$/, '')
}

export function cleanComponentTitle(title: string): string {
  return title.replace(/\s*\(.*\)\s*$/, '')
}

export function toRelatedReason(
  description: string | null
): string | undefined {
  if (!description) {
    return undefined
  }

  // Turn "Use <Component> to/when …" into a short reason clause.
  return description.replace(
    /^Use\s+[A-Z]\S*\s+(?=to\b|when\b|for\b|as\b|if\b)/,
    ''
  )
}

export function loadComponentCatalog(
  docsRoot: string
): Promise<ComponentCatalog> {
  const cached = catalogCache.get(docsRoot)

  if (cached) {
    return cached
  }

  const promise = buildComponentCatalog(docsRoot)
  catalogCache.set(docsRoot, promise)

  return promise
}

async function buildComponentCatalog(
  docsRoot: string
): Promise<ComponentCatalog> {
  const componentsRoot = path.join(docsRoot, 'uilib', 'components')
  const entries: ComponentCatalogEntry[] = []

  let files: string[]

  try {
    files = await findMdxFiles(componentsRoot)
  } catch {
    files = []
  }

  for (const filePath of files) {
    const relativePath = path
      .relative(docsRoot, filePath)
      .replace(/\\/g, '/')
    const noExt = relativePath.replace(/\.[^/.]+$/, '')

    if (excludedSlugs.has(noExt)) {
      continue
    }

    const frontmatter = await readFrontmatter(filePath)

    if (!frontmatter) {
      continue
    }

    const title =
      typeof frontmatter.title === 'string' ? frontmatter.title.trim() : ''

    if (
      !title ||
      frontmatter.draft === true ||
      frontmatter.hideInMenu === true
    ) {
      continue
    }

    const category = getCategoryId(frontmatter.category)

    if (!category) {
      continue
    }

    entries.push({
      slug: `/${noExt}/`,
      title,
      description:
        typeof frontmatter.description === 'string'
          ? frontmatter.description
          : null,
      category,
    })
  }

  const byNormalizedSlug = new Map<string, ComponentCatalogEntry>()
  const byCategory = new Map<
    ComponentCategoryId,
    ComponentCatalogEntry[]
  >()

  for (const entry of entries) {
    byNormalizedSlug.set(normalizeComponentSlug(entry.slug), entry)

    const group = byCategory.get(entry.category) || []
    group.push(entry)
    byCategory.set(entry.category, group)
  }

  for (const group of Array.from(byCategory.values())) {
    group.sort((a, b) => a.title.localeCompare(b.title))
  }

  return { byNormalizedSlug, byCategory }
}

async function findMdxFiles(root: string): Promise<string[]> {
  const files: string[] = []

  async function walk(currentPath: string): Promise<void> {
    const dirEntries = await fs.readdir(currentPath, {
      withFileTypes: true,
    })

    for (const dirEntry of dirEntries) {
      const fullPath = path.join(currentPath, dirEntry.name)

      if (dirEntry.isDirectory()) {
        await walk(fullPath)
        continue
      }

      if (dirEntry.isFile() && fullPath.endsWith('.mdx')) {
        files.push(fullPath)
      }
    }
  }

  await walk(root)

  return files
}

type CatalogFrontmatter = {
  title?: string | null
  description?: string | null
  category?: string | boolean | null
  draft?: boolean | null
  hideInMenu?: boolean | null
}

async function readFrontmatter(
  filePath: string
): Promise<CatalogFrontmatter | null> {
  try {
    const source = await fs.readFile(filePath, 'utf-8')

    return parseFrontmatter(source)
  } catch {
    return null
  }
}

function parseFrontmatter(source: string): CatalogFrontmatter | null {
  const match = source.match(/^---\n([\s\S]*?)\n---/)

  if (!match?.[1]) {
    return null
  }

  const frontmatter: CatalogFrontmatter = {}

  for (const line of match[1].split('\n')) {
    const separatorIndex = line.indexOf(':')

    if (separatorIndex < 0) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const rawValue = line.slice(separatorIndex + 1).trim()

    if (key === 'title') {
      frontmatter.title = parseScalar(rawValue) as string
    } else if (key === 'description') {
      frontmatter.description = parseScalar(rawValue) as string
    } else if (key === 'category') {
      frontmatter.category = parseScalar(rawValue) as string | boolean
    } else if (key === 'draft') {
      frontmatter.draft = rawValue === 'true'
    } else if (key === 'hideInMenu') {
      frontmatter.hideInMenu = rawValue === 'true'
    }
  }

  return frontmatter
}

function parseScalar(value: string): string | boolean {
  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  return value.replace(/^['"]|['"]$/g, '')
}

function getCategoryId(
  category: string | boolean | null | undefined
): ComponentCategoryId | undefined {
  if (category === false) {
    return undefined
  }

  if (typeof category === 'string' && categoryIds.has(category)) {
    return category as ComponentCategoryId
  }

  return 'other'
}
