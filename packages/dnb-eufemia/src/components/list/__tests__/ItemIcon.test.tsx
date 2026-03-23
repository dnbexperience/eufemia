import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import { fish_medium } from '../../../icons'
import ItemIcon from '../ItemIcon'
import ItemContent from '../ItemContent'
import Container from '../Container'

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

  it('does not accept unrelated ItemContent props', () => {
    render(<ItemIcon>{fish_medium}</ItemIcon>)

    const element = document.querySelector('.dnb-flex-item')

    expect(element.getAttribute('variant')).toBeNull()
    expect(element.getAttribute('selected')).toBeNull()
    expect(element.getAttribute('pending')).toBeNull()
    expect(element.getAttribute('skeleton')).toBeNull()
  })

  it('applies skeleton class when skeleton prop is true', () => {
    render(<ItemIcon skeleton>{fish_medium}</ItemIcon>)

    const element = document.querySelector('.dnb-list__item__icon')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--shape')
  })

  it('inherits skeleton from Container context', () => {
    render(
      <Container skeleton>
        <ItemIcon>{fish_medium}</ItemIcon>
      </Container>
    )

    const element = document.querySelector('.dnb-list__item__icon')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--shape')
  })

  it('propagates skeleton to child Icon via shared context', () => {
    render(
      <Container skeleton>
        <ItemContent>
          <ItemIcon>{fish_medium}</ItemIcon>
        </ItemContent>
      </Container>
    )

    const icon = document.querySelector('.dnb-icon')

    expect(icon.classList).toContain('dnb-skeleton')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Container>
        <ItemContent>
          <ItemIcon>{fish_medium}</ItemIcon>
        </ItemContent>
      </Container>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
