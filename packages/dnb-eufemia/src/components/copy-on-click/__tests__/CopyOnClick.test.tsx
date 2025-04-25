import React from 'react'
import { render, screen } from '@testing-library/react'
import CopyOnClick from '../CopyOnClick'
import { mockClipboard } from '../../../core/jest/jestSetup'
import { copyWithEffect } from '../../../components/number-format/NumberUtils'
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

  it('does not render the cursor when disabled', async () => {
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

  it('renders with a paragraph element', async () => {
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

  it('should copy to clipboard', async () => {
    copyWithEffect('CopyOnClick')
    expect(await navigator.clipboard.readText()).toBe('CopyOnClick')
  })

  it('should accept copyContent prop', async () => {
    render(
      <CopyOnClick copyContent="copyContent">CopyOnClick</CopyOnClick>
    )

    expect(screen.getByText('CopyOnClick')).toBeInTheDocument()
  })

  it('should support spacing props', async () => {
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
})
