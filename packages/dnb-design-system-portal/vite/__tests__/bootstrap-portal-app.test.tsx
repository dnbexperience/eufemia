import { describe, expect, it, vi } from 'vitest'
import { bootstrapPortalApp } from '../client/bootstrap-portal-app'

describe('bootstrapPortalApp', () => {
  it('awaits pre-resolving the current route before the first render', async () => {
    const routes = [{ path: '/button' }]
    const calls: string[] = []
    let resolvePreResolve: (() => void) | undefined

    const preResolveCurrentRouteFn = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          calls.push('pre-resolve:start')
          resolvePreResolve = () => {
            calls.push('pre-resolve:end')
            resolve()
          }
        })
    )
    const renderPortalAppFn = vi.fn(() => {
      calls.push('render')
      return {} as ReturnType<typeof renderPortalAppFn>
    })

    function App() {
      return <div>App</div>
    }

    const bootstrapPromise = bootstrapPortalApp(App, routes, {
      pathname: '/button/',
      hasWindow: true,
      preResolveCurrentRouteFn,
      renderPortalAppFn,
    })

    expect(preResolveCurrentRouteFn).toHaveBeenCalledWith(
      routes,
      '/button/'
    )
    expect(renderPortalAppFn).not.toHaveBeenCalled()

    resolvePreResolve?.()
    await bootstrapPromise

    expect(calls).toEqual([
      'pre-resolve:start',
      'pre-resolve:end',
      'render',
    ])
  })

  it('renders immediately when no window is available', async () => {
    const routes = [{ path: '/button' }]
    const preResolveCurrentRouteFn = vi.fn()
    const renderPortalAppFn = vi.fn(() => {
      return {} as ReturnType<typeof renderPortalAppFn>
    })

    function App() {
      return <div>App</div>
    }

    await bootstrapPortalApp(App, routes, {
      hasWindow: false,
      preResolveCurrentRouteFn,
      renderPortalAppFn,
    })

    expect(preResolveCurrentRouteFn).not.toHaveBeenCalled()
    expect(renderPortalAppFn).toHaveBeenCalledWith(App, {
      props: { routes },
    })
  })
})
