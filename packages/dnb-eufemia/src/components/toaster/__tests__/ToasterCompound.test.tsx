import { act, fireEvent, render } from '@testing-library/react'
import Toaster from '../index'
import { useToaster } from '../ToasterContext'
import { uniqueId } from './testHelpers'
import { DISMISS_ANIMATION_MS } from '../useToasterState'

function CompoundConsumer({ toasterId }: { toasterId: string }) {
  const { addMessage, dismissMessage } = useToaster(toasterId)

  return (
    <div>
      <button
        data-testid="add-info"
        onClick={() =>
          addMessage({
            id: 'msg-1',
            variant: 'info',
            title: 'Info title',
            text: 'Info message text',
          })
        }
      />

      <button
        data-testid="add-success"
        onClick={() =>
          addMessage({
            id: 'msg-2',
            variant: 'success',
            title: 'Success title',
            text: 'Success message text',
          })
        }
      />

      <button
        data-testid="dismiss-msg-1"
        onClick={() => dismissMessage('msg-1')}
      />
    </div>
  )
}

describe('Toaster compound components', () => {
  describe('NotificationCenter', () => {
    it('renders trigger button and panel', () => {
      const tid = uniqueId()
      render(
        <>
          <CompoundConsumer toasterId={tid} />
          <Toaster.Host id={tid} />
          <Toaster.NotificationCenter.Button hostId={tid} />
          <Toaster.NotificationCenter hostId={tid} />
        </>
      )

      expect(
        document.querySelector('.dnb-toaster__notification-button')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-toaster__notification-center')
      ).toBeInTheDocument()
    })

    it('renders focus proxy inside trigger button', () => {
      const tid = uniqueId()
      render(
        <>
          <CompoundConsumer toasterId={tid} />
          <Toaster.Host id={tid} />
          <Toaster.NotificationCenter.Button hostId={tid} />
          <Toaster.NotificationCenter hostId={tid} />
        </>
      )

      expect(
        document.querySelector('.dnb-toaster__focus-proxy')
      ).toBeInTheDocument()
    })

    it('opens notification center when trigger button is clicked', () => {
      const tid = uniqueId()
      render(
        <>
          <CompoundConsumer toasterId={tid} />
          <Toaster.Host id={tid} />
          <Toaster.NotificationCenter.Button hostId={tid} />
          <Toaster.NotificationCenter hostId={tid} />
        </>
      )

      fireEvent.click(document.querySelector('[data-testid="add-info"]'))

      const btn = document.querySelector(
        '.dnb-toaster__notification-button'
      )
      fireEvent.click(btn)
      expect(btn.getAttribute('aria-expanded')).toBe('true')
    })

    it('shows messages in notification center panel', () => {
      const tid = uniqueId()
      render(
        <>
          <CompoundConsumer toasterId={tid} />
          <Toaster.Host id={tid} />
          <Toaster.NotificationCenter.Button hostId={tid} />
          <Toaster.NotificationCenter hostId={tid} />
        </>
      )

      fireEvent.click(document.querySelector('[data-testid="add-info"]'))

      const btn = document.querySelector(
        '.dnb-toaster__notification-button'
      )
      fireEvent.click(btn)

      expect(
        document.querySelector(
          '.dnb-toaster__notification-center .dnb-toaster__item'
        )
      ).toBeInTheDocument()
    })

    it('renders without trigger button', () => {
      const tid = uniqueId()
      render(
        <>
          <CompoundConsumer toasterId={tid} />
          <Toaster.Host id={tid} />
          <Toaster.NotificationCenter hostId={tid} />
        </>
      )

      expect(
        document.querySelector('.dnb-toaster__notification-button')
      ).not.toBeInTheDocument()

      expect(
        document.querySelector('.dnb-toaster__notification-center')
      ).toBeInTheDocument()
    })

    it('forwards Button props to the notification button', () => {
      const tid = uniqueId()
      render(
        <>
          <CompoundConsumer toasterId={tid} />
          <Toaster.Host id={tid} />
          <Toaster.NotificationCenter.Button
            hostId={tid}
            iconPosition="right"
          />
          <Toaster.NotificationCenter hostId={tid} />
        </>
      )

      const button = document.querySelector(
        '.dnb-toaster__notification-button'
      )
      expect(button.classList).toContain('dnb-button--icon-position-right')
    })
  })

  describe('NotificationCenterList', () => {
    it('renders messages inline', () => {
      const tid = uniqueId()
      render(
        <>
          <CompoundConsumer toasterId={tid} />
          <Toaster.Host id={tid} />
          <Toaster.NotificationCenterList hostId={tid} />
        </>
      )

      fireEvent.click(document.querySelector('[data-testid="add-info"]'))

      expect(
        document.querySelector('.dnb-toaster__list')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-toaster__item')
      ).toBeInTheDocument()
    })

    it('renders multiple messages in chronological order', () => {
      const tid = uniqueId()
      render(
        <>
          <CompoundConsumer toasterId={tid} />
          <Toaster.Host id={tid} />
          <Toaster.NotificationCenterList hostId={tid} />
        </>
      )

      fireEvent.click(document.querySelector('[data-testid="add-info"]'))
      fireEvent.click(
        document.querySelector('[data-testid="add-success"]')
      )

      const items = document.querySelectorAll(
        '.dnb-toaster__list .dnb-toaster__item'
      )
      expect(items.length).toBe(2)
      expect(
        items[0].querySelector('.dnb-toaster__item__title').textContent
      ).toBe('Info title')
      expect(
        items[1].querySelector('.dnb-toaster__item__title').textContent
      ).toBe('Success title')
    })

    it('renders messages in reverse order with order="desc"', () => {
      vi.useFakeTimers()

      const tid = uniqueId()
      render(
        <>
          <CompoundConsumer toasterId={tid} />
          <Toaster.Host id={tid} />
          <Toaster.NotificationCenterList hostId={tid} order="desc" />
        </>
      )

      fireEvent.click(document.querySelector('[data-testid="add-info"]'))
      fireEvent.click(
        document.querySelector('[data-testid="add-success"]')
      )

      act(() => {
        vi.advanceTimersByTime(100)
      })

      const items = document.querySelectorAll(
        '.dnb-toaster__list .dnb-toaster__item'
      )
      expect(items.length).toBe(2)
      expect(
        items[0].querySelector('.dnb-toaster__item__title').textContent
      ).toBe('Success title')
      expect(
        items[1].querySelector('.dnb-toaster__item__title').textContent
      ).toBe('Info title')

      vi.useRealTimers()
    })

    it('dismisses messages from inline list', () => {
      vi.useFakeTimers()

      const tid = uniqueId()
      render(
        <>
          <CompoundConsumer toasterId={tid} />
          <Toaster.Host id={tid} />
          <Toaster.NotificationCenterList hostId={tid} />
        </>
      )

      fireEvent.click(document.querySelector('[data-testid="add-info"]'))
      expect(
        document.querySelector('.dnb-toaster__list .dnb-toaster__item')
      ).toBeInTheDocument()

      const inlineList = document.querySelector('.dnb-toaster__list')
      const dismiss = inlineList.querySelector(
        '.dnb-toaster__item__dismiss'
      )

      act(() => {
        fireEvent.click(dismiss)
      })

      act(() => {
        vi.advanceTimersByTime(DISMISS_ANIMATION_MS + 150)
      })

      expect(
        inlineList.querySelector('.dnb-toaster__item')
      ).not.toBeInTheDocument()

      vi.useRealTimers()
    })

    it('renders without notification center or trigger button', () => {
      const tid = uniqueId()
      render(
        <>
          <CompoundConsumer toasterId={tid} />
          <Toaster.Host id={tid} />
          <Toaster.NotificationCenterList hostId={tid} />
        </>
      )

      expect(
        document.querySelector('.dnb-toaster__notification-button')
      ).not.toBeInTheDocument()

      expect(
        document.querySelector('.dnb-toaster__notification-center')
      ).not.toBeInTheDocument()

      expect(
        document.querySelector('.dnb-toaster__list')
      ).toBeInTheDocument()
    })

    it('has role="log" on the list', () => {
      const tid = uniqueId()
      render(
        <>
          <CompoundConsumer toasterId={tid} />
          <Toaster.Host id={tid} />
          <Toaster.NotificationCenterList hostId={tid} />
        </>
      )

      expect(document.querySelector('[role="log"]')).toBeInTheDocument()
    })
  })

  describe('validation', () => {
    it('throws when notification UI is missing', () => {
      vi.useFakeTimers()

      const tid = uniqueId()

      expect(() => {
        render(
          <>
            <Toaster.Host id={tid} />
            <Toaster.NotificationCenter.Button hostId={tid} />
          </>
        )
        vi.runAllTimers()
      }).toThrow('No notification UI was found')

      vi.useRealTimers()
    })

    it('does not throw when NotificationCenter is present', () => {
      vi.useFakeTimers()

      const tid = uniqueId()

      expect(() => {
        render(
          <>
            <Toaster.Host id={tid} />
            <Toaster.NotificationCenter.Button hostId={tid} />
            <Toaster.NotificationCenter hostId={tid} />
          </>
        )
        vi.runAllTimers()
      }).not.toThrow()

      vi.useRealTimers()
    })

    it('does not throw when NotificationCenterList is used instead', () => {
      vi.useFakeTimers()

      const tid = uniqueId()

      expect(() => {
        render(
          <>
            <Toaster.Host id={tid} />
            <Toaster.NotificationCenterList hostId={tid} />
          </>
        )
        vi.runAllTimers()
      }).not.toThrow()

      vi.useRealTimers()
    })
  })

  describe('Sensitive messages', () => {
    it('shows fallback text instead of original text in notification center', () => {
      const tid = uniqueId()

      function SensitiveConsumer() {
        const { addMessage } = useToaster(tid)

        return (
          <button
            data-testid="add-sensitive"
            onClick={() =>
              addMessage({
                id: 'secret',
                title: 'Secret title',
                text: 'Account 1234',
                privacy: 'sensitive',
                privacyFallbackText: 'Content removed.',
              })
            }
          />
        )
      }

      render(
        <>
          <SensitiveConsumer />
          <Toaster.Host id={tid} />
          <Toaster.NotificationCenter.Button hostId={tid} />
          <Toaster.NotificationCenter hostId={tid} />
        </>
      )

      fireEvent.click(
        document.querySelector('[data-testid="add-sensitive"]')
      )

      // Open notification center
      fireEvent.click(
        document.querySelector('.dnb-toaster__notification-button')
      )

      // Title is kept, text is replaced with fallback
      const item = document.querySelector(
        '.dnb-toaster__notification-center .dnb-toaster__item'
      )
      expect(
        item.querySelector('.dnb-toaster__item__title').textContent
      ).toBe('Secret title')
      expect(
        item.querySelector('.dnb-toaster__item__text').textContent
      ).toBe('Content removed.')
    })

    it('hides text in notification center when no privacyFallbackText is provided', () => {
      const tid = uniqueId()

      function SensitiveConsumer() {
        const { addMessage } = useToaster(tid)

        return (
          <button
            data-testid="add-sensitive"
            onClick={() =>
              addMessage({
                id: 'secret-no-fallback',
                title: 'Secret',
                text: 'Private data',
                privacy: 'sensitive',
              })
            }
          />
        )
      }

      render(
        <>
          <SensitiveConsumer />
          <Toaster.Host id={tid} />
          <Toaster.NotificationCenter.Button hostId={tid} />
          <Toaster.NotificationCenter hostId={tid} />
        </>
      )

      fireEvent.click(
        document.querySelector('[data-testid="add-sensitive"]')
      )

      // Open NC
      fireEvent.click(
        document.querySelector('.dnb-toaster__notification-button')
      )

      // Title is kept, text is hidden
      const item = document.querySelector(
        '.dnb-toaster__notification-center .dnb-toaster__item'
      )
      expect(
        item.querySelector('.dnb-toaster__item__title').textContent
      ).toBe('Secret')
      expect(item.querySelector('.dnb-toaster__item__text')).toBeNull()
    })
  })
})
