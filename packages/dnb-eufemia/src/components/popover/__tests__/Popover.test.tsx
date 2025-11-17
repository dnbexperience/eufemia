import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog } from '../../'
import Popover from '../Popover'
import Provider from '../../../shared/Provider'
import defaultLocales from '../../../shared/locales'

const contentText = 'Popover content'

describe('Popover', () => {
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

  it('calls onOpenChange when state toggles', async () => {
    const onOpenChange = jest.fn()
    renderWithTrigger({ onOpenChange })

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true))

    const content = await waitFor(() =>
      document.querySelector('.dnb-popover__content')
    )
    fireEvent.keyDown(content, { key: 'Escape' })

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
    ) as Element
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

  it('closes when keyup happens outside the', async () => {
    renderWithTrigger()

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    fireEvent.keyUp(document.documentElement, { key: 'Tab' })

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

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const focusTrap = await waitFor(() =>
      document.querySelector(
        '.dnb-popover .dnb-sr-only button, .dnb-popover button.dnb-sr-only'
      )
    )

    fireEvent.focus(focusTrap as Element)

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    expect(document.activeElement).toBe(trigger)
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

  it('applies spacing utility classes to the trigger', () => {
    renderWithTrigger({ top: 'large' })

    const trigger = document.querySelector('.dnb-popover__trigger')
    expect(trigger).toHaveClass('dnb-space__top--large')
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

  it('moves focus back to the trigger when Escape is pressed inside the', async () => {
    renderWithTrigger()

    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)

    const content = await waitFor(() =>
      document.querySelector('.dnb-popover__content')
    )
    fireEvent.keyDown(content, { key: 'Escape' })

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    expect(document.activeElement).toBe(trigger)
  })

  it('closes when clicking outside the', async () => {
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
      <Dialog noAnimation openState title="Dialog">
        <Popover
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

    const trigger = document.querySelector('.dnb-popover__trigger')
    await userEvent.click(trigger)

    await waitFor(() =>
      expect(document.activeElement).toBe(
        document.querySelector('.dnb-popover__content')
      )
    )

    await userEvent.keyboard('{Escape}')

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    expect(document.querySelector('.dnb-dialog')).toBeInTheDocument()
    expect(document.documentElement).toHaveAttribute(
      'data-dnb-modal-active'
    )

    await userEvent.keyboard('{Escape}')

    expect(document.documentElement).not.toHaveAttribute(
      'data-dnb-modal-active'
    )
  })
})
