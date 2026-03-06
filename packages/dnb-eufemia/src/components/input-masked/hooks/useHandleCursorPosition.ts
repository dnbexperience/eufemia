import { RefObject, useCallback } from 'react'

type TransferToNextParams = {
  key: string
  currentInput: HTMLInputElement
  nextInput: HTMLInputElement
}

type UseHandleCursorPositionOptions = {
  onTransferToNext?: (params: TransferToNextParams) => void
}

/**
 * A hook to handle cursor position and navigation between multiple masked input fields.
 */
function useHandleCursorPosition(
  keysToHandle?: RegExp | { [inputId: string]: RegExp[] },
  scopeRootRef?: RefObject<HTMLElement | null>,
  options?: UseHandleCursorPositionOptions
) {
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
        if (!hasSelection && atEnd && typedLen >= size && next) {
          event.preventDefault()
          options?.onTransferToNext?.({
            key,
            currentInput: input,
            nextInput: next,
          })
          focusInput(next, 'start')
          return
        }
      }
    },
    [keysToHandle, options, scopeRootRef]
  )

  const onInput = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const input = event.currentTarget

      if (document.activeElement !== input) {
        return // Ignore input events that don't come from the focused element, e.g. programmatic value changes or autofill.
      }

      const size = getInputVisualSize(input)

      const selStart = input.selectionStart ?? 0
      const selEnd = input.selectionEnd ?? selStart
      const atEnd = selStart === size && selEnd === size

      if (!atEnd) {
        return
      }

      const typedLen = getTypedLengthBasic(
        input.value || '',
        input.placeholder || '',
        size
      )

      if (typedLen < size) {
        return
      }

      const next = getAdjacentInput(
        scopeRootRef?.current || undefined,
        input,
        'next'
      )

      if (next) {
        deferFocus(() => {
          focusInput(next, 'start')
        })
      }
    },
    [scopeRootRef]
  )

  return { onKeyDown, onInput }
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

// Resolve the neighboring masked input within the current scope so
// arrow/backspace navigation can move across split fields.
function getAdjacentInput(
  scope: HTMLElement | undefined,
  input: HTMLInputElement,
  direction: 'next' | 'prev'
) {
  const allInputs = listAllInputs(scope)
  const index = allInputs.findIndex((el) => el === input)

  if (index < 0) {
    return undefined
  }

  if (direction === 'prev') {
    return index > 0 ? allInputs[index - 1] : undefined
  }

  return index < allInputs.length - 1 ? allInputs[index + 1] : undefined
}

function getTypedLengthBasic(
  value: string,
  placeholder: string,
  size: number
) {
  if (!size) {
    return value.length
  }
  const n = Math.min(size, value.length)
  let count = 0
  for (let i = 0; i < n; i++) {
    if (!placeholder || placeholder[i] !== value[i]) {
      count++
    }
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

function deferFocus(cb: () => void) {
  // Defer focus until after the current input/update cycle so the next field
  // is focused against the latest DOM/state instead of the in-flight event. (window.queueMicrotask)
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(cb)
    return
  }

  // Fallback for environments without queueMicrotask support.
  Promise.resolve().then(cb)
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
