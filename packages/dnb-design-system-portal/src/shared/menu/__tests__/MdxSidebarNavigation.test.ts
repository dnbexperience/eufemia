import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { getPortalPages } from '../../../../vite/client/plugins/portal-pages'
import type { MdxNode } from '../../../../vite/client/plugins/portal-pages.shared'
import { createMdxSidebarNavigation } from '../MdxSidebarNavigation'
import graphics from '../SidebarGraphics'
import { getPageRedirects } from '../../../../vite/client/plugins/portal-pages.shared'
import {
  findActiveSidebarItemId,
  toSidebarMenuData,
  type NavItem,
} from '../SidebarMenuData'

const docs = resolve(__dirname, '../../../docs')
const { files, allMdxNodes: pages } = getPortalPages(docs)
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
      'Patterns',
    ])
  })

  it('keeps About concise without duplicate overview or contact entries', () => {
    const about = tree().shared.find(({ id }) => id === 'about')
    expect(about.subheadings.map(({ title }) => title)).toEqual([
      'About Eufemia',
      'Story',
      'Core principles',
      'Contact',
      'License & credits',
    ])
    for (const path of ['design-system/about', 'design-system/contact']) {
      const item = about.subheadings.find((item) => item.path === path)
      expect(item).toMatchObject({ isMenuLink: true })
      expect(item.icon).toBeUndefined()
      expect(item.subheadings).toBeUndefined()
    }
    const principles = about.subheadings.find(
      ({ title }) => title === 'Core principles'
    )
    expect(principles.isMenuLink).toBe(false)
    expect(principles.subheadings.map(({ title }) => title)).toEqual([
      'Living system',
      'Maintainability',
    ])
    const license = about.subheadings.find(
      ({ path }) => path === 'license'
    )
    expect(license.subheadings.map(({ title }) => title)).toEqual([
      'Licens',
      'Credits',
      'Privacy',
    ])
    expect(
      license.subheadings.find(({ title }) => title === 'Privacy').icon
    ).toBeUndefined()
    expect(getPageRedirects(files)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          from: '/web/about-the-lib',
          to: '/web/introduction/',
        }),
        expect.objectContaining({
          from: '/uilib/about-the-lib',
          to: '/web/introduction/',
        }),
        expect.objectContaining({
          from: '/contribute/contact',
          to: '/design-system/contact/',
        }),
        expect.objectContaining({
          from: '/design-system/about/living-system',
          to: '/web/about-the-lib/living-system/',
        }),
      ])
    )
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

  it('keeps Getting started Design entries icon-free', () => {
    const items = flatten(tree().shared)
    const design = items.find(({ path }) => path === 'quickguide-designer')
    expect(design.subheadings.map(({ title }) => title)).toEqual([
      'Start designing',
      'Design tools',
      'UI Resources',
      'Inspiration',
    ])
    expect(flatten([design]).every(({ icon }) => !icon)).toBe(true)
  })

  it('keeps icons only on top-level navigation entries', () => {
    const { shared, sections } = tree()
    for (const item of [
      ...shared,
      ...sections.flatMap(({ items }) => items),
    ]) {
      expect(
        flatten(item.subheadings ?? []).filter(({ icon }) => icon)
      ).toEqual([])
    }
    expect(shared.find(({ id }) => id === 'design-language').icon).toBe(
      'brush'
    )
    expect(
      sections[0].items.find(({ id }) => id === 'web-components').icon
    ).toBe('layout_grid')
  })

  it('combines Installation and First steps without a duplicate menu page', () => {
    const items = flatten(tree().sections[0].items)
    expect(
      items.find(({ id }) => id === 'web-usage-first-steps-page').title
    ).toBe('Installation and first steps')
    expect(items.find(({ path }) => path === 'web/usage')).toBeUndefined()
    expect(getPageRedirects(files)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          from: '/web/usage',
          to: '/web/usage/first-steps/',
        }),
        expect.objectContaining({
          from: '/uilib/usage',
          to: '/web/usage/first-steps/',
        }),
      ])
    )
  })

  it('keeps only sidebar graphics referenced by MDX definitions', () => {
    const used = new Set(pages.map(({ frontmatter }) => frontmatter.icon))
    expect(Object.keys(graphics).filter((key) => !used.has(key))).toEqual(
      []
    )
    for (const icon of used) {
      if (icon) {
        expect(graphics[icon]).toBeDefined()
      }
    }
  })

  it('aligns editorial menu links and page headings', () => {
    const { shared, sections } = tree()
    const links = flatten([
      ...shared,
      ...sections.flatMap(({ items }) => items),
    ]).filter(({ isMenuLink }) => isMenuLink)
    for (const slug of [
      'web/intro',
      'web/getting-started',
      'web/introduction',
      'quickguide-designer',
      'quickguide-designer/tools',
      'web/usage/first-steps',
      'web/usage/first-steps/react',
      'web/usage/first-steps/module-formats',
      'web/usage/first-steps/bundles',
      'web/usage/first-steps/quick-reference',
      'web/usage/first-steps/tools',
      'web/components/overview',
      'web/usage/best-practices/for-formatting',
      'web/usage/best-practices/for-javascript',
      'web/usage/best-practices/for-styling',
      'web/usage/best-practices/for-testing',
      'web/usage/best-practices/for-typography',
      'contribute/first-contribution',
      'contribute/getting-started',
      'contribute/deploy',
      'icons/primary',
      'icons/secondary',
      'brand',
    ]) {
      const page = pages.find(({ fields }) => fields.slug === slug)
      expect(page.frontmatter.contentTitle || page.frontmatter.title).toBe(
        links.find(({ path }) => path === slug).title
      )
    }
  })

  it('names content links by their purpose instead of generic overviews', () => {
    const { shared, sections } = tree()
    const links = flatten([
      ...shared,
      ...sections.flatMap(({ items }) => items),
    ]).filter(({ isMenuLink }) => isMenuLink)
    expect(links.filter(({ title }) => /overview/i.test(title))).toEqual(
      []
    )
    for (const [path, title] of [
      ['web/getting-started', 'Quick start'],
      ['quickguide-designer', 'Start designing'],
      ['brand', 'Brand guidelines'],
      ['icons', 'Browse icons'],
      ['quickguide-designer/motion', 'Motion examples'],
      ['web/components/overview', 'Components by category'],
      ['web/helpers', 'Shared utilities'],
      ['web/typography', 'Using typography'],
      ['web/layout/flex', 'Using Flex'],
      ['contribute/first-contribution', 'Your first contribution'],
      ['contribute/getting-started', 'Local development workflow'],
    ]) {
      expect(links.find((item) => item.path === path)?.title).toBe(title)
    }
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

  it('orders Web getting started with updates first and requirements and CDN last', () => {
    const web = tree().sections.find(({ id }) => id === 'web')
    const gettingStarted = web.items.find(
      ({ id }) => id === 'web-get-started'
    )
    expect(gettingStarted.subheadings.map(({ title }) => title)).toEqual([
      "What's new",
      'First steps',
      'Customization',
      'Best practices',
      'Requirements',
      'Asset CDN',
    ])
  })

  it('groups Web patterns in a contentless accordion without an overview page', () => {
    const { shared, sections } = tree('/web/patterns/status-icon')
    const web = sections.find(({ id }) => id === 'web')
    const patterns = web.items.find(({ id }) => id === 'web-patterns')
    expect(patterns).toMatchObject({
      title: 'Patterns',
      isMenuLink: false,
      isMenuGroup: false,
    })
    expect(patterns.subheadings).toEqual([
      expect.objectContaining({
        id: 'web-patterns-status-icon',
        path: 'web/patterns/status-icon',
        isMenuLink: true,
        isActive: true,
      }),
    ])
    const [data] = toSidebarMenuData([patterns], () => undefined)
    expect(data).toMatchObject({ collapsible: true })
    expect(data.to).toBeUndefined()
    expect(
      flatten([
        ...shared,
        ...sections
          .filter(({ id }) => id !== 'web')
          .flatMap(({ items }) => items),
      ]).some(({ id }) => id === 'web-patterns-status-icon')
    ).toBe(false)
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
