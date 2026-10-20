import { render } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router'
import { useScrollPosition } from '../client/plugins/scroll-position.runtime'

it('owns history restoration so native Back navigation cannot overwrite hash positioning', () => {
  const previous = window.history.scrollRestoration
  Object.defineProperty(window.history, 'scrollRestoration', {
    configurable: true,
    writable: true,
    value: 'auto',
  })
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 0)
  function Page() {
    useScrollPosition()
    return null
  }
  const { unmount } = render(
    <MemoryRouter>
      <Page />
    </MemoryRouter>
  )
  expect(window.history.scrollRestoration).toBe('manual')
  unmount()
  expect(window.history.scrollRestoration).toBe('auto')
  window.history.scrollRestoration = previous
  vi.restoreAllMocks()
})
