import { act, renderHook } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import useCanUseDOM from '../useCanUseDOM'

describe('useCanUseDOM', () => {
  it('should return true in a client render', () => {
    const { result } = renderHook(() => useCanUseDOM())

    expect(result.current).toBe(true)
  })

  it('should return false on the server', () => {
    const Component = () => String(useCanUseDOM())

    expect(renderToString(<Component />)).toBe('false')
  })

  it('should return false during hydration and true afterwards', () => {
    const values: Array<boolean> = []
    const Component = () => {
      const canUseDOM = useCanUseDOM()
      values.push(canUseDOM)
      return String(canUseDOM)
    }

    const container = document.createElement('div')
    container.innerHTML = renderToString(<Component />)

    const recoverableErrors = []
    let root: ReturnType<typeof hydrateRoot>
    act(() => {
      root = hydrateRoot(container, <Component />, {
        onRecoverableError: (error) => recoverableErrors.push(error),
      })
    })

    expect(recoverableErrors).toEqual([])
    expect(values.slice(1)).toEqual([false, true])
    expect(container.textContent).toBe('true')

    act(() => root.unmount())
  })

  it('should not render again after hydration when waitForHydration is false', () => {
    const values: Array<boolean> = []
    const Component = () => {
      values.push(useCanUseDOM({ waitForHydration: false }))
      return null
    }

    const container = document.createElement('div')
    container.innerHTML = renderToString(<Component />)
    values.length = 0

    let root: ReturnType<typeof hydrateRoot>
    act(() => {
      root = hydrateRoot(container, <Component />)
    })

    expect(values).toEqual([true])

    act(() => root.unmount())
  })
})
