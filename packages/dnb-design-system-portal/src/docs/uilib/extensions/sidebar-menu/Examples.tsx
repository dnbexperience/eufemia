import ComponentBox from '../../../../shared/tags/ComponentBox'
import * as SidebarMenu from '@dnb/eufemia/src/extensions/sidebar-menu'
import '@dnb/eufemia/src/extensions/sidebar-menu/style'
import styles from './Examples.module.scss'
import { ScrollView } from '@dnb/eufemia/src/fragments'
import {
  account,
  card,
  cog,
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
          <SidebarMenu.Header text="Everyday banking" />
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
          <SidebarMenu.Item id="disabled" text="Disabled item" disabled />
        </SidebarMenu.Section>

        <SidebarMenu.Section
          id="business"
          text="Business"
          icon={office_buildings}
          badge={9}
          badgeProps={{ label: 'Notifications:' }}
        >
          <SidebarMenu.Header text="Company" />
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
    <ComponentBox hideCode scope={{ account, card, cog, home, styles }}>
      {() => {
        const ResponsiveMenu = () => {
          const items = [
            { id: 'home', text: 'Home', icon: home, href: '#home' },
            {
              id: 'products',
              text: 'Products',
              icon: card,
              items: [
                {
                  id: 'accounts',
                  text: 'Accounts',
                  icon: account,
                  href: '#accounts',
                },
                { id: 'cards', text: 'Cards', icon: card, href: '#cards' },
                {
                  id: 'statements',
                  text: 'Statements',
                  href: '#statements',
                },
              ],
            },
            {
              id: 'settings',
              text: 'Settings',
              icon: cog,
              href: '#settings',
              dividerBefore: true,
            },
          ]
          const { close, isSmallScreen } = SidebarMenu.useResponsive()
          const menuItems = items.map((item) => ({
            ...item,
            onClick: item.href ? close : undefined,
            items: item.items?.map((item) => ({
              ...item,
              onClick: close,
            })),
          }))

          return (
            <div
              className={styles.responsiveShell}
              data-sidebar-menu-responsive-example
              data-small-screen={isSmallScreen}
            >
              <SidebarMenu.ResponsiveAside
                compactWidth="4rem"
                expandedWidth="18rem"
                resizable
                resizeHandleProps={{ minWidth: 240, maxWidth: 480 }}
              >
                <SidebarMenu.Data
                  aria-label="Main navigation"
                  data={menuItems}
                  defaultOpenItems={['products']}
                  openItemsStorageKey="sidebar-menu-responsive-example"
                  scrollPositionStorageKey="sidebar-menu-responsive-example-scroll"
                />
              </SidebarMenu.ResponsiveAside>

              <main className={styles.responsiveMain}>
                <SidebarMenu.ResponsiveTrigger
                  controls="responsive-menu-drawer"
                  text="Menu"
                  bottom="medium"
                />
                <h2>Account overview</h2>
                <p>
                  The page content uses the space left by the responsive
                  navigation. Resize the viewport to see all three modes.
                </p>
              </main>

              <SidebarMenu.ResponsiveDrawer
                id="responsive-menu-drawer"
                dialogTitle="Menu"
              >
                <SidebarMenu.Data
                  aria-label="Main navigation"
                  data={menuItems}
                  openItemsStorageKey="sidebar-menu-responsive-example"
                  scrollPositionStorageKey="sidebar-menu-responsive-example-scroll"
                />
              </SidebarMenu.ResponsiveDrawer>
            </div>
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
