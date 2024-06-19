/**
 * Component Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import Accordion, { AccordionProps } from '../Accordion'
import {
  add_medium as AddIcon,
  subtract_medium as SubtractIcon,
} from '../../../icons'
import { render, fireEvent, act } from '@testing-library/react'
import MatchMediaMock from 'jest-matchmedia-mock'
import userEvent from '@testing-library/user-event'

new MatchMediaMock()

const props: AccordionProps = {
  no_animation: true,
  title: 'title',
}

describe('Accordion component', () => {
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

  it('uses a p element when string content is given', () => {
    const { rerender } = render(
      <Accordion {...props} expanded>
        string content
      </Accordion>
    )

    expect(document.querySelector('.dnb-p').textContent).toBe(
      'string content'
    )

    rerender(
      <Accordion {...props} expanded>
        <span className="no-string">no string content</span>
      </Accordion>
    )

    expect(document.querySelector('.dnb-p')).toBeFalsy()
    expect(document.querySelector('.no-string').textContent).toBe(
      'no string content'
    )
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(<Accordion {...props} />)

    rerender(<Accordion {...props} disabled={true} />)
    expect(
      document.querySelector('.dnb-accordion__header')
    ).toHaveAttribute('disabled')
  })

  it('has correct classes when no_animation', () => {
    render(<Accordion no_animation />)

    expect(
      Array.from(
        document.querySelector('.dnb-accordion__header').classList
      )
    ).toEqual(
      expect.arrayContaining(['dnb-accordion__header--no-animation'])
    )
  })

  it('supports an icon for expanded state', () => {
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
    expect(document.querySelector('.dnb-accordion').classList).toContain(
      'dnb-accordion__variant--outlined'
    )
  })

  it('supports plain variant', () => {
    render(<Accordion {...props} variant="plain" />)
    expect(document.querySelector('.dnb-accordion').classList).toContain(
      'dnb-accordion__variant--plain'
    )
  })

  it('should have hidden content when "prerender" is true but closed', () => {
    render(<Accordion {...props} prerender={true} />)

    expect(
      Array.from(
        document.querySelector('.dnb-accordion__content').classList
      )
    ).toEqual(expect.arrayContaining(['dnb-height-animation--hidden']))

    fireEvent.click(document.querySelector('.dnb-accordion__header'))

    expect(
      Array.from(
        document.querySelector('.dnb-accordion__content').classList
      )
    ).toEqual(expect.arrayContaining(['dnb-height-animation--is-in-dom']))
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
  it('has to inherit expanded from group', () => {
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
    ).toBeInTheDocument()
    expect(
      document.querySelector('#accordion-2 .dnb-accordion__content')
    ).toBeFalsy()
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
          value="first"
          data-prop="value-1"
          attributes={{ 'data-attr': 'value' }}
        />
        <Accordion
          id="accordion-2"
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

  it('should close all accordions inside a group with collapseAllHandleRef', () => {
    const collapseAll = React.createRef<() => void>()

    render(
      <Accordion.Group
        expanded
        allow_close_all
        collapseAllHandleRef={collapseAll}
      >
        <Accordion>
          <Accordion.Header>Accordion title 1</Accordion.Header>
          <Accordion.Content>
            Sociis sapien sociosqu vel sollicitudin accumsan laoreet
            gravida himenaeos nostra mollis volutpat bibendum convallis cum
            condimentum dictumst blandit rutrum vehicula
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Header>Accordion title 2</Accordion.Header>
          <Accordion.Content>
            Nec sit mattis natoque interdum sagittis cubilia nibh nullam
            etiam
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Header>Accordion title 2</Accordion.Header>
          <Accordion.Content>
            Nec sit mattis natoque interdum sagittis cubilia nibh nullam
            etiam
          </Accordion.Content>
        </Accordion>
      </Accordion.Group>
    )

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-accordion')
    )

    expect(first).toHaveClass('dnb-accordion--expanded')
    expect(second).toHaveClass('dnb-accordion--expanded')
    expect(third).toHaveClass('dnb-accordion--expanded')

    act(collapseAll.current)

    expect(first).not.toHaveClass('dnb-accordion--expanded')
    expect(second).not.toHaveClass('dnb-accordion--expanded')
    expect(third).not.toHaveClass('dnb-accordion--expanded')
  })
})

describe('Accordion container component', () => {
  type DidRenderProps = {
    id: string
  }
  class DidRender extends React.PureComponent<DidRenderProps> {
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

  const Container = (props) => {
    return (
      <>
        <Increment />
        <Accordion.Group
          id="container"
          single_container
          prevent_rerender
          remember_state
          no_animation
          {...props}
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
  }

  it('has only to render the expanded accordion content', () => {
    render(<Container />)

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

  it('will set minHeight', async () => {
    const contentRef = React.createRef<HTMLElement>()

    render(<Container contentRef={contentRef} />)

    const contentElem = contentRef.current

    jest.spyOn(contentElem, 'offsetHeight', 'get').mockReturnValue(48)
    jest.spyOn(contentElem, 'offsetTop', 'get').mockReturnValue(48)

    fireEvent.click(
      document.querySelector('#accordion-1 .dnb-accordion__header')
    )

    expect(
      document
        .querySelector('.dnb-accordion-group--single-container')
        .getAttribute('style')
    ).toBe('transition-duration: 1ms; min-height: 6rem;')
  })

  it('should allow all accordions inside a group to be expanded at the same time', async () => {
    render(
      <Accordion.Group allowAllExpanded>
        <Accordion>
          <Accordion.Header>Accordion title 1</Accordion.Header>
          <Accordion.Content>
            Sociis sapien sociosqu vel sollicitudin accumsan laoreet
            gravida himenaeos nostra mollis volutpat bibendum convallis cum
            condimentum dictumst blandit rutrum vehicula
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Header>Accordion title 2</Accordion.Header>
          <Accordion.Content>
            Nec sit mattis natoque interdum sagittis cubilia nibh nullam
            etiam
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Header>Accordion title 3</Accordion.Header>
          <Accordion.Content>
            Nec sit mattis natoque interdum sagittis cubilia nibh nullam
            etiam
          </Accordion.Content>
        </Accordion>
      </Accordion.Group>
    )

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-accordion__header')
    )

    expect(first).toHaveAttribute('aria-expanded', 'false')
    expect(second).toHaveAttribute('aria-expanded', 'false')
    expect(third).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'true')
    expect(second).toHaveAttribute('aria-expanded', 'false')
    expect(third).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(second)
    expect(first).toHaveAttribute('aria-expanded', 'true')
    expect(second).toHaveAttribute('aria-expanded', 'true')
    expect(third).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(third)
    expect(first).toHaveAttribute('aria-expanded', 'true')
    expect(second).toHaveAttribute('aria-expanded', 'true')
    expect(third).toHaveAttribute('aria-expanded', 'true')
  })
})

describe('Accordion scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-accordion-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
