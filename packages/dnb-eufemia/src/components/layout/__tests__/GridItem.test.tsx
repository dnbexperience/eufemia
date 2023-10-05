import React from 'react'
import { render } from '@testing-library/react'
import 'mock-match-media/jest-setup'
import GridContainer from '../GridContainer'
import GridItem from '../GridItem'

describe('Layout.GridItem', () => {
  it('should forward HTML attributes', () => {
    render(
      <GridContainer>
        <GridItem aria-label="Aria Label">Item</GridItem>
      </GridContainer>
    )

    const element = document.querySelector('.dnb-layout-grid-item')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <GridContainer>
        <GridItem top="large">Item</GridItem>
      </GridContainer>
    )
    const element = document.querySelector('.dnb-layout-grid-item ')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(
      <GridContainer>
        <GridItem top="x-large">Item</GridItem>
      </GridContainer>
    )

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(
      <GridContainer>
        <GridItem className="custom-class">Item</GridItem>
      </GridContainer>
    )

    const element = document.querySelector('.dnb-layout-grid-item')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-layout-grid-item',
      'custom-class',
    ])
  })

  it('should set given span with media', () => {
    render(
      <GridContainer>
        <GridItem
          span={{
            small: [1, 6],
            medium: [1, 2],
            large: [1, 12],
          }}
        >
          Item A
        </GridItem>

        <GridItem
          span={{
            small: [7, 12],
            medium: [3, 4],
            large: [1, 4],
          }}
        >
          Item B
        </GridItem>

        <GridItem
          span={{
            small: [2, 11],
            medium: [3, 4],
            large: [5, 8],
          }}
        >
          Item C
        </GridItem>

        <GridItem
          span={{
            small: [1, 12],
            medium: [3, 4],
            large: [9, 12],
          }}
        >
          Item D
        </GridItem>
      </GridContainer>
    )

    const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
      '.dnb-layout-grid-item'
    )

    expect(elements[0].style['_values']).toEqual({
      '--large-c-s': '1',
      '--large-c-e': '13',
      '--medium-c-s': '1',
      '--medium-c-e': '3',
      '--small-c-s': '1',
      '--small-c-e': '7',
    })
    expect(elements[1].style['_values']).toEqual({
      '--large-c-e': '5',
      '--large-c-s': '1',
      '--medium-c-e': '5',
      '--medium-c-s': '3',
      '--small-c-e': '13',
      '--small-c-s': '7',
    })
    expect(elements[2].style['_values']).toEqual({
      '--large-c-e': '9',
      '--large-c-s': '5',
      '--medium-c-e': '5',
      '--medium-c-s': '3',
      '--small-c-e': '12',
      '--small-c-s': '2',
    })
    expect(elements[3].style['_values']).toEqual({
      '--large-c-e': '13',
      '--large-c-s': '9',
      '--medium-c-e': '5',
      '--medium-c-s': '3',
      '--small-c-e': '13',
      '--small-c-s': '1',
    })
  })

  it('should set given span', () => {
    render(
      <GridContainer>
        <GridItem span={[1, 6]}>Item A</GridItem>

        <GridItem span={[7, 12]}>Item B</GridItem>
      </GridContainer>
    )

    const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
      '.dnb-layout-grid-item'
    )

    expect(elements[0].style['_values']).toEqual({
      '--small-c-s': '1',
      '--small-c-e': '7',
      '--large-c-s': '1',
      '--large-c-e': '7',
      '--medium-c-s': '1',
      '--medium-c-e': '7',
    })
    expect(elements[1].style['_values']).toEqual({
      '--small-c-s': '7',
      '--small-c-e': '13',
      '--large-c-s': '7',
      '--large-c-e': '13',
      '--medium-c-s': '7',
      '--medium-c-e': '13',
    })
  })

  it('should set element', () => {
    render(<GridItem element="section">content</GridItem>)

    const element = document.querySelector('.dnb-layout-grid-item')

    expect(element.tagName).toBe('SECTION')
  })
})
