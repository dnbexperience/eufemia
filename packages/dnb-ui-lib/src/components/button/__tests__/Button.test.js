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
import Component from '../Button'
import '../style/dnb-button.scss' // just to make sure we re-run the test in watch mode due to changes in this file

const props = fakeProps(require.resolve('../Button'), {
  optional: true
})
props.variant = 'primary'
props.icon = 'question'
props.title = 'This is a button title'
props.size = null
props.icon_position = 'right'

describe('Button component', () => {
  it('have to match default button snapshot', () => {
    const Comp = mount(<Component {...props} href={null} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('have to match href="..." snapshot', () => {
    const Comp = mount(<Component {...props} href="https://url" />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has a button tag', () => {
    const title = 'title'
    const Comp = mount(<Component {...props} title={title} href={null} />)
    expect(Comp.find('button').exists()).toBe(true)
    expect(Comp.find('button').props().title).toBe(title)
  })

  it('icon only has to have some extra classes', () => {
    const Comp = mount(<Component icon="question" />)

    // size "small" (32px)
    expect(Comp.find('.dnb-button--size-small').exists()).toBe(true)

    // has icon class, but not has text
    expect(Comp.find('.dnb-button--has-icon').exists()).toBe(true)
    expect(Comp.find('.dnb-button--has-text').exists()).toBe(false)
  })

  it('has a button tag', () => {
    const Comp = mount(<Component {...props} href="https://url" />)
    expect(Comp.find('a').exists()).toBe(true)
  })

  it('should validate with ARIA rules as a button', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a anchor', async () => {
    const Comp = mount(<Component {...props} href="https://url" />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Button scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-button.scss'))
    expect(scss).toMatchSnapshot()
  })
})
