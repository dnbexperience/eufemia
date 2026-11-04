import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, it } from 'vitest'
import { getPortalPages } from '../../../../vite/client/plugins/portal-pages'
import { createMdxSidebarNavigation } from '../MdxSidebarNavigation'
import { getPageRedirects } from '../../../../vite/client/plugins/portal-pages.shared'
import type { NavItem } from '../SidebarMenuData'

it('keeps every existing menu page in the navigation draft', () => {
  const { files, allMdxNodes } = getPortalPages(
    resolve(__dirname, '../../../docs')
  )
  const { shared, sections } = createMdxSidebarNavigation(allMdxNodes, '/')
  const flatten = (items: NavItem[]): NavItem[] =>
    items.flatMap((item) => [item, ...flatten(item.subheadings ?? [])])
  const links = flatten([
    ...shared,
    ...sections.flatMap(({ items }) => items),
  ]).filter(({ isMenuLink, href }) => isMenuLink && !href)
  const paths = links.map(({ path }) => path)
  const previous = JSON.parse(
    readFileSync(
      resolve(__dirname, '__fixtures__/original-navigation.json'),
      'utf8'
    )
  ) as string[]
  const redirectPaths = getPageRedirects(files).map(({ from }) =>
    from.slice(1)
  )
  const moves = JSON.parse(
    readFileSync(
      resolve(__dirname, '__fixtures__/relocated-routes.json'),
      'utf8'
    )
  ) as Record<string, string>
  const redirects = new Map(
    getPageRedirects(files).map(({ from, to }) => [from, to])
  )
  for (const [from, to] of Object.entries(moves)) {
    expect(redirects.get('/' + from)).toBe('/' + to + '/')
  }
  expect(
    previous.filter(
      (path) => !paths.includes(path) && !redirectPaths.includes(path)
    )
  ).toEqual([])
  expect(new Set(paths).size).toBe(paths.length)
  expect(shared.map(({ title }) => title)).toEqual([
    'Home',
    'Get started',
    'Design foundations',
    'Collections',
    'About',
  ])
  const parentOf = (slug: string) =>
    allMdxNodes.find(({ fields }) => fields.slug === slug)?.frontmatter
      .navigation?.parent
  expect(parentOf('collections/icons')).toBe('collections')
  const collections = shared.find(({ path }) => path === 'collections')
  expect(collections.subheadings.map(({ path }) => path)).toEqual([
    'collections/icons',
    'collections/logos',
  ])
  expect(parentOf('web/forms')).toBe('web')
  expect(parentOf('web/layout-and-typography/typography')).toBe(
    'web/layout-and-typography'
  )
  expect(parentOf('web/accessibility')).toBe('web')
  expect(parentOf('web/ai-tools-and-resources/ai')).toBe(
    'web/ai-tools-and-resources'
  )

  const sharedPaths = flatten(shared).map(({ path }) => path)
  const webOnlyPages = [
    'web/get-started/design-for-web',
    'web/layout-and-typography/typography/design-guidance',
    'web/layout-and-typography/layout-principles',
    'web/accessibility/design-guidance',
    'web/development-guidelines/motion',
    'web/contribute/guidelines/design-and-code-vocabulary',
    'web/components/icon/usage',
    'web/contribute/social-preview-images',
    'web/contribute/suggest-edit',
    'web/styling-and-themes/color-guidance',
  ]
  expect(
    sharedPaths.filter((path) => webOnlyPages.includes(path))
  ).toEqual([])
  const webPaths = flatten(
    sections.find(({ id }) => id === 'web').items
  ).map(({ path }) => path)
  expect(webOnlyPages.filter((path) => !webPaths.includes(path))).toEqual(
    []
  )
  expect(parentOf('design-foundations/motion-principles')).toBe(
    'design-foundations'
  )
})
