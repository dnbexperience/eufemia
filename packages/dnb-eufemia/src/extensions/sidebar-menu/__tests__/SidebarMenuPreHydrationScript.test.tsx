import { render } from '@testing-library/react'
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
          <div class="dnb-height-animation">
            <div class="dnb-height-animation__compensate-for-gap"></div>
          </div>
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
    expect(css).toContain(
      'margin-top:calc(var(--sidebar-menu-accordion-gap,.5rem)*-1)'
    )
    expect(css).toContain(
      'margin-top:var(--sidebar-menu-accordion-gap,.5rem)'
    )
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
