import { renderHook } from '@testing-library/react'
import useStableMemoKey from '../useStableMemoKey'

describe('useStableMemoKey', () => {
  it('should return the JSON representation of the object', () => {
    const { result } = renderHook(() =>
      useStableMemoKey({ a: 1, b: 'text' })
    )
    expect(result.current).toBe(JSON.stringify({ a: 1, b: 'text' }))
  })

  it('should return "{}" for undefined, null and empty input', () => {
    expect(renderHook(() => useStableMemoKey()).result.current).toBe('{}')
    expect(renderHook(() => useStableMemoKey(null)).result.current).toBe(
      '{}'
    )
    expect(renderHook(() => useStableMemoKey({})).result.current).toBe(
      '{}'
    )
  })

  it('should keep the same key when a new but shallow-equal object is passed', () => {
    const { result, rerender } = renderHook(
      ({ obj }) => useStableMemoKey(obj),
      { initialProps: { obj: { a: 1, b: 2 } as Record<string, unknown> } }
    )

    const first = result.current

    // New object reference, identical shallow content
    rerender({ obj: { a: 1, b: 2 } })

    expect(result.current).toBe(first)
  })

  it('should update the key when a value changes', () => {
    const { result, rerender } = renderHook(
      ({ obj }) => useStableMemoKey(obj),
      { initialProps: { obj: { a: 1 } as Record<string, unknown> } }
    )

    expect(result.current).toBe(JSON.stringify({ a: 1 }))

    rerender({ obj: { a: 2 } })

    expect(result.current).toBe(JSON.stringify({ a: 2 }))
  })

  it('should not call JSON.stringify again while the input stays shallow-equal', () => {
    const spy = vi.spyOn(JSON, 'stringify')

    const { rerender } = renderHook(({ obj }) => useStableMemoKey(obj), {
      initialProps: { obj: { a: 1 } as Record<string, unknown> },
    })

    const callsAfterMount = spy.mock.calls.length

    rerender({ obj: { a: 1 } })
    rerender({ obj: { a: 1 } })

    expect(spy.mock.calls.length).toBe(callsAfterMount)

    // A real change re-serializes
    rerender({ obj: { a: 2 } })
    expect(spy.mock.calls.length).toBe(callsAfterMount + 1)

    spy.mockRestore()
  })

  it('should produce a key that can be parsed back into the object', () => {
    const object = { a: 1, b: ['x', 'y'], c: { nested: true } }
    const { result } = renderHook(() => useStableMemoKey(object))

    expect(JSON.parse(result.current)).toEqual(object)
  })
})
