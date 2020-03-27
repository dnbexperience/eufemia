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
  mode: 'sync',
  label: 'Autocomplete Label:',
  status: 'status',
  status_state: 'error',
  direction: 'bottom',
  label_direction: 'horizontal',
  value: 2,
  prevent_selection: null,
  align_autocomplete: null,
  input_component: null,
  size: null,
  opened: true,
  show_drawer_button: true,
  no_animation: true
}

// use no_animation so we don't need to wait
const props = {
  id: 'autocomplete-id',
  mode: 'sync',
  value: 1,
  show_drawer_button: true,
  no_animation: true
}

const mockData = ['AA cc', 'BB cc zethx', 'CC cc']

describe('Autocomplete component', () => {
  const Comp = mount(<Component {...props} data={mockData} />)

  it('has correct options after filter', () => {
    const Comp = mount(
      <Component id="autocomplete-id" data={mockData} show_drawer_button />
    )

    // open
    open(Comp)

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
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[1]
    )
    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(3)

    // check "aa cc"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa cc' }
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[0]
    )

    // check inside words
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'bb cc th x' }
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[1]
    )
    expect(Comp.find('li.dnb-drawer-list__option').at(0).html()).toBe(
      /* @html */ `<li class="dnb-drawer-list__option" role="option" aria-selected="false" tabindex="-1" id="option-autocomplete-id-1" data-item="1"><span class="dnb-drawer-list__option__inner"><span><span class="dnb-drawer-list__option__item--highlight">BB</span> <span class="dnb-drawer-list__option__item--highlight">cc</span> ze<span class="dnb-drawer-list__option__item--highlight">th</span><span class="dnb-drawer-list__option__item--highlight">x</span></span></span></li>`
    )
    expect(
      Comp.find(
        'li.dnb-drawer-list__option.dnb-drawer-list__option--focus'
      )
        .at(0)
        .html()
    ).toBe(
      /* @html */ `<li class="dnb-drawer-list__option dnb-drawer-list__option--focus" role="option" aria-selected="false" tabindex="-1" id="option-autocomplete-id-0" data-item="0"><span class="dnb-drawer-list__option__inner"><span>AA <span class="dnb-drawer-list__option__item--highlight">cc</span></span></span></li>`
    )

    // check "invalid"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'invalid' }
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      'Ingen alternativer'
    )
  })

  it('has correct "aria-expanded"', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    open(Comp)

    const elem = Comp.find('span.dnb-autocomplete')
    expect(
      elem.find('button').instance().getAttribute('aria-expanded')
    ).toBe('true')

    expect(elem.instance().getAttribute('class')).toContain(
      'dnb-autocomplete--opened'
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
        show_drawer_button
      />
    )
    open(Comp)
    expect(on_show.mock.calls.length).toBe(1)
    expect(on_show.mock.calls[0][0].attributes).toMatchObject(params)
  })

  it('has correct selected value', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[props.value]
    )
  })

  it('has correct selected value after new selection', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    open(Comp)

    // then simulate changes
    keydown(Comp, 40) // down

    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[props.value]
    )
  })

  it('has a default title if no value is given', () => {
    const title = 'Make a selection'
    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={mockData}
        title={title}
        show_drawer_button
      />
    )
    expect(Comp.find('.dnb-input__placeholder').text()).toBe(title)
  })

  it('has a corret value content if we send in a React component', () => {
    const value = 1
    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={mockData}
        value={value}
        show_drawer_button
      />
    )
    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[value]
    )
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const Comp = mount(
      <Component id="autocomplete-id" data={mockData} show_drawer_button />
    )
    Comp.setProps({
      disabled: true
    })
    expect(
      Comp.find('button.dnb-input__submit-button__button')
        .instance()
        .hasAttribute('disabled')
    ).toBe(true)
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

const keydown = (Comp, keyCode) => {
  document.dispatchEvent(new KeyboardEvent('keydown', { keyCode }))

  Comp.find('button').simulate('keydown', {
    keyCode
  })
}
const open = (Comp) => {
  Comp.find('button.dnb-input__submit-button__button').simulate('click')
}
