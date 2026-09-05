import { fireEvent, render } from '@testing-library/react'
import { createRef } from 'react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import SidebarMenu from '../SidebarMenu'

describe('SidebarMenuResizeHandle', () => {
  function renderHandle({ maxWidth }: { maxWidth?: number } = {}) {
    const targetRef = createRef<HTMLElement>()
    const result = render(
      <div className="layout">
        <aside
          ref={(element) => {
            targetRef.current = element
            if (element) {
              element.getBoundingClientRect = () =>
                ({ width: 320 }) as DOMRect
            }
          }}
          id="sidebar"
          style={{ width: '320px' }}
        />
        <SidebarMenu.ResizeHandle
          targetRef={targetRef}
          rootSelector=".layout"
          cssProperty="--aside-width"
          maxWidth={maxWidth}
          aria-controls="sidebar"
        />
      </div>
    )

    const root = document.querySelector('.layout') as HTMLElement
    const handle = document.querySelector('button') as HTMLButtonElement

    return { ...result, handle, root }
  }

  it('exposes window splitter semantics and its current width', () => {
    const { handle } = renderHandle()

    expect(handle).toHaveAttribute('role', 'separator')
    expect(handle).toHaveAttribute('aria-orientation', 'vertical')
    expect(handle).toHaveAttribute('aria-valuemin', '1')
    expect(handle).toHaveAttribute(
      'aria-valuemax',
      String(window.innerWidth)
    )
    expect(handle).toHaveAttribute('aria-valuenow', '320')
  })

  it('resizes with the keyboard and resets on double click', () => {
    const { handle, root } = renderHandle()

    fireEvent.keyDown(handle, { key: 'ArrowRight' })
    expect(root.style.getPropertyValue('--aside-width')).toBe('336px')
    expect(handle).toHaveAttribute('aria-valuenow', '336')

    fireEvent.keyDown(handle, { key: 'ArrowLeft', shiftKey: true })
    expect(root.style.getPropertyValue('--aside-width')).toBe('272px')

    fireEvent.doubleClick(handle)
    expect(root.style.getPropertyValue('--aside-width')).toBe('')
    expect(handle).toHaveAttribute('aria-valuenow', '320')
    expect(
      handle.style.getPropertyValue(
        '--sidebar-menu-resize-handle-position'
      )
    ).toBe('var(--aside-width)')

    fireEvent.keyDown(handle, { key: 'ArrowRight' })
    expect(root.style.getPropertyValue('--aside-width')).toBe('336px')
  })

  it('does not resize beyond the maximum width', () => {
    const { handle, root } = renderHandle({ maxWidth: 340 })

    fireEvent.keyDown(handle, { key: 'ArrowRight', shiftKey: true })

    expect(root.style.getPropertyValue('--aside-width')).toBe('340px')
    expect(handle).toHaveAttribute('aria-valuemax', '340')
    expect(handle).toHaveAttribute('aria-valuenow', '340')
  })

  it('positions itself from the target without a shared root', () => {
    const targetRef = createRef<HTMLElement>()
    const { rerender } = render(
      <aside
        ref={(element) => {
          targetRef.current = element
          if (element) {
            element.getBoundingClientRect = () =>
              ({ width: 320 }) as DOMRect
          }
        }}
        style={{ width: '320px' }}
      />
    )

    rerender(
      <>
        <aside
          ref={(element) => {
            targetRef.current = element
            if (element) {
              element.getBoundingClientRect = () =>
                ({ width: 320 }) as DOMRect
            }
          }}
          style={{ width: '320px' }}
        />
        <SidebarMenu.ResizeHandle targetRef={targetRef} />
      </>
    )

    expect(
      document
        .querySelector('button')
        .style.getPropertyValue('--sidebar-menu-resize-handle-position')
    ).toBe('320px')
  })

  it('resizes with pointer movement and cleans up after release', () => {
    const { handle, root } = renderHandle()

    fireEvent.pointerDown(handle, { button: 0, clientX: 320 })
    expect(document.documentElement).not.toHaveClass(
      'dnb-sidebar-menu-resize-handle--resizing'
    )

    fireEvent.pointerMove(window, { clientX: 400 })

    expect(root.style.getPropertyValue('--aside-width')).toBe('400px')
    expect(document.documentElement).toHaveClass(
      'dnb-sidebar-menu-resize-handle--resizing'
    )

    fireEvent.pointerUp(window)
    expect(document.documentElement).not.toHaveClass(
      'dnb-sidebar-menu-resize-handle--resizing'
    )
  })

  it('has no automated accessibility violations', async () => {
    const { container } = renderHandle()

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
