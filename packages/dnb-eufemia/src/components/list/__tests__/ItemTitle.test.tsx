import React from 'react'
import { render } from '@testing-library/react'
import ItemTitle from '../ItemTitle'

describe('ItemTitle', () => {
  it('renders with children', () => {
    render(<ItemTitle>Title text</ItemTitle>)

    const element = document.querySelector('.dnb-list__item__title')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('Title text')
  })

  it('has dnb-list__item__title class and wraps children in dnb-t__size--basis', () => {
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

  it('merges custom className', () => {
    render(<ItemTitle className="my-title">Title</ItemTitle>)

    const element = document.querySelector('.dnb-list__item__title')

    expect(element.classList).toContain('dnb-list__item__title')
    expect(element.classList).toContain('my-title')
  })

  it('has grow modifier for flex', () => {
    render(<ItemTitle>Title</ItemTitle>)

    const element = document.querySelector('.dnb-list__item__title')

    expect(element.classList).toContain('dnb-flex-item--grow')
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
    expect(ItemTitle._supportsSpacingProps).toBe(true)
  })
})
