import { act, fireEvent, render } from '@testing-library/react'
import ScrollView from '../../../components/scroll-view/ScrollView'
import SidebarMenuAccordion from '../SidebarMenuAccordion'
import SidebarMenuItem from '../SidebarMenuItem'
import SidebarMenuRoot from '../SidebarMenuRoot'

function Menu() {
  return (
    <SidebarMenuRoot scrollSelectedItemIntoView={false}>
      <SidebarMenuAccordion id="products" text="Products">
        <SidebarMenuItem id="accounts" text="Accounts" />
      </SidebarMenuAccordion>
    </SidebarMenuRoot>
  )
}

function setScrollArea(element: HTMLElement, scrollHeight = 600) {
  vi.spyOn(element, 'clientHeight', 'get').mockReturnValue(300)
  vi.spyOn(element, 'scrollHeight', 'get').mockReturnValue(scrollHeight)
  Object.defineProperty(element, 'scrollTo', {
    configurable: true,
    value: vi.fn(),
  })
  element.scrollTop = 52
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    top: 500,
    bottom: 800,
    height: 300,
  } as DOMRect)

  return element.scrollTo
}

function openMenu(contentBottom = 920) {
  const trigger = document.querySelector<HTMLElement>(
    '.dnb-sidebar-menu__accordion__trigger'
  )
  const content = document.querySelector<HTMLElement>(
    '.dnb-sidebar-menu__accordion__content'
  )
  vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
    top: 680,
    bottom: 724,
    height: 44,
  } as DOMRect)
  vi.spyOn(content, 'getBoundingClientRect').mockReturnValue({
    top: 724,
    bottom: contentBottom,
    height: contentBottom - 724,
  } as DOMRect)

  fireEvent.click(trigger)
  act(() => vi.advanceTimersToNextTimer())
  expect(trigger).toHaveAttribute('aria-expanded', 'true')
}

describe('SidebarMenuAccordion scroll parent', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('innerHeight', 800)
    vi.stubGlobal('scrollY', 40)
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
    document.documentElement.style.fontSize = '16px'
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    vi.useRealTimers()
    document.documentElement.style.fontSize = ''
    document.documentElement.style.overflowY = ''
    delete document.documentElement.scrollTo
  })

  it.each([{ overflowY: 'auto' }, { overflowY: 'scroll' }] as const)(
    'scrolls a plain parent with %j instead of the window',
    (style) => {
      render(
        <div id="scroll-parent" style={style}>
          <Menu />
        </div>
      )
      const scrollTo = setScrollArea(
        document.getElementById('scroll-parent')
      )

      openMenu()

      expect(scrollTo).toHaveBeenCalledExactlyOnceWith({
        top: 188,
        behavior: 'smooth',
      })
      expect(window.scrollTo).not.toHaveBeenCalled()
    }
  )

  it('keeps the ScrollView scroll target', () => {
    render(
      <ScrollView>
        <Menu />
      </ScrollView>
    )
    const scrollTo = setScrollArea(
      document.querySelector('.dnb-scroll-view'),
      300
    )

    openMenu()

    expect(scrollTo).toHaveBeenCalledExactlyOnceWith({
      top: 188,
      behavior: 'smooth',
    })
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('uses the nearest scroll parent inside a ScrollView', () => {
    render(
      <ScrollView>
        <div id="scroll-parent" style={{ overflowY: 'auto' }}>
          <Menu />
        </div>
      </ScrollView>
    )
    const outerScrollTo = setScrollArea(
      document.querySelector('.dnb-scroll-view')
    )
    const innerScrollTo = setScrollArea(
      document.getElementById('scroll-parent')
    )

    openMenu()

    expect(innerScrollTo).toHaveBeenCalledExactlyOnceWith({
      top: 188,
      behavior: 'smooth',
    })
    expect(outerScrollTo).not.toHaveBeenCalled()
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it.each(['hidden', 'visible', 'clip', 'auto'] as const)(
    'skips a non-scrollable %s parent and finds the outer scroll parent',
    (overflowY) => {
      render(
        <div id="outer" style={{ overflowY: 'auto' }}>
          <div id="inner" style={{ overflowY }}>
            <Menu />
          </div>
        </div>
      )
      const outerScrollTo = setScrollArea(document.getElementById('outer'))
      const innerScrollTo = setScrollArea(
        document.getElementById('inner'),
        overflowY === 'auto' ? 300 : 600
      )

      openMenu()

      expect(outerScrollTo).toHaveBeenCalledExactlyOnceWith({
        top: 188,
        behavior: 'smooth',
      })
      expect(innerScrollTo).not.toHaveBeenCalled()
      expect(window.scrollTo).not.toHaveBeenCalled()
    }
  )

  it('uses the window when no parent scrolls', () => {
    render(
      <div style={{ overflowY: 'visible' }}>
        <Menu />
      </div>
    )

    openMenu()

    expect(window.scrollTo).toHaveBeenCalledExactlyOnceWith({
      top: 176,
      behavior: 'smooth',
    })
  })

  it('uses the window rather than the document scrolling element', () => {
    document.documentElement.style.overflowY = 'auto'
    const rootScrollTo = setScrollArea(document.documentElement)
    render(<Menu />)

    openMenu()

    expect(window.scrollTo).toHaveBeenCalledExactlyOnceWith({
      top: 176,
      behavior: 'smooth',
    })
    expect(rootScrollTo).not.toHaveBeenCalled()
  })

  it.each([true, false])(
    'uses reduced motion preference %s for a plain scroll parent',
    (reducedMotion) => {
      vi.stubGlobal(
        'matchMedia',
        vi.fn((query: string) => ({
          matches:
            reducedMotion && query === '(prefers-reduced-motion: reduce)',
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }))
      )
      render(
        <div id="scroll-parent" style={{ overflowY: 'auto' }}>
          <Menu />
        </div>
      )
      const scrollTo = setScrollArea(
        document.getElementById('scroll-parent')
      )

      openMenu()

      expect(scrollTo).toHaveBeenCalledExactlyOnceWith({
        top: 188,
        behavior: reducedMotion ? 'auto' : 'smooth',
      })
      expect(window.scrollTo).not.toHaveBeenCalled()
    }
  )

  it('does not scroll when expanded content is already visible', () => {
    render(
      <div id="scroll-parent" style={{ overflowY: 'auto' }}>
        <Menu />
      </div>
    )
    const scrollTo = setScrollArea(
      document.getElementById('scroll-parent')
    )

    openMenu(780)

    expect(scrollTo).not.toHaveBeenCalled()
    expect(window.scrollTo).not.toHaveBeenCalled()
  })
})
