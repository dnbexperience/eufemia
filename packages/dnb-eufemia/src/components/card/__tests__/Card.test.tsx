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
      'dnb-card',
      'custom-class',
      'dnb-flex-item--align-self-stretch',
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

    expect(element.childNodes).toHaveLength(2)
    expect(element.textContent).toBe('ParagraphParagraph')
  })

  it('should have wrap={false} on a stack', () => {
    render(
      <Card stack>
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-flex-container')
    expect(element.className).not.toContain('dnb-flex-container--wrap')
  })

  it('should stack children divided by lines', () => {
    render(
      <Card stack>
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    const children = element.children

    expect(element.className).toContain('dnb-flex-container--divider-line')

    expect(children.length).toBe(4)

    expect(children[1].tagName).toBe('DIV')
    expect(children[1].className).toContain('dnb-space__top--medium')

    expect(children[2].tagName).toBe('HR')
    expect(children[2].className).toContain(
      'dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-space__top--zero dnb-hr'
    )

    expect(children[0].tagName).toBe('P')
    expect(children[0].className).toEqual(
      'dnb-p dnb-space__top--zero dnb-space__bottom--zero'
    )
    expect(children[3].tagName).toBe('P')
    expect(children[3].className).toEqual(
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

    expect(element.className).toContain(
      'dnb-flex-container--direction-vertical'
    )

    rerender(
      <Card direction="horizontal">
        <P>Paragraph</P>
      </Card>
    )

    expect(element.className).toContain(
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
      <Card spacing="small">
        <P>Paragraph</P>
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    const element = document.querySelector('.dnb-card')
    const children = element.children

    expect(element.className).toContain(
      'dnb-flex-container--spacing-small'
    )

    expect(children.length).toBe(3)

    expect(children[0].className).toContain('dnb-space__top--zero')
    expect(children[0].className).toContain('dnb-space__bottom--zero')

    expect(children[1].className).toContain('dnb-space__top--small')
    expect(children[1].className).toContain('dnb-space__bottom--zero')

    expect(children[2].className).toContain('dnb-space__top--small')
    expect(children[2].className).toContain('dnb-space__bottom--zero')

    rerender(
      <Card spacing="large">
        <P>Paragraph</P>
        <P>Paragraph</P>
        <P>Paragraph</P>
      </Card>
    )

    expect(element.className).toContain(
      'dnb-flex-container--spacing-large'
    )

    expect(children[0].className).toContain('dnb-space__top--zero')
    expect(children[0].className).toContain('dnb-space__bottom--zero')

    expect(children[1].className).toContain('dnb-space__top--large')
    expect(children[1].className).toContain('dnb-space__bottom--zero')

    expect(children[2].className).toContain('dnb-space__top--large')
    expect(children[2].className).toContain('dnb-space__bottom--zero')
  })
})
