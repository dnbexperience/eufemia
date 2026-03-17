import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Container from '../Container'
import type { ItemBasicProps } from '../ItemBasic'
import ItemBasic from '../ItemBasic'
import { fish_medium } from '../../../icons'
import type { ComponentMarkers } from '../../../shared/helpers/withComponentMarkers'

describe('ItemBasic', () => {
  it('renders with props as an object', () => {
    const props: ItemBasicProps = {}

    render(<ItemBasic {...props}>Content</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element).toBeInTheDocument()
    expect(element.classList).toContain('dnb-list__item')
  })

  it('renders as li element for list semantics', () => {
    render(<ItemBasic>Content</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.tagName).toBe('LI')
  })

  it('renders item content', () => {
    const text = 'List item content'

    render(<ItemBasic>{text}</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.textContent).toContain(text)
  })

  it('renders icon when icon prop is provided', () => {
    render(<ItemBasic icon={fish_medium}>Content</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')
    const iconWrapper = element.querySelector('.dnb-list__item__icon')

    expect(iconWrapper).toBeInTheDocument()
    expect(element.querySelector('.dnb-icon')).toBeInTheDocument()
  })

  it('renders title when title prop is provided', () => {
    render(<ItemBasic title="Item title">Content</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')
    const titleWrapper = element.querySelector('.dnb-list__item__title')

    expect(titleWrapper).toBeInTheDocument()
    expect(titleWrapper.textContent).toContain('Item title')
  })

  it('renders icon, title and children in order', () => {
    render(
      <ItemBasic icon={fish_medium} title="Title">
        <span data-testid="cell">Cell</span>
      </ItemBasic>
    )

    const element = document.querySelector('.dnb-list__item')
    const icon = element.querySelector('.dnb-list__item__icon')
    const title = element.querySelector('.dnb-list__item__title')
    const cell = element.querySelector('[data-testid="cell"]')

    expect(icon).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(cell).toBeInTheDocument()
    expect(cell.textContent).toBe('Cell')
  })

  it('inherits the variant modifier from the parent list', () => {
    render(
      <Container variant="basic">
        <ItemBasic>Inherited</ItemBasic>
      </Container>
    )

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list--variant-basic')
  })

  it('applies variant prop directly without a Container', () => {
    render(<ItemBasic variant="basic">Direct variant</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list--variant-basic')
  })

  it('does not apply variant class when no variant and no Container', () => {
    render(<ItemBasic>No variant</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.className).not.toContain('dnb-list--variant')
  })

  it('forwards variant prop to ItemContent when inside a Container', () => {
    render(
      <Container variant="basic">
        <ItemBasic variant="basic">With prop and context</ItemBasic>
      </Container>
    )

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list--variant-basic')
  })

  it('applies selected modifier class when selected', () => {
    render(<ItemBasic selected>Selected item</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list__item--selected')
    expect(element.classList).toContain('dnb-list__item--selection')
  })

  it('applies selection modifier class when selected is false', () => {
    render(<ItemBasic selected={false}>Selectable item</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).not.toContain('dnb-list__item--selected')
    expect(element.classList).toContain('dnb-list__item--selection')
  })

  it('merges custom className', () => {
    render(
      <ItemBasic className="custom-class">
        <span>Child</span>
      </ItemBasic>
    )

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list__item')
    expect(element.classList).toContain('custom-class')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect((ItemBasic as ComponentMarkers)._supportsSpacingProps).toBe(
      true
    )
  })

  it('applies disabled modifier class when disabled', () => {
    render(<ItemBasic disabled>Disabled item</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list__item--disabled')
  })

  it('applies pending modifier and pending indicator when pending', () => {
    render(<ItemBasic pending>Pending item</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list__item--pending')
    expect(
      element.querySelector('.dnb-list__item__pending')
    ).toBeInTheDocument()
  })

  it('applies skeleton font class when skeleton is true', () => {
    render(<ItemBasic skeleton>Skeleton item</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Container>
        <ItemBasic title="Title">Content</ItemBasic>
      </Container>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
