import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { excludedSlugs, getCategoryId } from '../componentCategories'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const componentsDir = path.resolve(
  currentDir,
  '../../../docs/uilib/components'
)

const tabPagePattern = /\/(info|demos|properties|events)\.mdx$/

function findMdxFiles(dir: string): string[] {
  const files: string[] = []

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...findMdxFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath)
    }
  }

  return files
}

function readFrontmatterValue(
  content: string,
  key: string
): string | undefined {
  const match = content.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))

  if (!match) {
    return undefined
  }

  return match[1].trim().replace(/^['"]|['"]$/g, '')
}

function toSlug(file: string): string {
  const relative = path.relative(componentsDir, file).replace(/\.mdx$/, '')

  return `uilib/components/${relative}`
}

describe('Related components coverage', () => {
  // Mirrors the ListComponentsOverview GraphQL selection so this fails if a
  // component shown on the overview is missing its <RelatedComponents />.
  it('adds <RelatedComponents /> to every component shown on the overview', () => {
    const parentPages = findMdxFiles(componentsDir).filter(
      (file) => !tabPagePattern.test(file)
    )

    const overviewComponents = parentPages.filter((file) => {
      const content = readFileSync(file, 'utf-8')

      const hasTitle = readFrontmatterValue(content, 'title') !== undefined
      const isDraft = readFrontmatterValue(content, 'draft') === 'true'
      const isHidden =
        readFrontmatterValue(content, 'hideInMenu') === 'true'

      if (!hasTitle || isDraft || isHidden) {
        return false
      }

      const rawCategory = readFrontmatterValue(content, 'category')
      const category = getCategoryId(
        rawCategory === 'false' ? false : rawCategory
      )

      return Boolean(category) && !excludedSlugs.has(toSlug(file))
    })

    // Guard against the rule itself silently matching nothing.
    expect(overviewComponents.length).toBeGreaterThan(40)

    const missing = overviewComponents
      .map((file) => path.join(file.replace(/\.mdx$/, ''), 'info.mdx'))
      .filter(
        (infoFile) =>
          !existsSync(infoFile) ||
          !readFileSync(infoFile, 'utf-8').includes(
            '<RelatedComponents />'
          )
      )
      .map((infoFile) => path.relative(componentsDir, infoFile))

    expect(
      missing,
      `These overview components are missing <RelatedComponents />: ${missing.join(', ')}`
    ).toEqual([])
  })
})
