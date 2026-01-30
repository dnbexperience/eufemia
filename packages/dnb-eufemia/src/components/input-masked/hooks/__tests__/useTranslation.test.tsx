/**
 * useTranslation Hook Test
 *
 */

import { renderHook } from '@testing-library/react'
import { useTranslation } from '../useTranslation'
import { createWrapper } from './testHelpers'

describe('useTranslation', () => {
  it('should return locale from props', () => {
    const wrapper = createWrapper({ locale: 'en-GB' })
    const { result } = renderHook(() => useTranslation(), { wrapper })

    expect(result.current).toBe('en-GB')
  })

  it('should return locale from context when not in props', () => {
    const wrapper = createWrapper({}, { locale: 'sv-SE' })
    const { result } = renderHook(() => useTranslation(), { wrapper })

    expect(result.current).toBe('sv-SE')
  })

  it('should prioritize props locale over context locale', () => {
    const wrapper = createWrapper({ locale: 'en-GB' }, { locale: 'sv-SE' })
    const { result } = renderHook(() => useTranslation(), { wrapper })

    expect(result.current).toBe('en-GB')
  })

  it('should handle Norwegian locale', () => {
    const wrapper = createWrapper({ locale: 'nb-NO' })
    const { result } = renderHook(() => useTranslation(), { wrapper })

    expect(result.current).toBe('nb-NO')
  })

  it('should return undefined when no locale is provided', () => {
    const wrapper = createWrapper({})
    const { result } = renderHook(() => useTranslation(), { wrapper })

    expect(result.current).toBeUndefined()
  })
})
