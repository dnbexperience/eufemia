import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Stat from '../Stat'

describe('Stat.ColorizeBySign', () => {
  it('applies positive tone class for positive values', () => {
    render(
      <Stat.ColorizeBySign value={42}>
        <span>content</span>
      </Stat.ColorizeBySign>
    )

    const root = document.querySelector('.dnb-stat')

    expect(root.classList).toContain('dnb-stat--tone-positive')
    expect(root.classList).not.toContain('dnb-stat--tone-negative')
  })

  it('applies negative tone class for negative values', () => {
    render(
      <Stat.ColorizeBySign value={-42}>
        <span>content</span>
      </Stat.ColorizeBySign>
    )

    const root = document.querySelector('.dnb-stat')

    expect(root.classList).toContain('dnb-stat--tone-negative')
    expect(root.classList).not.toContain('dnb-stat--tone-positive')
  })

  it('applies zero tone class for zero', () => {
    render(
      <Stat.ColorizeBySign value={0}>
        <span>content</span>
      </Stat.ColorizeBySign>
    )

    const root = document.querySelector('.dnb-stat')

    expect(root.classList).toContain('dnb-stat--tone-zero')
    expect(root.classList).not.toContain('dnb-stat--tone-positive')
    expect(root.classList).not.toContain('dnb-stat--tone-negative')
  })

  it('treats negative zero as negative', () => {
    render(
      <Stat.ColorizeBySign value={-0}>
        <span>content</span>
      </Stat.ColorizeBySign>
    )

    const root = document.querySelector('.dnb-stat')

    expect(root.classList).toContain('dnb-stat--tone-negative')
    expect(root.classList).not.toContain('dnb-stat--tone-positive')
  })

  it('renders children correctly', () => {
    render(
      <Stat.ColorizeBySign value={10}>
        <span data-testid="child">Hello</span>
      </Stat.ColorizeBySign>
    )

    const root = document.querySelector('.dnb-stat')
    const child = root.querySelector('[data-testid="child"]')

    expect(child).toBeInTheDocument()
    expect(child.textContent).toBe('Hello')
  })

  it('wraps Stat.Currency with color', () => {
    render(
      <Stat.ColorizeBySign value={-1234}>
        <Stat.Currency value={-1234} signDisplay="always" />
      </Stat.ColorizeBySign>
    )

    const wrapper = document.querySelector('.dnb-stat--tone-negative')

    expect(wrapper).toBeInTheDocument()
    expect(wrapper.querySelector('.dnb-stat__amount')).toBeInTheDocument()
  })

  it('wraps Stat.Percent with color', () => {
    render(
      <Stat.ColorizeBySign value={12.3}>
        <Stat.Percent value={12.3} />
      </Stat.ColorizeBySign>
    )

    const wrapper = document.querySelector('.dnb-stat--tone-positive')

    expect(wrapper).toBeInTheDocument()
    expect(wrapper.querySelector('.dnb-stat__percent')).toBeInTheDocument()
  })

  it('supports custom element', () => {
    render(
      <Stat.ColorizeBySign value={10} element="div">
        <span>content</span>
      </Stat.ColorizeBySign>
    )

    const root = document.querySelector('.dnb-stat')

    expect(root.tagName).toBe('DIV')
  })

  it('supports custom className', () => {
    render(
      <Stat.ColorizeBySign value={10} className="custom-class">
        <span>content</span>
      </Stat.ColorizeBySign>
    )

    const root = document.querySelector('.dnb-stat')

    expect(root.classList).toContain('custom-class')
  })

  it('should have dnb-stat class', () => {
    render(
      <Stat.ColorizeBySign value={10}>
        <span>content</span>
      </Stat.ColorizeBySign>
    )

    const root = document.querySelector('.dnb-stat')

    expect(root).toBeInTheDocument()
  })

  it('should validate with ARIA rules', async () => {
    const result = render(
      <Stat.ColorizeBySign value={10}>
        <span>content</span>
      </Stat.ColorizeBySign>
    )

    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
