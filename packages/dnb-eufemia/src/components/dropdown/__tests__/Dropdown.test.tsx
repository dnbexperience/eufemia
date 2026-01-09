/**
 * Dropdown Test
 *
 */

import React from 'react'
import { axeComponent, loadScss, wait } from '../../../core/jest/jestSetup'
import { fireEvent, render, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { DropdownAllProps } from '../Dropdown'
import Dropdown from '../Dropdown'
import {
  mockImplementationForDirectionObserver,
  testDirectionObserver,
} from '../../../fragments/drawer-list/__tests__/DrawerListTestMocks'
import type {
  DrawerListDataArrayObject,
  DrawerListDataArray,
  DrawerListGroupTitles,
} from '../../../fragments/drawer-list'
import { bank } from '../../../icons'
import Icon from '../../Icon'
import NumberFormat from '../../NumberFormat'
import { CountryFlag } from '../../lib'
import Dialog from '../../dialog/Dialog'

import locales from '../../../shared/locales/nb-NO'

const nbNO = locales['nb-NO'].DrawerList

// use noAnimation so we don't need to wait
const mockProps: DropdownAllProps = {
  skipPortal: true,
}
const props: DropdownAllProps = {
  id: 'dropdown-id',
  value: 2,
  skipPortal: true,
  noAnimation: true,
}

const mockData: DrawerListDataArray = [
  {
    selectedValue: 'Brukskonto - Kari Nordmann',
    content: ['1234 56 78901', 'Brukskonto - Kari Nordmann'],
  },
  {
    selectedValue: 'Sparekonto - Ole Nordmann',
    content: ['1234 56 78902', 'Sparekonto - Ole Nordmann'],
  },
  {
    selectedValue:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    selectedKey: 1,
    content: [
      '1134 56 78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    ],
  },
  {
    selectedValue: 'Oppussing - Ole Nordmann',
    selectedKey: '0x',
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
      (mockData[props.value] as DrawerListDataArrayObject).selectedValue
    )
    expect(
      document.querySelector('.dnb-dropdown__trigger')
    ).toHaveAttribute(
      'title',
      (mockData[props.value] as DrawerListDataArrayObject).selectedValue
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
        .selectedValue
    )
    expect(
      document.querySelector('.dnb-dropdown__trigger')
    ).toHaveAttribute(
      'title',
      (mockData[(props.value as number) + 1] as DrawerListDataArrayObject)
        .selectedValue
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
      <Dropdown skipPortal noAnimation opened={true} data={mockData} />
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

  it('supports a triggerElement properly', () => {
    render(
      <Dropdown
        skipPortal
        noAnimation
        triggerElement={(props) => <button {...props}>test</button>}
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
        skipPortal
        noAnimation
        data={mockData}
        status="status text"
        statusState="warn"
        statusProps={{ stretch: true }}
      />
    )

    expect(document.querySelector('.dnb-form-status')).toHaveClass(
      'dnb-form-status--warn dnb-form-status__size--default dnb-form-status--stretch dnb-form-status--has-content'
    )
  })

  it('will stay open when keepOpen and a selection is made', () => {
    const onChange = jest.fn()
    render(
      <Dropdown
        skipPortal
        noAnimation
        opened={true}
        keepOpen={true}
        onChange={onChange}
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

    expect(onChange).toHaveBeenCalledTimes(1)
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

  it('will stay open when preventClose is given, regardless', async () => {
    const onChange = jest.fn()
    const onHide = jest.fn()
    render(
      <Dropdown
        preventClose={true}
        skipPortal
        noAnimation
        onChange={onChange}
        onHide={onHide}
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

    expect(onChange).toHaveBeenCalledTimes(1)
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

    expect(onHide).toHaveBeenCalledTimes(0)
  })

  it('has valid onSelect callback', () => {
    const onSelect = jest.fn()

    render(<Dropdown {...props} data={mockData} onSelect={onSelect} />)

    // then simulate changes
    keydown(32) // space
    keydown(40) // down

    expect(
      document.querySelectorAll('.dnb-drawer-list__option--selected')
        .length
    ).toBe(1)

    const notChangedItem = mockData[(props.value as number) + 1]
    expect(onSelect.mock.calls[0][0].data).toStrictEqual(notChangedItem)

    keydown(40) // down

    const selectedItem = mockData[(props.value as number) + 2]
    expect(onSelect.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
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

  it('has no selected items on using preventSelection', async () => {
    const onChange = jest.fn()
    const title = 'custom title'

    const { rerender } = render(
      <Dropdown
        {...props}
        value={null}
        data={mockData}
        title={title}
        onChange={onChange}
        preventSelection
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
        onChange={onChange}
        preventSelection={false}
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
        onChange={onChange}
        preventSelection={false}
        actionMenu={true}
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
        onChange={onChange}
        preventSelection={true}
        actionMenu={false}
      />
    )

    expect(
      document
        .querySelector('.dnb-icon')

        .getAttribute('data-testid')
    ).toBe('chevron down icon')

    const event = onChange.mock.calls[0][0]
    const selectedItem = mockData[event.value]
    expect(event.value).toBe(1)
    expect(event.selectedItem).toBe(1)
    expect(event.activeItem).toBe(undefined)
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
        onChange={onChange}
        preventSelection={true}
        actionMenu={false}
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
      (mockData[value] as DrawerListDataArrayObject).selectedValue
    )

    rerender(<Dropdown {...props} value={undefined} data={mockData} />)

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      'Valgmeny'
    )

    value = 3
    rerender(<Dropdown {...props} value={value} data={mockData} />)

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      (mockData[value] as DrawerListDataArrayObject).selectedValue
    )

    rerender(<Dropdown {...props} value={null} data={mockData} />)

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      'Valgmeny'
    )
  })

  it('selects correct value and key', () => {
    const mockData = [
      { selectedKey: 'a', content: 'A value' },
      { selectedKey: 'b', content: 'B value' },
      { selectedKey: 'c', content: 'C value' },
      { selectedKey: 'id-123', content: '123 value' },
      { selectedKey: 'id-456', content: '456 value' },
    ]

    const onChange = jest.fn()

    const { rerender } = render(
      <Dropdown noAnimation data={mockData} onChange={onChange} />
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
    expect(onChange.mock.calls[0][0].data.selectedKey).toBe('a')

    rerender(
      <Dropdown
        noAnimation
        data={mockData}
        onChange={onChange}
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
    expect(onChange.mock.calls[1][0].data.selectedKey).toBe('c')

    rerender(
      <Dropdown
        noAnimation
        data={mockData}
        onChange={onChange}
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
    expect(onChange.mock.calls[2][0].data.selectedKey).toBe('id-456')

    rerender(
      <Dropdown
        noAnimation
        data={mockData}
        onChange={onChange}
        value={123}
      />
    )

    expect(document.querySelector('.dnb-dropdown__text').textContent).toBe(
      'Valgmeny'
    )
  })

  it('has no selected items on using moreMenu', () => {
    const title = 'custom title'
    render(
      <Dropdown
        {...props}
        value={null}
        data={mockData}
        title={title}
        moreMenu
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

  it('has valid onChange callback', () => {
    let selectedItem
    const onChange = jest.fn()
    const onSelect = jest.fn()

    render(
      <Dropdown
        {...props}
        data={mockData}
        onChange={onChange}
        onSelect={onSelect}
      />
    )
    // open first
    open()

    // then simulate changes
    keydown(40) // down

    selectedItem = mockData[(props.value as number) + 1]
    expect(onSelect.mock.calls[0][0].data).toStrictEqual(selectedItem)

    keydown(32) // space

    selectedItem = mockData[(props.value as number) + 1]
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledTimes(2)
    expect(onChange.mock.calls[0][0].data).toStrictEqual(selectedItem)
    expect(onSelect.mock.calls[1][0].data).toStrictEqual(selectedItem)
    expect(onChange).toHaveBeenCalledWith({
      attributes: {},
      isTrusted: false,
      data: selectedItem,
      event: new KeyboardEvent('keydown', {}),
      selectedItem: (props.value as number) + 1,
      value: (props.value as number) + 1,
    })

    // open first
    open()

    // then simulate changes
    keydown(40) // down
    keydown(13) // enter

    selectedItem = mockData[(props.value as number) + 2]
    expect(onChange.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
    expect(onSelect.mock.calls[3][0].data).toStrictEqual(selectedItem) // second call!
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onSelect).toHaveBeenCalledTimes(4)
  })

  it('has valid onChange callback if object was given', () => {
    const onChange = jest.fn()

    render(
      <Dropdown
        {...props}
        data={{ 'en-GB': 'English', 'nb-NO': 'Norsk' }}
        onChange={onChange}
      />
    )

    open()
    keydown(40) // down
    keydown(32) // space

    expect(onChange).toHaveBeenCalledWith({
      attributes: {},
      isTrusted: false,
      data: {
        __id: 0,
        content: 'English',
        selectedKey: 'en-GB',
        type: 'object',
        value: 'en-GB',
      },
      event: new KeyboardEvent('keydown', {}),
      selectedItem: 0,
      value: 'en-GB',
    })

    open()
    keydown(40) // down
    keydown(32) // space

    expect(onChange).toHaveBeenLastCalledWith({
      attributes: {},
      isTrusted: false,
      data: {
        content: 'Norsk',
        selectedKey: 'nb-NO',
        type: 'object',
        value: 'nb-NO',
      },
      event: new KeyboardEvent('keydown', {}),
      selectedItem: 1,
      value: 'nb-NO',
    })

    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('has correct "aria-expanded"', () => {
    render(<Dropdown {...props} data={mockData} />)

    expect(
      document
        .querySelector('span.dnb-dropdown')
        .querySelector('button.dnb-dropdown__trigger')
        .getAttribute('aria-expanded')
    ).toBe('false')

    open()

    const elem = document.querySelector('span.dnb-dropdown')

    expect(
      elem
        .querySelector('button.dnb-dropdown__trigger')
        .getAttribute('aria-expanded')
    ).toBe('true')

    expect(elem.getAttribute('class')).toContain('dnb-dropdown--opened')
  })

  it('has correct "role"', () => {
    render(<Dropdown {...props} data={mockData} />)

    expect(
      document
        .querySelector('span.dnb-dropdown')
        .querySelector('button.dnb-dropdown__trigger')
        .getAttribute('role')
    ).toBe('combobox')
  })

  it('has correct "aria-haspopup"', () => {
    render(<Dropdown {...props} data={mockData} />)

    expect(
      document
        .querySelector('span.dnb-dropdown')
        .querySelector('button.dnb-dropdown__trigger')
        .getAttribute('aria-haspopup')
    ).toBe('listbox')
  })

  it('has correct "aria-haspopup" when actionMenu', () => {
    render(<Dropdown {...props} data={mockData} actionMenu />)

    expect(
      document
        .querySelector('span.dnb-dropdown')
        .querySelector('button.dnb-dropdown__trigger')
        .getAttribute('aria-haspopup')
    ).toBe('true')
  })

  it('has correct "aria-haspopup" when moreMenu', () => {
    render(<Dropdown {...props} data={mockData} moreMenu />)

    expect(
      document
        .querySelector('span.dnb-dropdown')
        .querySelector('button.dnb-dropdown__trigger')
        .getAttribute('aria-haspopup')
    ).toBe('true')
  })

  it('has correct "aria-haspopup" when preventSelection', () => {
    render(<Dropdown {...props} data={mockData} preventSelection />)

    expect(
      document
        .querySelector('span.dnb-dropdown')
        .querySelector('button.dnb-dropdown__trigger')
        .getAttribute('aria-haspopup')
    ).toBe('true')
  })

  it('has correct "role" in options', () => {
    render(
      <Dropdown skipPortal noAnimation opened={true} data={mockData} />
    )

    render(
      <Dropdown skipPortal noAnimation opened={true} data={mockData} />
    )

    expect(
      document
        .querySelector('.dnb-drawer-list__options')
        .getAttribute('role')
    ).toBe('listbox')
  })

  it('has correct "role" in options when actionMenu', () => {
    render(
      <Dropdown
        skipPortal
        noAnimation
        opened={true}
        data={mockData}
        actionMenu
      />
    )

    expect(
      document
        .querySelector('.dnb-drawer-list__options')
        .getAttribute('role')
    ).toBe('menu')
  })

  it('has correct "role" in options when moreMenu', () => {
    render(
      <Dropdown
        skipPortal
        noAnimation
        opened={true}
        data={mockData}
        moreMenu
      />
    )

    expect(
      document
        .querySelector('.dnb-drawer-list__options')
        .getAttribute('role')
    ).toBe('menu')
  })

  it('has correct "role" in options when preventSelection', () => {
    render(
      <Dropdown
        skipPortal
        noAnimation
        opened={true}
        data={mockData}
        preventSelection
      />
    )

    expect(
      document
        .querySelector('.dnb-drawer-list__options')
        .getAttribute('role')
    ).toBe('menu')
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
    const onShow = jest.fn()
    const onHide = jest.fn()
    const params = { 'data-attr': 'value' }
    render(
      <Dropdown
        noAnimation
        onShow={onShow}
        onHide={onHide}
        {...params}
        data={mockData}
      />
    )

    open()

    expect(onShow.mock.calls.length).toBe(1)
    expect(onShow.mock.calls[0][0].attributes).toMatchObject(params)
    expect(onShow).toHaveBeenCalledWith({
      attributes: params,
      data: null,
      ulElement: null,
    })

    // close
    dispatchKeyDown(27) // esc

    expect(onHide.mock.calls.length).toBe(1)
    expect(onHide.mock.calls[0][0].attributes).toMatchObject(params)
    expect(onHide).toHaveBeenCalledWith({
      isTrusted: false,
      attributes: params,
      data: null,
      event: new KeyboardEvent('keydown', {}),
    })

    expect(onShow).toHaveBeenCalledTimes(1)
    expect(onHide).toHaveBeenCalledTimes(1)
  })

  it('has to set correct focus during open and close', async () => {
    const onShow = jest.fn()
    const onHide = jest.fn()
    const onShowFocus = jest.fn()
    const onHideFocus = jest.fn()

    render(
      <Dropdown
        noAnimation
        onShow={onShow}
        onHide={onHide}
        onShowFocus={onShowFocus}
        onHideFocus={onHideFocus}
        data={mockData}
      />
    )

    // 1. open the dropdown
    open()

    expect(onShow).toHaveBeenCalledTimes(1)
    expect(onShow).toHaveBeenCalledWith({
      attributes: {},
      data: null,
      ulElement: null,
    })

    expect(onShowFocus).toHaveBeenCalledTimes(1)
    expect(onShowFocus.mock.calls[0][0].element).toBe(
      document.activeElement
    )

    // 2. close the dropdown with tab
    keydown(9) // tab – because JSDOM does not support keyboard handling, so we cannot check document.activeElement

    // delay because we want to wait to have the DOM focus to be called
    await wait(1)

    expect(onHide).toHaveBeenCalledTimes(1)
    expect(onHide).toHaveBeenCalledWith({
      attributes: {},
      isTrusted: false,
      event: new KeyboardEvent('keydown', {}),
      data: null,
    })
    expect(onHideFocus).toHaveBeenCalledTimes(1)
    expect(onHideFocus.mock.calls[0][0].element).toBe(
      document.querySelector('.dnb-button')
    )
  })

  it('will prevent close if false gets returned from onHide event', () => {
    let preventClose = false
    const onHide = jest.fn(() => !preventClose)
    render(<Dropdown noAnimation onHide={onHide} data={mockData} />)

    // first open
    open()

    expect(document.querySelector('.dnb-dropdown').classList).toContain(
      'dnb-dropdown--opened'
    )

    act(() => {
      // close
      dispatchKeyDown(27) // esc
    })

    expect(onHide.mock.calls.length).toBe(1)

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

    expect(onHide.mock.calls.length).toBe(2)

    // we are still open
    expect(document.querySelector('.dnb-dropdown').classList).toContain(
      'dnb-dropdown--opened'
    )
  })

  it('keeps dialog open when Escape is pressed inside the dropdown', async () => {
    render(
      <Dialog noAnimation openState title="Dialog">
        <Dropdown data={mockData} skipPortal noAnimation opened />
      </Dialog>
    )

    const options = document.querySelector(
      '.dnb-drawer-list__options'
    ) as HTMLElement
    expect(options).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')

    expect(options).not.toBeInTheDocument()
    expect(document.documentElement).toHaveAttribute(
      'data-dnb-modal-active'
    )

    await userEvent.keyboard('{Escape}')

    expect(document.documentElement).not.toHaveAttribute(
      'data-dnb-modal-active'
    )
  })

  it('will not set focus on options when key down/up is pressed on first or last item', async () => {
    const { rerender } = render(
      <Dropdown id="key-nav" noAnimation data={mockData} />
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
    await wait(1)

    expect(document.activeElement.classList).not.toContain(
      'dnb-drawer-list__options'
    )
    expect(document.activeElement.classList).toContain(
      'dnb-drawer-list__option'
    )
    let options = document.querySelectorAll('li.dnb-drawer-list__option')
    expect(options[mockData.length - 1].classList).toContain(
      'dnb-drawer-list__option--focus'
    )

    // then simulate changes
    keydown(40) // down
    await wait(1)

    expect(document.activeElement.classList).not.toContain(
      'dnb-drawer-list__options'
    )

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0].classList // the first item
    ).toContain('dnb-drawer-list__option--focus')

    rerender(
      <Dropdown id="key-nav" noAnimation data={mockData} direction="top" />
    )

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0].classList // the first item
    ).toContain('dnb-drawer-list__option--focus')

    // then simulate changes
    keydown(38) // up
    await wait(1)

    expect(document.activeElement.classList).not.toContain(
      'dnb-drawer-list__options'
    )

    options = document.querySelectorAll('li.dnb-drawer-list__option')
    expect(
      options[mockData.length - 1].classList // the last item
    ).toContain('dnb-drawer-list__option--focus')

    // then simulate changes
    keydown(40) // down
    await wait(1)

    expect(document.activeElement.classList).not.toContain(
      'dnb-drawer-list__options'
    )
    expect(document.activeElement.classList).toContain(
      'dnb-drawer-list__option--focus'
    )

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0].classList // the first item
    ).toContain('dnb-drawer-list__option--focus')
  })

  it('will change the selected value when StrictMode is enabled', () => {
    render(
      <React.StrictMode>
        <Dropdown noAnimation data={mockData} value={props.value} />
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
        .selectedValue
    )
  })

  it('has correct selected value', () => {
    render(<Dropdown {...props} data={mockData} />)
    expect(
      document.querySelector('.dnb-dropdown__text__inner').textContent
    ).toBe(
      (mockData[props.value] as DrawerListDataArrayObject).selectedValue
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
      (mockData[props.value] as DrawerListDataArrayObject).selectedValue
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
    ).toBe((mockData[newValue] as DrawerListDataArrayObject).selectedValue)

    open()

    const options = document.querySelectorAll('li.dnb-drawer-list__option')
    expect(options[newValue].classList).toContain(
      'dnb-drawer-list__option--selected'
    )
    expect(options[newValue].classList).toContain(
      'dnb-drawer-list__option--focus'
    )
  })

  it('has a default value if no value is given', () => {
    const title = 'Make a selection'
    render(<Dropdown data={mockData} title={title} {...mockProps} />)
    expect(
      document.querySelector('.dnb-dropdown__text__inner').innerHTML
    ).toBe(title)
  })

  it('should support title as `React.ReactNode`', () => {
    const TitleAsChildren = ({ children }) => {
      return <span id="title-as-children">{children}</span>
    }

    const TitleAsProp = ({ title }) => {
      return <span id="title-as-prop">{title}</span>
    }

    const { rerender } = render(
      <Dropdown
        data={['A', 'B', 'C']}
        title={<TitleAsChildren>Title as children</TitleAsChildren>}
      />
    )

    expect(
      document.querySelector('#title-as-children')
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-dropdown__text__inner')
    ).toHaveTextContent('Title as children')

    rerender(
      <Dropdown
        data={['A', 'B', 'C']}
        title={<TitleAsProp title="Title as prop" />}
      />
    )

    expect(document.querySelector('#title-as-prop')).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-dropdown__text__inner')
    ).toHaveTextContent('Title as prop')
  })

  it('has correct title', () => {
    render(<Dropdown {...props} data={mockData} />)
    expect(
      document.querySelector('.dnb-dropdown__trigger')
    ).toHaveAttribute(
      'title',
      (mockData[props.value] as DrawerListDataArrayObject).selectedValue
    )
  })

  it('has correct title after new selection', () => {
    render(<Dropdown {...props} data={mockData} />)
    open()

    // then simulate changes
    keydown(40) // down
    expect(
      document.querySelector('.dnb-dropdown__trigger')
    ).toHaveAttribute(
      'title',
      (mockData[props.value] as DrawerListDataArrayObject).selectedValue
    )
  })

  it('has correct title after useEffect value state change', () => {
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
      document.querySelector('.dnb-dropdown__trigger')
    ).toHaveAttribute(
      'title',
      (mockData[newValue] as DrawerListDataArrayObject).selectedValue
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

  it('supports Icon as selectedValue', () => {
    render(
      <Dropdown
        {...props}
        data={[
          {
            selectedKey: 'banking',
            selectedValue: <Icon icon={bank} />,
            content: <Icon icon={bank} />,
          },
        ]}
        value={0}
      />
    )
    expect(
      document.querySelector('.dnb-icon').getAttribute('data-testid')
    ).toBe('bank icon')
  })

  it('supports CountryFlag as selectedValue', () => {
    render(
      <Dropdown
        {...props}
        data={[
          {
            selectedKey: 'norway',
            selectedValue: <CountryFlag iso="NO" />,
            content: <CountryFlag iso="NO" />,
          },
        ]}
        value={0}
      />
    )
    expect(
      document.querySelector('.dnb-country-flag .dnb-sr-only').textContent
    ).toBe('Norge')
  })

  it('has a default title if no value is given', () => {
    const title = 'Make a selection'
    render(<Dropdown data={mockData} title={title} {...mockProps} />)
    expect(
      document.querySelector('.dnb-dropdown__trigger')
    ).toHaveAttribute('title', title)
  })

  it('has correct title when passing a react fragment as selectedValue', () => {
    render(
      <Dropdown
        {...props}
        data={[
          {
            selectedKey: 'test',
            selectedValue: <>my value</>,
            content: 'test',
          },
        ]}
        value={0}
      />
    )
    expect(
      document.querySelector('.dnb-dropdown__trigger')
    ).toHaveAttribute('title', 'my value')
  })

  it('has correct title when passing a react fragment with an Icon as selectedValue', () => {
    render(
      <Dropdown
        {...props}
        data={[
          {
            selectedKey: 'test',
            selectedValue: (
              <>
                <Icon icon={bank} />
                Banking
              </>
            ),
            content: 'test',
          },
        ]}
        value={0}
      />
    )
    expect(
      document.querySelector('.dnb-dropdown__trigger')
    ).toHaveAttribute('title', 'Banking')
  })

  it('has no title when passing an Icon as selectedValue', () => {
    render(
      <Dropdown
        {...props}
        data={[
          {
            selectedKey: 'test',
            selectedValue: <Icon icon={bank} />,
            content: 'test',
          },
        ]}
        value={0}
      />
    )
    expect(
      document.querySelector('.dnb-dropdown__trigger')
    ).not.toHaveAttribute('title')
  })

  it('has correct title when passing a NumberFormat as selectedValue', () => {
    render(
      <Dropdown
        {...props}
        data={[
          {
            selectedKey: 'test',
            selectedValue: <NumberFormat>11345678962</NumberFormat>,
            content: 'test',
          },
        ]}
        value={0}
      />
    )
    expect(
      document.querySelector('.dnb-dropdown__trigger')
    ).toHaveAttribute('title', '11345678962')
  })

  it('should support inline styling', () => {
    render(<Dropdown data={mockData} style={{ color: 'red' }} />)

    expect(
      document.querySelector('.dnb-button').getAttribute('style')
    ).toBe('color: red;')
  })

  it('should support empty data entry', () => {
    render(<Dropdown skipPortal noAnimation data={['']} />)

    expect(
      document.querySelector('button').getAttribute('aria-expanded')
    ).toBe('false')

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
    // @ts-expect-error - Test helper for window resize
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

    expect(dropdown).not.toHaveClass('dnb-dropdown--opened')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(trigger)

    expect(dropdown).toHaveClass('dnb-dropdown--opened')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await userEvent.click(suffix)

    expect(dropdown).not.toHaveClass('dnb-dropdown--opened')
    expect(trigger).not.toHaveAttribute('aria-expanded', 'true')
  })

  it('should set iconPosition to right as default', () => {
    render(<Dropdown />)

    expect(
      document.querySelector('.dnb-dropdown--icon-position-right')
    ).toBeInTheDocument()
  })

  it('should set iconPosition to left', () => {
    render(<Dropdown iconPosition="left" />)

    expect(
      document.querySelector('.dnb-dropdown--icon-position-left')
    ).toBeInTheDocument()
  })

  it('should set iconPosition to right', () => {
    render(<Dropdown iconPosition="right" />)

    expect(
      document.querySelector('.dnb-dropdown--icon-position-right')
    ).toBeInTheDocument()
  })

  it('should set alignDropdown to right as default', () => {
    render(<Dropdown />)

    expect(
      document.querySelector('.dnb-drawer-list--left')
    ).toBeInTheDocument()
  })

  it('should set alignDropdown to right', () => {
    render(<Dropdown alignDropdown="right" />)

    expect(
      document.querySelector('.dnb-drawer-list--right')
    ).toBeInTheDocument()
  })

  it('should set alignDropdown to left', () => {
    render(<Dropdown alignDropdown="left" />)

    expect(
      document.querySelector('.dnb-drawer-list--left')
    ).toBeInTheDocument()
  })

  it('should set alignDropdown to right as default when independentWidth', () => {
    render(<Dropdown independentWidth />)

    expect(
      document.querySelector('.dnb-drawer-list--right')
    ).toBeInTheDocument()
  })

  it('should set alignDropdown to right when independentWidth', () => {
    render(<Dropdown independentWidth alignDropdown="right" />)

    expect(
      document.querySelector('.dnb-drawer-list--right')
    ).toBeInTheDocument()
  })

  it('should set alignDropdown to left when independentWidth', () => {
    render(<Dropdown independentWidth alignDropdown="left" />)

    expect(
      document.querySelector('.dnb-drawer-list--left')
    ).toBeInTheDocument()
  })

  describe('groups', () => {
    beforeEach(() => {
      global.console.log = jest.fn()
    })

    const dataProp: DrawerListDataArray = [
      { groupIndex: 0, content: 'Item 0.1' },
      { groupIndex: 0, content: 'Item 0.2' },
      { groupIndex: 1, content: 'Item 1.1' },
      { groupIndex: 2, content: 'Item 2.1' },
      { groupIndex: 3, content: 'Item 3.1' },
    ]

    const groupsProp: DrawerListGroupTitles = [
      'First',
      'Second',
      'Third',
      'Fourth',
    ]

    it('renders groups', async () => {
      render(
        <Dropdown noAnimation={true} data={dataProp} groups={groupsProp} />
      )

      const trigger = document.querySelector('.dnb-dropdown__trigger')
      await userEvent.click(trigger)

      const groupsUL = document.querySelectorAll('.dnb-drawer-list__group')
      expect(groupsUL.length).toBe(4)
      expect(
        groupsUL[0].querySelector('.dnb-drawer-list__group-title')
          .textContent
      ).toBe('First')
      expect(
        groupsUL[1].querySelector('.dnb-drawer-list__group-title')
          .textContent
      ).toBe('Second')
      expect(
        groupsUL[2].querySelector('.dnb-drawer-list__group-title')
          .textContent
      ).toBe('Third')
      expect(
        groupsUL[3].querySelector('.dnb-drawer-list__group-title')
          .textContent
      ).toBe('Fourth')

      const options = document.querySelectorAll('.dnb-drawer-list__option')
      expect(options.length).toBe(5)

      expect(
        groupsUL[0].querySelectorAll('.dnb-drawer-list__option')[0]
          .textContent
      ).toBe('Item 0.1')
      expect(
        groupsUL[0].querySelectorAll('.dnb-drawer-list__option')[1]
          .textContent
      ).toBe('Item 0.2')
      expect(
        groupsUL[1].querySelectorAll('.dnb-drawer-list__option')[0]
          .textContent
      ).toBe('Item 1.1')
      expect(
        groupsUL[2].querySelectorAll('.dnb-drawer-list__option')[0]
          .textContent
      ).toBe('Item 2.1')
      expect(
        groupsUL[3].querySelectorAll('.dnb-drawer-list__option')[0]
          .textContent
      ).toBe('Item 3.1')
    })

    it('uses default title for groups missing title', async () => {
      render(
        <Dropdown
          noAnimation={true}
          data={dataProp}
          groups={[undefined, undefined, 'Third']}
        />
      )

      const trigger = document.querySelector('.dnb-dropdown__trigger')
      await userEvent.click(trigger)

      const groupsUL = document.querySelectorAll(
        '.dnb-drawer-list__group-title'
      )
      expect(groupsUL.length).toBe(4)

      expect(groupsUL[0].textContent).toBe(nbNO.defaultGroupSR)
      expect(groupsUL[0].classList).toContain('dnb-sr-only')

      expect(groupsUL[1].textContent).toBe(nbNO.missingGroup + ' 2')
      expect(groupsUL[1].classList).not.toContain('dnb-sr-only')

      expect(groupsUL[2].textContent).toBe('Third')
      expect(groupsUL[2].classList).not.toContain('dnb-sr-only')

      expect(groupsUL[3].textContent).toBe(nbNO.missingGroup + ' 4')
      expect(groupsUL[3].classList).not.toContain('dnb-sr-only')

      expect(global.console.log).toHaveBeenCalledTimes(8)
      expect(global.console.log).toHaveBeenLastCalledWith(
        expect.stringContaining('Eufemia'),
        `Missing group title for groupIndex: 3`
      )
    })

    it('adds group for items without group index', async () => {
      render(
        <Dropdown
          noAnimation={true}
          data={[...dataProp, { content: 'Item without groupIndex' }]}
          groups={groupsProp}
        />
      )

      const trigger = document.querySelector('.dnb-dropdown__trigger')
      await userEvent.click(trigger)

      const groups = document.querySelectorAll('.dnb-drawer-list__group')
      expect(groups.length).toBe(5)

      const finalGroupTitle = groups[4].querySelector(
        '.dnb-drawer-list__group-title'
      )
      expect(finalGroupTitle.textContent).toBe(nbNO.noGroupSR)
      expect(finalGroupTitle.classList).toContain('dnb-sr-only')

      const finalGroupItems = groups[4].querySelectorAll(
        '.dnb-drawer-list__option'
      )
      expect(finalGroupItems.length).toBe(1)
      expect(finalGroupItems[0].textContent).toBe(
        'Item without groupIndex'
      )
    })

    it('keyboard navigation', async () => {
      const { rerender } = render(
        <Dropdown
          noAnimation
          data={dataProp}
          groups={groupsProp}
          direction="bottom"
        />
      )

      // first open
      keydown(40) // down
      await wait(1)

      expect(document.querySelector('.dnb-dropdown').classList).toContain(
        'dnb-dropdown--opened'
      )
      expect(
        document.querySelector('.dnb-drawer-list').classList
      ).toContain('dnb-drawer-list--bottom')

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
        document.querySelectorAll('li.dnb-drawer-list__option')[0]
          .classList
      ).toContain('dnb-drawer-list__option--focus')

      // then simulate changes
      keydown(38) // up

      // delay because we want to wait to have the DOM focus to be called
      await wait(1)

      expect(document.activeElement.classList).not.toContain(
        'dnb-drawer-list__options'
      )

      expect(document.activeElement.classList).toContain(
        'dnb-drawer-list__option'
      )
      let options = document.querySelectorAll('li.dnb-drawer-list__option')
      expect(options[dataProp.length - 1].classList).toContain(
        'dnb-drawer-list__option--focus'
      )

      // then simulate changes
      keydown(40) // down
      await wait(1)

      expect(document.activeElement.classList).not.toContain(
        'dnb-drawer-list__options'
      )

      expect(document.activeElement.classList).toContain(
        'dnb-drawer-list__option--focus'
      )

      expect(
        document.querySelectorAll('li.dnb-drawer-list__option')[0]
          .classList // the first item
      ).toContain('dnb-drawer-list__option--focus')

      rerender(
        <Dropdown
          noAnimation
          data={dataProp}
          groups={groupsProp}
          direction="top"
        />
      )

      expect(
        document.querySelector('.dnb-drawer-list').classList
      ).toContain('dnb-drawer-list--top')

      expect(
        document.querySelectorAll('li.dnb-drawer-list__option')[0]
          .classList // the first item
      ).toContain('dnb-drawer-list__option--focus')

      // then simulate changes
      keydown(38) // up
      await wait(1)

      expect(document.activeElement.classList).not.toContain(
        'dnb-drawer-list__options'
      )

      options = document.querySelectorAll('li.dnb-drawer-list__option')
      expect(
        options[dataProp.length - 1].classList // the last item
      ).toContain('dnb-drawer-list__option--focus')

      // then simulate changes
      keydown(40) // down
      // delay because we want to wait to have the DOM focus to be called
      await wait(1)

      expect(document.activeElement.classList).not.toContain(
        'dnb-drawer-list__options'
      )

      expect(
        document.querySelectorAll('li.dnb-drawer-list__option')[0]
          .classList // the first item
      ).toContain('dnb-drawer-list__option--focus')

      // then simulate changes
      keydown(38) // up

      options = document.querySelectorAll('li.dnb-drawer-list__option')
      expect(
        options[dataProp.length - 1].classList // the last item
      ).toContain('dnb-drawer-list__option--focus')

      // then simulate changes
      keydown(38) // up

      options = document.querySelectorAll('li.dnb-drawer-list__option')
      expect(
        options[dataProp.length - 2].classList // the second item
      ).toContain('dnb-drawer-list__option--focus')

      // then simulate changes
      keydown(33) // pageUp

      expect(
        document.querySelectorAll('li.dnb-drawer-list__option')[0]
          .classList // the first item
      ).toContain('dnb-drawer-list__option--focus')

      // then simulate changes
      keydown(38) // up
      // delay because we want to wait to have the DOM focus to be called
      await wait(1)

      expect(document.activeElement.classList).not.toContain(
        'dnb-drawer-list__options'
      )

      options = document.querySelectorAll('li.dnb-drawer-list__option')
      expect(
        options[dataProp.length - 1].classList // the last item
      ).toContain('dnb-drawer-list__option--focus')
    })
  })
})

describe('Dropdown markup', () => {
  it('should validate with ARIA rules', async () => {
    const snapshotProps: DropdownAllProps = {
      title: 'title',
      label: 'label',
      id: 'dropdown-id',
      status: 'status',
      statusState: 'error',
      value: 2,
      opened: true,
      skipPortal: true,
      noAnimation: true,
      variant: 'secondary',
    }

    const CheckComponent = render(
      <Dropdown {...snapshotProps} data={mockData} />
    )

    expect(await axeComponent(CheckComponent)).toHaveNoViolations()
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
