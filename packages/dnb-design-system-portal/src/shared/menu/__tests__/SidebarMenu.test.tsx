import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import matter from '@11ty/gray-matter'
import graphics from '../SidebarGraphics'
import {
  findActiveSidebarItemId,
  toSidebarMenuData,
  type NavItem,
} from '../SidebarMenuData'

afterEach(cleanup)

describe('portal SidebarMenu data', () => {
  const items: NavItem[] = [
    {
      id: '-uilib',
      path: '/uilib',
      title: 'UI library',
      icon: 'OverviewIcon',
      subheadings: [
        {
          id: '-uilib-components',
          path: '/uilib/components',
          title: 'Web.Components',
          status: 'new',
          subheadings: [
            {
              id: '-uilib-components-button',
              path: '/uilib/components/button',
              title: 'Button',
              isActive: true,
            },
            {
              id: '-uilib-components-hidden',
              path: '/uilib/components/hidden',
              title: 'Hidden',
              hideInMenu: true,
            },
          ],
        },
      ],
    },
  ]

  it('maps nested portal navigation and preserves custom icons', () => {
    const closeMenu = vi.fn()
    const data = toSidebarMenuData(items, closeMenu)

    expect(data[0]).toMatchObject({
      id: '-uilib',
      text: 'UI library',
      to: '/uilib',
      icon: graphics.OverviewIcon,
    })
    expect(data[0].items?.[0]).toMatchObject({
      id: '-uilib-components',
      text: 'Components',
      to: '/uilib/components',
      badge: 'New',
    })
    expect(data[0].items?.[0].items).toHaveLength(1)
    expect(data[0].type).toBeUndefined()
    expect(data[0].items?.[0]).toMatchObject({
      type: undefined,
      collapsible: true,
      to: '/uilib/components',
      element: expect.any(Function),
    })

    data[0].onClick?.({} as React.MouseEvent<HTMLElement>)
    expect(closeMenu).toHaveBeenCalledOnce()
  })

  it('renders second-level folders as accordions and deeper folders as static groups', () => {
    const data = toSidebarMenuData(
      [
        {
          id: 'uilib',
          path: '/uilib',
          title: 'UI library',
          subheadings: [
            {
              id: 'typography',
              path: '/uilib/typography',
              title: 'Typography',
              subheadings: [
                {
                  id: 'font-size',
                  path: '/uilib/typography/font-size',
                  title: 'Font size',
                  subheadings: [
                    {
                      id: 'examples',
                      path: '/uilib/typography/font-size/examples',
                      title: 'Examples',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      vi.fn()
    )

    expect(data[0]).toMatchObject({
      id: 'uilib',
      collapsible: true,
      items: [
        {
          id: 'typography',
          type: undefined,
          collapsible: true,
          to: '/uilib/typography',
          element: expect.any(Function),
          items: [
            {
              id: 'font-size',
              type: 'group',
              to: '/uilib/typography/font-size',
              element: expect.any(Function),
              items: [{ id: 'examples' }],
            },
          ],
        },
      ],
    })
  })

  it('finds the exact active item in a nested structure', () => {
    expect(findActiveSidebarItemId(items)).toBe('-uilib-components-button')
  })

  it('does not configure portal accordions as initially open', () => {
    const docsRoot = resolve(__dirname, '../../../docs')
    const configuredOpenPages = readdirSync(docsRoot, {
      recursive: true,
      encoding: 'utf8',
    })
      .filter((file) => file.endsWith('.mdx'))
      .filter((file) => {
        const source = readFileSync(resolve(docsRoot, file), 'utf8')
        const { data } = matter(source)

        return (
          data.sidebarMenuOpen !== undefined ||
          data.sidebarMenu?.open !== undefined
        )
      })

    expect(configuredOpenPages).toEqual([])
  })

  it('renders top-level folders as accordions', () => {
    const data = toSidebarMenuData(
      [
        {
          id: 'base-fields',
          path: '/base-fields',
          title: 'Base fields',
          subheadings: [
            { id: 'string', path: '/base-fields/String', title: 'String' },
          ],
        },
        {
          id: 'form',
          path: '/Form',
          title: 'Form',
          subheadings: [
            { id: 'section', path: '/Form/Section', title: 'Section' },
          ],
        },
      ],
      vi.fn()
    )

    expect(data[0].collapsible).toBe(true)
    expect(data[1].collapsible).toBe(true)
    expect(data[0].items?.[0].collapsible).toBeUndefined()
  })
})
