/**
 * Component Test
 *
 */

import { act, useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import type { AccordionProps } from '../Accordion'
import Accordion from '../Accordion'
import {
  add_medium as AddIcon,
  subtract_medium as SubtractIcon,
} from '../../../icons'
import { render, fireEvent } from '@testing-library/react'
import MatchMediaMock from 'jest-matchmedia-mock'
import userEvent from '@testing-library/user-event'
import { useSharedState } from '../../../shared/helpers/useSharedState'

new MatchMediaMock()

const props: AccordionProps = {
  noAnimation: true,
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

  it('has "onChange" event which will trigger on click', () => {
    const myEvent = jest.fn()
    render(<Accordion {...props} onChange={myEvent} expanded={false} />)

    // first click
    fireEvent.click(document.querySelector('.dnb-accordion__header'))

    expect(myEvent.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls[0][0]).toHaveProperty('expanded')
    expect(myEvent.mock.calls[0][0].expanded).toBe(true)

    // second click
    fireEvent.click(document.querySelector('.dnb-accordion__header'))
    expect(myEvent.mock.calls[1][0].expanded).toBe(false)
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

  it('has correct classes when noAnimation', () => {
    render(<Accordion noAnimation />)

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

  it('should have hidden content when "keepInDOM" is true but closed', () => {
    render(<Accordion {...props} keepInDOM={true} />)

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

  it('has "onChange" event which will trigger on a button click', () => {
    const myEvent = jest.fn()
    render(
      <Accordion.Group
        id="group"
        onChange={myEvent}
        value="second"
        data-prop="group-value"
      >
        <Accordion id="accordion-1" value="first" data-prop="value-1" />
        <Accordion id="accordion-2" value="second" data-prop="value-2" />
      </Accordion.Group>
    )

    fireEvent.click(
      document.querySelector('#accordion-1 .dnb-accordion__header')
    )
    expect(myEvent).toHaveBeenCalled()
    expect(myEvent.mock.calls[0][0].id).toBe('accordion-1')
    expect(myEvent.mock.calls[0][0].expanded).toBe(true)
    expect(myEvent.mock.calls.length).toBe(1)

    fireEvent.click(
      document.querySelector('#accordion-2 .dnb-accordion__header')
    )
    expect(myEvent.mock.calls[1][0].id).toBe('accordion-2')
    expect(myEvent.mock.calls[1][0].expanded).toBe(true)

    fireEvent.click(
      document.querySelector('#accordion-1 .dnb-accordion__header')
    )
    expect(myEvent.mock.calls[2][0].expanded).toBe(true)
  })

  it('should close all accordions inside a group with collapseAllHandleRef', () => {
    const collapseAll: RefObject<(() => void) | null> = {
      current: null,
    }

    render(
      <Accordion.Group
        expanded
        allowCloseAll
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
  const DidRender = ({ id }: { id: string }) => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
      setMounted(true)
    }, [])
    return <div id={id}>{String(mounted)}</div>
  }

  const Increment = () => {
    const [count, setCount] = useState(1)
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
          singleContainer
          preventRerender
          rememberState
          noAnimation
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
    const contentRef: RefObject<HTMLElement | null> = {
      current: null,
    }

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
      <Accordion.Group expandBehavior="multiple">
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

describe('Accordion tertiary variant', () => {
  it('renders a tertiary button with chevron icon', () => {
    render(
      <Accordion variant="tertiary" title="Toggle" noAnimation>
        <p>Content</p>
      </Accordion>
    )

    const button = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    expect(button).toBeTruthy()
    expect(button.textContent).toContain('Toggle')
    expect(button.classList.contains('dnb-button--tertiary')).toBe(true)

    const icon = button.querySelector('.dnb-icon')
    expect(icon).toBeTruthy()
  })

  it('starts collapsed by default', () => {
    render(
      <Accordion variant="tertiary" title="Toggle" noAnimation>
        <p>Content</p>
      </Accordion>
    )

    const button = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(document.querySelector('.dnb-accordion--expanded')).toBeFalsy()
  })

  it('starts expanded when expanded prop is true', () => {
    render(
      <Accordion variant="tertiary" title="Toggle" expanded noAnimation>
        <p>Content</p>
      </Accordion>
    )

    const button = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    expect(button.getAttribute('aria-expanded')).toBe('true')
    expect(document.querySelector('.dnb-accordion--expanded')).toBeTruthy()
  })

  it('reacts to expanded prop changes', () => {
    const { rerender } = render(
      <Accordion variant="tertiary" title="Toggle" noAnimation>
        <p>Content</p>
      </Accordion>
    )

    const button = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    expect(button.getAttribute('aria-expanded')).toBe('false')

    rerender(
      <Accordion variant="tertiary" title="Toggle" expanded noAnimation>
        <p>Content</p>
      </Accordion>
    )
    expect(button.getAttribute('aria-expanded')).toBe('true')

    rerender(
      <Accordion
        variant="tertiary"
        title="Toggle"
        expanded={false}
        noAnimation
      >
        <p>Content</p>
      </Accordion>
    )
    expect(button.getAttribute('aria-expanded')).toBe('false')
  })

  it('toggles on click', () => {
    render(
      <Accordion variant="tertiary" title="Toggle" noAnimation>
        <p>Content</p>
      </Accordion>
    )

    const button = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )

    fireEvent.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('true')
    expect(document.querySelector('.dnb-accordion--expanded')).toBeTruthy()

    fireEvent.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(document.querySelector('.dnb-accordion--expanded')).toBeFalsy()
  })

  it('calls onChange on click', () => {
    const onChange = jest.fn()
    render(
      <Accordion
        variant="tertiary"
        title="Toggle"
        noAnimation
        onChange={onChange}
      >
        <p>Content</p>
      </Accordion>
    )

    fireEvent.click(
      document.querySelector('.dnb-accordion__tertiary-button')
    )

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ expanded: true })
    )
  })

  it('has correct aria-controls linking button to content', () => {
    render(
      <Accordion
        variant="tertiary"
        title="Toggle"
        id="my-accordion"
        noAnimation
      >
        <p>Content</p>
      </Accordion>
    )

    const button = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    const controlledId = button.getAttribute('aria-controls')
    expect(controlledId).toBe('my-accordion-content')

    const content = document.getElementById(controlledId)
    expect(content).toBeTruthy()
  })

  it('is disabled when disabled prop is set', () => {
    render(
      <Accordion variant="tertiary" title="Toggle" disabled noAnimation>
        <p>Content</p>
      </Accordion>
    )

    const button = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    expect(button).toHaveAttribute('disabled')
  })

  it('can be controlled externally via useSharedState', () => {
    function ExternalControl() {
      const { set } = useSharedState('shared-accordion', {
        expanded: false,
      })
      return (
        <button
          data-testid="external"
          onClick={() => set({ expanded: true })}
        >
          Open
        </button>
      )
    }

    render(
      <>
        <ExternalControl />
        <Accordion
          variant="tertiary"
          title="Toggle"
          id="shared-accordion"
          noAnimation
        >
          <p>Content</p>
        </Accordion>
      </>
    )

    const button = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    expect(button.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(document.querySelector('[data-testid="external"]'))
    expect(button.getAttribute('aria-expanded')).toBe('true')
  })

  it('has correct variant class', () => {
    render(
      <Accordion variant="tertiary" title="Toggle" noAnimation>
        <p>Content</p>
      </Accordion>
    )

    expect(
      document.querySelector('.dnb-accordion__variant--tertiary')
    ).toBeTruthy()
  })

  it('renders button-only when no children are provided', () => {
    render(
      <Accordion
        variant="tertiary"
        title="Toggle"
        id="btn-only"
        noAnimation
      />
    )

    const button = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    expect(button).toBeTruthy()
    expect(
      document.querySelector('.dnb-accordion__tertiary-content')
    ).toBeFalsy()
    expect(button.getAttribute('aria-controls')).toBe('btn-only-content')
  })

  it('connects button and separate Accordion.Content via shared id', () => {
    render(
      <>
        <Accordion
          variant="tertiary"
          title="Toggle"
          id="split-test"
          noAnimation
        />
        <Accordion.Content id="split-test">
          <p>Remote content</p>
        </Accordion.Content>
      </>
    )

    const button = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    const content = document.querySelector(
      '.dnb-accordion__tertiary-content'
    )

    expect(button).toBeTruthy()
    expect(content).toBeTruthy()
    expect(content.textContent).toContain('Remote content')

    // Initially collapsed
    expect(button.getAttribute('aria-expanded')).toBe('false')

    // Click expands the remote content
    fireEvent.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('true')
    expect(
      content.classList.contains('dnb-height-animation--is-in-dom')
    ).toBe(true)

    // Click collapses again
    fireEvent.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('false')
  })

  it('focuses content on user click', () => {
    render(
      <Accordion variant="tertiary" title="Toggle" noAnimation>
        <p>Content</p>
      </Accordion>
    )

    const button = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )

    fireEvent.click(button)

    const content = document.querySelector(
      '.dnb-accordion__tertiary-content'
    )
    expect(document.activeElement).toBe(content)
  })

  it('does not focus content when expanded programmatically', () => {
    const { rerender } = render(
      <Accordion variant="tertiary" title="Toggle" noAnimation>
        <p>Content</p>
      </Accordion>
    )

    rerender(
      <Accordion variant="tertiary" title="Toggle" expanded noAnimation>
        <p>Content</p>
      </Accordion>
    )

    const content = document.querySelector(
      '.dnb-accordion__tertiary-content'
    )
    expect(document.activeElement).not.toBe(content)
  })

  it('focuses standalone content on user click', () => {
    render(
      <>
        <Accordion
          variant="tertiary"
          title="Toggle"
          id="focus-split"
          noAnimation
        />
        <Accordion.Content id="focus-split" title="Details">
          <p>Remote content</p>
        </Accordion.Content>
      </>
    )

    const button = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )

    fireEvent.click(button)

    const content = document.getElementById('focus-split-content')
    expect(document.activeElement).toBe(content)
    expect(content.getAttribute('aria-label')).toBe('Details')
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Accordion variant="tertiary" title="Toggle" noAnimation>
        <p>Content</p>
      </Accordion>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })

  it('should have no accessibility violations in split placement', async () => {
    const { container } = render(
      <>
        <Accordion
          variant="tertiary"
          title="Toggle"
          id="axe-split"
          noAnimation
        />
        <Accordion.Content id="axe-split">
          <p>Content</p>
        </Accordion.Content>
      </>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })

  it('renders standalone Accordion.Content as a section element', () => {
    render(
      <>
        <Accordion
          variant="tertiary"
          title="Toggle"
          id="section-test"
          noAnimation
        />
        <Accordion.Content id="section-test" title="Details">
          <p>Content</p>
        </Accordion.Content>
      </>
    )

    const section = document.querySelector(
      '.dnb-accordion__tertiary-content'
    )
    expect(section.tagName).toBe('SECTION')
    expect(section.getAttribute('title')).toBe('Details')
  })

  it('supports keepInDOM=false on standalone Accordion.Content', () => {
    render(
      <>
        <Accordion
          variant="tertiary"
          title="Toggle"
          id="keep-test"
          noAnimation
        />
        <Accordion.Content id="keep-test" keepInDOM={false}>
          <p>Content</p>
        </Accordion.Content>
      </>
    )

    // When collapsed and keepInDOM=false, HeightAnimation removes from DOM
    expect(
      document.querySelector('.dnb-accordion__tertiary-content')
    ).toBeFalsy()
  })

  it('supports spacing props on standalone Accordion.Content', () => {
    render(
      <>
        <Accordion variant="tertiary" title="Toggle" id="spacing-test" />
        <Accordion.Content id="spacing-test" top="large">
          <p>Content</p>
        </Accordion.Content>
      </>
    )

    const content = document.querySelector(
      '.dnb-accordion__tertiary-content'
    )
    expect(content).toHaveClass('dnb-space__top--large')
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
