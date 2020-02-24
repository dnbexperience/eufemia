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
import Component from '../Autocomplete'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _autocomplete from '../style/_autocomplete.scss' // eslint-disable-line
import dnb_autocomplete from '../style/dnb-autocomplete.scss' // eslint-disable-line
import dnb_autocomplete_theme_ui from '../style/themes/dnb-autocomplete-theme-ui.scss' // eslint-disable-line

const snapshotProps = {
  ...fakeProps(require.resolve('../Autocomplete'), {
    optional: true
  }),
  id: 'autocomplete-id',
  status: 'status',
  status_state: 'error',
  direction: 'bottom',
  label_direction: 'horizontal',
  value: 2,
  prevent_selection: null,
  align_autocomplete: null,
  trigger_component: null,
  size: null,
  opened: true,
  no_animation: true
}

// use no_animation so we don't need to wait
const props = {
  id: 'autocomplete-id',
  value: 1,
  no_animation: true
}

const mockData = ['AA cc', 'BB cc', 'CC cc']

describe('Autocomplete component', () => {
  const Comp = mount(<Component {...props} data={mockData} />)

  it('has correct state at startup', () => {
    expect(Comp.state().opened).toBe(false)
    expect(Comp.state().hidden).toBe(undefined)
  })

  it('has correct state after "mousedown" trigger', async () => {
    await open(Comp)
    expect(Comp.state().opened).toBe(true)
    expect(Comp.state().hidden).toBe(false)
  })

  it('has correct value on keydown "ArrowDown" and "Enter"', async () => {
    const Comp = mount(<Component {...props} data={mockData} />)

    expect(Comp.state().selected_item).toBe(props.value)

    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[props.value]
    )

    await open(Comp)
    expect(Comp.state().opened).toBe(true)

    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 })) // enter
    expect(Comp.state().opened).toBe(false)

    expect(Comp.state().active_item).toBe(props.value)
    expect(Comp.state().selected_item).toBe(props.value)

    await open(Comp)
    expect(Comp.state().opened).toBe(true)

    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })) // down
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 })) // enter

    expect(Comp.state().active_item).toBe(props.value + 1)
    expect(Comp.state().selected_item).toBe(props.value + 1)

    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[props.value + 1]
    )
  })

  it('has correct value after forcing rerender', async () => {
    const title = 'Make a selection'
    const Comp = mount(
      <Component data={mockData} default_value={props.value} />
    )

    expect(Comp.state().selected_item).toBe(props.value)

    // open
    await open(Comp)

    // make first selection
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })) // down
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 })) // enter

    expect(Comp.state().selected_item).toBe(props.value + 1)

    // force rerender by prop change
    Comp.setProps({
      title
    })

    expect(Comp.state().selected_item).toBe(props.value + 1)
    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[props.value + 1]
    )

    const value = null
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value }
    })

    expect(Comp.state().selected_item).toBe(undefined)
    expect(Comp.find('span.dnb-input__placeholder').text()).toBe(title)
    expect(Comp.find('.dnb-input__input').instance().value).toBe('')
  })

  it('has correct options after filter', async () => {
    const Comp = mount(<Component data={mockData} />)

    // open
    await open(Comp)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa' }
    })
    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(1)
    expect(Comp.find('li.dnb-drawer-list__option').text()).toBe(
      mockData[0]
    )

    // check "cc"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'cc' }
    })
    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(3)

    // check "bb cc"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'bb cc' }
    })
    expect(
      Comp.find('li.dnb-drawer-list__option')
        .at(0)
        .text()
    ).toBe(mockData[1])
    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(3)

    // check "aa cc"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa cc' }
    })
    expect(
      Comp.find('li.dnb-drawer-list__option')
        .at(0)
        .text()
    ).toBe(mockData[0])

    // check "invalid"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'invalid' }
    })
    expect(
      Comp.find('li.dnb-drawer-list__option')
        .at(0)
        .text()
    ).toBe('Ingen alternativer')
  })

  it('has correct value on key search', async () => {
    // is new in here!
    const Comp = mount(<Component {...props} data={mockData} />)
    await open(Comp)
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 66 })) // B
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 70 })) // F
    expect(Comp.state().active_item).toBe(1)
  })

  it('has valid on_select callback', async () => {
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
    await open(Comp)

    // then simulate changes
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 32 })) // space
    const notChangedItem = mockData[props.value]
    expect(on_change.mock.calls[0][0].data).toBe(notChangedItem)
    expect(on_select.mock.calls[0][0].data).toBe(notChangedItem)

    await wait(1) // until closed

    // open again
    await open(Comp)

    // then simulate changes
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })) // down
    const selectedItem = mockData[props.value + 1]
    expect(on_select.mock.calls[1][0].data).toBe(selectedItem) // second call!
  })

  it('has valid on_change callback', async () => {
    const on_change = jest.fn()
    const Comp = mount(
      <Component {...props} data={mockData} on_change={on_change} />
    )

    // open first
    await open(Comp)

    // then simulate changes
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })) // down
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 })) // enter

    const selectedItem = mockData[props.value + 1]
    expect(on_change.mock.calls[0][0].data).toBe(selectedItem)
  })

  it('has working direction observer', async () => {
    // open first
    await open(Comp)

    expect(Comp.props().direction).toBe('auto')
    expect(Comp.state().max_height).toBeGreaterThan(0)
  })

  it('has correct direction prop', async () => {
    const Comp = mount(
      <Component {...props} data={mockData} direction="top" />
    )

    // open first
    await open(Comp)

    expect(Comp.find('DrawerList').state().max_height).toBe(null)
  })

  it('has correct "aria-expanded"', async () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    await open(Comp)

    const elem = Comp.find('span.dnb-autocomplete')
    expect(
      elem
        .find('button')
        .instance()
        .getAttribute('aria-expanded')
    ).toBe('true')

    expect(elem.instance().getAttribute('class')).toContain(
      'dnb-autocomplete--opened'
    )

    expect(elem.hasClass('dnb-autocomplete--closed')).toBe(false)
  })

  it('has correct length of li elements', async () => {
    // is open already
    await open(Comp)

    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(
      mockData.length
    )
  })

  it('has to return all additional attributes the event return', async () => {
    const my_event = jest.fn()
    const params = { 'data-attr': 'value' }
    const Comp = mount(
      <Component
        {...props}
        on_show={my_event}
        {...params}
        data={mockData}
      />
    )
    await open(Comp)
    expect(my_event.mock.calls.length).toBe(1)
    expect(my_event.mock.calls[0][0].attributes).toMatchObject(params)
  })

  it('has correct selected value', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[props.value]
    )
  })

  it('has correct selected value after new selection', async () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    await open(Comp)

    // then simulate changes
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })) // down

    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[props.value]
    )
  })

  it('has a default title if no value is given', () => {
    const title = 'Make a selection'
    const Comp = mount(<Component data={mockData} title={title} />)
    expect(Comp.find('.dnb-input__placeholder').text()).toBe(title)
  })

  it('has a corret value content if we send in a React component', () => {
    const value = 1
    const Comp = mount(<Component data={mockData} value={value} />)
    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[value]
    )
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const Comp = mount(<Component data={mockData} />)
    Comp.setProps({
      disabled: true
    })
    expect(
      Comp.find('button.dnb-input__submit-button__button')
        .instance()
        .hasAttribute('disabled')
    ).toBe(true)
  })

  it('has correct state after "esc" key', () => {
    Comp.find('button').simulate('keyDown', {
      key: 'esc',
      keyCode: 27
    })
    expect(Comp.state().opened).toBe(false)
  })
})

describe('Autocomplete markup', () => {
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

describe('Autocomplete scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-autocomplete.scss')
    )
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-autocomplete-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})

const open = async Comp => {
  const elem = Comp.find('button.dnb-input__submit-button__button')
  await wait(1) // in case we close and reopen
  elem.simulate('click')
  await wait(1) // because we don't we have componentDidMount
}
const wait = t => new Promise(r => setTimeout(r, t))
