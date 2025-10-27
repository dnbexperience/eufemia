/**
 * useMaskParams Hook Test
 *
 */

import { renderHook } from '@testing-library/react'
import { useMaskParams } from '../useMaskParams'
import { createWrapper } from './testHelpers'

describe('useMaskParams', () => {
  it('should return mask params with correct defaults', () => {
    const wrapper = createWrapper({
      asNumber: true,
      locale: 'nb-NO',
      showGuide: true,
    })
    const { result } = renderHook(() => useMaskParams(), { wrapper })

    expect(result.current).toBeDefined()
    expect(result.current.showMask).toBe(false)
    expect(result.current.showGuide).toBe(true)
    expect(result.current.keepCharPositions).toBe(false)
  })

  it('should respect showMask prop', () => {
    const wrapper = createWrapper({
      showMask: true,
      asNumber: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useMaskParams(), { wrapper })

    expect(result.current.showMask).toBe(true)
  })

  it('should respect showGuide prop', () => {
    const wrapper = createWrapper({
      showGuide: false,
      asNumber: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useMaskParams(), { wrapper })

    expect(result.current.showGuide).toBe(false)
  })

  it('should set placeholderChar to invisible space when null', () => {
    const wrapper = createWrapper({
      placeholderChar: null,
      asNumber: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useMaskParams(), { wrapper })

    expect(result.current.placeholderChar).toBe('\u200B')
  })

  it('should hide mask when placeholder is set', () => {
    const wrapper = createWrapper({
      showMask: true,
      placeholder: 'Enter value',
      asNumber: true,
      locale: 'nb-NO',
    })
    const { result } = renderHook(() => useMaskParams(), { wrapper })

    expect(result.current.showMask).toBe(false)
  })
})
