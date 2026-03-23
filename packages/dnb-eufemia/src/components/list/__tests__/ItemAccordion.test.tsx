import React, { useContext } from 'react'
import { render, fireEvent } from '@testing-library/react'
import ItemAccordion from '../ItemAccordion'
import Container from '../Container'
import Context from '../../../shared/Context'

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

  it('does not toggle internally when open prop is controlled', () => {
    render(
      <ItemAccordion open={false}>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )
    const accordion = document.querySelector('.dnb-list__item__accordion')

    expect(accordion.classList).not.toContain(
      'dnb-list__item__accordion--open'
    )

    fireEvent.click(header)

    expect(accordion.classList).not.toContain(
      'dnb-list__item__accordion--open'
    )
  })

  it('follows controlled open prop changes via rerender', () => {
    const { rerender } = render(
      <ItemAccordion open={false}>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const accordion = document.querySelector('.dnb-list__item__accordion')

    expect(accordion.classList).not.toContain(
      'dnb-list__item__accordion--open'
    )

    rerender(
      <ItemAccordion open>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    expect(accordion.classList).toContain(
      'dnb-list__item__accordion--open'
    )

    rerender(
      <ItemAccordion open={false}>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    expect(accordion.classList).not.toContain(
      'dnb-list__item__accordion--open'
    )
  })

  it('calls onClick in controlled mode so consumer can update open prop', () => {
    const handleClick = jest.fn()

    render(
      <ItemAccordion open={false} onClick={handleClick}>
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

  it('header has role="button" and tabIndex 0', () => {
    render(
      <ItemAccordion>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(header.getAttribute('role')).toBe('button')
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

  it('toggles open state when Enter key is pressed on header', () => {
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

    fireEvent.keyDown(header, { key: 'Enter' })
    expect(accordion.classList).toContain(
      'dnb-list__item__accordion--open'
    )

    fireEvent.keyDown(header, { key: 'Enter' })
    expect(accordion.classList).not.toContain(
      'dnb-list__item__accordion--open'
    )
  })

  it('toggles open state when Space key is pressed on header', () => {
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

    fireEvent.keyDown(header, { key: ' ' })
    expect(accordion.classList).toContain(
      'dnb-list__item__accordion--open'
    )

    fireEvent.keyDown(header, { key: ' ' })
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

  it('does not toggle open state when pending and header receives Enter', () => {
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

    fireEvent.keyDown(header, { key: 'Enter' })
    expect(accordion.classList).toContain(
      'dnb-list__item__accordion--open'
    )
  })

  it('applies disabled CSS class when disabled', () => {
    render(
      <ItemAccordion disabled>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const item = document.querySelector('.dnb-list__item')

    expect(item.classList).toContain('dnb-list__item--disabled')
  })

  it('header has aria-disabled and tabIndex -1 when disabled', () => {
    render(
      <ItemAccordion disabled>
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

  it('does not toggle open state when disabled and header is clicked', () => {
    render(
      <ItemAccordion disabled>
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

  it('does not toggle open state when disabled and header receives Enter', () => {
    render(
      <ItemAccordion disabled open>
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

    fireEvent.keyDown(header, { key: 'Enter' })
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

  describe('disabled', () => {
    it('applies disabled modifier when disabled is true', () => {
      render(
        <ItemAccordion disabled>
          <ItemAccordion.Header>Title</ItemAccordion.Header>
          <ItemAccordion.Content>Content</ItemAccordion.Content>
        </ItemAccordion>
      )

      const accordion = document.querySelector(
        '.dnb-list__item__accordion'
      )

      expect(accordion.classList).toContain('dnb-list__item--disabled')
    })

    it('has aria-disabled and tabIndex -1 on header when disabled', () => {
      render(
        <ItemAccordion disabled>
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

    it('does not toggle when disabled and header is clicked', () => {
      render(
        <ItemAccordion disabled>
          <ItemAccordion.Header>Title</ItemAccordion.Header>
          <ItemAccordion.Content>Content</ItemAccordion.Content>
        </ItemAccordion>
      )

      const accordion = document.querySelector(
        '.dnb-list__item__accordion'
      )
      const header = document.querySelector(
        '.dnb-list__item__accordion__header'
      )

      fireEvent.click(header)

      expect(accordion.classList).not.toContain(
        'dnb-list__item__accordion--open'
      )
    })

    it('does not toggle when disabled and Enter key is pressed', () => {
      render(
        <ItemAccordion disabled>
          <ItemAccordion.Header>Title</ItemAccordion.Header>
          <ItemAccordion.Content>Content</ItemAccordion.Content>
        </ItemAccordion>
      )

      const header = document.querySelector(
        '.dnb-list__item__accordion__header'
      )

      fireEvent.keyDown(header, { key: 'Enter' })

      const accordion = document.querySelector(
        '.dnb-list__item__accordion'
      )

      expect(accordion.classList).not.toContain(
        'dnb-list__item__accordion--open'
      )
    })
  })

  it('applies skeleton class to AccordionContent when Container has skeleton', () => {
    render(
      <Container skeleton>
        <ItemAccordion open>
          <ItemAccordion.Header>Title</ItemAccordion.Header>
          <ItemAccordion.Content>Content body</ItemAccordion.Content>
        </ItemAccordion>
      </Container>
    )

    const content = document.querySelector(
      '.dnb-list__item__accordion__content'
    )

    expect(content.classList).toContain('dnb-skeleton')
  })

  it('applies skeleton class to AccordionHeader when Container has skeleton', () => {
    render(
      <Container skeleton>
        <ItemAccordion>
          <ItemAccordion.Header>Title</ItemAccordion.Header>
          <ItemAccordion.Content>Content body</ItemAccordion.Content>
        </ItemAccordion>
      </Container>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(header.classList).toContain('dnb-skeleton')
  })

  it('applies skeleton font class on accordion item when skeleton prop is set', () => {
    render(
      <ItemAccordion skeleton>
        <ItemAccordion.Header>Title</ItemAccordion.Header>
        <ItemAccordion.Content>Content</ItemAccordion.Content>
      </ItemAccordion>
    )

    const accordion = document.querySelector('.dnb-list__item__accordion')

    expect(accordion.classList).toContain('dnb-skeleton')
    expect(accordion.classList).toContain('dnb-skeleton--font')
  })

  it('applies skeleton class to auto-generated header when Container has skeleton', () => {
    render(
      <Container skeleton>
        <ItemAccordion title="Auto title">
          <ItemAccordion.Content>Content body</ItemAccordion.Content>
        </ItemAccordion>
      </Container>
    )

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )

    expect(header.classList).toContain('dnb-skeleton')
  })

  it('applies skeleton class to AccordionContent when skeleton prop is set on ItemAccordion inside Container', () => {
    render(
      <Container>
        <ItemAccordion skeleton open>
          <ItemAccordion.Header>Title</ItemAccordion.Header>
          <ItemAccordion.Content>Content body</ItemAccordion.Content>
        </ItemAccordion>
      </Container>
    )

    const accordion = document.querySelector('.dnb-list__item__accordion')

    expect(accordion.classList).toContain('dnb-skeleton')
    expect(accordion.classList).toContain('dnb-skeleton--font')
  })

  it('applies skeleton and disabled together on accordion item', () => {
    render(
      <Container skeleton disabled>
        <ItemAccordion>
          <ItemAccordion.Header>Title</ItemAccordion.Header>
          <ItemAccordion.Content>Content body</ItemAccordion.Content>
        </ItemAccordion>
      </Container>
    )

    const accordion = document.querySelector('.dnb-list__item__accordion')

    expect(accordion.classList).toContain('dnb-skeleton')
    expect(accordion.classList).toContain('dnb-skeleton--font')
    expect(accordion.classList).toContain('dnb-list__item--disabled')
  })

  it('propagates skeleton to AccordionHeader children via context', () => {
    function SkeletonConsumer() {
      const context = useContext(Context)
      return <span data-skeleton={String(Boolean(context?.skeleton))} />
    }

    render(
      <Container skeleton>
        <ItemAccordion>
          <ItemAccordion.Header>
            <SkeletonConsumer />
          </ItemAccordion.Header>
          <ItemAccordion.Content>Content body</ItemAccordion.Content>
        </ItemAccordion>
      </Container>
    )

    const consumer = document.querySelector('[data-skeleton]')
    expect(consumer.getAttribute('data-skeleton')).toBe('true')
  })

  it('propagates skeleton to AccordionContent children via context', () => {
    function SkeletonConsumer() {
      const context = useContext(Context)
      return <span data-skeleton={String(Boolean(context?.skeleton))} />
    }

    render(
      <Container skeleton>
        <ItemAccordion open>
          <ItemAccordion.Header>Title</ItemAccordion.Header>
          <ItemAccordion.Content>
            <SkeletonConsumer />
          </ItemAccordion.Content>
        </ItemAccordion>
      </Container>
    )

    const consumer = document.querySelector('[data-skeleton]')
    expect(consumer.getAttribute('data-skeleton')).toBe('true')
  })

  it('warns and returns null when AccordionHeader is used outside ItemAccordion', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(<ItemAccordion.Header>Orphan header</ItemAccordion.Header>)

    const header = document.querySelector(
      '.dnb-list__item__accordion__header'
    )
    expect(header).not.toBeInTheDocument()

    const didWarn = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes(
          'List.Item.Accordion.Header should be used inside List.Item.Accordion.'
        )
    )
    expect(didWarn).toBe(true)

    spy.mockRestore()
  })

  it('warns and returns null when AccordionContent is used outside ItemAccordion', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(<ItemAccordion.Content>Orphan content</ItemAccordion.Content>)

    const content = document.querySelector(
      '.dnb-list__item__accordion__content'
    )
    expect(content).not.toBeInTheDocument()

    const didWarn = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes(
          'List.Item.Accordion.Content should be used inside List.Item.Accordion.'
        )
    )
    expect(didWarn).toBe(true)

    spy.mockRestore()
  })
})
