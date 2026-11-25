import { afterEach, describe, expect, it, vi } from 'vitest'
import { act } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { Theme } from '@dnb/eufemia/src/shared'
import { DarkModeTokenSwatches } from '../Examples'

const matchMediaOriginal = window.matchMedia

const mockColorSchemePreference = (prefersDark: boolean) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    media: query,
    matches: prefersDark && query.includes('prefers-color-scheme: dark'),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
}

const getSchemeTitles = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('.dnb-card__title')).map(
    (element) => element.textContent
  )

describe('DarkModeTokenSwatches', () => {
  afterEach(() => {
    delete globalThis.__eufemiaColorScheme
    window.matchMedia = matchMediaOriginal
    vi.restoreAllMocks()
  })

  it('hydrates in the dark color scheme and then shows the dark scheme first', async () => {
    const content = (
      <Theme colorScheme="auto">
        <DarkModeTokenSwatches />
      </Theme>
    )

    // Pages are prerendered without a color scheme preference
    const container = document.createElement('div')
    container.innerHTML = renderToString(content)
    document.body.appendChild(container)
    expect(getSchemeTitles(container)).toEqual([
      'Light color scheme',
      'Dark color scheme',
    ])

    // The color scheme script resolves the dark scheme before hydration
    mockColorSchemePreference(true)
    globalThis.__eufemiaColorScheme = 'dark'

    // React warns that the class of the outer Theme differs. It updates
    // attributes without discarding the server HTML, so only recoverable
    // errors fail this test.
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const recoverableErrors: Array<unknown> = []
    let root: ReturnType<typeof hydrateRoot>
    await act(async () => {
      root = hydrateRoot(container, content, {
        onRecoverableError: (error) => recoverableErrors.push(error),
      })
    })

    expect(recoverableErrors).toEqual([])
    expect(getSchemeTitles(container)).toEqual([
      'Dark color scheme',
      'Light color scheme',
    ])

    await act(async () => root.unmount())
    container.remove()
  })

  it('shows the light scheme first in the light color scheme', async () => {
    mockColorSchemePreference(false)

    const content = (
      <Theme colorScheme="auto">
        <DarkModeTokenSwatches />
      </Theme>
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(content)
    document.body.appendChild(container)

    const recoverableErrors: Array<unknown> = []
    let root: ReturnType<typeof hydrateRoot>
    await act(async () => {
      root = hydrateRoot(container, content, {
        onRecoverableError: (error) => recoverableErrors.push(error),
      })
    })

    expect(recoverableErrors).toEqual([])
    expect(getSchemeTitles(container)).toEqual([
      'Light color scheme',
      'Dark color scheme',
    ])

    await act(async () => root.unmount())
    container.remove()
  })
})
