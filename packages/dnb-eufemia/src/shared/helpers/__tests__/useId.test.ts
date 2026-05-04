import React from 'react'
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

describe('useId', () => {
  it('should return given id', () => {
    const { result } = renderHook(() => useId('test'))
    expect(result.current).toBe('test')
  })

  it('should return id from React.useId', () => {
    jest.spyOn(React, 'useId').mockImplementation(() => '_test_')
    const { result } = renderHook(() => useId())
    expect(result.current).toBe('id-test')
  })

  it('should return id from makeUniqueId', () => {
    jest.spyOn(React, 'useId').mockImplementation(() => undefined)
    const { result } = renderHook(() => useId())
    expect(result.current).toBe('random')
  })
})
