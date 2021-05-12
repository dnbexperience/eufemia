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
import Switch from '../../switch/Switch'

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
  const Comp = mount(<Component {...props} />)

  it('has to to have a text value as defined in the prop', () => {
    expect(
      Comp.find('div.dnb-global-status__message')
        .find('.dnb-p')
        .at(0)
        .text()
    ).toBe(props.text)
  })

  it('has to to have list items as defined in the prop', () => {
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

  it('has to to have correct content after a controller add', () => {
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

  it('has to to have correct content after a controller update', () => {
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

  it('has to to have correct content after a controller remove', () => {
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

    // Comp.setProps({ show: false })

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
  })

  it('has to to have a working auto close', () => {
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
