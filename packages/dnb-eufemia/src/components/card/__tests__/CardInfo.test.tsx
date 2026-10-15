import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { RefObject } from 'react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Card from '../index'
import { Button, Flex } from '../../../components'
import { H2, P } from '../../../elements'
import Provider from '../../../shared/Provider'

describe('Card.Info', () => {
  it('renders one complete card with freely composed children and surface defaults', () => {
    render(
      <Card.Info aria-label="Savings tip">
        <H2 size="small">Build your savings</H2>
        <P size="small">A little every month goes a long way.</P>
        <Button>Start saving</Button>
      </Card.Info>
    )
    const card = document.querySelector('.dnb-card-info')
    expect(document.querySelectorAll('.dnb-card')).toHaveLength(1)
    expect(card).toHaveClass('dnb-card')
    expect(card).not.toHaveClass('dnb-card--responsive')
    expect(card.getAttribute('style')).toContain(
      '--drop-shadow--small: var(--shadow-default)'
    )
    expect(card.getAttribute('style')).toContain('--padding-l-s: 1rem')
    expect(card.getAttribute('style')).toContain('--padding-l-m: 1.5rem')
    expect(card.querySelector('h2')).toHaveTextContent(
      'Build your savings'
    )
    expect(card.querySelector('button')).toHaveTextContent('Start saving')
    expect(card.querySelector('.dnb-icon')).toBeNull()
    expect(card.querySelector('.dnb-card-info__content')).toBeNull()
  })

  it('lets callers override Card defaults and forward native attributes', () => {
    render(
      <Card.Info
        dropShadow={false}
        responsive
        innerSpace={false}
        gap="x-small"
        stack={false}
        direction="horizontal"
        element="article"
        filled
        title="Savings"
        className="custom"
        id="tip"
        data-testid="tip"
        top="small"
      >
        <P>Content</P>
      </Card.Info>
    )
    const card = document.querySelector('.dnb-card-info')
    expect(card.tagName).toBe('ARTICLE')
    expect(card).toHaveClass(
      'custom',
      'dnb-card--filled',
      'dnb-card--responsive',
      'dnb-space__top--small'
    )
    expect(card).toHaveAttribute('id', 'tip')
    expect(card).toHaveAttribute('data-testid', 'tip')
    expect(card.getAttribute('style')).not.toContain(
      'var(--shadow-default)'
    )
    expect(card.querySelector('.dnb-card__title')).toHaveTextContent(
      'Savings'
    )
    expect(card).toHaveAttribute(
      'aria-labelledby',
      card.querySelector('.dnb-card__title').id
    )
    expect(card.querySelector('.dnb-flex-container')).toHaveClass(
      'dnb-flex-container--direction-horizontal'
    )
  })

  it('keeps custom graphics and child actions unchanged', async () => {
    const onClick = vi.fn()
    const result = render(
      <Card.Info aria-label="Savings">
        <img src="/graphic.png" alt="Savings adviser" />
        <Flex.Horizontal>
          <Button onClick={onClick}>Accept</Button>
          <Button href="#details">Details</Button>
        </Flex.Horizontal>
      </Card.Info>
    )
    expect(document.querySelector('.dnb-card-info img')).toHaveAttribute(
      'alt',
      'Savings adviser'
    )
    expect(document.querySelector('.dnb-card-action')).toBeNull()
    await userEvent.click(document.querySelector('.dnb-card-info button'))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(await axeComponent(result)).toHaveNoViolations()
  })

  it('inherits Card close behavior and never submits a surrounding form', async () => {
    const onClose = vi.fn()
    const onSubmit = vi.fn((event) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Card.Info
          onClose={onClose}
          closeButtonProps={{ title: 'Dismiss tip' }}
        >
          <P>Tip</P>
        </Card.Info>
      </form>
    )
    const button = document.querySelector('.dnb-card__close-button')
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('aria-label', 'Dismiss tip')
    await userEvent.click(button)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('supports link behavior and forwards Card props to one surface', async () => {
    const result = render(
      <Card.Info href="#savings" target="_blank" filled id="tip">
        <P>Savings</P>
      </Card.Info>
    )
    const action = document.querySelector('.dnb-card-action')
    expect(action.tagName).toBe('A')
    expect(action).toHaveAttribute('href', '#savings')
    expect(action).toHaveAttribute('rel', 'noopener noreferrer')
    expect(action.querySelectorAll('.dnb-card')).toHaveLength(1)
    expect(action.querySelector('.dnb-card-info')).toHaveClass(
      'dnb-card--filled'
    )
    expect(action.querySelector('.dnb-card-info')).toHaveAttribute(
      'id',
      'tip'
    )
    expect(action.querySelectorAll('a, button, [tabindex]')).toHaveLength(
      0
    )
    expect(await axeComponent(result)).toHaveNoViolations()
  })

  it('activates whole-card actions with keyboard and pointer', async () => {
    const onClick = vi.fn()
    const result = render(
      <Card.Info onClick={onClick}>
        <P>Start saving</P>
      </Card.Info>
    )
    const action = document.querySelector<HTMLElement>('.dnb-card-action')
    action.focus()
    await userEvent.keyboard('{Enter} ')
    expect(onClick).toHaveBeenCalledTimes(2)
    await userEvent.click(action)
    expect(onClick).toHaveBeenCalledTimes(3)
    expect(await axeComponent(result)).toHaveNoViolations()
  })

  it('supports router elements and refs through Card.Action', () => {
    const ref: RefObject<HTMLElement | null> = { current: null }
    const RouterLink = ({ to, children, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    )
    render(
      <Card.Info to="/savings" element={RouterLink} ref={ref}>
        <P>Savings</P>
      </Card.Info>
    )
    expect(ref.current).toBe(document.querySelector('.dnb-card-action'))
    expect(ref.current).toHaveAttribute('href', '/savings')
  })

  it('forwards the ref to the surface of a noninteractive card', () => {
    const ref: RefObject<HTMLElement | null> = { current: null }
    render(
      <Card.Info ref={ref}>
        <P>Information</P>
      </Card.Info>
    )
    expect(ref.current).toBe(document.querySelector('.dnb-card-info'))
  })

  it('preserves Card.Action link safeguards', () => {
    render(
      <Card.Info href="javascript:alert(1)">
        <P>Savings</P>
      </Card.Info>
    )
    expect(document.querySelector('.dnb-card-action')).not.toHaveAttribute(
      'href'
    )
  })

  it('supports both Card layout engines without an extra surface', () => {
    const { rerender } = render(
      <Card.Info layoutEngine="legacy">
        <P>Tip</P>
      </Card.Info>
    )
    expect(document.querySelectorAll('.dnb-card')).toHaveLength(1)
    rerender(
      <Card.Info layoutEngine="css">
        <P>Tip</P>
      </Card.Info>
    )
    expect(document.querySelectorAll('.dnb-card')).toHaveLength(1)
    expect(document.querySelector('.dnb-flex-container')).toHaveClass(
      'dnb-flex-container--css-gap'
    )
  })

  it('allows skeletons through the existing Provider composition', () => {
    render(
      <Provider skeleton>
        <Card.Info>
          <P>Loading information</P>
        </Card.Info>
      </Provider>
    )
    expect(document.querySelector('.dnb-card-info .dnb-p')).toHaveClass(
      'dnb-skeleton'
    )
  })

  it('keeps its defaults when optional override values are undefined', () => {
    render(
      <Card.Info
        responsive={undefined}
        dropShadow={undefined}
        innerSpace={undefined}
      >
        <P>Information</P>
      </Card.Info>
    )
    const card = document.querySelector('.dnb-card-info')
    expect(card).not.toHaveClass('dnb-card--responsive')
    expect(card.getAttribute('style')).toContain(
      '--drop-shadow--small: var(--shadow-default)'
    )
    expect(card.getAttribute('style')).toContain('--padding-l-m: 1.5rem')
  })

  it('exposes mutually exclusive types for action and close controls', () => {
    // @ts-expect-error A whole-card link cannot contain a close button.
    const link = <Card.Info href="/savings" onClose={() => undefined} />
    const action = (
      // @ts-expect-error A whole-card action cannot contain a close button.
      <Card.Info
        onClick={() => undefined}
        closeButtonProps={{ title: 'Close' }}
      />
    )
    // @ts-expect-error Card.Info accepts content as children, not a text shortcut.
    const text = <Card.Info text="Information" />
    expect([link, action, text]).toHaveLength(3)
  })
})
