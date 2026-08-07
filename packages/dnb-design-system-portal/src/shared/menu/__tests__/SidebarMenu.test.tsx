import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import matter from 'gray-matter'
import graphics from '../SidebarGraphics'
import {
  applySidebarMenuPlacement,
  createUilibSidebarStructure,
  findActiveSidebarItemId,
  getSidebarMenuStorageKey,
  groupComponentsByCategory,
  insertPlatformToggles,
  shouldIncludeSidebarPrefix,
  toSidebarMenuData,
  type NavItem,
} from '../SidebarMenuData'

afterEach(cleanup)

function applyPageSidebarConfiguration(items: NavItem[]) {
  const configs = new Map<string, NavItem['sidebarMenu']>()
  const docsRoot = resolve(__dirname, '../../../docs')

  readdirSync(docsRoot, { recursive: true, encoding: 'utf8' })
    .filter((file) => file.endsWith('.mdx'))
    .forEach((file) => {
      const path = file.replace(/\.mdx$/, '')
      const source = readFileSync(resolve(docsRoot, file), 'utf8')
      const { data } = matter(source)
      if (data.sidebarMenu) {
        configs.set(path, data.sidebarMenu)
      }
    })

  const apply = (item: NavItem): NavItem => ({
    ...item,
    sidebarMenu: configs.get(item.path.replace(/^\/+|\/+$/g, '')),
    subheadings: item.subheadings?.map(apply),
  })

  return items.map(apply)
}

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

  it('places a page before an absolute target slug', () => {
    const placed = applySidebarMenuPlacement([
      {
        id: 'uilib',
        path: 'uilib',
        title: 'UI library',
        subheadings: [
          {
            id: 'usage',
            path: 'uilib/usage',
            title: 'Usage',
          },
          {
            id: 'components',
            path: 'uilib/components',
            title: 'Components',
            icon: 'components',
            subheadings: [
              {
                id: 'components-overview',
                path: 'uilib/components/overview',
                title: 'Overview',
                sidebarMenuPlacement: '/uilib/components',
                sidebarMenuDividerBefore: true,
                isActive: true,
              },
              {
                id: 'button',
                path: 'uilib/components/button',
                title: 'Button',
              },
            ],
          },
        ],
      },
    ])

    expect(placed[0].subheadings.map(({ id }) => id)).toEqual([
      'usage',
      'components-overview',
      'components',
    ])
    expect(placed[0].subheadings[2].subheadings).toEqual([
      expect.objectContaining({ id: 'button' }),
    ])
    expect(findActiveSidebarItemId(placed)).toBe('components-overview')
    expect(toSidebarMenuData(placed, vi.fn())[0].items?.[1]).toMatchObject(
      {
        id: 'components-overview',
        dividerBefore: true,
      }
    )
  })

  it('keeps a page in place when the absolute target slug is missing', () => {
    const placed = applySidebarMenuPlacement([
      {
        id: 'uilib',
        path: '/uilib',
        title: 'UI library',
        subheadings: [
          {
            id: 'overview',
            path: '/uilib/overview',
            title: 'Overview',
            sidebarMenuPlacement: '/missing',
          },
        ],
      },
    ])

    expect(placed[0].subheadings).toEqual([
      expect.objectContaining({ id: 'overview' }),
    ])
  })

  it('composes the concise UI library sidebar structure', () => {
    const input = [
      {
        id: 'quickguide-designer',
        path: 'quickguide-designer',
        title: 'Designer Guide',
        subheadings: [
          {
            id: 'quickguide-accessibility',
            path: 'quickguide-designer/accessibility',
            title: 'Accessibility',
          },
        ],
      },
      {
        id: 'contribute',
        path: 'contribute',
        title: 'Contribution Guide',
        subheadings: [
          {
            id: 'contribute-getting-started',
            path: 'contribute/getting-started',
            title: 'Getting started',
          },
        ],
      },
      {
        id: 'icons',
        path: 'icons',
        title: 'Icons Library',
        subheadings: [
          {
            id: 'icons-details',
            path: 'icons/details',
            title: 'Details',
          },
        ],
      },
      {
        id: 'uilib',
        path: 'uilib',
        title: 'UI library',
        subheadings: [
          {
            id: 'getting-started',
            path: 'uilib/getting-started',
            title: 'Getting Started',
            subheadings: [
              {
                id: 'requirements',
                path: 'uilib/getting-started/requirements',
                title: 'Requirements',
              },
            ],
          },
          {
            id: 'typography',
            path: 'uilib/typography',
            title: 'Typography',
            subheadings: [
              {
                id: 'font-size',
                path: 'uilib/typography/font-size',
                title: 'Font size',
              },
            ],
          },
          { id: 'helpers', path: 'uilib/helpers', title: 'Helpers' },
          {
            id: 'elements',
            path: 'uilib/elements',
            title: 'HTML Elements',
          },
          { id: 'layout', path: 'uilib/layout', title: 'Layout' },
          {
            id: 'shared',
            path: 'uilib/shared',
            title: '',
            subheadings: [
              {
                id: 'media-query',
                path: 'uilib/shared/media-query',
                title: '',
                subheadings: [
                  {
                    id: 'media-query-properties',
                    path: 'uilib/shared/media-query/properties',
                    title: 'Media Query',
                  },
                ],
              },
            ],
          },
          {
            id: 'usage',
            path: 'uilib/usage',
            title: 'Usage',
            subheadings: [
              {
                id: 'first-steps',
                path: 'uilib/usage/first-steps',
                title: 'First steps',
                subheadings: [
                  {
                    id: 'tools',
                    path: 'uilib/usage/first-steps/tools',
                    title: 'AI, MCP and Tools',
                    status: 'beta',
                  },
                ],
              },
              {
                id: 'customisation',
                path: 'uilib/usage/customisation',
                title: 'Customization',
                subheadings: [
                  {
                    id: 'theming',
                    path: 'uilib/usage/customisation/theming',
                    title: 'Theming',
                    subheadings: [
                      {
                        id: 'design-tokens',
                        path: 'uilib/usage/customisation/theming/design-tokens',
                        title: 'Design Tokens (beta)',
                        status: 'beta',
                        isActive: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'accessibility',
                path: 'uilib/usage/accessibility',
                title: 'Accessibility',
              },
              {
                id: 'best-practices',
                path: 'uilib/usage/best-practices',
                title: 'Best practices',
              },
            ],
          },
          {
            id: 'about',
            path: 'uilib/about-the-lib',
            title: 'About the Library',
            icon: 'about',
            subheadings: [
              {
                id: 'living-system',
                path: 'uilib/about-the-lib/living-system',
                title: 'Living system',
              },
              {
                id: 'maintainability',
                path: 'uilib/about-the-lib/maintainability',
                title: 'Maintainability',
              },
              {
                id: 'releases',
                path: 'uilib/about-the-lib/releases',
                title: 'Releases and versions',
                subheadings: [
                  {
                    id: 'version',
                    path: 'uilib/about-the-lib/releases/eufemia/v11-info',
                    title: 'v11',
                  },
                ],
              },
            ],
          },
          {
            id: 'overview',
            path: 'uilib/components/overview',
            title: 'Overview',
            sidebarMenuDividerBefore: true,
          },
          {
            id: 'components',
            path: 'uilib/components',
            title: 'Components',
            subheadings: [
              {
                id: 'drawer',
                path: 'uilib/components/drawer',
                title: 'Drawer',
                category: 'feedback',
                status: 'dep',
              },
            ],
          },
          {
            id: 'extensions',
            path: 'uilib/extensions',
            title: 'Extensions',
            icon: 'extensions',
            subheadings: [
              {
                id: 'forms',
                path: 'uilib/extensions/forms',
                title: 'Forms for applications',
                subheadings: [{ id: 'form', path: 'form', title: 'Form' }],
              },
              {
                id: 'payment-card',
                path: 'uilib/extensions/payment-card',
                title: 'PaymentCard',
              },
              {
                id: 'sidebar-menu',
                path: 'uilib/extensions/sidebar-menu',
                title: 'SidebarMenu',
              },
            ],
          },
        ],
      },
    ]
    const structured = createUilibSidebarStructure(
      applyPageSidebarConfiguration(input)
    )
    const closeMenu = vi.fn()
    expect(
      serializeSidebarMenuData(toSidebarMenuData(structured, closeMenu))
    ).toMatchInlineSnapshot(`
      [
        {
          "collapsible": true,
          "icon": true,
          "id": "uilib-getting-started-menu",
          "items": [
            {
              "collapsible": true,
              "icon": true,
              "id": "quickguide-designer",
              "items": [
                {
                  "id": "quickguide-accessibility",
                  "text": "Accessibility",
                  "to": "quickguide-designer/accessibility",
                },
              ],
              "text": "Designer Guide",
              "to": "quickguide-designer",
            },
            {
              "collapsible": true,
              "icon": true,
              "id": "getting-started",
              "items": [
                {
                  "id": "requirements",
                  "text": "Requirements",
                  "to": "uilib/getting-started/requirements",
                },
              ],
              "text": "Developer Guide",
              "to": "uilib/getting-started",
            },
          ],
          "text": "Getting Started",
        },
        {
          "collapsible": true,
          "icon": true,
          "id": "uilib-design-language-menu",
          "items": [
            {
              "collapsible": true,
              "icon": true,
              "id": "icons",
              "items": [
                {
                  "id": "icons-details",
                  "text": "Details",
                  "to": "icons/details",
                },
              ],
              "text": "Icons Library",
              "to": "icons",
            },
            {
              "id": "uilib-design-language-web",
              "items": [
                {
                  "badge": "Beta",
                  "className": "portal-sidebar-menu__item--active",
                  "icon": true,
                  "id": "design-tokens",
                  "text": "Design Tokens",
                  "to": "uilib/usage/customisation/theming/design-tokens",
                },
                {
                  "collapsible": true,
                  "id": "typography",
                  "items": [
                    {
                      "id": "font-size",
                      "text": "Font size",
                      "to": "uilib/typography/font-size",
                    },
                  ],
                  "text": "Typography",
                  "to": "uilib/typography",
                },
                {
                  "id": "helpers",
                  "text": "Helpers",
                  "to": "uilib/helpers",
                },
                {
                  "id": "elements",
                  "text": "HTML Elements",
                  "to": "uilib/elements",
                },
                {
                  "id": "layout",
                  "text": "Layout",
                  "to": "uilib/layout",
                },
                {
                  "icon": true,
                  "id": "media-query-properties",
                  "text": "Media Query",
                  "to": "uilib/shared/media-query/properties",
                },
              ],
              "text": "Web",
              "type": "group",
            },
          ],
          "text": "Design Language",
        },
        {
          "collapsible": true,
          "id": "usage",
          "items": [
            {
              "id": "tools",
              "text": "AI and Tools",
              "to": "uilib/usage/first-steps/tools",
            },
            {
              "id": "uilib-usage-web",
              "items": [
                {
                  "id": "usage-page",
                  "text": "Overview",
                  "to": "uilib/usage",
                },
                {
                  "id": "first-steps",
                  "text": "First steps",
                  "to": "uilib/usage/first-steps",
                },
                {
                  "collapsible": true,
                  "id": "customisation",
                  "items": [
                    {
                      "id": "theming",
                      "text": "Theming",
                      "to": "uilib/usage/customisation/theming",
                    },
                  ],
                  "text": "Customization",
                  "to": "uilib/usage/customisation",
                },
                {
                  "id": "accessibility",
                  "text": "Accessibility",
                  "to": "uilib/usage/accessibility",
                },
                {
                  "id": "best-practices",
                  "text": "Best practices",
                  "to": "uilib/usage/best-practices",
                },
              ],
              "text": "Web",
              "type": "group",
            },
          ],
          "text": "Usage",
        },
        {
          "collapsible": true,
          "id": "about",
          "items": [
            {
              "id": "about-page",
              "text": "About Eufemia",
              "to": "uilib/about-the-lib",
            },
            {
              "id": "living-system",
              "text": "Living system",
              "to": "uilib/about-the-lib/living-system",
            },
            {
              "id": "maintainability",
              "text": "Maintainability",
              "to": "uilib/about-the-lib/maintainability",
            },
            {
              "id": "uilib-about-web",
              "items": [
                {
                  "collapsible": true,
                  "id": "releases",
                  "items": [
                    {
                      "id": "version",
                      "text": "v11",
                      "to": "uilib/about-the-lib/releases/eufemia/v11-info",
                    },
                  ],
                  "text": "Releases and Versions",
                  "to": "uilib/about-the-lib/releases",
                },
                {
                  "collapsible": true,
                  "id": "contribute",
                  "items": [
                    {
                      "id": "contribute-getting-started",
                      "text": "Getting started",
                      "to": "contribute/getting-started",
                    },
                  ],
                  "text": "Contribution Guide",
                  "to": "contribute",
                },
              ],
              "text": "Web",
              "type": "group",
            },
          ],
          "text": "About",
        },
        {
          "dividerBefore": true,
          "id": "overview",
          "text": "Overview",
          "to": "uilib/components/overview",
        },
        {
          "collapsible": true,
          "id": "components",
          "items": [
            {
              "id": "components-page",
              "text": "Alphabetically",
              "to": "uilib/components",
            },
            {
              "badge": "Deprecated",
              "id": "drawer",
              "text": "Drawer",
              "to": "uilib/components/drawer",
            },
          ],
          "text": "Components",
        },
        {
          "collapsible": true,
          "icon": true,
          "id": "forms",
          "items": [
            {
              "id": "forms-page",
              "text": "Overview",
              "to": "uilib/extensions/forms",
            },
            {
              "id": "form",
              "text": "Form",
              "to": "form",
            },
          ],
          "text": "Forms",
        },
        {
          "collapsible": true,
          "icon": true,
          "id": "extensions",
          "items": [
            {
              "id": "extensions-page",
              "text": "Overview",
              "to": "uilib/extensions",
            },
            {
              "id": "payment-card",
              "text": "PaymentCard",
              "to": "uilib/extensions/payment-card",
            },
            {
              "id": "sidebar-menu",
              "text": "SidebarMenu",
              "to": "uilib/extensions/sidebar-menu",
            },
          ],
          "text": "Extensions",
        },
      ]
    `)

    expect(structured.map(({ title }) => title)).toEqual([
      'Getting Started',
      'Design Language',
      'Usage',
      'About',
      'Overview',
      'Components',
      'Forms',
      'Extensions',
    ])
    expect(structured[0].icon).toBe('play')
    expect(structured[1].icon).toBe('lightbulb')
    expect(structured[0].subheadings?.map(({ title }) => title)).toEqual([
      'Designer Guide',
      'Developer Guide',
    ])
    expect(structured[0].subheadings?.[0]).toMatchObject({
      path: 'quickguide-designer',
      icon: 'brush',
    })
    expect(structured[0].subheadings?.[0].subheadings).toContainEqual(
      expect.objectContaining({
        path: 'quickguide-designer/accessibility',
      })
    )
    expect(structured[0].subheadings?.[1].subheadings).toEqual([
      expect.objectContaining({
        path: 'uilib/getting-started/requirements',
      }),
    ])
    expect(structured[0].subheadings?.[1].icon).toBe('development')
    expect(structured[1].subheadings?.map(({ title }) => title)).toEqual([
      'Icons Library',
      'Web',
    ])
    expect(
      structured[1].subheadings?.[1].subheadings?.map(({ title }) => title)
    ).toEqual([
      'Design Tokens',
      'Typography',
      'Helpers',
      'HTML Elements',
      'Layout',
      'Media Query',
    ])
    expect(structured[1].subheadings?.[0].subheadings).toEqual([
      expect.objectContaining({ path: 'icons/details' }),
    ])
    expect(structured[1].subheadings?.[1]).toMatchObject({
      isMenuGroup: true,
    })
    expect(structured[1].subheadings?.[0].icon).toBe('layout_grid')
    expect(structured[1].subheadings?.[1].subheadings?.[0].icon).toBe(
      'cog'
    )
    expect(structured[1].subheadings?.[1].subheadings?.[5].icon).toBe(
      'laptop'
    )

    const menuData = toSidebarMenuData(structured, vi.fn())
    const iconsLibrary = menuData[1].items?.[0]
    const web = menuData[1].items?.[1]

    expect(iconsLibrary).toMatchObject({
      id: 'icons',
      type: undefined,
      collapsible: true,
    })

    expect(web).toMatchObject({
      id: 'uilib-design-language-web',
      type: 'group',
    })
    expect(web.items?.[0]).toMatchObject({
      id: 'design-tokens',
      type: undefined,
    })
    expect(web.items?.[1]).toMatchObject({
      id: 'typography',
      type: undefined,
      collapsible: true,
    })
    expect(structured[2].subheadings?.map(({ title }) => title)).toEqual([
      'AI and Tools',
      'Web',
    ])
    expect(structured[2]).toMatchObject({
      isMenuLink: false,
    })
    expect(structured[2].subheadings?.[1]).toMatchObject({
      id: 'uilib-usage-web',
      subheadings: expect.arrayContaining([
        expect.objectContaining({
          path: 'uilib/usage',
          title: 'Overview',
          isMenuLink: true,
        }),
      ]),
    })
    expect(structured[3].subheadings?.map(({ title }) => title)).toEqual([
      'About Eufemia',
      'Living system',
      'Maintainability',
      'Web',
    ])
    expect(structured[3]).toMatchObject({
      isMenuLink: false,
    })
    expect(structured[3].subheadings?.[0]).toMatchObject({
      path: 'uilib/about-the-lib',
      title: 'About Eufemia',
      isMenuLink: true,
    })
    expect(structured[3].subheadings?.[0].icon).toBeUndefined()
    expect(structured[3].subheadings?.[3]).toMatchObject({
      id: 'uilib-about-web',
      isMenuGroup: true,
      subheadings: [
        expect.objectContaining({
          path: 'uilib/about-the-lib/releases',
          title: 'Releases and Versions',
          isMenuGroup: false,
        }),
        expect.objectContaining({
          path: 'contribute',
          title: 'Contribution Guide',
        }),
      ],
    })
    expect(structured[4].sidebarMenuDividerBefore).toBe(true)
    expect(structured[5]).toMatchObject({
      isMenuLink: false,
    })
    expect(structured[5].subheadings?.[0]).toMatchObject({
      path: 'uilib/components',
      title: 'Alphabetically',
      isMenuLink: true,
    })
    expect(structured[5].subheadings?.[0].icon).toBeUndefined()
    expect(structured[5].subheadings).toContainEqual(
      expect.objectContaining({ id: 'drawer', status: 'dep' })
    )
    expect(structured[6]).toMatchObject({
      path: 'uilib/extensions/forms',
      icon: 'edit',
      isMenuLink: false,
    })
    expect(structured[6].subheadings?.[0]).toMatchObject({
      path: 'uilib/extensions/forms',
      title: 'Overview',
      isMenuLink: true,
    })
    expect(structured[6].subheadings?.[0].icon).toBeUndefined()
    expect(structured[6].subheadings?.[1]).toMatchObject({ id: 'form' })
    expect(structured[7]).toMatchObject({
      path: 'uilib/extensions',
      isMenuLink: false,
    })
    expect(structured[7].subheadings?.[0]).toMatchObject({
      path: 'uilib/extensions',
      title: 'Overview',
      isMenuLink: true,
    })
    expect(structured[7].subheadings?.[0].icon).toBeUndefined()
    expect(structured[7].subheadings).toContainEqual(
      expect.objectContaining({ path: 'uilib/extensions/payment-card' })
    )
    expect(structured[7].subheadings).toContainEqual(
      expect.objectContaining({ path: 'uilib/extensions/sidebar-menu' })
    )
    expect(structured[1].subheadings?.[1].subheadings?.[0]).toMatchObject({
      path: 'uilib/usage/customisation/theming/design-tokens',
      status: 'beta',
      isActive: true,
    })
    expect(structured[2].subheadings?.[1]).toMatchObject({
      id: 'uilib-usage-web',
      isMenuGroup: true,
      subheadings: expect.arrayContaining([
        expect.objectContaining({
          path: 'uilib/usage/first-steps',
          isMenuGroup: false,
        }),
        expect.objectContaining({
          path: 'uilib/usage/customisation',
          isMenuGroup: false,
        }),
        expect.objectContaining({
          path: 'uilib/usage/accessibility',
          isMenuGroup: false,
        }),
        expect.objectContaining({
          path: 'uilib/usage/best-practices',
          isMenuGroup: false,
        }),
      ]),
    })
    expect(findActiveSidebarItemId(structured)).toBe('design-tokens')
  })

  it('creates the sidebar structure from page-local configuration', () => {
    const structured = createUilibSidebarStructure([
      {
        id: 'uilib',
        path: 'uilib',
        title: 'UI Library',
        sidebarMenu: {
          id: 'design-language',
          path: 'uilib/design-language',
          title: 'Design Language',
          root: true,
          order: 1,
          groups: [
            {
              id: 'web',
              path: 'uilib/design-language/web',
              title: 'Web',
            },
          ],
        },
        subheadings: [
          {
            id: 'typography',
            path: 'uilib/typography',
            title: 'Typography',
            sidebarMenu: {
              parent: 'uilib/design-language/web',
            },
          },
        ],
      },
      {
        id: 'contribute',
        path: 'contribute',
        title: 'Contribute',
        sidebarMenu: {
          parent: 'uilib/design-language',
          title: 'Contribution Guide',
        },
        subheadings: [
          {
            id: 'getting-started',
            path: 'contribute/getting-started',
            title: 'Getting started',
          },
        ],
      },
    ])

    expect(structured).toMatchObject([
      {
        id: 'design-language',
        path: 'uilib/design-language',
        title: 'Design Language',
        subheadings: [
          {
            id: 'web',
            title: 'Web',
            isMenuGroup: true,
            subheadings: [{ id: 'typography' }],
          },
          {
            id: 'contribute',
            title: 'Contribution Guide',
            subheadings: [{ id: 'getting-started' }],
          },
        ],
      },
    ])
  })

  it('throws when a configured parent cannot be found', () => {
    expect(() =>
      createUilibSidebarStructure([
        {
          id: 'orphan',
          path: 'orphan',
          title: 'Orphan',
          sidebarMenu: { parent: 'missing' },
        },
      ])
    ).toThrow('Sidebar menu parent not found: missing')
  })

  it('selects a root page placed inside a configured group', () => {
    const structured = createUilibSidebarStructure([
      {
        id: 'usage',
        path: 'uilib/usage',
        title: 'Usage',
        isActive: true,
        sidebarMenu: {
          root: true,
          groups: [
            {
              id: 'web',
              path: 'uilib/usage/web',
              title: 'Web',
              includePageAs: 'Overview',
            },
          ],
        },
      },
    ])

    expect(findActiveSidebarItemId(structured)).toBe('usage-page')
  })

  it('uses the unified UI library structure for icons routes', () => {
    expect(shouldIncludeSidebarPrefix('uilib', 'icons')).toBe(true)
    expect(shouldIncludeSidebarPrefix('icons', 'uilib')).toBe(true)
    expect(
      shouldIncludeSidebarPrefix('uilib', 'quickguide-designer')
    ).toBe(true)
    expect(
      shouldIncludeSidebarPrefix('quickguide-designer', 'uilib')
    ).toBe(true)
    expect(shouldIncludeSidebarPrefix('uilib', 'contribute')).toBe(true)
    expect(shouldIncludeSidebarPrefix('contribute', 'uilib')).toBe(true)
    expect(shouldIncludeSidebarPrefix('components', 'icons')).toBe(false)
  })

  it('inserts platform toggles before the first configured platform item', () => {
    const handlePlatformChange = vi.fn()
    const data = insertPlatformToggles(
      [
        { id: 'usage', text: 'Usage' },
        {
          id: 'uilib-components-overview',
          text: 'Overview',
          dividerBefore: true,
          platform: 'web',
        },
        { id: 'uilib-components', text: 'Components', platform: 'web' },
        {
          id: 'ios-overview',
          text: 'iOS overview',
          platform: 'ios',
        },
        {
          id: 'android-overview',
          text: 'Android overview',
          platform: 'android',
        },
      ],
      'web',
      handlePlatformChange,
      true
    )

    expect(data).toMatchObject([
      { id: 'usage' },
      {
        id: 'portal-platforms',
        type: 'custom',
        dividerBefore: true,
      },
      {
        id: 'uilib-components-overview',
        dividerBefore: false,
        className: 'portal-sidebar-menu__platform-item',
        style: { animationDelay: '0ms' },
      },
      {
        id: 'uilib-components',
        className: 'portal-sidebar-menu__platform-item',
        style: { animationDelay: '50ms' },
      },
    ])

    render(data[1].content as ReactElement)
    fireEvent.click(document.querySelector('[aria-label="iOS platform"]'))
    expect(handlePlatformChange).toHaveBeenCalledWith('ios')
    expect(
      document.querySelector('[aria-label="Android platform"]')
    ).toBeTruthy()

    expect(
      insertPlatformToggles(
        [
          { id: 'usage', text: 'Usage' },
          {
            id: 'uilib-components-overview',
            text: 'Overview',
            dividerBefore: true,
            platform: 'web',
          },
          {
            id: 'ios-overview',
            text: 'iOS overview',
            platform: 'ios',
          },
        ],
        'ios',
        handlePlatformChange
      )
    ).toMatchObject([
      { id: 'usage' },
      { id: 'portal-platforms' },
      { id: 'ios-overview' },
    ])
  })

  it('groups component pages by their existing categories', () => {
    const grouped = groupComponentsByCategory([
      {
        id: 'uilib',
        path: 'uilib',
        title: 'UI Library',
        subheadings: [
          {
            id: 'uilib-components',
            path: 'uilib/components',
            title: 'Components',
            subheadings: [
              {
                id: 'components-alphabetically',
                path: 'uilib/components',
                title: 'Alphabetically',
                isMenuLink: true,
              },
              {
                id: 'components-overview',
                path: 'uilib/components/overview',
                title: 'Overview',
              },
              {
                id: 'components-button',
                path: 'uilib/components/button',
                title: 'Button',
                category: 'actions',
                subheadings: [
                  {
                    id: 'components-button-demos',
                    path: 'uilib/components/button/demos',
                    title: 'Demos',
                  },
                ],
              },
              {
                id: 'components-input',
                path: 'uilib/components/input',
                title: 'Input',
                category: 'input',
                isActive: true,
                isInsideActivePath: true,
              },
              {
                id: 'components-fragments',
                path: 'uilib/components/fragments',
                title: 'Fragments',
              },
            ],
          },
        ],
      },
    ])

    const components = grouped[0].subheadings[0]

    expect(components.subheadings.map(({ title }) => title)).toEqual([
      'Overview',
      'Alphabetically',
      'Actions',
      'Input',
      'Fragments',
    ])
    expect(components.subheadings[1]).toMatchObject({
      id: 'components-alphabetically',
      path: 'uilib/components',
    })
    expect(components.subheadings[2]).toMatchObject({
      id: 'uilib-components-category-actions',
      isMenuGroup: true,
      subheadings: [
        {
          id: 'components-button',
          subheadings: [{ id: 'components-button-demos' }],
        },
      ],
    })
    expect(components.subheadings[3]).toMatchObject({
      id: 'uilib-components-category-input',
      isMenuGroup: true,
      subheadings: [
        {
          id: 'components-input',
          isActive: true,
          isInsideActivePath: true,
        },
      ],
    })
    expect(findActiveSidebarItemId(grouped)).toBe('components-input')
  })

  it('renders component categories as static titled groups', () => {
    const data = toSidebarMenuData(
      groupComponentsByCategory([
        {
          id: 'uilib-components',
          path: 'uilib/components',
          title: 'Components',
          subheadings: [
            {
              id: 'components-button',
              path: 'uilib/components/button',
              title: 'Button',
              category: 'actions',
            },
          ],
        },
      ]),
      vi.fn()
    )

    expect(data[0].items?.[0]).toMatchObject({
      id: 'uilib-components-category-actions',
      text: 'Actions',
      type: 'group',
      items: [{ id: 'components-button', to: 'uilib/components/button' }],
    })
    expect(data[0].items?.[0].to).toBeUndefined()
    expect(data[0].items?.[0].element).toBeUndefined()
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
          data.sidebarMenu?.open !== undefined ||
          data.sidebarMenu?.groups?.some(
            (group: { open?: boolean }) => group.open !== undefined
          )
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

  it('stores open state separately for each top-level menu', () => {
    expect(getSidebarMenuStorageKey(items)).toBe(
      'portal-sidebar-menu-open-items--uilib'
    )
    expect(
      getSidebarMenuStorageKey([
        {
          id: 'contribute',
          path: '/contribute',
          title: 'Contribute',
        },
      ])
    ).toBe('portal-sidebar-menu-open-items-contribute')
  })
})

function serializeSidebarMenuData(
  items: ReturnType<typeof toSidebarMenuData>
) {
  return items.map(
    ({
      id,
      text,
      to,
      dividerBefore,
      badge,
      type,
      collapsible,
      icon,
      className,
      items,
    }) => ({
      id,
      text,
      ...(to !== undefined && { to }),
      ...(dividerBefore !== undefined && { dividerBefore }),
      ...(badge !== undefined && { badge }),
      ...(type !== undefined && { type }),
      ...(collapsible !== undefined && { collapsible }),
      ...(icon !== undefined && { icon: true }),
      ...(className !== undefined && { className }),
      ...(items?.length && { items: serializeSidebarMenuData(items) }),
    })
  )
}
