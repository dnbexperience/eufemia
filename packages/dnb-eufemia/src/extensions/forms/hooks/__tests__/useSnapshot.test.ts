import { renderHook, act } from '@testing-library/react'
import useSnapshot from '../useSnapshot'

let mockData: any
const mockSet = jest.fn()

beforeEach(() => {
  mockData = { value: 'initial' }
  mockSet.mockClear()
})

afterEach(() => {
  jest.restoreAllMocks()
})

jest.mock('../../Form/data-context/useData', () => {
  const useDataMock = jest.fn(() => ({
    data: mockData,
    set: mockSet,
  }))
  return useDataMock
})

describe('Form.useSnapshot', () => {
  it('creates a snapshot and retrieves it correctly', () => {
    const { result } = renderHook(useSnapshot)
    let snapshotId: string

    act(() => {
      snapshotId = result.current.createSnapshot()
    })

    expect(result.current.createSnapshot).toBeDefined()
    expect(result.current.revertSnapshot).toBeDefined()
    expect(snapshotId).toBeTruthy()
  })

  it('reverts to a snapshot', () => {
    const { result } = renderHook(useSnapshot)
    act(() => {
      const snapshotId = result.current.createSnapshot(undefined, {
        value: 'modified',
      })
      mockSet.mockClear()
      result.current.revertSnapshot(snapshotId)
    })

    expect(mockSet).toHaveBeenCalledWith({ value: 'modified' })
  })

  it('reverts and deletes the snapshot', () => {
    const { result } = renderHook(useSnapshot)
    let snapshotId: string

    act(() => {
      snapshotId = result.current.createSnapshot()
      result.current.revertSnapshot(snapshotId)
    })

    expect(mockSet).toHaveBeenCalledWith(mockData)

    mockSet.mockClear()
    act(() => {
      result.current.revertSnapshot(snapshotId)
    })
    expect(mockSet).not.toHaveBeenCalled()
  })
})
