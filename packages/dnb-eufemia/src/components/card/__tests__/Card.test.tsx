import React from 'react'
import { render } from '@testing-library/react'
import Card from '../../card/Card'
import { P } from '../../../elements'

describe('Card', () => {
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

  it('should support spacing props', () => {
    const { rerender } = render(
      <Card top="large">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum.
      </Card>
    )

    const element = document.querySelector('.dnb-card')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(
      <Card top="x-large">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum.
      </Card>
    )

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(
      <Card className="custom-class">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum.
      </Card>
    )

    const element = document.querySelector('.dnb-card')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-flex-item',
      'dnb-flex-item--align-self-stretch',
      'dnb-section',
      'dnb-section--default',
      'dnb-card',
      'custom-class',
      'dnb-card--responsive',
    ])
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

  it('should stack children divided by space', () => {
    render(
      <Card stack>
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    const container = element.querySelector('.dnb-flex-container')
    const children = container.children

    expect(container).toHaveClass('dnb-flex-container--divider-space')

    expect(children.length).toBe(2)

    expect(children[0].tagName).toBe('P')
    expect(children[0]).toHaveClass(
      'dnb-p dnb-space__top--zero dnb-space__bottom--zero'
    )

    expect(children[1].tagName).toBe('P')
    expect(children[1]).toHaveClass('dnb-space__top--medium')
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

  it('should stack children divided by lines', () => {
    render(
      <Card stack divider="line">
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    const container = element.querySelector('.dnb-flex-container')
    const children = container.children

    expect(container).toHaveClass('dnb-flex-container--divider-line')

    expect(children.length).toBe(3)

    expect(children[0].tagName).toBe('P')
    expect(children[0]).toHaveClass(
      'dnb-p dnb-space__top--zero dnb-space__bottom--zero'
    )
    expect(children[1].tagName).toBe('HR')
    expect(children[1]).toHaveClass(
      'dnb-flex-container__hr dnb-space__top--medium dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-hr'
    )

    expect(children[2].tagName).toBe('P')
    expect(children[2]).toHaveClass(
      'dnb-p dnb-space__top--medium dnb-space__bottom--zero'
    )
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

  it('should add spacing between elements', () => {
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

    expect(container).toHaveClass('dnb-flex-container--spacing-small')

    expect(children.length).toBe(3)

    expect(children[0]).toHaveClass('dnb-space__top--zero')
    expect(children[0]).toHaveClass('dnb-space__bottom--zero')

    expect(children[1]).toHaveClass('dnb-space__top--small')
    expect(children[1]).toHaveClass('dnb-space__bottom--zero')

    expect(children[2]).toHaveClass('dnb-space__top--small')
    expect(children[2]).toHaveClass('dnb-space__bottom--zero')

    rerender(
      <Card gap="large">
        <P>Paragraph</P>
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    expect(container).toHaveClass('dnb-flex-container--spacing-large')

    expect(children[0]).toHaveClass('dnb-space__top--zero')
    expect(children[0]).toHaveClass('dnb-space__bottom--zero')

    expect(children[1]).toHaveClass('dnb-space__top--large')
    expect(children[1]).toHaveClass('dnb-space__bottom--zero')

    expect(children[2]).toHaveClass('dnb-space__top--large')
    expect(children[2]).toHaveClass('dnb-space__bottom--zero')
  })

  it('gets valid ref element', () => {
    let ref: React.RefObject<HTMLInputElement>

    function MockComponent() {
      ref = React.useRef()
      return (
        <Card innerRef={ref} element="div">
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

    expect(element.getAttribute('style')).toContain('--space-')

    rerender(<Card innerSpace={0} />)

    expect(element.getAttribute('style')).not.toContain('--space-')
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
      window.getComputedStyle(element).getPropertyValue('--space-l-s')
    ).toBe('0')

    rerender(
      <Card responsive={false}>
        <P>Paragraph</P>
      </Card>
    )

    expect(
      window.getComputedStyle(element).getPropertyValue('--space-l-s')
    ).toBe('1.5rem')
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
})
