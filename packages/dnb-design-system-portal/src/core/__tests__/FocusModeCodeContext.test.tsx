import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router'
import {
  FocusModeCodeProvider,
  useFocusModeCode,
} from '../FocusModeCodeContext'

function Consumer() {
  const { focusModeCodeId, setFocusModeCodeId } = useFocusModeCode()
  const location = useLocation()

  return (
    <>
      <div data-testid="consumer">{focusModeCodeId ?? 'null'}</div>
      <div data-testid="location">
        {location.pathname + location.search + location.hash}
      </div>
      <button onClick={() => setFocusModeCodeId('my-block')}>
        Enter focus mode
      </button>
      <button onClick={() => setFocusModeCodeId(null)}>
        Exit focus mode
      </button>
    </>
  )
}

function TestProvider({ children }: { children: React.ReactNode }) {
  const initialEntry =
    window.location.pathname +
    window.location.search +
    window.location.hash

  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <FocusModeCodeProvider>{children}</FocusModeCodeProvider>
    </MemoryRouter>
  )
}

describe('FocusModeCodeContext', () => {
  const originalLocation = window.location

  beforeEach(() => {
    vi.useFakeTimers()
    Object.defineProperty(window, 'location', {
      value: new URL('http://localhost/'),
      writable: true,
    })
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
      <TestProvider>
        <Consumer />
      </TestProvider>
    )

    expect(getByTestId('consumer').textContent).toBe('my-block')

    document.body.removeChild(element)
  })

  it('clears focusmode state when element does not exist after timeout', async () => {
    window.location = new URL(
      'http://localhost/?focusmode=non-existent-id'
    ) as unknown as Location & string

    const { getByTestId } = render(
      <TestProvider>
        <Consumer />
      </TestProvider>
    )

    expect(getByTestId('consumer').textContent).toBe('non-existent-id')

    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    expect(getByTestId('consumer').textContent).toBe('null')
    expect(getByTestId('location').textContent).toBe('/')
  })

  it('keeps focusmode state when element exists after timeout', async () => {
    window.location = new URL(
      'http://localhost/?focusmode=existing-block'
    ) as unknown as Location & string

    const element = document.createElement('div')
    element.id = 'existing-block'
    document.body.appendChild(element)

    const { getByTestId } = render(
      <TestProvider>
        <Consumer />
      </TestProvider>
    )

    expect(getByTestId('consumer').textContent).toBe('existing-block')

    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    expect(getByTestId('consumer').textContent).toBe('existing-block')
    expect(getByTestId('location').textContent).toBe(
      '/?focusmode=existing-block'
    )

    document.body.removeChild(element)
  })

  it('does not set state when focusmode param is absent', () => {
    window.location = new URL('http://localhost/') as unknown as Location &
      string

    const { getByTestId } = render(
      <TestProvider>
        <Consumer />
      </TestProvider>
    )

    expect(getByTestId('consumer').textContent).toBe('null')
  })

  it('updates the router location when focus mode changes', () => {
    window.location = new URL(
      'http://localhost/uilib?q=term#examples'
    ) as unknown as Location & string

    const { getByRole, getByTestId } = render(
      <TestProvider>
        <Consumer />
      </TestProvider>
    )

    fireEvent.click(getByRole('button', { name: 'Enter focus mode' }))

    expect(getByTestId('location').textContent).toBe(
      '/uilib?q=term&focusmode=my-block#examples'
    )

    fireEvent.click(getByRole('button', { name: 'Exit focus mode' }))

    expect(getByTestId('location').textContent).toBe(
      '/uilib?q=term#examples'
    )
  })
})
