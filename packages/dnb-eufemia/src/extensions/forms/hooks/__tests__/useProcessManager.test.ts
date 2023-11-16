import { renderHook } from '@testing-library/react'
import useProcessManager from '../useProcessManager'

describe('useProcessManager', () => {
  it('should report the process as active if no other processes has been started in the same component', () => {
    const { result } = renderHook(() => useProcessManager())

    const isActive = result.current.startProcess()
    expect(isActive()).toEqual(true)
  })

  it('should report the process as not active if another processes has been started', () => {
    const { result } = renderHook(() => useProcessManager())

    const isActive = result.current.startProcess()
    result.current.startProcess()

    expect(isActive()).toEqual(false)
  })
})
