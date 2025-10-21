import React from 'react'
import { renderHook } from '@testing-library/react'
import SharedContext from '../../../../../shared/Context'
import { getCurrencyData } from '../../../Field/SelectCurrency'
import useCurrency from '../useCurrency'

jest.mock('../../../Field/SelectCurrency', () => ({
  getCurrencyData: jest.fn(),
}))

describe('useCurrency', () => {
  const mockLocale = 'en-US'
  const mockCurrencyData = [
    {
      iso: 'USD',
      content: ['United States dollar', 'USD'],
      selectedValue: 'United States dollar (USD)',
    },
  ]

  beforeEach(() => {
    const mock = getCurrencyData as jest.Mock
    mock.mockReturnValue(mockCurrencyData)
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SharedContext.Provider value={{ locale: mockLocale }}>
      {children}
    </SharedContext.Provider>
  )

  it('should return currency display name by ISO code', () => {
    const { result } = renderHook(() => useCurrency(), { wrapper })
    const { getCurrencyDisplayNameByIso } = result.current

    expect(getCurrencyDisplayNameByIso('USD')).toBe(
      'United States dollar (USD)'
    )
    expect(getCurrencyData).toHaveBeenCalledWith({
      lang: 'en',
      filter: expect.any(Function),
    })
  })

  it('should return null if ISO code is not provided', () => {
    const { result } = renderHook(() => useCurrency(), { wrapper })
    const { getCurrencyDisplayNameByIso } = result.current

    expect(getCurrencyDisplayNameByIso('')).toBeNull()
  })

  it('should return undefined if ISO code is not found', () => {
    const mock = getCurrencyData as jest.Mock
    mock.mockReturnValue(undefined)
    const { result } = renderHook(() => useCurrency(), { wrapper })
    const { getCurrencyDisplayNameByIso } = result.current

    expect(getCurrencyDisplayNameByIso('NotValidISOCode')).toBeUndefined()
  })

  it('should return null if ISO code is 0', () => {
    const { result } = renderHook(() => useCurrency(), { wrapper })
    const { getCurrencyDisplayNameByIso } = result.current

    expect(getCurrencyDisplayNameByIso(0 as unknown as string)).toBeNull()
  })

  it('should return null if ISO code is null', () => {
    const { result } = renderHook(() => useCurrency(), { wrapper })
    const { getCurrencyDisplayNameByIso } = result.current

    expect(getCurrencyDisplayNameByIso(null)).toBeNull()
  })

  it('should return null if ISO code is undefined', () => {
    const { result } = renderHook(() => useCurrency(), { wrapper })
    const { getCurrencyDisplayNameByIso } = result.current

    expect(getCurrencyDisplayNameByIso(undefined)).toBeNull()
  })
})
