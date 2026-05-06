import { describe, expect, it, vi } from 'vitest'
import { renderPortalApp } from '../client/render-portal-app'

describe('renderPortalApp', () => {
  it('creates a root once and reuses it for later renders', () => {
    const container = document.createElement('div')
    const render = vi.fn()
    const unmount = vi.fn()
    const createRootFn = vi.fn(() => ({ render, unmount }))
    const rootStore: {
      __portalRoot?: { render: typeof render; unmount: typeof unmount }
    } = {}

    function AppOne() {
      return <div>One</div>
    }

    function AppTwo() {
      return <div>Two</div>
    }

    renderPortalApp(AppOne, { container, rootStore, createRootFn })
    renderPortalApp(AppTwo, { container, rootStore, createRootFn })

    expect(createRootFn).toHaveBeenCalledTimes(1)
    expect(render).toHaveBeenCalledTimes(2)
  })

  it('throws when the root container is missing', () => {
    function App() {
      return <div>App</div>
    }

    expect(() => renderPortalApp(App, { container: null })).toThrow(
      'Expected #root container for portal app'
    )
  })
})
