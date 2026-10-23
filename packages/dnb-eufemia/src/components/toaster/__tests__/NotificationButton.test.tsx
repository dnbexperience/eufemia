import { fireEvent, render } from '@testing-library/react'
import { createRef } from 'react'
import NotificationButton from '../NotificationButton'

it('composes notification button props with the internal ref, classes and handlers', () => {
  const internalRef = createRef<HTMLButtonElement>()
  const externalRef = createRef<HTMLButtonElement>()
  const toggle = vi.fn()
  const pointer = vi.fn()
  const focus = vi.fn()
  const onClick = vi.fn()
  const onPointerDown = vi.fn()
  const onFocus = vi.fn()
  render(
    <NotificationButton
      isOpen={false}
      hasMessages
      allMessagesInStack={false}
      messageCount={1}
      floating={false}
      autoHide={false}
      showBadge={false}
      pulseKey={0}
      notificationButtonRef={internalRef}
      notificationButtonProps={{
        ref: externalRef,
        className: 'custom-button',
        onClick,
        onPointerDown,
        onFocus,
      }}
      onNotificationButtonToggle={toggle}
      onPointerDown={pointer}
      onFocus={focus}
      onReturnFocus={vi.fn()}
    />
  )
  const button = document.querySelector('button')
  expect(button).toHaveClass(
    'dnb-toaster__notification-button',
    'custom-button'
  )
  expect(internalRef.current).toBe(button)
  expect(externalRef.current).toBe(button)
  fireEvent.click(button)
  fireEvent.pointerDown(button)
  fireEvent.focus(button)
  expect(toggle).toHaveBeenCalledTimes(1)
  expect(pointer).toHaveBeenCalledTimes(1)
  expect(focus).toHaveBeenCalledTimes(1)
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(onPointerDown).toHaveBeenCalledTimes(1)
  expect(onFocus).toHaveBeenCalledTimes(1)
})
