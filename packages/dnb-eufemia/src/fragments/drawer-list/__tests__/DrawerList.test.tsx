/**
 * DrawerList Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { act, render, screen, waitFor } from '@testing-library/react'
import DrawerList, {
  DrawerListProps,
  DrawerListDataObjectUnion,
} from '../DrawerList'

import {
  mockImplementationForDirectionObserver,
  testDirectionObserver,
} from './DrawerListTestMocks'

mockImplementationForDirectionObserver()

// use no_animation so we don't need to wait
const mockProps: DrawerListProps = {
  skip_portal: true,
}

const props: DrawerListProps = {
  id: 'drawer-list-id',
  value: 2,
  skip_portal: true,
  opened: true,
  no_animation: true,
}

const mockData: DrawerListDataObjectUnion[] = [
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
        data={Object.freeze(mockData) as DrawerListDataObjectUnion}
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
        data={Object.freeze(mockData) as DrawerListDataObjectUnion}
        on_select={on_select}
        opened={null}
      />
    )

    // then open again
    rerender(
      <DrawerList
        {...props}
        data={Object.freeze(mockData) as DrawerListDataObjectUnion}
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
      expect(on_change).toBeCalledTimes(0)
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

    expect(
      document
        .querySelector('.dnb-drawer-list__options')
        .getAttribute('style')
    ).toBe('max-height: 33.5rem;')
  })

  it('has working direction observer', async () => {
    render(<DrawerList {...props} data={mockData} />)
    await testDirectionObserver()
  })

  it('will call on_hide after "esc" key', async () => {
    const on_hide = jest.fn()

    render(<DrawerList {...props} data={mockData} on_hide={on_hide} />)

    expect(
      Array.from(document.querySelector('span.dnb-drawer-list').classList)
    ).toEqual([
      'dnb-drawer-list',
      'dnb-drawer-list--top',
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
        'dnb-drawer-list--top',
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
      expect(on_change).toBeCalledTimes(1)
      expect(on_select).toBeCalledTimes(2)
    })
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
})

describe('DrawerList markup', () => {
  it('should validate with ARIA rules', async () => {
    const snapshotProps: DrawerListProps = {
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
