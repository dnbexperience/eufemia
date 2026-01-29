import React from 'react'
import { render } from '@testing-library/react'
import ItemEnd from '../ItemEnd'

describe('ItemEnd', () => {
  it('renders with children', () => {
    render(<ItemEnd>End content</ItemEnd>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('End content')
  })

  it('has dnb-t__size--basis class', () => {
    render(<ItemEnd>Content</ItemEnd>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-t__size--basis')
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
    expect(ItemEnd._supportsSpacingProps).toBe(true)
  })
})
