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
  element.getBoundingClientRect = () => ({ top }) as DOMRect
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
