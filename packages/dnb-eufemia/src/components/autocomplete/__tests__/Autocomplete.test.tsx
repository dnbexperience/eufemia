/**
 * Autocomplete Test
 *
 */

import React from 'react'
import { axeComponent, loadScss, wait } from '../../../core/jest/jestSetup'
import * as helpers from '../../../shared/helpers'
import Autocomplete, { AutocompleteAllProps } from '../Autocomplete'
import { SubmitButton } from '../../input/Input'
import { format } from '../../number-format/NumberUtils'
import userEvent from '@testing-library/user-event'
import {
  mockImplementationForDirectionObserver,
  testDirectionObserver,
} from '../../../fragments/drawer-list/__tests__/DrawerListTestMocks'
import {
  fireEvent,
  render,
  act,
  waitFor,
  screen,
} from '@testing-library/react'
import {
  DrawerListData,
  DrawerListDataArrayObject,
  DrawerListDataArray,
  DrawerListGroupTitles,
} from '../../../fragments/drawer-list'
import { Provider } from '../../../shared'
import locales from '../../../shared/locales/nb-NO'

const nbNO = locales['nb-NO'].DrawerList

const mockProps: AutocompleteAllProps = {
  id: 'autocomplete-id',
  no_animation: true, // use no_animation so we don't need to wait
  skip_portal: true,
}
const props: AutocompleteAllProps = {
  id: 'autocomplete-id',
  mode: 'sync',
  value: 1,
  show_submit_button: true,
  no_animation: true,
  skip_portal: true,
}

const mockData: DrawerListDataArray = [
  'AA c',
  'BB cc zethx',
  { content: ['CC', 'cc'] },
]

mockImplementationForDirectionObserver()

describe('Autocomplete component', () => {
  it('has correct word and in-word highlighting', () => {
    render(
      <Autocomplete
        data={['aaa', 'The Godfather the godfather The Godfather', 'ccc']}
        opened
        input_value="the g th"
        {...mockProps}
      />
    )
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0].outerHTML
    ).toBe(
      /* html */ `<li class="first-of-type first-item dnb-drawer-list__option" role="option" tabindex="-1" aria-selected="false" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span class="dnb-drawer-list__option__item"><span><span class="dnb-drawer-list__option__item--highlight">Th</span>e <span class="dnb-drawer-list__option__item--highlight">G</span>odfa<span class="dnb-drawer-list__option__item--highlight">th</span>er <span class="dnb-drawer-list__option__item--highlight">th</span>e <span class="dnb-drawer-list__option__item--highlight">g</span>odfa<span class="dnb-drawer-list__option__item--highlight">th</span>er <span class="dnb-drawer-list__option__item--highlight">Th</span>e <span class="dnb-drawer-list__option__item--highlight">G</span>odfa<span class="dnb-drawer-list__option__item--highlight">th</span>er</span></span></span></li>`
    )
  })

  it('has correct attributes on input', () => {
    render(<Autocomplete data={mockData} opened {...mockProps} />)

    const input = document.querySelector('input')

    expect(input).toHaveAttribute('autocomplete', 'off')
    expect(input).toHaveAttribute('autocapitalize', 'none')
    expect(input).toHaveAttribute('spellcheck', 'false')
    expect(input).toHaveAttribute('autocorrect', 'off')
    expect(input).toHaveAttribute('role', 'combobox')
    expect(input).toHaveAttribute('aria-autocomplete', 'both')
    expect(input).toHaveAttribute('aria-haspopup', 'listbox')
    expect(input).toHaveAttribute('aria-controls', 'autocomplete-id-ul')
    expect(input).toHaveAttribute('aria-expanded', 'true')
    expect(input).toHaveAttribute('name', 'autocomplete-id')

    keyDownOnInput(27) // esc

    expect(input).not.toHaveAttribute('aria-controls')
    expect(input).toHaveAttribute('aria-expanded', 'false')
  })

  it('supports setting autocomplete', () => {
    render(
      <Autocomplete
        data={mockData}
        opened
        autoComplete="language"
        {...mockProps}
      />
    )

    const input = document.querySelector('input')

    expect(input).toHaveAttribute('autocomplete', 'language')
  })

  it('has correct options after filter', () => {
    render(
      <Autocomplete data={mockData} show_submit_button {...mockProps} />
    )

    toggle()

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'aa' },
    })
    expect(
      document.querySelectorAll(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(1)
    expect(
      document.querySelector(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).textContent
    ).toBe(mockData[0])

    // check "cc"
    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'cc' },
    })
    expect(
      document.querySelectorAll(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(2)

    // check "bb cc"
    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'bb cc' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[1])
    expect(
      document.querySelectorAll(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(2)

    // check "aa cc"
    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'aa cc' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[0])

    // check inside words
    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'bb cc th x' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[1])
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0].outerHTML
    ).toBe(
      /* html */ `<li class="first-of-type first-item dnb-drawer-list__option" role="option" tabindex="-1" aria-selected="false" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span class="dnb-drawer-list__option__item"><span><span class="dnb-drawer-list__option__item--highlight">BB</span> <span class="dnb-drawer-list__option__item--highlight">cc</span> ze<span class="dnb-drawer-list__option__item--highlight">thx</span></span></span></span></li>`
    )

    // check "invalid"
    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'invalid' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe('Ingen alternativer')
  })

  it('will set correct width when independent_width is set', async () => {
    const style = {
      getPropertyValue: () => 20,
    } as undefined

    jest.spyOn(window, 'getComputedStyle').mockImplementation(() => style)

    const { rerender } = render(
      <Autocomplete value={1} data={mockData} opened />
    )

    const styleElement = document.querySelector(
      '.dnb-drawer-list__portal__style'
    )

    await waitFor(() => {
      expect(styleElement.getAttribute('style')).toBe(
        'width: 64px; --drawer-list-width: 4rem; top: 0px; left: 0px;'
      )
    })

    rerender(
      <Autocomplete value={1} data={mockData} independent_width opened />
    )

    expect(styleElement.getAttribute('style')).toBe(
      'width: 320px; --drawer-list-width: 20rem; top: 0px; left: 0px;'
    )

    const element = document.querySelector('.dnb-drawer-list')
    expect(Array.from(element.classList)).toContain(
      'dnb-drawer-list--independent-width'
    )
  })

  describe('suffix_value', () => {
    const mockData = [
      {
        selected_value: 'a selected',
        suffix_value: 'a suffix',
        content: '11 aa',
      },
      {
        selected_value: 'b selected',
        suffix_value: <span>b suffix</span>,
        content: '22 bb',
      },
      {
        selected_value: 'c selected',
        suffix_value: 'c suffix',
        content: '22 cc',
      },
    ]

    it('will show suffix_value in options and in input when selected', () => {
      let index = 1

      const { rerender } = render(
        <Autocomplete {...mockProps} value={index} data={mockData} />
      )

      const assertInputValue = () => {
        expect(
          (document.querySelector('.dnb-input__input') as HTMLInputElement)
            .value
        ).toBe(mockData[index].selected_value)
      }

      assertInputValue()

      index = 2
      rerender(
        <Autocomplete {...mockProps} value={index} data={mockData} />
      )

      assertInputValue()

      // open
      keyDownOnInput(40) // down

      expect(
        document
          .querySelectorAll('.dnb-drawer-list__option')[1]
          .querySelector(
            '.dnb-drawer-list__option__item.dnb-drawer-list__option__suffix'
          ).textContent
      ).toBe('b suffix')
      expect(
        document
          .querySelectorAll('.dnb-drawer-list__option')[2]
          .querySelector(
            '.dnb-drawer-list__option__item.dnb-drawer-list__option__suffix'
          ).textContent
      ).toBe(mockData[2].suffix_value)
    })

    it('will not open drawer-list when click on suffix_value and is disabled', () => {
      render(
        <Autocomplete {...mockProps} value={1} data={mockData} disabled />
      )

      fireEvent.click(
        document.querySelector('.dnb-autocomplete__suffix_value')
      )

      expect(
        document.querySelector('.dnb-autocomplete').classList
      ).not.toContain('dnb-autocomplete--opened')

      expect(document.activeElement.tagName).toBe('BODY')
    })

    it('will open drawer-list when click on suffix_value', () => {
      render(<Autocomplete {...mockProps} value={1} data={mockData} />)

      expect(
        document.querySelector('.dnb-autocomplete').classList
      ).not.toContain('dnb-autocomplete--opened')

      fireEvent.click(
        document.querySelector('.dnb-autocomplete__suffix_value')
      )
      expect(
        document.querySelector('.dnb-autocomplete').classList
      ).toContain('dnb-autocomplete--opened')

      expect(document.activeElement.tagName).toBe('INPUT')
    })

    it('has inner id, used to compute form status width, when status and suffix value', () => {
      render(
        <Autocomplete
          data={mockData}
          {...mockProps}
          status="status text"
          status_state="info"
          status_props={{ stretch: true }}
          show_submit_button
          stretch
          value={1}
        />
      )

      expect(
        document.querySelector('.dnb-autocomplete__inner')
      ).toHaveAttribute('id')
    })
  })

  it('keyboard navigation loops', () => {
    render(
      <Autocomplete
        data={mockData}
        {...mockProps}
        value={1}
        show_submit_button
      />
    )
    toggle()

    expect(
      document.querySelectorAll('.dnb-drawer-list__option')[1].classList
    ).toContain('dnb-drawer-list__option--focus')

    keyDownOnInput(38) // up

    expect(
      document.querySelectorAll('.dnb-drawer-list__option')[0].classList
    ).toContain('dnb-drawer-list__option--focus')

    keyDownOnInput(38) // up

    expect(
      document.querySelectorAll('.dnb-drawer-list__option')[2].classList
    ).toContain('dnb-drawer-list__option--focus')

    keyDownOnInput(40) // down

    expect(
      document.querySelectorAll('.dnb-drawer-list__option')[0].classList
    ).toContain('dnb-drawer-list__option--focus')
  })

  describe('id', () => {
    const testAllIds = (id) => {
      // DrawerList specifics
      expect(
        document.querySelector('.dnb-drawer-list').getAttribute('id')
      ).toBe(`${id}-drawer-list`)

      expect(
        document.querySelector('.dnb-drawer-list__list').getAttribute('id')
      ).toBe(`${id}-listbox`)

      expect(
        document
          .querySelector('.dnb-drawer-list__options')
          .getAttribute('id')
      ).toBe(`${id}-ul`)

      expect(
        document
          .querySelector('.dnb-drawer-list__option')
          .getAttribute('id')
      ).toBe(`option-${id}-0`)

      keyDownOnInput(40) // down

      expect(
        document
          .querySelector('.dnb-drawer-list__options')
          .getAttribute('aria-activedescendant')
      ).toBe(`option-${id}-2`)

      expect(
        document.documentElement.getAttribute(
          'data-dnb-drawer-list-active'
        )
      ).toBe(id)

      // Autocomplete specifics
      const input = document.querySelector(
        '.dnb-autocomplete__input .dnb-input__input'
      )
      expect(input.getAttribute('aria-controls')).toBe(`${id}-ul`)
      expect(input.getAttribute('aria-activedescendant')).toBe(
        `option-${id}-2`
      )
      expect(input.getAttribute('aria-describedby')).toBe(
        `${id}-status ${id}-suffix`
      )

      expect(
        document
          .querySelector('.dnb-autocomplete__inner')
          .getAttribute('id')
      ).toBe(`${id}-inner`)

      expect(
        document
          .querySelector('.dnb-autocomplete .dnb-button')
          .getAttribute('id')
      ).toBe(`${id}-submit-button`)

      const formLabel = document.querySelector(
        '.dnb-autocomplete .dnb-form-label'
      )
      expect(formLabel.getAttribute('id')).toBe(`${id}-label`)
      expect(formLabel.getAttribute('for')).toBe(`${id}`)

      expect(
        document
          .querySelector('.dnb-autocomplete .dnb-form-status')
          .getAttribute('id')
      ).toBe(`${id}-form-status`)

      expect(
        document
          .querySelector('.dnb-autocomplete .dnb-form-status__text')
          .getAttribute('id')
      ).toBe(`${id}-status`)

      expect(
        document
          .querySelector('.dnb-autocomplete__suffix')
          .getAttribute('id')
      ).toBe(`${id}-suffix`)
    }

    const idTestProps = {
      data: ['A', { content: 'B', suffix_value: 'suffix B' }, 'C'],
      show_submit_button: true,
      value: 1,
      status: 'status text',
      suffix: 'suffix text',
      label: 'Autocomplete label',
      no_animation: true,
      skip_portal: true,
    }

    it('is same when set', () => {
      render(<Autocomplete {...idTestProps} id="custom-id" />)

      toggle()

      testAllIds('custom-id')
    })

    it('is same when generated', () => {
      render(<Autocomplete {...idTestProps} />)

      toggle()

      const domId = document
        .querySelector('.dnb-drawer-list')
        .getAttribute('id')

      expect(domId.endsWith('-drawer-list')).toBe(true)

      const id = domId.replace('-drawer-list', '')

      expect(id.length).toBeGreaterThan(0)

      testAllIds(id)
    })
  })
  it('has correct options when search_in_word_index is set to 1', () => {
    render(
      <Autocomplete
        data={mockData}
        search_in_word_index="1"
        show_submit_button
        {...mockProps}
      />
    )

    toggle()

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'ethx' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[1])

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'thx' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[1])

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'ethxX' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe('Ingen alternativer')
  })

  it('should update aria-live with results', async () => {
    render(
      <Autocomplete data={mockData} show_submit_button {...mockProps} />
    )

    const inputElement = document.querySelector('.dnb-input__input')

    toggle()

    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, {
      target: { value: 'bb' },
    })

    await wait(2)

    const nodes = document.querySelectorAll('.dnb-sr-only')

    expect(nodes[nodes.length - 1].textContent).toBe('1 alternativer')
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[1])

    fireEvent.change(inputElement, {
      target: { value: 'cc' },
    })

    await wait(2)

    const nodes1 = document.querySelectorAll('.dnb-sr-only')
    expect(nodes1[nodes1.length - 1].textContent).toBe('2 alternativer')
    const content = (mockData[2] as DrawerListDataArrayObject).content
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe((content as string[]).join(''))

    fireEvent.change(inputElement, {
      target: { value: 'c' },
    })

    await wait(2)

    const nodes2 = document.querySelectorAll('.dnb-sr-only')
    expect(nodes2[nodes2.length - 1].textContent).toBe('3 alternativer')
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe((content as string[]).join(''))

    fireEvent.change(inputElement, {
      target: { value: 'invalid' },
    })

    await wait(2)

    const nodes3 = document.querySelectorAll('.dnb-sr-only')
    expect(nodes3[nodes3.length - 1].textContent).toBe(
      'Ingen alternativer'
    )
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe('Ingen alternativer')
  })

  it('will prefer search_content over content', () => {
    const mockData = [
      { content: 'item aa', search_content: ['AA c'] },
      { content: 'item bb', search_content: ['BB cc zethx'] },
      { content: 'item cc', search_content: ['CC', 'cc'] },
      { content: 'item cc second', search_content: ['CC', 'cc', 'more'] },
    ]

    render(
      <Autocomplete data={mockData} show_submit_button {...mockProps} />
    )

    toggle()

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'bb' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0].outerHTML
    ).toBe(
      '<li class="first-of-type first-item dnb-drawer-list__option dnb-drawer-list__option--focus" role="option" tabindex="-1" aria-selected="false" aria-current="true" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span class="dnb-drawer-list__option__item"><span>item <span class="dnb-drawer-list__option__item--highlight">bb</span></span></span></span></li>'
    )

    // First result direction
    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'cc bb' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0].outerHTML
    ).toBe(
      '<li class="first-of-type first-item dnb-drawer-list__option" role="option" tabindex="-1" aria-selected="false" data-item="2" id="option-autocomplete-id-2"><span class="dnb-drawer-list__option__inner"><span class="dnb-drawer-list__option__item"><span>item <span class="dnb-drawer-list__option__item--highlight">cc</span></span></span></span></li>'
    )

    // Second result direction
    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'bb cc' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0].outerHTML
    ).toBe(
      '<li class="first-of-type first-item dnb-drawer-list__option dnb-drawer-list__option--focus" role="option" tabindex="-1" aria-selected="false" aria-current="true" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span class="dnb-drawer-list__option__item"><span>item <span class="dnb-drawer-list__option__item--highlight">bb</span></span></span></span></li>'
    )

    // With three matches, we prioritize the second one to be on the first place
    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'cc bb more' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0].outerHTML
    ).toBe(
      '<li class="first-of-type first-item closest-to-top closest-to-bottom dnb-drawer-list__option" role="option" tabindex="-1" aria-selected="false" data-item="3" id="option-autocomplete-id-3"><span class="dnb-drawer-list__option__inner"><span class="dnb-drawer-list__option__item"><span>item <span class="dnb-drawer-list__option__item--highlight">cc</span> second</span></span></span></li>'
    )

    // Do not find item, as there is defined a search_content
    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'item' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe('Ingen alternativer')
  })

  it('should update aria-live (for VoiceOver support) with selected item', async () => {
    Object.defineProperty(helpers, 'IS_MAC', {
      value: true,
    })

    render(
      <Autocomplete data={mockData} show_submit_button {...mockProps} />
    )

    toggle()

    expect(document.querySelector('.dnb-aria-live').textContent).toBe('')

    // simulate changes
    keyDownOnInput(40) // down

    await waitFor(() => {
      expect(document.querySelector('.dnb-aria-live').textContent).toBe(
        'AA c'
      )
    })

    // simulate changes
    keyDownOnInput(40) // down

    await waitFor(() => {
      expect(document.querySelector('.dnb-aria-live').textContent).toBe(
        'BB cc zethx'
      )
    })

    // simulate changes
    keyDownOnInput(40) // down

    await waitFor(() => {
      expect(document.querySelector('.dnb-aria-live').textContent).toBe(
        'CCcc'
      )
    })

    act(() => {
      dispatchKeyDown(13) // enter
    })

    await waitFor(() => {
      expect(document.querySelector('.dnb-aria-live').textContent).toBe(
        'Valgt: CCcc'
      )
    })

    // simulate changes
    toggle()
    keyDownOnInput(38) // up

    await waitFor(() => {
      expect(document.querySelector('.dnb-aria-live').textContent).toBe(
        'BB cc zethx'
      )
    })

    // eslint-disable-next-line
    Object.defineProperty(helpers, 'IS_MAC', {
      value: false,
    })

    // simulate changes
    keyDownOnInput(38) // up

    expect(document.querySelector('.dnb-aria-live').textContent).toBe('')
  })

  it('should track canRenderAria state for accessibility announcements', async () => {
    render(
      <Autocomplete data={mockData} show_submit_button {...mockProps} />
    )

    // Initially closed - canRenderAria should be false
    const autocompleteElement = document.querySelector('.dnb-autocomplete')
    expect(autocompleteElement.classList).not.toContain(
      'dnb-autocomplete--opened'
    )

    // Open the autocomplete
    fireEvent.mouseDown(document.querySelector('.dnb-input__input'))

    await waitFor(() => {
      expect(autocompleteElement.classList).toContain(
        'dnb-autocomplete--opened'
      )
    })

    // Make a selection to close the autocomplete
    fireEvent.click(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
    )

    await waitFor(() => {
      expect(autocompleteElement.classList).not.toContain(
        'dnb-autocomplete--opened'
      )
    })

    // Check that aria-live elements are present (indicating wasOpen is true)
    // This tests that the component remembers it was open for accessibility
    const ariaLiveElements = document.querySelectorAll('.dnb-aria-live')
    expect(ariaLiveElements.length).toBeGreaterThan(0)
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

    render(
      <Autocomplete data={mockData} show_submit_button {...mockProps} />
    )

    toggle()

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: '*+-/\\' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe('Ingen alternativer')

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'aa' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[0])

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'bb *' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[1])

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'cc +' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[2])

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'dd -' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[3])

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'ee /' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[4])

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'ff \\' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[5])
  })

  it('has correct options when using search_numbers', () => {
    const mockData = [
      format(20001234567, { ban: true }),
      format(22233344425, { ban: true }),
      format(1234.5, { currency: true }),
      format('+47116000', { phone: true }),
    ] as DrawerListData

    render(
      <Autocomplete
        data={mockData}
        search_numbers
        show_submit_button
        {...mockProps}
      />
    )

    toggle()

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: '222333.444' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[1])
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0].outerHTML
    ).toBe(
      /* html */ `<li class="first-of-type first-item dnb-drawer-list__option dnb-drawer-list__option--focus" role="option" tabindex="-1" aria-selected="false" aria-current="true" data-item="1" id="option-autocomplete-id-1"><span class="dnb-drawer-list__option__inner"><span class="dnb-drawer-list__option__item"><span><span class="dnb-drawer-list__option__item--highlight">2223</span> <span class="dnb-drawer-list__option__item--highlight">33</span> <span class="dnb-drawer-list__option__item--highlight">4442</span>5</span></span></span></li>`
    )

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: '222333 444' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[1])

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: '1234' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[2])

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: '00' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[3])
  })

  it('has correct options when using search_numbers, and searching with æøå', () => {
    const mockData = [
      ['Åge Ørn Ærlig', format('12345678901')],
      ["Andrè Ørjåsæter O'Neill", format('12345678901')],
    ] as DrawerListData

    render(
      <Autocomplete
        data={mockData}
        search_numbers
        show_submit_button
        {...mockProps}
      />
    )

    toggle()

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'Åge Ørn Ærlig' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe('Åge Ørn Ærlig12 345 678 901')

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: "Andrè Ørjåsæter O'Neill" },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe("Andrè Ørjåsæter O'Neill12 345 678 901")
  })

  it('has correct options when using search_numbers and search_in_word_index=1', () => {
    const mockData = ['100.222.333,40', '123456', '100 222 444,50']

    render(
      <Autocomplete
        data={mockData}
        show_submit_button
        search_numbers
        search_in_word_index={1}
        {...mockProps}
      />
    )

    toggle()

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: '1002223' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[0])

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: '100,222,3' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[0])

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: '100,222,34' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[0])

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: '1002224' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[2])

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: '1' },
    })
    expect(
      document.querySelectorAll(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(3)

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: '333' },
    })
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe(mockData[0])
  })

  it('has correct options after filter and key interaction', () => {
    render(
      <Autocomplete data={mockData} show_submit_button {...mockProps} />
    )

    const inputElement = document.querySelector('.dnb-input__input')
    const optionElements = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')

    // check "cc"
    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, {
      target: { value: 'cc' },
    })
    const content = (mockData[2] as DrawerListDataArrayObject).content
    expect(optionElements()[0].textContent).toBe(
      (content as string[]).join('')
    )
    expect(
      document.querySelectorAll(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(2)
    expect(
      document.querySelector('li.dnb-drawer-list__option--focus')
    ).not.toBeInTheDocument()

    // then simulate changes
    keyDownOnInput(40) // down

    expect(optionElements()[0].classList).toContain(
      'dnb-drawer-list__option--focus'
    )

    // then simulate changes
    keyDownOnInput(40) // down

    expect(optionElements()[1].classList).toContain(
      'dnb-drawer-list__option--focus'
    )
    expect(
      document
        .querySelectorAll('li.dnb-drawer-list__option')[1]
        .getAttribute('id')
    ).toBe(
      document
        .querySelector('.dnb-input__input')
        .getAttribute('aria-activedescendant')
    )

    // check "cc bb"
    fireEvent.change(inputElement, {
      target: { value: 'cc bb' },
    })
    expect(
      document.querySelectorAll(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(2)
    expect(
      document.querySelector('li.dnb-autocomplete__show-all').textContent
    ).toBe('Vis alt')
    expect(optionElements().length).toBe(3)
    expect(
      document
        .querySelectorAll('li.dnb-drawer-list__option')[1]
        .getAttribute('aria-current')
    ).toBe('true')

    let elem = optionElements()[1]
    expect(elem.textContent).toBe(mockData[1])
    expect(elem.getAttribute('aria-current')).toBe('true')

    // remove selection and reset the order and open again
    // aria-selected should now be on place 1
    keyDownOnInput(27) // esc
    toggle()

    elem = optionElements()[1]
    expect(elem.textContent).toBe(mockData[1])
    expect(elem.getAttribute('aria-current')).toBe('true')
  })

  describe('disable_filter', () => {
    it('has correct options after filter if filter is disabled', () => {
      render(
        <Autocomplete
          disable_filter
          data={mockData}
          show_submit_button
          {...mockProps}
        />
      )

      toggle()

      fireEvent.change(document.querySelector('.dnb-input__input'), {
        target: { value: 'aa' },
      })
      expect(
        document.querySelectorAll(
          'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
        ).length
      ).toBe(3)
    })

    it('should still highlight when disabled', () => {
      render(
        <Autocomplete
          disable_filter
          data={mockData}
          show_submit_button
          {...mockProps}
        />
      )

      toggle()

      fireEvent.change(document.querySelector('.dnb-input__input'), {
        target: { value: 'c' },
      })
      expect(
        document.querySelectorAll(
          'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
        ).length
      ).toBe(3)

      expect(
        document.querySelectorAll(
          'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
        )[0].innerHTML
      ).toBe(
        '<span class="dnb-drawer-list__option__inner"><span class="dnb-drawer-list__option__item"><span>AA <span class="dnb-drawer-list__option__item--highlight">c</span></span></span></span>'
      )
      expect(
        document.querySelectorAll(
          'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
        )[1].innerHTML
      ).toBe(
        '<span class="dnb-drawer-list__option__inner"><span class="dnb-drawer-list__option__item"><span>BB <span class="dnb-drawer-list__option__item--highlight">cc</span> zethx</span></span></span>'
      )
      expect(
        document.querySelectorAll(
          'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
        )[2].innerHTML
      ).toBe(
        '<span class="dnb-drawer-list__option__inner"><span class="dnb-drawer-list__option__item item-nr-1"><span><span class="dnb-drawer-list__option__item--highlight">CC</span></span></span><span class="dnb-drawer-list__option__item item-nr-2"><span><span class="dnb-drawer-list__option__item--highlight">cc</span></span></span></span>'
      )
    })
  })

  it('has correct "aria-expanded"', () => {
    render(<Autocomplete {...props} data={mockData} />)

    keyDownOnInput(13) // enter

    const elem = document.querySelector('.dnb-autocomplete')
    expect(
      elem
        .querySelector(
          'button.dnb-input__submit-button__button:not(.dnb-input__clear-button)'
        )
        .getAttribute('aria-expanded')
    ).toBe('true')
  })

  it('has correct "opened" state on click in input', () => {
    render(<Autocomplete {...mockProps} data={mockData} />)

    fireEvent.mouseDown(document.querySelector('.dnb-input__input'))

    const elem = document.querySelector('.dnb-autocomplete')
    expect(elem.classList).toContain('dnb-autocomplete--opened')

    expect(
      elem.querySelectorAll(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(3)
  })

  it('has correct "opened" state on submit button click', () => {
    render(<Autocomplete {...props} data={mockData} />)

    const submitButton = document.querySelector(
      'button.dnb-input__submit-button__button:not(.dnb-input__clear-button)'
    )
    const elem = document.querySelector('.dnb-autocomplete')

    fireEvent.click(submitButton)

    expect(elem.classList).toContain('dnb-autocomplete--opened')

    fireEvent.click(submitButton)

    expect(elem.classList).not.toContain('dnb-autocomplete--opened')

    fireEvent.keyDown(submitButton, {
      key: 'Enter',
      keyCode: 13,
    })

    expect(elem.classList).toContain('dnb-autocomplete--opened')
  })

  it('has type="button" on submit button', () => {
    render(<Autocomplete {...props} data={mockData} />)

    expect(
      document
        .querySelector('button.dnb-input__submit-button__button')
        .getAttribute('type')
    ).toBe('button')
  })

  it('has correct length of li elements', () => {
    render(<Autocomplete {...props} data={mockData} />)

    toggle()

    expect(
      document.querySelectorAll(
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

    render(
      <Autocomplete
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

    const inputElement = document.querySelector('input')

    inputElement.focus()
    expect(on_focus).toHaveBeenCalledTimes(1)
    expect(on_focus.mock.calls[0][0].attributes).toMatchObject(params)
    expect(document.activeElement.tagName).toBe('INPUT')

    // ensure we focus only once
    inputElement.focus()
    expect(on_focus).toHaveBeenCalledTimes(1)

    fireEvent.blur(inputElement)
    expect(on_blur).toHaveBeenCalledTimes(1)
    expect(on_blur.mock.calls[0][0].attributes).toMatchObject(params)

    // ensure we blur only once
    fireEvent.blur(inputElement)
    expect(on_blur).toHaveBeenCalledTimes(1)

    toggle()
    expect(on_show).toHaveBeenCalledTimes(1)
    expect(on_show.mock.calls[0][0].attributes).toMatchObject(params)
    expect(on_show).toHaveBeenCalledWith({
      attributes: {
        ...params,
        onMouseDown: expect.any(Function),
      },
      data: null,
      ulElement: null,
    })

    keyDownOnInput(27) // esc
    expect(on_hide).toHaveBeenCalledTimes(1)
    expect(on_hide.mock.calls[0][0].attributes).toMatchObject(params)
    expect(on_hide.mock.calls[0][0].event).toEqual(
      new KeyboardEvent('keydown', {})
    )

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).not.toContain('dnb-autocomplete--opened')

    // ensure we blur only once
    fireEvent.blur(inputElement)
    expect(on_blur).toHaveBeenCalledTimes(1)

    toggle()
    expect(on_show).toHaveBeenCalledTimes(2)
    expect(on_show.mock.calls[1][0].attributes).toMatchObject(params)

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).toContain('dnb-autocomplete--opened')

    keyDownOnInput(27) // esc

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).not.toContain('dnb-autocomplete--opened')

    toggle()
    expect(on_show).toHaveBeenCalledTimes(3)
  })

  it('updates its input value if value and data prop changes', async () => {
    const value = 0
    const data = mockData

    const { rerender } = render(<Autocomplete value={value} data={data} />)

    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe(data[value])

    const newValue = 1
    const newData = [...mockData, 'New data']

    rerender(<Autocomplete value={newValue} data={newData} />)

    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe(newData[newValue])
  })

  it('can be reset to null', () => {
    let value: number
    const { rerender } = render(
      <Autocomplete
        {...props}
        placeholder="placeholder"
        value={null}
        data={mockData}
      />
    )

    const inputElement = document.querySelector(
      '.dnb-input__input'
    ) as HTMLInputElement

    expect(inputElement.value).toBe('')
    expect(
      document.querySelector('.dnb-input__placeholder').textContent
    ).toBe('placeholder')

    value = 1
    rerender(
      <Autocomplete
        {...props}
        placeholder="placeholder"
        value={value}
        data={mockData}
      />
    )

    expect(inputElement.value).toBe(mockData[value])

    rerender(
      <Autocomplete
        {...props}
        placeholder="placeholder"
        value={undefined}
        data={mockData}
      />
    )

    expect(inputElement.value).toBe('')

    value = 0
    rerender(
      <Autocomplete
        {...props}
        placeholder="placeholder"
        value={value}
        data={mockData}
      />
    )

    expect(inputElement.value).toBe(mockData[value])

    rerender(
      <Autocomplete
        {...props}
        placeholder="placeholder"
        value={null}
        data={mockData}
      />
    )

    expect(inputElement.value).toBe('')
  })

  it('will invalidate selected_item when selected_key changes', () => {
    const mockData = [
      { selected_key: 'a', content: 'AA c' },
      { selected_key: 'b', content: 'BB cc zethx' },
      { selected_key: 'c', content: ['CC', 'cc'] },
    ]

    const newMockData = [
      { selected_key: 'a', content: 'AA c' },
      { selected_key: 'x', content: 'BB cc changed value' },
      { selected_key: 'c', content: ['CC', 'cc'] },
    ]

    const onTypeHandler = ({ value, updateData }) => {
      if (value === 'c') {
        updateData(newMockData)
      }
    }

    const on_change = jest.fn()
    const on_type = jest.fn(onTypeHandler)

    const { rerender } = render(
      <Autocomplete
        {...mockProps}
        on_change={on_change}
        on_type={on_type}
        data={mockData}
      />
    )

    // 1. Make first a selected_item change
    rerender(
      <Autocomplete
        {...mockProps}
        on_change={on_change}
        on_type={on_type}
        data={mockData}
        value={2}
      />
    )

    expect(document.querySelector('input').value).toBe(
      Array.from(mockData[2].content).join(' ')
    )

    // 2. Then update the data
    rerender(
      <Autocomplete
        {...mockProps}
        on_change={on_change}
        on_type={on_type}
        data={newMockData}
        value={2}
      />
    )

    expect(document.querySelector('input').value).toBe(
      Array.from(newMockData[2].content).join(' ')
    )

    // 3. And change the value again
    rerender(
      <Autocomplete
        {...mockProps}
        on_change={on_change}
        on_type={on_type}
        data={newMockData}
        value={1}
      />
    )

    expect(document.querySelector('input').value).toBe(
      newMockData[1].content
    )

    // Reset data and value
    rerender(
      <Autocomplete
        {...mockProps}
        on_change={on_change}
        on_type={on_type}
        data={mockData}
        value={null}
      />
    )

    expect(document.querySelector('input').value).toBe('')

    fireEvent.focus(document.querySelector('input'))
    fireEvent.change(document.querySelector('input'), {
      target: { value: 'cc' },
    })

    // Make a selection
    fireEvent.click(
      document.querySelectorAll('li.dnb-drawer-list__option')[1]
    )

    expect(document.querySelector('input').value).toBe(mockData[1].content)

    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change.mock.calls[0][0].data).toEqual(mockData[1])

    // Trigger data update
    fireEvent.change(document.querySelector('input'), {
      target: { value: 'c' },
    })

    expect(document.querySelector('input').value).toBe('c')

    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_change.mock.calls[1][0].data).toEqual(undefined)

    fireEvent.focus(document.querySelector('input'))
    fireEvent.change(document.querySelector('input'), {
      target: { value: 'cc' },
    })
    expect(on_type).toHaveBeenCalledTimes(3)

    // Make a selection
    fireEvent.click(
      document.querySelectorAll('li.dnb-drawer-list__option')[1]
    )

    expect(on_change).toHaveBeenCalledTimes(3)
    expect(on_change.mock.calls[2][0].data).toEqual(newMockData[1])
    expect(document.querySelector('input').value).toBe(
      newMockData[1].content
    )
  })

  it('should show "no-options" when in sync mode', async () => {
    const mockData = [
      { selected_key: 'a', content: 'AA c' },
      { selected_key: 'b', content: 'BB cc zethx' },
      { selected_key: 'c', content: ['CC', 'cc'] },
    ]

    render(<Autocomplete {...mockProps} data={mockData} mode="sync" />)

    const inputElement = document.querySelector('input')

    await userEvent.type(inputElement, 'aa')

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')
    ).toHaveLength(2)
    expect(
      document.querySelector('.dnb-autocomplete__no-options')
    ).not.toBeInTheDocument()

    await userEvent.type(inputElement, 'invalid')

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')
    ).toHaveLength(1)
    expect(
      document.querySelector('.dnb-autocomplete__no-options')
    ).toBeInTheDocument()
  })

  it('should not show "no-options" during async mode', async () => {
    const mockData = [
      { selected_key: 'a', content: 'AA c' },
      { selected_key: 'b', content: 'BB cc zethx' },
      { selected_key: 'c', content: ['CC', 'cc'] },
    ]

    render(<Autocomplete {...mockProps} data={mockData} mode="async" />)

    const inputElement = document.querySelector('input')

    await userEvent.type(inputElement, 'aa')

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')
    ).toHaveLength(2)
    expect(
      document.querySelector('.dnb-autocomplete__no-options')
    ).not.toBeInTheDocument()

    await userEvent.type(inputElement, 'invalid')

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')
    ).toHaveLength(2)
    expect(
      document.querySelector('.dnb-autocomplete__no-options')
    ).not.toBeInTheDocument()
  })

  it('should support inline styling', () => {
    render(<Autocomplete data={[]} style={{ color: 'red' }} />)

    expect(
      document.querySelector('.dnb-input__input').getAttribute('style')
    ).toBe('color: red;')
  })

  it('will call on_change on each change, when selecting the first option from different data sources', async () => {
    const mockDataA = [{ selected_key: 'a', content: 'A' }]
    const mockDataB = [{ selected_key: 'b', content: 'B' }]

    const onTypeHandler = ({ value, updateData }) => {
      if (value === 'a') {
        updateData(mockDataA)
      } else if (value === 'b') {
        updateData(mockDataB)
      }
    }

    const on_change = jest.fn()
    const on_type = jest.fn(onTypeHandler)

    render(
      <Autocomplete
        {...mockProps}
        on_change={on_change}
        on_type={on_type}
        data={mockDataA}
        mode="async"
      />
    )

    const inputElement = document.querySelector('input')
    const firstElement = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')[0]

    await userEvent.type(inputElement, 'a')

    expect(on_change).toHaveBeenCalledTimes(0)
    expect(inputElement.value).toBe('a')

    fireEvent.click(firstElement())

    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change.mock.calls[0][0].data).toMatchObject(mockDataA[0])
    expect(inputElement.value).toBe(mockDataA[0].content)

    await userEvent.type(inputElement, '{Backspace}b')

    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_change.mock.calls[1][0].data).toEqual(undefined)
    expect(inputElement.value).toBe('b')

    fireEvent.click(firstElement())

    expect(on_change).toHaveBeenCalledTimes(3)
    expect(on_change.mock.calls[2][0].data).toMatchObject(mockDataB[0])
    expect(inputElement.value).toBe(mockDataB[0].content)

    await userEvent.type(inputElement, '{Backspace}a')

    expect(on_change).toHaveBeenCalledTimes(4)
    expect(on_change.mock.calls[3][0].data).toEqual(undefined)
    expect(inputElement.value).toBe('a')

    fireEvent.click(firstElement())

    expect(on_change).toHaveBeenCalledTimes(5)
    expect(on_change.mock.calls[4][0].data).toMatchObject(mockDataA[0])
    expect(inputElement.value).toBe(mockDataA[0].content)
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
      <Autocomplete
        {...mockProps}
        no_animation
        show_submit_button
        data={mockData}
        on_change={on_change}
      />
    )

    // open first
    toggle()

    const openAndSelectNext = () => {
      // then simulate changes
      keyDownOnInput(40) // down
      act(() => {
        dispatchKeyDown(13) // enter
      })
    }

    openAndSelectNext()

    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe('A value')
    expect(on_change.mock.calls[0][0].data.selected_key).toBe('a')

    rerender(
      <Autocomplete
        {...mockProps}
        no_animation
        show_submit_button
        data={mockData}
        on_change={on_change}
        value="b"
      />
    )

    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe('B value')

    toggle()
    openAndSelectNext()

    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe('C value')
    expect(on_change.mock.calls[1][0].data.selected_key).toBe('c')

    rerender(
      <Autocomplete
        {...mockProps}
        no_animation
        show_submit_button
        data={mockData}
        on_change={on_change}
        value="id-123"
      />
    )

    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe('123 value')

    toggle()
    openAndSelectNext()

    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe('456 value')
    expect(on_change.mock.calls[2][0].data.selected_key).toBe('id-456')

    rerender(
      <Autocomplete
        {...mockProps}
        no_animation
        show_submit_button
        data={mockData}
        on_change={on_change}
        value={123}
      />
    )

    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe('')
  })

  it('should render "selected_value" when set to React.Element', async () => {
    function ValueA() {
      return (
        <span>
          Kontonummer:<span>123456789</span>
        </span>
      )
    }

    function ValueB() {
      return (
        <span>
          Kontonummer:<span> 987654321</span>
        </span>
      )
    }
    function ValueC() {
      return (
        <span>
          <ValueA />
        </span>
      )
    }

    const data = [
      {
        selected_value: <ValueA />,
        content: <ValueA />,
      },
      {
        selected_value: <ValueB />,
        content: <ValueB />,
      },
      {
        selected_value: <ValueC />,
        content: <ValueC />,
      },
    ]

    render(<Autocomplete data={data} />)

    const input = document.querySelector('input')
    const options = () =>
      document.querySelectorAll('.dnb-drawer-list__option')

    expect(input.value).toBeFalsy()

    await userEvent.click(input)
    await userEvent.click(options()[0])

    expect(input.value).toBe('Kontonummer: 123456789')

    await userEvent.click(input)
    await userEvent.click(options()[1])

    expect(input.value).toBe('Kontonummer: 987654321')

    await userEvent.click(input)
    await userEvent.click(options()[2])

    expect(input.value).toBe('Kontonummer: 123456789')
  })

  it('should update input value when data prop goes from emtpy to unempty and value is given', async () => {
    const { rerender } = render(<Autocomplete {...mockProps} data={[]} />)

    const input = document.querySelector('.dnb-input__input')

    expect(input).not.toHaveValue()

    rerender(
      <Autocomplete
        {...mockProps}
        value={1}
        data={[
          {
            selected_value: 'Bedriftskonto',
            content: 'Bedriftskonto',
          },
          {
            selected_value: 'Sparekonto',
            content: 'Sparekonto',
          },
          {
            selected_value: 'Felleskonto',
            content: 'Felleskonto',
          },
        ]}
      />
    )

    expect(input).toHaveValue('Sparekonto')
  })

  describe('should have correct values on input blur', () => {
    it('when no selection is made and "keep_value" and "keep_value_and_selection" is false', async () => {
      const on_change = jest.fn()

      render(
        <Autocomplete
          data={mockData}
          {...mockProps}
          on_change={on_change}
        />
      )

      const inputElement: HTMLInputElement = document.querySelector(
        '.dnb-input__input'
      )
      const optionElements = () =>
        document.querySelectorAll('li.dnb-drawer-list__option')
      const focusElement = () =>
        document.querySelector('li.dnb-drawer-list__option--focus')
      const selectedElement = () =>
        document.querySelector('li.dnb-drawer-list__option--selected')

      // open
      fireEvent.mouseDown(inputElement)

      expect(optionElements().length).toBe(3)

      await userEvent.type(inputElement, 'cc')

      // Make first item active
      keyDownOnInput(40) // down

      expect(inputElement.value).toBe('cc')
      expect(focusElement()).toBeInTheDocument()

      closeAndReopen()

      expect(inputElement.value).toBe('cc')
      expect(focusElement()).not.toBeInTheDocument()
      expect(selectedElement()).not.toBeInTheDocument()

      await userEvent.type(inputElement, 'cc')

      // Make first item active
      keyDownOnInput(40) // down

      expect(focusElement()).toBeInTheDocument()
      expect(selectedElement()).not.toBeInTheDocument()

      fireEvent.blur(inputElement)

      expect(inputElement.value).toBe('cc')

      await wait(1) // because the implementation has a delay here of 1ms

      expect(inputElement.value).toBe('')

      expect(inputElement.value).toBe('')
      expect(focusElement()).not.toBeInTheDocument()
      expect(selectedElement()).not.toBeInTheDocument()
      expect(on_change).toHaveBeenCalledTimes(0)
    })

    it('when a selection is made and "keep_value" and "keep_value_and_selection" is false', async () => {
      const on_change = jest.fn()

      render(
        <Autocomplete
          data={mockData}
          {...mockProps}
          on_change={on_change}
        />
      )

      const inputElement: HTMLInputElement = document.querySelector(
        '.dnb-input__input'
      )

      // open
      fireEvent.mouseDown(inputElement)

      await userEvent.type(inputElement, 'cc')

      keyDownOnInput(40) // down
      dispatchKeyDown(13) // enter

      fireEvent.blur(inputElement)

      expect(inputElement.value).toBe('cc')

      await wait(1) // because the implementation has a delay here of 1ms

      expect(inputElement.value).toBe('CC cc')

      expect(on_change).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          value: 2,
          data: { content: ['CC', 'cc'] },
        })
      )

      fireEvent.focus(inputElement)

      await userEvent.type(inputElement, ' invalid')

      expect(inputElement.value).toBe('CC cc invalid')

      fireEvent.blur(inputElement)

      expect(inputElement.value).toBe('CC cc invalid')

      await wait(1) // because the implementation has a delay here of 1ms

      expect(inputElement.value).toBe('CC cc')

      expect(on_change).toHaveBeenCalledTimes(1)
      expect(on_change).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          value: 2,
          data: { content: ['CC', 'cc'] },
        })
      )
    })

    it('if "keep_value" is true and value is empty', async () => {
      const on_change = jest.fn()

      render(
        <Autocomplete
          keep_value
          data={mockData}
          {...mockProps}
          on_change={on_change}
        />
      )

      const inputElement: HTMLInputElement = document.querySelector(
        '.dnb-input__input'
      )
      const optionElements = () =>
        document.querySelectorAll('li.dnb-drawer-list__option')
      const focusElement = () =>
        document.querySelector('li.dnb-drawer-list__option--focus')
      const selectedElement = () =>
        document.querySelector('li.dnb-drawer-list__option--selected')

      // open
      fireEvent.mouseDown(inputElement)

      expect(optionElements().length).toBe(3)

      fireEvent.focus(inputElement)
      fireEvent.change(inputElement, {
        target: { value: 'cc' },
      })

      // Make first item active
      keyDownOnInput(40) // down

      expect(focusElement()).toBeInTheDocument()

      closeAndReopen()

      expect(focusElement()).toBeInTheDocument()

      fireEvent.change(inputElement, {
        target: { value: '' },
      })

      expect(focusElement()).not.toBeInTheDocument()

      keyDownOnInput(40) // down

      expect(focusElement()).toBeInTheDocument()

      closeAndReopen()

      // This here is what we expect
      expect(focusElement()).not.toBeInTheDocument()

      // This also opens the drawer-list
      fireEvent.change(inputElement, {
        target: { value: 'cc' },
      })

      keyDownOnInput(40) // activate
      dispatchKeyDown(13) // enter

      fireEvent.blur(inputElement)

      await wait(1) // because the implementation has a delay here of 1ms

      expect(inputElement.value).toBe('CC cc')
      expect(on_change).toHaveBeenCalledTimes(1)
      expect(on_change).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          value: 2,
          data: { content: ['CC', 'cc'] },
        })
      )

      fireEvent.change(inputElement, {
        target: { value: '' },
      })

      closeAndReopen()

      expect(focusElement()).not.toBeInTheDocument()
      expect(selectedElement()).not.toBeInTheDocument()

      expect(on_change).toHaveBeenCalledTimes(2)
      expect(on_change).not.toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          value: expect.anything(),
          data: { content: expect.anything() },
        })
      )
    })

    it('if "keep_value_and_selection" is true', async () => {
      const on_change = jest.fn()

      render(
        <Autocomplete
          keep_value_and_selection
          data={mockData}
          {...mockProps}
          on_change={on_change}
        />
      )

      const inputElement = document.querySelector(
        '.dnb-input__input'
      ) as HTMLInputElement
      const optionElements = () =>
        document.querySelectorAll('li.dnb-drawer-list__option')
      const focusElement = () =>
        document.querySelector('li.dnb-drawer-list__option--focus')
      const selectedElement = () =>
        document.querySelector('li.dnb-drawer-list__option--selected')

      // open
      fireEvent.mouseDown(inputElement)

      expect(optionElements().length).toBe(3)

      fireEvent.focus(inputElement)
      fireEvent.change(inputElement, {
        target: { value: 'cc' },
      })

      // Make first item active
      keyDownOnInput(40) // down

      expect(focusElement()).toBeInTheDocument()
      expect(inputElement.value).toBe('cc')

      closeAndReopen()

      expect(focusElement()).not.toBeInTheDocument()
      expect(inputElement.value).toBe('cc')

      fireEvent.change(inputElement, {
        target: { value: '' },
      })

      expect(focusElement()).not.toBeInTheDocument()

      keyDownOnInput(40) // down

      expect(focusElement()).toBeInTheDocument()

      closeAndReopen()

      // This here is what we expect
      expect(focusElement()).not.toBeInTheDocument()
      expect(inputElement.value).toBe('')

      // This also opens the drawer-list
      fireEvent.change(inputElement, {
        target: { value: 'cc' },
      })

      keyDownOnInput(40) // activate
      dispatchKeyDown(13) // enter

      fireEvent.blur(inputElement)

      await wait(1) // because the implementation has a delay here of 1ms

      expect(inputElement.value).toBe('CC cc')

      fireEvent.change(inputElement, {
        target: { value: '' },
      })

      closeAndReopen()

      expect(focusElement()).toBeInTheDocument()
      expect(selectedElement()).toBeInTheDocument()
      expect(inputElement.value).toBe('')

      expect(on_change).toHaveBeenCalledTimes(1)
      expect(on_change).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          value: 2,
          data: { content: ['CC', 'cc'] },
        })
      )
    })

    it('if "keep_election" is true', async () => {
      const on_change = jest.fn()

      render(
        <Autocomplete
          keep_selection
          data={mockData}
          {...mockProps}
          on_change={on_change}
        />
      )

      const inputElement = document.querySelector(
        '.dnb-input__input'
      ) as HTMLInputElement
      const optionElements = () =>
        document.querySelectorAll('li.dnb-drawer-list__option')
      const focusElement = () =>
        document.querySelector('li.dnb-drawer-list__option--focus')
      const selectedElement = () =>
        document.querySelector('li.dnb-drawer-list__option--selected')

      // open
      fireEvent.mouseDown(inputElement)

      expect(optionElements().length).toBe(3)

      fireEvent.focus(inputElement)
      fireEvent.change(inputElement, {
        target: { value: 'cc' },
      })

      // Make first item active
      keyDownOnInput(40) // down

      expect(focusElement()).toBeInTheDocument()
      expect(inputElement.value).toBe('cc')

      closeAndReopen()

      expect(focusElement()).not.toBeInTheDocument()
      expect(inputElement.value).toBe('cc')

      fireEvent.change(inputElement, {
        target: { value: '' },
      })

      expect(focusElement()).not.toBeInTheDocument()

      keyDownOnInput(40) // down

      expect(focusElement()).toBeInTheDocument()

      closeAndReopen()

      // This here is what we expect
      expect(focusElement()).not.toBeInTheDocument()
      expect(inputElement.value).toBe('')

      // This also opens the drawer-list
      fireEvent.change(inputElement, {
        target: { value: 'cc' },
      })

      keyDownOnInput(40) // activate
      dispatchKeyDown(13) // enter

      fireEvent.blur(inputElement)

      await wait(1) // because the implementation has a delay here of 1ms

      expect(inputElement.value).toBe('CC cc')

      fireEvent.change(inputElement, {
        target: { value: '' },
      })

      closeAndReopen()

      expect(focusElement()).toBeInTheDocument()
      expect(selectedElement()).toBeInTheDocument()
      expect(inputElement.value).toBe('')

      expect(on_change).toHaveBeenCalledTimes(1)
      expect(on_change).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          value: 2,
          data: { content: ['CC', 'cc'] },
        })
      )
    })
  })

  it('should have a button for screen readers to open options – regardless', () => {
    render(<Autocomplete {...mockProps} data={mockData} no_animation />)

    const buttonElem = document
      .querySelector('.dnb-sr-only')
      .querySelector('button')

    expect(buttonElem.textContent).toBe(
      'Bla gjennom alternativer, lukk med esc knappen'
    )
    expect(buttonElem).toBeInTheDocument()
    expect(buttonElem.getAttribute('tabindex')).toBe('-1')

    fireEvent.click(buttonElem)

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).toContain('dnb-autocomplete--opened')
    expect(Array.from(document.activeElement.classList)).toContain(
      'dnb-drawer-list__options'
    )

    fireEvent.click(buttonElem)

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).not.toContain('dnb-autocomplete--opened')
    expect(Array.from(document.activeElement.classList)).toContain(
      'dnb-input__input'
    )
  })

  it('should keep input focus when using show-all or select item', () => {
    render(<Autocomplete data={mockData} {...mockProps} />)

    const inputElement = document.querySelector('input')

    fireEvent.keyDown(inputElement, {
      key: 'Enter',
      keyCode: 13,
    })

    inputElement.focus()
    fireEvent.change(inputElement, {
      target: { value: 'cc' },
    })

    expect(Array.from(document.activeElement.classList)).toContain(
      'dnb-input__input'
    )
    expect(
      document.querySelectorAll(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(mockData.length - 1)

    inputElement.focus()

    expect(Array.from(document.activeElement.classList)).toContain(
      'dnb-input__input'
    )

    fireEvent.click(
      document.querySelector('li.dnb-autocomplete__show-all')
    )

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[1].classList
    ).toContain('dnb-drawer-list__option--focus')

    expect(Array.from(document.activeElement.classList)).toContain(
      'dnb-input__input'
    )

    expect(
      document.querySelectorAll(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      ).length
    ).toBe(mockData.length)

    fireEvent.blur(inputElement)
    fireEvent.click(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
    )

    expect(Array.from(document.activeElement.classList)).toContain(
      'dnb-input__input'
    )
  })

  it('has correct "opened" state on input mousedown', () => {
    render(<Autocomplete {...props} data={mockData} />)

    fireEvent.mouseDown(document.querySelector('.dnb-input__input'))

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).toContain('dnb-autocomplete--opened')

    // close
    keyDownOnInput(27) // esc

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).not.toContain('dnb-autocomplete--opened')

    fireEvent.mouseDown(document.querySelector('.dnb-input__input'))

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).toContain('dnb-autocomplete--opened')
  })

  it('will open drawer-list when open_on_focus is set to true', () => {
    const on_focus = jest.fn()
    const on_change = jest.fn()

    render(
      <Autocomplete
        open_on_focus={true}
        on_focus={on_focus}
        on_change={on_change}
        data={mockData}
        {...mockProps}
      />
    )

    fireEvent.focus(document.querySelector('input'))
    expect(on_focus).toHaveBeenCalledTimes(1)

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).toContain('dnb-autocomplete--opened')

    // Make a selection
    fireEvent.click(
      document.querySelectorAll('li.dnb-drawer-list__option')[1]
    )

    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change.mock.calls[0][0].data).toBe('BB cc zethx')
  })

  it('will not open drawer-list when open_on_focus is set to true and data is not valid', () => {
    const on_focus = jest.fn()
    const on_change = jest.fn()

    render(
      <Autocomplete
        open_on_focus={true}
        on_focus={on_focus}
        on_change={on_change}
        {...mockProps}
      />
    )

    fireEvent.focus(document.querySelector('input'))
    expect(on_focus).toHaveBeenCalledTimes(1)

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).not.toContain('dnb-autocomplete--opened')
  })

  it('will prevent close if false gets returned from on_hide event', () => {
    let preventClose = false
    const on_hide = jest.fn(() => !preventClose)
    render(
      <Autocomplete
        on_hide={on_hide}
        data={mockData}
        show_submit_button
        {...mockProps}
      />
    )

    // first open
    toggle()

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).toContain('dnb-autocomplete--opened')

    act(() => {
      // close
      dispatchKeyDown(27)
    })
    expect(on_hide).toHaveBeenCalledTimes(1)

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).not.toContain('dnb-autocomplete--opened')

    // reopen
    toggle()

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).toContain('dnb-autocomplete--opened')

    preventClose = true

    // close again, but with false returned
    act(() => {
      dispatchKeyDown(27)
    })
    expect(on_hide).toHaveBeenCalledTimes(2)

    // we are still open
    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).toContain('dnb-autocomplete--opened')
  })

  it('has no highlighted value by using "disable_highlighting"', () => {
    render(
      <Autocomplete
        mode="async"
        disable_highlighting
        data={mockData}
        show_submit_button
        {...mockProps}
      />
    )

    toggle()

    const result = document
      .querySelectorAll('li.dnb-drawer-list__option')[0]
      .querySelector('.dnb-drawer-list__option__inner').outerHTML

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'aa' },
    })

    expect(
      document
        .querySelectorAll('li.dnb-drawer-list__option')[0]
        .querySelector('.dnb-drawer-list__option__inner').outerHTML
    ).toBe(result)
  })

  it('and new data has to replace all data properly in sync mode', () => {
    const replaceData = ['aaa']

    const { rerender } = render(
      <Autocomplete data={mockData} {...mockProps} />
    )

    keyDownOnInput(40) // down

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'aa' },
    })

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option').length
    ).toBe(2)

    // update data
    rerender(<Autocomplete {...mockProps} data={replaceData} />)

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'a' },
    })

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option').length
    ).toBe(1)
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe('aaa')
  })

  it('and updateData has to replace all data properly in async mode', () => {
    const on_type = jest.fn()
    const replaceData = ['aaa']

    render(
      <Autocomplete
        mode="async"
        disable_filter
        on_type={on_type}
        data={mockData}
        {...mockProps}
      />
    )

    keyDownOnInput(40) // down

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'aa' },
    })

    const callOne = on_type.mock.calls[0][0]
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option').length
    ).toBe(3)
    expect(on_type).toHaveBeenCalledTimes(1)
    expect(callOne.value).toBe('aa')
    expect(callOne.dataList.length).toBe(3)

    act(() => {
      // update data
      callOne.updateData(replaceData)
    })

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'a' },
    })

    const callTwo = on_type.mock.calls[1][0]
    expect(
      document.querySelectorAll('li.dnb-drawer-list__option').length
    ).toBe(1)
    expect(on_type).toHaveBeenCalledTimes(2)
    expect(callTwo.dataList.length).toBe(1)
    expect(callOne.dataList).not.toBe(callTwo.dataList)

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'something' },
    })

    const callThree = on_type.mock.calls[2][0]
    expect(callThree.dataList).toStrictEqual(callTwo.dataList)
  })

  it('will use selected_value as the input value when selected', () => {
    const mockData = [
      { selected_value: 'a value', content: '11 aa' },
      { selected_value: 'b value', content: '22 bb' },
      { selected_value: 'c value', content: '22 cc' },
    ]

    let index = 1

    const { rerender } = render(
      <Autocomplete {...mockProps} value={index} data={mockData} />
    )

    const assert = () => {
      expect(
        (document.querySelector('.dnb-input__input') as HTMLInputElement)
          .value
      ).toBe(mockData[index].selected_value)
    }

    assert()

    index = 2
    rerender(<Autocomplete {...mockProps} value={index} data={mockData} />)

    assert()
  })

  it('will select correct item after updateData', () => {
    const mockData = [
      { selected_value: 'a value', content: '11 aa' },
      { selected_value: 'b value', content: '22 bb' },
      { selected_value: 'c value', content: '22 cc' },
    ]

    const onTypeHandler = ({ updateData }) => {
      updateData(mockData)
    }

    const WithState = () => {
      const [value, setValue] = React.useState(null)

      return (
        <Autocomplete
          {...mockProps}
          mode="async"
          value={value}
          data={mockData}
          show_submit_button
          on_type={onTypeHandler}
          on_change={({ value }) => {
            setValue(value)
          }}
        />
      )
    }
    render(<WithState />)

    toggle()

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: '22' },
    })

    fireEvent.click(
      document.querySelectorAll('li.dnb-drawer-list__option')[1]
    )

    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe('c value')
  })

  it('will filter items with current value after data prop has changed', async () => {
    const mockDataA = ['first', 'foo']
    const mockDataB = ['second', 'bar', 'baz']

    const WithState = () => {
      const [data, setData] = React.useState(mockDataA)

      const onTypeHandler = ({ debounce, ...args }) => {
        debounce(() => {
          args.showIndicator()
          setTimeout(() => {
            args.hideIndicator()
            setData(mockDataB)
          }, 1)
        }, 1)
      }

      return (
        <Autocomplete
          {...mockProps}
          mode="async"
          data={data}
          on_type={onTypeHandler}
          show_submit_button
        />
      )
    }

    render(<WithState />)

    const options = () =>
      document.querySelectorAll(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      )

    toggle()

    expect(options()).toHaveLength(2)

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'first' },
    })

    expect(options()).toHaveLength(1)
    expect(options()[0]).toHaveTextContent('first')
    expect(options()[0].innerHTML).toBe(
      '<span class="dnb-drawer-list__option__inner"><span class="dnb-drawer-list__option__item"><span><span class="dnb-drawer-list__option__item--highlight">first</span></span></span></span>'
    )

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: 'second' },
    })

    await waitFor(() => {
      expect(options()).toHaveLength(1)
      expect(options()[0]).toHaveTextContent('second')
      expect(options()[0].innerHTML).toBe(
        '<span class="dnb-drawer-list__option__inner"><span class="dnb-drawer-list__option__item"><span><span class="dnb-drawer-list__option__item--highlight">second</span></span></span></span>'
      )
    })

    fireEvent.change(document.querySelector('.dnb-input__input'), {
      target: { value: '' },
    })

    expect(options()).toHaveLength(3)
    expect(options()[0]).toHaveTextContent('second')
    expect(options()[0].innerHTML).toBe(
      '<span class="dnb-drawer-list__option__inner"><span class="dnb-drawer-list__option__item">second</span></span>'
    )
    expect(options()[1]).toHaveTextContent('bar')
    expect(options()[2]).toHaveTextContent('baz')
  })

  it('has correct selected value', () => {
    render(<Autocomplete {...props} data={mockData} />)
    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe(mockData[props.value])
  })

  it('has correct selected value after new selection', () => {
    render(<Autocomplete {...props} data={mockData} />)
    toggle()

    // then simulate changes
    keyDownOnInput(40) // down

    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe(mockData[props.value])
  })

  it('has a default title if no value is given', () => {
    const title = 'Make a selection'
    render(
      <Autocomplete
        data={mockData}
        title={title}
        show_submit_button
        {...mockProps}
      />
    )
    expect(
      document.querySelector('.dnb-input__placeholder').textContent
    ).toBe(title)
  })

  it('has a correct value content if we send in a React component', () => {
    const value = 1
    render(
      <Autocomplete
        data={mockData}
        value={value}
        show_submit_button
        {...mockProps}
      />
    )
    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe(mockData[value])
  })

  it('has correct value after useEffect value state change', () => {
    const newValue = 0
    const UpdateValue = () => {
      const [value, setValue] = React.useState(props.value)

      React.useEffect(() => {
        setValue(newValue)
      }, [])

      return <Autocomplete {...props} data={mockData} value={value} />
    }

    render(<UpdateValue />)

    expect(
      (document.querySelector('.dnb-input__input') as HTMLInputElement)
        .value
    ).toBe(mockData[newValue])
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(
      <Autocomplete data={mockData} show_submit_button {...mockProps} />
    )
    rerender(
      <Autocomplete
        data={mockData}
        show_submit_button
        {...mockProps}
        disabled={true}
      />
    )
    expect(
      document.querySelector(
        'button.dnb-input__submit-button__button:not(.dnb-input__clear-button)'
      )
    ).toHaveAttribute('disabled')
    expect(
      document
        .querySelector(
          'button.dnb-input__submit-button__button:not(.dnb-input__clear-button)'
        )
        .querySelector('.dnb-icon')
        .getAttribute('data-testid')
    ).toContain('chevron down')
  })

  it('supports input_element properly', () => {
    const onChange = jest.fn()
    render(
      <Autocomplete
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

    const inputElement = document.querySelector('input')

    expect(inputElement).toBeInTheDocument()
    expect(Array.from(inputElement.classList)).toContain(
      'dnb-autocomplete__input'
    )
    expect(inputElement.getAttribute('aria-label')).toBe('label')

    const value = 'new value'
    fireEvent.change(inputElement, {
      target: { value },
    })
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  const orig = window.requestAnimationFrame
  afterEach(() => {
    window.requestAnimationFrame = orig
  })

  it('will make anchors inside drawer-list item accessible', async () => {
    window.requestAnimationFrame = undefined

    const mockData = [
      'first item',
      [
        <a href="/" className="first-anchor" key="first">
          anchor
        </a>,
        <a href="/" className="second-anchor" key="second">
          anchor
        </a>,
      ],
      'one more item',
    ]

    render(<Autocomplete {...mockProps} data={mockData} />)

    fireEvent.focus(document.querySelector('input'))

    // focus the first item
    keyDownOnInput(40) // down

    // focus the second item
    keyDownOnInput(40) // down

    await userEvent.tab()

    expect(Array.from(document.activeElement.classList)).toContain(
      'first-anchor'
    )

    await userEvent.tab()

    expect(Array.from(document.activeElement.classList)).toContain(
      'second-anchor'
    )
  })

  it('will keep focus on input when opening', () => {
    const mockData = ['first item', 'one more item']

    render(<Autocomplete data={mockData} {...mockProps} />)

    document.querySelector('input').focus()

    // open
    keyDownOnInput(40) // down

    expect(document.activeElement.tagName).toBe('INPUT')
  })

  it('submit_element will replace the internal SubmitButton', () => {
    const { rerender } = render(
      <Autocomplete
        data={mockData}
        {...mockProps}
        submit_element={<SubmitButton icon="bell" />}
      />
    )
    rerender(
      <Autocomplete
        data={mockData}
        {...mockProps}
        submit_element={<SubmitButton icon="bell" />}
        disabled={true}
      />
    )
    expect(
      document.querySelector(
        'button.dnb-input__submit-button__button:not(.dnb-input__clear-button)'
      )
    ).toHaveAttribute('disabled')
    expect(
      document
        .querySelector(
          'button.dnb-input__submit-button__button:not(.dnb-input__clear-button)'
        )
        .querySelector('.dnb-icon')
    ).toBeInTheDocument()

    expect(
      document
        .querySelector(
          'button.dnb-input__submit-button__button:not(.dnb-input__clear-button)'
        )
        .querySelector('.dnb-icon')
        .getAttribute('data-testid')
    ).toContain('bell')
  })

  it('has working direction observer', async () => {
    render(<Autocomplete {...props} data={mockData} />)

    // open first
    fireEvent.click(
      document.querySelector(
        'button.dnb-input__submit-button__button:not(.dnb-input__clear-button)'
      )
    )

    await testDirectionObserver()
  })

  it('has error status when only providing status', () => {
    render(
      <Autocomplete
        data={mockData}
        {...mockProps}
        status="status text"
        show_submit_button
      />
    )

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).toContain('dnb-autocomplete__status--error')
    expect(document.querySelector('.dnb-form-status').classList).toContain(
      'dnb-form-status--error'
    )
    expect(document.querySelector('.dnb-input').classList).toContain(
      'dnb-input__status--error'
    )
    expect(
      document.querySelector('button.dnb-input__submit-button__button')
        .classList
    ).toContain('dnb-button__status--error')
  })

  it('has correct status when status_state is error', () => {
    render(
      <Autocomplete
        data={mockData}
        {...mockProps}
        status="status text"
        status_state="error"
        show_submit_button
      />
    )

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).toContain('dnb-autocomplete__status--error')
    expect(document.querySelector('.dnb-form-status').classList).toContain(
      'dnb-form-status--error'
    )
    expect(document.querySelector('.dnb-input').classList).toContain(
      'dnb-input__status--error'
    )
    expect(
      document.querySelector('button.dnb-input__submit-button__button')
        .classList
    ).toContain('dnb-button__status--error')
  })

  it('has correct status when status_state is info', () => {
    render(
      <Autocomplete
        data={mockData}
        {...mockProps}
        status="status text"
        status_state="info"
        show_submit_button
      />
    )

    expect(
      document.querySelector('.dnb-autocomplete').classList
    ).toContain('dnb-autocomplete__status--info')
    expect(document.querySelector('.dnb-form-status').classList).toContain(
      'dnb-form-status--info'
    )
    expect(document.querySelector('.dnb-input').classList).toContain(
      'dnb-input__status--info'
    )
    expect(
      document.querySelector('button.dnb-input__submit-button__button')
        .classList
    ).toContain('dnb-button__status--info')
  })

  it('should support spacing props', () => {
    render(<Autocomplete top="2rem" />)

    const element = document.querySelector('.dnb-autocomplete')

    expect(element.classList).toContain('dnb-space__top--large')
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ label_direction: 'vertical' }}>
        <Autocomplete label="Label" />
      </Provider>
    )

    const element = document.querySelector('.dnb-autocomplete')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-autocomplete',
      'dnb-form-component',
      'dnb-autocomplete--auto',
      'dnb-autocomplete--vertical',
      'dnb-autocomplete--icon-position-left',
      'dnb-autocomplete--default',
    ])
  })

  it('should set correct value in input', async () => {
    const data = [
      {
        selectedKey: '+93',
        selected_value: 'AF (+93)',
        content: '+93 Afghanistan',
      },
      {
        selectedKey: '+47',
        selected_value: 'NO (+47)',
        content: '+47 Norge',
      },
      {
        selectedKey: '+46',
        selected_value: 'SE (+46)',
        content: '+46 Sverige',
      },
      {
        selectedKey: '+41',
        selected_value: 'CH (+41)',
        content: '+41 Sveits',
      },
    ]

    const MockComponent = () => {
      const [value, setValue] = React.useState('+47')
      const allData = React.useMemo(() => [data[1]], [])

      return (
        <Autocomplete
          data={allData}
          value={value}
          mode="async"
          on_change={({ data }) => {
            setValue(data?.selectedKey)
          }}
          on_focus={({ updateData }) => {
            updateData(data)
          }}
          search_numbers
          no_animation
        />
      )
    }

    render(<MockComponent />)

    const inputElement: HTMLInputElement = document.querySelector('input')
    const items = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')
    const firstItemElement = () => items()[0]
    const mainElement = () => document.querySelector('.dnb-autocomplete')

    expect(inputElement.value).toEqual('NO (+47)')

    // open
    fireEvent.focus(inputElement)
    fireEvent.keyDown(inputElement, {
      key: 'Enter',
      keyCode: 13,
    })

    expect(
      document.querySelector('li.dnb-drawer-list__option--selected')
        .textContent
    ).toBe('+47 Norge')
    expect(items()).toHaveLength(4)

    await userEvent.type(inputElement, '{Backspace}')

    expect(inputElement.value).toEqual('NO (+47')
    expect(firstItemElement().textContent).toBe('+47 Norge')

    await userEvent.type(inputElement, '{Backspace>7}+41')

    expect(inputElement.value).toEqual('+41')
    expect(firstItemElement().textContent).toBe('+41 Sveits')
    expect(items()).toHaveLength(2)

    expect(mainElement().classList).toContain('dnb-autocomplete--opened')

    fireEvent.keyDown(inputElement, {
      key: 'Enter',
      keyCode: 13,
    })

    expect(inputElement.value).toEqual('CH (+41)')
    expect(mainElement().classList).not.toContain(
      'dnb-autocomplete--opened'
    )
  })

  it('should reset value and open drawer on clear button click', async () => {
    render(
      <Autocomplete show_clear_button data={mockData} {...mockProps} />
    )

    const inputElement = document.querySelector(
      '.dnb-input__input'
    ) as HTMLInputElement
    const clearElement = () =>
      document.querySelector('.dnb-input__clear-button')

    // Reset with click
    {
      await userEvent.type(inputElement, 'aa')

      expect(inputElement.value).toBe('aa')
      expect(document.activeElement).toBe(inputElement)

      fireEvent.click(clearElement())

      expect(inputElement.value).toBe('')
      expect(document.activeElement).toBe(inputElement)
    }

    // Reset with keyboard
    {
      await userEvent.type(inputElement, 'bb')

      expect(inputElement.value).toBe('bb')
      expect(document.activeElement).toBe(inputElement)

      await userEvent.type(clearElement(), '{Enter}')

      expect(inputElement.value).toBe('')
      expect(document.activeElement).toBe(inputElement)
    }
  })

  it('should support "preventSelection"', async () => {
    render(<Autocomplete data={mockData} prevent_selection />)

    const input = document.querySelector('input')
    await userEvent.type(input, 'aa')

    expect(input).toHaveValue('aa')

    {
      const options = document.querySelectorAll('[role="option"]')
      expect(options[0]).toHaveTextContent('AA c')
      expect(options[1]).toHaveTextContent('Vis alt')

      await userEvent.click(options[0])
    }

    expect(
      document.querySelector('.dnb-drawer-list__option--selected')
    ).not.toBeInTheDocument()

    await userEvent.click(input)

    expect(
      document.querySelector('.dnb-drawer-list__option--selected')
    ).not.toBeInTheDocument()

    {
      const options = document.querySelectorAll('[role="option"]')
      expect(options[0]).toHaveTextContent('AA c')
      expect(options[1]).toHaveTextContent('Vis alt')
    }
  })

  describe('input blur', () => {
    const mainElement = () => document.querySelector('.dnb-autocomplete')
    const inputElement = () =>
      document.querySelector('.dnb-input__input') as HTMLInputElement
    const inputComponent = () => document.querySelector('.dnb-input')
    const listElement = () =>
      document.querySelector('.dnb-autocomplete__list')
    const optionElement = () =>
      document.querySelector('li.dnb-drawer-list__option')
    const focusElement = () =>
      document.querySelector('li.dnb-drawer-list__option--focus')
    const selectedElement = () =>
      document.querySelector('li.dnb-drawer-list__option--selected')

    it('should emit with empty value', async () => {
      const on_blur = jest.fn()
      const onBlur = jest.fn()

      render(
        <Autocomplete
          on_blur={on_blur}
          onBlur={onBlur}
          data={mockData}
          {...mockProps}
        />
      )

      await userEvent.type(inputElement(), '{Space}')

      expect(mainElement().classList).toContain('dnb-autocomplete--opened')
      expect(optionElement()).toBeInTheDocument()
      expect(focusElement()).not.toBeInTheDocument()
      expect(inputComponent()).toHaveAttribute('data-input-state', 'focus')
      expect(onBlur).toHaveBeenCalledTimes(0)
      expect(on_blur).toHaveBeenCalledTimes(0)

      fireEvent.blur(inputElement())
      keyDownOnInput(13) // enter

      expect(mainElement().classList).not.toContain(
        'dnb-autocomplete--opened'
      )
      expect(inputElement()).toHaveValue('')
      expect(inputComponent()).toHaveAttribute(
        'data-input-state',
        'initial'
      )
      expect(onBlur).toHaveBeenCalledTimes(1)
      expect(on_blur).toHaveBeenCalledTimes(1)
      expect(on_blur).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: '' })
      )
    })

    it('should clear input value', () => {
      render(<Autocomplete data={mockData} {...mockProps} />)

      fireEvent.focus(inputElement())
      keyDownOnInput(13) // enter
      keyDownOnInput(40) // down
      keyDownOnInput(13) // enter

      fireEvent.blur(inputElement())

      expect(inputElement()).toHaveValue('AA c')

      fireEvent.blur(inputElement())

      fireEvent.focus(inputElement())
      fireEvent.change(inputElement(), {
        target: { value: '' },
      })
      fireEvent.blur(inputElement())

      expect(inputElement()).toHaveValue('')
    })

    it('should not emit on submit button press', () => {
      const on_blur = jest.fn()
      const onBlur = jest.fn()

      render(
        <Autocomplete
          show_submit_button
          on_blur={on_blur}
          onBlur={onBlur}
          data={mockData}
          {...mockProps}
        />
      )

      const submitElement = () =>
        document.querySelector(
          'button.dnb-input__submit-button__button:not(.dnb-input__clear-button)'
        )

      fireEvent.focus(inputElement())
      keyDownOnInput(13) // enter

      expect(mainElement().classList).toContain('dnb-autocomplete--opened')

      fireEvent.click(submitElement())

      expect(mainElement().classList).not.toContain(
        'dnb-autocomplete--opened'
      )
      expect(inputComponent()).toHaveAttribute('data-input-state', 'focus')

      fireEvent.click(submitElement())

      expect(mainElement().classList).toContain('dnb-autocomplete--opened')
      expect(inputComponent()).toHaveAttribute('data-input-state', 'focus')
      expect(onBlur).toHaveBeenCalledTimes(0)
      expect(on_blur).toHaveBeenCalledTimes(0)

      fireEvent.blur(inputElement())

      expect(inputComponent()).toHaveAttribute(
        'data-input-state',
        'initial'
      )
      expect(onBlur).toHaveBeenCalledTimes(1)
      expect(on_blur).toHaveBeenCalledTimes(1)
      expect(on_blur).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: '' })
      )
    })

    it('should include custom input value and not emit on input enter key', async () => {
      const on_blur = jest.fn()
      const onBlur = jest.fn()

      render(
        <Autocomplete
          on_blur={on_blur}
          onBlur={onBlur}
          data={mockData}
          {...mockProps}
        />
      )

      fireEvent.focus(inputElement())
      keyDownOnInput(13) // enter

      expect(mainElement().classList).toContain('dnb-autocomplete--opened')

      fireEvent.change(inputElement(), {
        target: { value: 'invalid' },
      })

      expect(optionElement()).toBeInTheDocument()
      expect(focusElement()).not.toBeInTheDocument()
      expect(selectedElement()).not.toBeInTheDocument()

      keyDownOnInput(13) // enter

      expect(mainElement().classList).not.toContain(
        'dnb-autocomplete--opened'
      )
      expect(optionElement()).not.toBeInTheDocument()
      expect(focusElement()).not.toBeInTheDocument()
      expect(selectedElement()).not.toBeInTheDocument()
      expect(inputElement()).toHaveValue('invalid')
      expect(inputComponent()).toHaveAttribute('data-input-state', 'focus')

      expect(onBlur).toHaveBeenCalledTimes(0)
      expect(on_blur).toHaveBeenCalledTimes(0)

      await wait(1) // wait for reserveActivityHandler to stop blocking blur events
      fireEvent.blur(inputElement())

      expect(onBlur).toHaveBeenCalledTimes(1)
      expect(on_blur).toHaveBeenCalledTimes(1)
      expect(on_blur).toHaveBeenLastCalledWith(
        expect.objectContaining({
          value: 'invalid',
          dataList: [
            expect.objectContaining({ content: 'Ingen alternativer' }),
          ],
        })
      )
      expect(inputComponent()).toHaveAttribute(
        'data-input-state',
        'initial'
      )
    })

    it('should not emit on item selection with enter key', async () => {
      const on_blur = jest.fn()
      const onBlur = jest.fn()

      render(
        <Autocomplete
          on_blur={on_blur}
          onBlur={onBlur}
          data={mockData}
          {...mockProps}
        />
      )

      fireEvent.focus(inputElement())
      keyDownOnInput(13) // enter
      keyDownOnInput(40) // down

      expect(mainElement().classList).toContain('dnb-autocomplete--opened')
      expect(optionElement()).toBeInTheDocument()
      expect(focusElement()).toBeInTheDocument()
      expect(selectedElement()).not.toBeInTheDocument()

      fireEvent.keyDown(listElement(), {
        keyCode: 13, // enter
      })

      expect(mainElement().classList).not.toContain(
        'dnb-autocomplete--opened'
      )
      expect(inputElement()).toHaveValue('AA c')

      keyDownOnInput(13) // enter

      expect(mainElement().classList).toContain('dnb-autocomplete--opened')
      expect(optionElement()).toBeInTheDocument()
      expect(focusElement()).toBeInTheDocument()
      expect(selectedElement()).toBeInTheDocument()

      keyDownOnInput(13) // enter

      expect(mainElement().classList).not.toContain(
        'dnb-autocomplete--opened'
      )
      expect(inputComponent()).toHaveAttribute('data-input-state', 'focus')

      await wait(1)

      expect(onBlur).toHaveBeenCalledTimes(0)
      expect(on_blur).toHaveBeenCalledTimes(0)

      fireEvent.blur(inputElement())

      expect(onBlur).toHaveBeenCalledTimes(1)
      expect(on_blur).toHaveBeenCalledTimes(1)
      expect(on_blur).toHaveBeenLastCalledWith(
        expect.objectContaining({
          value: 'AA c',
          dataList: [
            expect.objectContaining({ content: 'AA c' }),
            expect.anything(),
            expect.anything(),
          ],
        })
      )
      expect(inputComponent()).toHaveAttribute(
        'data-input-state',
        'initial'
      )
    })

    it('should not emit on item selection with mouse click', async () => {
      const on_blur = jest.fn()
      const onBlur = jest.fn()

      render(
        <Autocomplete
          on_blur={on_blur}
          onBlur={onBlur}
          data={mockData}
          {...mockProps}
        />
      )

      fireEvent.focus(inputElement())
      keyDownOnInput(13) // enter
      keyDownOnInput(40) // down

      expect(mainElement().classList).toContain('dnb-autocomplete--opened')
      expect(optionElement()).toBeInTheDocument()
      expect(focusElement()).toBeInTheDocument()
      expect(selectedElement()).not.toBeInTheDocument()

      fireEvent.click(focusElement())

      expect(onBlur).toHaveBeenCalledTimes(0)
      expect(on_blur).toHaveBeenCalledTimes(0)

      expect(mainElement().classList).not.toContain(
        'dnb-autocomplete--opened'
      )
      expect(inputComponent()).toHaveAttribute('data-input-state', 'focus')
      expect(inputElement()).toHaveValue('AA c')

      keyDownOnInput(13) // enter

      expect(mainElement().classList).toContain('dnb-autocomplete--opened')
      expect(optionElement()).toBeInTheDocument()
      expect(focusElement()).toBeInTheDocument()
      expect(selectedElement()).toBeInTheDocument()

      keyDownOnInput(13) // enter

      await wait(1)

      expect(mainElement().classList).not.toContain(
        'dnb-autocomplete--opened'
      )
      expect(inputComponent()).toHaveAttribute('data-input-state', 'focus')
      expect(onBlur).toHaveBeenCalledTimes(0)
      expect(on_blur).toHaveBeenCalledTimes(0)

      fireEvent.blur(inputElement())

      expect(onBlur).toHaveBeenCalledTimes(1)
      expect(on_blur).toHaveBeenCalledTimes(1)
      expect(on_blur).toHaveBeenLastCalledWith(
        expect.objectContaining({
          value: 'AA c',
          dataList: [
            expect.objectContaining({ content: 'AA c' }),
            expect.anything(),
            expect.anything(),
          ],
        })
      )
      expect(inputComponent()).toHaveAttribute(
        'data-input-state',
        'initial'
      )
    })

    it('should dismiss focus only on blur', () => {
      const on_change = jest.fn()

      render(
        <Autocomplete
          on_change={on_change}
          data={mockData}
          {...mockProps}
        />
      )

      const inputElement = document.querySelector('input')

      expect(document.querySelector('.dnb-input')).toHaveAttribute(
        'data-input-state',
        'virgin'
      )

      fireEvent.focus(inputElement)

      fireEvent.keyDown(inputElement, {
        key: 'Enter',
        keyCode: 13,
      })

      expect(document.querySelector('.dnb-input')).toHaveAttribute(
        'data-input-state',
        'focus'
      )

      fireEvent.keyDown(inputElement, {
        key: 'Enter',
        keyCode: 13,
      })
    })
  })

  it('gets valid element when input_ref is function', () => {
    const ref: React.MutableRefObject<HTMLInputElement> = React.createRef()

    const refFn = (elem: HTMLInputElement) => {
      ref.current = elem
    }

    render(<Autocomplete id="unique" input_ref={refFn} />)

    expect(ref.current.getAttribute('id')).toBe('unique')
    expect(ref.current.tagName).toBe('INPUT')
  })

  it('should change input value when prop changes', () => {
    const { rerender } = render(<Autocomplete input_value="first value" />)

    const input = document.querySelector('input')

    expect(input.value).toBe('first value')

    rerender(<Autocomplete input_value="second value" />)

    expect(input.value).toBe('second value')
  })

  it('should clear/reset input value when prop changes to empty string', () => {
    const { rerender } = render(<Autocomplete input_value="first value" />)

    const input = document.querySelector('input')

    expect(input.value).toBe('first value')

    rerender(<Autocomplete input_value="" />)

    expect(input.value).toBe('')
  })

  it('should show the whole list when clicking the input after item selection', async () => {
    render(<Autocomplete data={mockData} />)

    const input = document.querySelector('input')

    await userEvent.click(input)

    expect(screen.getAllByRole('option')).toHaveLength(3)

    await userEvent.type(input, 'aa')

    expect(screen.getAllByRole('option')).toHaveLength(2)

    await userEvent.click(screen.getAllByRole('option')[0])
    await userEvent.click(input)

    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('should hide the list if no_options is false and no options are available', async () => {
    render(
      <Autocomplete
        no_options={false}
        data={[
          { selectedKey: 1, content: 'A' },
          { selectedKey: 2, content: 'B' },
          { selectedKey: 3, content: 'C' },
          { selectedKey: 4, content: 'D' },
        ]}
      />
    )

    const input = document.querySelector('input')

    await userEvent.click(input)
    expect(screen.getAllByRole('option')).toHaveLength(4)
    expect(
      document.querySelector('.dnb-drawer-list__options')
    ).toBeInTheDocument()

    await userEvent.type(input, 'A')
    expect(screen.getAllByRole('option')).toHaveLength(2)
    expect(
      document.querySelector('.dnb-drawer-list__options')
    ).toBeInTheDocument()

    await userEvent.type(input, '{Backspace}F')

    expect(
      document.querySelector('.dnb-drawer-list__options')
    ).not.toBeInTheDocument()
  })

  it('should open and search after clearing input following selection', async () => {
    const movies = [
      'The Shawshank Redemption',
      'The Godfather',
      'The Dark Knight',
    ]

    render(<Autocomplete data={movies} {...mockProps} />)

    const input = document.querySelector('input') as HTMLInputElement

    // Open
    await userEvent.click(input)
    expect(screen.getAllByRole('option')).toHaveLength(3)

    // Type to match only Shawshank
    await userEvent.type(input, 'sha')
    expect(screen.getAllByRole('option')[0].textContent).toBe(
      'The Shawshank Redemption'
    )

    // Select the first item by clicking
    await userEvent.click(screen.getAllByRole('option')[0])

    // Ensure it is selected and drawer is closed
    expect(input.value).toBe('The Shawshank Redemption')
    expect(
      document.querySelector('.dnb-drawer-list__options')
    ).not.toBeInTheDocument()

    // Clear input (simulate user erasing the text)
    await userEvent.clear(input)
    expect(input.value).toBe('')

    expect(screen.getAllByRole('option')[0].textContent).toBe(
      'The Shawshank Redemption'
    )

    // Now type a valid query again
    await userEvent.type(input, 'the godfather')

    // Expect the drawer to open and show matching option
    expect(screen.getAllByRole('option')[0].textContent).toBe(
      'The Godfather'
    )

    // And allow selecting it
    await userEvent.click(screen.getAllByRole('option')[0])

    expect(input.value).toBe('The Godfather')
  })

  it('should open and search after clearing input following keyboard selection', async () => {
    const movies = [
      'The Shawshank Redemption',
      'The Godfather',
      'The Dark Knight',
    ]

    render(<Autocomplete data={movies} {...mockProps} />)

    const input = document.querySelector('input') as HTMLInputElement

    // Open and search
    await userEvent.click(input)
    await userEvent.type(input, 'sha')
    expect(screen.getAllByRole('option')[0].textContent).toBe(
      'The Shawshank Redemption'
    )

    // Move focus to list and select with Enter, like other tests do
    keyDownOnInput(13) // enter
    keyDownOnInput(40) // down
    const list = document.querySelector('.dnb-autocomplete__list')
    fireEvent.keyDown(list, { keyCode: 13 }) // enter selects

    // Ensure it is selected and drawer is closed
    expect(input.value).toBe('The Shawshank Redemption')
    expect(
      document.querySelector('.dnb-drawer-list__options')
    ).not.toBeInTheDocument()

    // Clear input and search again
    await userEvent.clear(input)

    expect(screen.getAllByRole('option')[0].textContent).toBe(
      'The Shawshank Redemption'
    )

    await userEvent.type(input, 'the godfather')

    expect(screen.getAllByRole('option')[0].textContent).toBe(
      'The Godfather'
    )
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
        <Autocomplete
          no_animation={true}
          data={dataProp}
          groups={groupsProp}
        />
      )

      const input = document.querySelector(
        '.dnb-autocomplete .dnb-input__input'
      )
      await userEvent.click(input)

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
        <Autocomplete
          no_animation={true}
          data={dataProp}
          groups={[undefined, undefined, 'Third']}
        />
      )

      const input = document.querySelector(
        '.dnb-autocomplete .dnb-input__input'
      )
      await userEvent.click(input)

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

      expect(global.console.log).toHaveBeenCalledTimes(10)
      expect(global.console.log).toHaveBeenLastCalledWith(
        expect.stringContaining('Eufemia'),
        `Missing group title for groupIndex: 3`
      )
    })

    it('adds group for items without group index', async () => {
      render(
        <Autocomplete
          no_animation={true}
          data={[...dataProp, { content: 'Item without groupIndex' }]}
          groups={groupsProp}
        />
      )

      const input = document.querySelector(
        '.dnb-autocomplete .dnb-input__input'
      )
      await userEvent.click(input)

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

    it('has correct options after filter', () => {
      const searchData = [
        { groupIndex: 0, content: 'Abed' },
        { groupIndex: 0, content: 'Better' },
        { groupIndex: 1, content: 'Ask' },
        { groupIndex: 2, content: 'Home Bug' },
        { groupIndex: 3, content: 'Another' },
      ]
      render(
        <Autocomplete
          groups={[undefined, 'One', 'Two']}
          data={searchData}
          show_submit_button
          no_animation={true}
        />
      )

      toggle()

      // First search
      fireEvent.change(document.querySelector('.dnb-input__input'), {
        target: { value: 'A' },
      })

      expect(
        document.querySelectorAll('ul.dnb-drawer-list__group').length
      ).toBe(4)

      let results = document.querySelectorAll(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      )
      expect(results.length).toBe(3)
      expect(results[0].textContent).toBe(searchData[0].content)
      expect(results[1].textContent).toBe(searchData[2].content)
      expect(results[2].textContent).toBe(searchData[4].content)

      expect(
        document.querySelectorAll(
          'li.dnb-drawer-list__option.dnb-autocomplete__show-all'
        ).length
      ).toBe(1)

      // Second search
      fireEvent.change(document.querySelector('.dnb-input__input'), {
        target: { value: 'B' },
      })

      expect(
        document.querySelectorAll('ul.dnb-drawer-list__group').length
      ).toBe(3)

      results = document.querySelectorAll(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      )
      expect(results.length).toBe(2)
      expect(results[0].textContent).toBe(searchData[1].content)
      expect(results[1].textContent).toBe(searchData[3].content)

      expect(
        document.querySelectorAll(
          'li.dnb-drawer-list__option.dnb-autocomplete__show-all'
        ).length
      ).toBe(1)

      // Third search
      fireEvent.change(document.querySelector('.dnb-input__input'), {
        target: { value: 'Be' },
      })

      expect(
        document.querySelectorAll('ul.dnb-drawer-list__group').length
      ).toBe(2)

      results = document.querySelectorAll(
        'li.dnb-drawer-list__option:not(.dnb-autocomplete__show-all)'
      )
      expect(results.length).toBe(1)
      expect(results[0].textContent).toBe(searchData[1].content)

      expect(
        document.querySelectorAll(
          'li.dnb-drawer-list__option.dnb-autocomplete__show-all'
        ).length
      ).toBe(1)

      // Fourth search
      fireEvent.change(document.querySelector('.dnb-input__input'), {
        target: { value: 'None' },
      })

      expect(
        document.querySelectorAll('ul.dnb-drawer-list__group').length
      ).toBe(0)

      const options = document.querySelectorAll(
        'li.dnb-drawer-list__option'
      )
      expect(options.length).toBe(1)
      expect(options[0].classList).toContain(
        'dnb-autocomplete__no-options'
      )
    })
  })
})

describe('Autocomplete markup', () => {
  it('should validate with ARIA rules', async () => {
    const snapshotProps: AutocompleteAllProps = {
      label: 'Autocomplete Label:',
      status: 'status',
      status_state: 'error',
      status_props: null,
      value: 2,
      opened: true,
      show_submit_button: true,
      no_animation: true,
      skip_portal: true,
    }
    const result = render(
      <Autocomplete {...snapshotProps} data={mockData} />
    )

    expect(await axeComponent(result)).toHaveNoViolations()
  })

  it('should have correct aria-activedescendant', async () => {
    render(<Autocomplete {...props} value={undefined} data={mockData} />)

    toggle()

    const ul = document.querySelector('ul.dnb-drawer-list__options')
    const input = document.querySelector(
      '.dnb-autocomplete .dnb-input__input'
    )

    // active descendant should be the first item when no item is focused
    expect(ul.getAttribute('aria-activedescendant')).toEqual(
      `option-${props.id}-0`
    )
    expect(input.getAttribute('aria-activedescendant')).toEqual(
      `option-${props.id}-0`
    )

    keyDownOnInput(40) // down

    // active descendant is still the first item as that is focused now
    await waitFor(() => {
      expect(ul.getAttribute('aria-activedescendant')).toEqual(
        `option-${props.id}-0`
      )
      expect(input.getAttribute('aria-activedescendant')).toEqual(
        `option-${props.id}-0`
      )
    })

    keyDownOnInput(40) // down

    // active descendant is now the second item as that is focused now
    await waitFor(() => {
      expect(ul.getAttribute('aria-activedescendant')).toEqual(
        `option-${props.id}-1`
      )
      expect(input.getAttribute('aria-activedescendant')).toEqual(
        `option-${props.id}-1`
      )
    })
  })
})

describe('Autocomplete scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-autocomplete-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})

const keyDownOnInput = (keyCode) => {
  fireEvent.keyDown(document.querySelector('.dnb-input__input'), {
    keyCode,
  })
}

const dispatchKeyDown = (keyCode) => {
  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      keyCode,
    })
  )
}

const toggle = () => {
  fireEvent.click(
    document.querySelector(
      'button.dnb-input__submit-button__button:not(.dnb-input__clear-button)'
    )
  )
}

const closeAndReopen = () => {
  const input = document.querySelector('.dnb-input__input')
  fireEvent.blur(input)
  fireEvent.focus(input)
  fireEvent.mouseDown(input)
}
