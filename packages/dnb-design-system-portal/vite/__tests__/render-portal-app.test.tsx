import { describe, expect, it, vi } from 'vitest'
import { renderPortalApp } from '../client/render-portal-app'

vi.mock('virtual:build-info', () => ({
  releaseVersion: 'v11.0.0',
  buildVersion: '1.1.2026, 12:00:00',
  changelogVersion: 'v11.0.0',
}))

describe('renderPortalApp', () => {
  it('creates a root once and reuses it for later renders', () => {
    const container = document.createElement('div')
    const render = vi.fn()
    const unmount = vi.fn()
    const createRootFn = vi.fn(() => ({ render, unmount }))
    const hydrateRootFn = vi.fn(() => ({ render, unmount }))
    const rootStore: {
      __portalRoot?: { render: typeof render; unmount: typeof unmount }
    } = {}

    function AppOne() {
      return <div>One</div>
    }

    function AppTwo() {
      return <div>Two</div>
    }

    renderPortalApp(AppOne, {
      container,
      rootStore,
      createRootFn,
      hydrateRootFn,
    })
    renderPortalApp(AppTwo, {
      container,
      rootStore,
      createRootFn,
      hydrateRootFn,
    })

    expect(createRootFn).toHaveBeenCalledTimes(1)
    expect(render).toHaveBeenCalledTimes(2)
  })

  it('uses hydrateRoot when container has pre-rendered content', () => {
    const container = document.createElement('div')
    container.innerHTML = '<div>Pre-rendered</div>'

    const render = vi.fn()
    const unmount = vi.fn()
    const createRootFn = vi.fn(() => ({ render, unmount }))
    const hydrateRootFn = vi.fn(() => ({ render, unmount }))
    const rootStore: {
      __portalRoot?: { render: typeof render; unmount: typeof unmount }
    } = {}

    function App() {
      return <div>App</div>
    }

    renderPortalApp(App, {
      container,
      rootStore,
      createRootFn,
      hydrateRootFn,
    })

    expect(hydrateRootFn).toHaveBeenCalledTimes(1)
    expect(createRootFn).not.toHaveBeenCalled()
    expect(render).not.toHaveBeenCalled()
  })

  it('uses createRoot when container is empty', () => {
    const container = document.createElement('div')

    const render = vi.fn()
    const unmount = vi.fn()
    const createRootFn = vi.fn(() => ({ render, unmount }))
    const hydrateRootFn = vi.fn(() => ({ render, unmount }))
    const rootStore: {
      __portalRoot?: { render: typeof render; unmount: typeof unmount }
    } = {}

    function App() {
      return <div>App</div>
    }

    renderPortalApp(App, {
      container,
      rootStore,
      createRootFn,
      hydrateRootFn,
    })

    expect(createRootFn).toHaveBeenCalledTimes(1)
    expect(hydrateRootFn).not.toHaveBeenCalled()
    expect(render).toHaveBeenCalledTimes(1)
  })

  it('throws when the root container is missing', () => {
    function App() {
      return <div>App</div>
    }

    expect(() => renderPortalApp(App, { container: null })).toThrow(
      'Expected #root container for portal app'
    )
  })

  it('logs recoverable hydration errors in release builds', () => {
    vi.spyOn(console, 'group').mockImplementation(() => {})
    vi.spyOn(console, 'groupEnd').mockImplementation(() => {})
    vi.spyOn(console, 'log').mockImplementation(() => {})
    const errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const container = document.createElement('div')
    container.innerHTML = '<div>Pre-rendered</div>'

    const render = vi.fn()
    const unmount = vi.fn()
    const createRootFn = vi.fn(() => ({ render, unmount }))
    const hydrateRootFn = vi.fn(() => ({ render, unmount }))
    const rootStore: {
      __portalRoot?: { render: typeof render; unmount: typeof unmount }
    } = {}

    function App() {
      return <div>App</div>
    }

    renderPortalApp(App, {
      container,
      rootStore,
      createRootFn,
      hydrateRootFn,
    })

    const options = (hydrateRootFn.mock.calls[0] as unknown[])[2] as
      | {
          onRecoverableError?: (
            error: unknown,
            errorInfo: { componentStack?: string }
          ) => void
        }
      | undefined
    const error = new Error('hydration mismatch')

    expect(() =>
      options?.onRecoverableError?.(error, {
        componentStack: '\n    at App',
      })
    ).not.toThrow()
    expect(errorSpy).toHaveBeenCalledWith(error)
    expect(console.log).toHaveBeenCalledWith('\n    at App')
  })
})
