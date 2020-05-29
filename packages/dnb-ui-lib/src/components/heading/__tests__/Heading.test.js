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
import H2 from '../../../elements/H2'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _heading from '../style/_heading.scss' // eslint-disable-line
import dnb_heading from '../style/dnb-heading.scss' // eslint-disable-line

const warn = jest.fn()

describe('Heading component', () => {
  it('have to match leveling reset', () => {
    const Comp = mount(
      <>
        <Heading.Level debug={warn} reset>
          <Heading>Heading #1</Heading>
        </Heading.Level>

        <Heading.Level debug={warn} reset skip_correction>
          <Heading>Heading #2</Heading>
        </Heading.Level>
      </>
    )

    const elem = Comp.find('.dnb-heading')
    expect(elem.at(0).text()).toBe('[1] Heading #1')
    expect(elem.at(1).text()).toBe('[1] Heading #2')
  })

  it('have to match level correction', () => {
    const Comp = mount(
      <>
        <Heading.Level reset debug={warn}>
          <Heading level={2}>Heading #1</Heading>
          <Heading level={3}>Heading #2</Heading>
          <Heading level={4}>Heading #3</Heading>
          <Heading level={4}>Heading #4</Heading>
          <Heading level={2}>Heading #5</Heading>
          <Heading level={1}>Heading #6</Heading>
        </Heading.Level>
      </>
    )

    const elem = Comp.find('.dnb-heading')
    expect(elem.at(0).text()).toBe('[1] Heading #1')
    expect(elem.at(1).text()).toBe('[2] Heading #2')
    expect(elem.at(2).text()).toBe('[3] Heading #3')
    expect(elem.at(3).text()).toBe('[4] Heading #4')
    expect(elem.at(4).text()).toBe('[2] Heading #5')
    expect(elem.at(5).text()).toBe('[2] Heading #6')
  })

  it('have to match level correction', () => {
    const Comp = mount(
      <>
        <Heading.Level reset debug={warn}>
          <H2 level="auto">Heading #1</H2>
          <Heading>Heading #2</Heading>
          <Heading increase>Heading #3</Heading>
        </Heading.Level>
      </>
    )

    const first = Comp.find('h2.dnb-h--large')
    expect(first.at(0).text()).toBe('Heading #1')

    const elem = Comp.find('.dnb-heading')
    expect(elem.at(0).text()).toBe('[2] Heading #2')
    expect(elem.at(1).text()).toBe('[3] Heading #3')
  })

  it('have to match after level state update', () => {
    const warn = jest.fn()

    const Comp = mount(
      <Heading debug={warn} reset>
        Heading #1
      </Heading>
    )

    expect(Comp.find('.dnb-heading').at(0).text()).toBe('[1] Heading #1')

    Comp.setProps({ level: 3 })

    // We got a level correction here!
    expect(Comp.find('.dnb-heading').at(0).text()).toBe('[2] Heading #1')

    expect(warn).toBeCalledTimes(1)
    expect(warn).toHaveBeenCalledWith(
      'Heading levels can only be set by factor one! Got:',
      3,
      'and had before',
      1,
      '- The new level is',
      2,
      '\nNB: This warning was triggered by:',
      '',
      'Heading #1'
    )

    Comp.setProps({ skip_correction: true })
    Comp.setProps({ level: 4 })

    expect(Comp.find('.dnb-heading').at(0).text()).toBe('[4] Heading #1')
    expect(warn).toBeCalledTimes(1) // still one time, same as we had earlier
  })

  it('have to have aria role and level if set as span element', () => {
    const Comp = mount(
      <Heading element="span" debug={warn} reset>
        Heading #1
      </Heading>
    )

    const elem = Comp.find('span.dnb-heading')
    expect(elem.at(0).text()).toBe('[1] Heading #1')
    expect(elem.at(0).instance().getAttribute('role')).toBe('heading')
    expect(elem.at(0).instance().getAttribute('aria-level')).toBe('1')
  })

  it('have to refuse to set level below 1', () => {
    const Comp = mount(
      <Heading debug={warn} level={0} reset>
        Heading #1
      </Heading>
    )

    expect(Comp.find('.dnb-heading').at(0).text()).toBe('[1] Heading #1')
  })

  it('have to have correct size class', () => {
    const Comp = mount(
      <Heading debug={warn} size="x-large" reset>
        Heading #1
      </Heading>
    )

    const elem = Comp.find('.dnb-heading')
    expect(elem.at(0).text()).toBe('[1] Heading #1')
    expect(elem.at(0).exists('.dnb-h--x-large')).toBe(true)
    expect(elem.at(0).instance().getAttribute('class')).toBe(
      'dnb-heading dnb-h--x-large'
    )
  })

  it('should set level if skip_correction is true', () => {
    const Comp = mount(
      <>
        <Heading.Level debug={warn} skip_correction reset>
          <Heading level={4}>Heading #1</Heading>
          <Heading increase>Heading #2</Heading>
        </Heading.Level>
      </>
    )

    const elem = Comp.find('.dnb-heading')
    expect(elem.at(0).text()).toBe('[4] Heading #1')
    expect(elem.at(1).text()).toBe('[5] Heading #2')
  })

  it('should not increase level above 6', () => {
    const Comp = mount(
      <>
        <Heading.Level debug={warn} reset>
          <Heading>Heading #1</Heading>
          <Heading.Increase skip_correction level="6">
            <Heading>Heading #2</Heading>
            <Heading increase>Heading #3</Heading>
          </Heading.Increase>
        </Heading.Level>
      </>
    )

    const elem = Comp.find('.dnb-heading')
    expect(elem.at(0).text()).toBe('[1] Heading #1')
    expect(elem.at(1).text()).toBe('[6] Heading #2')
    expect(elem.at(2).text()).toBe('[6] Heading #3')
  })
})

describe('Heading component semantic', () => {
  const Comp = mount(
    <>
      <Heading.Level debug={warn} reset>
        <Heading>Heading #1</Heading>
        <Heading>Heading #2</Heading>

        <Heading.Increase>
          <Heading>Heading #3</Heading>
          <Heading up>Heading #4</Heading>
          <Heading down>Heading #5</Heading>
          <Heading decrease>Heading #6</Heading>
        </Heading.Increase>

        <Heading.Increase>
          <Heading>Heading #7</Heading>
          <Heading.Increase decrease>
            <Heading>Heading #8</Heading>
            <Heading decrease>Heading #9</Heading>
          </Heading.Increase>
        </Heading.Increase>
      </Heading.Level>
    </>
  )

  it('have to match default leveling', () => {
    const elem = Comp.find('.dnb-heading')
    expect(elem.at(0).text()).toBe('[1] Heading #1')
    expect(elem.at(1).text()).toBe('[2] Heading #2')
    expect(elem.at(2).text()).toBe('[3] Heading #3')
    expect(elem.at(3).text()).toBe('[4] Heading #4')
    expect(elem.at(4).text()).toBe('[3] Heading #5')
    expect(elem.at(5).text()).toBe('[2] Heading #6')
    expect(elem.at(6).text()).toBe('[3] Heading #7')
    expect(elem.at(7).text()).toBe('[2] Heading #8')
    expect(elem.at(8).text()).toBe('[2] Heading #9')
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
