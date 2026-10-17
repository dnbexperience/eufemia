import { useEffect } from 'react'
import type { ChangeEvent, RefObject } from 'react'

/**
 * Handles a checkbox the user changed in the server-rendered markup before hydration.
 * Calls `onChange` with the new state after mount, or undoes the change when `readOnly`.
 */
export default function useCheckedBeforeHydration({
  inputRef,
  checkedRef,
  readOnly,
  onChange,
}: {
  inputRef: RefObject<HTMLInputElement | undefined>
  checkedRef: RefObject<boolean>
  readOnly?: boolean
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

    if (readOnly) {
      input.checked = Boolean(checkedRef.current)
      return // stop here
    }

    const event = new Event('change', { bubbles: true })
    Object.defineProperty(event, 'target', { value: input })
    onChange(
      input.checked,
      event as unknown as ChangeEvent<HTMLInputElement>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only the server-rendered markup can differ
  }, [])
}
