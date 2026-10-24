import { act, render, waitFor } from '@testing-library/react'
import useCurrentSectionId from '../useCurrentSectionId'

const sections = [
  { id: 'first', text: 'First', level: 2 },
  { id: 'second', text: 'Second', level: 2 },
]

function Current() {
  const current = useCurrentSectionId(sections)
  return <output>{current}</output>
}

function heading(id: string, top: number) {
  const element = document.createElement('h2')
  element.id = id
  element.getBoundingClientRect = () =>
    ({ top, bottom: top + 32 }) as DOMRect
  element.getClientRects = () =>
    (element.hidden ? [] : [{ top }]) as unknown as DOMRectList
  document.body.append(element)
  return element
}

it('ignores hidden headings when resolving the current section', async () => {
  heading('first', -50)
  const second = heading('second', 0)
  second.hidden = true
  render(<Current />)
  await waitFor(() =>
    expect(document.querySelector('output')).toHaveTextContent('first')
  )
})

it('tracks replacement headings with the same id without changing the data', async () => {
  heading('first', -50)
  const second = heading('second', 300)
  render(<Current />)
  expect(document.querySelector('output')).toHaveTextContent('first')
  act(() => {
    second.remove()
    heading('second', -10)
  })
  await waitFor(() =>
    expect(document.querySelector('output')).toHaveTextContent('second')
  )
})

it('selects a visible final heading at the document end and resumes the offset when scrolling up', async () => {
  const first = heading('first', -200)
  const second = heading('second', 300)
  const scroller = document.documentElement
  vi.spyOn(scroller, 'clientHeight', 'get').mockReturnValue(800)
  vi.spyOn(scroller, 'scrollHeight', 'get').mockReturnValue(1200)
  scroller.scrollTop = 400
  render(<Current />)
  expect(document.querySelector('output')).toHaveTextContent('second')
  act(() => {
    scroller.scrollTop = 200
    first.getBoundingClientRect = () => ({ top: 0, bottom: 32 }) as DOMRect
    second.getBoundingClientRect = () =>
      ({ top: 500, bottom: 532 }) as DOMRect
    window.dispatchEvent(new Event('scroll'))
  })
  await waitFor(() =>
    expect(document.querySelector('output')).toHaveTextContent('first')
  )
})

it('uses the nested scroller end and ignores headings clipped below it', async () => {
  const container = document.createElement('div')
  container.style.overflowY = 'auto'
  container.getBoundingClientRect = () => ({ top: 100 }) as DOMRect
  vi.spyOn(container, 'clientHeight', 'get').mockReturnValue(400)
  vi.spyOn(container, 'scrollHeight', 'get').mockReturnValue(700)
  container.scrollTop = 300
  const first = heading('first', -100)
  const second = heading('second', 600)
  container.append(first, second)
  document.body.append(container)
  render(<Current />)
  expect(document.querySelector('output')).toHaveTextContent('first')
  act(() => {
    second.getBoundingClientRect = () =>
      ({ top: 300, bottom: 332 }) as DOMRect
    container.dispatchEvent(new Event('scroll'))
  })
  await waitFor(() =>
    expect(document.querySelector('output')).toHaveTextContent('second')
  )
})

it('keeps the first section on a page without a scroll range', () => {
  heading('first', 100)
  heading('second', 300)
  const scroller = document.documentElement
  vi.spyOn(scroller, 'clientHeight', 'get').mockReturnValue(800)
  vi.spyOn(scroller, 'scrollHeight', 'get').mockReturnValue(800)
  render(<Current />)
  expect(document.querySelector('output')).toHaveTextContent('first')
})

it('prefers a visible URL hash to the last heading at the document end', async () => {
  const first = heading('first', 100)
  heading('second', 300)
  window.history.replaceState(null, '', '#first')
  const scroller = document.documentElement
  vi.spyOn(scroller, 'clientHeight', 'get').mockReturnValue(800)
  vi.spyOn(scroller, 'scrollHeight', 'get').mockReturnValue(1200)
  scroller.scrollTop = 400
  render(<Current />)
  expect(document.querySelector('output')).toHaveTextContent('first')
  act(() => {
    first.getBoundingClientRect = () =>
      ({ top: -100, bottom: -68 }) as DOMRect
    window.dispatchEvent(new Event('scroll'))
  })
  await waitFor(() =>
    expect(document.querySelector('output')).toHaveTextContent('second')
  )
  expect(window.location.hash).toBe('#first')
})

it('uses an encoded hash on arrival but never re-applies it after manual input', async () => {
  heading('first', 100)
  const second = heading('fødselsnummer', 300)
  const data = [
    { id: 'first', text: 'First', level: 2 },
    { id: second.id, text: 'Second', level: 2 },
  ]
  function Encoded() {
    return <output>{useCurrentSectionId(data)}</output>
  }
  window.history.replaceState(null, '', '#f%C3%B8dselsnummer')
  const { rerender } = render(<Encoded />)
  expect(document.querySelector('output')).toHaveTextContent(second.id)
  act(() => window.dispatchEvent(new Event('wheel')))
  await waitFor(() =>
    expect(document.querySelector('output')).toHaveTextContent('first')
  )
  act(() => window.dispatchEvent(new Event('scroll')))
  rerender(<Encoded />)
  expect(document.querySelector('output')).toHaveTextContent('first')
  expect(window.location.hash).toBe('#f%C3%B8dselsnummer')
})

it.each([
  'pointerdown',
  'touchstart',
  'keydown',
  'hashchange',
  'popstate',
])('ends arrival hash preference on %s', async (event) => {
  heading('first', 100)
  heading('second', 300)
  window.history.replaceState(null, '', '#second')
  render(<Current />)
  expect(document.querySelector('output')).toHaveTextContent('second')
  act(() => window.dispatchEvent(new Event(event)))
  await waitFor(() =>
    expect(document.querySelector('output')).toHaveTextContent('first')
  )
})

it('ignores hash targets clipped by their nested scroller', () => {
  const container = document.createElement('div')
  container.style.overflowY = 'auto'
  container.getBoundingClientRect = () =>
    ({ top: 100, bottom: 300 }) as DOMRect
  vi.spyOn(container, 'clientHeight', 'get').mockReturnValue(200)
  container.append(heading('first', 100), heading('second', 400))
  document.body.append(container)
  window.history.replaceState(null, '', '#second')
  render(<Current />)
  expect(document.querySelector('output')).toHaveTextContent('first')
})

it.each(['#second', '#missing', '#invalid%ZZ'])(
  'ignores hidden, missing and malformed hash targets: %s',
  (hash) => {
    heading('first', 100)
    const second = heading('second', 300)
    second.hidden = true
    window.history.replaceState(null, '', hash)
    render(<Current />)
    expect(document.querySelector('output')).toHaveTextContent('first')
  }
)

it('does not keep a hash heading current behind the fixed header', () => {
  heading('first', -200)
  heading('second', 10)
  heading('third', 80)
  window.history.replaceState(null, '', '#second')
  function WithHeader() {
    return (
      <output>
        {useCurrentSectionId(
          [...sections, { id: 'third', text: 'Third', level: 2 }],
          96
        )}
      </output>
    )
  }
  const scroller = document.documentElement
  vi.spyOn(scroller, 'clientHeight', 'get').mockReturnValue(800)
  vi.spyOn(scroller, 'scrollHeight', 'get').mockReturnValue(1200)
  scroller.scrollTop = 400
  render(<WithHeader />)
  expect(document.querySelector('output')).toHaveTextContent('third')
})

beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    }
  )
})
afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  document.documentElement.scrollTop = 0
  window.history.replaceState(null, '', window.location.pathname)
})
