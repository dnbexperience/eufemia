import React from 'react'
import { render } from '@testing-library/react'
import Card from '../Card'
import { P } from '../../../elements'

describe('Layout.Card', () => {
  it('should forward HTML attributes', () => {
    render(
      <Card aria-label="Aria Label">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum.
      </Card>
    )

    const element = document.querySelector('.dnb-layout__card')
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

    const element = document.querySelector('.dnb-layout__card')

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

    const element = document.querySelector('.dnb-layout__card')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-layout__flex-item',
      'dnb-layout__card',
      'custom-class',
    ])
  })

  it('should render children', () => {
    render(
      <Card>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbicursus pharetra elit in bibendum.
        <br />
        Praesent nunc ipsum, convallis eget convallis gravida, vehicula
        vitae metus. Fusce volutpat risus vitae lectus elementum.
      </Card>
    )

    const element = document.querySelector('.dnb-layout__card')
    const children = element.childNodes
    const childredTextContents = Array.from(children).map((child) =>
      child.textContent.replace(/[\u200C]/g, '')
    )

    expect(children.length).toEqual(3)
    expect(childredTextContents).toEqual([
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbicursus pharetra elit in bibendum.',
      '',
      'Praesent nunc ipsum, convallis eget convallis gravida, vehicula vitae metus. Fusce volutpat risus vitae lectus elementum.',
    ])
  })

  it('should stack children divided by lines', () => {
    render(
      <Card stack>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Morbicursus pharetra elit in bibendum.
        </P>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Morbicursus pharetra elit in bibendum.
        </P>
      </Card>
    )

    const element = document.querySelector('.dnb-layout__card')
    const children = element.children

    expect(element.className).toContain(
      'dnb-layout__flex-container--divider-line'
    )

    expect(children.length).toBe(4)

    expect(children[1].tagName).toBe('DIV')
    expect(children[1].className).toContain('dnb-space__top--medium')

    expect(children[2].tagName).toBe('HR')
    expect(children[2].className).toContain(
      'dnb-layout__flex-container__hr'
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
      <Card direction="column">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum.
      </Card>
    )

    const element = document.querySelector('.dnb-layout__card')

    expect(element.className).toContain(
      'dnb-layout__flex-container--direction-column'
    )

    rerender(
      <Card direction="row">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum.
      </Card>
    )

    expect(element.className).toContain(
      'dnb-layout__flex-container--direction-row'
    )
  })

  it('should add spacing between elements', () => {
    const { rerender } = render(
      <Card spacing="small">
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Morbicursus pharetra elit in bibendum.
        </P>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Morbicursus pharetra elit in bibendum.
        </P>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Morbicursus pharetra elit in bibendum.
        </P>
      </Card>
    )

    const element = document.querySelector('.dnb-layout__card')
    const children = element.children

    expect(element.className).toContain(
      'dnb-layout__flex-container--spacing-small'
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
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Morbicursus pharetra elit in bibendum.
        </P>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Morbicursus pharetra elit in bibendum.
        </P>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Morbicursus pharetra elit in bibendum.
        </P>
      </Card>
    )

    expect(element.className).toContain(
      'dnb-layout__flex-container--spacing-large'
    )

    expect(children[0].className).toContain('dnb-space__top--zero')
    expect(children[0].className).toContain('dnb-space__bottom--zero')

    expect(children[1].className).toContain('dnb-space__top--large')
    expect(children[1].className).toContain('dnb-space__bottom--zero')

    expect(children[2].className).toContain('dnb-space__top--large')
    expect(children[2].className).toContain('dnb-space__bottom--zero')
  })
})
