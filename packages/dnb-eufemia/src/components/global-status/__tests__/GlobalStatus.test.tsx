/**
 * GlobalStatus Test
 *
 */

import React from 'react'
import { axeComponent, loadScss, wait } from '../../../core/jest/jestSetup'
import GlobalStatus, { GlobalStatusProps } from '../GlobalStatus'
import { GlobalStatusInterceptor } from '../GlobalStatusController'
import FormSet from '../../form-set/FormSet'
import Switch from '../../switch/Switch'
import Autocomplete from '../../autocomplete/Autocomplete'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { Provider } from '../../../shared'
import { P } from '../../../elements'

const text = 'text'
const items = [
  { id: 'id-1', text: 'item #1' },
  { id: 'id-2', text: 'item #2' },
]
const show = true
const no_animation = true
const autoscroll = false

const props: GlobalStatusProps = {
  show,
  no_animation,
  autoscroll,
  items,
  text,
}

describe('GlobalStatus component', () => {
  it('has to have a text value as defined in the prop', () => {
    render(<GlobalStatus {...props} />)
    expect(
      document
        .querySelector('div.dnb-global-status__message')
        .querySelectorAll('.dnb-p')[0].textContent
    ).toBe(props.text)
  })

  it('has to have list items as defined in the prop', () => {
    render(<GlobalStatus {...props} />)
    expect(document.querySelector('.dnb-ul').textContent).toBe(
      props.items.map(({ text }) => text).join('')
    )
  })

  it('title should have role of paragraph', () => {
    const { rerender } = render(
      <Provider locale="en-GB">
        <GlobalStatus {...props} />
      </Provider>
    )
    const element = document.querySelector('.dnb-global-status__title')
    expect(element.tagName).toContain('DIV')
    expect(element.getAttribute('role')).toBe('paragraph')

    expect(element.textContent).toContain('An error has occurred')
    expect(element.textContent).toContain('Close')
    expect(element.getAttribute('lang')).toBe('en-GB')

    rerender(
      <Provider locale="nb-NO">
        <GlobalStatus {...props} />
      </Provider>
    )

    expect(element.textContent).toContain('En feil har skjedd')
    expect(element.textContent).toContain('Lukk')
    expect(element.getAttribute('lang')).toBe('nb-NO')

    rerender(
      <Provider locale="nb-NO">
        <GlobalStatus {...props} title={<P>Custom title</P>} />
      </Provider>
    )

    expect(element.textContent).toContain('Custom title')
    expect(element.getAttribute('role')).not.toBe('paragraph')
  })

  it('should have correct attributes like "aria-live"', async () => {
    const { rerender } = render(
      <GlobalStatus autoscroll={false} delay={0} />
    )
    expect(document.querySelector('[aria-live]')).toBeInTheDocument()

    rerender(<GlobalStatus autoscroll={false} delay={0} show={true} />)

    expect(
      document.querySelector('[aria-live="assertive"]')
    ).toBeInTheDocument()

    rerender(<GlobalStatus autoscroll={false} delay={0} show={false} />)

    expect(
      document
        .querySelector('.dnb-global-status__wrapper')
        .getAttribute('aria-live')
    ).toBe('off')
  })

  it('has to have correct content after a controller add', () => {
    const startupText = 'text'
    const newText = 'new text'

    render(
      <>
        <GlobalStatus
          autoscroll={false}
          delay={0}
          no_animation={true}
          id="custom-status-update"
          text={startupText}
          items={['item#1']}
        />
        <GlobalStatus.Add
          id="custom-status-update"
          status_id="status-update-1"
          text="will be overwritten"
          item={{ text: 'item#2' }}
          on_close={jest.fn()}
        />
        <GlobalStatus.Add
          id="custom-status-update"
          status_id="status-update-1"
          text={newText}
          item={{ text: 'item#3' }}
          on_close={jest.fn()}
        />
      </>
    )

    expect(
      document.querySelector(
        'div.dnb-global-status__message__content > .dnb-p'
      ).textContent
    ).toBe(newText)

    expect(
      document.querySelector(
        'div.dnb-global-status__message__content > .dnb-ul'
      ).textContent
    ).toBe('item#1item#3')

    expect(
      document.querySelectorAll(
        'div.dnb-global-status__message p.dnb-p'
      )[0].textContent
    ).toBe(newText)
  })

  it('has to have correct content after a controller update', () => {
    const startupText = 'text'
    const startupItems = ['Item1', 'Item2']
    const newText = 'new text'
    const newItems = ['Item3', 'Item4']

    render(
      <GlobalStatus
        autoscroll={false}
        delay={0}
        no_animation={true}
        id="custom-status-update"
      />
    )

    render(
      <GlobalStatus.Add
        id="custom-status-update"
        status_id="status-update-1"
        text={startupText}
        items={startupItems}
        on_close={jest.fn()}
      />
    )

    const ulItems = document.querySelectorAll('ul.dnb-ul li')
    expect(ulItems[0].textContent).toBe('Item1')
    expect(ulItems[1].textContent).toBe('Item2')
    expect(
      document.querySelectorAll(
        'div.dnb-global-status__message p.dnb-p'
      )[0].textContent
    ).toBe(startupText)

    render(
      <GlobalStatus.Add
        id="custom-status-update"
        status_id="status-update-1"
        text={newText}
        items={newItems}
        on_close={jest.fn()}
      />
    )

    const newUlItems = document.querySelectorAll('ul.dnb-ul li')
    expect(newUlItems[0].textContent).toBe('Item3')
    expect(newUlItems[1].textContent).toBe('Item4')
    expect(
      document.querySelectorAll(
        'div.dnb-global-status__message p.dnb-p'
      )[0].textContent
    ).toBe(newText)

    render(
      <GlobalStatus.Remove
        id="custom-status-update"
        status_id="status-update-1"
        buffer_delay={0}
      />
    )

    expect(
      document.querySelector('div.dnb-global-status__message')
    ).not.toBeInTheDocument()
  })

  it('has to have correct content after a controller remove', () => {
    const startupText = 'text'
    const startupItems = ['Item1', 'Item2']
    const newText = 'new text'
    const newItems = ['Item3', 'Item4']

    render(
      <GlobalStatus
        autoscroll={false}
        delay={0}
        no_animation={true}
        id="custom-status-remove"
      />
    )

    expect(
      document.querySelector('div.dnb-global-status__shell').innerHTML
    ).toBe('')
    expect(
      document.querySelector('div.dnb-global-status__shell')
    ).not.toHaveAttribute('style')

    render(
      <GlobalStatus.Add
        id="custom-status-remove"
        status_id="status-remove-1"
        text={startupText}
        items={startupItems}
        on_close={jest.fn()}
      />
    )

    const ulItems = document.querySelectorAll('ul.dnb-ul li')
    expect(ulItems[0].textContent).toBe('Item1')
    expect(ulItems[1].textContent).toBe('Item2')
    expect(
      document.querySelectorAll(
        'div.dnb-global-status__message p.dnb-p'
      )[0].textContent
    ).toBe(startupText)
    expect(
      document.querySelector('div.dnb-global-status__message')
    ).toBeInTheDocument()

    render(
      <GlobalStatus.Add
        id="custom-status-remove"
        status_id="status-remove-2"
        text={newText}
        items={newItems}
        on_close={jest.fn()}
      />
    )

    const newUlItems = document.querySelectorAll('ul.dnb-ul li')
    expect(newUlItems[2].textContent).toBe('Item3')
    expect(newUlItems[3].textContent).toBe('Item4')
    expect(
      document.querySelectorAll(
        'div.dnb-global-status__message p.dnb-p'
      )[0].textContent
    ).toBe(newText)
    expect(
      document.querySelectorAll('div.dnb-global-status__message p.dnb-p')
    ).toHaveLength(5)

    render(
      <GlobalStatus.Remove
        id="custom-status-remove"
        status_id="status-remove-1"
        buffer_delay={0}
      />
    )

    const removedUlItems = document.querySelectorAll('ul.dnb-ul li')
    expect(removedUlItems[0].textContent).toBe('Item3')
    expect(removedUlItems[1].textContent).toBe('Item4')
    expect(removedUlItems[2]).toBeFalsy()
    expect(removedUlItems[3]).toBeFalsy()
    expect(
      document.querySelectorAll(
        'div.dnb-global-status__message p.dnb-p'
      )[0].textContent
    ).toBe(newText)
    expect(
      document.querySelectorAll('div.dnb-global-status__message p.dnb-p')
    ).toHaveLength(3)

    render(
      <GlobalStatus.Remove
        id="custom-status-remove"
        status_id="status-remove-2"
        buffer_delay={0}
      />
    )

    expect(
      document.querySelector('div.dnb-global-status__message')
    ).not.toBeInTheDocument()
    expect(
      document
        .querySelector('div.dnb-global-status__shell')
        .getAttribute('style')
    ).toBe('height: 0px; visibility: hidden;')
  })

  it('have to handle delayed interactions', async () => {
    const FormField1 = () => {
      const [status, setStatus] = React.useState(null)
      return (
        <Switch
          id="switch-1"
          status={status}
          status_no_animation={true}
          on_change={({ checked }) => {
            setStatus(checked ? 'error-message-1' : null)
          }}
        />
      )
    }

    const FormField2 = () => {
      const [status, setStatus] = React.useState(null)
      return (
        <Switch
          id="switch-2"
          status={status}
          status_no_animation={true}
          on_change={({ checked }) => {
            setStatus(checked ? 'error-message-2' : null)
          }}
        />
      )
    }

    const FormField3 = () => {
      const [status, setStatus] = React.useState(null)
      return (
        <Autocomplete
          id="autocomplete-3"
          status={status}
          status_no_animation={true}
          on_focus={() => {
            setStatus('error-message-3')
          }}
          on_blur={() => {
            setStatus(null)
          }}
        />
      )
    }

    render(
      <>
        <GlobalStatus
          id="my-form"
          autoscroll={false}
          delay={0}
          no_animation={true}
        />
        <FormSet globalStatus={{ id: 'my-form' }}>
          <FormField1 />
          <FormField2 />
          <FormField3 />
        </FormSet>
      </>
    )

    await wait(1)
    fireEvent.click(document.querySelector('input#switch-1'))

    await wait(1)
    fireEvent.click(document.querySelector('input#switch-2'))

    await wait(1)
    fireEvent.focus(document.querySelector('input#autocomplete-3'))

    // FormStatus content
    expect(
      document.querySelectorAll('.dnb-form-status__text')[0].textContent
    ).toBe('error-message-1')
    expect(
      document.querySelectorAll('.dnb-form-status__text')[1].textContent
    ).toBe('error-message-2')
    expect(
      document
        .querySelectorAll('.dnb-autocomplete')[0]
        .querySelector('.dnb-form-status__text').textContent
    ).toBe('error-message-3')

    await refresh()

    // GlobalStatus content
    expect(
      document.querySelectorAll('.dnb-global-status__message p')[0]
        .textContent
    ).toBe('error-message-1')
    expect(
      document.querySelectorAll('.dnb-global-status__message p')[1]
        .textContent
    ).toBe('error-message-2')
    expect(
      document.querySelectorAll('.dnb-global-status__message p')[2]
        .textContent
    ).toBe('error-message-3')

    await wait(1)
    fireEvent.click(document.querySelector('input#switch-1'))

    await wait(1)
    fireEvent.click(document.querySelector('input#switch-2'))

    await wait(1)
    fireEvent.blur(document.querySelector('input#autocomplete-3'))

    expect(
      document.querySelector('.dnb-form-status__text')
    ).not.toBeInTheDocument()

    await refresh()

    expect(
      document.querySelector('.dnb-global-status__message p')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-form-status__text')
    ).not.toBeInTheDocument()
    const inst = document.querySelector('div.dnb-global-status__shell')

    expect(inst.innerHTML).toBe('')
    expect(inst.getAttribute('style')).toBe(
      'height: 0px; visibility: hidden;'
    )
  })

  it('have to scroll to GlobalStatus', async () => {
    const scrollTo = jest.fn()
    jest.spyOn(window, 'scrollTo').mockImplementation(scrollTo)
    const offsetTop = 1000

    const ToggleStatus = () => {
      const [status, setStatus] = React.useState(null)

      return (
        <Switch
          id="switch"
          status={status}
          status_no_animation={true}
          globalStatus={{ id: 'scroll-to-test' }}
          on_change={({ checked }) => {
            setStatus(checked ? 'error-message' : null)
          }}
        />
      )
    }
    render(
      <>
        <GlobalStatus id="scroll-to-test" delay={0} no_animation={true} />
        <ToggleStatus />
      </>
    )

    // Open
    fireEvent.click(document.querySelector('input#switch'))

    await refresh()

    expect(scrollTo).toHaveBeenCalledTimes(1)
    expect(scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
    })

    jest
      .spyOn(
        document.querySelector(
          '.dnb-global-status__wrapper'
        ) as HTMLElement,
        'offsetTop',
        'get'
      )
      .mockImplementation(() => offsetTop)

    // Close
    fireEvent.click(document.querySelector('input#switch'))
    await refresh()

    expect(scrollTo).toHaveBeenCalledTimes(1)

    // Open
    fireEvent.click(document.querySelector('input#switch'))
    await refresh()

    expect(scrollTo).toHaveBeenCalledTimes(2)
    expect(scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: offsetTop,
    })
  })

  it('have to close when esc key is pressed', async () => {
    const on_close = jest.fn()
    const on_hide = jest.fn()

    const ToggleStatus = () => {
      const [status, setStatus] = React.useState(null)

      return (
        <Switch
          id="switch"
          status={status}
          status_no_animation={true}
          globalStatus={{ id: 'esc-test' }}
          on_change={({ checked }) => {
            setStatus(checked ? 'error-message' : null)
          }}
        />
      )
    }
    render(
      <>
        <GlobalStatus
          id="esc-test"
          delay={0}
          autoscroll={false}
          no_animation={true}
          on_hide={on_hide}
          on_close={on_close}
        />
        <ToggleStatus />
      </>
    )

    // Open
    fireEvent.click(document.querySelector('input#switch'))

    await refresh()

    expect(on_close).toHaveBeenCalledTimes(0)

    // Close with key
    keydown(27) // esc

    expect(on_hide).toHaveBeenCalledTimes(1)
    expect(on_close).toHaveBeenCalledTimes(1)
  })

  it('have to have height of auto value', async () => {
    const ToggleStatus = () => {
      const [status, setStatus] = React.useState(null)

      return (
        <Switch
          id="switch"
          status={status}
          status_no_animation={true}
          globalStatus={{ id: 'height-test' }}
          on_change={({ checked }) => {
            setStatus(checked ? 'error-message' : null)
          }}
        />
      )
    }
    render(
      <>
        <GlobalStatus id="height-test" delay={0} no_animation={true} />
        <ToggleStatus />
      </>
    )

    fireEvent.click(document.querySelector('input#switch'))
    await refresh()

    expect(
      document
        .querySelector('div.dnb-global-status__shell')
        .getAttribute('style')
    ).toBe('height: auto;')
  })

  it('have to be hidden after all messages are removed', async () => {
    const ToggleStatus = () => {
      const [status, setStatus] = React.useState(null)

      return (
        <Switch
          id="switch"
          status={status}
          status_no_animation={true}
          globalStatus={{ id: 'main-to-be-empty' }}
          on_change={({ checked }) => {
            setStatus(checked ? 'error-message' : null)
          }}
        />
      )
    }
    render(
      <>
        <GlobalStatus
          id="main-to-be-empty"
          autoscroll={false}
          delay={0}
          no_animation={true}
        />
        <ToggleStatus />
      </>
    )

    fireEvent.click(document.querySelector('input#switch'))
    await refresh()

    expect(
      document.querySelector('.dnb-form-status__text').textContent
    ).toBe('error-message')

    expect(
      document.querySelector('.dnb-global-status__content')
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-global-status__message p').textContent
    ).toBe('error-message')

    fireEvent.click(document.querySelector('input#switch'))
    await refresh()

    expect(
      document.querySelector('.dnb-form-status__text')
    ).not.toBeInTheDocument()
    const inst = document.querySelector('div.dnb-global-status__shell')

    expect(inst.innerHTML).toBe('')
    expect(inst.getAttribute('style')).toBe(
      'height: 0px; visibility: hidden;'
    )
  })

  it('should generate item_id form React Element', async () => {
    const StatusComponent = ({
      children,
      inner_ref,
    }: {
      children?: any
      inner_ref?: any
    }) => {
      return children
    }

    const StatusAsComponent = React.forwardRef(
      (props: { children: React.ReactNode }, ref) => {
        return <StatusComponent {...props} inner_ref={ref} />
      }
    )

    render(
      <GlobalStatus
        no_animation={true}
        autoscroll={false}
        delay={0}
        id="custom-status-element"
      />
    )

    const provider = new GlobalStatusInterceptor({
      id: 'custom-status-element',
    })

    provider.add({
      status_id: 'status-1',
      item: {
        text: <StatusAsComponent>error-message--a</StatusAsComponent>,
        status_anchor_label: (
          <StatusAsComponent>label--a</StatusAsComponent>
        ),
        status_anchor_url: true,
      },
    })

    provider.add({
      status_id: 'status-2',
      item: {
        text: <StatusAsComponent>error-message--b</StatusAsComponent>,
        status_anchor_label: (
          <StatusAsComponent>label--b</StatusAsComponent>
        ),
        status_anchor_url: true,
      },
    })
    await waitFor(() => {
      expect(
        document.querySelector('div.dnb-global-status__message')
          .textContent
      ).toBe(
        'error-message--aGå til label--aerror-message--bGå til label--b'
      )
    })
  })

  it('should support component given as labels', async () => {
    const LabelAsComponent = () => {
      return <span>'my-label'</span>
    }
    const StatusAsComponent = () => {
      return <span>'error-message'</span>
    }

    const ToggleStatus = () => {
      const [status, setStatus] = React.useState(null)

      return (
        <Switch
          id="switch"
          label={<LabelAsComponent />}
          status={status}
          status_no_animation={true}
          globalStatus={{ id: 'main-to-be-empty' }}
          on_change={({ checked }) => {
            setStatus(checked ? <StatusAsComponent /> : null)
          }}
        />
      )
    }
    render(
      <>
        <GlobalStatus
          id="main-to-be-empty"
          autoscroll={false}
          delay={0}
          no_animation={true}
          status_anchor_text={<span>custom anchor text</span>}
        />
        <ToggleStatus />
      </>
    )

    fireEvent.click(document.querySelector('input#switch'))

    await refresh()

    expect(
      document.querySelectorAll('.dnb-global-status__message p')[0]
        .textContent
    ).toBe("'error-message'")
    expect(
      document
        .querySelectorAll('.dnb-global-status__message__content ul li')[0]
        .querySelector('a.dnb-anchor').textContent
    ).toBe("custom anchor text 'my-label'")
  })

  it('has to have a working auto close', () => {
    const on_open = jest.fn()
    const on_close = jest.fn()
    const on_hide = jest.fn()

    render(
      <GlobalStatus
        autoclose={true}
        no_animation={true}
        autoscroll={false}
        delay={0}
        id="custom-status-autoclose"
        on_open={on_open}
        on_close={on_close}
        on_hide={on_hide}
      />
    )

    render(
      <GlobalStatus.Add
        id="custom-status-autoclose"
        status_id="status-autoclose-1"
        text="text only"
        on_close={jest.fn()}
      />
    )

    expect(on_open.mock.calls.length).toBe(1)

    expect(
      document.querySelector('div.dnb-global-status__message')
    ).toBeInTheDocument()
    expect(
      document.querySelector('div.dnb-global-status__message').textContent
    ).toBe('text only')

    render(
      <GlobalStatus.Add
        id="custom-status-autoclose"
        status_id="status-autoclose-2"
        text="text only"
        items={['foo']}
        on_close={jest.fn()}
      />
    )

    expect(
      document.querySelector('div.dnb-global-status__message').textContent
    ).toBe('text onlyfoo')

    render(
      <GlobalStatus.Remove
        id="custom-status-autoclose"
        status_id="status-autoclose-1"
        buffer_delay={0}
      />
    )

    expect(on_close.mock.calls.length).toBe(0)

    render(
      <GlobalStatus.Remove
        id="custom-status-autoclose"
        status_id="status-autoclose-2"
        buffer_delay={0}
      />
    )

    expect(on_close.mock.calls.length).toBe(1)
    expect(on_hide.mock.calls.length).toBe(0)

    expect(
      document.querySelector('div.dnb-global-status__message')
    ).not.toBeInTheDocument()

    render(
      <GlobalStatus.Add
        id="custom-status-autoclose"
        status_id="status-autoclose-1"
        items={['foo']}
        on_close={jest.fn()}
        text="text"
      />
    )

    fireEvent.click(
      document.querySelector('button.dnb-global-status__close-button')
    )

    expect(on_hide.mock.calls.length).toBe(1)
  })

  it('has to take account to the show prop', () => {
    const { rerender } = render(
      <GlobalStatus
        show={false}
        no_animation={true}
        autoscroll={false}
        delay={0}
        id="custom-status-show"
      />
    )

    expect(
      document.querySelector('div.dnb-global-status__content')
    ).not.toBeInTheDocument()

    expect(
      document.querySelector('div.dnb-global-status__message__content')
    ).not.toBeInTheDocument()

    rerender(
      <GlobalStatus
        show={true}
        no_animation={true}
        autoscroll={false}
        delay={0}
        id="custom-status-show"
      />
    )

    expect(
      document.querySelector('div.dnb-global-status__content')
    ).toBeInTheDocument()
    expect(
      document.querySelector('div.dnb-global-status__message__content')
    ).not.toBeInTheDocument()

    render(
      <GlobalStatus.Add
        id="custom-status-show"
        status_id="status-show-1"
        text="text only"
        on_close={jest.fn()}
      />
    )

    expect(
      document.querySelector('div.dnb-global-status__message__content')
    ).toBeInTheDocument()

    rerender(
      <GlobalStatus
        show="auto"
        no_animation={true}
        autoscroll={false}
        delay={0}
        id="custom-status-show"
      />
    )

    render(
      <GlobalStatus.Remove
        id="custom-status-show"
        status_id="status-show-1"
      />
    )

    expect(
      document.querySelector('div.dnb-global-status__content')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('div.dnb-global-status__message__content')
    ).not.toBeInTheDocument()
  })

  it('should display correct state based on prop', () => {
    const { rerender } = render(<GlobalStatus state="warning" />)

    const element = document.querySelector('.dnb-global-status')

    expect(element.classList).toContain('dnb-global-status--warning')

    rerender(<GlobalStatus state="info" />)
    expect(element.classList).toContain('dnb-global-status--info')

    rerender(<GlobalStatus state="success" />)
    expect(element.classList).toContain('dnb-global-status--success')

    rerender(<GlobalStatus state="error" />)
    expect(element.classList).toContain('dnb-global-status--error')

    rerender(<GlobalStatus state="warning" />)
    expect(element.classList).toContain('dnb-global-status--warning')
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<GlobalStatus {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('GlobalStatus scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-global-status-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})

const refresh = async () => {
  await wait(1)
}

const keydown = (keyCode) => {
  document.dispatchEvent(new KeyboardEvent('keydown', { keyCode }))

  fireEvent.keyDown(
    document.querySelector('.dnb-global-status__wrapper'),
    {
      keyCode,
    }
  )
}
