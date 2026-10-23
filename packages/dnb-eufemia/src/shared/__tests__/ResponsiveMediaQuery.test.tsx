import { act, render, renderHook } from '@testing-library/react'
import { createRef, useRef, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import '../../core/vitest/mockMatchMediaSetup'
import { setMedia } from 'mock-match-media'
import Provider from '../Provider'
import useMedia from '../useMedia'
import useMediaQuery from '../useMediaQuery'
import MediaQuery from '../MediaQuery'
import { makeMediaQueryList } from '../MediaQueryUtils'
import { compileString } from 'sass'
import { resolve } from 'node:path'

describe('Available-width media queries', () => {
  let notify: ResizeObserverCallback
  let observers: Array<{
    observe: ReturnType<typeof vi.fn>
    disconnect: ReturnType<typeof vi.fn>
  }>

  beforeEach(() => {
    setMedia({ width: '100em', type: 'screen' })
    observers = []
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe = vi.fn()
        disconnect = vi.fn()
        constructor(callback: ResizeObserverCallback) {
          notify = callback
          observers.push(this)
        }
      }
    )
  })

  afterEach(() => vi.unstubAllGlobals())

  function container(width = 900, fontSize = 16) {
    const ref = createRef<HTMLDivElement>()
    ref.current = document.createElement('div')
    ref.current.style.cssText =
      'box-sizing: content-box; width: ' +
      width +
      'px; font-size: ' +
      fontSize +
      'px'
    document.body.appendChild(ref.current)
    return ref
  }

  it('uses the container for hook ranges and structured width queries', () => {
    const ref = container()
    const wrapper = ({ children }) => (
      <Provider responsive={{ target: 'container', containerRef: ref }}>
        {children}
      </Provider>
    )
    const { result } = renderHook(
      () => ({
        media: useMedia(),
        wide: useMediaQuery({ when: { min: 'medium' } }),
        viewport: useMediaQuery({
          when: { min: 'medium' },
          target: 'viewport',
        }),
      }),
      { wrapper }
    )
    expect(result.current.media.key).toBe('medium')
    expect(result.current.wide).toBe(false)
    expect(result.current.viewport).toBe(true)
    expect(
      observers.filter(
        (observer) => !observer.disconnect.mock.calls.length
      )
    ).toHaveLength(1)

    act(() => {
      ref.current.style.width = '1000px'
      notify([], undefined)
    })
    expect(result.current.media.key).toBe('large')
    expect(result.current.wide).toBe(true)
  })

  it('keeps adjacent ranges complementary at the threshold', () => {
    const ref = container(960)
    const wrapper = ({ children }) => (
      <Provider responsive={{ target: 'container', containerRef: ref }}>
        {children}
      </Provider>
    )
    const { result } = renderHook(
      () => ({
        below: useMediaQuery({ when: { max: 'medium' } }),
        above: useMediaQuery({ when: { min: 'medium' } }),
      }),
      { wrapper }
    )
    expect(result.current).toEqual({ below: true, above: false })
    act(() => {
      ref.current.style.width = '960.01px'
      notify([], undefined)
    })
    expect(result.current).toEqual({ below: false, above: true })
  })

  it('matches a min length at the threshold like a viewport query', () => {
    const useQueries = () => ({
      pixels: useMediaQuery({ when: { min: '600px' } }),
      ems: useMediaQuery({ when: { min: '37.5em' } }),
      breakpoint: useMediaQuery({ when: { min: 37.5 } }),
    })
    setMedia({ width: '600px', type: 'screen' })
    const viewport = renderHook(useQueries).result.current

    const ref = container(600)
    const wrapper = ({ children }) => (
      <Provider responsive={{ target: 'container', containerRef: ref }}>
        {children}
      </Provider>
    )
    const inContainer = renderHook(useQueries, { wrapper }).result.current

    expect(viewport).toEqual({ pixels: true, ems: true, breakpoint: true })
    expect(inContainer).toEqual(viewport)
  })

  it('uses the content box and container font size', () => {
    const ref = container(1000, 20)
    ref.current.style.cssText +=
      '; box-sizing: border-box; padding: 20px; border: 10px solid;'
    const wrapper = ({ children }) => (
      <Provider responsive={{ target: 'container', containerRef: ref }}>
        {children}
      </Provider>
    )
    const { result } = renderHook(
      () => ({
        pixels: useMediaQuery({ when: { min: '950px' } }),
        ems: useMediaQuery({ when: { min: 48 } }),
      }),
      { wrapper }
    )
    expect(result.current).toEqual({ pixels: false, ems: false })
    act(() => {
      ref.current.style.fontSize = '18px'
      notify([], undefined)
    })
    expect(result.current.ems).toBe(true)
  })

  it('does not substitute viewport width for a missing or zero-width target', () => {
    const ref = createRef<HTMLDivElement>()
    const wrapper = ({ children }) => (
      <Provider responsive={{ target: 'container', containerRef: ref }}>
        {children}
      </Provider>
    )
    const { result, rerender } = renderHook(() => useMedia(), { wrapper })
    expect(result.current.key).toBeNull()
    ref.current = container(0).current
    rerender()
    expect(result.current.key).toBe('small')
  })

  it('disconnects replaced and unmounted container targets', () => {
    const ref = container()
    const wrapper = ({ children }) => (
      <Provider responsive={{ target: 'container', containerRef: ref }}>
        {children}
      </Provider>
    )
    const { rerender, unmount } = renderHook(() => useMedia(), { wrapper })
    ref.current = container(500).current
    rerender()
    expect(observers[0].disconnect).toHaveBeenCalled()
    unmount()
    expect(observers[1].disconnect).toHaveBeenCalled()
  })

  it('reconnects when React replaces the target during commit', () => {
    const Read = () => (
      <span>
        {useMediaQuery({ when: { min: '600px' } }) ? 'wide' : 'narrow'}
      </span>
    )
    let replace: () => void
    function App() {
      const ref = useRef<HTMLDivElement>(null)
      const [wide, setWide] = useState(false)
      replace = () => setWide(true)
      return (
        <Provider responsive={{ target: 'container', containerRef: ref }}>
          <div
            key={String(wide)}
            ref={ref}
            style={{ width: wide ? '1000px' : '300px', fontSize: '16px' }}
          >
            <Read />
          </div>
        </Provider>
      )
    }
    render(<App />)
    expect(document.querySelector('span')).toHaveTextContent('narrow')
    act(replace)
    expect(document.querySelector('span')).toHaveTextContent('wide')
  })

  it('leaves raw strings and device queries as viewport queries', () => {
    const ref = container(300)
    const wrapper = ({ children }) => (
      <Provider responsive={{ target: 'container', containerRef: ref }}>
        {children}
      </Provider>
    )
    const { result } = renderHook(
      () => useMediaQuery({ query: '(min-width: 60em)' }),
      { wrapper }
    )
    expect(result.current).toBe(true)
  })

  it('updates a stable query when Provider breakpoints change', () => {
    const when = { min: 'medium' }
    const Content = () => <span>{String(useMediaQuery({ when }))}</span>
    const { rerender } = render(
      <Provider breakpoints={{ medium: '90em' }}>
        <Content />
      </Provider>
    )
    expect(document.querySelector('span')).toHaveTextContent('true')
    rerender(
      <Provider breakpoints={{ medium: '110em' }}>
        <Content />
      </Provider>
    )
    expect(document.querySelector('span')).toHaveTextContent('false')
  })

  it('shifts viewport thresholds with native CSS length arithmetic', () => {
    const matchMedia = vi.spyOn(window, 'matchMedia')
    makeMediaQueryList(
      { when: { min: 'medium', max: 'large' } },
      undefined,
      {
        responsive: { target: 'viewport', offset: 288 },
      }
    )
    expect(matchMedia).toHaveBeenLastCalledWith(
      '(min-width: calc(60.00625em + 288px)) and (max-width: calc(72em + 288px))'
    )
    matchMedia.mockRestore()
  })

  it('hydrates the initial value before resolving a measured target', async () => {
    const ref = container(300)
    const Content = () => (
      <div data-result>
        {useMedia({ initialValue: { isLarge: true } }).isLarge
          ? 'wide'
          : 'narrow'}
      </div>
    )
    const element = (
      <Provider responsive={{ target: 'container', containerRef: ref }}>
        <Content />
      </Provider>
    )
    const node = document.createElement('div')
    node.innerHTML = renderToString(element)
    document.body.appendChild(node)
    expect(node).toHaveTextContent('wide')
    let root: ReturnType<typeof hydrateRoot>
    const onRecoverableError = vi.fn()
    await act(async () => {
      root = hydrateRoot(node, element, { onRecoverableError })
    })
    expect(node).toHaveTextContent('narrow')
    expect(onRecoverableError).not.toHaveBeenCalled()
    act(() => root.unmount())
  })

  it('supports the MediaQuery component inside the same boundary', () => {
    const ref = container(300)
    render(
      <Provider responsive={{ target: 'container', containerRef: ref }}>
        <MediaQuery when={{ max: 'small' }}>Small container</MediaQuery>
      </Provider>
    )
    expect(document.body).toHaveTextContent('Small container')
  })

  it('preserves nested viewport scopes and isolates independent app containers', () => {
    const first = container(300)
    const second = container(1100)
    const Read = ({ id }) => <span id={id}>{useMedia().key}</span>
    render(
      <>
        <Provider
          responsive={{ target: 'container', containerRef: first }}
        >
          <Read id="first" />
          <Provider responsive={{ target: 'viewport' }}>
            <Read id="viewport" />
          </Provider>
        </Provider>
        <Provider
          responsive={{ target: 'container', containerRef: second }}
        >
          <Read id="second" />
        </Provider>
      </>
    )
    expect(document.querySelector('#first')).toHaveTextContent('small')
    expect(document.querySelector('#viewport')).toHaveTextContent('large')
    expect(document.querySelector('#second')).toHaveTextContent('large')
  })

  it('supports OR, AND, negation, and viewport device conditions', () => {
    const ref = container(700)
    const wrapper = ({ children }) => (
      <Provider responsive={{ target: 'container', containerRef: ref }}>
        {children}
      </Provider>
    )
    const { result } = renderHook(
      () => ({
        or: useMediaQuery({ when: [{ max: '400px' }, { min: '600px' }] }),
        and: useMediaQuery({
          when: [{ min: '600px' }, 'and', { max: '800px', screen: true }],
        }),
        not: useMediaQuery({ when: { max: '600px' }, not: true }),
      }),
      { wrapper }
    )
    expect(result.current).toEqual({ or: true, and: true, not: true })
  })

  it('does not re-render consumers on resize unless their query result changes', () => {
    const ref = container(700)
    const renders = vi.fn()
    const wrapper = ({ children }) => (
      <Provider responsive={{ target: 'container', containerRef: ref }}>
        {children}
      </Provider>
    )
    renderHook(
      () => {
        const match = useMediaQuery({ when: { min: '600px' } })
        renders(match)
      },
      { wrapper }
    )
    const count = renders.mock.calls.length
    act(() => {
      ref.current.style.width = '710px'
      notify([], undefined)
    })
    expect(renders).toHaveBeenCalledTimes(count)
  })

  it('compiles named container ranges without changing viewport output', () => {
    const css = compileString(
      '@use "utilities" as u; .above { @include u.containerAbove(medium, app) { color: red; } } .below { @include u.containerBelow(medium, app) { color: blue; } } .between { @include u.containerBetween(small, medium) { color: green; } } .viewport { @include u.allAbove(medium) { color: black; } }',
      { loadPaths: [resolve('src/style/core')] }
    ).css
    expect(css).toContain('@container app (width > 60em)')
    expect(css).toContain('@container app (width <= 60em)')
    expect(css).toContain('@container (40em < width <= 60em)')
    expect(css).toContain('@media screen and (min-width: 60.00625em)')
  })

  it('supports structured query objects and root-relative lengths', () => {
    const original = document.documentElement.style.fontSize
    document.documentElement.style.fontSize = '20px'
    const ref = container(700)
    const wrapper = ({ children }) => (
      <Provider responsive={{ target: 'container', containerRef: ref }}>
        {children}
      </Provider>
    )
    const { result } = renderHook(
      () => useMediaQuery({ query: { max: '40rem' } }),
      { wrapper }
    )
    expect(result.current).toBe(true)
    act(() => {
      document.documentElement.style.fontSize = '16px'
      notify([], undefined)
    })
    expect(result.current).toBe(false)
    document.documentElement.style.fontSize = original
  })

  it('measures a container that wraps the Provider, as documented', () => {
    // The container's ref is attached after the layout effects inside it run
    const Read = () => <span data-key>{String(useMedia().key)}</span>
    function Application() {
      const containerRef = useRef<HTMLDivElement>(null)
      return (
        <div
          ref={containerRef}
          data-app
          style={{ width: '300px', fontSize: '16px' }}
        >
          <Provider responsive={{ target: 'container', containerRef }}>
            <Read />
          </Provider>
        </div>
      )
    }
    render(<Application />)
    const read = () => document.querySelector('[data-key]').textContent
    expect(read()).toBe('small')

    act(() => {
      document.querySelector<HTMLElement>('[data-app]').style.width =
        '1100px'
      notify([], undefined)
    })
    expect(read()).toBe('large')
  })

  it('adds no elements to the application containers', () => {
    const first = container(300)
    const second = container(1100)
    const Read = () => <p>{useMediaQuery({ when: { max: 'small' } })}</p>
    const { unmount } = render(
      <>
        <Provider
          responsive={{ target: 'container', containerRef: first }}
        >
          <Read />
        </Provider>
        <Provider
          responsive={{ target: 'container', containerRef: second }}
        >
          <Read />
        </Provider>
      </>
    )
    expect(first.current.children).toHaveLength(0)
    expect(second.current.children).toHaveLength(0)
    const probes = document.querySelectorAll(
      'body > [data-dnb-responsive-probe]'
    )
    expect(probes).toHaveLength(1)
    expect(
      observers.filter((observer) =>
        observer.observe.mock.calls.some(
          ([target]) => target === probes[0]
        )
      )
    ).toHaveLength(2)

    unmount()
    expect(
      document.querySelectorAll('[data-dnb-responsive-probe]')
    ).toHaveLength(0)
  })

  it('fails explicitly for unsupported lengths and never substitutes the viewport when observation is unavailable', () => {
    const ref = container(700)
    expect(() =>
      makeMediaQueryList({ when: { min: '50vw' } }, undefined, {
        responsive: { target: 'container', containerRef: ref },
      })
    ).toThrow('px, em, or rem')
    expect(() =>
      makeMediaQueryList({ when: { max: 'small' } }, undefined, {
        responsive: { target: 'viewport', offset: -1 },
      })
    ).toThrow('non-negative')
    vi.stubGlobal('ResizeObserver', undefined)
    expect(
      makeMediaQueryList({ when: { max: 'small' } }, undefined, {
        responsive: { target: 'container', containerRef: ref },
      }).matches
    ).toBe(false)
  })
})
