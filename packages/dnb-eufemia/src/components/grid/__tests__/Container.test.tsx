import React from 'react'
import { render } from '@testing-library/react'
import 'mock-match-media/jest-setup'
import Grid from '../Grid'

describe('Grid.Container', () => {
  it('should forward HTML attributes', () => {
    render(
      <Grid.Container aria-label="Aria Label">
        <Grid.Item>Item</Grid.Item>
      </Grid.Container>
    )

    const element = document.querySelector('.dnb-grid-container')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <Grid.Container top="large">
        <Grid.Item>Item</Grid.Item>
      </Grid.Container>
    )
    const element = document.querySelector('.dnb-grid-container ')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(
      <Grid.Container top="x-large">
        <Grid.Item>Item</Grid.Item>
      </Grid.Container>
    )

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should set columnGap and rowGap', () => {
    const { rerender } = render(
      <Grid.Container columnGap rowGap>
        <Grid.Item>Item</Grid.Item>
      </Grid.Container>
    )

    const element = document.querySelector('.dnb-grid-container')

    expect(element.className).toContain(
      'dnb-grid-container--column-gap-small'
    )
    expect(element.className).toContain(
      'dnb-grid-container--row-gap-small'
    )

    rerender(
      <Grid.Container columnGap="medium" rowGap="medium">
        <Grid.Item>Item</Grid.Item>
      </Grid.Container>
    )

    expect(element.className).toContain(
      'dnb-grid-container--column-gap-medium'
    )
    expect(element.className).toContain(
      'dnb-grid-container--row-gap-medium'
    )

    rerender(
      <Grid.Container columnGap="large" rowGap="large">
        <Grid.Item>Item</Grid.Item>
      </Grid.Container>
    )

    expect(element.className).toContain(
      'dnb-grid-container--column-gap-large'
    )
    expect(element.className).toContain(
      'dnb-grid-container--row-gap-large'
    )
  })

  it('should contain given classes', () => {
    render(
      <Grid.Container className="custom-class">
        <Grid.Item>Item</Grid.Item>
      </Grid.Container>
    )

    const element = document.querySelector('.dnb-grid-container')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-grid-container',
      'custom-class',
    ])
  })

  it('should render children', () => {
    render(
      <Grid.Container>
        <Grid.Item>Item 1</Grid.Item>
        <Grid.Item>Item 2</Grid.Item>
        <Grid.Item>Item 3</Grid.Item>
      </Grid.Container>
    )

    const element = document.querySelector('.dnb-grid-container')
    const children = element.children
    const childrenTextContents = Array.from(children).map((child) =>
      child.textContent.replace(/[\u200C]/g, '')
    )

    expect(children.length).toEqual(3)
    expect(childrenTextContents).toEqual(['Item 1', 'Item 2', 'Item 3'])
  })

  it('should set given columns', () => {
    const { rerender } = render(
      <Grid.Container columns={10}>
        <Grid.Item>Item</Grid.Item>
      </Grid.Container>
    )

    const element = document.querySelector(
      '.dnb-grid-container'
    ) as HTMLElement

    expect(element.style['_values']).toEqual({
      '--small-columns': '10',
      '--medium-columns': '10',
      '--large-columns': '10',
    })

    rerender(
      <Grid.Container
        columns={{
          small: 4,
          medium: 6,
          large: 12,
        }}
      >
        <Grid.Item>Item</Grid.Item>
      </Grid.Container>
    )

    expect(element.style['_values']).toEqual({
      '--small-columns': '4',
      '--medium-columns': '6',
      '--large-columns': '12',
    })
  })

  it('should set element', () => {
    render(<Grid.Container element="section">content</Grid.Container>)

    const element = document.querySelector('.dnb-grid-container')

    expect(element.tagName).toBe('SECTION')
  })
})
