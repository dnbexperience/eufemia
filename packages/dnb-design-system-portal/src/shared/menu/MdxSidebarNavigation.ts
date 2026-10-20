import type { MdxNode } from '../../../vite/client/plugins/portal-pages.shared'
import { compareByOrder } from '../../../vite/client/plugins/portal-pages.shared'
import { defaultTabsValue } from '../tags/defaultValues'
import type { NavItem } from './SidebarMenuData'

export type PortalPlatform = 'web' | 'ios' | 'android'

export function createMdxSidebarNavigation(
  pages: MdxNode[],
  pathname: string
) {
  const current = pathname.replace(/^\/+|\/+$/g, '')
  const definitions = new Map(
    pages
      .filter(
        ({ frontmatter: fm }) =>
          fm.navigation && !fm.navigation.hidden && !fm.draft
      )
      .map((page) => [page.fields.slug, page] as const)
  )
  const children = new Map<string | undefined, string[]>()

  definitions.forEach(({ frontmatter: { navigation: nav } }, slug) => {
    const ancestors = new Set([slug])
    let parent = nav.parent
    while (parent) {
      if (ancestors.has(parent)) {
        throw new Error('Circular MDX navigation parent: ' + slug)
      }
      ancestors.add(parent)
      const definition = definitions.get(parent)
      if (!definition) {
        throw new Error('MDX navigation parent not found: ' + parent)
      }
      parent = definition.frontmatter.navigation.parent
    }
    const key = nav.parent
    children.set(key, [...(children.get(key) ?? []), slug])
  })

  function isActive(slug: string, fm: MdxNode['frontmatter']) {
    return (
      current === slug ||
      Boolean(
        fm.showTabs &&
        (fm.tabs || defaultTabsValue).some(
          ({ key }) =>
            current === slug + key ||
            (key.startsWith('/' + slug) &&
              current === key.slice(1) &&
              !definitions.has(current))
        )
      )
    )
  }

  function itemFor(slug: string): NavItem {
    const { frontmatter: fm } = definitions.get(slug)
    const nav = fm.navigation
    const nested = itemsFor(slug)
    const group =
      nav.kind === 'group' || nav.kind === 'category' || nested.length > 0
    const item: NavItem = {
      id: slug ? slug.replaceAll('/', '-') : 'portal-home',
      path: slug || '/',
      title: nav.title || fm.menuTitle || fm.title,
      order: nav.order ?? fm.order,
      icon: fm.icon,
      theme: fm.theme as NavItem['theme'],
      status: nav.kind === 'placeholder' ? 'todo' : fm.status,
      disabled: nav.kind === 'placeholder',
      isMenuLink: !group && fm.route !== false,
      isMenuGroup: nav.kind === 'category',
      isActive: !group && isActive(slug, fm),
    }
    if (group && fm.route !== false) {
      nested.unshift({
        ...item,
        id: item.id + '-page',
        title: nav.pageTitle || fm.contentTitle || fm.title,
        isMenuLink: true,
        isMenuGroup: false,
        isActive: isActive(slug, fm),
        icon: undefined,
      })
    }
    if (nested.length) {
      item.subheadings = nested
    }
    return item
  }

  function itemsFor(parent: string) {
    return (children.get(parent) ?? [])
      .map(itemFor)
      .sort(
        (a, b) =>
          compareByOrder(a.order, b.order) ||
          a.title.localeCompare(b.title)
      )
  }

  const roots = children.get(undefined) ?? []
  return {
    shared: roots
      .filter(
        (slug) =>
          definitions.get(slug).frontmatter.navigation.kind !== 'platform'
      )
      .map(itemFor)
      .sort(
        (a, b) =>
          compareByOrder(a.order, b.order) ||
          a.title.localeCompare(b.title)
      ),
    sections: roots
      .filter(
        (slug) =>
          definitions.get(slug).frontmatter.navigation.kind === 'platform'
      )
      .sort((a, b) =>
        compareByOrder(
          definitions.get(a).frontmatter.navigation.order,
          definitions.get(b).frontmatter.navigation.order
        )
      )
      .map((slug) => {
        const { frontmatter: fm } = definitions.get(slug)
        return {
          id: fm.navigation.platform,
          text: fm.navigation.title || fm.title,
          icon: fm.icon,
          items: itemsFor(slug),
        }
      }),
  }
}
