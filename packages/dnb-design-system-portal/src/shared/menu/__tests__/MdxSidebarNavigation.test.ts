import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { getPortalPages } from '../../../../vite/client/plugins/portal-pages'
import type { MdxNode } from '../../../../vite/client/plugins/portal-pages.shared'
import { createMdxSidebarNavigation } from '../MdxSidebarNavigation'
import graphics from '../SidebarGraphics'
import { categoryOrder } from '../../parts/componentCategories'
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
  it('keeps specialist category labels and descriptions aligned with the overview', () => {
    for (const { id, title, description } of categoryOrder.filter(
      ({ id }) => ['formatting', 'accessibility', 'utilities'].includes(id)
    )) {
      const page = pages.find(
        ({ fields }) => fields.slug === 'web/components/categories/' + id
      )
      expect(page.frontmatter.title).toBe(title)
      expect(page.frontmatter.description).toBe(description)
      expect(page.frontmatter.navigation.kind).toBe('heading')
      expect(page.frontmatter.route).toBe(false)
    }
  })

  it('lists incoming helper, printing and contributor pages in their sections', () => {
    const items = flatten([
      ...tree().shared,
      ...tree().sections.flatMap(({ items }) => items),
    ])
    for (const [slug, parent] of [
      [
        'web/ai-tools-and-resources/utilities/shared-state',
        'web/ai-tools-and-resources/utilities',
      ],
      [
        'web/styling-and-themes/css/printable-apps',
        'web/styling-and-themes/css',
      ],
      ['web/contribute/social-preview-images', 'web/contribute'],
    ]) {
      const page = pages.find(({ fields }) => fields.slug === slug)
      expect(page.frontmatter.navigation.parent).toBe(parent)
      expect(
        items.filter(({ path, isMenuLink }) => path === slug && isMenuLink)
      ).toHaveLength(1)
    }
  })

  it('lists components alphabetically before specialist groups without losing pages', () => {
    const components = tree().sections[0].items.find(
      ({ path }) => path === 'web/components'
    )
    const [overview, ...items] = components.subheadings
    expect(overview.title).toBe('Components by category')
    const general = items.filter(({ order }) => !order)
    const titles = general.map(({ title }) => title)
    expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)))
    expect(titles).toEqual(
      expect.arrayContaining([
        'Accordion',
        'Autocomplete',
        'Button',
        'Checkbox',
        'Date picker',
        'Dialog',
        'Dropdown',
        'Input',
        'Masked input',
        'Radio button',
        'Switch',
        'Text area',
        'Upload',
      ])
    )
    const groups = items.filter(({ order }) => order < 0)
    expect(groups.map(({ title }) => title)).toEqual([
      'Graphics',
      'Formatting and typography',
      'Accessibility',
      'Utilities',
      'Fragments',
    ])
    expect(items.slice(general.length)).toEqual(groups)
    const expectedGroups = {
      Graphics: ['Country flags', 'Icons', 'Logos'],
      'Formatting and typography': [
        'Date format',
        'Form label',
        'Heading',
        'List format',
        'Number format',
      ],
      Accessibility: ['ARIA live', 'Skip content', 'Visually hidden'],
      Utilities: [
        'Copy on click',
        'Height animation',
        'Portal root',
        'Scroll view',
      ],
    }
    for (const [title, expected] of Object.entries(expectedGroups)) {
      const group = groups.find((item) => item.title === title)
      expect(group.isMenuGroup).toBe(true)
      expect(group.isMenuLink).toBe(false)
      const [data] = toSidebarMenuData([group], () => undefined)
      expect(data.type).toBe('header')
      expect(data.collapsible).toBeUndefined()
      expect(group.subheadings.map(({ title }) => title)).toEqual(expected)
    }
    const links = flatten([components]).filter(
      ({ isMenuLink }) => isMenuLink
    )
    const expectedPaths = pages
      .filter(
        ({ fields, frontmatter }) =>
          (fields.slug.startsWith('web/components/') ||
            fields.slug === 'web/components/icon/usage') &&
          frontmatter.navigation &&
          !frontmatter.navigation.hidden &&
          frontmatter.route !== false &&
          !frontmatter.draft
      )
      .map(({ fields }) => fields.slug)
    expect(links.map(({ path }) => path).sort()).toEqual(
      expectedPaths.sort()
    )
  })

  it('replaces the standalone A–Z page with redirects to the category overview', () => {
    const components = pages.find(
      ({ fields }) => fields.slug === 'web/components'
    )
    expect(components.frontmatter.route).toBe(false)
    for (const from of ['/web/components', '/uilib/components']) {
      expect(getPageRedirects(files)).toContainEqual(
        expect.objectContaining({ from, to: '/web/components/overview/' })
      )
    }
  })

  it('uses readable component labels and matching page headings', () => {
    const links = flatten(tree().sections[0].items).filter(
      ({ isMenuLink }) => isMenuLink
    )
    for (const [slug, title] of [
      ['date-picker', 'Date picker'],
      ['input-masked', 'Masked input'],
      ['country-flag', 'Country flags'],
      ['icon', 'Icon component'],
      ['logo', 'Logos'],
      ['number-format', 'Number format'],
      ['skip-content', 'Skip content'],
    ]) {
      const path = 'web/components/' + slug
      expect(links.find((item) => item.path === path)?.title).toBe(title)
      const page = pages.find(({ fields }) => fields.slug === path)
      expect(page.frontmatter.contentTitle || page.frontmatter.title).toBe(
        title
      )
    }
  })
  it('aligns extension headings and keeps the Vipps button under Extensions', () => {
    const links = flatten(tree().sections[0].items).filter(
      ({ isMenuLink }) => isMenuLink
    )
    for (const [slug, title] of [
      ['vipps-wallet-button', 'Vipps wallet button'],
      ['payment-card', 'Payment card'],
      ['sidebar-menu', 'Sidebar menu'],
    ]) {
      const path = 'web/patterns-and-extensions/' + slug
      const page = pages.find(({ fields }) => fields.slug === path)
      expect(page.frontmatter.title).toBe(title)
      expect(links.filter((item) => item.path === path)).toHaveLength(1)
      expect(links.find((item) => item.path === path)?.title).toBe(title)
    }
    const vipps = pages.find(
      ({ fields }) =>
        fields.slug === 'web/patterns-and-extensions/vipps-wallet-button'
    )
    expect(vipps.frontmatter.navigation.parent).toBe(
      'web/patterns-and-extensions'
    )
  })

  it('uses readable element names without losing element pages', () => {
    const elements = flatten(tree().sections[0].items).find(
      ({ path }) => path === 'web/layout-and-typography/elements'
    )
    expect(elements.subheadings.map(({ title }) => title)).toEqual([
      'HTML elements',
      'Block quote',
      'Code',
      'Headings',
      'Horizontal rule',
      'Image',
      'Introductory paragraph',
      'Lead paragraph',
      'Lists',
      'Paragraph',
      'Inline text (span)',
    ])
    for (const item of elements.subheadings.slice(1)) {
      const page = pages.find(({ fields }) => fields.slug === item.path)
      expect(page.frontmatter.contentTitle || page.frontmatter.title).toBe(
        item.title
      )
    }
    const horizontalRule = pages.find(
      ({ fields }) =>
        fields.slug ===
        'web/layout-and-typography/elements/horizontal-rule'
    )
    expect(horizontalRule.frontmatter.legacyFragments).toEqual({
      horizontalrule:
        '/web/layout-and-typography/elements/horizontal-rule/#horizontal-rule',
    })
  })

  it('preserves old component heading fragments through legacy routes', () => {
    const page = pages.find(
      ({ fields }) => fields.slug === 'web/components/date-picker'
    )
    expect(page.frontmatter.legacyFragments).toEqual({
      datepicker: '/web/components/date-picker/#date-picker',
    })
    expect(getPageRedirects(files)).toContainEqual(
      expect.objectContaining({
        from: '/uilib/components/date-picker',
        fragments: page.frontmatter.legacyFragments,
      })
    )
  })

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
      'Get started',
      'Design foundations',
      'Collections',
      'About',
    ])
    expect(sections.map(({ text }) => text)).toEqual([
      'Web',
      'iOS',
      'Android',
    ])
    expect(sections[0].items.map(({ title }) => title)).toEqual([
      'Get started',
      'Components',
      'Forms',
      'Patterns and extensions',
      'Layout and typography',
      'Styling and themes',
      'Accessibility',
      'Development guidelines',
      'AI, tools and resources',
      'Contribute to Web',
      'Releases and upgrades',
    ])
  })

  it('keeps Web resource links after a divider and outside native navigation', () => {
    const { sections } = tree()
    const resources = flatten(sections[0].items).filter(({ href }) => href)
    expect(resources.map(({ title }) => title)).toEqual([
      'Figma library',
      'GitHub repository',
    ])
    expect(toSidebarMenuData(resources, () => undefined)).toMatchObject([
      {
        href: 'https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web',
        dividerBefore: true,
        target: '_blank',
        rel: 'noopener noreferrer',
        to: undefined,
        element: undefined,
      },
      {
        href: 'https://github.com/dnbexperience/eufemia/',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    ])
    expect(
      sections
        .slice(1)
        .flatMap(({ items }) => flatten(items))
        .some(({ href }) => href)
    ).toBe(false)
  })

  it('keeps About concise without duplicate overview or contact entries', () => {
    const about = tree().shared.find(({ id }) => id === 'about')
    expect(about.subheadings.map(({ title }) => title)).toEqual([
      'About Eufemia',
      'Contact and support',
      'Our story',
      'How Eufemia evolves',
      'License, credits and privacy',
    ])
    for (const path of ['about/eufemia', 'about/contact']) {
      const item = about.subheadings.find((item) => item.path === path)
      expect(item).toMatchObject({ isMenuLink: true })
      expect(item.icon).toBeUndefined()
      expect(item.subheadings).toBeUndefined()
    }
    const license = about.subheadings.find(
      ({ path }) => path === 'about/license'
    )
    expect(license.isMenuLink).toBe(true)
    expect(license.subheadings).toBeUndefined()
    expect(getPageRedirects(files)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          from: '/web/about-the-lib',
          to: '/web/get-started/quick-start/',
        }),
        expect.objectContaining({
          from: '/uilib/about-the-lib',
          to: '/web/get-started/quick-start/',
        }),
        expect.objectContaining({
          from: '/contribute/contact',
          to: '/about/contact/',
        }),
        expect.objectContaining({
          from: '/design-system/about/living-system',
          to: '/about/how-eufemia-evolves/',
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
    const design = flatten(tree().sections[0].items).find(
      ({ path }) => path === 'web/get-started/design-for-web'
    )
    expect(design).toMatchObject({
      title: 'Set up Eufemia Web in Figma',
      isMenuLink: true,
    })
    expect(design.subheadings).toBeUndefined()
    expect(flatten([design]).every(({ icon }) => !icon)).toBe(true)
    expect(
      flatten(tree().shared).find(
        ({ path }) => path === 'web/get-started/design-for-web'
      )
    ).toBeUndefined()
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
    expect(shared.find(({ id }) => id === 'design-foundations').icon).toBe(
      'brush'
    )
    expect(
      sections[0].items.find(({ id }) => id === 'web-components').icon
    ).toBe('layout_grid')
  })

  it('combines Installation and First steps without a duplicate menu page', () => {
    const items = flatten(tree().sections[0].items)
    expect(
      items
        .filter(
          ({ path, isMenuLink }) =>
            path === 'web/get-started/quick-start' && isMenuLink
        )
        .map(({ title }) => title)
    ).toEqual(['Quick start'])
    expect(items.find(({ path }) => path === 'web/usage')).toBeUndefined()
    expect(getPageRedirects(files)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          from: '/web/usage',
          to: '/web/get-started/quick-start/',
        }),
        expect.objectContaining({
          from: '/uilib/usage',
          to: '/web/get-started/quick-start/',
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
      'web/get-started/guided-introduction',
      'web/get-started/quick-start',
      'web/get-started/design-for-web',
      'web/get-started/quick-start',
      'web/get-started/quick-start',
      'web/ai-tools-and-resources/module-formats',
      'web/ai-tools-and-resources/module-formats',
      'web/ai-tools-and-resources/developer-tools',
      'web/components/overview',
      'design-foundations/number-formatting',
      'web/contribute/guidelines/coding',
      'web/development-guidelines/for-styling',
      'web/development-guidelines/for-testing',
      'web/development-guidelines/for-typography',
      'web/contribute/first-contribution',
      'web/contribute/local-development',
      'web/contribute/deploy',
      'design-foundations/brand-guidelines',
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
      ['web/get-started/quick-start', 'Quick start'],
      ['web/get-started/design-for-web', 'Set up Eufemia Web in Figma'],
      ['design-foundations/brand-guidelines', 'Brand guidelines'],
      ['collections/icons', 'Icons'],
      [
        'web/development-guidelines/motion',
        'Motion examples and implementation',
      ],
      ['web/components/overview', 'Components by category'],
      ['web/ai-tools-and-resources/utilities', 'Shared utilities'],
      ['web/layout-and-typography/typography', 'Web typography in code'],
      ['web/layout-and-typography/layout/flex', 'Using Flex'],
      ['web/contribute/first-contribution', 'Your first contribution'],
      ['web/contribute/local-development', 'Local development workflow'],
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
    ).toBeUndefined()
  })

  it('selects the parent documentation link for tab routes', () => {
    const { shared, sections } = tree('/web/components/button/properties/')
    expect(findActiveSidebarItemId(shared)).toBeUndefined()
    expect(findActiveSidebarItemId(sections[0].items)).toBe(
      'web-components-button'
    )
    expect(
      findActiveSidebarItemId(
        tree('/web/releases-and-upgrades/upgrade').sections[0].items
      )
    ).toBe('web-releases-and-upgrades')
    expect(
      findActiveSidebarItemId(
        tree('/web/components/country-flag/properties').sections[0].items
      )
    ).toBe('web-components-country-flag')
  })

  it('keeps releases at Web level and outside shared and native navigation', () => {
    const { shared, sections } = tree()
    expect(
      flatten(shared).find(({ id }) => id === 'web-releases-and-upgrades')
    ).toBeUndefined()
    expect(
      sections[0].items.find(
        ({ id }) => id === 'web-releases-and-upgrades'
      )
    ).toMatchObject({
      title: 'Releases and upgrades',
      isMenuLink: true,
    })
    expect(
      sections
        .slice(1)
        .flatMap(({ items }) => flatten(items))
        .find(({ id }) => id === 'web-releases-and-upgrades')
    ).toBeUndefined()
  })

  it('keeps Web onboarding short with design and requirements alongside it', () => {
    const web = tree().sections.find(({ id }) => id === 'web')
    const start = web.items.find(({ id }) => id === 'web-get-started')
    expect(start.subheadings.map(({ title }) => title)).toEqual([
      'Quick start',
      'Guided introduction',
      'Requirements and browser support',
      'Set up Eufemia Web in Figma',
    ])
  })

  it('groups Web patterns in a contentless accordion without an overview page', () => {
    const { shared, sections } = tree(
      '/web/patterns-and-extensions/status-icon'
    )
    const patterns = sections[0].items.find(
      ({ id }) => id === 'web-patterns-and-extensions'
    )
    expect(patterns).toMatchObject({
      title: 'Patterns and extensions',
      isMenuLink: false,
      isMenuGroup: false,
    })
    expect(patterns.subheadings.map(({ title }) => title)).toEqual([
      'Using patterns and extensions',
      'Sidebar menu',
      'Payment card',
      'Vipps wallet button',
      'Table of contents',
      'Patterns',
    ])
    expect(
      patterns.subheadings
        .flatMap((item) => item.subheadings ?? [item])
        .find(
          ({ path }) => path === 'web/patterns-and-extensions/status-icon'
        )
    ).toMatchObject({ isMenuLink: true, isActive: true })
    const [data] = toSidebarMenuData([patterns], () => undefined)
    expect(data).toMatchObject({ collapsible: true })
    expect(data.to).toBeUndefined()
    expect(
      flatten([
        ...shared,
        ...sections.slice(1).flatMap(({ items }) => items),
      ]).some(({ id }) => id === 'web-patterns-and-extensions-status-icon')
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
    const ai = flatten(tree().sections[0].items).find(
      ({ path }) => path === 'web/ai-tools-and-resources/ai'
    )
    expect(ai.subheadings.slice(0, 2).map(({ path }) => path)).toEqual([
      'web/ai-tools-and-resources/ai/ai-skills',
      'web/ai-tools-and-resources/ai/mcp-universe',
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
