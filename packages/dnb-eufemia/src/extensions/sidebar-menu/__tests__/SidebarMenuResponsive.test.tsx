import { fireEvent, render, waitFor } from '@testing-library/react'
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
    expect(document.querySelector('[aria-label="Open menu"]')).toBeNull()
    expect(document.body).not.toHaveTextContent('Mobile menu')
  })

  it('opens and closes the Drawer below the breakpoint', async () => {
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

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(document.body).toHaveTextContent('Mobile menu')

    fireEvent.click(document.querySelector('.dnb-modal__close-button'))
    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
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
