import type { RefObject } from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Card from '../index'
import { P } from '../../../elements'

describe('Card.Action', () => {
  describe('as link (href)', () => {
    it('should render an anchor wrapping a card', () => {
      render(
        <Card.Action href="/page">
          <P>Link card</P>
        </Card.Action>
      )

      const action = document.querySelector('.dnb-card-action')
      const card = document.querySelector('.dnb-card')

      expect(action).toBeTruthy()
      expect(action.tagName).toBe('A')
      expect(action).toHaveAttribute('href', '/page')
      expect(action.contains(card)).toBe(true)
    })

    it('should use to prop when element is "a"', () => {
      render(
        <Card.Action to="/route">
          <P>Link card</P>
        </Card.Action>
      )

      const action = document.querySelector('.dnb-card-action')
      expect(action).toHaveAttribute('href', '/route')
    })

    it('should pass Card props to the inner Card', () => {
      render(
        <Card.Action href="/page" stack filled>
          <P>Link card</P>
        </Card.Action>
      )

      const card = document.querySelector('.dnb-card')
      expect(card).toHaveClass('dnb-card--filled')
    })

    it('should forward target and rel', () => {
      render(
        <Card.Action
          href="https://example.com"
          target="_blank"
          rel="noopener"
        >
          <P>External link</P>
        </Card.Action>
      )

      const action = document.querySelector('.dnb-card-action')
      expect(action).toHaveAttribute('target', '_blank')
      expect(action).toHaveAttribute('rel', 'noopener')
    })

    it('should add rel="noopener noreferrer" for target="_blank" without explicit rel', () => {
      render(
        <Card.Action href="https://example.com" target="_blank">
          <P>External link</P>
        </Card.Action>
      )

      const action = document.querySelector('.dnb-card-action')
      expect(action).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should call onClick when clicked', async () => {
      const onClick = vi.fn()

      render(
        <Card.Action href="/page" onClick={onClick}>
          <P>Link card</P>
        </Card.Action>
      )

      const action = document.querySelector('.dnb-card-action')
      await userEvent.click(action)

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should render with a custom element', () => {
      function CustomLink(
        props: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
          to:
            | string
            | { pathname?: string; search?: string; hash?: string }
        }
      ) {
        const { to, children, ...rest } = props
        return (
          <a href={String(to)} {...rest} data-custom>
            {children}
          </a>
        )
      }

      render(
        <Card.Action to="/custom" element={CustomLink}>
          <P>Custom link card</P>
        </Card.Action>
      )

      const action = document.querySelector('.dnb-card-action')
      expect(action).toHaveAttribute('data-custom')
      expect(action).toHaveAttribute('href', '/custom')
    })

    it('should forward ref to the anchor element', () => {
      const ref: RefObject<HTMLElement | null> = { current: null }

      render(
        <Card.Action href="/page" ref={ref}>
          <P>Link card</P>
        </Card.Action>
      )

      const action = document.querySelector('.dnb-card-action')
      expect(ref.current).toBe(action)
    })

    it('should validate with ARIA rules', async () => {
      const Comp = render(
        <Card.Action href="/page" title="Link Card">
          <P>Card content paragraph</P>
        </Card.Action>
      )
      expect(await axeComponent(Comp)).toHaveNoViolations()
    })
  })

  describe('as button (onClick)', () => {
    it('should render a div with role="button"', () => {
      render(
        <Card.Action onClick={() => null}>
          <P>Clickable card</P>
        </Card.Action>
      )

      const action = document.querySelector('.dnb-card-action')
      expect(action.tagName).toBe('DIV')
      expect(action).toHaveAttribute('role', 'button')
      expect(action).toHaveAttribute('tabindex', '0')
    })

    it('should call onClick when clicked', async () => {
      const onClick = vi.fn()

      render(
        <Card.Action onClick={onClick}>
          <P>Clickable card</P>
        </Card.Action>
      )

      const action = document.querySelector('.dnb-card-action')
      await userEvent.click(action)

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should trigger onClick on Enter key', () => {
      const onClick = vi.fn()

      render(
        <Card.Action onClick={onClick}>
          <P>Clickable card</P>
        </Card.Action>
      )

      const action = document.querySelector('.dnb-card-action')
      fireEvent.keyDown(action, { key: 'Enter' })

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should trigger onClick on Space key', () => {
      const onClick = vi.fn()

      render(
        <Card.Action onClick={onClick}>
          <P>Clickable card</P>
        </Card.Action>
      )

      const action = document.querySelector('.dnb-card-action')
      fireEvent.keyDown(action, { key: ' ' })

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should not trigger onClick on other keys', () => {
      const onClick = vi.fn()

      render(
        <Card.Action onClick={onClick}>
          <P>Clickable card</P>
        </Card.Action>
      )

      const action = document.querySelector('.dnb-card-action')
      fireEvent.keyDown(action, { key: 'Tab' })

      expect(onClick).not.toHaveBeenCalled()
    })

    it('should contain a Card inside', () => {
      render(
        <Card.Action onClick={() => null}>
          <P>Clickable card</P>
        </Card.Action>
      )

      const action = document.querySelector('.dnb-card-action')
      const card = action.querySelector('.dnb-card')

      expect(card).toBeTruthy()
      expect(card.tagName).toBe('SECTION')
    })

    it('should validate with ARIA rules', async () => {
      const Comp = render(
        <Card.Action onClick={() => null}>
          <P>Clickable card</P>
        </Card.Action>
      )
      expect(await axeComponent(Comp)).toHaveNoViolations()
    })
  })
})
