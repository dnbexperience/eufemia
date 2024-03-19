import React from 'react'
import { renderHook } from '@testing-library/react'
import useId from '../useId'
import * as helper from '../../component-helper'

describe('useId', () => {
  it('should return given id', () => {
    const { result } = renderHook(() => useId('test'))
    expect(result.current).toBe('test')
  })

  it('should return id from React.useId', () => {
    jest.spyOn(React, 'useId').mockImplementation(() => ':test:')
    const { result } = renderHook(() => useId())
    expect(result.current).toBe('id-test')
  })

  it('should return id from makeUniqueId', () => {
    jest.spyOn(React, 'useId').mockImplementation(undefined)
    jest.spyOn(helper, 'makeUniqueId').mockImplementation(() => 'random')
    const { result } = renderHook(() => useId())
    expect(result.current).toBe('random')
  })
})
