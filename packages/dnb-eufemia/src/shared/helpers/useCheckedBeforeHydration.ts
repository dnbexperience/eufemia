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
    if (!input || input.checked === Boolean(checkedRef.current)) {
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
      let isPrevented = false
      onClick({
        checked: Boolean(checkedRef.current),
        event: createEvent('click', input),
        target: input,
        currentTarget: input,
        preventDefault: () => {
          isPrevented = true
        },
      } as unknown as OnClickParams)

      if (isPrevented) {
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

// The handler gets the input as target and currentTarget, as with a real event
function createEvent(type: 'click' | 'change', input: HTMLInputElement) {
  const event =
    type === 'click'
      ? new MouseEvent(type, { bubbles: true, cancelable: true })
      : new Event(type, { bubbles: true })
  Object.defineProperties(event, {
    target: { value: input },
    currentTarget: { value: input },
  })
  return event
}
