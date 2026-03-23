import React from 'react'
import { render } from '@testing-library/react'
import Container, { ListContainerProps } from '../Container'
import ItemContent from '../ItemContent'
import Provider from '../../../shared/Provider'

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

  it('keeps intrinsic li children as direct descendants of ul', () => {
    render(
      <Container separated>
        <li>Item 1</li>
        <li>Item 2</li>
      </Container>
    )

    const list = document.querySelector('.dnb-list')
    const children = Array.from(list.children)

    expect(children).toHaveLength(2)
    expect(children[0].tagName).toBe('LI')
    expect(children[0]).toHaveClass('dnb-space__top--zero')
    expect(children[1].tagName).toBe('LI')
    expect(children[1]).toHaveClass('dnb-space__top--small')
    expect(list.querySelector(':scope > div')).toBeNull()
  })

  it('propagates skeleton to child items via context', () => {
    render(
      <Container skeleton>
        <ItemContent>Item 1</ItemContent>
        <ItemContent>Item 2</ItemContent>
      </Container>
    )

    const items = document.querySelectorAll('.dnb-list__item')

    items.forEach((item) => {
      expect(item.classList).toContain('dnb-skeleton')
      expect(item.classList).toContain('dnb-skeleton--font')
    })
  })

  it('allows individual items to override skeleton from container', () => {
    render(
      <Container skeleton>
        <ItemContent>Skeleton item</ItemContent>
        <ItemContent skeleton={false}>Not skeleton</ItemContent>
      </Container>
    )

    const items = document.querySelectorAll('.dnb-list__item')

    expect(items[0].classList).toContain('dnb-skeleton')
    expect(items[1].classList).not.toContain('dnb-skeleton')
  })

  it('defaults separated to false when not provided', () => {
    render(
      <Container>
        <ItemContent>Item</ItemContent>
      </Container>
    )

    const element = document.querySelector('.dnb-list__container')

    expect(element.classList).not.toContain('dnb-list--separated')
  })

  it('inherits skeleton from SharedContext Provider', () => {
    render(
      <Provider skeleton>
        <Container>
          <ItemContent>Item</ItemContent>
        </Container>
      </Provider>
    )

    const item = document.querySelector('.dnb-list__item')

    expect(item.classList).toContain('dnb-skeleton')
  })

  it('allows local skeleton prop to override SharedContext', () => {
    render(
      <Provider skeleton>
        <Container skeleton={false}>
          <ItemContent>Item</ItemContent>
        </Container>
      </Provider>
    )

    const item = document.querySelector('.dnb-list__item')

    expect(item.classList).not.toContain('dnb-skeleton')
  })

  it('propagates disabled to child items via context', () => {
    render(
      <Container disabled>
        <ItemContent>Item</ItemContent>
      </Container>
    )

    const item = document.querySelector('.dnb-list__item')

    expect(item.classList).toContain('dnb-list__item--disabled')
  })

  it('allows individual items to override disabled from container', () => {
    render(
      <Container disabled>
        <ItemContent disabled={false}>Item</ItemContent>
      </Container>
    )

    const item = document.querySelector('.dnb-list__item')

    expect(item.classList).not.toContain('dnb-list__item--disabled')
  })
})
