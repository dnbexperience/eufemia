import React from 'react'
import { renderHook } from '@testing-library/react'
import SharedContext from '../../../../../shared/Context'
import { getCountryData } from '../../../Field/SelectCountry'
import useCountry from '../useCountry'
import countries from '../../../constants/countries'

jest.mock('../../../Field/SelectCountry', () => ({
  getCountryData: jest.fn(),
}))

describe('useCountry', () => {
  const mockLocale = 'en-US'
  const mockCountryData = [{ iso: 'US', content: 'United States' }]

  beforeEach(() => {
    const mock = getCountryData as jest.Mock
    mock.mockReturnValue(mockCountryData)
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SharedContext.Provider value={{ locale: mockLocale }}>
      {children}
    </SharedContext.Provider>
  )

  it('should return country name by ISO code', () => {
    const { result } = renderHook(() => useCountry(), { wrapper })
    const { getCountryNameByIso } = result.current

    expect(getCountryNameByIso('US')).toBe('United States')
    expect(getCountryData).toHaveBeenCalledWith({
      lang: 'en',
      filter: expect.any(Function),
      countries,
    })
  })

  it('should return null if ISO code is not provided', () => {
    const { result } = renderHook(() => useCountry(), { wrapper })
    const { getCountryNameByIso } = result.current

    expect(getCountryNameByIso('')).toBeNull()
  })

  it('should return undefined if ISO code is not found', () => {
    const mock = getCountryData as jest.Mock
    mock.mockReturnValue(undefined)
    const { result } = renderHook(() => useCountry(), { wrapper })
    const { getCountryNameByIso } = result.current

    expect(getCountryNameByIso('NotValidISOCode')).toBeUndefined()
  })

  it('should return null if ISO code is 0', () => {
    const { result } = renderHook(() => useCountry(), { wrapper })
    const { getCountryNameByIso } = result.current

    expect(getCountryNameByIso(0 as unknown as string)).toBeNull()
  })

  it('should return null if ISO code is null', () => {
    const { result } = renderHook(() => useCountry(), { wrapper })
    const { getCountryNameByIso } = result.current

    expect(getCountryNameByIso(null)).toBeNull()
  })

  it('should return null if ISO code is undefined', () => {
    const { result } = renderHook(() => useCountry(), { wrapper })
    const { getCountryNameByIso } = result.current

    expect(getCountryNameByIso(undefined)).toBeNull()
  })
})
