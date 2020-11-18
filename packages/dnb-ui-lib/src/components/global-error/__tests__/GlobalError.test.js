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
import Component from '../GlobalError'

const status = '404'
const title = 'title'
const text = 'text [link](/back) text'
const status_content = null
const children = null

const snapshotProps = {
  ...fakeProps(require.resolve('../GlobalError'), {
    optional: true
  }),

  status_content,
  children,

  status,
  text,
  title
}

const props = {
  status,
  text,
  title
}

describe('GlobalError component', () => {
  // Ensure we get "window.history.length === 2"
  jest.spyOn(window.history, 'length', 'get')
  window.history.pushState({ page: 1 }, 'title 1', '?page=1')

  const Comp = mount(<Component {...props} />)

  it('has to have a text value as defined in the prop', () => {
    const elem = Comp.find('.dnb-global-error__inner__content').find(
      '.dnb-p'
    )
    expect(elem.at(0).text()).toBe('text link text')
    expect(elem.find('a.dnb-anchor').text()).toBe('link')
  })

  it('has to have a 404 svg image', () => {
    expect(Comp.find('Svg404').exists('svg[xmlns]')).toBe(true)
  })
  it('has to have a 500 svg image', () => {
    const Comp = mount(<Component status="500" />)
    expect(Comp.find('Svg500').exists('svg[xmlns]')).toBe(true)
  })

  it('has to have a working back button', () => {
    const back = jest.fn()
    window.history.back = back

    const elem = Comp.find('button.dnb-global-error__back')
    elem.simulate('click')

    expect(elem.exists()).toBe(true)
    expect(back).toHaveBeenCalled()
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('GlobalError snapshot', () => {
  it('have to match component snapshot', () => {
    const Comp = mount(<Component {...snapshotProps} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })
})

describe('GlobalError scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-global-error.scss')
    )
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-global-error-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
