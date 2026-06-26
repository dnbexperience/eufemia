import path from 'path'
import type {
  SpecialMdxComponentRenderer,
  SpecialMdxRendererDeps,
} from './types.ts'
import {
  cleanComponentTitle,
  getComponentCategoryTitle,
  loadComponentCatalog,
  normalizeComponentSlug,
  toRelatedReason,
  type ComponentCatalog,
  type ComponentCatalogEntry,
} from './componentCatalog.ts'
import { escapeMarkdownLinkText, escapeMarkdownLinkUrl } from './utils.ts'

// Mirrors MAX_VISIBLE_RELATED in
// packages/dnb-design-system-portal/src/shared/parts/RelatedComponents.tsx
const MAX_VISIBLE_RELATED = 6

export function createRelatedComponentsExtension(
  deps: SpecialMdxRendererDeps
): SpecialMdxComponentRenderer {
  return {
    name: 'RelatedComponents',
    replace: (content) => replaceRelatedComponents(content, deps),
  }
}

async function replaceRelatedComponents(
  content: string,
  deps: Pick<SpecialMdxRendererDeps, 'docsRoot' | 'inputPath'>
) {
  const regex = /<RelatedComponents\b[^>]*\/>/g

  if (!regex.test(content)) {
    return content
  }

  const catalog = await loadComponentCatalog(deps.docsRoot)
  const current = findCurrentEntry(catalog, deps)

  if (!current) {
    return content
  }

  const markdown = renderRelatedComponents(catalog, current)

  if (!markdown) {
    return content
  }

  regex.lastIndex = 0

  return content.replace(regex, () => `\n${markdown}\n`)
}

function findCurrentEntry(
  catalog: ComponentCatalog,
  deps: Pick<SpecialMdxRendererDeps, 'docsRoot' | 'inputPath'>
): ComponentCatalogEntry | undefined {
  const relativePath = path
    .relative(deps.docsRoot, deps.inputPath)
    .replace(/\\/g, '/')
  const noExt = relativePath.replace(/\.[^/.]+$/, '')

  return catalog.byNormalizedSlug.get(normalizeComponentSlug(noExt))
}

function renderRelatedComponents(
  catalog: ComponentCatalog,
  current: ComponentCatalogEntry
): string | null {
  const related = (catalog.byCategory.get(current.category) || []).filter(
    (entry) => entry.slug !== current.slug
  )

  if (related.length === 0) {
    return null
  }

  const categoryTitle = getComponentCategoryTitle(current.category)
  const overviewAnchor = `/uilib/components/overview/#${current.category}`
  const categoryLink = `[${escapeMarkdownLinkText(categoryTitle)}](${escapeMarkdownLinkUrl(overviewAnchor)})`
  const visible = related.slice(0, MAX_VISIBLE_RELATED)
  const hasMore = related.length > visible.length

  const lines = [
    '## Related components',
    '',
    `${cleanComponentTitle(current.title)} is part of the ${categoryLink} category. Other components for similar needs:`,
    '',
  ]

  for (const entry of visible) {
    const reason = toRelatedReason(entry.description)
    const title = escapeMarkdownLinkText(cleanComponentTitle(entry.title))
    const url = escapeMarkdownLinkUrl(entry.slug)

    lines.push(
      reason ? `- [${title}](${url}) – ${reason}` : `- [${title}](${url})`
    )
  }

  if (hasMore) {
    lines.push(
      '',
      `[See all in ${escapeMarkdownLinkText(categoryTitle)}](${escapeMarkdownLinkUrl(overviewAnchor)})`
    )
  }

  return lines.join('\n')
}
