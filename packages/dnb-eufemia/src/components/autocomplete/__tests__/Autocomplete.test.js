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
  loadScss,
} from '../../../core/jest/jestSetup'
import Component from '../Autocomplete'
import { SubmitButton } from '../../../components/input/Input'
import { format } from '../../../components/number-format/NumberUtils'

const snapshotProps = {
  ...fakeProps(require.resolve('../Autocomplete'), {
    optional: true,
  }),
  id: 'autocomplete-id',
  mode: 'sync',
  label: 'Autocomplete Label:',
  status: 'status',
  status_state: 'error',
  status_props: null,
  direction: 'bottom',
  label_direction: 'horizontal',
  value: 2,
  icon_position: null,
  triangle_position: null,
  prevent_selection: null,
  align_autocomplete: null,
  input_element: null,
  size: null,
  opened: true,
  show_submit_button: true,
  no_animation: true,
  input_ref: null,
  skip_portal: true,
}

// use no_animation so we don't need to wait
const mockProps = {
  no_animation: true,
  skip_portal: true,
}
const props = {
  id: 'autocomplete-id',
  mode: 'sync',
  value: 1,
  show_submit_button: true,
  no_animation: true,
  skip_portal: true,
}

const mockData = ['AA c', 'BB cc zethx', { content: ['CC', 'cc'] }]

describe('Autocomplete component', () => {
  it('has correct word and in-word highlighting', () => {
    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={['aaa', 'The Godfather the godfather The Godfather', 'ccc']}
        opened
        input_value="the g th"
        {...mockProps}
      />
    )
    expect(Comp.find('li.dnb-drawer-list__option').at(0).html()).toBe(
      /* html */ `<li class="first-of-type dnb-drawer-list__option" role="option" tabindex="-1" aria-selected="false" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span><span class="dnb-drawer-list__option__item--highlight">Th</span>e <span class="dnb-drawer-list__option__item--highlight">G</span>odfa<span class="dnb-drawer-list__option__item--highlight">th</span>er <span class="dnb-drawer-list__option__item--highlight">th</span>e <span class="dnb-drawer-list__option__item--highlight">g</span>odfa<span class="dnb-drawer-list__option__item--highlight">th</span>er <span class="dnb-drawer-list__option__item--highlight">Th</span>e <span class="dnb-drawer-list__option__item--highlight">G</span>odfa<span class="dnb-drawer-list__option__item--highlight">th</span>er</span></span></li>`
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

    toggle(Comp)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa' },
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
      target: { value: 'cc' },
    })
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(2)

    // check "bb cc"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'bb cc' },
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
      target: { value: 'aa cc' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[0]
    )

    // check inside words
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'bb cc th x' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[1]
    )
    expect(Comp.find('li.dnb-drawer-list__option').at(0).html()).toBe(
      /* html */ `<li class="first-of-type dnb-drawer-list__option" role="option" tabindex="-1" aria-selected="false" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span><span class="dnb-drawer-list__option__item--highlight">BB</span> <span class="dnb-drawer-list__option__item--highlight">cc</span> ze<span class="dnb-drawer-list__option__item--highlight">thx</span></span></span></li>`
    )

    // check "invalid"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'invalid' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      'Ingen alternativer'
    )
  })

  it('has correct options when search_in_word_index is set to 1', () => {
    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={mockData}
        search_in_word_index="1"
        show_submit_button
        {...mockProps}
      />
    )

    toggle(Comp)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'ethx' }, // BB cc zethx
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[1]
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'thx' }, // BB cc zethx
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[1]
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'ethxX' }, // BB cc zethx
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      'Ingen alternativer'
    )
  })

  it('will prefer search_content over content', () => {
    const mockData = [
      { content: 'item aa', search_content: ['AA c'] },
      { content: 'item bb', search_content: ['BB cc zethx'] },
      { content: 'item cc', search_content: ['CC', 'cc'] },
      { content: 'item cc second', search_content: ['CC', 'cc', 'more'] },
    ]

    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={mockData}
        show_submit_button
        {...mockProps}
      />
    )

    toggle(Comp)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'bb' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).html()).toBe(
      '<li class="first-of-type dnb-drawer-list__option dnb-drawer-list__option--focus" role="option" tabindex="-1" aria-selected="true" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span>item <span class="dnb-drawer-list__option__item--highlight">bb</span></span></span></li>'
    )

    // First result direction
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'cc bb' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).html()).toBe(
      '<li class="first-of-type dnb-drawer-list__option" role="option" tabindex="-1" aria-selected="false" data-item="2" id="option-autocomplete-id-2"><span class="dnb-drawer-list__option__inner"><span>item <span class="dnb-drawer-list__option__item--highlight">cc</span></span></span></li>'
    )

    // Second result direction
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'bb cc' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).html()).toBe(
      '<li class="first-of-type dnb-drawer-list__option dnb-drawer-list__option--focus" role="option" tabindex="-1" aria-selected="true" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span>item <span class="dnb-drawer-list__option__item--highlight">bb</span></span></span></li>'
    )

    // With three matches, we prioritize the second one to be on the first place
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'cc bb more' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).html()).toBe(
      '<li class="first-of-type dnb-drawer-list__option" role="option" tabindex="-1" aria-selected="false" data-item="3" id="option-autocomplete-id-3"><span class="dnb-drawer-list__option__inner"><span>item <span class="dnb-drawer-list__option__item--highlight">cc</span> second</span></span></li>'
    )

    // Do not find item, as there is defined a search_content
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'item' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      'Ingen alternativer'
    )
  })

  it('can be used with regex chars', () => {
    const mockData = [
      'AA aa',
      'BB * bb',
      'CC + cc',
      'DD - dd',
      'EE / ee',
      'FF \\ ff',
    ]

    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={mockData}
        show_submit_button
        {...mockProps}
      />
    )

    toggle(Comp)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: '*+-/\\' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      'Ingen alternativer'
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa ' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[0]
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'bb *' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[1]
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'cc +' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[2]
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'dd -' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[3]
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'ee /' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[4]
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'ff \\' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[5]
    )
  })

  it('has correct options when using search_numbers', () => {
    const mockData = [
      format(20001234567, { ban: true }),
      format(22233344425, { ban: true }),
      format(1234.5, { currency: true }),
      format('+47116000', { phone: true }),
    ]

    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={mockData}
        search_numbers
        show_submit_button
        {...mockProps}
      />
    )

    toggle(Comp)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: '222333.444' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[1]
    )
    expect(Comp.find('li.dnb-drawer-list__option').at(0).html()).toBe(
      /* html */ `<li class="first-of-type dnb-drawer-list__option dnb-drawer-list__option--focus" role="option" tabindex="-1" aria-selected="true" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span><span class="dnb-drawer-list__option__item--highlight">2223</span> <span class="dnb-drawer-list__option__item--highlight">33</span> <span class="dnb-drawer-list__option__item--highlight">4442</span>5</span></span></li>`
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: '222333 444' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[1]
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: '1234' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[2]
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: '00' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[3]
    )
  })

  it('has correct options when using search_numbers and search_in_word_index=1', () => {
    const mockData = ['100.222.333,40', '123456', '100 222 444,50']

    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={mockData}
        show_submit_button
        search_numbers
        search_in_word_index={1}
        {...mockProps}
      />
    )

    toggle(Comp)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: '1002223' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[0]
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: '100,222,3' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[0]
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: '100,222,34' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[0]
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: '1002224' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[2]
    )

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: '1' },
    })
    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(3)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: '333' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[0]
    )
  })

  it('has correct options after filter and key interaction', () => {
    let elem

    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={mockData}
        show_submit_button
        {...mockProps}
      />
    )

    // check "cc"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'cc' },
    })
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      mockData[2].content.join('')
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

    // check "cc bb"
    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'cc bb' },
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
    expect(
      Comp.find('li.dnb-drawer-list__option')
        .at(1)
        .instance()
        .getAttribute('aria-selected')
    ).toBe('true')

    elem = Comp.find('li.dnb-drawer-list__option').at(1)
    expect(elem.text()).toBe(mockData[1])
    expect(elem.instance().getAttribute('aria-selected')).toBe('true')

    // remove selection and reset the order and open again
    // aria-selected should now be on place 1
    keydown(Comp, 27) // esc
    toggle(Comp)

    elem = Comp.find('li.dnb-drawer-list__option').at(1)
    expect(elem.text()).toBe(mockData[1])
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

    toggle(Comp)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa' },
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

    toggle(Comp)

    const elem = Comp.find('.dnb-autocomplete')

    expect(elem.hasClass('dnb-autocomplete--opened')).toBe(true)
  })

  it('has correct length of li elements', () => {
    const Comp = mount(<Component {...props} data={mockData} />)

    toggle(Comp)

    expect(
      Comp.find(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(mockData.length)
  })

  it('has valid events returning all additional attributes in the event return', () => {
    const on_show = jest.fn()
    const on_hide = jest.fn()
    const on_focus = jest.fn()
    const on_blur = jest.fn()
    const params = { 'data-attr': 'value' }

    const Comp = mount(
      <Component
        on_show={on_show}
        on_hide={on_hide}
        on_focus={on_focus}
        on_blur={on_blur}
        {...params}
        data={mockData}
        show_submit_button
        {...mockProps}
      />
    )

    Comp.find('input').simulate('focus')
    expect(on_focus).toHaveBeenCalledTimes(1)
    expect(on_focus.mock.calls[0][0].attributes).toMatchObject(params)
    expect(Comp.find('AutocompleteInstance').state().hasFocus).toBe(true)

    // ensure we focus only once
    Comp.find('input').simulate('focus')
    expect(on_focus).toHaveBeenCalledTimes(1)

    Comp.find('input').simulate('blur')
    expect(on_blur).toHaveBeenCalledTimes(1)
    expect(on_blur.mock.calls[0][0].attributes).toMatchObject(params)

    // ensure we blur only once
    Comp.find('input').simulate('blur')
    expect(on_blur).toHaveBeenCalledTimes(1)

    toggle(Comp)
    expect(on_show).toHaveBeenCalledTimes(1)
    expect(on_show.mock.calls[0][0].attributes).toMatchObject(params)
    expect(on_show).toHaveBeenCalledWith({
      attributes: {
        ...params,
        onMouseDown: expect.any(Function),
        onTouchStart: expect.any(Function),
      },
      data: null,
      ulElement: null,
    })

    keydown(Comp, 27) // esc
    expect(on_hide).toHaveBeenCalledTimes(1)
    expect(on_hide.mock.calls[0][0].attributes).toMatchObject(params)
    expect(on_hide.mock.calls[0][0].event).toMatchObject(
      new KeyboardEvent('keydown', {})
    )

    expect(
      Comp.find('.dnb-autocomplete').hasClass('dnb-autocomplete--opened')
    ).toBe(false)

    // ensure we blur only once
    Comp.find('input').simulate('blur')
    expect(on_blur).toHaveBeenCalledTimes(1)

    toggle(Comp)
    expect(on_show).toHaveBeenCalledTimes(2)
    expect(on_show.mock.calls[1][0].attributes).toMatchObject(params)

    expect(
      Comp.find('.dnb-autocomplete').hasClass('dnb-autocomplete--opened')
    ).toBe(true)

    keydown(Comp, 27) // esc

    expect(
      Comp.find('.dnb-autocomplete').hasClass('dnb-autocomplete--opened')
    ).toBe(false)

    toggle(Comp)
    expect(on_show).toHaveBeenCalledTimes(3)

    Comp.find('AutocompleteInstance').setState({ hasBlur: false })
    Comp.find('input').simulate('blur')
    expect(on_blur).toHaveBeenCalledTimes(2)

    Comp.find('AutocompleteInstance').setState({ hasFocus: false })
    Comp.find('input').simulate('focus')
    expect(on_focus).toHaveBeenCalledTimes(2)
  })

  it('updates its input value if value prop changes', () => {
    let value = 0

    const Comp = mount(
      <Component value={value} data={mockData} {...mockProps} />
    )

    Comp.find('input').simulate('focus')

    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[value]
    )

    value = 1
    Comp.setProps({ value })
    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[value]
    )
  })

  it('can be reset to null', () => {
    let value
    const Comp = mount(
      <Component
        {...props}
        placeholder="placeholder"
        value={null}
        data={mockData}
      />
    )

    expect(Comp.find('.dnb-input__input').instance().value).toBe('')
    expect(Comp.find('.dnb-input__placeholder').text()).toBe('placeholder')

    value = 1
    Comp.setProps({ value })

    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[value]
    )

    Comp.setProps({ value: undefined })

    expect(Comp.find('.dnb-input__input').instance().value).toBe('')

    value = 0
    Comp.setProps({ value })

    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[value]
    )

    Comp.setProps({ value: null })

    expect(Comp.find('.dnb-input__input').instance().value).toBe('')
  })

  it('behaves by default to take the selection in account', async () => {
    const value = 'c'
    let newValue = null

    const on_show = jest.fn()
    const on_hide = jest.fn()
    const on_focus = jest.fn()
    const on_blur = jest.fn()
    const on_change = jest.fn()
    const on_type = jest.fn()

    const Comp = mount(
      <Component
        on_show={on_show}
        on_hide={on_hide}
        on_focus={on_focus}
        on_blur={on_blur}
        on_change={on_change}
        on_type={on_type}
        data={mockData}
        show_submit_button
        {...mockProps}
      />
    )

    // Round #1

    toggle(Comp)

    Comp.find('input').simulate('focus')

    Comp.find('input').simulate('change', { target: { value } })
    expect(Comp.find('input').instance().value).toBe(value)

    Comp.find('input').simulate('blur')

    expect(Comp.find('input').instance().value).toBe(value)

    await wait(1)

    // Here is default consequence
    expect(Comp.find('input').instance().value).toBe('')

    // Round #2
    Comp.find('input').simulate('change', { target: { value } })
    expect(Comp.find('input').instance().value).toBe(value)

    Comp.find('AutocompleteInstance').setState({ hasBlur: false })
    Comp.find('input').simulate('blur')

    expect(Comp.find('input').instance().value).toBe(value)

    await wait(1)

    // Here is our wanted result
    expect(Comp.find('input').instance().value).toBe('')

    Comp.find('li.dnb-drawer-list__option').at(1).simulate('click')

    newValue = 'first new value'
    Comp.find('input').simulate('change', { target: { value: newValue } })
    expect(Comp.find('input').instance().value).toBe(newValue)

    Comp.find('AutocompleteInstance').setState({ hasBlur: false })
    Comp.find('input').simulate('blur')

    await wait(1)

    // Here is our wanted result
    expect(Comp.find('input').instance().value).toBe(mockData[0])

    // Round #3

    Comp.find('input').simulate('change', { target: { value } })
    expect(Comp.find('input').instance().value).toBe(value)
    expect(on_type).toHaveBeenCalledTimes(4)

    Comp.find('li.dnb-drawer-list__option').at(0).simulate('click')
    expect(on_change).toHaveBeenCalledTimes(2)

    newValue = 'second new value'
    Comp.find('input').simulate('change', { target: { value: newValue } })
    expect(Comp.find('input').instance().value).toBe(newValue)

    Comp.find('AutocompleteInstance').setState({ hasBlur: false })
    Comp.find('input').simulate('blur')
    expect(on_blur).toHaveBeenCalledTimes(4)

    await wait(1)

    // Here is our wanted result
    expect(Comp.find('input').instance().value).toBe(
      mockData[2].content.join(' ')
    )

    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      'Ingen alternativer'
    )

    // Close
    toggle(Comp)
    expect(
      Comp.find('.dnb-autocomplete').hasClass('dnb-autocomplete--opened')
    ).toBe(false)

    // Open
    toggle(Comp)
    expect(Comp.find('input').instance().value).toBe(
      mockData[2].content.join(' ')
    )
    Comp.find('AutocompleteInstance').setState({
      skipFocusDuringChange: false,
      hasFocus: false,
    })
    Comp.find('input').simulate('focus')
    expect(
      Comp.find('.dnb-autocomplete').hasClass('dnb-autocomplete--opened')
    ).toBe(true)

    // Now, only the "No option" will be displayed
    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(1)
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      'Ingen alternativer'
    )
  })

  it('keeps the entered input value if "keep_value" or "keep_value_and_selection" is given', async () => {
    const value = 'c'
    let newValue = null

    const on_show = jest.fn()
    const on_hide = jest.fn()
    const on_focus = jest.fn()
    const on_blur = jest.fn()
    const on_change = jest.fn()
    const on_type = jest.fn()

    const Comp = mount(
      <Component
        on_show={on_show}
        on_hide={on_hide}
        on_focus={on_focus}
        on_blur={on_blur}
        on_change={on_change}
        on_type={on_type}
        data={mockData}
        show_submit_button
        {...mockProps}
      />
    )

    toggle(Comp)
    expect(on_show).toHaveBeenCalledTimes(1)

    Comp.find('input').simulate('focus')
    expect(on_focus).toHaveBeenCalledTimes(1)
    expect(on_show).toHaveBeenCalledTimes(1)

    Comp.find('input').simulate('change', { target: { value } })
    expect(Comp.find('input').instance().value).toBe(value)
    expect(on_type).toHaveBeenCalledTimes(1)

    Comp.find('input').simulate('blur')
    expect(on_blur).toHaveBeenCalledTimes(1)

    expect(Comp.find('input').instance().value).toBe(value)

    await wait(1)

    // Here is default consequence
    expect(Comp.find('input').instance().value).toBe('')

    // Now, lets try with "keep_value"
    Comp.setProps({
      keep_value: true,
    })

    Comp.find('input').simulate('change', { target: { value } })
    expect(Comp.find('input').instance().value).toBe(value)
    expect(on_type).toHaveBeenCalledTimes(2)

    Comp.find('AutocompleteInstance').setState({ hasBlur: false })
    Comp.find('input').simulate('blur')
    expect(on_blur).toHaveBeenCalledTimes(2)

    expect(Comp.find('input').instance().value).toBe(value)

    await wait(1)

    // Here is our wanted result
    expect(Comp.find('input').instance().value).toBe(value)

    Comp.find('li.dnb-drawer-list__option').at(1).simulate('click')
    expect(on_change).toHaveBeenCalledTimes(1)

    newValue = 'first new value'
    Comp.find('input').simulate('change', { target: { value: newValue } })
    expect(Comp.find('input').instance().value).toBe(newValue)

    Comp.find('AutocompleteInstance').setState({ hasBlur: false })
    Comp.find('input').simulate('blur')
    expect(on_blur).toHaveBeenCalledTimes(3)

    await wait(1)

    // Here is our wanted result
    expect(Comp.find('input').instance().value).toBe('AA c')

    // Now lets try with "keep_value_and_selection"
    Comp.setProps({
      keep_value: false,
      keep_value_and_selection: true,
    })

    Comp.find('input').simulate('change', { target: { value } })
    expect(Comp.find('input').instance().value).toBe(value)
    expect(on_type).toHaveBeenCalledTimes(4)

    Comp.find('li.dnb-drawer-list__option').at(0).simulate('click')
    expect(on_change).toHaveBeenCalledTimes(2)

    newValue = 'second new value'
    Comp.find('input').simulate('change', { target: { value: newValue } })
    expect(Comp.find('input').instance().value).toBe(newValue)

    Comp.find('AutocompleteInstance').setState({ hasBlur: false })
    Comp.find('input').simulate('blur')
    expect(on_blur).toHaveBeenCalledTimes(4)

    // Here is our wanted result
    expect(Comp.find('input').instance().value).toBe(newValue)

    expect(on_hide).toHaveBeenCalledTimes(4)

    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      'Ingen alternativer'
    )

    // Close
    toggle(Comp)
    expect(on_hide).toHaveBeenCalledTimes(5)
    expect(
      Comp.find('.dnb-autocomplete').hasClass('dnb-autocomplete--opened')
    ).toBe(false)

    // Open
    toggle(Comp)
    expect(Comp.find('input').instance().value).toBe(newValue)
    Comp.find('AutocompleteInstance').setState({
      skipFocusDuringChange: false,
      hasFocus: false,
    })
    Comp.find('input').simulate('focus')
    expect(
      Comp.find('.dnb-autocomplete').hasClass('dnb-autocomplete--opened')
    ).toBe(true)

    // Now, open all, because of "keep_value_and_selection"
    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(3)
  })

  it('returns correct value in on_blur event', async () => {
    const on_focus = jest.fn()
    const on_blur = jest.fn()
    const on_change = jest.fn()

    const Comp = mount(
      <Component
        on_focus={on_focus}
        on_blur={on_blur}
        on_change={on_change}
        data={mockData}
        {...mockProps}
      />
    )

    Comp.find('input').simulate('focus')
    expect(on_focus).toHaveBeenCalledTimes(1)

    Comp.find('input').simulate('change', { target: { value: 'cc' } })

    // Try to call on_blur by mousedown
    Comp.find('.dnb-drawer-list').simulate('mousedown')
    Comp.find('input').simulate('blur')
    expect(on_blur).toHaveBeenCalledTimes(0)

    // Try to call on_blur by touch
    Comp.find('.dnb-drawer-list').simulate('touchstart')
    Comp.find('input').simulate('blur')
    expect(on_blur).toHaveBeenCalledTimes(0)

    // Try to call on_blur by keystroke
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        keyCode: 13, // enter
      })
    )
    Comp.find('input').simulate('blur')
    expect(on_blur).toHaveBeenCalledTimes(0)

    // Make a selection
    Comp.find('li.dnb-drawer-list__option').at(1).simulate('click')

    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change.mock.calls[0][0].data).toBe('BB cc zethx')

    // All the clicks should not have invoked the on_blur event
    expect(on_blur).toHaveBeenCalledTimes(0)

    // But a second one will
    Comp.find('input').simulate('blur')

    expect(on_blur).toHaveBeenCalledTimes(1)
    expect(on_blur.mock.calls[0][0].value).toBe('BB cc zethx')
  })

  it('will open drawer when open_on_focus is set to true', async () => {
    const on_focus = jest.fn()
    const on_change = jest.fn()

    const Comp = mount(
      <Component
        open_on_focus={true}
        on_focus={on_focus}
        on_change={on_change}
        data={mockData}
        {...mockProps}
      />
    )

    Comp.find('input').simulate('focus')
    expect(on_focus).toHaveBeenCalledTimes(1)

    expect(
      Comp.find('.dnb-autocomplete').hasClass('dnb-autocomplete--opened')
    ).toBe(true)

    // Make a selection
    Comp.find('li.dnb-drawer-list__option').at(1).simulate('click')

    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change.mock.calls[0][0].data).toBe('BB cc zethx')
  })

  it('will prevent close if false gets returned from on_hide event', () => {
    let preventClose = false
    const on_hide = jest.fn(() => !preventClose)
    const Comp = mount(
      <Component
        on_hide={on_hide}
        data={mockData}
        show_submit_button
        {...mockProps}
      />
    )

    // first open
    toggle(Comp)

    expect(
      Comp.find('.dnb-autocomplete').hasClass('dnb-autocomplete--opened')
    ).toBe(true)

    // close
    keydown(Comp, 27) // esc
    expect(on_hide).toHaveBeenCalledTimes(1)

    expect(
      Comp.find('.dnb-autocomplete').hasClass('dnb-autocomplete--opened')
    ).toBe(false)

    // reopen
    toggle(Comp)

    expect(
      Comp.find('.dnb-autocomplete').hasClass('dnb-autocomplete--opened')
    ).toBe(true)

    preventClose = true

    // close again, but with false returned
    keydown(Comp, 27) // esc
    expect(on_hide).toHaveBeenCalledTimes(2)

    // we are still open
    expect(
      Comp.find('.dnb-autocomplete').hasClass('dnb-autocomplete--opened')
    ).toBe(true)
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

    toggle(Comp)

    const result = Comp.find('li.dnb-drawer-list__option')
      .at(0)
      .find('.dnb-drawer-list__option__inner')
      .html()

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'aa' },
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
      target: { value: 'aa' },
    })

    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(2)

    // update data
    Comp.setProps({
      data: replaceData,
    })

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'a' },
    })

    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(1)
    expect(Comp.find('li.dnb-drawer-list__option').at(0).text()).toBe(
      'aaa'
    )
  })

  it('and updateData has to replace all data properly in async mode', () => {
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
      target: { value: 'aa' },
    })

    let callOne = on_type.mock.calls[0][0]
    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(3)
    expect(on_type).toHaveBeenCalledTimes(1)
    expect(callOne.dataList.length).toBe(3)

    // update data
    callOne.updateData(replaceData)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'a' },
    })

    const callTwo = on_type.mock.calls[1][0]
    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(1)
    expect(on_type).toHaveBeenCalledTimes(2)
    expect(callTwo.dataList.length).toBe(1)
    expect(callOne.dataList).not.toBe(callTwo.dataList)

    Comp.find('.dnb-input__input').simulate('change', {
      target: { value: 'something' },
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
    toggle(Comp)

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

  it('has a correct value content if we send in a React component', () => {
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

  it('has correct value after useEffect value state change', () => {
    const newValue = 0
    const UpdateValue = () => {
      const [value, setValue] = React.useState(props.value)

      React.useEffect(() => {
        setValue(newValue)
      }, [])

      return <Component {...props} data={mockData} value={value} />
    }

    const Comp = mount(<UpdateValue />)

    expect(Comp.find('.dnb-input__input').instance().value).toBe(
      mockData[newValue]
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
      disabled: true,
    })
    expect(
      Comp.find('button.dnb-input__submit-button__button')
        .instance()
        .hasAttribute('disabled')
    ).toBe(true)
    expect(
      Comp.find('button.dnb-input__submit-button__button')
        .find('.dnb-icon')
        .instance()
        .getAttribute('data-test-id')
    ).toContain('chevron down')
  })

  it('supports input_element properly', () => {
    const onChange = jest.fn()
    const Comp = mount(
      <Component
        {...mockProps}
        data={mockData}
        input_element={(props) => (
          <input
            {...props}
            type="text"
            aria-label="label"
            onChange={onChange}
          />
        )}
      />
    )

    expect(Comp.exists('input')).toBe(true)
    expect(Array.from(Comp.find('input').instance().classList)).toContain(
      'dnb-autocomplete__input'
    )
    expect(Comp.find('input').instance().getAttribute('aria-label')).toBe(
      'label'
    )

    const value = 'new value'
    Comp.find('input').simulate('change', { target: { value } })
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('submit_element will replace the internal SubmitButton', () => {
    const Comp = mount(
      <Component
        id="autocomplete-id"
        data={mockData}
        {...mockProps}
        submit_element={<SubmitButton icon="bell" />}
      />
    )
    Comp.setProps({
      disabled: true,
    })
    expect(
      Comp.find('button.dnb-input__submit-button__button')
        .instance()
        .hasAttribute('disabled')
    ).toBe(true)
    expect(
      Comp.find('button.dnb-input__submit-button__button').exists(
        '.dnb-icon'
      )
    ).toBe(true)
    expect(
      Comp.find('button.dnb-input__submit-button__button').exists(
        '.dnb-icon'
      )
    ).toBe(true)
    expect(
      Comp.find('button.dnb-input__submit-button__button')
        .find('.dnb-icon')
        .instance()
        .getAttribute('data-test-id')
    ).toContain('bell')
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
          'aria-valid-attr-value': { enabled: false },
        },
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
    keyCode,
  })
}
const toggle = (Comp) => {
  Comp.find('button.dnb-input__submit-button__button').simulate('click')
}
const wait = (t) => new Promise((r) => setTimeout(r, t))
