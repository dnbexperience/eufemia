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
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../GlobalStatus'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _form_status from '../style/_global-status.scss' // eslint-disable-line
import dnb_form_status from '../style/dnb-global-status.scss' // eslint-disable-line
import dnb_form_status_theme_ui from '../style/themes/dnb-global-status-theme-ui.scss' // eslint-disable-line

const id = 'main'
const status_id = null
const state = 'error'
const text = 'text'
const children = null
const items = ['item #1', 'item #2']
const show = true
const no_animation = true
const autoscroll = false
const icon = 'error'

const snapshotProps = {
  ...fakeProps(require.resolve('../GlobalStatus'), {
    optional: true
  }),

  id,
  status_id,
  state,
  children,
  show,
  no_animation,
  items,
  text,
  icon
}

const props = {
  show,
  no_animation,
  autoscroll,
  items,
  text
}

describe('GlobalStatus component', () => {
  const Comp = mount(<Component {...props} />)

  it('has to to have a text value as defined in the prop', () => {
    expect(
      Comp.find('div.dnb-global-status__message')
        .find('.dnb-p')
        .text()
    ).toBe(props.text)
  })

  it('has to to have list items as defined in the prop', () => {
    expect(Comp.find('.dnb-ul').text()).toBe(props.items.join(''))
  })

  it('should have correact attributes like "aria-live"', async () => {
    const Comp = mount(
      <Component autoscroll={false} delay={0} duration={0} />
    )
    expect(Comp.exists('[aria-live]')).toBe(true)

    Comp.setProps({
      show: true
    })
    Comp.setState({
      isActive: true,
      isVisible: true
    })

    expect(Comp.exists('[aria-live="assertive"]')).toBe(true)

    Comp.setProps({
      show: false
    })
    expect(Comp.exists('[aria-live="off"]')).toBe(true)
  })

  it('has to to have correct content after a controller update', () => {
    const startupText = 'text'
    const newText = 'new text'

    const Comp = mount(
      <>
        <Component
          no_animation={true}
          autoclose={false}
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
      Comp.first()
        .find('div.dnb-global-status__message > .dnb-p')
        .text()
    ).toBe(newText)

    expect(
      Comp.first()
        .find('div.dnb-global-status__message > .dnb-ul')
        .text()
    ).toBe('item#1item#3')
  })

  it('has to to have correct content after a controller remove', () => {
    const startupText = 'text'
    const newText = 'new text'

    const Comp = mount(
      <>
        <Component
          no_animation={true}
          autoclose={false}
          id="custom-status-remove"
          text={startupText}
        />
        <Component.Add
          id="custom-status-remove"
          status_id="status-remove-1"
          text={newText}
        />
        <Component.Remove
          id="custom-status-remove"
          status_id="status-remove-1"
          buffer_delay={0}
        />
      </>
    )

    expect(
      Comp.first()
        .find('div.dnb-global-status__message')
        .text()
    ).toBe(startupText)
  })

  it('has to to have a working auto close', () => {
    const on_open = jest.fn()
    const on_close = jest.fn()
    const on_hide = jest.fn()

    const Comp = mount(
      <>
        <Component
          no_animation={true}
          autoclose={true}
          id="custom-status-autoclose"
          text="text"
          on_open={on_open}
          on_close={on_close}
          on_hide={on_hide}
        />
        <Component.Add
          id="custom-status-autoclose"
          status_id="status-autoclose-1"
        />
        <Component.Remove
          id="custom-status-autoclose"
          status_id="status-autoclose-1"
          buffer_delay={0}
        />
      </>
    )

    expect(on_open.mock.calls.length).toBe(1)
    expect(on_close.mock.calls.length).toBe(1)
    expect(on_hide.mock.calls.length).toBe(0)

    expect(Comp.first().exists('div.dnb-global-status__message')).toBe(
      false
    )
    expect(Comp.first().state().isActive).toBe(false)
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
