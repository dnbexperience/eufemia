/**
 * Dropdown Test
 *
 */

import React from 'react'
import { axeComponent, loadScss, wait } from '../../../core/jest/jestSetup'
import { fireEvent, render, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dropdown, { DropdownAllProps } from '../Dropdown'
import {
  mockImplementationForDirectionObserver,
  testDirectionObserver,
} from '../../../fragments/drawer-list/__tests__/DrawerListTestMocks'
import {
  DrawerListDataArrayObject,
  DrawerListDataArray,
} from '../../../fragments/drawer-list'

// use no_animation so we don't need to wait
const mockProps: DropdownAllProps = {
  skip_portal: true,
}
const props: DropdownAllProps = {
  id: 'dropdown-id',
  value: 2,
  skip_portal: true,
  no_animation: true,
}

const mockData: DrawerListDataArray = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    content: ['1234 56 78901', 'Brukskonto - Kari Nordmann'],
  },
  {
    selected_value: 'Sparekonto - Ole Nordmann',
    content: ['1234 56 78902', 'Sparekonto - Ole Nordmann'],
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    selected_key: 1,
    content: [
      '1134 56 78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    ],
  },
  {
    selected_value: 'Oppussing - Ole Nordmann',
    selected_key: '0x',
    content: ['1534 96 48901', 'Oppussing - Ole Nordmann'],
  },
  {
    content: <>Custom content {'123'}</>,
  },
  <>Custom content {'123'}</>,
  [<React.Fragment key="key1">Custom content {'123'}</React.Fragment>],
  '0y',
]

mockImplementationForDirectionObserver()

describe('Dropdown component', () => {
  afterEach(() => {
    dispatchKeyDown(27) // esc
  })

  it('has correct value on keydown "ArrowDown" and "Enter"', () => {
    render(<Dropdown {...props} data={mockData} />)
    let elem: HTMLUListElement

    expect(
      document.querySelector('.dnb-dropdown__text__inner').textContent
    ).toBe(
      (mockData[props.value] as DrawerListDataArrayObject).selected_value
    )

    keydown(32) // space

    elem = document.querySelectorAll('.dnb-drawer-list__option')[
      props.value
    ]
    expect(elem.classList).toContain('dnb-drawer-list__option--focus')
    expect(elem.classList).toContain('dnb-drawer-list__option--selected')

    keydown(40) // down
    keydown(13) // enter

    open()

    elem = document.querySelectorAll('.dnb-drawer-list__option')[
      (props.value as number) + 1
    ] as HTMLUListElement
    expect(elem.classList).toContain('dnb-drawer-list__option--focus')
    expect(elem.classList).toContain('dnb-drawer-list__option--selected')

    expect(
      document.querySelector('.dnb-dropdown__text__inner').textContent
    ).toBe(
      (mockData[(props.value as number) + 1] as DrawerListDataArrayObject)
        .selected_value
    )
  })

  it('has correct value on key search', () => {
    const { rerender } = render(<Dropdown {...props} data={mockData} />)

    keydown(32) // space

    expect(
      document.querySelector('.dnb-drawer-list__option--focus')
    ).toBeInTheDocument()

    keydown(83) // S

    // force rerender
    rerender(<Dropdown {...props} data={mockData} />)

    expect(
      document.querySelectorAll('.dnb-drawer-list__option')[1].classList
    ).toContain('dnb-drawer-list__option--focus')

    keydown(70) // F

    // force rerender
    rerender(<Dropdown {...props} data={mockData} />)

    expect(
      document.querySelectorAll('.dnb-drawer-list__option')[2].classList
    ).toContain('dnb-drawer-list__option--focus')
  })

  it('has correct state when opened prop is given', () => {
    render(
      <Dropdown skip_portal no_animation opened={true} data={mockData} />
    )

    expect(
      document.querySelector('button').getAttribute('aria-expanded')
    ).toBe('true')
    expect(
      document
        .querySelector('.dnb-drawer-list__options')
        .getAttribute('aria-expanded')
    ).toBe('true')
  })

  it('supports a trigger_element properly', () => {
    render(
      <Dropdown
        skip_portal
        no_animation
        trigger_element={(props) => <button {...props}>test</button>}
        data={mockData}
      />
    )

    expect(document.querySelector('button')).toBeInTheDocument()
    expect(
      Array.from(document.querySelector('button').classList)
    ).toContain('dnb-dropdown__trigger')
    expect(document.querySelector('button').textContent).toBe('test')

    // open
    open()

    expect(
      document
        .querySelector('.dnb-drawer-list__options')
        .getAttribute('aria-expanded')
    ).toBe('true')
  })

  it('shows form-status with correct classes', () => {
    render(
      <Dropdown
        skip_portal
        no_animation
        data={mockData}
        status="status text"
        status_state="warn"
        status_props={{ stretch: true }}
      />
    )

    expect(document.querySelector('.dnb-form-status')).toHaveClass(
      'dnb-form-status--warn dnb-form-status__size--default dnb-form-status--stretch dnb-form-status--has-content'
    )
  })

  it('will stay open when keep_open and a selection is made', () => {
    const on_change = jest.fn()
    render(
      <Dropdown
        skip_portal
        no_animation
        opened={true}
        keep_open={true}
        on_change={on_change}
        data={mockData}
      />
    )

    expect(
      document.querySelector('.dnb-drawer-list__option--selected')
    ).not.toBeInTheDocument()

    // then simulate changes
    keydown(40) // down
    keydown(40) // down
    keydown(32) // space

    expect(on_change).toHaveBeenCalledTimes(1)
    expect(
      document.querySelector('.dnb-drawer-list__option--selected')
    ).toBeInTheDocument()
    expect(document.querySelector('.dnb-dropdown').classList).toContain(
      'dnb-dropdown--opened'
    )

    // close
    keydown(27) // esc

    expect(
      document.querySelector('.dnb-dropdown').classList
    ).not.toContain('dnb-dropdown--opened')
  })

  it('will stay open when prevent_close is given, regardless', async () => {
    const on_change = jest.fn()
    const on_hide = jest.fn()
    render(
      <Dropdown
        prevent_close={true}
        skip_portal
        no_animation
        on_change={on_change}
        on_hide={on_hide}
        data={mockData}
      />
    )

    expect(
      document.querySelector('.dnb-drawer-list__option--selected')
    ).not.toBeInTheDocument()

    // then simulate changes
    keydown(40) // down
    keydown(40) // down
    keydown(32) // space

    expect(on_change).toHaveBeenCalledTimes(1)
    expect(
      document.querySelector('.dnb-drawer-list__option--selected')
    ).toBeInTheDocument()
    expect(document.querySelector('.dnb-dropdown').classList).toContain(
      'dnb-dropdown--opened'
    )

    // try to close it
    keydown(27) // esc

    expect(document.querySelector('.dnb-dropdown').classList).toContain(
      'dnb-dropdown--opened'
    )

    expect(on_hide).toHaveBeenCalledTimes(0)
  })

  it('has valid on_select callback', () => {
    const on_select = jest.fn()

    render(<Dropdown {...props} data={mockData} on_select={on_select} />)

    // then simulate changes
    keydown(32) // space
    keydown(40) // down

    expect(
      document.querySelectorAll('.dnb-drawer-list__option--selected')
        .length
    ).toBe(1)

    const notChangedItem = mockData[(props.value as number) + 1]
    expect(on_select.mock.calls[0][0].data).toStrictEqual(notChangedItem)

    keydown(40) // down

    const selectedItem = mockData[(props.value as number) + 2]
    expect(on_select.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
  })

  it('will select correct item on given numeric selectedKey', () => {
    const { rerender } = render(
      <Dropdown
        {...props}
        value={20}
        data={[
          { selectedKey: 10, content: 'Ten' },
          { selectedKey: 20, content: 'Twenty' },
          { selectedKey: 30, content: 'Thirty' },
        ]}
      />
    )

    open()

    {
      const selectedElement = document.querySelector(
        '.dnb-drawer-list__option--selected'
      )
      expect(selectedElement).toBeInTheDocument()
      expect(selectedElement.textContent).toBe('Twenty')
    }

    keydown(38) // up
    keydown(32) // space
    open()

    {
      const selectedElement = document.querySelector(
        '.dnb-drawer-list__option--selected'
      )
      expect(selectedElement).toBeInTheDocument()
      expect(selectedElement.textContent).toBe('Ten')
    }

    rerender(
      <Dropdown
        {...props}
        value={30}
        data={{
          10: 'Ten',
          20: 'Twenty',
          30: 'Thirty',
        }}
      />
    )

    {
      const selectedElement = document.querySelector(
        '.dnb-drawer-list__option--selected'
      )
      expect(selectedElement).toBeInTheDocument()
      expect(selectedElement.textContent).toBe('Thirty')
    }

    keydown(38) // up
    keydown(32) // space
    open()

    {
      const selectedElement = document.querySelector(
        '.dnb-drawer-list__option--selected'
      )
      expect(selectedElement).toBeInTheDocument()
      expect(selectedElement.textContent).toBe('Twenty')
    }
  })

  it('has no selected items on using prevent_selection', async () => {
    const on_change = jest.fn()
    const title = 'custom title'

    const { rerender } = render(
      <Dropdown
        {...props}
        value={null}
        data={mockData}
        title={title}
        on_change={on_change}
        prevent_selection
      />
    )

    // open first
    open()

    expect(
      document.querySelector('.dnb-drawer-list__option--selected')
    ).not.toBeInTheDocument()

    // then simulate changes
    keydown(40) // down
    keydown(40) // down
    keydown(32) // space

    // open again, to be able to evaluate
    open()

    expect(
      document.querySelector('.dnb-drawer-list__option--selected')
    ).not.toBeInTheDocument()

    rerender(
      <Dropdown
        {...props}
        value={null}
        data={mockData}
        title={title}
        on_change={on_change}
        prevent_selection={false}
      />
    )

    // open again
    open()
    keydown(40) // down
    keydown(40) // down
    keydown(32) // space

    // open again, to be able to evaluate
    open()

    expect(
      document.querySelector('.dnb-drawer-list__option--selected')
    ).toBeInTheDocument()

    rerender(
      <Dropdown
        {...props}
        value={null}
        data={mockData}
        title={title}
        on_change={on_change}
        prevent_selection={false}
        action_menu={true}
      />
    )

    // open again
    open()
    keydown(40) // down
    keydown(40) // down
    keydown(32) // space

    // open again, to be able to evaluate
    open()

    expect(
      document.querySelector('.dnb-drawer-list__option--selected')
    ).not.toBeInTheDocument()

    rerender(
      <Dropdown
        {...props}
        value={null}
        data={mockData}
        title={title}
        on_change={on_change}
        prevent_selection={true}
        action_menu={false}
      />
    )

    expect(
      document
        .querySelector('.dnb-icon')

        .getAttribute('data-testid')
    ).toBe('chevron down icon')

    const event = on_change.mock.calls[0][0]
    const selectedItem = mockData[event.value]
    expect(event.value).toBe(1)
    expect(event.selected_item).toBe(1)
    expect(event.active_item).toBe(undefined)
    expect(event.data).toStrictEqual(selectedItem)

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      title
    )
    expect(
      document.querySelector('.dnb-dropdown--is-popup')
    ).not.toBeInTheDocument()

    rerender(
      <Dropdown
        {...props}
        value={null}
        data={mockData}
        title={null}
        on_change={on_change}
        prevent_selection={true}
        action_menu={false}
      />
    )

    expect(
      document.querySelector('.dnb-dropdown__text')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-dropdown--is-popup')
    ).toBeInTheDocument()
  })

  it('can be reset to null', () => {
    let value
    const { rerender } = render(
      <Dropdown {...props} value={null} data={mockData} />
    )

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      'Valgmeny'
    )

    value = 2
    rerender(<Dropdown {...props} value={value} data={mockData} />)

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      (mockData[value] as DrawerListDataArrayObject).selected_value
    )

    rerender(<Dropdown {...props} value={undefined} data={mockData} />)

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      'Valgmeny'
    )

    value = 3
    rerender(<Dropdown {...props} value={value} data={mockData} />)

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      (mockData[value] as DrawerListDataArrayObject).selected_value
    )

    rerender(<Dropdown {...props} value={null} data={mockData} />)

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      'Valgmeny'
    )
  })

  it('selects correct value and key', () => {
    const mockData = [
      { selected_key: 'a', content: 'A value' },
      { selected_key: 'b', content: 'B value' },
      { selected_key: 'c', content: 'C value' },
      { selected_key: 'id-123', content: '123 value' },
      { selected_key: 'id-456', content: '456 value' },
    ]

    const on_change = jest.fn()

    const { rerender } = render(
      <Dropdown no_animation data={mockData} on_change={on_change} />
    )

    // open first
    open()

    const openAndSelectNext = () => {
      // then simulate changes
      keydown(40) // down
      keydown(13) // enter
      // open again, to be able to evaluate
      open()
    }

    openAndSelectNext()

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      'A value'
    )
    expect(on_change.mock.calls[0][0].data.selected_key).toBe('a')

    rerender(
      <Dropdown
        no_animation
        data={mockData}
        on_change={on_change}
        value="b"
      />
    )

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      'B value'
    )

    openAndSelectNext()

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      'C value'
    )
    expect(on_change.mock.calls[1][0].data.selected_key).toBe('c')

    rerender(
      <Dropdown
        no_animation
        data={mockData}
        on_change={on_change}
        value="id-123"
      />
    )

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      '123 value'
    )

    openAndSelectNext()

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      '456 value'
    )
    expect(on_change.mock.calls[2][0].data.selected_key).toBe('id-456')

    rerender(
      <Dropdown
        no_animation
        data={mockData}
        on_change={on_change}
        value={123}
      />
    )

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      'Valgmeny'
    )
  })

  it('has no selected items on using more_menu', () => {
    const title = 'custom title'
    render(
      <Dropdown
        {...props}
        value={null}
        data={mockData}
        title={title}
        more_menu
      />
    )

    // open first
    open()

    // then simulate changes
    keydown(40) // down
    keydown(40) // down
    keydown(32) // space

    // open first
    open()

    expect(
      document.querySelector('.dnb-drawer-list__option--selected')
    ).not.toBeInTheDocument()

    expect(
      document
        .querySelector('.dnb-icon')

        .getAttribute('data-testid')
    ).toBe('more icon')

    expect(
      document.querySelector('.dnb-dropdown__text')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-dropdown--is-popup')
    ).toBeInTheDocument()
  })

  it('has valid on_change callback', () => {
    let selectedItem
    const on_change = jest.fn()
    const on_select = jest.fn()

    render(
      <Dropdown
        {...props}
        data={mockData}
        on_change={on_change}
        on_select={on_select}
      />
    )
    // open first
    open()

    // then simulate changes
    keydown(40) // down

    selectedItem = mockData[(props.value as number) + 1]
    expect(on_select.mock.calls[0][0].data).toStrictEqual(selectedItem)

    keydown(32) // space

    selectedItem = mockData[(props.value as number) + 1]
    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_select).toHaveBeenCalledTimes(2)
    expect(on_change.mock.calls[0][0].data).toStrictEqual(selectedItem)
    expect(on_select.mock.calls[1][0].data).toStrictEqual(selectedItem)
    expect(on_change).toHaveBeenCalledWith({
      attributes: {},
      isTrusted: false,
      data: selectedItem,
      event: new KeyboardEvent('keydown', {}),
      selected_item: (props.value as number) + 1,
      value: (props.value as number) + 1,
    })

    // open first
    open()

    // then simulate changes
    keydown(40) // down
    keydown(13) // enter

    selectedItem = mockData[(props.value as number) + 2]
    expect(on_change.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
    expect(on_select.mock.calls[3][0].data).toStrictEqual(selectedItem) // second call!
    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_select).toHaveBeenCalledTimes(4)
  })

  it('has valid on_change callback if object was given', () => {
    const on_change = jest.fn()

    render(
      <Dropdown
        {...props}
        data={{ 'en-GB': 'English', 'nb-NO': 'Norsk' }}
        on_change={on_change}
      />
    )

    open()
    keydown(40) // down
    keydown(32) // space

    expect(on_change).toHaveBeenCalledWith({
      attributes: {},
      isTrusted: false,
      data: {
        __id: 0,
        content: 'English',
        selectedKey: 'en-GB',
        selected_key: 'en-GB',
        type: 'object',
        value: 'en-GB',
      },
      event: new KeyboardEvent('keydown', {}),
      selected_item: 0,
      value: 'en-GB',
    })

    open()
    keydown(40) // down
    keydown(32) // space

    expect(on_change).toHaveBeenLastCalledWith({
      attributes: {},
      isTrusted: false,
      data: {
        content: 'Norsk',
        selectedKey: 'nb-NO',
        selected_key: 'nb-NO',
        type: 'object',
        value: 'nb-NO',
      },
      event: new KeyboardEvent('keydown', {}),
      selected_item: 1,
      value: 'nb-NO',
    })

    expect(on_change).toHaveBeenCalledTimes(2)
  })

  it('has correct "aria-expanded"', () => {
    render(<Dropdown {...props} data={mockData} />)
    open()

    const elem = document.querySelector('span.dnb-dropdown')
    expect(
      elem
        .querySelector('button.dnb-dropdown__trigger')
        .getAttribute('aria-expanded')
    ).toBe('true')

    expect(elem.getAttribute('class')).toContain('dnb-dropdown--opened')
  })

  it('should set aria-activedescendant to be of first option, when no items are selected', () => {
    render(<Dropdown data={['1', '2']} />)
    open()

    expect(
      document
        .querySelectorAll('li.dnb-drawer-list__option')[0]
        .getAttribute('id')
    ).toBe(
      document
        .querySelector('.dnb-drawer-list__options')
        .getAttribute('aria-activedescendant')
    )
  })

  it('has correct length of li elements', () => {
    render(<Dropdown {...props} data={mockData} />)

    open()

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option').length
    ).toBe(mockData.length)
  })

  it('has to return all additional attributes the event return', () => {
    const on_show = jest.fn()
    const on_hide = jest.fn()
    const params = { 'data-attr': 'value' }
    render(
      <Dropdown
        no_animation
        on_show={on_show}
        on_hide={on_hide}
        {...params}
        data={mockData}
      />
    )

    open()

    expect(on_show.mock.calls.length).toBe(1)
    expect(on_show.mock.calls[0][0].attributes).toMatchObject(params)
    expect(on_show).toHaveBeenCalledWith({
      attributes: params,
      data: null,
      ulElement: null,
    })

    // close
    dispatchKeyDown(27) // esc

    expect(on_hide.mock.calls.length).toBe(1)
    expect(on_hide.mock.calls[0][0].attributes).toMatchObject(params)
    expect(on_hide).toHaveBeenCalledWith({
      isTrusted: false,
      attributes: params,
      data: null,
      event: new KeyboardEvent('keydown', {}),
    })

    expect(on_show).toHaveBeenCalledTimes(1)
    expect(on_hide).toHaveBeenCalledTimes(1)
  })

  it('has to set correct focus during open and close', async () => {
    const on_show = jest.fn()
    const on_hide = jest.fn()
    const on_show_focus = jest.fn()
    const on_hide_focus = jest.fn()

    render(
      <Dropdown
        no_animation
        on_show={on_show}
        on_hide={on_hide}
        on_show_focus={on_show_focus}
        on_hide_focus={on_hide_focus}
        data={mockData}
      />
    )

    // 1. open the dropdown
    open()

    expect(on_show).toHaveBeenCalledTimes(1)
    expect(on_show).toHaveBeenCalledWith({
      attributes: {},
      data: null,
      ulElement: null,
    })

    expect(on_show_focus).toHaveBeenCalledTimes(1)
    expect(on_show_focus.mock.calls[0][0].element).toBe(
      document.activeElement
    )

    // 2. close the dropdown with tab
    keydown(9) // tab – because JSDOM does not support keyboard handling, so we can not check document.activeElement

    // delay because we want to wait to have the DOM focus to be called
    await wait(1)

    expect(on_hide).toHaveBeenCalledTimes(1)
    expect(on_hide).toHaveBeenCalledWith({
      attributes: {},
      isTrusted: false,
      event: new KeyboardEvent('keydown', {}),
      data: null,
    })
    expect(on_hide_focus).toHaveBeenCalledTimes(1)
    expect(on_hide_focus.mock.calls[0][0].element).toBe(
      document.querySelector('.dnb-button')
    )
  })

  it('will prevent close if false gets returned from on_hide event', () => {
    let preventClose = false
    const on_hide = jest.fn(() => !preventClose)
    render(<Dropdown no_animation on_hide={on_hide} data={mockData} />)

    // first open
    open()

    expect(document.querySelector('.dnb-dropdown').classList).toContain(
      'dnb-dropdown--opened'
    )

    act(() => {
      // close
      dispatchKeyDown(27) // esc
    })

    expect(on_hide.mock.calls.length).toBe(1)

    expect(
      document.querySelector('.dnb-dropdown').classList
    ).not.toContain('dnb-dropdown--opened')

    // reopen
    open()

    expect(document.querySelector('.dnb-dropdown').classList).toContain(
      'dnb-dropdown--opened'
    )

    preventClose = true

    act(() => {
      // close again, but with false returned
      dispatchKeyDown(27) // esc
    })

    expect(on_hide.mock.calls.length).toBe(2)

    // we are still open
    expect(document.querySelector('.dnb-dropdown').classList).toContain(
      'dnb-dropdown--opened'
    )
  })

  it('will set focus on options when key down/up is pressed on first item', async () => {
    const { rerender } = render(
      <Dropdown id="key-nav" no_animation data={mockData} />
    )

    // first open
    keydown(40) // down

    expect(document.querySelector('.dnb-dropdown').classList).toContain(
      'dnb-dropdown--opened'
    )

    expect(document.activeElement.classList).toContain(
      'dnb-drawer-list__options'
    )

    keydown(40) // down

    // delay because we want to wait to have the DOM focus to be called
    await wait(1)

    expect(document.activeElement.classList).toContain(
      'dnb-drawer-list__option'
    )
    expect(document.activeElement.classList).toContain(
      'dnb-drawer-list__option--focus'
    )
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0].classList
    ).toContain('dnb-drawer-list__option--focus')

    keydown(38) // up

    expect(document.activeElement.classList).toContain(
      'dnb-drawer-list__options'
    )

    // then simulate changes
    keydown(38) // up

    // delay because we want to wait to have the DOM focus to be called
    await wait(1)

    expect(document.activeElement.classList).toContain(
      'dnb-drawer-list__option'
    )
    let options = document.querySelectorAll('li.dnb-drawer-list__option')
    expect(options[mockData.length - 1].classList).toContain(
      'dnb-drawer-list__option--focus'
    )

    // then simulate changes
    keydown(40) // down

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0].classList // the first item
    ).toContain('dnb-drawer-list__option--focus')

    rerender(
      <Dropdown
        id="key-nav"
        no_animation
        data={mockData}
        direction="top"
      />
    )

    // then simulate changes
    keydown(38) // up

    options = document.querySelectorAll('li.dnb-drawer-list__option')
    expect(
      options[mockData.length - 1].classList // the last item
    ).toContain('dnb-drawer-list__option--focus')

    // delay because we want to wait to have the DOM focus to be called
    await wait(1)

    // then simulate changes
    keydown(40) // down

    expect(document.activeElement.classList).toContain(
      'dnb-drawer-list__options'
    )

    // then simulate changes
    keydown(38) // up

    options = document.querySelectorAll('li.dnb-drawer-list__option')
    expect(
      options[mockData.length - 1].classList // the last item
    ).toContain('dnb-drawer-list__option--focus')

    // then simulate changes
    keydown(38) // up

    options = document.querySelectorAll('li.dnb-drawer-list__option')
    expect(
      options[mockData.length - 2].classList // the second item
    ).toContain('dnb-drawer-list__option--focus')

    // then simulate changes
    keydown(33) // pageUp

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0].classList // the first item
    ).toContain('dnb-drawer-list__option--focus')

    // then simulate changes
    keydown(38) // up

    options = document.querySelectorAll('li.dnb-drawer-list__option')
    expect(
      options[mockData.length - 1].classList // the last item
    ).toContain('dnb-drawer-list__option--focus')
  })

  it('will change the selected value when StrictMode is enabled', () => {
    render(
      <React.StrictMode>
        <Dropdown no_animation data={mockData} value={props.value} />
      </React.StrictMode>
    )

    // first open
    open()

    // then simulate changes
    keydown(40) // down
    keydown(13) // enter

    expect(
      document.querySelector('.dnb-dropdown__text__inner').textContent
    ).toBe(
      (mockData[(props.value as number) + 1] as DrawerListDataArrayObject)
        .selected_value
    )
  })

  it('has correct selected value', () => {
    render(<Dropdown {...props} data={mockData} />)
    expect(
      document.querySelector('.dnb-dropdown__text__inner').textContent
    ).toBe(
      (mockData[props.value] as DrawerListDataArrayObject).selected_value
    )
  })

  it('has correct selected value after new selection', () => {
    render(<Dropdown {...props} data={mockData} />)
    open()

    // then simulate changes
    keydown(40) // down

    expect(
      document.querySelector('.dnb-dropdown__text__inner').textContent
    ).toBe(
      (mockData[props.value] as DrawerListDataArrayObject).selected_value
    )
  })

  it('has correct value after useEffect value state change', () => {
    const newValue = 3
    const UpdateValue = () => {
      const [value, setValue] = React.useState(props.value)

      React.useEffect(() => {
        setValue(newValue)
      }, [])

      return <Dropdown {...props} data={mockData} value={value} />
    }

    render(<UpdateValue />)

    expect(
      document.querySelector('.dnb-dropdown__text__inner').textContent
    ).toBe(
      (mockData[newValue] as DrawerListDataArrayObject).selected_value
    )

    open()

    const options = document.querySelectorAll('li.dnb-drawer-list__option')
    expect(options[newValue].classList).toContain(
      'dnb-drawer-list__option--selected'
    )
    expect(options[newValue].classList).toContain(
      'dnb-drawer-list__option--focus'
    )
  })

  it('has a default title if no value is given', () => {
    const title = 'Make a selection'
    render(<Dropdown data={mockData} title={title} {...mockProps} />)
    expect(
      document.querySelector('.dnb-dropdown__text__inner').innerHTML
    ).toBe(title)
  })

  it('should support inline styling', () => {
    render(<Dropdown data={mockData} style={{ color: 'red' }} />)

    expect(
      document.querySelector('.dnb-button').getAttribute('style')
    ).toBe('color: red;')
  })

  it('should support empty data entry', () => {
    render(<Dropdown skip_portal no_animation data={['']} />)

    keydown(32) // space

    expect(
      document.querySelector('button').getAttribute('aria-expanded')
    ).toBe('true')
    expect(
      document
        .querySelector('.dnb-drawer-list__option')
        .querySelector('.dnb-drawer-list__option__inner').innerHTML
    ).toBe('')
  })

  it('has a correct value content if we send in a React component', () => {
    const aStringOf = 'Custom content 123'

    render(<Dropdown data={mockData} value={4} {...mockProps} />)
    expect(
      document.querySelector('.dnb-dropdown__text__inner').innerHTML
    ).toBe(aStringOf)

    render(<Dropdown data={mockData} value={5} {...mockProps} />)
    expect(
      document.querySelector('.dnb-dropdown__text__inner').innerHTML
    ).toBe(aStringOf)

    render(<Dropdown data={mockData} value={6} {...mockProps} />)
    expect(
      document.querySelector('.dnb-dropdown__text__inner').innerHTML
    ).toBe(aStringOf)
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(
      <Dropdown data={mockData} {...mockProps} />
    )

    const button = document.querySelector('.dnb-dropdown__trigger')

    expect(button).not.toHaveAttribute('disabled')

    rerender(<Dropdown data={mockData} {...mockProps} disabled={true} />)

    expect(button).toHaveAttribute('disabled')
  })

  it('has correct trigger button aria attributes', () => {
    render(
      <Dropdown data={mockData} {...mockProps} opened id="dropdown-id" />
    )

    const elem = document.querySelector('.dnb-dropdown__trigger')

    expect(elem).toHaveAttribute('aria-haspopup', 'listbox')
    expect(elem).toHaveAttribute('aria-controls', 'dropdown-id-ul')
    expect(elem).toHaveAttribute('aria-expanded', 'true')

    keydown(27) // esc

    expect(elem).toHaveAttribute('aria-haspopup', 'listbox')
    expect(elem).not.toHaveAttribute('aria-controls', 'dropdown-id-ul')
    expect(elem).toHaveAttribute('aria-expanded', 'false')
  })

  it('gets valid buttonRef element', () => {
    let ref: React.RefObject<HTMLButtonElement>

    function MockComponent() {
      ref = React.useRef()
      return <Dropdown {...props} buttonRef={ref} />
    }

    render(<MockComponent />)

    expect(ref.current.id).toBe(props.id)
    expect(ref.current.tagName).toBe('BUTTON')
    expect(ref.current instanceof HTMLButtonElement).toBe(true)
  })

  it('gets valid buttonRef element when ref is function', () => {
    const ref: React.MutableRefObject<HTMLButtonElement> =
      React.createRef()

    function refFunction(instance: HTMLButtonElement) {
      ref.current = instance
    }

    render(<Dropdown {...props} buttonRef={refFunction} />)

    expect(ref.current.id).toBe(props.id)
    expect(ref.current.tagName).toBe('BUTTON')
    expect(ref.current instanceof HTMLButtonElement).toBe(true)
  })

  it('gets valid innerRef element', () => {
    let ref: React.RefObject<HTMLButtonElement>

    function MockComponent() {
      ref = React.useRef()
      return <Dropdown {...props} innerRef={ref} />
    }

    render(<MockComponent />)

    expect(ref.current.className).toContain('dnb-dropdown')
    expect(ref.current.tagName).toBe('SPAN')
    expect(ref.current instanceof HTMLSpanElement).toBe(true)
  })

  it('gets valid innerRef element when ref is function', () => {
    const ref: React.MutableRefObject<HTMLButtonElement> =
      React.createRef()

    function refFunction(instance: HTMLButtonElement) {
      ref.current = instance
    }

    render(<Dropdown {...props} innerRef={refFunction} />)

    expect(ref.current.className).toContain('dnb-dropdown')
    expect(ref.current.tagName).toBe('SPAN')
    expect(ref.current instanceof HTMLSpanElement).toBe(true)
  })

  beforeAll(() => {
    window.resizeTo = function resizeTo({
      width = window.innerWidth,
      height = window.innerHeight,
    }: {
      width?: number
      height?: number
    }) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
      }).dispatchEvent(new this.Event('resize'))

      // new setDirectionObserver implementation
      jest
        .spyOn(document.documentElement, 'clientWidth', 'get')
        .mockImplementation(() => width)
      jest
        .spyOn(document.documentElement, 'clientHeight', 'get')
        .mockImplementation(() => height)
    }

    window.scrollTo = function resizeTo({ top = window.pageYOffset }) {
      Object.assign(this, {
        pageYOffset: top,
      }).dispatchEvent(new this.Event('scroll'))

      // new setDirectionObserver implementation
      jest
        .spyOn(document.documentElement, 'scrollTop', 'get')
        .mockImplementation(() => top)
    }

    // make sure we get the correct document.documentElement.clientHeight on startup
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.resizeTo({ height: window.innerHeight })
  })

  it('has working direction observer', async () => {
    render(<Dropdown {...props} data={mockData} />)

    // open first
    open()

    await testDirectionObserver()
  })

  it('should close dropdown on suffix click', async () => {
    render(
      <Dropdown {...props} data={['One', 'Two']} suffix={'Click me'} />
    )

    const dropdown = document.querySelector('.dnb-dropdown')
    const trigger = document.querySelector('.dnb-dropdown__trigger')
    const suffix = document.querySelector('.dnb-dropdown__suffix')

    await userEvent.click(trigger)

    expect(dropdown).toHaveClass('dnb-dropdown--opened')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await userEvent.click(suffix)

    expect(dropdown).not.toHaveClass('dnb-dropdown--opened')
    expect(trigger).not.toHaveAttribute('aria-expanded', 'true')
  })
})

describe('Dropdown markup', () => {
  it('should validate with ARIA rules', async () => {
    const snapshotProps: DropdownAllProps = {
      title: 'title',
      label: 'label',
      id: 'dropdown-id',
      status: 'status',
      status_state: 'error',
      value: 2,
      opened: true,
      skip_portal: true,
      no_animation: true,
      variant: 'secondary',
    }

    const CheckComponent = render(
      <Dropdown {...snapshotProps} data={mockData} />
    )

    expect(
      await axeComponent(CheckComponent, {
        rules: {
          'aria-required-children': { enabled: false },
        },
      })
    ).toHaveNoViolations()
  })
})

describe('Dropdown scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-dropdown-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})

const keydown = (keyCode) => {
  fireEvent.keyDown(
    document.querySelector('button.dnb-dropdown__trigger'),
    {
      keyCode,
    }
  )
}

const open = () => {
  fireEvent.click(document.querySelector('button.dnb-dropdown__trigger'))
}

const dispatchKeyDown = (keyCode) => {
  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      keyCode,
    })
  )
}
