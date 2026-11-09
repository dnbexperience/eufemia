import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { transformWithOxc } from 'vite'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'

async function restoreEarly(name = 'scroll-restoration.runtime.ts') {
  const file = resolve(__dirname, '../client/plugins/' + name)
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
  vi.unstubAllGlobals()
  document.body.innerHTML = ''
  document.getElementById('portal-page-scroll-restoration')?.remove()
  document.documentElement.removeAttribute('data-portal-scroll-interacted')
  vi.useRealTimers()
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

it('holds a scrolled refresh and releases it after one second if preparation stalls', async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  sessionStorage.setItem('scroll-window', '1200')

  await restoreEarly('scroll-restoration-preload.runtime.ts')

  expect(
    document.getElementById('portal-page-scroll-restoration')
  ).not.toBeNull()
  vi.advanceTimersByTime(1000)
  expect(
    document.getElementById('portal-page-scroll-restoration')
  ).toBeNull()
})

it.each(['0', '-1', 'invalid'])(
  'does not hold a refresh with position %s',
  async (position) => {
    sessionStorage.setItem('scroll-window', position)

    await restoreEarly('scroll-restoration-preload.runtime.ts')

    expect(
      document.getElementById('portal-page-scroll-restoration')
    ).toBeNull()
  }
)

it('restores the settled position before revealing the page', async () => {
  sessionStorage.setItem('scroll-window', '1200')
  const pending = document.createElement('style')
  pending.id = 'portal-page-scroll-restoration'
  document.head.appendChild(pending)
  let finishFonts: () => void
  const ready = new Promise<void>((resolve) => {
    finishFonts = resolve
  })
  vi.stubGlobal('requestAnimationFrame', (callback) => {
    callback()
    return 1
  })
  Object.defineProperty(document, 'fonts', {
    configurable: true,
    value: { ready },
  })

  await restoreEarly()
  expect(pending.isConnected).toBe(true)
  finishFonts()
  await ready

  expect(window.scrollTo).toHaveBeenLastCalledWith({
    top: 1200,
    behavior: 'instant',
  })
  expect(pending.isConnected).toBe(false)
  vi.unstubAllGlobals()
})

it('reveals on interaction without restoring over the user scroll again', async () => {
  sessionStorage.setItem('scroll-window', '1200')
  const pending = document.createElement('style')
  pending.id = 'portal-page-scroll-restoration'
  document.head.appendChild(pending)
  let finishFonts: () => void
  const ready = new Promise<void>((resolve) => {
    finishFonts = resolve
  })
  vi.stubGlobal('requestAnimationFrame', (callback) => {
    callback()
    return 1
  })
  Object.defineProperty(document, 'fonts', {
    configurable: true,
    value: { ready },
  })

  await restoreEarly()
  window.dispatchEvent(new Event('wheel'))
  expect(pending.isConnected).toBe(false)
  vi.mocked(window.scrollTo).mockClear()
  finishFonts()
  await ready

  expect(window.scrollTo).not.toHaveBeenCalled()
  vi.unstubAllGlobals()
})
