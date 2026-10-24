import { parseFragment } from 'parse5'
import type { DefaultTreeAdapterTypes } from 'parse5'
import type { PortalTocHeading } from '../../src/shared/parts/PortalTocData'

type Node = DefaultTreeAdapterTypes.ChildNode
type Element = DefaultTreeAdapterTypes.Element

const children = (node: Node) =>
  'childNodes' in node ? node.childNodes : []
const attribute = (node: Node, name: string) =>
  'attrs' in node
    ? node.attrs.find((attr) => attr.name === name)?.value
    : undefined
const hasClass = (node: Node, name: string) =>
  attribute(node, 'class')?.split(/\s+/).includes(name)

/** Read actual rendered headings, including those produced by imported components. */
export function readRenderedToc(html: string): PortalTocHeading[] {
  const headings: PortalTocHeading[] = []
  const visit = (node: Node, inContent = false) => {
    if (
      attribute(node, 'hidden') !== undefined ||
      attribute(node, 'aria-hidden') === 'true' ||
      /(?:^|;)\s*(?:display\s*:\s*none|visibility\s*:\s*hidden)\s*(?:!important)?\s*(?:;|$)/i.test(
        attribute(node, 'style') ?? ''
      ) ||
      hasClass(node, 'dnb-live-code-editor') ||
      hasClass(node, 'dnb-table-of-content')
    ) {
      return
    }
    inContent ||= 'tagName' in node && node.tagName === 'main'
    if (inContent && 'tagName' in node && /^h[1-6]$/.test(node.tagName)) {
      const anchor = findAnchor(node)
      const id = anchor && attribute(anchor, 'id')
      if (id) {
        headings.push({
          id,
          level: Number(node.tagName[1]),
          text: titleOf(node),
        })
      }
      return
    }
    children(node).forEach((child) => visit(child, inContent))
  }
  parseFragment(html).childNodes.forEach((node) => visit(node))
  return headings
}

function findAnchor(node: Node): Element | undefined {
  if (
    'tagName' in node &&
    node.tagName === 'a' &&
    hasClass(node, 'anchor-hash')
  ) {
    return node
  }
  for (const child of children(node)) {
    const found = findAnchor(child)
    if (found) {
      return found
    }
  }
}

function titleOf(node: Node): PortalTocHeading['text'] {
  if (hasClass(node, 'anchor-hash') || hasClass(node, 'dnb-aria-live')) {
    return []
  }
  if (node.nodeName === '#text') {
    return [(node as DefaultTreeAdapterTypes.TextNode).value]
  }
  const text = children(node).flatMap(titleOf)
  return 'tagName' in node && node.tagName === 'code'
    ? [
        {
          code: text
            .map((part) => (typeof part === 'string' ? part : part.code))
            .join(''),
        },
      ]
    : text
}
