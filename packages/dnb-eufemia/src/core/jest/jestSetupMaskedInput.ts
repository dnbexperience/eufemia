/**
 * Shared test utilities for masked input components (MultiInputMask, DatePicker,
 * Field.Date, Field.Expiry).
 *
 * These helpers ensure requestAnimationFrame-based handlers (onFocus select-all,
 * auto-advance caret scheduling, onBlur callback) fire between individual
 * keystrokes in tests.
 */

import userEvent from '@testing-library/user-event'

/**
 * Flush requestAnimationFrame-based handlers in MultiInputMask.
 * Uses double-requestAnimationFrame to match the component's usage,
 * then a setTimeout to let any queued microtasks and timers settle.
 */
export const flushTimers = () =>
  new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTimeout(resolve, 0)
      })
    })
  })

/**
 * Expands a userEvent.keyboard sequence into individual keystroke tokens.
 * Repeat syntax like {Backspace>3} becomes ['{Backspace}', '{Backspace}', '{Backspace}'].
 */
export function expandKeySequence(sequence: string): string[] {
  const keys = sequence.match(/\{[^}]*\}|./g)
  if (!keys) {
    return []
  }

  return keys.flatMap((token) => {
    const repeatMatch = token.match(/^\{(.+?)>(\d+)\}$/)
    if (!repeatMatch) {
      return [token]
    }

    const key = `{${repeatMatch[1]}}`
    const count = Number(repeatMatch[2])
    return Array(count).fill(key)
  })
}

type KeyboardFn = typeof userEvent.keyboard

/**
 * Wraps userEvent.keyboard to flush requestAnimationFrame-based handlers
 * between keystrokes. Each token is sent individually with a flush so that
 * requestAnimationFrame-based handlers (like auto-advance in masked inputs)
 * fire between keystrokes.
 *
 * When `passthroughModifiers` is true, sequences containing modifier tokens
 * (e.g. {Shift>}{Tab}{/Shift}) are sent as one call to preserve modifier state.
 */
export function wrapKeyboard(
  fn: KeyboardFn,
  { passthroughModifiers = false }: { passthroughModifiers?: boolean } = {}
) {
  return async (...args: Parameters<KeyboardFn>) => {
    const sequence = args[0]
    const keys = expandKeySequence(sequence)

    if (passthroughModifiers) {
      const hasModifier = keys.some(
        (t) => t.match(/^\{.+>\}$/) || t.match(/^\{\/.+\}$/)
      )
      if (hasModifier) {
        const result = await fn(sequence)
        await flushTimers()
        return result
      }
    }

    let result: Awaited<ReturnType<KeyboardFn>> | undefined
    for (const key of keys) {
      result = await fn(key)
      await flushTimers()
    }

    return result as Awaited<ReturnType<KeyboardFn>>
  }
}

/**
 * Wraps any async function to flush requestAnimationFrame timers after each call.
 */
export const wrapWithFlush = <
  Fn extends (...args: any[]) => Promise<unknown>,
>(
  fn: Fn
) =>
  (async (...args: Parameters<Fn>) => {
    const result = await fn(...args)
    await flushTimers()
    return result
  }) as Fn

/**
 * Focuses a masked input via click and flushes requestAnimationFrame handlers
 * so the onFocus select-all takes effect.
 */
export async function focusInput(input: Element) {
  await userEvent.click(input)
  await flushTimers()
}

/**
 * Focuses a masked input and types a keyboard sequence.
 * If the sequence starts with {Backspace}, the cursor is collapsed to
 * the end so backspaces delete from the right.
 * Otherwise, all content is selected so the first typed char replaces
 * the current value (including ghost placeholders).
 */
export async function focusAndKeyboard(input: Element, sequence: string) {
  await focusInput(input)

  const el = input as HTMLInputElement

  if (/^\{[Bb]ackspace/.test(sequence)) {
    el.setSelectionRange(el.value.length, el.value.length)
  } else {
    el.setSelectionRange(0, el.value.length)
  }

  await userEvent.keyboard(sequence)
}

const originalKeyboard = userEvent.keyboard

/**
 * Sets a userEvent method (keyboard, type, etc.) via Object.defineProperty.
 */
export function setUserEventMethod<
  Key extends keyof typeof userEvent,
  Fn extends (typeof userEvent)[Key],
>(key: Key, fn: Fn) {
  Object.defineProperty(userEvent, key, {
    configurable: true,
    value: fn,
  })
}

/**
 * Mocks requestAnimationFrame/cancelAnimationFrame and installs the wrapped
 * keyboard handler. Call in beforeEach.
 *
 * Returns a cleanup function to call in afterEach (or use `cleanupMaskedInput`).
 */
export function setupMaskedInputKeyboard({
  passthroughModifiers = false,
  mockRAF = true,
}: { passthroughModifiers?: boolean; mockRAF?: boolean } = {}) {
  if (mockRAF) {
    window.requestAnimationFrame = jest.fn((callback) => {
      return setTimeout(callback, 0)
    })
    window.cancelAnimationFrame = jest.fn((id) => {
      clearTimeout(id)
      return id
    })
  }
  setUserEventMethod(
    'keyboard',
    wrapKeyboard(originalKeyboard, { passthroughModifiers })
  )
}

/**
 * Restores the original userEvent.keyboard. Call in afterEach.
 */
export function cleanupMaskedInputKeyboard() {
  setUserEventMethod('keyboard', originalKeyboard)
}
