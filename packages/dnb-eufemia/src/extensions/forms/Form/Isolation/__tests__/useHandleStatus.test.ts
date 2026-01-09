import { renderHook, waitFor } from '@testing-library/react'
import type { Props } from '../useHandleStatus'
import useHandleStatus from '../useHandleStatus'
import useHasContentChanged from '../useHasContentChanged'
import useReportError from '../useReportError'

// Mocks
jest.mock('../useHasContentChanged', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('../useReportError', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const useHasContentChangedMock = useHasContentChanged as jest.Mock
const useReportErrorMock = useReportError as jest.Mock

describe('useHandleStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns hasContentChanged and respects preventUncommittedChanges=false', () => {
    const currentHasChanged = true
    useHasContentChangedMock.mockImplementation(() => ({
      hasContentChanged: currentHasChanged,
    }))

    const error = new Error('Test error')
    const outerContext = { showAllErrors: true }

    const { result } = renderHook(
      (props) => useHandleStatus(props as Props),
      {
        initialProps: {
          outerContext,
          preventUncommittedChanges: false,
          error,
          name: 'fieldName',
        },
      }
    )

    expect(useHasContentChangedMock).toHaveBeenLastCalledWith({
      enabled: false,
    })
    expect(useReportErrorMock).toHaveBeenLastCalledWith(
      undefined,
      outerContext,
      'fieldName'
    )

    expect(result.current.hasContentChanged).toBe(true)

    // With preventUncommittedChanges=false, initial showStatus equals outerContext.showAllErrors
    expect(result.current.showStatus).toBe(true)
  })

  it('hides status when preventUncommittedChanges=true and hasContentChanged=false', async () => {
    const currentHasChanged = false
    useHasContentChangedMock.mockImplementation(() => ({
      hasContentChanged: currentHasChanged,
    }))

    const error = new Error('Test error')
    const outerContext = { showAllErrors: true }

    const { result } = renderHook(
      (props) => useHandleStatus(props as Props),
      {
        initialProps: {
          outerContext,
          preventUncommittedChanges: true,
          error,
          name: 'fieldName',
        },
      }
    )

    expect(useHasContentChangedMock).toHaveBeenLastCalledWith({
      enabled: true,
    })
    expect(useReportErrorMock).toHaveBeenLastCalledWith(
      undefined,
      outerContext,
      'fieldName'
    )

    // Initial state mirrors outerContext.showAllErrors, then effect sets it to false
    await waitFor(() => {
      expect(result.current.showStatus).toBe(false)
    })
  })

  it('reports error and follows showAllErrors changes when content has changed', async () => {
    let currentHasChanged = true
    useHasContentChangedMock.mockImplementation(() => ({
      hasContentChanged: currentHasChanged,
    }))

    const error = new Error('Test error')
    const outerContextA = { showAllErrors: false }
    const outerContextB = { showAllErrors: true }

    const { result, rerender } = renderHook(
      (props) => useHandleStatus(props as Props),
      {
        initialProps: {
          outerContext: outerContextA,
          preventUncommittedChanges: true,
          error,
          name: 'fieldName',
        },
      }
    )

    // Should report the error as content has changed and prevention is enabled
    expect(useReportErrorMock).toHaveBeenLastCalledWith(
      error,
      outerContextA,
      'fieldName'
    )
    expect(result.current.hasContentChanged).toBe(true)

    // Initial showStatus equals outerContext.showAllErrors (false)
    expect(result.current.showStatus).toBe(false)

    // Toggle showAllErrors -> true, showStatus should follow
    rerender({
      outerContext: outerContextB,
      preventUncommittedChanges: true,
      error,
      name: 'fieldName',
    })

    await waitFor(() => {
      expect(result.current.showStatus).toBe(true)
    })

    // Toggle back to false
    rerender({
      outerContext: outerContextA,
      preventUncommittedChanges: true,
      error,
      name: 'fieldName',
    })

    await waitFor(() => {
      expect(result.current.showStatus).toBe(false)
    })

    // When hasContentChanged becomes false, it should hide the status regardless of showAllErrors
    currentHasChanged = false
    rerender({
      outerContext: outerContextB,
      preventUncommittedChanges: true,
      error,
      name: 'fieldName',
    })

    await waitFor(() => {
      expect(result.current.showStatus).toBe(false)
    })
  })

  it('keeps status hidden after clearing until showAllErrors changes again', async () => {
    let currentHasChanged = true
    useHasContentChangedMock.mockImplementation(() => ({
      hasContentChanged: currentHasChanged,
    }))

    const error = new Error('Test error')
    const outerContext = { showAllErrors: true }

    const { result, rerender } = renderHook(
      (props) => useHandleStatus(props as Props),
      {
        initialProps: {
          outerContext,
          preventUncommittedChanges: true,
          error,
          name: 'fieldName',
        },
      }
    )

    // Initially, with content changed and showAllErrors=true, status is shown
    expect(result.current.showStatus).toBe(true)

    // User clears data -> content not changed; status should hide
    currentHasChanged = false
    rerender({
      outerContext,
      preventUncommittedChanges: true,
      error,
      name: 'fieldName',
    })

    await waitFor(() => {
      expect(result.current.showStatus).toBe(false)
    })

    // Content changes again immediately while showAllErrors is unchanged -> keep hidden
    currentHasChanged = true
    rerender({
      outerContext,
      preventUncommittedChanges: true,
      error,
      name: 'fieldName',
    })

    await waitFor(() => {
      expect(result.current.showStatus).toBe(false)
    })
  })
})
