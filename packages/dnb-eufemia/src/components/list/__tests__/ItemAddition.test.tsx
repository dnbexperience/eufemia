import React from 'react'
import { render } from '@testing-library/react'
import ItemAddition from '../ItemAddition'

describe('ItemAddition', () => {
  it('renders with children', () => {
    render(<ItemAddition>Addition content</ItemAddition>)

    const additions = document.querySelectorAll(
      '.dnb-list__item__addition'
    )
    const contentWrapper = additions[1]

    expect(contentWrapper).toBeInTheDocument()
    expect(contentWrapper.textContent).toContain('Addition content')
  })

  it('renders Hr and content wrapper with addition class', () => {
    render(<ItemAddition>Content</ItemAddition>)

    const additions = document.querySelectorAll(
      '.dnb-list__item__addition'
    )

    expect(additions.length).toBe(2)
    expect(additions[0].tagName).toBe('HR')
    expect(additions[1].textContent).toContain('Content')
  })

  it('merges custom className on content wrapper', () => {
    render(<ItemAddition className="my-addition">Content</ItemAddition>)

    const additions = document.querySelectorAll(
      '.dnb-list__item__addition'
    )
    const contentWrapper = additions[1]

    expect(contentWrapper.classList).toContain('dnb-list__item__addition')
    expect(contentWrapper.classList).toContain('my-addition')
  })

  it('forwards custom HTML attributes to content wrapper', () => {
    render(
      <ItemAddition
        data-testid="item-addition"
        data-foo="bar"
        aria-label="Addition section"
        id="addition-id"
      >
        Content
      </ItemAddition>
    )

    const additions = document.querySelectorAll(
      '.dnb-list__item__addition'
    )
    const contentWrapper = additions[1]

    expect(contentWrapper.getAttribute('data-testid')).toBe(
      'item-addition'
    )
    expect(contentWrapper.getAttribute('data-foo')).toBe('bar')
    expect(contentWrapper.getAttribute('aria-label')).toBe(
      'Addition section'
    )
    expect(contentWrapper.getAttribute('id')).toBe('addition-id')
  })

  it('supports spacing props and applies spacing classes', () => {
    render(
      <ItemAddition top="medium" left="x-small">
        Content
      </ItemAddition>
    )

    const additions = document.querySelectorAll(
      '.dnb-list__item__addition'
    )
    const contentWrapper = additions[1]

    expect(contentWrapper.classList).toContain('dnb-space__top--medium')
    expect(contentWrapper.classList).toContain('dnb-space__left--x-small')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect(ItemAddition._supportsSpacingProps).toBe(true)
  })
})
