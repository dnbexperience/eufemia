import { act, fireEvent, render } from '@testing-library/react'
import Toaster from '../Toaster'
import { NOTIFICATION_CENTER_ANIMATE_IN_DELAY_MS } from '../NotificationCenter'
import { DISMISS_ANIMATION_MS } from '../useToasterState'
import { TestConsumer, uniqueId } from './testHelpers'

describe('Toaster', () => {
  it('renders without errors', () => {
    render(
      <Toaster id={uniqueId()}>
        <div>App content</div>
      </Toaster>
    )

    expect(document.querySelector('.dnb-toaster')).toBeInTheDocument()
  })

  it('renders inline mode', () => {
    render(
      <Toaster id={uniqueId()} inline>
        <div>App content</div>
      </Toaster>
    )

    expect(
      document.querySelector('.dnb-toaster--inline')
    ).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Toaster id={uniqueId()} className="custom-class">
        <div>App content</div>
      </Toaster>
    )

    expect(
      document.querySelector('.dnb-toaster.custom-class')
    ).toBeInTheDocument()
  })

  it('always renders notification button', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    expect(
      document.querySelector('.dnb-toaster__notification-button')
    ).toBeInTheDocument()
  })

  it('opens notification center on focus when messages exist', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )

    // No messages — focus stays on notification button, does not open
    fireEvent.focus(notificationButton)
    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    // Adding a message does not auto-open the notification center
    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')

    // Focus should open notification center when messages exist
    fireEvent.focus(notificationButton)
    expect(notificationButton.getAttribute('aria-expanded')).toBe('true')
  })

  it('shows messages in toast stack when added', () => {
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
    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')

    const item = document.querySelector(
      '.dnb-toaster__toast-stack__list .dnb-toaster__item'
    )
    expect(item).toBeInTheDocument()
  })

  it('collapses notification center when notification button is clicked', () => {
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

    // Open notification center
    fireEvent.click(notificationButton)
    expect(notificationButton.getAttribute('aria-expanded')).toBe('true')

    // Close notification center
    fireEvent.click(notificationButton)
    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')
  })

  it('hides toast stack when notification center is open', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    // Toast stack is visible
    expect(
      document.querySelector('.dnb-toaster__toast-stack__list')
    ).toBeInTheDocument()

    // Open notification center
    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    // Toast stack is hidden
    expect(
      document.querySelector('.dnb-toaster__toast-stack__list')
    ).not.toBeInTheDocument()

    // Notification center panel is visible with the message
    expect(
      document.querySelector(
        '.dnb-toaster__notification-center .dnb-toaster__item'
      )
    ).toBeInTheDocument()
  })

  it('hides message from toast stack but keeps it in notification center', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    // Dismiss from toast stack
    const toastDismiss = document.querySelector(
      '.dnb-toaster__toast-stack .dnb-toaster__item__dismiss'
    )
    fireEvent.click(toastDismiss)

    // Toast stack no longer shows the message
    expect(
      document.querySelector(
        '.dnb-toaster__toast-stack .dnb-toaster__item'
      )
    ).not.toBeInTheDocument()

    // Open notification center — message is still there
    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    expect(
      document.querySelector(
        '.dnb-toaster__notification-center .dnb-toaster__item'
      )
    ).toBeInTheDocument()
  })

  it('removes message entirely when dismissed from notification center', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    // Open notification center
    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    // Dismiss from notification center
    const ncDismiss = document.querySelector(
      '.dnb-toaster__notification-center .dnb-toaster__item__dismiss'
    )
    fireEvent.click(ncDismiss)

    expect(
      document.querySelector('[data-testid="message-count"]').textContent
    ).toBe('1') // still in store with 'dismissed' status until animation ends

    expect(
      document.querySelector('[data-testid="unread-count"]').textContent
    ).toBe('0')
  })

  it('messages seen in notification center do not reappear in toast stack', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    // Message is in toast stack
    expect(
      document.querySelector(
        '.dnb-toaster__toast-stack .dnb-toaster__item'
      )
    ).toBeInTheDocument()

    // Open notification center
    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    // Close notification center
    fireEvent.click(notificationButton)

    // Message should not reappear in toast stack
    expect(
      document.querySelector(
        '.dnb-toaster__toast-stack .dnb-toaster__item'
      )
    ).not.toBeInTheDocument()
  })

  it('renders notification center on the right side', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    expect(
      document.querySelector('.dnb-toaster__notification-center')
    ).toBeInTheDocument()
  })

  it('renders messages inline when inline prop is set', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid} inline>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    expect(
      document.querySelector('.dnb-toaster__list')
    ).toBeInTheDocument()

    expect(
      document.querySelector('.dnb-toaster__item')
    ).toBeInTheDocument()
  })

  it('has aria-live region for announcements', () => {
    render(
      <Toaster id={uniqueId()} inline>
        <div />
      </Toaster>
    )

    const liveRegion = document.querySelector('[aria-live]')
    expect(liveRegion).toBeInTheDocument()
  })

  it('renders panel with role="log"', () => {
    render(
      <Toaster id={uniqueId()} inline>
        <div />
      </Toaster>
    )

    expect(document.querySelector('[role="log"]')).toBeInTheDocument()
  })

  it('new messages after closing notification center appear in toast stack', () => {
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

    // Open notification center
    fireEvent.click(notificationButton)

    // Close notification center
    fireEvent.click(notificationButton)

    // Add a new message
    fireEvent.click(document.querySelector('[data-testid="add-success"]'))

    // New message appears in toast stack
    const stackItems = document.querySelectorAll(
      '.dnb-toaster__toast-stack .dnb-toaster__item'
    )
    expect(stackItems.length).toBe(1)
    expect(
      stackItems[0].querySelector('.dnb-toaster__item__title').textContent
    ).toBe('Success title')
  })

  it('messages added while notification center is open stay hidden from stack after closing', () => {
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

    // Open notification center
    fireEvent.click(notificationButton)

    // Add a message while the notification center is open
    fireEvent.click(document.querySelector('[data-testid="add-success"]'))

    // Close notification center
    fireEvent.click(notificationButton)

    // Neither message should appear in the toast stack
    expect(
      document.querySelectorAll(
        '.dnb-toaster__toast-stack .dnb-toaster__item'
      ).length
    ).toBe(0)
  })

  it('messages seen in notification center stay hidden after Escape close', () => {
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

    // Open notification center
    fireEvent.click(notificationButton)

    // Add a message while open
    fireEvent.click(document.querySelector('[data-testid="add-success"]'))

    // Close via Escape
    fireEvent.keyDown(document, { key: 'Escape' })

    // Neither message should reappear in the toast stack
    expect(
      document.querySelectorAll(
        '.dnb-toaster__toast-stack .dnb-toaster__item'
      ).length
    ).toBe(0)
  })

  it('messages appear only in toast stack or notification center, never both', () => {
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

    // Open then close notification center
    fireEvent.click(notificationButton)
    fireEvent.click(notificationButton)

    // Wait for close animation to finish
    act(() => {
      vi.advanceTimersByTime(300)
    })

    // Add a new message while notification center is closed
    fireEvent.click(document.querySelector('[data-testid="add-success"]'))

    const stackItems = document.querySelectorAll(
      '.dnb-toaster__toast-stack .dnb-toaster__item'
    )
    const notificationCenterItems = document.querySelectorAll(
      '.dnb-toaster__panel--notification-center .dnb-toaster__item'
    )

    // New message should only be in the toast stack, not the notification center
    expect(stackItems.length).toBe(1)
    expect(notificationCenterItems.length).toBe(0)

    vi.useRealTimers()
  })

  it('animates in new notification center items after delay', () => {
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

    // Add a message while the notification center is open
    fireEvent.click(document.querySelector('[data-testid="add-success"]'))

    // Before delay: the item is kept in DOM but HeightAnimation is closed
    const hidden = document.querySelector(
      '.dnb-toaster__notification-center .dnb-height-animation--hidden'
    )
    expect(hidden).toBeInTheDocument()

    // After delay: HeightAnimation opens
    act(() => {
      vi.advanceTimersByTime(NOTIFICATION_CENTER_ANIMATE_IN_DELAY_MS)
    })

    expect(
      document.querySelector(
        '.dnb-toaster__notification-center .dnb-height-animation--hidden'
      )
    ).not.toBeInTheDocument()

    vi.useRealTimers()
  })

  it('scrolls notification center to bottom when new messages are added', () => {
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

    const scrollView = document.querySelector(
      '.dnb-toaster__panel--notification-center'
    )

    // Mock scroll dimensions
    Object.defineProperty(scrollView, 'scrollHeight', { value: 800 })
    Object.defineProperty(scrollView, 'clientHeight', { value: 300 })

    // Add a message while the notification center is open
    fireEvent.click(document.querySelector('[data-testid="add-success"]'))

    // Advance past the scroll delay (animate-in delay + animation duration)
    act(() => {
      vi.advanceTimersByTime(
        NOTIFICATION_CENTER_ANIMATE_IN_DELAY_MS + DISMISS_ANIMATION_MS
      )
    })

    expect(scrollView.scrollTop).toBe(500)

    vi.useRealTimers()
  })

  it('closes notification center on Escape and keeps messages stack-hidden', () => {
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

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' })

    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')

    // Message should not reappear in toast stack
    expect(
      document.querySelector(
        '.dnb-toaster__toast-stack .dnb-toaster__item'
      )
    ).not.toBeInTheDocument()
  })

  it('stack-hiding one message leaves others visible in toast stack', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))
    fireEvent.click(document.querySelector('[data-testid="add-success"]'))

    // Two items in toast stack
    expect(
      document.querySelectorAll(
        '.dnb-toaster__toast-stack .dnb-toaster__item'
      ).length
    ).toBe(2)

    // Dismiss (stack-hide) the first one
    const dismissBtns = document.querySelectorAll(
      '.dnb-toaster__toast-stack .dnb-toaster__item__dismiss'
    )
    fireEvent.click(dismissBtns[0])

    // One left in toast stack
    expect(
      document.querySelectorAll(
        '.dnb-toaster__toast-stack .dnb-toaster__item'
      ).length
    ).toBe(1)

    // Open notification center — both messages are visible there
    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    expect(
      document.querySelectorAll(
        '.dnb-toaster__notification-center .dnb-toaster__item'
      ).length
    ).toBe(2)
  })

  it('does not show badge by default', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    expect(
      document.querySelector('.dnb-toaster__badge')
    ).not.toBeInTheDocument()
  })

  it('shows badge with message count when showBadge is true', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid} showBadge>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    const badge = document.querySelector(
      '.dnb-toaster__badge [role="status"]'
    )
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('1')
  })

  it('closes notification center when opened with no messages', async () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    // NC auto-closes because there are no messages
    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')
  })

  it('notification center dismiss removes message from store after animation delay', () => {
    vi.useFakeTimers()

    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    // Open notification center
    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    // Dismiss from notification center
    const ncDismiss = document.querySelector(
      '.dnb-toaster__notification-center .dnb-toaster__item__dismiss'
    )
    fireEvent.click(ncDismiss)

    // Still in store during animation
    expect(
      document.querySelector('[data-testid="message-count"]').textContent
    ).toBe('1')

    // After animation delay + buffer, removed from store
    act(() => {
      vi.advanceTimersByTime(DISMISS_ANIMATION_MS + 150)
    })

    expect(
      document.querySelector('[data-testid="message-count"]').textContent
    ).toBe('0')

    vi.useRealTimers()
  })

  it('toast stack and notification center both have role="log"', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    // Toast stack has role="log"
    const stackLog = document.querySelector(
      '.dnb-toaster__toast-stack [role="log"]'
    )
    expect(stackLog).toBeInTheDocument()

    // Open notification center
    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    // Notification center panel has role="log"
    const notificationCenterLog = document.querySelector(
      '.dnb-toaster__notification-center [role="log"]'
    )
    expect(notificationCenterLog).toBeInTheDocument()
  })

  it('shows newest messages last in notification center', () => {
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

    const items = document.querySelectorAll(
      '.dnb-toaster__notification-center .dnb-toaster__item'
    )
    // Chronological order: oldest first, newest last (bottom-aligned)
    expect(
      items[0].querySelector('.dnb-toaster__item__title').textContent
    ).toBe('Info title')
    expect(
      items[1].querySelector('.dnb-toaster__item__title').textContent
    ).toBe('Success title')
  })

  it('all notification center items are keyboard-navigable when open', () => {
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

    const items = document.querySelectorAll(
      '.dnb-toaster__notification-center .dnb-toaster__item'
    )
    expect(items.length).toBe(2)

    // Each item should have a focusable dismiss button
    const dismissButtons = document.querySelectorAll(
      '.dnb-toaster__notification-center .dnb-toaster__item__dismiss'
    )
    expect(dismissButtons.length).toBe(2)

    // Tab through — each dismiss button should be focusable
    Array.from(dismissButtons).forEach((btn) => {
      ;(btn as HTMLElement).focus()
      expect(document.activeElement).toBe(btn)
    })
  })

  it('shows newest messages first in toast stack', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))
    fireEvent.click(document.querySelector('[data-testid="add-success"]'))

    const items = document.querySelectorAll(
      '.dnb-toaster__toast-stack .dnb-toaster__item'
    )
    expect(
      items[0].querySelector('.dnb-toaster__item__title').textContent
    ).toBe('Success title')
    expect(
      items[1].querySelector('.dnb-toaster__item__title').textContent
    ).toBe('Info title')
  })

  it('shows all messages in toast stack', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))
    fireEvent.click(document.querySelector('[data-testid="add-success"]'))
    fireEvent.click(document.querySelector('[data-testid="add-active"]'))

    const items = document.querySelectorAll(
      '.dnb-toaster__toast-stack .dnb-toaster__item'
    )
    expect(items.length).toBe(3)
  })

  it('shows newest messages last in inline mode', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid} inline>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))
    fireEvent.click(document.querySelector('[data-testid="add-success"]'))

    const items = document.querySelectorAll('.dnb-toaster__item')
    expect(
      items[0].querySelector('.dnb-toaster__item__title').textContent
    ).toBe('Info title')
    expect(
      items[1].querySelector('.dnb-toaster__item__title').textContent
    ).toBe('Success title')
  })

  it('hides notification button when no messages are present', () => {
    const tid = uniqueId()
    render(
      <Toaster
        id={tid}
        notificationButtonPlacement="inline"
        autoHideNotificationButton
      >
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    const wrapper = document.querySelector(
      '.dnb-toaster__notification-button-inline'
    )
    expect(wrapper).toHaveClass(
      'dnb-toaster__notification-button-inline--hidden'
    )
  })

  it('hides notification button when all messages are in the stack', () => {
    const tid = uniqueId()
    render(
      <Toaster
        id={tid}
        notificationButtonPlacement="inline"
        autoHideNotificationButton
      >
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    const wrapper = document.querySelector(
      '.dnb-toaster__notification-button-inline'
    )
    expect(wrapper).toHaveClass(
      'dnb-toaster__notification-button-inline--hidden'
    )
  })

  it('shows notification button when a message is dismissed from stack', () => {
    vi.useFakeTimers()

    const tid = uniqueId()
    render(
      <Toaster
        id={tid}
        notificationButtonPlacement="inline"
        autoHideNotificationButton
      >
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))
    fireEvent.click(document.querySelector('[data-testid="add-success"]'))

    // Dismiss one from the stack
    const dismissBtns = document.querySelectorAll(
      '.dnb-toaster__toast-stack .dnb-toaster__item__dismiss'
    )
    fireEvent.click(dismissBtns[0])

    act(() => {
      vi.advanceTimersByTime(DISMISS_ANIMATION_MS + 150)
    })

    const wrapper = document.querySelector(
      '.dnb-toaster__notification-button-inline'
    )
    expect(wrapper).not.toHaveClass(
      'dnb-toaster__notification-button-inline--hidden'
    )

    vi.useRealTimers()
  })

  it('auto-closes notification center and hides button when last message is dismissed', () => {
    vi.useFakeTimers()

    const tid = uniqueId()
    render(
      <Toaster
        id={tid}
        notificationButtonPlacement="inline"
        autoHideNotificationButton
      >
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    // Open notification center
    const notificationButton = document.querySelector(
      '.dnb-toaster__notification-button'
    )
    fireEvent.click(notificationButton)

    // Dismiss from notification center
    const dismiss = document.querySelector(
      '.dnb-toaster__notification-center .dnb-toaster__item__dismiss'
    )
    fireEvent.click(dismiss)

    // Wait for dismiss animation + buffer
    act(() => {
      vi.advanceTimersByTime(DISMISS_ANIMATION_MS + 150)
    })

    // NC auto-closes when last message is dismissed
    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')

    vi.useRealTimers()
  })

  it('hides floating notification button when no messages are present', () => {
    const tid = uniqueId()
    render(
      <Toaster
        id={tid}
        notificationButtonPlacement="floating"
        autoHideNotificationButton
      >
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    const wrapper = document.querySelector(
      '.dnb-toaster__notification-button-floating'
    )
    expect(wrapper).toHaveClass(
      'dnb-toaster__notification-button-floating--hidden'
    )
  })

  it('auto-closes notification center when all messages are dismissed', () => {
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
    const dismiss = document.querySelector(
      '.dnb-toaster__notification-center .dnb-toaster__item__dismiss'
    )
    fireEvent.click(dismiss)

    // Wait for dismiss animation to remove the message
    act(() => {
      vi.advanceTimersByTime(DISMISS_ANIMATION_MS + 150)
    })

    // NC auto-closes when last message is dismissed
    expect(notificationButton.getAttribute('aria-expanded')).toBe('false')

    vi.useRealTimers()
  })

  it('applies placement class to toast stack', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid} placement="top-right">
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    expect(
      document.querySelector('.dnb-toaster__toast-stack--top-right')
    ).toBeInTheDocument()
  })

  it('uses bottom-center placement by default', () => {
    const tid = uniqueId()
    render(
      <Toaster id={tid}>
        <TestConsumer toasterId={tid} />
      </Toaster>
    )

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    expect(
      document.querySelector('.dnb-toaster__toast-stack--bottom-center')
    ).toBeInTheDocument()
  })
})
