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
import Component from '../Dropdown'

const snapshotProps = {
  ...fakeProps(require.resolve('../Dropdown'), {
    optional: true
  }),
  id: 'dropdown-id',
  status: 'status',
  status_state: 'error',
  direction: 'bottom',
  label_direction: 'horizontal',
  value: 2,
  action_menu: null,
  more_menu: null,
  icon_position: null,
  triangle_position: null,
  prevent_selection: null,
  align_dropdown: null,
  trigger_component: null,
  size: null,
  opened: true,
  skip_portal: true,
  no_animation: true
}

// use no_animation so we don't need to wait
const mockProps = {
  skip_portal: true
}
const props = {
  id: 'dropdown-id',
  value: 2,
  skip_portal: true,
  no_animation: true
}

const mockData = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    content: ['1234 56 78901', 'Brukskonto - Kari Nordmann']
  },
  {
    selected_value: 'Sparekonto - Ole Nordmann',
    content: ['1234 56 78902', 'Sparekonto - Ole Nordmann']
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    selected_key: 1,
    content: [
      '1134 56 78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: 'Oppussing - Ole Nordmann',
    selected_key: '0x',
    content: ['1534 96 48901', 'Oppussing - Ole Nordmann']
  },
  {
    content: <>Custom content {'123'}</>
  },
  <>Custom content {'123'}</>,
  [<React.Fragment key="key1">Custom content {'123'}</React.Fragment>],
  '0y'
]

describe('Dropdown component', () => {
  const Comp = mount(<Component {...props} data={mockData} />)

  it('has correct value on keydown "ArrowDown" and "Enter"', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    let elem

    expect(Comp.find('.dnb-dropdown__text__inner').text()).toBe(
      mockData[props.value].selected_value
    )

    keydown(Comp, 32) // space

    elem = Comp.find('.dnb-drawer-list__option').at(props.value)
    expect(
      elem.instance().classList.contains('dnb-drawer-list__option--focus')
    ).toBe(true)
    expect(
      elem
        .instance()
        .classList.contains('dnb-drawer-list__option--selected')
    ).toBe(true)

    keydown(Comp, 40) // down
    keydown(Comp, 13) // enter

    elem = Comp.find('.dnb-drawer-list__option').at(props.value + 1)
    expect(
      elem.instance().classList.contains('dnb-drawer-list__option--focus')
    ).toBe(true)
    expect(
      elem
        .instance()
        .classList.contains('dnb-drawer-list__option--selected')
    ).toBe(true)

    expect(Comp.find('.dnb-dropdown__text__inner').text()).toBe(
      mockData[props.value + 1].selected_value
    )
  })

  it('has correct value on key search', () => {
    const Comp = mount(<Component {...props} data={mockData} />)

    keydown(Comp, 32) // space

    expect(Comp.exists('.dnb-drawer-list__option--focus')).toBe(true)

    keydown(Comp, 83) // S

    // force rerender
    Comp.update()

    expect(
      Comp.find('.dnb-drawer-list__option')
        .at(1)
        .hasClass('dnb-drawer-list__option--focus')
    ).toBe(true)

    keydown(Comp, 70) // F

    // force rerender
    Comp.update()

    expect(
      Comp.find('.dnb-drawer-list__option')
        .at(2)
        .hasClass('dnb-drawer-list__option--focus')
    ).toBe(true)
  })

  it('has valid on_select callback', () => {
    const on_select = jest.fn()

    const Comp = mount(
      <Component {...props} data={mockData} on_select={on_select} />
    )

    // then simulate changes
    keydown(Comp, 32) // space
    keydown(Comp, 40) // down

    expect(Comp.find('.dnb-drawer-list__option--selected').length).toBe(1)

    const notChangedItem = mockData[props.value + 1]
    expect(on_select.mock.calls[0][0].data).toStrictEqual(notChangedItem)

    keydown(Comp, 40) // down

    const selectedItem = mockData[props.value + 2]
    expect(on_select.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
  })

  it('has no selected items on using prevent_selection', () => {
    let selectedItem
    const on_change = jest.fn()
    const title = 'custom title'

    const Comp = mount(
      <Component
        {...props}
        value={null}
        data={mockData}
        title={title}
        on_change={on_change}
        prevent_selection
      />
    )

    // open first
    open(Comp)

    expect(Comp.exists('.dnb-drawer-list__option--selected')).toBe(false)

    // then simulate changes
    keydown(Comp, 40) // down
    keydown(Comp, 40) // down
    keydown(Comp, 32) // space

    expect(Comp.exists('.dnb-drawer-list__option--selected')).toBe(false)

    Comp.setProps({
      prevent_selection: false
    })

    // open again
    open(Comp)
    keydown(Comp, 40) // down
    keydown(Comp, 40) // down
    keydown(Comp, 32) // space

    expect(Comp.exists('.dnb-drawer-list__option--selected')).toBe(true)

    Comp.setProps({
      action_menu: true
    })

    // open again
    open(Comp)
    keydown(Comp, 40) // down
    keydown(Comp, 40) // down
    keydown(Comp, 32) // space

    expect(Comp.exists('.dnb-drawer-list__option--selected')).toBe(false)

    Comp.setProps({
      action_menu: false,
      prevent_selection: true
    })

    expect(
      Comp.find('.dnb-icon').instance().getAttribute('aria-label')
    ).toBe('chevron down icon')

    const event = on_change.mock.calls[0][0]
    selectedItem = mockData[event.value]
    expect(event.value).toBe(1)
    expect(event.selected_item).toBe(1)
    expect(event.active_item).toBe(undefined)
    expect(event.data).toStrictEqual(selectedItem)

    expect(Comp.find('.dnb-dropdown__text').text()).toBe(title)
    expect(Comp.exists('.dnb-dropdown--is-popup')).toBe(false)

    Comp.setProps({
      title: null
    })

    expect(Comp.exists('.dnb-dropdown__text')).toBe(false)
    expect(Comp.exists('.dnb-dropdown--is-popup')).toBe(true)
  })

  it('has correct selected value', () => {
    let value
    let Comp

    // Uses Index
    value = 2
    Comp = mount(<Component value={value} data={mockData} />)
    expect(Comp.find('.dnb-dropdown__text').text()).toBe(
      mockData[value].selected_value
    )

    // Uses Index
    value = '0'
    Comp = mount(<Component value={value} data={mockData} />)
    expect(Comp.find('.dnb-dropdown__text').text()).toBe(
      mockData[parseFloat(value)].selected_value
    )

    // Uses findIndex
    value = '0x'
    Comp = mount(<Component value={value} data={mockData} />)
    expect(Comp.find('.dnb-dropdown__text').text()).toBe(
      mockData.find(({ selected_key }) => selected_key === value)
        .selected_value
    )

    // Uses findIndex
    value = '0y'
    Comp = mount(<Component value={value} data={mockData} />)
    expect(Comp.find('.dnb-dropdown__text').text()).toBe(
      mockData.find((x) => x === value)
    )
  })

  it('has no selected items on using more_menu', () => {
    const title = 'custom title'
    const Comp = mount(
      <Component
        {...props}
        value={null}
        data={mockData}
        title={title}
        more_menu
      />
    )

    // open first
    open(Comp)

    // then simulate changes
    keydown(Comp, 40) // down
    keydown(Comp, 40) // down
    keydown(Comp, 32) // space

    // open first
    open(Comp)

    expect(Comp.exists('.dnb-drawer-list__option--selected')).toBe(false)

    expect(
      Comp.find('.dnb-icon').instance().getAttribute('aria-label')
    ).toBe('more icon')

    expect(Comp.exists('.dnb-dropdown__text')).toBe(false)
    expect(Comp.exists('.dnb-dropdown--is-popup')).toBe(true)
  })

  it('has valid on_change callback', () => {
    let selectedItem
    const on_change = jest.fn()
    const on_select = jest.fn()

    const Comp = mount(
      <Component
        {...props}
        data={mockData}
        on_change={on_change}
        on_select={on_select}
      />
    )
    // open first
    open(Comp)

    // then simulate changes
    keydown(Comp, 40) // down

    selectedItem = mockData[props.value + 1]
    expect(on_select.mock.calls[0][0].data).toStrictEqual(selectedItem)

    keydown(Comp, 32) // space

    selectedItem = mockData[props.value + 1]
    expect(on_change.mock.calls[0][0].data).toStrictEqual(selectedItem)
    expect(on_select.mock.calls[1][0].data).toStrictEqual(selectedItem)
    expect(on_change).toHaveBeenCalledWith({
      attributes: {},
      isTrusted: false,
      data: selectedItem,
      event: new KeyboardEvent('keydown', {}),
      selected_item: props.value + 1,
      value: props.value + 1
    })

    // then simulate changes
    keydown(Comp, 40) // down
    keydown(Comp, 13) // enter

    selectedItem = mockData[props.value + 2]
    expect(on_change.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
    expect(on_select.mock.calls[3][0].data).toStrictEqual(selectedItem) // second call!
  })

  it('has valid on_change callback if object was given', () => {
    // const selectedItem = 'nb-NO'
    const on_change = jest.fn()

    const Comp = mount(
      <Component
        {...props}
        data={{ 'en-GB': 'English', 'nb-NO': 'Norsk' }}
        on_change={on_change}
      />
    )

    open(Comp)
    keydown(Comp, 40) // down
    keydown(Comp, 32) // space

    expect(on_change).toHaveBeenCalledWith({
      attributes: {},
      isTrusted: false,
      data: {
        __id: 0,
        content: 'English',
        selected_key: 'en-GB',
        type: 'object',
        value: 'en-GB'
      },
      event: new KeyboardEvent('keydown', {}),
      selected_item: 0,
      value: 'en-GB'
    })

    open(Comp)
    keydown(Comp, 40) // down
    keydown(Comp, 40) // down
    keydown(Comp, 32) // space

    expect(on_change).toHaveBeenLastCalledWith({
      attributes: {},
      isTrusted: false,
      data: {
        content: 'Norsk',
        selected_key: 'nb-NO',
        type: 'object',
        value: 'nb-NO'
      },
      event: new KeyboardEvent('keydown', {}),
      selected_item: 1,
      value: 'nb-NO'
    })
  })

  it('has correct "aria-expanded"', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    open(Comp)

    const elem = Comp.find('span.dnb-dropdown')
    expect(
      elem
        .find('button.dnb-dropdown__trigger')
        .instance()
        .getAttribute('aria-expanded')
    ).toBe('true')

    expect(elem.instance().getAttribute('class')).toContain(
      'dnb-dropdown--opened'
    )
  })

  it('has correct length of li elements', () => {
    open(Comp)

    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(
      mockData.length
    )
  })

  it('has to return all additional attributes the event return', () => {
    const on_show = jest.fn()
    const on_hide = jest.fn()
    const params = { 'data-attr': 'value' }
    const Comp = mount(
      <Component
        no_animation
        on_show={on_show}
        on_hide={on_hide}
        {...params}
        data={mockData}
      />
    )

    open(Comp)

    expect(on_show.mock.calls.length).toBe(1)
    expect(on_show.mock.calls[0][0].attributes).toMatchObject(params)
    expect(on_show).toHaveBeenCalledWith({
      attributes: params,
      data: null,
      ulElement: null
    })

    // close
    keydown(Comp, 27) // esc

    expect(on_hide.mock.calls.length).toBe(1)
    expect(on_hide.mock.calls[0][0].attributes).toMatchObject(params)
    expect(on_hide).toHaveBeenCalledWith({
      isTrusted: false,
      attributes: params,
      data: null,
      event: new KeyboardEvent('keydown', {})
    })
  })

  it('has to set correct focus during open and close', async () => {
    const on_show = jest.fn()
    const on_hide = jest.fn()
    const on_show_focus = jest.fn()
    const on_hide_focus = jest.fn()

    const Comp = mount(
      <Component
        no_animation
        on_show={on_show}
        on_hide={on_hide}
        on_show_focus={on_show_focus}
        on_hide_focus={on_hide_focus}
        data={mockData}
      />
    )

    // 1. open the dropdown
    open(Comp)

    expect(on_show).toBeCalledTimes(1)
    expect(on_show).toHaveBeenCalledWith({
      attributes: {},
      data: null,
      ulElement: null
    })

    await wait(50) // ensure that we have this._refUl.current – the check is in "assignObservers"

    expect(on_show_focus).toBeCalledTimes(1)
    expect(on_show_focus.mock.calls[0][0].element).toBe(
      document.activeElement
    )

    // 2. close the dropdown with tab
    keydown(Comp, 9) // tab – because JSDOM does not support keyboard handling, so we can not check document.activeElement

    // delay because we want to wait to have the DOM focus to be called
    await wait(5)

    expect(on_hide).toBeCalledTimes(1)
    expect(on_hide).toHaveBeenCalledWith({
      attributes: {},
      isTrusted: false,
      event: new KeyboardEvent('keydown', {}),
      data: null
    })
    expect(on_hide_focus).toBeCalledTimes(1)
    expect(on_hide_focus.mock.calls[0][0].element).toBe(
      Comp.find('.dnb-button').instance()
    )
  })

  it('will prevent close if false gets returned from on_hide event', () => {
    let preventClose = false
    const on_hide = jest.fn(() => !preventClose)
    const Comp = mount(
      <Component no_animation on_hide={on_hide} data={mockData} />
    )

    // first open
    open(Comp)

    expect(
      Comp.find('.dnb-dropdown').hasClass('dnb-dropdown--opened')
    ).toBe(true)

    // close
    keydown(Comp, 27) // esc
    expect(on_hide.mock.calls.length).toBe(1)

    expect(
      Comp.find('.dnb-dropdown').hasClass('dnb-dropdown--opened')
    ).toBe(false)

    // reopen
    open(Comp)

    expect(
      Comp.find('.dnb-dropdown').hasClass('dnb-dropdown--opened')
    ).toBe(true)

    preventClose = true

    // close again, but with false returned
    keydown(Comp, 27) // esc

    expect(on_hide.mock.calls.length).toBe(3)

    // we are still open
    expect(
      Comp.find('.dnb-dropdown').hasClass('dnb-dropdown--opened')
    ).toBe(true)
  })

  it('will change the selected value when StrictMode is enabled', () => {
    const Comp = mount(
      <React.StrictMode>
        <Component no_animation data={mockData} value={props.value} />
      </React.StrictMode>
    )

    // first open
    open(Comp)

    // then simulate changes
    keydown(Comp, 40) // down
    keydown(Comp, 13) // enter

    expect(Comp.find('.dnb-dropdown__text__inner').text()).toBe(
      mockData[props.value + 1].selected_value
    )
  })

  it('has correct selected value', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    expect(Comp.find('.dnb-dropdown__text__inner').text()).toBe(
      mockData[props.value].selected_value
    )
  })

  it('has correct selected value after new selection', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    open(Comp)

    // const elem = Comp.find('li.dnb-drawer-list__option')
    //   .find('.dnb-drawer-list__option__inner')
    //   .at(props.value)
    //   .simulate('mousedown')

    // then simulate changes
    keydown(Comp, 40) // down

    expect(Comp.find('.dnb-dropdown__text__inner').text()).toBe(
      mockData[props.value].selected_value
    )
  })

  it('has a default title if no value is given', () => {
    const title = 'Make a selection'
    const Comp = mount(
      <Component data={mockData} title={title} {...mockProps} />
    )
    expect(
      Comp.find('.dnb-dropdown__text__inner').instance().innerHTML
    ).toBe(title)
  })

  it('has a corret value content if we send in a React component', () => {
    const aStringOf = 'Custom content 123'
    const Comp1 = mount(
      <Component data={mockData} value={4} {...mockProps} />
    )
    const Comp2 = mount(
      <Component data={mockData} value={5} {...mockProps} />
    )
    const Comp3 = mount(
      <Component data={mockData} value={6} {...mockProps} />
    )
    expect(
      Comp1.find('.dnb-dropdown__text__inner').instance().innerHTML
    ).toBe(aStringOf)
    expect(
      Comp2.find('.dnb-dropdown__text__inner').instance().innerHTML
    ).toBe(aStringOf)
    expect(
      Comp3.find('.dnb-dropdown__text__inner').instance().innerHTML
    ).toBe(aStringOf)
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const Comp = mount(<Component data={mockData} {...mockProps} />)
    Comp.setProps({
      disabled: true
    })
    expect(
      Comp.find('button.dnb-dropdown__trigger')
        .instance()
        .hasAttribute('disabled')
    ).toBe(true)
  })
})

describe('Dropdown markup', () => {
  const CheckComponent = mount(
    <Component {...snapshotProps} data={mockData} />
  )

  // compare the snapshot
  it('have to match snapshot', () => {
    expect(toJson(CheckComponent)).toMatchSnapshot()
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(CheckComponent)).toHaveNoViolations()
  })
})

describe('Dropdown scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-dropdown.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-dropdown-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})

const keydown = (Comp, keyCode) => {
  document.dispatchEvent(new KeyboardEvent('keydown', { keyCode }))

  Comp.find('button.dnb-dropdown__trigger').simulate('keydown', {
    keyCode
  })
}
const open = (Comp) => {
  Comp.find('button.dnb-dropdown__trigger').simulate('mousedown')
}
const wait = (t) => new Promise((r) => setTimeout(r, t))
