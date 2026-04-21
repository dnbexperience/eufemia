import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import ListShowMoreButton from '../ListShowMoreButton'
import Container from '../Container'
import ItemContent from '../ItemContent'
import ItemAccordion from '../ItemAccordion'

function getButton() {
  return document.querySelector('.dnb-button--tertiary')
}

describe('List.ShowMoreButton', () => {
  it('renders a tertiary button with default collapsed text', () => {
    render(<ListShowMoreButton id="toggle-list" />)

    const button = getButton()

    expect(button).toBeInTheDocument()
    expect(button.textContent).toContain('Vis mer')
  })

  it('renders chevron icon when collapsed', () => {
    render(<ListShowMoreButton id="toggle-icon" />)

    const icon = document.querySelector('.dnb-icon')

    expect(icon).toBeInTheDocument()
  })

  it('toggles text to expanded on click', () => {
    render(<ListShowMoreButton id="toggle-text" />)

    expect(getButton().textContent).toContain('Vis mer')

    fireEvent.click(getButton())

    expect(getButton().textContent).toContain('Vis mindre')
  })

  it('toggles back to collapsed text on second click', () => {
    render(<ListShowMoreButton id="toggle-back" />)

    fireEvent.click(getButton())

    expect(getButton().textContent).toContain('Vis mindre')

    fireEvent.click(getButton())

    expect(getButton().textContent).toContain('Vis mer')
  })

  it('sets aria-expanded false when collapsed', () => {
    render(<ListShowMoreButton id="toggle-aria" />)

    expect(getButton()).toHaveAttribute('aria-expanded', 'false')
  })

  it('sets aria-expanded true when expanded', () => {
    render(<ListShowMoreButton id="toggle-aria-exp" />)

    fireEvent.click(getButton())

    expect(getButton()).toHaveAttribute('aria-expanded', 'true')
  })

  it('supports custom showMore and showLess props', () => {
    render(
      <ListShowMoreButton
        id="toggle-custom"
        showLess="Hide items"
        showMore="Show items"
      />,
    )

    expect(getButton().textContent).toContain('Show items')

    fireEvent.click(getButton())

    expect(getButton().textContent).toContain('Hide items')
  })

  it('controls Container visibility via shared state', () => {
    render(
      <>
        <ListShowMoreButton id="shared-toggle" />
        <Container id="shared-toggle" visibleCount={2}>
          <ItemContent>Item 1</ItemContent>
          <ItemContent>Item 2</ItemContent>
          <ItemContent>Item 3</ItemContent>
          <ItemContent>Item 4</ItemContent>
        </Container>
      </>,
    )

    expect(
      document.querySelectorAll('.dnb-list__item:not([hidden])'),
    ).toHaveLength(2)

    fireEvent.click(getButton())

    expect(
      document.querySelectorAll('.dnb-list__item:not([hidden])'),
    ).toHaveLength(4)
  })

  it('collapses back when toggled again', () => {
    render(
      <>
        <ListShowMoreButton id="collapse-toggle" />
        <Container id="collapse-toggle" visibleCount={1}>
          <ItemContent>Item 1</ItemContent>
          <ItemContent>Item 2</ItemContent>
          <ItemContent>Item 3</ItemContent>
        </Container>
      </>,
    )

    fireEvent.click(getButton())

    expect(
      document.querySelectorAll('.dnb-list__item:not([hidden])'),
    ).toHaveLength(3)

    fireEvent.click(getButton())

    expect(
      document.querySelectorAll('.dnb-list__item:not([hidden])'),
    ).toHaveLength(1)
  })

  it('shows all items when Container has no visibleCount', () => {
    render(
      <>
        <ListShowMoreButton id="no-limit" />
        <Container id="no-limit">
          <ItemContent>Item 1</ItemContent>
          <ItemContent>Item 2</ItemContent>
          <ItemContent>Item 3</ItemContent>
        </Container>
      </>,
    )

    expect(document.querySelectorAll('.dnb-list__item')).toHaveLength(3)
  })

  it('limits visible items with visibleCount alone (no id)', () => {
    render(
      <Container visibleCount={2}>
        <ItemContent>Item 1</ItemContent>
        <ItemContent>Item 2</ItemContent>
        <ItemContent>Item 3</ItemContent>
        <ItemContent>Item 4</ItemContent>
      </Container>,
    )

    expect(
      document.querySelectorAll('.dnb-list__item:not([hidden])'),
    ).toHaveLength(2)
  })

  it('preserves accordion open state after collapsing and re-expanding', () => {
    render(
      <>
        <ListShowMoreButton id="accordion-state" />
        <Container id="accordion-state" visibleCount={2}>
          <ItemAccordion title="First">
            <ItemAccordion.Content>Content 1</ItemAccordion.Content>
          </ItemAccordion>
          <ItemAccordion title="Second">
            <ItemAccordion.Content>Content 2</ItemAccordion.Content>
          </ItemAccordion>
          <ItemAccordion title="Third">
            <ItemAccordion.Content>Content 3</ItemAccordion.Content>
          </ItemAccordion>
          <ItemAccordion title="Fourth">
            <ItemAccordion.Content>Content 4</ItemAccordion.Content>
          </ItemAccordion>
        </Container>
      </>,
    )

    const accordionHeaders = document.querySelectorAll(
      '.dnb-list__item__accordion__header',
    )

    fireEvent.click(accordionHeaders[1])
    expect(accordionHeaders[1]).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(getButton())
    expect(
      document.querySelectorAll('.dnb-list__item:not([hidden])'),
    ).toHaveLength(4)

    fireEvent.click(getButton())
    const updatedHeaders = document.querySelectorAll(
      '.dnb-list__item__accordion__header',
    )
    expect(updatedHeaders[1]).toHaveAttribute('aria-expanded', 'true')
  })

  it('wraps list in HeightAnimation only when toggle is active', () => {
    const { container, rerender } = render(
      <Container>
        <ItemContent>Item 1</ItemContent>
        <ItemContent>Item 2</ItemContent>
      </Container>,
    )

    expect(
      container.querySelector('.dnb-height-animation'),
    ).not.toBeInTheDocument()

    rerender(
      <>
        <ListShowMoreButton id="anim-toggle" />
        <Container id="anim-toggle" visibleCount={1}>
          <ItemContent>Item 1</ItemContent>
          <ItemContent>Item 2</ItemContent>
        </Container>
      </>,
    )

    expect(
      container.querySelector('.dnb-height-animation'),
    ).toBeInTheDocument()
  })

  it('sets hidden attribute on overflow items when collapsed', () => {
    render(
      <>
        <ListShowMoreButton id="hidden-attr" />
        <Container id="hidden-attr" visibleCount={2}>
          <ItemContent>Item 1</ItemContent>
          <ItemContent>Item 2</ItemContent>
          <ItemContent>Item 3</ItemContent>
          <ItemContent>Item 4</ItemContent>
        </Container>
      </>,
    )

    const items = document.querySelectorAll('.dnb-list__item')

    expect(items[0]).not.toHaveAttribute('hidden')
    expect(items[1]).not.toHaveAttribute('hidden')
    expect(items[2]).toHaveAttribute('hidden')
    expect(items[3]).toHaveAttribute('hidden')

    fireEvent.click(getButton())

    expect(items[2]).not.toHaveAttribute('hidden')
    expect(items[3]).not.toHaveAttribute('hidden')
  })

  it('sets aria-controls pointing to the container id', () => {
    render(
      <>
        <ListShowMoreButton id="controls-test" />
        <Container id="controls-test" visibleCount={2}>
          <ItemContent>Item 1</ItemContent>
          <ItemContent>Item 2</ItemContent>
          <ItemContent>Item 3</ItemContent>
        </Container>
      </>,
    )

    expect(getButton()).toHaveAttribute('aria-controls', 'controls-test')
  })

  it('has no axe violations', async () => {
    const { container } = render(<ListShowMoreButton id="a11y-toggle" />)

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
