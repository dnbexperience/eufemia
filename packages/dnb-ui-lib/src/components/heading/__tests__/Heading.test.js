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
  it('have to match leveling reset', () => {
    const Comp = mount(
      <>
        <Heading.Level debug reset>
          <Heading>Heading #1</Heading>
        </Heading.Level>

        <Heading.Level debug reset bypass_checks>
          <Heading>Heading #2</Heading>
        </Heading.Level>
      </>
    )

    const elem = Comp.find('.dnb-heading')
    expect(elem.at(0).text()).toBe('(1) Heading #1')
    expect(elem.at(1).text()).toBe('(1) Heading #2')
  })
})

describe('Heading component semantic', () => {
  const Comp = mount(
    <>
      <Heading.Level debug reset>
        <Heading>Heading #1</Heading>
        <Heading>Heading #2</Heading>

        <Heading.Level>
          <Heading>Heading #3</Heading>
          <Heading up>Heading #4</Heading>
          <Heading down>Heading #5</Heading>
          <Heading decrease>Heading #6</Heading>
        </Heading.Level>

        <Heading.Level>
          <Heading>Heading #7</Heading>
          <Heading.Level decrease>
            <Heading>Heading #8</Heading>
          </Heading.Level>
        </Heading.Level>
      </Heading.Level>
    </>
  )

  it('have to match default leveling', () => {
    const elem = Comp.find('.dnb-heading')
    expect(elem.at(0).text()).toBe('(1) Heading #1')
    expect(elem.at(1).text()).toBe('(2) Heading #2')
    expect(elem.at(2).text()).toBe('(3) Heading #3')
    expect(elem.at(3).text()).toBe('(4) Heading #4')
    expect(elem.at(4).text()).toBe('(3) Heading #5')
    expect(elem.at(5).text()).toBe('(2) Heading #6')
    expect(elem.at(6).text()).toBe('(3) Heading #7')
    expect(elem.at(7).text()).toBe('(2) Heading #8')
  })

  it('have to match default heading snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp, {})).toHaveNoViolations()
  })
})

describe('Heading scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-heading.scss'))
    expect(scss).toMatchSnapshot()
  })
})
