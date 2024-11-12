/**
 * Tabs Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import Tabs, { TabsProps } from '../Tabs'
import Input from '../../input/Input'

const props: TabsProps = { id: 'id' }

const startup_selected_key = 'second'
const tablistData = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third' },
]
const tablistDataWithContent = [
  { title: 'First', key: 1, content: <h2>First</h2> }, // without function
  { title: 'Second', key: 2, content: () => <h2>Second</h2> }, // with function
  { title: 'Third', key: 3, content: () => <h2>Third</h2> }, // with function
]
const contentWrapperData = {
  first: <h2>First</h2>, // without function
  second: () => <h2>Second</h2>, // with function
  third: <h2>Third</h2>, // without function
}

describe('Tabs component', () => {
  it('have a "selected_key" state have to be same as prop from startup', () => {
    render(
      <Tabs
        {...props}
        data={tablistData}
        selected_key={startup_selected_key}
      >
        {contentWrapperData}
      </Tabs>
    )
    expect(
      document
        .querySelector('.dnb-tabs__button.selected')
        .querySelectorAll('span')[0].textContent
    ).toBe(
      tablistData.find(({ key }) => key === startup_selected_key).title
    )
  })

  it('has working "on_change" and "on_click" event handler', () => {
    let preventChange = false
    const on_change = jest.fn((e) => {
      if (preventChange) {
        return false
      }
      return e
    })
    const on_click = jest.fn((e) => {
      if (preventChange) {
        return false
      }
      return e
    })

    render(
      <Tabs
        {...props}
        data={tablistData}
        on_change={on_change}
        on_click={on_click}
      >
        {contentWrapperData}
      </Tabs>
    )

    fireEvent.click(document.querySelectorAll('.dnb-tabs__button')[1])
    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_click).toHaveBeenCalledTimes(1)

    fireEvent.click(document.querySelectorAll('.dnb-tabs__button')[2])
    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_click).toHaveBeenCalledTimes(2)

    preventChange = true

    fireEvent.click(document.querySelectorAll('.dnb-tabs__button')[1])
    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_click).toHaveBeenCalledTimes(3)
  })

  it('has working "on_focus" event handler', () => {
    const on_focus = jest.fn()

    render(
      <Tabs {...props} data={tablistData} on_focus={on_focus}>
        {contentWrapperData}
      </Tabs>
    )

    fireEvent.keyDown(document.querySelector('.dnb-tabs__tabs__tablist'), {
      keyCode: 39, // right
    })
    expect(on_focus).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(document.querySelector('.dnb-tabs__tabs__tablist'), {
      keyCode: 39, // right
    })
    expect(on_focus).toHaveBeenCalledTimes(2)
  })

  it('will use given tab_element', () => {
    const Link = ({ href, children }) => {
      return <a href={href}>{children}</a>
    }

    const tablistData = [
      { title: 'First', key: 'first', href: '/first' },
      { title: 'Second', key: 'second', href: '/second' },
      { title: 'Third', key: 'third', href: '/third' },
    ]

    render(
      <Tabs {...props} data={tablistData} tab_element={Link}>
        {contentWrapperData}
      </Tabs>
    )

    expect(
      document
        .querySelector('.dnb-tabs__tabs__tablist')
        .querySelectorAll('a')[1].outerHTML
    ).toMatchInlineSnapshot(
      `"<a href="/second"><span class="dnb-tabs__button__title">Second</span><span aria-hidden="true" hidden="" class="dnb-dummy">Second</span></a>"`
    )
  })

  it('should support "align" prop', () => {
    render(
      <Tabs {...props} data={tablistData} align="right">
        {contentWrapperData}
      </Tabs>
    )

    const element = document.querySelector('.dnb-tabs__tabs')

    expect(Array.from(element.classList)).toEqual([
      'dnb-tabs__tabs',
      'dnb-tabs__tabs--right',
      'dnb-tabs__tabs--breakout',
    ])
  })

  it('should support "no_border" prop', () => {
    render(
      <Tabs {...props} data={tablistData} no_border>
        {contentWrapperData}
      </Tabs>
    )

    const element = document.querySelector('.dnb-tabs__tabs')

    expect(Array.from(element.classList)).toEqual([
      'dnb-tabs__tabs',
      'dnb-tabs__tabs--left',
      'dnb-tabs__tabs--no-border',
      'dnb-tabs__tabs--breakout',
    ])
  })

  it('should support "content_spacing" prop', () => {
    render(
      <Tabs {...props} data={tablistData} content_spacing="small">
        {contentWrapperData}
      </Tabs>
    )

    const element = document.querySelector('.dnb-tabs__content')

    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-tabs__content',
        'dnb-height-animation--is-in-dom',
      ])
    )
  })

  it('should support "tabs_spacing" prop', () => {
    render(
      <Tabs {...props} data={tablistData} tabs_spacing={true}>
        {contentWrapperData}
      </Tabs>
    )

    const element = document.querySelector('.dnb-tabs__tabs')

    expect(Array.from(element.classList)).toEqual([
      'dnb-tabs__tabs',
      'dnb-tabs__tabs--left',
      'dnb-section--spacing-large',
      'dnb-tabs__tabs--breakout',
    ])
  })

  it('should support outer spacing props', () => {
    render(
      <Tabs {...props} data={tablistData} top="large">
        {contentWrapperData}
      </Tabs>
    )

    const element = document.querySelector('.dnb-tabs')

    expect(Array.from(element.classList)).toEqual([
      'dnb-tabs',
      'dnb-space__top--large',
    ])
  })

  it('should use section component when "tabs_style" is set', () => {
    render(
      <Tabs {...props} data={tablistData} tabs_style="black-3">
        {contentWrapperData}
      </Tabs>
    )

    const element = document.querySelector('.dnb-tabs__tabs')

    expect(element.tagName).toBe('DIV')
    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-tabs__tabs',
        'dnb-tabs__tabs--left',
        'dnb-section',
        'dnb-section--black-3',
      ])
    )
  })

  it('should use section component when "content_style" is set', () => {
    render(
      <Tabs {...props} data={tablistData} content_style="black-3">
        {contentWrapperData}
      </Tabs>
    )

    const element = document.querySelector('.dnb-tabs__content')

    expect(element.tagName).toBe('SECTION')
    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-tabs__content',
        'dnb-section',
        'dnb-section--black-3',
        'dnb-section--spacing-large',
        'dnb-no-focus',
        'dnb-space',
        'dnb-height-animation',
        'dnb-height-animation--is-in-dom',
        'dnb-height-animation--is-visible',
      ])
    )
  })

  it('border should stay inside parent boundary if breakout is set to false', () => {
    render(
      <Tabs
        {...props}
        data={tablistData}
        breakout={false}
        selected_key={startup_selected_key}
      >
        {contentWrapperData}
      </Tabs>
    )

    const tabs = document.querySelector('.dnb-tabs__tabs')

    expect(tabs.className).not.toContain('--breakout')
  })

  it('warns when not providing any content', () => {
    global.console.log = jest.fn()
    render(<Tabs />)

    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(global.console.log).toHaveBeenCalledWith(
      '\u001b[0m\u001b[1m\u001b[38;5;23m\u001b[48;5;152mEufemia\u001b[49m\u001b[39m\u001b[22m\u001b[0m',
      `No content was given to the Tabs component!
Tip: Check out other solutions like <Tabs.Content id="unique">Your content, outside of the Tabs component</Tabs.Content>
`
    )
  })
})

describe('TabList component', () => {
  it('has to have the right amount of rendered components', () => {
    render(
      <Tabs
        {...props}
        data={tablistData}
        selected_key={startup_selected_key}
      >
        {contentWrapperData}
      </Tabs>
    )

    expect(
      document.querySelectorAll('.dnb-tabs__button__snap').length
    ).toBe(tablistData.length)
    expect(document.querySelectorAll('div[role="tabpanel"]').length).toBe(
      1
    )
  })

  it('has to have the right content on a "click event"', () => {
    render(
      <Tabs
        {...props}
        data={tablistData}
        selected_key={startup_selected_key}
      >
        {contentWrapperData}
      </Tabs>
    )

    fireEvent.click(document.querySelector('button[data-tab-key="third"]'))

    expect(
      document.querySelector('button[data-tab-key="third"]').classList
    ).toContain('selected')

    const content = document.querySelector('div[role="tabpanel"]')
    const { container } = render(contentWrapperData.third)
    expect(content.innerHTML).toBe(container.innerHTML)
  })
})

describe('A single Tab component', () => {
  it('has to have a role="tab" attribute and a selected class', () => {
    render(
      <Tabs
        {...props}
        data={tablistData}
        selected_key={startup_selected_key}
      >
        {contentWrapperData}
      </Tabs>
    )

    expect(
      document
        .querySelector('button[data-tab-key="second"]')
        .getAttribute('role')
    ).toBe('tab')
    expect(
      document.querySelector('button[data-tab-key="second"]').classList
    ).toContain('selected')
  })

  it('has to have the right content on a keydown "ArrowRight"', () => {
    render(
      <Tabs
        {...props}
        data={tablistData}
        selected_key={startup_selected_key}
      >
        {contentWrapperData}
      </Tabs>
    )

    // reset the state
    fireEvent.click(
      document.querySelector('button[data-tab-key="second"]')
    )

    fireEvent.keyDown(document.querySelector('div[role="tablist"]'), {
      key: 'ArrowRight',
      keyCode: 39, // right
    })
    fireEvent.click(document.querySelector('button[data-tab-key="third"]'))

    const content = document.querySelector('div[role="tabpanel"]')
    const { container } = render(contentWrapperData.third)
    expect(content.innerHTML).toBe(container.innerHTML)
  })

  it('has to work with "data only" property containing a "content"', () => {
    render(<Tabs {...props} data={tablistDataWithContent} />)
    expect(
      document
        .querySelectorAll('.dnb-tabs__button__snap')[0]
        .querySelector('button').classList
    ).toContain('selected')
    expect(
      document.querySelector('div.dnb-tabs__content').textContent
    ).toBe('First')

    // then click on tab two
    // also test the ability of having a integer only as the key
    fireEvent.click(document.querySelector('button[data-tab-key="2"]'))
    expect(
      document.querySelector('div.dnb-tabs__content').textContent
    ).toBe('Second')
  })

  it('has to run "prevent_rerender" as supposed', () => {
    render(
      <Tabs
        {...props}
        prevent_rerender
        data={[
          {
            title: 'One',
            key: 'one',
            content: () => (
              <Input label="Content one" placeholder="Edit me" />
            ),
          },
          { title: 'Two', key: 'two', content: 'Content two' },
        ]}
      />
    )

    expect(
      document.querySelector('div.dnb-tabs__cached')
    ).toBeInTheDocument()

    // also check a real live rerender scenario
    const value = 'value'
    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value },
    })

    // then click on tab two
    fireEvent.click(document.querySelector('button[data-tab-key="two"]'))

    // the first cache should now be hidden
    expect(
      document
        .querySelectorAll('div.dnb-tabs__cached')[0]
        .getAttribute('aria-hidden')
    ).toBe('true')

    // and on tab one again
    fireEvent.click(document.querySelector('button[data-tab-key="one"]'))

    // the entered value should still be the same
    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe(value)

    expect(
      document
        .querySelectorAll('div.dnb-tabs__cached')[0]
        .getAttribute('aria-hidden')
    ).not.toBe('true')
    expect(
      document
        .querySelectorAll('div.dnb-tabs__cached')[1]
        .getAttribute('aria-hidden')
    ).toBe('true')
  })

  it('has to run "prerender" as supposed', () => {
    render(
      <Tabs
        {...props}
        prerender
        data={[
          {
            title: 'One',
            key: 1,
            content: 'Content one',
          },
          { title: 'Two', key: 2, content: 'Content two' },
        ]}
      />
    )

    expect(
      document.querySelector('div.dnb-tabs__cached')
    ).toBeInTheDocument()

    expect(
      document.querySelectorAll('div.dnb-tabs__cached')[0]
    ).not.toHaveAttribute('aria-hidden')
    expect(
      document
        .querySelectorAll('div.dnb-tabs__cached')[1]
        .getAttribute('aria-hidden')
    ).toBe('true')

    expect(
      document.querySelectorAll('div.dnb-tabs__cached')[0].textContent
    ).toBe('Content one')
    expect(
      document.querySelectorAll('div.dnb-tabs__cached')[1].textContent
    ).toBe('Content two')
  })

  it('has to work with "Tabs.Content" as children Components', () => {
    render(
      <Tabs {...props} data={tablistData}>
        <Tabs.Content title="first title">first</Tabs.Content>
        <Tabs.Content title="second title" selected>
          second
        </Tabs.Content>
      </Tabs>
    )
    expect(
      document
        .querySelector('button.selected')
        .getAttribute('data-tab-key')
    ).toBe('second-title')
    expect(
      document
        .querySelectorAll('.dnb-tabs__button__snap button')[1]
        .getAttribute('data-tab-key')
    ).toBe('second-title')
    expect(
      document.querySelector('div.dnb-tabs__content').textContent
    ).toBe('second')
    expect(
      document.querySelector(
        'button[aria-selected=true] span.dnb-tabs__button__title'
      ).textContent
    ).toBe('second title')
  })

  it('has to work with "Tabs.Content" from outside', () => {
    let testKey = null
    let testTitle = null
    const LinkedContent = (props: { selected_key?: string }) => {
      return (
        <>
          <Tabs id="linked" data={tablistData} {...props} />
          <Tabs.Content id="linked">
            {({ key, title }) => {
              testKey = key
              testTitle = title

              return key
            }}
          </Tabs.Content>
        </>
      )
    }

    const { rerender } = render(<LinkedContent />)

    expect(
      document
        .querySelector('button.selected')
        .getAttribute('data-tab-key')
    ).toBe('first')
    expect(testKey).toBe('first')
    expect(testTitle).toBe('First')

    rerender(<LinkedContent selected_key="second" />)

    expect(
      document
        .querySelector('button.selected')
        .getAttribute('data-tab-key')
    ).toBe('second')
    expect(testKey).toBe('second')

    fireEvent.click(document.querySelectorAll('.dnb-tabs__button')[2])

    expect(
      document
        .querySelector('button.selected')
        .getAttribute('data-tab-key')
    ).toBe('third')
    expect(testKey).toBe('third')
  })

  it('has to work with "Tabs.Content" as a single children', () => {
    render(
      <Tabs {...props}>
        <Tabs.Content title="single title">
          <div>single</div>
        </Tabs.Content>
      </Tabs>
    )

    expect(
      document.querySelector('div.dnb-tabs__content__inner').textContent
    ).toBe('single')
    expect(
      document.querySelector('button span.dnb-tabs__button__title')
        .textContent
    ).toBe('single title')
  })

  it('has to work with a single element for data property', () => {
    render(
      <Tabs
        {...props}
        data={[
          { title: 'single title', key: 1, content: <div>single</div> },
        ]}
      />
    )

    expect(
      document.querySelector('div.dnb-tabs__content').textContent
    ).toBe('single')
    expect(
      document.querySelector('button span.dnb-tabs__button__title')
        .textContent
    ).toBe('single title')
  })

  it('should render in StrictMode', () => {
    render(
      <React.StrictMode>
        <Tabs
          {...props}
          data={[
            {
              title: 'First',
              key: 'first',
            },
            {
              title: 'Second',
              key: 'second',
            },
            {
              title: 'Third',
              key: 'third',
            },
            {
              title: 'Fourth',
              key: 'fourth',
            },
          ]}
        />
      </React.StrictMode>
    )

    expect(document.querySelector('.dnb-tabs')).toBeInTheDocument()
  })

  it('should use `key` data prop if defined', () => {
    render(
      <Tabs
        {...props}
        data={[
          {
            title: 'First',
            key: 'first_key',
          },
          {
            title: 'Second',
            key: 'second_key',
          },
          {
            title: 'Third',
            key: 'third_key',
          },
        ]}
      />
    )
    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-tabs__button')
    )

    expect(first).toHaveAttribute('data-tab-key', 'first_key')
    expect(second).toHaveAttribute('data-tab-key', 'second_key')
    expect(third).toHaveAttribute('data-tab-key', 'third_key')
  })
})

describe('Tabs scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-tabs-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})

describe('Tabs ARIA', () => {
  it('should validate with ARIA rules', async () => {
    const Comp = render(
      <Tabs
        {...props}
        data={tablistData}
        selected_key={startup_selected_key}
      >
        {contentWrapperData}
      </Tabs>
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
