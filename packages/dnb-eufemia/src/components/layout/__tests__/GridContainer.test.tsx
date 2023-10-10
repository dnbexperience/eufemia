import React from 'react'
import { render } from '@testing-library/react'
import 'mock-match-media/jest-setup'
import GridContainer from '../GridContainer'
import GridItem from '../GridItem'

describe('Layout.GridContainer', () => {
  it('should forward HTML attributes', () => {
    render(
      <GridContainer aria-label="Aria Label">
        <GridItem>Item</GridItem>
      </GridContainer>
    )

    const element = document.querySelector('.dnb-layout-grid-container')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <GridContainer top="large">
        <GridItem>Item</GridItem>
      </GridContainer>
    )
    const element = document.querySelector('.dnb-layout-grid-container ')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(
      <GridContainer top="x-large">
        <GridItem>Item</GridItem>
      </GridContainer>
    )

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should set columnGap and rowGap', () => {
    const { rerender } = render(
      <GridContainer columnGap rowGap>
        <GridItem>Item</GridItem>
      </GridContainer>
    )

    const element = document.querySelector('.dnb-layout-grid-container')

    expect(element.className).toContain(
      'dnb-layout-grid-container--column-gap-small'
    )
    expect(element.className).toContain(
      'dnb-layout-grid-container--row-gap-small'
    )

    rerender(
      <GridContainer columnGap="medium" rowGap="medium">
        <GridItem>Item</GridItem>
      </GridContainer>
    )

    expect(element.className).toContain(
      'dnb-layout-grid-container--column-gap-medium'
    )
    expect(element.className).toContain(
      'dnb-layout-grid-container--row-gap-medium'
    )

    rerender(
      <GridContainer columnGap="large" rowGap="large">
        <GridItem>Item</GridItem>
      </GridContainer>
    )

    expect(element.className).toContain(
      'dnb-layout-grid-container--column-gap-large'
    )
    expect(element.className).toContain(
      'dnb-layout-grid-container--row-gap-large'
    )
  })

  it('should contain given classes', () => {
    render(
      <GridContainer className="custom-class">
        <GridItem>Item</GridItem>
      </GridContainer>
    )

    const element = document.querySelector('.dnb-layout-grid-container')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-layout-grid-container',
      'custom-class',
    ])
  })

  it('should render children', () => {
    render(
      <GridContainer>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
      </GridContainer>
    )

    const element = document.querySelector('.dnb-layout-grid-container')
    const children = element.children
    const childredTextContents = Array.from(children).map((child) =>
      child.textContent.replace(/[\u200C]/g, '')
    )

    expect(children.length).toEqual(3)
    expect(childredTextContents).toEqual(['Item 1', 'Item 2', 'Item 3'])
  })

  it('should set given columns', () => {
    const { rerender } = render(
      <GridContainer columns={10}>
        <GridItem>Item</GridItem>
      </GridContainer>
    )

    const element = document.querySelector(
      '.dnb-layout-grid-container'
    ) as HTMLElement

    expect(element.style['_values']).toEqual({
      '--small-columns': '10',
      '--medium-columns': '10',
      '--large-columns': '10',
    })

    rerender(
      <GridContainer
        columns={{
          small: 4,
          medium: 6,
          large: 12,
        }}
      >
        <GridItem>Item</GridItem>
      </GridContainer>
    )

    expect(element.style['_values']).toEqual({
      '--small-columns': '4',
      '--medium-columns': '6',
      '--large-columns': '12',
    })
  })

  it('should set element', () => {
    render(<GridContainer element="section">content</GridContainer>)

    const element = document.querySelector('.dnb-layout-grid-container')

    expect(element.tagName).toBe('SECTION')
  })
})
