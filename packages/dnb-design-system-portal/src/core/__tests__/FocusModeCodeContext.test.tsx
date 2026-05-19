import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, cleanup, render } from '@testing-library/react'
import {
  FocusModeCodeProvider,
  useFocusModeCode,
} from '../FocusModeCodeContext'

function Consumer() {
  const { focusModeCodeId } = useFocusModeCode()
  return <div data-testid="consumer">{focusModeCodeId ?? 'null'}</div>
}

describe('FocusModeCodeContext', () => {
  const originalLocation = window.location

  beforeEach(() => {
    vi.useFakeTimers()
    Object.defineProperty(window, 'location', {
      value: new URL('http://localhost/'),
      writable: true,
    })
    window.history.replaceState = vi.fn()
    sessionStorage.clear()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
    window.location = originalLocation as unknown as Location & string
  })

  it('reads focusmode URL param on mount and sets state', () => {
    window.location = new URL(
      'http://localhost/?focusmode=my-block'
    ) as unknown as Location & string

    const element = document.createElement('div')
    element.id = 'my-block'
    document.body.appendChild(element)

    const { getByTestId } = render(
      <FocusModeCodeProvider>
        <Consumer />
      </FocusModeCodeProvider>
    )

    expect(getByTestId('consumer').textContent).toBe('my-block')

    document.body.removeChild(element)
  })

  it('clears focusmode state when element does not exist after timeout', async () => {
    window.location = new URL(
      'http://localhost/?focusmode=non-existent-id'
    ) as unknown as Location & string

    const { getByTestId } = render(
      <FocusModeCodeProvider>
        <Consumer />
      </FocusModeCodeProvider>
    )

    expect(getByTestId('consumer').textContent).toBe('non-existent-id')

    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    expect(getByTestId('consumer').textContent).toBe('null')
    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      expect.not.stringContaining('focusmode')
    )
  })

  it('keeps focusmode state when element exists after timeout', async () => {
    window.location = new URL(
      'http://localhost/?focusmode=existing-block'
    ) as unknown as Location & string

    const element = document.createElement('div')
    element.id = 'existing-block'
    document.body.appendChild(element)

    const { getByTestId } = render(
      <FocusModeCodeProvider>
        <Consumer />
      </FocusModeCodeProvider>
    )

    expect(getByTestId('consumer').textContent).toBe('existing-block')

    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    expect(getByTestId('consumer').textContent).toBe('existing-block')
    expect(window.history.replaceState).not.toHaveBeenCalledWith(
      null,
      '',
      expect.not.stringContaining('focusmode')
    )

    document.body.removeChild(element)
  })

  it('does not set state when focusmode param is absent', () => {
    window.location = new URL('http://localhost/') as unknown as Location &
      string

    const { getByTestId } = render(
      <FocusModeCodeProvider>
        <Consumer />
      </FocusModeCodeProvider>
    )

    expect(getByTestId('consumer').textContent).toBe('null')
  })
})
