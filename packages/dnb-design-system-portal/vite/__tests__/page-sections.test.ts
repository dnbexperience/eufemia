import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import matter from '@11ty/gray-matter'
import { docsDir, walk, resolveImportCandidates } from './shared/helpers'
import { defaultTabsValue } from '../../src/shared/tags/defaultValues'

/**
 * Guards the section structure of portal documentation pages.
 *
 * - A tab page for Overview, Demos, Properties or Events starts with a
 *   heading named after its tab, such as `## Overview`. Overview and Demos
 *   have no other `##` sections, since a component page shows them together.
 *   In Overview, `### Import` is the first subsection, followed by
 *   `### Relevant links`. Headings of the MDX partials a tab renders count as
 *   part of the tab.
 * - The table of contents lists two levels by default, so a page whose
 *   Overview, Properties or Events tab has `####` headings sets `tocDepth: 3`
 *   to list them as well.
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

/**
 * The headings an MDX file renders, including the headings of the MDX
 * partials it renders, at the place where it renders them.
 */
function getRenderedHeadings(
  file: string,
  body: string,
  seen = new Set([file])
): string[] {
  const partials = new Map<string, string>()

  for (const [, name, spec] of body.matchAll(
    /^import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/gm
  )) {
    const partial = resolveImportCandidates(file, spec).find(
      (candidate) => candidate.endsWith('.mdx') && fs.existsSync(candidate)
    )
    if (partial) {
      partials.set(name, partial)
    }
  }

  return getLines(body).flatMap(({ text, heading }) => {
    if (heading) {
      return [heading]
    }

    const partial = partials.get(/^\s*<(\w+)\s*\/>\s*$/.exec(text)?.[1])
    if (!partial || seen.has(partial)) {
      return []
    }

    return getRenderedHeadings(
      partial,
      matter(fs.readFileSync(partial, 'utf-8')).content,
      new Set([...seen, partial])
    )
  })
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
  const tabTitles = ['Overview', 'Demos', 'Properties', 'Events']

  const tabPages = pages.flatMap(({ file, data }) => {
    if (data.showTabs !== true) {
      return []
    }

    const tabs: Array<{ title: string; key: string }> =
      data.tabs || defaultTabsValue

    return tabs.flatMap(({ title, key }) => {
      // A key is either relative to the page, such as "/overview", or a full
      // path, such as "/web/components/number-format/overview".
      const tabPath = key.replace(/^\//, '')
      const tabFile = tabPath.includes('/')
        ? path.normalize(`${tabPath}.mdx`)
        : path.join(file.replace(/\.mdx$/, ''), `${tabPath}.mdx`)
      const tabPage = pagesByFile.get(tabFile)

      // A tab whose key is the page itself, such as the Overview tab of a
      // guide, has the page title as its heading.
      if (!tabTitles.includes(title) || !tabPage || tabFile === file) {
        return []
      }

      const headings = getRenderedHeadings(
        path.join(docsDir, tabFile),
        tabPage.body
      )

      return [
        {
          file,
          title,
          tabFile,
          headings,
          tocDepth: tabPage.data.tocDepth ?? data.tocDepth,
        },
      ]
    })
  })

  it('scans a meaningful number of MDX files', () => {
    expect(pages.length).toBeGreaterThan(50)
    expect(tabPages.length).toBeGreaterThan(50)
  })

  it('writes the Overview tab in overview.mdx, not info.mdx', () => {
    // An info.mdx is no longer a tab, so it would become a page of its own.
    const offenders = pages
      .map(({ file }) => file)
      .filter((file) => path.basename(file) === 'info.mdx')

    expect(
      offenders,
      `These files use the old name of the Overview tab:\n` +
        offenders.join('\n') +
        `\n\nRename each of them to overview.mdx.`
    ).toEqual([])
  })

  it('structures each Overview, Demos, Properties and Events tab around its tab heading', () => {
    const offenders: string[] = []

    // A component page shows these tabs together, so each of them is one
    // section of the page.
    const sectionTabs = ['Overview', 'Demos']

    for (const { title, tabFile, headings } of tabPages) {
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

    expect(
      offenders,
      `These tab pages don't start with a heading named after their tab, ` +
        `or have other "##" sections:\n` +
        offenders.join('\n') +
        `\n\nStart the page with "## Overview", "## Demos", "## Properties" ` +
        `or "## Events", matching its tab. In Overview and Demos, use "###" ` +
        `for the sections below it, also in the MDX partials they render. ` +
        `In Overview, start with "### Import" and "### Relevant links".`
    ).toEqual([])
  })

  it('lists the "####" headings of Overview, Properties and Events in the table of contents', () => {
    const offenders = new Set<string>()

    for (const { file, title, headings, tocDepth } of tabPages) {
      if (
        title !== 'Demos' &&
        !(tocDepth >= 3) &&
        headings.some((heading) => /^#### /.test(heading))
      ) {
        offenders.add(file)
      }
    }

    expect(
      [...offenders],
      `These pages have "####" headings in their Overview, Properties or ` +
        `Events tab, which the table of contents doesn't list:\n` +
        [...offenders].join('\n') +
        `\n\nAdd "tocDepth: 3" to the frontmatter of the page.`
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
