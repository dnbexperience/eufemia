import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ItemAction from '../ItemAction'

describe('ItemAction', () => {
  it('renders with children', () => {
    render(<ItemAction>Action content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    expect(element).toBeInTheDocument()
    expect(element.textContent).toContain('Action content')
  })

  it('has dnb-list__item__action and dnb-list__item classes', () => {
    render(<ItemAction>Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    expect(element.classList).toContain('dnb-list__item__action')
    expect(element.classList).toContain('dnb-list__item')
  })

  it('has dnb-t__size--basis class', () => {
    render(<ItemAction>Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    expect(element.classList).toContain('dnb-t__size--basis')
  })

  it('has role="button" for accessibility', () => {
    render(<ItemAction>Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    expect(element.getAttribute('role')).toBe('button')
  })

  it('allows role to be overridden', () => {
    render(<ItemAction role="link">Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    expect(element.getAttribute('role')).toBe('link')
  })

  it('has tabIndex 0 for keyboard navigation when not pending', () => {
    render(<ItemAction>Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    expect(element.getAttribute('tabindex')).toBe('0')
  })

  it('renders IconPrimary chevron_right at the end', () => {
    render(<ItemAction>Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    expect(element.querySelector('.dnb-icon')).toBeInTheDocument()
    expect(element.querySelector('svg')).toBeInTheDocument()
  })

  it('renders chevron on the right by default (chevronPosition right)', () => {
    render(<ItemAction>Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')
    const chevron = element.querySelector('.dnb-list__item__chevron')

    expect(chevron).toBeInTheDocument()
    expect(element.className).not.toContain('dnb-list__item--chevron-left')
  })

  it('renders chevron on the left when chevronPosition is left', () => {
    render(<ItemAction chevronPosition="left">Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')
    const chevron = element.querySelector('.dnb-list__item__chevron')

    expect(chevron).toBeInTheDocument()
    expect(element.className).toContain('dnb-list__item--chevron-left')
  })

  it('applies icon-left modifier class when chevronPosition is left', () => {
    render(<ItemAction chevronPosition="left">Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    expect(element.className).toContain('dnb-list__item--chevron-left')
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()

    render(<ItemAction onClick={handleClick}>Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    fireEvent.click(element)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Enter key is pressed', () => {
    const handleClick = jest.fn()

    render(<ItemAction onClick={handleClick}>Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    fireEvent.keyDown(element, { key: 'Enter' })

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Space key is pressed', () => {
    const handleClick = jest.fn()

    render(<ItemAction onClick={handleClick}>Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    fireEvent.keyDown(element, { key: ' ' })

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('merges custom className', () => {
    render(<ItemAction className="my-action">Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    expect(element.classList).toContain('dnb-list__item__action')
    expect(element.classList).toContain('my-action')
  })

  it('forwards custom HTML attributes', () => {
    render(
      <ItemAction
        data-testid="action-item"
        data-foo="bar"
        aria-label="Action to item"
        id="action-id"
      >
        Content
      </ItemAction>
    )

    const element = document.querySelector('.dnb-list__item__action')

    expect(element.getAttribute('data-testid')).toBe('action-item')
    expect(element.getAttribute('data-foo')).toBe('bar')
    expect(element.getAttribute('aria-label')).toBe('Action to item')
    expect(element.getAttribute('id')).toBe('action-id')
  })

  it('supports spacing props and applies spacing classes', () => {
    render(
      <ItemAction top="large" bottom="small">
        Content
      </ItemAction>
    )

    const element = document.querySelector('.dnb-list__item__action')

    expect(element.classList).toContain('dnb-space__top--large')
    expect(element.classList).toContain('dnb-space__bottom--small')
  })

  it('applies skeleton font class when skeleton is true', () => {
    render(<ItemAction skeleton>Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  describe('pending', () => {
    it('applies pending modifier when pending is true', () => {
      render(<ItemAction pending>Content</ItemAction>)

      const element = document.querySelector('.dnb-list__item__action')

      expect(element.classList).toContain('dnb-list__item--pending')
      expect(
        element.querySelector('.dnb-list__item__pending')
      ).toBeInTheDocument()
    })

    it('has aria-disabled and tabIndex -1 when pending', () => {
      render(<ItemAction pending>Content</ItemAction>)

      const element = document.querySelector('.dnb-list__item__action')

      expect(element.getAttribute('aria-disabled')).toBe('true')
      expect(element.getAttribute('tabindex')).toBe('-1')
    })

    it('does not call onClick on click when pending is true', () => {
      const handleClick = jest.fn()

      render(
        <ItemAction pending onClick={handleClick}>
          Content
        </ItemAction>
      )

      const element = document.querySelector('.dnb-list__item__action')

      fireEvent.click(element)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick on Enter key when pending is true', () => {
      const handleClick = jest.fn()

      render(
        <ItemAction pending onClick={handleClick}>
          Content
        </ItemAction>
      )

      const element = document.querySelector('.dnb-list__item__action')

      fireEvent.keyDown(element, { key: 'Enter' })

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick on Space key when pending is true', () => {
      const handleClick = jest.fn()

      render(
        <ItemAction pending onClick={handleClick}>
          Content
        </ItemAction>
      )

      const element = document.querySelector('.dnb-list__item__action')

      fireEvent.keyDown(element, { key: ' ' })

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect(ItemAction._supportsSpacingProps).toBe(true)
  })

  describe('disabled', () => {
    it('applies disabled modifier when disabled is true', () => {
      render(<ItemAction disabled>Content</ItemAction>)

      const element = document.querySelector('.dnb-list__item__action')

      expect(element.classList).toContain('dnb-list__item--disabled')
    })

    it('has aria-disabled and tabIndex -1 when disabled', () => {
      render(<ItemAction disabled>Content</ItemAction>)

      const element = document.querySelector('.dnb-list__item__action')

      expect(element.getAttribute('aria-disabled')).toBe('true')
      expect(element.getAttribute('tabindex')).toBe('-1')
    })

    it('does not call onClick on click when disabled', () => {
      const handleClick = jest.fn()

      render(
        <ItemAction disabled onClick={handleClick}>
          Content
        </ItemAction>
      )

      const element = document.querySelector('.dnb-list__item__action')

      fireEvent.click(element)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick on Enter key when disabled', () => {
      const handleClick = jest.fn()

      render(
        <ItemAction disabled onClick={handleClick}>
          Content
        </ItemAction>
      )

      const element = document.querySelector('.dnb-list__item__action')

      fireEvent.keyDown(element, { key: 'Enter' })

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('has aria-disabled and tabIndex -1 on href items when disabled', () => {
      render(
        <ItemAction disabled href="/path">
          Content
        </ItemAction>
      )

      const element = document.querySelector('.dnb-list__item__action')

      expect(element.getAttribute('aria-disabled')).toBe('true')
      expect(element.getAttribute('tabindex')).toBe('-1')
    })
  })

  describe('href', () => {
    const hrefSelector = '.dnb-list__item__action--href'

    it('renders an anchor when href is provided', () => {
      render(<ItemAction href="/path">Link content</ItemAction>)

      const container = document.querySelector(hrefSelector)
      const anchor = container?.querySelector('a')

      expect(container).toBeInTheDocument()
      expect(anchor).toBeInTheDocument()
      expect(anchor?.tagName).toBe('A')
      expect(anchor?.textContent).toContain('Link content')
    })

    it('applies --href modifier class when href is provided', () => {
      render(<ItemAction href="/path">Content</ItemAction>)

      const listItem = document.querySelector(hrefSelector)

      expect(listItem).toBeInTheDocument()
      expect(listItem.classList).toContain('dnb-list__item__action')
      expect(listItem.classList).toContain('dnb-list__item__action--href')
    })

    it('has correct href attribute', () => {
      render(
        <ItemAction href="https://example.com/page">
          External link
        </ItemAction>
      )

      const container = document.querySelector(hrefSelector)
      const anchor = container?.querySelector('a')

      expect(anchor?.getAttribute('href')).toBe('https://example.com/page')
    })

    it('has role="link" on list item when href is provided', () => {
      render(<ItemAction href="/path">Content</ItemAction>)

      const listItem = document.querySelector(hrefSelector)

      expect(listItem.getAttribute('role')).toBe('link')
    })

    it('allows role to be overridden when href is provided', () => {
      render(
        <ItemAction href="/path" role="button">
          Content
        </ItemAction>
      )

      const listItem = document.querySelector(hrefSelector)

      expect(listItem.getAttribute('role')).toBe('button')
    })

    it('has tabIndex 0 on list item when href and not pending', () => {
      render(<ItemAction href="/path">Link content</ItemAction>)

      const listItem = document.querySelector(hrefSelector)

      expect(listItem?.getAttribute('tabindex')).toBe('0')
    })

    it('has tabIndex -1 on anchor when href (focus on list item)', () => {
      render(<ItemAction href="/path">Link content</ItemAction>)

      const container = document.querySelector(hrefSelector)
      const anchor = container?.querySelector('a')

      expect(anchor?.getAttribute('tabindex')).toBe('-1')
    })

    it('has tabIndex -1 on list item when href and pending', () => {
      render(
        <ItemAction href="/path" pending>
          Link content
        </ItemAction>
      )

      const listItem = document.querySelector(hrefSelector)

      expect(listItem?.getAttribute('tabindex')).toBe('-1')
    })

    it('triggers anchor click when list item receives Enter key (href)', () => {
      render(<ItemAction href="/path">Link content</ItemAction>)

      const listItem = document.querySelector(hrefSelector)
      const anchor = listItem?.querySelector('a')

      expect(anchor).toBeInTheDocument()

      const clickSpy = jest.spyOn(anchor as HTMLAnchorElement, 'click')

      fireEvent.keyDown(listItem as Element, { key: 'Enter' })

      expect(clickSpy).toHaveBeenCalled()
      clickSpy.mockRestore()
    })

    it('triggers anchor click when list item receives Space key (href)', () => {
      render(<ItemAction href="/path">Link content</ItemAction>)

      const listItem = document.querySelector(hrefSelector)
      const anchor = listItem?.querySelector('a')

      expect(anchor).toBeInTheDocument()

      const clickSpy = jest.spyOn(anchor as HTMLAnchorElement, 'click')

      fireEvent.keyDown(listItem as Element, { key: ' ' })

      expect(clickSpy).toHaveBeenCalled()
      clickSpy.mockRestore()
    })

    it('supports target and rel when href is provided', () => {
      render(
        <ItemAction href="/path" target="_blank" rel="noopener noreferrer">
          Content
        </ItemAction>
      )

      const container = document.querySelector(hrefSelector)
      const anchor = container?.querySelector('a')

      expect(anchor?.getAttribute('target')).toBe('_blank')
      expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer')
    })

    it('renders as button (no anchor) when href is not provided', () => {
      render(<ItemAction>Content</ItemAction>)

      const element = document.querySelector('.dnb-list__item__action')
      const hrefElement = document.querySelector(hrefSelector)

      expect(element.tagName).toBe('LI')
      expect(element.getAttribute('href')).toBeNull()
      expect(hrefElement).toBeNull()
    })
  })
})
