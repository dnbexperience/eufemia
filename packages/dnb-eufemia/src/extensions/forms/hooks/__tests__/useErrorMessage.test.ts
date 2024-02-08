import { useContext } from 'react'
import { renderHook } from '@testing-library/react'
import useErrorMessage from '../useErrorMessage'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
  useMemo: jest.fn((fn) => fn()),
}))

describe('useErrorMessage', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the correct error messages', () => {
    const path = 'path'
    const errorMessages = { path: 'Custom error message' }
    const defaultErrorMessages = { path: 'Default error message' }
    const contextErrorMessages = { path: 'Context error message' }

    ;(useContext as jest.Mock).mockReturnValue({
      contextErrorMessages,
    })

    const { result } = renderHook(() =>
      useErrorMessage(path, errorMessages, defaultErrorMessages)
    )

    const fromPath = contextErrorMessages?.[path] || {}

    expect(result.current).toEqual({
      ...defaultErrorMessages,
      ...contextErrorMessages,
      ...fromPath,
      ...errorMessages,
    })
  })

  it('should handle missing context', () => {
    const path = 'path'
    const errorMessages = { path: 'Custom error message' }
    const defaultErrorMessages = { path: 'Default error message' }

    ;(useContext as jest.Mock).mockReturnValue(undefined)

    const { result } = renderHook(() =>
      useErrorMessage(path, errorMessages, defaultErrorMessages)
    )

    expect(result.current).toEqual({
      ...defaultErrorMessages,
      ...errorMessages,
    })
  })

  it('should handle missing contextErrorMessages', () => {
    const path = 'path'
    const errorMessages = { path: 'Custom error message' }
    const defaultErrorMessages = { path: 'Default error message' }

    ;(useContext as jest.Mock).mockReturnValue({})

    const { result } = renderHook(() =>
      useErrorMessage(path, errorMessages, defaultErrorMessages)
    )

    expect(result.current).toEqual({
      ...defaultErrorMessages,
      ...errorMessages,
    })
  })

  it('should handle missing path in contextErrorMessages', () => {
    const path = 'path'
    const errorMessages = { path: 'Custom error message' }
    const defaultErrorMessages = { path: 'Default error message' }
    const contextErrorMessages = { otherPath: 'Context error message' }

    ;(useContext as jest.Mock).mockReturnValue({
      contextErrorMessages,
    })

    const { result } = renderHook(() =>
      useErrorMessage(path, errorMessages, defaultErrorMessages)
    )

    expect(result.current).toEqual({
      ...defaultErrorMessages,
      ...contextErrorMessages,
      ...errorMessages,
    })
  })
})
