import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { scanPageFiles } from '../client/plugins/portal-pages'

/**
 * Guards the "main heading" pattern for portal documentation pages.
 *
 * How the H1 is produced (see core/PortalLayout.tsx + shared/tags/TabBar.tsx):
 * - Tab pages (`showTabs: true`) get their H1 auto-generated from the
 *   frontmatter `title` by the TabBar (`<AutoLinkHeader level={1}>`).
 * - Non-tab pages must provide their own H1 as the first rendered content,
 *   either an explicit `# ` heading or a component/partial that renders one.
 *
 * This test asserts that every published, non-tab, standalone page starts with
 * an H1. Pages whose H1 legitimately comes from elsewhere are skipped:
 * - `showTabs` pages (auto H1 from title)
 * - `draft: true` pages (not published)
 * - `fullscreen: true` pages (custom landing pages, e.g. the intro)
 * - partials imported by another page (their H1 comes from the parent page)
 * - component-only pages (the imported component renders the H1)
 */

const docsDir = path.resolve(__dirname, '../../src/docs')

const SOURCE_EXTENSIONS = ['.mdx', '.tsx', '.ts', '.js', '.jsx']

function walk(dir: string, results: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, results)
    } else if (SOURCE_EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath)
    }
  }
  return results
}

const IMPORT_REGEX = /import\s+(?:[\s\S]*?)\s+from\s+['"]([^'"]+)['"]/g

function resolveImportCandidates(
  fromFile: string,
  spec: string
): string[] {
  let base: string
  if (spec.startsWith('Docs/')) {
    base = path.join(docsDir, spec.slice('Docs/'.length))
  } else if (spec.startsWith('./') || spec.startsWith('../')) {
    base = path.resolve(path.dirname(fromFile), spec)
  } else {
    return []
  }
  return [
    base,
    ...SOURCE_EXTENSIONS.map((ext) => base + ext),
    ...SOURCE_EXTENSIONS.map((ext) => path.join(base, 'index' + ext)),
  ].map((candidate) => path.normalize(candidate))
}

/**
 * Build the set of files that are imported by another file inside the docs
 * tree. These are partials (e.g. `info.mdx`, section fragments) whose heading
 * is rendered within a parent page, so they don't need their own leading H1.
 */
function buildImportedSet(): Set<string> {
  const imported = new Set<string>()
  for (const file of walk(docsDir)) {
    const content = fs.readFileSync(file, 'utf-8')
    let match: RegExpExecArray | null
    IMPORT_REGEX.lastIndex = 0
    while ((match = IMPORT_REGEX.exec(content)) !== null) {
      for (const candidate of resolveImportCandidates(file, match[1])) {
        imported.add(candidate)
      }
    }
  }
  return imported
}

type FirstContent = {
  text: string
  isHeading: boolean
  level: number
  isComponent: boolean
}

/**
 * Inspect an MDX body (frontmatter already stripped) and return the first
 * piece of rendered content plus the level of the first markdown heading.
 * Skips blank lines, single- and multi-line import/export statements, and
 * fenced code blocks (so a `#` comment inside a code block is not a heading).
 */
function analyzeBody(body: string): {
  firstContent: FirstContent | null
  firstHeadingLevel: number | null
} {
  let inFence = false
  let fenceMarker = ''
  let inImportBlock = false
  let firstContent: FirstContent | null = null
  let firstHeadingLevel: number | null = null

  for (const line of body.split('\n')) {
    const fence = /^\s*(```+|~~~+)/.exec(line)
    if (fence) {
      const marker = fence[1][0]
      if (!inFence) {
        inFence = true
        fenceMarker = marker
      } else if (marker === fenceMarker) {
        inFence = false
      }
      continue
    }
    if (inFence) {
      continue
    }

    const heading = /^(#{1,6})\s+\S/.exec(line)
    if (heading && firstHeadingLevel === null) {
      firstHeadingLevel = heading[1].length
    }

    if (firstContent !== null) {
      continue
    }

    const trimmed = line.trim()
    if (!trimmed) {
      continue
    }

    if (inImportBlock) {
      if (
        /\bfrom\s+['"]/.test(trimmed) ||
        /}\s*from/.test(trimmed) ||
        trimmed === '}'
      ) {
        inImportBlock = false
      }
      continue
    }
    if (/^(import|export)\b/.test(trimmed)) {
      if (!/\bfrom\s+['"]/.test(trimmed) && /\{\s*$/.test(trimmed)) {
        inImportBlock = true
      }
      continue
    }

    const headingMatch = /^(#{1,6})\s+/.exec(trimmed)
    firstContent = {
      text: trimmed,
      isHeading: Boolean(headingMatch),
      level: headingMatch ? headingMatch[1].length : 0,
      isComponent: trimmed.startsWith('<'),
    }
  }

  return { firstContent, firstHeadingLevel }
}

describe('portal page main headings', () => {
  const importedSet = buildImportedSet()
  const mdxPages = scanPageFiles(docsDir).filter(
    (page) => page.type === 'mdx'
  )

  it('scans a meaningful number of MDX pages', () => {
    // Sanity check so the assertion below can never pass vacuously.
    expect(mdxPages.length).toBeGreaterThan(50)
  })

  it('every published, non-tab page starts with a main heading (H1)', () => {
    const offenders: string[] = []

    for (const page of mdxPages) {
      const frontmatter = page.frontmatter as Record<string, unknown>

      // H1 comes from the title (tab pages), or page is not published / special.
      if (frontmatter.showTabs === true) continue
      if (frontmatter.draft === true) continue
      if (frontmatter.fullscreen === true) continue

      // Partials are rendered inside a parent page that provides the H1.
      if (importedSet.has(path.normalize(page.filePath))) continue

      const body = matter(fs.readFileSync(page.filePath, 'utf-8')).content
      const { firstContent, firstHeadingLevel } = analyzeBody(body)

      // Empty / import-only file: nothing is rendered, nothing to assert.
      if (!firstContent) continue

      let ok: boolean
      if (firstContent.isHeading) {
        // The first rendered markdown must be a top-level heading.
        ok = firstContent.level === 1
      } else if (firstContent.isComponent) {
        // A leading component may render the H1. Allow it as long as the first
        // markdown heading in the file (if any) is itself an H1.
        ok = firstHeadingLevel === null || firstHeadingLevel === 1
      } else {
        // Prose, tables, etc. before any H1 means there is no main heading.
        ok = false
      }

      if (!ok) {
        const detail = firstContent.isComponent
          ? `first heading is H${firstHeadingLevel}`
          : `starts with "${firstContent.text.slice(0, 60)}"`
        offenders.push(`/${page.slug} (${detail})`)
      }
    }

    expect(
      offenders,
      `These published non-tab pages are missing a main heading (H1):\n` +
        offenders.join('\n') +
        `\n\nAdd a "# Title" as the first content, or use showTabs with a ` +
        `frontmatter title. See vite/__tests__/page-headings.test.ts for the rules.`
    ).toEqual([])
  })
})
