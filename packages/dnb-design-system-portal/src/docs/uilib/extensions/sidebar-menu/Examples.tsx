import ComponentBox from '../../../../shared/tags/ComponentBox'
import { useState } from 'react'
import { H2, P } from '@dnb/eufemia/src'
import * as SidebarMenu from '@dnb/eufemia/src/extensions/sidebar-menu'
import type {
  SidebarMenuItemData,
  SidebarMenuSectionData,
} from '@dnb/eufemia/src/extensions/sidebar-menu'
import '@dnb/eufemia/src/extensions/sidebar-menu/style'
import styles from './Examples.module.scss'
import { ScrollView } from '@dnb/eufemia/src/fragments'
import {
  account,
  bank,
  card,
  cog,
  coins_1,
  file,
  folder,
  funds,
  home,
  office_buildings,
  pay_from,
  person,
} from '@dnb/eufemia/src/icons'

export function SidebarMenuDeclarative() {
  return (
    <ComponentBox
      hideCode
      data-visual-test="sidebar-menu-declarative"
      scope={{
        account,
        card,
        cog,
        home,
        office_buildings,
        pay_from,
        person,
      }}
    >
      <SidebarMenu.Root
        aria-label="Personal and business navigation"
        defaultActiveSection="personal"
        defaultOpenItems={['products']}
        openItemsStorageKey="sidebar-menu-declarative-example"
        onOpenItemsChange={(openItems) => {
          console.log('openItems', openItems)
        }}
        onSelectedItemChange={(itemId) => {
          console.log('selectedItem', itemId)
        }}
      >
        <SidebarMenu.Section
          id="personal"
          text="Personal"
          icon={person}
          badge={2}
          badgeProps={{
            variant: 'notification',
            label: 'Notifications:',
          }}
          triggerBadge={2}
          triggerBadgeProps={{ label: 'Notifications:' }}
        >
          <SidebarMenu.Header text="Everyday banking">
            <SidebarMenu.Item
              id="overview"
              text="Overview"
              icon={home}
              badge="New"
              badgeProps={{ status: 'positive', subtle: true }}
            />
            <SidebarMenu.Accordion
              id="products"
              text="Products"
              badge={3}
              badgeProps={{ label: 'Product groups:' }}
            >
              <SidebarMenu.Item
                id="accounts"
                text="Accounts"
                icon={account}
              />
              <SidebarMenu.Accordion id="cards" text="Cards" icon={card}>
                <SidebarMenu.Item id="debit-card" text="Debit card" />
                <SidebarMenu.Item id="credit-card" text="Credit card" />
                <SidebarMenu.Accordion id="card-settings" text="Settings">
                  <SidebarMenu.Item id="limits" text="Limits" />
                  <SidebarMenu.Accordion id="security" text="Security">
                    <SidebarMenu.Item id="biometrics" text="Biometrics" />
                    <SidebarMenu.Item id="pin-code" text="PIN code" />
                  </SidebarMenu.Accordion>
                </SidebarMenu.Accordion>
              </SidebarMenu.Accordion>
              <SidebarMenu.Accordion
                id="card-controls"
                text="Controls"
                icon={cog}
              >
                <SidebarMenu.Item id="freeze-card" text="Freeze card" />
                <SidebarMenu.Item
                  id="online-shopping"
                  text="Online shopping"
                  badge={2}
                  badgeProps={{
                    variant: 'notification',
                    label: 'Notifications:',
                  }}
                />
              </SidebarMenu.Accordion>
            </SidebarMenu.Accordion>
            <SidebarMenu.Divider />
            <SidebarMenu.Item
              id="disabled"
              text="Disabled item"
              disabled
            />
          </SidebarMenu.Header>
        </SidebarMenu.Section>

        <SidebarMenu.Section
          id="business"
          text="Business"
          icon={office_buildings}
          badge={9}
          badgeProps={{ label: 'Notifications:' }}
        >
          <SidebarMenu.Header text="Company">
            <SidebarMenu.Item
              id="business-overview"
              text="Overview"
              icon={home}
            />
            <SidebarMenu.Item
              id="business-payments"
              text="Payments"
              icon={pay_from}
            />
            <SidebarMenu.Accordion id="business-services" text="Services">
              <SidebarMenu.Item
                id="business-accounts"
                text="Accounts"
                icon={account}
              />
              <SidebarMenu.Accordion
                id="business-cards"
                text="Company cards"
                icon={card}
              >
                <SidebarMenu.Item
                  id="business-card-overview"
                  text="Card overview"
                />
                <SidebarMenu.Item
                  id="business-card-settings"
                  text="Card settings"
                />
              </SidebarMenu.Accordion>
              <SidebarMenu.Accordion
                id="business-financing"
                text="Financing"
              >
                <SidebarMenu.Item id="business-loans" text="Loans" />
                <SidebarMenu.Item id="business-credit" text="Credit" />
              </SidebarMenu.Accordion>
            </SidebarMenu.Accordion>
          </SidebarMenu.Header>
        </SidebarMenu.Section>
      </SidebarMenu.Root>
    </ComponentBox>
  )
}

export function SidebarMenuData() {
  return (
    <ComponentBox
      hideCode
      data-visual-test="sidebar-menu-data"
      scope={{
        account,
        card,
        cog,
        home,
        office_buildings,
        pay_from,
        person,
        ScrollView,
      }}
    >
      <ScrollView
        interactive="auto"
        scrollbarGutter="stable"
        style={{ maxHeight: 'min(18rem, calc(100vh - 8rem))' }}
      >
        <SidebarMenu.Data
          aria-label="Data-driven navigation"
          defaultSelectedItem="data-credit-card"
          scrollSelectedItemIntoView={false}
          space="small"
          scrollPositionStorageKey="sidebar-menu-data-scroll-position"
          sections={[
            {
              id: 'personal-data',
              text: 'Personal',
              icon: person,
              defaultActive: true,
              triggerBadge: 2,
              triggerBadgeProps: {
                label: 'Notifications:',
              },
              items: [
                {
                  id: 'data-home',
                  text: 'Overview',
                  icon: home,
                  badge: 'New',
                  badgeProps: { status: 'positive', subtle: true },
                },
                {
                  id: 'data-products',
                  text: 'Products',
                  badge: 3,
                  badgeProps: { label: 'Product groups:' },
                  items: [
                    {
                      id: 'data-cards',
                      text: 'Cards',
                      icon: card,
                      items: [
                        { id: 'data-debit-card', text: 'Debit card' },
                        { id: 'data-credit-card', text: 'Credit card' },
                        {
                          id: 'data-settings',
                          text: 'Settings',
                          items: [
                            {
                              id: 'data-security',
                              text: 'Security',
                              items: [
                                {
                                  id: 'data-biometrics',
                                  text: 'Biometrics',
                                },
                                { id: 'data-pin-code', text: 'PIN code' },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 'data-controls',
                      text: 'Controls',
                      icon: cog,
                      items: [
                        { id: 'data-freeze-card', text: 'Freeze card' },
                        {
                          id: 'data-online-shopping',
                          text: 'Online shopping',
                          badge: 2,
                          badgeProps: {
                            variant: 'notification',
                            label: 'Notifications:',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'business-data',
              text: 'Business',
              icon: office_buildings,
              badge: 9,
              badgeProps: { label: 'Notifications:' },
              items: [
                { id: 'data-business-home', text: 'Overview', icon: home },
                { id: 'data-payments', text: 'Payments', icon: pay_from },
                {
                  id: 'data-services',
                  text: 'Services',
                  items: [
                    {
                      id: 'data-accounts',
                      text: 'Accounts',
                      icon: account,
                    },
                    {
                      id: 'data-company-cards',
                      text: 'Company cards',
                      icon: card,
                      items: [
                        {
                          id: 'data-card-overview',
                          text: 'Card overview',
                        },
                        {
                          id: 'data-card-settings',
                          text: 'Card settings',
                        },
                      ],
                    },
                    {
                      id: 'data-financing',
                      text: 'Financing',
                      items: [
                        { id: 'data-loans', text: 'Loans' },
                        { id: 'data-credit', text: 'Credit' },
                      ],
                    },
                  ],
                },
              ],
            },
          ]}
        />
      </ScrollView>
    </ComponentBox>
  )
}

export function SidebarMenuResponsiveNavigation() {
  return (
    <ComponentBox
      hideCode
      scope={{
        account,
        bank,
        card,
        cog,
        coins_1,
        file,
        folder,
        funds,
        H2,
        home,
        office_buildings,
        P,
        person,
        styles,
      }}
    >
      {() => {
        const ResponsiveMenu = () => {
          const [selectedItem, setSelectedItem] = useState('home')
          const items: SidebarMenuItemData[] = [
            { id: 'home', text: 'Home', icon: home, href: '#home' },
            {
              id: 'products',
              text: 'Products',
              icon: funds,
              items: [
                {
                  id: 'accounts',
                  text: 'Accounts',
                  icon: account,
                  href: '#accounts',
                },
                {
                  id: 'cards',
                  text: 'Payment cards',
                  icon: card,
                  href: '#cards',
                  badge: 'New',
                  badgeProps: { status: 'positive', subtle: true },
                },
                {
                  id: 'statements',
                  text: 'Statements',
                  icon: file,
                  href: '#statements',
                },
                {
                  id: 'more-products',
                  text: 'More products',
                  icon: folder,
                  items: [
                    {
                      id: 'loans',
                      text: 'Loans',
                      icon: bank,
                      href: '#loans',
                    },
                    {
                      id: 'savings',
                      text: 'Savings',
                      icon: coins_1,
                      href: '#savings',
                      badge: 2,
                      badgeProps: {
                        variant: 'notification',
                        label: 'Notifications:',
                      },
                    },
                  ],
                },
              ],
            },
            {
              id: 'without-icon',
              text: 'Without icon',
              href: '#without-icon',
            },
            {
              id: 'settings',
              text: 'Settings',
              icon: cog,
              href: '#settings',
              dividerBefore: true,
            },
          ]
          const itemTitles: Record<string, string> = {
            home: 'Home',
            accounts: 'Accounts',
            cards: 'Payment cards',
            statements: 'Statements',
            loans: 'Loans',
            savings: 'Savings',
            'without-icon': 'Without icon',
            settings: 'Settings',
            'business-overview': 'Business overview',
            payments: 'Payments',
          }
          const { close } = SidebarMenu.useResponsive()
          const addCloseHandler = (
            items: SidebarMenuItemData[]
          ): SidebarMenuItemData[] =>
            items.map((item) => ({
              ...item,
              onClick: item.href || item.to ? close : item.onClick,
              items: item.items ? addCloseHandler(item.items) : undefined,
            }))
          const sections: SidebarMenuSectionData[] = [
            {
              id: 'personal',
              text: 'Personal',
              icon: person,
              defaultActive: true,
              items: [
                {
                  id: 'personal-heading',
                  type: 'header',
                  text: 'Everyday banking',
                  items,
                },
              ],
            },
            {
              id: 'business',
              text: 'Business',
              items: [
                {
                  id: 'business-heading',
                  type: 'header',
                  text: 'Business banking',
                  items: [
                    {
                      id: 'business-overview',
                      text: 'Business overview',
                      icon: office_buildings,
                      href: '#business-overview',
                    },
                    {
                      id: 'payments',
                      text: 'Payments',
                      icon: funds,
                      href: '#payments',
                    },
                  ],
                },
              ],
            },
          ]
          const menuSections = sections.map((section) => ({
            ...section,
            items: addCloseHandler(section.items),
          }))
          const navigationMenu = (
            <SidebarMenu.Data
              aria-label="Main navigation"
              sections={menuSections}
              selectedItem={selectedItem}
              onSelectedItemChange={setSelectedItem}
              openItemsStorageKey="sidebar-menu-responsive-example"
              scrollPositionStorageKey="sidebar-menu-responsive-example-scroll"
            />
          )

          return (
            <SidebarMenu.ResponsiveShell
              className={styles.responsiveShell}
              data-sidebar-menu-responsive-example
            >
              <SidebarMenu.ResponsiveAside
                compactWidth="4rem"
                expandedWidth="19rem"
                resizable
                resizeHandleProps={{ minWidth: 240, maxWidth: 480 }}
              >
                {navigationMenu}
              </SidebarMenu.ResponsiveAside>

              <main className={styles.responsiveMain}>
                <SidebarMenu.ResponsiveTrigger
                  controls="responsive-menu-drawer"
                  text="Menu"
                  bottom="medium"
                />
                <H2>{itemTitles[selectedItem]}</H2>
                <P>
                  The page content uses the space left by the responsive
                  navigation. Resize the viewport to see all three modes.
                </P>
              </main>

              <SidebarMenu.ResponsiveDrawer
                id="responsive-menu-drawer"
                dialogTitle="Menu"
              >
                {navigationMenu}
              </SidebarMenu.ResponsiveDrawer>
            </SidebarMenu.ResponsiveShell>
          )
        }

        return (
          <SidebarMenu.ResponsiveProvider
            drawerAt="medium"
            compactAt="large"
            compactOffset="10em"
          >
            <ResponsiveMenu />
          </SidebarMenu.ResponsiveProvider>
        )
      }}
    </ComponentBox>
  )
}
