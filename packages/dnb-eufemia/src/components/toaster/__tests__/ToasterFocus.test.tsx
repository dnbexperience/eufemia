import { act, fireEvent, render } from '@testing-library/react'
import Toaster from '../Toaster'
import { DISMISS_ANIMATION_MS } from '../useToasterState'
import { TestConsumer, uniqueId } from './testHelpers'

describe('Toaster focus management', () => {
  it('toast stack focus trap returns focus to previously active element', () => {
    vi.useFakeTimers()

    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    // Focus a button before the toast appears
    const addBtn = document.querySelector(
      '[data-testid="add-info"]'
    ) as HTMLElement
    addBtn.focus()

    // Add a message with focus: 'first-action'
    fireEvent.click(
      document.querySelector('[data-testid="add-with-focus-first-action"]')
    )
    vi.advanceTimersByTime(100)

    // Sentinels should exist around the toast item
    const sentinels = document.querySelectorAll(
      '.dnb-toaster__toast-stack .dnb-sr-only'
    )
    expect(sentinels.length).toBe(2)

    // Tab past last element — sentinel returns focus to previous element
    fireEvent.focus(sentinels[1])
    expect(document.activeElement).toBe(addBtn)

    // Shift-tab before first element — sentinel also returns focus
    ;(
      document.querySelector(
        '.dnb-toaster__toast-stack .dnb-toaster__item__dismiss-action'
      ) as HTMLElement
    ).focus()
    fireEvent.focus(sentinels[0])
    expect(document.activeElement).toBe(addBtn)

    vi.useRealTimers()
  })

  it('does not auto-focus messages with actions when focus prop is not set', () => {
    vi.useFakeTimers()

    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    const addBtn = document.querySelector(
      '[data-testid="add-info"]'
    ) as HTMLElement
    addBtn.focus()

    fireEvent.click(
      document.querySelector('[data-testid="add-with-actions"]')
    )
    vi.advanceTimersByTime(100)

    // Focus should stay on the button that was focused before
    expect(document.activeElement).toBe(addBtn)

    vi.useRealTimers()
  })

  it('focuses the first action button when focus is first-action', () => {
    vi.useFakeTimers()

    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(
      document.querySelector('[data-testid="add-with-focus-first-action"]')
    )
    vi.advanceTimersByTime(100)

    const actionButton = document.querySelector(
      '.dnb-toaster__toast-stack .dnb-toaster__item__actions button'
    )
    expect(document.activeElement).toBe(actionButton)

    vi.useRealTimers()
  })

  it('focuses the message container when focus is message', () => {
    vi.useFakeTimers()

    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(
      document.querySelector('[data-testid="add-with-focus-message"]')
    )
    vi.advanceTimersByTime(100)

    const item = document.querySelector(
      '.dnb-toaster__toast-stack .dnb-toaster__item'
    )
    expect(document.activeElement).toBe(item)

    vi.useRealTimers()
  })

  it('dismisses message on Escape when focused', () => {
    vi.useFakeTimers()

    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(
      document.querySelector('[data-testid="add-with-focus-first-action"]')
    )

    const item = document.querySelector(
      '.dnb-toaster__toast-stack .dnb-toaster__item'
    )
    expect(item).toBeInTheDocument()

    // Press Escape on the item
    fireEvent.keyDown(item, { key: 'Escape' })

    // Item should be dismissed (exit animation starts)
    expect(
      document.querySelector(
        '.dnb-toaster__toast-stack .dnb-toaster__item'
      )
    ).not.toBeInTheDocument()

    vi.useRealTimers()
  })

  it('restores focus to previously active element after stack dismiss', () => {
    vi.useFakeTimers()

    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    // Focus a button before the toast appears
    const addBtn = document.querySelector(
      '[data-testid="add-info"]'
    ) as HTMLElement
    addBtn.focus()
    expect(document.activeElement).toBe(addBtn)

    // Add a message with focus: 'first-action'
    fireEvent.click(
      document.querySelector('[data-testid="add-with-focus-first-action"]')
    )

    // Advance past the rAF that steals focus
    vi.advanceTimersByTime(100)

    const dismissBtn = document.querySelector(
      '.dnb-toaster__toast-stack .dnb-toaster__item__dismiss-action'
    ) as HTMLElement
    expect(dismissBtn).toBeInTheDocument()

    // Dismiss via click on the dismiss button
    fireEvent.click(dismissBtn)

    // After the rAF, focus should return to the original element
    vi.advanceTimersByTime(100)
    expect(document.activeElement).toBe(addBtn)

    vi.useRealTimers()
  })

  it('Escape on item does not close notification center', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(
      document.querySelector('[data-testid="add-with-actions"]')
    )
    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    // Open notification center
    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    const items = document.querySelectorAll(
      '.dnb-toaster__notification-center .dnb-toaster__item'
    )

    // Press Escape on one item
    fireEvent.keyDown(items[0], { key: 'Escape' })

    // Notification center should still be open
    expect(notificationButton.getAttribute('aria-expanded')).toBe('true')
  })

  it('focus trap sentinels at top and bottom of notification center redirect to notification button', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    const sentinels = document.querySelectorAll(
      '.dnb-toaster__notification-center .dnb-sr-only'
    )
    expect(sentinels.length).toBe(2)

    // Top sentinel redirects to notification button
    fireEvent.focus(sentinels[0])
    expect(document.activeElement).toBe(notificationButton)

    // Bottom sentinel redirects to notification button
    fireEvent.focus(sentinels[1])
    expect(document.activeElement).toBe(notificationButton)
  })

  it('focus trap after floating notification button moves focus to first notification center item', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))
    fireEvent.click(document.querySelector('[data-testid="add-success"]'))

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    // Find the sentinel after the floating notification button
    const sentinel = document.querySelector(
      '.dnb-toaster__notification-button-floating .dnb-toaster__sentinel'
    )
    expect(sentinel).toBeInTheDocument()

    // Focus the sentinel — it should redirect focus to the first NC item
    fireEvent.focus(sentinel)

    const items = document.querySelectorAll(
      '.dnb-toaster__notification-center .dnb-toaster__item'
    )
    const firstItem = items[0]

    // Active element should be inside the first item
    expect(firstItem.contains(document.activeElement)).toBe(true)
  })

  it('sentinel after floating notification button returns focus to DOM flow when no messages', () => {
    const tid = uniqueId()
    const { container } = render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    // No messages added — notification button is hidden but sentinel is still rendered
    const sentinel = document.querySelector(
      '.dnb-toaster__notification-button-floating .dnb-toaster__sentinel'
    )
    expect(sentinel).toBeInTheDocument()

    // Focus the sentinel — it should redirect focus to the focus proxy
    fireEvent.focus(sentinel)

    const proxy = container.querySelector('.dnb-toaster__focus-proxy')
    expect(document.activeElement).toBe(proxy)
  })

  it('sentinel before floating notification button returns focus to DOM flow when no messages', () => {
    const tid = uniqueId()
    const { container } = render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    // No messages — the pre-button sentinel should exist
    const sentinels = document.querySelectorAll(
      '.dnb-toaster__notification-button-floating .dnb-toaster__sentinel'
    )
    expect(sentinels.length).toBe(2)

    // Focus the first sentinel (before the button)
    fireEvent.focus(sentinels[0])

    const proxy = container.querySelector('.dnb-toaster__focus-proxy')
    expect(document.activeElement).toBe(proxy)
  })

  it('does not render pre-button sentinel when NC is open', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    // When open, only the post-button sentinel should exist
    const sentinels = document.querySelectorAll(
      '.dnb-toaster__notification-button-floating .dnb-toaster__sentinel'
    )
    expect(sentinels.length).toBe(1)
  })

  it('renders focus trap sentinels for inline mode when NC is open', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid} notificationButtonPlacement="inline">
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    // NC sentinels should be present
    const ncSentinels = document.querySelectorAll(
      '.dnb-toaster__notification-center .dnb-sr-only'
    )
    expect(ncSentinels.length).toBe(2)

    // Post-notification-button sentinel should be present
    expect(
      document.querySelector(
        '.dnb-toaster__notification-button-inline .dnb-toaster__sentinel'
      )
    ).toBeInTheDocument()
  })

  it('inline NC sentinels redirect focus to notification button', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid} notificationButtonPlacement="inline">
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    const sentinels = document.querySelectorAll(
      '.dnb-toaster__notification-center .dnb-sr-only'
    )

    fireEvent.focus(sentinels[0])
    expect(document.activeElement).toBe(notificationButton)

    fireEvent.focus(sentinels[1])
    expect(document.activeElement).toBe(notificationButton)
  })

  it('inline post-notification-button sentinel redirects to first NC item', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid} notificationButtonPlacement="inline">
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))
    fireEvent.click(document.querySelector('[data-testid="add-success"]'))

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    const sentinel = document.querySelector(
      '.dnb-toaster__notification-button-inline .dnb-toaster__sentinel'
    )
    fireEvent.focus(sentinel)

    const items = document.querySelectorAll(
      '.dnb-toaster__notification-center .dnb-toaster__item'
    )
    expect(items[0].contains(document.activeElement)).toBe(true)
  })

  it('renders focus proxy for floating notification button', () => {
    const tid = uniqueId()
    const { container } = render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    const proxy = container.querySelector('.dnb-toaster__focus-proxy')
    expect(proxy).toBeInTheDocument()
    expect(proxy.tagName).toBe('BUTTON')
  })

  it('renders focus proxy for inline notification button', () => {
    const tid = uniqueId()
    const { container } = render(
      <Toaster id={tid} notificationButtonPlacement="inline">
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    const proxy = container.querySelector('.dnb-toaster__focus-proxy')
    expect(proxy).toBeInTheDocument()
    expect(proxy.tagName).toBe('BUTTON')
  })

  it('inline focus proxy is not in tab order but receives programmatic focus', () => {
    const tid = uniqueId()
    const { container } = render(
      <Toaster id={tid} notificationButtonPlacement="inline">
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    const proxy = container.querySelector(
      '.dnb-toaster__focus-proxy'
    ) as HTMLElement
    expect(proxy.tabIndex).toBe(-1)

    // Can still receive programmatic focus
    act(() => {
      proxy.focus()
    })
    expect(document.activeElement).toBe(proxy)
  })

  it('inline notification button does not auto-open notification center on focus', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid} notificationButtonPlacement="inline">
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    ) as HTMLElement
    fireEvent.focus(notificationButton)

    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')
  })

  it('focus proxy redirects focus to the floating notification button', () => {
    const tid = uniqueId()
    const { container } = render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    const proxy = container.querySelector(
      '.dnb-toaster__focus-proxy'
    ) as HTMLElement

    act(() => {
      proxy.focus()
    })

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    ) as HTMLElement
    expect(document.activeElement).toBe(notificationButton)
  })

  it('focus proxy redirect does not auto-open notification center', () => {
    const tid = uniqueId()
    const { container } = render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    const proxy = container.querySelector(
      '.dnb-toaster__focus-proxy'
    ) as HTMLElement

    act(() => {
      proxy.focus()
    })

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    ) as HTMLElement
    expect(document.activeElement).toBe(notificationButton)
    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')
  })

  it('focus proxy redirects to notification button even when no messages exist', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    const proxy = document.querySelector(
      '.dnb-toaster__focus-proxy'
    ) as HTMLElement

    act(() => {
      proxy.focus()
    })

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    ) as HTMLElement
    expect(document.activeElement).toBe(notificationButton)
  })

  it('focus proxy does not redirect after returning from sentinel', () => {
    const tid = uniqueId()
    const { container } = render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    // Simulate the sentinel redirecting to the focus proxy (shift-tab path)
    const sentinel = document.querySelector(
      '.dnb-toaster__notification-button-floating .dnb-toaster__sentinel'
    )
    fireEvent.focus(sentinel)

    // Focus should be on the proxy, not redirected back to the notification button
    const proxy = container.querySelector(
      '.dnb-toaster__focus-proxy'
    ) as HTMLElement
    expect(document.activeElement).toBe(proxy)

    // A second focus on the proxy (normal forward tab) should redirect to notification button
    fireEvent.focus(proxy)

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    ) as HTMLElement
    expect(document.activeElement).toBe(notificationButton)
  })

  it('Escape returns focus to focus proxy', () => {
    const tid = uniqueId()
    const { container } = render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    ) as HTMLElement
    fireEvent.click(notificationButton)

    expect(notificationButton.getAttribute('aria-expanded')).toBe('true')

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')
    const proxy = container.querySelector('.dnb-toaster__focus-proxy')
    expect(document.activeElement).toBe(proxy)
  })

  it('does not re-open notification center on focus after Escape close', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    ) as HTMLElement

    // Open via focus
    fireEvent.focus(notificationButton)
    expect(notificationButton.getAttribute('aria-expanded')).toBe('true')

    // Close with Escape — focus returns to notification button
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')

    // The programmatic focus from Escape should not re-open the NC
    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')
  })

  it('sentinel returns focus to DOM flow when NC is closed with messages', () => {
    const tid = uniqueId()
    const { container } = render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    // NC is closed — sentinel should redirect to the focus proxy
    const sentinel = document.querySelector(
      '.dnb-toaster__notification-button-floating .dnb-toaster__sentinel'
    )
    expect(sentinel).toBeInTheDocument()

    fireEvent.focus(sentinel)

    const proxy = container.querySelector('.dnb-toaster__focus-proxy')
    expect(document.activeElement).toBe(proxy)
  })

  it('auto-closes notification center when all NC messages are dismissed', () => {
    vi.useFakeTimers()

    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    expect(notificationButton.getAttribute('aria-expanded')).toBe('true')

    // Dismiss the only message
    const dismissBtn = document.querySelector(
      '.dnb-toaster__notification-center .dnb-toaster__item__dismiss'
    ) as HTMLElement
    fireEvent.click(dismissBtn)

    // Wait for dismiss animation
    act(() => {
      vi.advanceTimersByTime(DISMISS_ANIMATION_MS + 150)
    })

    // NC auto-closes when last message is dismissed
    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')

    vi.useRealTimers()
  })

  it('auto-closes inline notification center when all messages are dismissed', () => {
    vi.useFakeTimers()

    const tid = uniqueId()
    render(
      <Toaster id={tid} notificationButtonPlacement="inline">
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    expect(notificationButton.getAttribute('aria-expanded')).toBe('true')

    const dismissBtn = document.querySelector(
      '.dnb-toaster__notification-center .dnb-toaster__item__dismiss'
    ) as HTMLElement
    fireEvent.click(dismissBtn)

    act(() => {
      vi.advanceTimersByTime(DISMISS_ANIMATION_MS + 150)
    })

    // NC auto-closes when last message is dismissed
    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')

    vi.useRealTimers()
  })
})
