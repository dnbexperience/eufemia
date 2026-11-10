import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  type RouteObject,
} from 'react-router'
import NavigationProgress, {
  DOCUMENT_FALLBACK_DELAY,
} from '../NavigationProgress'

function renderRouter(
  openDocument: (url: string) => void,
  lazy: RouteObject['lazy']
) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <>
            <NavigationProgress openDocument={openDocument} />
            <Outlet />
          </>
        ),
        children: [
          { index: true, element: <h1>Home</h1> },
          { path: 'next', lazy },
        ],
      },
    ],
    { initialEntries: ['/'] }
  )

  render(<RouterProvider router={router} />)

  return router
}

describe('NavigationProgress', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubEnv('DEV', false)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllEnvs()
  })

  it('shows progress and opens the destination document when a navigation stalls', async () => {
    const openDocument = vi.fn()
    const router = renderRouter(openDocument, () => new Promise(() => {}))

    await act(async () => {
      void router.navigate('/next?tab=1#section')
    })

    expect(document.querySelector('.dnb-progress-indicator')).toBeNull()

    await act(async () => {
      vi.advanceTimersByTime(300)
    })

    expect(
      document.querySelector('.dnb-progress-indicator__linear')
    ).not.toBeNull()
    expect(openDocument).not.toHaveBeenCalled()

    await act(async () => {
      vi.advanceTimersByTime(DOCUMENT_FALLBACK_DELAY)
    })

    expect(openDocument).toHaveBeenCalledTimes(1)
    expect(openDocument).toHaveBeenCalledWith('/next?tab=1#section')
  })

  it('does nothing when the navigation completes in time', async () => {
    const openDocument = vi.fn()
    const router = renderRouter(openDocument, async () => ({
      element: <h1>Next</h1>,
    }))

    await act(async () => {
      await router.navigate('/next')
    })

    await act(async () => {
      vi.advanceTimersByTime(DOCUMENT_FALLBACK_DELAY * 2)
    })

    expect(document.querySelector('h1').textContent).toBe('Next')
    expect(document.querySelector('.dnb-progress-indicator')).toBeNull()
    expect(openDocument).not.toHaveBeenCalled()
  })

  it('does not open a document for an abandoned navigation', async () => {
    const openDocument = vi.fn()
    const router = renderRouter(openDocument, () => new Promise(() => {}))

    await act(async () => {
      void router.navigate('/next')
    })
    await act(async () => {
      await router.navigate('/')
    })
    await act(async () => {
      vi.advanceTimersByTime(DOCUMENT_FALLBACK_DELAY * 2)
    })

    expect(openDocument).not.toHaveBeenCalled()
  })

  it('keeps the dev server from reloading slow navigations', async () => {
    vi.stubEnv('DEV', true)
    const openDocument = vi.fn()
    const router = renderRouter(openDocument, () => new Promise(() => {}))

    await act(async () => {
      void router.navigate('/next')
    })
    await act(async () => {
      vi.advanceTimersByTime(DOCUMENT_FALLBACK_DELAY * 2)
    })

    expect(openDocument).not.toHaveBeenCalled()
  })
})
