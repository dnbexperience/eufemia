import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { getPortalPages } from '../../../../vite/client/plugins/portal-pages'
import type { MdxNode } from '../../../../vite/client/plugins/portal-pages.shared'
import { createMdxSidebarNavigation } from '../MdxSidebarNavigation'
import {
  findActiveSidebarItemId,
  toSidebarMenuData,
  type NavItem,
} from '../SidebarMenuData'

const docs = resolve(__dirname, '../../../docs')
const { allMdxNodes: pages } = getPortalPages(docs)
const tree = (pathname = '/') =>
  createMdxSidebarNavigation(pages, pathname)
function flatten(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => [
    item,
    ...flatten(item.subheadings ?? []),
  ])
}

describe('MDX-defined Portal navigation', () => {
  it('rejects published titled pages without an explicit navigation definition', () => {
    const page: MdxNode = {
      fields: {
        slug: 'web/components/new-component',
        sourcePath:
          'packages/dnb-design-system-portal/src/docs/web/components/new-component.mdx',
      },
      frontmatter: { title: 'New component', category: 'actions' },
    }
    expect(() => createMdxSidebarNavigation([page], '/')).toThrow(
      'navigation'
    )
    expect(() =>
      createMdxSidebarNavigation(
        [
          {
            ...page,
            frontmatter: {
              ...page.frontmatter,
              navigation: { hidden: true },
            },
          },
        ],
        '/'
      )
    ).not.toThrow()
  })

  it('rejects legacy documentation source paths even when a page declares navigation', () => {
    const page: MdxNode = {
      fields: {
        slug: 'uilib/components/new-component',
        sourcePath:
          'packages/dnb-design-system-portal/src/docs/uilib/components/new-component.mdx',
      },
      frontmatter: {
        title: 'New component',
        navigation: { hidden: true },
      },
    }
    expect(() => createMdxSidebarNavigation([page], '/')).toThrow('web')
  })
  it('derives shared and platform trees from the documents', () => {
    const { shared, sections } = tree()
    expect(shared.map(({ title }) => title)).toEqual([
      'Home',
      'About',
      'Getting started',
      'Design language',
      'Working with AI',
      'Contribute',
    ])
    expect(sections.map(({ text }) => text)).toEqual([
      'Web',
      'iOS',
      'Android',
    ])
    expect(sections[0].items.map(({ title }) => title)).toEqual([
      'Get started',
      'Components',
      'Extensions',
      'HTML elements',
      'Layout',
      'Helpers',
    ])
  })

  it('shows Home first as a selected root link without inheriting the other roots', () => {
    const { shared } = tree('/')
    const home = shared[0]
    expect(home).toMatchObject({
      id: 'portal-home',
      path: '/',
      title: 'Home',
      icon: 'home',
      isActive: true,
      isMenuLink: true,
    })
    expect(home.subheadings).toBeUndefined()
    expect(findActiveSidebarItemId(shared)).toBe('portal-home')
    expect(toSidebarMenuData([home], () => undefined)[0]).toMatchObject({
      to: '/',
      text: 'Home',
    })
    expect(tree('/web/components/button').shared[0].isActive).toBe(false)
  })

  it('renders every accordion as a button, keeping its original content as a child link', () => {
    const { shared, sections } = tree()
    const all = [...shared, ...sections.flatMap(({ items }) => items)]
    for (const item of flatten(all).filter(
      ({ subheadings }) => subheadings?.length
    )) {
      expect(item.isMenuLink).toBe(false)
      const [data] = toSidebarMenuData([item], () => undefined)
      expect(data.to).toBeUndefined()
      expect(data.element).toBeUndefined()
    }
    expect(
      flatten(all).find(
        ({ path, isMenuLink }) => path === 'collections' && isMenuLink
      )
    ).toBeDefined()
  })

  it('selects the parent documentation link for tab routes', () => {
    const { shared, sections } = tree('/web/components/button/properties/')
    expect(findActiveSidebarItemId(shared)).toBeUndefined()
    expect(findActiveSidebarItemId(sections[0].items)).toBe(
      'web-components-button'
    )
    expect(
      findActiveSidebarItemId(
        tree('/web/whats-new/upgrade').sections[0].items
      )
    ).toBe('web-whats-new')
    expect(
      findActiveSidebarItemId(
        tree('/web/components/country-flag/properties').sections[0].items
      )
    ).toBe('web-components-country-flag')
  })

  it("places What's new under Web Get started, not shared navigation", () => {
    const { shared, sections } = tree()
    expect(
      flatten(shared).find(({ id }) => id === 'web-whats-new')
    ).toBeUndefined()
    const web = sections.find(({ id }) => id === 'web')
    expect(
      web.items.find(({ id }) => id === 'web-get-started').subheadings
    ).toContainEqual(
      expect.objectContaining({
        id: 'web-whats-new',
        path: 'web/whats-new',
      })
    )
    for (const section of sections.filter(({ id }) => id !== 'web')) {
      expect(
        flatten(section.items).find(({ id }) => id === 'web-whats-new')
      ).toBeUndefined()
    }
  })

  it('preserves every visible document in the generated menu without duplicate ids', () => {
    const { shared, sections } = tree()
    const items = flatten([
      ...shared,
      ...sections.flatMap(({ items }) => items),
    ])
    expect(new Set(items.map(({ id }) => id)).size).toBe(items.length)
    const links = new Set(
      items
        .filter(({ isMenuLink }) => isMenuLink)
        .map(({ path }) => (path === '/' ? '' : path))
    )
    expect(
      pages
        .filter(
          ({ fields: { slug }, frontmatter: fm }) =>
            fm.navigation &&
            !fm.navigation.hidden &&
            !fm.draft &&
            fm.route !== false &&
            !links.has(slug)
        )
        .map(({ fields: { slug } }) => slug)
    ).toEqual([])
  })

  it('has real, separate AI pages and no MDX index files', () => {
    expect(
      readdirSync(docs, { recursive: true, withFileTypes: true }).filter(
        (entry) =>
          entry.isFile() &&
          /(^|[/])uilib([/]|[.]mdx$)/.test(
            resolve(entry.parentPath, entry.name).slice(docs.length + 1)
          )
      )
    ).toEqual([])
    const ai = tree().shared.find(
      ({ title }) => title === 'Working with AI'
    )
    expect(ai.subheadings.slice(0, 2).map(({ path }) => path)).toEqual([
      'working-with-ai/ai-skills',
      'working-with-ai/mcp-universe',
    ])
    expect(
      readdirSync(docs, { recursive: true, encoding: 'utf8' }).filter(
        (file) => /(^|\/)index\.mdx$/.test(file)
      )
    ).toEqual([])
    for (const page of pages.filter(
      ({ frontmatter: fm }) => fm.route === false
    )) {
      const source = readFileSync(
        resolve(docs, page.fields.sourcePath.split('/src/docs/')[1]),
        'utf8'
      )
      expect(source.split(/\n---\n/)[1].trim()).toBe('')
    }
  })

  it('shows missing native documentation as disabled To do entries', () => {
    const installation = tree().sections[1].items[0].subheadings[0]
    expect(
      toSidebarMenuData([installation], () => undefined)[0]
    ).toMatchObject({ disabled: true, badge: 'To do', to: undefined })
  })

  it('rejects missing parents and cycles', () => {
    const page = (slug: string, parent: string): MdxNode => ({
      fields: { slug, sourcePath: slug },
      frontmatter: { title: slug, navigation: { parent } },
    })
    expect(() =>
      createMdxSidebarNavigation([page('one', 'missing')], '/')
    ).toThrow('parent not found')
    expect(() =>
      createMdxSidebarNavigation(
        [page('one', 'two'), page('two', 'one')],
        '/'
      )
    ).toThrow('Circular')
  })
})
