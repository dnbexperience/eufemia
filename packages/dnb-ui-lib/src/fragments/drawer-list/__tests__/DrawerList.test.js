/**
 * Component Test
 *
 */

import React, { Fragment } from 'react'
import {
  mount,
  fakeProps,
  axeComponent,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../DrawerList'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _drawerList from '../style/_drawer-list.scss' // eslint-disable-line
import dnb_drawerList from '../style/dnb-drawer-list.scss' // eslint-disable-line
import dnb_drawerList_theme_ui from '../style/themes/dnb-drawer-list-theme-ui.scss' // eslint-disable-line

const snapshotProps = {
  ...fakeProps(require.resolve('../DrawerList'), {
    optional: true
  }),
  id: 'drawer-list-id',
  direction: 'bottom',
  value: 2,
  opened: true,
  no_animation: true,
  prevent_selection: null,
  size: 'default',
  align_drawer: null
}

// use no_animation so we don't need to wait
const props = {
  id: 'drawer-list-id',
  value: 2,
  opened: true,
  no_animation: true
}

const mockData = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    content: ['1234 56 78901', 'Brukskonto - Kari Nordmann']
  },
  {
    selected_value: 'Sparekonto - Ole Nordmann',
    content: ['1234 56 78902', 'Sparekonto - Ole Nordmann']
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    content: [
      '1134 56 78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: 'Oppussing - Ole Nordmann',
    content: ['1534 96 48901', 'Oppussing - Ole Nordmann']
  },
  {
    content: <>Custom content {'123'}</>
  },
  <>Custom content {'123'}</>,
  [<Fragment key="key1">Custom content {'123'}</Fragment>]
]

describe('DrawerList component', () => {
  const Comp = mount(<Component {...props} data={mockData} />)

  it('has correct state at startup', () => {
    expect(Comp.state().opened).toBe(true)
    expect(Comp.state().hidden).toBe(false)
  })

  it('has correct state after changing prop to opened', async () => {
    Comp.setProps({
      opened: false
    })
    await wait(1)
    expect(Comp.state().opened).toBe(false)
  })

  it('has correct value and attribute after forcing rerender', () => {
    const Comp = mount(
      <Component opened data={mockData} default_value={props.value} />
    )

    expect(Comp.state().selected_item).toBe(props.value)

    // make first selection
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })) // down
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 })) // enter

    expect(Comp.state().selected_item).toBe(props.value + 1)

    // force rerender by prop change
    const title = 'show this attribute now'
    Comp.setProps({
      title
    })
    expect(
      Comp.find('.dnb-drawer-list')
        .instance()
        .getAttribute('title')
    ).toBe(title)

    expect(Comp.state().selected_item).toBe(props.value + 1)

    // force rerender with null as value by prop change
    Comp.setProps({
      value: null
    })

    expect(Comp.state().selected_item).toBe(null)
  })

  it('has correct value on key search', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 66 })) // B
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 70 })) // F
    expect(Comp.state().active_item).toBe(2)
  })

  it('has valid on_select callback', async () => {
    const on_select = jest.fn()
    const on_change = jest.fn()

    const Comp = mount(
      <Component
        {...props}
        data={mockData}
        on_select={on_select}
        on_change={on_change}
      />
    )

    // then simulate changes
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 32 })) // space

    const notChangedItem = mockData[props.value]
    expect(on_change.mock.calls[0][0].data).toBe(notChangedItem)
    expect(on_select.mock.calls[0][0].data).toBe(notChangedItem)

    // open again
    Comp.setProps({
      opened: true
    })
    await wait(20)

    // then simulate changes
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })) // down
    await wait(1)

    const selectedItem = mockData[props.value + 1]
    expect(on_select.mock.calls[1][0].data).toBe(selectedItem) // second call!
  })

  it('has valid on_change callback', () => {
    const on_change = jest.fn()
    mount(<Component {...props} data={mockData} on_change={on_change} />)

    // then simulate changes
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })) // down
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 })) // enter

    const selectedItem = mockData[props.value + 1]
    expect(on_change.mock.calls[0][0].data).toBe(selectedItem)
  })

  it('has working direction observer', () => {
    expect(Comp.props().direction).toBe('auto')
    expect(Comp.state().max_height).toBeGreaterThan(0)
  })

  it('has correct direction prop', () => {
    const Comp = mount(
      <Component {...props} data={mockData} direction="top" />
    )

    expect(Comp.find('DrawerList').state().max_height).toBe(null)
  })

  it('has correct state after "esc" key', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 })) // esc
    expect(Comp.state().opened).toBe(false)
  })

  it('has correct class modifyer "--opened"', () => {
    const Comp = mount(<Component {...props} data={mockData} />)
    const elem = Comp.find('span.dnb-drawer-list')

    expect(elem.instance().getAttribute('class')).toContain(
      'dnb-drawer-list--opened'
    )

    expect(elem.hasClass('dnb-drawer-list--closed')).toBe(false)
  })

  it('has correct length of li elements', () => {
    expect(Comp.find('li.dnb-drawer-list__option').length).toBe(
      mockData.length
    )
  })

  it('has correct value on data given as an object', async () => {
    const on_change = jest.fn()
    const on_select = jest.fn()

    mount(
      <Component
        opened
        no_animation
        on_change={on_change}
        on_select={on_select}
        data={() => ({ a: 'A', b: 'B', c: 'C' })}
      />
    )

    // then simulate changes
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })) // down
    expect(on_select.mock.calls[0][0].active_item).toBe(0)

    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 })) // enter
    expect(on_change.mock.calls[0][0].value).toBe('a')

    // requires too much cpu resources for now
    // open again
    // Comp.setProps({
    //   opened: true
    // })
    // await wait(10)
    //
    // // then simulate changes
    // document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 })) // down
    // expect(on_select.mock.calls[2][0].active_item).toBe(1)
    //
    // document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 })) // enter
    // expect(on_change.mock.calls[1][0].value).toBe('b')
  })

  it('has to return all additional attributes the event return', () => {
    const my_event = jest.fn()
    const params = { 'data-attr': 'value' }
    mount(
      <Component
        {...props}
        on_show={my_event}
        {...params}
        data={mockData}
      />
    )
    expect(my_event.mock.calls.length).toBe(1)
    expect(my_event.mock.calls[0][0].attributes).toMatchObject(params)
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

  it('should validate with ARIA rules as a tabs', async () => {
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

const wait = t => new Promise(r => setTimeout(r, t))
