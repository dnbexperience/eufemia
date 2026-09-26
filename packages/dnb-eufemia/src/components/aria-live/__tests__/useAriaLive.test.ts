import { renderHook, waitFor } from '@testing-library/react'
import useAriaLive from '../useAriaLive'

describe('useAriaLive', () => {
  it('returns correct aria attributes and announcement for low priority', async () => {
    const { result } = renderHook(() =>
      useAriaLive({
        priority: 'low',
        children: 'Low priority announcement',
      })
    )

    expect(result.current['aria-live']).toBe('polite')
    expect(result.current.children).toBe('')

    await waitFor(async () => {
      expect(result.current.children).toBe('Low priority announcement')
    })
  })

  it('returns correct aria attributes and announcement for high priority', async () => {
    const { result } = renderHook(() =>
      useAriaLive({
        priority: 'high',
        children: 'High priority announcement',
      })
    )

    expect(result.current['aria-live']).toBe('assertive')
    expect(result.current.children).toBe('')

    await waitFor(async () => {
      expect(result.current.children).toBe('High priority announcement')
    })
  })

  it('schedules no announcement timers while there is nothing to announce', () => {
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout')

    const { rerender } = renderHook(
      ({ children }) => useAriaLive({ children }),
      { initialProps: { children: null } }
    )
    rerender({ children: null })

    expect(setTimeoutSpy).not.toHaveBeenCalled()

    setTimeoutSpy.mockRestore()
  })

  it('announces again when content is given after being idle', async () => {
    const { result, rerender } = renderHook(
      ({ children }) => useAriaLive({ children }),
      { initialProps: { children: null } }
    )

    expect(result.current.children).toBe('')

    rerender({ children: 'Copied' })

    await waitFor(() => {
      expect(result.current.children).toBe('Copied')
    })
  })
})
