import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import ListShowMoreButton from '../ListShowMoreButton'
import Container from '../Container'
import ItemContent from '../ItemContent'

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
      />
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
      </>
    )

    expect(document.querySelectorAll('.dnb-list__item')).toHaveLength(2)

    fireEvent.click(getButton())

    expect(document.querySelectorAll('.dnb-list__item')).toHaveLength(4)
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
      </>
    )

    fireEvent.click(getButton())

    expect(document.querySelectorAll('.dnb-list__item')).toHaveLength(3)

    fireEvent.click(getButton())

    expect(document.querySelectorAll('.dnb-list__item')).toHaveLength(1)
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
      </>
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
      </Container>
    )

    expect(document.querySelectorAll('.dnb-list__item')).toHaveLength(2)
  })

  it('has no axe violations', async () => {
    const { container } = render(<ListShowMoreButton id="a11y-toggle" />)

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
