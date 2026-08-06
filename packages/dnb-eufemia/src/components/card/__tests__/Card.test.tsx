import { useRef } from 'react'
import type { RefObject } from 'react'
import { render } from '@testing-library/react'
import { axeComponent, loadScss } from '../../../core/test-utils/testSetup'
import Card from '../../card/Card'
import { P } from '../../../elements'

describe('Card', () => {
  it('should support legacy and CSS gap ScrollView roots', () => {
    const css = loadScss(require.resolve('../style/dnb-card.scss'))

    expect(css).toContain(
      '.dnb-card > .dnb-flex-container > .dnb-space:has(> .dnb-scroll-view)'
    )
    expect(css).toContain(
      '.dnb-card > .dnb-flex-container > .dnb-scroll-view'
    )
  })

  it('should forward HTML attributes', () => {
    render(
      <Card aria-label="Aria Label">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum.
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('supports inline styling', () => {
    render(
      <Card style={{ color: 'red' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum.
      </Card>
    )

    expect(
      document.querySelector('.dnb-card').getAttribute('style')
    ).toContain('color: red;')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <Card top="large">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum.
      </Card>
    )

    const element = document.querySelector('.dnb-card')

    expect(element).toHaveClass('dnb-space__top--large')

    rerender(
      <Card top="x-large">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum.
      </Card>
    )

    expect(element).toHaveClass('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(
      <Card className="custom-class">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum.
      </Card>
    )

    const element = document.querySelector('.dnb-card')

    expect(element).toHaveClass(
      'dnb-space dnb-flex-item dnb-flex-item--align-self-stretch dnb-section dnb-section--default dnb-card custom-class dnb-card--responsive',
      { exact: true }
    )
  })

  it('should render children', () => {
    render(
      <Card>
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    const container = element.querySelector('.dnb-flex-container')

    expect(container.childNodes).toHaveLength(2)
    expect(container.textContent).toBe('ParagraphParagraph')
  })

  it('should have wrap={false} on a stack', () => {
    render(
      <Card stack>
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-flex-container')
    expect(element).not.toHaveClass('dnb-flex-container--wrap')
  })

  it('should prioritize gap over stack spacing', () => {
    render(
      <Card stack gap="large">
        content
      </Card>
    )

    const element = document.querySelector('.dnb-flex-container')
    expect(element).toHaveClass('dnb-flex-container--spacing-large')
  })

  it('should stack unchanged children with native spacing', () => {
    render(
      <Card stack>
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    const container = element.querySelector('.dnb-flex-container')
    const children = container.children

    expect(container).toHaveClass(
      'dnb-flex-container--css-gap',
      'dnb-flex-container--divider-space',
      'dnb-flex-container--spacing-medium'
    )
    expect(children).toHaveLength(2)
    expect(children[0]).toHaveClass('dnb-p', { exact: true })
    expect(children[1]).toHaveClass('dnb-p', { exact: true })
  })

  it('should have correct classes when "stack" is set', () => {
    render(
      <Card stack>
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    const container = element.querySelector('.dnb-flex-container')

    expect(element).toHaveClass('dnb-flex-item--align-self-stretch')
    expect(container).toHaveClass('dnb-flex-container--align-stretch')
    expect(container).toHaveClass('dnb-flex-container--align-self-stretch')
    expect(container).toHaveClass('dnb-flex-container--spacing-medium')
  })

  it('should set align="stretch" classes', () => {
    render(
      <Card align="stretch">
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    const container = element.querySelector('.dnb-flex-container')

    expect(element).toHaveClass('dnb-flex-item--align-self-stretch')
    expect(container).toHaveClass('dnb-flex-container--align-stretch')
    expect(container).toHaveClass('dnb-flex-container--align-self-stretch')
  })

  it('should set align="flex-end" classes', () => {
    render(
      <Card align="flex-end">
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    const container = element.querySelector('.dnb-flex-container')

    expect(element).toHaveClass('dnb-flex-item--align-self-stretch')
    expect(container).toHaveClass('dnb-flex-container--align-flex-end')
    expect(container).toHaveClass('dnb-flex-container--align-self-stretch')
  })

  it('should stack unchanged children divided by CSS lines', () => {
    render(
      <Card stack divider="line">
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    const container = element.querySelector('.dnb-flex-container')
    const children = container.children

    expect(container).toHaveClass(
      'dnb-flex-container--css-gap',
      'dnb-flex-container--divider-line'
    )
    expect(children).toHaveLength(2)
    expect(container.querySelector('hr')).toBeNull()
    expect(children[0]).toHaveClass('dnb-p', { exact: true })
    expect(children[1]).toHaveClass('dnb-p', { exact: true })
  })

  it('should change direction', () => {
    const { rerender } = render(
      <Card direction="vertical">
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    const container = element.querySelector('.dnb-flex-container')

    expect(container).toHaveClass('dnb-flex-container--direction-vertical')

    rerender(
      <Card direction="horizontal">
        <P>Paragraph</P>
      </Card>
    )

    expect(container).toHaveClass(
      'dnb-flex-container--direction-horizontal'
    )
  })

  it('should use section as default element', () => {
    render(
      <Card>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')

    expect(element.tagName).toBe('SECTION')
  })

  it('should set element', () => {
    render(
      <Card element="article">
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')

    expect(element.tagName).toBe('ARTICLE')
  })

  it('should change native spacing between unchanged elements', () => {
    const { rerender } = render(
      <Card gap="small">
        <P>Paragraph</P>
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    const container = element.querySelector('.dnb-flex-container')
    const children = container.children

    expect(container).toHaveClass(
      'dnb-flex-container--css-gap',
      'dnb-flex-container--spacing-small'
    )
    expect(children).toHaveLength(3)
    for (const child of Array.from(children)) {
      expect(child).toHaveClass('dnb-p', { exact: true })
    }

    rerender(
      <Card gap="large">
        <P>Paragraph</P>
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    expect(container).toHaveClass('dnb-flex-container--spacing-large')
    expect(container).not.toHaveClass('dnb-flex-container--spacing-small')
    for (const child of Array.from(children)) {
      expect(child).toHaveClass('dnb-p', { exact: true })
    }
  })

  it('gets valid ref element', () => {
    let ref: RefObject<HTMLDivElement>

    function MockComponent() {
      ref = useRef<HTMLDivElement | null>(null)
      return (
        <Card ref={ref} element="div">
          Content
        </Card>
      )
    }

    render(<MockComponent />)

    expect(ref.current instanceof HTMLElement).toBe(true)
    expect(ref.current.tagName).toBe('DIV')
  })

  it('should support "filled"', () => {
    render(
      <Card filled>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')

    expect(element).toHaveClass('dnb-card--filled')
  })

  it('should support "innerSpace" of 0', () => {
    const { rerender } = render(<Card />)

    const element = document.querySelector('.dnb-card')

    expect(element.getAttribute('style')).toContain('--padding-')

    rerender(<Card innerSpace={0} />)

    expect(element.getAttribute('style')).not.toContain('--padding-')
  })

  it('should support "outset"', () => {
    const { rerender } = render(<Card outset />)

    const element = document.querySelector('.dnb-card')

    expect(element).toHaveStyle('--outset--small: 0')
    expect(element).toHaveStyle('--outset--medium: 1')
    expect(element).toHaveStyle('--outset--large: 1')

    rerender(
      <Card
        outset={{
          small: true,
          medium: false,
          large: false,
        }}
      />
    )

    expect(element).toHaveStyle('--outset--small: 1')
    expect(element).toHaveStyle('--outset--medium: 0')
    expect(element).toHaveStyle('--outset--large: 0')

    rerender(<Card outset={false} />)

    expect(element).toHaveStyle('--outset--small: 0')
    expect(element).toHaveStyle('--outset--medium: 0')
    expect(element).toHaveStyle('--outset--large: 0')
  })

  it('should support "outlineWidth"', () => {
    render(<Card outlineWidth={2}>Content</Card>)

    const element = document.querySelector('.dnb-card')
    expect(element).toHaveStyle('--outline-width--small: 2px')
    expect(element).toHaveStyle('--outline-width--medium: 2px')
    expect(element).toHaveStyle('--outline-width--large: 2px')
  })

  it('should support "outlineWidth" on nested cards', () => {
    render(
      <Card>
        <Card outlineWidth="1rem">Content</Card>
      </Card>
    )

    const innerCard = document.querySelectorAll('.dnb-card')[1]
    expect(innerCard).toHaveStyle('--outline-width--small: 1rem')
    expect(innerCard).toHaveStyle('--outline-width--medium: 1rem')
    expect(innerCard).toHaveStyle('--outline-width--large: 1rem')
  })

  it('should use default outlineWidth on nested cards', () => {
    render(
      <Card>
        <Card>Content</Card>
      </Card>
    )

    const innerCard = document.querySelectorAll('.dnb-card')[1]
    expect(innerCard).toHaveStyle(
      '--outline-width--small: var(--card-outline-width)'
    )
    expect(innerCard).toHaveStyle(
      '--outline-width--medium: var(--card-outline-width)'
    )
    expect(innerCard).toHaveStyle(
      '--outline-width--large: var(--card-outline-width)'
    )
  })

  it('should support "dropShadow"', () => {
    render(<Card dropShadow>Content</Card>)

    const element = document.querySelector('.dnb-card')
    expect(element).toHaveStyle(
      '--drop-shadow--small: var(--shadow-default)'
    )
    expect(element).toHaveStyle(
      '--drop-shadow--medium: var(--shadow-default)'
    )
    expect(element).toHaveStyle(
      '--drop-shadow--large: var(--shadow-default)'
    )
  })

  it('should not allow "outset" on nested cards', () => {
    render(
      <Card outset>
        <Card outset />
      </Card>
    )

    const firstCard = document.querySelector('.dnb-card')
    const secondCard = firstCard.querySelector('.dnb-card')

    expect(firstCard).toHaveStyle('--outset--small: 0')
    expect(firstCard).toHaveStyle('--outset--medium: 1')
    expect(firstCard).toHaveStyle('--outset--large: 1')

    expect(secondCard).toHaveStyle('--outset--small: 0')
    expect(secondCard).toHaveStyle('--outset--medium: 0')
    expect(secondCard).toHaveStyle('--outset--large: 0')
  })

  it('should support "responsive" of false', () => {
    const { rerender } = render(
      <Card>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')

    expect(element).toHaveClass('dnb-card--responsive')

    rerender(
      <Card responsive={false}>
        <P>Paragraph</P>
      </Card>
    )

    expect(element).not.toHaveClass('dnb-card--responsive')
  })

  it('should use basis space on small screens when "responsive" is set to false', () => {
    const { rerender } = render(
      <Card>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')

    expect(
      window.getComputedStyle(element).getPropertyValue('--padding-l-s')
    ).toBe('0')

    rerender(
      <Card responsive={false}>
        <P>Paragraph</P>
      </Card>
    )

    expect(
      window.getComputedStyle(element).getPropertyValue('--padding-l-s')
    ).toBe('1rem')
  })

  it('should support "title"', () => {
    const { rerender } = render(
      <Card title="Title">
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')

    expect(element.querySelector('.dnb-card__title')).toHaveTextContent(
      'Title'
    )

    rerender(
      <Card title="Title changed">
        <P>Paragraph</P>
      </Card>
    )

    expect(element.querySelector('.dnb-card__title')).toHaveTextContent(
      'Title changed'
    )

    rerender(
      <Card>
        <P>Paragraph</P>
      </Card>
    )

    expect(element.querySelector('.dnb-card__title')).toBeNull()
  })

  it('should link "title" with card', () => {
    const { rerender } = render(
      <Card title="Title">
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')

    expect(element).toHaveAttribute(
      'aria-labelledby',
      element.querySelector('.dnb-card__title').getAttribute('id')
    )

    rerender(
      <Card title="Title" aria-labelledby="123">
        <P>Paragraph</P>
      </Card>
    )

    expect(element).toHaveAttribute(
      'aria-labelledby',
      '123 ' + element.querySelector('.dnb-card__title').getAttribute('id')
    )
  })

  it('should forward ref', () => {
    const ref: RefObject<HTMLElement | null> = { current: null }

    render(
      <Card ref={ref}>
        <P>Card content</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    expect(ref.current).toBe(element)
  })

  it('should forward ref as a function', () => {
    let refElement: HTMLElement | null = null
    const refFn = (elem: HTMLElement) => {
      refElement = elem
    }

    render(
      <Card ref={refFn}>
        <P>Card content</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    expect(refElement).toBe(element)
  })

  describe('Card accessibility', () => {
    it('should validate with ARIA rules', async () => {
      const Comp = render(
        <Card title="Card Title">
          <P>Card content paragraph</P>
        </Card>
      )
      expect(await axeComponent(Comp)).toHaveNoViolations()
    })
  })
})
