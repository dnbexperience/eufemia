import ComponentBox from '../../../../shared/tags/ComponentBox'
import SidebarMenu from '@dnb/eufemia/src/extensions/sidebar-menu'
import '@dnb/eufemia/src/extensions/sidebar-menu/style'
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
      <SidebarMenu.Container
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
        <SidebarMenu.Section id="personal" text="Personal" icon={person}>
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
            href="#products"
            onClick={(event) => event.preventDefault()}
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
      </SidebarMenu.Container>
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
        <SidebarMenu.Container
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
              active: true,
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
                  href: '#data-products',
                  onClick: (event) => event.preventDefault(),
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
