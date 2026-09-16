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
    expect(html).toContain('aria-label="Åpne meny"')
    expect(html).toContain('aria-controls="mobile-menu"')
    expect(html).toContain('aria-haspopup="dialog"')
    expect(html).not.toContain('aria-controls="inline-menu"')
    expect(html).not.toContain('data-sidebar-menu-responsive-visible')
  })

  it('renders scoped first-paint CSS for a custom breakpoint', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider
        breakpoint="50em"
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
      <SidebarMenu.ResponsiveProvider breakpoint="small">
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain('@media (max-width: 40em)')
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
      <SidebarMenu.ResponsiveProvider breakpoint={'800px' as '50em'}>
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).not.toContain('@media (max-width: 800px)')
  })

  it('uses a custom breakpoint after hydration', () => {
    setMedia({ width: '53.125em' })

    const { rerender } = render(
      <SidebarMenu.ResponsiveProvider breakpoint="50em">
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
      <SidebarMenu.ResponsiveProvider breakpoint="50em">
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
      <SidebarMenu.ResponsiveProvider breakpoint="50em">
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
