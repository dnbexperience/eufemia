import { render } from '@testing-library/react'
import {
  getTextScaleScript,
  TextScaleClient,
  TextScaleHeadScript,
} from '../TextScaleScript'

describe('TextScaleScript', () => {
  const getComputedStyleOriginal = window.getComputedStyle
  const cssOriginal = globalThis.CSS
  const resizeObserverOriginal = globalThis.ResizeObserver

  afterEach(() => {
    globalThis.__eufemiaTextScaleCleanup?.()
    document.documentElement.style.fontSize = ''
    document.documentElement.removeAttribute('data-eufemia-text-scale')
    window.getComputedStyle = getComputedStyleOriginal
    Object.defineProperty(globalThis, 'CSS', {
      configurable: true,
      value: cssOriginal,
    })
    Object.defineProperty(globalThis, 'ResizeObserver', {
      configurable: true,
      value: resizeObserverOriginal,
    })
    delete globalThis.__eufemiaTextScaleCleanup
  })

  it('sets the root size synchronously from Apple Dynamic Type', () => {
    mockSupport({ appleBodySize: 17 })

    Function(getTextScaleScript())()

    expect(document.documentElement.style.fontSize).toBe('16px')
    expect(
      document.documentElement.getAttribute('data-eufemia-text-scale')
    ).toBe('apple')
  })

  it('leaves unsupported browsers unchanged', () => {
    mockSupport({})

    Function(getTextScaleScript())()

    expect(document.documentElement.style.fontSize).toBe('')
    expect(
      document.documentElement.hasAttribute('data-eufemia-text-scale')
    ).toBe(false)
  })

  it('updates the root size when the measured Apple text size changes', () => {
    let appleBodySize = 17
    let resizeCallback: () => void
    mockSupport({ getAppleBodySize: () => appleBodySize })
    Object.defineProperty(globalThis, 'ResizeObserver', {
      configurable: true,
      value: class {
        constructor(callback: () => void) {
          resizeCallback = callback
        }
        observe() {}
        disconnect() {}
      },
    })

    Function(getTextScaleScript())()
    document.dispatchEvent(new Event('DOMContentLoaded'))

    appleBodySize = 34
    expect(resizeCallback).toBeTypeOf('function')
    resizeCallback()

    expect(document.documentElement.style.fontSize).toBe('32px')
  })

  it('rechecks the Apple text size when the window regains focus', () => {
    let appleBodySize = 17
    mockSupport({ getAppleBodySize: () => appleBodySize })

    Function(getTextScaleScript())()
    document.dispatchEvent(new Event('DOMContentLoaded'))

    appleBodySize = 34
    dispatchEvent(new Event('focus'))

    expect(document.documentElement.style.fontSize).toBe('32px')
  })

  it('renders a blocking script for the document head', () => {
    render(<TextScaleHeadScript nonce="nonce-value" />)

    const script = document.querySelector('script')
    expect(script).toHaveAttribute('nonce', 'nonce-value')
    expect(script?.textContent).toBe(getTextScaleScript())
  })

  it('provides a client-rendering fallback', () => {
    mockSupport({ appleBodySize: 17 })

    render(<TextScaleClient />)

    expect(document.documentElement.style.fontSize).toBe('16px')
  })

  function mockSupport({
    appleBodySize = 0,
    getAppleBodySize,
  }: {
    appleBodySize?: number
    getAppleBodySize?: () => number
  }) {
    const readAppleBodySize = getAppleBodySize ?? (() => appleBodySize)
    Object.defineProperty(globalThis, 'CSS', {
      configurable: true,
      value: {
        supports: vi.fn((property: string) => {
          return property.replaceAll(' ', '') ===
            '-webkit-touch-callout:none'
            ? readAppleBodySize() > 0
            : property.replaceAll(' ', '') === 'font:-apple-system-body'
              ? readAppleBodySize() > 0
              : false
        }),
      },
    })
    Object.defineProperty(globalThis, 'ResizeObserver', {
      configurable: true,
      value: undefined,
    })

    window.getComputedStyle = vi.fn((element: Element) => {
      return {
        fontSize: `${readAppleBodySize()}px`,
        width: '0px',
      } as CSSStyleDeclaration
    })
  }
})

declare global {
  var __eufemiaTextScaleCleanup: (() => void) | undefined
}
