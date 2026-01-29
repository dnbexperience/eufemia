import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ItemNavigate from '../ItemNavigate'

describe('ItemNavigate', () => {
  it('renders with children', () => {
    render(<ItemNavigate>Navigate content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('Navigate content')
  })

  it('has dnb-list__item__navigate and dnb-list__item classes', () => {
    render(<ItemNavigate>Content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')

    expect(element.classList).toContain('dnb-list__item__navigate')
    expect(element.classList).toContain('dnb-list__item')
  })

  it('has dnb-t__size--basis class', () => {
    render(<ItemNavigate>Content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')

    expect(element.classList).toContain('dnb-t__size--basis')
  })

  it('has role="button" for accessibility', () => {
    render(<ItemNavigate>Content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')

    expect(element.getAttribute('role')).toBe('button')
  })

  it('allows role to be overridden', () => {
    render(<ItemNavigate role="link">Content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')

    expect(element.getAttribute('role')).toBe('link')
  })

  it('has tabIndex 0 for keyboard navigation', () => {
    render(<ItemNavigate>Content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')

    expect(element.getAttribute('tabindex')).toBe('0')
  })

  it('renders IconPrimary chevron_right at the end', () => {
    render(<ItemNavigate>Content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')

    expect(element.querySelector('.dnb-icon')).toBeInTheDocument()
    expect(element.querySelector('svg')).toBeInTheDocument()
  })

  it('renders chevron on the right by default (iconPosition right)', () => {
    render(<ItemNavigate>Content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')
    const chevron = element.querySelector('.dnb-list__item__chevron')

    expect(chevron).toBeInTheDocument()
    expect(element.className).not.toContain('dnb-list__item--icon-left')
  })

  it('renders chevron on the left when iconPosition is left', () => {
    render(<ItemNavigate iconPosition="left">Content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')
    const chevron = element.querySelector('.dnb-list__item__chevron')

    expect(chevron).toBeInTheDocument()
    expect(element.className).toContain('dnb-list__item--icon-left')
  })

  it('applies icon-left modifier class when iconPosition is left', () => {
    render(<ItemNavigate iconPosition="left">Content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')

    expect(element.className).toContain('dnb-list__item--icon-left')
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()

    render(<ItemNavigate onClick={handleClick}>Content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')

    fireEvent.click(element)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Enter key is pressed', () => {
    const handleClick = jest.fn()

    render(<ItemNavigate onClick={handleClick}>Content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')

    fireEvent.keyDown(element, { key: 'Enter' })

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Space key is pressed', () => {
    const handleClick = jest.fn()

    render(<ItemNavigate onClick={handleClick}>Content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')

    fireEvent.keyDown(element, { key: ' ' })

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('merges custom className', () => {
    render(<ItemNavigate className="my-navigate">Content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')

    expect(element.classList).toContain('dnb-list__item__navigate')
    expect(element.classList).toContain('my-navigate')
  })

  it('forwards custom HTML attributes', () => {
    render(
      <ItemNavigate
        data-testid="item-navigate"
        data-foo="bar"
        aria-label="Navigate to item"
        id="navigate-id"
      >
        Content
      </ItemNavigate>
    )

    const element = document.querySelector('.dnb-list__item__navigate')

    expect(element.getAttribute('data-testid')).toBe('item-navigate')
    expect(element.getAttribute('data-foo')).toBe('bar')
    expect(element.getAttribute('aria-label')).toBe('Navigate to item')
    expect(element.getAttribute('id')).toBe('navigate-id')
  })

  it('supports spacing props and applies spacing classes', () => {
    render(
      <ItemNavigate top="large" bottom="small">
        Content
      </ItemNavigate>
    )

    const element = document.querySelector('.dnb-list__item__navigate')

    expect(element.classList).toContain('dnb-space__top--large')
    expect(element.classList).toContain('dnb-space__bottom--small')
  })

  it('applies skeleton font class when skeleton is true', () => {
    render(<ItemNavigate skeleton>Content</ItemNavigate>)

    const element = document.querySelector('.dnb-list__item__navigate')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  describe('pending', () => {
    it('applies pending modifier when pending is true', () => {
      render(<ItemNavigate pending>Content</ItemNavigate>)

      const element = document.querySelector('.dnb-list__item__navigate')

      expect(element.classList).toContain('dnb-list__item--pending')
      expect(
        element.querySelector('.dnb-list__item__pending')
      ).toBeInTheDocument()
    })

    it('has aria-disabled and tabIndex -1 when pending', () => {
      render(<ItemNavigate pending>Content</ItemNavigate>)

      const element = document.querySelector('.dnb-list__item__navigate')

      expect(element.getAttribute('aria-disabled')).toBe('true')
      expect(element.getAttribute('tabindex')).toBe('-1')
    })

    it('does not call onClick on click when pending is true', () => {
      const handleClick = jest.fn()

      render(
        <ItemNavigate pending onClick={handleClick}>
          Content
        </ItemNavigate>
      )

      const element = document.querySelector('.dnb-list__item__navigate')

      fireEvent.click(element)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick on Enter key when pending is true', () => {
      const handleClick = jest.fn()

      render(
        <ItemNavigate pending onClick={handleClick}>
          Content
        </ItemNavigate>
      )

      const element = document.querySelector('.dnb-list__item__navigate')

      fireEvent.keyDown(element, { key: 'Enter' })

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick on Space key when pending is true', () => {
      const handleClick = jest.fn()

      render(
        <ItemNavigate pending onClick={handleClick}>
          Content
        </ItemNavigate>
      )

      const element = document.querySelector('.dnb-list__item__navigate')

      fireEvent.keyDown(element, { key: ' ' })

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect(ItemNavigate._supportsSpacingProps).toBe(true)
  })

  describe('href', () => {
    const hrefSelector = '.dnb-list__item__navigate--href'

    it('renders an anchor when href is provided', () => {
      render(<ItemNavigate href="/path">Link content</ItemNavigate>)

      const container = document.querySelector(hrefSelector)
      const anchor = container?.querySelector('a')

      expect(container).toBeInTheDocument()
      expect(anchor).toBeInTheDocument()
      expect(anchor?.tagName).toBe('A')
      expect(anchor?.textContent).toContain('Link content')
    })

    it('applies --href modifier class when href is provided', () => {
      render(<ItemNavigate href="/path">Content</ItemNavigate>)

      const anchor = document.querySelector(hrefSelector)

      expect(anchor).toBeInTheDocument()
      expect(anchor.classList).toContain('dnb-list__item__navigate')
      expect(anchor.classList).toContain('dnb-list__item__navigate--href')
    })

    it('has correct href attribute', () => {
      render(
        <ItemNavigate href="https://example.com/page">
          External link
        </ItemNavigate>
      )

      const container = document.querySelector(hrefSelector)
      const anchor = container?.querySelector('a')

      expect(anchor?.getAttribute('href')).toBe('https://example.com/page')
    })

    it('allows role to be overridden when href is provided', () => {
      render(
        <ItemNavigate href="/path" role="button">
          Content
        </ItemNavigate>
      )

      const anchor = document.querySelector(hrefSelector)

      expect(anchor.getAttribute('role')).toBe('button')
    })

    it('supports target and rel when href is provided', () => {
      render(
        <ItemNavigate
          href="/path"
          target="_blank"
          rel="noopener noreferrer"
        >
          Content
        </ItemNavigate>
      )

      const container = document.querySelector(hrefSelector)
      const anchor = container?.querySelector('a')

      expect(anchor?.getAttribute('target')).toBe('_blank')
      expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer')
    })

    it('renders as button (no anchor) when href is not provided', () => {
      render(<ItemNavigate>Content</ItemNavigate>)

      const element = document.querySelector('.dnb-list__item__navigate')
      const hrefElement = document.querySelector(hrefSelector)

      expect(element.tagName).toBe('LI')
      expect(element.getAttribute('href')).toBeNull()
      expect(hrefElement).toBeNull()
    })
  })
})
