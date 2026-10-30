import { useContext } from 'react'
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import { MemoryRouter, useLocation, useNavigate } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  SidebarMenuContext,
  SidebarMenuProvider,
} from '../SidebarMenuContext'

function Consumer() {
  const { isOpen, isClosing, toggleMenu, openMenu, closeMenu } =
    useContext(SidebarMenuContext)
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <>
      <button id="toggle" onClick={toggleMenu} aria-expanded={isOpen}>
        Toggle
      </button>
      <button id="open" onClick={openMenu}>
        Open
      </button>
      <button id="close" onClick={closeMenu}>
        Close
      </button>
      <button id="navigate" onClick={() => navigate('/accordion')}>
        Navigate
      </button>
      <button id="hash" onClick={() => navigate('#examples')}>
        Hash
      </button>
      <button id="query" onClick={() => navigate('?fullscreen')}>
        Query
      </button>
      <button id="back" onClick={() => navigate(-1)}>
        Back
      </button>
      <button id="forward" onClick={() => navigate(1)}>
        Forward
      </button>
      <div
        id="content"
        hidden={isOpen || isClosing}
        data-closing={isClosing}
      >
        {location.pathname + location.search + location.hash}
      </div>
    </>
  )
}

function click(id: string) {
  fireEvent.click(document.querySelector(`#${id}`))
}

function advance(time: number) {
  act(() => vi.advanceTimersByTime(time))
}

function expectClosed() {
  expect(
    document.querySelector('#toggle').getAttribute('aria-expanded')
  ).toBe('false')
  expect(document.querySelector('#content').hasAttribute('hidden')).toBe(
    false
  )
  expect(
    document.querySelector('#content').getAttribute('data-closing')
  ).toBe('false')
}

function expectOpen() {
  expect(
    document.querySelector('#toggle').getAttribute('aria-expanded')
  ).toBe('true')
  expect(document.querySelector('#content').hasAttribute('hidden')).toBe(
    true
  )
}

describe('SidebarMenuProvider', () => {
  let width: number
  let mediaQueries: Map<string, MediaQueryList>

  function resize(nextWidth: number) {
    width = nextWidth
    act(() => {
      mediaQueries.forEach((query) => {
        query.dispatchEvent(
          Object.assign(new Event('change'), { matches: query.matches })
        )
      })
    })
  }

  beforeEach(() => {
    vi.useFakeTimers()
    width = 375
    mediaQueries = new Map()
    vi.stubGlobal('matchMedia', (media: string) => {
      if (!mediaQueries.has(media)) {
        const query = Object.defineProperties(new EventTarget(), {
          media: { value: media },
          matches: {
            get() {
              const min = media.match(/min-width: ([\d.]+)em/)
              const max = media.match(/max-width: ([\d.]+)em/)
              return (
                (!min || width >= Number(min[1]) * 16) &&
                (!max || width <= Number(max[1]) * 16)
              )
            },
          },
        }) as MediaQueryList
        mediaQueries.set(media, query)
      }
      return mediaQueries.get(media)
    })
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(480)
    render(
      <MemoryRouter initialEntries={['/components']}>
        <SidebarMenuProvider>
          <Consumer />
        </SidebarMenuProvider>
      </MemoryRouter>
    )
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('keeps the normal toggle animation and restores the saved scroll position', () => {
    expectClosed()
    click('toggle')
    advance(10)
    expectOpen()
    click('toggle')
    expect(
      document.querySelector('#content').getAttribute('data-closing')
    ).toBe('true')
    advance(260)
    expectClosed()
    advance(100)
    expect(window.scrollTo).toHaveBeenCalledExactlyOnceWith({
      top: 480,
      behavior: 'smooth',
    })
  })

  it.each(['navigate', 'hash', 'query'])(
    'closes on %s navigation without restoring the old page scroll',
    (id) => {
      click('toggle')
      advance(10)
      expectOpen()
      click(id)
      expectClosed()
      advance(1000)
      expectClosed()
      expect(window.scrollTo).not.toHaveBeenCalled()
    }
  )

  it('closes on Back and Forward navigation', () => {
    click('navigate')
    click('open')
    click('back')
    expectClosed()
    click('open')
    click('forward')
    expectClosed()
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('keeps the menu open within narrow mode and closes when leaving it', () => {
    click('toggle')
    advance(10)
    resize(960)
    expectOpen()
    resize(961)
    expectClosed()
    advance(1000)
    expectClosed()
    resize(375)
    expectClosed()
    click('toggle')
    advance(10)
    expectOpen()
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it.each(['close', 'navigate'])(
    'cancels a pending opening on %s',
    (id) => {
      click('toggle')
      click(id)
      expectClosed()
      advance(1000)
      expectClosed()
      expect(window.scrollTo).not.toHaveBeenCalled()
    }
  )

  it('cancels a pending opening when leaving narrow mode', () => {
    click('toggle')
    resize(1440)
    advance(1000)
    expectClosed()
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it.each(['close', 'navigate'])(
    'clears closing state and cancels its timer on %s',
    (id) => {
      click('open')
      click('toggle')
      click(id)
      expectClosed()
      advance(1000)
      expectClosed()
      expect(window.scrollTo).not.toHaveBeenCalled()
    }
  )

  it('clears closing state when leaving narrow mode', () => {
    click('open')
    click('toggle')
    resize(1440)
    expectClosed()
    advance(1000)
    expectClosed()
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it.each(['open', 'toggle'])(
    'cancels a pending scroll restoration before %s',
    (id) => {
      click('toggle')
      advance(10)
      click('toggle')
      advance(260)
      click(id)
      advance(1000)
      expectOpen()
      expect(window.scrollTo).not.toHaveBeenCalled()
    }
  )

  it('cancels pending scroll restoration on navigation', () => {
    click('toggle')
    advance(10)
    click('toggle')
    advance(260)
    click('navigate')
    advance(1000)
    expectClosed()
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('does not toggle a reopened menu closed when an old closing timer expires', () => {
    click('open')
    click('toggle')
    click('open')
    advance(1000)
    expectOpen()
    expect(
      document.querySelector('#content').getAttribute('data-closing')
    ).toBe('false')
  })

  it('cancels scroll restoration and media listeners on unmount', () => {
    click('toggle')
    advance(10)
    click('toggle')
    advance(260)
    cleanup()
    resize(1440)
    advance(1000)
    expect(window.scrollTo).not.toHaveBeenCalled()
  })
})
