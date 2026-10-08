import { act } from 'react'
import { render } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import useHydrated from '../useHydrated'

describe('useHydrated', () => {
  it('should return true on a client render', () => {
    const renders: Array<boolean> = []

    const Tester = () => {
      renders.push(useHydrated())
      return null
    }

    render(<Tester />)

    expect(renders).toEqual([true])
  })

  it('should return false on the server', () => {
    const Tester = () => <>{String(useHydrated())}</>

    expect(renderToString(<Tester />)).toBe('false')
  })

  it('should return false while hydrating and true afterwards', () => {
    const renders: Array<boolean> = []

    const Tester = () => {
      const hydrated = useHydrated()
      renders.push(hydrated)
      return <span>{String(hydrated)}</span>
    }

    const container = document.createElement('div')
    container.innerHTML = renderToString(<Tester />)
    document.body.appendChild(container)
    renders.length = 0

    const recoverableErrors = []
    let root: ReturnType<typeof hydrateRoot>
    act(() => {
      root = hydrateRoot(container, <Tester />, {
        onRecoverableError: (error) => recoverableErrors.push(error),
      })
    })

    expect(recoverableErrors).toEqual([])
    expect(renders).toEqual([false, true])
    expect(container.textContent).toBe('true')

    act(() => root.unmount())
    container.remove()
  })
})
