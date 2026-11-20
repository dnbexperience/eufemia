import { afterEach, it, expect, vi } from 'vitest'
import { act, render, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import PortalToc from '../PortalToc'
import { PortalTocData, readInitialToc } from '../PortalTocData'

vi.mock('@dnb/eufemia/src/extensions', () => ({
  TableOfContent: {
    Data: ({ data: sections, locale }) => (
      <nav lang={locale}>
        {sections.map(({ id, text }) => (
          <a key={id} href={'#' + id}>
            {text}
          </a>
        ))}
      </nav>
    ),
  },
}))
vi.mock('@dnb/eufemia/src/extensions/table-of-content/style', () => ({}))

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

it.each(['hidden', 'visibility', 'removed'])(
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

it('keeps visually rendered headings when background content becomes aria-hidden', async () => {
  const main = document.createElement('main')
  main.append(heading('first', 'First'), heading('second', 'Second'))
  document.body.append(main)
  render(<PortalToc />)
  const links = () =>
    Array.from(document.querySelectorAll('nav a')).map((link) =>
      link.getAttribute('href')
    )
  expect(links()).toEqual(['#first', '#second'])

  act(() => {
    main.querySelectorAll('*').forEach((element) => {
      element.setAttribute('aria-hidden', 'true')
    })
    window.dispatchEvent(new Event('resize'))
  })
  await act(() => new Promise((resolve) => requestAnimationFrame(resolve)))
  expect(links()).toEqual(['#first', '#second'])

  act(() => {
    main.querySelectorAll('*').forEach((element) => {
      element.removeAttribute('aria-hidden')
    })
    window.dispatchEvent(new Event('resize'))
  })
  await act(() => new Promise((resolve) => requestAnimationFrame(resolve)))
  expect(links()).toEqual(['#first', '#second'])
})
