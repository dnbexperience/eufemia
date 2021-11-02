/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  axeComponent,
  toJson,
  loadScss,
} from '../../../core/jest/jestSetup'
import Component from '../GlobalStatus'
import { GlobalStatusInterceptor } from '../GlobalStatusController'
import FormSet from '../../form-set/FormSet'
import Switch from '../../switch/Switch'
import Autocomplete from '../../autocomplete/Autocomplete'

const id = 'main'
const status_id = null
const state = 'error'
const text = 'text'
const children = null
const items = [
  { id: 'id-1', text: 'item #1' },
  { id: 'id-2', text: 'item #2' },
]
const show = true
const no_animation = true
const autoscroll = false
const icon = 'error'

const snapshotProps = {
  ...fakeProps(require.resolve('../GlobalStatus'), {
    optional: true,
  }),

  id,
  status_id,
  state,
  children,
  show,
  no_animation,
  items,
  text,
  icon,
}

const props = {
  show,
  no_animation,
  autoscroll,
  items,
  text,
}

describe('GlobalStatus component', () => {
  it('has to have a text value as defined in the prop', () => {
    const Comp = mount(<Component {...props} />)
    expect(
      Comp.find('div.dnb-global-status__message')
        .find('.dnb-p')
        .at(0)
        .text()
    ).toBe(props.text)
  })

  it('has to have list items as defined in the prop', () => {
    const Comp = mount(<Component {...props} />)
    expect(Comp.find('.dnb-ul').text()).toBe(
      props.items.map(({ text }) => text).join('')
    )
  })

  it('should have correct attributes like "aria-live"', async () => {
    const Comp = mount(<Component autoscroll={false} delay={0} />)
    expect(Comp.exists('[aria-live]')).toBe(true)

    Comp.setProps({
      show: true,
    })
    Comp.setState({
      isActive: true,
    })

    expect(Comp.exists('[aria-live="assertive"]')).toBe(true)

    Comp.setProps({
      show: false,
    })

    expect(
      Comp.find('.dnb-global-status__wrapper')
        .instance()
        .getAttribute('aria-live')
    ).toBe('off')
  })

  it('has to have correct content after a controller add', () => {
    const startupText = 'text'
    const newText = 'new text'

    const Comp = mount(
      <>
        <Component
          autoscroll={false}
          delay={0}
          no_animation={true}
          id="custom-status-update"
          text={startupText}
          items={['item#1']}
        />
        <Component.Add
          id="custom-status-update"
          status_id="status-update-1"
          text="will be overwritten"
          item={{ text: 'item#2' }}
        />
        <Component.Add
          id="custom-status-update"
          status_id="status-update-1"
          text={newText}
          item={{ text: 'item#3' }}
        />
      </>
    )

    expect(
      Comp.find('div.dnb-global-status__message__content > .dnb-p').text()
    ).toBe(newText)

    expect(
      Comp.find('div.dnb-global-status__message__content > .dnb-ul').text()
    ).toBe('item#1item#3')

    expect(
      Comp.find('div.dnb-global-status__message p.dnb-p').at(0).text()
    ).toBe(newText)
  })

  it('has to have correct content after a controller update', () => {
    const startupText = 'text'
    const startupItems = ['Item1', 'Item2']
    const newText = 'new text'
    const newItems = ['Item3', 'Item4']

    const Comp = mount(
      <Component
        autoscroll={false}
        delay={0}
        no_animation={true}
        id="custom-status-update"
      />
    )

    mount(
      <Component.Add
        id="custom-status-update"
        status_id="status-update-1"
        text={startupText}
        items={startupItems}
      />
    )

    Comp.update()

    const ulItems = Comp.find('ul.dnb-ul li')
    expect(ulItems.at(0).text()).toBe('Item1')
    expect(ulItems.at(1).text()).toBe('Item2')
    expect(
      Comp.find('div.dnb-global-status__message p.dnb-p').at(0).text()
    ).toBe(startupText)

    mount(
      <Component.Add
        id="custom-status-update"
        status_id="status-update-1"
        text={newText}
        items={newItems}
      />
    )

    const newUlItems = Comp.find('ul.dnb-ul li')
    expect(newUlItems.at(0).text()).toBe('Item3')
    expect(newUlItems.at(1).text()).toBe('Item4')
    expect(
      Comp.find('div.dnb-global-status__message p.dnb-p').at(0).text()
    ).toBe(newText)

    mount(
      <Component.Remove
        id="custom-status-update"
        status_id="status-update-1"
        buffer_delay={0}
      />
    )

    Comp.update()

    expect(Comp.state().isActive).toBe(false)
    expect(Comp.exists('div.dnb-global-status__message')).toBe(false)
  })

  it('has to have correct content after a controller remove', () => {
    const startupText = 'text'
    const startupItems = ['Item1', 'Item2']
    const newText = 'new text'
    const newItems = ['Item3', 'Item4']

    const Comp = mount(
      <Component
        autoscroll={false}
        delay={0}
        no_animation={true}
        id="custom-status-remove"
      />
    )

    expect(
      Comp.find('div.dnb-global-status__shell').instance().innerHTML
    ).toBe('')
    expect(
      Comp.find('div.dnb-global-status__shell')
        .instance()
        .hasAttribute('style')
    ).toBe(false)

    mount(
      <Component.Add
        id="custom-status-remove"
        status_id="status-remove-1"
        text={startupText}
        items={startupItems}
      />
    )

    Comp.update()

    const ulItems = Comp.find('ul.dnb-ul li')
    expect(ulItems.at(0).text()).toBe('Item1')
    expect(ulItems.at(1).text()).toBe('Item2')
    expect(
      Comp.find('div.dnb-global-status__message p.dnb-p').at(0).text()
    ).toBe(startupText)
    expect(Comp.exists('div.dnb-global-status__message')).toBe(true)

    mount(
      <Component.Add
        id="custom-status-remove"
        status_id="status-remove-2"
        text={newText}
        items={newItems}
      />
    )

    Comp.update()

    const newUlItems = Comp.find('ul.dnb-ul li')
    expect(newUlItems.at(2).text()).toBe('Item3')
    expect(newUlItems.at(3).text()).toBe('Item4')
    expect(
      Comp.find('div.dnb-global-status__message p.dnb-p').at(0).text()
    ).toBe(newText)
    expect(
      Comp.find('div.dnb-global-status__message p.dnb-p')
    ).toHaveLength(5)

    mount(
      <Component.Remove
        id="custom-status-remove"
        status_id="status-remove-1"
        buffer_delay={0}
      />
    )

    Comp.update()

    const removedUlItems = Comp.find('ul.dnb-ul li')
    expect(removedUlItems.at(0).text()).toBe('Item3')
    expect(removedUlItems.at(1).text()).toBe('Item4')
    expect(removedUlItems.at(2).exists()).toBe(false)
    expect(removedUlItems.at(3).exists()).toBe(false)
    expect(
      Comp.find('div.dnb-global-status__message p.dnb-p').at(0).text()
    ).toBe(newText)
    expect(
      Comp.find('div.dnb-global-status__message p.dnb-p')
    ).toHaveLength(3)

    mount(
      <Component.Remove
        id="custom-status-remove"
        status_id="status-remove-2"
        buffer_delay={0}
      />
    )

    Comp.update()

    expect(Comp.state().isActive).toBe(false)
    expect(Comp.exists('div.dnb-global-status__message')).toBe(false)
    expect(
      Comp.find('div.dnb-global-status__shell')
        .instance()
        .getAttribute('style')
    ).toBe('height: 0px; visibility: hidden;')
  })

  it('have to handle delayed interactions ', async () => {
    const FormField1 = () => {
      const [status, setStatus] = React.useState()
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
      const [status, setStatus] = React.useState()
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
      const [status, setStatus] = React.useState()
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

    const Comp = mount(
      <>
        <Component
          id="my-form"
          autoscroll={false}
          delay={0}
          no_animation={true}
        />
        <FormSet global_status_id="my-form">
          <FormField1 />
          <FormField2 />
          <FormField3 />
        </FormSet>
      </>
    )

    await wait(1)
    Comp.find('input#switch-1').simulate('change')

    await wait(1)
    Comp.find('input#switch-2').simulate('change')

    await wait(1)
    Comp.find('input#autocomplete-3').simulate('focus')

    // FormStatus content
    expect(Comp.find('.dnb-form-status__text').at(0).text()).toBe(
      'error-message-1'
    )
    expect(Comp.find('.dnb-form-status__text').at(1).text()).toBe(
      'error-message-2'
    )
    expect(
      Comp.find('.dnb-autocomplete')
        .at(0)
        .find('.dnb-form-status__text')
        .text()
    ).toBe('error-message-3')

    await refresh(Comp)

    // GlobalStatus content
    expect(Comp.find('.dnb-global-status__message p').at(0).text()).toBe(
      'error-message-1'
    )
    expect(Comp.find('.dnb-global-status__message p').at(1).text()).toBe(
      'error-message-2'
    )
    expect(Comp.find('.dnb-global-status__message p').at(2).text()).toBe(
      'error-message-3'
    )

    await wait(1)
    Comp.find('input#switch-1').simulate('change')

    await wait(1)
    Comp.find('input#switch-2').simulate('change')

    await wait(1)
    Comp.find('input#autocomplete-3').simulate('blur')

    expect(Comp.exists('.dnb-form-status__text')).toBe(false)

    await refresh(Comp)

    expect(Comp.exists('.dnb-global-status__message p')).toBe(false)
    expect(Comp.exists('.dnb-form-status__text')).toBe(false)
    const inst = Comp.find('div.dnb-global-status__shell').instance()
    expect(inst.innerHTML).toBe('')
    expect(inst.getAttribute('style')).toBe(
      'height: 0px; visibility: hidden;'
    )
  })

  it('have to scroll to GlobalStatus ', async () => {
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
          global_status_id="scroll-to-test"
          on_change={({ checked }) => {
            setStatus(checked ? 'error-message' : null)
          }}
        />
      )
    }
    const Comp = mount(
      <>
        <Component id="scroll-to-test" delay={0} no_animation={true} />
        <ToggleStatus />
      </>
    )

    // Open
    Comp.find('input#switch').simulate('change')
    await refresh(Comp)

    expect(scrollTo).toBeCalledTimes(1)
    expect(scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
    })

    jest
      .spyOn(
        Comp.find('.dnb-global-status__wrapper').instance(),
        'offsetTop',
        'get'
      )
      .mockImplementation(() => offsetTop)

    // Close
    Comp.find('input#switch').simulate('change')
    await refresh(Comp)

    expect(scrollTo).toBeCalledTimes(1)

    // Open
    Comp.find('input#switch').simulate('change')
    await refresh(Comp)

    expect(scrollTo).toBeCalledTimes(2)
    expect(scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: offsetTop,
    })
  })

  it('have to close when esc key is pressed ', async () => {
    const on_close = jest.fn()
    const on_hide = jest.fn()

    const ToggleStatus = () => {
      const [status, setStatus] = React.useState(null)

      return (
        <Switch
          id="switch"
          status={status}
          status_no_animation={true}
          global_status_id="esc-test"
          on_change={({ checked }) => {
            setStatus(checked ? 'error-message' : null)
          }}
        />
      )
    }
    const Comp = mount(
      <>
        <Component
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
    Comp.find('input#switch').simulate('change')
    await refresh(Comp)

    expect(on_close).toBeCalledTimes(0)

    // Close with key
    keydown(Comp, 27) // esc

    expect(on_hide).toBeCalledTimes(1)
    expect(on_close).toBeCalledTimes(1)
  })

  it('have to have height of auto value', async () => {
    const ToggleStatus = () => {
      const [status, setStatus] = React.useState(null)

      return (
        <Switch
          id="switch"
          status={status}
          status_no_animation={true}
          global_status_id="height-test"
          on_change={({ checked }) => {
            setStatus(checked ? 'error-message' : null)
          }}
        />
      )
    }
    const Comp = mount(
      <>
        <Component id="height-test" delay={0} no_animation={true} />
        <ToggleStatus />
      </>
    )

    Comp.find('input#switch').simulate('change')
    await refresh(Comp)

    expect(
      Comp.find('div.dnb-global-status__shell')
        .instance()
        .getAttribute('style')
    ).toBe('height: auto;')
  })

  it('have to be hidden after all messages are removed ', async () => {
    const ToggleStatus = () => {
      const [status, setStatus] = React.useState(null)

      return (
        <Switch
          id="switch"
          status={status}
          status_no_animation={true}
          global_status_id="main-to-be-empty"
          on_change={({ checked }) => {
            setStatus(checked ? 'error-message' : null)
          }}
        />
      )
    }
    const Comp = mount(
      <>
        <Component
          id="main-to-be-empty"
          autoscroll={false}
          delay={0}
          no_animation={true}
        />
        <ToggleStatus />
      </>
    )

    Comp.find('input#switch').simulate('change')
    await refresh(Comp)

    expect(Comp.find('.dnb-form-status__text').text()).toBe(
      'error-message'
    )

    expect(Comp.exists('.dnb-global-status__content')).toBe(true)
    expect(Comp.find('.dnb-global-status__message p').text()).toBe(
      'error-message'
    )

    Comp.find('input#switch').simulate('change')
    await refresh(Comp)

    expect(Comp.exists('.dnb-form-status__text')).toBe(false)
    const inst = Comp.find('div.dnb-global-status__shell').instance()
    expect(inst.innerHTML).toBe('')
    expect(inst.getAttribute('style')).toBe(
      'height: 0px; visibility: hidden;'
    )
  })

  it('should generete item_id form React Element', () => {
    const StatusComponent = ({ children }) => {
      return children
    }
    const StatusAsComponent = React.forwardRef((props, ref) => {
      return <StatusComponent {...props} inner_ref={ref} />
    })

    const Comp = mount(
      <Component
        no_animation={true}
        autoscroll={false}
        delay={0}
        id="custom-status-element"
        locale="en-GB"
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

    Comp.update()

    // expect(Comp.exists('div.dnb-global-status__message')).toBe(true)
    expect(Comp.find('div.dnb-global-status__message').text()).toBe(
      'error-message--aGo to label--aerror-message--bGo to label--b'
    )
  })

  it('should support component given as labels', async () => {
    const LabelAsComponent = () => {
      return 'my-label'
    }
    const StatusAsComponent = () => {
      return 'error-message'
    }

    const ToggleStatus = () => {
      const [status, setStatus] = React.useState(null)

      return (
        <Switch
          id="switch"
          label={<LabelAsComponent />}
          status={status}
          status_no_animation={true}
          global_status_id="main-to-be-empty"
          on_change={({ checked }) => {
            setStatus(checked ? <StatusAsComponent /> : null)
          }}
        />
      )
    }
    const Comp = mount(
      <>
        <Component
          id="main-to-be-empty"
          autoscroll={false}
          delay={0}
          no_animation={true}
          status_anchor_text={<span>custon anchor text</span>}
        />
        <ToggleStatus />
      </>
    )

    Comp.find('input#switch').simulate('change')

    await refresh(Comp)

    expect(Comp.find('.dnb-global-status__message p').at(0).text()).toBe(
      'error-message'
    )
    expect(
      Comp.find('.dnb-global-status__message__content ul li')
        .at(0)
        .find('a.dnb-anchor')
        .text()
    ).toBe('custon anchor text my-label')
  })

  it('has to have a working auto close', () => {
    const on_open = jest.fn()
    const on_close = jest.fn()
    const on_hide = jest.fn()

    const Comp = mount(
      <Component
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

    mount(
      <Component.Add
        id="custom-status-autoclose"
        status_id="status-autoclose-1"
        text="text only"
      />
    )

    expect(on_open.mock.calls.length).toBe(1)
    expect(Comp.state().isActive).toBe(true)

    Comp.update()
    expect(Comp.exists('div.dnb-global-status__message')).toBe(true)
    expect(Comp.find('div.dnb-global-status__message').text()).toBe(
      'text only'
    )

    mount(
      <Component.Add
        id="custom-status-autoclose"
        status_id="status-autoclose-2"
        // text="text only"
        items={['foo']}
      />
    )

    Comp.update()
    expect(Comp.find('div.dnb-global-status__message').text()).toBe(
      'text onlyfoo'
    )

    mount(
      <Component.Remove
        id="custom-status-autoclose"
        status_id="status-autoclose-1"
        buffer_delay={0}
      />
    )

    expect(on_close.mock.calls.length).toBe(0)

    mount(
      <Component.Remove
        id="custom-status-autoclose"
        status_id="status-autoclose-2"
        buffer_delay={0}
      />
    )

    expect(on_close.mock.calls.length).toBe(1)
    expect(on_hide.mock.calls.length).toBe(0)

    expect(Comp.state().isActive).toBe(false)

    Comp.update()
    expect(Comp.exists('div.dnb-global-status__message')).toBe(false)

    mount(
      <Component.Add
        id="custom-status-autoclose"
        status_id="status-autoclose-1"
        items={['foo']}
      />
    )

    Comp.update()
    Comp.find('button.dnb-global-status__close-button').simulate('click')

    expect(on_hide.mock.calls.length).toBe(1)
  })

  it('has to take account to the show prop', () => {
    const Comp = mount(
      <Component
        show={false}
        no_animation={true}
        autoscroll={false}
        delay={0}
        id="custom-status-show"
      />
    )

    Comp.update()

    expect(Comp.exists('div.dnb-global-status__content')).toBe(false)
    expect(Comp.exists('div.dnb-global-status__message__content')).toBe(
      false
    )
    expect(Comp.state().isActive).toBe(false)

    Comp.setProps({ show: true })
    Comp.update()

    expect(Comp.state().isActive).toBe(true)
    expect(Comp.exists('div.dnb-global-status__content')).toBe(true)
    expect(Comp.exists('div.dnb-global-status__message__content')).toBe(
      false
    )

    mount(
      <Component.Add
        id="custom-status-show"
        status_id="status-show-1"
        text="text only"
      />
    )
    Comp.update()

    expect(Comp.exists('div.dnb-global-status__message__content')).toBe(
      true
    )

    Comp.setProps({ show: 'auto' })

    mount(
      <Component.Remove
        id="custom-status-show"
        status_id="status-show-1"
      />
    )
    Comp.update()

    expect(Comp.exists('div.dnb-global-status__content')).toBe(false)
    expect(Comp.exists('div.dnb-global-status__message__content')).toBe(
      false
    )
  })

  it('should validate with ARIA rules', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('GlobalStatus snapshot', () => {
  it('have to match component snapshot', () => {
    const Comp = mount(<Component {...snapshotProps} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('have to match linked components snapshot', () => {
    const Comp = mount(
      <>
        <Component
          id="linked"
          show={true}
          autoscroll={false}
          delay={0}
          no_animation={true}
        />
        <Switch
          id="switch"
          label={<span>Label</span>}
          status="error-message"
          global_status_id="linked"
        />
      </>
    )
    expect(toJson(Comp)).toMatchSnapshot()
  })
})

describe('GlobalStatus scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-global-status.scss')
    )
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-global-status-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})

const wait = (t) => new Promise((r) => setTimeout(r, t))

const refresh = async (Comp) => {
  await wait(1)
  Comp.update()
}

const keydown = (Comp, keyCode) => {
  document.dispatchEvent(new KeyboardEvent('keydown', { keyCode }))

  Comp.find('.dnb-global-status__wrapper').simulate('keydown', {
    keyCode,
  })
}
