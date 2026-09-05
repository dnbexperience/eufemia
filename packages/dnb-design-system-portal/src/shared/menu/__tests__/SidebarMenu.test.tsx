import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
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
        sidebarMenuDividerBefore: true,
        subheadings: [
          {
            id: 'changelog',
            path: 'uilib/changelog',
            title: "What's new",
          },
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
            id: 'intro',
            path: 'uilib/intro',
            title: undefined,
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
            subheadings: [
              {
                id: 'blockquote',
                path: 'uilib/elements/blockquote',
                title: 'Blockquote',
              },
            ],
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
                        subheadings: [
                          {
                            id: 'design-token-colors',
                            path: 'uilib/usage/customisation/colors',
                            title: 'Colors (deprecated)',
                          },
                        ],
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
            id: 'components',
            path: 'uilib/components',
            title: 'Components',
            subheadings: [
              {
                id: 'overview',
                path: 'uilib/components/overview',
                title: 'Overview',
              },
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
                category: 'content',
              },
              {
                id: 'sidebar-menu',
                path: 'uilib/extensions/sidebar-menu',
                title: 'SidebarMenu',
                category: 'navigation',
              },
              {
                id: 'vipps-wallet-button',
                path: 'uilib/extensions/vipps-wallet-button',
                title: 'VippsWalletButton',
                category: 'actions',
              },
            ],
          },
        ],
      },
    ]
    const structured = createUilibSidebarStructure(
      applyPageSidebarConfiguration(input),
      true
    )
    const closeMenu = vi.fn()
    expect(
      serializeSidebarMenuData(toSidebarMenuData(structured, closeMenu))
    ).toMatchInlineSnapshot(`
      [
        {
          "icon": true,
          "id": "portal-home",
          "text": "Home",
          "to": "/",
        },
        {
          "id": "getting-started",
          "text": "Getting started",
          "to": "uilib/getting-started",
        },
        {
          "icon": true,
          "id": "changelog",
          "text": "What's new",
          "to": "uilib/changelog",
        },
        {
          "collapsible": true,
          "dividerBefore": true,
          "icon": true,
          "id": "uilib-foundations-menu",
          "items": [
            {
              "badge": "Beta",
              "className": "portal-sidebar-menu__item--active",
              "id": "design-tokens",
              "text": "Design tokens",
              "to": "uilib/usage/customisation/theming/design-tokens",
            },
            {
              "id": "design-token-colors",
              "text": "Colors",
              "to": "uilib/usage/customisation/colors",
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
              "collapsible": true,
              "id": "icons",
              "items": [
                {
                  "id": "icons-details",
                  "text": "Details",
                  "to": "icons/details",
                },
              ],
              "text": "Icons",
              "to": "icons",
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
              "text": "Theming & brands",
              "to": "uilib/usage/customisation",
            },
            {
              "id": "layout",
              "text": "Layout & spacing",
              "to": "uilib/layout",
            },
          ],
          "text": "Foundations",
        },
        {
          "collapsible": true,
          "id": "components",
          "items": [
            {
              "id": "overview",
              "text": "Overview",
              "to": "uilib/components/overview",
            },
            {
              "id": "components-page",
              "text": "Alphabetically",
              "to": "uilib/components",
            },
            {
              "collapsible": true,
              "id": "elements",
              "items": [
                {
                  "id": "blockquote",
                  "text": "Blockquote",
                  "to": "uilib/elements/blockquote",
                },
              ],
              "text": "HTML Elements",
              "to": "uilib/elements",
            },
            {
              "badge": "Deprecated",
              "id": "drawer",
              "text": "Drawer",
              "to": "uilib/components/drawer",
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
            {
              "id": "vipps-wallet-button",
              "text": "VippsWalletButton",
              "to": "uilib/extensions/vipps-wallet-button",
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
          "id": "uilib-guides-menu",
          "items": [
            {
              "id": "intro",
              "text": "Quick intro",
              "to": "uilib/intro",
            },
            {
              "id": "requirements",
              "text": "Requirements",
              "to": "uilib/getting-started/requirements",
            },
            {
              "id": "first-steps",
              "text": "Developer guide",
              "to": "uilib/usage/first-steps",
            },
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
              "text": "Designer guide",
              "to": "quickguide-designer",
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
            {
              "id": "usage",
              "text": "Platform comparison",
              "to": "uilib/usage",
            },
          ],
          "text": "Guides",
        },
        {
          "collapsible": true,
          "id": "about",
          "items": [
            {
              "id": "about-page",
              "text": "About the library",
              "to": "uilib/about-the-lib",
            },
            {
              "id": "living-system",
              "text": "Living system",
              "to": "uilib/about-the-lib/living-system",
            },
            {
              "id": "uilib",
              "text": "UI library",
              "to": "uilib",
            },
            {
              "id": "maintainability",
              "text": "Maintainability",
              "to": "uilib/about-the-lib/maintainability",
            },
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
          ],
          "text": "About Eufemia",
        },
        {
          "collapsible": true,
          "icon": true,
          "id": "contribute",
          "items": [
            {
              "id": "contribute-page",
              "text": "Getting started",
              "to": "contribute",
            },
            {
              "id": "contribute-getting-started",
              "text": "Development setup",
              "to": "contribute/getting-started",
            },
          ],
          "text": "Contribute",
        },
        {
          "badge": "Beta",
          "id": "tools",
          "text": "Eufemia and AI",
          "to": "uilib/usage/first-steps/tools",
        },
      ]
    `)

    expect(structured.map(({ title }) => title)).toEqual([
      'Home',
      'Getting started',
      "What's new",
      'Foundations',
      'Components',
      'Forms',
      'Guides',
      'About Eufemia',
      'Contribute',
      'Eufemia and AI',
    ])
    expect(structured[0]).toMatchObject({
      id: 'portal-home',
      path: '/',
      title: 'Home',
      icon: 'home',
    })
    expect(structured[1].subheadings).toEqual([])
    expect(structured[2].icon).toBe('newspaper')
    expect(structured[3].subheadings?.map(({ title }) => title)).toEqual([
      'Design tokens',
      'Colors',
      'Typography',
      'Icons',
      'Theming & brands',
      'Layout & spacing',
    ])
    expect(structured[3].subheadings?.[3].subheadings).toEqual([
      expect.objectContaining({ path: 'icons/details' }),
    ])
    expect(structured[6].subheadings?.map(({ title }) => title)).toEqual([
      'Quick intro',
      'Requirements',
      'Developer guide',
      'Designer guide',
      'Accessibility',
      'Best practices',
      'Platform comparison',
    ])
    expect(structured[3].sidebarMenuDividerBefore).toBe(true)
    expect(structured[3].icon).toBe('lightbulb')
    expect(structured[4].subheadings?.[0]).toMatchObject({
      path: 'uilib/components/overview',
      title: 'Overview',
    })
    expect(structured[4].subheadings?.[1]).toMatchObject({
      path: 'uilib/components',
      title: 'Alphabetically',
      isMenuLink: true,
    })
    expect(structured[4].subheadings?.[2]).toMatchObject({
      path: 'uilib/elements',
      title: 'HTML Elements',
      subheadings: [
        expect.objectContaining({ path: 'uilib/elements/blockquote' }),
      ],
    })
    expect(structured[4].subheadings).toContainEqual(
      expect.objectContaining({ id: 'drawer', status: 'dep' })
    )
    const groupedComponents = groupComponentsByCategory(structured)

    expect(groupedComponents[4].subheadings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'uilib-components-category-actions',
          subheadings: expect.arrayContaining([
            expect.objectContaining({ id: 'vipps-wallet-button' }),
          ]),
        }),
        expect.objectContaining({
          id: 'uilib-components-category-navigation',
          subheadings: expect.arrayContaining([
            expect.objectContaining({ id: 'sidebar-menu' }),
          ]),
        }),
        expect.objectContaining({
          id: 'uilib-components-category-content',
          subheadings: expect.arrayContaining([
            expect.objectContaining({ id: 'payment-card' }),
          ]),
        }),
      ])
    )
    expect(structured[5]).toMatchObject({
      path: 'uilib/extensions/forms',
      icon: 'edit',
      isMenuLink: false,
    })
    expect(structured[5].subheadings?.[0]).toMatchObject({
      path: 'uilib/extensions/forms',
      title: 'Overview',
      isMenuLink: true,
    })
    expect(structured[8]).toMatchObject({
      title: 'Contribute',
      icon: 'development',
      isMenuLink: false,
      subheadings: [
        expect.objectContaining({
          path: 'contribute',
          title: 'Getting started',
          isMenuLink: true,
        }),
        expect.objectContaining({
          path: 'contribute/getting-started',
          title: 'Development setup',
        }),
      ],
    })
    expect(structured[7]).toMatchObject({
      title: 'About Eufemia',
      isMenuLink: false,
      subheadings: expect.arrayContaining([
        expect.objectContaining({
          path: 'uilib/about-the-lib',
          title: 'About the library',
          isMenuLink: true,
        }),
        expect.objectContaining({
          path: 'uilib',
          title: 'UI library',
          isMenuLink: true,
          sidebarMenuDividerBefore: undefined,
          subheadings: undefined,
        }),
      ]),
    })
    expect(structured[7]).not.toHaveProperty('sidebarMenuDividerBefore')
    expect(structured[3].subheadings?.[0]).toMatchObject({
      path: 'uilib/usage/customisation/theming/design-tokens',
      status: 'beta',
      isActive: true,
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

  it('groups component pages by their existing categories', () => {
    const grouped = groupComponentsByCategory([
      {
        id: 'uilib',
        path: 'uilib',
        title: 'UI Library',
        sidebarMenuDividerBefore: true,
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
