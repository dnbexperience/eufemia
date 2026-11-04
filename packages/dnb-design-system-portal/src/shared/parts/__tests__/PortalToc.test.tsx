import { afterEach, beforeEach, it, expect, vi } from 'vitest'
import { act, render, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import PortalToc from '../PortalToc'
import { PortalTocData, readInitialToc } from '../PortalTocData'

vi.mock('@dnb/eufemia/src/extensions', () => ({
  TableOfContent: {
    Data: ({ data: sections, locale, ref }) => (
      <nav lang={locale} ref={ref}>
        <div className="dnb-table-of-content__scroll">
          <div>
            {sections.map(({ id, text }) => (
              <a key={id} href={'#' + id}>
                {text}
              </a>
            ))}
          </div>
        </div>
      </nav>
    ),
  },
}))
vi.mock('@dnb/eufemia/src/extensions/table-of-content/style', () => ({}))

beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    }
  )
})
afterEach(() => vi.unstubAllGlobals())

afterEach(() =>
  document.querySelectorAll('main').forEach((main) => main.remove())
)

function heading(id: string, text: string) {
  const element = document.createElement('h2')
  element.innerHTML = text + '<a class="anchor-hash" id="' + id + '">#</a>'
  element.getClientRects = () =>
    element.hidden
      ? ([] as unknown as DOMRectList)
      : ([{}] as unknown as DOMRectList)
  return element
}

it('renders links on the server and reuses their escaped heading data on the matching route', () => {
  const snapshot = {
    pathname: '/article/',
    headings: [
      { id: 'api', level: 2, text: ['Use <', { code: 'API' }, '>'] },
    ],
  }
  const container = document.createElement('div')
  container.innerHTML = renderToString(
    <PortalTocData value={snapshot}>
      <PortalToc pathname="/article/" />
    </PortalTocData>
  )
  document.body.append(container)
  expect(container.querySelector('nav').getAttribute('lang')).toBe('en-GB')
  expect(container.querySelector('nav a code').textContent).toBe('API')
  expect(container.querySelector('nav a').textContent).toBe('Use <API>')
  expect(
    JSON.parse(container.querySelector('script').textContent)
  ).toEqual(snapshot)
  expect(container.querySelector('script').textContent).not.toContain('<')
  expect(readInitialToc('/article/')).toEqual(snapshot)
  expect(readInitialToc('/other/')).toBeNull()
  container.remove()
})

it('updates links when destinations are hidden, remounted or renamed', async () => {
  const main = document.createElement('main')
  const first = heading('first', 'First')
  main.append(first)
  document.body.append(main)
  render(<PortalToc />)
  await waitFor(() =>
    expect(document.querySelector('nav a[href="#first"]')).not.toBeNull()
  )
  act(() => {
    first.hidden = true
  })
  await waitFor(() =>
    expect(document.querySelector('nav a[href="#first"]')).toBeNull()
  )
  act(() => {
    first.replaceWith(
      heading('replacement', 'Replacement <code>Form.Section</code>')
    )
  })
  await waitFor(() =>
    expect(
      document.querySelector('nav a[href="#replacement"] code')
        ?.textContent
    ).toBe('Form.Section')
  )
  expect(
    document.querySelector('nav a[href="#replacement"] code').innerHTML
  ).toBe('Form.<wbr>Section')
})

it.each(['hidden', 'aria-hidden', 'visibility', 'removed'])(
  'removes and restores links when a heading becomes %s',
  async (change) => {
    const main = document.createElement('main')
    const section = document.createElement('section')
    const first = heading('first', 'First')
    const second = heading('second', 'Second')
    section.append(second)
    main.append(first, section)
    document.body.append(main)
    render(<PortalToc />)
    const links = () =>
      Array.from(document.querySelectorAll('nav a')).map((link) =>
        link.getAttribute('href')
      )
    await waitFor(() => expect(links()).toEqual(['#first', '#second']))

    act(() => {
      if (change === 'removed') {
        second.remove()
      } else if (change === 'visibility') {
        second.style.visibility = 'hidden'
      } else {
        section.setAttribute(change, 'true')
      }
    })
    await waitFor(() => expect(links()).toEqual(['#first']))

    act(() => {
      section.removeAttribute('hidden')
      section.removeAttribute('aria-hidden')
      second.style.removeProperty('visibility')
      section.append(second)
    })
    await waitFor(() => expect(links()).toEqual(['#first', '#second']))

    act(() => main.replaceChildren())
    await waitFor(() => expect(links()).toEqual([]))
  }
)

it('adds line-break opportunities after dots in plain and inline-code labels', () => {
  const container = document.createElement('div')
  container.innerHTML = renderToString(
    <PortalTocData
      value={{
        pathname: '/article/',
        headings: [
          { id: 'title', level: 1, text: ['Wizard'] },
          {
            id: 'previous',
            level: 2,
            text: [
              'Use ',
              { code: 'Wizard.PreviousButton' },
              ' and Form.Section',
            ],
          },
        ],
      }}
    >
      <PortalToc pathname="/article/" />
    </PortalTocData>
  )
  expect(
    container.querySelector('a[href="#previous"] code').innerHTML
  ).toBe('Wizard.<wbr>PreviousButton')
  expect(container.querySelector('a[href="#previous"]').textContent).toBe(
    'Use Wizard.PreviousButton and Form.Section'
  )
  expect(container.querySelectorAll('wbr')).toHaveLength(2)
})

it('omits navigation when there are no headings below the page title', () => {
  const container = document.createElement('div')
  container.innerHTML = renderToString(
    <PortalTocData
      value={{
        pathname: '/article/',
        headings: [{ id: 'title', level: 1, text: ['Title'] }],
      }}
    >
      <PortalToc pathname="/article/" />
    </PortalTocData>
  )
  expect(container.querySelector('nav')).toBeNull()
  expect(container.querySelector('#portal-toc-data')).not.toBeNull()
})

it('contains outline scrolling only while its list overflows and updates after resizing', async () => {
  const main = document.createElement('main')
  main.append(heading('first', 'First'))
  document.body.append(main)
  const callbacks: ResizeObserverCallback[] = []
  const disconnect = vi.fn()
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(callback: ResizeObserverCallback) {
        callbacks.push(callback)
      }
      observe() {}
      disconnect = disconnect
    }
  )
  try {
    const { unmount } = render(<PortalToc />)
    await waitFor(() =>
      expect(document.querySelector('nav')).not.toBeNull()
    )
    const scroll = document.querySelector<HTMLElement>(
      '.dnb-table-of-content__scroll'
    )
    Object.defineProperty(scroll, 'clientHeight', {
      configurable: true,
      value: 100,
    })
    Object.defineProperty(scroll, 'scrollHeight', {
      configurable: true,
      value: 300,
    })
    act(() => callbacks.forEach((callback) => callback([], null)))
    expect(scroll.style.overscrollBehaviorY).toBe('contain')

    const wheel = (deltaY: number, options: WheelEventInit = {}) => {
      const event = new WheelEvent('wheel', {
        deltaY,
        cancelable: true,
        ...options,
      })
      scroll.dispatchEvent(event)
      return event.defaultPrevented
    }
    scroll.scrollTop = 200
    expect(wheel(100)).toBe(true)
    expect(wheel(-100)).toBe(false)
    expect(wheel(100, { ctrlKey: true })).toBe(false)
    expect(wheel(100, { shiftKey: true })).toBe(false)
    expect(wheel(100, { deltaX: 200 })).toBe(false)
    scroll.scrollTop = 50
    expect(wheel(100)).toBe(false)
    scroll.scrollTop = 0
    expect(wheel(-100)).toBe(true)
    Object.defineProperty(scroll, 'scrollHeight', {
      configurable: true,
      value: 100,
    })
    act(() => callbacks.forEach((callback) => callback([], null)))
    expect(scroll.style.overscrollBehaviorY).toBe('auto')
    expect(wheel(100)).toBe(false)
    expect(wheel(-100)).toBe(false)
    unmount()
    expect(disconnect).toHaveBeenCalled()
    Object.defineProperty(scroll, 'scrollHeight', {
      configurable: true,
      value: 300,
    })
    expect(wheel(-100)).toBe(false)
  } finally {
    vi.unstubAllGlobals()
  }
})
