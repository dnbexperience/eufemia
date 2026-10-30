import { act, cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { applyPageFocus } from '@dnb/eufemia/src/shared/helpers'
import SidebarMenu from '../SidebarMenu'
import { SidebarMenuContext } from '../SidebarMenuContext'

vi.mock('portal-query', () => ({
  graphql: () => undefined,
  useStaticQuery: () => ({
    site: { pathPrefix: '' },
    allMdx: {
      edges: [
        {
          node: {
            fields: { slug: 'uilib/components' },
            frontmatter: { title: 'Components' },
          },
        },
      ],
    },
  }),
}))

vi.mock('@dnb/eufemia/src/shared/helpers', async (importOriginal) => ({
  ...(await importOriginal<
    typeof import('@dnb/eufemia/src/shared/helpers')
  >()),
  applyPageFocus: vi.fn(),
}))

function Menu({ isOpen = false, isClosing = false, location }) {
  return (
    <SidebarMenuContext
      value={{
        isOpen,
        isClosing,
        closeMenu: vi.fn(),
        openMenu: vi.fn(),
        toggleMenu: vi.fn(),
      }}
    >
      <SidebarMenu location={location} />
    </SidebarMenuContext>
  )
}

function advance(time: number) {
  act(() => vi.advanceTimersByTime(time))
}

describe('SidebarMenu focus timers', () => {
  const location = new URL(
    'http://localhost/uilib/components'
  ) as unknown as Location

  beforeEach(() => {
    vi.useFakeTimers()
    vi.mocked(applyPageFocus).mockClear()
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('cancels pending sidebar focus and scrolling when closed immediately', () => {
    const { rerender } = render(<Menu isOpen location={location} />)
    rerender(<Menu location={location} />)
    advance(1000)
    expect(applyPageFocus).not.toHaveBeenCalled()
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('keeps normal content focus after the closing state ends', () => {
    const { rerender } = render(
      <Menu isOpen isClosing location={location} />
    )
    advance(260)
    rerender(<Menu location={location} />)
    advance(40)
    expect(applyPageFocus).toHaveBeenCalledExactlyOnceWith('content')
  })

  it('does not let an old closing timer move focus out of a reopened menu', () => {
    const { rerender } = render(
      <Menu isOpen isClosing location={location} />
    )
    advance(100)
    rerender(<Menu isOpen location={location} />)
    advance(1000)
    expect(applyPageFocus).toHaveBeenCalledExactlyOnceWith('sidebar')
  })

  it('does not let an old closing timer replace route focus after navigation', () => {
    const { rerender } = render(
      <Menu isOpen isClosing location={location} />
    )
    advance(100)
    rerender(
      <Menu
        location={
          new URL(
            'http://localhost/uilib/components#examples'
          ) as unknown as Location
        }
      />
    )
    advance(1000)
    expect(applyPageFocus).not.toHaveBeenCalled()
  })
})
