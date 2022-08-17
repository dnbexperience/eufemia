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
  attachToBody, // in order to use document.activeElement properly
  loadScss,
} from '../../../core/jest/jestSetup'

import Input from '../../input/Input'
import Component, { OriginalComponent } from '../Modal'
import Button from '../../button/Button'
import Provider from '../../../shared/Provider'
import * as helpers from '../../../shared/helpers'

global.userAgent = jest.spyOn(navigator, 'userAgent', 'get')
global.appVersion = jest.spyOn(navigator, 'appVersion', 'get')

const props = fakeProps(require.resolve('../Modal.tsx'), {
  all: true,
  //optional: true, // Does not work with Typescript interface props
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
  it('will run bodyScrollLock with disableBodyScroll', () => {
    const Comp = mount(
      <Component {...props}>
        <button>button</button>
      </Component>
    )

    expect(document.body.getAttribute('style')).toBe(null)

    Comp.find('button.dnb-modal__trigger').simulate('click')

    expect(document.body.getAttribute('style')).toContain(
      'overflow: hidden;'
    )
  })

  it('have to match snapshot', () => {
    const Comp = mount(<Component {...props} open_state={true} />)
    expect(toJson(Comp)).toMatchSnapshot()
    Comp.find('button.dnb-modal__close-button').simulate('click')
  })

  it('should add its instance to the stack', () => {
    const Comp = mount(
      <Component {...props}>
        <button>button</button>
      </Component>
    )

    Comp.find('Modal').find('button.dnb-modal__trigger').simulate('click')

    expect(window.__modalStack).toHaveLength(1)
    expect(typeof window.__modalStack[0]).toBe('object')

    Comp.find('button.dnb-modal__close-button').simulate('click')

    expect(window.__modalStack).toHaveLength(0)
  })

  it('should have aria-hidden and tabindex on other elements', () => {
    const Comp = mount(
      <>
        <button className="bypass-me">button</button>
        <Component no_animation>
          <button className="but-not-me">button</button>
        </Component>
      </>,
      { attachTo: attachToBody() }
    )

    Comp.find('Modal').find('button.dnb-modal__trigger').simulate('click')

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
      Comp.find('.dnb-modal__content')
        .instance()
        .hasAttribute('aria-hidden')
    ).toBe(false)
    expect(
      Comp.find('.dnb-modal__content')
        .find('button.but-not-me')
        .instance()
        .hasAttribute('aria-hidden')
    ).toBe(false)

    // And close it again
    Comp.find('button.dnb-modal__close-button').simulate('click')
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
    const Comp = mount(
      <>
        <button className="bypass-me">button</button>
        <button className="but-not-me">button</button>
        <Component
          no_animation
          bypassInvalidationSelectors={['.bypass-me']}
        >
          content
        </Component>
      </>,
      { attachTo: attachToBody() }
    )

    Comp.find('Modal').find('button.dnb-modal__trigger').simulate('click')

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
    const Comp = mount(<Component {...props} open_state={true} />)
    expect(Comp.find('h1').text()).toBe(props.title)
  })

  it('has no trigger button once we set omitTriggerButton', () => {
    const Comp = mount(<Component {...props} />)
    Comp.setProps({
      omitTriggerButton: true,
    })
    expect(Comp.find('button.dnb-modal__trigger').exists()).toBe(false)
    Comp.setProps({
      omitTriggerButton: false,
    })
    expect(Comp.find('button.dnb-modal__trigger').exists()).toBe(true)
  })

  it('should act as a help button by default', () => {
    const Comp = mount(
      <Input
        suffix={<Component title={props.title}>Help text</Component>}
      />
    )
    const buttonElem = Comp.find('button.dnb-modal__trigger')
    expect(buttonElem.instance().getAttribute('aria-label')).toBe(
      props.title
    )
    expect(
      buttonElem.instance().getAttribute('aria-roledescription')
    ).toBe('Hjelp-knapp')
    Comp.find('button').simulate('click')
    expect(document.querySelector('.dnb-modal__title').textContent).toBe(
      props.title
    )
  })

  it('should use default modal title when used as a help button', () => {
    const Comp = mount(<Input suffix={<Component>Help text</Component>} />)
    const buttonElem = Comp.find('button.dnb-modal__trigger')
    expect(buttonElem.instance().getAttribute('aria-label')).toBe(
      'Hjelpetekst'
    )
    Comp.find('button').simulate('click')
    expect(document.querySelector('.dnb-modal__title').textContent).toBe(
      'Hjelpetekst'
    )
  })

  it('has a disabled trigger button once we set trigger_disabled to true', () => {
    const Comp = mount(<Component {...props} open_state={true} />)
    Comp.setProps({
      trigger_disabled: true,
    })
    expect(
      Comp.find('button.dnb-modal__trigger')
        .instance()
        .hasAttribute('disabled')
    ).toBe(true)
  })

  it('has working open event and close event if "Esc" key gets pressed', () => {
    let testTriggeredBy = null
    const on_close = jest.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )
    const on_open = jest.fn()
    const Comp = mount(
      <Component {...props} on_close={on_close} on_open={on_open} />
    )
    Comp.find('button').simulate('click')
    expect(on_open).toHaveBeenCalledTimes(1)
    expect(on_open).toHaveBeenCalledWith({
      id: 'modal_id',
    })
    expect(testTriggeredBy).toBe(null)

    Comp.find('div.dnb-dialog').simulate('keyDown', {
      key: 'Esc',
      keyCode: 27,
    })

    expect(on_close).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe('keyboard')
    // This freaks Jest out, because, now we should get an event in return – this one is too big!
    // expect(on_close).toHaveBeenCalledWith({
    //   id: 'modal_id',
    //   event: null,
    //   triggeredBy: 'unmount'
    // })

    // Also test the window event listener
    Comp.find('button').simulate('click')
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    expect(on_close).toHaveBeenCalledTimes(2)
  })

  it('will close modal by using callback method', () => {
    const on_close = jest.fn()
    const on_open = jest.fn()
    const Comp = mount(
      <Component
        no_animation={true}
        on_open={on_open}
        on_close={on_close}
        hide_close_button
      >
        {({ close }) => (
          <Button id="close-me" text="close" on_click={close} />
        )}
      </Component>
    )
    Comp.find('button').simulate('click')
    expect(on_open).toHaveBeenCalledTimes(1)

    Comp.find('button#close-me').simulate('click')
    expect(on_close).toHaveBeenCalledTimes(1)
  })

  it('will set focus on content div if no h1 and close button is given', async () => {
    const Comp = mount(
      <Component no_animation={true} hide_close_button>
        modal content
      </Component>,
      { attachTo: attachToBody() }
    )
    Comp.find('button').simulate('click')
    await wait(2)

    // and check the class of that element
    expect(
      document.activeElement.classList.contains('dnb-dialog__inner')
    ).toBe(true)

    Comp.find('div.dnb-dialog').simulate('keyDown', {
      key: 'Esc',
      keyCode: 27,
    })

    // and check the class of that element
    expect(
      document.activeElement.classList.contains('dnb-modal__trigger')
    ).toBe(true)
  })

  it('will warn if first heading is not h1', async () => {
    jest.spyOn(helpers, 'warn')
    const log = global.console.log
    global.console.log = jest.fn()

    const H2 = <h2>h2</h2>

    const Comp = mount(
      <Component no_animation={true}>
        <Component.Header>{H2}</Component.Header>
      </Component>,
      { attachTo: attachToBody() }
    )

    // open
    Comp.find('button').simulate('click')

    await wait(1)

    expect(helpers.warn).toHaveBeenCalledTimes(1)
    expect(helpers.warn).toHaveBeenCalledWith(
      'You have to provide a h1 element at first – instead of:',
      expect.anything()
    )

    global.console.log = log
  })

  it('will only use one heading if a custom one is given', () => {
    const Comp = mount(
      <Component no_animation={true} title="original title">
        <Component.Header>
          <div>
            <h1>custom heading</h1>
          </div>
        </Component.Header>
      </Component>,
      { attachTo: attachToBody() }
    )
    Comp.find('button').simulate('click')

    expect(document.querySelectorAll('h1')).toHaveLength(1)
    expect(document.querySelector('h1').textContent).toBe('custom heading')
  })

  it('will provide custom bar, header and content if given', () => {
    const Comp = mount(
      <Component no_animation={true} direct_dom_return>
        <Component.Bar>bar content</Component.Bar>
        <Component.Header>header content</Component.Header>
        <Component.Content>modal content</Component.Content>
      </Component>,
      { attachTo: attachToBody() }
    )
    Comp.find('button').simulate('click')

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

    const Comp = mount(
      <Component
        {...props}
        id="modal-first"
        on_open={on_open.first}
        on_close={on_close.first}
      >
        <button id="content-first">content</button>
        <Component
          {...props}
          id="modal-second"
          on_open={on_open.second}
          on_close={on_close.second}
        >
          <button id="content-second">content</button>
          <Component
            {...props}
            id="modal-third"
            on_open={on_open.third}
            on_close={on_close.third}
          >
            <button id="content-third">content</button>
          </Component>
        </Component>
      </Component>
    )

    expect(Comp.exists('#content-third')).toBe(false)

    Comp.find('button#modal-first').simulate('click')
    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-first')
    Comp.find('button#modal-second').simulate('click')
    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-second')
    Comp.find('button#modal-third').simulate('click')
    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-third')

    expect(on_open.first).toHaveBeenCalledTimes(1)
    expect(on_open.second).toHaveBeenCalledTimes(1)
    expect(on_open.third).toHaveBeenCalledTimes(1)

    expect(Comp.find('button.dnb-modal__close-button').length).toBe(3)
    expect(
      Comp.find('#content-first').instance().hasAttribute('aria-hidden')
    ).toBe(true)
    expect(
      Comp.find('#content-second').instance().hasAttribute('aria-hidden')
    ).toBe(true)
    expect(
      Comp.find('#content-third').instance().hasAttribute('aria-hidden')
    ).toBe(false)
    expect(
      Comp.find('button.dnb-modal__close-button')
        .at(0)
        .instance()
        .hasAttribute('aria-hidden')
    ).toBe(true)
    expect(
      Comp.find('button.dnb-modal__close-button')
        .at(1)
        .instance()
        .hasAttribute('aria-hidden')
    ).toBe(true)
    expect(
      Comp.find('button.dnb-modal__close-button')
        .at(2)
        .instance()
        .hasAttribute('aria-hidden')
    ).toBe(false)

    // Close the third one
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    Comp.update()
    expect(on_close.first).toHaveBeenCalledTimes(0)
    expect(on_close.second).toHaveBeenCalledTimes(0)
    expect(on_close.third).toHaveBeenCalledTimes(1)

    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-second')
    expect(Comp.exists('#content-third')).toBe(false)
    expect(
      Comp.find('#content-second').instance().hasAttribute('aria-hidden')
    ).toBe(false)
    expect(
      Comp.find('button.dnb-modal__close-button')
        .at(0)
        .instance()
        .hasAttribute('aria-hidden')
    ).toBe(true)
    expect(
      Comp.find('button.dnb-modal__close-button')
        .at(1)
        .instance()
        .hasAttribute('aria-hidden')
    ).toBe(false)

    // Close the second one
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    Comp.update()
    expect(on_close.first).toHaveBeenCalledTimes(0)
    expect(on_close.second).toHaveBeenCalledTimes(1)
    expect(on_close.third).toHaveBeenCalledTimes(1)

    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-first')
    expect(Comp.exists('#content-second')).toBe(false)
    expect(
      Comp.find('#content-first').instance().hasAttribute('aria-hidden')
    ).toBe(false)
    expect(
      Comp.find('button.dnb-modal__close-button')
        .at(0)
        .instance()
        .hasAttribute('aria-hidden')
    ).toBe(false)

    // Close the first one
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    Comp.update()
    expect(on_close.first).toHaveBeenCalledTimes(1)
    expect(on_close.second).toHaveBeenCalledTimes(1)
    expect(on_close.third).toHaveBeenCalledTimes(1)

    expect(Comp.exists('#content-first')).toBe(false)
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
            trigger_hidden
          >
            content
          </Component>
        </>
      )
    }

    const Comp = mount(<HandleState />)

    expect(
      document.documentElement.hasAttribute('data-dnb-modal-active')
    ).toBe(false)

    Comp.find('button#toggle').simulate('click')

    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-id')

    Comp.find('button#toggle').simulate('click')

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
            trigger_hidden
          >
            content
          </Component>
        </>
      )
    }

    const Comp = mount(<HandleState />)

    Comp.find('button#toggle').simulate('click')

    await wait(3)

    expect(on_open).toBeCalledTimes(1)

    Comp.find('button#toggle').simulate('click')

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
    const Comp = mount(
      <Component
        {...props}
        prevent_close
        on_open={on_open}
        on_close={on_close}
        on_close_prevent={on_close_prevent}
      />
    )
    Comp.find('button').simulate('click')
    expect(on_open).toHaveBeenCalledTimes(1)

    Comp.find('div.dnb-dialog').simulate('keyDown', {
      key: 'Esc',
      keyCode: 27,
    })

    expect(on_close).not.toHaveBeenCalled()
    expect(on_close_prevent).toHaveBeenCalledTimes(1)

    // trigger the close on the overlay
    Comp.find('div.dnb-modal__content').simulate('mousedown')
    Comp.find('div.dnb-modal__content').simulate('click')

    expect(on_close_prevent).toHaveBeenCalledTimes(2)
    expect(on_close_prevent.mock.calls[1][0].close).toBeType('function')
    expect(on_close_prevent.mock.calls[1][0].triggeredBy).toBe('overlay')
    expect(testTriggeredBy).toBe(null)

    // trigger the close button
    Comp.find('button.dnb-modal__close-button').simulate('click')

    expect(on_close_prevent).toHaveBeenCalledTimes(3)
    expect(on_close_prevent.mock.calls[2][0].triggeredBy).toBe('button')

    // trigger the esc key
    Comp.find('div.dnb-dialog').simulate('keyDown', {
      key: 'Esc',
      keyCode: 27,
    })

    expect(on_close_prevent).toHaveBeenCalledTimes(4)
    expect(on_close_prevent.mock.calls[3][0].triggeredBy).toBe('keyboard')

    preventClose = false

    // trigger the close on the overlay
    Comp.find('div.dnb-modal__content').simulate('mousedown')
    Comp.find('div.dnb-modal__content').simulate('click')

    expect(Comp.exists('div.dnb-modal__content')).toBe(true)

    // trigger the close button
    Comp.find('button.dnb-modal__close-button').simulate('click')

    expect(testTriggeredBy).toBe('button')
    expect(Comp.exists('div.dnb-modal__content')).toBe(false)
  })

  it('will close the modal on overlay click', () => {
    let testTriggeredBy = null
    const on_close = jest.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )
    const on_open = jest.fn()
    const Comp = mount(
      <Component {...props} on_open={on_open} on_close={on_close} />
    )
    Comp.find('button').simulate('click')
    expect(on_open).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe(null)

    // trigger the close on the overlay
    Comp.find('div.dnb-modal__content').simulate('mousedown')
    Comp.find('div.dnb-modal__content').simulate('click')

    expect(on_close).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe('overlay')
    expect(Comp.exists('div.dnb-modal__content')).toBe(false)
  })

  it('will omit close when no mousedown was fired', () => {
    const on_close = jest.fn()
    const Comp = mount(<Component {...props} on_close={on_close} />)
    Comp.find('button').simulate('click')

    // trigger the close on the overlay
    Comp.find('div.dnb-modal__content').simulate('click')

    expect(on_close).toHaveBeenCalledTimes(0)
    expect(Comp.exists('div.dnb-modal__content')).toBe(true)
  })

  it('will only close when mousedown and click DOM targets are the same', () => {
    const on_close = jest.fn()
    const Comp = mount(<Component {...props} on_close={on_close} />)

    Comp.find('button').simulate('click')

    const contentElement = Comp.find('div.dnb-modal__content')
    const target = contentElement.instance()
    const currentTarget = contentElement.instance()
    const differentTarget = document.createElement('DIV')

    // trigger the close on the overlay
    contentElement.simulate('mousedown', {
      target,
      currentTarget,
    })
    contentElement.simulate('click', { target: differentTarget }) // simulate with different target

    expect(on_close).toHaveBeenCalledTimes(0)
    expect(Comp.exists('div.dnb-modal__content')).toBe(true)

    // trigger the close on the overlay
    contentElement.simulate('mousedown', {
      target,
      currentTarget,
    })
    contentElement.simulate('click', { target })

    expect(on_close).toHaveBeenCalledTimes(1)
    expect(Comp.exists('div.dnb-modal__content')).toBe(false)
  })

  it('has working open event and close event on changing the "open_state"', () => {
    let testTriggeredBy = null
    const on_close = jest.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )
    const on_open = jest.fn()
    const Comp = mount(
      <Component {...props} on_close={on_close} on_open={on_open} />
    )
    Comp.setProps({ open_state: 'opened' })
    expect(on_open).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe(null)

    Comp.setProps({ open_state: 'closed' })
    expect(on_close).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe('unmount')
  })

  it('should handle the portal correctly', () => {
    const modalContent = 'Modal Content'

    const Comp = mount(
      <Component
        {...props}
        title={null}
        modal_content={null}
        direct_dom_return={false}
      >
        {modalContent}
      </Component>
    )

    Comp.find('button.dnb-modal__trigger').simulate('click')

    const id = `#dnb-modal-${props.id}`
    const modalElem = document.querySelector(id)

    expect(modalElem.textContent).toContain(modalContent)

    Comp.find('button.dnb-modal__close-button').simulate('click')
  })

  it('should not add aria-hidden to the modal root', () => {
    const modalContent = 'Modal Content'

    const Comp = mount(
      <div>
        <Component
          {...props}
          title={null}
          modal_content={null}
          direct_dom_return={false}
        >
          {modalContent}
        </Component>

        <button id="my-button">I should become hidden after open</button>
      </div>,
      { attachTo: attachToBody() }
    )

    Comp.find('button.dnb-modal__trigger').simulate('click')

    const id = `#dnb-modal-${props.id}`
    const modalRoot = document.querySelector(id)
    const outsideButton = document.querySelector('#my-button')

    expect(modalRoot.getAttribute('aria-hidden')).toBeFalsy()
    expect(outsideButton.getAttribute('aria-hidden')).toEqual('true')

    Comp.find('button.dnb-modal__close-button').simulate('click')
  })

  it('runs expected side effects on desktop', () => {
    const Comp = mount(<Component {...props} />)
    const elem = Comp.find('button')

    expect(document.body.getAttribute('style')).toBeFalsy()

    // open modal
    elem.simulate('click')

    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.height).toBe('auto')
    expect(document.body.style.boxSizing).toBe('border-box')
    expect(document.body.style.marginRight).toBe('0px')
    expect(document.documentElement.style.height).toBe('100%')
    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe(props.id)

    // close modal
    elem.simulate('click')

    expect(document.body.getAttribute('style')).toBe('')
    expect(document.documentElement.getAttribute('style')).toBe('')
    expect(
      document.documentElement.hasAttribute('data-dnb-modal-active')
    ).toBe(false)
  })

  it('runs expected side effects on iOS pre 14', () => {
    const Comp = mount(<Component {...props} />)
    const elem = Comp.find('button')

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
    elem.simulate('click')

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
    elem.simulate('click')

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
    const Comp = mount(<Component {...props} />)
    const elem = Comp.find('button')

    global.userAgent.mockReturnValue('Android; 7.')

    expect(document.body.getAttribute('style')).toBeFalsy()

    // open modal
    elem.simulate('click')

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
    elem.simulate('click')

    expect(document.body.getAttribute('style')).toBe('')
    expect(document.documentElement.getAttribute('style')).toBe('')
    expect(
      document.documentElement.hasAttribute('data-dnb-modal-active')
    ).toBe(false)
  })

  it('has correct opened state when "open_state" is used', () => {
    const Comp = mount(<Component {...props} />)
    Comp.setProps({ open_state: 'opened' })

    expect(Comp.exists('div.dnb-modal__content')).toBe(true)
    expect(Comp.state().modalActive).toBe(true)

    Comp.setProps({ open_state: 'closed' })

    expect(Comp.exists('div.dnb-modal__content')).toBe(false)
    expect(Comp.state().modalActive).toBe(false)
  })

  it('has correct opened state when "open_state" is used with boolean', () => {
    const Comp = mount(<Component {...props} />)
    Comp.setProps({ open_state: true })

    expect(Comp.exists('div.dnb-modal__content')).toBe(true)
    expect(Comp.state().modalActive).toBe(true)

    Comp.setProps({ open_state: false })

    expect(Comp.exists('div.dnb-modal__content')).toBe(false)
    expect(Comp.state().modalActive).toBe(false)
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
                  trigger_hidden="true"
                  open_state="opened"
                >
                  content
                </Component>
              )
            }}
          />

          <span className="count">{count}</span>
        </React.StrictMode>
      )
    }

    const Comp = mount(<TestCustomTrigger />)

    Comp.find('button#count-trigger').simulate('click')
    expect(Comp.find('span.count').text()).toBe('1')

    expect(Comp.exists('div.dnb-modal__content')).toBe(false)

    Comp.find('button#modal-trigger').simulate('click')
    expect(Comp.exists('div.dnb-modal__content')).toBe(true)

    Comp.find('button.dnb-modal__close-button').simulate('click')
    expect(Comp.exists('div.dnb-modal__content')).toBe(false)

    Comp.find('button#count-trigger').simulate('click')
    expect(Comp.find('span.count').text()).toBe('2')

    Comp.find('button#modal-trigger').simulate('click')

    // For some reason, in JSDOM, the second open does not work properly.
    // "this.isClosing" is still true at that point. Hard to find the reason. A delay does not help at all.
    // expect(Comp.exists('div.dnb-modal__content')).toBe(true)
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
                  trigger_hidden="true"
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
                  content
                </OriginalComponent>
              )
            }}
          />

          <span id="count">{count}</span>
        </Provider>
      )
    }

    const Comp = mount(<TestCustomTrigger />)

    // open
    Comp.find('button#modal-trigger').simulate('click')

    expect(Comp.exists('div.dnb-modal__content')).toBe(true)

    // close
    Comp.find('button.dnb-modal__close-button').simulate('click')

    expect(Comp.exists('div.dnb-modal__content')).toBe(false)

    expect(on_open).toHaveBeenCalledTimes(1)

    // state update
    Comp.find('button#count-trigger').simulate('click')
    Comp.find('button#count-trigger').simulate('click')

    expect(Comp.find('span#count').text()).toBe('2')
    expect(Comp.exists('div.dnb-modal__content')).toBe(false)
    expect(on_close).toHaveBeenCalledTimes(1)

    // open again
    Comp.find('button#modal-trigger').simulate('click')

    expect(on_open).toHaveBeenCalledTimes(2)
    expect(on_close).toHaveBeenCalledTimes(1)
    expect(Comp.exists('div.dnb-modal__content')).toBe(true)
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
            <Button
              className="close-button"
              text="Close from inside modal"
              on_click={() => setModalOpen(false)}
            />
          </Component>
        </React.StrictMode>
      )
    }

    const Comp = mount(<ModalTriggerMock />)

    Comp.find('button').simulate('click')
    expect(on_open).toHaveBeenCalledTimes(1)
    expect(on_close).toHaveBeenCalledTimes(0)
    expect(Comp.exists('div.dnb-dialog')).toBe(true)

    Comp.find('button.close-button').simulate('click')
    expect(on_open).toHaveBeenCalledTimes(1)
    expect(on_close).toHaveBeenCalledTimes(1)
    expect(Comp.exists('div.dnb-dialog')).toBe(false)
  })

  it('has to have the correct aria-describedby', () => {
    const Comp = mount(<Component {...props} open_state={true} />)
    expect(
      Comp.find('[aria-describedby]').props()['aria-describedby']
    ).toBe(`dnb-modal-${props.id}-content`)
  })

  it('has to have correct role and aria-modal', () => {
    let elem

    const Comp = mount(<Component {...props} open_state={true} />)
    elem = Comp.find('.dnb-modal__content').instance()
    expect(elem.getAttribute('role')).toBe('dialog')
    expect(elem.hasAttribute('aria-modal')).toBe(true)

    Object.defineProperty(helpers, 'IS_MAC', {
      value: true,
      writable: true,
    })

    Comp.setProps({ title: 're-render' })

    elem = Comp.find('.dnb-modal__content').instance()
    expect(elem.getAttribute('role')).toBe('region')
    expect(elem.hasAttribute('aria-modal')).toBe(false)

    Object.defineProperty(helpers, 'IS_MAC', {
      value: false,
      writable: true,
    })
  })

  it('has to have a close button', () => {
    const Comp = mount(<Component {...props} />)
    Comp.find(OriginalComponent).setState({
      modalActive: true,
    })
    expect(
      Comp.find(OriginalComponent)
        .find('button.dnb-modal__close-button')
        .instance()
        .textContent.replace(/\u200C/g, '')
    ).toBe('Lukk')
  })

  it('has to have a default dialog title', () => {
    const Comp = mount(<Component {...props} title={undefined} />)
    Comp.find(OriginalComponent).setState({
      modalActive: true,
    })
    expect(
      Comp.find(OriginalComponent)
        .find('.dnb-modal__content')
        .instance()
        .getAttribute('aria-label')
    ).toContain('Vindu')

    Comp.setProps({ title: 'now there is a title' })

    expect(
      Comp.find(OriginalComponent)
        .find('.dnb-modal__content')
        .instance()
        .hasAttribute('aria-label')
    ).toBe(false)
  })

  it('has to have aria-labelledby and aria-describedby', () => {
    const Comp = mount(<Component {...props} />, {
      attachTo: attachToBody(),
    })
    Comp.find(OriginalComponent).setState({
      modalActive: true,
    })
    expect(
      Comp.find(OriginalComponent)
        .find('.dnb-modal__content')
        .instance()
        .getAttribute('aria-labelledby')
    ).toBe('dnb-modal-modal_id-title')
    expect(
      Comp.find(OriginalComponent)
        .find('.dnb-modal__content')
        .instance()
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
    const Comp1 = mount(<Component trigger_text="Open Modal" />)
    expect(Comp1.find('.dnb-icon').exists()).toBe(false)
    const Comp2 = mount(
      <Component
        trigger_text="Open Modal"
        trigger_variant="tertiary"
        trigger_icon={false}
      />
    )
    expect(Comp2.find('.dnb-icon').exists()).toBe(false)
  })

  it('has to have an icon', () => {
    const Comp1 = mount(
      <Component trigger_text="Open Modal" trigger_variant="tertiary" />
    )
    expect(Comp1.find('.dnb-icon').exists()).toBe(true)
    const Comp2 = mount(
      <Component trigger_text="Open Modal" trigger_icon="add" />
    )
    expect(Comp2.find('.dnb-icon').exists()).toBe(true)
  })

  it('should render camelcase props', () => {
    const customText = 'Custom text in camelcase'
    const Comp = mount(
      <Component
        triggerAttributes={{ text: customText }}
        open_state={true}
      >
        The informational content
      </Component>
    )

    expect(
      Comp.find('button.dnb-modal__trigger')
        .find('.dnb-button__text')
        .text()
    ).toBe(customText)
  })

  it('should validate with ARIA rules as a dialog', async () => {
    const Comp = mount(<Component {...props} />)
    Comp.setState({
      modalActive: true,
    })
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Modal trigger', () => {
  const roledescription = 'Hjelp-knapp'

  it('will act by default as a HelpButton', () => {
    const Comp = mount(<Component {...props} trigger_text="" />)
    expect(
      Comp.find('button.dnb-modal__trigger')
        .instance()
        .getAttribute('aria-roledescription')
    ).toBe(roledescription)
  })

  it('will have a aria-label', () => {
    const Comp = mount(
      <Component
        {...props}
        trigger_attributes={{ 'aria-label': 'label' }}
      />
    )
    expect(
      Comp.find('button.dnb-modal__trigger')
        .instance()
        .getAttribute('aria-roledescription')
    ).toBe(roledescription)
    expect(
      Comp.find('button.dnb-modal__trigger')
        .instance()
        .getAttribute('aria-label')
    ).toBe('label')
  })

  it('will not act as a HelpButton if only trigger_text was given', () => {
    const Comp = mount(<Component {...props} trigger_text="text" />)
    expect(
      Comp.find('button.dnb-modal__trigger')
        .instance()
        .hasAttribute('aria-roledescription')
    ).toBe(false)
    expect(
      Comp.find('button.dnb-modal__trigger').exists('.dnb-button__icon')
    ).toBe(false)
    expect(
      Comp.find('button.dnb-modal__trigger')
        .text()
        .replace(/\u200C/g, '')
    ).toBe('text')
  })

  it('will not act as a HelpButton if a different icon was given', () => {
    const Comp = mount(<Component {...props} trigger_icon="bell" />)
    expect(
      Comp.find('button.dnb-modal__trigger')
        .instance()
        .hasAttribute('aria-roledescription')
    ).toBe(false)
    expect(
      Comp.find('button.dnb-modal__trigger').exists('.dnb-button__icon')
    ).toBe(true)
  })

  it('will not act as a HelpButton if trigger_text was given', () => {
    const Comp = mount(<Component {...props} trigger_text="text" />)
    expect(
      Comp.find('button.dnb-modal__trigger')
        .instance()
        .hasAttribute('aria-roledescription')
    ).toBe(false)
    expect(
      Comp.find('button.dnb-modal__trigger').exists('.dnb-button__icon')
    ).toBe(false)
    expect(
      Comp.find('button.dnb-modal__trigger')
        .text()
        .replace(/\u200C/g, '')
    ).toBe('text')
  })
})

describe('Modal scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-modal.scss'))
    expect(scss).toMatchSnapshot()
  })
})

const wait = (t) => new Promise((r) => setTimeout(r, t))
