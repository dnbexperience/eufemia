import { MutableRefObject, useCallback, useRef } from 'react'
import { IS_IOS } from '../../../shared/helpers'

function useHandleCursorPosition(
  keysToHandle?: RegExp | { [inputId: string]: RegExp[] },
  scopeRootRef?: MutableRefObject<HTMLElement | null>
) {
  // Expose a unified frame scheduler so consumers can defer work in sync
  const fnRef = useRef<() => void>()
  const scheduleFrame = useCallback((fn: () => void) => {
    fnRef.current = fn
  }, [])

  // Track a virtual caret for empty inputs to preserve Arrow navigation semantics
  const virtualCaretRef = useRef(new WeakMap<HTMLInputElement, number>())
  // Track if typing in a field started from empty, to decide when to auto-advance
  const typingStateRef = useRef(
    new WeakMap<HTMLInputElement, { startedEmpty: boolean }>()
  )

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      // Always compute a fresh list to avoid stale refs
      const inputs = refsToInputList({
        input: event.target as HTMLInputElement,
        scopeRoot: scopeRootRef?.current,
      })
      const input = event.target as HTMLInputElement

      const pressedKey = event.key

      const allowedByMask = getKeysToHandle({ keysToHandle, input })?.test(
        pressedKey
      )
      const isNavKey = /(ArrowRight|ArrowLeft|Backspace)/.test(pressedKey)
      const hasPressedKeysToHandle = allowedByMask || isNavKey

      const hasSelection = hasSelectedValue(input)

      const inputPosition =
        !hasSelection && getInputPosition(input, inputs)

      const initialSelectionStart = input.selectionStart

      const handleCursorPosition = () => {
        // Recompute in case refs changed between frames
        const latestInputs = refsToInputList({
          input,
          scopeRoot: scopeRootRef?.current,
        })
        if (!latestInputs.length) {
          return // stop here if the return returns undefined
        }

        if (!hasPressedKeysToHandle || hasSelection) {
          return // stop here if the return returns undefined
        }

        const caretPosition = getCaretPosition(input)

        const size = getInputVisualSize(input)

        // Determine logical typed length (ignoring ghost placeholder padding)
        const typedLen = getTypedLength(input)

        // Handle Backspace on empty inputs: always jump to previous field and place caret at its end
        if (pressedKey === 'Backspace' && typedLen === 0) {
          const idx = latestInputs.findIndex((el) => el?.id === input.id)
          const prev = idx > 0 ? latestInputs[idx - 1] : undefined
          if (prev) {
            // Ensure virtual caret reflects end position for effectively empty prev
            const end = getSelectionPositions(prev).end
            const vmap = virtualCaretRef.current
            try {
              if (getTypedLength(prev) === 0) {
                vmap.set(prev, end)
              }
            } catch {
              //
            }
            return goToInput('previous', input, latestInputs) // stop here if the return returns undefined
          }
          return // stop here if the return returns undefined
        }

        // Handle Arrow navigation for empty values using a virtual caret
        if (size > 0 && getTypedLength(input) === 0) {
          const map = virtualCaretRef.current
          const currentPos = map.get(input) ?? 0
          if (pressedKey === 'ArrowRight') {
            if (currentPos === 0) {
              // Simulate jump to end on first ArrowRight (as with visual mask)
              map.set(input, size)
              return // stop here if the return returns undefined
            } else if (currentPos < size) {
              map.set(input, currentPos + 1)
              return // stop here if the return returns undefined
            } else if (inputPosition !== 'last') {
              map.set(input, 0)
              return goToInput('next', input, latestInputs) // stop here if the return returns undefined
            }
          } else if (pressedKey === 'ArrowLeft') {
            if (currentPos > 0) {
              map.set(input, currentPos - 1)
            } else if (inputPosition !== 'first') {
              return goToInput('previous', input, latestInputs) // stop here if the return returns undefined
            }
            return // stop here if the return returns undefined
          }
        }

        // Arrow navigation based on pre-keydown caret position
        if (pressedKey === 'ArrowRight') {
          const nextPos = Math.min((initialSelectionStart ?? 0) + 1, size)
          if (nextPos >= size && inputPosition !== 'last') {
            const idx = latestInputs.findIndex((el) => el?.id === input.id)
            const next = idx >= 0 ? latestInputs[idx + 1] : undefined
            if (next) {
              // Set virtual caret to start for effectively empty next
              const vmap = virtualCaretRef.current
              try {
                if (getTypedLength(next) === 0) {
                  vmap.set(next, 0)
                }
              } catch {
                //
              }
            }
            return goToInput('next', input, latestInputs) // stop here if the return returns undefined
          }
        }
        if (pressedKey === 'ArrowLeft') {
          const prevPos = Math.max((initialSelectionStart ?? 0) - 1, 0)
          if (prevPos <= 0 && inputPosition !== 'first') {
            const idx = latestInputs.findIndex((el) => el?.id === input.id)
            const prev = idx > 0 ? latestInputs[idx - 1] : undefined
            if (prev) {
              const end = getSelectionPositions(prev).end
              const vmap = virtualCaretRef.current
              try {
                if (getTypedLength(prev) === 0) {
                  vmap.set(prev, end)
                }
              } catch {
                //
              }
            }
            return goToInput('previous', input, latestInputs) // stop here if the return returns undefined
          }
        }

        // Auto-advance on data entry when the current input becomes full
        // Two scenarios:
        // 1) Typing began from empty and this keystroke fills the field (legacy auto-advance)
        // 2) Field is already full and caret is at the visual end; carry the typed digit to next field
        if (!isNavKey && allowedByMask) {
          const currentTyped = getTypedLength(input)
          if (!typingStateRef.current.has(input)) {
            typingStateRef.current.set(input, {
              startedEmpty: currentTyped === 0,
            })
          }
          const { startedEmpty } = typingStateRef.current.get(input)
          const nextTyped = Math.min(size || 0, currentTyped + 1)
          const atVisualEnd = (initialSelectionStart ?? 0) === size
          const willAdvanceFromEmpty =
            size > 0 &&
            nextTyped >= size &&
            inputPosition !== 'last' &&
            startedEmpty
          const willCarryFromFull =
            size > 0 &&
            currentTyped >= size &&
            atVisualEnd &&
            inputPosition !== 'last'

          if (willAdvanceFromEmpty || willCarryFromFull) {
            const idx = latestInputs.findIndex((el) => el?.id === input.id)
            const nextInput = latestInputs[idx + 1]
            if (
              willCarryFromFull &&
              nextInput &&
              shouldAcceptInNext(pressedKey, nextInput, keysToHandle)
            ) {
              const doCarry = () => {
                enforceIOSNumericKeyboard(
                  nextInput,
                  input as HTMLInputElement
                )
                // Trigger InputModeNumber pre-focus routine (was bound to 'mouseenter')
                if (IS_IOS) {
                  try {
                    nextInput.dispatchEvent(new Event('mouseenter'))
                  } catch {
                    //
                  }
                }
                nextInput.focus()
                nextInput.setSelectionRange(0, 0)
                // Insert the pressed key and dispatch an input event so React/Maskito flows update state
                nextInput.value = String(pressedKey)
                nextInput.dispatchEvent(
                  new Event('input', { bubbles: true })
                )
                // Place caret at position 1 in next field
                window.requestAnimationFrame(() => {
                  nextInput.setSelectionRange(1, 1)
                })
              }
              if (IS_IOS) {
                setTimeout(doCarry, 15)
              } else {
                doCarry()
              }
              return // stop here if the return returns undefined
            }
            // Default for willAdvanceFromEmpty: move focus to next with caret at start
            return goToInput('next', input, latestInputs) // stop here if the return returns undefined
          }

          // If typing at the visual end (e.g., dd|), keep caret at end after masking
          if ((initialSelectionStart ?? 0) === size) {
            window.requestAnimationFrame(() => {
              const { end } = getSelectionPositions(input)
              input.setSelectionRange(end, end)
            })
          }
        }

        if (
          caretPosition === 'last' &&
          inputPosition !== 'last' &&
          !(initialSelectionStart === 1 && pressedKey === 'ArrowRight')
        ) {
          const idx = latestInputs.findIndex((el) => el?.id === input.id)
          const next = idx >= 0 ? latestInputs[idx + 1] : undefined
          if (next) {
            const vmap = virtualCaretRef.current
            try {
              if (getTypedLength(next) === 0) {
                vmap.set(next, 0)
              }
            } catch {
              //
            }
          }
          return goToInput('next', input, latestInputs) // stop here if the return returns undefined
        }

        if (
          caretPosition === 'first' &&
          inputPosition !== 'first' &&
          !(
            initialSelectionStart === 1 &&
            (pressedKey === 'ArrowLeft' || pressedKey === 'Backspace')
          )
        ) {
          const idx = latestInputs.findIndex((el) => el?.id === input.id)
          const prev = idx > 0 ? latestInputs[idx - 1] : undefined
          if (prev) {
            const end = getSelectionPositions(prev).end
            const vmap = virtualCaretRef.current
            try {
              if (getTypedLength(prev) === 0) {
                vmap.set(prev, end)
              }
            } catch {
              //
            }
          }
          return goToInput('previous', input, latestInputs) // stop here if the return returns undefined
        }
      }

      const run = () => {
        handleCursorPosition()
        fnRef.current?.()
      }

      if (IS_IOS) {
        setTimeout(run, 10)
      } else {
        setTimeout(run, 0)
      }
    },
    [keysToHandle, scopeRootRef]
  )

  return { onKeyDown, scheduleFrame }
}

// Helpers
type RefsToListArgs = {
  input?: HTMLInputElement
  scopeRoot?: HTMLElement | null
}

function refsToInputList({ input, scopeRoot }: RefsToListArgs) {
  // Prefer a provided scope root (component wrapper) if available
  const root: HTMLElement | null =
    scopeRoot ||
    // Fall back to MultiInputMask fieldset
    input?.closest?.('.dnb-multi-input-mask__fieldset')

  if (root) {
    return Array.from(
      root.querySelectorAll<HTMLInputElement>(
        '.dnb-multi-input-mask__input'
      )
    )
  }

  // Final fallback: only use the current input (avoid cross-component jumps)
  return input ? [input] : []
}

function getTypedLength(input: HTMLInputElement) {
  const val = input.value || ''
  const ph = input.placeholder || ''
  const size = getInputVisualSize(input)
  if (!size) {
    return val.length
  }
  // If placeholder length matches size, compute number of leading chars not equal to placeholder char
  if (ph && ph.length === size && val.length === size) {
    let i = 0
    while (i < size && val[i] !== ph[i]) i++
    return i
  }
  return val.length
}

function shouldAcceptInNext(
  key: string,
  nextInput: HTMLInputElement,
  keysToHandle?: RegExp | { [inputId: string]: RegExp[] }
) {
  if (!key || key.length !== 1) {
    return false
  }
  if (!keysToHandle) {
    return true
  }
  if (keysToHandle instanceof RegExp) {
    return keysToHandle.test(key)
  }
  const masks = keysToHandle[nextInput.dataset.maskId]
  if (!masks || masks.length === 0) {
    return true
  }
  const first = masks[0]
  return first instanceof RegExp ? first.test(key) : true
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

function getInputPosition(
  input: HTMLInputElement,
  inputs: HTMLInputElement[]
) {
  const firstInput = inputs[0]
  const lastInput = inputs[inputs.length - 1]

  if (input === firstInput) {
    return 'first'
  }

  if (input === lastInput) {
    return 'last'
  }

  return 'non-initial'
}

function getSelectionPositions(input: HTMLInputElement) {
  const end = getInputVisualSize(input)
  return { start: 0, end }
}

function hasSelectedValue(input: HTMLInputElement) {
  return input.selectionEnd > input.selectionStart
}

function getCaretPosition(input: HTMLInputElement) {
  const { start, end } = getSelectionPositions(input)

  const selectionStart = input.selectionStart
  const selectionEnd = input.selectionEnd

  if (selectionStart === start && selectionEnd === start) {
    return 'first'
  }

  if (selectionStart === end && selectionEnd === end) {
    return 'last'
  }

  return 'non-initial'
}

// Track a virtual caret position per element for ghost-only values when jumping
const goToInputVirtualCaret = new WeakMap<HTMLInputElement, number>()

function goToInput(
  to: 'next' | 'previous',
  input: HTMLInputElement,
  inputs: HTMLInputElement[]
) {
  const currentInputIndex = inputs.findIndex((el) => el?.id === input.id)

  const siblingIndex =
    to === 'next'
      ? currentInputIndex + 1
      : to === 'previous'
      ? currentInputIndex - 1
      : 0

  const siblingInput = inputs[siblingIndex]
  if (!siblingInput) {
    return // stop here if the return returns undefined
  }

  const { start, end } = getSelectionPositions(siblingInput)

  const doFocus = () => {
    enforceIOSNumericKeyboard(siblingInput, input)
    // Trigger InputModeNumber pre-focus routine (was bound to 'mouseenter')
    if (IS_IOS) {
      try {
        siblingInput.dispatchEvent(new Event('mouseenter'))
      } catch {
        //
      }
    }
    siblingInput.focus()

    if (to === 'next') {
      siblingInput.setSelectionRange(start, start)
      // If effectively empty, reset virtual caret to start for consistency
      try {
        if (getTypedLength(siblingInput) === 0) {
          goToInputVirtualCaret.set(siblingInput, 0)
        }
      } catch {
        //
      }
      return // stop here if the return returns undefined
    }

    if (to === 'previous') {
      siblingInput.setSelectionRange(end, end)
      // If effectively empty, set virtual caret to end to reflect visual caret
      try {
        if (getTypedLength(siblingInput) === 0) {
          goToInputVirtualCaret.set(siblingInput, end)
        }
      } catch {
        //
      }
      return // stop here if the return returns undefined
    }
  }

  if (IS_IOS) {
    setTimeout(doFocus, 20)
  } else {
    doFocus()
  }
}

function enforceIOSNumericKeyboard(
  target: HTMLInputElement,
  source?: HTMLInputElement
) {
  try {
    const im =
      source?.getAttribute('inputmode') || target.getAttribute('inputmode')
    if (im && !target.getAttribute('inputmode')) {
      target.setAttribute('inputmode', im)
    }
  } catch {
    //
  }
}

export default useHandleCursorPosition

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
