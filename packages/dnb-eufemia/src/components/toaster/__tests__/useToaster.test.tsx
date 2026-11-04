import { act, fireEvent, render } from '@testing-library/react'
import { useToaster, toasterManager } from '../Toaster'
import { uniqueId, TestConsumer } from './testHelpers'

describe('useToaster', () => {
  it('adds a message', () => {
    const tid = uniqueId()
    render(<TestConsumer toasterId={tid} />)

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    expect(
      document.querySelector('[data-testid="message-count"]').textContent
    ).toBe('1')
  })

  it('adds message with default status unread', () => {
    const tid = uniqueId()
    render(<TestConsumer toasterId={tid} />)

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    expect(
      document.querySelector('[data-testid="unread-count"]').textContent
    ).toBe('1')
  })

  it('updates existing message when same id is used', () => {
    const tid = uniqueId()
    render(<TestConsumer toasterId={tid} />)

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))
    fireEvent.click(document.querySelector('[data-testid="add-info"]'))

    expect(
      document.querySelector('[data-testid="message-count"]').textContent
    ).toBe('1')
  })

  it('dismisses a message', () => {
    const tid = uniqueId()
    render(<TestConsumer toasterId={tid} />)

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))
    fireEvent.click(
      document.querySelector('[data-testid="dismiss-msg-1"]')
    )

    expect(
      document.querySelector('[data-testid="unread-count"]').textContent
    ).toBe('0')
  })

  it('dismisses all messages', () => {
    const tid = uniqueId()
    render(<TestConsumer toasterId={tid} />)

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))
    fireEvent.click(document.querySelector('[data-testid="add-success"]'))
    fireEvent.click(document.querySelector('[data-testid="dismiss-all"]'))

    expect(
      document.querySelector('[data-testid="unread-count"]').textContent
    ).toBe('0')
  })

  it('marks a message as read', () => {
    const tid = uniqueId()
    render(<TestConsumer toasterId={tid} />)

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))
    fireEvent.click(
      document.querySelector('[data-testid="mark-read-msg-1"]')
    )

    expect(
      document.querySelector('[data-testid="unread-count"]').textContent
    ).toBe('0')

    expect(
      document.querySelector('[data-testid="message-count"]').textContent
    ).toBe('1')
  })

  it('removes a message entirely', () => {
    const tid = uniqueId()
    render(<TestConsumer toasterId={tid} />)

    fireEvent.click(document.querySelector('[data-testid="add-info"]'))
    fireEvent.click(document.querySelector('[data-testid="remove-msg-1"]'))

    expect(
      document.querySelector('[data-testid="message-count"]').textContent
    ).toBe('0')
  })

  it('dismisses a sensitive message without modifying content', () => {
    const tid = uniqueId()

    function SensitiveConsumer() {
      const { messages, addMessage, dismissMessage } = useToaster(tid)

      return (
        <div>
          <button
            data-testid="add"
            onClick={() =>
              addMessage({
                id: 'sensitive-1',
                variant: 'info',
                title: 'Secret',
                text: 'Account 1234',
                privacy: 'sensitive',
                privacyFallbackText: 'Removed.',
              })
            }
          />

          <button
            data-testid="dismiss"
            onClick={() => dismissMessage('sensitive-1')}
          />

          {messages.map((m) => (
            <span key={m.id} data-testid="msg">
              {`status:${m.status},text:${typeof m.text === 'string' ? m.text : 'none'}`}
            </span>
          ))}
        </div>
      )
    }

    render(<SensitiveConsumer />)

    fireEvent.click(document.querySelector('[data-testid="add"]'))
    expect(document.querySelector('[data-testid="msg"]').textContent).toBe(
      'status:unread,text:Account 1234'
    )

    fireEvent.click(document.querySelector('[data-testid="dismiss"]'))
    expect(document.querySelector('[data-testid="msg"]').textContent).toBe(
      'status:dismissed,text:Account 1234'
    )
  })
})

describe('toasterManager (imperative)', () => {
  it('adds a message before any component mounts', () => {
    const tid = uniqueId()
    const manager = toasterManager(tid)

    act(() => {
      manager.addMessage({
        id: 'pre-1',
        variant: 'success',
        title: 'Pre-mount',
      })
    })

    function Consumer() {
      const { messages } = useToaster(tid)
      return <span data-testid="count">{messages.length}</span>
    }

    render(<Consumer />)

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('1')
  })

  it('adds a message after component mounts', () => {
    const tid = uniqueId()

    function Consumer() {
      const { messages } = useToaster(tid)
      return <span data-testid="count">{messages.length}</span>
    }

    render(<Consumer />)

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('0')

    const manager = toasterManager(tid)

    act(() => {
      manager.addMessage({
        id: 'imp-1',
        variant: 'success',
        title: 'Saved',
      })
    })

    expect(
      document.querySelector('[data-testid="count"]').textContent
    ).toBe('1')
  })

  it('dismisses a message imperatively', () => {
    const tid = uniqueId()
    const manager = toasterManager(tid)

    function Consumer() {
      const { messages } = useToaster(tid)
      return (
        <span data-testid="status">{messages[0]?.status ?? 'none'}</span>
      )
    }

    render(<Consumer />)

    act(() => {
      manager.addMessage({ id: 'imp-2', title: 'Test' })
    })

    expect(
      document.querySelector('[data-testid="status"]').textContent
    ).toBe('unread')

    act(() => {
      manager.dismissMessage('imp-2')
    })

    expect(
      document.querySelector('[data-testid="status"]').textContent
    ).toBe('dismissed')
  })

  it('works without any mounted component', () => {
    const tid = uniqueId()
    const manager = toasterManager(tid)

    expect(() => {
      manager.addMessage({ id: 'orphan', title: 'No UI' })
    }).not.toThrow()

    expect(() => {
      manager.dismissMessage('orphan')
    }).not.toThrow()
  })
})
