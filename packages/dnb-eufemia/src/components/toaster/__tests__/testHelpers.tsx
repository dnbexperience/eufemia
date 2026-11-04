import { useToaster } from '../Toaster'

let testCounter = 0
export function uniqueId() {
  testCounter += 1
  return `test-toaster-${testCounter}`
}

export function TestConsumer({ toasterId }: { toasterId: string }) {
  const {
    messages,
    addMessage,
    dismissMessage,
    dismissAllMessages,
    markMessageAsRead,
    removeMessage,
  } = useToaster(toasterId)

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
        data-testid="add-active"
        onClick={() =>
          addMessage({
            id: 'msg-active',
            variant: 'warning',
            title: 'Session expires',
            text: 'Your session will expire soon.',
            actions: (
              <>
                <button>Stay signed in</button>
                <button>Log out</button>
              </>
            ),
          })
        }
      />

      <button
        data-testid="add-with-actions"
        onClick={() =>
          addMessage({
            id: `msg-actions-${Date.now()}`,
            variant: 'neutral',
            title: 'Has actions',
            text: 'Message with actions.',
            actions: (
              <>
                <button>Action one</button>
                <button>Action two</button>
              </>
            ),
          })
        }
      />

      <button
        data-testid="add-with-focus-first-action"
        onClick={() =>
          addMessage({
            id: `msg-focus-action-${Date.now()}`,
            variant: 'neutral',
            title: 'Focused actions',
            text: 'Message with focus on first action.',
            focus: 'first-action',
            actions: (
              <>
                <button>Action one</button>
                <button>Action two</button>
              </>
            ),
          })
        }
      />

      <button
        data-testid="add-with-focus-message"
        onClick={() =>
          addMessage({
            id: `msg-focus-message-${Date.now()}`,
            variant: 'info',
            title: 'Focused message',
            text: 'Message with focus on container.',
            focus: 'message',
          })
        }
      />

      <button
        data-testid="dismiss-msg-1"
        onClick={() => dismissMessage('msg-1')}
      />

      <button
        data-testid="dismiss-all"
        onClick={() => dismissAllMessages()}
      />

      <button
        data-testid="mark-read-msg-1"
        onClick={() => markMessageAsRead('msg-1')}
      />

      <button
        data-testid="remove-msg-1"
        onClick={() => removeMessage('msg-1')}
      />

      <span data-testid="message-count">{messages.length}</span>

      <span data-testid="unread-count">
        {messages.filter((m) => m.status === 'unread').length}
      </span>
    </div>
  )
}
