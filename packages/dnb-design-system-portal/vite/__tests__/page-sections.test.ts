import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import matter from '@11ty/gray-matter'
import { docsDir, walk } from './shared/helpers'
import { defaultTabsValue } from '../../src/shared/tags/defaultValues'

/**
 * Guards the section structure of portal documentation pages.
 *
 * - A tab page for Info, Demos, Properties or Events starts with a heading
 *   named after its tab, such as `## Info`. Info and Demos have no other
 *   `##` sections, since a component page shows them together. In Info,
 *   `### Import` is the first subsection, followed by `### Relevant links`.
 * - "Relevant links" only lists links. Other content placed after the list
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
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(file, 'utf-8'))
      return { file: path.relative(docsDir, file), data, body: content }
    })
  const pagesByFile = new Map(pages.map((page) => [page.file, page]))

  it('scans a meaningful number of MDX files', () => {
    expect(pages.length).toBeGreaterThan(50)
  })

  it('structures each Info, Demos, Properties and Events tab around its tab heading', () => {
    const offenders: string[] = []
    const tabTitles = ['Info', 'Demos', 'Properties', 'Events']

    // A component page shows these tabs together, so each of them is one
    // section of the page.
    const sectionTabs = ['Info', 'Demos']

    for (const { file, data } of pages) {
      if (data.showTabs !== true) {
        continue
      }

      const tabs: Array<{ title: string; key: string }> =
        data.tabs || defaultTabsValue

      for (const { title, key } of tabs) {
        // A key is either relative to the page, such as "/info", or a full
        // path, such as "/web/components/number-format/info".
        const tabPath = key.replace(/^\//, '')
        const tabFile = tabPath.includes('/')
          ? path.normalize(`${tabPath}.mdx`)
          : path.join(file.replace(/\.mdx$/, ''), `${tabPath}.mdx`)
        const tabPage = pagesByFile.get(tabFile)

        if (!tabTitles.includes(title) || !tabPage) {
          continue
        }

        const headings = getLines(tabPage.body)
          .map(({ heading }) => heading)
          .filter(Boolean)
        const otherSections = headings.filter(
          (heading, index) => index > 0 && /^## /.test(heading)
        )

        const subsections = headings.filter((heading) =>
          /^### /.test(heading)
        )
        const imports = subsections.indexOf('### Import')
        const links = subsections.indexOf('### Relevant links')

        if (headings[0] !== `## ${title}`) {
          offenders.push(`${tabFile}: ${headings[0] ?? 'no heading'}`)
        } else if (sectionTabs.includes(title) && otherSections.length) {
          offenders.push(`${tabFile}: ${otherSections[0]}`)
        } else if (imports > 0) {
          offenders.push(`${tabFile}: ${subsections[0]} before ### Import`)
        } else if (imports === 0 && links !== -1 && links !== 1) {
          offenders.push(
            `${tabFile}: ${subsections[1]} between ### Import and ### Relevant links`
          )
        }
      }
    }

    expect(
      offenders,
      `These tab pages don't start with a heading named after their tab, ` +
        `or have other "##" sections:\n` +
        offenders.join('\n') +
        `\n\nStart the page with "## Info", "## Demos", "## Properties" or ` +
        `"## Events", matching its tab. In Info and Demos, use "###" for ` +
        `the sections below it. In Info, start with "### Import" and ` +
        `"### Relevant links".`
    ).toEqual([])
  })

  it('only lists links in "Relevant links"', () => {
    const offenders: string[] = []

    for (const { file, body } of pages) {
      const partials = getMdxPartialNames(body)
      let inLinks = false

      for (const { text, heading } of getLines(body)) {
        if (heading) {
          inLinks = /^#+ Relevant links\b/.test(heading)
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
      `These pages have content other than links in "Relevant links":\n` +
        offenders.join('\n') +
        `\n\nMove the content to the description or into a section of its own.`
    ).toEqual([])
  })
})
