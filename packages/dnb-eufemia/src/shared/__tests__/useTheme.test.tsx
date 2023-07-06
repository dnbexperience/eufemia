import React from 'react'
import { renderHook } from '@testing-library/react'
import Theme from '../Theme'
import useTheme from '../useTheme'

const wrapper = ({ children }) => (
  <Theme name="eiendom" variant="soft">
    {children}
  </Theme>
)

describe('useTheme', () => {
  it('returns null if no context was given', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current).toEqual(null)
  })

  it('returns given theme context', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current).toEqual({
      name: 'eiendom',
      variant: 'soft',
    })
  })
})
