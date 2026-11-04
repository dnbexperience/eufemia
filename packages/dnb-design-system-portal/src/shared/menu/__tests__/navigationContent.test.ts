import { resolve } from 'node:path'
import { expect, it } from 'vitest'
import { getPortalPages } from '../../../../vite/client/plugins/portal-pages'
import { createMdxSidebarNavigation } from '../MdxSidebarNavigation'
import { getExtensions } from '../../parts/listEdges'
import { toSidebarMenuData } from '../SidebarMenuData'
import { getPageRedirects } from '../../../../vite/client/plugins/portal-pages.shared'

it('exposes shared formatting and groups solutions and AI pages without extra accordions', () => {
  const { files, allMdxNodes, regularMdxNodes } = getPortalPages(
    resolve(__dirname, '../../../docs')
  )
  const { shared, sections } = createMdxSidebarNavigation(allMdxNodes, '/')
  const foundations = shared.find(
    ({ path }) => path === 'design-foundations'
  )
  expect(foundations.subheadings.map(({ path }) => path)).toContain(
    'design-foundations/number-formatting'
  )
  const web = sections.find(({ id }) => id === 'web').items
  const start = web.find(({ path }) => path === 'web/get-started')
  expect(start.subheadings.map(({ path }) => path)).not.toContain(
    'web/get-started/how-eufemia-works'
  )
  expect(getPageRedirects(files)).toContainEqual(
    expect.objectContaining({
      from: '/web/get-started/how-eufemia-works',
      to: '/web/get-started/quick-start/',
    })
  )
  const solutions = web.find(
    ({ path }) => path === 'web/patterns-and-extensions'
  )
  const patterns = solutions.subheadings.at(-1)
  expect(patterns).toMatchObject({ title: 'Patterns', isMenuGroup: true })
  expect(toSidebarMenuData([patterns], () => undefined)[0]).toMatchObject({
    type: 'header',
    collapsible: undefined,
    to: undefined,
  })
  expect(patterns.subheadings.map(({ path }) => path)).toContain(
    'web/patterns-and-extensions/status-icon'
  )
  const resources = web.find(
    ({ path }) => path === 'web/ai-tools-and-resources'
  )
  expect(
    resources.subheadings.find(({ title }) => title === 'AI assistance')
  ).toMatchObject({
    isMenuGroup: true,
  })
  const extensions = getExtensions(regularMdxNodes).map(
    ({ fields }) => fields.slug
  )
  expect(extensions).toEqual(
    expect.arrayContaining([
      'web/forms',
      'web/patterns-and-extensions/table-of-content',
    ])
  )
  expect(extensions).not.toContain(
    'web/patterns-and-extensions/using-patterns-and-extensions'
  )
  expect(extensions).not.toContain(
    'web/patterns-and-extensions/status-icon'
  )
  const removed = [
    'web/get-started/design-for-web/inspiration',
    'web/development-guidelines/for-javascript',
    'web/layout-and-typography/breakpoints/properties',
  ]
  expect(
    allMdxNodes.filter(({ fields }) => removed.includes(fields.slug))
  ).toEqual([])
  expect(
    allMdxNodes.find(
      ({ fields }) => fields.slug === 'web/development-guidelines'
    ).frontmatter.route
  ).toBe(false)
})
