import React from 'react'
import { renderHook } from '@testing-library/react'
import Theme from '../Theme'
import useTheme from '../useTheme'

describe('useTheme', () => {
  it('returns null if no context was given', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current).toEqual(null)
  })

  it('returns given theme context', () => {
    const wrapper = ({ children }) => (
      <Theme name="eiendom" variant="soft">
        {children}
      </Theme>
    )
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current).toEqual(
      expect.objectContaining({
        name: 'eiendom',
        variant: 'soft',
      })
    )
  })

  it('returns boolean constants', () => {
    const wrapper = ({ children }) => (
      <Theme name="sbanken">{children}</Theme>
    )
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current).toEqual({
      name: 'sbanken',
      isEiendom: false,
      isSbanken: true,
      isUi: false,
    })
  })

  it('will return false on all constants when no name was given', () => {
    const wrapper = ({ children }) => <Theme>{children}</Theme>
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current).toEqual({
      name: undefined,
      isEiendom: false,
      isSbanken: false,
      isUi: false,
    })
  })
})
