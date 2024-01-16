import { renderHook } from '@testing-library/react'
import useData from '../useData'
import { useSharedState } from '../../../../../shared/helpers/useSharedState'
import { act } from 'react-dom/test-utils'

const sharedState = useSharedState as jest.Mock

jest.mock('../../../../../shared/helpers/useSharedState', () => {
  const { useSharedState } = jest.requireActual(
    '../../../../../shared/helpers/useSharedState'
  )
  return {
    useSharedState: jest.fn(useSharedState),
  }
})

describe('Form.useData', () => {
  it('should return undefined by default', () => {
    const { result } = renderHook(() => useData('id-default'))
    expect(result.current.data).toEqual(undefined)
  })

  it('should return initialData if data is not present', () => {
    const { result } = renderHook((props = { key: 'value' }) =>
      useData('id-initial', props)
    )

    expect(result.current.data).toEqual({ key: 'value' })
  })

  it('should return data if data is present', () => {
    renderHook((props = { key: 'existingValue' }) =>
      useData('id-present', props)
    )

    const { result } = renderHook((props = { key: 'value' }) =>
      useData('id-present', props)
    )

    expect(result.current.data).toEqual({ key: 'existingValue' })
  })

  it('should return "update" mathod that lets you update the data', () => {
    const props = { key: 'value' }
    const { result } = renderHook(() => useData('id-update', props))

    expect(result.current.data).toEqual({ key: 'value' })

    act(() => {
      result.current.update('/key', (value) => {
        return 'changed ' + value
      })
    })

    expect(result.current.data).toEqual({ key: 'changed value' })
  })

  it('should set data if no initial data is given', () => {
    const { result } = renderHook(() => useData('id-undefined'))

    expect(result.current.data).toEqual(undefined)

    act(() => {
      result.current.update('/key', () => {
        return 'changed value'
      })
    })

    expect(result.current.data).toEqual({ key: 'changed value' })
  })

  it('should sync two hooks', () => {
    const props = { key: 'value' }

    // A
    const { result: A } = renderHook(() => useData('id-sync'))

    // B
    const { result: B } = renderHook(() => useData('id-sync', props))

    expect(A.current.data).toEqual(undefined)
    expect(B.current.data).toEqual({ key: 'value' })

    act(() => {
      B.current.update('/key', (value) => {
        return 'changed ' + value
      })
    })

    expect(A.current.data).toEqual({ key: 'changed value' })
    expect(B.current.data).toEqual({ key: 'changed value' })
  })

  describe('with mock', () => {
    it('should call "set" with initialData on mount if data is not present', () => {
      const update = jest.fn()

      sharedState.mockReturnValue({
        data: {},
        update,
      })

      renderHook((props = { key: 'value' }) => useData('id-set', props))

      expect(update).not.toHaveBeenCalled()
    })

    it('should call "update" with initialData rerender', () => {
      const update = jest.fn()

      sharedState.mockReturnValue({
        data: {},
        update,
      })

      const { rerender } = renderHook((props = { key: 'value' }) =>
        useData('id-update-initial', props)
      )

      expect(update).not.toHaveBeenCalled()

      rerender({ key: 'changed' })

      expect(update).toHaveBeenCalledTimes(1)
      expect(update).toHaveBeenLastCalledWith({ key: 'changed' })
    })

    it('should not call "update" or "set" with initialData on mount if data is present', () => {
      const update = jest.fn()

      sharedState.mockReturnValue({
        data: { key: 'existingValue' },
        update,
      })

      renderHook((props = { key: 'value' }) => useData('id-set', props))

      expect(update).not.toHaveBeenCalled()
    })
  })
})
