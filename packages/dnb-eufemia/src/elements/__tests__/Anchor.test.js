/**
 * Element Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  axeComponent,
} from '../../core/jest/jestSetup'
import Component from '../Anchor'

const props = fakeProps(require.resolve('../Anchor'), {
  optional: true,
})
props.inner_ref = null
props.element = 'a'

describe('Anchor element', () => {
  it('have to match default Anchor element snapshot', () => {
    const Comp = mount(<Component {...props}>text</Component>)
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it('has dnb-a class', () => {
    const Comp = mount(<Component>text</Component>)
    expect(Comp.find('.dnb-a').exists()).toBe(true)
  })
  it('has href', () => {
    const Comp = mount(<Component href="/url">text</Component>)
    expect(Comp.find('[href]').exists()).toBe(true)
  })
  it('has no-icon class when element was given', () => {
    const Comp = mount(
      <Component href="/url" target="_blank">
        <span>text</span>
      </Component>
    )
    expect(Comp.find('.dnb-anchor--no-icon').exists()).toBe(true)
  })
  it('has aria-describedby when target is blank', () => {
    const Comp = mount(
      <Component href="/url" target="_blank" lang="en-GB">
        text
      </Component>
    )

    const id = Comp.find('a').instance().getAttribute('aria-describedby')
    expect(document.body.querySelector('#' + id).textContent).toBe(
      'Opens a new Window'
    )

    const title = 'External site'
    Comp.setProps({
      title,
    })

    expect(Comp.find('a').instance().getAttribute('title')).toBe(title)
    expect(document.body.querySelector('#' + id)).toBe(null)
  })
  it('should validate with ARIA rules as a Anchor element', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
