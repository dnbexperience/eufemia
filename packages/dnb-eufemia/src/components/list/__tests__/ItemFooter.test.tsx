import React, { useContext } from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import ItemFooter from '../ItemFooter'
import ItemContent from '../ItemContent'
import Container from '../Container'
import Context from '../../../shared/Context'
import type { ComponentMarkers } from '../../../shared/helpers/withComponentMarkers'

describe('ItemFooter', () => {
  it('renders with children', () => {
    render(<ItemFooter>Footer content</ItemFooter>)

    const contentWrapper = document.querySelector(
      '.dnb-list__item__footer'
    )

    expect(contentWrapper).toBeInTheDocument()
    expect(contentWrapper.textContent).toContain('Footer content')
  })

  it('renders Hr separator and content wrapper with distinct classes', () => {
    render(<ItemFooter>Content</ItemFooter>)

    const separator = document.querySelector(
      '.dnb-list__item__footer-separator'
    )
    const contentWrapper = document.querySelector(
      '.dnb-list__item__footer'
    )

    expect(separator).toBeInTheDocument()
    expect(separator.tagName).toBe('HR')
    expect(contentWrapper).toBeInTheDocument()
    expect(contentWrapper.textContent).toContain('Content')
  })

  it('merges custom className on content wrapper', () => {
    render(<ItemFooter className="my-footer">Content</ItemFooter>)

    const contentWrapper = document.querySelector(
      '.dnb-list__item__footer'
    )

    expect(contentWrapper.classList).toContain('dnb-list__item__footer')
    expect(contentWrapper.classList).toContain('my-footer')
  })

  it('forwards custom HTML attributes to content wrapper', () => {
    render(
      <ItemFooter
        data-testid="item-footer"
        data-foo="bar"
        aria-label="Footer section"
        id="footer-id"
      >
        Content
      </ItemFooter>
    )

    const contentWrapper = document.querySelector(
      '.dnb-list__item__footer'
    )

    expect(contentWrapper.getAttribute('data-testid')).toBe('item-footer')
    expect(contentWrapper.getAttribute('data-foo')).toBe('bar')
    expect(contentWrapper.getAttribute('aria-label')).toBe(
      'Footer section'
    )
    expect(contentWrapper.getAttribute('id')).toBe('footer-id')
  })

  it('supports spacing props and applies spacing classes', () => {
    render(
      <ItemFooter top="medium" left="x-small">
        Content
      </ItemFooter>
    )

    const contentWrapper = document.querySelector(
      '.dnb-list__item__footer'
    )

    expect(contentWrapper.classList).toContain('dnb-space__top--medium')
    expect(contentWrapper.classList).toContain('dnb-space__left--x-small')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect((ItemFooter as ComponentMarkers)._supportsSpacingProps).toBe(
      true
    )
  })

  it('does not accept unrelated ItemContent props', () => {
    render(<ItemFooter>Content</ItemFooter>)

    const element = document.querySelector(
      '.dnb-flex-item.dnb-list__item__footer'
    )

    expect(element.getAttribute('variant')).toBeNull()
    expect(element.getAttribute('selected')).toBeNull()
    expect(element.getAttribute('pending')).toBeNull()
    expect(element.getAttribute('skeleton')).toBeNull()
  })

  it('applies skeleton class when skeleton prop is true', () => {
    render(<ItemFooter skeleton>Content</ItemFooter>)

    const element = document.querySelector(
      '.dnb-list__item__footer:not(hr)'
    )

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('inherits skeleton from Container context', () => {
    render(
      <Container skeleton>
        <ItemFooter>Content</ItemFooter>
      </Container>
    )

    const element = document.querySelector(
      '.dnb-list__item__footer:not(hr)'
    )

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('propagates skeleton to children via context', () => {
    function SkeletonConsumer() {
      const context = useContext(Context)
      return <span data-skeleton={String(Boolean(context?.skeleton))} />
    }

    render(
      <ItemFooter skeleton>
        <SkeletonConsumer />
      </ItemFooter>
    )

    const consumer = document.querySelector('[data-skeleton]')
    expect(consumer.getAttribute('data-skeleton')).toBe('true')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Container>
        <ItemContent>
          <ItemFooter>Footer content</ItemFooter>
        </ItemContent>
      </Container>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
