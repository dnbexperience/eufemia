import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import ItemStart from '../ItemStart'
import ItemContent from '../ItemContent'
import Container from '../Container'

describe('ItemStart', () => {
  it('renders with children', () => {
    render(<ItemStart>Start content</ItemStart>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('Start content')
  })

  it('has dnb-t__size--basis class by default', () => {
    render(<ItemStart>Content</ItemStart>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-t__size--basis')
  })

  it('applies fontSize="basis"', () => {
    render(<ItemStart fontSize="basis">Content</ItemStart>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-t__size--basis')
  })

  it('applies fontSize="small"', () => {
    render(<ItemStart fontSize="small">Content</ItemStart>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-t__size--small')
    expect(element.classList).not.toContain('dnb-t__size--basis')
  })

  it('does not apply fontWeight medium class by default', () => {
    render(<ItemStart>Content</ItemStart>)

    const element = document.querySelector('.dnb-list__item__start')

    expect(element.classList).not.toContain('dnb-t__weight--medium')
  })

  it('applies fontWeight="medium"', () => {
    render(<ItemStart fontWeight="medium">Content</ItemStart>)

    const element = document.querySelector('.dnb-list__item__start')

    expect(element.classList).toContain('dnb-t__weight--medium')
  })

  it('omits fontWeight class when fontWeight is regular', () => {
    render(<ItemStart fontWeight="regular">Content</ItemStart>)

    const element = document.querySelector('.dnb-list__item__start')

    expect(element.classList).not.toContain('dnb-t__weight--medium')
  })

  it('merges custom className', () => {
    render(<ItemStart className="my-start">Content</ItemStart>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-t__size--basis')
    expect(element.classList).toContain('my-start')
  })

  it('forwards custom HTML attributes', () => {
    render(
      <ItemStart
        data-testid="item-start"
        data-foo="bar"
        aria-label="Start section"
        id="start-id"
      >
        Content
      </ItemStart>
    )

    const element = document.querySelector('.dnb-flex-item')
    expect(element.getAttribute('data-testid')).toBe('item-start')
    expect(element.getAttribute('data-foo')).toBe('bar')
    expect(element.getAttribute('aria-label')).toBe('Start section')
    expect(element.getAttribute('id')).toBe('start-id')
  })

  it('supports spacing props and applies spacing classes', () => {
    render(
      <ItemStart top="medium" left="x-small">
        Content
      </ItemStart>
    )

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-space__top--medium')
    expect(element.classList).toContain('dnb-space__left--x-small')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect(ItemStart._supportsSpacingProps).toBe(true)
  })

  it('does not accept unrelated ItemContent props', () => {
    render(<ItemStart>Content</ItemStart>)

    const element = document.querySelector('.dnb-list__item__start')

    expect(element.getAttribute('variant')).toBeNull()
    expect(element.getAttribute('selected')).toBeNull()
    expect(element.getAttribute('pending')).toBeNull()
    expect(element.getAttribute('skeleton')).toBeNull()
  })

  it('applies skeleton class when skeleton prop is true', () => {
    render(<ItemStart skeleton>Content</ItemStart>)

    const element = document.querySelector('.dnb-list__item__start')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('inherits skeleton from Container context', () => {
    render(
      <Container skeleton>
        <ItemStart>Content</ItemStart>
      </Container>
    )

    const element = document.querySelector('.dnb-list__item__start')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Container>
        <ItemContent>
          <ItemStart>Start content</ItemStart>
        </ItemContent>
      </Container>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
