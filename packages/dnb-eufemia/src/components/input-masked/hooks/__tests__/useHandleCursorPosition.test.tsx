/**
 * useHandleCursorPosition Hook Test
 */

import type { MutableRefObject } from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import useHandleCursorPosition from '../useHandleCursorPosition'

function setupScope(count = 3) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const inputs: HTMLInputElement[] = []

  for (let i = 0; i < count; i++) {
    const input = document.createElement('input')
    input.className = 'dnb-multi-input-mask__input'
    input.size = i === count - 1 ? 4 : 2
    input.placeholder = i === count - 1 ? 'yyyy' : 'dd'
    input.dataset.maskId = i === 0 ? 'month' : `input-${i}`

    container.appendChild(input)
    inputs.push(input)
  }

  const scopeRef = {
    current: container,
  } as MutableRefObject<HTMLElement | null>

  return {
    scopeRef,
    inputs,
    cleanup: () => {
      container.remove()
    },
  }
}

const createEvent = (
  input: HTMLInputElement,
  key: string
): React.KeyboardEvent<HTMLInputElement> =>
  ({
    key,
    preventDefault: jest.fn(),
    target: input,
    currentTarget: input,
  }) as unknown as React.KeyboardEvent<HTMLInputElement>

const createInputEvent = (
  input: HTMLInputElement
): React.FormEvent<HTMLInputElement> =>
  ({
    currentTarget: input,
  }) as unknown as React.FormEvent<HTMLInputElement>

describe('useHandleCursorPosition', () => {
  beforeAll(() => {
    if (typeof window.requestAnimationFrame !== 'function') {
      window.requestAnimationFrame = (cb: FrameRequestCallback) => {
        return window.setTimeout(() => cb(Date.now()), 0)
      }
    }
  })

  afterEach(() => {
    document.body.innerHTML = ''
    jest.useRealTimers()
  })

  it('moves focus to previous input on Backspace when field is empty', () => {
    const { scopeRef, inputs } = setupScope(2)
    const { result } = renderHook(() =>
      useHandleCursorPosition(undefined, scopeRef)
    )

    const prev = inputs[0]
    const current = inputs[1]
    const focusSpy = jest.spyOn(prev, 'focus')

    current.value = ''
    current.placeholder = 'dd'
    current.selectionStart = 0
    current.selectionEnd = 0
    current.focus()

    const event = createEvent(current, 'Backspace')
    result.current.onKeyDown(event)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(focusSpy).toHaveBeenCalledTimes(1)
  })

  it('moves focus to next input on ArrowRight when caret is at end', () => {
    const { scopeRef, inputs } = setupScope(3)
    const { result } = renderHook(() =>
      useHandleCursorPosition(undefined, scopeRef)
    )

    const current = inputs[0]
    const next = inputs[1]
    const focusSpy = jest.spyOn(next, 'focus')

    current.value = '12'
    current.placeholder = ''
    current.selectionStart = 2
    current.selectionEnd = 2
    current.focus()

    const event = createEvent(current, 'ArrowRight')
    result.current.onKeyDown(event)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(focusSpy).toHaveBeenCalledTimes(1)
  })

  it('collapses selection on ArrowRight before moving focus', () => {
    const { scopeRef, inputs } = setupScope(2)
    const { result } = renderHook(() =>
      useHandleCursorPosition(undefined, scopeRef)
    )

    const current = inputs[0]
    const next = inputs[1]
    const focusSpy = jest.spyOn(next, 'focus')
    ;(current as any).setSelectionRange = jest.fn()
    const selectionSpy = current.setSelectionRange as jest.Mock

    current.value = '12'
    current.selectionStart = 0
    current.selectionEnd = 2

    const event = createEvent(current, 'ArrowRight')
    result.current.onKeyDown(event)

    expect(selectionSpy).toHaveBeenCalledWith(2, 2)
    expect(event.preventDefault).toHaveBeenCalled()
    expect(focusSpy).not.toHaveBeenCalled()
  })

  it('moves focus to previous input on ArrowLeft when caret is at start', () => {
    const { scopeRef, inputs } = setupScope(3)
    const { result } = renderHook(() =>
      useHandleCursorPosition(undefined, scopeRef)
    )

    const current = inputs[1]
    const prev = inputs[0]
    const focusSpy = jest.spyOn(prev, 'focus')

    current.value = '11'
    current.selectionStart = 0
    current.selectionEnd = 0
    current.focus()

    const event = createEvent(current, 'ArrowLeft')
    result.current.onKeyDown(event)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(focusSpy).toHaveBeenCalledTimes(1)
  })

  it('auto advances to next input after the final character is applied', async () => {
    const { scopeRef, inputs } = setupScope(3)
    const { result } = renderHook(() =>
      useHandleCursorPosition(/\d/, scopeRef)
    )

    const current = inputs[0]
    const next = inputs[1]
    const focusSpy = jest.spyOn(next, 'focus')

    current.value = '12'
    current.placeholder = 'dd'
    current.selectionStart = 2
    current.selectionEnd = 2
    current.focus()

    const event = createInputEvent(current)
    result.current.onInput(event)

    await waitFor(() => {
      expect(focusSpy).toHaveBeenCalledTimes(1)
    })
  })

  it('does not auto advance on input events from an unfocused field', async () => {
    const { scopeRef, inputs } = setupScope(3)
    const { result } = renderHook(() =>
      useHandleCursorPosition(/\d/, scopeRef)
    )

    const current = inputs[0]
    const other = inputs[2]

    current.value = '12'
    current.placeholder = 'dd'
    current.selectionStart = 2
    current.selectionEnd = 2

    other.focus()

    const event = createInputEvent(current)
    result.current.onInput(event)

    await Promise.resolve()

    expect(document.activeElement).toBe(other)
  })

  it('moves focus and transfers key to next input when typing at end of full input', () => {
    const { scopeRef, inputs } = setupScope(2)
    const onTransferToNext = jest.fn()
    const { result } = renderHook(() =>
      useHandleCursorPosition(/\d/, scopeRef, { onTransferToNext })
    )

    const current = inputs[0]
    const next = inputs[1]
    const focusSpy = jest.spyOn(next, 'focus')

    current.value = '12'
    current.placeholder = 'dd'
    current.selectionStart = 2
    current.selectionEnd = 2

    next.value = 'dd'
    next.placeholder = 'dd'
    next.selectionStart = 0
    next.selectionEnd = 0

    current.focus()

    const event = createEvent(current, '7')
    result.current.onKeyDown(event)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(focusSpy).toHaveBeenCalledTimes(1)
    expect(onTransferToNext).toHaveBeenCalledWith({
      key: '7',
      currentInput: current,
      nextInput: next,
    })
  })

  it('does not transfer to next input when mask rejects the typed character', () => {
    const { scopeRef, inputs } = setupScope(2)
    const keys: Record<string, RegExp[]> = {
      month: [/^[0-9]$/, /^[0-9]$/],
    }
    const { result } = renderHook(() =>
      useHandleCursorPosition(keys, scopeRef)
    )

    const current = inputs[0]
    const next = inputs[1]
    const focusSpy = jest.spyOn(next, 'focus')

    current.dataset.maskId = 'month'
    current.value = ''
    current.selectionStart = 0
    current.selectionEnd = 0
    current.focus()

    const event = createEvent(current, 'A')
    result.current.onKeyDown(event)

    expect(focusSpy).not.toHaveBeenCalled()
  })
})
