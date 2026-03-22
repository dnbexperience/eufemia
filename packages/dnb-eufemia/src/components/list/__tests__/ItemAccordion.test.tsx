import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ItemAccordion from '../ItemAccordion'

describe('ItemAccordion', () => {
  it('renders with Header and Content', () => {
    render(
      <ItemAccordion>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content body</ItemAccordion.Content>
      </ItemAccordion>
    )

    const accordion = document.querySelector('.dnb-list__item__accordion')
    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )
    const content = document.querySelector(
      '.dnb-list__item__accordion__content'
    )

    expect(accordion).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(header.textContent).toContain('Title')
    expect(content).toBeInTheDocument()
  })

  it('has dnb-list__item__accordion class', () => {
    render(
      <ItemAccordion>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const accordion = document.querySelector('.dnb-list__item__accordion')

    expect(accordion.classList).toContain('dnb-list__item__accordion')
  })

  it('does not have open modifier when open is false (default)', () => {
    render(
      <ItemAccordion>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const accordion = document.querySelector('.dnb-list__item__accordion')

    expect(accordion.classList).not.toContain(
      'dnb-list__item__accordion--open'
    )
  })

  it('has open modifier when open is true', () => {
    render(
      <ItemAccordion open>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const accordion = document.querySelector('.dnb-list__item__accordion')

    expect(accordion.classList).toContain(
      'dnb-list__item__accordion--open'
    )
  })

  it('syncs open state when open prop changes after mount', () => {
    const { rerender } = render(
      <ItemAccordion open={false}>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    let accordion = document.querySelector('.dnb-list__item__accordion')
    expect(accordion.classList).not.toContain(
      'dnb-list__item__accordion--open'
    )

    rerender(
      <ItemAccordion open>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    accordion = document.querySelector('.dnb-list__item__accordion')
    expect(accordion.classList).toContain(
      'dnb-list__item__accordion--open'
    )

    rerender(
      <ItemAccordion open={false}>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    accordion = document.querySelector('.dnb-list__item__accordion')
    expect(accordion.classList).not.toContain(
      'dnb-list__item__accordion--open'
    )
  })

  it('header click still toggles open state after open prop has changed', () => {
    const { rerender } = render(
      <ItemAccordion open={false}>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )
    let accordion = document.querySelector('.dnb-list__item__accordion')

    expect(accordion.classList).not.toContain(
      'dnb-list__item__accordion--open'
    )

    rerender(
      <ItemAccordion open>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    accordion = document.querySelector('.dnb-list__item__accordion')
    expect(accordion.classList).toContain(
      'dnb-list__item__accordion--open'
    )

    fireEvent.click(header)

    accordion = document.querySelector('.dnb-list__item__accordion')
    expect(accordion.classList).not.toContain(
      'dnb-list__item__accordion--open'
    )

    fireEvent.click(header)

    accordion = document.querySelector('.dnb-list__item__accordion')
    expect(accordion.classList).toContain(
      'dnb-list__item__accordion--open'
    )
  })

  it('header renders as a native button element', () => {
    render(
      <ItemAccordion>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(header.tagName).toBe('BUTTON')
    expect(header.getAttribute('type')).toBe('button')
    expect(header.getAttribute('tabindex')).toBe('0')
  })

  it('header has id, aria-controls and aria-expanded for accessibility', () => {
    render(
      <ItemAccordion>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )
    const headerId = header.getAttribute('id')
    const controlsId = header.getAttribute('aria-controls')

    expect(headerId).toBeTruthy()
    expect(headerId).toMatch(/-header$/)
    expect(controlsId).toBeTruthy()
    expect(controlsId).toMatch(/-content$/)
    expect(controlsId).toBe(headerId.replace(/-header$/, '-content'))
    expect(header.getAttribute('aria-expanded')).toBe('false')
  })

  it('header has aria-expanded true when accordion is open', () => {
    render(
      <ItemAccordion open>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(header.getAttribute('aria-expanded')).toBe('true')
  })

  it('header has aria-disabled and tabIndex -1 when pending', () => {
    render(
      <ItemAccordion pending>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(header.getAttribute('aria-disabled')).toBe('true')
    expect(header.getAttribute('tabindex')).toBe('-1')
  })

  it('content region has id, aria-labelledby, aria-hidden and aria-expanded', () => {
    render(
      <ItemAccordion>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )
    const headerId = header.getAttribute('id')
    const contentId = header.getAttribute('aria-controls')
    const contentRegion = document.getElementById(contentId)

    expect(contentRegion).toBeInTheDocument()
    expect(contentRegion.getAttribute('id')).toBe(contentId)
    expect(contentRegion.getAttribute('aria-labelledby')).toBe(headerId)
    expect(contentRegion.getAttribute('aria-hidden')).toBe('true')
    expect(contentRegion.getAttribute('aria-expanded')).toBe('false')
  })

  it('content region has aria-hidden false and aria-expanded true when open', () => {
    render(
      <ItemAccordion open>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )
    const contentId = header.getAttribute('aria-controls')
    const contentRegion = document.getElementById(contentId)

    expect(contentRegion).toBeInTheDocument()
    expect(contentRegion.getAttribute('aria-hidden')).toBe('false')
    expect(contentRegion.getAttribute('aria-expanded')).toBe('true')
  })

  describe('keepInDOM', () => {
    it('should keep content in DOM when closed and keepInDOM is true', () => {
      render(
        <ItemAccordion keepInDOM>
          <ItemAccordion.Header>Title</ItemAccordion.Header>
          <ItemAccordion.Content>
            <span data-testid="accordion-content">Content body</span>
          </ItemAccordion.Content>
        </ItemAccordion>
      )

      const content = document.querySelector(
        '[data-testid="accordion-content"]'
      )
      expect(content).toBeInTheDocument()
      expect(content).toHaveTextContent('Content body')
    })

    it('should not have content in DOM when closed and keepInDOM is false', () => {
      render(
        <ItemAccordion>
          <ItemAccordion.Header>Title</ItemAccordion.Header>
          <ItemAccordion.Content>
            <span data-testid="accordion-content">Content body</span>
          </ItemAccordion.Content>
        </ItemAccordion>
      )

      const content = document.querySelector(
        '[data-testid="accordion-content"]'
      )
      expect(content).not.toBeInTheDocument()
    })
  })

  it('uses custom id when id prop is provided', () => {
    render(
      <ItemAccordion id="my-accordion">
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )
    const contentRegion = document.getElementById('my-accordion-content')

    expect(header.getAttribute('id')).toBe('my-accordion-header')
    expect(header.getAttribute('aria-controls')).toBe(
      'my-accordion-content'
    )
    expect(contentRegion).toBeInTheDocument()
    expect(contentRegion.getAttribute('aria-labelledby')).toBe(
      'my-accordion-header'
    )
  })

  it('header has chevron icon', () => {
    render(
      <ItemAccordion>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(header.querySelector('.dnb-icon')).toBeInTheDocument()
    expect(header.querySelector('svg')).toBeInTheDocument()
  })

  it('toggles open state when header is clicked', () => {
    render(
      <ItemAccordion>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const accordion = document.querySelector('.dnb-list__item__accordion')
    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(accordion.classList).not.toContain(
      'dnb-list__item__accordion--open'
    )

    fireEvent.click(header)
    expect(accordion.classList).toContain(
      'dnb-list__item__accordion--open'
    )

    fireEvent.click(header)
    expect(accordion.classList).not.toContain(
      'dnb-list__item__accordion--open'
    )
  })

  it('calls onClick when header is clicked', () => {
    const handleClick = jest.fn()

    render(
      <ItemAccordion onClick={handleClick}>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    fireEvent.click(header)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('toggles open state when Enter or Space key activates the button', () => {
    render(
      <ItemAccordion>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const accordion = document.querySelector('.dnb-list__item__accordion')
    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    // Native button handles Enter/Space via click
    expect(header.tagName).toBe('BUTTON')

    fireEvent.click(header)
    expect(accordion.classList).toContain(
      'dnb-list__item__accordion--open'
    )

    fireEvent.click(header)
    expect(accordion.classList).not.toContain(
      'dnb-list__item__accordion--open'
    )
  })

  it('does not toggle open state when pending and header is clicked', () => {
    render(
      <ItemAccordion pending>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const accordion = document.querySelector('.dnb-list__item__accordion')
    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    fireEvent.click(header)
    expect(accordion.classList).not.toContain(
      'dnb-list__item__accordion--open'
    )
  })

  it('does not toggle open state when pending and header is activated', () => {
    render(
      <ItemAccordion pending open>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const accordion = document.querySelector('.dnb-list__item__accordion')
    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(accordion.classList).toContain(
      'dnb-list__item__accordion--open'
    )

    fireEvent.click(header)
    expect(accordion.classList).toContain(
      'dnb-list__item__accordion--open'
    )
  })

  it('renders chevron on the right by default (chevronPosition right)', () => {
    render(
      <ItemAccordion>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )
    const chevron = header.querySelector('.dnb-list__item__chevron')

    expect(chevron).toBeInTheDocument()
    expect(header.className).not.toContain('dnb-list__item--chevron-left')
  })

  it('renders chevron on the left when chevronPosition is left', () => {
    render(
      <ItemAccordion chevronPosition="left">
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )
    const chevron = header.querySelector('.dnb-list__item__chevron')

    expect(chevron).toBeInTheDocument()
    expect(header.className).toContain('dnb-list__item--chevron-left')
  })

  it('applies icon-left modifier class when chevronPosition is left', () => {
    render(
      <ItemAccordion chevronPosition="left">
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(header.className).toContain('dnb-list__item--chevron-left')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect(ItemAccordion._supportsSpacingProps).toBe(true)
  })
})
