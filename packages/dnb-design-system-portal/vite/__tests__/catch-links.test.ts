import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('catch-links', () => {
  let navigateFn: (...args: unknown[]) => void
  let cleanup: () => void

  beforeEach(() => {
    navigateFn = vi.fn()

    // Simulate the useCatchLinks behavior directly (since it's a hook
    // tied to the full app, we test the click handler logic in isolation)
    function onClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.altKey ||
        e.ctrlKey ||
        e.shiftKey
      ) {
        return
      }

      const anchor = (e.target as HTMLElement).closest?.('a')
      if (!anchor) {
        return
      }

      if (
        anchor.hasAttribute('download') ||
        anchor.getAttribute('rel') === 'external' ||
        (anchor.target && anchor.target !== '_self')
      ) {
        return
      }

      const href = anchor.getAttribute('href')
      if (!href) {
        return
      }

      // Let the browser handle hash-only links natively (scroll to anchor)
      if (href.startsWith('#')) {
        return
      }

      try {
        const url = new URL(href, window.location.origin)
        if (url.origin !== window.location.origin) {
          return
        }

        e.preventDefault()
        navigateFn(url.pathname + url.search + url.hash)
      } catch {
        // Invalid URL
      }
    }

    document.addEventListener('click', onClick)
    cleanup = () => document.removeEventListener('click', onClick)
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

  it('does not intercept hash-only links', () => {
    const a = document.createElement('a')
    a.setAttribute('href', '#section-heading')
    document.body.appendChild(a)

    const event = clickLink(a)
    expect(navigateFn).not.toHaveBeenCalled()
    expect(event.defaultPrevented).toBe(false)
  })
})
