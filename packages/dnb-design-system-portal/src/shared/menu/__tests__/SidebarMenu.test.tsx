import { describe, expect, it, vi } from 'vitest'
import graphics from '../SidebarGraphics'
import {
  applySidebarMenuPlacement,
  createUilibSidebarStructure,
  findActiveSidebarItemId,
  getDefaultOpenSidebarItems,
  getSidebarMenuStorageKey,
  groupComponentsByCategory,
  insertWebPlatformToggle,
  shouldIncludeSidebarPrefix,
  toSidebarMenuData,
  type NavItem,
} from '../SidebarMenuData'

function collectPaths(items: NavItem[]): string[] {
  return items.flatMap((item) => [
    `/${item.path.replace(/^\/+|\/+$/g, '')}`,
    ...collectPaths(item.subheadings ?? []),
  ])
}

function collectLinkedPaths(items: NavItem[]): string[] {
  return items.flatMap((item) => [
    ...(item.isMenuLink === false
      ? []
      : [`/${item.path.replace(/^\/+|\/+$/g, '')}`]),
    ...collectLinkedPaths(item.subheadings ?? []),
  ])
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
    const structured = createUilibSidebarStructure([
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
        id: 'icons',
        path: 'icons',
        title: 'Icons Library',
        subheadings: [
          { id: 'icons-details', path: 'icons/details', title: 'Details' },
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
    ])

    expect(structured.map(({ title }) => title)).toEqual([
      'Getting Started',
      'Design Language',
      'Usage',
      'About the Library',
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
    expect(structured[1].subheadings?.map(({ title }) => title)).toEqual([
      'Icons Library',
      'Typography',
      'Helpers',
      'HTML Elements',
      'Layout',
      'Media Query',
      'Design Tokens',
    ])
    expect(structured[1].subheadings?.[0].subheadings).toEqual([
      expect.objectContaining({ path: 'icons/details' }),
    ])
    expect(structured[1].subheadings?.[0].icon).toBe('layout_grid')
    expect(structured[2].subheadings?.map(({ title }) => title)).toEqual([
      'Overview',
      'First steps',
      'Customization',
      'Accessibility',
      'Best practices',
      'AI',
    ])
    expect(structured[2]).toMatchObject({
      isMenuLink: false,
    })
    expect(structured[2].subheadings?.[0]).toMatchObject({
      path: 'uilib/usage',
      title: 'Overview',
      isMenuLink: true,
    })
    expect(structured[3].subheadings?.map(({ title }) => title)).toEqual([
      'About Eufemia',
      'Living system',
      'Maintainability',
      'Releases and Versions',
      'Contribute',
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
    expect(structured[3].subheadings?.[3].subheadings).toEqual([
      expect.objectContaining({
        path: 'uilib/about-the-lib/releases/eufemia/v11-info',
      }),
    ])
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
      sidebarMenuOpen: false,
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
    expect(structured[1].subheadings?.[6]).toMatchObject({
      path: 'uilib/usage/customisation/theming/design-tokens',
      status: 'beta',
      isActive: true,
    })
    expect(structured[2].subheadings?.[2]).toMatchObject({
      path: 'uilib/usage/customisation',
    })
    expect(findActiveSidebarItemId(structured)).toBe('design-tokens')
    expect(getDefaultOpenSidebarItems('layout', structured)).toEqual([
      'uilib-getting-started-menu',
      'uilib-design-language-menu',
      'usage',
      'about',
      'components',
    ])
  })

  it('preserves every original route exactly once when restructuring', () => {
    const original: NavItem[] = [
      {
        id: 'icons',
        path: '/icons',
        title: 'Icons',
        subheadings: [
          {
            id: 'icons-details',
            path: '/icons/details',
            title: 'Details',
          },
        ],
      },
      {
        id: 'uilib',
        path: '/uilib',
        title: 'UI Library',
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
              },
            ],
          },
          {
            id: 'usage',
            path: '/uilib/usage',
            title: 'Usage',
            subheadings: [
              {
                id: 'customisation',
                path: '/uilib/usage/customisation',
                title: 'Customization',
                subheadings: [
                  {
                    id: 'theming',
                    path: '/uilib/usage/customisation/theming',
                    title: 'Theming',
                    subheadings: [
                      {
                        id: 'design-tokens',
                        path: '/uilib/usage/customisation/theming/design-tokens',
                        title: 'Design Tokens',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]
    const structured = createUilibSidebarStructure(original)
    const originalPaths = collectPaths(original)
      .filter((path) => path !== '/uilib')
      .sort()
    const structuredPaths = collectLinkedPaths(structured).filter((path) =>
      originalPaths.includes(path)
    )

    expect(structuredPaths.sort()).toEqual(originalPaths)
    expect(new Set(structuredPaths).size).toBe(structuredPaths.length)
    expect(collectLinkedPaths(structured)).not.toContain('/uilib')
  })

  it('renders moved level-one pages only as accordion children', () => {
    const structured = createUilibSidebarStructure([
      {
        id: 'uilib',
        path: '/uilib',
        title: 'UI Library',
        subheadings: [
          {
            id: 'about',
            path: '/uilib/about-the-lib',
            title: 'About the Library',
            isActive: true,
            subheadings: [
              {
                id: 'living-system',
                path: '/uilib/about-the-lib/living-system',
                title: 'Living system',
              },
            ],
          },
        ],
      },
    ])
    const data = toSidebarMenuData(structured, vi.fn())
    const about = data.find(({ id }) => id === 'about')

    expect(about).toMatchObject({
      to: undefined,
    })
    expect(about.items?.[0]).toMatchObject({
      text: 'About Eufemia',
      to: '/uilib/about-the-lib',
      className: 'portal-sidebar-menu__item--active',
    })
    expect(findActiveSidebarItemId(structured)).toBe('about-page')
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
    expect(shouldIncludeSidebarPrefix('components', 'icons')).toBe(false)
  })

  it('inserts the Web toggle after the divider and before Overview', () => {
    const data = insertWebPlatformToggle([
      { id: 'usage', text: 'Usage' },
      {
        id: 'uilib-components-overview',
        text: 'Overview',
        dividerBefore: true,
      },
      { id: 'uilib-components', text: 'Components' },
    ])

    expect(data).toMatchObject([
      { id: 'usage' },
      {
        id: 'portal-web-platform',
        type: 'custom',
        dividerBefore: true,
      },
      {
        id: 'uilib-components-overview',
        dividerBefore: false,
      },
      { id: 'uilib-components' },
    ])
    expect(data[1].content).toBeTruthy()
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

  it('opens top-level landing page structures by default', () => {
    const uiLibraryItems: NavItem[] = [
      {
        id: 'uilib',
        path: '/uilib',
        title: 'UI Library',
        sidebarMenuOpen: true,
        subheadings: [
          {
            id: 'uilib-about-the-lib',
            path: '/uilib/about-the-lib',
            title: 'About the library',
            subheadings: [
              {
                id: 'uilib-about-the-lib-releases',
                path: '/uilib/about-the-lib/releases',
                title: 'Releases',
                subheadings: [],
              },
            ],
          },
          {
            id: 'uilib-components',
            path: '/uilib/components',
            title: 'Components',
            sidebarMenuOpen: true,
            subheadings: [
              {
                id: 'uilib-components-button',
                path: '/uilib/components/button',
                title: 'Button',
              },
            ],
          },
          {
            id: 'uilib-extensions',
            path: '/uilib/extensions',
            title: 'Extensions',
            sidebarMenuOpen: true,
            subheadings: [
              {
                id: 'uilib-extensions-forms',
                path: '/uilib/extensions/forms',
                title: 'Forms',
                sidebarMenuOpen: true,
                subheadings: [
                  {
                    id: 'uilib-extensions-forms-base-fields',
                    path: '/uilib/extensions/forms/base-fields',
                    title: 'Base fields',
                    sidebarMenuOpen: true,
                    subheadings: [
                      {
                        id: 'uilib-extensions-forms-base-fields-string',
                        path: '/uilib/extensions/forms/base-fields/String',
                        title: 'String',
                      },
                    ],
                  },
                  {
                    id: 'uilib-extensions-forms-feature-fields',
                    path: '/uilib/extensions/forms/feature-fields',
                    title: 'Feature fields',
                    sidebarMenuOpen: true,
                    subheadings: [
                      {
                        id: 'uilib-extensions-forms-feature-fields-email',
                        path: '/uilib/extensions/forms/feature-fields/Email',
                        title: 'Email',
                      },
                    ],
                  },
                  ...['Form', 'Wizard', 'Iterate', 'Value'].map(
                    (name) => ({
                      id: `uilib-extensions-forms-${name}`,
                      path: `/uilib/extensions/forms/${name}`,
                      title: name,
                      subheadings: [
                        {
                          id: `uilib-extensions-forms-${name}-child`,
                          path: `/uilib/extensions/forms/${name}/child`,
                          title: 'Child',
                        },
                      ],
                    })
                  ),
                ],
              },
            ],
          },
        ],
      },
    ]
    expect(getDefaultOpenSidebarItems('uilib', uiLibraryItems)).toEqual([
      'uilib',
      'uilib-components',
      'uilib-extensions',
    ])

    const quickguideItems: NavItem[] = [
      {
        id: 'quickguide-designer',
        path: '/quickguide-designer',
        title: 'Quickguide designer',
        sidebarMenuOpen: true,
        subheadings: [
          {
            id: 'quickguide-designer-basics',
            path: '/quickguide-designer/basics',
            title: 'Basics',
            subheadings: [],
          },
        ],
      },
    ]
    expect(
      getDefaultOpenSidebarItems('quickguide-designer', quickguideItems)
    ).toEqual(['quickguide-designer'])
    expect(
      getDefaultOpenSidebarItems('uilib-components', uiLibraryItems)
    ).toEqual(['uilib', 'uilib-components', 'uilib-extensions'])
    expect(
      getDefaultOpenSidebarItems(
        'uilib-extensions-forms-base-fields',
        uiLibraryItems
      )
    ).toEqual(['uilib', 'uilib-components', 'uilib-extensions'])
    expect(
      getDefaultOpenSidebarItems(
        'uilib-extensions-forms-feature-fields',
        uiLibraryItems
      )
    ).toEqual(['uilib', 'uilib-components', 'uilib-extensions'])

    for (const name of ['Form', 'Wizard', 'Iterate', 'Value']) {
      expect(
        getDefaultOpenSidebarItems(
          `uilib-extensions-forms-${name}`,
          uiLibraryItems
        )
      ).toEqual(['uilib', 'uilib-components', 'uilib-extensions'])
    }
  })

  it('keeps configured defaults open when a leaf page is selected', () => {
    const uiLibraryItems: NavItem[] = [
      {
        id: 'uilib',
        path: '/uilib',
        title: 'UI Library',
        sidebarMenuOpen: true,
        subheadings: [
          {
            id: 'uilib-elements',
            path: '/uilib/elements',
            title: 'Elements',
            subheadings: [
              {
                id: 'uilib-elements-blockquote',
                path: '/uilib/elements/blockquote',
                title: 'Blockquote',
              },
            ],
          },
          {
            id: 'uilib-components',
            path: '/uilib/components',
            title: 'Components',
            sidebarMenuOpen: true,
            subheadings: [
              {
                id: 'uilib-components-button',
                path: '/uilib/components/button',
                title: 'Button',
              },
            ],
          },
        ],
      },
    ]

    expect(
      getDefaultOpenSidebarItems(
        'uilib-elements-blockquote',
        uiLibraryItems
      )
    ).toEqual(['uilib', 'uilib-components'])
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
