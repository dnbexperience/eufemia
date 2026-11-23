import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import matter from '@11ty/gray-matter'
import { docsDir, walk } from './shared/helpers'

/**
 * Guards the section structure of portal documentation pages.
 *
 * - A page starts with its description, so `## Description` comes before
 *   `## Import`.
 * - `## Relevant links` only lists links. Other content placed after the list
 *   would be announced as part of the links section, so it belongs in the
 *   description or in a section of its own. `<RelatedComponents />` and MDX
 *   partials, which render their own headings, are allowed.
 */

type Line = { text: string; heading: string | null }

/**
 * Split an MDX body into lines and mark markdown headings.
 * Fenced code blocks are skipped, so a `#` comment is not a heading.
 */
function getLines(body: string): Line[] {
  const lines: Line[] = []
  let fenceMarker = ''

  for (const text of body.split('\n')) {
    const fence = /^\s*(```+|~~~+)/.exec(text)
    if (fence) {
      const marker = fence[1][0]
      if (!fenceMarker) {
        fenceMarker = marker
      } else if (marker === fenceMarker) {
        fenceMarker = ''
      }
      lines.push({ text, heading: null })
      continue
    }

    const isHeading = !fenceMarker && /^#{1,6}\s+\S/.test(text)
    lines.push({ text, heading: isHeading ? text.trim() : null })
  }

  return lines
}

function getMdxPartialNames(body: string): Set<string> {
  const names = new Set<string>()
  const importRegex = /^import\s+(\w+)\s+from\s+['"][^'"]+\.mdx['"]/gm

  for (const match of body.matchAll(importRegex)) {
    names.add(match[1])
  }

  return names
}

const LINK_ITEM = /^\s*(?:[-*]|\d+\.)\s+\[/

describe('portal page sections', () => {
  const pages = walk(docsDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      file: path.relative(docsDir, file),
      body: matter(fs.readFileSync(file, 'utf-8')).content,
    }))

  it('scans a meaningful number of MDX files', () => {
    expect(pages.length).toBeGreaterThan(50)
  })

  it('places the description before the import', () => {
    const offenders: string[] = []

    for (const { file, body } of pages) {
      const headings = getLines(body)
        .map(({ heading }) => heading)
        .filter(Boolean)
      const description = headings.indexOf('## Description')
      const imports = headings.indexOf('## Import')

      if (description !== -1 && imports !== -1 && imports < description) {
        offenders.push(file)
      }
    }

    expect(
      offenders,
      `These pages show "## Import" before "## Description":\n` +
        offenders.join('\n') +
        `\n\nMove the import section after the description.`
    ).toEqual([])
  })

  it('only lists links in "Relevant links"', () => {
    const offenders: string[] = []

    for (const { file, body } of pages) {
      const partials = getMdxPartialNames(body)
      let inLinks = false

      for (const { text, heading } of getLines(body)) {
        if (heading) {
          inLinks = /^## Relevant links\b/.test(heading)
          continue
        }

        const line = text.trim()
        const element = /^<(\w+)[^>]*\/>$/.exec(line)?.[1] ?? ''
        const isAllowed =
          !line ||
          LINK_ITEM.test(text) ||
          element === 'RelatedComponents' ||
          partials.has(element)

        if (inLinks && !isAllowed) {
          offenders.push(`${file}: ${line.slice(0, 60)}`)
          break
        }
      }
    }

    expect(
      offenders,
      `These pages have content other than links in "## Relevant links":\n` +
        offenders.join('\n') +
        `\n\nMove the content to the description or into a section of its own.`
    ).toEqual([])
  })
})
