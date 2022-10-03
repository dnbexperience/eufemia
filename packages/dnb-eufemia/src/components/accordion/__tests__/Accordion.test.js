/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  axeComponent,
  toJson,
  loadScss,
} from '../../../core/jest/jestSetup'
import Accordion from '../Accordion'
import {
  add_medium as AddIcon,
  subtract_medium as SubtractIcon,
} from '../../../icons'
import { render, fireEvent } from '@testing-library/react'

const props = {}
props.id = 'accordion'
props.variant = 'default'
props.no_animation = true
props.title = 'title'

describe('Accordion component', () => {
  it('have to match snapshot', () => {
    const Comp = mount(<Accordion {...props} />)

    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has correct state after "click" trigger', () => {
    const { rerender } = render(<Accordion {...props} />)

    // default expanded value has to be false
    expect(
      document
        .querySelector('.dnb-accordion__header')
        .getAttribute('aria-expanded')
    ).toBe('false')
    fireEvent.click(document.querySelector('.dnb-accordion__header')) // we could send inn the event data structure like this: , { target: { expanded: true } }
    expect(
      document
        .querySelector('.dnb-accordion__header')
        .getAttribute('aria-expanded')
    ).toBe('true')
    rerender(<Accordion {...props} expanded={false} />)
    expect(
      document
        .querySelector('.dnb-accordion__header')
        .getAttribute('aria-expanded')
    ).toBe('false')
  })

  it('has "on_change" event which will trigger on click', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    render(
      <Accordion
        {...props}
        on_change={my_event}
        onChange={myEvent}
        expanded={false}
      />
    )

    // first click
    fireEvent.click(document.querySelector('.dnb-accordion__header'))
    expect(my_event).toHaveBeenCalled()
    expect(my_event.mock.calls[0][0].expanded).toBe(true)
    expect(myEvent.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls[0][0]).toHaveProperty('expanded')
    expect(myEvent.mock.calls[0][0].expanded).toBe(true)

    // second click
    fireEvent.click(document.querySelector('.dnb-accordion__header'))
    expect(my_event.mock.calls[1][0].expanded).toBe(false)
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(<Accordion {...props} />)

    rerender(<Accordion {...props} disabled={true} />)
    expect(
      document
        .querySelector('.dnb-accordion__header')
        .hasAttribute('disabled')
    ).toBe(true)
  })

  it('supports an icon for expanded state ', () => {
    render(
      <Accordion
        {...props}
        icon={{
          closed: AddIcon,
          expanded: SubtractIcon,
        }}
      />
    )

    const { container: c1 } = render(<AddIcon />)
    const { container: c2 } = render(<SubtractIcon />)

    expect(document.querySelector('.dnb-accordion svg').outerHTML).toBe(
      c1.innerHTML
    )

    fireEvent.click(document.querySelector('.dnb-accordion__header'))

    expect(document.querySelector('.dnb-accordion svg').outerHTML).toBe(
      c2.innerHTML
    )
  })

  it('supports default outlined variant', () => {
    render(<Accordion />)
    expect(
      document
        .querySelector('.dnb-accordion')
        .classList.contains('dnb-accordion__variant--outlined')
    ).toBe(true)
  })

  it('supports plain variant', () => {
    render(<Accordion {...props} variant="plain" />)
    expect(
      document
        .querySelector('.dnb-accordion')
        .classList.contains('dnb-accordion__variant--plain')
    ).toBe(true)
  })

  it('should have hidden content when "prerender" is true but closed', () => {
    render(<Accordion {...props} prerender={true} />)

    expect(
      Array.from(document.querySelector('.dnb-accordion__content'))
    ).toBeTruthy()

    expect(
      document
        .querySelector('.dnb-accordion__content__inner')
        .classList.contains(
          'dnb-accordion__content__inner--remove-content'
        )
    ).toBe(true)

    fireEvent.click(document.querySelector('.dnb-accordion__header'))

    expect(document.querySelector('.dnb-accordion__content')).toBeTruthy()
    expect(
      Array.from(
        document.querySelector('.dnb-accordion__content').classList
      )
    ).toEqual([
      'dnb-accordion__content',
      'dnb-accordion__content--is-animating',
    ])

    expect(
      document
        .querySelector('.dnb-accordion__content__inner')
        .classList.contains(
          'dnb-accordion__content__inner--remove-content'
        )
    ).toBe(false)
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<Accordion {...props} />)

    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Accordion store API', () => {
  it('will save and read the states for a single accordion', () => {
    const inst = Accordion.Store('accordion-id')

    inst.saveState(true)
    expect(inst.getState()).toBe(true)
    expect(inst.getData()).toMatchObject({ expanded: true })

    inst.saveState(false)
    expect(inst.getState()).toBe(false)
    expect(inst.getData()).toMatchObject({ expanded: false })

    inst.flush()
    expect(inst.getState()).toBe(null)
    expect(inst.getData()).toBe(null)
  })

  it('will save and read the states for an accordion group', () => {
    const inst = Accordion.Group.Store('group-id')

    inst.saveState(true, 'remembered-state-2')
    expect(inst.getState('remembered-state-2')).toBe(true)
    expect(inst.getData()).toMatchObject({ id: 'remembered-state-2' })

    inst.saveState(false, 'remembered-state-2', { force: true })
    expect(inst.getState('remembered-state-2')).toBe(false)
    expect(inst.getData()).toMatchObject({ id: null })

    inst.flush('remembered-state-2')
    expect(inst.getState('remembered-state-2')).toBe(null)
    expect(inst.getData()).toBe(null)
  })
})

describe('Accordion group component', () => {
  it('has to inherit expanded from gorup', () => {
    render(
      <Accordion.Group expanded id="group">
        <Accordion id="accordion-1" title="Accordion 1">
          Accordion 1
        </Accordion>
        <Accordion id="accordion-2" title="Accordion 2" expanded={false}>
          Accordion 2
        </Accordion>
      </Accordion.Group>
    )

    expect(
      document.querySelector('#accordion-1 .dnb-accordion__content')
    ).toBeTruthy()
    expect(
      document.querySelector(
        '#accordion-2 .dnb-accordion__content--hidden'
      )
    ).toBeTruthy()
  })

  it('has "on_change" event which will trigger on a button click', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    render(
      <Accordion.Group
        id="group"
        on_change={my_event}
        onChange={myEvent}
        value="second"
        data-prop="group-value"
      >
        <Accordion
          id="accordion-1"
          text="Accordion 1"
          value="first"
          data-prop="value-1"
          attributes={{ 'data-attr': 'value' }}
        />
        <Accordion
          id="accordion-2"
          text="Accordion 2"
          value="second"
          data-prop="value-2"
          attributes={{ 'data-attr': 'value' }}
        />
      </Accordion.Group>
    )

    fireEvent.click(
      document.querySelector('#accordion-1 .dnb-accordion__header')
    )
    expect(my_event).toHaveBeenCalled()
    expect(my_event.mock.calls[0][0].id).toBe('accordion-1')
    expect(my_event.mock.calls[0][0].expanded).toBe(true)
    expect(myEvent.mock.calls.length).toBe(1)

    fireEvent.click(
      document.querySelector('#accordion-2 .dnb-accordion__header')
    )
    expect(my_event.mock.calls[1][0].id).toBe('accordion-2')
    expect(my_event.mock.calls[1][0].expanded).toBe(true)

    fireEvent.click(
      document.querySelector('#accordion-1 .dnb-accordion__header')
    )
    expect(my_event.mock.calls[2][0].expanded).toBe(true)
  })
})

describe('Accordion container component', () => {
  class DidRender extends React.PureComponent {
    state = { mounted: false }
    componentDidMount() {
      this.setState({ mounted: true })
    }
    render() {
      return <div id={this.props.id}>{String(this.state.mounted)}</div>
    }
  }

  const Increment = () => {
    const [count, setCount] = React.useState(1)
    return (
      <button id="increment" onClick={() => setCount((s) => s + 1)}>
        {count}
      </button>
    )
  }

  it('has only to render the expanded accordion content', () => {
    render(
      <>
        <Increment />
        <Accordion.Group
          id="container"
          single_container
          prevent_rerender
          remember_state
        >
          <Accordion id="accordion-1" title="Accordion 1">
            Accordion 1
            <DidRender id="mounted-1" />
          </Accordion>
          <Accordion id="accordion-2" title="Accordion 2" expanded={true}>
            Accordion 2
            <DidRender id="mounted-2" />
          </Accordion>
          <Accordion id="accordion-3" title="Accordion 3">
            Accordion 3
            <DidRender id="mounted-3" />
          </Accordion>
        </Accordion.Group>
      </>
    )

    expect(document.querySelector('button#increment').textContent).toBe(
      '1'
    )

    fireEvent.click(document.querySelector('button#increment'))
    expect(document.querySelector('button#increment').textContent).toBe(
      '2'
    )

    expect(document.querySelector('div#mounted-1')).toBeFalsy()
    expect(document.querySelector('div#mounted-2').textContent).toBe(
      'true'
    )
    expect(document.querySelector('div#mounted-3')).toBeFalsy()
    expect(
      document
        .querySelector('#accordion-2 .dnb-accordion__header')
        .getAttribute('aria-expanded')
    ).toBe('true')

    fireEvent.click(
      document.querySelector('#accordion-1 .dnb-accordion__header')
    )

    fireEvent.click(document.querySelector('button#increment'))
    expect(document.querySelector('button#increment').textContent).toBe(
      '3'
    )

    expect(document.querySelector('div#mounted-1').textContent).toBe(
      'true'
    )
    expect(document.querySelector('div#mounted-2').textContent).toBe(
      'true'
    )
    expect(document.querySelector('div#mounted-3')).toBeFalsy()

    fireEvent.click(
      document.querySelector('#accordion-2 .dnb-accordion__header')
    )

    fireEvent.click(document.querySelector('button#increment'))
    expect(document.querySelector('button#increment').textContent).toBe(
      '4'
    )

    expect(document.querySelector('div#mounted-3')).toBeFalsy()

    fireEvent.click(
      document.querySelector('#accordion-3 .dnb-accordion__header')
    )

    fireEvent.click(document.querySelector('button#increment'))
    expect(document.querySelector('button#increment').textContent).toBe(
      '5'
    )

    expect(document.querySelector('div#mounted-3').textContent).toBe(
      'true'
    )
  })
})

describe('Accordion scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-accordion.scss'))
    expect(scss).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-accordion-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
