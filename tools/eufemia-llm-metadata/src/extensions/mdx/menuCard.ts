import type { SpecialMdxComponentRenderer } from './types.ts'
import {
  escapeMarkdownLinkText,
  escapeMarkdownLinkUrl,
  parseSimpleJsxStringAttributes,
} from './utils.ts'

/**
 * Renders the portal `MenuCard` navigation cards into a markdown link list.
 *
 * A `Card.List` wrapper is only unwrapped when it actually contains
 * `MenuCard`s, so unrelated `Card.List` blocks in the same file are left
 * untouched. For example:
 *
 *   <Card.List>
 *     <MenuCard url="/x" title="X" about="About X" icon={Icon} />
 *   </Card.List>
 *
 * becomes
 *
 *   - [X](/x) – About X
 */
export function createMenuCardExtension(): SpecialMdxComponentRenderer {
  return {
    name: 'MenuCard',
    replace: (content) => replaceMenuCards(content),
  }
}

function replaceMenuCards(content: string) {
  if (!content.includes('<MenuCard')) {
    return content
  }

  // Unwrap only the `Card.List` blocks that actually contain `MenuCard`s,
  // rendering the cards in place and dropping the surrounding wrapper. Other
  // `Card.List` blocks in the same file are left untouched.
  const cardListBlock =
    /^[ \t]*<Card\.List\b[^>]*>[ \t]*\r?\n([\s\S]*?)\r?\n[ \t]*<\/Card\.List>[ \t]*$/gm

  let output = content.replace(cardListBlock, (block, inner) =>
    inner.includes('<MenuCard') ? renderMenuCardTags(inner) : block
  )

  // Render any `MenuCard`s that are not wrapped in a `Card.List`.
  output = renderMenuCardTags(output)

  return output
}

function renderMenuCardTags(text: string) {
  return text.replace(/^[ \t]*<MenuCard\b[\s\S]*?\/>/gm, (tag) => {
    const attrs = parseSimpleJsxStringAttributes(tag)
    const url = attrs.url?.trim()
    const title = attrs.title?.trim()
    const about = attrs.about?.trim()

    if (!url || !title) {
      return tag
    }

    const link = `[${escapeMarkdownLinkText(title)}](${escapeMarkdownLinkUrl(url)})`

    return about ? `- ${link} – ${about}` : `- ${link}`
  })
}
