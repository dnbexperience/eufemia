import { fireEvent, render, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { setMedia } from 'mock-match-media'
import '../../../core/vitest/mockMatchMediaSetup'
import SidebarMenu from '../SidebarMenu'

describe('SidebarMenu responsive parts', () => {
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
      document.querySelector('[aria-label="Open menu"]')
    ).toHaveAttribute('data-sidebar-menu-responsive-visible', 'false')
    expect(document.body).not.toHaveTextContent('Mobile menu')
  })

  it('renders the trigger in server markup', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain('dnb-sidebar-menu-responsive-trigger')
    expect(html).toContain('aria-label="Open menu"')
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
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(document.body).toHaveTextContent('Mobile menu')

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
      '[aria-label="Open menu"]'
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

    fireEvent.click(document.querySelector('[aria-label="Open menu"]'))

    await waitFor(() =>
      expect(
        document.querySelector(
          '.dnb-drawer.dnb-sidebar-menu-responsive-drawer'
        )
      ).toBeInTheDocument()
    )
  })
})
