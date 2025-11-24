import React from 'react'
import { renderHook } from '@testing-library/react'
import useTimeZones from '../useTimeZones'
import listOfTimeZones from '../../../constants/timezones'
import Provider from '../../../../../shared/Provider'
import { mergeTranslations } from '../../../../../shared'

const getOneTimeZone = (timezones, timezone: string) => {
  return timezones.find((tz) => tz.timezone === timezone)
}

describe('useTimeZones', () => {
  it('should return the correct timezones', () => {
    const { result } = renderHook(useTimeZones)
    expect(result.current.timezones).toStrictEqual(listOfTimeZones)
  })

  it('should not mutate the original list of timezones', () => {
    const { result } = renderHook(useTimeZones, {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    })

    expect(result.current.timezones).not.toBe(listOfTimeZones)
    expect(result.current.timezones).toStrictEqual(listOfTimeZones)
  })
})

