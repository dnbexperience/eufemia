import { fireEvent, render, waitFor } from '@testing-library/react'
import { createRef } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { setMedia } from 'mock-match-media'
import '../../../core/vitest/mockMatchMediaSetup'
import SidebarMenu from '../SidebarMenu'
import ScrollView from '../../../components/scroll-view/ScrollView'
import Provider from '../../../shared/Provider'

describe('SidebarMenu responsive parts', () => {
  it('localizes its accessible labels', () => {
    setMedia({ width: '30em' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveDrawer>
          Mobile menu
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(
      document.querySelector('[aria-label="Åpne meny"]')
    ).toBeInTheDocument()
  })

  it('shows the inline content above the breakpoint', () => {
    setMedia({ width: '70em' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
        <SidebarMenu.ResponsiveDrawer>
          Mobile menu
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(document.body).toHaveTextContent('Inline menu')
    expect(
      document.querySelector('[aria-label="Åpne meny"]')
    ).toHaveAttribute('data-sidebar-menu-responsive-visible', 'false')
    expect(document.body).not.toHaveTextContent('Mobile menu')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('data-sidebar-menu-responsive-visible', 'true')
  })

  it('provides a ready-to-use responsive aside', () => {
    setMedia({ width: '100em' })

    render(
      <SidebarMenu.ResponsiveProvider compactAt="large">
        <SidebarMenu.ResponsiveTrigger controls="mobile-navigation" />
        <SidebarMenu.ResponsiveAside resizable>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )

    const aside = document.querySelector<HTMLElement>(
      '.dnb-sidebar-menu-responsive-aside'
    )
    const handle = document.querySelector(
      '.dnb-sidebar-menu-responsive-aside__resize-handle'
    )
    const trigger = document.querySelector(
      '.dnb-sidebar-menu-responsive-trigger'
    )

    expect(aside).toContainElement(
      document.querySelector(
        '.dnb-sidebar-menu-responsive-aside__scroll-view'
      )
    )
    expect(aside.id).toBeTruthy()
    expect(handle).toHaveAttribute('aria-controls', aside.id)
    expect(trigger).toHaveAttribute('aria-controls', aside.id)
  })

  it('provides a responsive application shell', () => {
    setMedia({ width: '70em' })

    const { rerender } = render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveShell>
          <aside>Menu</aside>
          <main>Content</main>
        </SidebarMenu.ResponsiveShell>
      </SidebarMenu.ResponsiveProvider>
    )

    const shell = document.querySelector(
      '.dnb-sidebar-menu-responsive-shell'
    )
    expect(shell).toHaveClass('dnb-sidebar-menu-responsive-shell')
    expect(shell).not.toHaveAttribute(
      'data-sidebar-menu-responsive-small-screen'
    )

    setMedia({ width: '30em' })
    rerender(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveShell>
          <aside>Menu</aside>
          <main>Content</main>
        </SidebarMenu.ResponsiveShell>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(shell).toHaveAttribute(
      'data-sidebar-menu-responsive-small-screen',
      'true'
    )
  })

  it('reports the width reserved by ResponsiveAside', () => {
    const originalResizeObserver = globalThis.ResizeObserver
    globalThis.ResizeObserver = class {
      observe() {}
      disconnect() {}
      unobserve() {}
    } as typeof ResizeObserver
    const getBoundingClientRect = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        return {
          width: this.classList.contains(
            'dnb-sidebar-menu-responsive-inline'
          )
            ? 320
            : 0,
        } as DOMRect
      })
    const onWidthChange = vi.fn()

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveAside onWidthChange={onWidthChange}>
          Menu
        </SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(onWidthChange).toHaveBeenCalledWith(320)
    getBoundingClientRect.mockRestore()
    globalThis.ResizeObserver = originalResizeObserver
  })

  it('reports ResponsiveAside width across breakpoint changes', () => {
    setMedia({ width: '100em' })
    const originalResizeObserver = globalThis.ResizeObserver
    const observe = vi.fn()
    globalThis.ResizeObserver = class {
      observe = observe
      disconnect() {}
      unobserve() {}
    } as typeof ResizeObserver
    const getBoundingClientRect = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue({ width: 320 } as DOMRect)
    const onWidthChange = vi.fn()

    const { rerender } = render(
      <SidebarMenu.ResponsiveProvider drawerAt="medium">
        <SidebarMenu.ResponsiveAside onWidthChange={onWidthChange}>
          Menu
        </SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(onWidthChange).toHaveBeenLastCalledWith(320)
    const initialObserveCount = observe.mock.calls.length

    setMedia({ width: '30em' })
    rerender(
      <SidebarMenu.ResponsiveProvider drawerAt="medium">
        <SidebarMenu.ResponsiveAside onWidthChange={onWidthChange}>
          Menu
        </SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )
    expect(onWidthChange).toHaveBeenLastCalledWith(0)

    setMedia({ width: '100em' })
    rerender(
      <SidebarMenu.ResponsiveProvider drawerAt="medium">
        <SidebarMenu.ResponsiveAside onWidthChange={onWidthChange}>
          Menu
        </SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )
    expect(onWidthChange).toHaveBeenLastCalledWith(320)
    expect(observe.mock.calls.length).toBeGreaterThan(initialObserveCount)
    expect(observe.mock.lastCall?.[0].isConnected).toBe(true)

    getBoundingClientRect.mockRestore()
    globalThis.ResizeObserver = originalResizeObserver
  })

  it('uses the compact mode between the content and Drawer thresholds', () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })

    const { rerender } = render(
      <SidebarMenu.ResponsiveProvider
        drawerAt="medium"
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('data-sidebar-menu-responsive-compact', 'true')
    expect(document.querySelector('.dnb-sidebar-menu')).toHaveClass(
      'dnb-sidebar-menu--compact'
    )

    setMedia({ width: '100em' })
    rerender(
      <SidebarMenu.ResponsiveProvider
        drawerAt="medium"
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('data-sidebar-menu-responsive-compact', 'false')
    expect(document.querySelector('.dnb-sidebar-menu')).not.toHaveClass(
      'dnb-sidebar-menu--compact'
    )
  })

  it('limits compact menu state to ResponsiveInline descendants', () => {
    setMedia({ width: '70em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Inline menu" />
        </SidebarMenu.ResponsiveInline>
        <SidebarMenu.Root aria-label="Page example" />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(
      document.querySelector('[aria-label="Inline menu"]')
    ).toHaveClass('dnb-sidebar-menu--compact')
    expect(
      document.querySelector('[aria-label="Page example"]')
    ).not.toHaveClass('dnb-sidebar-menu--compact')
  })

  it('toggles the compact menu on touch-only input', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )

    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-compact',
      'true'
    )
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-label', 'Åpne meny')
    expect(toggle).not.toHaveAttribute('title')
    const controlledContent = document.getElementById(
      toggle.getAttribute('aria-controls') ?? ''
    )
    expect(controlledContent).toHaveClass(
      'dnb-sidebar-menu-responsive-inline__body'
    )
    expect(controlledContent?.contains(toggle)).toBe(false)

    fireEvent.pointerEnter(inline, { pointerType: 'touch' })
    expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-expanded'
    )

    fireEvent.click(toggle)
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(toggle)
    expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-expanded'
    )
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('shows an Eufemia tooltip for the compact toggle', async () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>Menu</SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )

    expect(toggle).toHaveAttribute('aria-label', 'Åpne meny')
    expect(toggle).not.toHaveAttribute('title')
    fireEvent.focus(toggle)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip--active')
      ).toHaveTextContent('Åpne meny')
    })
    expect(document.querySelector('.dnb-tooltip__arrow')).toHaveClass(
      'dnb-tooltip__arrow__placement--right'
    )
    expect(toggle).not.toHaveAttribute('aria-describedby')

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-label', 'Lukk meny')
    expect(
      document.querySelector('.dnb-tooltip--active')
    ).not.toBeInTheDocument()
  })

  it('toggles a hover-expanded compact menu', () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )

    expect(inline).toHaveStyle({
      '--sidebar-menu-opacity': '0.55',
    })
    fireEvent.pointerEnter(inline, { pointerType: 'mouse' })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAttribute('aria-label', 'Lukk meny')
    expect(inline).toHaveStyle({
      '--sidebar-menu-opacity': '1',
    })

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })

  it('shows item tooltips while compact hover expansion is dismissed', async () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const action = document.querySelector(
      '.dnb-sidebar-menu__item__action'
    )
    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )

    fireEvent.pointerEnter(inline, { pointerType: 'mouse' })
    fireEvent.click(toggle)
    fireEvent.pointerMove(action, { pointerType: 'mouse' })

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip--active')
      ).toHaveTextContent('Home')
    })
    expect(action).not.toHaveAttribute('aria-describedby')
  })

  it('does not show item tooltips outside compact mode', () => {
    setMedia({ width: '100em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider compactAt="large">
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    fireEvent.pointerMove(
      document.querySelector('.dnb-sidebar-menu__item__action'),
      { pointerType: 'mouse' }
    )

    expect(
      document.querySelector('.dnb-tooltip--active')
    ).not.toBeInTheDocument()
  })

  it('does not expand on hover without compact mode', () => {
    setMedia({ width: '100em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveInline>Menu</SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    fireEvent.pointerEnter(inline, { pointerType: 'mouse' })

    expect(inline).not.toHaveClass(
      'dnb-sidebar-menu-responsive-inline--expanded'
    )
    expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-expanded'
    )
  })

  it('does not show a stale tooltip while an expanded item closes the menu', async () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const action = document.querySelector(
      '.dnb-sidebar-menu__item__action'
    )

    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )

    fireEvent.pointerEnter(inline, { pointerType: 'mouse' })
    fireEvent.click(toggle)
    fireEvent.pointerMove(action, { pointerType: 'mouse' })
    fireEvent.click(toggle)
    fireEvent.click(action)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip--active')
      ).not.toBeInTheDocument()
    })
  })

  it('closes a toggled compact menu on outside touch', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>Menu</SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )
    fireEvent.click(toggle)
    fireEvent.pointerDown(document.body, { pointerType: 'touch' })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes a toggled compact menu with Escape', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>Menu</SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )
    fireEvent.click(toggle)
    fireEvent.keyDown(inline, { key: 'Escape' })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('expands the compact menu for keyboard focus', () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })
    document.documentElement.dataset.whatinput = 'keyboard'

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const action = document.querySelector(
      '.dnb-sidebar-menu__item__action'
    )
    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )
    fireEvent.focus(action)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    document.documentElement.removeAttribute('data-whatinput')
  })

  it('opens a closed accordion when expanding the compact menu', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Accordion id="products" text="Products">
              <SidebarMenu.Item id="accounts" text="Accounts" />
            </SidebarMenu.Accordion>
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const accordion = document.querySelector(
      '.dnb-sidebar-menu__accordion__trigger'
    )

    expect(accordion).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(accordion)
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
    expect(accordion).toHaveAttribute('aria-expanded', 'true')
  })

  it('expands the compact menu and opens its section dropdown', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Section id="personal" text="Personal">
              <SidebarMenu.Item id="home" text="Home" />
            </SidebarMenu.Section>
            <SidebarMenu.Section id="business" text="Business">
              <SidebarMenu.Item id="payments" text="Payments" />
            </SidebarMenu.Section>
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const sectionTrigger = document.querySelector(
      '.dnb-sidebar-menu__sections .dnb-dropdown__trigger'
    )

    expect(sectionTrigger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(sectionTrigger)
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
    expect(sectionTrigger).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(
      document.querySelector('.dnb-sidebar-menu-responsive-inline__toggle')
    )
    expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-expanded'
    )
    expect(sectionTrigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('keeps an open accordion open when expanding the compact menu', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root
            aria-label="Navigation"
            defaultOpenItems={['products']}
          >
            <SidebarMenu.Accordion id="products" text="Products">
              <SidebarMenu.Item id="accounts" text="Accounts" />
            </SidebarMenu.Accordion>
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const accordion = document.querySelector(
      '.dnb-sidebar-menu__accordion__trigger'
    )

    expect(accordion).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(accordion)
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
    expect(accordion).toHaveAttribute('aria-expanded', 'true')
  })

  it('does not intercept a linked compact accordion', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })
    const onClick = vi.fn()

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Accordion
              id="products"
              text="Products"
              href="#products"
              onClick={onClick}
            >
              <SidebarMenu.Item id="accounts" text="Accounts" />
            </SidebarMenu.Accordion>
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    fireEvent.click(
      document.querySelector('.dnb-sidebar-menu__accordion__trigger')
    )

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).not.toHaveAttribute('data-sidebar-menu-responsive-expanded')
  })

  it('collapses the expanded compact menu after an item activates', () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
            <SidebarMenu.Accordion id="products" text="Products">
              <SidebarMenu.Item id="accounts" text="Accounts" />
            </SidebarMenu.Accordion>
            <SidebarMenu.Item id="settings" text="Settings" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const actions = document.querySelectorAll(
      '.dnb-sidebar-menu__item__action'
    )
    const accordion = document.querySelector(
      '.dnb-sidebar-menu__accordion__trigger'
    )
    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )

    fireEvent.mouseEnter(inline)
    fireEvent.click(toggle)
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
    fireEvent.click(accordion)
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )

    fireEvent.click(actions[0])
    expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-expanded'
    )
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('collapses compact mode after client-side navigation', () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item
              id="home"
              text="Home"
              href="/home"
              onClick={(event) => event.preventDefault()}
            />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )
    fireEvent.click(trigger)
    fireEvent.click(
      document.querySelector('.dnb-sidebar-menu__item__action')
    )

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders first-paint compact layout CSS', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="10em"
      >
        <SidebarMenu.ResponsiveInline
          compactWidth="5rem"
          expandedWidth="18rem"
        >
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).not.toContain('(hover:hover) and (pointer:fine)')
    expect(html).toContain('(max-width:82em)')
    expect(html).toContain('--sidebar-menu-compact-width:max(4rem, 5rem)')
    expect(html).toContain('--sidebar-menu-default-expanded-width:18rem')
    expect(html).toContain('dnb-sidebar-menu-responsive-inline__content')
    expect(html).toContain(
      'dnb-sidebar-menu-responsive-inline__toggle-island{display:inline-flex}'
    )
    expect(html).toContain(
      '.dnb-sidebar-menu-responsive-inline__content:dir(rtl)'
    )
    expect(html).toContain(
      'margin-inline-start:calc(.375rem + var(--sidebar-menu-compact-offset))'
    )
    expect(html).toContain(
      '.dnb-sidebar-menu__badge:not(:has(.dnb-badge--variant-notification)){display:none}'
    )
    expect(html).toContain(
      '.dnb-sidebar-menu__sections.dnb-dropdown{padding-inline:.25rem}'
    )
    expect(html).toContain(
      ':is(.dnb-sidebar-menu__group__title,.dnb-sidebar-menu__header){width:4rem;white-space:nowrap;opacity:.8'
    )
    expect(html).toContain('padding:4rem 0 2.5rem')
  })

  it('uses a stable first-paint CSS scope when provided', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider
        scopeId="application-navigation"
        compactAt="large"
      >
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain(
      'data-sidebar-menu-responsive-provider="application-navigation"'
    )
    expect(html).toContain(
      'data-sidebar-menu-responsive-scope="application-navigation"'
    )
  })

  it('restores a collapsed inline menu from the desktop trigger', () => {
    setMedia({ width: '70em' })

    function CollapseButton() {
      const { collapseInline } = SidebarMenu.useResponsive()
      return <button onClick={collapseInline}>Collapse</button>
    }

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger
          controls="mobile-menu"
          inlineControls="inline-menu"
        />
        <CollapseButton />
        <SidebarMenu.ResponsiveInline>
          <nav id="inline-menu">Inline menu</nav>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '.dnb-sidebar-menu-responsive-trigger'
    ) as HTMLButtonElement
    fireEvent.click(document.querySelector('button:not(.dnb-button)'))

    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('inert')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('aria-hidden', 'true')
    expect(trigger).toHaveAttribute(
      'data-sidebar-menu-responsive-visible',
      'true'
    )
    expect(trigger).toHaveAttribute(
      'data-sidebar-menu-responsive-animate-hamburger',
      'true'
    )
    expect(trigger).toHaveAttribute('aria-controls', 'inline-menu')
    expect(trigger).not.toHaveAttribute('aria-haspopup')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(trigger)

    expect(document.body).toHaveTextContent('Inline menu')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).not.toHaveAttribute('inert')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).not.toHaveAttribute('aria-hidden')
    expect(trigger).toHaveAttribute(
      'data-sidebar-menu-responsive-visible',
      'false'
    )
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(trigger).not.toHaveAttribute(
      'data-sidebar-menu-responsive-animate-hamburger'
    )
  })

  it('restores a dragged-away inline menu at its default width', async () => {
    setMedia({ width: '70em' })
    const layoutRef = createRef<HTMLDivElement>()
    const targetRef = createRef<HTMLElement>()
    function ResizeHandle() {
      const { collapseInline } = SidebarMenu.useResponsive()
      return (
        <SidebarMenu.ResizeHandle
          targetRef={targetRef}
          scopeSelector=".layout"
          cssProperty="--sidebar-width"
          onCollapse={collapseInline}
        />
      )
    }

    render(
      <div ref={layoutRef} className="layout">
        <SidebarMenu.ResponsiveProvider
          onInlineCollapsedChange={(collapsed) => {
            layoutRef.current?.toggleAttribute('data-collapsed', collapsed)
          }}
        >
          <SidebarMenu.ResponsiveTrigger inlineControls="inline-menu" />
          <SidebarMenu.ResponsiveInline>
            <aside
              id="inline-menu"
              ref={(element) => {
                targetRef.current = element
                if (element) {
                  element.getBoundingClientRect = () => {
                    const writtenWidth = Number.parseFloat(
                      layoutRef.current.style.getPropertyValue(
                        '--sidebar-width'
                      )
                    )
                    return {
                      width: layoutRef.current.hasAttribute(
                        'data-collapsed'
                      )
                        ? 0
                        : writtenWidth || 320,
                    } as DOMRect
                  }
                }
              }}
            >
              Inline menu
              <ResizeHandle />
            </aside>
          </SidebarMenu.ResponsiveInline>
        </SidebarMenu.ResponsiveProvider>
      </div>
    )

    const handle = document.querySelector(
      '.dnb-sidebar-menu-resize-handle'
    )
    fireEvent.pointerDown(handle, { button: 0, clientX: 320 })
    fireEvent.pointerMove(window, { clientX: 119 })

    const trigger = document.querySelector(
      '.dnb-sidebar-menu-responsive-trigger'
    )
    fireEvent.click(trigger)

    await waitFor(() =>
      expect(
        layoutRef.current.style.getPropertyValue('--sidebar-width')
      ).toBe('')
    )
    await waitFor(() =>
      expect(handle).toHaveAttribute('aria-valuenow', '320')
    )
  })

  it('renders the trigger in server markup', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger
          controls="mobile-menu"
          inlineControls="inline-menu"
        />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain('dnb-sidebar-menu-responsive-trigger')
    expect(html).toContain('dnb-sidebar-menu-responsive-inline')
    expect(html).not.toContain(
      'dnb-sidebar-menu-responsive-inline__content'
    )
    expect(html).toContain('aria-label="Åpne meny"')
    expect(html).toContain('aria-controls="mobile-menu"')
    expect(html).toContain('aria-haspopup="dialog"')
    expect(html).not.toContain('aria-controls="inline-menu"')
    expect(html).not.toContain('data-sidebar-menu-responsive-visible')
  })

  it('renders scoped first-paint CSS for a custom breakpoint', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider
        drawerAt="50em"
        styleNonce="nonce-value"
      >
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain('@media (max-width: 50em)')
    expect(html).toContain('@media (min-width: 50.00625em)')
    expect(html).toContain('data-sidebar-menu-responsive-scope')
    expect(html).toContain('nonce="nonce-value"')
    expect(html).toContain(':not([data-sidebar-menu-responsive-visible])')
    expect(html).toContain('{display:inline-flex}')
    expect(html).toContain('{display:none}')
    expect(html).toContain('{display:contents}')
  })

  it('resolves named custom breakpoints for the first paint', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider drawerAt="small">
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain('@media (max-width: 40em)')
  })

  it('supports the deprecated breakpoint prop', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider breakpoint="small">
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain('@media (max-width: 40em)')
  })

  it('prefers drawerAt over the deprecated breakpoint prop', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider drawerAt="50em" breakpoint="small">
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain('@media (max-width: 50em)')
    expect(html).not.toContain('@media (max-width: 40em)')
  })

  it('resolves Provider breakpoint overrides for the first paint', () => {
    const html = renderToString(
      <Provider breakpoints={{ medium: '50em' }}>
        <SidebarMenu.ResponsiveProvider>
          <SidebarMenu.ResponsiveTrigger />
        </SidebarMenu.ResponsiveProvider>
      </Provider>
    )

    expect(html).toContain('@media (max-width: 50em)')
  })

  it('uses the bundled medium first-paint CSS by default', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).not.toContain('@media (max-width: 60em)')
  })

  it('falls back to medium for unsupported runtime values', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider drawerAt={'800px' as '50em'}>
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).not.toContain('@media (max-width: 800px)')
  })

  it('uses a custom breakpoint after hydration', () => {
    setMedia({ width: '53.125em' })

    const { rerender } = render(
      <SidebarMenu.ResponsiveProvider drawerAt="50em">
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-trigger')
    ).toHaveAttribute('data-sidebar-menu-responsive-visible', 'false')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('data-sidebar-menu-responsive-visible', 'true')

    setMedia({ width: '43.75em' })
    rerender(
      <SidebarMenu.ResponsiveProvider drawerAt="50em">
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-trigger')
    ).toHaveAttribute('data-sidebar-menu-responsive-visible', 'true')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).not.toBeInTheDocument()
  })

  it('hydrates custom breakpoint markup with a stable scope', async () => {
    setMedia({ width: '53.125em' })
    const element = (
      <SidebarMenu.ResponsiveProvider drawerAt="50em">
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    document.body.appendChild(container)
    const scope = container
      .querySelector('[data-sidebar-menu-responsive-scope]')
      .getAttribute('data-sidebar-menu-responsive-scope')
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)

    const root = hydrateRoot(container, element)

    await waitFor(() =>
      expect(
        container.querySelector('.dnb-sidebar-menu-responsive-inline')
      ).toHaveAttribute('data-sidebar-menu-responsive-visible', 'true')
    )
    expect(
      container
        .querySelector('[data-sidebar-menu-responsive-scope]')
        .getAttribute('data-sidebar-menu-responsive-scope')
    ).toBe(scope)
    expect(consoleError).not.toHaveBeenCalled()

    root.unmount()
    consoleError.mockRestore()
    container.remove()
  })

  it('returns focus to the trigger when the Drawer closes with Escape', async () => {
    setMedia({ width: '30em' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger controls="mobile-menu" />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
        <SidebarMenu.ResponsiveDrawer id="mobile-menu">
          Mobile menu
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '[aria-controls="mobile-menu"]'
    ) as HTMLButtonElement

    expect(trigger).toHaveAttribute(
      'data-sidebar-menu-responsive-visible',
      'true'
    )
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).not.toBeInTheDocument()
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(document.body).toHaveTextContent('Mobile menu')
    expect(document.getElementById('mobile-menu')).toBeInTheDocument()

    fireEvent.keyDown(document.querySelector('.dnb-drawer'), {
      key: 'Escape',
    })
    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    expect(document.activeElement).toBe(trigger)
  })

  it('keeps the hamburger icon while the Drawer is open', () => {
    setMedia({ width: '30em' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '[aria-label="Åpne meny"]'
    ) as HTMLButtonElement
    expect(
      trigger.querySelector('.dnb-icon--transition-fallback')
    ).toBeNull()
    expect(trigger.querySelectorAll('svg')).toHaveLength(1)

    fireEvent.click(trigger)

    expect(
      trigger.querySelector('.dnb-icon--transition-fallback')
    ).toBeNull()
    expect(trigger.querySelectorAll('svg')).toHaveLength(1)
  })

  it('calls the latest onOpenChange callback', () => {
    setMedia({ width: '30em' })
    const calls: string[] = []
    const renderProvider = (route: string) => (
      <SidebarMenu.ResponsiveProvider
        onOpenChange={(open) => calls.push(route + ':' + open)}
      >
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )
    const { rerender } = render(renderProvider('a'))
    const trigger = document.querySelector(
      '[aria-label="Åpne meny"]'
    ) as HTMLButtonElement

    rerender(renderProvider('b'))
    fireEvent.click(trigger)

    expect(calls).toEqual(['b:true'])
  })

  it('calls a supplied trigger onClick before toggling', () => {
    setMedia({ width: '30em' })
    const onClick = vi.fn()

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger onClick={onClick} />
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '[aria-label="Åpne meny"]'
    ) as HTMLButtonElement
    fireEvent.click(trigger)

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('does not toggle when the supplied onClick prevents default', () => {
    setMedia({ width: '30em' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger
          onClick={({ event }) => event.preventDefault()}
        />
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '[aria-label="Åpne meny"]'
    ) as HTMLButtonElement
    fireEvent.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('keeps the useResponsive result stable', () => {
    setMedia({ width: '30em' })
    const values: Array<ReturnType<typeof SidebarMenu.useResponsive>> = []

    function Consumer() {
      values.push(SidebarMenu.useResponsive())
      return null
    }

    const { rerender } = render(
      <SidebarMenu.ResponsiveProvider>
        <Consumer />
      </SidebarMenu.ResponsiveProvider>
    )
    const value = values.at(-1)

    rerender(
      <SidebarMenu.ResponsiveProvider>
        <Consumer />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(values.at(-1)).toBe(value)
  })

  it('closes once without focusing the hidden trigger above breakpoint', async () => {
    setMedia({ width: '30em' })
    const onOpenChange = vi.fn()

    render(
      <SidebarMenu.ResponsiveProvider onOpenChange={onOpenChange}>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveDrawer>
          Mobile menu
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '[aria-label="Åpne meny"]'
    ) as HTMLButtonElement
    fireEvent.click(trigger)
    setMedia({ width: '70em' })

    await waitFor(() =>
      expect(onOpenChange.mock.calls).toEqual([[true], [false]])
    )
    expect(document.activeElement).not.toBe(trigger)
  })

  it('places the Drawer close button on the left', async () => {
    setMedia({ width: '30em' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveDrawer>
          Mobile menu
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )

    fireEvent.click(document.querySelector('[aria-label="Åpne meny"]'))

    await waitFor(() =>
      expect(
        document.querySelector(
          '.dnb-drawer.dnb-sidebar-menu-responsive-drawer'
        )
      ).toBeInTheDocument()
    )
  })

  it('persists the Drawer scroll position instead of a nested ScrollView', async () => {
    setMedia({ width: '30em' })
    const storageKey = 'sidebar-menu-responsive-scroll-position'
    sessionStorage.setItem(storageKey, '120')

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveDrawer>
          <ScrollView>
            <SidebarMenu.Root scrollPositionStorageKey={storageKey}>
              <SidebarMenu.Item id="payments" text="Payments" />
            </SidebarMenu.Root>
          </ScrollView>
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '[aria-label="Åpne meny"]'
    ) as HTMLButtonElement
    fireEvent.click(trigger)

    await waitFor(() =>
      expect(document.querySelector('.dnb-drawer')).toBeInTheDocument()
    )
    const drawer = document.querySelector<HTMLElement>('.dnb-drawer')
    const innerScrollView =
      drawer.querySelector<HTMLElement>('.dnb-scroll-view')

    expect(drawer.scrollTop).toBe(120)
    expect(innerScrollView.scrollTop).toBe(0)

    drawer.scrollTop = 240
    fireEvent.scroll(drawer)
    expect(sessionStorage.getItem(storageKey)).toBe('240')

    drawer.classList.add('dnb-drawer--hide')
    drawer.scrollTop = 0
    fireEvent.scroll(drawer)
    expect(sessionStorage.getItem(storageKey)).toBe('240')
    drawer.classList.remove('dnb-drawer--hide')

    fireEvent.click(trigger)
    drawer.scrollTop = 0
    fireEvent.scroll(drawer)
    await waitFor(() => expect(drawer).not.toBeInTheDocument())
    expect(sessionStorage.getItem(storageKey)).toBe('240')
    fireEvent.click(trigger)

    await waitFor(() =>
      expect(
        document.querySelector<HTMLElement>('.dnb-drawer').scrollTop
      ).toBe(240)
    )

    sessionStorage.removeItem(storageKey)
  })
})
