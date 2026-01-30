import React from 'react'
import { render } from '@testing-library/react'
import Container from '../Container'
import ItemContent, { ItemContentProps } from '../ItemContent'

describe('ItemContent', () => {
  it('renders with props as an object', () => {
    const props: ItemContentProps = {}

    render(<ItemContent {...props}>Content</ItemContent>)

    const element = document.querySelector('.dnb-list__item')

    expect(element).toBeInTheDocument()
    expect(element.classList).toContain('dnb-list__item')
  })

  it('renders as li element for list semantics', () => {
    render(<ItemContent>Content</ItemContent>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.tagName).toBe('LI')
  })

  it('merges custom className', () => {
    render(
      <ItemContent className="custom-class">
        <span>Child</span>
      </ItemContent>
    )

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list__item')
    expect(element.classList).toContain('custom-class')
  })

  it('renders item content', () => {
    const text = 'List item content'

    render(<ItemContent>{text}</ItemContent>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.textContent).toContain(text)
  })

  it('inherits the variant modifier from the parent list', () => {
    render(
      <Container variant="basic">
        <ItemContent>Inherited</ItemContent>
      </Container>
    )

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list--variant-basic')
  })

  it('lets the item override the inherited variant', () => {
    render(
      <Container variant="basic">
        <ItemContent variant="custom">Override</ItemContent>
      </Container>
    )

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list--variant-custom')
    expect(element.classList).not.toContain('dnb-list--variant-basic')
  })

  it('applies selected modifier class when selected', () => {
    render(<ItemContent selected>Selected item</ItemContent>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list__item--selected')
  })

  it('always has dnb-t__size--basis class', () => {
    render(<ItemContent>Content</ItemContent>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-t__size--basis')
  })

  it('forwards custom HTML attributes', () => {
    render(
      <ItemContent
        data-testid="list-item"
        data-foo="bar"
        aria-label="List item label"
        id="my-item"
      >
        Content
      </ItemContent>
    )

    const element = document.querySelector('.dnb-list__item')

    expect(element.getAttribute('data-testid')).toBe('list-item')
    expect(element.getAttribute('data-foo')).toBe('bar')
    expect(element.getAttribute('aria-label')).toBe('List item label')
    expect(element.getAttribute('id')).toBe('my-item')
  })

  it('supports spacing props and applies spacing classes', () => {
    render(
      <ItemContent top="large" bottom="small">
        Content
      </ItemContent>
    )

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-space__top--large')
    expect(element.classList).toContain('dnb-space__bottom--small')
  })

  it('applies pending modifier and pending indicator when pending is true', () => {
    render(<ItemContent pending>Content</ItemContent>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list__item--pending')
    expect(
      element.querySelector('.dnb-list__item__pending')
    ).toBeInTheDocument()
  })

  it('applies skeleton font class when skeleton is true', () => {
    render(<ItemContent skeleton>Content</ItemContent>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect(ItemContent._supportsSpacingProps).toBe(true)
  })
})
