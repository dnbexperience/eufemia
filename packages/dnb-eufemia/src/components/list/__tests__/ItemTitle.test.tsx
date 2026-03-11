import React, { useContext } from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import ItemTitle from '../ItemTitle'
import ItemContent from '../ItemContent'
import Container from '../Container'
import Context from '../../../shared/Context'
import type { ComponentMarkers } from '../../../shared/helpers/withComponentMarkers'

describe('ItemTitle', () => {
  it('renders with children', () => {
    render(<ItemTitle>Title text</ItemTitle>)

    const element = document.querySelector('.dnb-list__item__title')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('Title text')
  })

  it('has dnb-list__item__title class and wraps children with default fontSize basis', () => {
    render(<ItemTitle>Title</ItemTitle>)

    const element = document.querySelector('.dnb-list__item__title')

    expect(element.classList).toContain('dnb-list__item__title')
    expect(
      element.querySelector('.dnb-t__size--basis')
    ).toBeInTheDocument()
    expect(element.querySelector('.dnb-t__size--basis').textContent).toBe(
      'Title'
    )
  })

  it('supports fontSize prop with small value', () => {
    render(<ItemTitle fontSize="small">Small Title</ItemTitle>)

    const element = document.querySelector('.dnb-list__item__title')

    expect(
      element.querySelector('.dnb-t__size--small')
    ).toBeInTheDocument()
    expect(element.querySelector('.dnb-t__size--small').textContent).toBe(
      'Small Title'
    )
  })

  it('supports fontSize prop with basis value', () => {
    render(<ItemTitle fontSize="basis">Basis Title</ItemTitle>)

    const element = document.querySelector('.dnb-list__item__title')

    expect(
      element.querySelector('.dnb-t__size--basis')
    ).toBeInTheDocument()
  })

  it('does not apply medium fontWeight by default', () => {
    render(<ItemTitle>Title</ItemTitle>)

    const element = document.querySelector('.dnb-list__item__title')

    expect(
      element.querySelector('.dnb-t__weight--medium')
    ).not.toBeInTheDocument()
  })

  it('supports fontWeight prop with medium value', () => {
    render(<ItemTitle fontWeight="medium">Title</ItemTitle>)

    const span = document.querySelector(
      '.dnb-list__item__title .dnb-t__weight--medium'
    )

    expect(span).toBeInTheDocument()
    expect(span.textContent).toBe('Title')
  })

  it('merges custom className', () => {
    render(<ItemTitle className="my-title">Title</ItemTitle>)

    const element = document.querySelector('.dnb-list__item__title')

    expect(element.classList).toContain('dnb-list__item__title')
    expect(element.classList).toContain('my-title')
  })

  it('forwards custom HTML attributes', () => {
    render(
      <ItemTitle
        data-testid="item-title"
        data-foo="bar"
        aria-label="Item title"
        id="title-id"
      >
        Title
      </ItemTitle>
    )

    const element = document.querySelector('.dnb-list__item__title')

    expect(element.getAttribute('data-testid')).toBe('item-title')
    expect(element.getAttribute('data-foo')).toBe('bar')
    expect(element.getAttribute('aria-label')).toBe('Item title')
    expect(element.getAttribute('id')).toBe('title-id')
  })

  it('supports spacing props and applies spacing classes', () => {
    render(
      <ItemTitle top="small" bottom="medium">
        Title
      </ItemTitle>
    )

    const element = document.querySelector('.dnb-list__item__title')

    expect(element.classList).toContain('dnb-space__top--small')
    expect(element.classList).toContain('dnb-space__bottom--medium')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect((ItemTitle as ComponentMarkers)._supportsSpacingProps).toBe(
      true
    )
  })

  it('does not accept unrelated ItemContent props', () => {
    render(<ItemTitle>Content</ItemTitle>)

    const element = document.querySelector('.dnb-list__item__title')

    expect(element.getAttribute('variant')).toBeNull()
    expect(element.getAttribute('selected')).toBeNull()
    expect(element.getAttribute('pending')).toBeNull()
    expect(element.getAttribute('skeleton')).toBeNull()
  })

  it('applies skeleton class when skeleton prop is true', () => {
    render(<ItemTitle skeleton>Content</ItemTitle>)

    const element = document.querySelector('.dnb-list__item__title')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('inherits skeleton from Container context', () => {
    render(
      <Container skeleton>
        <ItemTitle>Content</ItemTitle>
      </Container>
    )

    const element = document.querySelector('.dnb-list__item__title')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('propagates skeleton to children via context', () => {
    function SkeletonConsumer() {
      const context = useContext(Context)
      return <span data-skeleton={String(Boolean(context?.skeleton))} />
    }

    render(
      <ItemTitle skeleton>
        <SkeletonConsumer />
      </ItemTitle>
    )

    const consumer = document.querySelector('[data-skeleton]')
    expect(consumer.getAttribute('data-skeleton')).toBe('true')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Container>
        <ItemContent>
          <ItemTitle>Title content</ItemTitle>
        </ItemContent>
      </Container>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
