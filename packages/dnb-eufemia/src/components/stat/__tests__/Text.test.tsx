import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Stat from '../Stat'

function renderInRoot(node: React.ReactNode) {
  return render(
    <Stat.Root>
      <Stat.Label>Revenue</Stat.Label>
      <Stat.Content>{node}</Stat.Content>
    </Stat.Root>
  )
}

describe('Stat.Text', () => {
  it('renders text content without default typography classes', () => {
    renderInRoot(<Stat.Text>Custom content</Stat.Text>)

    const text = document.querySelector('.dnb-stat__text')

    expect(text).toBeInTheDocument()
    expect(text.tagName.toLowerCase()).toBe('span')
    expect(text.textContent).toBe('Custom content')
    expect(text.className).not.toContain('dnb-t__size--')
    expect(text.className).not.toContain('dnb-t__weight--')
  })

  it('supports colorizeBySign with an explicit numeric value', () => {
    renderInRoot(
      <Stat.Text colorizeBySign={-123}>Custom content</Stat.Text>
    )

    const text = document.querySelector('.dnb-stat__text')

    expect(text.classList).toContain('dnb-stat--tone-negative')
  })

  it('supports colorizeBySign when children are numeric', () => {
    renderInRoot(<Stat.Text colorizeBySign>{123}</Stat.Text>)

    const text = document.querySelector('.dnb-stat__text')

    expect(text.classList).toContain('dnb-stat--tone-positive')
  })

  it('supports colorizeBySign with string children containing a minus prefix', () => {
    renderInRoot(<Stat.Text colorizeBySign>-42%</Stat.Text>)

    const text = document.querySelector('.dnb-stat__text')

    expect(text.classList).toContain('dnb-stat--tone-negative')
  })

  it('supports colorizeBySign with string children containing a plus prefix', () => {
    renderInRoot(<Stat.Text colorizeBySign>+revenue</Stat.Text>)

    const text = document.querySelector('.dnb-stat__text')

    expect(text.classList).toContain('dnb-stat--tone-positive')
  })

  it('supports colorizeBySign with negative zero', () => {
    renderInRoot(<Stat.Text colorizeBySign={-0}>value</Stat.Text>)

    const text = document.querySelector('.dnb-stat__text')

    expect(text.classList).toContain('dnb-stat--tone-negative')
  })

  it('supports typography props', () => {
    renderInRoot(
      <Stat.Text fontSize="x-large" fontWeight="regular">
        Custom content
      </Stat.Text>
    )

    const text = document.querySelector('.dnb-stat__text')

    expect(text.classList).toContain('dnb-t__size--x-large')
    expect(text.classList).toContain('dnb-t__weight--regular')
  })

  it('supports screen reader labeling', () => {
    renderInRoot(
      <Stat.Text srLabel="Revenue delta">Custom content</Stat.Text>
    )

    const text = document.querySelector('.dnb-stat__text')

    expect(text.getAttribute('aria-label')).toBe(
      'Revenue delta\u00A0Custom content'
    )
  })

  it('supports skeleton prop', () => {
    renderInRoot(<Stat.Text skeleton>Custom content</Stat.Text>)

    const text = document.querySelector('.dnb-stat__text')

    expect(text.classList).toContain('dnb-skeleton')
    expect(text.classList).toContain('dnb-skeleton--font')
    expect(text).toHaveAttribute('aria-disabled', 'true')
  })

  it('supports spacing props', () => {
    renderInRoot(<Stat.Text top="large">Custom content</Stat.Text>)

    const text = document.querySelector('.dnb-stat__text')

    expect(text.classList).toContain('dnb-space__top--large')
  })

  it('supports id, style and className props', () => {
    renderInRoot(
      <Stat.Text
        id="my-text"
        style={{ color: 'red' }}
        className="custom-class"
      >
        Custom content
      </Stat.Text>
    )

    const text = document.querySelector('.dnb-stat__text')

    expect(text.getAttribute('id')).toBe('my-text')
    expect(text.getAttribute('style')).toContain('color: red')
    expect(text.classList).toContain('custom-class')
  })

  it('supports use outside Stat.Root', () => {
    render(<Stat.Text>Custom content</Stat.Text>)

    const text = document.querySelector('.dnb-stat__text')

    expect(text).toBeInTheDocument()
    expect(text.className).not.toContain('dnb-t__size--')
  })

  it('should validate with ARIA rules', async () => {
    const component = renderInRoot(<Stat.Text>Custom content</Stat.Text>)

    expect(await axeComponent(component)).toHaveNoViolations()
  })
})
