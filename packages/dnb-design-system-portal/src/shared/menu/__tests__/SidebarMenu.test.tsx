import { describe, expect, it, vi } from 'vitest'
import graphics from '../SidebarGraphics'
import {
  findActiveSidebarItemId,
  getDefaultOpenSidebarItems,
  getSidebarMenuStorageKey,
  toSidebarMenuData,
  type NavItem,
} from '../SidebarMenuData'

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

    data[0].onClick?.({} as React.MouseEvent<HTMLElement>)
    expect(closeMenu).toHaveBeenCalledOnce()
  })

  it('finds the exact active item in a nested structure', () => {
    expect(findActiveSidebarItemId(items)).toBe('-uilib-components-button')
  })

  it('opens top-level landing page structures by default', () => {
    const uiLibraryItems: NavItem[] = [
      {
        id: 'uilib',
        path: '/uilib',
        title: 'UI Library',
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
            subheadings: [],
          },
          {
            id: 'uilib-extensions',
            path: '/uilib/extensions',
            title: 'Extensions',
            subheadings: [
              {
                id: 'uilib-extensions-forms',
                path: '/uilib/extensions/forms',
                title: 'Forms',
                subheadings: [
                  {
                    id: 'uilib-extensions-forms-base-fields',
                    path: '/uilib/extensions/forms/base-fields',
                    title: 'Base fields',
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
      'uilib-extensions-forms',
    ])

    const quickguideItems: NavItem[] = [
      {
        id: 'quickguide-designer',
        path: '/quickguide-designer',
        title: 'Quickguide designer',
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
    ).toEqual(['quickguide-designer', 'quickguide-designer-basics'])
    expect(
      getDefaultOpenSidebarItems('uilib-components', uiLibraryItems)
    ).toEqual([])
    expect(
      getDefaultOpenSidebarItems(
        'uilib-extensions-forms-base-fields',
        uiLibraryItems
      )
    ).toEqual([
      'uilib-extensions-forms-base-fields',
      'uilib-extensions-forms-base-fields-string',
    ])
    expect(
      getDefaultOpenSidebarItems(
        'uilib-extensions-forms-feature-fields',
        uiLibraryItems
      )
    ).toEqual([
      'uilib-extensions-forms-feature-fields',
      'uilib-extensions-forms-feature-fields-email',
    ])

    for (const name of ['Form', 'Wizard', 'Iterate', 'Value']) {
      expect(
        getDefaultOpenSidebarItems(
          `uilib-extensions-forms-${name}`,
          uiLibraryItems
        )
      ).toEqual([])
    }
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
