import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import matter from '@11ty/gray-matter'
import { scanPageFiles } from '../client/plugins/portal-pages'
import { buildImportedSet, docsDir, walk } from './shared/helpers'

/**
 * Guards the "main heading" pattern for portal documentation pages.
 *
 * How the H1 is produced (see core/PortalLayout.tsx):
 * - The heading text comes from the frontmatter `contentTitle`, or `title`.
 * - A tab page (`showTabs: true`) without a title of its own uses the `title`
 *   of its parent, because a tab is a part of the parent page.
 * - A page with none of these renders no heading at all.
 *
 * A page therefore owns its heading through frontmatter, never through a
 * markdown `# ` in the body. These tests assert both halves of that rule:
 * every page has a heading to render, and no page body carries an H1.
 *
 * Pages whose heading comes from elsewhere, or that are not browsable
 * documentation, are skipped by the first test:
 * - `showTabs` pages (heading inherited from the parent title)
 * - `draft: true` pages (not published)
 * - partials imported by another page (rendered inside the parent page)
 * - `visual-tests` pages (screenshot fixtures, rendered without a heading)
 */

type MarkdownHeading = { level: number; text: string }

/**
 * Return the markdown headings of an MDX body (frontmatter already stripped).
 * Fenced code blocks are skipped, so a `#` comment inside a code block is not
 * mistaken for a heading.
 */
function getHeadings(body: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = []
  let inFence = false
  let fenceMarker = ''

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
    if (heading) {
      headings.push({ level: heading[1].length, text: line.trim() })
    }
  }

  return headings
}

function findFirstHeadingLevel(body: string): number | null {
  return getHeadings(body)[0]?.level ?? null
}

describe('portal page main headings', () => {
  const importedSet = buildImportedSet()
  const mdxPages = scanPageFiles(docsDir).filter(
    (page) => page.type === 'mdx'
  )

  it('scans a meaningful number of MDX pages', () => {
    // Sanity check so the assertions below can never pass vacuously.
    expect(mdxPages.length).toBeGreaterThan(50)
  })

  it('every published, non-tab page has a title or contentTitle to render as its main heading (H1)', () => {
    const offenders: string[] = []

    for (const page of mdxPages) {
      const frontmatter = page.frontmatter as Record<string, unknown>

      // H1 comes from the parent title, or page is not published / special.
      if (frontmatter.showTabs === true) continue
      if (frontmatter.draft === true) continue
      if (page.slug.split('/').includes('visual-tests')) continue

      // Partials are rendered inside a parent page that provides the H1.
      if (importedSet.has(path.normalize(page.filePath))) continue

      if (
        frontmatter.title === undefined &&
        frontmatter.contentTitle === undefined
      ) {
        offenders.push(`/${page.slug}`)
      }
    }

    expect(
      offenders,
      `These published non-tab pages render no main heading (H1):\n` +
        offenders.join('\n') +
        `\n\nAdd a frontmatter "title", or a "contentTitle" to give the page a ` +
        `heading without adding it to the menu. ` +
        `See vite/__tests__/page-headings.test.ts for the rules.`
    ).toEqual([])
  })

  it('no page starts with a main heading (H1) of its own', () => {
    const offenders: string[] = []

    for (const page of mdxPages) {
      const body = matter(fs.readFileSync(page.filePath, 'utf-8')).content

      if (findFirstHeadingLevel(body) === 1) {
        offenders.push(`/${page.slug}`)
      }
    }

    expect(
      offenders,
      `These pages start with a main heading (H1) of their own, but the H1 ` +
        `is generated from the frontmatter:\n` +
        offenders.join('\n') +
        `\n\nRemove the "# Title" heading and give the page a frontmatter ` +
        `"title" or "contentTitle" instead. ` +
        `See vite/__tests__/page-headings.test.ts for the rules.`
    ).toEqual([])
  })
})

/**
 * Guards the heading outline within each documentation source file, since
 * screen reader users and the page table of contents navigate by it.
 *
 * - A heading is at most one level deeper than the heading before it. The
 *   first heading is not checked, because a partial may continue the outline
 *   of the page that renders it.
 * - `## Relevant links` only lists links, so it has no subsections.
 */
describe('portal page heading outline', () => {
  const files = walk(docsDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      file: path.relative(docsDir, file),
      headings: getHeadings(
        matter(fs.readFileSync(file, 'utf-8')).content
      ),
    }))

  it('scans a meaningful number of MDX files', () => {
    expect(files.length).toBeGreaterThan(50)
  })

  it('never skips a heading level', () => {
    const offenders: string[] = []

    for (const { file, headings } of files) {
      headings.forEach(({ level, text }, index) => {
        const previous = headings[index - 1]
        if (previous && level > previous.level + 1) {
          offenders.push(`${file}: ${text}`)
        }
      })
    }

    expect(
      offenders,
      `These headings skip a level:\n` +
        offenders.join('\n') +
        `\n\nUse a heading one level below the section it belongs to.`
    ).toEqual([])
  })

  it('has no subsections under "Relevant links"', () => {
    const offenders: string[] = []

    for (const { file, headings } of files) {
      let inLinks = false

      for (const { level, text } of headings) {
        if (level <= 2) {
          inLinks = /^## Relevant links\b/.test(text)
        } else if (inLinks) {
          offenders.push(`${file}: ${text}`)
        }
      }
    }

    expect(
      offenders,
      `These headings are nested under "Relevant links":\n` +
        offenders.join('\n') +
        `\n\nMake them sections of their own, or move them to the section ` +
        `they belong to.`
    ).toEqual([])
  })
})
