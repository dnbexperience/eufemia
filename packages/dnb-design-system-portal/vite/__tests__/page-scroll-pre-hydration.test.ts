import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { transformWithOxc } from 'vite'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'

async function restoreEarly() {
  const file = resolve(
    __dirname,
    '../client/plugins/scroll-restoration.runtime.ts'
  )
  const { code } = await transformWithOxc(
    readFileSync(file, 'utf8'),
    file,
    { lang: 'ts' }
  )
  Function(code)()
}

beforeEach(() => {
  sessionStorage.clear()
  history.replaceState(null, '', '/web/components/button/demos/')
  document.body.innerHTML = '<div id="root"><main>Page</main></div>'
  vi.spyOn(performance, 'getEntriesByType').mockReturnValue([
    { type: 'reload' },
  ] as PerformanceNavigationTiming[])
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
  document.body.innerHTML = ''
})

it('restores a refreshed SSG page without waiting for hydration or smooth scrolling', async () => {
  sessionStorage.setItem('scroll-window', '1200')

  await restoreEarly()

  expect(window.scrollTo).toHaveBeenCalledWith({
    top: 1200,
    behavior: 'instant',
  })
  expect(history.scrollRestoration).toBe('manual')
})

it.each(['navigate', 'back_forward'])(
  'leaves %s navigation to its existing owner',
  async (type) => {
    sessionStorage.setItem('scroll-window', '1200')
    vi.mocked(performance.getEntriesByType).mockReturnValue([
      { type },
    ] as PerformanceNavigationTiming[])

    await restoreEarly()

    expect(window.scrollTo).not.toHaveBeenCalled()
  }
)

it.each(['#details', '?focusmode=example'])(
  'preserves %s position handling',
  async (suffix) => {
    sessionStorage.setItem('scroll-window', '1200')
    history.replaceState(
      null,
      '',
      '/web/components/button/demos/' + suffix
    )

    await restoreEarly()

    expect(window.scrollTo).not.toHaveBeenCalled()
  }
)

it('leaves a client-rendered page for the mounted application to restore', async () => {
  sessionStorage.setItem('scroll-window', '1200')
  document.querySelector('#root').innerHTML = ''

  await restoreEarly()

  expect(window.scrollTo).not.toHaveBeenCalled()
})

it.each(['0', '-1', 'invalid'])(
  'ignores an unusable stored position %s',
  async (position) => {
    sessionStorage.setItem('scroll-window', position)

    await restoreEarly()

    expect(window.scrollTo).not.toHaveBeenCalled()
  }
)

it('keeps the document usable when storage is unavailable', async () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('Unavailable')
  })

  await expect(restoreEarly()).resolves.toBeUndefined()
  expect(window.scrollTo).not.toHaveBeenCalled()
})
