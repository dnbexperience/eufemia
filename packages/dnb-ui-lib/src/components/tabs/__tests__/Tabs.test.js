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
import Input from '../../Input'

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
  { title: 'First', key: 1, content: <h2>First</h2> }, // without function
  { title: 'Second', key: 2, content: () => <h2>Second</h2> }, // with function
  { title: 'Third', key: 3, content: () => <h2>Third</h2> } // with function
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

  it('should validate with ARIA rules', async () => {
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
    expect(Comp.find('.dnb-tabs__button__snap').length).toBe(
      tablistData.length
    )
    expect(Comp.find('div[role="tabpanel"]').length).toBe(1)
  })

  it('has to have the right content on a "click event"', () => {
    Comp.find('button[data-tab-key="third"]').simulate('click')
    expect(Comp.state().selected_key).toBe(tablistData[2].key) // get the third key
    expect(Comp.find('div[role="tabpanel"]').children().html()).toBe(
      mount(contentWrapperData.third).html()
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
      {contentWrapperData}
    </Component>
  )

  it('has to have a role="tab" attribute and a selcted class', () => {
    expect(
      Comp.find('button[data-tab-key="second"]')
        .instance()
        .getAttribute('role')
    ).toBe('tab')
    expect(
      Comp.find('button[data-tab-key="second"]').hasClass('selected')
    ).toBe(true)
  })

  it('has to have the right content on a keydown "ArrowRight"', () => {
    // reset the state
    Comp.find('button[data-tab-key="second"]').simulate('click')
    Comp.find('div[role="tablist"]').simulate('keyDown', {
      key: 'ArrowRight',
      keyCode: 39
    })
    Comp.find('button[data-tab-key="third"]').simulate('click')
    expect(Comp.find('div[role="tabpanel"]').children().html()).toBe(
      mount(contentWrapperData.third).html()
    )
  })

  it('has to work with "data only" property containing a "content"', () => {
    const Comp = mount(<Component data={tablistDataWithContent} />)
    expect(
      Comp.find('.dnb-tabs__button__snap')
        .first()
        .find('button')
        .hasClass('selected')
    ).toBe(true)
    expect(Comp.find('div.dnb-tabs__content').text()).toBe('First')

    // then click on tab two
    // also test the ability of having a integer only as the key
    Comp.find('button[data-tab-key=2]').simulate('click')
    expect(Comp.find('div.dnb-tabs__content').text()).toBe('Second')
  })

  it('has to run "prevent_rerender" as supposed', () => {
    const Comp = mount(
      <Component
        {...props}
        prevent_rerender
        data={[
          {
            title: 'One',
            key: 'one',
            content: () => (
              <Input label="Content one" placeholder="Edit me" />
            )
          },
          { title: 'Two', key: 'two', content: 'Content two' }
        ]}
      />
    )

    expect(Comp.find('div.dnb-tabs__cached').exists()).toBe(true)

    // also check a real live rerender scenario
    const value = 'value'
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value }
    })

    // then click on tab two
    Comp.find('button[data-tab-key="two"]').simulate('click')

    // the first cache should now be hidden
    expect(
      Comp.find('div.dnb-tabs__cached')
        .at(0)
        .instance()
        .getAttribute('aria-hidden')
    ).toBe('true')

    // and on tab one again
    Comp.find('button[data-tab-key="one"]').simulate('click')

    // the entered value should still be the same
    expect(Comp.find('.dnb-input__input').instance().value).toBe(value)

    expect(
      Comp.find('div.dnb-tabs__cached')
        .at(0)
        .instance()
        .getAttribute('aria-hidden')
    ).not.toBe('true')
    expect(
      Comp.find('div.dnb-tabs__cached')
        .at(1)
        .instance()
        .getAttribute('aria-hidden')
    ).toBe('true')
  })

  it('has to run "prerender" as supposed', () => {
    const Comp = mount(
      <Component
        {...props}
        prerender
        data={[
          {
            title: 'One',
            key: 1,
            content: 'Content one'
          },
          { title: 'Two', key: 2, content: 'Content two' }
        ]}
      />
    )

    expect(Comp.find('div.dnb-tabs__cached').exists()).toBe(true)

    expect(
      Comp.find('div.dnb-tabs__cached')
        .at(0)
        .instance()
        .hasAttribute('aria-hidden')
    ).toBe(false)
    expect(
      Comp.find('div.dnb-tabs__cached')
        .at(1)
        .instance()
        .getAttribute('aria-hidden')
    ).toBe('true')

    expect(Comp.find('div.dnb-tabs__cached').at(0).text()).toBe(
      'Content one'
    )
    expect(Comp.find('div.dnb-tabs__cached').at(1).text()).toBe(
      'Content two'
    )
  })

  it('has to work with "Tabs.Content" as children Components', () => {
    const Comp = mount(
      <Component {...props} data={tablistData}>
        <Component.Content title="first title">first</Component.Content>
        <Component.Content title="second title" selected>
          second
        </Component.Content>
      </Component>
    )
    expect(
      Comp.find('button.selected').instance().getAttribute('data-tab-key')
    ).toBe('second-title')
    expect(
      Comp.find('.dnb-tabs__button__snap button')
        .at(1)
        .instance()
        .getAttribute('data-tab-key')
    ).toBe('second-title')
    expect(Comp.find('div.dnb-tabs__content').text()).toBe('second')
    expect(
      Comp.find(
        'button[aria-selected=true] span.dnb-tabs__button__title'
      ).text()
    ).toBe('second title')
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
