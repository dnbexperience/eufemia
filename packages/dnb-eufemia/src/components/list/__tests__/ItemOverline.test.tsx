import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import ItemOverline from '../ItemOverline'
import ItemContent from '../ItemContent'
import Container from '../Container'

describe('ItemOverline', () => {
  it('renders with children', () => {
    render(<ItemOverline>Overline content</ItemOverline>)

    const element = document.querySelector('.dnb-list__item__overline')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('Overline content')
  })

  it('renders content wrapper with overline class', () => {
    render(<ItemOverline>Content</ItemOverline>)

    const element = document.querySelector('.dnb-list__item__overline')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('Content')
  })

  it('merges custom className', () => {
    render(<ItemOverline className="my-overline">Content</ItemOverline>)

    const element = document.querySelector('.dnb-list__item__overline')

    expect(element.classList).toContain('dnb-list__item__overline')
    expect(element.classList).toContain('my-overline')
  })

  it('forwards custom HTML attributes', () => {
    render(
      <ItemOverline
        data-testid="item-overline"
        data-foo="bar"
        aria-label="Overline section"
        id="overline-id"
      >
        Content
      </ItemOverline>
    )

    const element = document.querySelector('.dnb-list__item__overline')

    expect(element.getAttribute('data-testid')).toBe('item-overline')
    expect(element.getAttribute('data-foo')).toBe('bar')
    expect(element.getAttribute('aria-label')).toBe('Overline section')
    expect(element.getAttribute('id')).toBe('overline-id')
  })

  it('applies default fontSize x-small', () => {
    render(<ItemOverline>Content</ItemOverline>)

    const element = document.querySelector('.dnb-list__item__overline')

    expect(element.classList).toContain('dnb-t__size--x-small')
  })

  it('supports fontSize prop', () => {
    render(<ItemOverline fontSize="small">Content</ItemOverline>)

    const element = document.querySelector('.dnb-list__item__overline')

    expect(element.classList).toContain('dnb-t__size--small')
  })

  it('applies default fontWeight medium', () => {
    render(<ItemOverline>Content</ItemOverline>)

    const element = document.querySelector('.dnb-list__item__overline')

    expect(element.classList).toContain('dnb-t__weight--medium')
  })

  it('supports fontWeight prop', () => {
    render(<ItemOverline fontWeight="regular">Content</ItemOverline>)

    const element = document.querySelector('.dnb-list__item__overline')

    expect(element.classList).not.toContain('dnb-t__weight--medium')
  })

  it('supports fontSize and fontWeight together', () => {
    render(
      <ItemOverline fontSize="small" fontWeight="medium">
        Content
      </ItemOverline>
    )

    const element = document.querySelector('.dnb-list__item__overline')

    expect(element.classList).toContain('dnb-t__size--small')
    expect(element.classList).toContain('dnb-t__weight--medium')
  })

  it('supports spacing props and applies spacing classes', () => {
    render(
      <ItemOverline top="medium" left="x-small">
        Content
      </ItemOverline>
    )

    const element = document.querySelector('.dnb-list__item__overline')

    expect(element.classList).toContain('dnb-space__top--medium')
    expect(element.classList).toContain('dnb-space__left--x-small')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect(ItemOverline._supportsSpacingProps).toBe(true)
  })

  it('does not accept unrelated ItemContent props', () => {
    render(<ItemOverline>Content</ItemOverline>)

    const element = document.querySelector('.dnb-list__item__overline')

    expect(element.getAttribute('variant')).toBeNull()
    expect(element.getAttribute('selected')).toBeNull()
    expect(element.getAttribute('pending')).toBeNull()
    expect(element.getAttribute('skeleton')).toBeNull()
  })

  it('applies skeleton class when skeleton prop is true', () => {
    render(<ItemOverline skeleton>Content</ItemOverline>)

    const element = document.querySelector('.dnb-list__item__overline')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('inherits skeleton from Container context', () => {
    render(
      <Container skeleton>
        <ItemOverline>Content</ItemOverline>
      </Container>
    )

    const element = document.querySelector('.dnb-list__item__overline')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Container>
        <ItemContent>
          <ItemOverline>Overline content</ItemOverline>
        </ItemContent>
      </Container>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
