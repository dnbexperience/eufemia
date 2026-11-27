import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Stat from '../Stat'
import Anchor from '../../anchor/Anchor'
import Button from '../../button/Button'

function renderInRoot(node: ReactNode) {
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

    // A span has no role, so the label must not be an aria-label on it
    expect(text).not.toHaveAttribute('aria-label')
    expect(text.querySelector('[aria-hidden]')).toHaveTextContent(
      'Custom content'
    )
    expect(text.querySelector('.dnb-sr-only')).toHaveAttribute(
      'data-text',
      'Revenue delta\u00A0Custom content'
    )
  })

  it('shows the screen reader text outside of Stat.Root', () => {
    render(<Stat.Text srLabel="Revenue delta">Custom content</Stat.Text>)

    // ".dnb-stat .dnb-sr-only::before" renders the "data-text"
    expect(document.querySelector('.dnb-stat__text')).toHaveClass(
      'dnb-stat'
    )
  })

  it('keeps an aria-label given without srLabel', () => {
    renderInRoot(
      <Stat.Text aria-label="Given label">Custom content</Stat.Text>
    )

    const text = document.querySelector('.dnb-stat__text')
    expect(text).toHaveAttribute('aria-label', 'Given label')
    expect(text).not.toHaveClass('dnb-stat')
    expect(text.querySelector('.dnb-sr-only')).not.toBeInTheDocument()
  })

  it('supports skeleton prop', () => {
    renderInRoot(<Stat.Text skeleton>Custom content</Stat.Text>)

    const text = document.querySelector('.dnb-stat__text')

    expect(text.classList).toContain('dnb-skeleton')
    expect(text.classList).toContain('dnb-skeleton--font')
    expect(text).toHaveAttribute('aria-disabled', 'true')
  })

  it.each([
    ['Stat.Text', Stat.Text],
    ['Stat.Info', Stat.Info],
  ])(
    'disables Eufemia links and buttons inside %s with skeleton',
    (_, Component) => {
      renderInRoot(
        <Component skeleton>
          Updated hourly <Anchor href="/history">See history</Anchor>
          <Button text="Refresh" />
        </Component>
      )

      const link = document.querySelector('a')
      expect(link).not.toHaveAttribute('href')
      expect(link).toHaveAttribute('tabindex', '-1')
      expect(document.querySelector('button')).toBeDisabled()
    }
  )

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
