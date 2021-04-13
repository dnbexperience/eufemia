/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Space'

const snapshotProps = fakeProps(require.resolve('../Space'), {
  optional: true
})
snapshotProps.id = 'space'
snapshotProps.element = 'div'
snapshotProps.no_collapse = false

describe('Space component', () => {
  it('have to match snapshot', () => {
    const Comp = mount(<Component {...snapshotProps} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should have correct CSS classes', () => {
    const Comp = mount(<Component element="span" top="large" />)
    expect(
      Comp.find('span.dnb-space').hasClass('dnb-space__top--large')
    ).toBe(true)
  })

  it('should accept space only prop', () => {
    const Comp = mount(<Component element="span" space="large" />)
    expect(
      Object.values(Comp.find('span.dnb-space').instance().classList)
    ).toEqual([
      'dnb-space',
      'dnb-space__top--large',
      'dnb-space__right--large',
      'dnb-space__bottom--large',
      'dnb-space__left--large'
    ])
  })

  it('should accept space prop as an object with spacing properties', () => {
    const Comp = mount(
      <Component
        element="span"
        space={{
          top: 'x-large',
          right: 'large',
          bottom: 'small small',
          left: 'x-small x-small small'
        }}
      />
    )
    expect(
      Object.values(Comp.find('span.dnb-space').instance().classList)
    ).toEqual([
      'dnb-space',
      'dnb-space__top--x-large',
      'dnb-space__right--large',
      'dnb-space__bottom--large',
      'dnb-space__left--large'
    ])
  })

  it('should have collapse CSS class', () => {
    const Comp = mount(<Component top="large" no_collapse={true} />)
    expect(Comp.find('.dnb-space--no-collapse').exists()).toBe(true)
  })
})

describe('Space scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-space.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-space-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
