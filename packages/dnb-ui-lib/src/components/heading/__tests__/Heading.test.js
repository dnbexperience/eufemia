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
// import { LOCALE } from '../../../shared/defaults'
// import { isMac } from '../../../shared/helpers'
import Component from '../Heading'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _heading from '../style/_heading.scss' // eslint-disable-line
import dnb_heading from '../style/dnb-heading.scss' // eslint-disable-line

// const element = Component.defaultProps.element
const value = 'Heading'
const snapshotProps = {
  value,
  element: null
}

describe('Heading component', () => {
  // const slector = element + '.dnb-heading'
  it.skip('have to match default heading snapshot', () => {
    const Comp = mount(<Component {...snapshotProps} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it.skip('have to match default heading', () => {
    const Comp = mount(<Component value={value} />)
    expect(Comp.find('.dnb-heading').first().text()).toBe(
      '12 345 678,9876'
    )
  })
  it.skip('should validate with ARIA rules', async () => {
    const Comp = mount(<Component value={-value} currency />)
    expect(
      await axeComponent(Comp, {
        rules: {
          // because of the role="text", we disable this rule for now
          'aria-roles': { enabled: false }
        }
      })
    ).toHaveNoViolations()
  })
})

describe('Heading scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-heading.scss'))
    expect(scss).toMatchSnapshot()
  })
})
