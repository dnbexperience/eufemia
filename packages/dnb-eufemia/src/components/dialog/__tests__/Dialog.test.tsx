import { useState } from 'react'
import type { ReactNode, RefObject } from 'react'
import Dialog from '../Dialog'
import type { DialogContentProps, DialogProps } from '../types'
import type { ModalContentProps } from '../../modal/types'
import Button from '../../button/Button'
import Provider from '../../../shared/Provider'
import { loadScss, axeComponent } from '../../../core/test-utils/testSetup'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { Form } from '../../../extensions/forms'
import Translation from '../../../shared/Translation'
import userEvent from '@testing-library/user-event'

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
    const onClose = vi.fn()
    const onOpen = vi.fn()
    render(
      <Dialog
        noAnimation
        onOpen={onOpen}
        onClose={onClose}
        hideCloseButton
      >
        {
          (({ close }) => (
            <Button id="close-me" text="close" onClick={close} />
          )) as (props: ModalContentProps) => ReactNode
        }
      </Dialog>
    )
    fireEvent.click(document.querySelector('button'))
    expect(onOpen).toHaveBeenCalledTimes(1)

    fireEvent.click(document.querySelector('button#close-me'))
    expect(onClose).toHaveBeenCalledTimes(1)
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
        <Dialog
          open
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

  it('accepts a <Translation> title', () => {
    render(
      <Provider value={{ locale: 'en-GB' }}>
        <Dialog
          noAnimation
          open
          title={<Translation id="Modal.dialogTitle" />}
        />
      </Provider>
    )

    expect(document.querySelector('.dnb-dialog__title').textContent).toBe(
      'Dialog Window'
    )
  })

  it('accepts a <Translation> title and renders it in the HelpButton Tooltip', async () => {
    render(
      <Provider value={{ locale: 'en-GB' }}>
        <Dialog
          noAnimation
          open
          title={<Translation id="Modal.dialogTitle" />}
        />
      </Provider>
    )

    await userEvent.hover(document.querySelector('.dnb-modal__trigger'))

    await waitFor(() => {
      expect(
        document.body.querySelector('.dnb-tooltip')
      ).toBeInTheDocument()
    })

    expect(document.body.querySelector('.dnb-tooltip').textContent).toBe(
      'Dialog Window'
    )
  })

  it('will set correct class when verticalAlignment is set to top', () => {
    render(<Dialog verticalAlignment="top" />)

    fireEvent.click(document.querySelector('button'))

    expect(document.querySelector('.dnb-modal__content')).toHaveClass(
      'dnb-modal__vertical-alignment--top'
    )
  })

  it('should have correct role', () => {
    const { rerender } = render(
      <Dialog {...props} open={true}>
        <button>button</button>
      </Dialog>
    )
    const elem = document.querySelector('.dnb-modal__content')
    expect(elem.getAttribute('role')).toBe('dialog')
    expect(elem).toHaveAttribute('aria-modal')

    rerender(
      <Dialog
        {...props}
        open={true}
        title="re-render"
        variant="confirmation"
      >
        <button>button</button>
      </Dialog>
    )

    expect(elem.getAttribute('role')).toBe('alertdialog')
    expect(elem).toHaveAttribute('aria-modal')
  })

  it('displays a status message via the confirm button when status prop is given', () => {
    const { rerender } = render(
      <Dialog {...props} open variant="confirmation" title="Title">
        content
      </Dialog>
    )

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    rerender(
      <Dialog
        {...props}
        open
        variant="confirmation"
        title="Title"
        status="Something went wrong"
      >
        content
      </Dialog>
    )

    const confirmButton = document.querySelector(
      '.dnb-dialog__actions .dnb-button--primary'
    )
    expect(confirmButton).toHaveClass('dnb-button__status--error')
  })

  it('renders the status message text via FormStatus', () => {
    render(
      <Dialog
        {...props}
        open
        variant="confirmation"
        title="Title"
        status="Something went wrong"
      >
        content
      </Dialog>
    )

    const formStatus = document.querySelector('.dnb-form-status')
    expect(formStatus).toBeInTheDocument()
    expect(formStatus.textContent).toBe('Something went wrong')
  })

  it('connects the status message to the confirm button via aria-describedby', () => {
    render(
      <Dialog
        {...props}
        open
        variant="confirmation"
        title="Title"
        status="Something went wrong"
      >
        content
      </Dialog>
    )

    const statusTextId = document
      .querySelector('.dnb-form-status__text')
      .getAttribute('id')
    expect(statusTextId).toBeTruthy()

    const confirmButton = document.querySelector(
      '.dnb-dialog__actions .dnb-button--primary'
    )
    expect(
      (confirmButton.getAttribute('aria-describedby') || '').split(/\s+/)
    ).toContain(statusTextId)
  })

  it('connects the status message to the decline button when hideConfirm is given', () => {
    render(
      <Dialog
        {...props}
        open
        variant="confirmation"
        title="Title"
        status="Something went wrong"
        hideConfirm
      >
        content
      </Dialog>
    )

    const statusTextId = document
      .querySelector('.dnb-form-status__text')
      .getAttribute('id')
    expect(statusTextId).toBeTruthy()

    const declineButton = document.querySelector(
      '.dnb-dialog__actions .dnb-button--secondary'
    )
    expect(
      (declineButton.getAttribute('aria-describedby') || '').split(/\s+/)
    ).toContain(statusTextId)
  })

  it('connects the status message to custom action buttons via aria-describedby', () => {
    render(
      <Dialog {...props} open variant="confirmation" title="Title">
        <Dialog.Action status="Something went wrong">
          <Button text="Custom" />
        </Dialog.Action>
      </Dialog>
    )

    const statusTextId = document
      .querySelector('.dnb-form-status__text')
      .getAttribute('id')
    expect(statusTextId).toBeTruthy()

    const customButton = document.querySelector(
      '.dnb-dialog__actions .dnb-button'
    )
    expect(
      (customButton.getAttribute('aria-describedby') || '').split(/\s+/)
    ).toContain(statusTextId)
  })

  it('does not reference the status from the decline button by default', () => {
    render(
      <Dialog
        {...props}
        open
        variant="confirmation"
        title="Title"
        status="Something went wrong"
      >
        content
      </Dialog>
    )

    const declineButton = document.querySelector(
      '.dnb-dialog__actions .dnb-button--secondary'
    )
    expect(declineButton).not.toHaveAttribute('aria-describedby')
  })

  it('omits action buttons when hideDecline or hideConfirm is given', () => {
    const props: DialogProps & DialogContentProps = {
      noAnimation: true,
      open: true,
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
    const onClose = vi.fn(
      ({ triggeredBy }) => (testTriggeredBy = triggeredBy)
    )

    const props: DialogProps & DialogContentProps = {
      directDomReturn: false,
      noAnimation: true,
    }
    render(<Dialog {...props} id="modal-dialog" onClose={onClose} />)

    fireEvent.click(document.querySelector('button#modal-dialog'))
    fireEvent.keyDown(document.querySelector('div.dnb-dialog'), {
      key: 'Escape',
    })
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(testTriggeredBy).toBe('keyboard')
  })

  it('is closed by keyboardevent esc by window listener', async () => {
    const onClose = vi.fn()

    const props: DialogProps & DialogContentProps = {
      directDomReturn: false,
      noAnimation: true,
    }
    render(<Dialog {...props} id="modal-dialog" onClose={onClose} />)

    fireEvent.click(document.querySelector('button#modal-dialog'))
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  it('moves focus to content by default when opened', async () => {
    render(<Dialog noAnimation open title="Title" />)

    await waitFor(() => {
      const content = document.querySelector('.dnb-modal__content')
      expect(content).toBeInTheDocument()
      expect(document.activeElement).toBe(content)
    })
  })

  it('respects focusSelector over dialog container and close button', async () => {
    render(
      <Dialog noAnimation open title="Title" focusSelector="#focus-me">
        <Dialog.Body>
          <input id="focus-me" />
        </Dialog.Body>
      </Dialog>
    )

    await waitFor(() => {
      expect(document.activeElement?.id).toBe('focus-me')
    })

    const content = document.querySelector('.dnb-modal__content')
    expect(content).toBeInTheDocument()
    expect(document.activeElement).not.toBe(content)

    const closeBtn = document.querySelector(
      'button.dnb-modal__close-button'
    ) as HTMLButtonElement
    expect(closeBtn).toBeInTheDocument()
    expect(document.activeElement).not.toBe(closeBtn)
  })

  it('returns focus to trigger with data-autofocus after close', async () => {
    render(<Dialog noAnimation animationDuration={3} title="Title" />)

    // Open via trigger
    const trigger = document.querySelector(
      'button.dnb-modal__trigger'
    ) as HTMLButtonElement
    fireEvent.click(trigger)

    // Close with ESC
    fireEvent.keyDown(document.querySelector('div.dnb-dialog'), {
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

  it('has support for nested Dialogs', async () => {
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

    const getComponent = (props) => {
      return (
        <Dialog
          {...props}
          id="modal-first"
          onOpen={onOpen.first}
          onClose={onClose.first}
        >
          <button id="content-first">content</button>
          <Dialog
            {...props}
            id="modal-second"
            onOpen={onOpen.second}
            onClose={onClose.second}
          >
            <button id="content-second">content</button>
            <Dialog
              {...props}
              id="modal-third"
              onOpen={onOpen.third}
              onClose={onClose.third}
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
      document.querySelector('button.dnb-modal__close-button')
    ).not.toHaveAttribute('aria-hidden')

    // Close the first one
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await waitFor(() => {
      expect(onClose.first).toHaveBeenCalledTimes(1)
      expect(onClose.second).toHaveBeenCalledTimes(1)
      expect(onClose.third).toHaveBeenCalledTimes(1)

      expect(
        document.querySelector('#content-first')
      ).not.toBeInTheDocument()
      expect(document.documentElement).not.toHaveAttribute(
        'data-dnb-modal-active'
      )
    })
  })

  it('closes only the nested confirmation dialog when declining', async () => {
    const onCloseOuter = vi.fn()
    const onCloseInner = vi.fn()

    render(
      <Dialog
        noAnimation
        id="outer-dialog"
        title="Outer"
        onClose={onCloseOuter}
      >
        <Dialog
          noAnimation
          id="inner-dialog"
          variant="confirmation"
          title="Confirm?"
          triggerProps={{ text: 'Delete' }}
          onClose={onCloseInner}
        />
      </Dialog>
    )

    // Open outer dialog
    fireEvent.click(document.querySelector('button#outer-dialog'))
    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('outer-dialog')

    // Open inner confirmation dialog
    fireEvent.click(document.querySelector('button#inner-dialog'))
    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('inner-dialog')

    // Click decline (Avbryt) – should close only the inner dialog
    const declineButton = Array.from(
      document.querySelectorAll('.dnb-dialog__actions button')
    ).find((btn) => btn.classList.contains('dnb-button--secondary'))

    fireEvent.click(declineButton)

    await waitFor(() => {
      expect(onCloseInner).toHaveBeenCalledTimes(1)
      expect(onCloseOuter).toHaveBeenCalledTimes(0)
    })

    expect(
      document.documentElement.getAttribute('data-dnb-modal-active')
    ).toBe('outer-dialog')
  })

  it('will close dialog by using callback method', () => {
    const onClose = vi.fn()
    const onOpen = vi.fn()

    render(
      <Dialog
        noAnimation={true}
        onOpen={onOpen}
        onClose={onClose}
        hideCloseButton
      >
        {
          (({ close }) => (
            <Button id="close-button" text="close" onClick={close} />
          )) as (props: ModalContentProps) => ReactNode
        }
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
    render(<Dialog {...props} variant="confirmation" open={true} />)

    fireEvent.click(document.querySelector('.dnb-modal__content'))
    expect(
      document.querySelector('.dnb-dialog__inner')
    ).toBeInTheDocument()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await waitFor(() => {
      expect(
        document.querySelector('.dnb-dialog__inner')
      ).not.toBeInTheDocument()
    })
  })

  it('sets focus inside modal when opened after form submission, not on submit button', async () => {
    const TestComponent = () => {
      const [isOpen, setIsOpen] = useState(false)

      return (
        <Form.Handler
          onSubmit={async () => {
            await new Promise((r) => setTimeout(r, 100))
            setIsOpen(true)
          }}
        >
          <Dialog
            noAnimation
            open={isOpen}
            onClose={() => setIsOpen(false)}
            title="Test Dialog"
          >
            <input
              className="modal-input"
              placeholder="Focus should be here"
            />
          </Dialog>

          <Form.SubmitButton>Submit</Form.SubmitButton>
        </Form.Handler>
      )
    }

    render(<TestComponent />)

    const submitButton = document.querySelector('.dnb-forms-submit-button')

    // Click the submit button
    fireEvent.click(submitButton)

    // Wait for the modal to open and focus to be set
    await waitFor(() => {
      expect(document.querySelector('.modal-input')).toBeInTheDocument()
    })

    // Wait a bit more for focus management to complete
    await waitFor(() => {
      const content = document.querySelector('.dnb-modal__content')
      expect(content).toBeInTheDocument()
      expect(document.activeElement).toBe(content)
    })

    // Verify that focus is NOT on the submit button
    expect(document.activeElement).not.toBe(submitButton)
  })

  it('should open controlled dialog without noAnimation', async () => {
    const originalIsTest = window['IS_TEST']
    window['IS_TEST'] = false

    try {
      const TestComponent = () => {
        const [showDialog, setShowDialog] = useState(false)

        return (
          <>
            <button
              data-testid="trigger"
              onClick={() => setShowDialog(true)}
            >
              Open
            </button>
            <Dialog
              omitTriggerButton
              open={showDialog}
              onClose={() => setShowDialog(false)}
            >
              Dialog content
              <button
                data-testid="close"
                onClick={() => setShowDialog(false)}
              >
                Close
              </button>
            </Dialog>
          </>
        )
      }

      render(<TestComponent />)

      const triggerButton = document.querySelector(
        '[data-testid="trigger"]'
      )

      expect(document.querySelector('.dnb-dialog')).not.toBeInTheDocument()

      // Open
      await userEvent.click(triggerButton)

      await waitFor(() => {
        expect(document.querySelector('.dnb-dialog')).toBeInTheDocument()
      })

      await userEvent.click(
        document.querySelector('[data-testid="close"]')
      )

      // Reopen while the close animation is still in progress.
      await userEvent.click(triggerButton)

      await new Promise((resolve) => setTimeout(resolve, 350))

      expect(document.querySelector('.dnb-dialog')).toBeInTheDocument()
    } finally {
      window['IS_TEST'] = originalIsTest
    }
  })
})

describe('Dialog aria', () => {
  it('should validate with ARIA rules as a dialog', async () => {
    global.console.log = vi.fn()
    const Comp = render(<Dialog {...props} open={true} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('scrollbarGutter', () => {
  it('should add scrollbar-gutter class by default for information variant', () => {
    render(
      <Dialog {...props} open>
        content
      </Dialog>
    )

    const scrollView = document.querySelector('.dnb-scroll-view')
    expect(scrollView).toHaveClass(
      'dnb-scroll-view--scrollbar-gutter-stable'
    )
  })

  it('should not add scrollbar-gutter class for confirmation variant', () => {
    render(
      <Dialog {...props} open variant="confirmation">
        content
      </Dialog>
    )

    const scrollView = document.querySelector('.dnb-scroll-view')
    expect(scrollView).not.toHaveClass(
      'dnb-scroll-view--scrollbar-gutter-stable'
    )
  })

  it('should not add scrollbar-gutter class when spacing is false', () => {
    render(
      <Dialog {...props} open spacing={false}>
        content
      </Dialog>
    )

    const scrollView = document.querySelector('.dnb-scroll-view')
    expect(scrollView).not.toHaveClass(
      'dnb-scroll-view--scrollbar-gutter-stable'
    )
  })

  it('should always add scrollbar-gutter class when set to stable', () => {
    render(
      <Dialog
        {...props}
        open
        variant="confirmation"
        scrollbarGutter="stable"
      >
        content
      </Dialog>
    )

    const scrollView = document.querySelector('.dnb-scroll-view')
    expect(scrollView).toHaveClass(
      'dnb-scroll-view--scrollbar-gutter-stable'
    )
  })

  it('should not add scrollbar-gutter class when set to false', () => {
    render(
      <Dialog {...props} open scrollbarGutter={false}>
        content
      </Dialog>
    )

    const scrollView = document.querySelector('.dnb-scroll-view')
    expect(scrollView).not.toHaveClass(
      'dnb-scroll-view--scrollbar-gutter-stable'
    )
  })
})

describe('Dialog triggerProps', () => {
  it('should forward text to the trigger button', () => {
    render(<Dialog triggerProps={{ text: 'Open Dialog' }} {...props} />)

    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .querySelector('.dnb-button__text').textContent
    ).toBe('Open Dialog')
  })

  it('should forward variant to the trigger button', () => {
    render(
      <Dialog
        triggerProps={{ text: 'Open Dialog', variant: 'primary' }}
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
      <Dialog triggerProps={{ onClick }} {...props}>
        Dialog content
      </Dialog>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should not omit trigger button for confirmation variant when triggerProps is set', () => {
    render(
      <Dialog
        variant="confirmation"
        triggerProps={{ text: 'Confirm' }}
        {...props}
      />
    )

    expect(
      document.querySelector('button.dnb-modal__trigger')
    ).toBeInTheDocument()
  })
})

describe('Dialog scss', () => {
  it('should match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
