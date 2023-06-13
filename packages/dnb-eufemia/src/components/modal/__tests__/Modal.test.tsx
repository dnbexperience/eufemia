/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  axeComponent,
  loadScss,
} from '../../../core/jest/jestSetup'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Input from '../../input/Input'
import Component, { OriginalComponent } from '../Modal'
import Button from '../../button/Button'
import DialogContent from '../../dialog/DialogContent'
import Provider from '../../../shared/Provider'
import * as helpers from '../../../shared/helpers'

global.userAgent = jest.spyOn(navigator, 'userAgent', 'get')
global.appVersion = jest.spyOn(navigator, 'appVersion', 'get')

const props = fakeProps(require.resolve('../Modal.tsx'), {
  all: true,
  // optional: true, // Does not work with Typescript interface props
})
props.title = 'modal_title'
props.id = 'modal_id'
props.content_id = null
props.style_type = 'button'
props.modal_content = 'unique_modal_content'
props.direct_dom_return = true
props.no_animation = true

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

describe('Modal component', () => {
  it('have to match snapshot', () => {
    const Comp = mount(<Component {...props} open_state={true} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should add its instance to the stack', () => {
    render(
      <Component {...props}>
        <DialogContent />
      </Component>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    expect(window.__modalStack).toHaveLength(1)
    expect(typeof window.__modalStack[0]).toBe('object')

    fireEvent.click(
      document.querySelector('button.dnb-modal__close-button')
    )

    expect(window.__modalStack).toHaveLength(0)
  })

  it('should have aria-hidden and tabindex on other elements', () => {
    render(
      <>
        <button className="bypass-me">button</button>
        <Component no_animation>
          <DialogContent>
            <button className="but-not-me">button</button>
          </DialogContent>
        </Component>
      </>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    // Check the global button
    expect(
      document.querySelector('button.bypass-me') instanceof HTMLElement
    ).toBe(true)
    expect(
      document
        .querySelector('button.bypass-me')
        .hasAttribute('aria-hidden')
    ).toBe(true)
    expect(
      document.querySelector('button.bypass-me').getAttribute('tabindex')
    ).toBe('-1')
    expect(
      document
        .querySelector('.dnb-modal__content')
        .hasAttribute('aria-hidden')
    ).toBe(false)
    expect(
      document
        .querySelector('.dnb-modal__content')
        .querySelector('button.but-not-me')
        .hasAttribute('aria-hidden')
    ).toBe(false)

    // And close it again

    fireEvent.click(
      document.querySelector('button.dnb-modal__close-button')
    )
    expect(
      document
        .querySelector('button.bypass-me')
        .hasAttribute('aria-hidden')
    ).toBe(false)
    expect(
      document.querySelector('button.bypass-me').hasAttribute('tabindex')
    ).toBe(false)
  })

  it('should bypass elements defined in bypass_invalidation_selectors', () => {
    render(
      <>
        <button className="bypass-me">button</button>
        <button className="but-not-me">button</button>
        <Component
          no_animation
          bypassInvalidationSelectors={['.bypass-me']}
        >
          content
        </Component>
      </>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))
    expect(
      document
        .querySelector('button.bypass-me')
        .hasAttribute('aria-hidden')
    ).toBe(false)
    expect(
      document.querySelector('button.bypass-me').hasAttribute('tabindex')
    ).toBe(false)

    expect(
      document
        .querySelector('button.but-not-me')
        .getAttribute('aria-hidden')
    ).toBe('true')
    expect(
      document.querySelector('button.but-not-me').getAttribute('tabindex')
    ).toBe('-1')
  })

  it('has to have the correct title', () => {
    render(
      <Component {...props} open_state={true}>
        <Component.Header />
      </Component>
    )
    expect(document.querySelector('h1').textContent).toBe(props.title)
  })

  it('accepts custom refs', () => {
    const contentRef = React.createRef<HTMLElement>()
    const scrollRef = React.createRef<HTMLElement>()

    const MockComponent = () => {
      return (
        <Component
          openState
          noAnimation
          contentRef={contentRef}
          scrollRef={scrollRef}
        >
          content
        </Component>
      )
    }

    render(<MockComponent />)

    expect(contentRef.current).toEqual(null)
    expect(scrollRef.current).toEqual(null)
  })

  it('has no trigger button once we set omitTriggerButton', () => {
    const { rerender } = render(<Component {...props} />)
    rerender(<Component {...props} omitTriggerButton={true} />)
    expect(document.querySelector('button.dnb-modal__trigger')).toBeFalsy()

    rerender(<Component {...props} omitTriggerButton={false} />)
    expect(
      document.querySelector('button.dnb-modal__trigger')
    ).toBeTruthy()
  })

  it('should act as a help button by default', () => {
    render(
      <Input
        suffix={
          <Component title={props.title}>
            <Component.Header />
          </Component>
        }
      />
    )
    const buttonElem = document.querySelector('button.dnb-modal__trigger')
    expect(buttonElem.getAttribute('aria-label')).toBe(props.title)
    expect(buttonElem.getAttribute('aria-roledescription')).toBe(
      'Hjelp-knapp'
    )
    fireEvent.click(document.querySelector('button'))
    expect(document.querySelector('.dnb-modal__title').textContent).toBe(
      props.title
    )
  })

  it('should use default modal title when used as a help button', () => {
    render(
      <Input
        suffix={
          <Component>
            <Component.Header />
          </Component>
        }
      />
    )
    const buttonElem = document.querySelector('button.dnb-modal__trigger')
    expect(buttonElem.getAttribute('aria-label')).toBe('Hjelpetekst')
    fireEvent.click(document.querySelector('button'))
    expect(document.querySelector('.dnb-modal__title').textContent).toBe(
      'Hjelpetekst'
    )
  })

  it('has a disabled trigger button once we set trigger disabled to true', () => {
    const { rerender } = render(<Component {...props} open_state={true} />)
    rerender(
      <Component
        {...props}
        open_state={true}
        trigger_attributes={{ disabled: true }}
      />
    )
    expect(
      document
        .querySelector('button.dnb-modal__trigger')

        .hasAttribute('disabled')
    ).toBe(true)
  })

  it('has working open event and close event if "Esc" key gets pressed', () => {
    let testTriggeredBy = null
    const on_close = jest.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )
    const on_open = jest.fn()
    render(<Component {...props} on_close={on_close} on_open={on_open} />)
    fireEvent.click(document.querySelector('button'))
    expect(on_open).toHaveBeenCalledTimes(1)
    expect(on_open).toHaveBeenCalledWith({
      id: 'modal_id',
    })
    expect(testTriggeredBy).toBe(null)

    fireEvent.click(document.querySelector('button'))
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    expect(on_close).toHaveBeenCalledTimes(1)
  })

  it('will close modal by using callback method', () => {
    const on_close = jest.fn()
    const on_open = jest.fn()

    render(
      <Component
        no_animation={true}
        on_open={on_open}
        on_close={on_close}
        hide_close_button
      >
        {({ close }) => {
          return <Button id="close-button" text="close" on_click={close} />
        }}
      </Component>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))
    expect(on_open).toHaveBeenCalledTimes(1)

    fireEvent.click(document.querySelector('button#close-button'))
    expect(on_close).toHaveBeenCalledTimes(1)
  })

  it('will set focus on content div if no h1 and close button is given', async () => {
    render(
      <Component no_animation={true} hide_close_button>
        <DialogContent />
      </Component>
    )
    fireEvent.click(document.querySelector('button'))
    await wait(2)

    // and check the class of that element
    expect(
      document.activeElement.classList.contains('dnb-dialog__inner')
    ).toBe(true)

    fireEvent.keyDown(document.querySelector('div.dnb-dialog'), {
      key: 'Esc',
      keyCode: 27,
    })

    // and check the class of that element
    expect(
      document.activeElement.classList.contains('dnb-modal__trigger')
    ).toBe(true)
  })

  it('will set "data-autofocus" attribute on focusing the trigger when closed', async () => {
    render(
      <Component no_animation={true} animation_duration={3}>
        <DialogContent />
      </Component>
    )

    fireEvent.click(document.querySelector('button'))

    fireEvent.keyDown(document.querySelector('div.dnb-dialog'), {
      key: 'Esc',
      keyCode: 27,
    })

    expect(document.activeElement.getAttribute('data-autofocus')).toBe(
      'true'
    )
    expect(
      document.activeElement.classList.contains('dnb-modal__trigger')
    ).toBe(true)

    await wait(1)

    expect(
      document.activeElement.hasAttribute('data-autofocus')
    ).toBeFalsy()
  })

  it('will warn if first heading is not h1', async () => {
    jest.spyOn(helpers, 'warn')
    const log = global.console.log
    global.console.log = jest.fn()

    const H2 = <h2 className="custom-h2">h2</h2>

    render(
      <Component no_animation={true}>
        <DialogContent>
          <Component.Header>{H2}</Component.Header>
        </DialogContent>
      </Component>
    )

    // open
    await waitFor(() => fireEvent.click(document.querySelector('button')))

    expect(helpers.warn).toHaveBeenCalledTimes(1)
    expect(helpers.warn).toHaveBeenCalledWith(
      'A Dialog or Drawer needs a h1 as its first element!'
    )

    global.console.log = log
  })

  it('will only use one heading if a custom one is given', () => {
    render(
      <Component no_animation={true} title="original title">
        <Component.Header>
          <div>
            <h1>custom heading</h1>
          </div>
        </Component.Header>
      </Component>
    )
    fireEvent.click(document.querySelector('button'))

    expect(document.querySelectorAll('h1')).toHaveLength(1)
    expect(document.querySelector('h1').textContent).toBe('custom heading')
  })

  it('will provide custom bar, header and content if given', () => {
    render(
      <Component no_animation={true} direct_dom_return>
        <DialogContent>
          <Component.Bar>bar content</Component.Bar>
          <Component.Header>header content</Component.Header>
          <Component.Content>modal content</Component.Content>
        </DialogContent>
      </Component>
    )
    fireEvent.click(document.querySelector('button'))

    const elements = document.querySelectorAll(
      '.dnb-dialog__content > .dnb-section'
    )

    expect(elements[0].textContent).toContain('bar content')
    expect(elements[1].textContent).toContain('header content')
    expect(elements[2].textContent).toContain('modal content')
  })

  it('has support for nested modals', () => {
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
      direct_dom_return: false,
      no_animation: true,
    }

    render(
      <Component
        {...props}
        id="modal-first"
        on_open={on_open.first}
        on_close={on_close.first}
      >
        <DialogContent>
          <button id="content-first">content</button>
        </DialogContent>
        <Component
          {...props}
          id="modal-second"
          on_open={on_open.second}
          on_close={on_close.second}
        >
          <DialogContent>
            <button id="content-second">content</button>
          </DialogContent>
          <Component
            {...props}
            id="modal-third"
            on_open={on_open.third}
            on_close={on_close.third}
          >
            <DialogContent>
              <button id="content-third">content</button>
            </DialogContent>
          </Component>
        </Component>
      </Component>
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
      document
        .querySelector('#content-first')

        .hasAttribute('aria-hidden')
    ).toBe(true)
    expect(
      document
        .querySelector('#content-second')

        .hasAttribute('aria-hidden')
    ).toBe(true)
    expect(
      document
        .querySelector('#content-third')

        .hasAttribute('aria-hidden')
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
    ).toBe(true)
    expect(
      document
        .querySelectorAll('button.dnb-modal__close-button')[2]
        .hasAttribute('aria-hidden')
    ).toBe(false)

    // Close the third one
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    // Comp.update()
    expect(on_close.first).toHaveBeenCalledTimes(0)
    expect(on_close.second).toHaveBeenCalledTimes(0)
    expect(on_close.third).toHaveBeenCalledTimes(1)

    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-second')
    expect(document.querySelector('#content-third')).toBeFalsy()
    expect(
      document
        .querySelector('#content-second')

        .hasAttribute('aria-hidden')
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
    // Comp.update()
    expect(on_close.first).toHaveBeenCalledTimes(0)
    expect(on_close.second).toHaveBeenCalledTimes(1)
    expect(on_close.third).toHaveBeenCalledTimes(1)

    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-first')
    expect(document.querySelector('#content-second')).toBeFalsy()
    expect(
      document
        .querySelector('#content-first')

        .hasAttribute('aria-hidden')
    ).toBe(false)
    expect(
      document
        .querySelectorAll('button.dnb-modal__close-button')[0]
        .hasAttribute('aria-hidden')
    ).toBe(false)

    // Close the first one
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    // Comp.update()
    expect(on_close.first).toHaveBeenCalledTimes(1)
    expect(on_close.second).toHaveBeenCalledTimes(1)
    expect(on_close.third).toHaveBeenCalledTimes(1)

    expect(document.querySelector('#content-first')).toBeFalsy()
    expect(
      document.documentElement.hasAttribute('data-dnb-modal-active')
    ).toBe(false)
  })

  it('will remove HTML attributes on unmount when open_state is used', () => {
    const HandleState = () => {
      const [open, toggle] = React.useState(false)
      return (
        <>
          <button id="toggle" onClick={() => toggle((s) => !s)}>
            toggle
          </button>
          <Component
            no_animation
            id="modal-id"
            open_state={open}
            trigger_attributes={{ hidden: true }}
          >
            content
          </Component>
        </>
      )
    }

    render(<HandleState />)

    expect(
      document.documentElement.hasAttribute('data-dnb-modal-active')
    ).toBe(false)

    fireEvent.click(document.querySelector('button#toggle'))

    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-id')

    fireEvent.click(document.querySelector('button#toggle'))

    expect(
      document.documentElement.hasAttribute('data-dnb-modal-active')
    ).toBe(false)
  })

  it('will animate when open_state is used', async () => {
    const on_open = jest.fn()
    const on_close = jest.fn()

    const HandleState = () => {
      const [open, toggle] = React.useState(false)
      return (
        <>
          <button id="toggle" onClick={() => toggle((s) => !s)}>
            toggle
          </button>
          <Component
            id="modal-id"
            open_delay={2}
            animation_duration={2}
            open_state={open}
            on_open={on_open}
            on_close={on_close}
            trigger_attributes={{ hidden: true }}
          >
            content
          </Component>
        </>
      )
    }

    render(<HandleState />)

    fireEvent.click(document.querySelector('button#toggle'))

    await wait(3)

    expect(on_open).toBeCalledTimes(1)

    fireEvent.click(document.querySelector('button#toggle'))

    await wait(10)

    expect(on_close).toBeCalledTimes(1)
  })

  it('will prevent closing the modal on prevent_close', () => {
    let preventClose = true
    let testTriggeredBy = null
    const on_close = jest.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )
    const on_open = jest.fn()
    const on_close_prevent = jest.fn(({ triggeredBy, close }) => {
      if (preventClose) {
        return
      }
      switch (triggeredBy) {
        case 'keyboard':
        case 'button':
          close()
          break
        case 'overlay':
          break
      }

      return { triggeredBy }
    })
    render(
      <Component
        {...props}
        prevent_close
        on_open={on_open}
        on_close={on_close}
        on_close_prevent={on_close_prevent}
      >
        <DialogContent />
      </Component>
    )
    fireEvent.click(document.querySelector('button'))
    expect(on_open).toHaveBeenCalledTimes(1)

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'esc',
        keyCode: 27, // esc
      })
    )

    expect(on_close).not.toHaveBeenCalled()
    expect(on_close_prevent).toHaveBeenCalledTimes(1)

    // trigger the close on the overlay
    fireEvent.mouseDown(document.querySelector('div.dnb-modal__content'))
    fireEvent.click(document.querySelector('div.dnb-modal__content'))

    expect(on_close_prevent).toHaveBeenCalledTimes(2)
    expect(on_close_prevent.mock.calls[1][0].close).toBeType('function')
    expect(on_close_prevent.mock.calls[1][0].triggeredBy).toBe('overlay')
    expect(testTriggeredBy).toBe(null)

    // trigger the close button
    fireEvent.click(
      document.querySelector('button.dnb-modal__close-button')
    )

    expect(on_close_prevent).toHaveBeenCalledTimes(3)
    expect(on_close_prevent.mock.calls[2][0].triggeredBy).toBe('button')

    // trigger the esc key
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'esc',
        keyCode: 27, // esc
      })
    )

    expect(on_close_prevent).toHaveBeenCalledTimes(4)
    expect(on_close_prevent.mock.calls[3][0].triggeredBy).toBe('keyboard')

    preventClose = false

    // trigger the close on the overlay
    fireEvent.mouseDown(document.querySelector('div.dnb-modal__content'))
    fireEvent.click(document.querySelector('div.dnb-modal__content'))

    expect(document.querySelector('div.dnb-modal__content')).toBeTruthy()

    // trigger the close button
    fireEvent.click(
      document.querySelector('button.dnb-modal__close-button')
    )

    expect(testTriggeredBy).toBe('button')
    expect(document.querySelector('div.dnb-modal__content')).toBeFalsy()
  })

  it('will close the modal on overlay click', () => {
    let testTriggeredBy = null
    const on_close = jest.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )
    const on_open = jest.fn()
    render(<Component {...props} on_open={on_open} on_close={on_close} />)
    fireEvent.click(document.querySelector('button'))
    expect(on_open).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe(null)

    // trigger the close on the overlay
    fireEvent.mouseDown(document.querySelector('div.dnb-modal__content'))
    fireEvent.click(document.querySelector('div.dnb-modal__content'))

    expect(on_close).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe('overlay')
    expect(document.querySelector('div.dnb-modal__content')).toBeFalsy()
  })

  it('will omit close when no mousedown was fired', () => {
    const on_close = jest.fn()
    render(<Component {...props} on_close={on_close} />)
    fireEvent.click(document.querySelector('button'))

    // trigger the close on the overlay
    fireEvent.click(document.querySelector('div.dnb-modal__content'))

    expect(on_close).toHaveBeenCalledTimes(0)
    expect(document.querySelector('div.dnb-modal__content')).toBeTruthy()
  })

  it('will only close when mousedown and click DOM targets are the same', () => {
    const on_close = jest.fn()
    render(<Component {...props} on_close={on_close} />)

    fireEvent.click(document.querySelector('button'))

    const contentElement = document.querySelector('div.dnb-modal__content')
    const target = contentElement
    const currentTarget = contentElement

    // trigger the close on the overlay
    fireEvent.keyDown(contentElement, {
      keyCode: 23,
      target,
      currentTarget,
    })

    expect(on_close).toHaveBeenCalledTimes(0)
    expect(document.querySelector('div.dnb-modal__content')).toBeTruthy()

    // trigger the close on the overlay
    fireEvent.mouseDown(contentElement, {
      target,
      currentTarget,
    })
    fireEvent.click(contentElement, { target })

    expect(on_close).toHaveBeenCalledTimes(1)
    expect(document.querySelector('div.dnb-modal__content')).toBeFalsy()
  })

  it('has working open event and close event on changing the "open_state"', () => {
    let testTriggeredBy = null
    const on_close = jest.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )
    const on_open = jest.fn()
    const { rerender } = render(
      <Component {...props} on_close={on_close} on_open={on_open} />
    )
    rerender(
      <Component
        {...props}
        on_close={on_close}
        on_open={on_open}
        open_state="opened"
      />
    )
    expect(on_open).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe(null)

    rerender(
      <Component
        {...props}
        on_close={on_close}
        on_open={on_open}
        open_state="closed"
      />
    )
    expect(on_close).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe('unmount')
  })

  it('should handle the portal correctly', () => {
    const modalContent = 'Modal Content'

    render(
      <Component
        {...props}
        title={null}
        modal_content={null}
        direct_dom_return={false}
      >
        <Component.Bar />
        {modalContent}
      </Component>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    const id = `#dnb-modal-${props.id}`
    const modalElem = document.querySelector(id)

    expect(modalElem.textContent).toContain(modalContent)

    fireEvent.click(
      document.querySelector('button.dnb-modal__close-button')
    )
  })

  it('should not add aria-hidden to the modal root', () => {
    const modalContent = 'Modal Content'

    render(
      <div>
        <Component
          {...props}
          title={null}
          modal_content={null}
          direct_dom_return={false}
        >
          <Component.Bar />
          {modalContent}
        </Component>

        <button id="my-button">I should become hidden after open</button>
      </div>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    const id = `#dnb-modal-${props.id}`
    const modalRoot = document.querySelector(id)
    const outsideButton = document.querySelector('#my-button')

    expect(modalRoot.getAttribute('aria-hidden')).toBeFalsy()
    expect(outsideButton.getAttribute('aria-hidden')).toEqual('true')

    fireEvent.click(
      document.querySelector('button.dnb-modal__close-button')
    )
  })

  it('runs expected side effects on desktop', () => {
    render(
      <Component {...props}>
        <DialogContent />
      </Component>
    )
    const elem = document.querySelector('button')

    expect(document.body.getAttribute('style')).toBeFalsy()

    // open modal
    fireEvent.click(elem)

    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.height).toBe('auto')
    expect(document.body.style.boxSizing).toBe('border-box')
    expect(document.body.style.marginRight).toBe('0px')
    expect(document.documentElement.style.height).toBe('100%')
    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe(props.id)

    // close modal
    fireEvent.click(elem)

    expect(document.body.getAttribute('style')).toBe('')
    expect(document.documentElement.getAttribute('style')).toBe('')
    expect(
      document.documentElement.hasAttribute('data-dnb-modal-active')
    ).toBe(false)
  })

  it('runs expected side effects on iOS pre 14', () => {
    render(
      <Component {...props}>
        <DialogContent />
      </Component>
    )
    const elem = document.querySelector('button')

    global.userAgent.mockReturnValue('iPhone OS 12')
    global.appVersion.mockReturnValue('OS 12_0_0')

    const addEventListener = jest.fn()
    jest
      .spyOn(document, 'addEventListener')
      .mockImplementation(addEventListener)
    const removeEventListener = jest.fn()
    jest
      .spyOn(document, 'removeEventListener')
      .mockImplementation(removeEventListener)

    // open modal
    fireEvent.click(elem)

    expect(document.body.getAttribute('style')).toBeFalsy()

    expect(addEventListener).toBeCalledTimes(2)
    expect(addEventListener).toHaveBeenCalledWith(
      'touchmove',
      expect.any(Function),
      { passive: false }
    )
    expect(addEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    )

    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe(props.id)

    // close modal
    fireEvent.click(elem)

    expect(document.body.getAttribute('style')).toBeFalsy()
    expect(document.documentElement.getAttribute('style')).toBeFalsy()

    expect(
      document.documentElement.hasAttribute('data-dnb-modal-active')
    ).toBe(false)

    expect(removeEventListener).toBeCalledTimes(2)
    expect(removeEventListener).toHaveBeenCalledWith(
      'touchmove',
      expect.any(Function),
      { passive: false }
    )
    expect(removeEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    )
  })

  it('runs expected side effects on android', () => {
    render(
      <Component {...props}>
        <DialogContent />
      </Component>
    )
    const elem = document.querySelector('button')

    global.userAgent.mockReturnValue('Android; 7.')

    expect(document.body.getAttribute('style')).toBeFalsy()

    // open modal
    fireEvent.click(elem)

    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.position).toBe('fixed')
    expect(document.body.style.top).toBe('-0px')
    expect(document.body.style.left).toBe('0px')
    expect(document.body.style.right).toBe('0px')
    expect(document.body.style.height).toBe('auto')
    expect(document.documentElement.style.height).toBe('100%')
    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe(props.id)

    // close modal
    fireEvent.click(elem)

    expect(document.body.getAttribute('style')).toBe('')
    expect(document.documentElement.getAttribute('style')).toBe('')
    expect(
      document.documentElement.hasAttribute('data-dnb-modal-active')
    ).toBe(false)
  })

  it('has correct opened state when "open_state" is used', () => {
    const { rerender } = render(<Component {...props} />)

    rerender(<Component {...props} open_state="opened" />)
    expect(document.querySelector('div.dnb-modal__content')).toBeTruthy()

    rerender(<Component {...props} open_state="closed" />)
    expect(document.querySelector('div.dnb-modal__content')).toBeFalsy()
  })

  it('has correct opened state when "open_state" is used with boolean', () => {
    const { rerender } = render(<Component {...props} />)
    rerender(<Component {...props} open_state={true} />)

    expect(document.querySelector('div.dnb-modal__content')).toBeTruthy()

    rerender(<Component {...props} open_state={false} />)

    expect(document.querySelector('div.dnb-modal__content')).toBeFalsy()
  })

  it('can be mounted from within another component', () => {
    const TestCustomTrigger = () => {
      const [count, setCount] = React.useState(0)

      return (
        <React.StrictMode>
          <Button
            id="count-trigger"
            text="Count"
            on_click={() => setCount(count + 1)}
          />

          <Button
            id="modal-trigger"
            on_click={() => {
              return (
                <Component
                  {...props}
                  trigger_attributes={{ hidden: true }}
                  open_state="opened"
                >
                  <DialogContent />
                </Component>
              )
            }}
          />

          <span className="count">{count}</span>
        </React.StrictMode>
      )
    }

    render(<TestCustomTrigger />)

    fireEvent.click(document.querySelector('button#count-trigger'))

    expect(document.querySelector('span.count').textContent).toBe('1')

    expect(document.querySelector('div.dnb-modal__content')).toBeFalsy()

    fireEvent.click(document.querySelector('button#modal-trigger'))

    expect(document.querySelector('div.dnb-modal__content')).toBeTruthy()

    fireEvent.click(
      document.querySelector('button.dnb-modal__close-button')
    )

    expect(document.querySelector('div.dnb-modal__content')).toBeFalsy()

    fireEvent.click(document.querySelector('button#count-trigger'))

    expect(document.querySelector('span.count').textContent).toBe('2')

    fireEvent.click(document.querySelector('button#modal-trigger'))

    // For some reason, in JSDOM, the second open does not work properly.
    // "this.isClosing" is still true at that point. Hard to find the reason. A delay does not help at all.
    // expect(document.querySelector('div.dnb-modal__content')).toBeTruthy()
  })

  it('will keep its internal open_state from within provider', () => {
    const on_open = jest.fn()
    const on_close = jest.fn()

    const TestCustomTrigger = () => {
      const [count, setCount] = React.useState(0)

      return (
        <Provider>
          <Button
            id="count-trigger"
            text="Count"
            on_click={() => setCount(count + 1)}
          />

          <Button
            id="modal-trigger"
            on_click={() => {
              return (
                <OriginalComponent
                  title="Modal Title"
                  trigger_attributes={{ hidden: true }}
                  open_state="opened"
                  labelled_by="modal-trigger"
                  on_open={(e) => {
                    on_open(e)
                  }}
                  on_close={(e) => {
                    on_close(e)
                  }}
                  no_animation
                  direct_dom_return
                >
                  <OriginalComponent.Bar />
                </OriginalComponent>
              )
            }}
          />

          <span id="count">{count}</span>
        </Provider>
      )
    }

    render(<TestCustomTrigger />)

    // open
    fireEvent.click(document.querySelector('button#modal-trigger'))

    expect(document.querySelector('div.dnb-modal__content')).toBeTruthy()

    // close
    fireEvent.click(
      document.querySelector('button.dnb-modal__close-button')
    )

    expect(document.querySelector('div.dnb-modal__content')).toBeFalsy()

    expect(on_open).toHaveBeenCalledTimes(1)

    // state update
    fireEvent.click(document.querySelector('button#count-trigger'))
    fireEvent.click(document.querySelector('button#count-trigger'))

    expect(document.querySelector('span#count').textContent).toBe('2')
    expect(document.querySelector('div.dnb-modal__content')).toBeFalsy()
    expect(on_close).toHaveBeenCalledTimes(1)

    // open again
    fireEvent.click(document.querySelector('button#modal-trigger'))

    expect(on_open).toHaveBeenCalledTimes(2)
    expect(on_close).toHaveBeenCalledTimes(1)
    expect(document.querySelector('div.dnb-modal__content')).toBeTruthy()
  })

  it('should open and close by using external state only', () => {
    const on_open = jest.fn()
    const on_close = jest.fn()

    const ModalTriggerMock = () => {
      const [modalOpen, setModalOpen] = React.useState(false)

      return (
        <React.StrictMode>
          <Component
            no_animation={true}
            open_state={modalOpen}
            on_open={() => {
              setModalOpen(true)
              on_open()
            }}
            on_close={() => {
              setModalOpen(false)
              on_close()
            }}
          >
            <DialogContent>
              <Button
                className="close-button"
                text="Close from inside modal"
                on_click={() => setModalOpen(false)}
              />
            </DialogContent>
          </Component>
        </React.StrictMode>
      )
    }

    render(<ModalTriggerMock />)

    fireEvent.click(document.querySelector('button'))
    expect(on_open).toHaveBeenCalledTimes(1)
    expect(on_close).toHaveBeenCalledTimes(0)
    expect(document.querySelector('div.dnb-dialog')).toBeTruthy()

    fireEvent.click(document.querySelector('button.close-button'))

    expect(on_open).toHaveBeenCalledTimes(1)
    expect(on_close).toHaveBeenCalledTimes(1)
    expect(document.querySelector('div.dnb-dialog')).toBeFalsy()
  })

  it('has to have the correct aria-describedby', () => {
    render(<Component {...props} open_state={true} />)
    expect(
      document.querySelector(
        `[aria-describedby="dnb-modal-${props.id}-content"]`
      )
    ).toBeTruthy()
  })

  it('has to have correct role and aria-modal', () => {
    let elem

    const { rerender } = render(<Component {...props} open_state={true} />)
    elem = document.querySelector('.dnb-modal__content')
    expect(elem.getAttribute('role')).toBe('dialog')
    expect(elem.hasAttribute('aria-modal')).toBe(true)

    Object.defineProperty(helpers, 'IS_MAC', {
      value: true,
      writable: true,
    })

    rerender(<Component {...props} open_state={true} title="re-render" />)

    elem = document.querySelector('.dnb-modal__content')
    expect(elem.getAttribute('role')).toBe('region')
    expect(elem.hasAttribute('aria-modal')).toBe(false)

    Object.defineProperty(helpers, 'IS_MAC', {
      value: false,
      writable: true,
    })
  })

  it('has to have a close button', () => {
    render(
      <Component {...props}>
        <Component.Bar />
      </Component>
    )
    // open modal
    fireEvent.click(document.querySelector('button'))
    expect(
      document
        .querySelector('button.dnb-modal__close-button')
        .textContent.replace(/\u200C/g, '')
    ).toBe('Lukk')
  })

  it('has to have a default dialog title', () => {
    const { rerender } = render(<Component {...props} title={undefined} />)
    // open modal
    fireEvent.click(document.querySelector('button'))
    expect(
      document
        .querySelector('.dnb-modal__content')
        .getAttribute('aria-label')
    ).toContain('Vindu')

    rerender(<Component {...props} title="now there is a title" />)
    expect(
      document
        .querySelector('.dnb-modal__content')
        .hasAttribute('aria-label')
    ).toBe(false)
  })

  it('has to have aria-labelledby and aria-describedby', () => {
    render(
      <Component {...props}>
        <DialogContent />
      </Component>
    )
    // open modal
    fireEvent.click(document.querySelector('button'))
    expect(
      document
        .querySelector('.dnb-modal__content')
        .getAttribute('aria-labelledby')
    ).toBe('dnb-modal-modal_id-title')
    expect(
      document
        .querySelector('.dnb-modal__content')
        .getAttribute('aria-describedby')
    ).toBe('dnb-modal-modal_id-content')
    expect(
      document.querySelector('.dnb-dialog__header').getAttribute('id')
    ).toBe('dnb-modal-modal_id-title')
    expect(
      document.querySelector('.dnb-dialog__content').getAttribute('id')
    ).toBe('dnb-modal-modal_id-content')
  })

  it('has to have no icon', () => {
    render(<Component trigger_attributes={{ text: 'Open Modal' }} />)
    expect(document.querySelector('.dnb-icon')).toBeFalsy()

    render(
      <Component
        trigger_attributes={{
          text: 'Open Modal',
          variant: 'tertiary',
          icon: false,
        }}
      />
    )
    expect(document.querySelector('.dnb-icon')).toBeFalsy()
  })

  it('has to have an icon', () => {
    render(
      <Component
        trigger_attributes={{ text: 'Open Modal', variant: 'tertiary' }}
      />
    )
    expect(document.querySelector('.dnb-icon')).toBeTruthy()
    render(
      <Component
        trigger_attributes={{ text: 'Open Modal', icon: 'add' }}
      />
    )
    expect(document.querySelector('.dnb-icon')).toBeTruthy()
  })

  it('should render camelcase props', () => {
    const customText = 'Custom text in camelcase'
    render(
      <Component
        triggerAttributes={{ text: customText }}
        open_state={true}
      >
        The informational content
      </Component>
    )

    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .querySelector('.dnb-button__text').textContent
    ).toBe(customText)
  })
})

describe('Modal trigger', () => {
  const roledescription = 'Hjelp-knapp'

  it('will act by default as a HelpButton', () => {
    render(<Component {...props} trigger_attributes={{ text: '' }} />)
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .getAttribute('aria-roledescription')
    ).toBe(roledescription)
  })

  it('will have a aria-label', () => {
    render(
      <Component
        {...props}
        trigger_attributes={{ 'aria-label': 'label' }}
      />
    )
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .getAttribute('aria-roledescription')
    ).toBe(roledescription)
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .getAttribute('aria-label')
    ).toBe('label')
  })

  it('will not act as a HelpButton if only trigger_text was given', () => {
    render(<Component {...props} trigger_attributes={{ text: 'text' }} />)
    expect(
      document
        .querySelector('button.dnb-modal__trigger')

        .hasAttribute('aria-roledescription')
    ).toBe(false)
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .querySelector('.dnb-button__icon')
    ).toBeFalsy()
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .textContent.replace(/\u200C/g, '')
    ).toBe('text')
  })

  it('will not act as a HelpButton if a different icon was given', () => {
    render(<Component {...props} trigger_attributes={{ icon: 'bell' }} />)
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .hasAttribute('aria-roledescription')
    ).toBe(false)
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .querySelector('.dnb-button__icon')
    ).toBeTruthy()
  })

  it('will not act as a HelpButton if trigger text was given', () => {
    render(<Component {...props} trigger_attributes={{ text: 'text' }} />)
    expect(
      document
        .querySelector('button.dnb-modal__trigger')

        .hasAttribute('aria-roledescription')
    ).toBe(false)
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .querySelector('.dnb-button__icon')
    ).toBeFalsy()
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .textContent.replace(/\u200C/g, '')
    ).toBe('text')
  })
})

describe('Modal ARIA', () => {
  it('should validate with ARIA rules as a dialog', async () => {
    const Comp = render(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Modal scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
})

const wait = (t) => new Promise((r) => setTimeout(r, t))
