/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeAllProps,
  axeComponent,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Tabs'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-tabs.scss'

const props = fakeAllProps(require.resolve('../Tabs'), {
  optional: true
})
delete props.render

const startup_selected_key = 'second'
const tablistData = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third' }
]
const tabContentData = {
  first: <h2>First</h2>,
  second: <h2>Second</h2>,
  third: <h2>Third</h2>
}

describe('Tabs component', () => {
  const Comp = mount(
    <Component
      {...props}
      data={tablistData}
      selected_key={startup_selected_key}
    >
      {tabContentData}
    </Component>
  )

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('have a "selected_key" state have to be same as prop from startup', () => {
    expect(Comp.state().selected_key).toBe(startup_selected_key)
  })

  it('should validate with ARIA rules as a tabs', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('TabList component', () => {
  const Comp = mount(
    <Component
      {...props}
      data={tablistData}
      selected_key={startup_selected_key}
    >
      {tabContentData}
    </Component>
  )

  it('has to have the right amount of renderet components', () => {
    expect(Comp.find('button').length).toBe(tablistData.length)
    expect(Comp.find('div[role="tabpanel"]').length).toBe(1)
  })

  it('has to have the right content on a "click event"', () => {
    Comp.find('button.tab--third').simulate('click')
    expect(Comp.state().selected_key).toBe(tablistData[2].key) // get the third key
    expect(Comp.find('div[role="tabpanel"]').text()).toBe(
      mount(tabContentData.third).text()
    )
  })
})

describe('A single Tab component', () => {
  const Comp = mount(
    <Component
      {...props}
      data={tablistData}
      selected_key={startup_selected_key}
    >
      {tabContentData}
    </Component>
  )

  it('has to have the right content on a keydown "ArrowRight"', () => {
    expect(
      Comp.find('button.tab--second')
        .instance()
        .getAttribute('aria-controls')
    ).toBe('id-content-second')
    expect(Comp.find('button.tab--second').is('.selected')).toBe(true)
  })

  it('has to have the right content on a keydown "ArrowRight"', () => {
    // reset the state
    Comp.find('button.tab--second').simulate('click')
    Comp.find('div[role="tablist"]').simulate('keyDown', {
      key: 'ArrowRight',
      keyCode: 39
    })
    expect(Comp.find('div[role="tabpanel"]').text()).toBe(
      mount(tabContentData.third).text()
    )
  })
})

describe('Tabs scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-tabs.scss'))
    expect(scss).toMatchSnapshot()
  })
})
