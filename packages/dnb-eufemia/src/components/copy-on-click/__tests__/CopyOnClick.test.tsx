import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import CopyOnClick from '../CopyOnClick'

describe('CopyOnClick', () => {
  it('renders with default props', async () => {
    render(<CopyOnClick>CopyOnClick text</CopyOnClick>)

    await waitFor(() =>
      expect(screen.getByText('CopyOnClick text')).toBeInTheDocument()
    )

    const element = document.querySelector('.dnb-copy-on-click')

    expect(Array.from(element.classList)).toEqual([
      'dnb-copy-on-click',
      'dnb-copy-on-click--cursor',
    ])
  })

  it('does not render the cursor when disabled', async () => {
    render(<CopyOnClick showCursor={true}>Disabled cursor</CopyOnClick>)

    const element = document.querySelector('.dnb-copy-on-click')

    expect(Array.from(element.classList)).not.toContain([
      'dnb-copy-on-click--cursor',
    ])
  })

  it('updates when children changes', async () => {
    const { rerender } = render(<CopyOnClick>First copy text</CopyOnClick>)

    await waitFor(() =>
      expect(screen.getByText('First copy text')).toBeInTheDocument()
    )

    rerender(<CopyOnClick>Second copy text</CopyOnClick>)

    await waitFor(() =>
      expect(screen.getByText('Second copy text')).toBeInTheDocument()
    )
  })

  it('renders with a paragraph element', async () => {
    render(
      <CopyOnClick>
        <p>CopyOnClick text</p>
      </CopyOnClick>
    )

    await waitFor(() =>
      expect(screen.getByText('CopyOnClick text')).toBeInTheDocument()
    )
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
})
