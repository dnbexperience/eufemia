import React from 'react'
import Drawer from '../Drawer'
import Button from '../../button/Button'
import Provider from '../../../shared/Provider'

import {
  mount,
  fakeProps,
  toJson,
  loadScss,
  axeComponent,
} from '../../../core/jest/jestSetup'
import { render, fireEvent } from '@testing-library/react'

const props = fakeProps(require.resolve('../Drawer.tsx'), {
  all: true,
  // optional: true, // Does not work with Typescript interface props
})
props.title = 'drawer_title'
props.id = 'drawer_id'
props.contentId = null
props.modalContent = 'unique_modal_content'
props.directDomReturn = true
props.noAnimation = true

beforeAll(() => {
  const button = document.createElement('BUTTON')
  document.body.appendChild(button)
})

beforeEach(() => {
  document.body.innerHTML = ''
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
    ).toBeTruthy()
  })

  it('omits trigger button once we set omitTriggerButton', () => {
    render(<Drawer {...props} omitTriggerButton />)

    expect(document.querySelector('button.dnb-modal__trigger')).toBeFalsy()
  })

  it('will close by using callback method', () => {
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
          <Button id="close-me" text="close" on_click={close} />
        )}
      </Drawer>
    )

    fireEvent.click(document.querySelector('button'))
    expect(on_open).toHaveBeenCalledTimes(1)

    fireEvent.click(document.querySelector('button#close-me'))
    expect(on_close).toHaveBeenCalledTimes(1)
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

    const props = {
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

  it('is closed by keyboardevent esc by window listener', () => {
    const on_close = jest.fn()

    const props = {
      directDomReturn: false,
      noAnimation: true,
    }
    render(<Drawer {...props} id="modal-drawer" onClose={on_close} />)

    fireEvent.click(document.querySelector('button#modal-drawer'))
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))

    expect(on_close).toHaveBeenCalledTimes(1)
  })

  it('has support for nested Drawers', () => {
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

    const props = {
      directDomReturn: false,
      noAnimation: true,
    }

    render(
      <Drawer
        {...props}
        id="modal-first"
        onOpen={on_open.first}
        onClose={on_close.first}
      >
        <button id="content-first">first</button>
        <Drawer
          {...props}
          id="modal-second"
          onOpen={on_open.second}
          onClose={on_close.second}
        >
          <button id="content-second">second</button>
          <Drawer
            {...props}
            id="modal-third"
            onOpen={on_open.third}
            onClose={on_close.third}
          >
            <button id="content-third">third</button>
          </Drawer>
        </Drawer>
      </Drawer>
    )

    expect(document.querySelector('#content-third')).toBeFalsy()

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
    expect(
      document.querySelector('#content-first').hasAttribute('aria-hidden')
    ).toBe(true)
    expect(
      document.querySelector('#content-second').hasAttribute('aria-hidden')
    ).toBe(true)
    expect(
      document.querySelector('#content-third').hasAttribute('aria-hidden')
    ).toBe(false)

    expect(
      document
        .querySelectorAll('button.dnb-modal__close-button')[0]
        .hasAttribute('aria-hidden')
    ).toBe(true)
    expect(
      document
        .querySelectorAll('button.dnb-modal__close-button')[0]
        .hasAttribute('aria-hidden')
    ).toBe(true)
    expect(
      document
        .querySelectorAll('button.dnb-modal__close-button')[1]
        .hasAttribute('aria-hidden')
    ).toBe(true)
    expect(
      document
        .querySelectorAll('button.dnb-modal__close-button')[2]
        .hasAttribute('aria-hidden')
    ).toBe(false)

    // Close the third one
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    expect(on_close.first).toHaveBeenCalledTimes(0)
    expect(on_close.second).toHaveBeenCalledTimes(0)
    expect(on_close.third).toHaveBeenCalledTimes(1)

    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-second')
    expect(document.querySelector('#content-third')).toBeFalsy()
    expect(
      document.querySelector('#content-second').hasAttribute('aria-hidden')
    ).toBe(false)
    expect(
      document
        .querySelectorAll('button.dnb-modal__close-button')[0]
        .hasAttribute('aria-hidden')
    ).toBe(true)
    expect(
      document
        .querySelectorAll('button.dnb-modal__close-button')[1]
        .hasAttribute('aria-hidden')
    ).toBe(false)

    // Close the second one
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    expect(on_close.first).toHaveBeenCalledTimes(0)
    expect(on_close.second).toHaveBeenCalledTimes(1)
    expect(on_close.third).toHaveBeenCalledTimes(1)

    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-first')
    expect(document.querySelector('#content-second')).toBeFalsy()
    expect(
      document.querySelector('#content-first').hasAttribute('aria-hidden')
    ).toBe(false)
    expect(
      document
        .querySelectorAll('button.dnb-modal__close-button')[0]
        .hasAttribute('aria-hidden')
    ).toBe(false)

    // Close the first one
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    expect(on_close.first).toHaveBeenCalledTimes(1)
    expect(on_close.second).toHaveBeenCalledTimes(1)
    expect(on_close.third).toHaveBeenCalledTimes(1)

    expect(document.querySelector('#content-first')).toBeFalsy()
    expect(
      document.documentElement.hasAttribute('data-dnb-modal-active')
    ).toBe(false)
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

describe('Drawer component snapshot', () => {
  it('should match component snapshot', () => {
    const Comp = mount(<Drawer {...props} openState={true} />)
    expect(toJson(Comp)).toMatchSnapshot()
    Comp.find('button.dnb-modal__close-button').simulate('click')
  })
})
describe('Drawer aria', () => {
  it('should validate with ARIA rules as a drawer', async () => {
    const Comp = render(<Drawer {...props} openState={true} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Drawer scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
})
