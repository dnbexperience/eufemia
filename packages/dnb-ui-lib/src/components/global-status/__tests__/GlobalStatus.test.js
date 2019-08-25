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

const props = fakeProps(require.resolve('../GlobalStatus'), {
  optional: true
})
props.id = 'main'
props.state = 'error'
props.text = 'text'
props.items = ['item #1', 'item #2']
props.show = true
props.no_animation = true
props.icon = 'exclamation'

describe('GlobalStatus component', () => {
  const Comp = mount(<Component {...props} />)

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('has to to have a text value as defined in the prop', () => {
    expect(
      Comp.find('.dnb-global-status__message')
        .find('.dnb-p')
        .text()
    ).toBe(props.text)
  })

  it('has to to have list items as defined in the prop', () => {
    expect(Comp.find('.dnb-ul').text()).toBe(props.items.join(''))
  })

  it('should have correact attributes like "aria-live"', async () => {
    const Comp = mount(<Component no_animation={true} />)
    expect(Comp.exists('[aria-live]')).toBe(false)
    Comp.setProps({
      show: true
    })
    expect(Comp.exists('[aria-live="assertive"]')).toBe(true)
    expect(await axeComponent(Comp)).toHaveNoViolations()
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
        />
        <Component.Update
          id="custom-status-update"
          status_id="status-update-1"
          text="will be overwritten"
        />
        <Component.Update
          id="custom-status-update"
          status_id="status-update-1"
          text={newText}
        />
      </>
    )

    expect(Comp.find('.dnb-global-status__message').text()).toBe(newText)
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
        <Component.Update
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

    expect(Comp.find('.dnb-global-status__message').text()).toBe(
      startupText
    )
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
