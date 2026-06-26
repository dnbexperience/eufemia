import type { SpecialMdxComponentRenderer } from './types.ts'
import {
  escapeMarkdownLinkText,
  escapeMarkdownLinkUrl,
  parseSimpleJsxStringAttributes,
} from './utils.ts'

/**
 * Renders the portal `MenuCard` navigation cards into a markdown link list
 * and strips the surrounding `Card.List` wrapper, e.g.
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

  let output = content.replace(
    /^[ \t]*<MenuCard\b[\s\S]*?\/>/gm,
    (tag) => {
      const attrs = parseSimpleJsxStringAttributes(tag)
      const url = attrs.url?.trim()
      const title = attrs.title?.trim()
      const about = attrs.about?.trim()

      if (!url || !title) {
        return tag
      }

      const link = `[${escapeMarkdownLinkText(title)}](${escapeMarkdownLinkUrl(url)})`

      return about ? `- ${link} – ${about}` : `- ${link}`
    }
  )

  // Remove the surrounding Card.List wrapper, keeping the rendered list items.
  output = output
    .replace(/^[ \t]*<Card\.List\b[^>]*>[ \t]*$/gm, '')
    .replace(/^[ \t]*<\/Card\.List>[ \t]*$/gm, '')

  return output
}
