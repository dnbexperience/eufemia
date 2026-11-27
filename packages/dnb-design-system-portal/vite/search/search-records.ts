import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import type { Nodes } from 'mdast'
import { parseFragment } from 'parse5'
import type { DefaultTreeAdapterTypes } from 'parse5'
import { getSlugFromMdastHeading } from '../../src/uilib/utils/slug.mjs'
import type { PortalTocHeading } from '../../src/shared/parts/PortalTocData'
import type { PortalPlatform } from '../../src/shared/menu/MdxSidebarNavigation'

export type SearchRecord = {
  objectID: string
  url: string
  slug: string
  hash: string
  pageTitle: string
  title: string
  headings: string[]
  keywords: string
  content: string
  platform: PortalPlatform[]
}

export const searchIndexSettings = {
  searchableAttributes: [
    'title',
    'pageTitle',
    'keywords',
    'headings',
    'content',
  ],
  attributeForDistinct: 'url',
  attributesForFaceting: ['filterOnly(platform)'],
  distinct: true,
  attributesToSnippet: ['content:24'],
  highlightPreTag: '',
  highlightPostTag: '',
}

const parser = unified().use(remarkParse).use(remarkGfm)
const clean = (value: string) => value.replace(/\s+/g, ' ').trim()
const headingText = (value: string) =>
  clean(value.replace(/\{#[^}]*\}/g, ''))

function htmlTextOf(node: DefaultTreeAdapterTypes.Node): string {
  if ('tagName' in node && /^(script|style|pre)$/.test(node.tagName)) {
    return ''
  }
  if ('childNodes' in node) {
    const text = node.childNodes.map(htmlTextOf).join('')
    return 'tagName' in node &&
      /^(p|div|li|ol|ul|blockquote|summary|br|h[1-6])$/.test(node.tagName)
      ? ' ' + text + ' '
      : text
  }
  return node.nodeName === '#text'
    ? (node as DefaultTreeAdapterTypes.TextNode).value
    : ''
}

function textOf(node: Nodes): string {
  if (node.type === 'code') {
    if (node.lang === 'json') {
      try {
        const { props } = JSON.parse(node.value)
        return Object.entries(props ?? {})
          .map(
            ([name, entry]: [string, { doc?: string }]) =>
              `${name}: ${textOf(parser.parse(entry.doc ?? ''))}`
          )
          .join(' \n')
      } catch {
        return ''
      }
    }
    return ''
  }
  if (node.type === 'html') {
    return htmlTextOf(parseFragment(node.value))
  }
  if (node.type === 'definition' || node.type === 'image') {
    return ''
  }
  if (
    node.type === 'text' &&
    /^<[A-Z][\w.]*[\s/>]/.test(node.value.trim()) &&
    node.value.trimEnd().endsWith('/>')
  ) {
    return ''
  }
  if ('children' in node && node.children) {
    return node.children
      .map(textOf)
      .join(
        [
          'paragraph',
          'heading',
          'link',
          'linkReference',
          'emphasis',
          'strong',
          'delete',
        ].includes(node.type)
          ? ''
          : ' '
      )
  }
  return 'value' in node ? (node.value ?? '') : ''
}

function splitContent(content: string): string[] {
  const chunks: string[] = []
  while (Buffer.byteLength(content) > 3000) {
    let length = 0
    let bytes = 0
    for (const character of content) {
      bytes += Buffer.byteLength(character)
      if (bytes > 3000) {
        break
      }
      length += character.length
    }
    const boundary = content.lastIndexOf(' ', length)
    const end = boundary > 0 ? boundary : length
    chunks.push(content.slice(0, end).trim())
    // Repeat a short tail so phrases spanning a chunk boundary remain searchable.
    const overlap = content.indexOf(' ', Math.max(0, end - 160))
    content = content
      .slice(overlap > 0 && overlap < end ? overlap + 1 : end)
      .trim()
  }
  chunks.push(content)
  return chunks
}

/** Adapt the same Markdown used by MCP and llms.txt before pages are combined. */
export function buildSearchRecords({
  markdown,
  slug,
  title: pageTitle,
  keywords = '',
  renderedHeadings,
}: {
  markdown: string
  slug: string
  title: string
  keywords?: string
  renderedHeadings?: PortalTocHeading[]
}): SearchRecord[] {
  const platforms: PortalPlatform[] = ['web', 'ios', 'android']
  const platform = platforms.find(
    (platform) => slug === platform || slug.startsWith(platform + '/')
  )
  const tree = parser.parse(
    markdown.replace(
      /<!-- eufemia-properties-usage:start -->[\s\S]*?<!-- eufemia-properties-usage:end -->/g,
      ''
    )
  )
  const sections = [
    {
      hash: '',
      title: pageTitle,
      headings: [] as string[],
      text: [] as string[],
    },
  ]
  const hierarchy: { depth: number; title: string }[] = []
  const usedAnchors = new Set<string>()
  let section = sections[0]

  for (const node of tree.children) {
    if (node.type === 'heading') {
      const title = headingText(textOf(node))
      if (node.depth === 1) {
        continue
      }
      const candidate = getSlugFromMdastHeading(node)
      const rendered =
        renderedHeadings?.find(({ id }) => id === candidate) ??
        renderedHeadings?.find(
          ({ text, id }) =>
            !usedAnchors.has(id) &&
            headingText(
              text
                .map((part) =>
                  typeof part === 'string' ? part : part.code
                )
                .join('')
            ) === title
        )
      if (renderedHeadings && !rendered) {
        section.text.push(title)
        continue
      }
      const hash = rendered?.id ?? candidate
      usedAnchors.add(hash)
      while (hierarchy.length && hierarchy.at(-1).depth >= node.depth) {
        hierarchy.pop()
      }
      const existing = sections.find((entry) => entry.hash === hash)
      section = existing ?? {
        hash,
        title,
        headings: hierarchy.map(({ title }) => title),
        text: [],
      }
      if (!existing) {
        sections.push(section)
      }
      hierarchy.push({ depth: node.depth, title })
    } else {
      const text = clean(textOf(node))
      if (text) {
        section.text.push(text)
      }
    }
  }

  return sections.flatMap(({ hash, title, headings, text }) => {
    const url = `/${slug}${slug ? '/' : ''}${hash ? `#${hash}` : ''}`
    // Keep well below Algolia's record limit, including multibyte content.
    return splitContent(text.join(' ')).map((content, index) => ({
      objectID: `${url}:${index}`,
      url,
      slug,
      hash,
      pageTitle,
      title,
      headings,
      keywords,
      content,
      platform: platform ? [platform] : platforms,
    }))
  })
}

/** Local preview only. Algolia handles production ranking and typo tolerance. */
export function searchRecords(
  records: SearchRecord[],
  query: string,
  platform: PortalPlatform = 'web'
) {
  const terms = query
    .toLocaleLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (!terms.length) {
    return { hits: [] }
  }
  const scored = records
    .flatMap((record) => {
      if (!record.platform.includes(platform)) {
        return []
      }
      const fields = [
        record.title,
        record.pageTitle,
        record.keywords,
        record.headings.join(' '),
        record.content,
      ].map((value) => value.toLocaleLowerCase())
      if (
        !terms.every((term) =>
          fields.some((field) => field.includes(term))
        )
      ) {
        return []
      }
      const score = terms.reduce(
        (score, term) =>
          score +
          fields.reduce(
            (score, field, index) =>
              score + (field.includes(term) ? [16, 8, 4, 2, 1][index] : 0),
            0
          ),
        0
      )
      return [{ record, score }]
    })
    .sort((a, b) => b.score - a.score)
  const seen = new Set<string>()
  const hits = scored
    .filter(({ record }) => {
      if (seen.has(record.url)) {
        return false
      }
      seen.add(record.url)
      return true
    })
    .slice(0, 20)
    .map(({ record }) => {
      const firstMatch = Math.min(
        ...terms
          .map((term) => record.content.toLocaleLowerCase().indexOf(term))
          .filter((index) => index >= 0)
      )
      let start = Number.isFinite(firstMatch)
        ? Math.max(0, firstMatch - 60)
        : 0
      if (start > 0) {
        start = record.content.lastIndexOf(' ', start) + 1
      }
      let end = Math.min(record.content.length, start + 180)
      if (end < record.content.length && record.content[end] !== ' ') {
        const boundary = record.content.lastIndexOf(' ', end)
        if (boundary > start) {
          end = boundary
        }
      }
      const value = `${start ? '…' : ''}${record.content.slice(start, end).trim()}${record.content.length > end ? '…' : ''}`
      return { ...record, _snippetResult: { content: { value } } }
    })
  return { hits }
}
