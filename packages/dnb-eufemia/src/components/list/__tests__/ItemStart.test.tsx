import React from 'react'
import { render } from '@testing-library/react'
import ItemStart from '../ItemStart'

describe('ItemStart', () => {
  it('renders with children', () => {
    render(<ItemStart>Start content</ItemStart>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('Start content')
  })

  it('has dnb-t__size--basis class', () => {
    render(<ItemStart>Content</ItemStart>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-t__size--basis')
  })

  it('merges custom className', () => {
    render(<ItemStart className="my-start">Content</ItemStart>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-t__size--basis')
    expect(element.classList).toContain('my-start')
  })

  it('forwards custom HTML attributes', () => {
    render(
      <ItemStart
        data-testid="item-start"
        data-foo="bar"
        aria-label="Start section"
        id="start-id"
      >
        Content
      </ItemStart>
    )

    const element = document.querySelector('.dnb-flex-item')
    expect(element.getAttribute('data-testid')).toBe('item-start')
    expect(element.getAttribute('data-foo')).toBe('bar')
    expect(element.getAttribute('aria-label')).toBe('Start section')
    expect(element.getAttribute('id')).toBe('start-id')
  })

  it('supports spacing props and applies spacing classes', () => {
    render(
      <ItemStart top="medium" left="x-small">
        Content
      </ItemStart>
    )

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-space__top--medium')
    expect(element.classList).toContain('dnb-space__left--x-small')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect(ItemStart._supportsSpacingProps).toBe(true)
  })
})
