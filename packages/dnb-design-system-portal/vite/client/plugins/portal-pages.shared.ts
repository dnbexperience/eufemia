/**
 * The shape of the portal's MDX page data.
 *
 * One definition for the whole portal: the plugin that generates the data,
 * the `virtual:portal-pages` declaration, and every consumer all refer back
 * to this file.
 *
 * It deliberately contains types only and imports nothing, so app code can
 * read it without any risk of pulling build-time dependencies such as
 * `node:fs` into the browser bundle.
 */

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
  title?: string
  description?: string
  order?: number
  draft?: boolean
  hideInMenu?: boolean
  menuTitle?: string
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
