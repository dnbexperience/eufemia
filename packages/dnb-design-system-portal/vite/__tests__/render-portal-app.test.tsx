import { describe, expect, it, vi } from 'vitest'
import { renderPortalApp } from '../client/render-portal-app'

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

  it('passes onRecoverableError to hydrateRoot to suppress mismatch warnings', () => {
    vi.spyOn(console, 'group').mockImplementation(() => {})
    vi.spyOn(console, 'groupEnd').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})

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
      | { onRecoverableError?: (error: unknown) => void }
      | undefined
    expect(options).toHaveProperty('onRecoverableError')
    expect(typeof options?.onRecoverableError).toBe('function')

    // The handler silently swallows errors instead of rethrowing
    expect(() =>
      options?.onRecoverableError?.(new Error('hydration mismatch'))
    ).not.toThrow()
  })
})
