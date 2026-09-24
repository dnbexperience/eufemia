/**
 * The slug of a single heading.
 *
 * A heading reaches us in four different formats depending on where in the
 * pipeline we stand, and every one of them has to produce the same slug —
 * it is both the `id` of the rendered heading and the `#` fragment that
 * links to it. Each entry point below names the format it accepts, so a
 * caller has to know what it is holding.
 *
 * Finding the headings in a document is a separate concern; these functions
 * only convert one.
 */

import GHSlugger from 'github-slugger'
import { toString as nodeToString } from 'mdast-util-to-string'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'

const slugger = new GHSlugger()

const CUSTOM_ID = /\{#([^}]*)\}/
const CUSTOM_ID_ALL = /\{#[^}]*\}/g
const MAX_DEPTH = 8

/**
 * From plain text — the words a reader sees, with any markup already
 * resolved. This is where the slug is actually derived; the other entry
 * points reduce their format to text and defer to this one.
 *
 * An author can override the derived value by declaring a custom id:
 * https://www.markdownguide.org/extended-syntax/#heading-ids
 */
export function getSlugFromText(text) {
  slugger.reset()

  const customId = CUSTOM_ID.exec(text)?.[1]

  return slugger.slug(customId || String(text ?? ''))
}

/**
 * From the React children of a heading — what MDX passes to the heading
 * component. A plain string when the heading has no inline markup, and an
 * array mixing strings and elements as soon as it contains `code`, **bold**
 * or a [link](url).
 */
export function getSlugFromReactHeading(children) {
  return getSlugFromText(getTextFromReactHeading(children))
}

/**
 * From a parsed heading — an mdast `heading` node.
 */
export function getSlugFromMdastHeading(node) {
  return getSlugFromText(nodeToString(node))
}

/**
 * From a heading in MDX source, such as
 * `## My *heading* with a [link](https://example.com)`.
 */
export function getSlugFromMdxHeading(source) {
  return getSlugFromText(nodeToString(parseMdx(String(source ?? ''))))
}

/**
 * Take the `{#custom-id}` declaration out of a heading's React children, so
 * the markdown syntax does not render as visible text. Only string children
 * can carry it, but it has to go without collapsing the spacing around
 * neighbouring elements.
 */
export function stripCustomMarkdownId(children) {
  if (typeof children === 'string') {
    return children.replace(CUSTOM_ID_ALL, '').trim()
  }

  if (!Array.isArray(children)) {
    return children
  }

  const next = children.map((child) =>
    typeof child === 'string' ? child.replace(CUSTOM_ID_ALL, '') : child
  )
  const last = next.length - 1

  if (typeof next[0] === 'string') {
    next[0] = next[0].trimStart()
  }
  if (typeof next[last] === 'string') {
    next[last] = next[last].trimEnd()
  }

  return next.filter((child) => child !== '')
}

// Vite bundles the config graph to CJS, where the default export of an
// ESM-only package arrives wrapped as `{ default }`.
const unwrapCjsDefaultExport = (imported) => imported?.default ?? imported

let reusedMdxParser

function parseMdx(source) {
  reusedMdxParser =
    reusedMdxParser ||
    unified()
      .use(unwrapCjsDefaultExport(remarkParse))
      .use(unwrapCjsDefaultExport(remarkMdx))

  return reusedMdxParser.parse(source)
}

/**
 * Flatten React children to the text they render as.
 */
function getTextFromReactHeading(children, depth = 0) {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children)
  }

  if (Array.isArray(children)) {
    return children
      .map((child) => getTextFromReactHeading(child, depth))
      .join('')
  }

  if (children && typeof children === 'object' && depth < MAX_DEPTH) {
    if (typeof children.props?.source !== 'undefined') {
      return String(children.props.source)
    }
    return getTextFromReactHeading(children.props?.children, depth + 1)
  }

  return ''
}
