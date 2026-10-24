import { act, renderHook } from '@testing-library/react'
import useNavigationTarget from '../useNavigationTarget'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

it('keeps a destination selected when scrolling settles before it reaches the offset', () => {
  const { result } = renderHook(() => useNavigationTarget(true))
  act(() => result.current.navigate('last'))
  act(() => {
    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('scrollend'))
    vi.advanceTimersByTime(1500)
  })
  expect(result.current.targetId).toBe('last')
  act(() => window.dispatchEvent(new Event('scroll')))
  expect(result.current.targetId).toBeNull()
})

it('keeps a destination selected when the page cannot scroll at all', () => {
  const { result } = renderHook(() => useNavigationTarget(true))
  act(() => result.current.navigate('last'))
  act(() => vi.advanceTimersByTime(1500))
  expect(result.current.targetId).toBe('last')
  act(() => window.dispatchEvent(new Event('wheel')))
  expect(result.current.targetId).toBeNull()
})

it('starts a fresh scrolling period when navigating to the same destination again', () => {
  const { result } = renderHook(() => useNavigationTarget(true))
  act(() => result.current.navigate('last'))
  act(() => vi.advanceTimersByTime(1500))
  act(() => result.current.navigate('last'))
  act(() => window.dispatchEvent(new Event('scroll')))
  expect(result.current.targetId).toBe('last')
})

it.each(['wheel', 'pointerdown', 'touchstart', 'keydown', 'resize'])(
  'resumes automatic tracking on %s, including during navigation',
  (event) => {
    const { result } = renderHook(() => useNavigationTarget(true))
    act(() => result.current.navigate('last'))
    act(() => window.dispatchEvent(new Event(event)))
    expect(result.current.targetId).toBeNull()
  }
)

it('ignores scrolling inside the navigation after settling', () => {
  const { result } = renderHook(() => useNavigationTarget(true))
  const navigation = document.createElement('nav')
  navigation.className = 'dnb-table-of-content'
  document.body.append(navigation)
  act(() => result.current.navigate('last'))
  act(() => vi.advanceTimersByTime(1500))
  act(() => navigation.dispatchEvent(new Event('scroll')))
  expect(result.current.targetId).toBe('last')
})

it('clears the destination when automatic tracking is disabled', () => {
  const { result, rerender } = renderHook(
    ({ enabled }) => useNavigationTarget(enabled),
    { initialProps: { enabled: true } }
  )
  act(() => result.current.navigate('last'))
  rerender({ enabled: false })
  expect(result.current.targetId).toBeNull()
  rerender({ enabled: true })
  expect(result.current.targetId).toBeNull()
})
