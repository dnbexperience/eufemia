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
    { iso: 'USD', content: 'United States dollar' },
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

  it('should return currency name by ISO code', () => {
    const { result } = renderHook(() => useCurrency(), { wrapper })
    const { getCurrencyNameByIso } = result.current

    expect(getCurrencyNameByIso('USD')).toBe('United States dollar')
    expect(getCurrencyData).toHaveBeenCalledWith({
      lang: 'en',
      filter: expect.any(Function),
    })
  })

  it('should return null if ISO code is not provided', () => {
    const { result } = renderHook(() => useCurrency(), { wrapper })
    const { getCurrencyNameByIso } = result.current

    expect(getCurrencyNameByIso('')).toBeNull()
  })
})
