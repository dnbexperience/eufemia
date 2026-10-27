import { act, render } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useRef } from 'react'
import useContentTransition from '../useContentTransition'

function Navigation({
  enabled = true,
  text,
  nested = false,
}: {
  enabled?: boolean
  text: string
  nested?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  useContentTransition(ref, enabled, text)
  return (
    <div>
      <div ref={ref} className="dnb-table-of-content__scroll">
        <ul>
          <li>
            <a href="#section">{text}</a>
            {nested && (
              <ul>
                <li>
                  <a href="#nested">Nested section</a>
                </li>
              </ul>
            )}
          </li>
          {nested && (
            <li>
              <a href="#last">Last section</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

function setup(reduced = false) {
  vi.stubGlobal('matchMedia', () => ({
    matches: reduced,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
    {
      top: 0,
      bottom: 100,
      left: 0,
      width: 200,
      height: 100,
    } as DOMRect
  )
  vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue([
    {},
  ] as unknown as DOMRectList)
  const cancel = vi.fn()
  const animate = vi.fn(() => ({
    finished: new Promise<void>(() => undefined),
    cancel,
  }))
  Object.defineProperty(HTMLElement.prototype, 'animate', {
    configurable: true,
    value: animate,
  })
  return { animate, cancel }
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  delete HTMLElement.prototype.animate
})

it('keeps the outgoing headings as an inert snapshot while the new headings enter', () => {
  const { animate } = setup()
  const { rerender } = render(<Navigation text="Previous" />)
  expect(animate).not.toHaveBeenCalled()
  rerender(<Navigation text="New" />)
  const previous = document.querySelector('[data-toc-outgoing]')
  expect(previous?.textContent).toBe('Previous')
  expect(previous?.hasAttribute('inert')).toBe(true)
  expect(previous?.getAttribute('aria-hidden')).toBe('true')
  expect(previous?.querySelector('[id], [href]')).toBeNull()
  expect(
    document.querySelector('.dnb-table-of-content__scroll a')?.textContent
  ).toBe('New')
  expect(animate).toHaveBeenCalledTimes(2)
})

it('cleans up interrupted transitions and unmounts', () => {
  const { cancel } = setup()
  const { rerender, unmount } = render(<Navigation text="First" />)
  rerender(<Navigation text="Second" />)
  rerender(<Navigation text="Third" />)
  expect(document.querySelectorAll('[data-toc-outgoing]')).toHaveLength(1)
  expect(document.querySelector('[data-toc-outgoing]')?.textContent).toBe(
    'Second'
  )
  expect(cancel).toHaveBeenCalledTimes(2)
  act(() => unmount())
  expect(cancel).toHaveBeenCalledTimes(4)
  expect(document.querySelector('[data-toc-outgoing]')).toBeNull()
})

it('slides individual links from left to right with a 15ms stagger, including nested links', () => {
  const { animate } = setup()
  const { rerender } = render(<Navigation text="First" nested />)
  rerender(<Navigation text="Second" nested />)
  expect(animate).toHaveBeenCalledTimes(4)
  const calls = animate.mock.calls as unknown as Array<
    [Keyframe[], KeyframeAnimationOptions]
  >
  expect(calls[0][0][1].transform).toBe('translateX(0.25rem)')
  expect(calls.slice(1).map(([, options]) => options.delay)).toEqual([
    100, 115, 130,
  ])
  calls.slice(1).forEach(([frames]) => {
    expect(frames[0]).toEqual({
      opacity: 0,
      transform: 'translateX(-0.375rem)',
    })
    expect(frames[1]).toEqual({ opacity: 1, transform: 'translateX(0)' })
  })
  const links = document.querySelectorAll(
    '.dnb-table-of-content__scroll:not([data-toc-outgoing]) a'
  )
  expect(animate.mock.contexts.slice(1)).toEqual([...links])
})

it('updates immediately with reduced motion and skips changes on the same page', () => {
  const { animate } = setup(true)
  const { rerender } = render(<Navigation text="First" />)
  rerender(<Navigation text="Second" />)
  rerender(<Navigation text="Updated" />)
  expect(animate).not.toHaveBeenCalled()
  expect(document.querySelector('[data-toc-outgoing]')).toBeNull()
})

it('does not animate heading changes unless explicitly enabled', () => {
  const { animate } = setup()
  const { rerender } = render(<Navigation text="First" enabled={false} />)
  rerender(<Navigation text="Updated" enabled={false} />)
  expect(animate).not.toHaveBeenCalled()
})

it('ends decorative motion immediately when the new links receive focus', () => {
  const { cancel } = setup()
  const { rerender } = render(<Navigation text="First" />)
  rerender(<Navigation text="Second" />)
  const link = document.querySelector<HTMLAnchorElement>(
    '.dnb-table-of-content__scroll a'
  )
  act(() => link.focus())
  expect(document.activeElement).toBe(link)
  expect(document.querySelector('[data-toc-outgoing]')).toBeNull()
  expect(cancel).toHaveBeenCalledTimes(2)
})
