import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { StrictMode, createRef } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { setMedia } from 'mock-match-media'
import '../../../core/vitest/mockMatchMediaSetup'
import SidebarMenu from '../SidebarMenu'

describe('SidebarMenu.Toggle outside ResponsiveProvider', () => {
  it('shares desktop state with its targeted provider in StrictMode', () => {
    setMedia({ width: '100em' })
    const ref = createRef<HTMLButtonElement>()
    render(
      <StrictMode>
        <SidebarMenu.Toggle scopeId="navigation" ref={ref} />
        <SidebarMenu.ResponsiveProvider scopeId="navigation">
          <SidebarMenu.ResponsiveAside id="navigation-aside">
            Menu
          </SidebarMenu.ResponsiveAside>
        </SidebarMenu.ResponsiveProvider>
      </StrictMode>
    )
    const toggle = ref.current
    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    expect(toggle).toHaveAttribute('aria-controls', 'navigation-aside')
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAccessibleName('Lukk meny')
    expect(toggle).not.toHaveAttribute('scopeId')
    fireEvent.click(toggle)
    expect(inline).toHaveAttribute('inert')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(toggle)
    expect(inline).not.toHaveAttribute('inert')
    fireEvent.click(
      document.querySelector('.dnb-sidebar-menu-responsive-inline__toggle')
    )
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens the mobile Drawer and restores focus after Escape', async () => {
    setMedia({ width: '30em' })
    render(
      <>
        <SidebarMenu.Toggle scopeId="navigation" controls="mobile-menu" />
        <SidebarMenu.ResponsiveProvider scopeId="navigation">
          <SidebarMenu.ResponsiveDrawer id="mobile-menu">
            Menu
          </SidebarMenu.ResponsiveDrawer>
        </SidebarMenu.ResponsiveProvider>
      </>
    )
    const toggle = document.querySelector('.dnb-sidebar-menu-toggle')
    expect(toggle).toHaveAttribute('aria-haspopup', 'dialog')
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-menu')
    fireEvent.click(toggle)
    await waitFor(() =>
      expect(document.querySelector('[role="dialog"]')).toBeInTheDocument()
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() =>
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
    )
    expect(document.activeElement).toBe(toggle)
  })

  it('waits for its provider and disconnects when it unmounts or changes scope', () => {
    setMedia({ width: '100em' })
    const menu = (scopeId?: string) => (
      <>
        <SidebarMenu.Toggle scopeId="navigation" />
        {scopeId && (
          <SidebarMenu.ResponsiveProvider scopeId={scopeId}>
            <SidebarMenu.ResponsiveAside>Menu</SidebarMenu.ResponsiveAside>
          </SidebarMenu.ResponsiveProvider>
        )}
      </>
    )
    const { rerender } = render(menu())
    const toggle = document.querySelector('.dnb-sidebar-menu-toggle')
    expect(toggle).toBeDisabled()
    expect(toggle).not.toHaveAttribute('aria-expanded')
    rerender(menu('navigation'))
    expect(toggle).toBeEnabled()
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    rerender(menu('other'))
    expect(toggle).toBeDisabled()
    rerender(menu('navigation'))
    expect(toggle).toBeEnabled()
    rerender(menu())
    expect(toggle).toBeDisabled()
    rerender(menu('navigation'))
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })

  it('returns focus to the outside toggle that opened the Drawer', async () => {
    setMedia({ width: '30em' })
    render(
      <>
        <SidebarMenu.Toggle scopeId="navigation" text="First toggle" />
        <SidebarMenu.ResponsiveProvider scopeId="navigation">
          <SidebarMenu.ResponsiveDrawer>Menu</SidebarMenu.ResponsiveDrawer>
        </SidebarMenu.ResponsiveProvider>
        <SidebarMenu.Toggle scopeId="navigation" text="Second toggle" />
      </>
    )
    const toggle = document.querySelector('.dnb-sidebar-menu-toggle')
    fireEvent.click(toggle)
    await waitFor(() =>
      expect(document.querySelector('[role="dialog"]')).toBeInTheDocument()
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() =>
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
    )
    expect(document.activeElement).toBe(toggle)
  })

  it('connects across React roots and changes its target without affecting the previous menu', () => {
    setMedia({ width: '100em' })
    render(
      <>
        <SidebarMenu.ResponsiveProvider scopeId="first">
          <SidebarMenu.ResponsiveAside id="first-aside">
            First menu
          </SidebarMenu.ResponsiveAside>
        </SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveProvider scopeId="second">
          <SidebarMenu.ResponsiveAside id="second-aside">
            Second menu
          </SidebarMenu.ResponsiveAside>
        </SidebarMenu.ResponsiveProvider>
      </>
    )
    const { container, rerender } = render(
      <SidebarMenu.Toggle scopeId="first" />
    )
    const toggle = container.querySelector('.dnb-sidebar-menu-toggle')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    rerender(<SidebarMenu.Toggle scopeId="second" />)
    expect(toggle).toHaveAttribute('aria-controls', 'second-aside')
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    const inlines = document.querySelectorAll(
      '.dnb-sidebar-menu-responsive-inline'
    )
    expect(inlines[0]).toHaveAttribute('inert')
    expect(inlines[1]).toHaveAttribute('inert')
  })

  it('targets the requested provider instead of the surrounding provider', () => {
    setMedia({ width: '100em' })
    render(
      <>
        <SidebarMenu.ResponsiveProvider scopeId="first">
          <SidebarMenu.Toggle scopeId="second" />
          <SidebarMenu.ResponsiveAside id="first-aside">
            First menu
          </SidebarMenu.ResponsiveAside>
        </SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveProvider scopeId="second">
          <SidebarMenu.ResponsiveAside id="second-aside">
            Second menu
          </SidebarMenu.ResponsiveAside>
        </SidebarMenu.ResponsiveProvider>
      </>
    )
    const toggle = document.querySelector('.dnb-sidebar-menu-toggle')
    expect(toggle).toHaveAttribute('aria-controls', 'second-aside')
    fireEvent.click(toggle)
    const inlines = document.querySelectorAll(
      '.dnb-sidebar-menu-responsive-inline'
    )
    expect(inlines[0]).not.toHaveAttribute('inert')
    expect(inlines[1]).toHaveAttribute('inert')
  })

  it('preserves controlled state and lets consumers cancel toggling', () => {
    setMedia({ width: '100em' })
    const onChange = vi.fn()
    const menu = (collapsed: boolean, preventDefault = false) => (
      <>
        <SidebarMenu.Toggle
          scopeId="navigation"
          onClick={({ event }) => {
            if (preventDefault) {
              event.preventDefault()
            }
          }}
        />
        <SidebarMenu.ResponsiveProvider
          scopeId="navigation"
          inlineCollapsed={collapsed}
          onInlineCollapsedChange={onChange}
        >
          Menu
        </SidebarMenu.ResponsiveProvider>
      </>
    )
    const { rerender } = render(menu(false))
    const toggle = document.querySelector('.dnb-sidebar-menu-toggle')
    fireEvent.click(toggle)
    expect(onChange).toHaveBeenCalledWith(true)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    rerender(menu(true, true))
    onChange.mockClear()
    fireEvent.click(toggle)
    expect(onChange).not.toHaveBeenCalled()
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('hydrates without reading another mounted provider during server rendering', async () => {
    setMedia({ width: '100em' })
    const existing = render(
      <SidebarMenu.ResponsiveProvider scopeId="navigation">
        Menu
      </SidebarMenu.ResponsiveProvider>
    )
    const element = (
      <>
        <SidebarMenu.Toggle scopeId="navigation" />
        <SidebarMenu.ResponsiveProvider scopeId="navigation">
          Menu
        </SidebarMenu.ResponsiveProvider>
      </>
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    document.body.appendChild(container)
    const toggle = container.querySelector('.dnb-sidebar-menu-toggle')
    expect(toggle).toBeDisabled()
    expect(toggle).not.toHaveAttribute('aria-expanded')
    existing.unmount()
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot>
    await act(async () => {
      root = hydrateRoot(container, element, { onRecoverableError })
    })
    try {
      expect(onRecoverableError).not.toHaveBeenCalled()
      expect(toggle).toBeEnabled()
    } finally {
      await act(async () => root.unmount())
      container.remove()
    }
  })
})
