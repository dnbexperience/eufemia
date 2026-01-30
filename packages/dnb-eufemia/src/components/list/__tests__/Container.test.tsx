import React from 'react'
import { render } from '@testing-library/react'
import Container, { ListContainerProps } from '../Container'
import ItemContent from '../ItemContent'

describe('List Container', () => {
  it('renders with props as an object', () => {
    const props: ListContainerProps = {}

    render(<Container {...props}>Content</Container>)

    const element = document.querySelector('.dnb-list')

    expect(element).toBeInTheDocument()
    expect(element.classList).toContain('dnb-list')
    expect(element.classList).toContain('dnb-list__container')
  })

  it('renders as ul element for list semantics', () => {
    render(<Container>Content</Container>)

    const element = document.querySelector('.dnb-list')

    expect(element.tagName).toBe('UL')
  })

  it('merges custom className', () => {
    render(
      <Container className="custom-class">
        <span>Child</span>
      </Container>
    )

    const element = document.querySelector('.dnb-list')

    expect(element.classList).toContain('dnb-list')
    expect(element.classList).toContain('dnb-list__container')
    expect(element.classList).toContain('custom-class')
  })

  it('renders container content', () => {
    const text = 'List container content'

    render(<Container>{text}</Container>)

    const element = document.querySelector('.dnb-list')

    expect(element.textContent).toContain(text)
  })

  it('adds the variant modifier when requested', () => {
    render(<Container variant="basic">Content</Container>)

    const element = document.querySelector('.dnb-list')

    expect(element.classList).toContain('dnb-list--variant-basic')
  })

  it('adds separated modifier class when separated is true', () => {
    render(<Container separated>Content</Container>)

    const element = document.querySelector('.dnb-list')

    expect(element.classList).toContain('dnb-list--separated')
  })

  it('does not add separated class when separated is false or omitted', () => {
    render(<Container>Content</Container>)

    const element = document.querySelector('.dnb-list')

    expect(element.classList).not.toContain('dnb-list--separated')
  })

  it('renders valid list structure with ul containing li items', () => {
    render(
      <Container>
        <ItemContent>Item 1</ItemContent>
        <ItemContent>Item 2</ItemContent>
      </Container>
    )

    const list = document.querySelector('.dnb-list')
    const items = document.querySelectorAll('.dnb-list__item')

    expect(list.tagName).toBe('UL')
    expect(items.length).toBe(2)
    items.forEach((item) => {
      expect(item.tagName).toBe('LI')
    })
  })
})
