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
  attachToBody,
} from '../../../core/jest/jestSetup'
import Component from '../DrawerList'

beforeAll(() => {
  window.resizeTo = function resizeTo({
    width = window.innerWidth,
    height = window.innerHeight,
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
  window.resizeTo({ height: window.innerHeight })
})

const snapshotProps = {
  ...fakeProps(require.resolve('../DrawerList'), {
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
    content: [
      '1134 56 78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    ],
  },
  {
    selected_value: 'Oppussing - Ole Nordmann',
    content: ['1534 96 48901', 'Oppussing - Ole Nordmann'],
  },
  {
    content: <>Custom content {'123'}</>,
  },
  <>Custom content {'123'}</>,
  [<React.Fragment key="key1">Custom content {'123'}</React.Fragment>],
]

describe('DrawerList component', () => {
  const Comp = mount(<Component {...props} data={mockData} />)

  it('has correct state at startup', () => {
    expect(Comp.exists('.dnb-drawer-list--opened')).toBe(true)
  })

  it('has correct state after changing prop to opened', () => {
    expect(Comp.exists('.dnb-drawer-list--opened')).toBe(true)
    Comp.setProps({
      opened: false,
    })
    Comp.update()
    expect(Comp.exists('.dnb-drawer-list--opened')).toBe(false)
    Comp.setProps({
      opened: true,
    })
    Comp.update()
    expect(Comp.exists('.dnb-drawer-list--opened')).toBe(true)
  })

  it('handles default_value correctly on forcing re-render', () => {
    const Comp = mount(
      <Component
        opened
        no_animation
        data={mockData}
        default_value={props.value}
        {...mockProps}
      />
    )
    let elem

    elem = Comp.find('.dnb-drawer-list__option').at(props.value)
    expect(elem.hasClass('dnb-drawer-list__option--focus')).toBe(true)
    expect(elem.hasClass('dnb-drawer-list__option--selected')).toBe(true)

    // force re-render by prop change
    const title = 'show this attribute now'
    Comp.setProps({
      title,
    })
    expect(
      Comp.find('.dnb-drawer-list').instance().getAttribute('title')
    ).toBe(title)

    // force re-render with null as value by prop change
    Comp.setProps({
      value: props.value + 1,
    })

    // the selected option got a new position
    elem = Comp.find('.dnb-drawer-list__option').at(props.value + 1)
    expect(elem.hasClass('dnb-drawer-list__option--selected')).toBe(true)

    // as well as the focus / active state
    elem = Comp.find('.dnb-drawer-list__option').at(props.value + 1)
    expect(elem.hasClass('dnb-drawer-list__option--focus')).toBe(true)

    // and for sure, the title attribute is still the same
    expect(
      Comp.find('.dnb-drawer-list').instance().getAttribute('title')
    ).toBe(title)
  })

  it('has correct value on key search', () => {
    const Comp = mount(<Component {...props} data={mockData} />)

    expect(Comp.exists('.dnb-drawer-list__option--focus')).toBe(true)

    keydown(Comp, 83) // S

    // force re-render
    Comp.update()

    expect(
      Comp.find('.dnb-drawer-list__option')
        .at(1)
        .hasClass('dnb-drawer-list__option--focus')
    ).toBe(true)

    keydown(Comp, 70) // F

    // force re-render
    Comp.update()

    expect(
      Comp.find('.dnb-drawer-list__option')
        .at(2)
        .hasClass('dnb-drawer-list__option--focus')
    ).toBe(true)
  })

  it('has valid on_select callback', () => {
    const on_select = jest.fn()

    const Comp = mount(
      <Component
        {...props}
        data={Object.freeze(mockData)}
        on_select={on_select}
      />
    )

    // select the current
    keydown(Comp, 32) // space

    const notChangedItem = mockData[props.value]
    expect(on_select.mock.calls[0][0].data).toStrictEqual(notChangedItem)
    expect(on_select.mock.calls[0][0].selected_item).toBe(2)
    expect(on_select.mock.calls[0][0].active_item).toBe(2)

    // reset props
    Comp.setProps({
      opened: null,
    })

    // then open again
    Comp.setProps({
      opened: true,
    })
    keydown(Comp, 40) // down

    expect(on_select.mock.calls[1][0].selected_item).toBe(undefined)
    expect(on_select.mock.calls[1][0].active_item).toBe(3)

    const selectedItem = mockData[props.value + 1]
    expect(on_select.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
  })

  it('will set data-dnb-drawer-list-active with id', () => {
    const Comp = mount(
      <Component {...props} opened={false} data={mockData} />,
      {
        attachTo: attachToBody(),
      }
    )

    Comp.setProps({
      opened: true,
    })

    expect(
      document.documentElement.getAttribute('data-dnb-drawer-list-active')
    ).toBe(props.id)

    Comp.setProps({
      opened: false,
    })

    expect(
      document.documentElement.hasAttribute('data-dnb-drawer-list-active')
    ).toBe(false)
  })

  it('has valid on_change callback', () => {
    const on_change = jest.fn()
    const on_select = jest.fn()

    const Comp = mount(
      <Component
        {...props}
        data={mockData}
        on_change={on_change}
        on_select={on_select}
      />
    )

    let selectedItem

    // then simulate changes
    keydown(Comp, 40) // down
    keydown(Comp, 32) // space

    selectedItem = mockData[props.value + 1]
    expect(on_change.mock.calls[0][0].data).toStrictEqual(selectedItem)
    expect(on_select.mock.calls[1][0].data).toStrictEqual(selectedItem)

    // reset props
    Comp.setProps({
      opened: null,
    })

    // then open again
    Comp.setProps({
      opened: true,
    })

    // then simulate changes
    keydown(Comp, 40) // down
    keydown(Comp, 13) // enter

    selectedItem = mockData[props.value + 2]
    expect(on_change.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
    expect(on_select.mock.calls[3][0].data).toStrictEqual(selectedItem) // second call!
  })

  it('has correct direction prop', () => {
    let direction = 'top'
    const Comp = mount(
      <Component {...props} data={mockData} direction={direction} />
    )
    expect(Comp.exists(`.dnb-drawer-list--${direction}`)).toBe(true)

    direction = 'bottom'
    Comp.setProps({
      direction,
    })
    expect(Comp.exists(`.dnb-drawer-list--${direction}`)).toBe(true)

    expect(
      Comp.find('.dnb-drawer-list__options')
        .instance()
        .getAttribute('style')
    ).toBe('max-height: 33.5rem;')
  })

  it('has working direction observer', async () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    expect(Comp.props().direction).toBe('auto')

    // the setDirectionObserver fn is changing this
    expect(Comp.exists('.dnb-drawer-list--bottom')).toBe(true)
    expect(
      Comp.find('.dnb-drawer-list__options')
        .instance()
        .getAttribute('style')
    ).toBe('max-height: 33.5rem;') // jsdom default is 768 innerHeight

    window.resizeTo({
      height: 640, // change innerHeight
    })
    await wait(100)

    expect(Comp.exists('.dnb-drawer-list--bottom')).toBe(true)
    expect(
      Comp.find('.dnb-drawer-list__options')
        .instance()
        .getAttribute('style')
    ).toBe('max-height: 28rem;')

    window.scrollTo({
      top: -640,
    })
    await wait(100)

    // force re-render to get a updated state
    Comp.update()

    expect(Comp.exists('.dnb-drawer-list--top')).toBe(true)
    expect(
      Comp.find('.dnb-drawer-list__options')
        .instance()
        .getAttribute('style')
    ).toBe('max-height: 28rem;') // is now min_height
  })

  it('will call on_hide after "esc" key', () => {
    const on_hide = jest.fn()

    const Comp = mount(
      <Component {...props} data={mockData} on_hide={on_hide} />
    )

    expect(
      Comp.find('span.dnb-drawer-list')
        .instance()
        .classList.contains('dnb-drawer-list--opened')
    ).toBe(true)
    expect(
      Comp.find('span.dnb-drawer-list')
        .instance()
        .classList.contains('dnb-drawer-list--hidden')
    ).toBe(false)

    keydown(Comp, 27) // esc
    expect(on_hide.mock.calls.length).toBe(1)

    expect(
      Comp.find('span.dnb-drawer-list')
        .instance()
        .classList.contains('dnb-drawer-list--opened')
    ).toBe(false)
    expect(
      Comp.find('span.dnb-drawer-list')
        .instance()
        .classList.contains('dnb-drawer-list--hidden')
    ).toBe(true)
  })

  it('has correct class modifier "--opened"', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    const elem = Comp.find('span.dnb-drawer-list')

    expect(elem.instance().getAttribute('class')).toContain(
      'dnb-drawer-list--opened'
    )

    expect(elem.hasClass('dnb-drawer-list--hidden')).toBe(false)
  })

  it('has correct length of li elements', () => {
    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(
      mockData.length
    )
  })

  it('has correct value on data given as an object', () => {
    const on_change = jest.fn()
    const on_select = jest.fn()

    const Comp = mount(
      <Component
        opened
        no_animation
        on_change={on_change}
        on_select={on_select}
        data={() => ({ a: 'A', b: 'B', c: 'C' })}
        {...mockProps}
      />
    )

    // then simulate changes
    keydown(Comp, 40) // down
    expect(on_select.mock.calls[0][0].active_item).toBe(0)

    keydown(Comp, 13) // enter
    expect(on_change.mock.calls[0][0].value).toBe('a')

    // then open again
    keydown(Comp, 32) // space

    expect(on_change).toBeCalledTimes(1)
    expect(on_select).toBeCalledTimes(2)
  })

  it('has to return all additional attributes the event return', () => {
    const on_show = jest.fn()
    const on_hide = jest.fn()
    const params = { 'data-attr': 'value' }

    mount(
      <Component
        {...props}
        on_show={on_show}
        on_hide={on_hide}
        {...params}
        data={mockData}
      />
    )

    expect(on_show.mock.calls.length).toBe(1)
    expect(on_show.mock.calls[0][0].attributes).toMatchObject(params)

    keydown(Comp, 27) // esc
    expect(on_hide.mock.calls.length).toBe(1)
    expect(on_hide.mock.calls[0][0].attributes).toMatchObject(params)
  })
})

describe('DrawerList markup', () => {
  const CheckComponent = mount(
    <Component {...snapshotProps} data={mockData} />
  )

  // compare the snapshot
  it('have to match snapshot', () => {
    expect(toJson(CheckComponent)).toMatchSnapshot()
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(CheckComponent)).toHaveNoViolations()
  })
})

describe('DrawerList scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-drawer-list.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-drawer-list-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})

const keydown = (Comp, keyCode) => {
  document.dispatchEvent(new KeyboardEvent('keydown', { keyCode }))
  // Comp.find('input').simulate('keydown', {
  //   keyCode
  // })
}
const wait = (t) => new Promise((r) => setTimeout(r, t))
