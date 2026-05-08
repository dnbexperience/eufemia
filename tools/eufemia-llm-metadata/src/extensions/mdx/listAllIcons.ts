import fs from 'fs-extra'
import path from 'path'
import type {
  SpecialMdxComponentRenderer,
  SpecialMdxRendererDeps,
} from './types.ts'

type IconMetadataEntry = {
  name?: string
  tags?: string[]
  created?: number
  variant?: string
  category?: string
}

let cachedIconMetadata: Array<
  Required<Pick<IconMetadataEntry, 'name' | 'tags' | 'created'>> &
    Pick<IconMetadataEntry, 'variant' | 'category'>
> | null = null

export function createListAllIconsExtension(
  deps: Pick<SpecialMdxRendererDeps, 'findPackageRoot' | 'toPascalCase'>
): SpecialMdxComponentRenderer {
  return {
    name: 'ListAllIcons',
    replace: (content) => replaceListAllIcons(content, deps),
  }
}

async function replaceListAllIcons(
  content: string,
  deps: Pick<SpecialMdxRendererDeps, 'findPackageRoot' | 'toPascalCase'>
) {
  const regex = /<ListAllIcons\b([^>]*)\/>/g

  if (!regex.test(content)) {
    return content
  }

  regex.lastIndex = 0
  const icons = await loadListAllIconsMetadata(deps)

  if (icons.length === 0) {
    return content
  }

  return content.replace(regex, (_match, attrsSource) => {
    const attrs = parseSimpleJsxStringAttributes(String(attrsSource || ''))
    const variant = attrs.variant
    const groupBy = attrs.groupBy
    const filteredIcons = icons.filter((icon) => {
      return !variant || icon.variant === variant
    })

    if (filteredIcons.length === 0) {
      return ''
    }

    return `\n${renderIconsMarkdown(filteredIcons, groupBy, deps)}\n`
  })
}

async function loadListAllIconsMetadata(
  deps: Pick<SpecialMdxRendererDeps, 'findPackageRoot'>
) {
  if (cachedIconMetadata) {
    return cachedIconMetadata
  }

  const eufemiaRoot = deps.findPackageRoot('@dnb/eufemia')

  if (!eufemiaRoot) {
    return []
  }

  const metadataPath = path.join(
    eufemiaRoot,
    'src/icons/dnb/icons-meta.json'
  )

  try {
    const raw = await fs.readFile(metadataPath, 'utf-8')
    const metadata = JSON.parse(raw) as Record<string, IconMetadataEntry>

    cachedIconMetadata = Object.entries(metadata)
      .filter(([iconKey, icon]) => {
        return !iconKey.endsWith('_medium') && Boolean(icon?.name)
      })
      .map(([_iconKey, icon]) => {
        return {
          name: String(icon.name),
          tags: Array.isArray(icon.tags) ? icon.tags : [],
          created: Number(icon.created || 0),
          variant: icon.variant,
          category: icon.category,
        }
      })
      .sort((a, b) => a.created - b.created)

    return cachedIconMetadata
  } catch {
    return []
  }
}

function parseSimpleJsxStringAttributes(source: string) {
  const attrs: Record<string, string> = {}
  const regex = /([A-Za-z0-9_-]+)\s*=\s*(["'])(.*?)\2/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(source))) {
    const [, name, , value] = match

    if (name) {
      attrs[name] = value || ''
    }
  }

  return attrs
}

function renderIconsMarkdown(
  icons: Array<{
    name: string
    tags: string[]
    created: number
    variant?: string
    category?: string
  }>,
  groupBy: string | undefined,
  deps: Pick<SpecialMdxRendererDeps, 'toPascalCase'>
) {
  if (groupBy === 'category') {
    const groups = new Map<string, typeof icons>()

    for (const icon of icons) {
      const key = icon.category || 'uncategorized'
      const existing = groups.get(key) || []
      existing.push(icon)
      groups.set(key, existing)
    }

    return Array.from(groups.entries())
      .map(([category, groupedIcons]) => {
        const heading = deps.toPascalCase(category.replace(/[-_]/g, ' '))
        const lines = groupedIcons.map((icon) => {
          return renderIconMarkdownLine(icon, false)
        })

        return [`## ${heading}`, '', ...lines].join('\n')
      })
      .join('\n\n')
  }

  return icons.map((icon) => renderIconMarkdownLine(icon, true)).join('\n')
}

function renderIconMarkdownLine(
  icon: {
    name: string
    tags: string[]
    category?: string
  },
  includeCategory: boolean
) {
  const parts = [`- \`${icon.name}\``]

  if (includeCategory && icon.category) {
    parts.push(`Category: ${icon.category}.`)
  }

  if (icon.tags.length > 0) {
    parts.push(`Tags: ${icon.tags.join(', ')}.`)
  }

  return parts.join(' ')
}
