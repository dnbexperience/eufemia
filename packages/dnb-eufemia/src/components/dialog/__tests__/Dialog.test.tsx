import React from 'react'
import Dialog from '../Dialog'
import Button from '../../button/Button'
import Provider from '../../../shared/Provider'
import {
  mount,
  fakeProps,
  toJson,
  loadScss,
  axeComponent,
  attachToBody,
} from '../../../core/jest/jestSetup'
import * as helpers from '../../../shared/helpers'

const props = fakeProps(require.resolve('../Dialog.tsx'), {
  all: true,
  //optional: true, // Does not work with Typescript interface props
})
props.title = 'dialog_title'
props.id = 'dialog_id'
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

describe('Dialog', () => {
  it('appears on trigger click', () => {
    const Comp = mount(
      <Dialog {...props}>
        <button>button</button>
      </Dialog>
    )

    Comp.find('Modal').find('button.dnb-modal__trigger').simulate('click')

    expect(Comp.find('button.dnb-modal__close-button').exists()).toBe(true)
  })

  it('will close by using callback method', () => {
    const on_close = jest.fn()
    const on_open = jest.fn()
    const Comp = mount(
      <Dialog
        noAnimation
        onOpen={on_open}
        onClose={on_close}
        hideCloseButton
      >
        {({ close }) => (
          <Button id="close-me" text="close" on_click={close} />
        )}
      </Dialog>
    )
    Comp.find('button').simulate('click')
    expect(on_open).toHaveBeenCalledTimes(1)

    Comp.find('button#close-me').simulate('click')
    expect(on_close).toHaveBeenCalledTimes(1)
  })

  it('will use props from global context', () => {
    const contextTitle = 'Custom title'
    const Comp = mount(
      <Provider
        value={{
          Dialog: { title: contextTitle },
        }}
      >
        <Dialog />
      </Provider>
    )

    Comp.find('button').simulate('click')

    expect(document.querySelector('.dnb-dialog__title').textContent).toBe(
      contextTitle
    )
  })

  it('has to have correct role', () => {
    const Comp = mount(
      <Dialog {...props} openState={true}>
        <button>button</button>
      </Dialog>
    )
    const elem = Comp.find('.dnb-modal__content').instance()
    expect(elem.getAttribute('role')).toBe('dialog')
    expect(elem.hasAttribute('aria-modal')).toBe(true)

    Object.defineProperty(helpers, 'IS_MAC', {
      value: true,
      writable: true,
    })

    Comp.setProps({ title: 're-render' })

    expect(elem.getAttribute('role')).toBe('region')
    expect(elem.hasAttribute('aria-modal')).toBe(false)

    Object.defineProperty(helpers, 'IS_MAC', {
      value: false,
      writable: true,
    })

    Comp.setProps({ variant: 'confirmation' })

    expect(elem.getAttribute('role')).toBe('alertdialog')
    expect(elem.hasAttribute('aria-modal')).toBe(true)
  })

  it('is closed by keyboardevent esc', () => {
    const on_close = jest.fn()

    const props = {
      directDomReturn: false,
      noAnimation: true,
    }
    const Comp = mount(
      <Dialog {...props} id="modal-dialog" onClose={on_close} />
    )

    Comp.find('button#modal-dialog').simulate('click')
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    Comp.update()
    expect(on_close).toHaveBeenCalledTimes(1)
  })

  it('has support for nested Dialogs', () => {
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

    const Comp = mount(
      <Dialog
        {...props}
        id="modal-first"
        onOpen={on_open.first}
        onClose={on_close.first}
      >
        <button id="content-first">content</button>
        <Dialog
          {...props}
          id="modal-second"
          onOpen={on_open.second}
          onClose={on_close.second}
        >
          <button id="content-second">content</button>
          <Dialog
            {...props}
            id="modal-third"
            onOpen={on_open.third}
            onClose={on_close.third}
          >
            <button id="content-third">content</button>
          </Dialog>
        </Dialog>
      </Dialog>
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

  it('can contain dialog parts', () => {
    const Comp = mount(
      <Dialog noAnimation directDomReturn={false}>
        <Dialog.Navigation>navigation</Dialog.Navigation>
        <Dialog.Header>header</Dialog.Header>
        <Dialog.Body>body</Dialog.Body>
      </Dialog>,
      { attachTo: attachToBody() }
    )

    Comp.find('button').simulate('click')

    const elements = document.querySelectorAll(
      '.dnb-dialog__content > .dnb-section'
    )
    expect(elements[0].textContent).toContain('navigation')
    expect(elements[1].textContent).toContain('header')
    expect(elements[2].textContent).toContain('body')

    expect(Comp.find('button.dnb-modal__close-button').length).toBe(1)
  })
})

describe('Dialog component snapshot', () => {
  it('should match component snapshot', () => {
    const Comp = mount(<Dialog {...props} openState={true} />)
    expect(toJson(Comp)).toMatchSnapshot()
    Comp.find('button.dnb-modal__close-button').simulate('click')
  })
})
describe('Dialog aria', () => {
  it('should validate with ARIA rules as a dialog', async () => {
    const Comp = mount(<Dialog {...props} openState={true} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Dialog scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-dialog.scss'))
    expect(scss).toMatchSnapshot()
  })
})
