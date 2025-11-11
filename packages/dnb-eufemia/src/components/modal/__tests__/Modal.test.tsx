/**
 * Modal Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Input from '../../input/Input'
import Modal, { OriginalComponent } from '../Modal'
import { ModalProps } from '../types'
import Button from '../../button/Button'
import DialogContent from '../../dialog/DialogContent'
import Provider from '../../../shared/Provider'
import * as helpers from '../../../shared/helpers'
import userEvent from '@testing-library/user-event'
import ModalHeaderBar from '../parts/ModalHeaderBar'

global.userAgent = jest.spyOn(navigator, 'userAgent', 'get')
global.appVersion = jest.spyOn(navigator, 'appVersion', 'get')

const props: ModalProps = {
  title: 'modal_title',
  id: 'modal_id',
  modalContent: 'unique_modalContent',
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
  global.console.log = jest.fn((...args) => {
    if (
      !String(args[1]).includes(
        'A Dialog or Drawer needs a h1 as its first element!'
      )
    ) {
      log(...args)
    }
  })
})
afterEach(() => {
  global.console.log = log
  jest.resetAllMocks()
})

describe('Modal component', () => {
  it('should add its instance to the stack', () => {
    render(
      <Modal {...props}>
        <DialogContent />
      </Modal>
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
        <Modal noAnimation>
          <DialogContent>
            <button className="but-not-me">button</button>
          </DialogContent>
        </Modal>
      </>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    // Check the global button
    expect(document.querySelector('button.bypass-me')).toBeInTheDocument()
    expect(document.querySelector('button.bypass-me')).toHaveAttribute(
      'aria-hidden'
    )
    expect(
      document.querySelector('button.bypass-me').getAttribute('tabindex')
    ).toBe('-1')
    expect(
      document.querySelector('.dnb-modal__content')
    ).not.toHaveAttribute('aria-hidden')
    expect(
      document
        .querySelector('.dnb-modal__content')
        .querySelector('button.but-not-me')
    ).not.toHaveAttribute('aria-hidden')

    // And close it again

    fireEvent.click(
      document.querySelector('button.dnb-modal__close-button')
    )
    expect(document.querySelector('button.bypass-me')).not.toHaveAttribute(
      'aria-hidden'
    )
    expect(document.querySelector('button.bypass-me')).not.toHaveAttribute(
      'tabindex'
    )
  })

  it('should bypass elements defined in bypassInvalidationSelectors', () => {
    render(
      <>
        <button className="bypass-me">button</button>
        <button className="but-not-me">button</button>
        <Modal noAnimation bypassInvalidationSelectors={['.bypass-me']}>
          content
        </Modal>
      </>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))
    expect(document.querySelector('button.bypass-me')).not.toHaveAttribute(
      'aria-hidden'
    )
    expect(document.querySelector('button.bypass-me')).not.toHaveAttribute(
      'tabindex'
    )

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
      <Modal {...props} openState={true}>
        <Modal.Header />
      </Modal>
    )
    expect(document.querySelector('h1').textContent).toBe(props.title)
  })

  it('accepts custom refs', () => {
    const contentRef = React.createRef<HTMLElement>()
    const scrollRef = React.createRef<HTMLElement>()

    const MockComponent = () => {
      return (
        <Modal
          openState
          noAnimation
          contentRef={contentRef}
          scrollRef={scrollRef}
        >
          content
        </Modal>
      )
    }

    render(<MockComponent />)

    expect(contentRef.current).toEqual(null)
    expect(scrollRef.current).toEqual(null)
  })

  it('has no trigger button once we set omitTriggerButton', () => {
    const { rerender } = render(<Modal {...props} />)
    rerender(<Modal {...props} omitTriggerButton={true} />)
    expect(
      document.querySelector('button.dnb-modal__trigger')
    ).not.toBeInTheDocument()

    rerender(<Modal {...props} omitTriggerButton={false} />)
    expect(
      document.querySelector('button.dnb-modal__trigger')
    ).toBeInTheDocument()
  })

  it('should act as a help button by default', () => {
    render(
      <Input
        suffix={
          <Modal title={props.title}>
            <Modal.Header />
          </Modal>
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
          <Modal>
            <Modal.Header />
          </Modal>
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
    const { rerender } = render(<Modal {...props} openState={true} />)
    rerender(
      <Modal
        {...props}
        openState={true}
        triggerAttributes={{ disabled: true }}
      />
    )
    expect(
      document.querySelector('button.dnb-modal__trigger')
    ).toHaveAttribute('disabled')
  })

  it('has working open event and close event if "Esc" key gets pressed', async () => {
    let testTriggeredBy = null

    const onOpen = jest.fn()
    const onClose = jest.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )

    render(<Modal {...props} onClose={onClose} onOpen={onOpen} />)

    fireEvent.click(document.querySelector('button'))
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenCalledWith({
      id: 'modal_id',
    })
    expect(testTriggeredBy).toBe(null)

    await userEvent.keyboard('{esc}')
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe('keyboard')
  })

  it('will set focus on content div if no h1 and close button is given', async () => {
    render(
      <Modal noAnimation={true} hideCloseButton>
        <DialogContent />
      </Modal>
    )
    fireEvent.click(document.querySelector('button'))

    // and check the class of that element
    await waitFor(() => {
      expect(document.activeElement.classList).toContain(
        'dnb-modal__focus-helper'
      )
    })

    fireEvent.keyDown(document.querySelector('div.dnb-dialog'), {
      key: 'Esc',
      keyCode: 27,
    })

    // and check the class of that element
    expect(document.activeElement.classList).toContain(
      'dnb-modal__trigger'
    )
  })

  it('will set focus and selection on "focusSelector" element', async () => {
    const { rerender } = render(
      <Modal noAnimation={true} focusSelector="#focus-me">
        <DialogContent>
          <input type="text" id="focus-me" defaultValue="value" />
        </DialogContent>
      </Modal>
    )

    fireEvent.click(document.querySelector('button'))

    await waitFor(() => {
      const inputElement = document.getElementById(
        'focus-me'
      ) as HTMLInputElement
      expect(document.activeElement.id).toContain('focus-me')
      expect(inputElement).toHaveFocus()
    })
    // Selection range is not enforced anymore

    fireEvent.keyDown(document.querySelector('div.dnb-dialog'), {
      key: 'Esc',
      keyCode: 27,
    })

    rerender(
      <Modal noAnimation={true} focusSelector="#focus-me">
        <DialogContent>
          <button id="focus-me">click me</button>
        </DialogContent>
      </Modal>
    )

    fireEvent.click(document.querySelector('button'))

    await waitFor(() => {
      const buttonElement = document.getElementById(
        'focus-me'
      ) as HTMLInputElement
      expect(document.activeElement.id).toContain('focus-me')
      expect(buttonElement).toHaveFocus()
      expect(buttonElement.selectionStart).toBe(undefined)
      expect(buttonElement.selectionEnd).toBe(undefined)
    })
  })

  it('will move focus to content by default when opened', async () => {
    render(
      <Modal noAnimation={true}>
        <DialogContent>
          <Modal.Header>
            <h1>Heading</h1>
          </Modal.Header>
          <Modal.Content>content</Modal.Content>
        </DialogContent>
      </Modal>
    )

    // Open modal
    fireEvent.click(document.querySelector('button'))

    // Focus moves to title
    await waitFor(() => {
      const title = document.querySelector('h1') as HTMLHeadingElement
      expect(title).toBeInTheDocument()
      expect(document.activeElement).toBe(title)
    })
  })

  it('renders a focus helper in the header', () => {
    render(
      <Modal noAnimation>
        <DialogContent>
          <Modal.Header>
            <h1>Heading</h1>
          </Modal.Header>
          <Modal.Content>content</Modal.Content>
        </DialogContent>
      </Modal>
    )

    // Open modal
    fireEvent.click(document.querySelector('button'))

    const focusHelper = document.querySelector(
      '.dnb-modal__focus-helper.dnb-sr-only'
    ) as HTMLButtonElement
    expect(focusHelper).toBeInTheDocument()
  })

  it('should call focus with preventScroll: true when focusing elements with focusSelector', async () => {
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus')

    render(
      <Modal noAnimation={true} focusSelector="#focus-me">
        <DialogContent>
          <input type="text" id="focus-me" defaultValue="value" />
        </DialogContent>
      </Modal>
    )

    // Open modal
    fireEvent.click(document.querySelector('button'))

    await waitFor(() => {
      expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true })
    })

    focusSpy.mockRestore()
  })

  it('should call focus with preventScroll: true when focusing elements by default', async () => {
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus')

    render(
      <Modal noAnimation={true}>
        <DialogContent>
          <Modal.Header>
            <h1>Heading</h1>
          </Modal.Header>
          <Modal.Content>content</Modal.Content>
        </DialogContent>
      </Modal>
    )

    // Open modal
    fireEvent.click(document.querySelector('button'))

    await waitFor(() => {
      expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true })
    })

    focusSpy.mockRestore()
  })

  it('should bypass elements with dnb-modal--bypass_invalidation class', () => {
    render(
      <>
        <button className="dnb-modal--bypass_invalidation">button</button>
        <button className="but-not-me">button</button>
        <Modal noAnimation>
          <DialogContent>
            <button>inside</button>
          </DialogContent>
        </Modal>
      </>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    expect(
      document.querySelector('button.dnb-modal--bypass_invalidation')
    ).not.toHaveAttribute('aria-hidden')
    expect(
      document.querySelector('button.dnb-modal--bypass_invalidation')
    ).not.toHaveAttribute('tabindex')

    expect(
      document
        .querySelector('button.but-not-me')
        ?.getAttribute('aria-hidden')
    ).toBe('true')
    expect(
      document.querySelector('button.but-not-me')?.getAttribute('tabindex')
    ).toBe('-1')
  })

  it('should bypass descendants with dnb-modal--bypass_invalidation_deep', () => {
    render(
      <>
        <div className="dnb-modal--bypass_invalidation_deep">
          <button className="bypass-child">button</button>
        </div>
        <button className="but-not-me">button</button>
        <Modal noAnimation>
          <DialogContent>
            <button>inside</button>
          </DialogContent>
        </Modal>
      </>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    expect(
      document.querySelector('button.bypass-child')
    ).not.toHaveAttribute('aria-hidden')
    expect(
      document.querySelector('button.bypass-child')
    ).not.toHaveAttribute('tabindex')

    expect(
      document
        .querySelector('button.but-not-me')
        ?.getAttribute('aria-hidden')
    ).toBe('true')
    expect(
      document.querySelector('button.but-not-me')?.getAttribute('tabindex')
    ).toBe('-1')
  })

  it('will set "data-autofocus" attribute on focusing the trigger when closed', async () => {
    render(
      <Modal noAnimation={true} animationDuration={3}>
        <DialogContent />
      </Modal>
    )

    fireEvent.click(document.querySelector('button'))

    fireEvent.keyDown(document.querySelector('div.dnb-dialog'), {
      key: 'Esc',
      keyCode: 27,
    })

    expect(document.activeElement.getAttribute('data-autofocus')).toBe(
      'true'
    )
    expect(document.activeElement.classList).toContain(
      'dnb-modal__trigger'
    )

    await waitFor(() => {
      expect(document.activeElement).not.toHaveAttribute('data-autofocus')
    })
  })

  it('should not set "data-autofocus" on mount when openState is "false"', async () => {
    render(
      <Modal openState={false} animationDuration={2}>
        <DialogContent />
      </Modal>
    )

    const trigger = document.querySelector('.dnb-modal__trigger')

    expect(document.activeElement).not.toBe(trigger)
    expect(trigger).not.toHaveAttribute('data-autofocus')

    await userEvent.click(trigger)
    // using fireEvent instead of userEvent as userEvent.keyboard({'Escape'}) does not work
    fireEvent.keyDown(document.querySelector('div.dnb-dialog'), {
      key: 'Esc',
      keyCode: 27,
    })

    await waitFor(() => {
      expect(document.activeElement).toBe(trigger)
      expect(trigger).toHaveAttribute('data-autofocus', 'true')
    })

    await waitFor(() => {
      expect(trigger).not.toHaveAttribute('data-autofocus')
    })
  })

  it('will warn if first heading is not h1', async () => {
    jest.spyOn(helpers, 'warn')
    const log = global.console.log
    global.console.log = jest.fn()

    const H2 = <h2 className="custom-h2">h2</h2>

    render(
      <Modal noAnimation={true}>
        <DialogContent>
          <Modal.Header>{H2}</Modal.Header>
        </DialogContent>
      </Modal>
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
      <Modal noAnimation={true} title="original title">
        <Modal.Header>
          <div>
            <h1>custom heading</h1>
          </div>
        </Modal.Header>
      </Modal>
    )
    fireEvent.click(document.querySelector('button'))

    expect(document.querySelectorAll('h1')).toHaveLength(1)
    expect(document.querySelector('h1').textContent).toBe('custom heading')
  })

  it('will provide custom bar, header and content if given', () => {
    render(
      <Modal noAnimation={true} directDomReturn>
        <DialogContent>
          <Modal.Bar>bar content</Modal.Bar>
          <Modal.Header>header content</Modal.Header>
          <Modal.Content>modal content</Modal.Content>
        </DialogContent>
      </Modal>
    )
    fireEvent.click(document.querySelector('button'))

    const elements = document.querySelectorAll(
      '.dnb-dialog__content > .dnb-section'
    )

    expect(elements[0].textContent).toContain('bar content')
    expect(elements[1].textContent).toContain('header content')
    expect(elements[2].textContent).toContain('modal content')
  })

  it('has support for nested Modals', async () => {
    const onOpen = {
      first: jest.fn(),
      second: jest.fn(),
      third: jest.fn(),
    }
    const onClose = {
      first: jest.fn(),
      second: jest.fn(),
      third: jest.fn(),
    }

    const props: ModalProps = {
      directDomReturn: false,
      noAnimation: true,
    }

    render(
      <Modal
        {...props}
        id="modal-first"
        onOpen={onOpen.first}
        onClose={onClose.first}
      >
        <DialogContent>
          <button id="content-first">content</button>
        </DialogContent>
        <Modal
          {...props}
          id="modal-second"
          onOpen={onOpen.second}
          onClose={onClose.second}
        >
          <DialogContent>
            <button id="content-second">content</button>
          </DialogContent>
          <Modal
            {...props}
            id="modal-third"
            onOpen={onOpen.third}
            onClose={onClose.third}
          >
            <DialogContent>
              <button id="content-third">content</button>
            </DialogContent>
          </Modal>
        </Modal>
      </Modal>
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

    await waitFor(() => {
      expect(onOpen.first).toHaveBeenCalledTimes(1)
      expect(onOpen.second).toHaveBeenCalledTimes(1)
      expect(onOpen.third).toHaveBeenCalledTimes(1)
    })

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
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
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
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
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
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
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

  it('will remove HTML attributes on unmount when openState is used', () => {
    const HandleState = () => {
      const [open, toggle] = React.useState(false)
      return (
        <>
          <button id="toggle" onClick={() => toggle((s) => !s)}>
            toggle
          </button>
          <Modal
            noAnimation
            id="modal-id"
            openState={open}
            triggerAttributes={{ hidden: true }}
          >
            content
          </Modal>
        </>
      )
    }

    render(<HandleState />)

    expect(document.documentElement).not.toHaveAttribute(
      'data-dnb-modal-active'
    )

    fireEvent.click(document.querySelector('button#toggle'))

    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('modal-id')

    fireEvent.click(document.querySelector('button#toggle'))

    expect(document.documentElement).not.toHaveAttribute(
      'data-dnb-modal-active'
    )
  })

  it('will animate when openState is used', async () => {
    const onOpen = jest.fn()
    const onClose = jest.fn()

    const HandleState = () => {
      const [open, toggle] = React.useState(false)
      return (
        <>
          <button id="toggle" onClick={() => toggle((s) => !s)}>
            toggle
          </button>
          <Modal
            id="modal-id"
            openDelay={2}
            animationDuration={2}
            openState={open}
            onOpen={onOpen}
            onClose={onClose}
            triggerAttributes={{ hidden: true }}
          >
            content
          </Modal>
        </>
      )
    }

    render(<HandleState />)

    fireEvent.click(document.querySelector('button#toggle'))

    await waitFor(() => {
      expect(onOpen).toHaveBeenCalledTimes(1)
    })

    fireEvent.click(document.querySelector('button#toggle'))

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  it('will prevent closing the modal on preventClose', async () => {
    let preventClose = true
    let testTriggeredBy = null
    const onClose = jest.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )
    const onOpen = jest.fn()
    const onClosePrevent = jest.fn(({ triggeredBy, close }) => {
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
      <Modal
        {...props}
        preventClose
        onOpen={onOpen}
        onClose={onClose}
        onClosePrevent={onClosePrevent}
      >
        <DialogContent />
      </Modal>
    )
    fireEvent.click(document.querySelector('button'))
    expect(onOpen).toHaveBeenCalledTimes(1)

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'esc',
        keyCode: 27, // esc
      })
    )

    await waitFor(() => {
      expect(onClose).not.toHaveBeenCalled()
      expect(onClosePrevent).toHaveBeenCalledTimes(1)
    })

    // trigger the close on the overlay
    fireEvent.mouseDown(document.querySelector('div.dnb-modal__content'))
    fireEvent.click(document.querySelector('div.dnb-modal__content'))

    await waitFor(() => {
      expect(onClosePrevent).toHaveBeenCalledTimes(2)
      expect(onClosePrevent.mock.calls[1][0].close).toBeType('function')
      expect(onClosePrevent.mock.calls[1][0].triggeredBy).toBe('overlay')
      expect(testTriggeredBy).toBe(null)
    })

    // trigger the close button
    fireEvent.click(
      document.querySelector('button.dnb-modal__close-button')
    )
    await waitFor(() => {
      expect(onClosePrevent).toHaveBeenCalledTimes(3)
      expect(onClosePrevent.mock.calls[2][0].triggeredBy).toBe('button')
    })

    // trigger the esc key
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'esc',
        keyCode: 27, // esc
      })
    )

    await waitFor(() => {
      expect(onClosePrevent).toHaveBeenCalledTimes(4)
      expect(onClosePrevent.mock.calls[3][0].triggeredBy).toBe('keyboard')
    })

    preventClose = false

    // trigger the close on the overlay
    fireEvent.mouseDown(document.querySelector('div.dnb-modal__content'))
    fireEvent.click(document.querySelector('div.dnb-modal__content'))

    expect(
      document.querySelector('div.dnb-modal__content')
    ).toBeInTheDocument()

    // trigger the close button
    fireEvent.click(
      document.querySelector('button.dnb-modal__close-button')
    )

    expect(testTriggeredBy).toBe('button')
    expect(
      document.querySelector('div.dnb-modal__content')
    ).not.toBeInTheDocument()
  })

  it('will close the modal on overlay click', () => {
    let testTriggeredBy = null
    const onClose = jest.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )
    const onOpen = jest.fn()
    render(<Modal {...props} onOpen={onOpen} onClose={onClose} />)
    fireEvent.click(document.querySelector('button'))
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe(null)

    // trigger the close on the overlay
    fireEvent.mouseDown(document.querySelector('div.dnb-modal__content'))
    fireEvent.click(document.querySelector('div.dnb-modal__content'))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe('overlay')
    expect(
      document.querySelector('div.dnb-modal__content')
    ).not.toBeInTheDocument()
  })

  it('will omit close when no mousedown was fired', () => {
    const onClose = jest.fn()
    render(<Modal {...props} onClose={onClose} />)
    fireEvent.click(document.querySelector('button'))

    // trigger the close on the overlay
    fireEvent.click(document.querySelector('div.dnb-modal__content'))

    expect(onClose).toHaveBeenCalledTimes(0)
    expect(
      document.querySelector('div.dnb-modal__content')
    ).toBeInTheDocument()
  })

  it('will only close when mousedown and click DOM targets are the same', () => {
    const onClose = jest.fn()
    render(<Modal {...props} onClose={onClose} />)

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

    expect(onClose).toHaveBeenCalledTimes(0)
    expect(
      document.querySelector('div.dnb-modal__content')
    ).toBeInTheDocument()

    // trigger the close on the overlay
    fireEvent.mouseDown(contentElement, {
      target,
      currentTarget,
    })
    fireEvent.click(contentElement, { target })

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(
      document.querySelector('div.dnb-modal__content')
    ).not.toBeInTheDocument()
  })

  it('has working open event and close event on changing the "openState"', async () => {
    let testTriggeredBy = null
    const onClose = jest.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )
    const onOpen = jest.fn()

    const { rerender } = render(
      <Modal {...props} onClose={onClose} onOpen={onOpen} />
    )

    rerender(
      <Modal
        {...props}
        onClose={onClose}
        onOpen={onOpen}
        openState="opened"
      />
    )
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe(null)

    rerender(
      <Modal
        {...props}
        onClose={onClose}
        onOpen={onOpen}
        openState="closed"
      />
    )
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe('unmount')
  })

  it('should handle the portal correctly', () => {
    const modalContent = 'Modal Content'

    render(
      <Modal
        {...props}
        title={null}
        modalContent={null}
        directDomReturn={false}
      >
        <Modal.Bar />
        {modalContent}
      </Modal>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    const id = `#dnb-modal-${props.id}`
    const modalElem = document.querySelector(id)

    expect(modalElem.textContent).toContain(modalContent)
  })

  it('should not add aria-hidden to the modal root', () => {
    const modalContent = 'Modal Content'

    render(
      <div>
        <Modal
          {...props}
          title={null}
          modalContent={null}
          directDomReturn={false}
        >
          <Modal.Bar />
          {modalContent}
        </Modal>

        <button id="my-button">I should become hidden after open</button>
      </div>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    const id = `#dnb-modal-${props.id}`
    const modalRoot = document.querySelector(id)
    const outsideButton = document.querySelector('#my-button')

    expect(modalRoot).not.toHaveAttribute('aria-hidden')
    expect(outsideButton.getAttribute('aria-hidden')).toEqual('true')
  })

  it('should not add aria-hidden to the modal parent elements when directDomReturn is true', () => {
    const modalContent = 'Modal Content'

    render(
      <div id="root-element">
        <div id="parent-element-1">
          <div id="parent-element-2">
            <Modal {...props} directDomReturn={true}>
              <Modal.Bar />
              {modalContent}
            </Modal>
          </div>
        </div>

        <button id="my-button">I should become hidden after open</button>
      </div>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    const id = `#dnb-modal-${props.id}`
    const modalRoot = document.querySelector(id)
    const outsideButton = document.querySelector('#my-button')
    const rootElement = document.querySelector('#root-element')
    const parentElement1 = document.querySelector('#parent-element-1')
    const parentElement2 = document.querySelector('#parent-element-2')

    // When directDomReturn is true, the modal content is rendered directly in the DOM
    // so the modal root and its parent elements should not have aria-hidden
    expect(modalRoot).not.toHaveAttribute('aria-hidden')
    expect(rootElement).not.toHaveAttribute('aria-hidden')
    expect(parentElement1).not.toHaveAttribute('aria-hidden')
    expect(parentElement2).not.toHaveAttribute('aria-hidden')

    // But elements outside the modal should still be invalidated
    expect(outsideButton.getAttribute('aria-hidden')).toEqual('true')
  })

  it('runs expected side effects on desktop', () => {
    render(
      <Modal {...props}>
        <DialogContent />
      </Modal>
    )
    const elem = document.querySelector('button')

    expect(document.body).not.toHaveAttribute('style')

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
    expect(document.documentElement).not.toHaveAttribute(
      'data-dnb-modal-active'
    )
  })

  it('runs expected side effects on iOS pre 14', () => {
    render(
      <Modal {...props}>
        <DialogContent />
      </Modal>
    )
    const elem = document.querySelector('button')

    global.userAgent.mockReturnValue('iPhone OS 12')
    global.appVersion.mockReturnValue('OS 12_0_0')

    const addEventListener = jest
      .spyOn(document, 'addEventListener')
      .mockImplementation(jest.fn())
    const removeEventListener = jest
      .spyOn(document, 'removeEventListener')
      .mockImplementation(jest.fn())

    // open modal
    fireEvent.click(elem)

    expect(document.body).not.toHaveAttribute('style')

    expect(addEventListener).toHaveBeenCalledTimes(2)
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

    expect(document.body).not.toHaveAttribute('style')
    expect(document.documentElement).not.toHaveAttribute('style')

    expect(document.documentElement).not.toHaveAttribute(
      'data-dnb-modal-active'
    )

    expect(removeEventListener).toHaveBeenCalledTimes(2)
    expect(removeEventListener).toHaveBeenCalledWith(
      'touchmove',
      expect.any(Function),
      { passive: false }
    )
    expect(removeEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    )

    addEventListener.mockRestore()
    removeEventListener.mockRestore()
  })

  it('runs expected side effects on android', () => {
    render(
      <Modal {...props}>
        <DialogContent />
      </Modal>
    )
    const elem = document.querySelector('button')

    global.userAgent.mockReturnValue('Android; 7.')

    expect(document.body).not.toHaveAttribute('style')

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
    expect(document.documentElement).not.toHaveAttribute(
      'data-dnb-modal-active'
    )
  })

  it('has correct opened state when "openState" is used', () => {
    const { rerender } = render(<Modal {...props} />)

    rerender(<Modal {...props} openState="opened" />)
    expect(
      document.querySelector('div.dnb-modal__content')
    ).toBeInTheDocument()

    rerender(<Modal {...props} openState="closed" />)
    expect(
      document.querySelector('div.dnb-modal__content')
    ).not.toBeInTheDocument()
  })

  it('has correct opened state when "openState" is used with boolean', () => {
    const { rerender } = render(<Modal {...props} />)
    rerender(<Modal {...props} openState={true} />)

    expect(
      document.querySelector('div.dnb-modal__content')
    ).toBeInTheDocument()

    rerender(<Modal {...props} openState={false} />)

    expect(
      document.querySelector('div.dnb-modal__content')
    ).not.toBeInTheDocument()
  })

  it('can be mounted from within another component', () => {
    const TestCustomTrigger = () => {
      const [count, setCount] = React.useState(0)

      return (
        <React.StrictMode>
          <Button
            id="count-trigger"
            text="Count"
            onClick={() => setCount(count + 1)}
          />

          <Button
            id="modal-trigger"
            onClick={() => {
              return (
                <Modal
                  {...props}
                  triggerAttributes={{ hidden: true }}
                  openState="opened"
                >
                  <DialogContent />
                </Modal>
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

    expect(
      document.querySelector('div.dnb-modal__content')
    ).not.toBeInTheDocument()

    fireEvent.click(document.querySelector('button#modal-trigger'))

    expect(
      document.querySelector('div.dnb-modal__content')
    ).toBeInTheDocument()

    fireEvent.click(
      document.querySelector('button.dnb-modal__close-button')
    )

    expect(
      document.querySelector('div.dnb-modal__content')
    ).not.toBeInTheDocument()

    fireEvent.click(document.querySelector('button#count-trigger'))

    expect(document.querySelector('span.count').textContent).toBe('2')

    fireEvent.click(document.querySelector('button#modal-trigger'))

    // For some reason, in JSDOM, the second open does not work properly.
    // "this.isClosing" is still true at that point. Hard to find the reason. A delay does not help at all.
    // expect(document.querySelector('div.dnb-modal__content')).toBeInTheDocument()
  })

  it('will keep its internal openState from within provider', () => {
    const onOpen = jest.fn()
    const onClose = jest.fn()

    const TestCustomTrigger = () => {
      const [count, setCount] = React.useState(0)

      return (
        <Provider>
          <Button
            id="count-trigger"
            text="Count"
            onClick={() => setCount(count + 1)}
          />

          <Button
            id="modal-trigger"
            onClick={() => {
              return (
                <OriginalComponent
                  title="Modal Title"
                  triggerAttributes={{ hidden: true }}
                  openState="opened"
                  labelledBy="modal-trigger"
                  onOpen={(e) => {
                    onOpen(e)
                  }}
                  onClose={(e) => {
                    onClose(e)
                  }}
                  noAnimation
                  directDomReturn
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

    expect(
      document.querySelector('div.dnb-modal__content')
    ).toBeInTheDocument()

    // close
    fireEvent.click(
      document.querySelector('button.dnb-modal__close-button')
    )

    expect(
      document.querySelector('div.dnb-modal__content')
    ).not.toBeInTheDocument()

    expect(onOpen).toHaveBeenCalledTimes(1)

    // state update
    fireEvent.click(document.querySelector('button#count-trigger'))
    fireEvent.click(document.querySelector('button#count-trigger'))

    expect(document.querySelector('span#count').textContent).toBe('2')
    expect(
      document.querySelector('div.dnb-modal__content')
    ).not.toBeInTheDocument()
    expect(onClose).toHaveBeenCalledTimes(1)

    // open again
    fireEvent.click(document.querySelector('button#modal-trigger'))

    expect(onOpen).toHaveBeenCalledTimes(2)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(
      document.querySelector('div.dnb-modal__content')
    ).toBeInTheDocument()
  })

  it('should open and close by using external state only', async () => {
    const onOpen = jest.fn()
    const onClose = jest.fn()

    const ModalTriggerMock = () => {
      const [modalOpen, setModalOpen] = React.useState(false)

      return (
        <Modal
          noAnimation={true}
          openState={modalOpen}
          onOpen={() => {
            setModalOpen(true)
            onOpen()
          }}
          onClose={() => {
            setModalOpen(false)
            onClose()
          }}
        >
          <DialogContent>
            <Button
              className="close-button"
              text="Close from inside modal"
              onClick={() => setModalOpen(false)}
            />
          </DialogContent>
        </Modal>
      )
    }

    render(<ModalTriggerMock />)

    fireEvent.click(document.querySelector('button'))

    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(0)
    expect(document.querySelector('div.dnb-dialog')).toBeInTheDocument()

    fireEvent.click(document.querySelector('button.close-button'))

    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(
      document.querySelector('div.dnb-dialog')
    ).not.toBeInTheDocument()
  })

  it('has to have the correct aria-describedby', () => {
    render(<Modal {...props} openState={true} />)
    expect(
      document.querySelector(
        `[aria-describedby="dnb-modal-${props.id}-content"]`
      )
    ).toBeInTheDocument()
  })

  it('has to have correct role and aria-modal', () => {
    let elem

    const { rerender } = render(<Modal {...props} openState={true} />)
    elem = document.querySelector('.dnb-modal__content')
    expect(elem).toHaveAttribute('role', 'dialog')
    expect(elem).toHaveAttribute('aria-modal')

    Object.defineProperty(helpers, 'IS_MAC', {
      value: true,
      writable: true,
    })

    rerender(<Modal {...props} openState={true} title="re-render" />)

    elem = document.querySelector('.dnb-modal__content')
    expect(elem).toHaveAttribute('role', 'region')
    expect(elem).not.toHaveAttribute('aria-modal')

    Object.defineProperty(helpers, 'IS_MAC', {
      value: false,
      writable: true,
    })
  })

  it('has to have a close button', () => {
    render(
      <Modal {...props}>
        <Modal.Bar />
      </Modal>
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
    const { rerender } = render(<Modal {...props} title={undefined} />)
    // open modal
    fireEvent.click(document.querySelector('button'))
    expect(
      document
        .querySelector('.dnb-modal__content')
        .getAttribute('aria-label')
    ).toContain('Vindu')

    rerender(<Modal {...props} title="now there is a title" />)
    expect(
      document.querySelector('.dnb-modal__content')
    ).not.toHaveAttribute('aria-label')
  })

  it('has to have aria-labelledby and aria-describedby', () => {
    render(
      <Modal {...props}>
        <DialogContent />
      </Modal>
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
    render(<Modal triggerAttributes={{ text: 'Open Modal' }} />)
    expect(document.querySelector('.dnb-icon')).not.toBeInTheDocument()

    render(
      <Modal
        triggerAttributes={{
          text: 'Open Modal',
          variant: 'tertiary',
          icon: false,
        }}
      />
    )
    expect(document.querySelector('.dnb-icon')).not.toBeInTheDocument()
  })

  it('has to have an icon', () => {
    render(
      <Modal
        triggerAttributes={{ text: 'Open Modal', variant: 'tertiary' }}
      />
    )
    expect(document.querySelector('.dnb-icon')).toBeInTheDocument()
    render(
      <Modal triggerAttributes={{ text: 'Open Modal', icon: 'add' }} />
    )
    expect(document.querySelector('.dnb-icon')).toBeInTheDocument()
  })

  it('should render camelcase props', () => {
    const customText = 'Custom text in camelcase'
    render(
      <Modal triggerAttributes={{ text: customText }} openState={true}>
        The informational content
      </Modal>
    )

    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .querySelector('.dnb-button__text').textContent
    ).toBe(customText)
  })

  describe('onClose', () => {
    it('should have triggeredBy with "unmount" when unmounting', async () => {
      const onClose = jest.fn()

      const { rerender } = render(
        <Modal noAnimation onClose={onClose} openState={true}>
          Content
        </Modal>
      )

      expect(onClose).toHaveBeenCalledTimes(0)

      rerender(
        <Modal noAnimation onClose={onClose} openState={false}>
          Content
        </Modal>
      )

      await userEvent.click(document.querySelector('button#close-button'))
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledWith({
        event: undefined,
        id: expect.any(String),
        triggeredBy: 'unmount',
      })
    })

    it('should have triggeredBy with "button" when closing with button', () => {
      const onClose = jest.fn()

      render(
        <Modal noAnimation onClose={onClose}>
          <ModalHeaderBar />
        </Modal>
      )

      fireEvent.click(document.querySelector('.dnb-modal__trigger'))
      expect(onClose).toHaveBeenCalledTimes(0)

      fireEvent.click(document.querySelector('.dnb-modal__close-button'))
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledWith(
        expect.objectContaining({
          event: expect.any(Object),
          id: expect.any(String),
          type: 'click',
          triggeredBy: 'button',
        })
      )
    })

    it('should have triggeredBy with "overlay" when closing with button', () => {
      const onClose = jest.fn()

      render(
        <Modal noAnimation onClose={onClose}>
          Content
        </Modal>
      )

      fireEvent.click(document.querySelector('.dnb-modal__trigger'))
      expect(onClose).toHaveBeenCalledTimes(0)

      fireEvent.mouseDown(document.querySelector('div.dnb-modal__content'))
      fireEvent.click(document.querySelector('div.dnb-modal__content'))

      expect(onClose).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledWith(
        expect.objectContaining({
          event: expect.any(Object),
          id: expect.any(String),
          type: 'click',
          triggeredBy: 'overlay',
        })
      )
    })

    it('should have triggeredBy with "keydown" when closing with button', async () => {
      const onClose = jest.fn()

      render(
        <Modal noAnimation onClose={onClose}>
          Content
        </Modal>
      )

      fireEvent.click(document.querySelector('.dnb-modal__trigger'))
      expect(onClose).toHaveBeenCalledTimes(0)

      await userEvent.keyboard('{esc}')
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledWith(
        expect.objectContaining({
          event: expect.any(Object),
          id: expect.any(String),
          triggeredBy: 'keyboard',
        })
      )
    })

    it('should have triggeredBy with "handler" when closing with button', () => {
      const onClose = jest.fn()

      render(
        <Modal noAnimation onClose={onClose} hideCloseButton>
          {({ close }) => {
            return (
              <Button id="close-button" text="close" onClick={close} />
            )
          }}
        </Modal>
      )

      fireEvent.click(document.querySelector('.dnb-modal__trigger'))
      expect(onClose).toHaveBeenCalledTimes(0)

      fireEvent.click(document.querySelector('#close-button'))
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledWith(
        expect.objectContaining({
          event: expect.any(Object),
          id: expect.any(String),
          triggeredBy: 'handler',
        })
      )
    })

    describe('StrictMode', () => {
      it('will call onOpen in StrictMode, even it should not be called', () => {
        const onClose = jest.fn()
        const onOpen = jest.fn()

        render(
          <React.StrictMode>
            <Modal noAnimation onOpen={onOpen} onClose={onClose}>
              Content
            </Modal>
          </React.StrictMode>
        )

        fireEvent.click(document.querySelector('.dnb-modal__trigger'))

        expect(onOpen).toHaveBeenCalledTimes(2)
        expect(onClose).toHaveBeenCalledTimes(0)
      })

      it('should not call onClose in StrictMode', () => {
        const onClose = jest.fn()
        const onOpen = jest.fn()

        const MockComponent = () => {
          const [open, setOpen] = React.useState(false)

          const onOpenHandler = (...args) => {
            setOpen(true)
            onOpen(...args)
          }
          const onCloseHandler = (...args) => {
            setOpen(false)
            onClose(...args)
          }

          return (
            <>
              <Button onClick={() => setOpen((s) => !s)}>Toggle</Button>
              <Modal
                noAnimation
                omitTriggerButton
                openState={open}
                onOpen={onOpenHandler}
                onClose={onCloseHandler}
              >
                Content
              </Modal>
            </>
          )
        }

        process.env.NODE_ENV = 'something-else'

        render(
          <React.StrictMode>
            <MockComponent />
          </React.StrictMode>
        )

        fireEvent.click(document.querySelector('button'))

        expect(onOpen).toHaveBeenCalledTimes(2)
        expect(onClose).toHaveBeenCalledTimes(0)

        process.env.NODE_ENV = 'test'
      })
    })
  })
})

describe('Modal trigger', () => {
  const roledescription = 'Hjelp-knapp'

  it('will act by default as a HelpButton', () => {
    render(<Modal {...props} triggerAttributes={{ text: '' }} />)
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .getAttribute('aria-roledescription')
    ).toBe(roledescription)
  })

  it('will have a aria-label', () => {
    render(
      <Modal {...props} triggerAttributes={{ 'aria-label': 'label' }} />
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
    render(<Modal {...props} triggerAttributes={{ text: 'text' }} />)
    expect(
      document.querySelector('button.dnb-modal__trigger')
    ).not.toHaveAttribute('aria-roledescription')
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .querySelector('.dnb-button__icon')
    ).not.toBeInTheDocument()
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .textContent.replace(/\u200C/g, '')
    ).toBe('text')
  })

  it('will not act as a HelpButton if a different icon was given', () => {
    render(<Modal {...props} triggerAttributes={{ icon: 'bell' }} />)
    expect(
      document.querySelector('button.dnb-modal__trigger')
    ).not.toHaveAttribute('aria-roledescription')
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .querySelector('.dnb-button__icon')
    ).toBeInTheDocument()
  })

  it('will not act as a HelpButton if trigger text was given', () => {
    render(<Modal {...props} triggerAttributes={{ text: 'text' }} />)
    expect(
      document.querySelector('button.dnb-modal__trigger')
    ).not.toHaveAttribute('aria-roledescription')
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .querySelector('.dnb-button__icon')
    ).not.toBeInTheDocument()
    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .textContent.replace(/\u200C/g, '')
    ).toBe('text')
  })
})

describe('Modal ARIA', () => {
  it('should validate with ARIA rules as a dialog', async () => {
    const Comp = render(<Modal {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Modal scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
