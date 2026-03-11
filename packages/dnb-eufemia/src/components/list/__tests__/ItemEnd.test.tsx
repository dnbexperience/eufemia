import React, { useContext } from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import ItemEnd from '../ItemEnd'
import ItemContent from '../ItemContent'
import Container from '../Container'
import Context from '../../../shared/Context'
import type { ComponentMarkers } from '../../../shared/helpers/withComponentMarkers'

describe('ItemEnd', () => {
  it('renders with children', () => {
    render(<ItemEnd>End content</ItemEnd>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('End content')
  })

  it('has dnb-t__size--basis class by default', () => {
    render(<ItemEnd>Content</ItemEnd>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-t__size--basis')
  })

  it('applies fontSize="basis"', () => {
    render(<ItemEnd fontSize="basis">Content</ItemEnd>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-t__size--basis')
  })

  it('applies fontSize="small"', () => {
    render(<ItemEnd fontSize="small">Content</ItemEnd>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-t__size--small')
    expect(element.classList).not.toContain('dnb-t__size--basis')
  })

  it('applies dnb-t__weight--medium when fontWeight is medium (default)', () => {
    render(<ItemEnd>Content</ItemEnd>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-t__weight--medium')
  })

  it('omits dnb-t__weight--medium when fontWeight is regular', () => {
    render(<ItemEnd fontWeight="regular">Content</ItemEnd>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).not.toContain('dnb-t__weight--medium')
    expect(element.classList).toContain('dnb-t__size--basis')
  })

  it('merges custom className', () => {
    render(<ItemEnd className="my-end">Content</ItemEnd>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-t__size--basis')
    expect(element.classList).toContain('my-end')
  })

  it('forwards custom HTML attributes', () => {
    render(
      <ItemEnd
        data-testid="item-end"
        data-foo="bar"
        aria-label="End section"
        id="end-id"
      >
        Content
      </ItemEnd>
    )

    const element = document.querySelector('.dnb-flex-item')
    expect(element.getAttribute('data-testid')).toBe('item-end')
    expect(element.getAttribute('data-foo')).toBe('bar')
    expect(element.getAttribute('aria-label')).toBe('End section')
    expect(element.getAttribute('id')).toBe('end-id')
  })

  it('supports spacing props and applies spacing classes', () => {
    render(
      <ItemEnd top="small" right="large">
        Content
      </ItemEnd>
    )

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-space__top--small')
    expect(element.classList).toContain('dnb-space__right--large')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect((ItemEnd as ComponentMarkers)._supportsSpacingProps).toBe(true)
  })

  it('does not accept unrelated ItemContent props', () => {
    render(<ItemEnd>Content</ItemEnd>)

    const element = document.querySelector('.dnb-list__item__end')

    expect(element.getAttribute('variant')).toBeNull()
    expect(element.getAttribute('selected')).toBeNull()
    expect(element.getAttribute('pending')).toBeNull()
    expect(element.getAttribute('skeleton')).toBeNull()
  })

  it('applies skeleton class when skeleton prop is true', () => {
    render(<ItemEnd skeleton>Content</ItemEnd>)

    const element = document.querySelector('.dnb-list__item__end')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('inherits skeleton from Container context', () => {
    render(
      <Container skeleton>
        <ItemEnd>Content</ItemEnd>
      </Container>
    )

    const element = document.querySelector('.dnb-list__item__end')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('propagates skeleton to children via context', () => {
    function SkeletonConsumer() {
      const context = useContext(Context)
      return <span data-skeleton={String(Boolean(context?.skeleton))} />
    }

    render(
      <ItemEnd skeleton>
        <SkeletonConsumer />
      </ItemEnd>
    )

    const consumer = document.querySelector('[data-skeleton]')
    expect(consumer.getAttribute('data-skeleton')).toBe('true')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Container>
        <ItemContent>
          <ItemEnd>End content</ItemEnd>
        </ItemContent>
      </Container>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
