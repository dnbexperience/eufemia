import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import CopyOnClick from '../CopyOnClick'
import { mockClipboard } from '../../../core/jest/jestSetup'
import NumberFormat from '../../NumberFormat'
import userEvent from '@testing-library/user-event'

describe('CopyOnClick', () => {
  beforeAll(() => {
    mockClipboard()
  })

  it('renders with default props', () => {
    render(<CopyOnClick>CopyOnClick text</CopyOnClick>)

    expect(screen.getByText('CopyOnClick text')).toBeInTheDocument()

    const element = document.querySelector('.dnb-copy-on-click')

    expect(Array.from(element.classList)).toEqual([
      'dnb-copy-on-click',
      'dnb-copy-on-click--cursor',
      'dnb-span',
    ])
  })

  it('does not render the cursor when disabled', () => {
    render(<CopyOnClick showCursor={true}>Disabled cursor</CopyOnClick>)

    const element = document.querySelector('.dnb-copy-on-click')

    expect(Array.from(element.classList)).not.toContain([
      'dnb-copy-on-click--cursor',
    ])
  })

  it('updates when children changes', () => {
    const { rerender } = render(<CopyOnClick>First copy text</CopyOnClick>)

    expect(screen.getByText('First copy text')).toBeInTheDocument()

    rerender(<CopyOnClick>Second copy text</CopyOnClick>)

    expect(screen.getByText('Second copy text')).toBeInTheDocument()
  })

  it('renders with a paragraph element', () => {
    render(
      <CopyOnClick>
        <p>CopyOnClick text</p>
      </CopyOnClick>
    )

    expect(screen.getByText('CopyOnClick text')).toBeInTheDocument()
  })

  it('should set any given HTML attribute on the element', () => {
    render(
      <CopyOnClick id="test-id" data-test="test-data">
        <p>CopyOnClick text</p>
      </CopyOnClick>
    )

    const element = document.querySelector('.dnb-copy-on-click')

    expect(element).toHaveAttribute('id', 'test-id')
    expect(element).toHaveAttribute('data-test', 'test-data')
  })

  it('should have dnb-copy-on-click--cursor class', () => {
    render(
      <CopyOnClick>
        <p>CopyOnClick text</p>
      </CopyOnClick>
    )

    const element = document.querySelector('.dnb-copy-on-click')

    expect(element).toHaveClass('dnb-copy-on-click--cursor')
  })

  it('should set a custom HTML class name on the element', () => {
    render(
      <CopyOnClick className="custom-class">CopyOnClick text</CopyOnClick>
    )

    const element = document.querySelector('.dnb-copy-on-click')
    expect(element).toHaveClass('custom-class')
    expect(element).toHaveClass('dnb-copy-on-click')
  })

  it('should accept copyContent prop', () => {
    render(
      <CopyOnClick copyContent="copyContent">CopyOnClick</CopyOnClick>
    )

    expect(screen.getByText('CopyOnClick')).toBeInTheDocument()
  })

  it('should support spacing props', () => {
    render(<CopyOnClick top="large">CopyOnClick text</CopyOnClick>)
    const element = document.querySelector('.dnb-copy-on-click')
    expect(element).toHaveClass('dnb-space__top--large')
  })

  it('should copy children to clipboard', async () => {
    window.getSelection()?.removeAllRanges()

    render(<CopyOnClick>CopyOnClick</CopyOnClick>)

    expect(screen.getByText('CopyOnClick')).toBeInTheDocument()

    await userEvent.click(document.querySelector('.dnb-copy-on-click'))

    expect(await navigator.clipboard.readText()).toBe('CopyOnClick')
  })

  it('should copy copyContent to clipboard', async () => {
    window.getSelection()?.removeAllRanges()

    render(
      <CopyOnClick copyContent="copyContent">CopyOnClick</CopyOnClick>
    )

    expect(screen.getByText('CopyOnClick')).toBeInTheDocument()

    await userEvent.click(document.querySelector('.dnb-copy-on-click'))

    expect(await navigator.clipboard.readText()).toBe('copyContent')
  })

  it('should copy textContent to clipboard when children is empty', async () => {
    window.getSelection()?.removeAllRanges()

    render(
      <CopyOnClick>
        <NumberFormat value={1234567.89} currency="NOK" />
      </CopyOnClick>
    )

    await userEvent.click(document.querySelector('.dnb-copy-on-click'))

    expect(await navigator.clipboard.readText()).toBe('1 234 567,89 kr')
  })

  it('should set be able to set a custom message when text has been successfully copied.', async () => {
    window.getSelection()?.removeAllRanges()

    const customMessage = 'My custom tooltip'
    render(<CopyOnClick tooltipContent={customMessage}>text</CopyOnClick>)

    await userEvent.click(document.querySelector('.dnb-copy-on-click'))

    await waitFor(() => {
      expect(document.querySelector('.dnb-tooltip')).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-tooltip__content').firstChild
          .textContent
      ).toBe(customMessage)
    })
  })

  it('should not copy to clipboard when disabled', async () => {
    // Seed clipboard with a known value
    await navigator.clipboard.writeText('seed')

    render(<CopyOnClick disabled>Copy me</CopyOnClick>)

    await userEvent.click(document.querySelector('.dnb-copy-on-click'))

    // Clipboard should remain unchanged because click is ignored
    expect(await navigator.clipboard.readText()).toBe('seed')
  })

  it('should not activate tooltip and not change clipboard on copy failure', async () => {
    // Seed clipboard with a known value
    await navigator.clipboard.writeText('initial')

    // Force async clipboard API to fail
    const originalWrite = navigator.clipboard.writeText
    navigator.clipboard.writeText = jest
      .fn()
      .mockRejectedValue(new Error('permission denied'))

    // Ensure fallback does not succeed
    document.execCommand = jest.fn(() => false)

    render(<CopyOnClick>Copy me</CopyOnClick>)

    await userEvent.click(document.querySelector('.dnb-copy-on-click'))

    // Clipboard should remain unchanged
    expect(await navigator.clipboard.readText()).toBe('initial')

    // Tooltip should not become active or render
    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip')
      ).not.toBeInTheDocument()
    })

    // Restore original mock
    navigator.clipboard.writeText = originalWrite
  })

  it('reuses a single aria-describedby source for identical tooltip messages', () => {
    render(
      <>
        <CopyOnClick tooltipContent="Shared message">first</CopyOnClick>
        <CopyOnClick tooltipContent="Shared message">second</CopyOnClick>
      </>
    )

    const elements = document.querySelectorAll('.dnb-copy-on-click')
    const firstDescribedBy = elements[0].getAttribute('aria-describedby')
    const secondDescribedBy = elements[1].getAttribute('aria-describedby')

    expect(firstDescribedBy).toBeTruthy()
    expect(firstDescribedBy).toBe(secondDescribedBy)

    const descriptions = document.querySelectorAll(`#${firstDescribedBy}`)
    expect(descriptions).toHaveLength(1)
    expect(descriptions[0].textContent).toBe('Shared message')

    // Tooltip portals should not be rendered while inactive (keepInDOM=false)
    expect(document.querySelector('.dnb-tooltip')).not.toBeInTheDocument()
  })

  it('only renders one tooltip portal per active CopyOnClick instance', async () => {
    window.getSelection()?.removeAllRanges()

    render(
      <>
        <CopyOnClick tooltipContent="Shared message">first</CopyOnClick>
        <CopyOnClick tooltipContent="Shared message">second</CopyOnClick>
      </>
    )

    expect(document.querySelectorAll('.dnb-popover__portal').length).toBe(
      0
    )

    await userEvent.click(document.querySelector('.dnb-copy-on-click'))

    await waitFor(() => {
      expect(
        document.querySelectorAll('.dnb-popover__portal').length
      ).toBe(1)
    })
  })

  it('creates separate tooltip portals when two unique messages are active', async () => {
    window.getSelection()?.removeAllRanges()

    render(
      <>
        <CopyOnClick tooltipContent="Message A">first</CopyOnClick>
        <CopyOnClick tooltipContent="Message B">second</CopyOnClick>
      </>
    )

    const [first, second] = Array.from(
      document.querySelectorAll('.dnb-copy-on-click')
    )

    await userEvent.click(first as HTMLElement)
    window.getSelection()?.removeAllRanges()
    await userEvent.click(second as HTMLElement)

    await waitFor(() => {
      expect(
        document.querySelectorAll('.dnb-popover__portal').length
      ).toBe(2)
    })
  })

  it('removes shared description nodes when unmounted', async () => {
    const { unmount } = render(
      <CopyOnClick tooltipContent="Shared message">only</CopyOnClick>
    )

    const describedBy = document
      .querySelector('.dnb-copy-on-click')
      ?.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    expect(document.getElementById(describedBy)).toBeTruthy()

    unmount()

    await waitFor(() => {
      expect(document.getElementById(describedBy)).toBeNull()
      expect(
        document.getElementById('dnb-copy-on-click-descriptions')
      ).toBeNull()
    })
  })

  it('appends user provided aria-describedby ids to the shared description', () => {
    render(
      <CopyOnClick
        tooltipContent="Shared message"
        aria-describedby="custom-id"
      >
        only
      </CopyOnClick>
    )

    const element = document.querySelector('.dnb-copy-on-click')
    const describedBy = element.getAttribute('aria-describedby')

    expect(describedBy).toContain('custom-id')

    const describedIds = describedBy.split(' ').filter(Boolean)
    expect(describedIds.length).toBeGreaterThan(1)
  })
})
