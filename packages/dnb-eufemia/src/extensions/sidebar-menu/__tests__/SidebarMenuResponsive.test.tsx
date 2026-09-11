import { fireEvent, render, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { setMedia } from 'mock-match-media'
import '../../../core/vitest/mockMatchMediaSetup'
import SidebarMenu from '../SidebarMenu'
import ScrollView from '../../../components/scroll-view/ScrollView'

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

  it('renders the trigger in server markup', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain('dnb-sidebar-menu-responsive-trigger')
    expect(html).toContain('dnb-sidebar-menu-responsive-inline')
    expect(html).toContain('aria-label="Åpne meny"')
    expect(html).not.toContain('data-sidebar-menu-responsive-visible')
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
            <SidebarMenu.Container scrollPositionStorageKey={storageKey}>
              <SidebarMenu.Item id="payments" text="Payments" />
            </SidebarMenu.Container>
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

    fireEvent.click(trigger)
    await waitFor(() => expect(drawer).not.toBeInTheDocument())
    fireEvent.click(trigger)

    await waitFor(() =>
      expect(
        document.querySelector<HTMLElement>('.dnb-drawer').scrollTop
      ).toBe(240)
    )

    sessionStorage.removeItem(storageKey)
  })
})
