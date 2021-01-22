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
  loadScss
} from '../../../core/jest/jestSetup'

import Input from '../../input/Input'
import Component from '../Modal'
import Button from '../../button/Button'

const props = fakeProps(require.resolve('../Modal'), {
  all: true,
  optional: true
})
props.title = 'modal_title'
props.id = 'modal_id'
props.content_id = null
props.style_type = 'button'
props.modal_content = 'unique_modal_content'
props.close_title = 'close_title'
props.direct_dom_return = true
props.no_animation = true

beforeAll(() => {
  const button = document.createElement('BUTTON')
  document.body.appendChild(button)
})

beforeEach(() => {
  window.__modalStack = []
})

describe('Modal component', () => {
  const Comp = mount(<Component {...props} />)
  Comp.setState({
    modalActive: true
  })
  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it('should have aria-hidden and tabindex on other elements', () => {
    const Comp = mount(
      <Component {...props}>
        <button>button</button>
      </Component>
    )

    // Check the global button
    Comp.find('Modal').find('button.dnb-modal__trigger').simulate('click')
    expect(document.querySelector('button') instanceof HTMLElement).toBe(
      true
    )
    expect(
      document.querySelector('button').hasAttribute('aria-hidden')
    ).toBe(true)
    expect(document.querySelector('button').getAttribute('tabindex')).toBe(
      '-1'
    )
    Comp.update()
    expect(
      Comp.find('.dnb-modal__content')
        .instance()
        .hasAttribute('aria-hidden')
    ).toBe(false)
    expect(
      Comp.find('.dnb-modal__content')
        .find('button')
        .instance()
        .hasAttribute('aria-hidden')
    ).toBe(false)

    // And close it again
    Comp.find('button.dnb-modal__close-button').simulate('click')
    expect(
      document.querySelector('button').hasAttribute('aria-hidden')
    ).toBe(false)
    expect(document.querySelector('button').hasAttribute('tabindex')).toBe(
      false
    )
  })
  it('has to have the correct title', () => {
    expect(Comp.find('h1').text()).toBe(props.title)
  })
  it('has no trigger button once we set trigger_hidden to true', () => {
    Comp.setProps({
      trigger_hidden: true
    })
    expect(Comp.find('button.dnb-modal__trigger').exists()).toBe(false)
    Comp.setProps({
      trigger_hidden: false
    })
  })
  it('should act as a help button by default', () => {
    const Comp = mount(
      <Input
        label="Input"
        placeholder="Placeholder ..."
        suffix={<Component title={props.title}>Help text</Component>}
      />
    )
    expect(
      Comp.find('button.dnb-modal__trigger')
        .instance()
        .hasAttribute('aria-roledescription')
    ).toBe(true)
    expect(
      Comp.find('button.dnb-modal__trigger')
        .instance()
        .getAttribute('aria-label')
    ).toBe(props.title)
  })
  it('has a disabled trigger button once we set trigger_disabled to true', () => {
    Comp.setProps({
      trigger_disabled: true
    })
    expect(
      Comp.find('button.dnb-modal__trigger')
        .instance()
        .hasAttribute('disabled')
    ).toBe(true)
  })
  it('has working open event and close event if "Esc" key gets pressed', () => {
    const on_close = jest.fn()
    const on_open = jest.fn()
    const Comp = mount(
      <Component {...props} on_close={on_close} on_open={on_open} />
    )
    Comp.find('button').simulate('click')
    expect(on_open).toHaveBeenCalledTimes(1)
    expect(on_open).toHaveBeenCalledWith({
      id: 'modal_id'
    })

    Comp.find('div.dnb-modal__content__inner').simulate('keyDown', {
      key: 'Esc',
      keyCode: 27
    })

    expect(on_close).toHaveBeenCalledTimes(1)
    expect(on_close).toHaveBeenCalledWith({
      id: 'modal_id'
    })

    // Also test the window event listener
    Comp.find('button').simulate('click')
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    expect(on_close).toHaveBeenCalledTimes(2)
  })
  it('has support for nested modals', async () => {
    const on_open = {
      first: jest.fn(),
      second: jest.fn(),
      third: jest.fn()
    }
    const on_close = {
      first: jest.fn(),
      second: jest.fn(),
      third: jest.fn()
    }

    const props = {
      direct_dom_return: false,
      no_animation: true
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
    Comp.find('button#modal-second').simulate('click')
    Comp.find('button#modal-third').simulate('click')

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
  })
  it('will prevent closing the modal on prevent_close', () => {
    let preventClose = true
    const on_open = jest.fn()
    const on_close = jest.fn()
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

    Comp.find('div.dnb-modal__content__inner').simulate('keyDown', {
      key: 'Esc',
      keyCode: 27
    })

    expect(on_close).not.toHaveBeenCalled()
    expect(on_close_prevent).toHaveBeenCalledTimes(1)

    // trigger the close on the overlay
    Comp.find('div.dnb-modal__content').simulate('click')

    expect(on_close_prevent).toHaveBeenCalledTimes(2)
    expect(on_close_prevent.mock.calls[1][0].close).toBeType('function')
    expect(on_close_prevent.mock.calls[1][0].triggeredBy).toBe('overlay')

    // trigger the close button
    Comp.find('button.dnb-modal__close-button').simulate('click')

    expect(on_close_prevent).toHaveBeenCalledTimes(3)
    expect(on_close_prevent.mock.calls[2][0].triggeredBy).toBe('button')

    // trigger the esc key
    Comp.find('div.dnb-modal__content__inner').simulate('keyDown', {
      key: 'Esc',
      keyCode: 27
    })

    expect(on_close_prevent).toHaveBeenCalledTimes(4)
    expect(on_close_prevent.mock.calls[3][0].triggeredBy).toBe('keyboard')

    preventClose = false

    // trigger the close on the overlay
    Comp.find('div.dnb-modal__content').simulate('click')

    expect(Comp.exists('div.dnb-modal__content')).toBe(true)

    // trigger the close button
    Comp.find('button.dnb-modal__close-button').simulate('click')

    expect(Comp.exists('div.dnb-modal__content')).toBe(false)
  })
  it('has working open event and close event on changing the "open_state"', () => {
    const on_close = jest.fn()
    const on_open = jest.fn()
    const Comp = mount(
      <Component {...props} on_close={on_close} on_open={on_open} />
    )
    Comp.setProps({ open_state: 'opened' })
    expect(on_open).toHaveBeenCalledTimes(1)

    Comp.setProps({ open_state: 'closed' })
    expect(on_close).toHaveBeenCalledTimes(1)
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
  })
  it('runs expected side effects', () => {
    const Comp = mount(<Component {...props} />)
    const elem = Comp.find('button')

    // open modal
    elem.simulate('click')

    // const body = document.querySelector('[data-dnb-modal-active]')
    expect(document.body.nodeName).toBe('BODY')
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.height).toBe('auto')
    // expect(document.documentElement.style.height).toBe('auto')
    expect(document.body.getAttribute('data-dnb-modal-active')).toBe(
      'true'
    )

    // close modal
    elem.simulate('click')

    expect(document.body.style.position).not.toBe('hidden')
  })
  it('has expected open and close states', async () => {
    const Comp = mount(<Component {...props} />)
    Comp.setProps({ open_state: 'opened' })

    expect(Comp.exists('div.dnb-modal__content')).toBe(true)
    expect(Comp.state().modalActive).toBe(true)

    Comp.setProps({ open_state: 'closed' })

    expect(Comp.exists('div.dnb-modal__content')).toBe(false)
    // await wait(100)
    expect(Comp.state().modalActive).toBe(false)
  })
  it('has an opened modal if open_state is set to "opened"', () => {
    const Comp = mount(<Component {...props} />)
    Comp.setProps({
      open_state: 'opened'
    })
    expect(Comp.exists('div.dnb-modal__content')).toBe(true)
    Comp.setProps({
      open_state: 'closed'
    })
    expect(Comp.exists('div.dnb-modal__content')).toBe(false)
  })
  it('should open and close by using mount / unmount routines', () => {
    const ModalTriggerExample = () => {
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

    const Comp = mount(<ModalTriggerExample />)

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
  it('has to have the correct aria-describedby', () => {
    expect(
      Comp.find('[aria-describedby]').props()['aria-describedby']
    ).toBe(`dnb-modal-${props.id}-content`)
  })
  it('has to have the correct role on aria-modal', () => {
    expect(Comp.find('[aria-modal]').props().role).toBe('main')
  })
  it('has to have a close button', () => {
    expect(
      Comp.find('button.dnb-modal__close-button')
        .instance()
        .textContent.replace(/\u200C/g, '')
    ).toBe(props.close_title)
  })
  it('has to have no icon', () => {
    const Comp1 = mount(<Component trigger_text="Open Modal" />)
    expect(Comp1.find(`.dnb-icon`).exists()).toBe(false)
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
    expect(Comp1.find(`.dnb-icon`).exists()).toBe(true)
    const Comp2 = mount(
      <Component trigger_text="Open Modal" trigger_icon="add" />
    )
    expect(Comp2.find(`.dnb-icon`).exists()).toBe(true)
  })
  it('should validate with ARIA rules as a dialog', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Modal trigger', () => {
  const roledescription = 'Hjelp-knapp'
  it('will act by defualt as a HelpButton', () => {
    const Comp = mount(<Component {...props} />)
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
  it('will act as a HelpButton if trigger_text was given and trigger_variant is tertiary', () => {
    const Comp = mount(
      <Component
        {...props}
        trigger_text="text"
        trigger_variant="tertiary"
      />
    )
    expect(
      Comp.find('button.dnb-modal__trigger')
        .instance()
        .getAttribute('aria-roledescription')
    ).toBe(roledescription)
    expect(
      Comp.find('button.dnb-modal__trigger').exists('.dnb-button__icon')
    ).toBe(true)
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
