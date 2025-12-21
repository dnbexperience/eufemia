import { MutableRefObject, useCallback } from 'react'

/**
 * A hook to handle cursor position and navigation between multiple masked input fields.
 */
function useHandleCursorPosition(
  keysToHandle?: RegExp | { [inputId: string]: RegExp[] },
  scopeRootRef?: MutableRefObject<HTMLElement | null>
) {
  const scheduleCaretCheck = useCallback((cb: () => void) => {
    if (
      typeof window !== 'undefined' &&
      typeof window.requestAnimationFrame === 'function'
    ) {
      window.requestAnimationFrame(() => {
        setTimeout(cb, 0)
      })
      return
    }
    setTimeout(cb, 0)
  }, [])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement
      const key = event.key

      const size = getInputVisualSize(input)
      const placeholder = input.placeholder || ''
      const typedLen = getTypedLengthBasic(
        input.value || '',
        placeholder,
        size
      )
      const selStart = input.selectionStart ?? 0
      const selEnd = input.selectionEnd ?? selStart
      const hasSelection = selStart !== selEnd
      const atStart = selStart === 0 && selEnd === 0
      const atEnd = selStart === size && selEnd === size

      const allInputs = listAllInputs(scopeRootRef?.current || undefined)
      const index = allInputs.findIndex((el) => el === input)
      const prev = index > 0 ? allInputs[index - 1] : undefined
      const next = index >= 0 ? allInputs[index + 1] : undefined

      // Backspace behavior
      if (key === 'Backspace') {
        if (typedLen === 0 && prev) {
          event.preventDefault()
          focusInput(prev, 'end')
        }
        return
      }

      // Arrow navigation
      if (key === 'ArrowRight') {
        if (hasSelection) {
          // Collapse to end of selection on first ArrowRight
          try {
            input.setSelectionRange(selEnd, selEnd)
          } catch {
            // ignore
          }
          event.preventDefault()
          return
        }
        if (atEnd && next) {
          event.preventDefault()
          focusInput(next, 'start')
        }
        return
      }
      if (key === 'ArrowLeft') {
        if (hasSelection) {
          // Collapse to start of selection on first ArrowLeft
          try {
            input.setSelectionRange(selStart, selStart)
          } catch {
            // ignore
          }
          event.preventDefault()
          return
        }
        if (atStart && prev) {
          event.preventDefault()
          focusInput(prev, 'end')
        }
        return
      }

      const allowMask = () => {
        if (!keysToHandle) {
          return true
        }
        const reg = getKeysToHandle({ keysToHandle, input })
        return reg ? reg.test(key) : true
      }

      // Auto-advance when filled and caret is at the end
      if (key.length === 1 && allowMask()) {
        // Defer until value updates, then check typed length
        scheduleCaretCheck(() => {
          const current = document.activeElement as HTMLInputElement | null
          const el = current && current.id === input.id ? current : input
          const len = getTypedLengthBasic(
            el.value || '',
            el.placeholder || '',
            size
          )
          const selStartNow = el.selectionStart ?? 0
          const selEndNow = el.selectionEnd ?? selStartNow
          const atEndNow = selStartNow === size && selEndNow === size
          if (len >= size && next && atEndNow) {
            focusInput(next, 'start')
          }
        })
      }
    },
    [keysToHandle, scopeRootRef, scheduleCaretCheck]
  )

  return { onKeyDown }
}

function listAllInputs(scope?: HTMLElement): HTMLInputElement[] {
  try {
    const root: Document | HTMLElement = scope || document
    return Array.from(
      root.querySelectorAll<HTMLInputElement>(
        '.dnb-multi-input-mask__input'
      )
    )
  } catch {
    return []
  }
}

function getTypedLengthBasic(
  value: string,
  placeholder: string,
  size: number
) {
  if (!size) return value.length
  const n = Math.min(size, value.length)
  let count = 0
  for (let i = 0; i < n; i++) {
    if (!placeholder || placeholder[i] !== value[i]) count++
  }
  return count
}

type GetKeysToHandleParams = {
  keysToHandle: RegExp | { [inputId: string]: RegExp[] }
  input: HTMLInputElement
}

function getKeysToHandle({ keysToHandle, input }: GetKeysToHandleParams) {
  if (!keysToHandle) {
    return undefined
  }

  if (keysToHandle instanceof RegExp) {
    return keysToHandle
  }

  const masks = keysToHandle[input.dataset.maskId]

  const selection =
    input.selectionStart === input.selectionEnd
      ? input.selectionStart
      : undefined

  // Important: selection can be 0 which is a valid index
  if (selection === undefined || selection === null) {
    return undefined
  }

  const maskIndex = selection === input.size ? masks.length - 1 : selection

  return masks[maskIndex]
}

function focusInput(el: HTMLInputElement, _where: 'start' | 'end') {
  try {
    // Only move focus; selection is handled uniformly in component onFocus (select-all)
    el.focus()
  } catch {
    // ignore
  }
}

// Local helpers
function getInputVisualSize(input: HTMLInputElement): number {
  if (typeof input.size === 'number' && input.size > 0) {
    return input.size
  }
  if (typeof input.maxLength === 'number' && input.maxLength > 0) {
    return input.maxLength
  }
  return input.value ? input.value.length : 0
}

export default useHandleCursorPosition
