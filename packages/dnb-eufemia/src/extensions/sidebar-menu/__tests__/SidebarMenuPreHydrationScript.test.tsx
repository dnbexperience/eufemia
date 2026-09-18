import { render } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it } from 'vitest'
import {
  SidebarMenuPreHydrationScript,
  getPreHydrationScript,
} from '../SidebarMenuPreHydrationScript'
import SidebarMenu from '../SidebarMenu'

describe('SidebarMenuPreHydrationScript', () => {
  afterEach(() => {
    document
      .querySelectorAll('[data-sidebar-menu-pre-hydration]')
      .forEach((element) => element.remove())
    sessionStorage.clear()
  })

  it('renders a blocking script with a CSP nonce', () => {
    render(<SidebarMenuPreHydrationScript nonce="nonce-value" />)

    const script = document.querySelector('script')
    expect(script).toHaveAttribute('nonce', 'nonce-value')
    expect(script.textContent).toBe(getPreHydrationScript())
    expect(script.textContent).toContain('document.currentScript?.nonce')
    expect(script.textContent).toContain('style.nonce = nonce')
  })

  it('matches the hydrated accordion gap while restoring closed state', () => {
    sessionStorage.setItem(
      'navigation',
      JSON.stringify({ openItems: [], closedItems: ['about'] })
    )
    document.body.innerHTML = `
      <nav data-open-items-storage-key="navigation" data-open-items-storage="session">
        <li data-sidebar-menu-id="about">
          <button class="dnb-sidebar-menu__accordion__trigger"></button>
          <div class="dnb-height-animation"></div>
        </li>
      </nav>
    `

    Function(getPreHydrationScript())()

    const css = document.querySelector(
      '[data-sidebar-menu-pre-hydration]'
    ).textContent
    expect(
      document.querySelector('[data-sidebar-menu-pre-hydration]')
    ).toHaveAttribute('data-sidebar-menu-pre-hydration', 'navigation')
    expect(css).toContain('height:0')
  })

  it('makes stored open content visible before hydration', () => {
    sessionStorage.setItem(
      'navigation',
      JSON.stringify({ openItems: ['about'], closedItems: [] })
    )
    document.body.innerHTML = `
      <nav data-open-items-storage-key="navigation" data-open-items-storage="session">
        <li data-sidebar-menu-id="about">
          <button class="dnb-sidebar-menu__accordion__trigger"></button>
          <div class="dnb-height-animation dnb-height-animation--hidden"></div>
        </li>
      </nav>
    `

    Function(getPreHydrationScript())()

    expect(
      document.querySelector('[data-sidebar-menu-pre-hydration]')
        .textContent
    ).toContain('display:block')
  })

  it('closes server-rendered defaults when stored open items are empty', () => {
    document.body.innerHTML = renderToString(
      <SidebarMenu.Root
        openItemsStorageKey="navigation"
        defaultOpenItems={['products']}
      >
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Root>
    )
    sessionStorage.setItem('navigation', JSON.stringify([]))

    Function(getPreHydrationScript())()

    expect(
      document.querySelector('[data-sidebar-menu-pre-hydration]')
        ?.textContent
    ).toContain(
      '[data-sidebar-menu-id="products"] > .dnb-height-animation{height:0'
    )
  })

  it('closes omitted defaults without closing saved nested accordions', () => {
    document.body.innerHTML = renderToString(
      <SidebarMenu.Root
        openItemsStorageKey="navigation"
        defaultOpenItems={['products']}
      >
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Accordion id="cards" text="Cards">
            <SidebarMenu.Item id="debit" text="Debit" />
          </SidebarMenu.Accordion>
        </SidebarMenu.Accordion>
      </SidebarMenu.Root>
    )
    sessionStorage.setItem('navigation', JSON.stringify(['cards']))

    Function(getPreHydrationScript())()

    const css = document.querySelector(
      '[data-sidebar-menu-pre-hydration]'
    )?.textContent
    expect(css).toContain(
      '[data-sidebar-menu-id="products"] > .dnb-height-animation{height:0'
    )
    expect(css).toContain(
      '[data-sidebar-menu-id="cards"] > .dnb-height-animation{display:block'
    )
  })

  it('preserves selected paths and explicitly controlled accordions', () => {
    document.body.innerHTML = renderToString(
      <SidebarMenu.Root
        openItemsStorageKey="navigation"
        selectedItem="cards"
      >
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Accordion id="accounts" text="Accounts">
            <SidebarMenu.Item id="cards" text="Cards" />
          </SidebarMenu.Accordion>
        </SidebarMenu.Accordion>
        <SidebarMenu.Accordion id="controlled" text="Controlled" open>
          <SidebarMenu.Item id="settings" text="Settings" />
        </SidebarMenu.Accordion>
        <SidebarMenu.Accordion
          id="static"
          text="Static"
          collapsible={false}
        >
          <SidebarMenu.Item id="help" text="Help" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Root>
    )
    sessionStorage.setItem('navigation', JSON.stringify([]))

    Function(getPreHydrationScript())()

    expect(
      document.querySelector('[data-sidebar-menu-pre-hydration]')
    ).not.toBeInTheDocument()
  })

  it.each([null, {}, ['products', 1], { openItems: [] }])(
    'preserves defaults for malformed saved state %j',
    (stored) => {
      document.body.innerHTML = renderToString(
        <SidebarMenu.Root
          openItemsStorageKey="navigation"
          defaultOpenItems={['products']}
        >
          <SidebarMenu.Accordion id="products" text="Products">
            <SidebarMenu.Item id="cards" text="Cards" />
          </SidebarMenu.Accordion>
        </SidebarMenu.Root>
      )
      sessionStorage.setItem('navigation', JSON.stringify(stored))

      Function(getPreHydrationScript())()

      expect(
        document.querySelector('[data-sidebar-menu-pre-hydration]')
      ).not.toBeInTheDocument()
    }
  )

  it('preserves an exact stored scroll position before hydration', () => {
    sessionStorage.setItem('navigation-scroll', '120')
    document.body.innerHTML = `
      <div class="dnb-scroll-view">
        <nav data-scroll-position-storage-key="navigation-scroll" data-scroll-position-storage="session">
          <a aria-current="page">Current</a>
        </nav>
      </div>
    `
    const view = document.querySelector<HTMLElement>('.dnb-scroll-view')
    const active = document.querySelector<HTMLElement>(
      '[aria-current="page"]'
    )
    vi.spyOn(view, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 200,
      height: 200,
    } as DOMRect)
    vi.spyOn(active, 'getBoundingClientRect').mockReturnValue({
      top: 300,
      bottom: 340,
      height: 40,
    } as DOMRect)

    Function(getPreHydrationScript())()

    expect(view.scrollTop).toBe(120)
  })

  it('removes its temporary styles when the matching menu hydrates', () => {
    const style = document.createElement('style')
    style.setAttribute('data-sidebar-menu-pre-hydration', 'navigation')
    document.head.appendChild(style)

    render(
      <SidebarMenu.Root openItemsStorageKey="navigation">
        <SidebarMenu.Item id="home" text="Home" />
      </SidebarMenu.Root>
    )

    expect(style).not.toBeInTheDocument()
  })
})
