import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import ItemCenter from '../ItemCenter'
import ItemContent from '../ItemContent'
import Container from '../Container'

describe('ItemCenter', () => {
  it('renders with children', () => {
    render(<ItemCenter>Center content</ItemCenter>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('Center content')
  })

  it('has dnb-t__size--basis class', () => {
    render(<ItemCenter>Content</ItemCenter>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-t__size--basis')
  })

  it('applies fontSize="small"', () => {
    render(<ItemCenter fontSize="small">Content</ItemCenter>)

    const element = document.querySelector('.dnb-list__item__center')
    expect(element.classList).toContain('dnb-t__size--small')
    expect(element.classList).not.toContain('dnb-t__size--basis')
  })

  it('applies fontSize="basis"', () => {
    render(<ItemCenter fontSize="basis">Content</ItemCenter>)

    const element = document.querySelector('.dnb-list__item__center')
    expect(element.classList).toContain('dnb-t__size--basis')
  })

  it('does not apply fontWeight medium class by default', () => {
    render(<ItemCenter>Content</ItemCenter>)

    const element = document.querySelector('.dnb-list__item__center')
    expect(element.classList).not.toContain('dnb-t__weight--medium')
  })

  it('applies fontWeight="medium"', () => {
    render(<ItemCenter fontWeight="medium">Content</ItemCenter>)

    const element = document.querySelector('.dnb-list__item__center')
    expect(element.classList).toContain('dnb-t__weight--medium')
  })

  it('omits fontWeight class when fontWeight is regular', () => {
    render(<ItemCenter fontWeight="regular">Content</ItemCenter>)

    const element = document.querySelector('.dnb-list__item__center')
    expect(element.classList).not.toContain('dnb-t__weight--medium')
  })

  it('merges custom className', () => {
    render(<ItemCenter className="my-center">Content</ItemCenter>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-t__size--basis')
    expect(element.classList).toContain('my-center')
  })

  it('forwards custom HTML attributes', () => {
    render(
      <ItemCenter
        data-testid="item-center"
        data-foo="bar"
        aria-label="Center section"
        id="center-id"
      >
        Content
      </ItemCenter>
    )

    const element = document.querySelector('.dnb-flex-item')
    expect(element.getAttribute('data-testid')).toBe('item-center')
    expect(element.getAttribute('data-foo')).toBe('bar')
    expect(element.getAttribute('aria-label')).toBe('Center section')
    expect(element.getAttribute('id')).toBe('center-id')
  })

  it('supports spacing props and applies spacing classes', () => {
    render(
      <ItemCenter top="large" left="small">
        Content
      </ItemCenter>
    )

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-space__top--large')
    expect(element.classList).toContain('dnb-space__left--small')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect(ItemCenter._supportsSpacingProps).toBe(true)
  })

  it('does not accept unrelated ItemContent props', () => {
    render(<ItemCenter>Content</ItemCenter>)

    const element = document.querySelector('.dnb-list__item__center')

    expect(element.getAttribute('variant')).toBeNull()
    expect(element.getAttribute('selected')).toBeNull()
    expect(element.getAttribute('pending')).toBeNull()
    expect(element.getAttribute('skeleton')).toBeNull()
  })

  it('applies skeleton class when skeleton prop is true', () => {
    render(<ItemCenter skeleton>Content</ItemCenter>)

    const element = document.querySelector('.dnb-list__item__center')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('inherits skeleton from Container context', () => {
    render(
      <Container skeleton>
        <ItemCenter>Content</ItemCenter>
      </Container>
    )

    const element = document.querySelector('.dnb-list__item__center')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Container>
        <ItemContent>
          <ItemCenter>Center content</ItemCenter>
        </ItemContent>
      </Container>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
