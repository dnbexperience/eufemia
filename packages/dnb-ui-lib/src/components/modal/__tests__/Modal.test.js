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

import Component from '../Modal'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _modal from '../style/_modal.scss' // eslint-disable-line
import dnb_modal from '../style/dnb-modal.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../Modal'), {
  all: true,
  optional: true
})
props.title = 'modal_title'
props.id = 'modal_id'
props.content_id = 'modal_content_id'
props.close_title = 'close_title'

describe('Modal component', () => {
  const Comp = mount(
    <Component
      {...props}
      modal_content="unique_modal_content"
      preventSetTriggerRef={true} // we set preventSetTriggerRef to true, cause jest gives us an error
    />
  )
  Comp.setState({
    modalActive: true
  })
  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it('has to have the correct title', () => {
    expect(Comp.find('h1').text()).toBe(props.title)
  })
  it('has to have the correct aria-describedby', () => {
    expect(
      Comp.find('[aria-describedby]').props()['aria-describedby']
    ).toBe(props.content_id)
  })
  it('has to have the correct role on aria-modal', () => {
    expect(Comp.find('[aria-modal]').props().role).toBe('dialog')
  })
  it('has to have a close button', () => {
    expect(
      Comp.find(`button[aria-label="${props.close_title}"]`).props()[
        'aria-label'
      ]
    ).toBe(props.close_title)
  })
  it('should validate with ARIA rules as a dialog', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Modal scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-modal.scss'))
    expect(scss).toMatchSnapshot()
  })
})
