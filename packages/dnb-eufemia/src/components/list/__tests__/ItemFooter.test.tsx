import React from 'react'
import { render } from '@testing-library/react'
import ItemFooter from '../ItemFooter'

describe('ItemFooter', () => {
  it('renders with children', () => {
    render(<ItemFooter>Footer content</ItemFooter>)

    const footers = document.querySelectorAll('.dnb-list__item__footer')
    const contentWrapper = footers[1]

    expect(contentWrapper).toBeInTheDocument()
    expect(contentWrapper.textContent).toContain('Footer content')
  })

  it('renders Hr and content wrapper with footer class', () => {
    render(<ItemFooter>Content</ItemFooter>)

    const footers = document.querySelectorAll('.dnb-list__item__footer')

    expect(footers.length).toBe(2)
    expect(footers[0].tagName).toBe('HR')
    expect(footers[1].textContent).toContain('Content')
  })

  it('merges custom className on content wrapper', () => {
    render(<ItemFooter className="my-footer">Content</ItemFooter>)

    const footers = document.querySelectorAll('.dnb-list__item__footer')
    const contentWrapper = footers[1]

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

    const footers = document.querySelectorAll('.dnb-list__item__footer')
    const contentWrapper = footers[1]

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

    const footers = document.querySelectorAll('.dnb-list__item__footer')
    const contentWrapper = footers[1]

    expect(contentWrapper.classList).toContain('dnb-space__top--medium')
    expect(contentWrapper.classList).toContain('dnb-space__left--x-small')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect(ItemFooter._supportsSpacingProps).toBe(true)
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
})
