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

  it('should have correact attributes like "aria-live"', async () => {
    expect(Comp.exists('[aria-live="assertive"]')).toBe(true)
    expect(await axeComponent(Comp)).toHaveNoViolations()
    Comp.setProps({
      show: false
    })
    expect(Comp.exists('[aria-live="assertive"]')).toBe(false)
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

  it('has to to have correct content after a controller update and remove', () => {
    const text = 'new text'

    // Add new content to the main GlobalStatus
    mount(
      <Component.Update
        id="main"
        status_id="status-update-1"
        text={text}
      />
    )
    expect(
      Comp.find('.dnb-global-status__message')
        .find('.dnb-p')
        .text()
    ).toBe(text)

    // Remvoe content again from the target GlobalStatus
    mount(
      <Component.Remove
        id="main"
        status_id="status-update-1"
        buffer_delay={0}
      />
    )
    expect(
      Comp.find('.dnb-global-status__message')
        .find('.dnb-p')
        .text()
    ).toBe(props.text)
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
