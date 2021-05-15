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
  loadScss,
} from '../../../core/jest/jestSetup'
import Component from '../Section'

const props = fakeProps(require.resolve('../Section'), {
  optional: true,
})
props.style = null
props.element = null
props.style_type = 'mint-green-12'

describe('Section component', () => {
  const Comp = mount(<Component {...props} />)

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should have correct styles', () => {
    const Comp = mount(<Component {...props} style_type="divider" />)
    expect(
      Comp.find('section.dnb-section')
        .first()
        .hasClass('dnb-section--divider')
    ).toBe(true)
  })

  it('should have correct spacing', () => {
    const Comp = mount(<Component {...props} spacing="large" />)
    expect(
      Comp.find('section.dnb-section')
        .first()
        .hasClass('dnb-section--spacing-large')
    ).toBe(true)
  })

  it('should have a div as the element tag', () => {
    const Comp = mount(<Component {...props} element="div" />)
    expect(Comp.find('div.dnb-section').exists()).toBe(true)
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Section scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-section.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-section-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
