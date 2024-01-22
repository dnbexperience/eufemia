import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import AriaLive from '../AriaLive'

describe('AriaLive', () => {
  it('renders with default props', async () => {
    render(<AriaLive>Default announcement</AriaLive>)

    await waitFor(() =>
      expect(screen.getByText('Default announcement')).toBeInTheDocument()
    )

    const element = document.querySelector('.dnb-aria-live')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['aria-live', 'aria-atomic', 'class'])
    expect(element).toHaveAttribute('aria-live', 'polite')
    expect(element).toHaveAttribute('aria-atomic', 'true')
    expect(Array.from(element.classList)).toEqual([
      'dnb-aria-live',
      'dnb-sr-only',
    ])
  })

  it('does not render when disabled', async () => {
    render(<AriaLive disabled={true}>Disabled announcement</AriaLive>)

    await waitFor(() =>
      expect(screen.queryByText('Disabled announcement')).toBeNull()
    )
  })

  it('renders with delay', async () => {
    render(<AriaLive>Delayed announcement</AriaLive>)

    expect(screen.queryByText('Delayed announcement')).toBeNull()
    await waitFor(() =>
      expect(screen.getByText('Delayed announcement')).toBeInTheDocument()
    )
  })

  it('renders with politeness', async () => {
    render(
      <AriaLive politeness="assertive">Assertive announcement</AriaLive>
    )

    await waitFor(() =>
      expect(
        screen.getByText('Assertive announcement')
      ).toBeInTheDocument()
    )
  })

  it('renders with atomic', async () => {
    render(<AriaLive atomic={true}>Atomic announcement</AriaLive>)

    await waitFor(() =>
      expect(screen.getByText('Atomic announcement')).toBeInTheDocument()
    )
  })

  it('renders with relevant', async () => {
    render(<AriaLive relevant="text">Relevant text announcement</AriaLive>)

    await waitFor(() =>
      expect(
        screen.getByText('Relevant text announcement')
      ).toBeInTheDocument()
    )
  })

  it('updates when children changes', async () => {
    const { rerender } = render(<AriaLive>First announcement</AriaLive>)

    await waitFor(() =>
      expect(screen.getByText('First announcement')).toBeInTheDocument()
    )

    rerender(<AriaLive>Second announcement</AriaLive>)

    await waitFor(() =>
      expect(screen.getByText('Second announcement')).toBeInTheDocument()
    )
  })

  it('renders with a paragraph element', async () => {
    render(
      <AriaLive>
        <p>Announcement</p>
      </AriaLive>
    )

    await waitFor(() =>
      expect(screen.getByText('Announcement')).toBeInTheDocument()
    )
  })

  it('should set any given HTML attribute on the element', () => {
    render(
      <AriaLive id="test-id" data-test="test-data">
        <p>Announcement</p>
      </AriaLive>
    )

    const element = document.querySelector('.dnb-aria-live')

    expect(element).toHaveAttribute('id', 'test-id')
    expect(element).toHaveAttribute('data-test', 'test-data')
  })

  it('should reset (remove) given message after a while', async () => {
    render(
      <AriaLive>
        <p>Announcement</p>
      </AriaLive>
    )

    const element = document.querySelector('.dnb-aria-live')

    await waitFor(() => {
      expect(element).toHaveTextContent('Announcement')
    })

    await waitFor(() => {
      expect(element).toHaveTextContent('')
    })
  })

  it('should have dnb-sr-only class', () => {
    render(
      <AriaLive>
        <p>Announcement</p>
      </AriaLive>
    )

    const element = document.querySelector('.dnb-aria-live')

    expect(element).toHaveClass('dnb-sr-only')
  })

  it('should set a custom HTML class name on the element', () => {
    render(<AriaLive className="custom-class">Announcement</AriaLive>)

    const element = document.querySelector('.dnb-aria-live')
    expect(element).toHaveClass('custom-class')
    expect(element).toHaveClass('dnb-aria-live')
  })

  it('has the same attributes with default as with low priority', () => {
    const { rerender } = render(
      <AriaLive>
        <p>Default priority announcement</p>
      </AriaLive>
    )

    let element = document.querySelector('.dnb-aria-live')

    expect(element).toBeInTheDocument()
    expect(element).toHaveAttribute('aria-live', 'polite')

    rerender(
      <AriaLive priority="low">
        <p>Low priority announcement</p>
      </AriaLive>
    )

    element = document.querySelector('.dnb-aria-live')

    expect(element).toBeInTheDocument()
    expect(element).toHaveAttribute('aria-live', 'polite')
  })

  it('should make content visible when variant is content', () => {
    render(
      <AriaLive variant="content">
        <ul>
          <li>item one</li>
          <li>item two</li>
        </ul>
      </AriaLive>
    )

    expect(screen.getByText('item one')).toBeInTheDocument()
    expect(screen.getByText('item two')).toBeInTheDocument()

    const element = document.querySelector('.dnb-aria-live')

    expect(element).toHaveAttribute('aria-live', 'polite')
    expect(element).toHaveAttribute('aria-atomic', 'false')
    expect(Array.from(element.classList)).toEqual(['dnb-aria-live'])
  })

  it('should have constant of _supportsSpacingProps="children"', () => {
    expect(AriaLive._supportsSpacingProps).toBe('children')
  })
})
