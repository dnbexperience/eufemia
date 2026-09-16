import { fireEvent, render } from '@testing-library/react'
import ToasterItem from '../ToasterItem'
import type { ToasterMessage } from '../types'

const baseMessage: ToasterMessage = {
  id: 'test-1',
  variant: 'info',
  title: 'Test title',
  text: 'Test text',
  status: 'unread',
  createdAt: Date.now(),
}

describe('ToasterItem', () => {
  it('renders with title and text', () => {
    render(<ToasterItem message={baseMessage} />)

    expect(
      document.querySelector('.dnb-toaster__item__title').textContent
    ).toBe('Test title')

    expect(
      document.querySelector('.dnb-toaster__item__text').textContent
    ).toBe('Test text')
  })

  it('renders with correct variant class', () => {
    render(<ToasterItem message={{ ...baseMessage, variant: 'error' }} />)

    expect(
      document.querySelector('.dnb-toaster__item--error')
    ).toBeInTheDocument()
  })

  it('renders dismiss button when onDismiss is provided', () => {
    const onDismiss = vi.fn()
    render(<ToasterItem message={baseMessage} onDismiss={onDismiss} />)

    const dismissBtn = document.querySelector(
      '.dnb-toaster__item__dismiss'
    )
    expect(dismissBtn).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', () => {
    const onDismiss = vi.fn()
    render(<ToasterItem message={baseMessage} onDismiss={onDismiss} />)

    fireEvent.click(document.querySelector('.dnb-toaster__item__dismiss'))
    expect(onDismiss).toHaveBeenCalledWith('test-1')
  })

  it('does not render dismiss button for already dismissed messages', () => {
    render(
      <ToasterItem
        message={{ ...baseMessage, status: 'dismissed' }}
        onDismiss={vi.fn()}
      />
    )

    expect(
      document.querySelector('.dnb-toaster__item__dismiss')
    ).not.toBeInTheDocument()
  })

  it('renders actions for active messages', () => {
    const actions = (
      <>
        <button>Retry</button>
        <button>Cancel</button>
      </>
    )

    render(<ToasterItem message={{ ...baseMessage, actions }} />)

    const actionButtons = document.querySelectorAll(
      '.dnb-toaster__item__actions button'
    )
    expect(actionButtons.length).toBe(2)
  })

  it('does not render actions when dismissed', () => {
    const actions = <button>Retry</button>

    render(
      <ToasterItem
        message={{
          ...baseMessage,
          actions,
          status: 'dismissed',
        }}
      />
    )

    expect(
      document.querySelector('.dnb-toaster__item__actions')
    ).not.toBeInTheDocument()
  })

  it('has role="group" with aria-label', () => {
    render(<ToasterItem message={baseMessage} />)

    const item = document.querySelector('.dnb-toaster__item')
    expect(item.getAttribute('role')).toBe('group')
    expect(item.getAttribute('aria-label')).toBe('Test title')
  })

  it('applies dismissed class when status is dismissed', () => {
    render(
      <ToasterItem message={{ ...baseMessage, status: 'dismissed' }} />
    )

    expect(
      document.querySelector('.dnb-toaster__item--dismissed')
    ).toBeInTheDocument()
  })

  it('applies expired class when status is expired', () => {
    render(<ToasterItem message={{ ...baseMessage, status: 'expired' }} />)

    expect(
      document.querySelector('.dnb-toaster__item--expired')
    ).toBeInTheDocument()
  })

  it('renders an icon for each variant', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const

    for (const variant of variants) {
      const { unmount } = render(
        <ToasterItem message={{ ...baseMessage, variant }} />
      )

      expect(
        document.querySelector('.dnb-toaster__item__icon .dnb-icon')
      ).toBeInTheDocument()

      unmount()
    }
  })

  it('calls onVisible when rendered', () => {
    const onVisible = vi.fn()
    render(<ToasterItem message={baseMessage} onVisible={onVisible} />)

    expect(onVisible).toHaveBeenCalledWith('test-1')
  })
})
