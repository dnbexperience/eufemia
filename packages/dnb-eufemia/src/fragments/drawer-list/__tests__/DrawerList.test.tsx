/**
 * DrawerList Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react'
import DrawerList, {
  DrawerListAllProps,
  DrawerListDataArray,
  DrawerListData,
  DrawerListGroupTitles,
} from '../DrawerList'
import { IsolatedStyleScope } from '../../../shared'

import {
  mockImplementationForDirectionObserver,
  testDirectionObserver,
} from './DrawerListTestMocks'

import locales from '../../../shared/locales/nb-NO'

const nbNO = locales['nb-NO'].DrawerList
mockImplementationForDirectionObserver()

// use no_animation so we don't need to wait
const mockProps: DrawerListAllProps = {}

const props: DrawerListAllProps = {
  id: 'drawer-list-id',
  value: 2,
  opened: true,
  no_animation: true,
}

const mockData: DrawerListDataArray = [
  {
    content: ['1234 56 78901', 'Brukskonto - Kari Nordmann'],
  },
  {
    content: ['1234 56 78902', 'Sparekonto - Ole Nordmann'],
  },
  {
    content: [
      '1134 56 78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    ],
  },
  {
    content: ['1534 96 48901', 'Oppussing - Ole Nordmann'],
  },
  {
    content: <>Custom content {'123'}</>,
  },
  <>Custom content {'123'}</>,
  [<React.Fragment key="key1">Custom content {'123'}</React.Fragment>],
]

describe('DrawerList component', () => {
  it('has correct state at startup', () => {
    render(<DrawerList {...props} data={mockData} />)
    expect(
      document.querySelector('.dnb-drawer-list--opened')
    ).toBeInTheDocument()
  })

  it('should skip portal when skip_portal is set', () => {
    render(<DrawerList {...props} data={mockData} skip_portal />)
    expect(
      document.querySelector('.dnb-drawer-list--opened')
    ).toBeInTheDocument()
    expect(
      document
        .querySelector('.dnb-drawer-list--opened')
        .closest('#eufemia-portal-root')
    ).toBeNull()
  })

  it('should not skip portal when skip_portal is not set', () => {
    render(<DrawerList {...props} data={mockData} />)
    expect(
      document
        .querySelector('.dnb-drawer-list--opened')
        .closest('#eufemia-portal-root')
    ).toBeInTheDocument()
  })

  it('has correct state after changing prop to opened', () => {
    const { rerender } = render(<DrawerList {...props} data={mockData} />)

    expect(
      document.querySelector('.dnb-drawer-list--opened')
    ).toBeInTheDocument()

    rerender(<DrawerList {...props} data={mockData} opened={false} />)
    expect(
      document.querySelector('.dnb-drawer-list--opened')
    ).not.toBeInTheDocument()

    rerender(<DrawerList {...props} data={mockData} opened={true} />)
    expect(
      document.querySelector('.dnb-drawer-list--opened')
    ).toBeInTheDocument()
  })

  describe('with disabled option', () => {
    const disabledOptionProps = {
      opened: true,
      no_animation: true,
      data: [
        { content: 'item 1' },
        { disabled: true, content: 'item 2' },
        { content: 'item 3' },
      ],
    }

    it('has correct attributes', async () => {
      render(<DrawerList {...disabledOptionProps} />)

      const options = document.querySelectorAll('.dnb-drawer-list__option')
      expect(options[1].getAttribute('disabled')).toEqual('')
      expect(options[1].getAttribute('aria-disabled')).toEqual('true')
    })

    it('sends on_select events', async () => {
      const on_select = jest.fn()

      render(<DrawerList {...disabledOptionProps} on_select={on_select} />)

      keydown(40) // down
      await waitFor(() => {
        expect(on_select).toHaveBeenCalledTimes(1)
        expect(on_select.mock.calls[0][0].active_item).toBe(0)
      })

      keydown(40) // down
      await waitFor(() => {
        // on_select is called when navigating to disabled item
        expect(on_select).toHaveBeenCalledTimes(2)
        expect(on_select.mock.calls[1][0].active_item).toBe(1)
        expect(on_select.mock.calls[1][0].data.disabled).toBe(true)
      })

      keydown(40) // down
      await waitFor(() => {
        // navigates to next item
        expect(on_select).toHaveBeenCalledTimes(3)
        expect(on_select.mock.calls[2][0].active_item).toBe(2)
      })
    })

    it('cannot be clicked', async () => {
      const on_change = jest.fn()
      const on_select = jest.fn()

      render(
        <DrawerList
          {...disabledOptionProps}
          on_change={on_change}
          on_select={on_select}
        />
      )

      keydown(40) // down
      keydown(40) // down
      await waitFor(() => {
        // verify item is disabled
        expect(on_select).toHaveBeenCalledTimes(2)
        expect(on_select.mock.calls[1][0].active_item).toBe(1)
        expect(on_select.mock.calls[1][0].data.disabled).toBe(true)
      })

      keydown(13) // enter
      await waitFor(() => {
        // on_change and on_select is not called when attempting to chose a disabled item
        expect(on_change).toHaveBeenCalledTimes(0)
        expect(on_select).toHaveBeenCalledTimes(2)
      })

      await fireEvent.click(
        document.querySelectorAll('.dnb-drawer-list__option')[1]
      )
      await waitFor(() => {
        // on_change and on_select is not called when attempting to click a disabled item
        expect(on_change).toHaveBeenCalledTimes(0)
        expect(on_select).toHaveBeenCalledTimes(2)
      })
    })
  })

  it('handles default_value correctly on forcing re-render', () => {
    const { rerender } = render(
      <DrawerList
        opened
        no_animation
        data={mockData}
        default_value={props.value}
        {...mockProps}
      />
    )
    let elem

    elem = document.querySelectorAll('.dnb-drawer-list__option')[
      props.value
    ]
    expect(elem.classList).toContain('dnb-drawer-list__option--focus')
    expect(elem.classList).toContain('dnb-drawer-list__option--selected')

    // force re-render by prop change
    const title = 'show this attribute now'
    rerender(
      <DrawerList
        opened
        no_animation
        data={mockData}
        default_value={props.value}
        {...mockProps}
        title={title}
      />
    )
    expect(screen.getByTitle(title)).toBeInTheDocument()

    // force re-render with null as value by prop change
    rerender(
      <DrawerList
        opened
        no_animation
        data={mockData}
        default_value={props.value}
        {...mockProps}
        title={title}
        value={(props.value as number) + 1}
      />
    )

    // the selected option got a new position
    elem = document.querySelectorAll('.dnb-drawer-list__option')[
      (props.value as number) + 1
    ]
    expect(elem.classList).toContain('dnb-drawer-list__option--selected')

    // as well as the focus / active state
    expect(elem.classList).toContain('dnb-drawer-list__option--focus')

    // and for sure, the title attribute is still the same
    expect(screen.getByTitle(title)).toBeInTheDocument()
  })

  it('has correct value on key search', async () => {
    const { rerender } = render(<DrawerList {...props} data={mockData} />)

    expect(
      document.querySelector('.dnb-drawer-list__option--focus')
    ).toBeInTheDocument()

    keydown(83) // S

    await waitFor(() => {
      expect(
        Array.from(
          document.querySelectorAll('.dnb-drawer-list__option')[1]
            .classList
        )
      ).toEqual([
        'dnb-drawer-list__option',
        'dnb-drawer-list__option--focus',
      ])
    })

    keydown(70) // F

    // force re-render
    rerender(<DrawerList {...props} data={mockData} />)

    await waitFor(() => {
      expect(
        Array.from(
          document.querySelectorAll('.dnb-drawer-list__option')[2]
            .classList
        )
      ).toEqual([
        'dnb-drawer-list__option',
        'dnb-drawer-list__option--selected',
        'dnb-drawer-list__option--focus',
      ])
    })
  })

  it('has valid on_select callback', async () => {
    const on_select = jest.fn()

    const { rerender } = render(
      <DrawerList
        {...props}
        data={Object.freeze(mockData) as DrawerListDataArray}
        on_select={on_select}
      />
    )

    // select the current
    keydown(32) // space

    const notChangedItem = mockData[props.value]
    await waitFor(() => {
      expect(on_select.mock.calls[0][0].data).toStrictEqual(notChangedItem)
      expect(on_select.mock.calls[0][0].selected_item).toBe(2)
      expect(on_select.mock.calls[0][0].active_item).toBe(2)
    })

    // reset props
    rerender(
      <DrawerList
        {...props}
        data={Object.freeze(mockData) as DrawerListDataArray}
        on_select={on_select}
        opened={null}
      />
    )

    // then open again
    rerender(
      <DrawerList
        {...props}
        data={Object.freeze(mockData) as DrawerListDataArray}
        on_select={on_select}
        opened={true}
      />
    )
    keydown(40) // down
    await waitFor(() => {
      expect(on_select.mock.calls[1][0].selected_item).toBe(undefined)
      expect(on_select.mock.calls[1][0].active_item).toBe(3)

      const selectedItem = mockData[(props.value as number) + 1]
      expect(on_select.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
    })
  })

  it('will set data-dnb-drawer-list-active with id', () => {
    const { rerender } = render(
      <DrawerList {...props} opened={false} data={mockData} />
    )

    rerender(<DrawerList {...props} opened={true} data={mockData} />)

    expect(
      document.documentElement.getAttribute('data-dnb-drawer-list-active')
    ).toBe(props.id)

    rerender(<DrawerList {...props} opened={false} data={mockData} />)

    expect(document.documentElement).not.toHaveAttribute(
      'data-dnb-drawer-list-active'
    )
  })

  it('will unset data-dnb-drawer-list-active on unmount', () => {
    const { rerender, unmount } = render(
      <DrawerList {...props} data={mockData} opened={false} />
    )

    rerender(<DrawerList {...props} data={mockData} opened={true} />)

    expect(
      document.documentElement.getAttribute('data-dnb-drawer-list-active')
    ).toBe(props.id)

    unmount()

    expect(document.documentElement).not.toHaveAttribute(
      'data-dnb-drawer-list-active'
    )
  })

  it('will lock body scroll when enable_body_lock is true', () => {
    const MockComponent = (p) => (
      <DrawerList {...props} data={mockData} enable_body_lock {...p} />
    )

    const { rerender } = render(<MockComponent opened={false} />)

    expect(document.body.getAttribute('style')).toBe(null)

    rerender(<MockComponent opened />)

    expect(document.body.getAttribute('style')).toBe(
      'overflow: hidden; height: auto; box-sizing: border-box; margin-right: 0px;'
    )

    rerender(<MockComponent opened={false} />)

    expect(document.body.getAttribute('style')).toBe('')
  })

  it('has valid on_change callback', async () => {
    const on_change = jest.fn()
    const on_select = jest.fn()

    const { rerender } = render(
      <DrawerList
        {...props}
        data={mockData}
        on_change={on_change}
        on_select={on_select}
      />
    )

    // then simulate changes
    keydown(40) // down
    keydown(32) // space

    await waitFor(() => {
      const selectedItem = mockData[(props.value as number) + 1]
      expect(on_change.mock.calls[0][0].data).toStrictEqual(selectedItem)
      expect(on_select.mock.calls[1][0].data).toStrictEqual(selectedItem)
    })

    rerender(
      <DrawerList
        {...props}
        data={mockData}
        on_change={on_change}
        on_select={on_select}
        opened={null}
      />
    )

    // then open again
    rerender(
      <DrawerList
        {...props}
        data={mockData}
        on_change={on_change}
        on_select={on_select}
        opened={true}
      />
    )

    // then simulate changes
    keydown(40) // down
    keydown(13) // enter

    await waitFor(() => {
      const selectedItem = mockData[(props.value as number) + 2]
      expect(on_change.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
      expect(on_select.mock.calls[3][0].data).toStrictEqual(selectedItem) // second call!
    })
  })

  it('does not fire on_change when selecting the selected item', async () => {
    const on_change = jest.fn()

    render(
      <DrawerList
        {...props}
        value={0}
        data={mockData}
        on_change={on_change}
      />
    )

    // then simulate changes
    keydown(40) // down
    keydown(38) // up
    keydown(32) // space

    await waitFor(() => {
      expect(on_change).toHaveBeenCalledTimes(0)
    })
  })

  it('has correct direction prop', () => {
    const directionTop = 'top'

    const { rerender } = render(
      <DrawerList {...props} data={mockData} direction={directionTop} />
    )

    expect(
      document.querySelector(`.dnb-drawer-list--${directionTop}`)
    ).toBeInTheDocument()

    const directionBottom = 'bottom'
    rerender(
      <DrawerList {...props} data={mockData} direction={directionBottom} />
    )
    expect(
      document.querySelector(`.dnb-drawer-list--${directionBottom}`)
    ).toBeInTheDocument()
  })

  it('will call on_hide after "esc" key', async () => {
    const on_hide = jest.fn()

    render(<DrawerList {...props} data={mockData} on_hide={on_hide} />)

    expect(
      Array.from(document.querySelector('span.dnb-drawer-list').classList)
    ).toEqual([
      'dnb-drawer-list',
      'dnb-drawer-list--bottom',
      'dnb-drawer-list--opened',
      'dnb-drawer-list--triangle-position-left',
      'dnb-drawer-list--left',
      'dnb-drawer-list--default',
      'dnb-drawer-list--scroll',
    ])

    keydown(27) // esc
    expect(on_hide.mock.calls.length).toBe(1)

    await waitFor(() => {
      expect(
        Array.from(
          document.querySelector('span.dnb-drawer-list').classList
        )
      ).toEqual([
        'dnb-drawer-list',
        'dnb-drawer-list--bottom',
        'dnb-drawer-list--hidden',
        'dnb-drawer-list--triangle-position-left',
        'dnb-drawer-list--left',
        'dnb-drawer-list--default',
        'dnb-drawer-list--scroll',
      ])
    })
  })

  it('has correct class modifier "--opened"', () => {
    render(<DrawerList {...props} data={mockData} />)
    const elem = document.querySelector('span.dnb-drawer-list')

    expect(elem.className).toContain('dnb-drawer-list--opened')

    expect(elem.className).not.toContain('dnb-drawer-list--hidden')
  })

  it('has correct length of li elements', () => {
    render(<DrawerList {...props} data={mockData} />)

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option').length
    ).toBe(mockData.length)
  })

  it('has correct value on data given as an object', async () => {
    const on_change = jest.fn()
    const on_select = jest.fn()

    render(
      <DrawerList
        opened
        no_animation
        on_change={on_change}
        on_select={on_select}
        data={() => ({ a: 'A', b: 'B', c: 'C' })}
        {...mockProps}
      />
    )

    // then simulate changes
    keydown(40) // down
    await waitFor(() => {
      expect(on_select.mock.calls[0][0].active_item).toBe(0)
    })

    keydown(13) // enter
    await waitFor(() => {
      expect(on_change.mock.calls[0][0].value).toBe('a')
    })

    // then open again
    keydown(32) // space
    await waitFor(() => {
      expect(on_change).toHaveBeenCalledTimes(1)
      expect(on_select).toHaveBeenCalledTimes(2)
    })
  })

  it('should update and correctly set selected item on data prop change', () => {
    const data: Record<string, DrawerListData> = {
      first: [
        { selectedKey: 'key_1', content: 'Content 1' },
        { selectedKey: 'key_2', content: 'Content 2' },
        { selectedKey: 'key_3', content: 'Content 3' },
      ],
      second: [
        { selectedKey: 'key_4', content: 'Content 4' },
        { selectedKey: 'key_5', content: 'Content 5' },
      ],
      third: [
        { selectedKey: 'key_6', content: 'Content 6' },
        { selectedKey: 'key_7', content: 'Content 7' },
        { selectedKey: 'key_8', content: 'Content 8' },
      ],
    }

    const getSelectedItem = () =>
      document.querySelector('.dnb-drawer-list__option--selected')

    const { rerender } = render(
      <DrawerList
        opened
        no_animation
        data={data.first}
        value={data.first[0].selectedKey}
        {...mockProps}
      />
    )

    expect(getSelectedItem()).toHaveTextContent('Content 1')

    rerender(
      <DrawerList
        opened
        no_animation
        data={data.second}
        value={data.second[1].selectedKey}
        {...mockProps}
      />
    )

    expect(getSelectedItem()).toHaveTextContent('Content 5')

    rerender(
      <DrawerList
        opened
        no_animation
        data={data.third}
        value={data.third[2].selectedKey}
        {...mockProps}
      />
    )

    expect(getSelectedItem()).toHaveTextContent('Content 8')
  })

  it('has to return all additional attributes the event return', () => {
    const on_show = jest.fn()
    const on_hide = jest.fn()
    const params = { 'data-attr': 'value' }

    render(
      <DrawerList
        {...props}
        on_show={on_show}
        on_hide={on_hide}
        {...params}
        data={mockData}
      />
    )

    expect(on_show.mock.calls.length).toBe(1)
    expect(on_show.mock.calls[0][0].attributes).toMatchObject(params)

    keydown(27) // esc
    expect(on_hide.mock.calls.length).toBe(1)
    expect(on_hide.mock.calls[0][0].attributes).toMatchObject(params)
  })

  describe('height calculation', () => {
    it('has given max-height when max_height is set', () => {
      render(<DrawerList {...props} data={mockData} max_height={10} />)

      expect(
        document
          .querySelector('.dnb-drawer-list__options')
          .getAttribute('style')
      ).toBe('max-height: 10rem;')
    })

    it('has correct max-height with direction top', () => {
      jest
        .spyOn(document.documentElement, 'clientHeight', 'get')
        .mockImplementationOnce(() => 100)

      let count = 0
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        get() {
          if (this.classList.contains('dnb-drawer-list__root')) {
            count++
            switch (count) {
              case 1:
                return 300
              default:
                return 200
            }
          }
        },
      })

      const directionTop = 'top'
      render(
        <DrawerList {...props} data={mockData} direction={directionTop} />
      )

      expect(
        document
          .querySelector('.dnb-drawer-list__options')
          .getAttribute('style')
      ).toBe('max-height: 4rem;')
    })

    it('has correct max-height with direction bottom', () => {
      jest
        .spyOn(document.documentElement, 'clientHeight', 'get')
        .mockImplementationOnce(() => 300)

      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        get() {
          if (this.classList.contains('dnb-drawer-list__root')) {
            return 200
          }
        },
      })

      const directionTop = 'bottom'

      render(
        <DrawerList {...props} data={mockData} direction={directionTop} />
      )

      expect(
        document
          .querySelector('.dnb-drawer-list__options')
          .getAttribute('style')
      ).toBe('max-height: 4rem;')
    })
  })

  describe('direction observer', () => {
    it('should results in correct direction', async () => {
      render(<DrawerList {...props} data={mockData} />)
      await testDirectionObserver()
    })
  })

  describe('inline style', () => {
    it('sets correct styling using data object', () => {
      render(
        <DrawerList
          {...props}
          data={[
            {
              content: 'content',
              style: { hyphens: 'auto' },
            },
          ]}
        />
      )

      expect(
        document
          .querySelector('li.dnb-drawer-list__option')
          .getAttribute('style')
      ).toBe('hyphens: auto;')
    })

    it('sets correct style using DrawerList.Item', () => {
      render(
        <DrawerList {...props}>
          <DrawerList.Options>
            <DrawerList.Item
              style={{ hyphens: 'auto' }}
              key="A"
              selected={false}
              value="A"
              on_click={() => {
                console.log('on_click')
              }}
            >
              Content
            </DrawerList.Item>
          </DrawerList.Options>
        </DrawerList>
      )

      expect(
        document
          .querySelector('li.dnb-drawer-list__option')
          .getAttribute('style')
      ).toBe('hyphens: auto;')
    })

    it('sets correct style using DrawerList.HorizontalItem', () => {
      render(
        <DrawerList {...props}>
          <DrawerList.Options>
            <DrawerList.HorizontalItem style={{ hyphens: 'auto' }}>
              Content
            </DrawerList.HorizontalItem>
          </DrawerList.Options>
        </DrawerList>
      )

      expect(
        document
          .querySelector('span.dnb-drawer-list__option__item')
          .getAttribute('style')
      ).toBe('hyphens: auto;')
    })
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

    it('renders groups', () => {
      render(
        <DrawerList
          opened={true}
          no_animation={true}
          data={dataProp}
          groups={groupsProp}
        />
      )

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

    it('uses default title for groups missing title', () => {
      render(
        <DrawerList
          opened={true}
          no_animation={true}
          data={dataProp}
          groups={[undefined, undefined, 'Third']}
        />
      )

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

      expect(global.console.log).toHaveBeenCalledTimes(6)
      expect(global.console.log).toHaveBeenLastCalledWith(
        expect.stringContaining('Eufemia'),
        `Missing group title for groupIndex: 3`
      )
    })

    it('adds group for items without group index', () => {
      render(
        <DrawerList
          opened={true}
          no_animation={true}
          data={[...dataProp, { content: 'Item without groupIndex' }]}
          groups={groupsProp}
        />
      )

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
  })
})

describe('DrawerList markup', () => {
  it('should validate with ARIA rules', async () => {
    const snapshotProps: DrawerListAllProps = {
      id: 'drawer-list-id',
      direction: 'bottom',
      value: 2,
      opened: true,
      no_animation: true,
      size: 'default',
    }

    const result = render(
      <DrawerList {...snapshotProps} data={mockData} />
    )
    expect(
      await axeComponent(result, {
        rules: {
          'aria-input-field-name': { enabled: false },
          'aria-required-children': { enabled: false },
        },
      })
    ).toHaveNoViolations()
  })
})

describe('DrawerList portal', () => {
  it('will set correct width when independent_width is set', async () => {
    const style = {
      getPropertyValue: () => 20,
    } as undefined

    jest.spyOn(window, 'getComputedStyle').mockImplementation(() => style)

    const { rerender } = render(<DrawerList opened no_animation />)

    const styleElement = document.querySelector(
      '.dnb-drawer-list__portal__style'
    )

    await waitFor(() => {
      expect(styleElement.getAttribute('style')).toBe(
        'width: 64px; --drawer-list-width: 4rem; top: 0px; left: 0px;'
      )
    })

    rerender(<DrawerList opened no_animation independent_width />)

    expect(styleElement.getAttribute('style')).toBe(
      'width: 320px; --drawer-list-width: 20rem; top: 0px; left: 0px;'
    )

    const element = document.querySelector('.dnb-drawer-list')
    expect(Array.from(element.classList)).toContain(
      'dnb-drawer-list--independent-width'
    )
  })

  it('will set correct width when independent_width is set and isolated style scope is used', async () => {
    const style = {
      getPropertyValue: () => 20,
    } as undefined

    jest.spyOn(window, 'getComputedStyle').mockImplementation(() => style)

    const { rerender } = render(
      <IsolatedStyleScope>
        <DrawerList opened no_animation />
      </IsolatedStyleScope>
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
      <IsolatedStyleScope>
        <DrawerList opened no_animation independent_width />
      </IsolatedStyleScope>
    )

    expect(styleElement.getAttribute('style')).toBe(
      'width: 320px; --drawer-list-width: 20rem; top: 0px; left: 0px;'
    )

    const element = document.querySelector('.dnb-drawer-list')
    expect(Array.from(element.classList)).toContain(
      'dnb-drawer-list--independent-width'
    )
  })
})

describe('DrawerList scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-drawer-list-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})

const keydown = (keyCode) => {
  act(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode }))
  })
}
