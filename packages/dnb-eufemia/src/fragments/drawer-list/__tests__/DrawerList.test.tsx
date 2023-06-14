/**
 * DrawerList Test
 *
 */

import React from 'react'
import {
  fakeProps,
  axeComponent,
  loadScss,
} from '../../../core/jest/jestSetup'
import { render, screen } from '@testing-library/react'
import DrawerList from '../DrawerList'

import {
  mockImplementationForDirectionObserver,
  testDirectionObserver,
} from './DrawerListTestMocks'

mockImplementationForDirectionObserver()

// use no_animation so we don't need to wait
const mockProps = {
  skip_portal: true,
}
const props = {
  id: 'drawer-list-id',
  value: 2,
  skip_portal: true,
  opened: true,
  no_animation: true,
}

const mockData = [
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
    expect(document.querySelector('.dnb-drawer-list--opened')).toBeTruthy()
  })

  it('has correct state after changing prop to opened', () => {
    const { rerender } = render(<DrawerList {...props} data={mockData} />)

    expect(document.querySelector('.dnb-drawer-list--opened')).toBeTruthy()

    rerender(<DrawerList {...props} data={mockData} opened={false} />)
    expect(document.querySelector('.dnb-drawer-list--opened')).toBeFalsy()

    rerender(<DrawerList {...props} data={mockData} opened={true} />)
    expect(document.querySelector('.dnb-drawer-list--opened')).toBeTruthy()
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
    expect(elem.classList.contains('dnb-drawer-list__option--focus')).toBe(
      true
    )
    expect(
      elem.classList.contains('dnb-drawer-list__option--selected')
    ).toBe(true)

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
    expect(screen.getByTitle(title)).toBeTruthy()

    // force re-render with null as value by prop change
    rerender(
      <DrawerList
        opened
        no_animation
        data={mockData}
        default_value={props.value}
        {...mockProps}
        title={title}
        value={props.value + 1}
      />
    )

    // the selected option got a new position
    elem = document.querySelectorAll('.dnb-drawer-list__option')[
      props.value + 1
    ]
    expect(
      elem.classList.contains('dnb-drawer-list__option--selected')
    ).toBe(true)

    // as well as the focus / active state
    expect(elem.classList.contains('dnb-drawer-list__option--focus')).toBe(
      true
    )

    // and for sure, the title attribute is still the same
    expect(screen.getByTitle(title)).toBeTruthy()
  })

  it('has correct value on key search', () => {
    const { rerender } = render(<DrawerList {...props} data={mockData} />)

    expect(
      document.querySelector('.dnb-drawer-list__option--focus')
    ).toBeTruthy()

    keydown(83) // S

    expect(
      Array.from(
        document.querySelectorAll('.dnb-drawer-list__option')[1].classList
      )
    ).toEqual([
      'dnb-drawer-list__option',
      'dnb-drawer-list__option--focus',
    ])

    keydown(70) // F

    // force re-render
    rerender(<DrawerList {...props} data={mockData} />)

    expect(
      Array.from(
        document.querySelectorAll('.dnb-drawer-list__option')[2].classList
      )
    ).toEqual([
      'dnb-drawer-list__option',
      'dnb-drawer-list__option--selected',
      'dnb-drawer-list__option--focus',
    ])
  })

  it('has valid on_select callback', () => {
    const on_select = jest.fn()

    const { rerender } = render(
      <DrawerList
        {...props}
        data={Object.freeze(mockData)}
        on_select={on_select}
      />
    )

    // select the current
    keydown(32) // space

    const notChangedItem = mockData[props.value]
    expect(on_select.mock.calls[0][0].data).toStrictEqual(notChangedItem)
    expect(on_select.mock.calls[0][0].selected_item).toBe(2)
    expect(on_select.mock.calls[0][0].active_item).toBe(2)

    // reset props
    rerender(
      <DrawerList
        {...props}
        data={Object.freeze(mockData)}
        on_select={on_select}
        opened={null}
      />
    )

    // then open again
    rerender(
      <DrawerList
        {...props}
        data={Object.freeze(mockData)}
        on_select={on_select}
        opened={true}
      />
    )
    keydown(40) // down

    expect(on_select.mock.calls[1][0].selected_item).toBe(undefined)
    expect(on_select.mock.calls[1][0].active_item).toBe(3)

    const selectedItem = mockData[props.value + 1]
    expect(on_select.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
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

    expect(
      document.documentElement.hasAttribute('data-dnb-drawer-list-active')
    ).toBe(false)
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

    expect(
      document.documentElement.hasAttribute('data-dnb-drawer-list-active')
    ).toBe(false)
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

  it('has valid on_change callback', () => {
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

    let selectedItem

    // then simulate changes
    keydown(40) // down
    keydown(32) // space

    selectedItem = mockData[props.value + 1]
    expect(on_change.mock.calls[0][0].data).toStrictEqual(selectedItem)
    expect(on_select.mock.calls[1][0].data).toStrictEqual(selectedItem)

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

    selectedItem = mockData[props.value + 2]
    expect(on_change.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
    expect(on_select.mock.calls[3][0].data).toStrictEqual(selectedItem) // second call!
  })

  it('has correct direction prop', () => {
    const directionTop = 'top'

    const { rerender } = render(
      <DrawerList {...props} data={mockData} direction={directionTop} />
    )

    expect(
      document.querySelector(`.dnb-drawer-list--${directionTop}`)
    ).toBeTruthy()

    const directionBottom = 'bottom'
    rerender(
      <DrawerList {...props} data={mockData} direction={directionBottom} />
    )
    expect(
      document.querySelector(`.dnb-drawer-list--${directionBottom}`)
    ).toBeTruthy()

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

  it('will call on_hide after "esc" key', () => {
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

    expect(
      Array.from(document.querySelector('span.dnb-drawer-list').classList)
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

  it('has correct value on data given as an object', () => {
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
    expect(on_select.mock.calls[0][0].active_item).toBe(0)

    keydown(13) // enter
    expect(on_change.mock.calls[0][0].value).toBe('a')

    // then open again
    keydown(32) // space

    expect(on_change).toBeCalledTimes(1)
    expect(on_select).toBeCalledTimes(2)
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
    const snapshotProps = {
      ...fakeProps(require.resolve('../DrawerList'), {
        all: true,
        optional: true,
      }),
      id: 'drawer-list-id',
      direction: 'bottom',
      value: 2,
      skip_portal: true,
      opened: true,
      no_animation: true,
      prevent_selection: null,
      size: 'default',
      align_drawer: null,
    }

    const CheckComponent = render(
      <DrawerList {...snapshotProps} data={mockData} />
    )
    expect(
      await axeComponent(CheckComponent, {
        rules: {
          'aria-input-field-name': { enabled: false },
          'aria-required-children': { enabled: false },
        },
      })
    ).toHaveNoViolations()
  })
})

describe('DrawerList scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-drawer-list-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})

const keydown = (keyCode) => {
  document.dispatchEvent(new KeyboardEvent('keydown', { keyCode }))
}
