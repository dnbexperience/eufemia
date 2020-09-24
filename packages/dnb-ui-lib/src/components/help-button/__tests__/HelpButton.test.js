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
import Component from '../HelpButton'

const snapshotProps = fakeProps(require.resolve('../HelpButton'), {})
snapshotProps.id = 'help-button'

describe('HelpButton component', () => {
  it('have to match snapshot', () => {
    const Comp = mount(<Component {...snapshotProps} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should have correct default icon', () => {
    const Comp = mount(<Component />)
    expect(
      Comp.find('.dnb-icon').instance().getAttribute('aria-label')
    ).toBe('question icon')
  })
})

describe('HelpButton scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-help-button.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-help-button-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
