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
} from '../DrawerList'

import {
  mockImplementationForDirectionObserver,
  testDirectionObserver,
} from './DrawerListTestMocks'

mockImplementationForDirectionObserver()

// use no_animation so we don't need to wait
const mockProps: DrawerListAllProps = {
  skip_portal: true,
}

const props: DrawerListAllProps = {
  id: 'drawer-list-id',
  value: 2,
  skip_portal: true,
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
      skip_portal: true,
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

    it('can not be clicked', async () => {
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
        { selected_key: 'key_1', content: 'Content 1' },
        { selected_key: 'key_2', content: 'Content 2' },
        { selected_key: 'key_3', content: 'Content 3' },
      ],
      second: [
        { selected_key: 'key_4', content: 'Content 4' },
        { selected_key: 'key_5', content: 'Content 5' },
      ],
      third: [
        { selected_key: 'key_6', content: 'Content 6' },
        { selected_key: 'key_7', content: 'Content 7' },
        { selected_key: 'key_8', content: 'Content 8' },
      ],
    }

    const getSelectedItem = () =>
      document.querySelector('.dnb-drawer-list__option--selected')

    const { rerender } = render(
      <DrawerList
        opened
        no_animation
        data={data.first}
        value={data.first[0].selected_key}
        {...mockProps}
      />
    )

    expect(getSelectedItem()).toHaveTextContent('Content 1')

    rerender(
      <DrawerList
        opened
        no_animation
        data={data.second}
        value={data.second[1].selected_key}
        {...mockProps}
      />
    )

    expect(getSelectedItem()).toHaveTextContent('Content 5')

    rerender(
      <DrawerList
        opened
        no_animation
        data={data.third}
        value={data.third[2].selected_key}
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
})

describe('DrawerList markup', () => {
  it('should validate with ARIA rules', async () => {
    const snapshotProps: DrawerListAllProps = {
      id: 'drawer-list-id',
      direction: 'bottom',
      value: 2,
      skip_portal: true,
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
