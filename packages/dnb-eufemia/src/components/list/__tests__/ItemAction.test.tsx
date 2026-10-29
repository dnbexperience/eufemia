import type { ReactNode, Ref } from 'react'
import { useContext } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import ItemAction from '../ItemAction'
import Container from '../Container'
import ItemFooter from '../ItemFooter'
import Button from '../../button/Button'
import Anchor from '../../anchor/Anchor'
import Context from '../../../shared/Context'

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

  it('has role="button" on inner element for accessibility', () => {
    render(<ItemAction>Content</ItemAction>)

    const button = document.querySelector(
      '.dnb-list__item__action__button'
    )

    expect(button.getAttribute('role')).toBe('button')
  })

  it('renders inner button element as a div', () => {
    render(<ItemAction>Content</ItemAction>)

    const button = document.querySelector(
      '.dnb-list__item__action__button'
    )

    expect(button.tagName).toBe('DIV')
  })

  it('has tabIndex 0 on inner button for keyboard navigation when not pending', () => {
    render(<ItemAction>Content</ItemAction>)

    const button = document.querySelector(
      '.dnb-list__item__action__button'
    )

    expect(button.getAttribute('tabindex')).toBe('0')
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
    const handleClick = vi.fn()

    render(<ItemAction onClick={handleClick}>Content</ItemAction>)

    const button = document.querySelector(
      '.dnb-list__item__action__button'
    )

    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when the outer item element is clicked', () => {
    const handleClick = vi.fn()

    render(<ItemAction onClick={handleClick}>Content</ItemAction>)

    const li = document.querySelector('.dnb-list__item__action')

    fireEvent.click(li)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when the outer item element is clicked with href', () => {
    const handleClick = vi.fn()

    render(
      <ItemAction href="/foo" onClick={handleClick}>
        Content
      </ItemAction>
    )

    const li = document.querySelector('.dnb-list__item__action')

    fireEvent.click(li)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when the outer item element is clicked while disabled', () => {
    const handleClick = vi.fn()

    render(
      <ItemAction onClick={handleClick} disabled>
        Content
      </ItemAction>
    )

    const li = document.querySelector('.dnb-list__item__action')

    fireEvent.click(li)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('calls onClick when Enter key is pressed', () => {
    const handleClick = vi.fn()

    render(<ItemAction onClick={handleClick}>Content</ItemAction>)

    const button = document.querySelector(
      '.dnb-list__item__action__button'
    )

    fireEvent.keyDown(button, { key: 'Enter' })

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Space key is pressed', () => {
    const handleClick = vi.fn()

    render(<ItemAction onClick={handleClick}>Content</ItemAction>)

    const button = document.querySelector(
      '.dnb-list__item__action__button'
    )

    fireEvent.keyDown(button, { key: ' ' })

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

  it('applies selected modifier class when selected', () => {
    render(<ItemAction selected>Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    expect(element.classList).toContain('dnb-list__item--selected')
    expect(element.classList).toContain('dnb-list__item--selection')
  })

  it('applies variant modifier class', () => {
    render(<ItemAction variant="basic">Content</ItemAction>)

    const element = document.querySelector('.dnb-list__item__action')

    expect(element.classList).toContain('dnb-list--variant-basic')
  })

  it('forwards selected to ItemContent when href is set', () => {
    render(
      <ItemAction href="/test" selected>
        Content
      </ItemAction>
    )

    const element = document.querySelector('.dnb-list__item__action')

    expect(element.classList).toContain('dnb-list__item--selected')
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

    it('has aria-disabled and tabIndex -1 on inner button when pending', () => {
      render(<ItemAction pending>Content</ItemAction>)

      const button = document.querySelector(
        '.dnb-list__item__action__button'
      )

      expect(button.getAttribute('aria-disabled')).toBe('true')
      expect(button.getAttribute('tabindex')).toBe('-1')
    })

    it('does not call onClick on click when pending is true', () => {
      const handleClick = vi.fn()

      render(
        <ItemAction pending onClick={handleClick}>
          Content
        </ItemAction>
      )

      const button = document.querySelector(
        '.dnb-list__item__action__button'
      )

      fireEvent.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick on Enter key when pending is true', () => {
      const handleClick = vi.fn()

      render(
        <ItemAction pending onClick={handleClick}>
          Content
        </ItemAction>
      )

      const button = document.querySelector(
        '.dnb-list__item__action__button'
      )

      fireEvent.keyDown(button, { key: 'Enter' })

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick on Space key when pending is true', () => {
      const handleClick = vi.fn()

      render(
        <ItemAction pending onClick={handleClick}>
          Content
        </ItemAction>
      )

      const button = document.querySelector(
        '.dnb-list__item__action__button'
      )

      fireEvent.keyDown(button, { key: ' ' })

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect(
      (ItemAction as unknown as { _supportsSpacingProps: boolean })
        ._supportsSpacingProps
    ).toBe(true)
  })

  describe('disabled', () => {
    it('applies disabled modifier when disabled is true', () => {
      render(<ItemAction disabled>Content</ItemAction>)

      const element = document.querySelector('.dnb-list__item__action')

      expect(element.classList).toContain('dnb-list__item--disabled')
    })

    it('has aria-disabled and tabIndex -1 on inner button when disabled', () => {
      render(<ItemAction disabled>Content</ItemAction>)

      const button = document.querySelector(
        '.dnb-list__item__action__button'
      )

      expect(button.getAttribute('aria-disabled')).toBe('true')
      expect(button.getAttribute('tabindex')).toBe('-1')
    })

    it('does not call onClick on click when disabled', () => {
      const handleClick = vi.fn()

      render(
        <ItemAction disabled onClick={handleClick}>
          Content
        </ItemAction>
      )

      const button = document.querySelector(
        '.dnb-list__item__action__button'
      )

      fireEvent.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick on Enter key when disabled', () => {
      const handleClick = vi.fn()

      render(
        <ItemAction disabled onClick={handleClick}>
          Content
        </ItemAction>
      )

      const button = document.querySelector(
        '.dnb-list__item__action__button'
      )

      fireEvent.keyDown(button, { key: 'Enter' })

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('has aria-disabled and tabIndex -1 on anchor when disabled', () => {
      render(
        <ItemAction disabled href="/path">
          Content
        </ItemAction>
      )

      const anchor = document.querySelector('.dnb-list__item__action a')

      expect(anchor.getAttribute('aria-disabled')).toBe('true')
      expect(anchor.getAttribute('tabindex')).toBe('-1')
    })

    it('removes href from anchor when disabled', () => {
      render(
        <ItemAction disabled href="/path">
          Content
        </ItemAction>
      )

      const anchor = document.querySelector('.dnb-list__item__action a')

      expect(anchor).not.toHaveAttribute('href')
      expect(anchor.getAttribute('aria-disabled')).toBe('true')
    })

    it('inherits disabled from Container and passes it to inner button', () => {
      render(
        <Container disabled>
          <ItemAction>Content</ItemAction>
        </Container>
      )

      const element = document.querySelector('.dnb-list__item__action')
      const button = document.querySelector(
        '.dnb-list__item__action__button'
      )

      expect(element.classList).toContain('dnb-list__item--disabled')
      expect(button.getAttribute('aria-disabled')).toBe('true')
      expect(button.getAttribute('tabindex')).toBe('-1')
    })

    it('inherits disabled from Container for href items', () => {
      render(
        <Container disabled>
          <ItemAction href="/path">Content</ItemAction>
        </Container>
      )

      const element = document.querySelector('.dnb-list__item__action')
      const anchor = document.querySelector('.dnb-list__item__action a')

      expect(element.classList).toContain('dnb-list__item--disabled')
      expect(anchor.getAttribute('aria-disabled')).toBe('true')
      expect(anchor).not.toHaveAttribute('href')
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

    it('does not put role="link" on the list item when href is provided', () => {
      render(<ItemAction href="/path">Content</ItemAction>)

      const listItem = document.querySelector(hrefSelector)

      expect(listItem).not.toHaveAttribute('role')
    })

    it('does not override role on list item when href is provided', () => {
      render(
        <ItemAction href="/path" role="button">
          Content
        </ItemAction>
      )

      const listItem = document.querySelector(hrefSelector)

      expect(listItem).not.toHaveAttribute('role')
    })

    it('has tabIndex 0 on anchor when href and not pending', () => {
      render(<ItemAction href="/path">Link content</ItemAction>)

      const container = document.querySelector(hrefSelector)
      const anchor = container?.querySelector('a')

      expect(anchor?.getAttribute('tabindex')).toBe('0')
    })

    it('has tabIndex -1 on anchor when href and pending', () => {
      render(
        <ItemAction href="/path" pending>
          Link content
        </ItemAction>
      )

      const container = document.querySelector(hrefSelector)
      const anchor = container?.querySelector('a')

      expect(anchor?.getAttribute('tabindex')).toBe('-1')
    })

    it('triggers anchor click when anchor receives Space key (href)', () => {
      render(<ItemAction href="/path">Link content</ItemAction>)

      const listItem = document.querySelector(hrefSelector)
      const anchor = listItem?.querySelector('a')

      expect(anchor).toBeInTheDocument()

      // Mock click to prevent jsdom "Not implemented: navigation" warning
      const clickMock = vi
        .spyOn(anchor as HTMLAnchorElement, 'click')
        .mockImplementation(() => undefined)

      fireEvent.keyDown(listItem as Element, { key: ' ' })

      expect(clickMock).toHaveBeenCalled()
      clickMock.mockRestore()
    })

    it('calls a given onKeyDown and keeps triggering the anchor on Space key (href)', () => {
      const onKeyDown = vi.fn()

      render(
        <ItemAction href="/path" onKeyDown={onKeyDown}>
          Link content
        </ItemAction>
      )

      const listItem = document.querySelector(hrefSelector)
      const anchor = listItem?.querySelector('a')

      // Mock click to prevent jsdom "Not implemented: navigation" warning
      const clickMock = vi
        .spyOn(anchor as HTMLAnchorElement, 'click')
        .mockImplementation(() => undefined)

      fireEvent.keyDown(listItem as Element, { key: ' ' })

      expect(onKeyDown).toHaveBeenCalledTimes(1)
      expect(clickMock).toHaveBeenCalled()
      clickMock.mockRestore()
    })

    it('calls a given onKeyDown without href', () => {
      const onKeyDown = vi.fn()

      render(<ItemAction onKeyDown={onKeyDown}>Content</ItemAction>)

      fireEvent.keyDown(document.querySelector('[role="button"]'), {
        key: 'a',
      })

      expect(onKeyDown).toHaveBeenCalledTimes(1)
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

    it('calls onClick on click when href is provided', () => {
      const handleClick = vi.fn()

      render(
        <ItemAction href="/path" onClick={handleClick}>
          Content
        </ItemAction>
      )

      const listItem = document.querySelector(hrefSelector)

      fireEvent.click(listItem)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick on click when href is provided and pending', () => {
      const handleClick = vi.fn()

      render(
        <ItemAction href="/path" pending onClick={handleClick}>
          Content
        </ItemAction>
      )

      const listItem = document.querySelector(hrefSelector)

      fireEvent.click(listItem)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick on click when href is provided and disabled', () => {
      const handleClick = vi.fn()

      render(
        <ItemAction href="/path" disabled onClick={handleClick}>
          Content
        </ItemAction>
      )

      const listItem = document.querySelector(hrefSelector)

      fireEvent.click(listItem)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('element and to', () => {
    function MockLink({
      to,
      children,
      ref,
      ...rest
    }: {
      to: string
      children: ReactNode
      ref?: Ref<HTMLAnchorElement>
      preventScrollReset?: boolean
    }) {
      return (
        <a href={to} ref={ref} {...rest}>
          {children}
        </a>
      )
    }

    it('renders with a custom router Link component via element and to', () => {
      render(
        <ItemAction element={MockLink} to="/route">
          Router link
        </ItemAction>
      )

      const anchor = document.querySelector('a')

      expect(anchor).toBeInTheDocument()
      expect(anchor?.getAttribute('href')).toBe('/route')
      expect(anchor?.textContent).toContain('Router link')
    })

    it('applies --href modifier class when to is provided', () => {
      render(
        <ItemAction element={MockLink} to="/route">
          Content
        </ItemAction>
      )

      const element = document.querySelector(
        '.dnb-list__item__action--href'
      )

      expect(element).toBeInTheDocument()
    })

    it('does not put role="link" on list item when to is provided', () => {
      render(
        <ItemAction element={MockLink} to="/route">
          Content
        </ItemAction>
      )

      const element = document.querySelector('.dnb-list__item__action')

      expect(element).not.toHaveAttribute('role')
    })

    it('does not forward to when disabled', () => {
      render(
        <ItemAction element={MockLink} to="/route" disabled>
          Content
        </ItemAction>
      )

      const anchor = document.querySelector('a')

      expect(anchor).not.toHaveAttribute('href')
      expect(anchor?.getAttribute('aria-disabled')).toBe('true')
    })

    it('does not forward to when pending', () => {
      render(
        <ItemAction element={MockLink} to="/route" pending>
          Content
        </ItemAction>
      )

      const anchor = document.querySelector('a')

      expect(anchor).not.toHaveAttribute('href')
    })

    it('calls onClick on Space key when using to', () => {
      const handleClick = vi.fn()

      render(
        <ItemAction element={MockLink} to="/route" onClick={handleClick}>
          Content
        </ItemAction>
      )

      const listItem = document.querySelector(
        '.dnb-list__item__action--href'
      )
      const anchor = listItem?.querySelector('a')

      // Prevent jsdom "Not implemented: navigation" warning
      // while still allowing the click event to propagate.
      anchor?.addEventListener('click', (e) => e.preventDefault())

      fireEvent.keyDown(listItem as Element, { key: ' ' })

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('forwards elementProps to the anchor element', () => {
      render(
        <ItemAction
          element={MockLink}
          to="/route"
          elementProps={
            { 'data-replace': 'true' } as Record<string, unknown>
          }
        >
          Content
        </ItemAction>
      )

      const anchor = document.querySelector('a')

      expect(anchor?.getAttribute('data-replace')).toBe('true')
    })
  })

  describe.each([undefined, '#details'])('footer with href=%s', (href) => {
    it('keeps footer controls outside the primary action in the same item', async () => {
      const { container } = render(
        <Container>
          <ItemAction
            title="Show details"
            href={href}
            footer={
              <ItemFooter>
                <Button text="Save" />
                <Anchor href="#help">Help</Anchor>
              </ItemFooter>
            }
          />
        </Container>
      )

      const item = document.querySelector('li')
      const trigger = item.querySelector('a, [role="button"]')
      const footer = item.querySelector<HTMLElement>(
        '.dnb-list__item__footer'
      )

      expect(document.querySelectorAll('li')).toHaveLength(1)
      expect(footer).toBeInTheDocument()
      expect(trigger).not.toContainElement(footer)
      expect(item).toContainElement(footer)
      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('does not activate the primary action from footer clicks or keys', () => {
      const onClick = vi.fn()
      const onKeyDown = vi.fn()
      const onSave = vi.fn()

      render(
        <ItemAction
          title="Show details"
          href={href}
          onClick={onClick}
          onKeyDown={onKeyDown}
          footer={
            <ItemFooter>
              <Button text="Save" onClick={onSave} />
            </ItemFooter>
          }
        />
      )

      const button = document.querySelector('button')
      const footer = document.querySelector('.dnb-list__item__footer')
      const trigger = document.querySelector('a, [role="button"]')
      trigger.addEventListener('click', (event) => event.preventDefault())

      fireEvent.click(button)
      fireEvent.click(footer)
      fireEvent.keyDown(button, { key: 'Enter' })
      fireEvent.keyDown(button, { key: ' ' })

      expect(onSave).toHaveBeenCalledTimes(1)
      expect(onClick).not.toHaveBeenCalled()
      expect(onKeyDown).not.toHaveBeenCalled()

      fireEvent.click(trigger)
      fireEvent.keyDown(trigger, { key: ' ' })

      expect(onClick).toHaveBeenCalledTimes(2)
      expect(onKeyDown).toHaveBeenCalledTimes(1)
    })

    it('disables Eufemia footer controls without hiding its content', () => {
      render(
        <ItemAction
          title="Show details"
          href={href}
          disabled
          footer={
            <ItemFooter>
              Footer details
              <Button text="Save" />
              <Anchor href="#help">Help</Anchor>
            </ItemFooter>
          }
        />
      )

      const button = document.querySelector('button')

      expect(button.closest('[inert]')).toBeNull()
      expect(button).toBeDisabled()
      expect(
        document.querySelector('.dnb-list__item__footer')
      ).toHaveTextContent('Footer details')
      expect(
        document.querySelector('.dnb-list__item__footer a')
      ).not.toHaveAttribute('href')
    })

    it('inherits the disabled state for the footer', () => {
      render(
        <Container disabled>
          <ItemAction
            title="Show details"
            href={href}
            footer={
              <ItemFooter>
                <Button text="Save" />
              </ItemFooter>
            }
          />
        </Container>
      )

      expect(
        document.querySelector('button').closest('[inert]')
      ).toBeNull()
      expect(document.querySelector('button')).toBeDisabled()
    })

    it('keeps footer controls enabled while pending', () => {
      const footer = (
        <ItemFooter>
          <Button text="Save" />
        </ItemFooter>
      )
      const { rerender } = render(
        <ItemAction
          title="Show details"
          href={href}
          pending
          footer={footer}
        />
      )

      const button = document.querySelector('button')
      button.focus()
      expect(button).toBeEnabled()
      expect(button.closest('[inert]')).toBeNull()

      rerender(
        <ItemAction title="Show details" href={href} footer={footer} />
      )

      expect(document.activeElement).toBe(button)
      expect(button).toBeEnabled()

      expect(
        document.querySelector('button').closest('[inert]')
      ).toBeNull()
      expect(document.querySelector('a, [role="button"]')).toHaveAttribute(
        'tabindex',
        '0'
      )
    })
  })

  it('preserves custom link handlers with an independent footer', () => {
    const onClick = vi.fn()
    const onKeyDown = vi.fn()
    const linkClick = vi.fn()
    const linkKeyDown = vi.fn()

    function RouterLink({
      to,
      children,
      ...rest
    }: {
      to?: string
      children?: ReactNode
    }) {
      return (
        <a href={to} {...rest}>
          {children}
        </a>
      )
    }

    render(
      <ItemAction
        title="Route"
        to="#route"
        element={RouterLink}
        elementProps={{ onClick: linkClick, onKeyDown: linkKeyDown }}
        onClick={onClick}
        onKeyDown={onKeyDown}
        footer={
          <ItemFooter>
            <Button text="Save" />
          </ItemFooter>
        }
      />
    )

    const link = document.querySelector('a')
    link.addEventListener('click', (event) => event.preventDefault())
    fireEvent.keyDown(link, { key: ' ' })

    expect(link).toHaveAttribute('href', '#route')
    expect(linkKeyDown).toHaveBeenCalledTimes(1)
    expect(onKeyDown).toHaveBeenCalledTimes(1)
    expect(linkClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledTimes(1)

    fireEvent.click(document.querySelector('button'))

    expect(linkClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('inherits the item skeleton in footer controls', () => {
    function FooterContent() {
      const { skeleton } = useContext(Context)
      return <span data-skeleton={String(skeleton)}>Save</span>
    }

    render(
      <ItemAction
        skeleton
        title="Loading"
        footer={
          <ItemFooter>
            <FooterContent />
          </ItemFooter>
        }
      />
    )

    expect(document.querySelector('[data-skeleton]')).toHaveAttribute(
      'data-skeleton',
      'true'
    )
  })

  it.each([undefined, null, false])(
    'preserves the layout without a footer (%s)',
    (footer) => {
      render(<ItemAction title="Show details" footer={footer} />)

      expect(
        document.querySelector('.dnb-list__item__action--with-footer')
      ).not.toBeInTheDocument()
      expect(
        document.querySelector('.dnb-list__item__action__footer')
      ).not.toBeInTheDocument()
    }
  )

  describe('Accessibility', () => {
    it('action item (button) inside Container has no axe violations', async () => {
      const { container } = render(
        <Container>
          <ItemAction title="Click me" onClick={() => {}}>
            Content
          </ItemAction>
        </Container>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('action item (link) inside Container has no axe violations', async () => {
      const { container } = render(
        <Container>
          <ItemAction title="Link" href="/path">
            Content
          </ItemAction>
        </Container>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('does not put role="button" on the li element', () => {
      render(
        <Container>
          <ItemAction onClick={() => {}}>Content</ItemAction>
        </Container>
      )

      const li = document.querySelector('.dnb-list__item__action')

      expect(li.tagName).toBe('LI')
      expect(li).not.toHaveAttribute('role')
    })

    it('does not put role="link" on the li element', () => {
      render(
        <Container>
          <ItemAction href="/path">Content</ItemAction>
        </Container>
      )

      const li = document.querySelector('.dnb-list__item__action')

      expect(li.tagName).toBe('LI')
      expect(li).not.toHaveAttribute('role')
    })
  })
})
