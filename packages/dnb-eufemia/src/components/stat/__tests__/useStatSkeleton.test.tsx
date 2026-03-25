import React from 'react'
import { renderHook } from '@testing-library/react'
import Provider from '../../../shared/Provider'
import StatRootContext from '../StatRootContext'
import useStatSkeleton from '../useStatSkeleton'

describe('useStatSkeleton', () => {
  it('returns hasSkeleton false by default', () => {
    const { result } = renderHook(() => useStatSkeleton())

    expect(result.current.hasSkeleton).toBe(false)
    expect(result.current.skeletonClass).toBeNull()
  })

  it('resolves skeleton from local prop', () => {
    const { result } = renderHook(() => useStatSkeleton(true))

    expect(result.current.hasSkeleton).toBe(true)
    expect(result.current.skeletonClass).toContain('dnb-skeleton')
    expect(result.current.skeletonClass).toContain('dnb-skeleton--font')
  })

  it('uses shape method when specified', () => {
    const { result } = renderHook(() => useStatSkeleton(true, 'shape'))

    expect(result.current.hasSkeleton).toBe(true)
    expect(result.current.skeletonClass).toContain('dnb-skeleton')
    expect(result.current.skeletonClass).toContain('dnb-skeleton--shape')
    expect(result.current.skeletonClass).not.toContain(
      'dnb-skeleton--font'
    )
  })

  it('resolves skeleton from StatRootContext', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StatRootContext.Provider value={{ inRoot: true, skeleton: true }}>
        {children}
      </StatRootContext.Provider>
    )

    const { result } = renderHook(() => useStatSkeleton(), { wrapper })

    expect(result.current.hasSkeleton).toBe(true)
    expect(result.current.skeletonClass).toContain('dnb-skeleton')
  })

  it('resolves skeleton from Provider context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider skeleton>{children}</Provider>
    )

    const { result } = renderHook(() => useStatSkeleton(), { wrapper })

    expect(result.current.hasSkeleton).toBe(true)
    expect(result.current.skeletonClass).toContain('dnb-skeleton')
  })

  it('local prop takes priority over Root context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StatRootContext.Provider value={{ inRoot: true, skeleton: true }}>
        {children}
      </StatRootContext.Provider>
    )

    const { result } = renderHook(() => useStatSkeleton(false), {
      wrapper,
    })

    expect(result.current.hasSkeleton).toBe(false)
    expect(result.current.skeletonClass).toBeNull()
  })

  it('Root context takes priority over Provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider skeleton={false}>
        <StatRootContext.Provider value={{ inRoot: true, skeleton: true }}>
          {children}
        </StatRootContext.Provider>
      </Provider>
    )

    const { result } = renderHook(() => useStatSkeleton(), { wrapper })

    expect(result.current.hasSkeleton).toBe(true)
  })

  it('applySkeletonAttributes sets aria-disabled when skeleton is active', () => {
    const { result } = renderHook(() => useStatSkeleton(true))

    const attributes: React.HTMLProps<HTMLElement> = {}
    result.current.applySkeletonAttributes(attributes)

    expect(attributes['aria-disabled']).toBe(true)
    expect(attributes.disabled).toBe(true)
  })

  it('applySkeletonAttributes does not set aria-disabled when skeleton is inactive', () => {
    const { result } = renderHook(() => useStatSkeleton(false))

    const attributes: React.HTMLProps<HTMLElement> = {}
    result.current.applySkeletonAttributes(attributes)

    expect(attributes['aria-disabled']).toBeUndefined()
    expect(attributes.disabled).toBeUndefined()
  })
})
