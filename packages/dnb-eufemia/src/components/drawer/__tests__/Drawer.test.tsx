import React from 'react'
import Drawer, { DrawerAllProps } from '../Drawer'
import Button from '../../button/Button'
import Provider from '../../../shared/Provider'

import { loadScss, axeComponent } from '../../../core/jest/jestSetup'
import { render, fireEvent, waitFor } from '@testing-library/react'

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

  it('appears on trigger click', () => {
    render(
      <Drawer {...props}>
        <button>button</button>
      </Drawer>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    expect(
      document.querySelector('button.dnb-modal__close-button')
    ).toBeInTheDocument()
  })

  it('omits trigger button once we set omitTriggerButton', () => {
    render(<Drawer {...props} omitTriggerButton />)

    expect(
      document.querySelector('button.dnb-modal__trigger')
    ).not.toBeInTheDocument()
  })

  it('will close by using callback method', async () => {
    const on_close = jest.fn()
    const on_open = jest.fn()
    render(
      <Drawer
        noAnimation={true}
        onOpen={on_open}
        onClose={on_close}
        hideCloseButton
      >
        {({ close }) => (
          <>
            <h1>title</h1>
            <Button id="close-me" text="close" on_click={close} />
          </>
        )}
      </Drawer>
    )

    fireEvent.click(document.querySelector('button'))
    await waitFor(() => {
      expect(on_open).toHaveBeenCalledTimes(1)
    })

    fireEvent.click(document.querySelector('button#close-me'))
    await waitFor(() => {
      expect(on_close).toHaveBeenCalledTimes(1)
    })
  })

  it('will render Navigation, Header and Body even when hideCloseButton is true', async () => {
    const on_close = jest.fn()
    const on_open = jest.fn()

    render(
      <Drawer
        noAnimation={true}
        onOpen={on_open}
        onClose={on_close}
        hideCloseButton
      >
        {({ close }) => (
          <>
            <Drawer.Navigation>Drawer.Navigation</Drawer.Navigation>
            <Drawer.Header>
              <h1>Drawer.Header</h1>
              <Button id="close-me" on_click={close} />
            </Drawer.Header>
            <Drawer.Body>Drawer.Body</Drawer.Body>
          </>
        )}
      </Drawer>
    )

    fireEvent.click(document.querySelector('button'))
    await waitFor(() => {
      expect(on_open).toHaveBeenCalledTimes(1)
    })

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
    await waitFor(() => {
      expect(on_close).toHaveBeenCalledTimes(1)
    })
  })

  it('sends along closeButtonAttributes to close button', () => {
    render(
      <Drawer
        openState
        noAnimation
        closeButtonAttributes={{ text: 'Custom text' }}
      >
        Content
      </Drawer>
    )

    expect(document.querySelectorAll('.dnb-drawer button')).toHaveLength(1)
    expect(document.querySelector('.dnb-drawer button').textContent).toBe(
      '‌Custom text'
    )
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
    const on_close = jest.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )

    const props: DrawerAllProps = {
      directDomReturn: false,
      noAnimation: true,
    }
    render(<Drawer {...props} id="modal-drawer" onClose={on_close} />)

    fireEvent.click(document.querySelector('button#modal-drawer'))
    fireEvent.keyDown(document.querySelector('div.dnb-drawer'), {
      key: 'Esc',
      keyCode: 27,
    })

    expect(on_close).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe('keyboard')
  })

  it('is closed by keyboardevent esc by window listener', async () => {
    const on_close = jest.fn()

    const props: DrawerAllProps = {
      directDomReturn: false,
      noAnimation: true,
    }
    render(<Drawer {...props} id="modal-drawer" onClose={on_close} />)

    fireEvent.click(document.querySelector('button#modal-drawer'))
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    await waitFor(() => {
      expect(on_close).toHaveBeenCalledTimes(1)
    })
  })

  it('has support for nested Drawers', async () => {
    const on_open = {
      first: jest.fn(),
      second: jest.fn(),
      third: jest.fn(),
    }
    const on_close = {
      first: jest.fn(),
      second: jest.fn(),
      third: jest.fn(),
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
        onOpen={on_open.first}
        onClose={on_close.first}
      >
        <button id="content-first">first</button>
        <Drawer
          {...props}
          id="modal-second"
          title="modal-second"
          onOpen={on_open.second}
          onClose={on_close.second}
        >
          <button id="content-second">second</button>
          <Drawer
            {...props}
            id="modal-third"
            title="modal-third"
            onOpen={on_open.third}
            onClose={on_close.third}
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

    expect(on_open.first).toHaveBeenCalledTimes(1)
    expect(on_open.second).toHaveBeenCalledTimes(1)
    expect(on_open.third).toHaveBeenCalledTimes(1)

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
      document.querySelectorAll('button.dnb-modal__close-button')[0]
    ).toHaveAttribute('aria-hidden')
    expect(
      document.querySelectorAll('button.dnb-modal__close-button')[0]
    ).toHaveAttribute('aria-hidden')
    expect(
      document.querySelectorAll('button.dnb-modal__close-button')[1]
    ).toHaveAttribute('aria-hidden')
    expect(
      document.querySelectorAll('button.dnb-modal__close-button')[2]
    ).not.toHaveAttribute('aria-hidden')

    // Close the third one
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    await waitFor(() => {
      expect(on_close.first).toHaveBeenCalledTimes(0)
      expect(on_close.second).toHaveBeenCalledTimes(0)
      expect(on_close.third).toHaveBeenCalledTimes(1)
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
      document.querySelectorAll('button.dnb-modal__close-button')[0]
    ).toHaveAttribute('aria-hidden')
    expect(
      document.querySelectorAll('button.dnb-modal__close-button')[1]
    ).not.toHaveAttribute('aria-hidden')

    // Close the second one
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    await waitFor(() => {
      expect(on_close.first).toHaveBeenCalledTimes(0)
      expect(on_close.second).toHaveBeenCalledTimes(1)
      expect(on_close.third).toHaveBeenCalledTimes(1)
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
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    await waitFor(() => {
      expect(on_close.first).toHaveBeenCalledTimes(1)
      expect(on_close.second).toHaveBeenCalledTimes(1)
      expect(on_close.third).toHaveBeenCalledTimes(1)
    })

    expect(
      document.querySelector('#content-first')
    ).not.toBeInTheDocument()
    expect(document.documentElement).not.toHaveAttribute(
      'data-dnb-modal-active'
    )
  })

  it('will accept custom refs', () => {
    const contentRef = React.createRef<HTMLElement>()
    const scrollRef = React.createRef<HTMLElement>()

    const MockComponent = () => {
      return (
        <Drawer
          openState
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
    const onClose = jest.fn()
    const onOpen = jest.fn()

    render(
      <Drawer
        noAnimation={true}
        onOpen={onOpen}
        onClose={onClose}
        hideCloseButton
      >
        {({ close }) => (
          <Button id="close-button" text="close" on_click={close} />
        )}
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
})

describe('Drawer aria', () => {
  it('should validate with ARIA rules as a drawer', async () => {
    const Comp = render(
      <Drawer {...props} openState={true} title="title" />
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Drawer scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
