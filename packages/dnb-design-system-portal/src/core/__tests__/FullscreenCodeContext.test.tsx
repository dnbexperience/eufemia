import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, cleanup, render } from '@testing-library/react'
import {
  FullscreenCodeProvider,
  useFullscreenCode,
} from '../FullscreenCodeContext'

function Consumer() {
  const { fullscreenCodeId } = useFullscreenCode()
  return <div data-testid="consumer">{fullscreenCodeId ?? 'null'}</div>
}

describe('FullscreenCodeContext', () => {
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
      <FullscreenCodeProvider>
        <Consumer />
      </FullscreenCodeProvider>
    )

    expect(getByTestId('consumer').textContent).toBe('my-block')

    document.body.removeChild(element)
  })

  it('clears focusmode state when element does not exist after timeout', async () => {
    window.location = new URL(
      'http://localhost/?focusmode=non-existent-id'
    ) as unknown as Location & string

    const { getByTestId } = render(
      <FullscreenCodeProvider>
        <Consumer />
      </FullscreenCodeProvider>
    )

    // State is initially set from URL param
    expect(getByTestId('consumer').textContent).toBe('non-existent-id')

    // Advance past the 500ms validation timeout
    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    // Element didn't exist, so state should be cleared
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
      <FullscreenCodeProvider>
        <Consumer />
      </FullscreenCodeProvider>
    )

    expect(getByTestId('consumer').textContent).toBe('existing-block')

    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    // Element exists, so state should remain set
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
      <FullscreenCodeProvider>
        <Consumer />
      </FullscreenCodeProvider>
    )

    expect(getByTestId('consumer').textContent).toBe('null')
  })
})
