/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  axeComponent,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Heading from '../Heading'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _heading from '../style/_heading.scss' // eslint-disable-line
import dnb_heading from '../style/dnb-heading.scss' // eslint-disable-line

describe('Heading component', () => {
  // const slector = element + '.dnb-heading'
  it.skip('have to match default heading', () => {
    const Comp = mount(
      <>
        <Heading>Heading #1</Heading>
        <Heading>Heading #2</Heading>
      </>
    )
    expect(Comp.find('.dnb-heading').first().text()).toBe(
      '12 345 678,9876'
    )
  })
  it('have to match default heading snapshot', () => {
    const Comp = mount(
      <>
        <Heading debug>Heading #1</Heading>
        <Heading debug>Heading #2</Heading>

        <Heading.Level debug>
          <Heading>Heading #3</Heading>
          <Heading up>Heading #4</Heading>
          <Heading down>Heading #5</Heading>
          <Heading decrease>Heading #6</Heading>
        </Heading.Level>
      </>
    )
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it('should validate with ARIA rules', async () => {
    const Comp = mount(
      <>
        <Heading>Heading #1</Heading>
        <Heading>Heading #2</Heading>
      </>
    )
    expect(await axeComponent(Comp, {})).toHaveNoViolations()
  })
})

describe('Heading scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-heading.scss'))
    expect(scss).toMatchSnapshot()
  })
})
