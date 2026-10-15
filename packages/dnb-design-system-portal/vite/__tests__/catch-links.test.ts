import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import catchLinksPlugin from '../client/plugins/catch-links'

describe('catch-links', () => {
  let navigateFn: (...args: unknown[]) => void
  let cleanup: () => void

  beforeEach(() => {
    navigateFn = vi.fn()

    const plugin = catchLinksPlugin()
    const load = plugin.load as (id: string) => string
    const runtime = load('\0virtual:catch-links')
      .replace(/^import .*$/gm, '')
      .replace('export function', 'function')
    const runHook = new Function(
      'useEffect',
      'useNavigate',
      runtime + '\nuseCatchLinks()'
    )
    runHook(
      (effect: () => () => void) => {
        cleanup = effect()
      },
      () => navigateFn
    )
  })

  afterEach(() => {
    cleanup()
    document.body.innerHTML = ''
  })

  function clickLink(el: HTMLElement, opts: MouseEventInit = {}) {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      button: 0,
      ...opts,
    })
    el.dispatchEvent(event)
    return event
  }

  it('intercepts internal link clicks', () => {
    const a = document.createElement('a')
    a.href = '/uilib/components/button/'
    document.body.appendChild(a)

    clickLink(a)
    expect(navigateFn).toHaveBeenCalledWith('/uilib/components/button/')
  })

  it('preserves search and hash', () => {
    const a = document.createElement('a')
    a.href = '/page/?foo=bar#section'
    document.body.appendChild(a)

    clickLink(a)
    expect(navigateFn).toHaveBeenCalledWith('/page/?foo=bar#section')
  })

  it('does not intercept external links', () => {
    const a = document.createElement('a')
    a.href = 'https://example.com/page'
    document.body.appendChild(a)

    clickLink(a)
    expect(navigateFn).not.toHaveBeenCalled()
  })

  it('does not intercept clicks with meta key', () => {
    const a = document.createElement('a')
    a.href = '/page/'
    document.body.appendChild(a)

    clickLink(a, { metaKey: true })
    expect(navigateFn).not.toHaveBeenCalled()
  })

  it('does not intercept clicks with ctrl key', () => {
    const a = document.createElement('a')
    a.href = '/page/'
    document.body.appendChild(a)

    clickLink(a, { ctrlKey: true })
    expect(navigateFn).not.toHaveBeenCalled()
  })

  it('does not intercept clicks with shift key', () => {
    const a = document.createElement('a')
    a.href = '/page/'
    document.body.appendChild(a)

    clickLink(a, { shiftKey: true })
    expect(navigateFn).not.toHaveBeenCalled()
  })

  it('does not intercept clicks with alt key', () => {
    const a = document.createElement('a')
    a.href = '/page/'
    document.body.appendChild(a)

    clickLink(a, { altKey: true })
    expect(navigateFn).not.toHaveBeenCalled()
  })

  it('does not intercept links with download attribute', () => {
    const a = document.createElement('a')
    a.href = '/file.pdf'
    a.setAttribute('download', '')
    document.body.appendChild(a)

    clickLink(a)
    expect(navigateFn).not.toHaveBeenCalled()
  })

  it('does not intercept links with rel="external"', () => {
    const a = document.createElement('a')
    a.href = '/page/'
    a.setAttribute('rel', 'external')
    document.body.appendChild(a)

    clickLink(a)
    expect(navigateFn).not.toHaveBeenCalled()
  })

  it('does not intercept links with target="_blank"', () => {
    const a = document.createElement('a')
    a.href = '/page/'
    a.target = '_blank'
    document.body.appendChild(a)

    clickLink(a)
    expect(navigateFn).not.toHaveBeenCalled()
  })

  it('allows target="_self" links', () => {
    const a = document.createElement('a')
    a.href = '/page/'
    a.target = '_self'
    document.body.appendChild(a)

    clickLink(a)
    expect(navigateFn).toHaveBeenCalledWith('/page/')
  })

  it('intercepts clicks on child elements of anchors', () => {
    const a = document.createElement('a')
    a.href = '/page/'
    const span = document.createElement('span')
    span.textContent = 'Click me'
    a.appendChild(span)
    document.body.appendChild(a)

    clickLink(span)
    expect(navigateFn).toHaveBeenCalledWith('/page/')
  })

  it('does not intercept clicks on non-anchor elements', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    clickLink(div)
    expect(navigateFn).not.toHaveBeenCalled()
  })

  it('does not intercept right-clicks', () => {
    const a = document.createElement('a')
    a.href = '/page/'
    document.body.appendChild(a)

    clickLink(a, { button: 2 })
    expect(navigateFn).not.toHaveBeenCalled()
  })

  it('keeps hash-only navigation in sync with the router', () => {
    const a = document.createElement('a')
    a.setAttribute('href', '#section-heading')
    document.body.appendChild(a)

    const event = clickLink(a)
    expect(navigateFn).toHaveBeenCalledWith(
      window.location.pathname +
        window.location.search +
        '#section-heading'
    )
    expect(event.defaultPrevented).toBe(true)
  })
})
