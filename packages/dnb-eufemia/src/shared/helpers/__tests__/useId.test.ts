import { renderHook } from '@testing-library/react'
import useId from '../useId'

const mockMakeUniqueId = jest.fn(() => 'random')

jest.mock('../../component-helper', async () => {
  const actual = await jest.requireActual('../../component-helper')
  return {
    ...actual,
    makeUniqueId: (...args: Parameters<typeof mockMakeUniqueId>) =>
      mockMakeUniqueId(...args),
  }
})

const mockUseId = jest.fn()

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useId: (...args: unknown[]) => mockUseId(...args),
}))

describe('useId', () => {
  afterEach(() => {
    mockUseId.mockReset()
  })

  it('should return given id', () => {
    const { result } = renderHook(() => useId('test'))
    expect(result.current).toBe('test')
  })

  it('should return id from React.useId', () => {
    mockUseId.mockReturnValue('_test_')
    const { result } = renderHook(() => useId())
    expect(result.current).toBe('id-test')
  })

  it('should return id from makeUniqueId', () => {
    mockUseId.mockReturnValue(undefined)
    const { result } = renderHook(() => useId())
    expect(result.current).toBe('random')
  })
})
