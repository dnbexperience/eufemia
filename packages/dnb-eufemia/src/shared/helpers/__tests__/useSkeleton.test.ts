import { renderHook } from '@testing-library/react'
import useSkeleton from '../useSkeleton'

describe('useSkeleton', () => {
  it('should return isSkeleton false when skeleton is falsy', () => {
    const { result } = renderHook(() => useSkeleton(false))
    expect(result.current.isSkeleton).toBe(false)
  })

  it('should return isSkeleton true when skeleton is true', () => {
    const { result } = renderHook(() => useSkeleton(true))
    expect(result.current.isSkeleton).toBe(true)
  })

  it('should return isSkeleton true from context', () => {
    const { result } = renderHook(() =>
      useSkeleton(undefined, { skeleton: true })
    )
    expect(result.current.isSkeleton).toBe(true)
  })

  it('should respect skeleton=false even when context has skeleton', () => {
    const { result } = renderHook(() =>
      useSkeleton(false, { skeleton: true })
    )
    expect(result.current.isSkeleton).toBe(false)
  })

  it('should return skeleton class with method', () => {
    const { result } = renderHook(() => useSkeleton(true))

    const className = result.current.skeletonClass('shape')
    expect(className).toContain('dnb-skeleton')
    expect(className).toContain('dnb-skeleton--shape')
  })

  it('should return skeleton class with font method', () => {
    const { result } = renderHook(() => useSkeleton(true))

    const className = result.current.skeletonClass('font')
    expect(className).toContain('dnb-skeleton--font')
  })

  it('should return null skeleton class when not loading', () => {
    const { result } = renderHook(() => useSkeleton(false))

    const className = result.current.skeletonClass('shape')
    expect(className).toBeNull()
  })

  it('should add DOM attributes when skeleton is true', () => {
    const context = {
      skeleton: true,
      translation: { Skeleton: { ariaBusy: 'Loading...' } },
    }
    const { result } = renderHook(() => useSkeleton(true, context))

    const params: Record<string, unknown> = {}
    result.current.skeletonDOMAttributes(params)

    expect(params.disabled).toBe(true)
    expect(params['aria-disabled']).toBe(true)
    expect(params['aria-label']).toBe('Loading...')
  })

  it('should not add DOM attributes when skeleton is false', () => {
    const { result } = renderHook(() => useSkeleton(false))

    const params: Record<string, unknown> = {}
    result.current.skeletonDOMAttributes(params)

    expect(params.disabled).toBeUndefined()
    expect(params['aria-disabled']).toBeUndefined()
  })

  it('should return stable references across renders', () => {
    const { result, rerender } = renderHook(() => useSkeleton(true))

    const first = result.current
    rerender()
    const second = result.current

    expect(first).toBe(second)
  })
})
