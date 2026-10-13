import { describe, expect, it, vi } from 'vitest'
import { act } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import UseIdProbe from './mocks/use-id-probe'

vi.mock('virtual:portal-pages', async () => {
  const { default: Component } = await import('./mocks/use-id-probe')
  return {
    routes: [{ path: '/probe/', Component }],
    allMdxNodes: [],
    regularMdxNodes: [],
  }
})

describe('SSR and hydration', () => {
  it('generates the same useId ids on the server as after hydration', async () => {
    const { render } = await import('../prod/entry-server')
    const { default: PortalApp } = await import('../client/portal-app')

    const { html } = await render('/probe/')
    const serverId = /class="use-id-probe" id="([^"]+)"/.exec(html)?.[1]

    window.history.pushState({}, '', '/probe/')
    const container = document.createElement('div')
    container.innerHTML = html
    document.body.appendChild(container)

    await act(async () => {
      hydrateRoot(
        container,
        <PortalApp
          routes={[{ path: '/probe/', Component: UseIdProbe }]}
        />,
        { onRecoverableError: () => undefined }
      )
    })

    expect(serverId).toBeTruthy()
    expect(globalThis.__useIdProbe).toBe(serverId)
  }, 60_000)
})
