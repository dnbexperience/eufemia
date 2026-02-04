import React from 'react'
import { render } from '@testing-library/react'
import Container from '../Container'
import ItemBasic, { ItemBasicProps } from '../ItemBasic'
import { fish_medium } from '../../../icons'

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

  it('renders subtitle when subtitle prop is provided', () => {
    render(
      <ItemBasic title="Item title" subtitle="Subtitle">
        Content
      </ItemBasic>
    )

    const element = document.querySelector('.dnb-list__item')
    const subtitleElement = element.querySelector(
      '.dnb-list__item__subtitle'
    )

    expect(subtitleElement).toBeInTheDocument()
    expect(subtitleElement.textContent).toBe('Subtitle')
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

  it('applies selected modifier class when selected', () => {
    render(<ItemBasic selected>Selected item</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list__item--selected')
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
    expect(ItemBasic._supportsSpacingProps).toBe(true)
  })
})
