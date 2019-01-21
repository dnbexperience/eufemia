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
import Component from '../Tabs'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-tabs.scss'
import '../style/themes/dnb-tabs-theme-ui.scss'

const props = fakeProps(require.resolve('../Tabs'), {
  all: true,
  optional: true
})
delete props.render
props.id = 'id'

const startup_selected_key = 'second'
const tablistData = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third' }
]
const tablistDataWithContent = [
  { title: 'First', key: 'first', content: <h2>First</h2> }, // without function
  { title: 'Second', key: 'second', content: () => <h2>Second</h2> }, // with function
  { title: 'Third', key: 'third', content: () => <h2>Third</h2> } // with function
]
const contentWrapperData = {
  first: <h2>First</h2>, // without function
  second: () => <h2>Second</h2>, // with function
  third: <h2>Third</h2> // without function
}

describe('Tabs component', () => {
  const Comp = mount(
    <Component
      {...props}
      data={tablistData}
      selected_key={startup_selected_key}
    >
      {contentWrapperData}
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
      {contentWrapperData}
    </Component>
  )

  it('has to have the right amount of renderet components', () => {
    expect(Comp.find('button').length).toBe(tablistData.length)
    expect(Comp.find('div[role="tabpanel"]').length).toBe(1)
  })

  it('has to have the right content on a "click event"', () => {
    Comp.find('button.tab--third').simulate('click')
    expect(Comp.state().selected_key).toBe(tablistData[2].key) // get the third key
    expect(
      Comp.find('div[role="tabpanel"]')
        .children()
        .html()
    ).toBe(mount(contentWrapperData.third).html())
  })
})

describe('A single Tab component', () => {
  const Comp = mount(
    <Component
      {...props}
      data={tablistData}
      selected_key={startup_selected_key}
    >
      {contentWrapperData}
    </Component>
  )

  it('has to have a role="tab" attribute and a class="selcted"', () => {
    expect(
      Comp.find('button.tab--second')
        .instance()
        .getAttribute('role')
    ).toBe('tab')
    expect(Comp.find('button.tab--second').hasClass('selected')).toBe(true)
  })

  it('has to have the right content on a keydown "ArrowRight"', () => {
    // reset the state
    Comp.find('button.tab--second').simulate('click')
    Comp.find('div[role="tablist"]').simulate('keyDown', {
      key: 'ArrowRight',
      keyCode: 39
    })
    expect(
      Comp.find('div[role="tabpanel"]')
        .children()
        .html()
    ).toBe(mount(contentWrapperData.third).html())
  })

  it('has to work with "data only" property containing a "content"', () => {
    const Comp = mount(<Component data={tablistDataWithContent} />)
    expect(Comp.find('button.selected').exists()).toBe(true)
    expect(Comp.find('div.dnb-tabs__content').text()).toBe('First')
  })

  it('has to work with "Tabs.Content" as children Components', () => {
    const Comp = mount(
      <Component>
        <Component.Content title="first">first</Component.Content>
        <Component.Content title="second" selected>
          second
        </Component.Content>
      </Component>
    )
    expect(Comp.find('button.selected').exists()).toBe(true)
    expect(Comp.find('div.dnb-tabs__content').text()).toBe('second')
  })
})

describe('Tabs scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-tabs.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-tabs-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
