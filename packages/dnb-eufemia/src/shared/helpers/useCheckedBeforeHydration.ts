import { useEffect } from 'react'
import type {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  RefObject,
} from 'react'

type OnClickParams = ReactMouseEvent<HTMLInputElement> & {
  checked: boolean
  event: ReactMouseEvent<HTMLInputElement>
}

/**
 * Handles a checkbox the user changed in the server-rendered markup before hydration.
 * After mount, calls `onClick` and then `onChange` with the new state, as a click would.
 * Undoes the change when `readOnly`, or when `onClick` calls `preventDefault`.
 */
export default function useCheckedBeforeHydration({
  inputRef,
  checkedRef,
  readOnly,
  onClick,
  onChange,
}: {
  inputRef: RefObject<HTMLInputElement | undefined>
  checkedRef: RefObject<boolean>
  readOnly?: boolean
  onClick?: (args: OnClickParams) => void
  onChange: (
    checked: boolean,
    event: ChangeEvent<HTMLInputElement>
  ) => void
}) {
  useEffect(() => {
    const input = inputRef.current
    if (
      input?.type !== 'checkbox' || // e.g. a Checkbox with element="span"
      input.checked === Boolean(checkedRef.current)
    ) {
      return // stop here
    }

    const undoChange = () => {
      input.checked = Boolean(checkedRef.current)
    }

    if (readOnly) {
      undoChange()
      return // stop here
    }

    if (onClick) {
      const clickEvent = createEvent('click', input)
      onClick({
        checked: Boolean(checkedRef.current),
        event: clickEvent,
        ...clickEvent,
        preventDefault: () => clickEvent.preventDefault(),
      } as unknown as OnClickParams)

      if (clickEvent.defaultPrevented) {
        undoChange()
        return // stop here
      }
    }

    const event = createEvent('change', input)
    onChange(
      input.checked,
      event as unknown as ChangeEvent<HTMLInputElement>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only the server-rendered markup can differ
  }, [])
}

// Like React's event: the input as target and currentTarget, and own fields that can be spread
function createEvent(type: 'click' | 'change', input: HTMLInputElement) {
  const event =
    type === 'click'
      ? new MouseEvent(type, { bubbles: true, cancelable: true })
      : new Event(type, { bubbles: true })
  let isPropagationStopped = false
  const fields = {
    type,
    timeStamp: event.timeStamp,
    target: input,
    currentTarget: input,
    nativeEvent: event,
    isDefaultPrevented: () => event.defaultPrevented,
    isPropagationStopped: () => isPropagationStopped,
    stopPropagation: () => {
      isPropagationStopped = true
    },
    persist: () => undefined,
  }
  for (const [key, value] of Object.entries(fields)) {
    Object.defineProperty(event, key, { value, enumerable: true })
  }
  return event
}
