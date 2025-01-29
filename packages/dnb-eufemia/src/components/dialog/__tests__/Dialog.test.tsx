import React from 'react'
import Dialog from '../Dialog'
import { DialogContentProps, DialogProps } from '../types'
import Button from '../../button/Button'
import Provider from '../../../shared/Provider'
import { loadScss, axeComponent } from '../../../core/jest/jestSetup'
import * as helpers from '../../../shared/helpers'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'

const props: DialogProps & DialogContentProps = {
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

describe('Dialog', () => {
  it('will run bodyScrollLock with disableBodyScroll', () => {
    render(
      <Dialog {...props}>
        <button>button</button>
      </Dialog>
    )

    expect(document.body.getAttribute('style')).toBe(null)

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    expect(document.body.getAttribute('style')).toContain(
      'overflow: hidden;'
    )
  })

  it('appears on trigger click', () => {
    render(
      <Dialog {...props}>
        <button>button</button>
      </Dialog>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    expect(
      document.querySelector('button.dnb-modal__close-button')
    ).toBeInTheDocument()
  })

  it('omits trigger button once we set omitTriggerButton', () => {
    render(<Dialog {...props} omitTriggerButton />)

    expect(
      document.querySelector('button.dnb-modal__trigger')
    ).not.toBeInTheDocument()
  })

  it('will close by using callback method', () => {
    const on_close = jest.fn()
    const on_open = jest.fn()
    render(
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
    fireEvent.click(document.querySelector('button'))
    expect(on_open).toHaveBeenCalledTimes(1)

    fireEvent.click(document.querySelector('button#close-me'))
    expect(on_close).toHaveBeenCalledTimes(1)
  })

  it('will accept custom refs', () => {
    const contentRef = React.createRef<HTMLElement>()
    const scrollRef = React.createRef<HTMLElement>()

    const MockComponent = () => {
      return (
        <Dialog
          openState
          noAnimation
          contentRef={contentRef}
          scrollRef={scrollRef}
        >
          content
        </Dialog>
      )
    }

    render(<MockComponent />)

    expect(contentRef.current).toBeTruthy()
    expect(scrollRef.current).toBeTruthy()
  })

  it('will use props from global context', () => {
    const contextTitle = 'Custom title'
    render(
      <Provider
        value={{
          Dialog: { title: contextTitle },
        }}
      >
        <Dialog />
      </Provider>
    )

    fireEvent.click(document.querySelector('button'))

    expect(document.querySelector('.dnb-dialog__title').textContent).toBe(
      contextTitle
    )
  })

  it('will set correct class when verticalAlignment is set to top', () => {
    render(<Dialog verticalAlignment="top" />)

    fireEvent.click(document.querySelector('button'))

    expect(document.querySelector('.dnb-modal__content')).toHaveClass(
      'dnb-modal__vertical-alignment--top'
    )
  })

  it('has to have correct role', () => {
    const { rerender } = render(
      <Dialog {...props} openState={true}>
        <button>button</button>
      </Dialog>
    )
    const elem = document.querySelector('.dnb-modal__content')
    expect(elem.getAttribute('role')).toBe('dialog')
    expect(elem).toHaveAttribute('aria-modal')

    Object.defineProperty(helpers, 'IS_MAC', {
      value: true,
      writable: true,
    })

    rerender(
      <Dialog {...props} openState={true} title="re-render">
        <button>button</button>
      </Dialog>
    )

    expect(elem.getAttribute('role')).toBe('region')
    expect(elem).not.toHaveAttribute('aria-modal')

    Object.defineProperty(helpers, 'IS_MAC', {
      value: false,
      writable: true,
    })

    rerender(
      <Dialog
        {...props}
        openState={true}
        title="re-render"
        variant="confirmation"
      >
        <button>button</button>
      </Dialog>
    )

    expect(elem.getAttribute('role')).toBe('alertdialog')
    expect(elem).toHaveAttribute('aria-modal')
  })

  it('omits action buttons when hideDecline or hideConfirm is given', () => {
    const props: DialogProps & DialogContentProps = {
      noAnimation: true,
      openState: true,
      variant: 'confirmation',
    }
    const { rerender } = render(<Dialog {...props} />)

    expect(screen.queryAllByText('Godta')).toHaveLength(1)
    expect(screen.queryAllByText('Avbryt')).toHaveLength(1)

    rerender(<Dialog {...props} hideDecline />)

    expect(screen.queryAllByText('Godta')).toHaveLength(1)
    expect(screen.queryAllByText('Avbryt')).toHaveLength(0)

    rerender(<Dialog {...props} hideConfirm />)

    expect(screen.queryAllByText('Godta')).toHaveLength(0)
    expect(screen.queryAllByText('Avbryt')).toHaveLength(1)
  })

  it('is closed by keyboardevent esc', () => {
    let testTriggeredBy = null
    const on_close = jest.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )

    const props: DialogProps & DialogContentProps = {
      directDomReturn: false,
      noAnimation: true,
    }
    render(<Dialog {...props} id="modal-dialog" onClose={on_close} />)

    fireEvent.click(document.querySelector('button#modal-dialog'))
    fireEvent.keyDown(document.querySelector('div.dnb-dialog'), {
      key: 'Esc',
      keyCode: 27,
    })
    expect(on_close).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe('keyboard')
  })

  it('is closed by keyboardevent esc by window listener', async () => {
    const on_close = jest.fn()

    const props: DialogProps & DialogContentProps = {
      directDomReturn: false,
      noAnimation: true,
    }
    render(<Dialog {...props} id="modal-dialog" onClose={on_close} />)

    fireEvent.click(document.querySelector('button#modal-dialog'))
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    await waitFor(() => {
      expect(on_close).toHaveBeenCalledTimes(1)
    })
  })

  it('has support for nested Dialogs', async () => {
    global.console.log = jest.fn()

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

    const getComponent = (props) => {
      return (
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
    }

    render(
      getComponent({
        directDomReturn: false,
        noAnimation: true,
      })
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
      document.querySelector('button.dnb-modal__close-button')
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
      document.querySelector('button.dnb-modal__close-button')
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
      document.querySelector('button.dnb-modal__close-button')
    ).not.toHaveAttribute('aria-hidden')

    // Close the first one
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    await waitFor(() => {
      expect(on_close.first).toHaveBeenCalledTimes(1)
      expect(on_close.second).toHaveBeenCalledTimes(1)
      expect(on_close.third).toHaveBeenCalledTimes(1)

      expect(
        document.querySelector('#content-first')
      ).not.toBeInTheDocument()
      expect(document.documentElement).not.toHaveAttribute(
        'data-dnb-modal-active'
      )
    })
  })

  it('will close dialog by using callback method', () => {
    const onClose = jest.fn()
    const onOpen = jest.fn()

    render(
      <Dialog
        noAnimation={true}
        onOpen={onOpen}
        onClose={onClose}
        hideCloseButton
      >
        {({ close }) => (
          <Button id="close-button" text="close" on_click={close} />
        )}
      </Dialog>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))
    expect(onOpen).toHaveBeenCalledTimes(1)

    fireEvent.click(document.querySelector('button#close-button'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('can contain dialog parts', () => {
    render(
      <Dialog noAnimation directDomReturn={false}>
        <Dialog.Navigation>navigation</Dialog.Navigation>
        <Dialog.Header>header</Dialog.Header>
        <Dialog.Body>body</Dialog.Body>
      </Dialog>
    )

    fireEvent.click(document.querySelector('button'))

    const elements = document.querySelectorAll(
      '.dnb-dialog__content > .dnb-section'
    )
    expect(elements[0].textContent).toContain('navigation')
    expect(elements[1].textContent).toContain('header')
    expect(elements[2].textContent).toContain('body')

    expect(
      document.querySelectorAll('button.dnb-modal__close-button').length
    ).toBe(1)
  })

  it('does not close with click on overlay for variant confirmation', async () => {
    render(<Dialog {...props} variant="confirmation" openState="opened" />)

    fireEvent.click(document.querySelector('.dnb-modal__content'))
    expect(
      document.querySelector('.dnb-dialog__inner')
    ).toBeInTheDocument()

    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    await waitFor(() => {
      expect(
        document.querySelector('.dnb-dialog__inner')
      ).not.toBeInTheDocument()
    })
  })
})

describe('Dialog aria', () => {
  it('should validate with ARIA rules as a dialog', async () => {
    global.console.log = jest.fn()
    const Comp = render(<Dialog {...props} openState={true} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Dialog scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
