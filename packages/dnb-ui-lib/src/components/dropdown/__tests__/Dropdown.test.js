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
    content: [
      '1134 56 78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: 'Oppussing - Ole Nordmann',
    content: ['1534 96 48901', 'Oppussing - Ole Nordmann']
  },
  {
    content: <>Custom content {'123'}</>
  },
  <>Custom content {'123'}</>,
  [<React.Fragment key="key1">Custom content {'123'}</React.Fragment>]
]

describe('Dropdown component', () => {
  const Comp = mount(<Component {...props} data={mockData} />)

  it('has correct value on keydown "ArrowDown" and "Enter"', async () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    let elem

    expect(Comp.find('.dnb-dropdown__text__inner').text()).toBe(
      mockData[props.value].selected_value
    )

    keydown(Comp, 32) // space

    elem = Comp.find('.dnb-drawer-list__option').at(props.value)
    expect(elem.hasClass('dnb-drawer-list__option--focus')).toBe(true)
    expect(elem.hasClass('dnb-drawer-list__option--selected')).toBe(true)

    keydown(Comp, 40) // down
    keydown(Comp, 13) // enter

    elem = Comp.find('.dnb-drawer-list__option').at(props.value + 1)
    expect(elem.hasClass('dnb-drawer-list__option--focus')).toBe(true)
    expect(elem.hasClass('dnb-drawer-list__option--selected')).toBe(true)

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

  it('has valid on_select callback', async () => {
    const on_select = jest.fn()

    const Comp = mount(
      <Component {...props} data={mockData} on_select={on_select} />
    )

    // then simulate changes
    keydown(Comp, 32) // space
    keydown(Comp, 40) // down

    const notChangedItem = mockData[props.value + 1]
    expect(on_select.mock.calls[0][0].data).toStrictEqual(notChangedItem)

    keydown(Comp, 40) // down

    const selectedItem = mockData[props.value + 2]
    expect(on_select.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
  })

  it('has no selected items on using prevent_selection', async () => {
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

    // then simulate changes
    keydown(Comp, 40) // down
    keydown(Comp, 40) // down
    keydown(Comp, 32) // space

    // open first
    open(Comp)

    expect(
      Comp.find('.dnb-drawer-list__option')
        .at(1)
        .hasClass('dnb-drawer-list__option--selected')
    ).toBe(false)

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

  it('has no selected items on using more_menu', async () => {
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

    expect(
      Comp.find('.dnb-drawer-list__option')
        .at(1)
        .hasClass('dnb-drawer-list__option--selected')
    ).toBe(false)

    expect(
      Comp.find('.dnb-icon').instance().getAttribute('aria-label')
    ).toBe('more icon')

    expect(Comp.exists('.dnb-dropdown__text')).toBe(false)
    expect(Comp.exists('.dnb-dropdown--is-popup')).toBe(true)
  })

  it('has valid on_change callback', async () => {
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

    // then simulate changes
    keydown(Comp, 40) // down
    keydown(Comp, 13) // enter

    selectedItem = mockData[props.value + 2]
    expect(on_change.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
    expect(on_select.mock.calls[3][0].data).toStrictEqual(selectedItem) // second call!
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
    const params = { 'data-attr': 'value' }
    const Comp = mount(
      <Component
        no_animation
        on_show={on_show}
        {...params}
        data={mockData}
      />
    )
    open(Comp)
    expect(on_show.mock.calls.length).toBe(1)
    expect(on_show.mock.calls[0][0].attributes).toMatchObject(params)
  })

  it('has to set correct focus after tab key usage in opened state', () => {
    const on_hide = jest.fn()

    const Comp = mount(
      <Component no_animation on_hide={on_hide} data={mockData} />
    )
    const focus_element = Comp.find('.dnb-button').instance()

    open(Comp)
    keydown(Comp, 9) // tab, JSDOM does not support keyboard handling, so we can not check document.activeElement

    // expect(on_hide.mock.calls.length).toBe(1)
    expect(on_hide).toBeCalledTimes(1)
    expect(on_hide).toHaveBeenCalledWith({
      attributes: {},
      data: null,
      focus_element
    })
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

  it('should validate with ARIA rules as a tabs', async () => {
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
// const wait = t => new Promise(r => setTimeout(r, t))
