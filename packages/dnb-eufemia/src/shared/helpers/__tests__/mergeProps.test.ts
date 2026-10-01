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

  it('should not compose props that are not event handlers', () => {
    const own = vi.fn()
    const given = vi.fn()

    const merged = mergeProps({ onto: own }, { onto: given }) as Handlers
    merged.onto()

    expect(given).toHaveBeenCalledTimes(1)
    expect(own).toHaveBeenCalledTimes(0)
  })
})
