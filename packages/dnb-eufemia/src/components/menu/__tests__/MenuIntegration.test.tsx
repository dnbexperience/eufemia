import React, { act } from 'react'
import { render, fireEvent } from '@testing-library/react'
import Menu from '../Menu'

// NO Popover mock — tests use the real Popover for integration testing

describe('Menu integration with real Popover', () => {
  it('navigates up from last item and skips disabled/non-action items', () => {
    jest.useFakeTimers()

    render(
      <Menu.Root>
        <Menu.Button text="Edit" icon="chevron_down" />
        <Menu.List>
          <Menu.Header text="Clipboard" />
          <Menu.Action text="Cut" />
          <Menu.Action text="Copy" />
          <Menu.Action text="Paste" disabled />
          <Menu.Divider />
          <Menu.Header text="Selection" />
          <Menu.Action text="Select All" />
        </Menu.List>
      </Menu.Root>,
    )

    const button = document.querySelector('.dnb-button') as HTMLElement
    fireEvent.click(button)
    act(() => {
      jest.advanceTimersByTime(100)
    })

    const firstItem = Array.from(
      document.querySelectorAll('[role="menuitem"]'),
    ).find((item) => item.textContent?.includes('Cut')) as HTMLElement
    firstItem.focus()

    fireEvent.keyDown(firstItem, { key: 'Home' }) // Ensure activeIndex starts at Cut
    fireEvent.keyDown(document.activeElement as HTMLElement, {
      key: 'ArrowDown',
    }) // Copy
    fireEvent.keyDown(document.activeElement as HTMLElement, {
      key: 'ArrowDown',
    }) // Skip disabled Paste -> Select All
    expect(document.activeElement?.textContent).toContain('Select All')

    fireEvent.keyDown(document.activeElement as HTMLElement, {
      key: 'ArrowUp',
    }) // Skip disabled Paste and separators/headers -> Copy
    expect(document.activeElement?.textContent).toContain('Copy')

    jest.useRealTimers()
  })

  it('opens nested menu on ArrowRight without closing parent', async () => {
    jest.useFakeTimers()

    const parentOnOpenChange = jest.fn()
    const nestedOnOpenChange = jest.fn()

    render(
      <Menu.Root onOpenChange={parentOnOpenChange}>
        <Menu.Button text="File" icon="chevron_down" />
        <Menu.List>
          <Menu.Action text="New" />
          <Menu.Root placement="right" onOpenChange={nestedOnOpenChange}>
            <Menu.Action text="Export as" />
            <Menu.List>
              <Menu.Action text="PDF" />
              <Menu.Action text="PNG" />
            </Menu.List>
          </Menu.Root>
          <Menu.Action text="Close" />
        </Menu.List>
      </Menu.Root>,
    )

    // Open the parent menu by clicking the button
    const button = document.querySelector('.dnb-button') as HTMLElement
    fireEvent.click(button)

    // Wait for open
    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(parentOnOpenChange).toHaveBeenCalledWith(true)
    parentOnOpenChange.mockClear()

    // Find all menu items
    const items = document.querySelectorAll('[role="menuitem"]')
    expect(items.length).toBeGreaterThanOrEqual(2)

    // Focus the "Export as" sub-menu trigger
    const exportTrigger = Array.from(items).find((item) =>
      item.textContent?.includes('Export as'),
    ) as HTMLElement
    expect(exportTrigger).toBeTruthy()
    exportTrigger.focus()

    // Press ArrowRight to open sub-menu
    fireEvent.keyDown(exportTrigger, { key: 'ArrowRight' })
    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'keyboard',
    )

    act(() => {
      jest.advanceTimersByTime(100)
    })

    // After the sub-menu opens and focuses its content,
    // check what element has focus
    const focusedAfterOpen = document.activeElement

    // In a real browser, keyup fires on the currently focused element.
    // If focus moved to the sub-menu content, keyup fires THERE,
    // which is outside the parent Popover's content → parent closes.
    if (focusedAfterOpen && focusedAfterOpen !== exportTrigger) {
      // Simulate keyup on the newly focused element
      focusedAfterOpen.dispatchEvent(
        new KeyboardEvent('keyup', {
          key: 'ArrowRight',
          bubbles: true,
        }),
      )
    } else {
      exportTrigger.dispatchEvent(
        new KeyboardEvent('keyup', {
          key: 'ArrowRight',
          bubbles: true,
        }),
      )
    }

    act(() => {
      jest.advanceTimersByTime(100)
    })

    // Sub-menu should have opened
    expect(nestedOnOpenChange).toHaveBeenCalledWith(true)

    // Parent should NOT have closed
    expect(parentOnOpenChange).not.toHaveBeenCalledWith(false)

    jest.useRealTimers()
  })

  it('parent menu stays open when sub-menu opens via click', () => {
    jest.useFakeTimers()

    const parentOnOpenChange = jest.fn()
    const nestedOnOpenChange = jest.fn()

    render(
      <Menu.Root onOpenChange={parentOnOpenChange}>
        <Menu.Button text="File" icon="chevron_down" />
        <Menu.List>
          <Menu.Action text="New" />
          <Menu.Root placement="right" onOpenChange={nestedOnOpenChange}>
            <Menu.Action text="Export as" />
            <Menu.List>
              <Menu.Action text="PDF" />
            </Menu.List>
          </Menu.Root>
        </Menu.List>
      </Menu.Root>,
    )

    // Open parent
    const button = document.querySelector('.dnb-button') as HTMLElement
    fireEvent.click(button)
    act(() => {
      jest.advanceTimersByTime(100)
    })
    parentOnOpenChange.mockClear()

    // Click the "Export as" trigger
    const exportTrigger = Array.from(
      document.querySelectorAll('[role="menuitem"]'),
    ).find((el) => el.textContent?.includes('Export as')) as HTMLElement
    fireEvent.click(exportTrigger)
    act(() => {
      jest.advanceTimersByTime(100)
    })

    // Nested should have opened
    expect(nestedOnOpenChange).toHaveBeenCalledWith(true)

    // Parent should NOT have closed
    expect(parentOnOpenChange).not.toHaveBeenCalledWith(false)

    jest.useRealTimers()
  })

  it('focuses first action item instead of ul when nested menu opens', () => {
    jest.useFakeTimers()

    render(
      <Menu.Root>
        <Menu.Button text="File" icon="chevron_down" />
        <Menu.List>
          <Menu.Action text="New" />
          <Menu.Root placement="right">
            <Menu.Action text="Export as" />
            <Menu.List>
              <Menu.Action text="PDF" />
              <Menu.Action text="PNG" />
            </Menu.List>
          </Menu.Root>
        </Menu.List>
      </Menu.Root>,
    )

    // Open parent
    const button = document.querySelector('.dnb-button') as HTMLElement
    fireEvent.click(button)
    act(() => {
      jest.advanceTimersByTime(100)
    })

    // Click "Export as" to open nested menu
    const exportTrigger = Array.from(
      document.querySelectorAll('[role="menuitem"]'),
    ).find((el) => el.textContent?.includes('Export as')) as HTMLElement
    fireEvent.click(exportTrigger)
    act(() => {
      jest.advanceTimersByTime(100)
    })

    // The focused element should be the first action item, not the <ul>
    expect(document.activeElement?.tagName).not.toBe('UL')
    expect(document.activeElement?.getAttribute('role')).toBe('menuitem')
    expect(document.activeElement?.textContent).toContain('PDF')

    jest.useRealTimers()
  })

  it('verifies nested trigger is inside parent popover content', () => {
    jest.useFakeTimers()

    render(
      <Menu.Root>
        <Menu.Button text="File" icon="chevron_down" />
        <Menu.List>
          <Menu.Action text="New" />
          <Menu.Root placement="right">
            <Menu.Action text="Export as" />
            <Menu.List>
              <Menu.Action text="PDF" />
            </Menu.List>
          </Menu.Root>
        </Menu.List>
      </Menu.Root>,
    )

    // Open parent
    const button = document.querySelector('.dnb-button') as HTMLElement
    fireEvent.click(button)
    act(() => {
      jest.advanceTimersByTime(100)
    })

    // Find the nested trigger
    const exportTrigger = Array.from(
      document.querySelectorAll('[role="menuitem"]'),
    ).find((el) => el.textContent?.includes('Export as')) as HTMLElement
    expect(exportTrigger).toBeTruthy()

    // The parent popover content should contain the nested trigger.
    // With skipPortal on nested menus, the content renders inline
    // rather than in a portal, so we check the top-level .dnb-menu element.
    const parentMenu = document.querySelector('.dnb-menu')
    expect(parentMenu).toBeTruthy()
    expect(parentMenu.contains(exportTrigger)).toBe(true)

    jest.useRealTimers()
  })
})
