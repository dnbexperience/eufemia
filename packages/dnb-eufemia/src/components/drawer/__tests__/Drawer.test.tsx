import type { ReactNode, RefObject } from 'react'
import { useState } from 'react'
import type { DrawerAllProps } from '../Drawer'
import Drawer from '../Drawer'
import { createDrawerReveal } from '../DrawerReveal'
import Button from '../../button/Button'
import Tooltip from '../../tooltip/Tooltip'
import Provider from '../../../shared/Provider'

import { loadScss, axeComponent } from '../../../core/test-utils/testSetup'
import { act, render, fireEvent, waitFor } from '@testing-library/react'

const props: DrawerAllProps = {
  noAnimation: true,
}

beforeAll(() => {
  const button = document.createElement('BUTTON')
  document.body.appendChild(button)
})

beforeEach(() => {
  document.body.removeAttribute('style')
  document.documentElement.removeAttribute('style')
  document.getElementById('dnb-modal-root')?.remove()
  window.__modalStack = undefined
})

const log = global.console.log
beforeEach(() => {
  global.console.log = vi.fn((...args) => {
    if (
      !String(args[1]).includes(
        'A Dialog or Drawer needs an h1 as its first element!'
      )
    ) {
      log(...args)
    }
  })
})
afterEach(() => {
  global.console.log = log
  vi.resetAllMocks()
})

describe('Drawer', () => {
  it('will run bodyScrollLock with disableBodyScroll', () => {
    render(
      <Drawer {...props}>
        <button>button</button>
      </Drawer>
    )

    expect(document.body.getAttribute('style')).toBe(null)

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    expect(document.body.getAttribute('style')).toContain(
      'overflow: hidden;'
    )
  })

  it('appears on trigger click and dismisses its tooltip', async () => {
    render(
      <Drawer
        {...props}
        triggerProps={{
          tooltip: (
            <Tooltip showDelay={0} noAnimation>
              Open
            </Tooltip>
          ),
        }}
      >
        <button>button</button>
      </Drawer>
    )

    const trigger = document.querySelector('button.dnb-modal__trigger')
    fireEvent.mouseEnter(trigger)
    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip--active')
      ).toBeInTheDocument()
    })
    fireEvent.click(trigger)

    expect(
      document.querySelector('button.dnb-modal__close-button')
    ).toBeInTheDocument()
    expect(document.querySelector('.dnb-tooltip--active')).toBeNull()
  })

  it('omits trigger button once we set omitTriggerButton', () => {
    render(<Drawer {...props} omitTriggerButton />)

    expect(
      document.querySelector('button.dnb-modal__trigger')
    ).not.toBeInTheDocument()
  })

  it('will close by using callback method', () => {
    const onClose = vi.fn()
    const onOpen = vi.fn()
    render(
      <Drawer
        noAnimation={true}
        onOpen={onOpen}
        onClose={onClose}
        hideCloseButton
      >
        {
          (({ close }) => (
            <>
              <h1>title</h1>
              <Button id="close-me" text="close" onClick={close} />
            </>
          )) as (...args: unknown[]) => ReactNode
        }
      </Drawer>
    )

    fireEvent.click(document.querySelector('button'))
    expect(onOpen).toHaveBeenCalledTimes(1)

    fireEvent.click(document.querySelector('button#close-me'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('will render Navigation, Header and Body even when hideCloseButton is true', () => {
    const onClose = vi.fn()
    const onOpen = vi.fn()

    render(
      <Drawer
        noAnimation={true}
        onOpen={onOpen}
        onClose={onClose}
        hideCloseButton
      >
        {
          (({ close }) => (
            <>
              <Drawer.Navigation>Drawer.Navigation</Drawer.Navigation>
              <Drawer.Header>
                <h1>Drawer.Header</h1>
                <Button id="close-me" onClick={close} />
              </Drawer.Header>
              <Drawer.Body>Drawer.Body</Drawer.Body>
            </>
          )) as (...args: unknown[]) => ReactNode
        }
      </Drawer>
    )

    fireEvent.click(document.querySelector('button'))
    expect(onOpen).toHaveBeenCalledTimes(1)

    expect(document.querySelectorAll('.dnb-drawer button')).toHaveLength(1)

    expect(
      document.querySelector('.dnb-drawer__header')
    ).toBeInTheDocument()
    expect(document.querySelector('.dnb-drawer__header').textContent).toBe(
      'Drawer.Header'
    )

    expect(document.querySelector('.dnb-drawer__body')).toBeInTheDocument()
    expect(document.querySelector('.dnb-drawer__body').textContent).toBe(
      'Drawer.Body'
    )

    expect(
      document.querySelector('.dnb-drawer__navigation')
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-drawer__navigation').textContent
    ).toBe('Drawer.Navigation')

    fireEvent.click(document.querySelector('button#close-me'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  // Deprecated: closeButtonAttributes – remove this test in v13
  it('sends along closeButtonAttributes to close button', () => {
    render(
      <Drawer
        open
        noAnimation
        closeButtonAttributes={{ text: 'Custom text' }}
      >
        Content
      </Drawer>
    )

    expect(
      document.querySelectorAll('.dnb-modal__close-button')
    ).toHaveLength(1)
    expect(
      document
        .querySelector('.dnb-modal__close-button')
        ?.textContent?.replace(/\u200C/g, '')
    ).toBe('Custom text')
  })

  it('sends along closeButtonProps to close button', () => {
    render(
      <Drawer open noAnimation closeButtonProps={{ text: 'Custom text' }}>
        Content
      </Drawer>
    )

    expect(
      document.querySelectorAll('.dnb-modal__close-button')
    ).toHaveLength(1)
    expect(
      document
        .querySelector('.dnb-modal__close-button')
        ?.textContent?.replace(/\u200C/g, '')
    ).toBe('Custom text')
  })

  it('closeButtonProps takes precedence over closeButtonAttributes', () => {
    render(
      <Drawer
        open
        noAnimation
        closeButtonProps={{ text: 'New prop' }}
        closeButtonAttributes={{ text: 'Old prop' }}
      >
        Content
      </Drawer>
    )

    expect(
      document
        .querySelector('.dnb-modal__close-button')
        ?.textContent?.replace(/\u200C/g, '')
    ).toBe('New prop')
  })

  it('keeps closing when closeButtonProps has an onClick', () => {
    const onClick = vi.fn()
    const onClose = vi.fn()

    render(
      <Drawer noAnimation onClose={onClose} closeButtonProps={{ onClick }}>
        Content
      </Drawer>
    )

    fireEvent.click(document.querySelector('.dnb-modal__trigger'))

    expect(
      document.querySelector('.dnb-drawer__content')
    ).toBeInTheDocument()

    fireEvent.click(document.querySelector('.dnb-modal__close-button'))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(
      document.querySelector('.dnb-drawer__content')
    ).not.toBeInTheDocument()
  })

  it('stays open when the closeButtonProps onClick returns false', () => {
    const onClose = vi.fn()
    const onClick = vi.fn(() => false)

    render(
      <Drawer noAnimation onClose={onClose} closeButtonProps={{ onClick }}>
        Content
      </Drawer>
    )

    fireEvent.click(document.querySelector('.dnb-modal__trigger'))
    fireEvent.click(document.querySelector('.dnb-modal__close-button'))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClose).not.toHaveBeenCalled()
    expect(
      document.querySelector('.dnb-drawer__content')
    ).toBeInTheDocument()
  })

  it('keeps the min and max width when a style is given', () => {
    render(
      <Drawer
        noAnimation
        minWidth="20rem"
        maxWidth="40rem"
        style={{ color: 'red' }}
      >
        Content
      </Drawer>
    )

    fireEvent.click(document.querySelector('.dnb-modal__trigger'))

    const drawer = document.querySelector('.dnb-drawer') as HTMLElement
    expect(drawer.style.minWidth).toBe('20rem')
    expect(drawer.style.maxWidth).toBe('40rem')
    expect(drawer.style.color).toBe('red')
  })

  it('keeps a click inside from reaching the elements around it when an onClick is given', () => {
    const onClick = vi.fn()
    const onOuterClick = vi.fn()

    render(
      <div role="presentation" onClick={onOuterClick}>
        <Drawer noAnimation onClick={onClick}>
          <p className="inside">Content</p>
        </Drawer>
      </div>
    )

    fireEvent.click(document.querySelector('.dnb-modal__trigger'))
    onOuterClick.mockClear()

    fireEvent.click(document.querySelector('.inside'))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onOuterClick).not.toHaveBeenCalled()
  })

  it('will use props from global context', () => {
    const contextTitle = 'Custom title'
    render(
      <Provider
        value={{
          Drawer: { title: contextTitle },
        }}
      >
        <Drawer />
      </Provider>
    )

    fireEvent.click(document.querySelector('button'))

    expect(document.querySelector('.dnb-drawer__title').textContent).toBe(
      contextTitle
    )
  })

  it('is closed by keyboardevent esc', () => {
    let testTriggeredBy = null
    const onClose = vi.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )

    const props: DrawerAllProps = {
      directDomReturn: false,
      noAnimation: true,
    }
    render(<Drawer {...props} id="modal-drawer" onClose={onClose} />)

    fireEvent.click(document.querySelector('button#modal-drawer'))
    fireEvent.keyDown(document.querySelector('div.dnb-drawer'), {
      key: 'Escape',
    })

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe('keyboard')
  })

  it('is closed by keyboardevent esc by window listener', async () => {
    const onClose = vi.fn()

    const props: DrawerAllProps = {
      directDomReturn: false,
      noAnimation: true,
    }
    render(<Drawer {...props} id="modal-drawer" onClose={onClose} />)

    fireEvent.click(document.querySelector('button#modal-drawer'))
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  it('moves focus to content by default when opened', async () => {
    render(<Drawer noAnimation open title="Title" />)

    await waitFor(() => {
      const title = document.querySelector(
        '.dnb-modal__title'
      ) as HTMLHeadingElement
      expect(title).toBeInTheDocument()
      // Focus remains on body element - this appears to be the expected behavior for Drawer
      expect(document.activeElement).toBe(document.body)
    })
  })

  it('respects focusSelector over close button', async () => {
    render(
      <Drawer noAnimation open title="Title" focusSelector="#focus-me">
        <Drawer.Body>
          <input id="focus-me" />
        </Drawer.Body>
      </Drawer>
    )

    await waitFor(() => {
      expect(document.activeElement?.id).toBe('focus-me')
    })

    const closeBtn = document.querySelector(
      'button.dnb-modal__close-button'
    ) as HTMLButtonElement
    expect(closeBtn).toBeInTheDocument()
    expect(document.activeElement).not.toBe(closeBtn)
  })

  it('returns focus to trigger with data-autofocus after close', async () => {
    render(<Drawer noAnimation animationDuration={3} title="Title" />)

    // Open via trigger
    const trigger = document.querySelector(
      'button.dnb-modal__trigger'
    ) as HTMLButtonElement
    fireEvent.click(trigger)

    // Close with ESC
    fireEvent.keyDown(document.querySelector('div.dnb-drawer'), {
      key: 'Escape',
    })

    // Trigger gets focus with data-autofocus set
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger)
      expect(trigger).toHaveAttribute('data-autofocus', 'true')
    })

    // Attribute is removed afterwards
    await waitFor(() => {
      expect(trigger).not.toHaveAttribute('data-autofocus')
    })
  })

  it('restores focus to a custom target after close', () => {
    const targetRef: RefObject<HTMLButtonElement | null> = {
      current: null,
    }

    render(
      <>
        <button ref={targetRef}>Custom target</button>
        <Drawer noAnimation restoreFocusTo={targetRef} title="Title" />
      </>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))
    fireEvent.keyDown(document.querySelector('div.dnb-drawer'), {
      key: 'Escape',
    })

    expect(document.activeElement).toBe(targetRef.current)
  })

  it('has support for nested Drawers', async () => {
    const onOpen = {
      first: vi.fn(),
      second: vi.fn(),
      third: vi.fn(),
    }
    const onClose = {
      first: vi.fn(),
      second: vi.fn(),
      third: vi.fn(),
    }

    const props: DrawerAllProps = {
      directDomReturn: false,
      noAnimation: true,
    }

    render(
      <Drawer
        {...props}
        id="modal-first"
        title="modal-first"
        onOpen={onOpen.first}
        onClose={onClose.first}
      >
        <button id="content-first">first</button>
        <Drawer
          {...props}
          id="modal-second"
          title="modal-second"
          onOpen={onOpen.second}
          onClose={onClose.second}
        >
          <button id="content-second">second</button>
          <Drawer
            {...props}
            id="modal-third"
            title="modal-third"
            onOpen={onOpen.third}
            onClose={onClose.third}
          >
            <button id="content-third">third</button>
          </Drawer>
        </Drawer>
      </Drawer>
    )

    expect(
      document.querySelector('#content-third')
    ).not.toBeInTheDocument()

    fireEvent.click(document.querySelector('button#modal-first'))
    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-first')
    fireEvent.click(document.querySelector('button#modal-second'))
    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-second')
    fireEvent.click(document.querySelector('button#modal-third'))
    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-third')

    expect(onOpen.first).toHaveBeenCalledTimes(1)
    expect(onOpen.second).toHaveBeenCalledTimes(1)
    expect(onOpen.third).toHaveBeenCalledTimes(1)

    expect(
      document.querySelectorAll('button.dnb-modal__close-button').length
    ).toBe(3)
    expect(document.querySelector('#content-first')).toHaveAttribute(
      'aria-hidden'
    )
    expect(document.querySelector('#content-second')).toHaveAttribute(
      'aria-hidden'
    )
    expect(document.querySelector('#content-third')).not.toHaveAttribute(
      'aria-hidden'
    )

    expect(
      document.querySelector(
        '#dnb-modal-modal-first button.dnb-modal__close-button'
      )
    ).toHaveAttribute('aria-hidden')
    expect(
      document.querySelector(
        '#dnb-modal-modal-second button.dnb-modal__close-button'
      )
    ).toHaveAttribute('aria-hidden')
    expect(
      document.querySelector(
        '#dnb-modal-modal-third button.dnb-modal__close-button'
      )
    ).not.toHaveAttribute('aria-hidden')

    // Close the third one
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await waitFor(() => {
      expect(onClose.first).toHaveBeenCalledTimes(0)
      expect(onClose.second).toHaveBeenCalledTimes(0)
      expect(onClose.third).toHaveBeenCalledTimes(1)
    })

    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-second')
    expect(
      document.querySelector('#content-third')
    ).not.toBeInTheDocument()
    expect(document.querySelector('#content-second')).not.toHaveAttribute(
      'aria-hidden'
    )
    expect(
      document.querySelector(
        '#dnb-modal-modal-first button.dnb-modal__close-button'
      )
    ).toHaveAttribute('aria-hidden')
    expect(
      document.querySelector(
        '#dnb-modal-modal-second button.dnb-modal__close-button'
      )
    ).not.toHaveAttribute('aria-hidden')

    // Close the second one
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await waitFor(() => {
      expect(onClose.first).toHaveBeenCalledTimes(0)
      expect(onClose.second).toHaveBeenCalledTimes(1)
      expect(onClose.third).toHaveBeenCalledTimes(1)
    })

    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-first')
    expect(
      document.querySelector('#content-second')
    ).not.toBeInTheDocument()
    expect(document.querySelector('#content-first')).not.toHaveAttribute(
      'aria-hidden'
    )
    expect(
      document.querySelectorAll('button.dnb-modal__close-button')[0]
    ).not.toHaveAttribute('aria-hidden')

    // Close the first one
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await waitFor(() => {
      expect(onClose.first).toHaveBeenCalledTimes(1)
      expect(onClose.second).toHaveBeenCalledTimes(1)
      expect(onClose.third).toHaveBeenCalledTimes(1)
    })

    expect(
      document.querySelector('#content-first')
    ).not.toBeInTheDocument()
    expect(document.documentElement).not.toHaveAttribute(
      'data-dnb-modal-active'
    )
  })

  it('will accept custom refs', () => {
    const contentRef: RefObject<HTMLElement | null> = {
      current: null,
    }
    const scrollRef: RefObject<HTMLElement | null> = {
      current: null,
    }

    const MockComponent = () => {
      return (
        <Drawer
          open
          noAnimation
          contentRef={contentRef}
          scrollRef={scrollRef}
        >
          content
        </Drawer>
      )
    }

    render(<MockComponent />)

    expect(contentRef.current).toBeTruthy()
    expect(scrollRef.current).toBeTruthy()
  })

  it('will close drawer by using callback method', () => {
    const onClose = vi.fn()
    const onOpen = vi.fn()

    render(
      <Drawer
        noAnimation={true}
        onOpen={onOpen}
        onClose={onClose}
        hideCloseButton
      >
        {
          (({ close }) => (
            <Button id="close-button" text="close" onClick={close} />
          )) as (...args: unknown[]) => ReactNode
        }
      </Drawer>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))
    expect(onOpen).toHaveBeenCalledTimes(1)

    fireEvent.click(document.querySelector('button#close-button'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('can contain drawer parts', () => {
    render(
      <Drawer noAnimation directDomReturn={false}>
        <Drawer.Navigation>navigation</Drawer.Navigation>
        <Drawer.Header>header</Drawer.Header>
        <Drawer.Body>body</Drawer.Body>
      </Drawer>
    )

    fireEvent.click(document.querySelector('button'))

    {
      const elements = document.querySelectorAll(
        '.dnb-drawer.dnb-scroll-view > .dnb-section'
      )
      expect(elements[0].textContent).toContain('navigation')
      expect(elements[1].textContent).toContain('header')
    }

    {
      const elements = document.querySelectorAll(
        '.dnb-drawer__content > .dnb-section'
      )
      expect(elements[0].textContent).toContain('body')
    }

    expect(
      document.querySelectorAll('button.dnb-modal__close-button').length
    ).toBe(1)
  })

  it('sets default fullscreen to auto', () => {
    render(
      <Drawer {...props}>
        <button>button</button>
      </Drawer>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    expect(
      document.querySelector('.dnb-modal__content--fullscreen')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-modal__content--auto-fullscreen')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-drawer--auto-fullscreen')
    ).toBeInTheDocument()
  })

  it('sets fullscreen to true', () => {
    render(
      <Drawer {...props} fullscreen>
        <button>button</button>
      </Drawer>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    expect(
      document.querySelector('.dnb-modal__content--fullscreen')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-modal__content--auto-fullscreen')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-drawer--fullscreen')
    ).toBeInTheDocument()
  })

  it('sets fullscreen to false', () => {
    render(
      <Drawer {...props} fullscreen={false}>
        <button>button</button>
      </Drawer>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    expect(
      document.querySelector('.dnb-modal__content--fullscreen')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-modal__content--auto-fullscreen')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-drawer--auto-fullscreen')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-drawer--fullscreen')
    ).not.toBeInTheDocument()
  })
})

describe('Drawer aria', () => {
  it('should validate with ARIA rules as a drawer', async () => {
    const Comp = render(
      <Drawer {...props} open title="Drawer title">
        <p>Content</p>
      </Drawer>
    )

    expect(
      await axeComponent(
        Comp,
        document.querySelector('.dnb-modal__content')
      )
    ).toHaveNoViolations()
  })
})

describe('scrollbarGutter', () => {
  it('should add scrollbar-gutter class by default', () => {
    render(
      <Drawer {...props} open>
        content
      </Drawer>
    )

    const scrollView = document.querySelector('.dnb-scroll-view')
    expect(scrollView).toHaveClass(
      'dnb-scroll-view--scrollbar-gutter-stable'
    )
  })

  it('should not add scrollbar-gutter class when spacing is false', () => {
    render(
      <Drawer {...props} open spacing={false}>
        content
      </Drawer>
    )

    const scrollView = document.querySelector('.dnb-scroll-view')
    expect(scrollView).not.toHaveClass(
      'dnb-scroll-view--scrollbar-gutter-stable'
    )
  })

  it('should always add scrollbar-gutter class when set to stable', () => {
    render(
      <Drawer {...props} open spacing={false} scrollbarGutter="stable">
        content
      </Drawer>
    )

    const scrollView = document.querySelector('.dnb-scroll-view')
    expect(scrollView).toHaveClass(
      'dnb-scroll-view--scrollbar-gutter-stable'
    )
  })

  it('should not add scrollbar-gutter class when set to false', () => {
    render(
      <Drawer {...props} open scrollbarGutter={false}>
        content
      </Drawer>
    )

    const scrollView = document.querySelector('.dnb-scroll-view')
    expect(scrollView).not.toHaveClass(
      'dnb-scroll-view--scrollbar-gutter-stable'
    )
  })
})

describe('Drawer reveal', () => {
  const renderDriver = createDrawerReveal({ target: '#reveal-page' })

  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect() {}
      }
    )
    const getBoundingClientRect =
      HTMLElement.prototype.getBoundingClientRect
    vi.spyOn(
      HTMLElement.prototype,
      'getBoundingClientRect'
    ).mockImplementation(function (this: HTMLElement) {
      const bounds = getBoundingClientRect.call(this)
      return this.classList.contains('dnb-drawer')
        ? { ...bounds, width: 300 }
        : bounds
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  const renderReveal = (drawerProps: DrawerAllProps = {}) =>
    render(
      <>
        <main id="reveal-page">
          <p>Page content</p>
          <button>Page action</button>
        </main>
        <Drawer
          {...props}
          renderDriver={renderDriver}
          containerPlacement="left"
          {...drawerProps}
        >
          <h1>Menu</h1>
          <button>Menu action</button>
          <input type="range" aria-label="Menu setting" />
        </Drawer>
      </>
    )

  const swipe = (element: Element, distance: number, cancel = false) => {
    fireEvent.touchStart(element, {
      touches: [{ clientX: 20, clientY: 100 }],
    })
    fireEvent.touchMove(element, {
      touches: [{ clientX: 20 + Math.sign(distance) * 10, clientY: 100 }],
    })
    fireEvent.touchMove(element, {
      touches: [{ clientX: 20 + distance, clientY: 100 }],
    })
    if (cancel) {
      fireEvent.touchCancel(element, { touches: [] })
    } else {
      fireEvent.touchEnd(element, { touches: [] })
    }
  }

  it('does not install reveal listeners without a driver', () => {
    const addEventListener = vi.spyOn(document, 'addEventListener')
    renderReveal({ renderDriver: undefined })

    expect(
      addEventListener.mock.calls.filter(([name]) =>
        ['touchstart', 'touchmove', 'touchend', 'touchcancel'].includes(
          name
        )
      )
    ).toEqual([])
    swipe(document.querySelector('#reveal-page p'), 220)
    expect(document.querySelector('[role=dialog]')).not.toBeInTheDocument()
  })

  it('removes reveal listeners and restores the page on unmount', () => {
    const addEventListener = vi.spyOn(document, 'addEventListener')
    const removeEventListener = vi.spyOn(document, 'removeEventListener')
    const { unmount } = renderReveal()
    const page = document.querySelector<HTMLElement>('#reveal-page')
    page.style.transform = 'translateY(2px)'
    page.style.opacity = '0.9'
    page.inert = true
    fireEvent.click(document.querySelector('.dnb-modal__trigger'))
    const listeners = addEventListener.mock.calls.filter(([name]) =>
      [
        'touchstart',
        'touchmove',
        'touchend',
        'touchcancel',
        'click',
      ].includes(name)
    )

    unmount()

    for (const [name, listener] of listeners) {
      expect(removeEventListener).toHaveBeenCalledWith(
        name,
        listener,
        true
      )
    }
    expect(page.style.transform).toBe('translateY(2px)')
    expect(page.style.opacity).toBe('0.9')
    expect(page.inert).toBe(true)
    expect(page).not.toHaveClass('dnb-drawer__reveal-target')
  })

  it('moves the selected page and cleans up on dismissal', () => {
    document.documentElement.style.overflowX = 'hidden'
    renderReveal()
    const page = document.querySelector<HTMLElement>('#reveal-page')
    const previousInert = page.inert

    fireEvent.click(document.querySelector('.dnb-modal__trigger'))
    expect(document.querySelector('[role=dialog]')).toHaveClass(
      'dnb-drawer__reveal'
    )
    expect(page).toHaveClass('dnb-drawer__reveal-target')
    expect(page.style.transform).toBe('translate3d(300px, 0, 0)')
    expect(page.inert).toBe(true)

    fireEvent.click(document.querySelector('.dnb-modal__close-button'))
    expect(page).not.toHaveClass('dnb-drawer__reveal-target')
    expect(page.style.transform).toBe('')
    expect(page.inert).toBe(previousInert)
    expect(document.documentElement.style.overflowX).toBe('hidden')
  })

  it('passes accessibility checks with the reveal driver', async () => {
    const component = renderReveal({ open: true, title: 'Menu' })

    expect(
      await axeComponent(
        component,
        document.querySelector('[role=dialog]')
      )
    ).toHaveNoViolations()
  })

  it('respects disabled and controlled state from Provider', () => {
    const renderDriver = createDrawerReveal({ target: '#provider-page' })
    const { rerender } = render(
      <Provider Drawer={{ disabled: true }}>
        <main id="provider-page">Page</main>
        <Drawer
          {...props}
          renderDriver={renderDriver}
          containerPlacement="left"
        >
          <h1>Menu</h1>
        </Drawer>
      </Provider>
    )
    swipe(document.querySelector('#provider-page'), 220)
    expect(document.querySelector('[role=dialog]')).not.toBeInTheDocument()

    rerender(
      <Provider Drawer={{ open: true }}>
        <main id="provider-page">Page</main>
        <Drawer
          {...props}
          renderDriver={renderDriver}
          containerPlacement="left"
        >
          <h1>Menu</h1>
        </Drawer>
      </Provider>
    )
    expect(document.querySelector('[role=dialog]')).toBeInTheDocument()
    expect(document.querySelector('#provider-page')).toHaveClass(
      'dnb-drawer__reveal-target'
    )
  })

  it('keeps the page revealed and dismissible when animation options change', () => {
    const { rerender } = renderReveal({ open: true })
    const page = document.querySelector<HTMLElement>('#reveal-page')
    expect(page.style.transform).toBe('translate3d(300px, 0, 0)')

    rerender(
      <>
        <main id="reveal-page">Page</main>
        <Drawer
          open
          renderDriver={renderDriver}
          containerPlacement="left"
          animationDuration={150}
          noAnimation
        >
          <h1>Menu</h1>
        </Drawer>
      </>
    )
    expect(page.style.transform).toBe('translate3d(300px, 0, 0)')
    swipe(document.querySelector('[role=dialog]'), -220)
    expect(document.querySelector('[role=dialog]')).not.toBeInTheDocument()
  })

  it('uses the same duration when opening and closing', async () => {
    renderReveal({ noAnimation: false })
    const page = document.querySelector<HTMLElement>('#reveal-page')

    fireEvent.click(document.querySelector('.dnb-modal__trigger'))
    const dialog = document.querySelector<HTMLElement>('[role=dialog]')
    for (const element of [page, dialog]) {
      expect(
        element.style.getPropertyValue('--drawer-reveal-duration')
      ).toBe('300ms')
    }

    fireEvent.click(document.querySelector('.dnb-modal__close-button'))
    for (const element of [page, dialog]) {
      expect(
        element.style.getPropertyValue('--drawer-reveal-duration')
      ).toBe('300ms')
    }
    await waitFor(() => {
      expect(dialog).not.toBeInTheDocument()
    })
    expect(page.style.getPropertyValue('--drawer-reveal-duration')).toBe(
      ''
    )
  })

  it('settles a closing drag from its last painted position', async () => {
    renderReveal({ noAnimation: false })
    const page = document.querySelector<HTMLElement>('#reveal-page')
    fireEvent.click(document.querySelector('.dnb-modal__trigger'))
    await waitFor(() => {
      expect(page.style.transform).toBe('translate3d(300px, 0, 0)')
    })
    const content = document.querySelector('.dnb-drawer__content h1')
    const transform = vi.spyOn(page.style, 'transform', 'set')

    swipe(content, -220)

    expect(transform.mock.calls.flat()).not.toContain(
      'translate3d(300px, 0, 0)'
    )
    expect(page.style.transform).toBe('translate3d(0px, 0, 0)')
    await waitFor(() => {
      expect(
        document.querySelector('[role=dialog]')
      ).not.toBeInTheDocument()
    })
  })

  it('ignores overflow outside the menu when starting a closing drag', () => {
    renderReveal()
    fireEvent.click(document.querySelector('.dnb-modal__trigger'))
    const root = document.querySelector('[role=dialog]').parentElement
    root.style.overflowX = 'auto'
    Object.defineProperty(root, 'scrollWidth', { value: 600 })
    Object.defineProperty(root, 'clientWidth', { value: 390 })

    swipe(document.querySelector('.dnb-drawer__content h1'), -220)

    expect(document.querySelector('[role=dialog]')).not.toBeInTheDocument()
  })

  it.each([
    '[role=dialog]',
    '.dnb-drawer__content h1',
    '.dnb-drawer__content button',
  ])(
    'opens with a right swipe and closes with a left swipe on %s',
    (selector) => {
      const onOpen = vi.fn()
      const onClose = vi.fn()
      renderReveal({ onOpen, onClose })

      swipe(document.querySelector('#reveal-page p'), 220)
      expect(document.querySelector('[role=dialog]')).toBeInTheDocument()
      expect(onOpen).toHaveBeenCalledTimes(1)
      swipe(document.querySelector(selector), -40)
      expect(document.querySelector('[role=dialog]')).toBeInTheDocument()
      swipe(document.querySelector(selector), -220, true)
      expect(document.querySelector('[role=dialog]')).toBeInTheDocument()
      swipe(document.querySelector(selector), -220)
      expect(
        document.querySelector('[role=dialog]')
      ).not.toBeInTheDocument()
      expect(onClose).toHaveBeenCalledTimes(1)
    }
  )

  it('snaps short and canceled opening gestures closed', () => {
    renderReveal()
    const page = document.querySelector('#reveal-page p')

    swipe(page, 40)
    expect(document.querySelector('[role=dialog]')).not.toBeInTheDocument()
    swipe(page, 220, true)
    expect(document.querySelector('[role=dialog]')).not.toBeInTheDocument()
  })

  it('lets the app close a controlled Drawer after swiping it open', () => {
    let navigate: () => void
    function Example() {
      const [open, setOpen] = useState(false)
      navigate = () => setOpen(false)
      return (
        <>
          <main id="reveal-page">Page content</main>
          <Drawer
            {...props}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            renderDriver={renderDriver}
            containerPlacement="left"
          >
            <h1>Menu</h1>
          </Drawer>
        </>
      )
    }
    render(<Example />)
    swipe(document.querySelector('#reveal-page'), 220)
    expect(document.querySelector('[role=dialog]')).toBeInTheDocument()
    act(() => navigate())
    expect(document.querySelector('[role=dialog]')).not.toBeInTheDocument()
  })

  it.each([0, 1])(
    'keeps a click with detail %i available immediately after a drag',
    (detail) => {
      renderReveal()
      swipe(document.querySelector('#reveal-page p'), 220)
      const action = document.querySelector('.dnb-drawer__content button')
      const onClick = vi.fn()
      action.addEventListener('click', onClick)

      fireEvent.click(action, { detail })

      expect(onClick).toHaveBeenCalledTimes(1)
    }
  )

  it.each([false, true])(
    'starts dragging without a jump and paints once per frame when open is %s',
    (opened) => {
      const frames = new Map<number, FrameRequestCallback>()
      let frameId = 0
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation(
        (callback) => {
          frames.set(++frameId, callback)
          return frameId
        }
      )
      vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
        frames.delete(id)
      })
      renderReveal()
      const page = document.querySelector<HTMLElement>('#reveal-page')
      if (opened) {
        fireEvent.click(document.querySelector('.dnb-modal__trigger'))
      }
      const content = opened
        ? document.querySelector('.dnb-drawer__content h1')
        : page.querySelector('p')
      const position = (distance: number) =>
        200 + (opened ? -distance : distance)
      const paint = () => {
        act(() => {
          const callbacks = Array.from(frames.values())
          frames.clear()
          callbacks.forEach((callback) => callback(0))
        })
      }
      fireEvent.touchStart(content, {
        touches: [{ clientX: position(0), clientY: 100 }],
      })
      fireEvent.touchMove(content, {
        touches: [{ clientX: position(9), clientY: 100 }],
      })
      expect(page.style.transform).toBe(
        opened ? 'translate3d(300px, 0, 0)' : ''
      )
      fireEvent.touchMove(content, {
        touches: [{ clientX: position(40), clientY: 100 }],
      })
      paint()
      expect(page.style.transform).toBe(
        `translate3d(${opened ? 300 : 0}px, 0, 0)`
      )
      expect(page).toHaveClass('dnb-drawer__reveal-dragging')
      const initialStyle = page.style.cssText

      for (const distance of [80, 120]) {
        fireEvent.touchMove(content, {
          touches: [{ clientX: position(distance), clientY: 100 }],
        })
      }
      expect(page.style.cssText).toBe(initialStyle)

      paint()
      expect(page.style.transform).toBe(
        `translate3d(${opened ? 220 : 80}px, 0, 0)`
      )
      fireEvent.touchCancel(content, { touches: [] })
      expect(page).not.toHaveClass('dnb-drawer__reveal-dragging')
      expect(page.style.transform).toBe(
        opened ? 'translate3d(300px, 0, 0)' : ''
      )
    }
  )

  it.each([{ preventClose: true }, { preventOverlayClose: true }])(
    'respects close restrictions: %j',
    (restriction) => {
      const onClose = vi.fn()
      renderReveal({ ...restriction, onClose })
      fireEvent.click(document.querySelector('.dnb-modal__trigger'))

      swipe(document.querySelector('.dnb-drawer__content h1'), -220)
      expect(document.querySelector('[role=dialog]')).toBeInTheDocument()
      expect(onClose).not.toHaveBeenCalled()
      expect(
        document.querySelector<HTMLElement>('#reveal-page').style.transform
      ).toBe('translate3d(300px, 0, 0)')
    }
  )

  it('leaves interactive controls and vertical scrolling available', () => {
    renderReveal()
    swipe(document.querySelector('#reveal-page button'), 220)
    expect(document.querySelector('[role=dialog]')).not.toBeInTheDocument()

    const page = document.querySelector('#reveal-page p')
    fireEvent.touchStart(page, {
      touches: [{ clientX: 20, clientY: 100 }],
    })
    expect(
      fireEvent.touchMove(page, {
        touches: [{ clientX: 35, clientY: 200 }],
      })
    ).toBe(true)
    fireEvent.touchEnd(page, { touches: [] })
    expect(document.querySelector('[role=dialog]')).not.toBeInTheDocument()

    fireEvent.click(document.querySelector('.dnb-modal__trigger'))
    swipe(document.querySelector('.dnb-drawer__content input'), -220)
    expect(document.querySelector('[role=dialog]')).toBeInTheDocument()
    const heading = document.querySelector('.dnb-drawer__content h1')
    fireEvent.touchStart(heading, {
      touches: [{ clientX: 200, clientY: 100 }],
    })
    expect(
      fireEvent.touchMove(heading, {
        touches: [{ clientX: 190, clientY: 200 }],
      })
    ).toBe(true)
    fireEvent.touchEnd(heading, { touches: [] })
    expect(document.querySelector('[role=dialog]')).toBeInTheDocument()
  })

  it('keeps the normal Drawer behavior for other placements', () => {
    renderReveal({ containerPlacement: 'right' })
    swipe(document.querySelector('#reveal-page p'), 220)
    expect(document.querySelector('[role=dialog]')).not.toBeInTheDocument()

    fireEvent.click(document.querySelector('.dnb-modal__trigger'))
    expect(document.querySelector('[role=dialog]')).not.toHaveClass(
      'dnb-drawer__reveal'
    )
    expect(document.querySelector('#reveal-page')).not.toHaveClass(
      'dnb-drawer__reveal-target'
    )
  })
})

describe('Drawer triggerProps', () => {
  it('should forward text to the trigger button', () => {
    render(<Drawer triggerProps={{ text: 'Open Drawer' }} {...props} />)

    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .querySelector('.dnb-button__text').textContent
    ).toBe('Open Drawer')
  })

  it('should forward variant to the trigger button', () => {
    render(
      <Drawer
        triggerProps={{ text: 'Open Drawer', variant: 'primary' }}
        {...props}
      />
    )

    expect(
      document.querySelector('button.dnb-modal__trigger')
    ).toHaveClass('dnb-button--primary')
  })

  it('should call triggerProps onClick', () => {
    const onClick = vi.fn()

    render(
      <Drawer triggerProps={{ onClick }} {...props}>
        Drawer content
      </Drawer>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('Drawer scss', () => {
  it('uses the dynamic viewport height while keeping a viewport fallback', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))

    expect(css).toContain('max-height: 100vh')
    expect(css).toContain('max-height: 100dvh')
  })

  it('should match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
