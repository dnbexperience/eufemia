import React from 'react'
import { renderHook } from '@testing-library/react'
import useTimeZone from '../useTimeZone'
import Provider from '../../../../../shared/Provider'

describe('useTimeZone', () => {
  it('should return getTimeZoneNameByIdentifier function', () => {
    const { result } = renderHook(useTimeZone, {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    })

    expect(result.current.getTimeZoneNameByIdentifier).toBeDefined()
    expect(typeof result.current.getTimeZoneNameByIdentifier).toBe('function')
  })

  it('should return timezone name for valid identifier', () => {
    const { result } = renderHook(useTimeZone, {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    })

    const name = result.current.getTimeZoneNameByIdentifier('Europe/Oslo')
    expect(name).toBe('Oslo')
  })

  it('should return null for invalid identifier', () => {
    const { result } = renderHook(useTimeZone, {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    })

    const name = result.current.getTimeZoneNameByIdentifier(null)
    expect(name).toBeNull()
  })
})

