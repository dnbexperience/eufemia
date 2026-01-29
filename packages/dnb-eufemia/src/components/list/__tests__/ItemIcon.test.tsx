import React from 'react'
import { render } from '@testing-library/react'
import { fish_medium } from '../../../icons'
import ItemIcon from '../ItemIcon'

describe('ItemIcon', () => {
  it('renders with icon as children', () => {
    render(<ItemIcon>{fish_medium}</ItemIcon>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element).toBeInTheDocument()
    expect(element.querySelector('.dnb-icon')).toBeInTheDocument()
  })

  it('renders Icon with size medium', () => {
    render(<ItemIcon>{fish_medium}</ItemIcon>)

    const icon = document.querySelector('.dnb-icon')
    expect(icon).toBeInTheDocument()
    expect(icon.classList).toContain('dnb-icon--medium')
  })

  it('merges custom className', () => {
    render(<ItemIcon className="my-icon">{fish_medium}</ItemIcon>)

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('my-icon')
  })

  it('forwards custom HTML attributes', () => {
    render(
      <ItemIcon
        data-testid="item-icon"
        data-foo="bar"
        aria-hidden="true"
        id="icon-id"
      >
        {fish_medium}
      </ItemIcon>
    )

    const element = document.querySelector('.dnb-flex-item')
    expect(element.getAttribute('data-testid')).toBe('item-icon')
    expect(element.getAttribute('data-foo')).toBe('bar')
    expect(element.getAttribute('aria-hidden')).toBe('true')
    expect(element.getAttribute('id')).toBe('icon-id')
  })

  it('supports spacing props and applies spacing classes', () => {
    render(
      <ItemIcon top="small" left="x-small">
        {fish_medium}
      </ItemIcon>
    )

    const element = document.querySelector('.dnb-flex-item')
    expect(element.classList).toContain('dnb-space__top--small')
    expect(element.classList).toContain('dnb-space__left--x-small')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect(ItemIcon._supportsSpacingProps).toBe(true)
  })
})
