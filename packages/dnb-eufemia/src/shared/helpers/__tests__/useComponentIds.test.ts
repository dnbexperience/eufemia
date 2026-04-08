import { renderHook } from '@testing-library/react'
import useComponentIds from '../useComponentIds'

describe('useComponentIds', () => {
  it('should return all IDs based on custom id', () => {
    const { result } = renderHook(() => useComponentIds('my-input'))

    expect(result.current.id).toBe('my-input')
    expect(result.current.labelId).toBe('my-input-label')
    expect(result.current.statusId).toBe('my-input-status')
    expect(result.current.formStatusId).toBe('my-input-form-status')
    expect(result.current.suffixId).toBe('my-input-suffix')
    expect(result.current.submitButtonId).toBe('my-input-submit-button')
  })

  it('should generate an id when none is provided', () => {
    const { result } = renderHook(() => useComponentIds())

    expect(result.current.id).toBeTruthy()
    expect(result.current.labelId).toBe(`${result.current.id}-label`)
    expect(result.current.statusId).toBe(`${result.current.id}-status`)
  })

  it('should return aria-describedby with status when showStatus is true', () => {
    const { result } = renderHook(() => useComponentIds('test'))

    const describedBy = result.current.ariaDescribedBy({
      showStatus: true,
    })

    expect(describedBy).toBe('test-status')
  })

  it('should return aria-describedby with suffix when hasSuffix is true', () => {
    const { result } = renderHook(() => useComponentIds('test'))

    const describedBy = result.current.ariaDescribedBy({
      hasSuffix: true,
    })

    expect(describedBy).toBe('test-suffix')
  })

  it('should combine aria-describedby for status and suffix', () => {
    const { result } = renderHook(() => useComponentIds('test'))

    const describedBy = result.current.ariaDescribedBy({
      showStatus: true,
      hasSuffix: true,
    })

    expect(describedBy).toBe('test-status test-suffix')
  })

  it('should include submit button in aria-describedby', () => {
    const { result } = renderHook(() => useComponentIds('test'))

    const describedBy = result.current.ariaDescribedBy({
      hasSubmitButton: true,
      showStatus: true,
    })

    expect(describedBy).toBe('test-submit-button test-status')
  })

  it('should return undefined when no aria-describedby items', () => {
    const { result } = renderHook(() => useComponentIds('test'))

    const describedBy = result.current.ariaDescribedBy({})

    expect(describedBy).toBeUndefined()
  })

  it('should return stable references across renders', () => {
    const { result, rerender } = renderHook(() => useComponentIds('test'))

    const first = result.current
    rerender()
    const second = result.current

    expect(first).toBe(second)
  })
})
