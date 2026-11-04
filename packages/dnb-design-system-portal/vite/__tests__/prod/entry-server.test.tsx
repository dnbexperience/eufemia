// @vitest-environment node
import { createElement, useContext } from 'react'
import { beforeEach, expect, it, vi } from 'vitest'
import { PortalTocData } from '../../../src/shared/parts/PortalTocData'
import { render } from '../../prod/entry-server'

const state = vi.hoisted(() => ({ renders: 0 }))
vi.mock('virtual:portal-pages', () => ({
  allMdxNodes: [],
  routes: [
    {
      path: '/article/',
      Component: () => {
        state.renders++
        return createElement('p', null, 'Page render ' + state.renders)
      },
    },
  ],
}))
vi.mock('@dnb/eufemia/src/shared', () => ({
  Provider: ({ children }) => children,
  Theme: ({ children }) => children,
}))
vi.mock('@dnb/eufemia/src/shared/IsolatedStyleScope', () => ({
  default: ({ children }) => children,
}))
vi.mock('../../../src/core/portalRuntimeUtils', () => ({
  translations: {},
  getLang: () => 'en-GB',
}))
vi.mock('../../../src/shared/tags', () => ({ default: {} }))
vi.mock('../../../src/shared/menu/BranchBanner', () => ({
  default: () => null,
}))
vi.mock(
  '@dnb/eufemia/src/extensions/sidebar-menu/SidebarMenuPreHydrationScript',
  () => ({ getPreHydrationScript: () => '' })
)
vi.mock(
  '@dnb/eufemia/src/extensions/table-of-content/TableOfContentPreHydrationScript',
  () => ({ getPreHydrationScript: () => '' })
)
vi.mock('../../../src/shared/parts/PortalToc', () => ({
  default: () => {
    const snapshot = useContext(PortalTocData)
    return snapshot
      ? createElement(
          'nav',
          null,
          snapshot.headings.map(({ id }) =>
            createElement('a', { key: id, href: '#' + id }, id)
          )
        )
      : createElement('template', { 'data-portal-toc-depth': 2 })
  },
}))
vi.mock('../../../src/core/PortalLayout', async () => {
  const { default: PortalToc } =
    await import('../../../src/shared/parts/PortalToc')
  return {
    default: ({ children }) =>
      createElement(
        'main',
        null,
        createElement(
          'h1',
          null,
          'Title',
          createElement('a', { className: 'anchor-hash', id: 'title' })
        ),
        createElement(
          'h2',
          null,
          'Section',
          createElement('a', { className: 'anchor-hash', id: 'section' })
        ),
        createElement(
          'div',
          { id: 'content-grid-sidebar' },
          createElement(PortalToc)
        ),
        children
      ),
  }
})

beforeEach(() => {
  state.renders = 0
})

it('renders page content once while including its collected outline in the server HTML', async () => {
  const { html } = await render('/article/')
  expect(state.renders).toBe(1)
  expect(html).toContain('Page render 1')
  expect(html).toContain('<a href="#section">section</a>')
  expect(html).not.toContain('<template')
})
