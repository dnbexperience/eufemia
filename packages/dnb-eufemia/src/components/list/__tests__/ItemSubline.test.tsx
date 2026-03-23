import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import ItemSubline from '../ItemSubline'
import ItemContent from '../ItemContent'
import Container from '../Container'

describe('ItemSubline', () => {
  it('renders with children', () => {
    render(<ItemSubline>Subline content</ItemSubline>)

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('Subline content')
  })

  it('renders content wrapper with subline class', () => {
    render(<ItemSubline>Content</ItemSubline>)

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('Content')
  })

  it('merges custom className', () => {
    render(<ItemSubline className="my-subline">Content</ItemSubline>)

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element.classList).toContain('dnb-list__item__subline')
    expect(element.classList).toContain('my-subline')
  })

  it('forwards custom HTML attributes', () => {
    render(
      <ItemSubline
        data-testid="item-subline"
        data-foo="bar"
        aria-label="Subline section"
        id="subline-id"
      >
        Content
      </ItemSubline>
    )

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element.getAttribute('data-testid')).toBe('item-subline')
    expect(element.getAttribute('data-foo')).toBe('bar')
    expect(element.getAttribute('aria-label')).toBe('Subline section')
    expect(element.getAttribute('id')).toBe('subline-id')
  })

  it('applies default fontSize small', () => {
    render(<ItemSubline>Content</ItemSubline>)

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element.classList).toContain('dnb-t__size--small')
  })

  it('supports fontSize prop', () => {
    render(<ItemSubline fontSize="basis">Content</ItemSubline>)

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element.classList).toContain('dnb-t__size--basis')
  })

  it('supports fontWeight prop', () => {
    render(<ItemSubline fontWeight="medium">Content</ItemSubline>)

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element.classList).toContain('dnb-t__weight--medium')
  })

  it('supports fontSize and fontWeight together', () => {
    render(
      <ItemSubline fontSize="x-small" fontWeight="medium">
        Content
      </ItemSubline>
    )

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element.classList).toContain('dnb-t__size--x-small')
    expect(element.classList).toContain('dnb-t__weight--medium')
  })

  it('supports variant description', () => {
    render(
      <ItemSubline variant="description">Description text</ItemSubline>
    )

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element.classList).toContain(
      'dnb-list__item__subline--description'
    )
  })

  it('applies default fontSize small when variant is description', () => {
    render(
      <ItemSubline variant="description">Description text</ItemSubline>
    )

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element.classList).toContain('dnb-t__size--small')
  })

  it('allows fontSize override when variant is description', () => {
    render(
      <ItemSubline variant="description" fontSize="x-small">
        Description text
      </ItemSubline>
    )

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element.classList).toContain('dnb-t__size--x-small')
    expect(element.classList).not.toContain('dnb-t__size--small')
  })

  it('supports spacing props and applies spacing classes', () => {
    render(
      <ItemSubline top="medium" left="x-small">
        Content
      </ItemSubline>
    )

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element.classList).toContain('dnb-space__top--medium')
    expect(element.classList).toContain('dnb-space__left--x-small')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect(ItemSubline._supportsSpacingProps).toBe(true)
  })

  it('does not accept unrelated ItemContent props', () => {
    render(<ItemSubline>Content</ItemSubline>)

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element.getAttribute('selected')).toBeNull()
    expect(element.getAttribute('pending')).toBeNull()
    expect(element.getAttribute('skeleton')).toBeNull()
  })

  it('applies skeleton class when skeleton prop is true', () => {
    render(<ItemSubline skeleton>Content</ItemSubline>)

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('inherits skeleton from Container context', () => {
    render(
      <Container skeleton>
        <ItemSubline>Content</ItemSubline>
      </Container>
    )

    const element = document.querySelector('.dnb-list__item__subline')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Container>
        <ItemContent>
          <ItemSubline>Subline content</ItemSubline>
        </ItemContent>
      </Container>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
