import { renderToString } from 'react-dom/server'
import { getPreHydrationScript } from '../TableOfContentPreHydrationScript'
import TableOfContent from '../TableOfContent'

afterEach(() => {
  vi.restoreAllMocks()
  sessionStorage.clear()
  localStorage.clear()
  document
    .querySelectorAll('[data-table-of-content-pre-hydration]')
    .forEach((element) => element.remove())
})

it.each(['true', 'false'])(
  'restores stored %s styling from server markup without changing hydration attributes',
  (stored) => {
    sessionStorage.setItem('toc-state', stored)
    const container = document.createElement('div')
    container.innerHTML = renderToString(
      <TableOfContent.Data
        id="toc"
        expandedStorageKey="toc-state"
        data={[{ id: 'first', text: 'First', level: 2 }]}
      />
    )
    document.body.append(container)
    const before = container.innerHTML
    new Function(getPreHydrationScript())()
    expect(container.innerHTML).toBe(before)
    expect(
      document.querySelector('[data-table-of-content-pre-hydration]')
        ?.textContent
    ).toContain(
      stored === 'true'
        ? 'display:block!important'
        : 'display:none!important'
    )
    container.remove()
  }
)

it('does not interrupt rendering when storage is blocked', () => {
  const nav = document.createElement('nav')
  nav.setAttribute(
    'data-table-of-content-expanded-storage-key',
    'toc-state'
  )
  document.body.append(nav)
  vi.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => {
    throw new DOMException('Blocked')
  })
  expect(() => new Function(getPreHydrationScript())()).not.toThrow()
  nav.remove()
})
