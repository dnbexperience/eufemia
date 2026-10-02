import mergeProps from '../mergeProps'

type Handlers = Record<string, (...args: Array<unknown>) => unknown>

describe('mergeProps', () => {
  it('should return the own props when no given props are provided', () => {
    const props = { id: 'unique' }

    expect(mergeProps(props)).toBe(props)
  })

  it('should let the given props win over non-handler props', () => {
    const merged = mergeProps(
      { 'aria-label': 'own' },
      { 'aria-label': 'given' }
    )

    expect(merged['aria-label']).toBe('given')
  })

  it('should call both the given and the own handler', () => {
    const own = vi.fn()
    const given = vi.fn()

    const merged = mergeProps(
      { onKeyDown: own },
      { onKeyDown: given }
    ) as Handlers
    merged.onKeyDown({ key: 'a' })

    expect(given).toHaveBeenCalledTimes(1)
    expect(own).toHaveBeenCalledTimes(1)
    expect(given).toHaveBeenCalledWith({ key: 'a' })
    expect(own).toHaveBeenCalledWith({ key: 'a' })
  })

  it('should call the given handler before the own handler', () => {
    const order: Array<string> = []

    const merged = mergeProps(
      { onKeyDown: () => order.push('own') },
      { onKeyDown: () => order.push('given') }
    ) as Handlers
    merged.onKeyDown()

    expect(order).toEqual(['given', 'own'])
  })

  it('should skip the own handler when the given handler returns false', () => {
    const own = vi.fn()

    const merged = mergeProps(
      { onChange: own },
      { onChange: () => false }
    ) as Handlers

    expect(merged.onChange()).toBe(false)
    expect(own).toHaveBeenCalledTimes(0)
  })

  it('should return the result of the own handler', () => {
    const merged = mergeProps(
      { onChange: () => 'own' },
      { onChange: () => undefined }
    ) as Handlers

    expect(merged.onChange()).toBe('own')
  })

  it('should keep the given handler when there is no own handler', () => {
    const given = vi.fn()

    const merged = mergeProps({}, { onKeyDown: given }) as Handlers
    merged.onKeyDown()

    expect(given).toHaveBeenCalledTimes(1)
  })

  it('should keep the own handler when the given one is undefined', () => {
    const own = vi.fn()

    const merged = mergeProps(
      { onKeyDown: own },
      { onKeyDown: undefined }
    ) as Handlers
    merged.onKeyDown()

    expect(own).toHaveBeenCalledTimes(1)
  })

  it('should call a handler once when it is both the own and the given one', () => {
    const handler = vi.fn()

    const merged = mergeProps(
      { onKeyDown: handler },
      { onKeyDown: handler }
    ) as Handlers
    merged.onKeyDown()

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should not compose props that are not event handlers', () => {
    const own = vi.fn()
    const given = vi.fn()

    const merged = mergeProps({ onto: own }, { onto: given }) as Handlers
    merged.onto()

    expect(given).toHaveBeenCalledTimes(1)
    expect(own).toHaveBeenCalledTimes(0)
  })

  it('should join the own and the given className', () => {
    const merged = mergeProps(
      { className: 'dnb-own' },
      { className: 'custom' }
    )

    expect(merged.className).toBe('dnb-own custom')
  })

  it('should keep the own className when the given one is undefined', () => {
    const merged = mergeProps(
      { className: 'dnb-own' },
      { className: undefined }
    )

    expect(merged.className).toBe('dnb-own')
  })

  it('should merge the own and the given style, where the given values win', () => {
    const merged = mergeProps(
      { style: { color: 'red', margin: 0 } },
      { style: { color: 'blue', padding: 0 } }
    )

    expect(merged.style).toEqual({ color: 'blue', margin: 0, padding: 0 })
  })

  it('should keep the own style when the given one is undefined', () => {
    const style = { color: 'red' }

    const merged = mergeProps({ style }, { style: undefined })

    expect(merged.style).toBe(style)
  })
})
