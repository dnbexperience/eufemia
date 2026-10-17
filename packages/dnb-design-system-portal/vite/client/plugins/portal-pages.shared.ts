/**
 * The portal's MDX page data: its shape, and the helpers that go with it.
 *
 * One definition for the whole portal — the plugin that generates the data,
 * the `virtual:portal-pages` declaration, and every consumer all refer back
 * to this file.
 *
 * It is kept apart from the plugin because the plugin reads the file system.
 * Nothing here may depend on `node:*`, or importing it from the app would
 * pull build-time code into the browser bundle.
 */

import picomatch from 'picomatch'

export type TableOfContentsItem = {
  url: string
  title: string
  items?: TableOfContentsItem[]
}

/**
 * The documented frontmatter fields, for autocompletion and type safety.
 *
 * Use this when narrowing with `Pick`, because `MdxFrontmatter` carries an
 * index signature that would turn picked fields into required ones.
 */
export type KnownFrontmatter = {
  /**
   * If set:
   * - adds page to the side menu (unless `hideInMenu` or `draft` is set)
   * - adds page to generated lists (unless `draft` is set)
   * - sets page's H1 text (unless `contentTitle` is set)
   * - sets browser tab title
   * - sets side menu link text (unless `menuTitle` is set)
   * - used in alphabetical ordering of generated lists (unless `order` is set)
   *
   *
   * If not set:
   * - uses the browser tab title of its nearest parent
   * - is not shown in side menu or generated lists
   * - If `showTabs` is `true`, the page inherits the H1 heading of its parent.
   *
   * Side note: The side menu is ordered by the file path, which usually
   * matches the title, but not always.
   */
  title?: string

  /**
   * Text used in the page's H1 heading.
   *
   * Default: the `title` value is used.
   *
   * Use it to give a page a H1 heading without adding it to the menu. Or to
   * use a different H1 text than `title`.
   */
  contentTitle?: string
  description?: string
  /**
   * A number from -999 to 999, decimals are allowed.
   *
   * Custom ordering of pages.
   *
   * Positive numbers appear before non-ordered pages. Lowest first.
   * Negative numbers appear after non-ordered pages. Lowest first.
   *
   * Non-ordered pages or pages with the same order are sorted alphabetically.
   *
   * Default: `undefined`, which means the page is non-ordered.
   */
  order?: number

  /**
   * Hide the page from the menu and from generated list, such as
   * `<RelatedComponents>` and the `<List*>` components.
   */
  draft?: boolean

  /**
   * Hide the page from the menu, even if it has a `title` set.
   *
   * Also hides it in `<RelatedComponents>` and some `<List*>` components.
   */
  hideInMenu?: boolean

  /**
   * Text used in the side menu link.
   *
   * Default: the `title` value is used.
   *
   * Use it to give the side menu a different text than `title`.
   */
  menuTitle?: string

  /**
   * Render the page heading inside a tab bar.
   *
   * Special case: If the page is named `info.mdx`, has no `title`, and is the
   * first tab, it redirects to its parent.
   */
  showTabs?: boolean
  hideTabs?: Array<{ title: string }>
  tabs?: Array<{ title: string; key: string }>
  defaultTabs?: Array<{ title: string; key: string }>
  breadcrumb?: Array<{ text: string; href: string }>
  fullscreen?: boolean
  hideEditLink?: boolean
  componentType?: string
  /** A category id, or `false` to exclude the page from category listings. */
  category?: string | false
  status?: string
  icon?: string
  accordion?: boolean
  search?: string
  redirect_from?: string[]
  /** Hides the table of contents for the page. */
  hideToc?: boolean
  /** How many heading levels the table of contents should include, counting from the highest level on the page (excluding h1). Default is `2`. */
  tocDepth?: number
}

/**
 * Frontmatter of an MDX page: the documented fields above, plus anything else
 * the file happens to define, which reads as `unknown`. Frontmatter is
 * free-form, so adding a new field to an MDX file requires no change here.
 */
export type MdxFrontmatter = KnownFrontmatter & Record<string, unknown>

/** A single MDX page, as exposed by the `virtual:portal-pages` module. */
export type MdxNode = {
  fields: {
    slug: string
    sourcePath: string
  }
  frontmatter: MdxFrontmatter
  tableOfContents?: {
    items: TableOfContentsItem[]
  }
  /** Parent pages, nearest first. Only present when a consumer asks for them. */
  siblings?: MdxNode[]
}

/** A page file found on disk, before it becomes an `MdxNode`. */
export type PageFileInfo = {
  filePath: string
  sourcePath: string
  slug: string
  frontmatter: MdxFrontmatter
  tableOfContents?: { items: TableOfContentsItem[] }
  type: 'mdx' | 'tsx'
}

/**
 * Is this the first tab of a tabbed page?
 *
 * Such a page (e.g. `components/table/info.mdx`) has no route of its own. The
 * parent page already imports and renders it, so the router redirects there
 * instead. Every other tab (`demos`, `properties`, ...) is a real route.
 */
export function isFirstTabPage(file: PageFileInfo): boolean {
  return Boolean(
    file.type === 'mdx' &&
    file.frontmatter.showTabs &&
    !file.frontmatter.title &&
    file.slug.endsWith('/info')
  )
}

const orderGroup = (order?: number) => (!order ? 2 : order > 0 ? 1 : 3)

/**
 * Orders pages by their frontmatter `order`, the same way the sidebar menu
 * does: a positive order first, unordered pages and 0 in the middle, and a
 * negative order last. Within a group, a lower number comes first.
 */
export function compareByOrder(a?: number, b?: number) {
  const groupA = orderGroup(a)
  const groupB = orderGroup(b)

  if (groupA !== groupB) {
    return groupA - groupB
  }

  return (a ?? 0) - (b ?? 0)
}

const matchers = new Map<string, (slug: string) => boolean>()

/**
 * Does a page's slug match the glob pattern?
 *
 * `*` stays within one path segment and `**` spans any number of them, so
 * `uilib/elements/*` selects direct children while `uilib/elements/**\/*`
 * selects pages at any depth below.
 */
export function globPath(node: MdxNode, pattern: string) {
  let isMatch = matchers.get(pattern)

  if (!isMatch) {
    isMatch = picomatch(pattern)
    matchers.set(pattern, isMatch)
  }

  return isMatch(node.fields.slug)
}
