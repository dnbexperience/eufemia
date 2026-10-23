import { act, StrictMode, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Popover from '../Popover'
import type { PopoverProps } from '../Popover'
import Button from '../../button/Button'

const nextFrame = () => act(() => new Promise(requestAnimationFrame))

async function openPopover() {
  await userEvent.click(document.querySelector('button[aria-controls]'))
  await waitFor(() =>
    expect(document.querySelector('.dnb-popover__content')).toHaveFocus()
  )
}

describe('Popover focus restoration', () => {
  it('restores focus when the controlled open prop becomes false', async () => {
    function Example() {
      const [open, setOpen] = useState(false)

      return (
        <Popover
          open={open}
          onOpenChange={setOpen}
          noAnimation
          trigger={<button>Open</button>}
        >
          <button onClick={() => setOpen(false)}>Done</button>
        </Popover>
      )
    }

    render(<Example />)
    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)
    await userEvent.click(
      document.querySelector('.dnb-popover__body button')
    )

    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('falls back to the opener when the positioning target cannot receive focus', async () => {
    function Example() {
      const [open, setOpen] = useState(false)

      return (
        <>
          <button id="opener" onClick={() => setOpen(true)}>
            Open
          </button>
          <div id="anchor" />
          <Popover
            open={open}
            onOpenChange={setOpen}
            targetSelector="#anchor"
            noAnimation
          >
            Content
          </Popover>
        </>
      )
    }

    render(<Example />)
    const opener = document.querySelector('#opener')
    await userEvent.click(opener)
    await waitFor(() =>
      expect(document.querySelector('.dnb-popover__content')).toHaveFocus()
    )
    await userEvent.keyboard('{Escape}')

    await waitFor(() => expect(opener).toHaveFocus())
  })

  it('does not restore focus when a controlled close request is ignored', async () => {
    render(
      <Popover open noAnimation trigger={<button>Open</button>}>
        Content
      </Popover>
    )
    const content = document.querySelector('.dnb-popover__content')
    await waitFor(() => expect(content).toHaveFocus())

    await userEvent.keyboard('{Escape}')
    await nextFrame()

    expect(content).toHaveFocus()
  })

  it.each(['disabled', 'removed'])(
    'falls back to the opener when the positioning target is %s on close',
    async (state) => {
      function Example() {
        const [open, setOpen] = useState(false)
        const [closed, setClosed] = useState(false)

        return (
          <>
            <button id="opener" onClick={() => setOpen(true)}>
              Open
            </button>
            {!(closed && state === 'removed') && (
              <button id="anchor" disabled={closed}>
                Anchor
              </button>
            )}
            <Popover
              open={open}
              onOpenChange={setOpen}
              targetSelector="#anchor"
              noAnimation
            >
              <button
                onClick={() => {
                  setClosed(true)
                  setOpen(false)
                }}
              >
                Done
              </button>
            </Popover>
          </>
        )
      }

      render(<Example />)
      const opener = document.querySelector('#opener')
      await userEvent.click(opener)
      await userEvent.click(
        document.querySelector('.dnb-popover__body button')
      )
      await waitFor(() => expect(opener).toHaveFocus())
    }
  )

  it('captures the current opener on each opening', async () => {
    function Example() {
      const [open, setOpen] = useState(false)
      return (
        <>
          <button id="first" onClick={() => setOpen(true)}>
            First
          </button>
          <button id="second" onClick={() => setOpen(true)}>
            Second
          </button>
          <div id="anchor" />
          <Popover
            open={open}
            onOpenChange={setOpen}
            targetSelector="#anchor"
            noAnimation
          >
            Content
          </Popover>
        </>
      )
    }

    render(<Example />)
    for (const id of ['first', 'second']) {
      const opener = document.getElementById(id)
      await userEvent.click(opener)
      await waitFor(() =>
        expect(
          document.querySelector('.dnb-popover__content')
        ).toHaveFocus()
      )
      await userEvent.keyboard('{Escape}')
      await waitFor(() => expect(opener).toHaveFocus())
    }
  })

  it('does not move focus when rendered closed or rerendered closed', async () => {
    const { rerender } = render(
      <Popover open={false} trigger={<button>Open</button>}>
        Content
      </Popover>
    )
    const focus = vi.spyOn(HTMLElement.prototype, 'focus')

    rerender(
      <Popover open={false} trigger={<button>Open</button>}>
        Updated content
      </Popover>
    )
    await nextFrame()

    expect(focus).not.toHaveBeenCalled()
    focus.mockRestore()
  })

  it.each(['element', 'ref', 'callback', 'component ref'])(
    'restores focus to an explicit %s before trying the trigger',
    async (kind) => {
      const targetRef: RefObject<HTMLButtonElement | null> = {
        current: null,
      }
      const componentRef = { current: { _ref: targetRef } }
      let target: PopoverProps['restoreFocusTo']

      render(<button ref={targetRef}>Destination</button>)
      if (kind === 'element') {
        target = targetRef.current
      } else if (kind === 'ref') {
        target = targetRef
      } else if (kind === 'component ref') {
        target = componentRef as unknown as RefObject<HTMLElement>
      } else {
        target = () => targetRef.current
      }

      render(
        <Popover
          noAnimation
          trigger={<button>Open</button>}
          restoreFocusTo={target}
        >
          Content
        </Popover>
      )
      await openPopover()
      await userEvent.keyboard('{Escape}')

      await waitFor(() => expect(targetRef.current).toHaveFocus())
      expect(
        document.querySelector('.dnb-popover__trigger')
      ).not.toHaveAttribute('restoreFocusTo')
    }
  )

  it.each([
    'null',
    'detached',
    'disabled',
    'non-focusable',
    'throwing callback',
    'throwing focus',
    'body',
  ])(
    'falls back to the trigger for a %s explicit target',
    async (kind) => {
      const element = document.createElement(
        kind === 'non-focusable' ? 'div' : 'button'
      )
      let target: PopoverProps['restoreFocusTo'] = element
      if (kind !== 'detached') {
        document.body.append(element)
      }
      if (kind === 'null') {
        target = () => null
      } else if (kind === 'body') {
        target = document.body
      } else if (kind === 'disabled') {
        element.setAttribute('disabled', '')
      } else if (kind === 'throwing callback') {
        target = () => {
          throw new Error('Unavailable target')
        }
      } else if (kind === 'throwing focus') {
        element.focus = () => {
          throw new Error('Unavailable focus')
        }
      }

      try {
        render(
          <Popover
            noAnimation
            trigger={<button>Open</button>}
            restoreFocusTo={target}
          >
            Content
          </Popover>
        )
        await openPopover()
        await userEvent.keyboard('{Escape}')
        await waitFor(() =>
          expect(
            document.querySelector('.dnb-popover__trigger')
          ).toHaveFocus()
        )
      } finally {
        element.remove()
      }
    }
  )

  it('uses the current custom ref at restoration time', async () => {
    const targetRef: RefObject<HTMLElement | null> = { current: null }
    render(
      <>
        <button id="destination">Destination</button>
        <Popover
          noAnimation
          trigger={<button>Open</button>}
          restoreFocusTo={targetRef}
        >
          Content
        </Popover>
      </>
    )
    await openPopover()
    targetRef.current = document.querySelector('#destination')
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(targetRef.current).toHaveFocus())
  })

  it('resolves an Eufemia Button ref', async () => {
    function Example() {
      const targetRef = useRef<HTMLButtonElement>(null)
      return (
        <>
          <Button id="destination" ref={targetRef}>
            Destination
          </Button>
          <Popover
            noAnimation
            trigger={<button>Open</button>}
            restoreFocusTo={targetRef}
          >
            Content
          </Popover>
        </>
      )
    }
    render(<Example />)
    await openPopover()
    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(document.querySelector('#destination')).toHaveFocus()
    )
  })

  it('honors restoreFocus=false for controlled closing and custom targets', async () => {
    const target = vi.fn()
    const props = {
      noAnimation: true,
      restoreFocus: false,
      restoreFocusTo: target,
      trigger: <button>Open</button>,
    }
    const { rerender } = render(
      <Popover {...props} open>
        Content
      </Popover>
    )
    await waitFor(() =>
      expect(document.querySelector('.dnb-popover__content')).toHaveFocus()
    )
    const focus = vi.spyOn(HTMLElement.prototype, 'focus')
    rerender(
      <Popover {...props} open={false}>
        Content
      </Popover>
    )
    await nextFrame()
    expect(focus).not.toHaveBeenCalled()
    expect(target).not.toHaveBeenCalled()
    focus.mockRestore()
  })

  it('cancels pending restoration when reopened', async () => {
    const props = { noAnimation: true, trigger: <button>Open</button> }
    const { rerender } = render(
      <Popover {...props} open>
        Content
      </Popover>
    )
    await waitFor(() =>
      expect(document.querySelector('.dnb-popover__content')).toHaveFocus()
    )
    const trigger = document.querySelector(
      '.dnb-popover__trigger'
    ) as HTMLElement
    const focus = vi.spyOn(trigger, 'focus')
    rerender(
      <Popover {...props} open={false}>
        Content
      </Popover>
    )
    rerender(
      <Popover {...props} open>
        Content
      </Popover>
    )
    await nextFrame()
    expect(focus).not.toHaveBeenCalled()
    expect(document.querySelector('.dnb-popover__content')).toHaveFocus()
    focus.mockRestore()
  })

  it('cancels pending restoration on unmount', async () => {
    const target = vi.fn()
    const props = {
      noAnimation: true,
      restoreFocusTo: target,
      trigger: <button>Open</button>,
    }
    const { rerender, unmount } = render(
      <Popover {...props} open>
        Content
      </Popover>
    )
    await waitFor(() =>
      expect(document.querySelector('.dnb-popover__content')).toHaveFocus()
    )
    rerender(
      <Popover {...props} open={false}>
        Content
      </Popover>
    )
    unmount()
    await nextFrame()
    expect(target).not.toHaveBeenCalled()
  })

  it('restores focus in StrictMode with content kept in the DOM', async () => {
    render(
      <StrictMode>
        <Popover noAnimation keepInDOM trigger={<button>Open</button>}>
          Content
        </Popover>
      </StrictMode>
    )
    await openPopover()
    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(document.querySelector('.dnb-popover__trigger')).toHaveFocus()
    )
  })

  it.each(['click', 'tap'])(
    'does not restore to a custom target after an outside %s',
    async (method) => {
      const restoreFocusTo = vi.fn()
      render(
        <>
          <Popover
            noAnimation
            restoreFocusTo={restoreFocusTo}
            trigger={<button>Open</button>}
          >
            Content
          </Popover>
          <input id="outside" />
        </>
      )
      await openPopover()
      const outside = document.querySelector('#outside')
      if (method === 'click') {
        await userEvent.click(outside)
      } else {
        fireEvent.touchStart(outside)
        fireEvent.touchEnd(outside)
      }
      await nextFrame()
      expect(
        document.querySelector('.dnb-popover__trigger')
      ).toHaveAttribute('aria-expanded', 'false')
      expect(restoreFocusTo).not.toHaveBeenCalled()
    }
  )

  it('preserves focus on the element clicked outside', async () => {
    render(
      <>
        <Popover noAnimation trigger={<button>Open</button>}>
          Content
        </Popover>
        <input id="outside" />
      </>
    )
    await openPopover()
    const outside = document.querySelector('#outside')
    await userEvent.click(outside)
    await nextFrame()
    expect(outside).toHaveFocus()
  })

  it('keeps focus on an element focused before the restoration runs', async () => {
    const props = { noAnimation: true, trigger: <button>Open</button> }
    const { rerender } = render(
      <>
        <Popover {...props} open>
          Content
        </Popover>
        <input id="outside" />
      </>
    )
    await waitFor(() =>
      expect(document.querySelector('.dnb-popover__content')).toHaveFocus()
    )
    rerender(
      <>
        <Popover {...props} open={false}>
          Content
        </Popover>
        <input id="outside" />
      </>
    )
    const outside = document.querySelector<HTMLElement>('#outside')
    outside.focus()
    await nextFrame()
    expect(outside).toHaveFocus()
  })

  it('returns focus to the trigger when tabbing out closes the popover', async () => {
    render(
      <>
        <Popover
          focusOnOpen={false}
          noAnimation
          trigger={<button>Open</button>}
        >
          Content
        </Popover>
        <button id="next">Next</button>
      </>
    )
    const trigger = document.querySelector('button[aria-controls]')
    await userEvent.click(trigger)
    await userEvent.tab()

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    await nextFrame()
    expect(trigger).toHaveFocus()
  })

  it('restores focus when the positioning target becomes null', async () => {
    const opener = document.createElement('button')
    const anchor = document.createElement('div')
    document.body.append(opener, anchor)
    opener.focus()

    try {
      const { rerender } = render(
        <Popover openInitially noAnimation targetElement={anchor}>
          Content
        </Popover>
      )
      await waitFor(() =>
        expect(
          document.querySelector('.dnb-popover__content')
        ).toHaveFocus()
      )
      rerender(
        <Popover openInitially noAnimation targetElement={null}>
          Content
        </Popover>
      )
      await waitFor(() => expect(opener).toHaveFocus())
    } finally {
      opener.remove()
      anchor.remove()
    }
  })

  it('restores focus for inline content with a hide delay', async () => {
    render(
      <Popover skipPortal hideDelay={100} trigger={<button>Open</button>}>
        Content
      </Popover>
    )
    await openPopover()
    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(document.querySelector('.dnb-popover__trigger')).toHaveFocus()
    )
  })
})
