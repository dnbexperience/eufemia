import { it, expect, vi } from 'vitest'
import { act, render, waitFor } from '@testing-library/react'
import PortalToc from '../PortalToc'

vi.mock('@dnb/eufemia/src/extensions', () => ({
  TableOfContent: {
    Data: ({ data: sections }) => (
      <nav>
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

function heading(id: string, text: string) {
  const element = document.createElement('h2')
  element.innerHTML = text + '<a class="anchor-hash" id="' + id + '">#</a>'
  element.getClientRects = () =>
    element.hidden
      ? ([] as unknown as DOMRectList)
      : ([{}] as unknown as DOMRectList)
  return element
}

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
      heading('replacement', 'Replacement <code>API</code>')
    )
  })
  await waitFor(() =>
    expect(
      document.querySelector('nav a[href="#replacement"] code')
        ?.textContent
    ).toBe('API')
  )
})
