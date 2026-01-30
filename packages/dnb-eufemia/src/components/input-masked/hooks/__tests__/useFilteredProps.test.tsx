/**
 * useFilteredProps Hook Test
 *
 */

import { renderHook } from '@testing-library/react'
import { useFilteredProps } from '../useFilteredProps'
import { createWrapper } from './testHelpers'

describe('useFilteredProps', () => {
  it('should return props and htmlAttributes', () => {
    const wrapper = createWrapper({
      id: 'test-input',
      className: 'test-class',
      placeholder: 'test placeholder',
    })

    const { result } = renderHook(() => useFilteredProps(), { wrapper })

    expect(result.current.props).toBeDefined()
    expect(result.current.htmlAttributes).toBeDefined()
    expect(result.current.htmlAttributes.id).toBe('test-input')
    expect(result.current.htmlAttributes.className).toBe('test-class')
    expect(result.current.htmlAttributes.placeholder).toBe(
      'test placeholder'
    )
  })

  it('should filter out internal props from htmlAttributes', () => {
    const wrapper = createWrapper({
      mask: true,
      numberMask: true,
      currencyMask: true,
      asNumber: true,
      locale: 'nb-NO',
      showMask: true,
      id: 'test-input',
    })

    const { result } = renderHook(() => useFilteredProps(), { wrapper })

    expect(result.current.htmlAttributes.mask).toBeUndefined()
    expect(result.current.htmlAttributes.numberMask).toBeUndefined()
    expect(result.current.htmlAttributes.currencyMask).toBeUndefined()
    expect(result.current.htmlAttributes.asNumber).toBeUndefined()
    expect(result.current.htmlAttributes.locale).toBeUndefined()
    expect(result.current.htmlAttributes.showMask).toBeUndefined()
    expect(result.current.htmlAttributes.id).toBe('test-input')
  })

  it('should freeze htmlAttributes', () => {
    const wrapper = createWrapper({
      id: 'test-input',
    })

    const { result } = renderHook(() => useFilteredProps(), { wrapper })

    expect(Object.isFrozen(result.current.htmlAttributes)).toBe(true)
  })

  it('should handle empty props', () => {
    const wrapper = createWrapper({})
    const { result } = renderHook(() => useFilteredProps(), { wrapper })

    expect(result.current.props).toBeDefined()
    expect(result.current.htmlAttributes).toBeDefined()
  })

  it('should keep all non-internal props in htmlAttributes', () => {
    const wrapper = createWrapper({
      id: 'test-id',
      name: 'test-name',
      disabled: true,
      readOnly: false,
      maxLength: 100,
      tabIndex: 1,
    })

    const { result } = renderHook(() => useFilteredProps(), { wrapper })

    expect(result.current.htmlAttributes.id).toBe('test-id')
    expect(result.current.htmlAttributes.name).toBe('test-name')
    expect(result.current.htmlAttributes.disabled).toBe(true)
    expect(result.current.htmlAttributes.readOnly).toBe(false)
    expect(result.current.htmlAttributes.maxLength).toBe(100)
    expect(result.current.htmlAttributes.tabIndex).toBe(1)
  })
})
