import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { createRef, useState } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { setMedia } from 'mock-match-media'
import '../../../core/vitest/mockMatchMediaSetup'
import SidebarMenu from '../SidebarMenu'
import { useOptionalSidebarMenuResponsive } from '../SidebarMenuResponsive'
import ScrollView from '../../../components/scroll-view/ScrollView'
import Provider from '../../../shared/Provider'

describe('SidebarMenu responsive parts', () => {
  afterEach(() => {
    sessionStorage.clear()
    localStorage.clear()
  })

  it.each(['session', 'local'] as const)(
    'persists inline dismissal in %s storage across remounts',
    (storageType) => {
      setMedia({ width: '100em' })
      const storage =
        storageType === 'local' ? localStorage : sessionStorage
      const menu = (
        <SidebarMenu.ResponsiveProvider
          inlineCollapsedStorageKey="navigation"
          inlineCollapsedStorage={storageType}
        >
          <SidebarMenu.Toggle />
          <SidebarMenu.ResponsiveAside>Menu</SidebarMenu.ResponsiveAside>
        </SidebarMenu.ResponsiveProvider>
      )
      const first = render(menu)
      fireEvent.click(document.querySelector('.dnb-sidebar-menu-toggle'))
      expect(storage.getItem('navigation')).toBe('true')
      first.unmount()
      const second = render(menu)
      expect(
        document.querySelector('.dnb-sidebar-menu-responsive-inline')
      ).toHaveAttribute('inert')
      fireEvent.click(document.querySelector('.dnb-sidebar-menu-toggle'))
      expect(storage.getItem('navigation')).toBe('false')
      second.unmount()
      render(menu)
      expect(
        document.querySelector('.dnb-sidebar-menu-responsive-inline')
      ).not.toHaveAttribute('inert')
    }
  )

  it('loads each persistence key without overwriting the saved state', () => {
    setMedia({ width: '100em' })
    sessionStorage.setItem('first-menu', 'true')
    sessionStorage.setItem('second-menu', 'false')
    const menu = (key: string) => (
      <SidebarMenu.ResponsiveProvider
        inlineCollapsedStorageKey={key}
        defaultInlineCollapsed
      >
        <SidebarMenu.Toggle />
      </SidebarMenu.ResponsiveProvider>
    )
    const { rerender } = render(menu('first-menu'))
    expect(
      document.querySelector('.dnb-sidebar-menu-toggle')
    ).toHaveAttribute('aria-expanded', 'false')
    rerender(menu('second-menu'))
    expect(
      document.querySelector('.dnb-sidebar-menu-toggle')
    ).toHaveAttribute('aria-expanded', 'true')
    expect(sessionStorage.getItem('second-menu')).toBe('false')
  })

  it.each(['null', '"true"', '{}', 'invalid'])(
    'uses the default for unsupported persisted state %s',
    (stored) => {
      setMedia({ width: '100em' })
      sessionStorage.setItem('navigation', stored)
      render(
        <SidebarMenu.ResponsiveProvider
          inlineCollapsedStorageKey="navigation"
          defaultInlineCollapsed
        >
          <SidebarMenu.Toggle />
        </SidebarMenu.ResponsiveProvider>
      )
      expect(
        document.querySelector('.dnb-sidebar-menu-toggle')
      ).toHaveAttribute('aria-expanded', 'false')
    }
  )

  it('keeps controlled inline state independent of persistence', () => {
    setMedia({ width: '100em' })
    sessionStorage.setItem('navigation', 'true')
    const onChange = vi.fn()
    render(
      <SidebarMenu.ResponsiveProvider
        inlineCollapsed={false}
        inlineCollapsedStorageKey="navigation"
        onInlineCollapsedChange={onChange}
      >
        <SidebarMenu.Toggle />
      </SidebarMenu.ResponsiveProvider>
    )
    const toggle = document.querySelector('.dnb-sidebar-menu-toggle')
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(toggle)
    expect(onChange).toHaveBeenCalledWith(true)
    expect(sessionStorage.getItem('navigation')).toBe('true')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-provider')
    ).not.toHaveAttribute('data-inline-collapsed-storage-key')
  })

  it('keeps toggling usable when storage writes are blocked', () => {
    setMedia({ width: '100em' })
    const setItem = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new DOMException('Quota exceeded', 'QuotaExceededError')
      })
    try {
      render(
        <SidebarMenu.ResponsiveProvider inlineCollapsedStorageKey="navigation">
          <SidebarMenu.Toggle />
        </SidebarMenu.ResponsiveProvider>
      )
      const toggle = document.querySelector('.dnb-sidebar-menu-toggle')
      fireEvent.click(toggle)
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
      fireEvent.click(toggle)
      expect(toggle).toHaveAttribute('aria-expanded', 'true')
    } finally {
      setItem.mockRestore()
    }
  })

  it('hydrates stored inline dismissal without changing server markup or calling onChange', async () => {
    setMedia({ width: '100em' })
    const onChange = vi.fn()
    const element = (
      <SidebarMenu.ResponsiveProvider
        inlineCollapsedStorageKey="navigation"
        onInlineCollapsedChange={onChange}
      >
        <SidebarMenu.Toggle />
        <SidebarMenu.ResponsiveAside>Menu</SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    document.body.appendChild(container)
    sessionStorage.setItem('navigation', 'true')
    const style = document.createElement('style')
    style.setAttribute(
      'data-sidebar-menu-inline-pre-hydration',
      'navigation'
    )
    document.head.appendChild(style)
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
    const root = hydrateRoot(container, element)
    try {
      await waitFor(() =>
        expect(
          container.querySelector('.dnb-sidebar-menu-responsive-inline')
        ).toHaveAttribute('inert')
      )
      expect(consoleError).not.toHaveBeenCalled()
      expect(onChange).not.toHaveBeenCalled()
      expect(style).not.toBeInTheDocument()
      expect(sessionStorage.getItem('navigation')).toBe('true')
    } finally {
      root.unmount()
      consoleError.mockRestore()
      container.remove()
    }
  })

  it('ignores inaccessible storage when restoring inline dismissal', () => {
    setMedia({ width: '100em' })
    const getItem = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new DOMException('Storage blocked', 'SecurityError')
      })
    try {
      render(
        <SidebarMenu.ResponsiveProvider inlineCollapsedStorageKey="navigation">
          <SidebarMenu.Toggle />
        </SidebarMenu.ResponsiveProvider>
      )
      const toggle = document.querySelector('.dnb-sidebar-menu-toggle')
      expect(toggle).toHaveAttribute('aria-expanded', 'true')
      fireEvent.click(toggle)
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
    } finally {
      getItem.mockRestore()
    }
  })

  it('keeps exporting useOptionalSidebarMenuResponsive from the v11.15 module path', () => {
    let value: ReturnType<typeof useOptionalSidebarMenuResponsive>
    const Probe = () => {
      value = useOptionalSidebarMenuResponsive()
      return null
    }

    render(<Probe />)

    expect(value).toBeUndefined()
  })

  it('localizes its accessible labels', () => {
    setMedia({ width: '30em' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveDrawer>
          Mobile menu
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(
      document.querySelector('[aria-label="Åpne meny"]')
    ).toBeInTheDocument()
  })

  it('preserves plain non-compact inline children without a dismiss button', () => {
    setMedia({ width: '100em' })
    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveInline>
          <nav aria-label="Released navigation">Menu</nav>
        </SidebarMenu.ResponsiveInline>
        <SidebarMenu.ResponsiveDrawer>
          Mobile menu
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )
    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    expect(inline.firstElementChild).toBe(
      document.querySelector('[aria-label="Released navigation"]')
    )
    expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-surface'
    )
    expect(
      document.querySelector('.dnb-sidebar-menu-toggle')
    ).not.toBeInTheDocument()
  })

  it('supports an explicit full-width inline toggle with an external restore control', () => {
    setMedia({ width: '100em' })
    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveInline showToggle>
          Menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )
    fireEvent.click(
      document.querySelector('.dnb-sidebar-menu-responsive-inline__toggle')
    )
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('inert')
    fireEvent.click(
      document.querySelector('.dnb-sidebar-menu-responsive-trigger')
    )
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).not.toHaveAttribute('inert')
  })

  it('can omit the Aside toggle while preserving its collapsible sidebar surface', () => {
    setMedia({ width: '100em' })
    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.Toggle />
        <SidebarMenu.ResponsiveAside showToggle={false}>
          Menu
        </SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline__toggle')
    ).not.toBeInTheDocument()
    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-surface',
      'true'
    )
    fireEvent.click(document.querySelector('.dnb-sidebar-menu-toggle'))
    expect(inline).toHaveAttribute('inert')
  })

  it('keeps the compact Inline toggle opt-in at full width', () => {
    setMedia({ width: '100em' })
    render(
      <SidebarMenu.ResponsiveProvider compactAt="large">
        <SidebarMenu.ResponsiveInline>Menu</SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )
    expect(
      document.querySelector(
        '.dnb-sidebar-menu-responsive-inline__toggle-island'
      )
    ).not.toHaveAttribute('data-sidebar-menu-responsive-toggle-full-width')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('data-sidebar-menu-responsive-has-compact', 'true')
  })

  it('shows the inline content above the breakpoint', () => {
    setMedia({ width: '70em' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
        <SidebarMenu.ResponsiveDrawer>
          Mobile menu
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(document.body).toHaveTextContent('Inline menu')
    expect(
      document.querySelector('[aria-label="Åpne meny"]')
    ).toHaveAttribute('data-sidebar-menu-responsive-visible', 'false')
    expect(document.body).not.toHaveTextContent('Mobile menu')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('data-sidebar-menu-responsive-visible', 'true')
  })

  it('provides a ready-to-use responsive aside', () => {
    setMedia({ width: '100em' })

    render(
      <SidebarMenu.ResponsiveProvider compactAt="large">
        <SidebarMenu.ResponsiveTrigger controls="mobile-navigation" />
        <SidebarMenu.ResponsiveAside resizable>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )

    const aside = document.querySelector<HTMLElement>(
      '.dnb-sidebar-menu-responsive-aside'
    )
    const handle = document.querySelector(
      '.dnb-sidebar-menu-responsive-aside__resize-handle'
    )
    const trigger = document.querySelector(
      '.dnb-sidebar-menu-responsive-trigger'
    )

    expect(aside).toContainElement(
      document.querySelector(
        '.dnb-sidebar-menu-responsive-aside__scroll-view'
      )
    )
    expect(aside.id).toBeTruthy()
    expect(handle).toHaveAttribute('aria-controls', aside.id)
    expect(trigger).toHaveAttribute('aria-controls', aside.id)
  })

  it('keeps default ResponsiveAside ids unique', () => {
    setMedia({ width: '100em' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveAside>
          Primary menu
        </SidebarMenu.ResponsiveAside>
        <SidebarMenu.ResponsiveAside>
          Secondary menu
        </SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )

    const asides = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.dnb-sidebar-menu-responsive-aside'
      )
    )
    const trigger = document.querySelector(
      '.dnb-sidebar-menu-responsive-trigger'
    )

    expect(asides).toHaveLength(2)
    expect(asides[0].id).not.toBe(asides[1].id)
    expect(trigger).toHaveAttribute('aria-controls', asides[0].id)
  })

  describe('responsive control targets', () => {
    it.each(['aside', 'custom aside', 'inline'])(
      'gives each compact %s toggle its own body under one provider',
      (surface) => {
        setMedia({ width: '70em', hover: 'none', pointer: 'coarse' })

        const element = (
          <SidebarMenu.ResponsiveProvider compactAt="80em">
            {['Primary', 'Secondary'].map((name) =>
              surface === 'inline' ? (
                <SidebarMenu.ResponsiveInline key={name}>
                  <aside id={`${name}-nav`}>{name} menu</aside>
                </SidebarMenu.ResponsiveInline>
              ) : (
                <SidebarMenu.ResponsiveAside
                  key={name}
                  id={
                    surface === 'custom aside' ? `${name}-nav` : undefined
                  }
                >
                  {name} menu
                </SidebarMenu.ResponsiveAside>
              )
            )}
          </SidebarMenu.ResponsiveProvider>
        )
        const { rerender } = render(element)
        const inlines = document.querySelectorAll(
          '.dnb-sidebar-menu-responsive-inline'
        )
        const bodies = document.querySelectorAll<HTMLElement>(
          '.dnb-sidebar-menu-responsive-inline__body'
        )
        const toggles = document.querySelectorAll(
          '.dnb-sidebar-menu-responsive-inline__toggle'
        )

        expect(bodies).toHaveLength(2)
        expect(bodies[0].id).toBeTruthy()
        expect(bodies[1].id).toBeTruthy()
        expect(bodies[0].id).not.toBe(bodies[1].id)
        expect(bodies[0]).toHaveTextContent('Primary menu')
        expect(bodies[1]).toHaveTextContent('Secondary menu')
        expect(
          document.getElementById(toggles[0].getAttribute('aria-controls'))
        ).toBe(bodies[0])
        expect(
          document.getElementById(toggles[1].getAttribute('aria-controls'))
        ).toBe(bodies[1])
        expect(
          document.querySelectorAll('#Primary-nav, #Secondary-nav')
        ).toHaveLength(surface === 'aside' ? 0 : 2)

        fireEvent.click(toggles[1])
        expect(toggles[0]).toHaveAttribute('aria-expanded', 'false')
        expect(toggles[1]).toHaveAttribute('aria-expanded', 'true')
        expect(inlines[0]).not.toHaveAttribute(
          'data-sidebar-menu-responsive-expanded'
        )
        expect(inlines[1]).toHaveAttribute(
          'data-sidebar-menu-responsive-expanded',
          'true'
        )
        fireEvent.click(toggles[1])
        fireEvent.click(toggles[0])
        expect(toggles[0]).toHaveAttribute('aria-expanded', 'true')
        expect(toggles[1]).toHaveAttribute('aria-expanded', 'false')

        // Keep the same mounted tree while the provider changes mode.
        const ids = [bodies[0].id, bodies[1].id]
        setMedia({ width: '100em' })
        rerender(element)
        expect(
          Array.from(
            document.querySelectorAll<HTMLElement>(
              '.dnb-sidebar-menu-responsive-inline__body'
            ),
            (body) => body.id
          )
        ).toEqual(ids)
      }
    )

    it('keeps compact targets unique across separate providers', () => {
      setMedia({ width: '70em' })
      render(
        <>
          {['Primary', 'Secondary'].map((name) => (
            <SidebarMenu.ResponsiveProvider key={name} compactAt="80em">
              <SidebarMenu.ResponsiveAside>
                {name} menu
              </SidebarMenu.ResponsiveAside>
            </SidebarMenu.ResponsiveProvider>
          ))}
        </>
      )
      const bodies = document.querySelectorAll<HTMLElement>(
        '.dnb-sidebar-menu-responsive-inline__body'
      )
      const toggles = document.querySelectorAll(
        '.dnb-sidebar-menu-responsive-inline__toggle'
      )
      expect(bodies).toHaveLength(2)
      expect(bodies[0].id).not.toBe(bodies[1].id)
      expect(
        document.getElementById(toggles[0].getAttribute('aria-controls'))
      ).toBe(bodies[0])
      expect(
        document.getElementById(toggles[1].getAttribute('aria-controls'))
      ).toBe(bodies[1])
    })

    it.each(['aside', 'inline'])(
      'keeps compact %s IDs stable through server rendering and hydration',
      async (surface) => {
        setMedia({ width: '70em' })
        const element = (
          <SidebarMenu.ResponsiveProvider
            scopeId="application-navigation"
            compactAt="80em"
          >
            <SidebarMenu.ResponsiveTrigger controls="mobile-nav" />
            {['Primary', 'Secondary'].map((name) =>
              surface === 'aside' ? (
                <SidebarMenu.ResponsiveAside key={name} id={`${name}-nav`}>
                  {name} menu
                </SidebarMenu.ResponsiveAside>
              ) : (
                <SidebarMenu.ResponsiveInline
                  key={name}
                  id={`${name}-inline`}
                >
                  <aside id={`${name}-nav`}>{name} menu</aside>
                </SidebarMenu.ResponsiveInline>
              )
            )}
          </SidebarMenu.ResponsiveProvider>
        )
        const container = document.createElement('div')
        container.innerHTML = renderToString(element)
        document.body.appendChild(container)
        const getIds = () =>
          Array.from(
            container.querySelectorAll<HTMLElement>(
              '.dnb-sidebar-menu-responsive-inline__body'
            ),
            (body) => body.id
          )
        const serverIds = getIds()
        const consoleError = vi
          .spyOn(console, 'error')
          .mockImplementation(() => undefined)
        let root: ReturnType<typeof hydrateRoot>
        try {
          expect(serverIds).toHaveLength(2)
          expect(serverIds[0]).toBeTruthy()
          expect(serverIds[0]).not.toBe(serverIds[1])
          await act(async () => {
            root = hydrateRoot(container, element)
          })
          expect(getIds()).toEqual(serverIds)
          expect(
            container.querySelector('#Primary-nav')
          ).toHaveTextContent('Primary menu')
          expect(
            container.querySelector('#Secondary-nav')
          ).toHaveTextContent('Secondary menu')
          expect(
            container.querySelectorAll(
              '#Primary-inline, #Secondary-inline'
            )
          ).toHaveLength(surface === 'inline' ? 2 : 0)
          const toggles = container.querySelectorAll(
            '.dnb-sidebar-menu-responsive-inline__toggle'
          )
          expect(toggles[0]).toHaveAttribute('aria-controls', serverIds[0])
          expect(toggles[1]).toHaveAttribute('aria-controls', serverIds[1])
          expect(
            container.querySelector('.dnb-sidebar-menu-responsive-trigger')
          ).toHaveAttribute('aria-controls', 'Primary-nav')
          expect(consoleError).not.toHaveBeenCalled()
        } finally {
          if (root) {
            await act(async () => root.unmount())
          }
          consoleError.mockRestore()
          container.remove()
        }
      }
    )

    it.each(['shared', 'distinct explicit', 'distinct omitted'])(
      'keeps legacy %s targets valid through desktop and mobile round trips',
      async (ids) => {
        setMedia({ width: '100em' })
        const inlineId = ids === 'shared' ? 'legacy-nav' : 'desktop-nav'
        const element = (
          <SidebarMenu.ResponsiveProvider defaultInlineCollapsed>
            <SidebarMenu.ResponsiveTrigger
              controls="legacy-nav"
              inlineControls={
                ids === 'distinct explicit' ? 'desktop-nav' : undefined
              }
            />
            <SidebarMenu.ResponsiveInline>
              <aside id={inlineId}>Desktop menu</aside>
            </SidebarMenu.ResponsiveInline>
            <SidebarMenu.ResponsiveDrawer id="legacy-nav">
              Mobile menu
            </SidebarMenu.ResponsiveDrawer>
          </SidebarMenu.ResponsiveProvider>
        )
        const { rerender } = render(element)
        const trigger = document.querySelector(
          '.dnb-sidebar-menu-responsive-trigger'
        )
        const checkDesktop = () => {
          expect(document.querySelectorAll('#legacy-nav')).toHaveLength(
            ids === 'shared' ? 1 : 0
          )
          expect(document.getElementById(inlineId).tagName).toBe('ASIDE')
          expect(trigger).toHaveAttribute('aria-controls', inlineId)
          expect(
            document.getElementById(trigger.getAttribute('aria-controls'))
          ).toHaveTextContent('Desktop menu')
        }
        checkDesktop()
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
        fireEvent.click(trigger)
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
        expect(
          document.querySelector('.dnb-sidebar-menu-responsive-inline')
        ).not.toHaveAttribute('aria-hidden')
        checkDesktop()

        setMedia({ width: '30em' })
        rerender(element)
        fireEvent.click(trigger)
        await waitFor(() =>
          expect(document.getElementById('legacy-nav')).toHaveTextContent(
            'Mobile menu'
          )
        )
        expect(document.querySelectorAll('#legacy-nav')).toHaveLength(1)
        expect(document.getElementById('legacy-nav').tagName).toBe('DIV')
        expect(trigger).toHaveAttribute('aria-controls', 'legacy-nav')
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
        fireEvent.keyDown(document.querySelector('.dnb-drawer'), {
          key: 'Escape',
        })
        await waitFor(() =>
          expect(trigger).toHaveAttribute('aria-expanded', 'false')
        )
        setMedia({ width: '100em' })
        rerender(element)
        await waitFor(() =>
          expect(
            document.querySelector('.dnb-sidebar-menu-responsive-inline')
          ).toBeInTheDocument()
        )
        checkDesktop()
      }
    )

    it('tracks a legacy control target when its aside changes or unmounts', async () => {
      setMedia({ width: '100em' })
      const element = (id?: string, controls = 'legacy-nav') => (
        <SidebarMenu.ResponsiveProvider defaultInlineCollapsed>
          <SidebarMenu.ResponsiveTrigger controls={controls} />
          <SidebarMenu.ResponsiveInline>
            {id && <aside id={id}>Desktop menu</aside>}
          </SidebarMenu.ResponsiveInline>
        </SidebarMenu.ResponsiveProvider>
      )
      const { rerender } = render(element('legacy-nav'))
      const trigger = document.querySelector(
        '.dnb-sidebar-menu-responsive-trigger'
      )
      expect(trigger).toHaveAttribute('aria-controls', 'legacy-nav')

      rerender(element('renamed-nav'))
      await waitFor(() =>
        expect(trigger).toHaveAttribute('aria-controls', 'renamed-nav')
      )

      rerender(element('renamed-nav', 'renamed-nav'))
      expect(trigger).toHaveAttribute('aria-controls', 'renamed-nav')

      rerender(element())
      await waitFor(() =>
        expect(trigger).not.toHaveAttribute('aria-controls')
      )
    })

    it('does not use a matching legacy target outside its inline provider', () => {
      setMedia({ width: '100em' })
      render(
        <>
          <aside id="legacy-nav">Unrelated menu</aside>
          <SidebarMenu.ResponsiveProvider defaultInlineCollapsed>
            <SidebarMenu.ResponsiveTrigger controls="legacy-nav" />
            <SidebarMenu.ResponsiveInline>
              <aside id="desktop-nav">Desktop menu</aside>
            </SidebarMenu.ResponsiveInline>
          </SidebarMenu.ResponsiveProvider>
        </>
      )
      expect(
        document.querySelector('.dnb-sidebar-menu-responsive-trigger')
      ).toHaveAttribute('aria-controls', 'desktop-nav')
    })

    it('keeps one actual target registered when it moves between inline owners', async () => {
      setMedia({ width: '100em' })
      function Menus() {
        const [first, setFirst] = useState(false)
        return (
          <>
            <button
              id="move-menu"
              onClick={() => setFirst((value) => !value)}
            >
              Move menu
            </button>
            <SidebarMenu.ResponsiveInline>
              {first && <aside id="desktop-nav">Desktop menu</aside>}
            </SidebarMenu.ResponsiveInline>
            <SidebarMenu.ResponsiveInline>
              {!first && <aside id="desktop-nav">Desktop menu</aside>}
            </SidebarMenu.ResponsiveInline>
          </>
        )
      }
      render(
        <SidebarMenu.ResponsiveProvider>
          <SidebarMenu.ResponsiveTrigger />
          <Menus />
        </SidebarMenu.ResponsiveProvider>
      )
      const trigger = document.querySelector(
        '.dnb-sidebar-menu-responsive-trigger'
      )
      for (let step = 0; step < 3; step++) {
        expect(document.querySelectorAll('#desktop-nav')).toHaveLength(1)
        await act(async () => undefined)
        expect(trigger).toHaveAttribute('aria-controls', 'desktop-nav')
        fireEvent.click(document.getElementById('move-menu'))
      }
    })

    it('registers initial aside IDs when MutationObserver is unavailable', () => {
      setMedia({ width: '100em' })
      const observer = globalThis.MutationObserver
      try {
        vi.stubGlobal('MutationObserver', undefined)
        const { unmount } = render(
          <SidebarMenu.ResponsiveProvider>
            <SidebarMenu.ResponsiveTrigger />
            <SidebarMenu.ResponsiveAside id="desktop-nav">
              Desktop menu
            </SidebarMenu.ResponsiveAside>
          </SidebarMenu.ResponsiveProvider>
        )
        expect(
          document.querySelector('.dnb-sidebar-menu-responsive-trigger')
        ).toHaveAttribute('aria-controls', 'desktop-nav')
        unmount()
      } finally {
        vi.stubGlobal('MutationObserver', observer)
      }
    })

    it('does not register an aside owned by a nested provider', async () => {
      setMedia({ width: '100em' })
      render(
        <SidebarMenu.ResponsiveProvider>
          <SidebarMenu.ResponsiveTrigger id="outer-trigger" />
          <SidebarMenu.ResponsiveInline>
            <SidebarMenu.ResponsiveProvider>
              <SidebarMenu.ResponsiveTrigger id="inner-trigger" />
              <aside id="inner-nav">Nested menu</aside>
            </SidebarMenu.ResponsiveProvider>
          </SidebarMenu.ResponsiveInline>
        </SidebarMenu.ResponsiveProvider>
      )
      await act(async () => undefined)
      expect(document.getElementById('outer-trigger')).not.toHaveAttribute(
        'aria-controls'
      )
      expect(document.getElementById('inner-trigger')).not.toHaveAttribute(
        'aria-controls'
      )
    })

    it('keeps remaining direct inline registrations and explicit targets', async () => {
      setMedia({ width: '100em' })
      function Menus() {
        const [primary, setPrimary] = useState(true)
        return (
          <>
            <button id="remove-primary" onClick={() => setPrimary(false)}>
              Remove primary
            </button>
            {primary && (
              <SidebarMenu.ResponsiveInline>
                <aside id="primary-nav">Primary menu</aside>
              </SidebarMenu.ResponsiveInline>
            )}
            <SidebarMenu.ResponsiveInline>
              <aside id="secondary-nav">Secondary menu</aside>
            </SidebarMenu.ResponsiveInline>
          </>
        )
      }
      render(
        <SidebarMenu.ResponsiveProvider>
          <SidebarMenu.ResponsiveTrigger id="automatic-trigger" />
          <SidebarMenu.ResponsiveTrigger
            id="explicit-trigger"
            inlineControls="secondary-nav"
          />
          <Menus />
        </SidebarMenu.ResponsiveProvider>
      )
      expect(document.getElementById('automatic-trigger')).toHaveAttribute(
        'aria-controls',
        'primary-nav'
      )
      expect(document.getElementById('explicit-trigger')).toHaveAttribute(
        'aria-controls',
        'secondary-nav'
      )
      fireEvent.click(document.getElementById('remove-primary'))
      await waitFor(() =>
        expect(
          document.getElementById('automatic-trigger')
        ).toHaveAttribute('aria-controls', 'secondary-nav')
      )
      expect(document.getElementById('explicit-trigger')).toHaveAttribute(
        'aria-controls',
        'secondary-nav'
      )
    })

    it.each(['raw', 'wrapped', 'managed'])(
      'tracks %s aside IDs changed only by child state',
      async (surface) => {
        setMedia({ width: '100em' })
        function Menu() {
          const [id, setId] = useState('legacy-nav')
          const [mounted, setMounted] = useState(false)
          const aside = mounted && <aside id={id}>Desktop menu</aside>
          return (
            <>
              <button
                id="mount-menu"
                onClick={() => setMounted((value) => !value)}
              >
                Mount menu
              </button>
              <button
                id="rename-menu"
                onClick={() => setId('renamed-nav')}
              >
                Rename menu
              </button>
              {surface === 'managed' ? (
                mounted && (
                  <SidebarMenu.ResponsiveAside id={id}>
                    Desktop menu
                  </SidebarMenu.ResponsiveAside>
                )
              ) : surface === 'wrapped' ? (
                <div>{aside}</div>
              ) : (
                aside
              )}
            </>
          )
        }
        const element = (
          <SidebarMenu.ResponsiveProvider defaultInlineCollapsed>
            <SidebarMenu.ResponsiveTrigger controls="legacy-nav" />
            {surface === 'managed' ? (
              <Menu />
            ) : (
              <SidebarMenu.ResponsiveInline>
                <Menu />
              </SidebarMenu.ResponsiveInline>
            )}
            <SidebarMenu.ResponsiveDrawer id="legacy-nav">
              Mobile menu
            </SidebarMenu.ResponsiveDrawer>
          </SidebarMenu.ResponsiveProvider>
        )
        const { rerender, unmount } = render(element)
        const trigger = document.querySelector(
          '.dnb-sidebar-menu-responsive-trigger'
        )
        expect(trigger).not.toHaveAttribute('aria-controls')
        fireEvent.click(document.getElementById('mount-menu'))
        await waitFor(() =>
          expect(trigger).toHaveAttribute('aria-controls', 'legacy-nav')
        )
        fireEvent.click(document.getElementById('rename-menu'))
        await waitFor(() =>
          expect(trigger).toHaveAttribute('aria-controls', 'renamed-nav')
        )
        expect(
          document.getElementById(trigger.getAttribute('aria-controls'))
        ).toHaveTextContent('Desktop menu')
        fireEvent.click(document.getElementById('mount-menu'))
        await waitFor(() =>
          expect(trigger).not.toHaveAttribute('aria-controls')
        )
        fireEvent.click(document.getElementById('mount-menu'))
        await waitFor(() =>
          expect(trigger).toHaveAttribute('aria-controls', 'renamed-nav')
        )
        setMedia({ width: '30em' })
        rerender(element)
        fireEvent.click(trigger)
        await waitFor(() =>
          expect(document.getElementById('legacy-nav')).toHaveTextContent(
            'Mobile menu'
          )
        )
        expect(trigger).toHaveAttribute('aria-controls', 'legacy-nav')
        fireEvent.keyDown(document.querySelector('.dnb-drawer'), {
          key: 'Escape',
        })
        await waitFor(() =>
          expect(trigger).toHaveAttribute('aria-expanded', 'false')
        )
        setMedia({ width: '100em' })
        rerender(element)
        if (surface !== 'managed') {
          // Raw children unmount on mobile; their local state starts again.
          expect(trigger).not.toHaveAttribute('aria-controls')
          fireEvent.click(document.getElementById('mount-menu'))
        }
        await waitFor(() =>
          expect(trigger).toHaveAttribute(
            'aria-controls',
            surface === 'managed' ? 'renamed-nav' : 'legacy-nav'
          )
        )
        unmount()
      }
    )
  })

  it('provides a responsive application shell', () => {
    setMedia({ width: '70em' })

    const { rerender } = render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveShell>
          <aside>Menu</aside>
          <main>Content</main>
        </SidebarMenu.ResponsiveShell>
      </SidebarMenu.ResponsiveProvider>
    )

    const shell = document.querySelector(
      '.dnb-sidebar-menu-responsive-shell'
    )
    expect(shell).toHaveClass('dnb-sidebar-menu-responsive-shell')
    expect(shell).not.toHaveAttribute(
      'data-sidebar-menu-responsive-small-screen'
    )

    setMedia({ width: '30em' })
    rerender(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveShell>
          <aside>Menu</aside>
          <main>Content</main>
        </SidebarMenu.ResponsiveShell>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(shell).toHaveAttribute(
      'data-sidebar-menu-responsive-small-screen',
      'true'
    )
  })

  it('reports the width reserved by ResponsiveAside', () => {
    const originalResizeObserver = globalThis.ResizeObserver
    globalThis.ResizeObserver = class {
      observe() {}
      disconnect() {}
      unobserve() {}
    } as typeof ResizeObserver
    const getBoundingClientRect = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        return {
          width: this.classList.contains(
            'dnb-sidebar-menu-responsive-inline'
          )
            ? 320
            : 0,
        } as DOMRect
      })
    const onWidthChange = vi.fn()

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveAside onWidthChange={onWidthChange}>
          Menu
        </SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(onWidthChange).toHaveBeenCalledWith(320)
    getBoundingClientRect.mockRestore()
    globalThis.ResizeObserver = originalResizeObserver
  })

  it('reports ResponsiveAside width across breakpoint changes', () => {
    setMedia({ width: '100em' })
    const originalResizeObserver = globalThis.ResizeObserver
    const observe = vi.fn()
    globalThis.ResizeObserver = class {
      observe = observe
      disconnect() {}
      unobserve() {}
    } as typeof ResizeObserver
    const getBoundingClientRect = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue({ width: 320 } as DOMRect)
    const onWidthChange = vi.fn()

    const { rerender } = render(
      <SidebarMenu.ResponsiveProvider drawerAt="medium">
        <SidebarMenu.ResponsiveAside onWidthChange={onWidthChange}>
          Menu
        </SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(onWidthChange).toHaveBeenLastCalledWith(320)
    const initialObserveCount = observe.mock.calls.length

    setMedia({ width: '30em' })
    rerender(
      <SidebarMenu.ResponsiveProvider drawerAt="medium">
        <SidebarMenu.ResponsiveAside onWidthChange={onWidthChange}>
          Menu
        </SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )
    expect(onWidthChange).toHaveBeenLastCalledWith(0)

    setMedia({ width: '100em' })
    rerender(
      <SidebarMenu.ResponsiveProvider drawerAt="medium">
        <SidebarMenu.ResponsiveAside onWidthChange={onWidthChange}>
          Menu
        </SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )
    expect(onWidthChange).toHaveBeenLastCalledWith(320)
    expect(observe.mock.calls.length).toBeGreaterThan(initialObserveCount)
    expect(observe.mock.lastCall?.[0].isConnected).toBe(true)

    getBoundingClientRect.mockRestore()
    globalThis.ResizeObserver = originalResizeObserver
  })

  it('uses the compact mode between the content and Drawer thresholds', () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })

    const { rerender } = render(
      <SidebarMenu.ResponsiveProvider
        drawerAt="medium"
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('data-sidebar-menu-responsive-compact', 'true')
    expect(document.querySelector('.dnb-sidebar-menu')).toHaveClass(
      'dnb-sidebar-menu--compact'
    )

    setMedia({ width: '100em' })
    rerender(
      <SidebarMenu.ResponsiveProvider
        drawerAt="medium"
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('data-sidebar-menu-responsive-compact', 'false')
    expect(document.querySelector('.dnb-sidebar-menu')).not.toHaveClass(
      'dnb-sidebar-menu--compact'
    )
  })

  it('limits compact menu state to ResponsiveInline descendants', () => {
    setMedia({ width: '70em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Inline menu" />
        </SidebarMenu.ResponsiveInline>
        <SidebarMenu.Root aria-label="Page example" />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(
      document.querySelector('[aria-label="Inline menu"]')
    ).toHaveClass('dnb-sidebar-menu--compact')
    expect(
      document.querySelector('[aria-label="Page example"]')
    ).not.toHaveClass('dnb-sidebar-menu--compact')
  })

  it('toggles the compact menu on touch-only input', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )

    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-compact',
      'true'
    )
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-label', 'Åpne meny')
    expect(toggle).not.toHaveAttribute('title')
    const controlledContent = document.getElementById(
      toggle.getAttribute('aria-controls') ?? ''
    )
    expect(controlledContent).toHaveClass(
      'dnb-sidebar-menu-responsive-inline__body'
    )
    expect(controlledContent?.contains(toggle)).toBe(false)

    fireEvent.pointerEnter(inline, { pointerType: 'touch' })
    expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-expanded'
    )

    fireEvent.click(toggle)
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(toggle)
    expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-expanded'
    )
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('shows an Eufemia tooltip for the compact toggle', async () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>Menu</SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )

    expect(toggle).toHaveAttribute('aria-label', 'Åpne meny')
    expect(toggle).not.toHaveAttribute('title')
    fireEvent.focus(toggle)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip--active')
      ).toHaveTextContent('Åpne meny')
    })
    expect(document.querySelector('.dnb-tooltip__arrow')).toHaveClass(
      'dnb-tooltip__arrow__placement--right'
    )
    expect(toggle).not.toHaveAttribute('aria-describedby')

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-label', 'Lukk meny')
    expect(
      document.querySelector('.dnb-tooltip--active')
    ).not.toBeInTheDocument()
  })

  it('toggles a hover-expanded compact menu', () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )

    expect(inline).toHaveStyle({
      '--sidebar-menu-opacity': '0.55',
    })
    fireEvent.pointerEnter(inline, { pointerType: 'mouse' })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAttribute('aria-label', 'Lukk meny')
    expect(inline).toHaveStyle({
      '--sidebar-menu-opacity': '1',
    })

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })

  it('shows item tooltips while compact hover expansion is dismissed', async () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const action = document.querySelector(
      '.dnb-sidebar-menu__item__action'
    )
    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )

    fireEvent.pointerEnter(inline, { pointerType: 'mouse' })
    fireEvent.click(toggle)
    fireEvent.pointerMove(action, { pointerType: 'mouse' })

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip--active')
      ).toHaveTextContent('Home')
    })
    expect(action).not.toHaveAttribute('aria-describedby')
  })

  it('does not show item tooltips outside compact mode', () => {
    setMedia({ width: '100em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider compactAt="large">
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    fireEvent.pointerMove(
      document.querySelector('.dnb-sidebar-menu__item__action'),
      { pointerType: 'mouse' }
    )

    expect(
      document.querySelector('.dnb-tooltip--active')
    ).not.toBeInTheDocument()
  })

  it('does not expand on hover without compact mode', () => {
    setMedia({ width: '100em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveInline>Menu</SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    fireEvent.pointerEnter(inline, { pointerType: 'mouse' })

    expect(inline).not.toHaveClass(
      'dnb-sidebar-menu-responsive-inline--expanded'
    )
    expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-expanded'
    )
  })

  it('does not show a stale tooltip while an expanded item closes the menu', async () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const action = document.querySelector(
      '.dnb-sidebar-menu__item__action'
    )

    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )

    fireEvent.pointerEnter(inline, { pointerType: 'mouse' })
    fireEvent.click(toggle)
    fireEvent.pointerMove(action, { pointerType: 'mouse' })
    fireEvent.click(toggle)
    fireEvent.click(action)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip--active')
      ).not.toBeInTheDocument()
    })
  })

  it('closes a toggled compact menu on outside touch', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>Menu</SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )
    fireEvent.click(toggle)
    fireEvent.pointerDown(document.body, { pointerType: 'touch' })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes a toggled compact menu with Escape', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>Menu</SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )
    fireEvent.click(toggle)
    fireEvent.keyDown(inline, { key: 'Escape' })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('dismisses a hover-expanded compact menu with Escape', () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>Menu</SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )
    fireEvent.pointerEnter(inline, { pointerType: 'mouse' })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('expands the compact menu for keyboard focus', () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })
    document.documentElement.dataset.whatinput = 'keyboard'

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const action = document.querySelector(
      '.dnb-sidebar-menu__item__action'
    )
    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )
    fireEvent.focus(action)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    document.documentElement.removeAttribute('data-whatinput')
  })

  it('expands the compact menu for keyboard focus on the section dropdown', () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })
    document.documentElement.dataset.whatinput = 'keyboard'

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Section id="personal" text="Personal">
              <SidebarMenu.Item id="home" text="Home" />
            </SidebarMenu.Section>
            <SidebarMenu.Section id="business" text="Business">
              <SidebarMenu.Item id="payments" text="Payments" />
            </SidebarMenu.Section>
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const sectionTrigger = document.querySelector(
      '.dnb-sidebar-menu__sections .dnb-dropdown__trigger'
    )
    fireEvent.focus(sectionTrigger)

    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )

    fireEvent.keyDown(sectionTrigger, { key: 'Enter' })

    expect(sectionTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
    document.documentElement.removeAttribute('data-whatinput')
  })

  it('expands the compact menu when the section dropdown opens with the keyboard', () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Section id="personal" text="Personal">
              <SidebarMenu.Item id="home" text="Home" />
            </SidebarMenu.Section>
            <SidebarMenu.Section id="business" text="Business">
              <SidebarMenu.Item id="payments" text="Payments" />
            </SidebarMenu.Section>
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const sectionTrigger = document.querySelector(
      '.dnb-sidebar-menu__sections .dnb-dropdown__trigger'
    )
    fireEvent.focus(sectionTrigger)

    expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-expanded'
    )

    fireEvent.keyDown(sectionTrigger, { key: 'Enter' })

    expect(sectionTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
  })

  it('opens a closed accordion when expanding the compact menu', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Accordion id="products" text="Products">
              <SidebarMenu.Item id="accounts" text="Accounts" />
            </SidebarMenu.Accordion>
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const accordion = document.querySelector(
      '.dnb-sidebar-menu__accordion__trigger'
    )

    expect(accordion).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(accordion)
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
    expect(accordion).toHaveAttribute('aria-expanded', 'true')
  })

  it('expands the compact menu and opens its section dropdown', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Section id="personal" text="Personal">
              <SidebarMenu.Item id="home" text="Home" />
            </SidebarMenu.Section>
            <SidebarMenu.Section id="business" text="Business">
              <SidebarMenu.Item id="payments" text="Payments" />
            </SidebarMenu.Section>
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const sectionTrigger = document.querySelector(
      '.dnb-sidebar-menu__sections .dnb-dropdown__trigger'
    )

    expect(sectionTrigger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(sectionTrigger)
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
    expect(sectionTrigger).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(
      document.querySelector('.dnb-sidebar-menu-responsive-inline__toggle')
    )
    expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-expanded'
    )
    expect(sectionTrigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('stays expanded while a section is chosen from the portaled list', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Section id="personal" text="Personal">
              <SidebarMenu.Item id="home" text="Home" />
            </SidebarMenu.Section>
            <SidebarMenu.Section id="business" text="Business">
              <SidebarMenu.Item id="payments" text="Payments" />
            </SidebarMenu.Section>
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const sectionTrigger = document.querySelector(
      '.dnb-sidebar-menu__sections .dnb-dropdown__trigger'
    )
    fireEvent.click(sectionTrigger)

    const option = document.querySelectorAll(
      '.dnb-sidebar-menu__sections-portal li.dnb-drawer-list__option'
    )[1]
    expect(inline.contains(option)).toBe(false)

    fireEvent.focusOut(sectionTrigger, { relatedTarget: option })
    fireEvent.pointerDown(option)
    fireEvent.click(option)

    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
    expect(
      document.querySelector('.dnb-sidebar-menu__item__action')
    ).toHaveTextContent('Payments')
  })

  it('keeps an open accordion open when expanding the compact menu', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root
            aria-label="Navigation"
            defaultOpenItems={['products']}
          >
            <SidebarMenu.Accordion id="products" text="Products">
              <SidebarMenu.Item id="accounts" text="Accounts" />
            </SidebarMenu.Accordion>
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const accordion = document.querySelector(
      '.dnb-sidebar-menu__accordion__trigger'
    )

    expect(accordion).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(accordion)
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
    expect(accordion).toHaveAttribute('aria-expanded', 'true')
  })

  it('does not intercept a linked compact accordion', () => {
    setMedia({ width: '80em', hover: 'none', pointer: 'coarse' })
    const onClick = vi.fn()

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Accordion
              id="products"
              text="Products"
              href="#products"
              onClick={onClick}
            >
              <SidebarMenu.Item id="accounts" text="Accounts" />
            </SidebarMenu.Accordion>
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    fireEvent.click(
      document.querySelector('.dnb-sidebar-menu__accordion__trigger')
    )

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).not.toHaveAttribute('data-sidebar-menu-responsive-expanded')
  })

  it('collapses the expanded compact menu after an item activates', () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item id="home" text="Home" />
            <SidebarMenu.Accordion id="products" text="Products">
              <SidebarMenu.Item id="accounts" text="Accounts" />
            </SidebarMenu.Accordion>
            <SidebarMenu.Item id="settings" text="Settings" />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const actions = document.querySelectorAll(
      '.dnb-sidebar-menu__item__action'
    )
    const accordion = document.querySelector(
      '.dnb-sidebar-menu__accordion__trigger'
    )
    const toggle = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )

    fireEvent.mouseEnter(inline)
    fireEvent.click(toggle)
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
    fireEvent.click(accordion)
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )

    fireEvent.click(actions[0])
    expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-expanded'
    )
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('collapses compact mode after client-side navigation', () => {
    setMedia({ width: '80em', hover: 'hover', pointer: 'fine' })

    render(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="24em"
      >
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Root aria-label="Navigation">
            <SidebarMenu.Item
              id="home"
              text="Home"
              href="/home"
              onClick={(event) => event.preventDefault()}
            />
          </SidebarMenu.Root>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )
    fireEvent.click(trigger)
    fireEvent.click(
      document.querySelector('.dnb-sidebar-menu__item__action')
    )

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders first-paint compact layout CSS', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider
        compactAt="large"
        compactOffset="10em"
      >
        <SidebarMenu.ResponsiveInline
          compactWidth="5rem"
          expandedWidth="18rem"
        >
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).not.toContain('(hover:hover) and (pointer:fine)')
    expect(html).toContain('(max-width:82em)')
    expect(html).toContain('--sidebar-menu-compact-width:max(4rem, 5rem)')
    expect(html).toContain('--sidebar-menu-default-expanded-width:18rem')
    expect(html).toContain('dnb-sidebar-menu-responsive-inline__content')
    expect(html).toContain(
      'dnb-sidebar-menu-responsive-inline__toggle-island{display:inline-flex;margin-inline-start:calc(.5rem + var(--sidebar-menu-compact-offset))}'
    )
    expect(html).toContain(
      '.dnb-sidebar-menu-responsive-inline__content:dir(rtl)'
    )
    expect(html).toContain(
      'margin-inline-start:calc(.375rem + var(--sidebar-menu-compact-offset))'
    )
    expect(html).toContain(
      '.dnb-sidebar-menu__badge:not(:has(.dnb-badge--variant-notification)){display:none}'
    )
    expect(html).toContain(
      '.dnb-sidebar-menu__sections.dnb-dropdown{--dropdown-border-radius:var(--token-radius-full);--dropdown-button-padding:.625rem;padding-inline:.25rem}'
    )
    expect(html).toContain(
      '.dnb-dropdown__trigger{width:2.75rem;height:2.75rem;margin-inline-start:.375rem}'
    )
    expect(html).toContain(
      '.dnb-sidebar-menu__sections--has-icon .dnb-dropdown__text{padding-inline:0}'
    )
    expect(html).toContain(
      ':is(.dnb-sidebar-menu__group__title,.dnb-sidebar-menu__header){width:4rem;white-space:nowrap;opacity:.8'
    )
    expect(html).toContain('padding:0 0 2.5rem')
  })

  it('uses a stable first-paint CSS scope when provided', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider
        scopeId="application-navigation"
        compactAt="large"
      >
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain(
      'data-sidebar-menu-responsive-provider="application-navigation"'
    )
    expect(html).toContain(
      'data-sidebar-menu-responsive-scope="application-navigation"'
    )
  })

  it('keeps a custom scopeId inside the first-paint CSS selector', () => {
    const scopeId = 'x"]{}body{display:none}[x="'
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider scopeId={scopeId} compactAt="large">
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const css = html.match(/<style[^>]*>([\s\S]*?)<\/style>/)[1]
    const selector =
      '[data-sidebar-menu-responsive-scope="x\\22 ]{}body{display:none}[x=\\22 "]'
    expect(css).toContain(selector)
    expect(css).not.toContain('x"]')

    // The escaped selector still matches the element
    const container = document.createElement('div')
    container.innerHTML = html
    expect(container.querySelector(selector)).toHaveAttribute(
      'data-sidebar-menu-responsive-scope',
      scopeId
    )
  })

  it('toggles desktop navigation with the public Toggle', () => {
    setMedia({ width: '100em' })
    const onInlineCollapsedChange = vi.fn()

    render(
      <SidebarMenu.ResponsiveProvider
        onInlineCollapsedChange={onInlineCollapsedChange}
      >
        <SidebarMenu.Toggle data-testid="toggle" />
        <SidebarMenu.ResponsiveAside id="toggle-menu">
          Menu
        </SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )

    const toggle = document.querySelector('[data-testid="toggle"]')
    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    expect(toggle).toHaveAttribute('aria-controls', 'toggle-menu')
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAttribute('aria-label', 'Lukk meny')
    expect(toggle).not.toHaveAttribute('aria-haspopup')

    fireEvent.click(toggle)
    expect(inline).toHaveAttribute('inert')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-label', 'Åpne meny')
    expect(onInlineCollapsedChange).toHaveBeenLastCalledWith(true)

    fireEvent.click(toggle)
    expect(inline).not.toHaveAttribute('inert')
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(onInlineCollapsedChange).toHaveBeenLastCalledWith(false)
  })

  it('hides a hover-expanded compact menu with an external Toggle', () => {
    setMedia({ width: '65em' })
    render(
      <SidebarMenu.ResponsiveProvider compactAt="large">
        <SidebarMenu.Toggle data-testid="external-toggle" />
        <SidebarMenu.ResponsiveAside>Menu</SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )
    const inline = document.querySelector(
      '.dnb-sidebar-menu-responsive-inline'
    )
    const external = document.querySelector(
      '[data-testid="external-toggle"]'
    )
    fireEvent.pointerEnter(inline, { pointerType: 'mouse' })
    expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
    fireEvent.click(external)
    expect(inline).toHaveAttribute('inert')
    expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-expanded'
    )
    fireEvent.click(external)
    expect(inline).not.toHaveAttribute('inert')
    expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-expanded'
    )
  })

  it('keeps controlled desktop state authoritative for Toggle', () => {
    setMedia({ width: '100em' })
    const onInlineCollapsedChange = vi.fn()
    const renderMenu = (collapsed: boolean) => (
      <SidebarMenu.ResponsiveProvider
        inlineCollapsed={collapsed}
        onInlineCollapsedChange={onInlineCollapsedChange}
      >
        <SidebarMenu.Toggle />
      </SidebarMenu.ResponsiveProvider>
    )
    const { rerender } = render(renderMenu(false))
    const toggle = document.querySelector('.dnb-sidebar-menu-toggle')
    fireEvent.click(toggle)
    expect(onInlineCollapsedChange).toHaveBeenLastCalledWith(true)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    rerender(renderMenu(true))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(toggle)
    expect(onInlineCollapsedChange).toHaveBeenLastCalledWith(false)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('uses visible Toggle text as its accessible name and forwards the ref', () => {
    setMedia({ width: '100em' })
    const ref = createRef<HTMLButtonElement>()
    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.Toggle ref={ref} text="Menu" />
      </SidebarMenu.ResponsiveProvider>
    )
    expect(ref.current).toHaveAccessibleName('Menu')
  })

  it('returns focus to the public Toggle when the Drawer closes', async () => {
    setMedia({ width: '30em' })
    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.Toggle />
        <SidebarMenu.ResponsiveDrawer>Menu</SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )
    const toggle = document.querySelector('.dnb-sidebar-menu-toggle')
    fireEvent.click(toggle)
    await waitFor(() =>
      expect(document.querySelector('[role="dialog"]')).toBeInTheDocument()
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() =>
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
    )
    expect(document.activeElement).toBe(toggle)
  })

  it('collapses desktop navigation with its embedded toggle', () => {
    setMedia({ width: '100em' })
    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveAside>Menu</SidebarMenu.ResponsiveAside>
      </SidebarMenu.ResponsiveProvider>
    )

    const toggle = document.querySelector<HTMLButtonElement>(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )
    expect(toggle).toBeInTheDocument()
    toggle.focus()
    fireEvent.click(toggle)
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('inert')
    expect(document.activeElement).toBe(
      document.querySelector('.dnb-sidebar-menu-responsive-trigger')
    )
  })

  it('lets consumers prevent the default Toggle action', () => {
    setMedia({ width: '100em' })
    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.Toggle
          onClick={({ event }) => event.preventDefault()}
        />
      </SidebarMenu.ResponsiveProvider>
    )
    const toggle = document.querySelector('.dnb-sidebar-menu-toggle')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })

  it('toggles the mobile Drawer with the public Toggle', () => {
    setMedia({ width: '30em' })
    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.Toggle controls="toggle-drawer" />
        <SidebarMenu.ResponsiveDrawer id="toggle-drawer">
          Menu
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )
    const toggle = document.querySelector('.dnb-sidebar-menu-toggle')
    expect(toggle).toHaveAttribute('aria-haspopup', 'dialog')
    expect(toggle).toHaveAttribute('aria-controls', 'toggle-drawer')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('restores a collapsed inline menu from the desktop trigger', () => {
    setMedia({ width: '70em' })

    function CollapseButton() {
      const { collapseInline } = SidebarMenu.useResponsive()
      return <button onClick={collapseInline}>Collapse</button>
    }

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger
          controls="mobile-menu"
          inlineControls="inline-menu"
        />
        <CollapseButton />
        <SidebarMenu.ResponsiveInline>
          <nav id="inline-menu">Inline menu</nav>
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '.dnb-sidebar-menu-responsive-trigger'
    ) as HTMLButtonElement
    fireEvent.click(document.querySelector('button:not(.dnb-button)'))

    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('inert')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('aria-hidden', 'true')
    expect(trigger).toHaveAttribute(
      'data-sidebar-menu-responsive-visible',
      'true'
    )
    expect(trigger).toHaveAttribute(
      'data-sidebar-menu-responsive-animate-hamburger',
      'true'
    )
    expect(trigger).toHaveAttribute('aria-controls', 'inline-menu')
    expect(trigger).not.toHaveAttribute('aria-haspopup')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(trigger)

    expect(document.body).toHaveTextContent('Inline menu')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).not.toHaveAttribute('inert')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).not.toHaveAttribute('aria-hidden')
    expect(trigger).toHaveAttribute(
      'data-sidebar-menu-responsive-visible',
      'false'
    )
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(trigger).not.toHaveAttribute(
      'data-sidebar-menu-responsive-animate-hamburger'
    )
  })

  it('restores a dragged-away inline menu at its default width', async () => {
    setMedia({ width: '70em' })
    const layoutRef = createRef<HTMLDivElement>()
    const targetRef = createRef<HTMLElement>()
    function ResizeHandle() {
      const { collapseInline } = SidebarMenu.useResponsive()
      return (
        <SidebarMenu.ResizeHandle
          targetRef={targetRef}
          scopeSelector=".layout"
          cssProperty="--sidebar-width"
          onCollapse={collapseInline}
        />
      )
    }

    render(
      <div ref={layoutRef} className="layout">
        <SidebarMenu.ResponsiveProvider
          onInlineCollapsedChange={(collapsed) => {
            layoutRef.current?.toggleAttribute('data-collapsed', collapsed)
          }}
        >
          <SidebarMenu.ResponsiveTrigger inlineControls="inline-menu" />
          <SidebarMenu.ResponsiveInline>
            <aside
              id="inline-menu"
              ref={(element) => {
                targetRef.current = element
                if (element) {
                  element.getBoundingClientRect = () => {
                    const writtenWidth = Number.parseFloat(
                      layoutRef.current.style.getPropertyValue(
                        '--sidebar-width'
                      )
                    )
                    return {
                      width: layoutRef.current.hasAttribute(
                        'data-collapsed'
                      )
                        ? 0
                        : writtenWidth || 320,
                    } as DOMRect
                  }
                }
              }}
            >
              Inline menu
              <ResizeHandle />
            </aside>
          </SidebarMenu.ResponsiveInline>
        </SidebarMenu.ResponsiveProvider>
      </div>
    )

    const handle = document.querySelector(
      '.dnb-sidebar-menu-resize-handle'
    )
    fireEvent.pointerDown(handle, { button: 0, clientX: 320 })
    fireEvent.pointerMove(window, { clientX: 119 })

    const trigger = document.querySelector(
      '.dnb-sidebar-menu-responsive-trigger'
    )
    fireEvent.click(trigger)

    await waitFor(() =>
      expect(
        layoutRef.current.style.getPropertyValue('--sidebar-width')
      ).toBe('')
    )
    await waitFor(() =>
      expect(handle).toHaveAttribute('aria-valuenow', '320')
    )
  })

  it('renders the trigger in server markup', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger
          controls="mobile-menu"
          inlineControls="inline-menu"
        />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain('dnb-sidebar-menu-responsive-trigger')
    expect(html).toContain('dnb-sidebar-menu-responsive-inline')
    expect(html).not.toContain(
      'dnb-sidebar-menu-responsive-inline__content'
    )
    expect(html).toContain('aria-label="Åpne meny"')
    expect(html).toContain('aria-controls="mobile-menu"')
    expect(html).toContain('aria-haspopup="dialog"')
    expect(html).not.toContain('aria-controls="inline-menu"')
    expect(html).not.toContain('data-sidebar-menu-responsive-visible')
  })

  it('renders scoped first-paint CSS for a custom breakpoint', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider
        drawerAt="50em"
        styleNonce="nonce-value"
      >
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain('@media (max-width: 50em)')
    expect(html).toContain('@media (min-width: 50.00625em)')
    expect(html).toContain('data-sidebar-menu-responsive-scope')
    expect(html).toContain('nonce="nonce-value"')
    expect(html).toContain(':not([data-sidebar-menu-responsive-visible])')
    expect(html).toContain('{display:inline-flex}')
    expect(html).toContain('{display:none}')
    expect(html).toContain('{display:block}')
  })

  it('resolves named custom breakpoints for the first paint', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider drawerAt="small">
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain('@media (max-width: 40em)')
  })

  it('supports the deprecated breakpoint prop', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider breakpoint="small">
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain('@media (max-width: 40em)')
  })

  it('prefers drawerAt over the deprecated breakpoint prop', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider drawerAt="50em" breakpoint="small">
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).toContain('@media (max-width: 50em)')
    expect(html).not.toContain('@media (max-width: 40em)')
  })

  it('resolves Provider breakpoint overrides for the first paint', () => {
    const html = renderToString(
      <Provider breakpoints={{ medium: '50em' }}>
        <SidebarMenu.ResponsiveProvider>
          <SidebarMenu.ResponsiveTrigger />
        </SidebarMenu.ResponsiveProvider>
      </Provider>
    )

    expect(html).toContain('@media (max-width: 50em)')
  })

  it('uses the bundled medium first-paint CSS by default', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).not.toContain('@media (max-width: 60em)')
  })

  it('falls back to medium for unsupported runtime values', () => {
    const html = renderToString(
      <SidebarMenu.ResponsiveProvider drawerAt={'800px' as '50em'}>
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(html).not.toContain('@media (max-width: 800px)')
  })

  it('uses a custom breakpoint after hydration', () => {
    setMedia({ width: '53.125em' })

    const { rerender } = render(
      <SidebarMenu.ResponsiveProvider drawerAt="50em">
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-trigger')
    ).toHaveAttribute('data-sidebar-menu-responsive-visible', 'false')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('data-sidebar-menu-responsive-visible', 'true')

    setMedia({ width: '43.75em' })
    rerender(
      <SidebarMenu.ResponsiveProvider drawerAt="50em">
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )

    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-trigger')
    ).toHaveAttribute('data-sidebar-menu-responsive-visible', 'true')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).not.toBeInTheDocument()
  })

  it('hydrates custom breakpoint markup with a stable scope', async () => {
    setMedia({ width: '53.125em' })
    const element = (
      <SidebarMenu.ResponsiveProvider drawerAt="50em">
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    document.body.appendChild(container)
    const scope = container
      .querySelector('[data-sidebar-menu-responsive-scope]')
      .getAttribute('data-sidebar-menu-responsive-scope')
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)

    const root = hydrateRoot(container, element)

    await waitFor(() =>
      expect(
        container.querySelector('.dnb-sidebar-menu-responsive-inline')
      ).toHaveAttribute('data-sidebar-menu-responsive-visible', 'true')
    )
    expect(
      container
        .querySelector('[data-sidebar-menu-responsive-scope]')
        .getAttribute('data-sidebar-menu-responsive-scope')
    ).toBe(scope)
    expect(consoleError).not.toHaveBeenCalled()

    root.unmount()
    consoleError.mockRestore()
    container.remove()
  })

  it('returns focus to the trigger when the Drawer closes with Escape', async () => {
    setMedia({ width: '30em' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger controls="mobile-menu" />
        <SidebarMenu.ResponsiveInline>
          Inline menu
        </SidebarMenu.ResponsiveInline>
        <SidebarMenu.ResponsiveDrawer id="mobile-menu">
          Mobile menu
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '[aria-controls="mobile-menu"]'
    ) as HTMLButtonElement

    expect(trigger).toHaveAttribute(
      'data-sidebar-menu-responsive-visible',
      'true'
    )
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).not.toBeInTheDocument()
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(document.body).toHaveTextContent('Mobile menu')
    expect(document.getElementById('mobile-menu')).toBeInTheDocument()

    fireEvent.keyDown(document.querySelector('.dnb-drawer'), {
      key: 'Escape',
    })
    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    expect(document.activeElement).toBe(trigger)
  })

  it('keeps the hamburger icon while the Drawer is open', () => {
    setMedia({ width: '30em' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '[aria-label="Åpne meny"]'
    ) as HTMLButtonElement
    expect(
      trigger.querySelector('.dnb-icon--transition-fallback')
    ).toBeNull()
    expect(trigger.querySelectorAll('svg')).toHaveLength(1)

    fireEvent.click(trigger)

    expect(
      trigger.querySelector('.dnb-icon--transition-fallback')
    ).toBeNull()
    expect(trigger.querySelectorAll('svg')).toHaveLength(1)
  })

  it('calls the latest onOpenChange callback', () => {
    setMedia({ width: '30em' })
    const calls: string[] = []
    const renderProvider = (route: string) => (
      <SidebarMenu.ResponsiveProvider
        onOpenChange={(open) => calls.push(route + ':' + open)}
      >
        <SidebarMenu.ResponsiveTrigger />
      </SidebarMenu.ResponsiveProvider>
    )
    const { rerender } = render(renderProvider('a'))
    const trigger = document.querySelector(
      '[aria-label="Åpne meny"]'
    ) as HTMLButtonElement

    rerender(renderProvider('b'))
    fireEvent.click(trigger)

    expect(calls).toEqual(['b:true'])
  })

  it('calls a supplied trigger onClick before toggling', () => {
    setMedia({ width: '30em' })
    const onClick = vi.fn()

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger onClick={onClick} />
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '[aria-label="Åpne meny"]'
    ) as HTMLButtonElement
    fireEvent.click(trigger)

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('does not toggle when the supplied onClick prevents default', () => {
    setMedia({ width: '30em' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger
          onClick={({ event }) => event.preventDefault()}
        />
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '[aria-label="Åpne meny"]'
    ) as HTMLButtonElement
    fireEvent.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('keeps the useResponsive result stable', () => {
    setMedia({ width: '30em' })
    const values: Array<ReturnType<typeof SidebarMenu.useResponsive>> = []

    function Consumer() {
      values.push(SidebarMenu.useResponsive())
      return null
    }

    const { rerender } = render(
      <SidebarMenu.ResponsiveProvider>
        <Consumer />
      </SidebarMenu.ResponsiveProvider>
    )
    const value = values.at(-1)

    rerender(
      <SidebarMenu.ResponsiveProvider>
        <Consumer />
      </SidebarMenu.ResponsiveProvider>
    )

    expect(values.at(-1)).toBe(value)
  })

  it('closes once without focusing the hidden trigger above breakpoint', async () => {
    setMedia({ width: '30em' })
    const onOpenChange = vi.fn()

    render(
      <SidebarMenu.ResponsiveProvider onOpenChange={onOpenChange}>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveDrawer>
          Mobile menu
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '[aria-label="Åpne meny"]'
    ) as HTMLButtonElement
    fireEvent.click(trigger)
    setMedia({ width: '70em' })

    await waitFor(() =>
      expect(onOpenChange.mock.calls).toEqual([[true], [false]])
    )
    expect(document.activeElement).not.toBe(trigger)
  })

  it('places the Drawer close button on the left', async () => {
    setMedia({ width: '30em' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveDrawer>
          Mobile menu
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )

    fireEvent.click(document.querySelector('[aria-label="Åpne meny"]'))

    await waitFor(() =>
      expect(
        document.querySelector(
          '.dnb-drawer.dnb-sidebar-menu-responsive-drawer'
        )
      ).toBeInTheDocument()
    )
  })

  it('persists the Drawer scroll position instead of a nested ScrollView', async () => {
    setMedia({ width: '30em' })
    const storageKey = 'sidebar-menu-responsive-scroll-position'
    sessionStorage.setItem(storageKey, '120')

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveDrawer>
          <ScrollView>
            <SidebarMenu.Root scrollPositionStorageKey={storageKey}>
              <SidebarMenu.Item id="payments" text="Payments" />
            </SidebarMenu.Root>
          </ScrollView>
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )

    const trigger = document.querySelector(
      '[aria-label="Åpne meny"]'
    ) as HTMLButtonElement
    fireEvent.click(trigger)

    await waitFor(() =>
      expect(document.querySelector('.dnb-drawer')).toBeInTheDocument()
    )
    const drawer = document.querySelector<HTMLElement>('.dnb-drawer')
    const innerScrollView =
      drawer.querySelector<HTMLElement>('.dnb-scroll-view')

    expect(drawer.scrollTop).toBe(120)
    expect(innerScrollView.scrollTop).toBe(0)

    drawer.scrollTop = 240
    fireEvent.scroll(drawer)
    expect(sessionStorage.getItem(storageKey)).toBe('240')

    drawer.classList.add('dnb-drawer--hide')
    drawer.scrollTop = 0
    fireEvent.scroll(drawer)
    expect(sessionStorage.getItem(storageKey)).toBe('240')
    drawer.classList.remove('dnb-drawer--hide')

    fireEvent.click(trigger)
    drawer.scrollTop = 0
    fireEvent.scroll(drawer)
    await waitFor(() => expect(drawer).not.toBeInTheDocument())
    expect(sessionStorage.getItem(storageKey)).toBe('240')
    fireEvent.click(trigger)

    await waitFor(() =>
      expect(
        document.querySelector<HTMLElement>('.dnb-drawer').scrollTop
      ).toBe(240)
    )

    sessionStorage.removeItem(storageKey)
  })

  it('scrolls the Drawer instead of a nested ScrollView when opening an accordion', async () => {
    setMedia({ width: '30em' })

    render(
      <SidebarMenu.ResponsiveProvider>
        <SidebarMenu.ResponsiveTrigger />
        <SidebarMenu.ResponsiveDrawer>
          <ScrollView>
            <SidebarMenu.Root>
              <SidebarMenu.Accordion id="products" text="Products">
                <SidebarMenu.Item id="accounts" text="Accounts" />
              </SidebarMenu.Accordion>
            </SidebarMenu.Root>
          </ScrollView>
        </SidebarMenu.ResponsiveDrawer>
      </SidebarMenu.ResponsiveProvider>
    )

    fireEvent.click(document.querySelector('[aria-label="Åpne meny"]'))
    await waitFor(() =>
      expect(document.querySelector('.dnb-drawer')).toBeInTheDocument()
    )

    const drawer = document.querySelector<HTMLElement>('.dnb-drawer')
    const innerScrollView =
      drawer.querySelector<HTMLElement>('.dnb-scroll-view')
    const trigger = drawer.querySelector<HTMLElement>(
      '.dnb-sidebar-menu__accordion__trigger'
    )
    const content = drawer.querySelector<HTMLElement>(
      '.dnb-sidebar-menu__accordion__content'
    )
    const drawerScrollTo = vi.fn()
    const innerScrollTo = vi.fn()
    Object.defineProperty(drawer, 'scrollTo', {
      configurable: true,
      value: drawerScrollTo,
    })
    Object.defineProperty(innerScrollView, 'scrollTo', {
      configurable: true,
      value: innerScrollTo,
    })
    vi.spyOn(drawer, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 300,
      height: 300,
    } as DOMRect)
    vi.spyOn(innerScrollView, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 500,
      height: 500,
    } as DOMRect)
    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      top: 180,
      bottom: 224,
      height: 44,
    } as DOMRect)
    vi.spyOn(content, 'getBoundingClientRect').mockReturnValue({
      top: 224,
      bottom: 420,
      height: 196,
    } as DOMRect)

    fireEvent.click(trigger)

    await waitFor(() =>
      expect(drawerScrollTo).toHaveBeenCalledWith({
        top: 136,
        behavior: 'smooth',
      })
    )
    expect(innerScrollTo).not.toHaveBeenCalled()
  })
})
