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
  icon_position: null,
  triangle_position: null,
  prevent_selection: null,
  align_autocomplete: null,
  input_component: null,
  size: null,
  opened: true,
  show_submit_button: true,
  no_animation: true,
  skip_portal: true
}

// use no_animation so we don't need to wait
const mockProps = {
  no_animation: true,
  skip_portal: true
}
const props = {
  id: 'autocomplete-id',
  mode: 'sync',
  value: 1,
  show_submit_button: true,
  no_animation: true,
  skip_portal: true
}

const mockData = ['AA c', 'BB cc zethx', { content: ['CC', 'cc'] }]

describe('Autocomplete component', () => {
  it('has correct word and in-word highlighting', () => {
    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={['aaa', 'The Godfather the godfather The Godfather', 'ccc']}
        opened
        no_animation
        input_value="the g th"
        {...mockProps}
      />
    )
    expect(Comp.find('li.dnb-drawer-list__option').at(0).html()).toBe(
      /* @html */ `<li class="first-of-type dnb-drawer-list__option" role="option" tabindex="-1" aria-selected="false" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span><span class="dnb-drawer-list__option__item--highlight">Th</span>e <span class="dnb-drawer-list__option__item--highlight">G</span>odfa<span class="dnb-drawer-list__option__item--highlight">th</span>er <span class="dnb-drawer-list__option__item--highlight">th</span>e <span class="dnb-drawer-list__option__item--highlight">g</span>odfa<span class="dnb-drawer-list__option__item--highlight">th</span>er <span class="dnb-drawer-list__option__item--highlight">Th</span>e <span class="dnb-drawer-list__option__item--highlight">G</span>odfa<span class="dnb-drawer-list__option__item--highlight">th</span>er</span></span></li>`
    )
  })

  it('has correct options after filter', () => {
    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={mockData}
        show_submit_button
        {...mockProps}
      />
    )

    open(Comp)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa' }
    })
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(1)
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).text()
    ).toBe(mockData[0])

    // check "cc"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'cc' }
    })
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(2)

    // check "bb cc"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'bb cc' }
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[1]
    )
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(2)

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
      /* @html */ `<li class="first-of-type dnb-drawer-list__option" role="option" tabindex="-1" aria-selected="false" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span><span class="dnb-drawer-list__option__item--highlight">BB</span> <span class="dnb-drawer-list__option__item--highlight">cc</span> ze<span class="dnb-drawer-list__option__item--highlight">thx</span></span></span></li>`
    )

    // check "invalid"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'invalid' }
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      'Ingen alternativer'
    )
  })

  it('has correct options after filter and key interaction', () => {
    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={mockData}
        show_submit_button
        {...mockProps}
      />
    )

    open(Comp)

    // check "cc"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'cc' }
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[1]
    )
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(2)
    expect(Comp.find('li.dnb-drawer-list__option--focus').exists()).toBe(
      false
    )

    // then simulate changes
    keydown(Comp, 40) // down

    expect(
      Comp.find('li.dnb-drawer-list__option')
        .at(0)
        .hasClass('dnb-drawer-list__option--focus')
    ).toBe(true)

    // then simulate changes
    keydown(Comp, 40) // down

    expect(
      Comp.find('li.dnb-drawer-list__option')
        .at(1)
        .hasClass('dnb-drawer-list__option--focus')
    ).toBe(true)
    expect(
      Comp.find('li.dnb-drawer-list__option')
        .at(1)
        .instance()
        .getAttribute('id')
    ).toBe(
      Comp.find('.dnb-input__input')
        .instance()
        .getAttribute('aria-activedescendant')
    )

    // check "cc b"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'cc bb' }
    })
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(2)
    expect(Comp.find('li.dnb-autocomplete__show-all').text()).toBe(
      'Vis alt'
    )
    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(3)

    let elem
    elem = Comp.find('li.dnb-drawer-list__option').at(1)
    expect(elem.text()).toBe(mockData[2].content.join(''))
    expect(elem.instance().getAttribute('aria-selected')).toBe('true')

    // remove selection and reset the order and open again
    // aria-selected should now be on place 2
    keydown(Comp, 27) // esc
    open(Comp)

    elem = Comp.find('li.dnb-drawer-list__option').at(2)
    expect(elem.text()).toBe(mockData[2].content.join(''))
    expect(elem.instance().getAttribute('aria-selected')).toBe('true')
  })

  it('has correct options after filter if filter is disabled', () => {
    const Comp = mount(
      <Component
        id="autocomplete-id"
        disable_filter
        data={mockData}
        show_submit_button
        {...mockProps}
      />
    )

    open(Comp)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa' }
    })
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(3)
  })

  it('has correct "aria-expanded"', () => {
    const Comp = mount(<Component {...props} data={mockData} />)

    keydown(Comp, 13) // enter

    const elem = Comp.find('.dnb-autocomplete')
    expect(
      elem.find('button').instance().getAttribute('aria-expanded')
    ).toBe('true')
  })

  it('has correct "opened" state on click in input', () => {
    const Comp = mount(<Component data={mockData} {...mockProps} />)

    Comp.find('.dnb-input__input').simulate('mousedown')

    const elem = Comp.find('.dnb-autocomplete')
    expect(elem.hasClass('dnb-autocomplete--opened')).toBe(true)

    expect(
      elem.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(3)
  })

  it('has correct "opened" state', () => {
    const Comp = mount(<Component {...props} data={mockData} />)

    open(Comp)

    const elem = Comp.find('.dnb-autocomplete')

    expect(elem.hasClass('dnb-autocomplete--opened')).toBe(true)
  })

  it('has correct length of li elements', () => {
    const Comp = mount(<Component {...props} data={mockData} />)

    open(Comp)

    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(mockData.length)
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
        show_submit_button
        {...mockProps}
      />
    )
    open(Comp)
    expect(on_show.mock.calls.length).toBe(1)
    expect(on_show.mock.calls[0][0].attributes).toMatchObject(params)
  })

  it('has no highlighted value by using "disable_highlighting"', () => {
    const Comp = mount(
      <Component
        mode="async"
        disable_highlighting
        data={mockData}
        show_submit_button
        {...mockProps}
      />
    )

    open(Comp)

    const result = Comp.find('li.dnb-drawer-list__option')
      .at(0)
      .find('.dnb-drawer-list__option__inner')
      .html()

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa' }
    })

    expect(
      Comp.find('li.dnb-drawer-list__option')
        .at(0)
        .find('.dnb-drawer-list__option__inner')
        .html()
    ).toBe(result)
  })

  it('and new data has to replace all data properly in sync mode', () => {
    const replaceData = ['aaa']

    const Comp = mount(<Component data={mockData} {...mockProps} />)

    keydown(Comp, 40) // down

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa' }
    })

    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(2)

    // update data
    Comp.setProps({
      data: replaceData
    })

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'a' }
    })

    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(1)
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      'aaa'
    )
  })

  it('and updateData has to replace all data properly in asyc mode', () => {
    const on_type = jest.fn()
    const replaceData = ['aaa']

    const Comp = mount(
      <Component
        mode="async"
        disable_filter
        on_type={on_type}
        data={mockData}
        {...mockProps}
      />
    )

    keydown(Comp, 40) // down

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa' }
    })

    let callOne = on_type.mock.calls[0][0]
    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(3)
    expect(on_type.mock.calls.length).toBe(1)
    expect(callOne.dataList.length).toBe(3)

    // update data
    callOne.updateData(replaceData)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'a' }
    })

    const callTwo = on_type.mock.calls[1][0]
    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(1)
    expect(on_type.mock.calls.length).toBe(2)
    expect(callTwo.dataList.length).toBe(1)
    expect(callOne.dataList).not.toBe(callTwo.dataList)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'someting' }
    })

    const callThree = on_type.mock.calls[2][0]
    expect(callThree.dataList).toStrictEqual(callTwo.dataList)
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
        show_submit_button
        {...mockProps}
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
        show_submit_button
        {...mockProps}
      />
    )
    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[value]
    )
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={mockData}
        show_submit_button
        {...mockProps}
      />
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

  it('should validate with ARIA rules', async () => {
    expect(
      await axeComponent(CheckComponent, {
        rules: {
          'aria-valid-attr-value': { enabled: false }
        }
      })
    ).toHaveNoViolations()
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

  Comp.find('.dnb-input__input').simulate('keydown', {
    keyCode
  })
}
const open = (Comp) => {
  Comp.find('button.dnb-input__submit-button__button').simulate('click')
}
