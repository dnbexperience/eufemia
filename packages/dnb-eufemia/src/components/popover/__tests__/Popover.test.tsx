import React from 'react'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog } from '../../'
import Popover from '../Popover'
import Provider from '../../../shared/Provider'
import defaultLocales from '../../../shared/locales'
import * as sharedHelpers from '../../../shared/helpers'

const contentText = 'Popover content'

type TargetRectOptions = {
  left?: number
  top?: number
  width?: number
  height?: number
}

const createBoundingRect = ({
  left = 160,
  top = 120,
  width = 100,
  height = 40,
}: TargetRectOptions): DOMRect =>
  ({
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => '',
  }) as DOMRect

const createTargetElement = (options: TargetRectOptions = {}) => {
  const rect = createBoundingRect(options)
  const element = document.createElement('div')
  document.body.appendChild(element)

  Object.defineProperty(element, 'getBoundingClientRect', {
    configurable: true,
    value: () => rect,
  })
  Object.defineProperty(element, 'offsetWidth', {
    configurable: true,
    value: rect.width,
  })
  Object.defineProperty(element, 'offsetHeight', {
    configurable: true,
    value: rect.height,
  })

  return { element, rect }
}

describe('Popover', () => {
  type RectConfig = {
    left: number
    top: number
    width: number
    height: number
  }

  const createRect = ({ left, top, width, height }: RectConfig): DOMRect =>
    ({
      width,
      height,
      top,
      left,
      right: left + width,
      bottom: top + height,
      x: left,
      y: top,
      toJSON: () => '',
    }) as DOMRect

  const assignRect = (element: HTMLElement, rect: DOMRect) => {
    Object.defineProperty(element, 'getBoundingClientRect', {
      configurable: true,
      value: () => rect,
    })
  }

  const setElementSize = (width: number, height: number) => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get() {
        return width
      },
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get() {
        return height
      },
    })
  }

  const renderWithTrigger = (extraProps = {}) =>
    render(
      <Popover
        trigger={({ ref, ...rest }) => (
          <button type="button" ref={ref} {...rest}>
            Toggle popover
          </button>
        )}
        {...extraProps}
      >
        {contentText}
      </Popover>
    )

  it('renders provided trigger and toggles visibility', async () => {
    renderWithTrigger()

    const trigger = document.querySelector('button[aria-controls]')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(trigger)

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    )

    const popoverElement = document.querySelector('.dnb-popover')
    expect(popoverElement).toHaveClass('dnb-popover--active')
    expect(popoverElement?.textContent).toContain(contentText)

    fireEvent.mouseDown(document.documentElement)

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    expect(popoverElement).not.toHaveClass('dnb-popover--active')
  })

  it('renders optional title and focuses content when opened', async () => {
    renderWithTrigger({ title: 'Definition' })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    await waitFor(() =>
      expect(
        document.querySelector('.dnb-popover__title strong')?.textContent
      ).toBe('Definition')
    )

    await waitFor(() =>
      expect(document.activeElement).toBe(
        document.querySelector('.dnb-popover__content')
      )
    )
  })

  it('moves focus to a custom element when focusOnOpenElement is provided', async () => {
    const focusRef = React.createRef<HTMLButtonElement>()

    render(
      <Popover
        open
        noAnimation
        focusOnOpenElement={() => focusRef.current}
        trigger={<button type="button">Trigger</button>}
      >
        <button type="button" ref={focusRef}>
          Focus me
        </button>
      </Popover>
    )

    await waitFor(() =>
      expect(document.activeElement).toBe(focusRef.current)
    )
  })

  it('calls onOpenChange when state toggles', async () => {
    const onOpenChange = jest.fn()
    renderWithTrigger({ onOpenChange })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true))

    // Get popover element and dispatch event on it so event.target is inside popover
    const popover = await waitFor(() =>
      document.querySelector('.dnb-popover')
    )

    // Dispatch Escape keydown event on the popover element
    // The document-level handler (capture phase) will catch it
    popover?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        keyCode: 27,
        bubbles: true,
      })
    )

    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false))
  })

  it('supports custom trigger renderer and manual close button', async () => {
    render(
      <Popover
        showCloseButton={false}
        trigger={({ ref, ...rest }) => (
          <button type="button" ref={ref} {...rest}>
            Open info
          </button>
        )}
        content={({ close }) => (
          <div>
            <p>{contentText}</p>
            <button type="button" onClick={() => close()}>
              Close
            </button>
          </div>
        )}
      />
    )

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    await waitFor(() =>
      expect(
        document.querySelector(
          '.dnb-popover button[type="button"]:last-of-type'
        )
      ).toBeInTheDocument()
    )
    const customClose = document.querySelector(
      '.dnb-popover button[type="button"]:last-of-type'
    )
    await userEvent.click(customClose)

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
  })

  it('hides the default close button when hideCloseButton is true', async () => {
    renderWithTrigger({ hideCloseButton: true })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    await waitFor(() =>
      expect(
        document.querySelector('.dnb-popover__close')
      ).not.toBeInTheDocument()
    )
  })

  it('hides the arrow when hideArrow is true', async () => {
    renderWithTrigger({ hideArrow: true })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    await waitFor(() =>
      expect(document.querySelector('.dnb-popover')).toBeInTheDocument()
    )

    expect(
      document.querySelector('.dnb-popover__arrow')
    ).not.toBeInTheDocument()
  })

  it('hides the arrow when hideArrow is true even if arrowPosition is set', async () => {
    renderWithTrigger({ hideArrow: true, arrowPosition: 'center' })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    await waitFor(() =>
      expect(document.querySelector('.dnb-popover')).toBeInTheDocument()
    )

    expect(
      document.querySelector('.dnb-popover__arrow')
    ).not.toBeInTheDocument()
  })

  it('renders the arrow by default when hideArrow is false', async () => {
    renderWithTrigger({ hideArrow: false })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    await waitFor(() =>
      expect(
        document.querySelector('.dnb-popover__arrow')
      ).toBeInTheDocument()
    )
  })

  it('closes when keyup happens outside the popover', async () => {
    renderWithTrigger()

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    fireEvent.keyUp(document.documentElement, { key: 'Tab' })

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
  })

  it('stays open when touch scrolls outside before ending', async () => {
    renderWithTrigger()

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    fireEvent.touchStart(document.body)
    fireEvent.touchMove(document.body)
    fireEvent.touchEnd(document.body)

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    )

    fireEvent.touchStart(document.body)
    fireEvent.touchEnd(document.body)

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
  })

  it('places the default close button after the popover content', async () => {
    renderWithTrigger()

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const contentWrapper = await waitFor(() =>
      document.querySelector('.dnb-popover__content')
    )
    expect(
      contentWrapper?.querySelector('.dnb-popover__body')
    ).toBeInTheDocument()
    const closeButton = document.querySelector('.dnb-popover__close')

    expect(closeButton).toBeInTheDocument()
    expect(closeButton?.previousElementSibling).toBe(contentWrapper)
  })

  it('closes when the focus-trap button receives focus and returns focus to the trigger', async () => {
    renderWithTrigger()

    const trigger = document.querySelector(
      'button[aria-controls]'
    ) as HTMLButtonElement
    await userEvent.click(trigger)

    // Wait for popover to be rendered
    await waitFor(() => {
      expect(document.querySelector('.dnb-popover')).toBeInTheDocument()
    })

    // Get all focus trap buttons - the last one is at the bottom
    const focusTrapButtons = document.querySelectorAll(
      '.dnb-popover .dnb-sr-only button, .dnb-popover button.dnb-sr-only'
    ) as NodeListOf<HTMLButtonElement>

    expect(focusTrapButtons.length).toBeGreaterThanOrEqual(1)

    // Get the bottom focus trap button (last one)
    const bottomFocusTrap = focusTrapButtons[focusTrapButtons.length - 1]

    // Verify the bottom focus trap button has sr-only class and aria-hidden attribute
    expect(bottomFocusTrap).toHaveClass('dnb-sr-only')
    expect(bottomFocusTrap).toHaveAttribute('aria-hidden', 'true')

    // Actually focus the button to trigger the onFocus handler
    fireEvent.focus(bottomFocusTrap)

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )

    // Wait for focus to be restored to the trigger
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger)
    })
  })

  it('closes when the top focus-trap button receives focus (Shift+Tab from first element) and returns focus to the trigger', async () => {
    renderWithTrigger()

    const trigger = document.querySelector(
      'button[aria-controls]'
    ) as HTMLButtonElement
    await userEvent.click(trigger)

    // Wait for popover to be rendered
    await waitFor(() => {
      expect(document.querySelector('.dnb-popover')).toBeInTheDocument()
    })

    // Get all focus trap buttons - the first one is at the top
    const focusTrapButtons = document.querySelectorAll(
      '.dnb-popover .dnb-sr-only button, .dnb-popover button.dnb-sr-only'
    ) as NodeListOf<HTMLButtonElement>

    expect(focusTrapButtons.length).toBeGreaterThanOrEqual(2)

    // Get the top focus trap button (first one)
    const topFocusTrap = focusTrapButtons[0]

    // Verify the top focus trap button has sr-only class and aria-hidden attribute
    expect(topFocusTrap).toHaveClass('dnb-sr-only')
    expect(topFocusTrap).toHaveAttribute('aria-hidden', 'true')

    // Simulate Shift+Tab from the first element by focusing the top trap
    fireEvent.focus(topFocusTrap)

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )

    // Wait for focus to be restored to the trigger
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger)
    })
  })

  it('provides default trigger aria attributes', () => {
    const baseTranslation = defaultLocales['nb-NO']
    const customTranslation = {
      ...baseTranslation,
      Popover: {
        ...baseTranslation.Popover,
        openTriggerTitle: 'Show details',
        closeTriggerTitle: 'Hide details',
      },
    }

    render(
      <Provider
        value={{
          locale: 'custom-locale',
          translation: baseTranslation,
          translations: {
            'custom-locale': customTranslation,
          },
        }}
      >
        <Popover
          trigger={({ ref, ...rest }) => (
            <button type="button" ref={ref} {...rest}>
              Toggle popover
            </button>
          )}
        >
          {contentText}
        </Popover>
      </Provider>
    )

    const trigger = document.querySelector('button[aria-controls]')
    expect(trigger).toHaveAttribute('role', 'button')
    expect(trigger).toHaveAttribute('tabindex', '0')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAttribute('title', 'Show details')

    const srDesc = document.getElementById(
      trigger.getAttribute('aria-describedby') as string
    )
    expect(srDesc).toHaveTextContent('Show details')
  })

  it('waits for showDelay before activating the popover', async () => {
    const IS_TEST = globalThis.IS_TEST
    globalThis.IS_TEST = false

    renderWithTrigger({ showDelay: 60 })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const popoverElement = document.querySelector('.dnb-popover')

    // Immediately after click, popover should not be active
    expect(popoverElement).not.toHaveClass('dnb-popover--active')

    await waitFor(() => {
      expect(popoverElement).not.toHaveClass('dnb-popover--active')
    })

    await waitFor(() =>
      expect(popoverElement).toHaveClass('dnb-popover--active')
    )

    globalThis.IS_TEST = IS_TEST
  })

  it('respects hideDelay before deactivating the popover', async () => {
    renderWithTrigger({ hideDelay: 60 })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const popoverElement = document.querySelector('.dnb-popover')

    await waitFor(() =>
      expect(popoverElement).toHaveClass('dnb-popover--active')
    )

    fireEvent.mouseDown(document.documentElement)

    expect(popoverElement).toHaveClass('dnb-popover--active')

    await waitFor(() =>
      expect(popoverElement).toHaveClass('dnb-popover--active')
    )

    await waitFor(() =>
      expect(popoverElement).not.toHaveClass('dnb-popover--active')
    )
  })

  it('renders popover content inside the dedicated portal root', async () => {
    renderWithTrigger()

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    await waitFor(() =>
      expect(
        document.querySelector('.dnb-popover__portal .dnb-popover')
      ).not.toBeNull()
    )
  })

  it('applies tooltip semantics and aria-hidden to the overlay element', async () => {
    renderWithTrigger()

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const popover = await waitFor(() =>
      document.querySelector('.dnb-popover')
    )
    expect(popover).toHaveAttribute('role', 'tooltip')
    expect(popover).toHaveAttribute('aria-hidden', 'true')
  })

  it('omits aria-hidden when omitDescribedBy is true', async () => {
    renderWithTrigger({ omitDescribedBy: true })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const popover = await waitFor(() =>
      document.querySelector('.dnb-popover')
    )
    expect(popover).not.toHaveAttribute('aria-hidden')
  })

  it('respects skipPortal by rendering inline', async () => {
    renderWithTrigger({ skipPortal: true })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    await waitFor(() =>
      expect(document.querySelector('.dnb-popover')).toBeInTheDocument()
    )
    expect(
      document.querySelector('.dnb-popover__portal')
    ).not.toBeInTheDocument()
  })

  it('applies custom portalRootClass to the wrapper', async () => {
    renderWithTrigger({ portalRootClass: 'custom-popover-root' })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    await waitFor(() =>
      expect(
        document.querySelector('.dnb-popover__portal.custom-popover-root')
      ).toBeInTheDocument()
    )
  })

  it('keeps popover content unfocusable with correct tabIndex', async () => {
    renderWithTrigger()

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const content = await waitFor(() =>
      document.querySelector('.dnb-popover__content')
    )
    expect(content).toHaveClass('dnb-no-focus')
    expect(content).toHaveAttribute('tabindex', '-1')
  })

  it('closes when the default close button is clicked', async () => {
    renderWithTrigger()

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const closeBtn = await waitFor(() =>
      document.querySelector('.dnb-popover__close')
    )
    await userEvent.click(closeBtn)

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
  })

  it('supports keyboard activation using Enter and Space', async () => {
    renderWithTrigger()

    const trigger = document.querySelector('button[aria-controls]')

    fireEvent.keyDown(trigger, { key: 'Enter' })
    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    )

    fireEvent.keyDown(trigger, { key: ' ' })
    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
  })

  it('moves focus back to the trigger when Escape is pressed inside the popover', async () => {
    renderWithTrigger()

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    // Get popover element and dispatch event on it so event.target is inside popover
    const popover = await waitFor(() =>
      document.querySelector('.dnb-popover--active')
    )
    expect(popover).toBeInTheDocument()

    // Dispatch Escape keydown event on the popover element
    // The document-level handler (capture phase) will catch it
    popover?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        keyCode: 27,
        bubbles: true,
      })
    )

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    expect(document.activeElement).toBe(trigger)
  })

  it('closes when clicking outside the popover', async () => {
    renderWithTrigger()

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    fireEvent.mouseDown(document.documentElement)

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
  })

  it('keeps dialog open when Popover handles Escape locally', async () => {
    render(
      <Dialog noAnimation openState={true} title="Dialog">
        <Popover
          noAnimation
          trigger={({ ref, ...rest }) => (
            <button type="button" ref={ref} {...rest}>
              Toggle popover
            </button>
          )}
        >
          Popover content
        </Popover>
      </Dialog>
    )

    // Wait for Dialog to be open
    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        'data-dnb-modal-active'
      )
    })

    const trigger = document.querySelector('.dnb-popover__trigger')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    // Click the trigger to open the popover
    fireEvent.click(trigger)

    // Wait for trigger to indicate popover is open
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })

    // Wait for popover to be active (query specifically for the active popover, not the Dialog's tooltip)
    await waitFor(() => {
      const popover = document.querySelector('.dnb-popover--active')
      expect(popover).toBeInTheDocument()
    })

    // When inside a Dialog, focus might be managed by the Dialog's focus trap
    // So we check if the popover content exists and is focusable
    // Query for content within the active popover specifically
    const popoverContent = document.querySelector(
      '.dnb-popover--active .dnb-popover__content'
    )
    expect(popoverContent).toBeInTheDocument()

    // Get the popover element (parent of content) to dispatch event on
    const popover = document.querySelector('.dnb-popover--active')
    expect(popover).toBeInTheDocument()

    // Dispatch Escape keydown event on the popover element
    // The Popover's document-level handler (capture phase) will catch it before Modal's handler
    popover?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        keyCode: 27,
        bubbles: true,
      })
    )

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    expect(document.querySelector('.dnb-dialog')).toBeInTheDocument()
    expect(document.documentElement).toHaveAttribute(
      'data-dnb-modal-active'
    )

    // Focus the dialog content to ensure Escape is handled by the dialog
    const dialogContent = document.querySelector('.dnb-dialog')
    if (dialogContent) {
      fireEvent.focus(dialogContent)
    }

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27 })
    )

    await waitFor(() =>
      expect(document.documentElement).not.toHaveAttribute(
        'data-dnb-modal-active'
      )
    )
  })

  it('applies show-outline class when hideOutline is false', async () => {
    renderWithTrigger({ hideOutline: false })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const popoverElement = await waitFor(() =>
      document.querySelector('.dnb-popover')
    )
    expect(popoverElement).toHaveClass('dnb-popover--show-outline')
  })

  it('does not apply show-outline class when hideOutline is true', async () => {
    renderWithTrigger({ hideOutline: true })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const popoverElement = await waitFor(() =>
      document.querySelector('.dnb-popover')
    )
    expect(popoverElement).not.toHaveClass('dnb-popover--show-outline')
  })

  it('applies show-outline class by default', async () => {
    renderWithTrigger()

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const popoverElement = await waitFor(() =>
      document.querySelector('.dnb-popover')
    )
    expect(popoverElement).toHaveClass('dnb-popover--show-outline')
  })

  it('respects triggerOffset prop for positioning', async () => {
    const { element: targetElement, rect } = createTargetElement({
      top: 70,
      height: 40,
    })
    try {
      render(
        <Popover
          open
          noAnimation
          targetElement={targetElement}
          triggerOffset={32}
        >
          {contentText}
        </Popover>
      )

      await waitFor(() => {
        const popoverElement = document.querySelector(
          '.dnb-popover'
        ) as HTMLElement | null
        expect(popoverElement).toBeInTheDocument()

        const expectedTop = rect.top + rect.height + 32
        expect(parseFloat(popoverElement.style.top || 'NaN')).toBe(
          expectedTop
        )
      })
    } finally {
      targetElement.remove()
    }
  })

  it('uses default triggerOffset of 0 when not provided', async () => {
    const { element: targetElement, rect } = createTargetElement({
      top: 90,
      height: 32,
    })
    try {
      render(
        <Popover open noAnimation targetElement={targetElement}>
          {contentText}
        </Popover>
      )

      await waitFor(() => {
        const popoverElement = document.querySelector(
          '.dnb-popover'
        ) as HTMLElement | null
        expect(popoverElement).toBeInTheDocument()

        const expectedTop = rect.top + rect.height
        expect(parseFloat(popoverElement.style.top || 'NaN')).toBe(
          expectedTop
        )
      })
    } finally {
      targetElement.remove()
    }
  })

  it('respects horizontalOffset prop for positioning', async () => {
    const { element: targetElement } = createTargetElement({
      left: 220,
      width: 80,
    })
    try {
      const { rerender } = render(
        <Popover
          open
          noAnimation
          targetElement={targetElement}
          horizontalOffset={0}
        >
          {contentText}
        </Popover>
      )

      const getPopoverElement = () =>
        document.querySelector('.dnb-popover') as HTMLElement | null

      await waitFor(() => {
        const popoverElement = getPopoverElement()
        expect(popoverElement).toBeInTheDocument()
        expect(popoverElement?.style.left).toBeTruthy()
      })

      const baseLeft = parseFloat(getPopoverElement().style.left || 'NaN')
      expect(Number.isFinite(baseLeft)).toBe(true)

      rerender(
        <Popover
          open
          noAnimation
          targetElement={targetElement}
          horizontalOffset={20}
        >
          {contentText}
        </Popover>
      )

      await waitFor(() => {
        const currentLeft = parseFloat(
          getPopoverElement().style.left || 'NaN'
        )
        expect(currentLeft - baseLeft).toBeGreaterThanOrEqual(20)
      })
    } finally {
      targetElement.remove()
    }
  })

  it('uses default horizontalOffset of 0 when not provided', async () => {
    const { element: targetElement, rect } = createTargetElement({
      left: 240,
      width: 60,
    })
    try {
      render(
        <Popover open noAnimation targetElement={targetElement}>
          {contentText}
        </Popover>
      )

      await waitFor(() => {
        const popoverElement = document.querySelector(
          '.dnb-popover'
        ) as HTMLElement | null
        expect(popoverElement).toBeInTheDocument()

        const anchorX = rect.left + rect.width / 2
        const elementWidth = popoverElement.offsetWidth
        const expectedLeft = anchorX - elementWidth / 2
        expect(parseFloat(popoverElement.style.left || 'NaN')).toBe(
          expectedLeft
        )
      })
    } finally {
      targetElement.remove()
    }
  })

  it('disables inner spacing when noInnerSpace is true', async () => {
    renderWithTrigger({ noInnerSpace: true })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const popoverElement = await waitFor(() =>
      document.querySelector('.dnb-popover')
    )
    expect(popoverElement).toHaveClass('dnb-popover--no-inner-space')
  })

  it('does not disable inner spacing when noInnerSpace is false', async () => {
    renderWithTrigger({ noInnerSpace: false })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const popoverElement = await waitFor(() =>
      document.querySelector('.dnb-popover')
    )
    expect(popoverElement).not.toHaveClass('dnb-popover--no-inner-space')
  })

  it('applies no-inner-space class which sets --inner-space: 0 via CSS', async () => {
    renderWithTrigger({ noInnerSpace: true })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const popoverElement = await waitFor(() =>
      document.querySelector('.dnb-popover')
    )
    // The class applies --inner-space: 0 via SCSS
    expect(popoverElement).toHaveClass('dnb-popover--no-inner-space')
  })

  describe('arrow alignment', () => {
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetWidth'
    )
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetHeight'
    )

    const setElementSize = (width: number, height: number) => {
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        configurable: true,
        get() {
          return width
        },
      })
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        get() {
          return height
        },
      })
    }

    const restoreElementSize = () => {
      if (originalOffsetWidth) {
        Object.defineProperty(
          HTMLElement.prototype,
          'offsetWidth',
          originalOffsetWidth
        )
      }
      if (originalOffsetHeight) {
        Object.defineProperty(
          HTMLElement.prototype,
          'offsetHeight',
          originalOffsetHeight
        )
      }
    }

    afterEach(() => {
      restoreElementSize()
    })

    describe('arrowPositionSelector', () => {
      it('aligns the arrow horizontally when pointing vertically', async () => {
        const targetElement = document.createElement('div')
        const alignmentElement = document.createElement('span')
        alignmentElement.className = 'alignment-hook'
        targetElement.appendChild(alignmentElement)
        document.body.appendChild(targetElement)

        Object.defineProperty(targetElement, 'offsetWidth', {
          configurable: true,
          value: 200,
        })
        Object.defineProperty(targetElement, 'offsetHeight', {
          configurable: true,
          value: 60,
        })

        assignRect(
          targetElement,
          createRect({ left: 100, top: 150, width: 200, height: 60 })
        )
        assignRect(
          alignmentElement,
          createRect({ left: 260, top: 170, width: 30, height: 20 })
        )

        setElementSize(180, 80)

        render(
          <Popover
            open
            noAnimation
            targetElement={targetElement}
            arrowPositionSelector=".alignment-hook"
            content="Aligned popover"
          />
        )

        await waitFor(() => {
          const arrow = document.querySelector(
            '.dnb-popover__arrow'
          ) as HTMLElement
          expect(arrow?.style.left).toBe('82px')
        })

        targetElement.remove()
      })

      it('aligns the popover vertically when pointing horizontally', async () => {
        const targetElement = document.createElement('div')
        const alignmentElement = document.createElement('span')
        alignmentElement.className = 'alignment-hook'
        targetElement.appendChild(alignmentElement)
        document.body.appendChild(targetElement)

        Object.defineProperty(targetElement, 'offsetWidth', {
          configurable: true,
          value: 120,
        })
        Object.defineProperty(targetElement, 'offsetHeight', {
          configurable: true,
          value: 80,
        })

        assignRect(
          targetElement,
          createRect({ left: 50, top: 80, width: 120, height: 80 })
        )
        assignRect(
          alignmentElement,
          createRect({ left: 60, top: 140, width: 20, height: 40 })
        )

        setElementSize(140, 60)

        render(
          <Popover
            open
            noAnimation
            placement="right"
            targetElement={targetElement}
            arrowPositionSelector=".alignment-hook"
            content="Aligned popover"
          />
        )

        await waitFor(() => {
          const popover = document.querySelector(
            '.dnb-popover'
          ) as HTMLElement
          expect(popover?.style.top).toBe('130px')
        })

        targetElement.remove()
      })
    })

    it('centers the arrow vertically when pointing right', async () => {
      const targetElement = document.createElement('div')
      document.body.appendChild(targetElement)

      Object.defineProperty(targetElement, 'offsetWidth', {
        configurable: true,
        value: 80,
      })
      Object.defineProperty(targetElement, 'offsetHeight', {
        configurable: true,
        value: 32,
      })

      assignRect(
        targetElement,
        createRect({ left: 120, top: 120, width: 80, height: 32 })
      )

      setElementSize(150, 120)

      render(
        <Popover
          open
          noAnimation
          position="right"
          targetElement={targetElement}
        >
          Center arrow
        </Popover>
      )

      await waitFor(() => {
        const arrow = document.querySelector(
          '.dnb-popover__arrow'
        ) as HTMLElement
        expect(arrow?.style.top).toBe('52px')
      })

      targetElement.remove()
    })

    describe('targetElement refs', () => {
      it('positions the popover using horizontal and vertical refs', async () => {
        const horizontalElement = document.createElement('div')
        const verticalElement = document.createElement('div')
        document.body.append(horizontalElement, verticalElement)

        assignRect(
          horizontalElement,
          createRect({ left: 150, top: 80, width: 60, height: 30 })
        )
        assignRect(
          verticalElement,
          createRect({ left: 20, top: 200, width: 40, height: 40 })
        )

        setElementSize(100, 80)

        render(
          <Popover
            open
            noAnimation
            targetElement={{
              horizontalRef: horizontalElement,
              verticalRef: verticalElement,
            }}
          >
            Positioned content
          </Popover>
        )

        const popover = await waitFor(
          () => document.querySelector('.dnb-popover') as HTMLElement
        )

        expect(popover?.style.left).toBe('130px')

        horizontalElement.remove()
        verticalElement.remove()
      })

      it('returns focus to the vertical ref when closing', async () => {
        const horizontalElement = document.createElement('div')
        const verticalElement = document.createElement('button')
        document.body.append(horizontalElement, verticalElement)

        render(
          <Popover
            openInitially
            noAnimation
            targetElement={{
              horizontalRef: horizontalElement,
              verticalRef: verticalElement,
            }}
          >
            Escape content
          </Popover>
        )

        const popover = await waitFor(() =>
          document.querySelector('.dnb-popover')
        )

        popover?.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'Escape',
            keyCode: 27,
            bubbles: true,
            cancelable: true,
          })
        )

        await waitFor(() =>
          expect(document.activeElement).toBe(verticalElement)
        )

        horizontalElement.remove()
        verticalElement.remove()
      })
    })

    it('keeps the arrow within the popover width near the viewport edge', async () => {
      const targetElement = document.createElement('div')
      document.body.appendChild(targetElement)

      const windowWidthDescriptor = Object.getOwnPropertyDescriptor(
        window,
        'innerWidth'
      )
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: 240,
      })

      Object.defineProperty(targetElement, 'offsetWidth', {
        configurable: true,
        value: 160,
      })
      Object.defineProperty(targetElement, 'offsetHeight', {
        configurable: true,
        value: 40,
      })

      assignRect(
        targetElement,
        createRect({ left: 200, top: 120, width: 160, height: 40 })
      )

      setElementSize(200, 80)

      render(
        <Popover
          open
          noAnimation
          placement="bottom"
          targetElement={targetElement}
        >
          Edge case
        </Popover>
      )

      await waitFor(() => {
        const arrow = document.querySelector(
          '.dnb-popover__arrow'
        ) as HTMLElement
        expect(arrow?.style.left).toBe('176px')
      })

      if (windowWidthDescriptor) {
        Object.defineProperty(window, 'innerWidth', windowWidthDescriptor)
      }
      targetElement.remove()
    })

    it('keeps the arrow at the dialog left edge while scrolling a dialog to the left', async () => {
      const scrollViewElement = document.createElement('div')
      scrollViewElement.className = 'dnb-scroll-view'
      document.body.appendChild(scrollViewElement)

      const targetElement = document.createElement('div')
      scrollViewElement.appendChild(targetElement)

      const scrollViewRect = createRect({
        left: 64,
        top: 80,
        width: 120,
        height: 200,
      })
      Object.defineProperty(scrollViewElement, 'getBoundingClientRect', {
        configurable: true,
        value: () => scrollViewRect,
      })

      const targetRect = createRect({
        left: 68,
        top: 120,
        width: 8,
        height: 40,
      })
      assignRect(targetElement, targetRect)
      Object.defineProperty(targetElement, 'offsetWidth', {
        configurable: true,
        value: targetRect.width,
      })
      Object.defineProperty(targetElement, 'offsetHeight', {
        configurable: true,
        value: targetRect.height,
      })

      setElementSize(220, 140)

      render(
        <Popover
          open
          noAnimation
          placement="bottom"
          targetElement={targetElement}
        >
          Scroll guard left
        </Popover>
      )

      await waitFor(() => {
        const popover = document.querySelector(
          '.dnb-popover'
        ) as HTMLElement
        const arrow = document.querySelector(
          '.dnb-popover__arrow'
        ) as HTMLElement
        const popoverLeft = parseFloat(popover.style.left || '0')
        const expectedArrowLeft = scrollViewRect.left - popoverLeft

        expect(parseFloat(arrow?.style.left || '0')).toBeCloseTo(
          expectedArrowLeft,
          1
        )
      })

      targetElement.remove()
      scrollViewElement.remove()
    })

    it('keeps the arrow at the dialog right edge while scrolling a dialog to the right', async () => {
      const scrollViewElement = document.createElement('div')
      scrollViewElement.className = 'dnb-scroll-view'
      document.body.appendChild(scrollViewElement)

      const targetElement = document.createElement('div')
      scrollViewElement.appendChild(targetElement)

      const scrollViewRect = createRect({
        left: 40,
        top: 100,
        width: 140,
        height: 200,
      })
      Object.defineProperty(scrollViewElement, 'getBoundingClientRect', {
        configurable: true,
        value: () => scrollViewRect,
      })

      const arrowWidth = 16
      const targetRect = createRect({
        left: 170,
        top: 130,
        width: 8,
        height: 40,
      })
      assignRect(targetElement, targetRect)
      Object.defineProperty(targetElement, 'offsetWidth', {
        configurable: true,
        value: targetRect.width,
      })
      Object.defineProperty(targetElement, 'offsetHeight', {
        configurable: true,
        value: targetRect.height,
      })

      setElementSize(220, 140)

      render(
        <Popover
          open
          noAnimation
          placement="bottom"
          targetElement={targetElement}
        >
          Scroll guard right
        </Popover>
      )

      await waitFor(() => {
        const popover = document.querySelector(
          '.dnb-popover'
        ) as HTMLElement
        const arrow = document.querySelector(
          '.dnb-popover__arrow'
        ) as HTMLElement
        const popoverLeft = parseFloat(popover.style.left || '0')
        const expectedArrowLeft =
          scrollViewRect.right - popoverLeft - arrowWidth
        const actualArrowLeft = parseFloat(arrow?.style.left || '0')

        // Allow 2px tolerance due to coordinate system conversion
        expect(
          Math.abs(actualArrowLeft - expectedArrowLeft)
        ).toBeLessThanOrEqual(2)
      })

      targetElement.remove()
      scrollViewElement.remove()
    })

    it('clamps the arrow away from the viewport edge when space is limited', async () => {
      const targetElement = document.createElement('div')
      document.body.appendChild(targetElement)

      const windowWidthDescriptor = Object.getOwnPropertyDescriptor(
        window,
        'innerWidth'
      )
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: 320,
      })

      Object.defineProperty(targetElement, 'offsetWidth', {
        configurable: true,
        value: 24,
      })
      Object.defineProperty(targetElement, 'offsetHeight', {
        configurable: true,
        value: 40,
      })

      assignRect(
        targetElement,
        createRect({ left: 10, top: 120, width: 24, height: 40 })
      )

      setElementSize(220, 120)

      render(
        <Popover
          open
          noAnimation
          placement="bottom"
          targetElement={targetElement}
        >
          Clamped arrow
        </Popover>
      )

      await waitFor(() => {
        const arrow = document.querySelector(
          '.dnb-popover__arrow'
        ) as HTMLElement
        expect(arrow?.style.left).toBe('8px')
      })

      if (windowWidthDescriptor) {
        Object.defineProperty(window, 'innerWidth', windowWidthDescriptor)
      }
      targetElement.remove()
    })

    it('flips to top placement when there is limited space below', async () => {
      const targetElement = document.createElement('div')
      document.body.appendChild(targetElement)

      const windowHeightDescriptor = Object.getOwnPropertyDescriptor(
        window,
        'innerHeight'
      )
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 320,
      })

      Object.defineProperty(targetElement, 'offsetWidth', {
        configurable: true,
        value: 120,
      })
      Object.defineProperty(targetElement, 'offsetHeight', {
        configurable: true,
        value: 40,
      })

      assignRect(
        targetElement,
        createRect({ left: 40, top: 260, width: 120, height: 40 })
      )

      setElementSize(200, 160)

      render(
        <Popover
          open
          noAnimation
          placement="bottom"
          targetElement={targetElement}
        >
          Auto flip
        </Popover>
      )

      await waitFor(() =>
        expect(
          document.querySelector('.dnb-popover__arrow__placement--top')
        ).toBeInTheDocument()
      )

      if (windowHeightDescriptor) {
        Object.defineProperty(
          window,
          'innerHeight',
          windowHeightDescriptor
        )
      }
      targetElement.remove()
    })

    it('flips to bottom placement when there is limited space above', async () => {
      const targetElement = document.createElement('div')
      document.body.appendChild(targetElement)

      const windowHeightDescriptor = Object.getOwnPropertyDescriptor(
        window,
        'innerHeight'
      )
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 320,
      })

      Object.defineProperty(targetElement, 'offsetWidth', {
        configurable: true,
        value: 120,
      })
      Object.defineProperty(targetElement, 'offsetHeight', {
        configurable: true,
        value: 40,
      })

      assignRect(
        targetElement,
        createRect({ left: 40, top: 40, width: 120, height: 40 })
      )

      setElementSize(200, 160)

      render(
        <Popover
          open
          noAnimation
          placement="top"
          targetElement={targetElement}
        >
          Auto flip
        </Popover>
      )

      await waitFor(() =>
        expect(
          document.querySelector('.dnb-popover__arrow__placement--bottom')
        ).toBeInTheDocument()
      )

      if (windowHeightDescriptor) {
        Object.defineProperty(
          window,
          'innerHeight',
          windowHeightDescriptor
        )
      }
      targetElement.remove()
    })

    it('chooses the side with more space when both vertical placements overflow', async () => {
      const targetElement = document.createElement('div')
      document.body.appendChild(targetElement)

      const windowHeightDescriptor = Object.getOwnPropertyDescriptor(
        window,
        'innerHeight'
      )
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 320,
      })

      Object.defineProperty(targetElement, 'offsetWidth', {
        configurable: true,
        value: 120,
      })
      Object.defineProperty(targetElement, 'offsetHeight', {
        configurable: true,
        value: 40,
      })

      assignRect(
        targetElement,
        createRect({ left: 40, top: 160, width: 120, height: 40 })
      )

      setElementSize(220, 200)

      render(
        <Popover
          open
          noAnimation
          placement="bottom"
          targetElement={targetElement}
        >
          Large content
        </Popover>
      )

      await waitFor(() =>
        expect(
          document.querySelector('.dnb-popover__arrow__placement--top')
        ).toBeInTheDocument()
      )

      if (windowHeightDescriptor) {
        Object.defineProperty(
          window,
          'innerHeight',
          windowHeightDescriptor
        )
      }
      targetElement.remove()
    })

    it('chooses the bottom placement when both vertical placements overflow but there is more space below', async () => {
      const targetElement = document.createElement('div')
      document.body.appendChild(targetElement)

      const windowHeightDescriptor = Object.getOwnPropertyDescriptor(
        window,
        'innerHeight'
      )
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 160,
      })

      Object.defineProperty(targetElement, 'offsetWidth', {
        configurable: true,
        value: 120,
      })
      Object.defineProperty(targetElement, 'offsetHeight', {
        configurable: true,
        value: 40,
      })

      assignRect(
        targetElement,
        createRect({ left: 40, top: 20, width: 120, height: 40 })
      )

      setElementSize(220, 200)

      render(
        <Popover
          open
          noAnimation
          placement="top"
          targetElement={targetElement}
        >
          Overflow prefer bottom
        </Popover>
      )

      await waitFor(() =>
        expect(
          document.querySelector('.dnb-popover__arrow__placement--bottom')
        ).toBeInTheDocument()
      )

      if (windowHeightDescriptor) {
        Object.defineProperty(
          window,
          'innerHeight',
          windowHeightDescriptor
        )
      }
      targetElement.remove()
    })

    it('never flips when autoAlignMode is "never"', async () => {
      const targetElement = document.createElement('div')
      document.body.appendChild(targetElement)

      const windowHeightDescriptor = Object.getOwnPropertyDescriptor(
        window,
        'innerHeight'
      )
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 320,
      })

      Object.defineProperty(targetElement, 'offsetWidth', {
        configurable: true,
        value: 120,
      })
      Object.defineProperty(targetElement, 'offsetHeight', {
        configurable: true,
        value: 40,
      })

      assignRect(
        targetElement,
        createRect({ left: 40, top: 260, width: 120, height: 40 })
      )

      setElementSize(200, 160)

      render(
        <Popover
          open
          noAnimation
          placement="bottom"
          targetElement={targetElement}
          autoAlignMode="never"
        >
          Auto flip
        </Popover>
      )

      await waitFor(() =>
        expect(
          document.querySelector('.dnb-popover__arrow__placement--bottom')
        ).toBeInTheDocument()
      )

      if (windowHeightDescriptor) {
        Object.defineProperty(
          window,
          'innerHeight',
          windowHeightDescriptor
        )
      }
      targetElement.remove()
    })

    it('autoAlignMode "initial" keeps placement after viewport expands', async () => {
      const targetElement = document.createElement('div')
      document.body.appendChild(targetElement)

      const windowHeightDescriptor = Object.getOwnPropertyDescriptor(
        window,
        'innerHeight'
      )
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 320,
      })

      Object.defineProperty(targetElement, 'offsetWidth', {
        configurable: true,
        value: 120,
      })
      Object.defineProperty(targetElement, 'offsetHeight', {
        configurable: true,
        value: 40,
      })

      assignRect(
        targetElement,
        createRect({ left: 40, top: 260, width: 120, height: 40 })
      )

      setElementSize(200, 160)

      render(
        <Popover
          open
          noAnimation
          placement="bottom"
          targetElement={targetElement}
          autoAlignMode="initial"
        >
          Auto flip
        </Popover>
      )

      await waitFor(() =>
        expect(
          document.querySelector('.dnb-popover__arrow__placement--top')
        ).toBeInTheDocument()
      )

      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 640,
      })
      window.dispatchEvent(new Event('resize'))

      await waitFor(() =>
        expect(
          document.querySelector('.dnb-popover__arrow__placement--top')
        ).toBeInTheDocument()
      )

      if (windowHeightDescriptor) {
        Object.defineProperty(
          window,
          'innerHeight',
          windowHeightDescriptor
        )
      }
      targetElement.remove()
    })

    it('autoAlignMode "scroll" re-evaluates the placement on resize', async () => {
      const targetElement = document.createElement('div')
      document.body.appendChild(targetElement)

      const windowHeightDescriptor = Object.getOwnPropertyDescriptor(
        window,
        'innerHeight'
      )
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 320,
      })

      Object.defineProperty(targetElement, 'offsetWidth', {
        configurable: true,
        value: 120,
      })
      Object.defineProperty(targetElement, 'offsetHeight', {
        configurable: true,
        value: 40,
      })

      assignRect(
        targetElement,
        createRect({ left: 40, top: 260, width: 120, height: 40 })
      )

      setElementSize(200, 160)

      render(
        <Popover
          open
          noAnimation
          placement="bottom"
          targetElement={targetElement}
          autoAlignMode="scroll"
        >
          Auto flip
        </Popover>
      )

      await waitFor(() =>
        expect(
          document.querySelector('.dnb-popover__arrow__placement--top')
        ).toBeInTheDocument()
      )

      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 640,
      })
      window.dispatchEvent(new Event('resize'))

      await waitFor(() =>
        expect(
          document.querySelector('.dnb-popover__arrow__placement--bottom')
        ).toBeInTheDocument()
      )

      if (windowHeightDescriptor) {
        Object.defineProperty(
          window,
          'innerHeight',
          windowHeightDescriptor
        )
      }
      targetElement.remove()
    })

    it('prefers bottom when the top placement overflows but bottom has more space', async () => {
      const targetElement = document.createElement('div')
      document.body.appendChild(targetElement)

      const windowHeightDescriptor = Object.getOwnPropertyDescriptor(
        window,
        'innerHeight'
      )
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 180,
      })

      Object.defineProperty(targetElement, 'offsetWidth', {
        configurable: true,
        value: 120,
      })
      Object.defineProperty(targetElement, 'offsetHeight', {
        configurable: true,
        value: 40,
      })

      assignRect(
        targetElement,
        createRect({ left: 60, top: 20, width: 120, height: 40 })
      )

      setElementSize(220, 180)

      render(
        <Popover
          open
          noAnimation
          placement="top"
          targetElement={targetElement}
        >
          Above viewport
        </Popover>
      )

      await waitFor(() => {
        const popover = document.querySelector(
          '.dnb-popover'
        ) as HTMLElement
        expect(
          document.querySelector('.dnb-popover__arrow__placement--bottom')
        ).toBeInTheDocument()
        expect(popover?.style.top).toBe('60px')
      })

      if (windowHeightDescriptor) {
        Object.defineProperty(
          window,
          'innerHeight',
          windowHeightDescriptor
        )
      }
      targetElement.remove()
    })

    it('repositions when the document scrolls', async () => {
      const targetElement = document.createElement('div')
      document.body.appendChild(targetElement)

      const windowHeightDescriptor = Object.getOwnPropertyDescriptor(
        window,
        'innerHeight'
      )
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 640,
      })

      Object.defineProperty(targetElement, 'offsetWidth', {
        configurable: true,
        value: 100,
      })
      Object.defineProperty(targetElement, 'offsetHeight', {
        configurable: true,
        value: 40,
      })

      let rect = createRect({ left: 60, top: 80, width: 100, height: 40 })
      assignRect(targetElement, rect)

      setElementSize(180, 80)

      render(
        <Popover
          open
          noAnimation
          placement="bottom"
          targetElement={targetElement}
        >
          Scrollable
        </Popover>
      )

      await waitFor(() => {
        const popover = document.querySelector(
          '.dnb-popover'
        ) as HTMLElement
        expect(popover?.style.top).toBe('120px')
      })

      rect = createRect({ left: 60, top: 140, width: 100, height: 40 })
      assignRect(targetElement, rect)

      document.dispatchEvent(new Event('scroll', { bubbles: true }))

      await waitFor(() => {
        const popover = document.querySelector(
          '.dnb-popover'
        ) as HTMLElement
        expect(popover?.style.top).toBe('180px')
      })

      if (windowHeightDescriptor) {
        Object.defineProperty(
          window,
          'innerHeight',
          windowHeightDescriptor
        )
      }
      targetElement.remove()
    })

    describe('Table.ScrollView guard', () => {
      const originalOffsetWidth = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'offsetWidth'
      )
      const originalOffsetHeight = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'offsetHeight'
      )

      const createRect = ({
        left,
        top,
        width,
        height,
      }: {
        left: number
        top: number
        width: number
        height: number
      }) =>
        ({
          width,
          height,
          top,
          left,
          right: left + width,
          bottom: top + height,
          x: left,
          y: top,
          toJSON: () => '',
        }) as DOMRect

      const setElementSize = (width: number, height: number) => {
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
          configurable: true,
          get() {
            return width
          },
        })
        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
          configurable: true,
          get() {
            return height
          },
        })
      }

      const restoreElementSize = () => {
        if (originalOffsetWidth) {
          Object.defineProperty(
            HTMLElement.prototype,
            'offsetWidth',
            originalOffsetWidth
          )
        }
        if (originalOffsetHeight) {
          Object.defineProperty(
            HTMLElement.prototype,
            'offsetHeight',
            originalOffsetHeight
          )
        }
      }

      type ScrollViewSetup = {
        scrollViewElement: HTMLDivElement
        targetElement: HTMLDivElement
        setTargetRect: (top: number) => void
        cleanup: () => void
      }

      const setupScrollView = (): ScrollViewSetup => {
        const scrollViewElement = document.createElement('div')
        scrollViewElement.className = 'dnb-scroll-view'
        document.body.appendChild(scrollViewElement)

        const targetElement = document.createElement('div')
        scrollViewElement.appendChild(targetElement)

        const scrollViewRect = createRect({
          left: 0,
          top: 0,
          width: 240,
          height: 200,
        })
        Object.defineProperty(scrollViewElement, 'getBoundingClientRect', {
          configurable: true,
          value: () => scrollViewRect,
        })

        Object.defineProperty(targetElement, 'offsetWidth', {
          configurable: true,
          value: 100,
        })
        Object.defineProperty(targetElement, 'offsetHeight', {
          configurable: true,
          value: 40,
        })

        const setTargetRect = (top: number) => {
          const rect = createRect({
            left: 60,
            top,
            width: 100,
            height: 40,
          })
          Object.defineProperty(targetElement, 'getBoundingClientRect', {
            configurable: true,
            value: () => rect,
          })
        }

        const cleanup = () => {
          scrollViewElement.remove()
        }

        return {
          scrollViewElement,
          targetElement,
          setTargetRect,
          cleanup,
        }
      }

      const renderScrollPopover = (targetElement: HTMLElement) => {
        setElementSize(180, 80)

        render(
          <Popover
            open
            noAnimation
            placement="bottom"
            targetElement={targetElement}
          >
            Scrollable
          </Popover>
        )
      }

      afterEach(() => {
        restoreElementSize()
      })

      it('stops repositioning while the trigger is hidden in Table.ScrollView', async () => {
        const {
          scrollViewElement,
          targetElement,
          setTargetRect,
          cleanup,
        } = setupScrollView()

        const windowHeightDescriptor = Object.getOwnPropertyDescriptor(
          window,
          'innerHeight'
        )
        Object.defineProperty(window, 'innerHeight', {
          configurable: true,
          value: 640,
        })

        setTargetRect(80)
        renderScrollPopover(targetElement)

        const popover = await waitFor(() =>
          document.querySelector('.dnb-popover')
        )
        const initialTop = (popover as HTMLElement).style.top

        setTargetRect(250)
        scrollViewElement.dispatchEvent(
          new Event('scroll', { bubbles: true })
        )

        await waitFor(() => {
          const currentPopover = document.querySelector(
            '.dnb-popover'
          ) as HTMLElement
          expect(currentPopover?.style.top).toBe(initialTop)
        })

        if (windowHeightDescriptor) {
          Object.defineProperty(
            window,
            'innerHeight',
            windowHeightDescriptor
          )
        }

        cleanup()
      })

      it('repositions when the trigger becomes visible inside Table.ScrollView', async () => {
        const {
          scrollViewElement,
          targetElement,
          setTargetRect,
          cleanup,
        } = setupScrollView()

        const windowHeightDescriptor = Object.getOwnPropertyDescriptor(
          window,
          'innerHeight'
        )
        Object.defineProperty(window, 'innerHeight', {
          configurable: true,
          value: 640,
        })

        setTargetRect(80)
        renderScrollPopover(targetElement)

        const popover = await waitFor(() =>
          document.querySelector('.dnb-popover')
        )
        expect((popover as HTMLElement).style.top).toBe('120px')

        setTargetRect(140)
        // Dispatch scroll event on scrollViewElement so handler can detect it
        // The event will bubble to document where the handler listens
        act(() => {
          scrollViewElement.dispatchEvent(
            new Event('scroll', { bubbles: true, cancelable: true })
          )
          window.dispatchEvent(new Event('resize'))
        })

        await waitFor(
          () => {
            const currentPopover = document.querySelector(
              '.dnb-popover'
            ) as HTMLElement
            expect(currentPopover?.style.top).toBe('120px')
          },
          { timeout: 2000 }
        )

        if (windowHeightDescriptor) {
          Object.defineProperty(
            window,
            'innerHeight',
            windowHeightDescriptor
          )
        }

        cleanup()
      })
    })
  })

  it('stops updating while a Table.ScrollView hides the trigger', async () => {
    const scrollViewElement = document.createElement('div')
    scrollViewElement.className = 'dnb-scroll-view'
    document.body.appendChild(scrollViewElement)

    const targetElement = document.createElement('div')
    scrollViewElement.appendChild(targetElement)

    const scrollViewRect = createRect({
      left: 0,
      top: 0,
      width: 240,
      height: 200,
    })
    Object.defineProperty(scrollViewElement, 'getBoundingClientRect', {
      configurable: true,
      value: () => scrollViewRect,
    })

    const windowHeightDescriptor = Object.getOwnPropertyDescriptor(
      window,
      'innerHeight'
    )
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 640,
    })

    Object.defineProperty(targetElement, 'offsetWidth', {
      configurable: true,
      value: 100,
    })
    Object.defineProperty(targetElement, 'offsetHeight', {
      configurable: true,
      value: 40,
    })

    const rect = createRect({
      left: 60,
      top: 80,
      width: 100,
      height: 40,
    })
    assignRect(targetElement, rect)

    setElementSize(180, 80)

    render(
      <Popover
        open
        noAnimation
        placement="bottom"
        targetElement={targetElement}
      >
        Scrollable
      </Popover>
    )

    const popover = await waitFor(() =>
      document.querySelector('.dnb-popover')
    )
    const initialTop = (popover as HTMLElement).style.top

    const outOfViewRect = createRect({
      left: 60,
      top: 250,
      width: 100,
      height: 40,
    })
    assignRect(targetElement, outOfViewRect)
    scrollViewElement.dispatchEvent(new Event('scroll', { bubbles: true }))

    await waitFor(() => {
      const currentPopover = document.querySelector(
        '.dnb-popover'
      ) as HTMLElement
      expect(currentPopover?.style.top).toBe(initialTop)
    })

    const visibleRect = createRect({
      left: 60,
      top: 140,
      width: 100,
      height: 40,
    })
    assignRect(targetElement, visibleRect)
    // Dispatch scroll event on scrollViewElement so handler can detect it
    // The event will bubble to document where the handler listens
    act(() => {
      scrollViewElement.dispatchEvent(
        new Event('scroll', { bubbles: true, cancelable: true })
      )
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(
      () => {
        const currentPopover = document.querySelector(
          '.dnb-popover'
        ) as HTMLElement
        expect(currentPopover?.style.top).toBe('120px')
      },
      { timeout: 2000 }
    )

    if (windowHeightDescriptor) {
      Object.defineProperty(window, 'innerHeight', windowHeightDescriptor)
    }

    scrollViewElement.remove()
  })

  describe('keepInDOM', () => {
    it('should unmount portal when keepInDOM is false by default', async () => {
      const { container } = renderWithTrigger()

      const trigger = container.querySelector('button[aria-controls]')
      await userEvent.click(trigger)

      await waitFor(() => {
        expect(
          document.body.querySelector('.dnb-popover__portal')
        ).toBeInTheDocument()
      })

      // Close the popover
      fireEvent.mouseDown(document.documentElement)

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
      })

      // Portal should be removed again when keepInDOM is not enabled
      await waitFor(() => {
        expect(
          document.body.querySelector('.dnb-popover__portal')
        ).not.toBeInTheDocument()
      })
    })

    it('should keep portal mounted when keepInDOM is true', async () => {
      const { container } = renderWithTrigger({ keepInDOM: true })

      const trigger = container.querySelector('button[aria-controls]')
      await userEvent.click(trigger)

      await waitFor(() => {
        expect(
          document.body.querySelector('.dnb-popover__portal')
        ).toBeInTheDocument()
      })

      // Close the popover
      fireEvent.mouseDown(document.documentElement)

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
      })

      // Portal should still be in DOM when keepInDOM is true
      expect(
        document.body.querySelector('.dnb-popover__portal')
      ).toBeInTheDocument()
    })

    it('should mount portal when keepInDOM is false and popover opens', async () => {
      const { container } = renderWithTrigger({ keepInDOM: false })

      // Portal should not exist initially
      expect(
        document.body.querySelector('.dnb-popover__portal')
      ).not.toBeInTheDocument()

      const trigger = container.querySelector('button[aria-controls]')
      await userEvent.click(trigger)

      // Portal should be mounted when opened
      await waitFor(() => {
        expect(
          document.body.querySelector('.dnb-popover__portal')
        ).toBeInTheDocument()
      })
    })

    describe('with skipPortal', () => {
      it('unmounts the inline popover when keepInDOM is false', async () => {
        const { container } = renderWithTrigger({
          skipPortal: true,
          noAnimation: true,
        })

        const trigger = container.querySelector('button[aria-controls]')
        await userEvent.click(trigger)

        await waitFor(() =>
          expect(
            document.querySelector('.dnb-popover')
          ).toBeInTheDocument()
        )

        fireEvent.mouseDown(document.documentElement)

        await waitFor(() =>
          expect(
            document.querySelector('.dnb-popover')
          ).not.toBeInTheDocument()
        )
      })

      it('keeps the inline popover when keepInDOM is true', async () => {
        const { container } = renderWithTrigger({
          skipPortal: true,
          keepInDOM: true,
          noAnimation: true,
        })

        const trigger = container.querySelector('button[aria-controls]')
        await userEvent.click(trigger)

        await waitFor(() =>
          expect(
            document.querySelector('.dnb-popover')
          ).toBeInTheDocument()
        )

        fireEvent.mouseDown(document.documentElement)

        await waitFor(() =>
          expect(trigger).toHaveAttribute('aria-expanded', 'false')
        )

        expect(document.querySelector('.dnb-popover')).toBeInTheDocument()
      })

      it('positions inline popover relative to provided refs', async () => {
        const wrapper = document.createElement('div')
        wrapper.style.position = 'relative'
        document.body.appendChild(wrapper)

        const horizontalElement = document.createElement('div')
        const verticalElement = document.createElement('div')
        wrapper.append(horizontalElement, verticalElement)

        const createRect = ({
          left,
          top,
          width,
          height,
        }: {
          left: number
          top: number
          width: number
          height: number
        }) =>
          ({
            width,
            height,
            top,
            left,
            right: left + width,
            bottom: top + height,
            x: left,
            y: top,
            toJSON: () => '',
          }) as DOMRect

        const assignRect = (element: HTMLElement, rect: DOMRect) => {
          Object.defineProperty(element, 'getBoundingClientRect', {
            configurable: true,
            value: () => rect,
          })
        }

        assignRect(
          horizontalElement,
          createRect({ left: 150, top: 80, width: 80, height: 32 })
        )
        assignRect(
          verticalElement,
          createRect({ left: 50, top: 220, width: 40, height: 32 })
        )

        Object.defineProperty(horizontalElement, 'offsetWidth', {
          configurable: true,
          value: 80,
        })
        Object.defineProperty(horizontalElement, 'offsetHeight', {
          configurable: true,
          value: 32,
        })
        Object.defineProperty(verticalElement, 'offsetWidth', {
          configurable: true,
          value: 40,
        })
        Object.defineProperty(verticalElement, 'offsetHeight', {
          configurable: true,
          value: 32,
        })
        Object.defineProperty(verticalElement, 'offsetTop', {
          configurable: true,
          value: 220,
        })
        Object.defineProperty(horizontalElement, 'offsetLeft', {
          configurable: true,
          value: 150,
        })

        const offsetLeftSpy = jest
          .spyOn(sharedHelpers, 'getOffsetLeft')
          .mockReturnValue(0)
        const offsetTopSpy = jest
          .spyOn(sharedHelpers, 'getOffsetTop')
          .mockReturnValue(0)

        render(
          <Popover
            open
            noAnimation
            skipPortal
            triggerOffset={0}
            targetElement={{
              horizontalRef: horizontalElement,
              verticalRef: verticalElement,
            }}
          >
            Inline popover
          </Popover>,
          { container: wrapper }
        )

        const popover = await waitFor(() =>
          document.querySelector('.dnb-popover')
        )

        expect(popover).toBeInTheDocument()
        const inlinePopover = popover as HTMLElement
        expect(inlinePopover.style.top).toBe('32px')

        offsetLeftSpy.mockRestore()
        offsetTopSpy.mockRestore()
        wrapper.remove()
      })
    })
  })

  describe('trigger prop warnings', () => {
    let warnSpy: jest.SpyInstance

    beforeEach(() => {
      warnSpy = jest.spyOn(sharedHelpers, 'warn')
    })

    afterEach(() => {
      warnSpy.mockRestore()
    })

    it('should warn when trigger is truthy but not a valid React element or render function', () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

      render(
        <Popover trigger="invalid trigger" content={contentText}>
          {contentText}
        </Popover>
      )

      expect(warnSpy).toHaveBeenCalledTimes(1)
      expect(warnSpy).toHaveBeenCalledWith(
        'Popover: `trigger` must be a valid React element or render function when not using targetElement/targetSelector.'
      )

      consoleLogSpy.mockRestore()
    })

    it('should warn when trigger is an object but not a valid React element', () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

      render(
        <Popover
          trigger={{ invalid: 'object' } as unknown as React.ReactNode}
          content={contentText}
        >
          {contentText}
        </Popover>
      )

      expect(warnSpy).toHaveBeenCalledTimes(1)
      expect(warnSpy).toHaveBeenCalledWith(
        'Popover: `trigger` must be a valid React element or render function when not using targetElement/targetSelector.'
      )

      consoleLogSpy.mockRestore()
    })

    it('should warn when trigger is a number', () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

      render(
        <Popover
          trigger={123 as unknown as React.ReactNode}
          content={contentText}
        >
          {contentText}
        </Popover>
      )

      expect(warnSpy).toHaveBeenCalledTimes(1)
      expect(warnSpy).toHaveBeenCalledWith(
        'Popover: `trigger` must be a valid React element or render function when not using targetElement/targetSelector.'
      )

      consoleLogSpy.mockRestore()
    })

    it('should warn when trigger is undefined and no targetElement/targetSelector is provided', () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

      render(<Popover content={contentText}>{contentText}</Popover>)

      expect(warnSpy).toHaveBeenCalledTimes(1)
      expect(warnSpy).toHaveBeenCalledWith(
        'Popover: please provide a `trigger` prop or point to an existing element using `targetElement` / `targetSelector`.'
      )

      consoleLogSpy.mockRestore()
    })

    it('should warn when trigger is null and no targetElement/targetSelector is provided', () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

      render(
        <Popover trigger={null} content={contentText}>
          {contentText}
        </Popover>
      )

      expect(warnSpy).toHaveBeenCalledTimes(1)
      expect(warnSpy).toHaveBeenCalledWith(
        'Popover: please provide a `trigger` prop or point to an existing element using `targetElement` / `targetSelector`.'
      )

      consoleLogSpy.mockRestore()
    })

    it('should not warn when trigger is a valid React element', () => {
      render(
        <Popover
          trigger={<button type="button">Click me</button>}
          content={contentText}
        >
          {contentText}
        </Popover>
      )

      expect(warnSpy).not.toHaveBeenCalled()
    })

    it('should not warn when trigger is a valid render function', () => {
      render(
        <Popover
          trigger={({ ref, ...rest }) => (
            <button type="button" ref={ref} {...rest}>
              Click me
            </button>
          )}
          content={contentText}
        >
          {contentText}
        </Popover>
      )

      expect(warnSpy).not.toHaveBeenCalled()
    })

    it('should not warn when targetElement is provided', () => {
      const targetElement = document.createElement('div')
      document.body.appendChild(targetElement)

      render(
        <Popover targetElement={targetElement} content={contentText}>
          {contentText}
        </Popover>
      )

      expect(warnSpy).not.toHaveBeenCalled()

      targetElement.remove()
    })

    it('should not warn when targetSelector is provided', () => {
      const targetElement = document.createElement('div')
      targetElement.id = 'test-target'
      document.body.appendChild(targetElement)

      render(
        <Popover targetSelector="#test-target" content={contentText}>
          {contentText}
        </Popover>
      )

      expect(warnSpy).not.toHaveBeenCalled()

      targetElement.remove()
    })
  })

  it('should position arrow correctly when position="right" and arrowPosition="top"', async () => {
    // Mock ResizeObserver
    global.ResizeObserver = class ResizeObserver {
      observe() {
        return null
      }
      unobserve() {
        return null
      }
      disconnect() {
        return null
      }
    }

    // Mock getComputedStyle
    const originalGetComputedStyle = window.getComputedStyle
    window.getComputedStyle = jest.fn().mockReturnValue({
      marginLeft: '0px',
      marginRight: '0px',
      marginTop: '0px',
      marginBottom: '0px',
    })

    // Mock offsetParent for popover content
    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      configurable: true,
      get: function () {
        if (this.classList.contains('dnb-popover__content')) {
          return document.body
        }
        return null
      },
    })

    // Mock getBoundingClientRect
    const originalGetBoundingClientRect =
      HTMLElement.prototype.getBoundingClientRect
    jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        if (
          this.classList.contains('target-element') ||
          this.classList.contains('dnb-popover__trigger')
        ) {
          return {
            top: 100,
            left: 100,
            width: 100,
            height: 100,
            bottom: 200,
            right: 200,
            x: 100,
            y: 100,
            toJSON: () => null,
          } as DOMRect
        }
        if (this.classList.contains('dnb-popover__content')) {
          return {
            top: 0,
            left: 0,
            width: 200,
            height: 200,
            bottom: 200,
            right: 200,
            x: 0,
            y: 0,
            toJSON: () => null,
          } as DOMRect
        }
        return {
          top: 0,
          left: 0,
          width: 1024,
          height: 768,
          bottom: 768,
          right: 1024,
          x: 0,
          y: 0,
          toJSON: () => null,
        } as DOMRect
      })

    // Mock offsetWidth/offsetHeight
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetWidth'
    )
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetHeight'
    )

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get: function () {
        if (this.classList.contains('dnb-popover__content')) return 200
        if (this.classList.contains('target-element')) return 100
        return 0
      },
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get: function () {
        if (this.classList.contains('dnb-popover__content')) return 200
        if (this.classList.contains('target-element')) return 100
        return 0
      },
    })

    render(
      <Popover
        open={true}
        position="right"
        arrowPosition="top"
        trigger={<button className="target-element">Target</button>}
        content="Popover Content"
        noAnimation={false}
        showDelay={0}
        hideDelay={0}
      />
    )

    // Wait for positioning effect
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))
    })

    const popoverElement = document.querySelector(
      '.dnb-popover'
    ) as HTMLElement
    expect(popoverElement).toBeInTheDocument()

    const style = popoverElement.style
    const top = parseFloat(style.top)

    // Expected: 134 (150 - 16)
    expect(top).toBe(134)

    // Cleanup
    window.getComputedStyle = originalGetComputedStyle
    HTMLElement.prototype.getBoundingClientRect =
      originalGetBoundingClientRect
    if (originalOffsetWidth)
      Object.defineProperty(
        HTMLElement.prototype,
        'offsetWidth',
        originalOffsetWidth
      )
    if (originalOffsetHeight)
      Object.defineProperty(
        HTMLElement.prototype,
        'offsetHeight',
        originalOffsetHeight
      )
  })

  it('should position arrow correctly when position="right" and arrowPosition="bottom"', async () => {
    // Mock ResizeObserver
    global.ResizeObserver = class ResizeObserver {
      observe() {
        return null
      }
      unobserve() {
        return null
      }
      disconnect() {
        return null
      }
    }

    // Mock getComputedStyle
    const originalGetComputedStyle = window.getComputedStyle
    window.getComputedStyle = jest.fn().mockReturnValue({
      marginLeft: '0px',
      marginRight: '0px',
      marginTop: '0px',
      marginBottom: '0px',
    })

    // Mock offsetParent for popover content
    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      configurable: true,
      get: function () {
        if (this.classList.contains('dnb-popover__content')) {
          return document.body
        }
        return null
      },
    })

    // Mock getBoundingClientRect
    const originalGetBoundingClientRect =
      HTMLElement.prototype.getBoundingClientRect
    jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        if (
          this.classList.contains('target-element') ||
          this.classList.contains('dnb-popover__trigger')
        ) {
          return {
            top: 100,
            left: 100,
            width: 100,
            height: 100,
            bottom: 200,
            right: 200,
            x: 100,
            y: 100,
            toJSON: () => null,
          } as DOMRect
        }
        if (this.classList.contains('dnb-popover__content')) {
          return {
            top: 0,
            left: 0,
            width: 200,
            height: 200,
            bottom: 200,
            right: 200,
            x: 0,
            y: 0,
            toJSON: () => null,
          } as DOMRect
        }
        return {
          top: 0,
          left: 0,
          width: 1024,
          height: 768,
          bottom: 768,
          right: 1024,
          x: 0,
          y: 0,
          toJSON: () => null,
        } as DOMRect
      })

    // Mock offsetWidth/offsetHeight
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetWidth'
    )
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetHeight'
    )

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get: function () {
        if (this.classList.contains('dnb-popover__content')) return 200
        if (this.classList.contains('target-element')) return 100
        return 0
      },
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get: function () {
        if (
          this.classList.contains('dnb-popover__content') ||
          this.classList.contains('dnb-popover')
        )
          return 200
        if (this.classList.contains('target-element')) return 100
        return 0
      },
    })

    render(
      <Popover
        open={true}
        position="right"
        arrowPosition="bottom"
        trigger={<button className="target-element">Target</button>}
        content="Popover Content"
        noAnimation={false}
        showDelay={0}
        hideDelay={0}
      />
    )

    // Wait for positioning effect
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))
    })

    const popoverElement = document.querySelector(
      '.dnb-popover'
    ) as HTMLElement
    expect(popoverElement).toBeInTheDocument()

    const style = popoverElement.style
    const top = parseFloat(style.top)

    // Expected: 150 (center) - 200 (height) + 16 (offset) = -34
    expect(top).toBe(-34)

    // Cleanup
    window.getComputedStyle = originalGetComputedStyle
    HTMLElement.prototype.getBoundingClientRect =
      originalGetBoundingClientRect
    if (originalOffsetWidth)
      Object.defineProperty(
        HTMLElement.prototype,
        'offsetWidth',
        originalOffsetWidth
      )
    if (originalOffsetHeight)
      Object.defineProperty(
        HTMLElement.prototype,
        'offsetHeight',
        originalOffsetHeight
      )
  })
})
