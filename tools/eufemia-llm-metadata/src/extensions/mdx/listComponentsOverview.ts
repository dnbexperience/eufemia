import type {
  SpecialMdxComponentRenderer,
  SpecialMdxRendererDeps,
} from './types.ts'
import {
  componentCategoryOrder,
  loadComponentCatalog,
  type ComponentCatalog,
} from './componentCatalog.ts'
import { escapeMarkdownLinkText, escapeMarkdownLinkUrl } from './utils.ts'

export function createListComponentsOverviewExtension(
  deps: SpecialMdxRendererDeps
): SpecialMdxComponentRenderer {
  return {
    name: 'ListComponentsOverview',
    replace: (content) => replaceListComponentsOverview(content, deps),
  }
}

async function replaceListComponentsOverview(
  content: string,
  deps: Pick<SpecialMdxRendererDeps, 'docsRoot'>
) {
  const regex = /<ListComponentsOverview\b[^>]*\/>/g

  if (!regex.test(content)) {
    return content
  }

  const catalog = await loadComponentCatalog(deps.docsRoot)
  const markdown = renderOverview(catalog)

  if (!markdown) {
    return content
  }

  regex.lastIndex = 0

  return content.replace(regex, () => `\n${markdown}\n`)
}

function renderOverview(catalog: ComponentCatalog): string | null {
  const sections: string[] = []

  for (const category of componentCategoryOrder) {
    const entries = catalog.byCategory.get(category.id) || []

    if (entries.length === 0) {
      continue
    }

    const lines = [`## ${category.title}`, '', category.description, '']

    if (category.id === 'input') {
      lines.push(
        '**NB:** When creating application forms, use [Eufemia Forms](/uilib/extensions/forms/) instead of composing forms from the base components below.',
        ''
      )
    }

    for (const entry of entries) {
      const link = `[${escapeMarkdownLinkText(entry.title)}](${escapeMarkdownLinkUrl(entry.slug)})`

      lines.push(
        entry.description ? `- ${link}: ${entry.description}` : `- ${link}`
      )
    }

    sections.push(lines.join('\n'))
  }

  if (sections.length === 0) {
    return null
  }

  return sections.join('\n\n')
}
