/**
 * Component Test
 *
 */

import React, { Fragment } from 'react'
import {
  mount,
  fakeProps,
  axeComponent,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Dropdown'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _dropdown from '../style/_dropdown.scss' // eslint-disable-line
import dnb_dropdown from '../style/dnb-dropdown.scss' // eslint-disable-line
import dnb_dropdown_theme_ui from '../style/themes/dnb-dropdown-theme-ui.scss' // eslint-disable-line

const props = fakeProps(require.resolve('../Dropdown'), {
  optional: true
})
props.id = 'dropdown-id'
props.status = 'status'
props.status_state = 'error'
props.direction = 'bottom'
props.label_direction = 'horizontal'
props.selected_item = 2

const mockData = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    content: ['1234.56.78901', 'Brukskonto - Kari Nordmann']
  },
  {
    selected_value: 'Sparekonto - Ole Nordmann',
    content: ['1234.56.78902', 'Sparekonto - Ole Nordmann']
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    content: [
      '1134.56.78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: 'Oppussing - Ole Nordmann',
    content: ['1534.96.48901', 'Oppussing - Ole Nordmann']
  },
  {
    content: <Fragment>Custom content {'123'}</Fragment>
  },
  <Fragment key="key1">Custom content {'123'}</Fragment>,
  [<Fragment key="key2">Custom content {'123'}</Fragment>]
]

describe('Dropdown component', () => {
  const Comp = mount(<Component {...props} data={mockData} />)

  // compare the snapshot
  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has correct state at startup', () => {
    expect(Comp.state().opened).toBe(false)
    expect(Comp.state().hidden).toBe(true)
  })

  it('has correct state after "mousedown" trigger', () => {
    Comp.find('button').simulate('mousedown')
    expect(Comp.state().opened).toBe(true)
    expect(Comp.state().hidden).toBe(false)
  })

  it('has correct selected_item on keydown "ArrowDown" and "Enter"', () => {
    expect(Comp.state().selected_item).toBe(props.selected_item)
    Comp.find('button').simulate('mousedown')
    expect(Comp.state().active_item).toBe(props.selected_item)
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 }))
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 }))
    // Comp.find('button').simulate('keyDown', {
    //   key: 'ArrowDown',
    //   keyCode: 40
    // })
    // Comp.find('button').simulate('keyDown', {
    //   key: 'Enter',
    //   keyCode: 13
    // })
    expect(Comp.state().active_item).toBe(props.selected_item + 1)
    expect(Comp.state().selected_item).toBe(props.selected_item + 1)
  })

  it('has correct selected_item on key search', () => {
    Comp.find('button').simulate('mousedown')
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 66 })) // B
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 70 })) // F
    // Comp.find('button').simulate('keyDown', {
    //   key: 'B',
    //   keyCode: 66
    // })
    // expect(Comp.state().active_item).toBe(0)
    // Comp.find('button').simulate('keyDown', {
    //   key: 'F',
    //   keyCode: 70
    // })
    expect(Comp.state().active_item).toBe(2)
  })

  it('has valid on_select callback', () => {
    const on_select = jest.fn()
    const on_change = jest.fn()

    const Comp = mount(
      <Component
        {...props}
        data={mockData}
        on_select={on_select}
        on_change={on_change}
      />
    )

    // open first
    Comp.find('button').simulate('keydown', { key: 'Enter', keyCode: 13 })

    // then simulate changes
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 32 })) // space
    const notChangedItem = mockData[props.selected_item]
    expect(on_change.mock.calls[0][0].data).toBe(notChangedItem)

    // open again
    Comp.find('button').simulate('mousedown')

    // then simulate changes
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })) // down
    const selectedItem = mockData[props.selected_item + 1]
    expect(on_select.mock.calls[1][0].data).toBe(selectedItem) // second call!
  })

  it('has valid on_change callback', () => {
    const on_change = jest.fn()
    const Comp = mount(
      <Component {...props} data={mockData} on_change={on_change} />
    )

    // open first
    Comp.find('button').simulate('keydown', { key: 'Space', keyCode: 32 })

    // then simulate changes
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })) // down
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 })) // enter

    const selectedItem = mockData[props.selected_item + 1]
    expect(on_change.mock.calls[0][0].data).toBe(selectedItem)
  })

  it('has correct state after "esc" key', () => {
    // document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    Comp.find('button').simulate('keyDown', {
      key: 'esc',
      keyCode: 27
    })
    expect(Comp.state().opened).toBe(false)
  })

  it('has correct "aria-expanded"', () => {
    Comp.find('button').simulate('mousedown')
    const elem = Comp.find('span.dnb-dropdown')
    expect(
      elem
        .find('button')
        .instance()
        .getAttribute('aria-expanded')
    ).toBe('true')

    expect(elem.instance().getAttribute('class')).toContain(
      'dnb-dropdown--opened'
    )

    expect(elem.hasClass('dnb-dropdown--closed')).toBe(false)
  })

  it('has correct length of li elements', () => {
    Comp.setState({
      opened: true
    })
    expect(Comp.find('li.dnb-dropdown__option').length).toBe(
      mockData.length
    )
  })

  it('has correct selected value', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    expect(Comp.find('.dnb-dropdown__text__inner').text()).toBe(
      mockData[props.selected_item].selected_value
    )
  })

  it('has correct selected value after new selection', () => {
    Comp.find('button').simulate('mousedown')
    Comp.find('li.dnb-dropdown__option')
      .find('.dnb-dropdown__option__inner')
      .at(props.selected_item)
      .simulate('mousedown')
    expect(Comp.find('.dnb-dropdown__text__inner').text()).toBe(
      mockData[props.selected_item].selected_value
    )
  })

  it('has a default title if no selected_item is given', () => {
    const title = 'Make a selection'
    const Comp = mount(<Component data={mockData} title={title} />)
    expect(
      Comp.find('.dnb-dropdown__text__inner').instance().innerHTML
    ).toBe(title)
  })

  it('has a corret selected_item content if we send in a React component', () => {
    const aStringOf = 'Custom content 123'
    const Comp1 = mount(<Component data={mockData} selected_item={4} />)
    const Comp2 = mount(<Component data={mockData} selected_item={5} />)
    const Comp3 = mount(<Component data={mockData} selected_item={6} />)
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
    const Comp = mount(<Component data={mockData} />)
    Comp.setProps({
      disabled: true
    })
    expect(
      Comp.find('button.dnb-dropdown__trigger')
        .instance()
        .hasAttribute('disabled')
    ).toBe(true)
  })

  it('should validate with ARIA rules as a tabs', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
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
